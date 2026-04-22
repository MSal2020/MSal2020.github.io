/**
 * typewriter.js — reveals the contents of any element carrying
 * [data-typewriter] one character at a time while preserving the inline
 * span structure (so accent-coloured markup, ampersands, etc. stay intact).
 *
 * A single blinking caret trails the most recently-typed character and
 * parks at the end once the whole heading is in.
 *
 * Respects prefers-reduced-motion: users who opt out see the fully-typed
 * heading immediately.
 */
(function(){
  'use strict';

  var started = false;

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }

  function runOnce(){
    if (started) return;
    started = true;
    typeIt();
  }

  // Cross-document View Transitions (Chromium 126+): `pagereveal` fires on
  // every navigation-into-this-document, including the first. If a VT is in
  // flight, wait for it to finish revealing so the typing isn't hidden
  // beneath the outgoing snapshot.
  if ('onpagereveal' in window){
    window.addEventListener('pagereveal', function(e){
      if (e && e.viewTransition){
        e.viewTransition.ready.then(runOnce, runOnce);
      } else {
        runOnce();
      }
    }, { once:true });
  }

  // Fallback: also kick off after DOMContentLoaded. `started` guard prevents
  // double-runs when pagereveal fires first.
  ready(function(){
    setTimeout(runOnce, 60);
  });

  function typeIt(){
    var root = document.querySelector('[data-typewriter]');
    if (!root) return;

    // Inject styles once — these live here so pages don't need to know
    // about them. The caret uses the accent variable already defined by
    // each page's palette.
    if (!document.getElementById('tw-style')){
      var st = document.createElement('style');
      st.id = 'tw-style';
      st.textContent = [
        '[data-typewriter] .tw-ch{',
        '  opacity:0; transition:opacity 70ms ease-out;',
        '}',
        '[data-typewriter] .tw-ch.tw-show{ opacity:1; }',
        '[data-typewriter] .tw-caret{',
        '  display:inline-block; width:.065em; height:.78em;',
        '  background:var(--accent, #B85C3C);',
        '  vertical-align:-0.05em; margin-left:.04em;',
        '  opacity:0; transition:opacity 120ms ease-out;',
        '  animation:tw-blink 1s steps(2) infinite;',
        '}',
        '@keyframes tw-blink{ 50%{ opacity:0 } }'
      ].join('\n');
      document.head.appendChild(st);
    }

    // If any page had a pre-baked static caret, drop it so we don't show
    // two carets during the animation.
    var preexisting = root.querySelectorAll('.caret');
    for (var c = 0; c < preexisting.length; c++) preexisting[c].remove();

    // --- Reduced motion: reveal everything immediately, no animation. ---
    if (window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      return;
    }

    // Walk all text nodes inside the root and wrap each character.
    var chars = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(function(tn){
      var text = tn.nodeValue;
      if (!text) return;
      var frag = document.createDocumentFragment();
      for (var i = 0; i < text.length; i++){
        var span = document.createElement('i');
        span.className = 'tw-ch';
        span.textContent = text.charAt(i);
        frag.appendChild(span);
        chars.push(span);
      }
      tn.parentNode.replaceChild(frag, tn);
    });

    if (!chars.length) return;

    // Single caret — gets repositioned after each revealed character.
    var caret = document.createElement('span');
    caret.className = 'tw-caret';
    chars[0].parentNode.insertBefore(caret, chars[0]);

    var idx = 0;
    function tick(){
      if (idx >= chars.length){
        // Park caret after the last character.
        var last = chars[chars.length - 1];
        last.parentNode.insertBefore(caret, last.nextSibling);
        caret.style.opacity = '1';
        return;
      }
      var el = chars[idx];
      el.classList.add('tw-show');
      el.parentNode.insertBefore(caret, el.nextSibling);
      caret.style.opacity = '1';
      idx++;

      // Cadence: base ~42ms with longer pauses after punctuation and at
      // line breaks so the three stanzas feel like three beats, not a
      // blur of letters.
      var ch = el.textContent;
      var delay = 42;
      if (ch === ' ') delay = 22;
      else if (/[.,;:!?]/.test(ch)) delay = 260;

      var nextEl = chars[idx];
      if (nextEl){
        var curLine  = el.closest('.l1, .l2, .l3');
        var nextLine = nextEl.closest('.l1, .l2, .l3');
        if (curLine && nextLine && curLine !== nextLine) delay = 380;
      }

      setTimeout(tick, delay);
    }

    // Short entrance beat after the transition settles so the first
    // character isn't swallowed by the tail of the crossfade.
    setTimeout(tick, 180);
  }
})();
