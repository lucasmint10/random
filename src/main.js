import { videoCatalog } from './catalog.js';

const viewport = document.getElementById('viewport-engine');
const titleDisplay = document.getElementById('video-title');
const descDisplay = document.getElementById('video-desc');
const playlistContainer = document.getElementById('playlist-container');

// Global control state for live console testing
window.videoState = {
    catalog: [...videoCatalog],
    currentVideoId: null,
    
    // Sort logic functions exposed to console
    sortByNewest: () => {
        window.videoState.catalog.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        renderPlaylist();
    },
    sortByOldest: () => {
        window.videoState.catalog.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        renderPlaylist();
    }
};

function playVideo(videoObj) {
    window.videoState.currentVideoId = videoObj.id;
    viewport.innerHTML = ''; // Wipe out previous layout structural footprint

    if (videoObj.type === 'youtube') {
        // Embed pathway without tracker parameters
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoObj.youtubeId}?autoplay=1&modestbranding=1&rel=0`;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        viewport.appendChild(iframe);
    } else if (videoObj.type === 'direct') {
        // Native fallback engine channel
        const video = document.createElement('video');
        video.src = videoObj.videoUrl;
        video.controls = true;
        video.autoplay = true;
        viewport.appendChild(video);
    }

    titleDisplay.innerText = videoObj.title;
    descDisplay.innerText = videoObj.description;
    updateActiveCardUI();
}

function renderPlaylist() {
    playlistContainer.innerHTML = '';
    
    window.videoState.catalog.forEach(video => {
        const card = document.createElement('div');
        card.className = 'thumb-card';
        card.setAttribute('data-id', video.id);
        
        const dateObj = new Date(video.publishedAt);
        const displayDate = `${dateObj.getFullYear()}/${String(dateObj.getMonth() + 1).padStart(2, '0')}`;

        card.innerHTML = `
            <div class="thumb-meta">
                <div>${video.type.toUpperCase()}</div>
                <div style="font-size:0.65rem; opacity:0.7; margin-top:3px;">${displayDate}</div>
            </div>
            <div class="thumb-details">
                <h4>${escapeHTML(video.title)}</h4>
                <p>${escapeHTML(video.description.substring(0, 60))}${video.description.length > 60 ? '...' : ''}</p>
            </div>
        `;
        
        card.addEventListener('click', () => playVideo(video));
        playlistContainer.appendChild(card);
    });
    updateActiveCardUI();
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
    // Force default chronological sorting algorithm down descending array timeline
    window.videoState.sortByNewest();
    
    if (window.videoState.catalog.length > 0) {
        playVideo(window.videoState.catalog[0]);
    }
}

init();
