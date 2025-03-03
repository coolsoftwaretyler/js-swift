// Text styling API
export class TextBuilder {
    constructor(id, text, textIds) {
        this.textIds = textIds;
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
        this.textIds.add(this.id);
        return this;
    }
    // Update existing text
    update(newText = null) {
        updateSwiftText(this.id, newText || this.text, this.style);
        return this;
    }
}
