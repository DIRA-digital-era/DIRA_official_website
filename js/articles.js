(function () {
  'use strict';

  const STORAGE_KEY = 'dira_articles';
  const DEFAULT_IMAGE = './images/photos/IMG_9933.jpg';

  function readArticles() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return Array.isArray(stored) ? stored.filter(article => !article.isSeed) : [];
    } catch (error) { return []; }
  }
  function writeArticles(articles) { localStorage.setItem(STORAGE_KEY, JSON.stringify(articles)); }
  function escapeHtml(value) { const element = document.createElement('div'); element.textContent = value == null ? '' : String(value); return element.innerHTML; }
  function articlesSorted() { return readArticles().sort((first, second) => (second.createdAt || second.date || '').localeCompare(first.createdAt || first.date || '')); }
  function articleCard(article) {
    return `<article class="article-card"><div class="article-img-wrap"><img src="${escapeHtml(article.image || DEFAULT_IMAGE)}" alt="${escapeHtml(article.title)}" onerror="this.src='${DEFAULT_IMAGE}'"><span class="article-badge">${escapeHtml(article.category)}</span></div><div class="article-content"><div class="article-meta"><span>${escapeHtml(article.date)}</span><span>&middot;</span><span>${escapeHtml(article.readTime || '4 min read')}</span></div><h2 class="article-title">${escapeHtml(article.title)}</h2><p class="article-excerpt">${escapeHtml(article.excerpt)}</p><div class="article-footer"><a class="article-read-btn" href="article.html?slug=${encodeURIComponent(article.slug)}">Read article &rarr;</a></div></div></article>`;
  }
  function renderGrid(grid, articles) { if (grid) grid.innerHTML = articles.length ? articles.map(articleCard).join('') : '<p class="article-not-found">No articles match your search.</p>'; }
  function renderArticleReader() {
    const reader = document.getElementById('articleReader'); if (!reader) return;
    const slug = new URLSearchParams(window.location.search).get('slug');
    const article = articlesSorted().find(item => item.slug === slug);
    if (!article) { reader.innerHTML = '<div class="article-not-found"><h1>Article not found</h1><p>The article may have been removed or the link is incomplete.</p><a class="reader-cta-btn" href="http://localhost:3000/articles.html">Browse articles</a></div>'; return; }
    document.title = `${article.title} | DIRA`;
    reader.innerHTML = `<div class="reader-header"><span class="reader-badge">${escapeHtml(article.category)}</span><h1>${escapeHtml(article.title)}</h1><div class="reader-meta"><span>${escapeHtml(article.author || 'DIRA Team')}</span><span>&middot;</span><span>${escapeHtml(article.date)}</span><span>&middot;</span><span>${escapeHtml(article.readTime || '4 min read')}</span></div></div><div class="reader-featured-img"><img src="${escapeHtml(article.image || DEFAULT_IMAGE)}" alt="${escapeHtml(article.title)}" onerror="this.src='${DEFAULT_IMAGE}'"></div><div class="reader-prose">${article.content}</div><div class="reader-tags">${(article.tags || []).map(tag => `<span class="reader-tag">${escapeHtml(tag)}</span>`).join('')}</div>`;
  }

  const api = {
    getAll: async () => articlesSorted(),
    getCustomOnly: async () => articlesSorted(),
    getBySlug: async slug => articlesSorted().find(article => article.slug === slug) || null,
    createArticle: async data => {
      const articles = readArticles();
      const article = { ...data, id: `article-${Date.now()}`, createdAt: new Date().toISOString() };
      if (articles.some(item => item.slug === article.slug)) throw new Error('An article with this slug already exists.');
      articles.unshift(article); writeArticles(articles); return article;
    },
    deleteArticle: async id => writeArticles(readArticles().filter(article => article.id !== id))
  };
  window.DiraArticles = { api };

  function initialize() {
    const grid = document.getElementById('articlesGrid'); const recentGrid = document.getElementById('recentArticlesGrid'); const searchInput = document.getElementById('articleSearchInput'); let activeCategory = 'All';
    function refreshGrid() {
      const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
      renderGrid(grid, articlesSorted().filter(article => (activeCategory === 'All' || article.category === activeCategory) && (!query || `${article.title} ${article.excerpt} ${(article.tags || []).join(' ')}`.toLowerCase().includes(query))));
    }
    if (grid) { refreshGrid(); document.querySelectorAll('.category-filter-btn').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.category-filter-btn').forEach(item => item.classList.remove('active')); button.classList.add('active'); activeCategory = button.dataset.category || 'All'; refreshGrid(); })); if (searchInput) searchInput.addEventListener('input', refreshGrid); }
    if (recentGrid) renderGrid(recentGrid, articlesSorted().slice(0, 3));
    renderArticleReader();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize); else initialize();
})();