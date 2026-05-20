import { videoCatalog } from './catalog.js';

const videoPlayer = document.getElementById('main-video-element');
const titleDisplay = document.getElementById('video-title');
const descDisplay = document.getElementById('video-desc');
const playlistContainer = document.getElementById('playlist-container');

// Expose state globally so users can query the player via DevTools
window.videoState = {
    catalog: videoCatalog,
    currentVideoId: null,
    isPlaying: false
};

/**
 * Changes the source track of the native HTML5 player engine
 */
function playVideo(videoObj) {
    window.videoState.currentVideoId = videoObj.id;
    
    // Update active player properties directly
    videoPlayer.src = videoObj.videoUrl;
    titleDisplay.innerText = videoObj.title;
    descDisplay.innerText = videoObj.description;
    
    window.videoState.isPlaying = true;
    
    // Refresh visual borders in playlist sidebar
    updateActiveCardUI();
}

/**
 * Generates and appends standard DOM nodes for each video in the list
 */
function renderPlaylist() {
    playlistContainer.innerHTML = '';
    
    window.videoState.catalog.forEach(video => {
        const card = document.createElement('div');
        card.className = `thumb-card`;
        card.setAttribute('data-id', video.id);
        
        card.innerHTML = `
            <div class="thumb-img">${video.category}</div>
            <div class="thumb-details">
                <h4>${escapeHTML(video.title)}</h4>
                <p>${escapeHTML(video.category)}</p>
            </div>
        `;
        
        // Native event registration without heavy wrappers
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
    // Default to track 1 on load
    if (window.videoState.catalog.length > 0) {
        playVideo(window.videoState.catalog[0]);
    }
}

init();
