(function () {
  'use strict';

  const API_BASE = window.DIRA_API_BASE || (window.location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api');
  const DEFAULT_IMAGE = './images/photos/IMG_9933.jpg';

  async function request(path, options) {
    const response = await fetch(`${API_BASE}${path}`, options);
    const body = response.status === 204 ? null : await response.json();
    if (!response.ok) throw new Error(body && body.error ? body.error : 'Article request failed.');
    return body;
  }

  function escapeHtml(value) {
    const element = document.createElement('div');
    element.textContent = value == null ? '' : String(value);
    return element.innerHTML;
  }

  function articleCard(article) {
    return `<article class="article-card"><div class="article-img-wrap"><img src="${escapeHtml(article.image || DEFAULT_IMAGE)}" alt="${escapeHtml(article.title)}" onerror="this.src='${DEFAULT_IMAGE}'"><span class="article-badge">${escapeHtml(article.category)}</span></div><div class="article-content"><div class="article-meta"><span>${escapeHtml(article.date)}</span><span>&middot;</span><span>${escapeHtml(article.readTime || '4 min read')}</span></div><h2 class="article-title">${escapeHtml(article.title)}</h2><p class="article-excerpt">${escapeHtml(article.excerpt)}</p><div class="article-footer"><a class="article-read-btn" href="article.html?slug=${encodeURIComponent(article.slug)}">Read article &rarr;</a></div></div></article>`;
  }

  function renderGrid(grid, articles) {
    if (grid) grid.innerHTML = articles.length ? articles.map(articleCard).join('') : '<p class="article-not-found">No articles match your search.</p>';
  }

  async function getAll() { return request('/articles'); }
  async function getCustomOnly() { return getAll(); }
  async function getBySlug(slug) { return request(`/articles/${encodeURIComponent(slug)}`); }
  async function createArticle(data) {
    const options = { method: 'POST', body: data };
    if (!(data instanceof FormData)) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(data);
    }
    return request('/articles', options);
  }
  async function deleteArticle(id) { return request(`/articles/${encodeURIComponent(id)}`, { method: 'DELETE' }); }

  window.DiraArticles = { api: { getAll, getCustomOnly, getBySlug, createArticle, deleteArticle } };

  async function renderArticleReader() {
    const reader = document.getElementById('articleReader');
    if (!reader) return;
    const slug = new URLSearchParams(window.location.search).get('slug');
    try {
      const article = await getBySlug(slug);
      document.title = `${article.title} | DIRA`;
      reader.innerHTML = `<div class="reader-header"><span class="reader-badge">${escapeHtml(article.category)}</span><h1>${escapeHtml(article.title)}</h1><div class="reader-meta"><span>${escapeHtml(article.author || 'DIRA Team')}</span><span>&middot;</span><span>${escapeHtml(article.date)}</span><span>&middot;</span><span>${escapeHtml(article.readTime || '4 min read')}</span></div></div><div class="reader-featured-img"><img src="${escapeHtml(article.image || DEFAULT_IMAGE)}" alt="${escapeHtml(article.title)}" onerror="this.src='${DEFAULT_IMAGE}'"></div><div class="reader-prose">${article.content}</div><div class="reader-tags">${(article.tags || []).map(tag => `<span class="reader-tag">${escapeHtml(tag)}</span>`).join('')}</div>`;
    } catch (error) {
      reader.innerHTML = `<div class="article-not-found"><h1>Article not found</h1><p>${escapeHtml(error.message)}</p><a class="reader-cta-btn" href="http://localhost:3000/articles.html">Browse articles</a></div>`;
    }
  }

  async function initialize() {
    const grid = document.getElementById('articlesGrid');
    const recentGrid = document.getElementById('recentArticlesGrid');
    const searchInput = document.getElementById('articleSearchInput');
    let articles = [];
    let activeCategory = 'All';

    try {
      articles = await getAll();
      const refreshGrid = () => {
        const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
        renderGrid(grid, articles.filter(article => (activeCategory === 'All' || article.category === activeCategory) && (!query || `${article.title} ${article.excerpt} ${(article.tags || []).join(' ')}`.toLowerCase().includes(query))));
      };
      if (grid) {
        refreshGrid();
        document.querySelectorAll('.category-filter-btn').forEach(button => button.addEventListener('click', () => {
          document.querySelectorAll('.category-filter-btn').forEach(item => item.classList.remove('active'));
          button.classList.add('active');
          activeCategory = button.dataset.category || 'All';
          refreshGrid();
        }));
        if (searchInput) searchInput.addEventListener('input', refreshGrid);
      }
      if (recentGrid) renderGrid(recentGrid, articles.slice(0, 3));
    } catch (error) {
      renderGrid(grid, []);
      if (grid) grid.innerHTML = `<p class="article-not-found">${escapeHtml(error.message)}</p>`;
    }
    renderArticleReader();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize); else initialize();
})();
