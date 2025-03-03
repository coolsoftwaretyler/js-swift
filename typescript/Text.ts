declare function createSwiftText(id: string, text: string, style: TextStyle): void;
declare function updateSwiftText(id: string, text: string, style: TextStyle): void;

export interface TextStyle {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    padding?: number;
    cornerRadius?: number;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    kerning?: number;
    lineSpacing?: number;
    textAlignment?: string;
    shadowRadius?: number;
    shadowX?: number;
    shadowY?: number;
    shadowColor?: string;
}

export interface TextConfig {
    id?: string;
    text: string;
    style?: TextStyle;
}

const defaultStyle: TextStyle = {
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
    private textIds: Set<string>;
    private id: string;
    private text: string;
    private style: TextStyle;

    constructor(config: TextConfig, textIds: Set<string>) {
        this.textIds = textIds;
        this.id = config.id || generateId();
        this.text = config.text;
        this.style = {
            ...defaultStyle,
            ...config.style || {}
        };
    }

    // Create the text in SwiftUI
    create(): this {
        createSwiftText(this.id, this.text, this.style);
        this.textIds.add(this.id);
        return this;
    }

    // Update existing text
    update(config: Partial<TextConfig>): this {
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
    getId(): string {
        return this.id;
    }
}

// Helper function to generate unique IDs
function generateId(): string {
    return 'text_' + Math.random().toString(36).substr(2, 9);
}