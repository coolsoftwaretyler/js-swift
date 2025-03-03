import { TextBuilder } from './TextBuilder.js';
// State for this instance
const textIds = new Set();
const timerIds = new Set();
// Helper function to generate unique IDs
function generateId() {
    return 'text_' + Math.random().toString(36).substr(2, 9);
}
// Create a new text with builder pattern
function text(content) {
    return new TextBuilder(generateId(), content, textIds);
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
    text(randomText)
        .fontSize(10)
        .color('#1e88e5')
        .backgroundColor('#e3f2fd')
        .padding(12)
        .cornerRadius(10)
        .shadow(4, 2, 2, '#000000')
        .create();
}
// Create a text with a counter
export function createCounterText() {
    const id = generateId();
    let count = 0;
    const builder = text(`Counter: ${count}`)
        .fontSize(24)
        .fontWeight('bold')
        .color('#4a148c')
        .backgroundColor('#f3e5f5')
        .padding(16)
        .cornerRadius(12)
        .align('center')
        .create();
    const timerId = setInterval(() => {
        count++;
        builder.update(`Counter: ${count}`);
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
