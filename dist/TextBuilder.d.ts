export declare class TextBuilder {
    private textIds;
    private id;
    private text;
    private style;
    constructor(id: string, text: string, textIds: Set<string>);
    fontSize(size: number): this;
    fontWeight(weight: string): this;
    color(hex: string): this;
    backgroundColor(hex: string): this;
    padding(value: number): this;
    cornerRadius(value: number): this;
    italic(): this;
    underline(): this;
    strikethrough(): this;
    kerning(value: number): this;
    lineSpacing(value: number): this;
    align(alignment: string): this;
    shadow(radius: number, x?: number, y?: number, color?: string): this;
    create(): this;
    update(newText?: string | null): this;
}
