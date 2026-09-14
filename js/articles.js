/**
 * DIRA Articles & Insights System
 * Data Store & API Simulation Layer
 * 
 * Ready for backend endpoint integration (e.g., Express REST API, Firebase, Headless CMS)
 */

(function () {
    const DEFAULT_ARTICLES = [
        {
            id: 'art-001',
            slug: 'architecting-verifiable-digital-infrastructure',
            title: 'Architecting Verifiable Digital Infrastructure for Central African Institutions',
            category: 'Systems Architecture',
            date: 'September 2026',
            readTime: '6 min read',
            author: 'DIRA Engineering & Systems Group',
            image: './images/photos/IMG_9933.jpg',
            excerpt: 'Why regional enterprises and institutions require tamper-evident systems, audit-proof database architectures, and structured accountability rather than generic templates.',
            tags: ['Architecture', 'Enterprise', 'Security', 'Cameroon'],
            content: `
                <p>For decades, institutions and growing businesses across Central Africa have relied heavily on fragmented paperwork, disparate spreadsheets, and generic website templates that offer zero operational security. As organizations scale, the need for audit-proof digital infrastructure becomes urgent.</p>
                
                <h3>The Cost of Fragile Systems</h3>
                <p>When operational records lack verifiable lineage, organizations face severe vulnerabilities: financial audit failures, data loss during administrative transitions, and inability to meet international donor or compliance standards. A generic CMS cannot handle high-concurrency member verifications or secure multi-branch transaction tracking.</p>
                
                <h3>Engineered for Accountability</h3>
                <p>At DIRA, our systems architecture is built around three core technical tenets:</p>
                <ul>
                    <li><strong>Immutable Event Logging:</strong> Every critical transaction, modification, and access event is timestamped and cryptographically checksummed to prevent retroactive alteration.</li>
                    <li><strong>Role-Based Least Privilege:</strong> Fine-grained permission trees prevent unauthorized data escalation and isolate operational silos.</li>
                    <li><strong>Audit-Ready Export Formats:</strong> Data schemas are structured from day one to generate compliance reports conforming to OHADA and regional regulatory requirements.</li>
                </ul>

                <h3>Real-World Execution</h3>
                <p>When developing platforms like SHESA Connect and institutional registry engines, our engineering team prioritizes database consistency, offline-resilient local sync, and rigorous validation. Technology should never be decorative; it must be an operational asset you can defend under scrutiny.</p>
            `
        },
        {
            id: 'art-002',
            slug: 'business-automation-eliminating-manual-workflows',
            title: 'Moving Beyond Spreadsheets: How Custom Automation Drives Operational ROI',
            category: 'Business Automation',
            date: 'August 2026',
            readTime: '5 min read',
            author: 'DIRA Solutions Architecture',
            image: './images/portfolio/agrichain0.png',
            excerpt: 'A practical breakdown of how custom internal web tools replace hundreds of lost staff hours spent on manual roster reconciliation, client follow-ups, and data re-entry.',
            tags: ['Automation', 'Operations', 'Productivity', 'ROI'],
            content: `
                <p>Manual administrative tasks quietly drain significant capital from growing businesses. Staff spend up to 40% of their working hours manually reconciling payment slips, answering repetitive status inquiries, and consolidating spreadsheets across different departments.</p>

                <h3>Where Spreadsheets Break Down</h3>
                <p>Spreadsheets are excellent scratchpads, but terrible multi-user databases. Version conflicts, accidental formula overwrites, and lack of real-time validation lead to costly mistakes. Furthermore, spreadsheet rows cannot autonomously trigger WhatsApp notifications, generate invoices, or update stock records in real time.</p>

                <h3>The Automation Dividend</h3>
                <p>Custom software bridges this gap by connecting your business logic directly to your operational workflows:</p>
                <ul>
                    <li><strong>Automated Client Onboarding:</strong> Replace manual intake forms with dynamic web workflows that instantly populate customer databases and notify account leads.</li>
                    <li><strong>Instant Reconciliation:</strong> Connect mobile money and banking transaction webhooks directly into sales ledgers, eradicating manual payment verification delays.</li>
                    <li><strong>Centralized Operational Dashboards:</strong> Provide leadership with real-time insight into sales, fulfillment, and team output without waiting for weekly status reports.</li>
                </ul>

                <p>Investing in custom automation is not an operational luxury; it is the most direct lever for compounding efficiency without inflating headcount.</p>
            `
        },
        {
            id: 'art-003',
            slug: 'digital-identity-for-emerging-enterprises',
            title: 'Digital Identity & Credibility: Getting Discovered by Global Partners',
            category: 'Digital Strategy',
            date: 'July 2026',
            readTime: '4 min read',
            author: 'DIRA Digital Strategy',
            image: './images/photos/IMG_1544.jpg',
            excerpt: 'How building an authoritative digital presence transforms local businesses, NGOs, and academic institutions into credible partners for international donors and investors.',
            tags: ['Identity', 'Branding', 'NGO', 'Growth'],
            content: `
                <p>In the globalized economy, an organization's digital presence is its primary credential. When international grantmakers, institutional buyers, or prospective investors evaluate an organization in Cameroon, their initial due diligence begins online.</p>

                <h3>The Credibility Gap</h3>
                <p>Many organizations with outstanding grassroots impact remain practically invisible because their web footprint is either nonexistent or built on unmaintained third-party social media pages. Without a secure, branded home domain, an organization cannot establish institutional credibility or protect its intellectual property.</p>

                <h3>Key Components of an Authoritative Presence</h3>
                <ol>
                    <li><strong>Independent Domain &amp; Infrastructure:</strong> Total ownership over communications, documentation, and records without reliance on algorithmic platform shifts.</li>
                    <li><strong>Transparent Impact Portfolios:</strong> Dynamic case studies with downloadable reports, photo documentation, and verified metric tracking.</li>
                    <li><strong>Clear Conversion &amp; Intake Funnels:</strong> Frictionless digital intake pathways for prospective clients, members, and partners to initiate engagements.</li>
                </ol>

                <p>A credible digital identity converts passive web visits into high-value institutional partnerships.</p>
            `
        },
        {
            id: 'art-004',
            slug: 'training-regional-engineering-pipeline',
            title: 'Cultivating Regional Talent: The DIRA Engineering Pipeline Model',
            category: 'Talent & Capacity',
            date: 'June 2026',
            readTime: '5 min read',
            author: 'DIRA Academy & Foundation',
            image: './images/photos/dira-technical-training.jpg',
            excerpt: 'How DIRA trains, mentors, and absorbs youth talent directly from hands-on bootcamps into production engineering teams.',
            tags: ['Training', 'Talent', 'Education', 'DIRA Tech Fest'],
            content: `
                <p>The tech ecosystem in Northwest Cameroon is rich in raw talent, but historically lacked structured pathways to bridge academic theory with enterprise production standards. DIRA's training initiatives were designed specifically to bridge this gap.</p>

                <h3>Production-First Pedagogy</h3>
                <p>Rather than abstract syntax exercises, our curriculum immerses students in real-world software lifecycles: Git collaboration, defensive programming, responsive UI architecture, and API design. Students build deliverables that run in production.</p>

                <h3>Direct Employment Outcomes</h3>
                <p>Our training programs serve as our primary hiring pipeline. Over 108 young developers and designers have been trained, and several of our core platform engineers are alumni of DIRA's internal programs. Building regional capacity is both our community mission and our competitive advantage.</p>
            `
        }
    ];

    // Local storage key for custom uploaded/saved articles
    const ARTICLES_STORAGE_KEY = 'dira_custom_articles';

    // Articles API Module
    const ArticlesAPI = {
        // Backend endpoint placeholder: set to your API URL when backend is deployed
        endpointUrl: null, // e.g. 'https://api.diracmr.com/v1/articles'

        /**
         * Fetch all articles (combines defaults + custom local/remote storage)
         * @returns {Promise<Array>}
         */
        async getAll() {
            if (this.endpointUrl) {
                try {
                    const response = await fetch(this.endpointUrl);
                    if (response.ok) return await response.json();
                } catch (err) {
                    console.warn('API endpoint unreachable, falling back to local dataset', err);
                }
            }

            const custom = JSON.parse(localStorage.getItem(ARTICLES_STORAGE_KEY) || '[]');
            return [...custom, ...DEFAULT_ARTICLES];
        },

        /**
         * Fetch recent articles with limit
         * @param {number} limit 
         * @returns {Promise<Array>}
         */
        async getRecent(limit = 3) {
            const all = await this.getAll();
            return all.slice(0, limit);
        },

        /**
         * Fetch single article by ID or slug
         * @param {string} identifier 
         * @returns {Promise<Object|null>}
         */
        async getById(identifier) {
            const all = await this.getAll();
            return all.find(a => a.id === identifier || a.slug === identifier) || null;
        },

        /**
         * Fetch articles by category
         * @param {string} category 
         * @returns {Promise<Array>}
         */
        async getByCategory(category) {
            const all = await this.getAll();
            if (!category || category === 'All') return all;
            return all.filter(a => a.category.toLowerCase() === category.toLowerCase());
        },

        /**
         * Endpoint for future Upload / Publishing system
         * @param {Object} articleData 
         * @returns {Promise<Object>}
         */
        async createArticle(articleData) {
            if (this.endpointUrl) {
                const response = await fetch(this.endpointUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(articleData)
                });
                return await response.json();
            }

            // Local fallback persistence
            const newArticle = {
                id: 'art-' + Date.now(),
                slug: articleData.slug || articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                title: articleData.title,
                category: articleData.category || 'General',
                date: articleData.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                readTime: articleData.readTime || '4 min read',
                author: articleData.author || 'DIRA Team',
                image: articleData.image || './images/photos/IMG_9933.jpg',
                excerpt: articleData.excerpt,
                content: articleData.content,
                tags: articleData.tags || []
            };

            const custom = JSON.parse(localStorage.getItem(ARTICLES_STORAGE_KEY) || '[]');
            custom.unshift(newArticle);
            localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(custom));
            return newArticle;
        }
    };

    // UI Helpers & Renderers
    function createCardHTML(article) {
        return `
            <article class="article-card" data-id="${article.id}">
                <div class="article-img-wrap">
                    <img src="${article.image}" alt="${article.title}" loading="lazy" onerror="this.src='./images/photos/IMG_9933.jpg'">
                    <span class="article-badge">${article.category}</span>
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <span>${article.date}</span>
                        <span>•</span>
                        <span>${article.readTime}</span>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-footer">
                        <button type="button" class="article-read-btn" onclick="DiraArticles.openModal('${article.id}')">
                            <span>Read Full Article</span> &rarr;
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    async function renderRecentHomepage(containerId = 'recentArticlesGrid') {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            const articles = await ArticlesAPI.getRecent(3);
            container.innerHTML = articles.map(createCardHTML).join('');
        } catch (e) {
            console.error('Error rendering recent articles:', e);
        }
    }

    async function renderArticlesPage() {
        const grid = document.getElementById('articlesGrid');
        const filterBtns = document.querySelectorAll('.category-filter-btn');
        const searchInput = document.getElementById('articleSearchInput');
        if (!grid) return;

        let allArticles = await ArticlesAPI.getAll();

        function renderList(list) {
            if (list.length === 0) {
                grid.innerHTML = `
                    <div class="no-articles" style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #666;">
                        <h3>No articles found</h3>
                        <p>Try adjusting your search query or filter category.</p>
                    </div>
                `;
                return;
            }
            grid.innerHTML = list.map(createCardHTML).join('');
        }

        renderList(allArticles);

        // Filter button listeners
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.getAttribute('data-category');
                
                let filtered = allArticles;
                if (cat && cat !== 'All') {
                    filtered = allArticles.filter(a => a.category.toLowerCase() === cat.toLowerCase());
                }
                if (searchInput && searchInput.value.trim()) {
                    const q = searchInput.value.toLowerCase().trim();
                    filtered = filtered.filter(a => 
                        a.title.toLowerCase().includes(q) || 
                        a.excerpt.toLowerCase().includes(q) ||
                        (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
                    );
                }
                renderList(filtered);
            });
        });

        // Search listener
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const q = e.target.value.toLowerCase().trim();
                const activeCategoryBtn = document.querySelector('.category-filter-btn.active');
                const cat = activeCategoryBtn ? activeCategoryBtn.getAttribute('data-category') : 'All';

                let filtered = allArticles;
                if (cat && cat !== 'All') {
                    filtered = allArticles.filter(a => a.category.toLowerCase() === cat.toLowerCase());
                }
                if (q) {
                    filtered = filtered.filter(a => 
                        a.title.toLowerCase().includes(q) || 
                        a.excerpt.toLowerCase().includes(q) ||
                        (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
                    );
                }
                renderList(filtered);
            });
        }
    }

    async function openArticleModal(articleId) {
        let modal = document.getElementById('articleReaderModal');
        if (!modal) {
            const modalHTML = `
                <div id="articleReaderModal" class="article-modal-backdrop" aria-hidden="true" role="dialog">
                    <div class="article-modal-card">
                        <button type="button" class="article-modal-close" onclick="DiraArticles.closeModal()">&times;</button>
                        <div id="articleModalBody" class="article-modal-body"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            modal = document.getElementById('articleReaderModal');
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
            });
        }

        const article = await ArticlesAPI.getById(articleId);
        if (!article) return;

        const body = document.getElementById('articleModalBody');
        body.innerHTML = `
            <div class="reader-header">
                <div class="reader-badge">${article.category}</div>
                <h1>${article.title}</h1>
                <div class="reader-meta">
                    <span>By <strong>${article.author}</strong></span>
                    <span>•</span>
                    <span>${article.date}</span>
                    <span>•</span>
                    <span>${article.readTime}</span>
                </div>
            </div>
            <div class="reader-featured-img">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="reader-prose">
                ${article.content}
            </div>
            ${article.tags && article.tags.length > 0 ? `
                <div class="reader-tags">
                    ${article.tags.map(t => `<span class="reader-tag">#${t}</span>`).join('')}
                </div>
            ` : ''}
            <div class="reader-cta-box">
                <h3>Ready to build dependable software for your organization?</h3>
                <p>Let's engineer a solution that fits your exact operational requirements.</p>
                <a href="https://client-intake-form.diracmr.com" target="_blank" rel="noopener" class="reader-cta-btn">Start Client Intake &rarr;</a>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('articleReaderModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Expose API
    window.DiraArticles = {
        api: ArticlesAPI,
        renderRecent: renderRecentHomepage,
        renderPage: renderArticlesPage,
        openModal: openArticleModal,
        closeModal: closeModal
    };

    // Auto-init on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('articlesGrid')) {
            renderArticlesPage();
        }
        if (document.getElementById('recentArticlesGrid')) {
            renderRecentHomepage('recentArticlesGrid');
        }
    });
})();
