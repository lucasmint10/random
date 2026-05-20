import { generateGreeting } from './utils.js';

// Dom Elements
const statusText = document.getElementById('status');
const actionButton = document.getElementById('action-btn');

// Application State
const appState = {
    clickCount: 0,
    userName: 'Explorer'
};

// Event Handler
actionButton.addEventListener('click', () => {
    appState.clickCount++;
    
    if (appState.clickCount === 1) {
        // Use our imported native module function
        statusText.innerText = generateGreeting(appState.userName);
    } else {
        statusText.innerText = `You've clicked this button ${appState.clickCount} times. Still zero bundlers involved!`;
    }
});

console.log("Main application loaded successfully. Try modifying appState in your console!");
