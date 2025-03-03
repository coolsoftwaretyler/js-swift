function getRandomNumber() {
    return Math.random();
}

// Text styling API
class TextBuilder {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.style = {
            fontSize: 32,
            fontWeight: 'regular',
            color: '#000000',
            backgroundColor: 'clear',
            padding: 8,
            cornerRadius: 8,
            italic: false,
            underline: false,
            strikethrough: false,
            kerning: 0,
            lineSpacing: 0,
            textAlignment: 'leading'
        };
    }

    // Font styling
    fontSize(size) {
        this.style.fontSize = size;
        return this;
    }

    fontWeight(weight) {
        this.style.fontWeight = weight;
        return this;
    }

    // Colors
    color(hex) {
        this.style.color = hex;
        return this;
    }

    backgroundColor(hex) {
        this.style.backgroundColor = hex;
        return this;
    }

    // Layout
    padding(value) {
        this.style.padding = value;
        return this;
    }

    cornerRadius(value) {
        this.style.cornerRadius = value;
        return this;
    }

    // Text style
    italic() {
        this.style.italic = true;
        return this;
    }

    underline() {
        this.style.underline = true;
        return this;
    }

    strikethrough() {
        this.style.strikethrough = true;
        return this;
    }

    kerning(value) {
        this.style.kerning = value;
        return this;
    }

    lineSpacing(value) {
        this.style.lineSpacing = value;
        return this;
    }

    align(alignment) {
        this.style.textAlignment = alignment;
        return this;
    }

    // Shadow
    shadow(radius, x = 0, y = 0, color = '#000000') {
        this.style.shadowRadius = radius;
        this.style.shadowX = x;
        this.style.shadowY = y;
        this.style.shadowColor = color;
        return this;
    }

    // Create the text in SwiftUI
    create() {
        createSwiftText(this.id, this.text, this.style);
        textIds.add(this.id);
        return this;
    }

    // Update existing text
    update(newText = null) {
        updateSwiftText(this.id, newText || this.text, this.style);
        return this;
    }
}

// State for this instance
const textIds = new Set();
const timerIds = new Set();

// Helper function to generate unique IDs
function generateId() {
    return 'text_' + Math.random().toString(36).substr(2, 9);
}

// Create a new text with builder pattern
function text(content) {
    return new TextBuilder(generateId(), content);
}

// Create a new text with random content
function createRandomText() {
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
function createCounterText() {
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
