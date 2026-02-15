const galleryContainer = document.getElementById('video-gallery');

// const youtubeVideos = [
//     {
//         id: "UsR6sdo3JcyYwkA1", 
//         title: "Dira Keynote 2024 Recap",
//         description: "Recap Video for Dira, the all in one company Keynote 2024."
//     },
//     {
//         id: "Wu-VIxkKgWLLI3_Y", 
//         title: "AgriChain",
//         description: "The Feature of Agriculture."
//     },
//     {
//         id: "zizZzeAsc4K6-J-O", 
//         title: "Agrichani",
//         description: "Agrichain a sustainable agriculture, powered by Dira"
//     },
//     {
//         id: "2Vv-BfVoq4g",
//         title: "Office Tour",
//         description: "A look inside our creative headquarters."
//     }
// ];

// function buildGallery(videoList) {
//     videoList.forEach(video => {
//         // 1. Create the card element
//         const card = document.createElement('div');
//         card.className = 'video-card';

//         // 2. Construct the Iframe and Text content
//         // Note: we use ?rel=0 to show only related videos from the same channel
//         card.innerHTML = `
//             <div class="iframe-wrapper">
//                 <iframe 
//                     src="https://www.youtube.com/embed/${video.id}?rel=0" 
//                     title="${video.title}" 
//                     frameborder="0" 
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//                     allowfullscreen>
//                 </iframe>
//             </div>
//             <div class="card-info">
//                 <h3>${video.title}</h3>
//                 <p>${video.description}</p>
//             </div>
//         `;

//         // 3. Add to the gallery
//         galleryContainer.appendChild(card);
//     });
// }

// Run the function
// buildGallery(youtubeVideos);

// Example data for Instagram

const instagramPosts = [
    { id: "DTX8P_3jMvo", title: "Behind the Scenes" },
    { id: "DSx4JvLDKfT", title: "Behind the Scenes" },
    { id: "DUGiognjCi2", title: "Behind the Scenes" },
    { id: "DN2nbSr2AZ4", title: "Behind the Scenes" },
    { id: "DQM0t-IDDZW", title: "Behind the Scenes" },
    { id: "DORY9YuDNI8", title: "Behind the Scenes" },
    { id: "DP18uxRAKzG", title: "Behind the Scenes" },
];

// Shared Observer for lazy loading
const embedObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const type = card.dataset.type;
            
            if (type === 'instagram') {
                loadInstagramEmbed(card);
            } else if (type === 'tiktok') {
                loadTikTokEmbed(card);
            }
            
            observer.unobserve(card);
        }
    });
}, {
    rootMargin: "200px 0px" // Start loading 200px before it comes into view
});

function injectInstagram(posts) {
    const container = document.getElementById('video-gallery');

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'instagram-card';
        card.dataset.type = 'instagram';
        card.dataset.postId = post.id;
        // Placeholder to prevent layout shift
        card.style.minHeight = "400px"; 
        
        container.appendChild(card);
        embedObserver.observe(card);
    });
}

function loadInstagramEmbed(card) {
    const postId = card.dataset.postId;
    
    // Inject HTML
    card.innerHTML = `
        <blockquote class="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/p/${postId}/" 
            data-instgrm-version="14" 
            style="width:100%; border:0; border-radius:12px; margin:0;">
        </blockquote>
    `;

    // Load script if needed
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//www.instagram.com/embed.js";
        document.body.appendChild(script);
    } else if (window.instgrm) {
        // Process if script already loaded
        window.instgrm.Embeds.process();
    }
}

injectInstagram(instagramPosts);

// Example data for TikTok
const tiktokVideos = [
    { id: "7547699137915964728", user: "dira_official", title: "Future of Tech" },
    { id: "7605618260033228052", user: "dira_official", title: "Coding Challenge" }
];

function injectTikTok(videos) {
    const container = document.getElementById('video-gallery');

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'tiktok-card';
        card.dataset.type = 'tiktok';
        card.dataset.videoId = video.id;
        card.dataset.user = video.user;
        card.dataset.title = video.title;
        card.style.minHeight = "580px"; // Approximate height for TikTok embed

        container.appendChild(card);
        embedObserver.observe(card);
    });
}

function loadTikTokEmbed(card) {
    const { videoId, user, title } = card.dataset;

    card.innerHTML = `
        <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${user}/video/${videoId}" data-video-id="${videoId}" data-video-autoplay="false" style="max-width: 325px; width: 100%;">
            <section>
                <a target="_blank" title="@${user}" href="https://www.tiktok.com/@${user}?refer=embed">@${user}</a>
                <p>${title}</p>
            </section>
        </blockquote>
    `;

    if (!document.querySelector('script[src*="tiktok.com/embed.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://www.tiktok.com/embed.js";
        document.body.appendChild(script);
    }
}

injectTikTok(tiktokVideos);

/* 
   Original functions replaced above with lazy-loading versions.
   Old implementation removed to prevent duplication.
*/

/*
function injectInstagram(posts) {
    const container = document.getElementById('video-gallery');

    // Ensure Instagram script is loaded if not already present
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = "//www.instagram.com/embed.js";
        document.body.appendChild(script);
    }
    
    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'instagram-card';
        card.innerHTML = `
            <blockquote class="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/p/${post.id}/" 
                data-instgrm-version="14" 
                style="width:100%; border:0; border-radius:12px; margin:0;">
            </blockquote>
        `;
        container.appendChild(card);
    });

    // CRITICAL: Re-run the Instagram embed script to "process" the new HTML
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
}

function injectTikTok(videos) {
    const container = document.getElementById('video-gallery');

    // Ensure TikTok script is loaded if not already present
    if (!document.querySelector('script[src*="tiktok.com/embed.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://www.tiktok.com/embed.js";
        document.body.appendChild(script);
    }

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'tiktok-card';
        card.innerHTML = `
            <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${video.user}/video/${video.id}" data-video-id="${video.id}" data-video-autoplay="false" style="max-width: 325px; width: 100%;">
                <section>
                    <a target="_blank" title="@${video.user}" href="https://www.tiktok.com/@${video.user}?refer=embed">@${video.user}</a>
                    <p>${video.title}</p>
                </section>
            </blockquote>
        `;
        container.appendChild(card);
    });
}

*/