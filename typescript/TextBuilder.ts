declare function createSwiftText(id: string, text: string, style: TextStyle): void;
declare function updateSwiftText(id: string, text: string, style: TextStyle): void;

interface TextStyle {
    fontSize: number;
    fontWeight: string;
    color: string;
    backgroundColor: string;
    padding: number;
    cornerRadius: number;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    kerning: number;
    lineSpacing: number;
    textAlignment: string;
    shadowRadius?: number;
    shadowX?: number;
    shadowY?: number;
    shadowColor?: string;
}

// Text styling API
export class TextBuilder {
    private textIds: Set<string>;
    private id: string;
    private text: string;
    private style: TextStyle;

    constructor(id: string, text: string, textIds: Set<string>) {
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
    fontSize(size: number): this {
        this.style.fontSize = size;
        return this;
    }

    fontWeight(weight: string): this {
        this.style.fontWeight = weight;
        return this;
    }

    // Colors
    color(hex: string): this {
        this.style.color = hex;
        return this;
    }

    backgroundColor(hex: string): this {
        this.style.backgroundColor = hex;
        return this;
    }

    // Layout
    padding(value: number): this {
        this.style.padding = value;
        return this;
    }

    cornerRadius(value: number): this {
        this.style.cornerRadius = value;
        return this;
    }

    // Text style
    italic(): this {
        this.style.italic = true;
        return this;
    }

    underline(): this {
        this.style.underline = true;
        return this;
    }

    strikethrough(): this {
        this.style.strikethrough = true;
        return this;
    }

    kerning(value: number): this {
        this.style.kerning = value;
        return this;
    }

    lineSpacing(value: number): this {
        this.style.lineSpacing = value;
        return this;
    }

    align(alignment: string): this {
        this.style.textAlignment = alignment;
        return this;
    }

    // Shadow
    shadow(radius: number, x: number = 0, y: number = 0, color: string = '#000000'): this {
        this.style.shadowRadius = radius;
        this.style.shadowX = x;
        this.style.shadowY = y;
        this.style.shadowColor = color;
        return this;
    }

    // Create the text in SwiftUI
    create(): this {
        createSwiftText(this.id, this.text, this.style);
        this.textIds.add(this.id);
        return this;
    }

    // Update existing text
    update(newText: string | null = null): this {
        updateSwiftText(this.id, newText || this.text, this.style);
        return this;
    }
}