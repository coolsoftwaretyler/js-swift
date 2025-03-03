//
//  ContentView.swift
//  JS
//
//  Created by Tyler Williams on 3/2/25.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var jsManager = JavaScriptManager()
    
    var body: some View {
        VStack {
            ScrollView {
                VStack(spacing: 10) {
                    ForEach(jsManager.textItems) { item in
                        Text(item.text)
                            .font(.system(size: item.style.fontSize))
                            .fontWeight(item.style.fontWeight)
                            .foregroundColor(item.style.foregroundColor)
                            .padding(item.style.padding)
                            .background(item.style.backgroundColor)
                            .cornerRadius(item.style.cornerRadius)
                            .italic(item.style.italic)
                            .underline(item.style.underline)
                            .strikethrough(item.style.strikethrough)
                            .kerning(item.style.kerning)
                            .lineSpacing(item.style.lineSpacing)
                            .multilineTextAlignment(item.style.textAlignment)
                            .if(item.style.shadow != nil) { view in
                                view.shadow(
                                    color: item.style.shadow?.color ?? .clear,
                                    radius: item.style.shadow?.radius ?? 0,
                                    x: item.style.shadow?.x ?? 0,
                                    y: item.style.shadow?.y ?? 0
                                )
                            }
                    }
                }
                .padding()
            }
        }
    }
}

// Helper View extension for conditional modifiers
extension View {
    @ViewBuilder func `if`<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
        if condition {
            transform(self)
        } else {
            self
        }
    }
}
