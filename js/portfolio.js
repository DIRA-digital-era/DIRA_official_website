const projects = [
  {
    id: "web",
    title: "Web Development",
    tags: [],
    description: "Complete redesign of an e-commerce website focusing on improving user experience and conversion rates. Implemented modern design principles and streamlined checkout process.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "E-Commerce Website"
      },
      {
        url: "https://images.unsplash.com/photo-1563014959-7aaa83350992?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        alt: "E-Commerce Product Page"
      },
      {
        url: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "E-Commerce Checkout"
      }
    ]
  },
  {
    id: "app",
    title: "App Development And Deployment",
    tags: [],
    description: "Designed a sleek and intuitive user interface for a fitness tracking mobile application. Focused on creating an engaging user experience with smooth animations and clear data visualization.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
        alt: "Mobile App Screens"
      },
      {
        url: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "Mobile App Design"
      },
      {
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        alt: "Mobile App Interface"
      }
    ]
  },
  {
    id: "graphic",
    tags: [],
    title: "Flyers and Graphic Design",
    description: "Developed a comprehensive brand identity for a tech startup, including logo design, color palette, typography, and brand guidelines. Created a cohesive visual language across all platforms.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
        alt: "Brand Identity"
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80",
        alt: "Brand Logo"
      },
      {
        url: "https://images.unsplash.com/photo-1601933470096-0e34634ffcde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "Brand Materials"
      }
    ]
  },
  {
    id: "Agrichain",
    title: "AgriChain AI",
    tags: [],
    description: " A blockchain and AI-driven agricultural supply chain solution designed to enhance transparency and efficiency for farmers and distributors.",
    images: [
      {
        url: "../images/portfolio/agrichain0.png",
        alt: "agrichain0"
      },
      {
        url: "../images/portfolio/agrichain1.png",
        alt: "agrichain1"
      },
      {
        url: "../images/portfolio/agrichain2.png",
        alt: "agrichain2"
      },
    ],
    links: "https://agrichainproject-by-dira.netlify.app"
  },
];

// Keeps track of current index per carousel
const currentIndices = {};
const autoIntervals = {};

function moveCarousel(id, direction) {
  if (!currentIndices[id]) currentIndices[id] = 0;
  const inner = document.getElementById(`inner-${id}`);
  if (!inner) return;
  const totalImages = inner.children.length || 1;
  currentIndices[id] = (currentIndices[id] + direction + totalImages) % totalImages;
  inner.style.transform = `translateX(-${currentIndices[id] * 100}%)`;
}

function injectProjects(){
  const container = document.getElementById('portfolio-grid');
  if (!container) return;

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.id = project.id;

    // Generate Images
    const imagesHtml = project.images.map(img => `
      <div class="carousel-item">
        <img src="${img.url}" alt="${img.alt}">
      </div>
    `).join('');

    // Generate Tags
    const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    card.innerHTML = `
      <div class="card-carousel">
        <div class="carousel-inner" id="inner-${project.id}">
          ${imagesHtml}
        </div>
        <div class="carousel-controls">
          <button class="carousel-btn prev" data-project="${project.id}">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="carousel-btn next" data-project="${project.id}">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="carousel-indicators" id="indicators-${project.id}"></div>
      </div>
      <div class="card-body">
        <div class="tag-container">${tagsHtml}</div>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description}</p>
      </div>
    `;

    container.appendChild(card);

    // Initialize state and controls for this carousel
    currentIndices[project.id] = 0;
    const inner = document.getElementById(`inner-${project.id}`);
    if (inner) inner.style.transform = 'translateX(0)';

    const prevBtn = card.querySelector('.carousel-btn.prev');
    const nextBtn = card.querySelector('.carousel-btn.next');

    if (prevBtn) prevBtn.addEventListener('click', () => { moveCarousel(project.id, -1); restartAuto(project.id); });
    if (nextBtn) nextBtn.addEventListener('click', () => { moveCarousel(project.id, 1); restartAuto(project.id); });

    // Indicators
    const indicatorsContainer = document.getElementById(`indicators-${project.id}`);
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      const total = project.images.length || 1;
      for (let i = 0; i < total; i++) {
        const btn = document.createElement('button');
        btn.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
        btn.setAttribute('data-index', i);
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          setCarouselIndex(project.id, idx);
          restartAuto(project.id);
        });
        indicatorsContainer.appendChild(btn);
      }
    }

    // Auto-advance every 3 seconds
    if (autoIntervals[project.id]) clearInterval(autoIntervals[project.id]);
    autoIntervals[project.id] = setInterval(() => moveCarousel(project.id, 1), 5000);
  });
}

function setCarouselIndex(id, idx) {
  const inner = document.getElementById(`inner-${id}`);
  if (!inner) return;
  const total = inner.children.length || 1;
  const newIdx = ((idx % total) + total) % total;
  currentIndices[id] = newIdx;
  inner.style.transform = `translateX(-${newIdx * 100}%)`;

  // update indicators
  const indicators = document.querySelectorAll(`#indicators-${id} .carousel-indicator`);
  indicators.forEach((el, i) => {
    if (i === newIdx) el.classList.add('active'); else el.classList.remove('active');
  });
}

function restartAuto(id) {
  if (autoIntervals[id]) clearInterval(autoIntervals[id]);
  autoIntervals[id] = setInterval(() => moveCarousel(id, 1), 3000);
}

function moveCarousel(id, direction) {
  if (currentIndices[id] === undefined) currentIndices[id] = 0;
  const inner = document.getElementById(`inner-${id}`);
  if (!inner) return;
  const totalImages = inner.children.length || 1;
  setCarouselIndex(id, currentIndices[id] + direction);
}

injectProjects();