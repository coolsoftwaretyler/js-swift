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
export declare class Text {
    private textIds;
    private id;
    private text;
    private style;
    constructor(config: TextConfig, textIds: Set<string>);
    create(): this;
    update(config: Partial<TextConfig>): this;
    getId(): string;
}
