const galleryContainer = document.getElementById('video-gallery');

const youtubeVideos = [
    {
        // NOTE: This ID appears to be invalid. YouTube IDs are 11 characters long.
        id: "UsR6sdo3JcyYwkA1", 
        title: "Dira Keynote 2024 Recap",
        description: "Recap Video for Dira, the all in one company Keynote 2024."
    },
    {
        // NOTE: This ID appears to be invalid.
        id: "Wu-VIxkKgWLLI3_Y", 
        title: "AgriChain",
        description: "The Feature of Agriculture."
    },
    {
        // NOTE: This ID appears to be invalid.
        id: "zizZzeAsc4K6-J-O", 
        title: "Agrichani",
        description: "Agrichain a sustainable agriculture, powered by Dira"
    },
    {
        id: "2Vv-BfVoq4g",
        title: "Office Tour",
        description: "A look inside our creative headquarters."
    }
    // Removed two duplicate "Office Tour" entries and the redundant/incorrect 'link' properties from all objects.
];

function buildGallery(videoList) {
    videoList.forEach(video => {
        // 1. Create the card element
        const card = document.createElement('div');
        card.className = 'video-card';

        // 2. Construct the Iframe and Text content
        // Note: we use ?rel=0 to show only related videos from the same channel
        card.innerHTML = `
            <div class="iframe-wrapper">
                <iframe 
                    src="https://www.youtube.com/embed/${video.id}?rel=0" 
                    title="${video.title}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="card-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>
        `;

        // 3. Add to the gallery
        galleryContainer.appendChild(card);
    });
}

// Run the function
buildGallery(youtubeVideos);

// Example data for Instagram
const instagramPosts = [
    { id: "DUGiognjCi2", title: "New Summer Collection" },
    { id: "DUGiognjCi2", title: "Behind the Scenes" }
    // https://www.instagram.com/p/DUGiognjCi2/?igsh=Z2Y2czJxNHp3ajJx
];

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

injectInstagram(instagramPosts);