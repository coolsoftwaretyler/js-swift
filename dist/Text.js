const defaultStyle = {
    fontSize: 32,
    fontWeight: 'regular',
    color: '#000000',
    backgroundColor: '#ffffff',
    padding: 8,
    cornerRadius: 8,
    italic: false,
    underline: false,
    strikethrough: false,
    kerning: 0,
    lineSpacing: 0,
    textAlignment: 'leading'
};
// Text styling API
export class Text {
    constructor(config, textIds) {
        this.textIds = textIds;
        this.id = config.id || generateId();
        this.text = config.text;
        this.style = {
            ...defaultStyle,
            ...config.style || {}
        };
    }
    // Create the text in SwiftUI
    create() {
        createSwiftText(this.id, this.text, this.style);
        this.textIds.add(this.id);
        return this;
    }
    // Update existing text
    update(config) {
        if (config.text !== undefined) {
            this.text = config.text;
        }
        if (config.style) {
            this.style = {
                ...this.style,
                ...config.style
            };
        }
        updateSwiftText(this.id, this.text, this.style);
        return this;
    }
    // Get the current ID
    getId() {
        return this.id;
    }
}
// Helper function to generate unique IDs
function generateId() {
    return 'text_' + Math.random().toString(36).substr(2, 9);
}
