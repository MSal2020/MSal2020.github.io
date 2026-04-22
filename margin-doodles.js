/**
 * margin-doodles.js — Adds a tiny hand-drawn SVG marginalium to each
 * .note-card on notes.html. Eight deterministic motifs keyed by note title
 * hash, rendered in the accent ink color in the left margin.
 *
 * Watches for shelf re-renders (filter changes) via MutationObserver so
 * doodles stick around after category filtering.
 */
(function(){
  'use strict';

  // --- Motif library (viewBox 0 0 24 24) -------------------------------------
  // Each motif uses currentColor so we can color it via CSS.
  var MOTIFS = [
    // 0 — asterisk
    '<g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">' +
      '<line x1="12" y1="3"  x2="12" y2="21"/>' +
      '<line x1="4"  y1="7"  x2="20" y2="17"/>' +
      '<line x1="4"  y1="17" x2="20" y2="7"/>' +
    '</g>',

    // 1 — pointing hand (☞) stylized
    '<g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M3 14 C 3 12, 5 11, 7 12 L 11 13"/>' +
      '<path d="M11 9 L 20 11 L 20 13 L 11 15"/>' +
      '<path d="M11 9 C 11 7, 13 6, 14 8"/>' +
      '<path d="M7 12 C 6 14, 7 16, 9 16 L 14 16"/>' +
    '</g>',

    // 2 — underline scribble (double wavy)
    '<g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">' +
      '<path d="M2 10 C 6 6, 10 14, 14 10 S 22 6, 22 10"/>' +
      '<path d="M2 15 C 6 19, 10 11, 14 15 S 22 19, 22 15"/>' +
    '</g>',

    // 3 — dog-ear (folded corner)
    '<g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">' +
      '<path d="M4 4 L 20 4 L 20 15 L 15 20 L 4 20 Z"/>' +
      '<path d="M20 15 L 15 15 L 15 20"/>' +
      '<path d="M15 15 L 20 20" stroke-dasharray="1.2 1.6"/>' +
    '</g>',

    // 4 — five-point star (hollow)
    '<polygon points="12,3 14.6,9.3 21.5,9.7 16,14 18,20.5 12,16.6 6,20.5 8,14 2.5,9.7 9.4,9.3" ' +
      'fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',

    // 5 — triple dots (…)
    '<g fill="currentColor">' +
      '<circle cx="6"  cy="14" r="1.8"/>' +
      '<circle cx="12" cy="14" r="1.8"/>' +
      '<circle cx="18" cy="14" r="1.8"/>' +
    '</g>',

    // 6 — checkmark with underline flourish
    '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M4 13 L 9 18 L 20 6"/>' +
      '<path d="M5 21 C 9 19, 15 19, 20 21" stroke-width="1.2"/>' +
    '</g>',

    // 7 — curled arrow
    '<g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M3 18 C 3 10, 10 6, 17 9"/>' +
      '<path d="M12 5 L 17 9 L 14 14"/>' +
    '</g>'
  ];

  function hashStr(s){
    var h = 0;
    s = String(s || '');
    for (var i = 0; i < s.length; i++){
      h = ((h << 5) - h) + s.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }

  ready(function(){
    var shelf = document.getElementById('dn-shelf');
    if (!shelf) return;

    // Inject styles once.
    if (!document.getElementById('md-style')){
      var style = document.createElement('style');
      style.id = 'md-style';
      style.textContent = [
        // Release overflow so the marginalia can peek outside the card edge.
        '.note-card.has-doodle{ overflow:visible; }',
        '.note-card .margin-doodle{',
        '  position:absolute;',
        '  left:-16px; top:28px;',
        '  width:28px; height:28px;',
        '  color:var(--accent,#B85C3C);',
        '  opacity:0;',
        '  transform:rotate(-8deg) translateY(4px);',
        '  transition:opacity .5s ease, transform .5s cubic-bezier(.2,.7,.2,1);',
        '  pointer-events:none;',
        '}',
        '.note-card .margin-doodle svg{ width:100%; height:100%; display:block; }',
        '.note-card:hover .margin-doodle{',
        '  opacity:.88;',
        '  transform:rotate(2deg) translateY(0);',
        '}',
        // Always-visible variant (slightly dimmer) so doodles peek even
        // without hover — reinforces the "annotated notebook" feel.
        '.note-card .margin-doodle.is-resting{ opacity:.35; }',
        '.note-card:hover .margin-doodle.is-resting{ opacity:.9; }',
        '@media (max-width:600px){',
        '  .note-card .margin-doodle{ left:-6px; top:14px; width:20px; height:20px; }',
        '}',
        'html.dark-mode .note-card .margin-doodle{ color:var(--accent,#E0896C); }'
      ].join('\n');
      document.head.appendChild(style);
    }

    function decorate(){
      var cards = shelf.querySelectorAll('.note-card');
      cards.forEach(function(card){
        if (card.querySelector('.margin-doodle')) return;  // already decorated
        var title = card.getAttribute('data-title') || (card.querySelector('h3') || {}).textContent || '';
        var idx = hashStr(title) % MOTIFS.length;
        card.classList.add('has-doodle');
        var wrap = document.createElement('span');
        wrap.className = 'margin-doodle is-resting';
        wrap.setAttribute('aria-hidden', 'true');
        // Randomize a tiny bit of tilt per card so they don't look mechanical.
        var tiltBase = ((hashStr(title + 'tilt') % 9) - 4);
        wrap.style.setProperty('--md-tilt', tiltBase + 'deg');
        wrap.innerHTML = '<svg viewBox="0 0 24 24">' + MOTIFS[idx] + '</svg>';
        card.appendChild(wrap);
        // Apply base tilt by updating transition starting transform.
        wrap.style.transform = 'rotate(' + tiltBase + 'deg) translateY(4px)';
        // After a frame, release to the CSS :hover/rest states.
        requestAnimationFrame(function(){
          wrap.style.transform = '';
        });
      });
    }

    decorate();

    // Re-run when shelf contents change (filter toggles re-render).
    if (typeof MutationObserver !== 'undefined'){
      var mo = new MutationObserver(function(){ decorate(); });
      mo.observe(shelf, { childList:true });
    }
  });
})();
