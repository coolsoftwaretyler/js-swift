//
//  ContentView.swift
//  JS
//
//  Created by Tyler Williams on 3/2/25.
//

import SwiftUI
import JavaScriptCore

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
        // Note: Color is already Equatable
    }
}

struct TextItem: Identifiable {
    let id: String
    var text: String
    var style: TextStyle
}

class JavaScriptManager: ObservableObject {
    @Published var textItems: [TextItem] = []
    private var context: JSContext?
    private var timers: [String: Timer] = [:]
    private var reloadTimer: Timer?
    private let serverURL = "http://localhost:3000/script.js"
    private var currentSource: String = ""
    
    init() {
        createContext()
        loadJavaScript()
        setupPolling()
    }
    
    private func createContext() {
        // Create fresh context
        context = JSContext()
        
        guard let context = context else { return }
        
        // Add exception handler
        context.exceptionHandler = { context, exception in
            print("⚠️ JS Error:", exception?.toString() ?? "unknown error")
        }
        
        // Expose Swift function to JavaScript for creating new text items
        let createText: @convention(block) (String, String, [String: Any]) -> Void = { [weak self] (id, text, style) in
            print("📱 Creating text with id:", id, "text:", text, "style:", style)
            DispatchQueue.main.async {
                var textStyle = TextStyle(
                    fontSize: style["fontSize"] as? CGFloat ?? 16,
                    fontWeight: self?.fontWeightFrom(value: style["fontWeight"] as? String) ?? .regular,
                    foregroundColor: self?.colorFrom(hex: style["color"] as? String) ?? .primary,
                    backgroundColor: self?.colorFrom(hex: style["backgroundColor"] as? String) ?? .clear,
                    padding: style["padding"] as? CGFloat ?? 8,
                    cornerRadius: style["cornerRadius"] as? CGFloat ?? 8,
                    italic: style["italic"] as? Bool ?? false,
                    underline: style["underline"] as? Bool ?? false,
                    strikethrough: style["strikethrough"] as? Bool ?? false,
                    kerning: style["kerning"] as? CGFloat ?? 0,
                    lineSpacing: style["lineSpacing"] as? CGFloat ?? 0,
                    textAlignment: self?.alignmentFrom(value: style["textAlignment"] as? String) ?? .leading
                )
                
                if let shadowRadius = style["shadowRadius"] as? CGFloat {
                    textStyle.shadow = (
                        radius: shadowRadius,
                        x: style["shadowX"] as? CGFloat ?? 0,
                        y: style["shadowY"] as? CGFloat ?? 0,
                        color: self?.colorFrom(hex: style["shadowColor"] as? String) ?? .gray
                    )
                }
                
                self?.textItems.append(TextItem(id: id, text: text, style: textStyle))
            }
        }
        
        // Expose Swift function to JavaScript for updating existing text items
        let updateText: @convention(block) (String, String, [String: Any]?) -> Void = { [weak self] (id, newText, style) in
            print("📱 Updating text with id:", id, "text:", newText, "style:", style ?? [:])
            DispatchQueue.main.async {
                if let index = self?.textItems.firstIndex(where: { $0.id == id }) {
                    var item = self?.textItems[index]
                    item?.text = newText
                    
                    if let style = style {
                        // Update only the provided style properties
                        if let fontSize = style["fontSize"] as? CGFloat {
                            item?.style.fontSize = fontSize
                        }
                        if let fontWeight = style["fontWeight"] as? String {
                            item?.style.fontWeight = self?.fontWeightFrom(value: fontWeight) ?? .regular
                        }
                        if let color = style["color"] as? String {
                            item?.style.foregroundColor = self?.colorFrom(hex: color) ?? .primary
                        }
                        if let backgroundColor = style["backgroundColor"] as? String {
                            item?.style.backgroundColor = self?.colorFrom(hex: backgroundColor) ?? .clear
                        }
                        if let padding = style["padding"] as? CGFloat {
                            item?.style.padding = padding
                        }
                        if let cornerRadius = style["cornerRadius"] as? CGFloat {
                            item?.style.cornerRadius = cornerRadius
                        }
                        if let italic = style["italic"] as? Bool {
                            item?.style.italic = italic
                        }
                        if let underline = style["underline"] as? Bool {
                            item?.style.underline = underline
                        }
                        if let strikethrough = style["strikethrough"] as? Bool {
                            item?.style.strikethrough = strikethrough
                        }
                        if let kerning = style["kerning"] as? CGFloat {
                            item?.style.kerning = kerning
                        }
                        if let lineSpacing = style["lineSpacing"] as? CGFloat {
                            item?.style.lineSpacing = lineSpacing
                        }
                        if let textAlignment = style["textAlignment"] as? String {
                            item?.style.textAlignment = self?.alignmentFrom(value: textAlignment) ?? .leading
                        }
                        if let shadowRadius = style["shadowRadius"] as? CGFloat {
                            item?.style.shadow = (
                                radius: shadowRadius,
                                x: style["shadowX"] as? CGFloat ?? 0,
                                y: style["shadowY"] as? CGFloat ?? 0,
                                color: self?.colorFrom(hex: style["shadowColor"] as? String) ?? .gray
                            )
                        }
                    }
                    
                    if let item = item {
                        self?.textItems[index] = item
                    }
                } else {
                    print("⚠️ Could not find text with id:", id)
                }
            }
        }
        
        // Expose Swift function to JavaScript for removing text items
        let removeText: @convention(block) (String) -> Void = { [weak self] id in
            print("📱 Removing text with id:", id)
            DispatchQueue.main.async {
                self?.textItems.removeAll(where: { $0.id == id })
            }
        }
        
        // Expose setInterval to JavaScript
        let setInterval: @convention(block) (JSValue, Double) -> String = { [weak self] (callback, interval) in
            let timerId = UUID().uuidString
            print("📱 Creating timer with id:", timerId)
            
            let timer = Timer.scheduledTimer(withTimeInterval: interval/1000.0, repeats: true) { _ in
                DispatchQueue.main.async {
                    callback.call(withArguments: [])
                }
            }
            
            self?.timers[timerId] = timer
            return timerId
        }
        
        // Expose clearInterval to JavaScript
        let clearInterval: @convention(block) (String) -> Void = { [weak self] timerId in
            print("📱 Clearing timer with id:", timerId)
            self?.timers[timerId]?.invalidate()
            self?.timers.removeValue(forKey: timerId)
        }
        
        // Helper functions
        context.setObject(createText, forKeyedSubscript: "createSwiftText" as NSString)
        context.setObject(updateText, forKeyedSubscript: "updateSwiftText" as NSString)
        context.setObject(removeText, forKeyedSubscript: "removeSwiftText" as NSString)
        context.setObject(setInterval, forKeyedSubscript: "setInterval" as NSString)
        context.setObject(clearInterval, forKeyedSubscript: "clearInterval" as NSString)
    }
    
    // Helper functions for style conversion
    private func colorFrom(hex: String?) -> Color {
        guard let hex = hex else { return .primary }
        var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
        hexSanitized = hexSanitized.replacingOccurrences(of: "#", with: "")
        
        var rgb: UInt64 = 0
        Scanner(string: hexSanitized).scanHexInt64(&rgb)
        
        let r = Double((rgb & 0xFF0000) >> 16) / 255.0
        let g = Double((rgb & 0x00FF00) >> 8) / 255.0
        let b = Double(rgb & 0x0000FF) / 255.0
        
        return Color(red: r, green: g, blue: b)
    }
    
    private func fontWeightFrom(value: String?) -> Font.Weight {
        guard let value = value else { return .regular }
        switch value.lowercased() {
        case "ultralight": return .ultraLight
        case "thin": return .thin
        case "light": return .light
        case "regular": return .regular
        case "medium": return .medium
        case "semibold": return .semibold
        case "bold": return .bold
        case "heavy": return .heavy
        case "black": return .black
        default: return .regular
        }
    }
    
    private func alignmentFrom(value: String?) -> TextAlignment {
        guard let value = value else { return .leading }
        switch value.lowercased() {
        case "leading": return .leading
        case "center": return .center
        case "trailing": return .trailing
        default: return .leading
        }
    }
    
    private func setupPolling() {
        reloadTimer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            self?.checkForChanges()
        }
    }
    
    private func checkForChanges() {
        guard let url = URL(string: serverURL) else { return }
        
        URLSession.shared.dataTask(with: url) { [weak self] data, response, error in
            guard let data = data,
                  let source = String(data: data, encoding: .utf8),
                  source != self?.currentSource else {
                return
            }
            
            DispatchQueue.main.async {
                print("🔄 JavaScript changed, reloading...")
                self?.currentSource = source
                self?.clearAllState()
                self?.createContext()
                self?.context?.evaluateScript(source)
                print("✅ JavaScript reloaded")
            }
        }.resume()
    }
    
    private func loadJavaScript() {
        print("📜 Loading JavaScript from server...")
        
        guard let url = URL(string: serverURL) else {
            print("⚠️ Invalid server URL")
            return
        }
        
        URLSession.shared.dataTask(with: url) { [weak self] data, response, error in
            if let error = error {
                print("⚠️ Error loading JavaScript:", error)
                return
            }
            
            guard let data = data,
                  let source = String(data: data, encoding: .utf8) else {
                print("⚠️ Invalid JavaScript data")
                return
            }
            
            DispatchQueue.main.async {
                self?.currentSource = source
                self?.clearAllState()
                self?.createContext()
                self?.context?.evaluateScript(source)
                print("✅ JavaScript loaded and evaluated")
            }
        }.resume()
    }
    
    private func clearAllState() {
        // Clear all timers
        timers.values.forEach { $0.invalidate() }
        timers.removeAll()
        
        // Clear all texts
        textItems.removeAll()
        
        // Clear context
        context = nil
    }
    
    func evaluateScript(_ script: String) {
        print("🔄 Evaluating script:", script)
        context?.evaluateScript(script)
        if let exception = context?.exception {
            print("⚠️ Error evaluating script:", exception.toString() ?? "unknown error")
        }
    }
    
    deinit {
        clearAllState()
        reloadTimer?.invalidate()
    }
}

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
            
            Divider()
            
            VStack(spacing: 10) {
                Button("Add Random Text") {
                    jsManager.evaluateScript("createRandomText()")
                }
                
                Button("Create Counter Text") {
                    jsManager.evaluateScript("createCounterText()")
                }
                
                Button("Clear All") {
                    jsManager.evaluateScript("clearAllTexts()")
                }
            }
            .padding()
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
