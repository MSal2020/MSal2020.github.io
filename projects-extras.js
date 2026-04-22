/**
 * projects-extras.js — View switcher, Workshop Ledger, and Blueprint Mode
 * for the projects page. Activates only when the expected DOM is present.
 *
 * Modes:
 *   cards     — default grid (existing markup)
 *   ledger    — dense sortable table rendered from the same card data
 *   blueprint — body class that flips the page into engineering-drawing
 *               aesthetic; can be combined with cards or ledger
 *
 * Preferences persist in localStorage.
 */
(function(){
  'use strict';

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }

  ready(function(){
    var container = document.getElementById('projects-container');
    var filterNav = document.querySelector('.filter-wrapper');
    if (!container || !filterNav) return;   // not on projects page

    // ---------- extract project data from DOM (one source of truth) ----------
    var cards = Array.prototype.slice.call(container.querySelectorAll('.project-card'));
    var projects = cards.map(function(card){
      var id = card.getAttribute('data-project') || '';
      var category = (card.getAttribute('data-category') || '').trim();
      var title = (card.querySelector('h3') || {}).textContent || id;
      var subtitle = (card.querySelector('.project-subtitle') || {}).textContent || '';
      var desc = (card.querySelector('.project-description') || {}).textContent || '';
      var tags = Array.prototype.map.call(
        card.querySelectorAll('.project-tag'),
        function(t){ return t.textContent.trim(); }
      );
      // Heuristic year: try to infer from known ids, else mark as —.
      var year = inferYear(id);
      return {
        id: id, title: title.trim(), subtitle: subtitle.trim(),
        desc: desc.trim(), tags: tags, category: category, year: year,
        cardEl: card
      };
    });

    function inferYear(id){
      var map = {
        'llm-red-team': '2024',
        'mega-ttt': '2024',
        'personal-website': '2024'
      };
      return map[id] || '—';
    }

    // ---------- build view-switch UI ----------
    var switcher = document.createElement('div');
    switcher.className = 'view-switch';
    switcher.innerHTML =
      '<button type="button" data-mode="cards"     class="vs-btn is-active" aria-pressed="true">' +
        '<span class="vs-ico">◇</span> Cards' +
      '</button>' +
      '<button type="button" data-mode="ledger"    class="vs-btn" aria-pressed="false">' +
        '<span class="vs-ico">⌗</span> Ledger' +
      '</button>' +
      '<button type="button" id="vs-blueprint" class="vs-btn vs-blueprint" aria-pressed="false" title="Toggle blueprint aesthetic">' +
        '<span class="vs-ico">⚡</span> Blueprint' +
      '</button>';
    filterNav.parentNode.insertBefore(switcher, filterNav);

    // ---------- build ledger container (empty until shown) ----------
    var ledger = document.createElement('section');
    ledger.className = 'workshop-ledger';
    ledger.setAttribute('aria-label', 'Workshop ledger');
    ledger.innerHTML =
      '<header class="wl-head">' +
        '<span class="wl-mark">№</span>' +
        '<span class="wl-title">The Workshop Ledger</span>' +
        '<span class="wl-sub">' + projects.length + ' entries</span>' +
      '</header>' +
      '<div class="wl-scroll">' +
        '<table class="wl-table">' +
          '<thead><tr>' +
            '<th data-sort="idx"     class="wl-th"><span>№</span></th>' +
            '<th data-sort="year"    class="wl-th"><span>Year ⇅</span></th>' +
            '<th data-sort="title"   class="wl-th"><span>Project ⇅</span></th>' +
            '<th data-sort="category" class="wl-th"><span>Domain ⇅</span></th>' +
            '<th data-sort="tags"    class="wl-th"><span>Tools</span></th>' +
          '</tr></thead>' +
          '<tbody></tbody>' +
        '</table>' +
      '</div>';
    container.parentNode.insertBefore(ledger, container.nextSibling);

    var tbody = ledger.querySelector('tbody');
    var sortState = { key: 'idx', dir: 1 };

    function renderLedger(activeFilter){
      var rows = projects.slice();
      if (activeFilter && activeFilter !== 'all'){
        rows = rows.filter(function(p){
          return (p.category || '').indexOf(activeFilter) !== -1;
        });
      }
      rows.sort(function(a,b){
        var k = sortState.key, d = sortState.dir;
        if (k === 'idx') return (projects.indexOf(a) - projects.indexOf(b)) * d;
        if (k === 'tags') return (a.tags.length - b.tags.length) * d;
        var av = String(a[k] || '').toLowerCase();
        var bv = String(b[k] || '').toLowerCase();
        return (av < bv ? -1 : av > bv ? 1 : 0) * d;
      });

      tbody.innerHTML = rows.map(function(p, i){
        return '<tr class="wl-row" data-id="' + p.id + '">' +
                 '<td class="wl-n">' + String(i+1).padStart(2, '0') + '</td>' +
                 '<td class="wl-year">' + escapeHtml(p.year) + '</td>' +
                 '<td class="wl-title-cell">' +
                   '<div class="wl-t">' + escapeHtml(p.title) + '</div>' +
                   '<div class="wl-st">' + escapeHtml(p.subtitle) + '</div>' +
                 '</td>' +
                 '<td class="wl-cat">' +
                    p.category.split(/\s+/).filter(Boolean).map(function(c){
                      return '<span class="wl-chip">' + escapeHtml(c) + '</span>';
                    }).join(' ') +
                 '</td>' +
                 '<td class="wl-tools">' +
                    p.tags.map(function(t){
                      return '<span class="wl-tool">' + escapeHtml(t) + '</span>';
                    }).join('') +
                 '</td>' +
               '</tr>';
      }).join('') || '<tr><td colspan="5" class="wl-empty">No entries under this filter.</td></tr>';

      Array.prototype.forEach.call(tbody.querySelectorAll('.wl-row'), function(row){
        row.addEventListener('click', function(){
          var id = row.getAttribute('data-id');
          if (typeof window.openProjectPopup === 'function') window.openProjectPopup(id);
        });
      });
    }

    // Hook header sort clicks
    Array.prototype.forEach.call(ledger.querySelectorAll('.wl-th[data-sort]'), function(th){
      th.addEventListener('click', function(){
        var k = th.getAttribute('data-sort');
        if (sortState.key === k) sortState.dir *= -1;
        else { sortState.key = k; sortState.dir = 1; }
        renderLedger(currentFilter());
      });
    });

    function currentFilter(){
      var a = document.querySelector('.filter-menu a.active');
      return a ? a.getAttribute('data-filter') : 'all';
    }

    // Re-render ledger whenever filter changes.
    document.querySelectorAll('.filter-menu a').forEach(function(a){
      a.addEventListener('click', function(){
        // Defer so the existing filter handler runs first.
        setTimeout(function(){ renderLedger(currentFilter()); }, 0);
      });
    });

    // ---------- mode switching ----------
    var STORAGE_VIEW = 'projects:view';
    var STORAGE_BLUE = 'projects:blueprint';
    var currentView = localStorage.getItem(STORAGE_VIEW) || 'cards';
    var blueprintOn = localStorage.getItem(STORAGE_BLUE) === '1';

    function applyView(mode){
      currentView = mode;
      localStorage.setItem(STORAGE_VIEW, mode);
      container.hidden = (mode !== 'cards');
      ledger.hidden   = (mode !== 'ledger');
      Array.prototype.forEach.call(switcher.querySelectorAll('[data-mode]'), function(b){
        var active = b.getAttribute('data-mode') === mode;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (mode === 'ledger') renderLedger(currentFilter());
    }

    function applyBlueprint(on){
      blueprintOn = !!on;
      localStorage.setItem(STORAGE_BLUE, on ? '1' : '0');
      document.body.classList.toggle('blueprint-mode', blueprintOn);
      var btn = document.getElementById('vs-blueprint');
      if (btn){
        btn.classList.toggle('is-active', blueprintOn);
        btn.setAttribute('aria-pressed', blueprintOn ? 'true' : 'false');
      }
    }

    switcher.addEventListener('click', function(e){
      var b = e.target.closest('[data-mode]');
      if (b){ applyView(b.getAttribute('data-mode')); return; }
      if (e.target.closest('#vs-blueprint')){ applyBlueprint(!blueprintOn); }
    });

    applyView(currentView);
    applyBlueprint(blueprintOn);
  });

  function escapeHtml(s){
    return String(s||'').replace(/[&<>"']/g, function(c){
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c];
    });
  }
})();
