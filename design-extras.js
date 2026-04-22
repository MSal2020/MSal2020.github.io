/**
 * design-extras.js — small, page-scoped enhancements. Every feature is
 * opt-in by DOM presence alone, so pages that don't include the hooks
 * simply skip the work.
 *
 *   1. Handwritten signature redraw on .sig elements that say "Salmaan"
 *   2. Torn-page SVG dividers inserted between .dn-chapter sections
 *   3. Hover-to-expand footnotes for <abbr title> and [data-footnote]
 *   4. Vertical timeline ribbon pinned next to #work (resume chapter iii)
 */
(function(){
  'use strict';

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }

  // NB: ready() is defined, but the actual bootstrap call lives at the
  // end of this file. All `var`-hoisted constants (SIG_SVG, etc.) must be
  // declared before ready() fires, or they'll be `undefined` when the
  // feature functions read them synchronously.

  // =============================================================
  // STYLES
  // =============================================================
  function injectStyles(){
    if (document.getElementById('design-extras-style')) return;
    var s = document.createElement('style');
    s.id = 'design-extras-style';
    s.textContent = [
      /* ---- Signature ---- */
      '.sig.sig-handwritten{',
      '  display:inline-flex; align-items:center; gap:10px;',
      '  line-height:1; color:var(--accent,#B85C3C);',
      '}',
      '.sig-svg{',
      '  width:min(260px, 70vw); height:auto; display:block;',
      '  overflow:visible;',
      '}',
      '.sig-svg .sig-path, .sig-svg .sig-flourish{',
      '  fill:none; stroke:var(--accent,#B85C3C);',
      '  stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round;',
      '  stroke-dasharray:var(--len,1200); stroke-dashoffset:var(--len,1200);',
      '}',
      '.sig-svg .sig-flourish{ stroke-width:1.6; opacity:.75; }',
      '.sig-svg .sig-dot{',
      '  fill:var(--accent,#B85C3C); opacity:0;',
      '  transition:opacity .3s ease 1.3s;',
      '}',
      '.sig.sig-handwritten.drawn .sig-path{',
      '  transition:stroke-dashoffset 1.2s cubic-bezier(.5,.1,.25,1);',
      '  stroke-dashoffset:0;',
      '}',
      '.sig.sig-handwritten.drawn .sig-flourish{',
      '  transition:stroke-dashoffset .7s cubic-bezier(.4,.1,.3,1) 1.0s;',
      '  stroke-dashoffset:0;',
      '}',
      '.sig.sig-handwritten.drawn .sig-dot{ opacity:1; }',
      '@media (prefers-reduced-motion: reduce){',
      '  .sig-svg .sig-path,.sig-svg .sig-flourish{stroke-dashoffset:0}',
      '  .sig-svg .sig-dot{opacity:1}',
      '}',

      /* ---- Torn page dividers ---- */
      '.torn-divider{',
      '  position:relative; width:100%; height:64px;',
      '  margin:60px auto 40px; pointer-events:none; overflow:visible;',
      '  transform:translateZ(0); will-change:transform;',
      '}',
      '.torn-divider svg{ width:100%; height:100%; display:block; overflow:visible; }',
      // Upper "paper" fills the top half, meeting the deckle line. A subtle
      // gradient gives it a torn-edge shadow without spilling a straight
      // line below (which is what the blur-stroke approach produced).
      '.torn-divider .torn-fill{ fill:var(--paper,#FBF3DF); }',
      '.torn-divider .torn-edge{',
      '  fill:none; stroke:var(--ink-softest,#7A5E3E);',
      '  stroke-width:1.4; opacity:.55;',
      '  stroke-linecap:round; stroke-linejoin:round;',
      '}',
      // A second, offset line a few px below simulates the back-of-page.
      '.torn-divider .torn-ghost{',
      '  fill:none; stroke:var(--ink-softest,#7A5E3E);',
      '  stroke-width:.8; opacity:.22;',
      '}',
      // Tiny scattered specks along the tear for a hand-ripped look.
      '.torn-divider .torn-speck{',
      '  fill:var(--ink-softest,#7A5E3E); opacity:.5;',
      '}',
      'html.dark-mode .torn-divider .torn-fill{ fill:transparent; }',
      'html.dark-mode .torn-divider .torn-edge{ stroke:rgba(209,182,141,.45); }',
      'html.dark-mode .torn-divider .torn-ghost{ stroke:rgba(209,182,141,.18); }',
      'html.dark-mode .torn-divider .torn-speck{ fill:rgba(209,182,141,.35); }',
      // Suppress the host section\'s own straight border-top when a torn
      // divider has been inserted as its predecessor — otherwise the page
      // renders deckle + straight line stacked together.
      '.has-torn-divider{ border-top:0 !important; }',

      /* ---- Footnotes ---- */
      'abbr[title], [data-footnote]{',
      '  text-decoration:none; border-bottom:1px dotted currentColor;',
      '  cursor:help; position:relative;',
      '}',
      '.fn-margin{',
      '  position:absolute; z-index:40;',
      '  max-width:260px; width:max-content;',
      '  padding:10px 14px;',
      '  background:var(--paper,#FBF3DF);',
      '  color:var(--ink,#2a2118);',
      '  border:1px solid var(--rule,rgba(122,94,62,.28));',
      '  border-left:3px solid var(--accent,#B85C3C);',
      '  border-radius:3px;',
      '  box-shadow:0 10px 24px rgba(20,14,8,.14);',
      '  font-family:"Fraunces",serif; font-style:italic;',
      '  font-size:13.5px; line-height:1.5;',
      '  letter-spacing:.01em;',
      '  pointer-events:none; opacity:0; transform:translateY(-4px);',
      '  transition:opacity .18s ease, transform .18s ease;',
      '}',
      '.fn-margin.show{ opacity:1; transform:translateY(0); }',
      '.fn-margin:before{',
      '  content:"\u2733"; display:inline-block; margin-right:6px;',
      '  color:var(--accent,#B85C3C); font-style:normal;',
      '  font-size:11px; vertical-align:1px;',
      '}',
      'html.dark-mode .fn-margin{',
      '  background:#241810; color:var(--ink,#F0E4CC);',
      '  border-color:rgba(209,182,141,.22);',
      '  box-shadow:0 10px 24px rgba(0,0,0,.5);',
      '}',

      /* ---- Timeline ribbon (resume chapter iii) ---- */
      '.work-ribbon{',
      '  position:fixed; left:22px; top:50%; transform:translate(-12px,-50%);',
      '  z-index:35; pointer-events:none; opacity:0;',
      '  transition:opacity .35s ease, transform .35s ease;',
      '  font-family:"JetBrains Mono",ui-monospace,monospace;',
      '  font-size:10px; letter-spacing:.12em; text-transform:uppercase;',
      '}',
      '.work-ribbon.visible{ opacity:1; transform:translate(0,-50%); pointer-events:auto; }',
      '.work-ribbon .rail{',
      '  position:absolute; left:6px; top:4px; bottom:4px;',
      '  width:1px; background:var(--rule,rgba(122,94,62,.28));',
      '}',
      '.work-ribbon ul{',
      '  list-style:none; margin:0; padding:0;',
      '  display:flex; flex-direction:column; gap:14px;',
      '}',
      '.work-ribbon li{ position:relative; padding-left:22px; }',
      '.work-ribbon a{',
      '  color:var(--ink-softest,#7A5E3E); text-decoration:none;',
      '  transition:color .2s ease, letter-spacing .2s ease;',
      '  display:inline-block;',
      '}',
      '.work-ribbon li:before{',
      '  content:""; position:absolute; left:3px; top:6px;',
      '  width:7px; height:7px; border-radius:50%;',
      '  background:var(--paper,#FBF3DF);',
      '  border:1px solid var(--ink-softest,#7A5E3E);',
      '  transition:background-color .2s ease, border-color .2s ease, transform .2s ease;',
      '}',
      '.work-ribbon li.active a{ color:var(--accent,#B85C3C); letter-spacing:.18em; }',
      '.work-ribbon li.active:before{',
      '  background:var(--accent,#B85C3C); border-color:var(--accent,#B85C3C);',
      '  transform:scale(1.35);',
      '}',
      '.work-ribbon a:hover{ color:var(--ink,#2a2118); }',
      '@media(max-width:960px){ .work-ribbon{ display:none } }',

      /* ---- Mobile corrections ---- */
      // Hide the animated scroll cue on phones (the coord rail wraps so the
      // cue lands awkwardly anyway; content below is obvious).
      '@media(max-width:780px){',
      '  .dn-coords .scroll-cue{ display:none !important; }',
      // Cluster navigation items in the center of the pill on phones
      // instead of left-aligned (the star, the link list, and the
      // toggle were hugging the left edge, leaving a visible gap right).
      '  .navigation{ justify-content:center; }',
      // Tighten top-of-section padding on phones (some pages set 120-140px).
      '  .dn-chapter,',
      '  .home-journal, .home-rooms, .home-constellation,',
      '  .home-now, .home-guide{',
      '    padding-top:72px !important; padding-bottom:56px !important;',
      '  }',
      // LinkedIn "Connect" button on resume hero: center it under the tag,
      // keep the icon+label on one line, and give the svg a fixed box so
      // it doesn't detach from the label on narrow screens.
      '  .dn-hero{ display:flex; flex-direction:column; align-items:flex-start; }',
      '  .dn-connect{',
      '    display:flex; width:fit-content;',
      '    margin:28px auto 0; padding:11px 18px;',
      '    font-size:12px; letter-spacing:.12em;',
      '    white-space:nowrap; align-self:center;',
      '  }',
      '  .dn-connect svg{',
      '    flex:0 0 auto; width:15px; height:15px;',
      '  }',
      // Put the coords rail back in the flow on phones. It was absolutely
      // positioned at bottom:24px and was overlapping the LinkedIn CTA
      // when the hero shrank. Flowing it beneath the hero content
      // eliminates the collision without changing the desktop layout.
      '  .dn-coords{',
      '    position:static !important; left:auto !important; right:auto !important; bottom:auto !important;',
      '    margin:40px 22px 0; padding:0;',
      '  }',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  }

  // =============================================================
  // 1. SIGNATURE REDRAW
  // =============================================================
  // Inline SVG of a stylised cursive "Salmaan" — single continuous stroke
  // with an em-dash lead-in and a period dot, plus a short flourish under.
  var SIG_SVG =
    '<svg class="sig-svg" viewBox="0 0 340 90" fill="none" aria-label="Salmaan">' +
      '<path class="sig-path" d="' +
        /* em-dash */
        'M 4 54 L 28 54 ' +
        /* S */
        'M 50 38 C 46 22, 74 18, 80 32 ' +
        'C 86 48, 54 44, 60 58 ' +
        'C 64 70, 84 68, 88 60 ' +
        /* a */
        'C 92 52, 104 48, 102 60 ' +
        'C 100 70, 82 72, 90 60 ' +
        'C 98 52, 112 52, 112 64 ' +
        /* l (tall loop) */
        'C 118 66, 122 56, 124 44 ' +
        'C 126 28, 132 14, 138 16 ' +
        'L 132 66 ' +
        /* m (three humps) */
        'C 134 74, 144 72, 148 62 ' +
        'C 152 54, 158 44, 160 52 ' +
        'C 162 60, 156 66, 164 66 ' +
        'C 172 66, 178 54, 180 46 ' +
        'C 182 54, 184 66, 192 66 ' +
        'C 200 66, 206 54, 208 46 ' +
        /* a */
        'C 212 56, 216 66, 224 66 ' +
        'C 232 66, 238 56, 240 46 ' +
        'C 242 36, 232 34, 230 46 ' +
        'C 228 60, 242 68, 252 62 ' +
        /* a */
        'C 260 56, 266 46, 268 40 ' +
        'C 270 50, 272 64, 280 66 ' +
        /* n (ending flourish) */
        'C 288 68, 294 58, 298 50 ' +
        'C 300 60, 302 68, 310 66 ' +
        'C 318 64, 324 58, 330 62' +
      '"/>' +
      '<path class="sig-flourish" d="M 14 80 C 90 92, 210 74, 322 84"/>' +
      '<circle class="sig-dot" cx="332" cy="70" r="3.2"/>' +
    '</svg>';

  function signatureRedraw(){
    // Match every `.sig` on the page; the /salmaan/i text filter below
    // skips the "the shelf" / "the workshop" section-sigs automatically.
    var targets = document.querySelectorAll('.sig');
    for (var i = 0; i < targets.length; i++){
      var sig = targets[i];
      if (sig.dataset.sigRedrawn === '1') continue;
      var label = (sig.textContent || '').trim();
      if (!/salmaan/i.test(label)) continue;

      sig.dataset.sigRedrawn = '1';
      sig.classList.add('sig-handwritten');
      sig.innerHTML = SIG_SVG;

      // Compute stroke lengths and publish them as CSS variables; the
      // stylesheet drives dasharray/dashoffset off --len, and the .drawn
      // class flips offset to 0 via transition — no inline overrides.
      var pathEl = sig.querySelector('.sig-path');
      var flourEl = sig.querySelector('.sig-flourish');
      if (pathEl){
        pathEl.style.setProperty('--len', Math.ceil(pathEl.getTotalLength()));
      }
      if (flourEl){
        flourEl.style.setProperty('--len', Math.ceil(flourEl.getTotalLength()));
      }

      // Draw when the signature enters the viewport. If it's already in
      // view (short pages), trigger immediately.
      var rect = sig.getBoundingClientRect();
      var inView = rect.top < (window.innerHeight - 40) && rect.bottom > 0;
      if (inView){
        sig.classList.add('drawn');
      } else if ('IntersectionObserver' in window){
        var io = new IntersectionObserver(function(entries, obs){
          entries.forEach(function(en){
            if (en.isIntersecting){
              en.target.classList.add('drawn');
              obs.unobserve(en.target);
            }
          });
        }, { threshold:0.2 });
        io.observe(sig);
      } else {
        sig.classList.add('drawn');
      }
    }
  }

  // =============================================================
  // 2. TORN DIVIDERS
  // =============================================================
  // Inserts a hand-drawn deckle edge before every recognised content
  // section. Each inserted divider replaces the straight rule the page
  // would otherwise draw (via the section's own border-top) — we mark the
  // section with .has-torn-divider so CSS can suppress that rule.
  function tornDividers(){
    var blocks = document.querySelectorAll(
      '.dn-chapter, .home-journal, .home-rooms, .home-constellation,' +
      ' .home-now, .home-guide, #dn-projects, .dn-engagements'
    );
    if (!blocks.length) return;

    var divs = [];
    for (var i = 0; i < blocks.length; i++){
      var b = blocks[i];
      var el = makeTornDivider(i + 1);
      b.parentNode.insertBefore(el, b);
      b.classList.add('has-torn-divider');
      divs.push(el);
    }

    if (!divs.length) return;

    // Parallax: translate each divider ±6px based on scroll position.
    // Throttled via rAF.
    var raf = 0;
    function update(){
      raf = 0;
      var vh = window.innerHeight;
      for (var j = 0; j < divs.length; j++){
        var d = divs[j];
        var r = d.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80){ d.style.transform = ''; continue; }
        var center = r.top + r.height/2;
        var rel = (center - vh/2) / (vh/2);   // -1..1 across viewport
        var y = Math.max(-6, Math.min(6, -rel * 6));
        d.style.transform = 'translateY(' + y.toFixed(2) + 'px)';
      }
    }
    function onScroll(){ if (!raf) raf = requestAnimationFrame(update); }
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function makeTornDivider(seed){
    var wrap = document.createElement('div');
    wrap.className = 'torn-divider';
    wrap.setAttribute('aria-hidden', 'true');

    // Generate an irregular deckle across 1200×64. Mid-line sits around
    // y=32; amplitude up to ±14 with occasional deeper "rips" so the edge
    // feels hand-torn, not machine-cut.
    var W = 1200, MID = 32;
    var rnd = mulberry32(seed * 9301 + 49297);
    var segments = 46;
    var pts = [];
    for (var i = 0; i <= segments; i++){
      var x = (i / segments) * W;
      // Base noise.
      var y = MID + (rnd() * 2 - 1) * 8;
      // Low-frequency undulation so the tear isn't uniform.
      y += Math.sin((i / segments) * Math.PI * (1 + rnd())) * 4;
      // Occasional deeper rip.
      if (rnd() < 0.15) y += (rnd() < 0.5 ? -6 : 6);
      pts.push([x, y]);
    }

    // Build a smoothed path using quadratic midpoint interpolation.
    function pathFrom(offset){
      var s = 'M 0 ' + (pts[0][1] + offset).toFixed(1) + ' ';
      for (var k = 1; k < pts.length; k++){
        var mx = (pts[k-1][0] + pts[k][0]) / 2;
        var my = (pts[k-1][1] + pts[k][1]) / 2 + offset;
        s += 'Q ' + pts[k-1][0].toFixed(1) + ' ' + (pts[k-1][1] + offset).toFixed(1) + ' ' +
             mx.toFixed(1) + ' ' + my.toFixed(1) + ' ';
      }
      s += 'L ' + W + ' ' + (pts[segments][1] + offset).toFixed(1);
      return s;
    }

    var edgePath  = pathFrom(0);
    var ghostPath = pathFrom(4);

    // A few random specks floating near the tear for texture.
    var specks = '';
    for (var j = 0; j < 5; j++){
      var sx = rnd() * W;
      var sy = MID + (rnd() * 2 - 1) * 18;
      var sr = 0.7 + rnd() * 1.1;
      specks += '<circle class="torn-speck" cx="' + sx.toFixed(1) + '" cy="' + sy.toFixed(1) +
                '" r="' + sr.toFixed(2) + '"/>';
    }

    wrap.innerHTML =
      '<svg viewBox="0 0 ' + W + ' 64" preserveAspectRatio="none">' +
        '<path class="torn-ghost" vector-effect="non-scaling-stroke" d="' + ghostPath + '"/>' +
        '<path class="torn-edge"  vector-effect="non-scaling-stroke" d="' + edgePath  + '"/>' +
        specks +
      '</svg>';
    return wrap;
  }

  // Seeded PRNG so deckle paths are stable across reloads.
  function mulberry32(a){
    return function(){
      var t = (a += 0x6D2B79F5) | 0;
      t = Math.imul(t ^ (t >>> 15), 1 | t);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // =============================================================
  // 3. FOOTNOTES
  // =============================================================
  function footnotes(){
    var pool = document.querySelectorAll('abbr[title], [data-footnote]');
    if (!pool.length) return;

    var aside = document.createElement('aside');
    aside.className = 'fn-margin';
    aside.setAttribute('role','tooltip');
    document.body.appendChild(aside);

    var hideT = 0;

    function show(el){
      clearTimeout(hideT);
      var text = el.getAttribute('data-footnote') || el.getAttribute('title') || '';
      if (!text) return;
      // Temporarily remove title so the native browser tooltip doesn't race.
      if (el.hasAttribute('title')){
        el.setAttribute('data-orig-title', el.getAttribute('title'));
        el.removeAttribute('title');
      }
      aside.textContent = text;
      position(el);
      aside.classList.add('show');
    }

    function hide(el){
      hideT = setTimeout(function(){ aside.classList.remove('show'); }, 120);
      if (el && el.hasAttribute('data-orig-title')){
        el.setAttribute('title', el.getAttribute('data-orig-title'));
        el.removeAttribute('data-orig-title');
      }
    }

    function position(el){
      var r = el.getBoundingClientRect();
      var sx = window.pageXOffset || document.documentElement.scrollLeft;
      var sy = window.pageYOffset || document.documentElement.scrollTop;

      aside.style.visibility = 'hidden';
      aside.style.top = '0px'; aside.style.left = '0px';
      aside.style.removeProperty('right');
      // Measure once placed so width is accurate.
      var aw = aside.offsetWidth;

      // Prefer left margin (like a marginalium); fall back to right if no room.
      var leftX = r.left + sx - aw - 14;
      var rightX = r.right + sx + 14;
      var vw = document.documentElement.clientWidth;
      var useRight = leftX < 12;
      if (!useRight && r.left < aw + 30) useRight = true;
      if (useRight && rightX + aw > vw + sx - 12) useRight = false;

      var x = useRight ? rightX : leftX;
      var y = r.top + sy - 6;
      aside.style.left = Math.max(8, x) + 'px';
      aside.style.top  = Math.max(8, y) + 'px';
      aside.style.visibility = '';
    }

    pool.forEach(function(el){
      el.addEventListener('mouseenter', function(){ show(el); });
      el.addEventListener('mouseleave', function(){ hide(el); });
      el.addEventListener('focus', function(){ show(el); });
      el.addEventListener('blur', function(){ hide(el); });
    });

    window.addEventListener('scroll', function(){
      aside.classList.remove('show');
    }, { passive:true });
  }

  // =============================================================
  // 4. TIMELINE RIBBON
  // =============================================================
  function timelineRibbon(){
    var section = document.getElementById('work');
    if (!section) return;
    var cases = section.querySelectorAll('.dn-case');
    if (!cases.length) return;

    // Pull year ranges from each case's .yr element.
    //   from/to = inclusive range as displayed in the resume.
    //   effTo   = the last year we actually count toward the ribbon's
    //             visible span. Multi-year ranges (e.g. "2023 — 2025")
    //             usually end on a formal date inside the final year, so
    //             we trim the trailing year when building the ribbon's
    //             upper bound. Full ranges are still used for highlighting
    //             so the sliver year is hit during scroll.
    var entries = [];
    var minYear = Infinity, maxYear = -Infinity;
    for (var i = 0; i < cases.length; i++){
      var el = cases[i];
      var yrEl = el.querySelector('.yr');
      if (!yrEl) continue;
      var m = (yrEl.textContent || '').match(/(\d{4})(?:\s*[\u2014\-]\s*(\d{4}))?/);
      if (!m) continue;
      var from = parseInt(m[1], 10);
      var to   = m[2] ? parseInt(m[2], 10) : from;
      var effTo = (to > from) ? to - 1 : to;
      // Give the case a stable id for anchor links.
      if (!el.id) el.id = 'case-' + (i + 1);
      entries.push({ el: el, from: from, to: to, effTo: effTo });
      if (from < minYear) minYear = from;
      if (effTo > maxYear) maxYear = effTo;
    }
    if (!entries.length) return;

    // Build year → case lookup (first match wins; later cases override if
    // their range contains the year, so the latest event at a given year
    // takes precedence — but here DOM order is reverse-chronological, so
    // earlier entries actually win, which is what we want).
    var years = [];
    for (var y = minYear; y <= maxYear; y++){
      var match = null;
      for (var j = 0; j < entries.length; j++){
        if (y >= entries[j].from && y <= entries[j].to){
          if (!match || (entries[j].to - entries[j].from) < (match.to - match.from)){
            match = entries[j];
          }
        }
      }
      years.push({ year: y, target: match });
    }

    // Build DOM.
    var ribbon = document.createElement('nav');
    ribbon.className = 'work-ribbon';
    ribbon.setAttribute('aria-label','Work timeline');
    var rail = document.createElement('span');
    rail.className = 'rail';
    ribbon.appendChild(rail);
    var ul = document.createElement('ul');
    years.forEach(function(ye){
      var li = document.createElement('li');
      li.dataset.year = ye.year;
      if (ye.target) li.dataset.target = ye.target.el.id;
      var a = document.createElement('a');
      a.textContent = toRoman(ye.year);
      a.href = ye.target ? ('#' + ye.target.el.id) : '#work';
      a.title = String(ye.year);
      a.addEventListener('click', function(ev){
        ev.preventDefault();
        var t = ye.target ? ye.target.el : section;
        t.scrollIntoView({ behavior:'smooth', block:'start' });
      });
      li.appendChild(a);
      ul.appendChild(li);
    });
    ribbon.appendChild(ul);
    document.body.appendChild(ribbon);

    // Visibility: show while #work overlaps viewport.
    if ('IntersectionObserver' in window){
      var vis = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          ribbon.classList.toggle('visible', en.isIntersecting);
        });
      }, { threshold: 0.05 });
      vis.observe(section);
    } else {
      ribbon.classList.add('visible');
    }

    // Active case: the .dn-case whose vertical center is closest to the
    // viewport's center. Recomputed on every scroll/resize — IO-based
    // tracking doesn't work here because we need to re-pick a winner even
    // when no case newly enters or exits visibility.
    var activeCaseId = null;
    var rafTicket = 0;

    function pickActive(){
      rafTicket = 0;
      var mid = window.innerHeight / 2;
      var best = null, bestDist = Infinity;
      for (var i = 0; i < cases.length; i++){
        var r = cases[i].getBoundingClientRect();
        // Skip fully off-screen cases.
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        var caseMid = r.top + r.height / 2;
        var d = Math.abs(caseMid - mid);
        if (d < bestDist){ bestDist = d; best = cases[i]; }
      }
      var newId = best ? best.id : null;
      if (newId !== activeCaseId){
        activeCaseId = newId;
        applyActive();
      }
    }

    function onScroll(){ if (!rafTicket) rafTicket = requestAnimationFrame(pickActive); }
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', onScroll);
    pickActive();

    function applyActive(){
      var lis = ribbon.querySelectorAll('li');
      for (var i = 0; i < lis.length; i++){
        lis[i].classList.toggle('active', activeCaseId != null && lis[i].dataset.target === activeCaseId);
      }
    }
  }

  function toRoman(n){
    if (n < 1) return '';
    var map = [
      [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],
      [100,'C'],[90,'XC'],[50,'L'],[40,'XL'],
      [10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
    ];
    var out = '';
    for (var i = 0; i < map.length; i++){
      while (n >= map[i][0]){ out += map[i][1]; n -= map[i][0]; }
    }
    return out;
  }

  // ---------- bootstrap ----------
  // Must live at the very end so every `var` constant above is assigned
  // before `ready()` synchronously invokes the handlers.
  ready(function(){
    injectStyles();
    signatureRedraw();
    tornDividers();
    footnotes();
    timelineRibbon();
  });
})();
