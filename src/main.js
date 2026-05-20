import { videoCatalog } from './catalog.js';

const viewport = document.getElementById('viewport-engine');
const titleDisplay = document.getElementById('video-title');
const descDisplay = document.getElementById('video-desc');
const playlistContainer = document.getElementById('playlist-container');

// Global control state for live console testing
window.videoState = {
    catalog: [...videoCatalog],
    currentVideoId: null
};

function playVideo(videoObj) {
    window.videoState.currentVideoId = videoObj.id;
    viewport.innerHTML = ''; // Wipe out previous iframe footprint

    const iframe = document.createElement('iframe');
    // Using YouTube ID directly since it matches videoObj.id now
    iframe.src = `https://www.youtube.com/embed/${videoObj.id}?autoplay=1&modestbranding=1&rel=0`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    
    viewport.appendChild(iframe);

    titleDisplay.innerText = videoObj.title;
    descDisplay.innerText = videoObj.description;
    updateActiveCardUI();
}

function renderPlaylist() {
    playlistContainer.innerHTML = '';
    
    window.videoState.catalog.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = 'thumb-card';
        card.setAttribute('data-id', video.id);
        
        // Reversed count so bottom video is #1, top is the highest/newest number
        const videoNumber = window.videoState.catalog.length - index;

        card.innerHTML = `
            <div class="thumb-meta">
                <div>YOUTUBE</div>
                <div style="font-size:0.65rem; opacity:0.7; margin-top:3px;">#${videoNumber}</div>
            </div>
            <div class="thumb-details">
                <h4>${escapeHTML(video.title)}</h4>
                <p>${escapeHTML(video.description.substring(0, 60))}${video.description.length > 60 ? '...' : ''}</p>
            </div>
        `;
        
        card.addEventListener('click', () => playVideo(video));
        playlistContainer.appendChild(card);
    });
}

function updateActiveCardUI() {
    document.querySelectorAll('.thumb-card').forEach(card => {
        if (card.getAttribute('data-id') === window.videoState.currentVideoId) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function init() {
    renderPlaylist();
    
    if (window.videoState.catalog.length > 0) {
        playVideo(window.videoState.catalog[0]);
    }
}

init();
