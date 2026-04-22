/**
 * notes-constellation.js — "The Index"
 *
 * Renders book notes as a drifting constellation on a canvas. Notes that
 * share a category are connected by thin lines (like themes). Hover a node:
 * it brightens along with its connections; others fade. Click a node: opens
 * the note via the existing openNote() mechanism (or, as fallback, the card
 * click on the shelf below).
 */
(function(){
  'use strict';

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }

  ready(function(){
    var mount = document.getElementById('notes-constellation');
    if (!mount) return;
    // notes-data.js uses `const notesData = ...` which does NOT bind to
    // window. Fall back to the bare global identifier.
    var data = [];
    if (Array.isArray(window.notesData)) data = window.notesData;
    else if (typeof notesData !== 'undefined' && Array.isArray(notesData)) data = notesData;
    if (!data.length) return;

    // ---------- compute positions ----------
    // Group by category; layout each group in its own angular "sector" on a
    // radial disk, with nodes at varying radii and jittered angles.
    var categories = {};
    data.forEach(function(n, i){
      var c = n.category || 'Other';
      (categories[c] = categories[c] || []).push({ idx:i, note:n });
    });
    var catNames = Object.keys(categories);
    var sectorSpan = (Math.PI * 2) / Math.max(1, catNames.length);

    var nodes = [];
    catNames.forEach(function(cat, ci){
      var list = categories[cat];
      var sectorStart = ci * sectorSpan - Math.PI / 2;  // start at top
      list.forEach(function(e, j){
        // Jittered polar position within the sector.
        var ang = sectorStart + sectorSpan * ((j + 0.5) / list.length) +
                  (Math.random() - 0.5) * sectorSpan * 0.35;
        var rad = 0.38 + Math.random() * 0.52;  // 0..1 fraction of inner radius
        nodes.push({
          i: e.idx, note: e.note, category: cat,
          ang: ang, rad: rad,
          // Per-node drift offsets
          drift: { a: Math.random() * Math.PI * 2, s: 0.3 + Math.random() * 0.6 },
          // Live xy (set on every frame)
          x: 0, y: 0, r: 4 + Math.random() * 2
        });
      });
    });

    // Edges: pair nodes sharing a category. Avoid n^2 visual clutter for
    // large groups by capping connections per node within a category.
    var MAX_CONN = 3;
    var edges = [];
    catNames.forEach(function(cat){
      var list = categories[cat];
      for (var a = 0; a < list.length; a++){
        for (var b = a + 1; b < Math.min(list.length, a + 1 + MAX_CONN); b++){
          edges.push([list[a].idx, list[b].idx]);
        }
      }
    });

    // Build DOM: canvas + HTML overlay for node labels.
    var cvs = document.createElement('canvas');
    cvs.className = 'nc-canvas';
    var labels = document.createElement('div');
    labels.className = 'nc-labels';
    var legend = document.createElement('div');
    legend.className = 'nc-legend';
    legend.innerHTML = catNames.map(function(c){
      return '<span class="nc-leg"><i></i>' + escapeHtml(c) + '</span>';
    }).join('');
    var tooltip = document.createElement('div');
    tooltip.className = 'nc-tooltip';
    mount.appendChild(cvs);
    mount.appendChild(labels);
    mount.appendChild(legend);
    mount.appendChild(tooltip);

    var ctx = cvs.getContext('2d');
    var W = 0, H = 0, cx = 0, cy = 0, R = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var t0 = performance.now();
    var hoverIdx = -1;
    var running = true;
    var rafId = 0;

    // Per-node label elements, keyed by node order in `nodes`.
    var labelEls = nodes.map(function(n){
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'nc-node-label';
      el.setAttribute('aria-label', n.note.title);
      el.innerHTML = '<span class="nc-dot"></span><span class="nc-ttl">' + escapeHtml(n.note.title) + '</span>';
      el.addEventListener('mouseenter', function(){ setHover(nodes.indexOf(n)); });
      el.addEventListener('mouseleave', function(){ setHover(-1); });
      el.addEventListener('focus', function(){ setHover(nodes.indexOf(n)); });
      el.addEventListener('blur',  function(){ setHover(-1); });
      el.addEventListener('click', function(){ openNoteByTitle(n.note.title); });
      labels.appendChild(el);
      return el;
    });

    function openNoteByTitle(title){
      // Prefer existing shelf card click (it's already wired to openNote).
      var card = document.querySelector('.note-card[data-title="' + cssEsc(title) + '"]');
      if (card){ card.click(); return; }
      if (typeof window.openNote === 'function'){
        var note = data.find(function(n){ return n.title === title; });
        if (note) window.openNote(note);
      }
    }
    function cssEsc(s){ return String(s).replace(/(["\\])/g, '\\$1'); }

    function resize(){
      var r = mount.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return false;  // not yet visible/laid out
      W = r.width; H = r.height;
      cvs.width = W * dpr; cvs.height = H * dpr;
      cvs.style.width = W + 'px'; cvs.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
      R = Math.min(W, H) * 0.42;
      // Position labels immediately so they don't sit stacked at (0,0).
      positionNodes((performance.now() - t0) / 1000);
      return true;
    }
    // Try immediately; if the container is display:none we'll retry via
    // multiple fallbacks below.
    resize();
    window.addEventListener('resize', resize);

    if (typeof ResizeObserver !== 'undefined'){
      var ro = new ResizeObserver(function(){ resize(); });
      ro.observe(mount);
    }

    // Also watch the ancestor's data-notes-view attribute — when it flips
    // to "constellation", the mount transitions from display:none to block
    // and we force a resize on the next frame.
    var container = document.getElementById('shelf') || mount.parentElement;
    if (container && typeof MutationObserver !== 'undefined'){
      var mo = new MutationObserver(function(){
        requestAnimationFrame(function(){ resize(); });
      });
      mo.observe(container, { attributes:true, attributeFilter:['data-notes-view'] });
    }

    // Last-resort polling: up to 20 tries over 2s to catch the reveal.
    var tries = 0;
    var poll = setInterval(function(){
      if (resize() || ++tries > 20) clearInterval(poll);
    }, 100);

    function positionNodes(t){
      for (var i = 0; i < nodes.length; i++){
        var n = nodes[i];
        var d = n.drift;
        var wobble = Math.sin(t * 0.4 * d.s + d.a) * 0.03;
        var angWobble = Math.sin(t * 0.25 * d.s + d.a * 1.3) * 0.04;
        n.x = cx + Math.cos(n.ang + angWobble) * R * (n.rad + wobble);
        n.y = cy + Math.sin(n.ang + angWobble) * R * (n.rad + wobble);
        var lbl = labelEls[i];
        if (lbl){
          lbl.style.transform = 'translate(' + (n.x) + 'px,' + (n.y) + 'px)';
        }
      }
    }

    function draw(){
      if (!running) return;
      if (W < 2 || H < 2){ rafId = requestAnimationFrame(draw); return; }
      var t = (performance.now() - t0) / 1000;
      positionNodes(t);

      var dark = document.documentElement.classList.contains('dark-mode');
      var accent = dark ? 'rgba(224,137,108,' : 'rgba(184,92,60,';
      var rule   = dark ? 'rgba(209,182,141,' : 'rgba(122,94,62,';

      ctx.clearRect(0, 0, W, H);

      // Faint concentric rings
      ctx.strokeStyle = rule + '0.06)';
      ctx.lineWidth = 1;
      for (var ri = 1; ri <= 3; ri++){
        ctx.beginPath();
        ctx.arc(cx, cy, R * (0.3 + ri * 0.22), 0, Math.PI * 2);
        ctx.stroke();
      }

      // Edges
      for (var e = 0; e < edges.length; e++){
        var ep = edges[e];
        var a = nodeByIdx(ep[0]), b = nodeByIdx(ep[1]);
        if (!a || !b) continue;
        var active = (hoverIdx >= 0) &&
          (a === nodes[hoverIdx] || b === nodes[hoverIdx]);
        var alpha = (hoverIdx < 0) ? 0.12 : (active ? 0.55 : 0.04);
        ctx.strokeStyle = accent + alpha + ')';
        ctx.lineWidth = active ? 1.3 : 0.8;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Nodes
      for (var i = 0; i < nodes.length; i++){
        var n = nodes[i];
        var isHover = (i === hoverIdx);
        var isRelated = (hoverIdx >= 0) && shareCategory(n, nodes[hoverIdx]);
        var base = isHover ? 1.0 : (hoverIdx < 0 ? 0.75 : (isRelated ? 0.9 : 0.25));
        var r = n.r * (isHover ? 1.8 : (isRelated ? 1.25 : 1));

        // Soft halo
        var glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        glow.addColorStop(0, accent + (base * 0.45) + ')');
        glow.addColorStop(1, accent + '0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2); ctx.fill();

        // Dot
        ctx.fillStyle = accent + base + ')';
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    function nodeByIdx(originalDataIdx){
      for (var i = 0; i < nodes.length; i++){
        if (nodes[i].i === originalDataIdx) return nodes[i];
      }
      return null;
    }
    function shareCategory(a, b){
      return a && b && a.category === b.category;
    }

    function setHover(i){
      if (hoverIdx === i) return;
      hoverIdx = i;
      // Sync label classes for CSS fade.
      for (var k = 0; k < labelEls.length; k++){
        var lbl = labelEls[k];
        if (hoverIdx < 0){
          lbl.classList.remove('is-hover', 'is-dim', 'is-related');
          continue;
        }
        if (k === hoverIdx){
          lbl.classList.add('is-hover');
          lbl.classList.remove('is-dim', 'is-related');
        } else if (shareCategory(nodes[k], nodes[hoverIdx])){
          lbl.classList.add('is-related');
          lbl.classList.remove('is-hover', 'is-dim');
        } else {
          lbl.classList.add('is-dim');
          lbl.classList.remove('is-hover', 'is-related');
        }
      }
      if (hoverIdx >= 0){
        tooltip.textContent = nodes[hoverIdx].category;
        tooltip.style.transform = 'translate(' + (nodes[hoverIdx].x + 10) + 'px, ' + (nodes[hoverIdx].y - 32) + 'px)';
        tooltip.classList.add('show');
      } else {
        tooltip.classList.remove('show');
      }
    }

    // Canvas hit-testing as fallback (when hovering empty space near a node).
    cvs.addEventListener('mousemove', function(e){
      var r = cvs.getBoundingClientRect();
      var mx = e.clientX - r.left, my = e.clientY - r.top;
      var best = -1, bestD = 18; // px tolerance
      for (var i = 0; i < nodes.length; i++){
        var dx = nodes[i].x - mx, dy = nodes[i].y - my;
        var d = Math.sqrt(dx*dx + dy*dy);
        if (d < bestD){ bestD = d; best = i; }
      }
      if (best !== hoverIdx) setHover(best);
    });
    cvs.addEventListener('mouseleave', function(){ setHover(-1); });
    cvs.addEventListener('click', function(){
      if (hoverIdx >= 0) openNoteByTitle(nodes[hoverIdx].note.title);
    });

    // Pause when hidden.
    document.addEventListener('visibilitychange', function(){
      if (document.hidden){ running = false; cancelAnimationFrame(rafId); }
      else { running = true; t0 = performance.now(); rafId = requestAnimationFrame(draw); }
    });

    running = true;
    rafId = requestAnimationFrame(draw);
  });

  function escapeHtml(s){
    return String(s||'').replace(/[&<>"']/g, function(c){
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c];
    });
  }
})();
