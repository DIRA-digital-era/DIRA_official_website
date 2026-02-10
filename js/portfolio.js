const portfolioData = [
  {
    id: "web",
    title: "Web Development",
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

function generatecarocelImages(images =['image1', 'image2', 'image3']){
    html = ''
    images.forEach(image => {
        html += `
        <div class="carousel-item">
            <img src="${image.url}" alt="${image.alt}">
        </div>
        `
    })
    return html;
}


function injectProjects(){
    const container = document.getElementById("projects-container");
    let html = '';
    portfolioData.forEach(project => {
        html += `
        <div class="portfolio-item" id="${project.id}">
                    <div class="portfolio-header">
                        <h3>${project.title}</h3>
                    </div>
                    <div class="carousel">
                        <div class="carousel-inner">
                            ${generatecarocelImages(project.images)}
                        </div>
                        <button class="carousel-control prev">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="carousel-control next">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <div class="carousel-indicators">
                            <button class="carousel-indicator active"></button>
                            <button class="carousel-indicator"></button>
                            <button class="carousel-indicator"></button>
                        </div>
                    </div>
                    <div class="portfolio-description">
                        <p>${project.description}</p>

                    </div>
                </div>
        `
    })

    container.innerHTML += html;
}
injectProjects();