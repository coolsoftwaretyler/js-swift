function getRandomNumber() {
    return Math.random();
}

// State for this instance
const textIds = new Set();
const timerIds = new Set();

// Helper function to generate unique IDs
function generateId() {
    return 'text_' + Math.random().toString(36).substr(2, 9);
}

// Create a new text with random content
function createRandomText() {
    const id = generateId();
    const randomTexts = [
        "Hello from JavaScript! 👋",
        "Swift and JavaScript working together 🤝",
        "Dynamic text creation 🚀",
        "This is pretty cool! ✨",
        "JavaScript is fun! 🎮"
    ];
    const text = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    createSwiftText(id, text);
    textIds.add(id);
}

// Create a text with a counter
function createCounterText() {
    const id = generateId();
    let count = 0;
    
    createSwiftText(id, "Counter: 0");
    textIds.add(id);
    
    // Create a timer that updates every second
    const timerId = setInterval(() => {
        count++;
        updateSwiftText(id, `Counter: ${count}`);
    }, 1000);
    
    timerIds.add(timerId);
}

// Clear all texts
function clearAllTexts() {
    // Clear all timers
    timerIds.forEach(timerId => {
        clearInterval(timerId);
    });
    timerIds.clear();
    
    // Remove all texts
    textIds.forEach(id => {
        removeSwiftText(id);
    });
    textIds.clear();
}

// Create initial examples
createRandomText();
createCounterText();
createRandomText();
