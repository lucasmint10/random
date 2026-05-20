import { generateGreeting } from './utils.js';

// DOM Elements
const statusText = document.getElementById('status');
const actionButton = document.getElementById('action-btn');

// Define appState directly on the global window object
window.appState = {
    clickCount: 0,
    userName: 'Explorer'
};

// Event Handler
actionButton.addEventListener('click', () => {
    // Accessing it globally now
    window.appState.clickCount++;
    
    if (window.appState.clickCount === 1) {
        statusText.innerText = generateGreeting(window.appState.userName);
    } else {
        statusText.innerText = `You've clicked this button ${window.appState.clickCount} times. Still zero bundlers involved!`;
    }
});

console.log("Main application loaded. Type 'window.appState' in this console to inspect or modify the state!");
