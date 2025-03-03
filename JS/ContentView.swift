//
//  ContentView.swift
//  JS
//
//  Created by Tyler Williams on 3/2/25.
//

import SwiftUI
import JavaScriptCore

struct TextItem: Identifiable {
    let id: String
    var text: String
}

class JavaScriptManager: ObservableObject {
    @Published var textItems: [TextItem] = []
    let context: JSContext
    private var timers: [String: Timer] = [:]
    
    init() {
        context = JSContext()!
        
        // Add exception handler
        context.exceptionHandler = { context, exception in
            print("⚠️ JS Error:", exception?.toString() ?? "unknown error")
        }
        
        // Expose Swift function to JavaScript for creating new text items
        let createText: @convention(block) (String, String) -> Void = { [weak self] (id, text) in
            print("📱 Creating text with id:", id, "text:", text)
            DispatchQueue.main.async {
                self?.textItems.append(TextItem(id: id, text: text))
            }
        }
        
        // Expose Swift function to JavaScript for updating existing text items
        let updateText: @convention(block) (String, String) -> Void = { [weak self] (id, newText) in
            print("📱 Updating text with id:", id, "new text:", newText)
            DispatchQueue.main.async {
                if let index = self?.textItems.firstIndex(where: { $0.id == id }) {
                    self?.textItems[index].text = newText
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
        
        // Make the functions available to JavaScript
        context.setObject(createText, forKeyedSubscript: "createSwiftText" as NSString)
        context.setObject(updateText, forKeyedSubscript: "updateSwiftText" as NSString)
        context.setObject(removeText, forKeyedSubscript: "removeSwiftText" as NSString)
        context.setObject(setInterval, forKeyedSubscript: "setInterval" as NSString)
        context.setObject(clearInterval, forKeyedSubscript: "clearInterval" as NSString)
        
        // Load the JavaScript file
        if let jsPath = Bundle.main.path(forResource: "script", ofType: "js"),
           let jsSource = try? String(contentsOfFile: jsPath, encoding: .utf8) {
            print("📜 Loading JavaScript file...")
            context.evaluateScript(jsSource)
        } else {
            print("⚠️ Could not load JavaScript file")
        }
    }
    
    func evaluateScript(_ script: String) {
        print("🔄 Evaluating script:", script)
        context.evaluateScript(script)
        if let exception = context.exception {
            print("⚠️ Error evaluating script:", exception.toString() ?? "unknown error")
        }
    }
    
    deinit {
        // Clean up all timers
        timers.values.forEach { $0.invalidate() }
        timers.removeAll()
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
                            .padding()
                            .background(Color.gray.opacity(0.1))
                            .cornerRadius(8)
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
