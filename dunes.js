/**
 * Dunes — persistent canvas background shared across all pages.
 * Exposes window.Dunes with mount() + setPalette() + setSun() + destroy().
 *
 * Palette shape:
 * {
 *   layers: [ { colorL, colorD }, ... 4 entries ],
 *   bottomL: '#...',   // horizon floor color (light)
 *   bottomD: '#...',   // horizon floor color (dark)
 *   strokeL: 'rgba(...)',
 *   strokeD: 'rgba(...)',
 *   fleckL:  'rgba(...)',  // {a} placeholder for per-fleck alpha
 *   fleckD:  'rgba(...)'
 * }
 */
(function(){
  'use strict';

  // Contour layers disabled — the drifting dust flecks are the only always-on
  // element. Cursor light-pool and occasional shooting-star streaks layer on
  // top for interactive flourishes.
  var GEOM = [];

  // Lantern radius (px) of brighter-fleck zone around the cursor.
  var LANTERN_R = 180;

  var state = {
    canvas: null,
    stage: null,
    sun: null,
    ctx: null,
    W: 0, H: 0, dpr: 1,
    t0: performance.now(),
    mx: 0.5, my: 0.5,
    flecks: [],
    running: false,
    rafId: 0,
    current: null,    // active palette (color arrays of rgb triplets)
    target:  null,    // tween target
    tweenT0: 0,
    tweenDur: 0,
    onResize: null,
    onMouseMove: null,
    onVisibility: null,
    reducedMotion: false,
    // living-dunes state
    scrollOffset: 0,        // fraction 0..1 of how far we've scrolled (clamped)
    scrollOffsetTarget: 0,
    horizonDrop: 0,         // 0..1; 1 = fully dropped (layers slide down, sky opens)
    horizonTarget: 0,
    windX: 1,               // multiplier on fleck vx; sign = direction
    windTarget: 1,
    lastPointerT: 0,
    lastPointerX: -9999,
    lastPointerY: -9999,
    pointerInside: false,
    // shooting-star streaks
    streaks: [],
    nextStreakT: 0
  };

  // ---------- color utilities ----------
  function hexToRgb(hex){
    var h = String(hex).replace('#','');
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    return [parseInt(h.substr(0,2),16), parseInt(h.substr(2,2),16), parseInt(h.substr(4,2),16)];
  }
  function rgbStr(rgb, a){ return 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+a+')'; }
  function lerp(a,b,t){ return a + (b-a)*t; }
  function lerpRgb(a,b,t){ return [Math.round(lerp(a[0],b[0],t)), Math.round(lerp(a[1],b[1],t)), Math.round(lerp(a[2],b[2],t))]; }
  function easeOutCubic(t){ return 1 - Math.pow(1-t, 3); }

  // Convert a user palette (hex strings) into our internal rgb form.
  function normalizePalette(p){
    return {
      showLayers: p.showLayers !== false,
      layers: p.layers.map(function(L){ return { L: hexToRgb(L.colorL), D: hexToRgb(L.colorD) }; }),
      bottomL: hexToRgb(p.bottomL || '#6a4b24'),
      bottomD: hexToRgb(p.bottomD || '#0f0a04'),
      strokeL: p.strokeL || 'rgba(255,231,199,0.38)',
      strokeD: p.strokeD || 'rgba(237,183,77,0.14)',
      fleckL:  p.fleckL  || 'rgba(255,231,199,{a})',
      fleckD:  p.fleckD  || 'rgba(237,183,77,{a})'
    };
  }

  // Interpolate two normalized palettes. t in [0..1].
  function blendPalette(a, b, t){
    var out = { layers: [] };
    out.showLayers = t < 0.5 ? a.showLayers : b.showLayers;
    for (var i=0; i<a.layers.length; i++){
      out.layers.push({
        L: lerpRgb(a.layers[i].L, b.layers[i].L, t),
        D: lerpRgb(a.layers[i].D, b.layers[i].D, t)
      });
    }
    out.bottomL = lerpRgb(a.bottomL, b.bottomL, t);
    out.bottomD = lerpRgb(a.bottomD, b.bottomD, t);
    // Strokes + flecks: just swap at t>=0.5 (they're low-opacity and imperceptible)
    out.strokeL = t < 0.5 ? a.strokeL : b.strokeL;
    out.strokeD = t < 0.5 ? a.strokeD : b.strokeD;
    out.fleckL  = t < 0.5 ? a.fleckL  : b.fleckL;
    out.fleckD  = t < 0.5 ? a.fleckD  : b.fleckD;
    return out;
  }

  function resize(){
    if (!state.stage || !state.canvas) return;
    // The canvas is position:fixed and always covers the viewport, so we
    // must size its backing buffer to the VIEWPORT — not the stage. Using
    // the stage rect caused dunes to be drawn off-screen when content was
    // taller than 100vh (layer y=0.94 * stage.H ended up below the fold).
    state.W = window.innerWidth;
    state.H = window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.canvas.width  = state.W * state.dpr;
    state.canvas.height = state.H * state.dpr;
    state.canvas.style.width  = state.W + 'px';
    state.canvas.style.height = state.H + 'px';
    state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  }

  function seedFlecks(){
    state.flecks.length = 0;
    // Reduce count on narrow viewports so phones don't render 24 grains
    // over a sliver of sky (and to save a bit of per-frame fill work).
    var N = (window.innerWidth <= 780) ? 10 : 24;
    for (var i=0; i<N; i++){
      state.flecks.push({
        x: Math.random()*state.W,
        y: Math.random()*state.H*0.7 + state.H*0.2,
        vx: 0.4 + Math.random()*1.2,
        r: Math.random()*1.8 + 0.35,
        life: Math.random()
      });
    }
  }

  function currentResolvedPalette(){
    if (!state.target) return state.current;
    var el = performance.now() - state.tweenT0;
    if (el >= state.tweenDur){
      state.current = state.target;
      state.target = null;
      return state.current;
    }
    return blendPalette(state.current, state.target, easeOutCubic(el / state.tweenDur));
  }

  function draw(){
    if (!state.running) return;
    var ctx = state.ctx, W = state.W, H = state.H;
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var t = (performance.now() - state.t0) / 1000;
    var P = currentResolvedPalette();

    // Ease smoothed values toward their targets (frame-rate friendly decay).
    state.scrollOffset += (state.scrollOffsetTarget - state.scrollOffset) * 0.08;
    state.horizonDrop  += (state.horizonTarget       - state.horizonDrop)  * 0.06;
    state.windX        += (state.windTarget          - state.windX)        * 0.05;

    // Scroll & horizon both push layers down (opens more sky above).
    var dropPx = H * (state.scrollOffset * 0.06 + state.horizonDrop * 0.18);

    ctx.clearRect(0, 0, W, H);

    // ---- Shooting-star streaks: rare, thin diagonal dust trails ----
    var now = performance.now();
    if (now >= state.nextStreakT){
      // Schedule next streak 14–28s out.
      state.nextStreakT = now + 14000 + Math.random() * 14000;
      spawnStreak();
    }
    for (var s = state.streaks.length - 1; s >= 0; s--){
      var st = state.streaks[s];
      st.life += 1/60;
      if (st.life >= st.ttl){ state.streaks.splice(s, 1); continue; }
      var p = st.life / st.ttl;                      // 0..1
      var ease = p < 0.15 ? (p/0.15) : 1 - (p-0.15)/0.85;  // fade in then out
      var nx = st.x + st.vx * st.life * 60;
      var ny = st.y + st.vy * st.life * 60;
      var tx = nx - st.vx * 16, ty = ny - st.vy * 16;
      var grd = ctx.createLinearGradient(tx, ty, nx, ny);
      var fA = ease * (dark ? 0.55 : 0.42);
      var tpl = dark ? P.fleckD : P.fleckL;
      grd.addColorStop(0, tpl.replace('{a}', '0'));
      grd.addColorStop(1, tpl.replace('{a}', String(fA)));
      ctx.strokeStyle = grd;
      ctx.lineWidth = 1.25;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(nx, ny); ctx.stroke();
      // Head dot
      ctx.fillStyle = tpl.replace('{a}', String(fA * 1.4));
      ctx.beginPath(); ctx.arc(nx, ny, 1.4, 0, Math.PI*2); ctx.fill();
    }

    // ---- Cursor lantern: faint radial warmth under the pointer ----
    if (state.pointerInside){
      var lx = state.lastPointerX, ly = state.lastPointerY;
      var rg = ctx.createRadialGradient(lx, ly, 0, lx, ly, LANTERN_R);
      var accentTpl = dark ? P.fleckD : P.fleckL;
      rg.addColorStop(0, accentTpl.replace('{a}', dark ? '0.10' : '0.08'));
      rg.addColorStop(1, accentTpl.replace('{a}', '0'));
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(lx, ly, LANTERN_R, 0, Math.PI*2); ctx.fill();
    }

    // ---- Flecks (dust) with lantern boost ----
    var lx2 = state.lastPointerX, ly2 = state.lastPointerY;
    var lanternOn = state.pointerInside;
    for (var k=0; k<state.flecks.length; k++){
      var f = state.flecks[k];
      f.x += f.vx * state.windX; f.life += 0.006;
      if (f.x > W + 20){ f.x = -20; f.y = Math.random() * H * 0.6 + H * 0.2; }
      else if (f.x < -20){ f.x = W + 20; f.y = Math.random() * H * 0.6 + H * 0.2; }

      var a = 0.35 + Math.sin(f.life * 2) * 0.25;
      if (dark) a = Math.min(1, a * 1.65 + 0.14);
      else a = Math.min(1, a * 1.9 + 0.18);
      var r = dark ? f.r * 1.45 : f.r * 1.35;

      // Lantern boost: flecks close to cursor get brighter + slightly larger.
      if (lanternOn){
        var dx = f.x - lx2, dy = f.y - ly2;
        var d2 = dx*dx + dy*dy;
        var R2 = LANTERN_R * LANTERN_R;
        if (d2 < R2){
          var prox = 1 - Math.sqrt(d2) / LANTERN_R;  // 0..1
          a = Math.min(1, a + prox * 0.55);
          r = r * (1 + prox * 0.45);
        }
      }

      var tpl2 = dark ? P.fleckD : P.fleckL;
      ctx.fillStyle = tpl2.replace('{a}', String(a));
      ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, Math.PI*2); ctx.fill();
    }

    state.rafId = requestAnimationFrame(draw);
  }

  // ---- Shooting-star spawn ----
  function spawnStreak(){
    var W = state.W, H = state.H;
    // Start near top, slant down-right or down-left.
    var fromLeft = Math.random() < 0.5;
    var startX = fromLeft ? -20 : W + 20;
    var startY = Math.random() * H * 0.35;
    var angle = fromLeft
      ? (Math.PI * (0.12 + Math.random() * 0.08))   // down-right
      : (Math.PI * (0.92 - Math.random() * 0.08));  // down-left
    var speed = 5 + Math.random() * 3;              // px/frame-ish
    state.streaks.push({
      x: startX, y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      ttl: 1.1 + Math.random() * 0.7                // seconds
    });
  }

  function drawStatic(){
    var ctx = state.ctx, W = state.W, H = state.H;
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var P = state.current;
    ctx.clearRect(0, 0, W, H);
    if (!P.showLayers) return;
    ctx.lineCap = 'round';
    for (var i=0; i<GEOM.length; i++){
      var L = GEOM[i];
      var Lc = P.layers[Math.min(i, P.layers.length - 1)];
      var baseY = H * L.y;
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (var x = 8; x <= W + 8; x += 8){
        var cy = baseY + Math.sin(x * L.freq * 6.2832) * L.amp;
        ctx.lineTo(x, cy);
      }
      ctx.strokeStyle = rgbStr(dark ? Lc.D : Lc.L, L.alpha);
      ctx.lineWidth = dark ? 1.1 : 0.9;
      ctx.stroke();
    }
  }

  // ---------- public API ----------
  var Dunes = {
    mount: function(opts){
      var canvas = opts.canvas, stage = opts.stage, sun = opts.sun, palette = opts.palette;
      if (!canvas || !stage || !palette) return;
      if (state.canvas === canvas && state.running) return;   // idempotent

      // clean prior listeners if re-mounting on a different canvas
      if (state.canvas && state.canvas !== canvas) this.destroy();

      state.canvas = canvas; state.stage = stage; state.sun = sun || null;
      state.ctx = canvas.getContext('2d');
      state.current = normalizePalette(palette);
      state.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      resize(); seedFlecks();

      state.onResize = resize;
      window.addEventListener('resize', state.onResize);

      if (state.sun) state.sun.style.transform = '';

      state.onVisibility = function(){
        if (document.hidden){ state.running = false; cancelAnimationFrame(state.rafId); }
        else if (!state.reducedMotion){ state.running = true; state.t0 = performance.now(); state.rafId = requestAnimationFrame(draw); }
      };
      document.addEventListener('visibilitychange', state.onVisibility);

      // Pointer tracking retained only for the soft lantern glow; wind
      // direction is now fixed (rightward) and unaffected by the cursor.
      state.windTarget = 1;
      state.windX = 1;
      state.onMouseMove = function(e){
        state.lastPointerX = e.clientX;
        state.lastPointerY = e.clientY;
        state.pointerInside = true;
      };
      window.addEventListener('mousemove', state.onMouseMove, { passive: true });

      // Hide lantern when pointer leaves the window.
      state.onPointerLeave = function(){ state.pointerInside = false; };
      document.addEventListener('mouseleave', state.onPointerLeave);
      window.addEventListener('blur', state.onPointerLeave);

      // First shooting-star ~8-14s after load so users see one within a view.
      state.nextStreakT = performance.now() + 8000 + Math.random() * 6000;

      // Scroll progress -> dune drop.
      state.onScroll = function(){
        var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        var frac = Math.min(1, Math.max(0, window.scrollY / max));
        state.scrollOffsetTarget = frac;
      };
      window.addEventListener('scroll', state.onScroll, { passive: true });
      state.onScroll();

      state.t0 = performance.now();
      if (state.reducedMotion){
        state.running = false;
        drawStatic();
      } else {
        state.running = true;
        state.rafId = requestAnimationFrame(draw);
      }

      // Safety: re-measure after layout settles. On some navigations the
      // stage has 0-height when DOMContentLoaded fires; a deferred resize
      // guarantees the canvas picks up correct dims before first paint.
      requestAnimationFrame(function(){ resize(); });
      setTimeout(function(){ resize(); }, 120);
    },

    setStage: function(stage){
      if (!stage || stage === state.stage) return;
      state.stage = stage;
      resize();
    },

    setSun: function(sun){ state.sun = sun || null; },

    setPalette: function(palette, opts){
      if (!palette) return;
      var dur = (opts && opts.duration) || 700;
      var next = normalizePalette(palette);
      // if a tween is in progress, snap current to its live value before starting new tween
      if (state.target){
        var snap = currentResolvedPalette();
        state.current = snap;
      }
      state.target = next;
      state.tweenT0 = performance.now();
      state.tweenDur = dur;
      if (state.reducedMotion){
        state.current = next; state.target = null;
        drawStatic();
      }
    },

    // 0 = normal horizon, 1 = fully dropped (opens sky, e.g. when a project opens)
    setHorizon: function(frac){
      state.horizonTarget = Math.max(0, Math.min(1, Number(frac) || 0));
    },

    // Directly nudge wind (e.g. for testing). 1 = baseline.
    setWind: function(w){ state.windTarget = Number(w) || 1; },

    destroy: function(){
      state.running = false;
      if (state.rafId) cancelAnimationFrame(state.rafId);
      if (state.onResize) window.removeEventListener('resize', state.onResize);
      if (state.onVisibility) document.removeEventListener('visibilitychange', state.onVisibility);
      if (state.onMouseMove) window.removeEventListener('mousemove', state.onMouseMove);
      if (state.onPointerLeave){
        document.removeEventListener('mouseleave', state.onPointerLeave);
        window.removeEventListener('blur', state.onPointerLeave);
      }
      if (state.onScroll) window.removeEventListener('scroll', state.onScroll);
      if (state.onWindDecay) clearInterval(state.onWindDecay);
      state.canvas = state.stage = state.sun = state.ctx = null;
      state.onResize = state.onMouseMove = state.onPointerLeave = state.onVisibility = state.onScroll = state.onWindDecay = null;
    }
  };

  window.Dunes = Dunes;
})();
