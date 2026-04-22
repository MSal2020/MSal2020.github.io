/**
 * compass.js — Field-guide compass rose with a needle that tracks the
 * section currently in view. Sections are distributed around the dial; the
 * needle rotates to whichever section is most visible. Clicking a tick
 * (or the dial itself) smooth-scrolls to that section.
 *
 * Discovers top-level sections by id within <main>. Hidden on narrow
 * viewports and when no qualifying sections exist.
 */
(function(){
  'use strict';

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }

  ready(function(){
    // Collect eligible sections: direct children of <main> with an id, plus
    // a few known anchors. Filter out tiny / hidden ones.
    var main = document.querySelector('main') || document.body;
    var all = Array.prototype.slice.call(main.querySelectorAll('section[id], div[id]'));
    var sections = all
      .filter(function(s){
        // Only direct descendants of main or dn-container (no deeply nested).
        var p = s.parentElement;
        if (!p) return false;
        if (p !== main && p.tagName !== 'MAIN' && !p.classList.contains('dn')) return false;
        return !!s.id && s.offsetHeight > 120;
      })
      .map(function(s){
        // Derive a display name: prefer first h2/h1, fallback to id.
        var h = s.querySelector('.dn-ch-title, h1, h2, h3');
        var raw = h ? (h.textContent || '').trim().replace(/\s+/g, ' ') : s.id;
        // Keep it short — first 1-2 words.
        var short = raw.split(/\s+/).slice(0, 2).join(' ').replace(/[.,:;—-]+$/, '');
        if (short.length > 16) short = short.slice(0, 15) + '…';
        return { el: s, id: s.id, short: short, full: raw };
      });

    if (sections.length < 2) return;            // pointless with one section
    if (window.innerWidth < 820) return;        // keep mobile clean

    if (document.getElementById('fg-compass')) return;  // idempotent

    // ---------- styles ----------
    var style = document.createElement('style');
    style.setAttribute('data-compass','1');
    style.textContent = [
      '.fg-compass{',
      '  position:fixed; top:96px; right:22px; z-index:55;',
      '  width:88px; height:88px;',
      '  transform-origin:center;',
      '  transition:transform .3s ease, width .3s ease, height .3s ease;',
      '  view-transition-name: compass;',
      '}',
      '.fg-compass:hover{ transform:scale(1.04); }',
      '.fg-compass.is-expanded{ width:170px; height:170px; }',
      '.fg-compass svg{ width:100%; height:100%; overflow:visible; display:block; }',
      '.fg-c-ring{',
      '  fill:rgba(251,243,223,0.78);',
      '  stroke:var(--rule,rgba(122,94,62,.28));',
      '  stroke-width:1;',
      '}',
      'html.dark-mode .fg-c-ring, [data-theme="dark"] .fg-c-ring{',
      '  fill:rgba(28,18,8,0.72);',
      '  stroke:rgba(209,182,141,.22);',
      '}',
      '.fg-c-ring-outer{ fill:none; stroke:var(--rule,rgba(122,94,62,.28)); stroke-dasharray:2 3; }',
      'html.dark-mode .fg-c-ring-outer{ stroke:rgba(209,182,141,.22); }',
      '.fg-c-tick{',
      '  stroke:var(--ink-softest,#7A5E3E); stroke-width:1.25; opacity:.55;',
      '  transition:opacity .2s ease, stroke .2s ease, stroke-width .2s ease;',
      '  cursor:pointer;',
      '}',
      '.fg-c-tick:hover, .fg-c-tick.is-active{',
      '  stroke:var(--accent,#B85C3C); opacity:1; stroke-width:2.25;',
      '}',
      '.fg-c-label{',
      '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:8.5px;',
      '  fill:var(--ink-softest,#7A5E3E); letter-spacing:.08em; text-transform:uppercase;',
      '  opacity:0; transition:opacity .25s ease, fill .2s ease;',
      '  pointer-events:none; user-select:none;',
      '}',
      '.fg-compass.is-expanded .fg-c-label{ opacity:1; pointer-events:auto; cursor:pointer; }',
      '.fg-c-label.is-active{ fill:var(--accent,#B85C3C); opacity:1; }',
      '.fg-c-cardinal{',
      '  font-family:"Fraunces",serif; font-style:italic; font-size:9px;',
      '  fill:var(--ink-soft,#5C4630); opacity:.55;',
      '  pointer-events:none; user-select:none;',
      '}',
      'html.dark-mode .fg-c-cardinal{ fill:var(--ink-soft,#D1B68D); }',
      '.fg-c-needle{',
      '  fill:var(--accent,#B85C3C);',
      '  transform-origin:50px 50px;',
      '  transition:transform .55s cubic-bezier(.2,.7,.2,1);',
      '  filter:drop-shadow(0 1px 2px rgba(20,14,8,.25));',
      '  cursor:pointer;',
      '}',
      '.fg-c-needle-tail{',
      '  fill:var(--ink-softest,#7A5E3E); opacity:.6;',
      '  transform-origin:50px 50px;',
      '  transition:transform .55s cubic-bezier(.2,.7,.2,1);',
      '}',
      '.fg-c-center{',
      '  fill:var(--ink,#2a2118);',
      '  stroke:rgba(251,243,223,.8); stroke-width:1.2;',
      '}',
      'html.dark-mode .fg-c-center{ fill:var(--accent,#E0896C); stroke:rgba(28,18,8,.8); }',
      '.fg-c-readout{',
      '  position:absolute; top:100%; right:0; margin-top:8px;',
      '  padding:5px 10px; border-radius:8px;',
      '  background:var(--ink,#2a2118); color:var(--paper,#FBF3DF);',
      '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:9.5px;',
      '  letter-spacing:.12em; text-transform:uppercase; white-space:nowrap;',
      '  opacity:0; transform:translateY(-4px);',
      '  transition:opacity .25s ease, transform .25s ease;',
      '  pointer-events:none;',
      '}',
      '.fg-compass:hover .fg-c-readout, .fg-compass.is-expanded .fg-c-readout{',
      '  opacity:.95; transform:translateY(0);',
      '}',
      '@media (max-width:820px){ .fg-compass{ display:none } }',
      '@media print{ .fg-compass{ display:none } }',
      'body.blueprint-mode .fg-c-ring{ fill:rgba(255,255,255,.6); stroke:rgba(10,37,64,.35); }',
      'body.blueprint-mode .fg-c-tick{ stroke:#0a2540; }',
      'body.blueprint-mode .fg-c-tick.is-active{ stroke:#1e3a8a; }',
      'body.blueprint-mode .fg-c-needle{ fill:#1e3a8a; }',
      'body.blueprint-mode .fg-c-readout{ background:#1e3a8a; color:#E0F2FF; }'
    ].join('\n');
    document.head.appendChild(style);

    // ---------- build SVG ----------
    var compass = document.createElement('div');
    compass.className = 'fg-compass';
    compass.id = 'fg-compass';
    compass.setAttribute('aria-label','Section compass');

    var cx = 50, cy = 50;
    var rRing = 38;
    var rTickInner = 32, rTickOuter = 38;
    var rLabel = 46;
    var cardinals = ['N','E','S','W'];
    var cardinalPositions = [
      { t:'N', x:cx,        y:cy-rRing-5 },
      { t:'E', x:cx+rRing+6,y:cy+3 },
      { t:'S', x:cx,        y:cy+rRing+10 },
      { t:'W', x:cx-rRing-6,y:cy+3 }
    ];

    // Each section gets an angle evenly distributed, starting at -90° (N)
    // and sweeping clockwise.
    var angleFor = function(i){
      return -90 + (i / sections.length) * 360;
    };

    var svgParts = ['<svg viewBox="0 0 100 100" aria-hidden="true">'];
    svgParts.push('<circle class="fg-c-ring-outer" cx="'+cx+'" cy="'+cy+'" r="44"/>');
    svgParts.push('<circle class="fg-c-ring" cx="'+cx+'" cy="'+cy+'" r="'+rRing+'"/>');
    cardinalPositions.forEach(function(p){
      svgParts.push('<text class="fg-c-cardinal" x="'+p.x+'" y="'+p.y+'" text-anchor="middle">'+p.t+'</text>');
    });

    // Ticks + labels per section
    sections.forEach(function(s, i){
      var a = angleFor(i) * Math.PI / 180;
      var x1 = cx + Math.cos(a) * rTickInner;
      var y1 = cy + Math.sin(a) * rTickInner;
      var x2 = cx + Math.cos(a) * rTickOuter;
      var y2 = cy + Math.sin(a) * rTickOuter;
      svgParts.push(
        '<line class="fg-c-tick" data-idx="'+i+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"></line>'
      );
      var lx = cx + Math.cos(a) * rLabel;
      var ly = cy + Math.sin(a) * rLabel + 2;
      // Keep text readable regardless of angle — anchor based on quadrant.
      var anchor = 'middle';
      if (Math.cos(a) >  0.4) anchor = 'start';
      else if (Math.cos(a) < -0.4) anchor = 'end';
      svgParts.push(
        '<text class="fg-c-label" data-idx="'+i+'" x="'+lx+'" y="'+ly+'" text-anchor="'+anchor+'">' +
          escapeXml(s.short) +
        '</text>'
      );
    });

    // Needle (points up by default; rotated via transform)
    svgParts.push(
      '<g class="fg-c-needle-wrap">' +
        '<polygon class="fg-c-needle-tail" points="50,60 47,50 53,50"/>' +
        '<polygon class="fg-c-needle"      points="50,15 46,50 54,50"/>' +
      '</g>'
    );
    svgParts.push('<circle class="fg-c-center" cx="50" cy="50" r="3.2"/>');
    svgParts.push('</svg>');

    compass.innerHTML = svgParts.join('') + '<div class="fg-c-readout" id="fg-c-readout">—</div>';
    document.body.appendChild(compass);

    var needleWrap = compass.querySelector('.fg-c-needle-wrap');
    var tailEl = compass.querySelector('.fg-c-needle-tail');
    var needleEl = compass.querySelector('.fg-c-needle');
    var readout = compass.querySelector('#fg-c-readout');

    // ---------- interactions ----------
    function scrollToSection(i){
      var s = sections[i]; if (!s) return;
      var top = s.el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }

    compass.addEventListener('click', function(e){
      var t = e.target.closest('[data-idx]');
      if (t){
        var idx = parseInt(t.getAttribute('data-idx'), 10);
        if (!isNaN(idx)) scrollToSection(idx);
        return;
      }
      // Clicking the needle/center scrolls to current section top.
      if (e.target.closest('.fg-c-needle, .fg-c-center, .fg-c-needle-tail')){
        scrollToSection(currentIdx);
      }
    });

    // Expand on hover/focus to show labels.
    compass.addEventListener('mouseenter', function(){ compass.classList.add('is-expanded'); });
    compass.addEventListener('mouseleave', function(){ compass.classList.remove('is-expanded'); });

    // ---------- track active section ----------
    var currentIdx = 0;
    var visible = sections.map(function(){ return 0; });

    function setActive(i){
      if (i === currentIdx) return;
      currentIdx = i;
      // Rotate needle
      var deg = angleFor(i) + 90;  // needle points up by default, add 90° offset
      needleWrap.style.transform = 'rotate(' + deg + 'deg)';
      // Highlight tick + label
      Array.prototype.forEach.call(compass.querySelectorAll('.fg-c-tick'), function(t){
        t.classList.toggle('is-active', parseInt(t.getAttribute('data-idx'),10) === i);
      });
      Array.prototype.forEach.call(compass.querySelectorAll('.fg-c-label'), function(t){
        t.classList.toggle('is-active', parseInt(t.getAttribute('data-idx'),10) === i);
      });
      readout.textContent = sections[i].short;
    }

    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          var idx = sections.findIndex(function(s){ return s.el === e.target; });
          if (idx >= 0) visible[idx] = e.intersectionRatio;
        });
        // Pick the most-visible section; tie-break by document order.
        var best = 0, bestV = -1;
        for (var i = 0; i < visible.length; i++){
          if (visible[i] > bestV + 0.02){ bestV = visible[i]; best = i; }
        }
        if (bestV > 0) setActive(best);
      }, {
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
        rootMargin: '-70px 0px -40% 0px'
      });
      sections.forEach(function(s){ io.observe(s.el); });
    } else {
      // Fallback: scroll-based
      window.addEventListener('scroll', function(){
        var y = window.scrollY + window.innerHeight * 0.4;
        var best = 0;
        for (var i = 0; i < sections.length; i++){
          if (sections[i].el.offsetTop <= y) best = i;
        }
        setActive(best);
      }, { passive:true });
    }

    setActive(0);
  });

  function escapeXml(s){
    return String(s||'').replace(/[&<>"']/g, function(c){
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c];
    });
  }
})();
