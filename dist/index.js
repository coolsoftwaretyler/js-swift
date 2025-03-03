import { Text } from './Text.js';
// State for this instance
const textIds = new Set();
const timerIds = new Set();
// Helper function to generate unique IDs
function generateId() {
    return 'text_' + Math.random().toString(36).substr(2, 9);
}
// Create a new text with random content
export function createRandomText() {
    const randomTexts = [
        "Hello from JavaScript! 👋",
        "Swift and JavaScript working together 🤝",
        "Dynamic text creation 🚀",
        "This is pretty cool! ✨",
        "JavaScript is fun! 🎮"
    ];
    const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    const config = {
        text: randomText,
        style: {
            fontSize: 10,
            color: '#1e88e5',
            backgroundColor: '#e3f2fd',
            padding: 12,
            cornerRadius: 10,
            shadowRadius: 4,
            shadowX: 2,
            shadowY: 2,
            shadowColor: '#000000'
        }
    };
    new Text(config, textIds).create();
}
// Create a text with a counter
export function createCounterText() {
    let count = 0;
    const config = {
        text: `Counter: ${count}`,
        style: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#4a148c',
            backgroundColor: '#f3e5f5',
            padding: 16,
            cornerRadius: 12,
            textAlignment: 'center'
        }
    };
    const builder = new Text(config, textIds).create();
    const timerId = setInterval(() => {
        count++;
        builder.update({ text: `Counter: ${count}` });
    }, 1000);
    timerIds.add(timerId);
}
// Clear all texts
export function clearAllTexts() {
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
// Initialize with some examples
createRandomText();
createCounterText();
createRandomText();
new Text({ text: 'Hello from JavaScript!' }, textIds).create();
