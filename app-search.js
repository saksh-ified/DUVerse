// Shared global search logic
export const SEARCH_INDEX = [
  // Links
  { title: "Home", type: "Page", url: "index.html", icon: "🏠", tags: "homepage, landing, duverse" },
  { title: "All Syllabus", type: "Page", url: "syllabus.html", icon: "📚", tags: "syllabus, subjects, courses, pdfs, downloads" },
  { title: "B.A. Programme Dashboard", type: "Page", url: "BA-Pro.html", icon: "🎓", tags: "ba prog, b.a. programme, combinations, ba" },

  // B.A. Programme Combinations (from BA-Pro.html data)
  { title: "Computer Applications + Economics", type: "B.A. Programme", url: "BA-Pro.html?q=ca-eco", icon: "💻", tags: "ca, computer, economics, science" },
  { title: "Computer Applications + Mathematics", type: "B.A. Programme", url: "BA-Pro.html?q=ca-math", icon: "💻", tags: "ca, computer, mathematics, math" },
  { title: "Economics + History", type: "B.A. Programme", url: "BA-Pro.html?q=eco-hist", icon: "📊", tags: "economics, history, social sciences" },
  { title: "Economics + Mathematics", type: "B.A. Programme", url: "BA-Pro.html?q=eco-maths", icon: "📊", tags: "economics, mathematics, math, social sciences" },
  { title: "Economics + Political Science", type: "B.A. Programme", url: "BA-Pro.html?q=eco-polsc", icon: "📊", tags: "economics, political science, pol science" },
  { title: "History + Political Science", type: "B.A. Programme", url: "BA-Pro.html?q=hist-polsc", icon: "🏛️", tags: "history, political science, pol science" },
  
  // Syllabi (from syllabus.html data)
  { title: "B.A. (Hons) Economics Syllabus", type: "Syllabus", url: "syllabus.html?q=hons-eco", icon: "📊", tags: "economics, honours, syllabus, pdf" },
  { title: "B.A. (Hons) English Syllabus", type: "Syllabus", url: "syllabus.html?q=hons-eng", icon: "📖", tags: "english, honours, syllabus, pdf" },
  { title: "B.A. (Hons) History Syllabus", type: "Syllabus", url: "syllabus.html?q=hons-his", icon: "🏛️", tags: "history, honours, syllabus, pdf" },
  { title: "B.A. (Hons) Political Science Syllabus", type: "Syllabus", url: "syllabus.html?q=hons-pol", icon: "🗳️", tags: "political science, honours, syllabus, pdf" },
  { title: "B.Com. (Hons) Syllabus", type: "Syllabus", url: "syllabus.html?q=hons-bcom", icon: "💼", tags: "bcom, commerce, honours, syllabus, pdf" },
  { title: "B.Com. (Prog) Syllabus", type: "Syllabus", url: "syllabus.html?q=prog-bcom", icon: "💼", tags: "bcom, commerce, programme, syllabus, pdf" },
  { title: "B.Sc. (Hons) Computer Science Syllabus", type: "Syllabus", url: "syllabus.html?q=hons-cs", icon: "💻", tags: "computer science, bsc, honours, syllabus, pdf" },
  { title: "B.Sc. (Hons) Mathematics Syllabus", type: "Syllabus", url: "syllabus.html?q=hons-math", icon: "📐", tags: "mathematics, math, bsc, honours, syllabus, pdf" },
  { title: "BBA (FIA) Syllabus", type: "Syllabus", url: "syllabus.html?q=mgmt-bba", icon: "📈", tags: "bba, fia, management, financial, investment, syllabus, pdf" },
  { title: "BMS Syllabus", type: "Syllabus", url: "syllabus.html?q=mgmt-bms", icon: "📊", tags: "bms, management, business, syllabus, pdf" },
  
  // Universal
  { title: "SEC, VAC, AEC Common Papers", type: "Syllabus", url: "syllabus.html?q=common-aec-sec-vac", icon: "📋", tags: "sec, vac, aec, value addition, skill enhancement, ability enhancement" }
];

export function initGlobalSearch() {
  const searchOverlay = document.getElementById('globalSearchOverlay');
  const searchInput = document.getElementById('globalSearchInput');
  const searchResults = document.getElementById('globalSearchResults');
  const triggerBtns = document.querySelectorAll('.nav-search-btn');

  if (!searchOverlay || !searchInput || !searchResults) return;

  // Render function
  function renderResults(query) {
    if (!query) {
      searchResults.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--muted); font-size: 0.85rem;">Start typing to search courses, syllabi, or pages...<br><span style="font-size: 2rem; margin-top: 1rem; display: block;">🔍</span></div>';
      return;
    }

    const q = query.toLowerCase();
    const filtered = SEARCH_INDEX.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.tags.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    ).slice(0, 8); // Max 8 results

    if (filtered.length === 0) {
      searchResults.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--muted); font-size: 0.85rem;">No results found for "'+query+'"</div>';
      return;
    }

    searchResults.innerHTML = filtered.map((item, index) => `
      <a href="${item.url}" class="search-rslt-item" style="animation-delay: ${index * 0.03}s">
        <div class="search-rslt-icon">${item.icon}</div>
        <div class="search-rslt-info">
          <div class="search-rslt-title">${item.title}</div>
          <div class="search-rslt-type">${item.type}</div>
        </div>
        <div class="search-rslt-arr">›</div>
      </a>
    `).join('');
  }

  // Open / Close
  function openSearch() {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 50);
    renderResults(searchInput.value);
  }

  function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event Listeners
  triggerBtns.forEach(btn => btn.addEventListener('click', openSearch));
  
  searchOverlay.addEventListener('click', (e) => {
    if (e.target.id === 'globalSearchOverlay' || e.target.classList.contains('search-modal-close')) {
      closeSearch();
    }
  });

  searchInput.addEventListener('input', (e) => {
    renderResults(e.target.value.trim());
  });

  // Keyboard shortcut Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (!searchOverlay.classList.contains('active')) {
        openSearch();
      } else {
        closeSearch();
      }
    }
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  // Expose close on window for inline handlers
  window.closeGlobalSearch = closeSearch;
}
