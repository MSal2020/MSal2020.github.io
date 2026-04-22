/**
 * reading-widget.js — ambient corner indicator.
 *
 * Shows: local time at the user's declared location + what they're currently
 * reading / listening to / chewing on. Data is pulled from ./reading.json so
 * the site feels inhabited — update the JSON, the widget updates everywhere.
 *
 * Behavior:
 *   - Mounts a small fixed element at bottom-left (unobtrusive).
 *   - Expands on hover/focus to show all three "now" fields.
 *   - Time updates every 30s.
 *   - Gracefully hides if reading.json can't be fetched (e.g. file:// w/ CORS).
 *   - Respects prefers-reduced-motion.
 */
(function(){
  'use strict';

  var MOUNT_ID = 'reading-widget';
  if (document.getElementById(MOUNT_ID)) return; // idempotent

  // Inject scoped styles once.
  var style = document.createElement('style');
  style.setAttribute('data-rw','1');
  style.textContent = [
    '.reading-widget{',
    '  position:fixed; left:18px; bottom:18px; z-index:60;',
    '  font-family:"JetBrains Mono",ui-monospace,monospace;',
    '  font-size:11px; letter-spacing:.04em;',
    '  color:var(--ink-soft,#5C4630);',
    '  background:rgba(251,243,223,0.72);',
    '  backdrop-filter:blur(10px) saturate(1.15);',
    '  -webkit-backdrop-filter:blur(10px) saturate(1.15);',
    '  border:1px solid var(--rule,rgba(122,94,62,.22));',
    '  border-radius:10px;',
    '  padding:8px 11px;',
    '  max-width:240px;',
    '  box-shadow:0 6px 24px rgba(20,14,8,0.06);',
    '  transition:max-width .35s cubic-bezier(.2,.7,.2,1), padding .25s ease, background-color .3s ease;',
    '  cursor:default; user-select:none;',
    '}',
    'html.dark-mode .reading-widget, [data-theme="dark"] .reading-widget{',
    '  color:var(--ink-soft,#D1B68D);',
    '  background:rgba(28,18,8,0.6);',
    '  border-color:rgba(209,182,141,.18);',
    '  box-shadow:0 6px 24px rgba(0,0,0,0.35);',
    '}',
    '.reading-widget__head{ display:flex; align-items:center; gap:8px; white-space:nowrap; }',
    '.reading-widget__dot{',
    '  width:6px; height:6px; border-radius:50%;',
    '  background:var(--accent,#B85C3C);',
    '  box-shadow:0 0 0 0 rgba(184,92,60,.55);',
    '  animation:rwPulse 2.4s ease-in-out infinite;',
    '}',
    '@keyframes rwPulse{',
    '  0%,100%{ box-shadow:0 0 0 0 rgba(184,92,60,.55); }',
    '  50%   { box-shadow:0 0 0 7px rgba(184,92,60,0);  }',
    '}',
    '@media (prefers-reduced-motion: reduce){ .reading-widget__dot{ animation:none } }',
    '.reading-widget__time{ font-weight:500; color:var(--ink,#2a2118); }',
    'html.dark-mode .reading-widget__time, [data-theme="dark"] .reading-widget__time{ color:var(--ink,#F0E4CC); }',
    '.reading-widget__sep{ opacity:.5; }',
    '.reading-widget__body{',
    '  max-height:0; overflow:hidden;',
    '  transition:max-height .4s cubic-bezier(.2,.7,.2,1), margin-top .3s ease;',
    '}',
    '.reading-widget:hover .reading-widget__body,',
    '.reading-widget:focus-within .reading-widget__body,',
    '.reading-widget.is-open .reading-widget__body{',
    '  max-height:260px; margin-top:8px;',
    '}',
    '.reading-widget:hover, .reading-widget:focus-within, .reading-widget.is-open{ max-width:340px; }',
    '.reading-widget__row{',
    '  display:flex; gap:8px; align-items:baseline;',
    '  padding:4px 0; line-height:1.35;',
    '  border-top:1px dashed var(--rule,rgba(122,94,62,.18));',
    '}',
    '.reading-widget__row:first-child{ border-top:0; }',
    '.reading-widget__label{',
    '  flex:0 0 auto; width:52px;',
    '  text-transform:uppercase; font-size:9px; letter-spacing:.12em;',
    '  color:var(--ink-softest,#7A5E3E); opacity:.85;',
    '}',
    '.reading-widget__val{ flex:1; min-width:0; font-family:"Inter",system-ui,sans-serif; font-size:12px; color:var(--ink,#2a2118); }',
    'html.dark-mode .reading-widget__val,[data-theme="dark"] .reading-widget__val{ color:var(--ink,#F0E4CC); }',
    '.reading-widget__val a{ color:inherit; border-bottom:1px solid currentColor; padding-bottom:1px; }',
    '.reading-widget__val a:hover{ color:var(--accent,#B85C3C); }',
    '.reading-widget__meta{ font-style:italic; opacity:.7; font-size:11px; }',
    '@media (max-width:640px){',
    '  .reading-widget{ left:12px; bottom:12px; font-size:10px; padding:6px 9px; }',
    '  .reading-widget:hover,.reading-widget:focus-within,.reading-widget.is-open{ max-width:82vw; }',
    '}',
    '@media print{ .reading-widget{ display:none } }'
  ].join('\n');
  document.head.appendChild(style);

  var root = document.createElement('aside');
  root.id = MOUNT_ID;
  root.className = 'reading-widget';
  root.setAttribute('aria-label', 'Now — local time and current reading');
  root.tabIndex = 0;
  root.innerHTML =
    '<div class="reading-widget__head">' +
      '<span class="reading-widget__dot" aria-hidden="true"></span>' +
      '<span class="reading-widget__time" data-rw-time>—:—</span>' +
      '<span class="reading-widget__sep">·</span>' +
      '<span data-rw-loc>…</span>' +
    '</div>' +
    '<div class="reading-widget__body" data-rw-body></div>';

  function ready(cb){
    if (document.body) cb();
    else document.addEventListener('DOMContentLoaded', cb, { once:true });
  }

  ready(function(){
    document.body.appendChild(root);

    var timeEl = root.querySelector('[data-rw-time]');
    var locEl  = root.querySelector('[data-rw-loc]');
    var bodyEl = root.querySelector('[data-rw-body]');

    var tz = 'UTC', loc = '';
    function paintTime(){
      try {
        var now = new Date();
        var fmt = new Intl.DateTimeFormat([], {
          timeZone: tz, hour:'2-digit', minute:'2-digit', hour12:false
        });
        timeEl.textContent = fmt.format(now);
      } catch(e){
        timeEl.textContent = new Date().toTimeString().slice(0,5);
      }
    }

    function linkOrText(obj, fallbackText){
      if (!obj) return '<span class="reading-widget__meta">—</span>';
      var text = fallbackText(obj);
      if (obj.url) return '<a href="'+escape(obj.url)+'" target="_blank" rel="noopener">'+escape(text)+'</a>';
      return escape(text);
    }
    function escape(s){
      return String(s||'').replace(/[&<>"']/g, function(c){
        return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c];
      });
    }

    function render(data){
      tz  = data.timezone || tz;
      loc = data.location || '';
      locEl.textContent = loc;
      paintTime();

      var rows = [];
      if (data.nowPlaying){
        rows.push({
          label: 'Hearing',
          html:  linkOrText(data.nowPlaying, function(o){ return o.title + (o.artist ? ' — ' + o.artist : ''); })
        });
      }
      if (data.reading){
        rows.push({
          label: 'Reading',
          html:  linkOrText(data.reading, function(o){ return o.title + (o.author ? ' — ' + o.author : ''); })
        });
      }
      if (data.paper){
        rows.push({
          label: 'Paper',
          html:  linkOrText(data.paper, function(o){ return o.title + (o.authors ? ' — ' + o.authors : ''); })
        });
      }
      if (data.coords){
        rows.push({ label: 'Coords', html: '<span class="reading-widget__meta">'+escape(data.coords)+'</span>' });
      }
      bodyEl.innerHTML = rows.map(function(r){
        return '<div class="reading-widget__row">' +
                 '<span class="reading-widget__label">'+r.label+'</span>' +
                 '<span class="reading-widget__val">'+r.html+'</span>' +
               '</div>';
      }).join('');
    }

    fetch('reading.json', { cache: 'no-cache' })
      .then(function(r){ if (!r.ok) throw new Error('no reading.json'); return r.json(); })
      .then(render)
      .catch(function(){
        // Graceful hide if file can't be fetched (e.g. opened via file://).
        root.remove();
      });

    // Tick every 30s.
    setInterval(paintTime, 30 * 1000);

    // Mobile: tap-to-toggle (no hover).
    root.addEventListener('click', function(){
      if (window.matchMedia('(hover: none)').matches){
        root.classList.toggle('is-open');
      }
    });

    // Collapse the panel on scroll — gives touch users a natural way out
    // without needing a close affordance. Only acts on no-hover devices
    // so a desktop user's scroll doesn't fight their hover-to-expand.
    window.addEventListener('scroll', function(){
      if (!root.classList.contains('is-open')) return;
      if (!window.matchMedia('(hover: none)').matches) return;
      root.classList.remove('is-open');
    }, { passive:true });
  });
})();
