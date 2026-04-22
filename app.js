/**
 * app.js — shell bootstrap (no SPA).
 *
 * Runs once per page load. Wires:
 *   - theme toggle (light/dark) with localStorage persistence
 *   - back-to-top button
 *   - active-tab highlight on the global nav
 *   - Dunes canvas mount (persistent dune background)
 *   - invokes window.__pageInit[id]() if the page registered one
 *
 * Links do normal browser navigation — no fetch, no DOM swapping, no
 * cross-page transitions. Each page loads fresh.
 */
(function(){
  'use strict';

  // ---------- Cross-document View Transitions (MPA) ----------
  // Injects the opt-in rule + assigns stable view-transition-names to persistent
  // elements so the browser pairs them across full page navigations. Supported
  // in Chromium 126+; silently inert elsewhere.
  // NOTE: We intentionally do NOT assign view-transition-name to #dn-canvas.
  // Giving a live <canvas> a view-transition-name causes Chrome to replace
  // it with a static snapshot (often empty on first load) in the transition
  // layer, which persists and hides the live drawing. The dune canvas is
  // position:fixed + behind everything, so a normal root transition over
  // the top looks seamless without pairing the canvas itself.
  // Swallow the benign "Transition was skipped" AbortError that Chrome logs
  // as an unhandled rejection whenever a cross-document view transition is
  // interrupted (e.g. rapid back/forward, or navigating mid-transition).
  window.addEventListener('unhandledrejection', function(ev){
    var r = ev.reason;
    if (r && (r.name === 'AbortError') &&
        /Transition was skipped/i.test(String(r.message || ''))){
      ev.preventDefault();
    }
  });

  (function installViewTransitions(){
    var css = [
      '@view-transition { navigation: auto; }',

      // Sunrise / sunset sweep used by the theme toggle. A tall gradient
      // band slides across the viewport and the theme class flips at the
      // midpoint, so the existing palette transition happens "behind" a
      // visible sweep of light.
      '.theme-sweep{',
      '  position:fixed; left:0; right:0; height:160vh;',
      '  z-index:9998; pointer-events:none; will-change:transform;',
      '  background:linear-gradient(to bottom,',
      '    rgba(251,243,223,0)   0%,',
      '    rgba(251,243,223,.92) 6%,',
      '    rgba(255,195,120,1)   20%,',
      '    rgba(210,100,66,.98)  42%,',
      '    rgba(139,58,98,.92)   62%,',
      '    rgba(45,27,78,.82)    80%,',
      '    rgba(28,18,8,0)       100%);',
      '}',
      '.theme-sweep.to-dark  { top:-160vh; animation:theme-sweep-down 1.5s cubic-bezier(.65,0,.35,1) forwards; }',
      '.theme-sweep.to-light { top: 100vh; animation:theme-sweep-up   1.5s cubic-bezier(.65,0,.35,1) forwards; }',
      '@keyframes theme-sweep-down { from{transform:translateY(0)} to{transform:translateY(260vh)} }',
      '@keyframes theme-sweep-up   { from{transform:translateY(0)} to{transform:translateY(-260vh)} }',
      // Brief dun-sun dimming through the midpoint, to sell the sun "dipping".
      '.theme-sweeping svg.dn-sun{',
      '  transition:filter .7s ease, transform .9s cubic-bezier(.4,0,.3,1), opacity .7s ease;',
      '}',
      '.theme-sweeping.to-dark svg.dn-sun{',
      '  transform:translateY(32px); opacity:.65;',
      '}',
      '.theme-sweeping.to-light svg.dn-sun{',
      '  transform:translateY(-14px) scale(1.04); opacity:1;',
      '}',
      '@media (prefers-reduced-motion: reduce){',
      '  .theme-sweep{ animation-duration:1ms !important; opacity:0 !important; }',
      '  .theme-sweeping svg.dn-sun{ transition:none !important; transform:none !important; }',
      '}',


      // Back-to-top button removed globally — keep the markup in place for
      // legacy reasons but hide it from the UI.
      '.back-to-top { display: none !important; }',

      // Stable paper-colored backdrop on <html> so there is no white flash
      // between paint of the outgoing snapshot and the first paint of the
      // incoming document. Respects the dark theme via the same tokens the
      // body uses.
      ':root { background-color: #FBF3DF; }',
      'html.dark-mode { background-color: #1C1208; }',

      // Persistent UI chrome — paired across navigations so it doesn\'t flicker.
      '.navigation     { view-transition-name: nav;     }',
      '.reading-widget { view-transition-name: reading; }',
      '.cmdk-trigger   { view-transition-name: cmdk;    }',

      // True crossfade: old and new run in the same 360ms window. Old fades
      // to 0 while new fades from 0 — no bare-backdrop gap. A very subtle
      // vertical drift adds physicality without the previous blur pop.
      '@keyframes fg-page-out {',
      '  from { opacity: 1; transform: translateY(0); }',
      '  to   { opacity: 0; transform: translateY(-4px); }',
      '}',
      '@keyframes fg-page-in {',
      '  from { opacity: 0; transform: translateY(6px); }',
      '  to   { opacity: 1; transform: translateY(0); }',
      '}',
      // Overlap: outgoing stays visible for the full duration, incoming
      // starts immediately. Both share an easing so they feel connected.
      '::view-transition-old(root),',
      '::view-transition-new(root) {',
      '  animation-duration: 360ms;',
      '  animation-timing-function: cubic-bezier(.2,.7,.2,1);',
      '  animation-fill-mode: both;',
      '  mix-blend-mode: normal;',
      '}',
      '::view-transition-old(root) { animation-name: fg-page-out; }',
      '::view-transition-new(root) { animation-name: fg-page-in;  }',
      // Blend mode: letting both pseudos occupy the same stacking plane
      // with `normal` keeps the crossfade clean (default is plus-lighter
      // which brightens paper color to white during the overlap).
      '::view-transition-image-pair(root) { isolation: auto; }',

      // Persistent UI chrome — no motion, minimal duration so the pairing
      // holds without re-animating the shared element.
      '::view-transition-group(nav),',
      '::view-transition-group(reading),',
      '::view-transition-group(cmdk) { animation-duration: 1ms; }',

      // Respect reduced-motion: short, pure opacity crossfade.
      '@media (prefers-reduced-motion: reduce) {',
      '  @keyframes fg-page-out { to { opacity: 0; } }',
      '  @keyframes fg-page-in  { from { opacity: 0; } to { opacity: 1; } }',
      '  ::view-transition-old(root),',
      '  ::view-transition-new(root) { animation-duration: 200ms; }',
      '}'
    ].join('\n');
    var style = document.createElement('style');
    style.setAttribute('data-vt','1');
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  })();

  // ---------- theme ----------
  function darken(hex){
    var h = String(hex || '').replace('#','');
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    if (h.length !== 6) return hex;
    var r = Math.round(parseInt(h.substr(0,2),16) * 0.6);
    var g = Math.round(parseInt(h.substr(2,2),16) * 0.6);
    var b = Math.round(parseInt(h.substr(4,2),16) * 0.6);
    return '#' + [r,g,b].map(function(v){ var s = v.toString(16); return s.length<2 ? '0'+s : s; }).join('');
  }

  function applyThemeCore(dark){
    document.documentElement.classList.toggle('dark-mode', dark);
    document.body.classList.toggle('dark-mode', dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark-mode' : 'light-mode');
    var meta = document.querySelector('meta[name="theme-color"]');
    var themeColor = window.__page && window.__page.themeColor;
    if (meta && themeColor){
      meta.setAttribute('content', dark ? darken(themeColor) : themeColor);
    }
  }

  // User-initiated theme change: plays a sunrise/sunset sweep and flips
  // the palette at the midpoint. Initial-load callers use applyThemeCore
  // directly so boot is instant.
  var sweepInFlight = false;
  function applyThemeSweep(dark){
    if (sweepInFlight) return;
    var currentDark = document.documentElement.classList.contains('dark-mode');
    if (currentDark === dark){ applyThemeCore(dark); return; }
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !document.body){ applyThemeCore(dark); return; }

    sweepInFlight = true;
    var dir = dark ? 'to-dark' : 'to-light';
    var sweep = document.createElement('div');
    sweep.className = 'theme-sweep ' + dir;
    document.body.appendChild(sweep);
    document.documentElement.classList.add('theme-sweeping', dir);

    // Flip the actual theme when the brightest band of the sweep is over
    // the viewport (50% of the 1500ms animation).
    setTimeout(function(){ applyThemeCore(dark); }, 750);
    setTimeout(function(){
      if (sweep.parentNode) sweep.parentNode.removeChild(sweep);
      document.documentElement.classList.remove('theme-sweeping','to-dark','to-light');
      sweepInFlight = false;
    }, 1600);
  }

  // ---------- nav active state ----------
  function updateActiveNav(id){
    var map = { home:'index.html', resume:'resume.html', notes:'notes.html', projects:'projects.html' };
    var target = map[id];
    document.querySelectorAll('.navigation__list__link').forEach(function(a){
      var h = (a.getAttribute('href') || '').replace(/^\.\//, '');
      a.classList.toggle('is-active', h === target);
    });
  }

  // ---------- boot ----------
  function boot(){
    // Theme
    var toggle = document.getElementById('mode-switch');
    var saved = localStorage.getItem('theme');
    var isDark = saved === 'dark-mode';
    if (toggle){
      toggle.checked = isDark;
      toggle.addEventListener('change', function(e){ applyThemeSweep(e.target.checked); });
    }
    applyThemeCore(isDark);

    // Back-to-top
    var btt = document.querySelector('.back-to-top');
    if (btt){
      var check = function(){
        if (window.scrollY > 500) btt.classList.add('visible');
        else btt.classList.remove('visible');
      };
      window.addEventListener('scroll', check, { passive:true });
      btt.addEventListener('click', function(){ window.scrollTo({ top:0, behavior:'smooth' }); });
      check();
    }

    // Nav active highlight
    var id = window.__page && window.__page.id;
    updateActiveNav(id);

    // Dunes canvas (persistent dune background for the hero)
    var cvs = document.getElementById('dn-canvas');
    var stage = document.getElementById('dn-cinema');
    var sun = document.getElementById('dn-sun');
    if (cvs && stage && window.Dunes && window.__page && window.__page.palette){
      window.Dunes.mount({ canvas: cvs, stage: stage, sun: sun, palette: window.__page.palette });

      // When a project popup opens on projects.html, drop the horizon to open sky.
      if (document.body && 'MutationObserver' in window){
        var bodyObs = new MutationObserver(function(){
          var open = document.body.classList.contains('project-popup-active');
          if (window.Dunes.setHorizon) window.Dunes.setHorizon(open ? 1 : 0);
        });
        bodyObs.observe(document.body, { attributes:true, attributeFilter:['class'] });
      }
    }

    // Page-specific init hook (wires notes shelf, projects popups, resume
    // typewriter, home constellation, etc.). Each page's inline script is
    // expected to have set window.__pageInit[id] = function(){ ... }.
    var initFn = window.__pageInit && window.__pageInit[id];
    if (typeof initFn === 'function'){
      try { initFn(); } catch(e){ console.error('page init failed', e); }
    }
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
