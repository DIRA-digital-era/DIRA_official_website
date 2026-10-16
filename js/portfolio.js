const projects = [
  {
    id: "dhub",
    title: "DHUB",
    category: "Flagship Product",
    tags: ["Flagship Product", "PropTech", "Verified Marketplace"],
    status: "Live & Operating",
    caseStudyPage: "project-dhub.html",
    link: "https://dhubcmr.netlify.app/",
    description: "Cameroon's verified housing marketplace. Search, book, and pay securely, with every listing checked before it goes live.",
    problemSolved: "Finding safe, verified student and residential housing in Cameroon has historically been plagued by unverified brokers, duplicate listings, and fraudulent advance deposits. DHUB solves this by creating a closed-loop marketplace where agents and listings are physically verified before publication, paired with transparent booking workflows.",
    techInfo: "Custom marketplace platform, verified property onboarding workflow, high-availability hosting, geolocation search, and secure inquiry pipelines.",
    images: [
      {
        url: "./images/photos/web/dhub.png",
        alt: "DHUB verified housing marketplace platform architecture"
      },
      {
        url: "./images/utils/cloud.jpg",
        alt: "DHUB property management infrastructure"
      }
    ]
  },
  {
    id: "shesa",
    title: "SHESA Connect",
    category: "Institutional Platform",
    tags: ["Institutional Platform", "Alumni Network", "Governance"],
    status: "Delivered & Presented",
    caseStudyPage: "project-shesa.html",
    link: "https://shesaconnect.com",
    description: "SHESA Connect is a full membership platform built for SHESA's alumni network: events, leadership records, project tracking, and a media gallery in one system. It's the largest completed platform engagement in DIRA's portfolio to date, and has been presented directly to senior government officials including Minister Delegates at MINEPAT and MINREX.",
    problemSolved: "Global alumni networks with thousands of members across multiple chapters frequently suffer from scattered member databases, untracked development projects, and fractured communication channels. SHESA Connect centralized verified membership registers, historical executive records, chapter project funding, and institutional media in a single secure environment.",
    techInfo: "Multi-tier membership platform, historical executive records database, project milestone tracker, event registration engine, and institutional role-based access control.",
    images: [
      {
        url: "./images/photos/web/proven-execution.png",
        alt: "DIRA team presenting platform capabilities"
      }
    ]
  },
  {
    id: "nw-gpidrs",
    title: "Northwest Government Digital Readiness Survey (NW-GPIDRS)",
    category: "Regional Assessment Programme",
    tags: ["Public Sector", "Digital Readiness", "Regional Research"],
    status: "Regional Fieldwork",
    caseStudyPage: "project-nw-gpidrs.html",
    caseStudyLabel: "View Details",
    description: "DIRA is assessing infrastructure, records management, digital services, staff capability, and institutional practices across public institutions to map regional digital readiness and identify practical priorities.",
    problemSolved: "Public institutions can differ widely in connectivity, equipment, record-keeping practices, digital service capacity, and staff skills. NW-GPIDRS is documenting these conditions to support better-targeted regional planning.",
    techInfo: "A repeatable on-site assessment framework reviews six areas: connectivity and hardware; data and records management; digital public services; inter-institutional communication; staff digital capacity; and governance and procurement readiness. Structured scoring supports individual diagnostic reporting and aggregated regional analysis, without publishing institution-specific findings.",
    images: [
      {
        url: "./images/photos/web/DIRA WEB PHOTOS TEMPLATE - 9.PNG",
        alt: "Northwest Government Digital Readiness Survey field assessment"
      }
    ]
  },
  {
    id: "nwdrs",
    title: "Northwest SME Digital Readiness Survey (NWDRS)",
    category: "Regional Assessment Programme",
    tags: ["SME Support", "Digital Readiness", "Needs-First Assessment"],
    status: "Regional Fieldwork",
    caseStudyPage: "project-nwdrs.html",
    caseStudyLabel: "View Details",
    description: "DIRA is working with SMEs, cooperative financial institutions, and social-economy organizations to assess their tools, operations, skills, and readiness, then identify practical digital improvements.",
    problemSolved: "Organizations often have little reliable information about their digital capabilities, operational bottlenecks, and readiness to adopt technology. NWDRS documents each organization's processes, constraints, and priorities to support suitable digital planning.",
    techInfo: "A structured field-assessment framework examines seven areas: connectivity and hardware; member or client records; loan and operations management; online and digital presence; financial reporting systems; staff digital literacy; and governance and readiness. Findings support practical institution-level recommendations and anonymised regional analysis, rather than a one-size-fits-all technology prescription.",
    images: [
      {
        url: "./images/photos/web/DIRA WEB PHOTOS TEMPLATE (6).png",
        alt: "northwest SME digital readiness survey field assessment"
      }
    ]
  },
  {
    id: "aswedo",
    title: "ASWEDO Cameroon",
    category: "NGO & Community",
    tags: ["NGO Portal", "Community Development", "Non-Profit"],
    status: "Live & Active",
    caseStudyPage: "project-aswedo.html",
    link: "https://aswedo.org",
    description: "Official web platform for the Association for the Welfare of the Disadvantaged and Vulnerable (ASWEDO Cameroon), supporting community development, women empowerment, and educational outreach.",
    problemSolved: "Grassroots humanitarian organizations need credible, transparent digital portals to communicate their field activities to international partners, donors, and regulatory bodies without costly proprietary maintenance overhead.",
    techInfo: "Accessible, responsive web architecture, structured field reporting modules, donation inquiries, and optimized mobile-first performance.",
    images: [
      {
        url: "./images/photos/web/aswedo-1.png",
        alt: "ASWEDO Cameroon community welfare platform"
      },
      {
        url: "./images/photos/web/aswedo-2.png",
        alt: "ASWEDO educational outreach program"
      }
    ]
  },
  {
    id: "marketplace",
    title: "Pan-African Multi-Vendor Marketplace",
    category: "Commercial Platform",
    tags: ["Enterprise Platform", "E-Commerce", "Multi-Vendor"],
    status: "Delivered (Client Redacted)",
    caseStudyPage: "project-marketplace.html",
    link: "",
    description: "A high-capacity multi-vendor marketplace platform built for cross-border African commerce, engineered for multi-currency handling and verified merchant catalogs. (Details redacted in accordance with commercial confidentiality agreements).",
    problemSolved: "Cross-border African commerce involves complex currency conversions, high transaction abandonment due to untrusted sellers, and friction in reconciling vendor settlements. This platform engineered automated vendor vetting, transaction escrow, and multi-currency pricing to secure trust between buyers and sellers.",
    techInfo: "Multi-tenant merchant dashboards, distributed transaction logging, automated vendor audit verification, and resilient catalog search.",
    images: [
      {
        url: "./images/utils/Wavy_Bus-19_Single-05.jpg",
        alt: "Pan-African multi-vendor platform architecture"
      },
      {
        url: "./images/utils/security.jpg",
        alt: "Secure multi-currency transaction escrow"
      }
    ]
  },
  {
    id: "cybfc",
    title: "Camer Young Boyz FC",
    category: "Sports & Talent",
    tags: ["External Client", "Sports", "Talent Showcase"],
    status: "Live",
    caseStudyPage: "project-cybfc.html",
    link: "https://cameryoungboyzfc.com/",
    description: "Official sports website for talent showcasing. Designed for high performance, athlete visibility, and international scout recruitment.",
    problemSolved: "Talented young footballers in Cameroon often lack an authoritative digital repository of verified statistics, tournament footage, and scout contact channels, limiting their exposure to international academies.",
    techInfo: "Fast-loading media showcase, individual athlete statistical cards, responsive match calendar, and secure scouting inquiry integration.",
    images: [
      {
        url: "./images/portfolio/web/youngboyz0.webp",
        alt: "Camer Young Boyz FC official website"
      },
      {
        url: "./images/portfolio/web/youngboyz1.webp",
        alt: "Player match highlights and statistics"
      },
      {
        url: "./images/portfolio/web/youngboyz2.webp",
        alt: "Academy match schedule and roster"
      }
    ]
  },
  {
    id: "foundation",
    title: "DIRA Foundation",
    category: "Philanthropy & Community",
    tags: ["Philanthropy", "Digital Literacy", "Community"],
    status: "Live & Active",
    link: "https://dirafoundation.netlify.app",
    description: "The philanthropic and pro-bono technology arm of the DIRA Group, providing digital literacy training, cybersecurity workshops, and technical support to nonprofits across Cameroon.",
    problemSolved: "Addresses systemic barriers to technology education in secondary schools and grassroots organizations through subsidized bootcamps, equipment donations, and open educational resources.",
    techInfo: "Community portal, workshop registration pipelines, resource repository, and volunteer mentorship coordination.",
    images: [
      {
        url: "./images/photos/web/foundation0.png",
        alt: "DIRA Foundation community empowerment workshop"
      },
      {
        url: "./images/photos/web/foundation1.png",
        alt: "DIRA Foundation digital education program"
      },
     
      
    ]
  },
  {
    id: "opendreams",
    title: "Open Dreams Portal",
    category: "Education & Scholarships",
    tags: ["Educational", "Scholarship Portal"],
    status: "Live",
    link: "https://open-dreams.org",
    description: "Educational consultancy and scholarship portal providing resources and mentoring pipelines for high-achieving low-income students seeking international academic opportunities.",
    problemSolved: "Streamlines international college preparation, standardized testing resources, and volunteer mentor coordination for underprivileged African scholars.",
    techInfo: "Educational resource delivery architecture, scholar alumni profiles, and university partnership showcase.",
    images: [
      {
        url: "./images/portfolio/web/opendreams.webp",
        alt: "Open Dreams scholar graduation and achievements"
      },
      {
        url: "./images/portfolio/web/opendreams1.webp",
        alt: "Scholars collaborating in academic mentorship program"
      },
      {
        url: "./images/portfolio/web/opendreams2.webp",
        alt: "International scholarship success stories"
      }
    ]
  },
  {
    id: "agrichain",
    title: "AgriChain AI",
    category: "Research Prototype",
    tags: ["Research Prototype", "AgriTech", "Traceability"],
    status: "Prototype / Research Stage",
    link: "https://agrichainproject-by-dira.netlify.app",
    description: "An experimental agricultural supply chain prototype exploring tamper-evident record keeping and provenance tracking for smallholder farmers in Cameroon.",
    problemSolved: "Explores methods to prevent product adulteration and provide verifiable batch origin data to agricultural exporters.",
    techInfo: "Experimental immutable batch logging, distributor verification dashboard, and decentralized record proofs.",
    images: [
      {
        url: "./images/portfolio/web/agrichain0.webp",
        alt: "AgriChain AI supply chain dashboard prototype"
      },
      {
        url: "./images/portfolio/web/agrichain1.webp",
        alt: "Farmer batch registration interface"
      },
      {
        url: "./images/portfolio/web/agrichain2.webp",
        alt: "Crop provenance verification proof"
      }
    ]
  }
];

// Keeps track of current index per carousel
const currentIndices = {};
const autoIntervals = {};

function moveCarousel(id, direction) {
  if (currentIndices[id] === undefined) currentIndices[id] = 0;
  const inner = document.getElementById(`inner-${id}`);
  if (!inner) return;
  const totalImages = inner.children.length || 1;
  currentIndices[id] = (currentIndices[id] + direction + totalImages) % totalImages;
  inner.style.transform = `translateX(-${currentIndices[id] * 100}%)`;
  updateIndicators(id, currentIndices[id]);
}

function setCarouselIndex(id, idx) {
  const inner = document.getElementById(`inner-${id}`);
  if (!inner) return;
  const total = inner.children.length || 1;
  const newIdx = ((idx % total) + total) % total;
  currentIndices[id] = newIdx;
  inner.style.transform = `translateX(-${newIdx * 100}%)`;
  updateIndicators(id, newIdx);
}

function updateIndicators(id, activeIdx) {
  const indicators = document.querySelectorAll(`#indicators-${id} .carousel-indicator`);
  indicators.forEach((el, i) => {
    if (i === activeIdx) el.classList.add('active');
    else el.classList.remove('active');
  });
}

function restartAuto(id) {
  if (autoIntervals[id]) clearInterval(autoIntervals[id]);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  autoIntervals[id] = setInterval(() => moveCarousel(id, 1), 3500);
}

function openCaseStudyModal(projectId) {
  const p = projects.find(item => item.id === projectId);
  if (!p) return;
  
  const modal = document.getElementById('case-study-modal');
  document.getElementById('modalBadge').textContent = p.category || p.tags[0] || 'Project';
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.description;
  document.getElementById('modalProblem').textContent = p.problemSolved || 'Details provided upon request.';
  document.getElementById('modalTech').textContent = p.techInfo || 'Built with custom platform architecture.';
  
  const actionsContainer = document.getElementById('modalActions');
  actionsContainer.innerHTML = '';
  if (p.caseStudyPage) {
    const pageBtn = document.createElement('a');
    pageBtn.href = p.caseStudyPage;
    pageBtn.className = 'modal-btn-primary';
    pageBtn.textContent = 'Full Case Study Page \u2192';
    actionsContainer.appendChild(pageBtn);
  }
  if (p.link) {
    const liveBtn = document.createElement('a');
    liveBtn.href = p.link;
    liveBtn.target = '_blank';
    liveBtn.rel = 'noopener';
    liveBtn.className = 'modal-btn-primary modal-btn-primary--live';
    liveBtn.textContent = 'Visit Live Platform';
    actionsContainer.appendChild(liveBtn);
  }
  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'modal-btn-primary modal-btn-primary--muted';
  closeBtn.textContent = 'Close';
  closeBtn.onclick = closeCaseStudyModal;
  actionsContainer.appendChild(closeBtn);

  modal.classList.add('active');
}

function closeCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  if (modal) modal.classList.remove('active');
}

function injectProjects() {
  const container = document.getElementById('portfolio-grid');
  if (!container) return;
  container.innerHTML = '';

  const carouselObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        restartAuto(entry.target.id);
      } else {
        if (autoIntervals[entry.target.id]) clearInterval(autoIntervals[entry.target.id]);
      }
    });
  }, { threshold: 0.5 });

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'portfolio-card reveal-card';
    card.id = project.id;

    // Generate Images (generic stock illustrations in /images/utils/ are not shown as project work)
    const shownImages = project.images.filter(img => !/\/images\/utils\//.test(img.url));
    const hasMultiple = shownImages.length > 1;
    const imagesHtml = shownImages.length ? shownImages.map(img => `
      <div class="carousel-item">
        <img src="${img.url}" alt="${img.alt}" loading="lazy">
      </div>
    `).join('') : `
      <div class="carousel-item carousel-item--placeholder" aria-hidden="true">
        <span class="pf-placeholder__cat">${project.category}</span>
        <span class="pf-placeholder__title">${project.title}</span>
      </div>
    `;

    // Generate Tags
    const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    const liveLinkHtml = project.link ? `
      <a href="${project.link}" class="card-link" target="_blank" rel="noopener">Visit Live</a>
    ` : '';

    card.innerHTML = `
      <div class="card-carousel">
        <div class="carousel-inner" id="inner-${project.id}">
          ${imagesHtml}
        </div>
        ${hasMultiple ? `<div class="carousel-controls">
          <button class="carousel-btn prev" data-project="${project.id}" aria-label="Previous image">&#10094;</button>
          <button class="carousel-btn next" data-project="${project.id}" aria-label="Next image">&#10095;</button>
        </div>` : ''}
        <div class="carousel-indicators" id="indicators-${project.id}"></div>
      </div>
      <div class="card-body">
        <div class="tag-container">${tagsHtml}</div>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description}</p>
      </div>
      <div class="card-actions-row">
        ${project.caseStudyPage ? `<a href="${project.caseStudyPage}" class="btn-case-study">${project.caseStudyLabel || 'Case Study'} &rarr;</a>` : `<button type="button" class="btn-case-study" onclick="openCaseStudyModal('${project.id}')">View Details</button>`}
        <button type="button" class="btn-case-study btn-case-study--ghost" onclick="openCaseStudyModal('${project.id}')">Overview</button>
        ${liveLinkHtml}
      </div>
    `;

    container.appendChild(card);

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
      const total = hasMultiple ? shownImages.length : 0;
      for (let i = 0; i < total; i++) {
        const btn = document.createElement('button');
        btn.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
        btn.setAttribute('data-index', i);
        btn.setAttribute('aria-label', `Slide ${i + 1}`);
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          setCarouselIndex(project.id, idx);
          restartAuto(project.id);
        });
        indicatorsContainer.appendChild(btn);
      }
    }

    if (hasMultiple) carouselObserver.observe(card);
  });
}

injectProjects();