(function () {
  'use strict';

  const API_BASE = window.DIRA_API_BASE || (window.location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api');
  const DEFAULT_IMAGE = './images/photos/web/team-b.jpg';

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

  function setMeta(attribute, name, content) {
    let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  }

  function setArticleMetadata(article) {
    const articleUrl = new URL(window.location.href);
    articleUrl.hash = '';
    articleUrl.search = '';
    articleUrl.searchParams.set('slug', article.slug);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = articleUrl.href;

    const title = `${article.title} | DIRA`;
    const description = article.excerpt || article.title;
    const image = new URL(article.image || DEFAULT_IMAGE, window.location.href).href;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', articleUrl.href);
    setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
  }

  function articleCard(article) {
    const imgUrl = article.image || DEFAULT_IMAGE;
    const slug = article.slug || '';
    const readTime = article.readTime || '4 min read';
    const date = article.date || 'Recent';
    const category = article.category || 'Insights';

    return `
      <article class="article-card">
        <div class="article-img-wrap">
          <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(article.title)}" onerror="this.src='${DEFAULT_IMAGE}'" loading="lazy">
          <span class="article-card-badge">${escapeHtml(category)}</span>
        </div>
        <div class="article-card-body">
          <div class="article-card-meta">
            <span>${escapeHtml(date)}</span>
            <span>&bull;</span>
            <span>${escapeHtml(readTime)}</span>
          </div>
          <h3 class="article-card-title">
            <a href="article.html?slug=${encodeURIComponent(slug)}">${escapeHtml(article.title)}</a>
          </h3>
          <p class="article-card-excerpt">${escapeHtml(article.excerpt)}</p>
          <div class="article-card-footer">
            <a class="article-action-link" href="article.html?slug=${encodeURIComponent(slug)}">
              View Full Article <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  function renderGrid(grid, articles) {
    if (grid) {
      grid.setAttribute('aria-busy', 'false');
      grid.innerHTML = articles.length
        ? articles.map(articleCard).join('')
        : '<p class="article-not-found">No articles match your selection. Try a different topic or keyword.</p>';
    }
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
    if (!slug) {
      reader.setAttribute('aria-busy', 'false');
      reader.setAttribute('aria-label', 'Article not found');
      setMeta('name', 'robots', 'noindex, nofollow');
      reader.innerHTML = `<div class="article-not-found"><h1>Article not found</h1><p>Please select an article from the articles page.</p><a class="article-back-link" href="articles.html">&larr; Browse all articles</a></div>`;
      return;
    }
    try {
      const article = await getBySlug(slug);
      setArticleMetadata(article);
      reader.setAttribute('aria-busy', 'false');
      reader.setAttribute('aria-label', article.title);
      reader.innerHTML = `
        <div class="reader-header">
          <span class="reader-badge">${escapeHtml(article.category)}</span>
          <h1>${escapeHtml(article.title)}</h1>
          <div class="reader-meta">
            <span>${escapeHtml(article.author || 'DIRA Team')}</span>
            <span>&bull;</span>
            <span>${escapeHtml(article.date)}</span>
            <span>&bull;</span>
            <span>${escapeHtml(article.readTime || '4 min read')}</span>
          </div>
        </div>
        <div class="reader-featured-img">
          <img src="${escapeHtml(article.image || DEFAULT_IMAGE)}" alt="${escapeHtml(article.title)}" onerror="this.src='${DEFAULT_IMAGE}'">
        </div>
        <div class="reader-prose">${article.content}</div>
        <div class="reader-tags">
          ${(article.tags || []).map(tag => `<span class="reader-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
      `;
    } catch (error) {
      reader.setAttribute('aria-busy', 'false');
      reader.setAttribute('aria-label', 'Article not found');
      setMeta('name', 'robots', 'noindex, nofollow');
      reader.innerHTML = `<div class="article-not-found"><h1>Article not found</h1><p>${escapeHtml(error.message)}</p><a class="article-back-link" href="articles.html">&larr; Browse all articles</a></div>`;
    }
  }

  function setupHeroNewsletter() {
    const form = document.getElementById('articleNewsletterForm');
    const emailInput = document.getElementById('heroNewsletterEmail');
    const submitBtn = document.getElementById('heroNewsletterBtn');
    const statusBox = document.getElementById('heroNewsletterStatus');
    if (!form || !emailInput) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim().toLowerCase();
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        if (statusBox) {
          statusBox.className = 'hero-newsletter-status show error';
          statusBox.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
      }

      try {
        const clientId = localStorage.getItem('dira_newsletter_client_id') || ('client_' + Math.random().toString(36).substring(2, 12));
        localStorage.setItem('dira_newsletter_client_id', clientId);

        const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, clientId, source: 'articles-hero-capsule' })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Subscription could not be processed.');

        if (statusBox) {
          statusBox.className = 'hero-newsletter-status show success';
          statusBox.textContent = 'Thanks for subscribing! You will receive our latest articles and updates.';
        }
        form.reset();
      } catch (err) {
        if (statusBox) {
          statusBox.className = 'hero-newsletter-status show error';
          statusBox.textContent = err.message || 'Something went wrong. Please try again.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Subscribe';
        }
      }
    });
  }

  async function initialize() {
    const grid = document.getElementById('articlesGrid');
    const recentGrid = document.getElementById('recentArticlesGrid');
    const searchInput = document.getElementById('articleSearchInput');
    let articles = [];
    let activeCategory = 'All';

    setupHeroNewsletter();
    renderArticleReader();

    try {
      articles = await getAll();
      const refreshGrid = () => {
        const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
        const filtered = articles.filter(article => {
          const matchCategory = activeCategory === 'All' || article.category === activeCategory;
          const matchQuery = !query || `${article.title} ${article.excerpt} ${article.category} ${(article.tags || []).join(' ')}`.toLowerCase().includes(query);
          return matchCategory && matchQuery;
        });
        renderGrid(grid, filtered);
      };

      if (grid) {
        refreshGrid();
        
        // Handle filter buttons / tabs
        const tabButtons = document.querySelectorAll('.category-filter-tab, .category-filter-btn');
        tabButtons.forEach(button => {
          button.addEventListener('click', () => {
            tabButtons.forEach(item => item.classList.remove('active'));
            button.classList.add('active');
            activeCategory = button.dataset.category || 'All';
            refreshGrid();
          });
        });

        if (searchInput) searchInput.addEventListener('input', refreshGrid);
      }

      if (recentGrid) renderGrid(recentGrid, articles.slice(0, 3));
    } catch (error) {
      renderGrid(grid, []);
      if (grid) grid.innerHTML = `<p class="article-not-found">${escapeHtml(error.message)}</p>`;
      if (recentGrid) {
        recentGrid.setAttribute('aria-busy', 'false');
        recentGrid.innerHTML = `<p class="article-not-found">${escapeHtml(error.message)}</p>`;
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize); else initialize();
})();
