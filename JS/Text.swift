//
//  Text.swift
//  JS
//
//  Created by Tyler Williams on 3/2/25.
//

import SwiftUI

struct TextStyle: Equatable {
    var fontSize: CGFloat = 16
    var fontWeight: Font.Weight = .regular
    var foregroundColor: Color = .primary
    var backgroundColor: Color = .clear
    var padding: CGFloat = 8
    var cornerRadius: CGFloat = 8
    var italic: Bool = false
    var underline: Bool = false
    var strikethrough: Bool = false
    var kerning: CGFloat = 0
    var lineSpacing: CGFloat = 0
    var textAlignment: TextAlignment = .leading
    var shadow: (radius: CGFloat, x: CGFloat, y: CGFloat, color: Color)? = nil
    
    static func == (lhs: TextStyle, rhs: TextStyle) -> Bool {
        lhs.fontSize == rhs.fontSize &&
        lhs.fontWeight == rhs.fontWeight &&
        lhs.padding == rhs.padding &&
        lhs.cornerRadius == rhs.cornerRadius &&
        lhs.italic == rhs.italic &&
        lhs.underline == rhs.underline &&
        lhs.strikethrough == rhs.strikethrough &&
        lhs.kerning == rhs.kerning &&
        lhs.lineSpacing == rhs.lineSpacing &&
        lhs.textAlignment == rhs.textAlignment &&
        lhs.shadow?.radius == rhs.shadow?.radius &&
        lhs.shadow?.x == rhs.shadow?.x &&
        lhs.shadow?.y == rhs.shadow?.y
    }
}

struct TextItem: Identifiable {
    let id: String
    var text: String
    var style: TextStyle
}
