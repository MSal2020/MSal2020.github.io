/**
 * command-palette.js — universal ⌘K / Ctrl-K fuzzy search.
 *
 * Builds an index at load time from whatever sources are available on the
 * current page:
 *   - Static nav + actions (always)
 *   - Notes (if window.notesData is loaded)
 *   - Projects (if project-card elements exist in the DOM)
 *
 * Keyboard:
 *   ⌘K / Ctrl-K  open
 *   Esc          close
 *   ↑ / ↓        move selection
 *   Enter        activate
 */
(function(){
  'use strict';

  if (document.getElementById('cmdk-root')) return;

  // ---------- styles ----------
  var style = document.createElement('style');
  style.setAttribute('data-cmdk','1');
  style.textContent = [
    '.cmdk-backdrop{',
    '  position:fixed; inset:0; z-index:9000;',
    '  background:rgba(20,14,8,0.32);',
    '  backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);',
    '  opacity:0; pointer-events:none;',
    '  transition:opacity .2s ease;',
    '  display:flex; align-items:flex-start; justify-content:center;',
    '  padding-top:14vh;',
    '}',
    '.cmdk-backdrop.open{ opacity:1; pointer-events:auto; }',
    'html.dark-mode .cmdk-backdrop, [data-theme="dark"] .cmdk-backdrop{ background:rgba(0,0,0,0.55); }',
    '.cmdk-panel{',
    '  width:min(960px, 94vw); max-height:72vh; display:flex; flex-direction:column;',
    '  background:var(--paper,#FBF3DF);',
    '  color:var(--ink,#2a2118);',
    '  border:1px solid var(--rule,rgba(122,94,62,.28));',
    '  border-radius:14px; overflow:hidden;',
    '  box-shadow:0 30px 80px rgba(20,14,8,.28), 0 2px 0 rgba(255,255,255,.35) inset;',
    '  transform:translateY(-10px) scale(.98); opacity:0;',
    '  transition:transform .22s cubic-bezier(.2,.7,.2,1), opacity .22s ease;',
    '  font-family:"Inter",system-ui,sans-serif;',
    '}',
    'html.dark-mode .cmdk-panel, [data-theme="dark"] .cmdk-panel{',
    '  background:#1a1108; color:var(--ink,#F0E4CC);',
    '  border-color:rgba(209,182,141,.18);',
    '  box-shadow:0 30px 80px rgba(0,0,0,.6);',
    '}',
    '.cmdk-backdrop.open .cmdk-panel{ transform:translateY(0) scale(1); opacity:1; }',
    '.cmdk-head{',
    '  display:flex; align-items:center; gap:10px;',
    '  padding:14px 16px; border-bottom:1px solid var(--rule,rgba(122,94,62,.22));',
    '}',
    '.cmdk-kbd{',
    '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:10px;',
    '  letter-spacing:.08em; text-transform:uppercase;',
    '  color:var(--ink-softest,#7A5E3E); opacity:.8;',
    '}',
    '.cmdk-input{',
    '  flex:1; border:0; outline:0; background:transparent;',
    '  font:500 17px/1.3 "Inter",system-ui,sans-serif;',
    '  color:inherit; padding:4px 0;',
    '}',
    '.cmdk-input::placeholder{ color:var(--ink-softest,#7A5E3E); opacity:.65; }',
    // Two-column body: list on the left, live preview on the right.
    '.cmdk-body-wrap{ display:flex; flex:1; min-height:0; }',
    '.cmdk-list{ flex:0 0 360px; overflow-y:auto; padding:6px 0; border-right:1px solid var(--rule,rgba(122,94,62,.22)); }',
    '@media (max-width:820px){ .cmdk-list{ flex:1; border-right:0 } .cmdk-preview{ display:none } }',
    '.cmdk-list::-webkit-scrollbar{ width:8px }',
    '.cmdk-list::-webkit-scrollbar-thumb{ background:var(--rule,rgba(122,94,62,.3)); border-radius:4px }',
    '.cmdk-group{',
    '  padding:10px 18px 4px;',
    '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:10px;',
    '  letter-spacing:.14em; text-transform:uppercase;',
    '  color:var(--ink-softest,#7A5E3E); opacity:.75;',
    '}',
    '.cmdk-row{',
    '  display:flex; align-items:center; gap:12px;',
    '  padding:10px 16px; cursor:pointer;',
    '  border-left:2px solid transparent;',
    '  transition:background-color .15s ease, border-color .15s ease;',
    '}',
    '.cmdk-row:hover, .cmdk-row.is-active{',
    '  background:rgba(184,92,60,.08);',
    '  border-left-color:var(--accent,#B85C3C);',
    '}',
    'html.dark-mode .cmdk-row:hover, html.dark-mode .cmdk-row.is-active,',
    '[data-theme="dark"] .cmdk-row:hover, [data-theme="dark"] .cmdk-row.is-active{',
    '  background:rgba(224,137,108,.10);',
    '}',
    '.cmdk-icon{',
    '  width:28px; height:28px; flex:0 0 28px;',
    '  display:flex; align-items:center; justify-content:center;',
    '  border:1px solid var(--rule,rgba(122,94,62,.22)); border-radius:7px;',
    '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:11px; font-weight:700;',
    '  color:var(--accent,#B85C3C); background:rgba(255,255,255,.35);',
    '}',
    'html.dark-mode .cmdk-icon, [data-theme="dark"] .cmdk-icon{ background:rgba(255,255,255,.04); color:var(--accent,#E0896C); }',
    '.cmdk-body{ flex:1; min-width:0; }',
    '.cmdk-title{ font-size:14.5px; font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }',
    '.cmdk-title mark{ background:rgba(237,183,77,.45); color:inherit; padding:0 1px; border-radius:2px; }',
    '.cmdk-sub{',
    '  font-size:12px; color:var(--ink-softest,#7A5E3E);',
    '  overflow:hidden; text-overflow:ellipsis; white-space:nowrap;',
    '  margin-top:1px;',
    '}',
    '.cmdk-hint{',
    '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:10px;',
    '  letter-spacing:.08em; color:var(--ink-softest,#7A5E3E); opacity:.7;',
    '}',
    '.cmdk-foot{',
    '  display:flex; gap:18px; justify-content:flex-end;',
    '  padding:9px 16px; border-top:1px solid var(--rule,rgba(122,94,62,.22));',
    '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:10px;',
    '  letter-spacing:.08em; color:var(--ink-softest,#7A5E3E);',
    '}',
    '.cmdk-empty{',
    '  padding:40px 20px; text-align:center;',
    '  font-style:italic; color:var(--ink-softest,#7A5E3E); font-size:14px;',
    '}',
    // Preview pane.
    '.cmdk-preview{',
    '  flex:1; min-width:0; padding:22px 26px; overflow-y:auto;',
    '  display:flex; flex-direction:column; gap:14px;',
    '  background:linear-gradient(180deg, rgba(184,92,60,.03), transparent 40%);',
    '}',
    'html.dark-mode .cmdk-preview{ background:linear-gradient(180deg, rgba(224,137,108,.04), transparent 40%); }',
    '.cmdk-prev-kicker{',
    '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:10px;',
    '  letter-spacing:.16em; text-transform:uppercase;',
    '  color:var(--accent,#B85C3C);',
    '}',
    '.cmdk-prev-title{',
    '  font-family:"Fraunces",serif; font-weight:400; font-size:24px;',
    '  line-height:1.2; color:var(--ink,#2a2118); letter-spacing:-.01em;',
    '}',
    '.cmdk-prev-sub{',
    '  font-size:13px; color:var(--ink-softest,#7A5E3E);',
    '  font-style:italic;',
    '}',
    '.cmdk-prev-cover{',
    '  width:100%; max-height:220px; object-fit:contain;',
    '  border-radius:6px; background:rgba(255,255,255,.4);',
    '  padding:14px; align-self:flex-start;',
    '}',
    'html.dark-mode .cmdk-prev-cover{ background:rgba(255,255,255,.04) }',
    '.cmdk-prev-quote{',
    '  font-family:"Fraunces",serif; font-style:italic; font-weight:300;',
    '  font-size:15px; line-height:1.55; color:var(--ink,#2a2118);',
    '  padding-left:14px; border-left:3px solid var(--accent,#B85C3C);',
    '}',
    '.cmdk-prev-desc{',
    '  font-size:13.5px; line-height:1.55; color:var(--ink-soft,#5C4630);',
    '}',
    '.cmdk-prev-meta{',
    '  display:flex; gap:10px; flex-wrap:wrap;',
    '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:10px;',
    '  letter-spacing:.1em; text-transform:uppercase;',
    '  color:var(--ink-softest,#7A5E3E);',
    '}',
    '.cmdk-prev-meta span{',
    '  padding:3px 8px; border:1px solid var(--rule,rgba(122,94,62,.22));',
    '  border-radius:999px;',
    '}',
    '.cmdk-prev-badge{',
    '  width:72px; height:72px; display:flex; align-items:center; justify-content:center;',
    '  border:1px solid var(--rule,rgba(122,94,62,.22)); border-radius:14px;',
    '  font-family:"Fraunces",serif; font-size:34px; color:var(--accent,#B85C3C);',
    '  background:rgba(255,255,255,.35);',
    '}',
    'html.dark-mode .cmdk-prev-badge{ background:rgba(255,255,255,.04) }',
    '.cmdk-prev-hint{',
    '  margin-top:auto; padding-top:10px;',
    '  border-top:1px dashed var(--rule,rgba(122,94,62,.22));',
    '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:10px;',
    '  letter-spacing:.1em; text-transform:uppercase;',
    '  color:var(--ink-softest,#7A5E3E);',
    '  display:flex; justify-content:space-between;',
    '}',
    '.cmdk-prev-empty{',
    '  color:var(--ink-softest,#7A5E3E); font-style:italic; font-size:13px;',
    '  text-align:center; margin:auto;',
    '}',
    // Trigger hint (bottom-right corner, mirrors the reading-widget)
    '.cmdk-trigger{',
    '  position:fixed; right:18px; bottom:18px; z-index:60;',
    '  display:inline-flex; align-items:center; gap:8px;',
    '  padding:7px 11px; border-radius:10px;',
    '  background:rgba(251,243,223,0.72);',
    '  backdrop-filter:blur(10px) saturate(1.15);',
    '  -webkit-backdrop-filter:blur(10px) saturate(1.15);',
    '  border:1px solid var(--rule,rgba(122,94,62,.22));',
    '  color:var(--ink-soft,#5C4630);',
    '  font-family:"JetBrains Mono",ui-monospace,monospace; font-size:10.5px; letter-spacing:.06em;',
    '  cursor:pointer; transition:transform .2s ease, background-color .2s ease;',
    '}',
    '.cmdk-trigger:hover{ transform:translateY(-1px); }',
    'html.dark-mode .cmdk-trigger, [data-theme="dark"] .cmdk-trigger{',
    '  background:rgba(28,18,8,0.6); color:var(--ink-soft,#D1B68D);',
    '  border-color:rgba(209,182,141,.18);',
    '}',
    '.cmdk-trigger .cmdk-k{',
    '  display:inline-flex; align-items:center; justify-content:center;',
    '  min-width:16px; padding:2px 5px; border-radius:4px;',
    '  background:var(--accent,#B85C3C); color:#FBF3DF; font-size:9.5px; font-weight:700;',
    '}',
    '@media (max-width:640px){',
    '  .cmdk-trigger{ display:none }',
    '  .cmdk-backdrop{ padding-top:8vh }',
    '}',
    '@media print{ .cmdk-trigger, .cmdk-backdrop{ display:none !important } }'
  ].join('\n');
  document.head.appendChild(style);

  // ---------- index builders ----------
  function textOnly(html){
    var tmp = document.createElement('div');
    tmp.innerHTML = String(html || '');
    return tmp.textContent.replace(/\s+/g, ' ').trim();
  }

  function buildStaticActions(){
    function badge(icon){
      return function(){
        return {
          kicker: 'Shortcut',
          title:  this.title,
          sub:    this.sub,
          badge:  icon
        };
      };
    }
    return [
      { group:'Go',     title:'Home',        sub:'A field guide',    icon:'H', preview: badge('☼'),
        action:function(){ location.href = 'index.html'; } },
      { group:'Go',     title:'Resume',      sub:'In practice',      icon:'R', preview: badge('✒'),
        action:function(){ location.href = 'resume.html'; } },
      { group:'Go',     title:'Notes',       sub:'Books & margins',  icon:'N', preview: badge('§'),
        action:function(){ location.href = 'notes.html'; } },
      { group:'Go',     title:'Projects',    sub:'The workshop',     icon:'P', preview: badge('⚒'),
        action:function(){ location.href = 'projects.html'; } },
      { group:'Action', title:'Toggle theme',sub:'Light / dark',     icon:'◑', preview: badge('◑'),
        action:function(){
          var t = document.getElementById('mode-switch');
          if (t){ t.checked = !t.checked; t.dispatchEvent(new Event('change', { bubbles:true })); }
        } },
      { group:'Action', title:'Scroll to top', sub:'\u2318\u2191', icon:'↑', preview: badge('↑'),
        action:function(){ window.scrollTo({ top:0, behavior:'smooth' }); } },
      { group:'External', title:'GitHub',   sub:'github.com/MSal2020', icon:'↗', preview: badge('⚙'),
        action:function(){ window.open('https://github.com/MSal2020','_blank','noopener'); } },
      { group:'External', title:'LinkedIn', sub:'Professional',        icon:'↗', preview: badge('in'),
        action:function(){ window.open('https://www.linkedin.com/in/salmaan-nusrath/','_blank','noopener'); } }
    ];
  }

  function buildNotesIndex(){
    if (typeof window.notesData === 'undefined' && typeof notesData === 'undefined') return [];
    var data = window.notesData || notesData;
    if (!Array.isArray(data)) return [];
    var dark = document.documentElement.classList.contains('dark-mode');
    return data.map(function(n, i){
      return {
        group: 'Notes',
        title: n.title,
        sub:   (n.category || 'Book') + (n.author ? ' — ' + n.author : ''),
        icon:  '§',
        preview: function(){
          var cover = n.image && (dark ? n.image.dark : n.image.light);
          return {
            kicker: 'Note · ' + (n.category || 'Book'),
            title:  n.title,
            sub:    n.author ? 'by ' + n.author : '',
            cover:  cover || null,
            quote:  n.quote || '',
            desc:   n.desc || ''
          };
        },
        action: function(){
          if (location.pathname.indexOf('notes.html') === -1){
            // Navigate there with an anchor-ish hint (shelf reads it via hash).
            location.href = 'notes.html#note-' + i;
          } else {
            // On notes page: try to open the shelf item at this index.
            var items = document.querySelectorAll('[data-note-index]');
            var target = items[i] || items[0];
            if (target && typeof target.click === 'function') target.click();
          }
        }
      };
    });
  }

  function buildProjectsIndex(){
    var cards = document.querySelectorAll('.project-card[data-project]');
    if (!cards.length && location.pathname.indexOf('projects.html') === -1){
      // Hard-coded fallback for quick-jump from other pages.
      return [
        { group:'Projects', title:'LLM Red Team & Defense Framework', sub:'Security research',    icon:'⚑', action:function(){ location.href='projects.html#p-llm-red-team'; } },
        { group:'Projects', title:'Mega Tic Tac Toe',                 sub:'Strategic multiplayer', icon:'⚑', action:function(){ location.href='projects.html#p-mega-ttt'; } },
        { group:'Projects', title:'Personal Website',                 sub:'This very site',        icon:'⚑', action:function(){ location.href='projects.html#p-personal-website'; } }
      ];
    }
    var out = [];
    cards.forEach(function(card){
      var id = card.getAttribute('data-project');
      var title = (card.querySelector('h3') || {}).textContent || id;
      var subtitleEl = card.querySelector('.project-subtitle');
      var sub = subtitleEl ? subtitleEl.textContent : (card.getAttribute('data-category') || 'project');
      var descEl = card.querySelector('.project-description, p');
      var desc = descEl ? (descEl.textContent || '').trim() : '';
      var cat = card.getAttribute('data-category') || '';
      out.push({
        group:'Projects', title:title.trim(), sub:sub.trim(), icon:'⚑',
        preview: function(){
          var data = (typeof window !== 'undefined' && window.projectsData) || (typeof projectsData !== 'undefined' ? projectsData : null);
          var meta = data && data[id] ? data[id] : null;
          return {
            kicker: 'Project · ' + (cat.split(/\s+/).filter(Boolean).join(' · ') || 'workshop'),
            title:  title.trim(),
            sub:    (meta && meta.subtitle) || sub.trim(),
            desc:   (meta && meta.description) || desc,
            tags:   (meta && meta.tags) || cat.split(/\s+/).filter(Boolean)
          };
        },
        action: function(){
          if (typeof window.openProjectPopup === 'function') window.openProjectPopup(id);
          else card.click();
        }
      });
    });
    return out;
  }

  function buildIndex(){
    return [].concat(
      buildProjectsIndex(),
      buildNotesIndex(),
      buildStaticActions()
    );
  }

  // ---------- fuzzy scorer ----------
  function scoreMatch(query, str){
    if (!query) return 1;
    var q = query.toLowerCase(), s = str.toLowerCase();
    var qi = 0, si = 0, score = 0, streak = 0, firstIdx = -1;
    while (qi < q.length && si < s.length){
      if (q[qi] === s[si]){
        if (firstIdx < 0) firstIdx = si;
        streak++; score += 1 + streak * 0.5;
        qi++;
      } else {
        streak = 0;
      }
      si++;
    }
    if (qi < q.length) return 0;  // some query chars unmatched
    // Bonus for starting near the beginning.
    score += Math.max(0, 10 - firstIdx);
    // Bonus for substring hit.
    if (s.indexOf(q) >= 0) score += 20;
    // Penalty for long strings (prefer concise titles).
    score -= Math.min(10, Math.max(0, s.length - 40) * 0.08);
    return score;
  }

  function highlight(text, query){
    if (!query) return escapeHtml(text);
    var q = query.toLowerCase();
    var t = text.toLowerCase();
    var i = t.indexOf(q);
    if (i < 0) return escapeHtml(text);
    return escapeHtml(text.slice(0, i)) +
           '<mark>' + escapeHtml(text.slice(i, i+q.length)) + '</mark>' +
           escapeHtml(text.slice(i+q.length));
  }

  function escapeHtml(s){
    return String(s||'').replace(/[&<>"']/g, function(c){
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c];
    });
  }

  // ---------- UI ----------
  var backdrop = document.createElement('div');
  backdrop.className = 'cmdk-backdrop';
  backdrop.id = 'cmdk-root';
  backdrop.innerHTML =
    '<div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="Command palette">' +
      '<div class="cmdk-head">' +
        '<span class="cmdk-kbd">⌘K</span>' +
        '<input class="cmdk-input" type="text" placeholder="Search the field guide…" aria-label="Search" spellcheck="false" autocomplete="off" />' +
      '</div>' +
      '<div class="cmdk-body-wrap">' +
        '<div class="cmdk-list" role="listbox" id="cmdk-list"></div>' +
        '<div class="cmdk-preview" id="cmdk-preview"></div>' +
      '</div>' +
      '<div class="cmdk-foot">' +
        '<span>↑↓ navigate</span>' +
        '<span>↵ open</span>' +
        '<span>esc close</span>' +
      '</div>' +
    '</div>';

  var trigger = document.createElement('button');
  trigger.className = 'cmdk-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', 'Open command palette');
  trigger.innerHTML = 'search <span class="cmdk-k">⌘K</span>';

  function mount(){
    document.body.appendChild(backdrop);
    document.body.appendChild(trigger);
    wire();
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once:true });

  var items = [];
  var filtered = [];
  var active = 0;
  var listEl, inputEl, previewEl;

  function wire(){
    listEl = backdrop.querySelector('#cmdk-list');
    previewEl = backdrop.querySelector('#cmdk-preview');
    inputEl = backdrop.querySelector('.cmdk-input');
    items = buildIndex();

    trigger.addEventListener('click', open);
    backdrop.addEventListener('click', function(e){
      if (e.target === backdrop) close();
    });

    inputEl.addEventListener('input', render);
    inputEl.addEventListener('keydown', function(e){
      if (e.key === 'ArrowDown'){ e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp'){ e.preventDefault(); move(-1); }
      else if (e.key === 'Enter'){ e.preventDefault(); activate(); }
      else if (e.key === 'Escape'){ e.preventDefault(); close(); }
    });

    document.addEventListener('keydown', function(e){
      var mod = e.metaKey || e.ctrlKey;
      if (mod && (e.key === 'k' || e.key === 'K')){
        e.preventDefault();
        if (backdrop.classList.contains('open')) close(); else open();
      } else if (e.key === '/' && !isEditable(document.activeElement) && !backdrop.classList.contains('open')){
        e.preventDefault(); open();
      }
    });
  }

  function isEditable(el){
    if (!el) return false;
    var tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
  }

  function open(){
    // Rebuild index in case the DOM has changed (e.g. after filters).
    items = buildIndex();
    backdrop.classList.add('open');
    inputEl.value = '';
    setTimeout(function(){ inputEl.focus(); }, 40);
    render();
  }

  function close(){
    backdrop.classList.remove('open');
    inputEl.blur();
  }

  function render(){
    var q = (inputEl.value || '').trim();
    var scored = items
      .map(function(it){
        var s = scoreMatch(q, it.title) * 1.5 + scoreMatch(q, it.sub) * 0.8 + scoreMatch(q, it.group) * 0.3;
        return { it: it, s: s };
      })
      .filter(function(r){ return q ? r.s > 0 : true; })
      .sort(function(a,b){ return b.s - a.s; });

    filtered = scored.map(function(r){ return r.it; });

    if (!filtered.length){
      listEl.innerHTML = '<div class="cmdk-empty">No matches. Try another search.</div>';
      active = 0;
      return;
    }

    // Group by group name.
    var grouped = [];
    var seen = {};
    filtered.forEach(function(it){
      if (!seen[it.group]){ seen[it.group] = []; grouped.push(it.group); }
      seen[it.group].push(it);
    });

    var html = '';
    var flatIdx = 0;
    grouped.forEach(function(g){
      html += '<div class="cmdk-group">' + escapeHtml(g) + '</div>';
      seen[g].forEach(function(it){
        var i = flatIdx++;
        html += '<div class="cmdk-row" data-i="' + i + '" role="option">' +
                  '<div class="cmdk-icon">' + escapeHtml(it.icon || '·') + '</div>' +
                  '<div class="cmdk-body">' +
                    '<div class="cmdk-title">' + highlight(it.title, q) + '</div>' +
                    '<div class="cmdk-sub">' + highlight(it.sub || '', q) + '</div>' +
                  '</div>' +
                  '<span class="cmdk-hint">↵</span>' +
                '</div>';
      });
    });
    listEl.innerHTML = html;

    active = 0;
    updateActive();

    Array.prototype.forEach.call(listEl.querySelectorAll('.cmdk-row'), function(row){
      row.addEventListener('mouseenter', function(){
        active = parseInt(row.getAttribute('data-i'), 10) || 0;
        updateActive();
      });
      row.addEventListener('click', activate);
    });
  }

  function move(delta){
    if (!filtered.length) return;
    active = (active + delta + filtered.length) % filtered.length;
    updateActive();
  }

  function updateActive(){
    Array.prototype.forEach.call(listEl.querySelectorAll('.cmdk-row'), function(row){
      var i = parseInt(row.getAttribute('data-i'), 10);
      if (i === active){
        row.classList.add('is-active');
        // Scroll into view if needed.
        var r = row.getBoundingClientRect();
        var lr = listEl.getBoundingClientRect();
        if (r.bottom > lr.bottom) listEl.scrollTop += (r.bottom - lr.bottom) + 6;
        else if (r.top < lr.top)  listEl.scrollTop -= (lr.top - r.top) + 6;
      } else {
        row.classList.remove('is-active');
      }
    });
    renderPreview();
  }

  function renderPreview(){
    if (!previewEl) return;
    var it = filtered[active];
    if (!it){
      previewEl.innerHTML = '<div class="cmdk-prev-empty">Type to search, or pick an item.</div>';
      return;
    }
    var p;
    try { p = typeof it.preview === 'function' ? it.preview.call(it) : null; }
    catch(e){ p = null; }
    if (!p){
      previewEl.innerHTML =
        '<div class="cmdk-prev-kicker">' + escapeHtml(it.group) + '</div>' +
        '<div class="cmdk-prev-title">' + escapeHtml(it.title) + '</div>' +
        (it.sub ? '<div class="cmdk-prev-sub">' + escapeHtml(it.sub) + '</div>' : '') +
        '<div class="cmdk-prev-hint"><span>Enter</span><span>open</span></div>';
      return;
    }
    var html = '';
    if (p.kicker) html += '<div class="cmdk-prev-kicker">' + escapeHtml(p.kicker) + '</div>';
    if (p.badge)  html += '<div class="cmdk-prev-badge">' + escapeHtml(p.badge) + '</div>';
    if (p.title)  html += '<div class="cmdk-prev-title">' + escapeHtml(p.title) + '</div>';
    if (p.sub)    html += '<div class="cmdk-prev-sub">' + escapeHtml(p.sub) + '</div>';
    if (p.cover)  html += '<img class="cmdk-prev-cover" src="' + escapeHtml(p.cover) + '" alt="" loading="lazy" />';
    if (p.quote)  html += '<blockquote class="cmdk-prev-quote">“' + escapeHtml(p.quote) + '”</blockquote>';
    if (p.desc)   html += '<div class="cmdk-prev-desc">' + escapeHtml(trimDesc(p.desc)) + '</div>';
    if (p.tags && p.tags.length){
      html += '<div class="cmdk-prev-meta">' +
        p.tags.slice(0, 6).map(function(t){ return '<span>' + escapeHtml(t) + '</span>'; }).join('') +
      '</div>';
    }
    html += '<div class="cmdk-prev-hint"><span>' + escapeHtml(it.group) + '</span><span>↵ open</span></div>';
    previewEl.innerHTML = html;
  }

  function trimDesc(s){
    s = String(s || '').replace(/\s+/g, ' ').trim();
    return s.length > 240 ? s.slice(0, 237) + '…' : s;
  }

  function activate(){
    var it = filtered[active];
    if (!it) return;
    close();
    setTimeout(function(){ try { it.action(); } catch(e){ console.error('palette action failed', e); } }, 60);
  }
})();
