import { Text } from './Text.js';
// State for this instance
const textIds = new Set();
const timerIds = new Set();
// Create a counter text
let count = 0;
const counter = new Text({
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
}, textIds).create();
// Update counter every second
const timerId = setInterval(() => {
    count++;
    counter.update({ text: `Counter: ${count}` });
}, 1000);
timerIds.add(timerId);
// Create some welcome texts
new Text({
    text: "Hello from JavaScript! 👋",
    style: {
        fontSize: 20,
        color: '#1e88e5',
        backgroundColor: '#e3f2fd',
        padding: 12,
        cornerRadius: 10,
        shadowRadius: 4,
        shadowX: 2,
        shadowY: 2,
        shadowColor: '#000000'
    }
}, textIds).create();
new Text({
    text: "Swift and JavaScript working together 🤝",
    style: {
        fontSize: 16,
        color: '#2e7d32',
        backgroundColor: '#e8f5e9',
        padding: 14,
        cornerRadius: 8,
        fontWeight: 'bold'
    }
}, textIds).create();
new Text({
    text: "Dynamic text creation 🚀",
    style: {
        fontSize: 18,
        color: '#c2185b',
        backgroundColor: '#fce4ec',
        padding: 10,
        cornerRadius: 15,
        textAlignment: 'center',
        shadowRadius: 3,
        shadowX: 1,
        shadowY: 1,
        shadowColor: '#000000'
    }
}, textIds).create();
