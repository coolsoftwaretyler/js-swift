"use strict";
var SwiftJSBridge = (() => {
  // dist/Text.js
  var defaultStyle = {
    fontSize: 32,
    fontWeight: "regular",
    color: "#000000",
    backgroundColor: "#ffffff",
    padding: 8,
    cornerRadius: 8,
    italic: false,
    underline: false,
    strikethrough: false,
    kerning: 0,
    lineSpacing: 0,
    textAlignment: "leading"
  };
  var Text = class {
    constructor(config, textIds2) {
      this.textIds = textIds2;
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
      if (config.text !== void 0) {
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
  };
  function generateId() {
    return "text_" + Math.random().toString(36).substr(2, 9);
  }

  // dist/index.js
  var textIds = /* @__PURE__ */ new Set();
  var timerIds = /* @__PURE__ */ new Set();
  var count = 0;
  var counter = new Text({
    text: `Counter: ${count}`,
    style: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#4a148c",
      backgroundColor: "#f3e5f5",
      padding: 16,
      cornerRadius: 12,
      textAlignment: "center"
    }
  }, textIds).create();
  var timerId = setInterval(() => {
    count++;
    counter.update({ text: `Counter: ${count}` });
  }, 1e3);
  timerIds.add(timerId);
  new Text({
    text: "Hello from JavaScript! \u{1F44B}",
    style: {
      fontSize: 20,
      color: "#1e88e5",
      backgroundColor: "#e3f2fd",
      padding: 12,
      cornerRadius: 10,
      shadowRadius: 4,
      shadowX: 2,
      shadowY: 2,
      shadowColor: "#000000"
    }
  }, textIds).create();
  new Text({
    text: "Swift and JavaScript working together \u{1F91D}",
    style: {
      fontSize: 16,
      color: "#2e7d32",
      backgroundColor: "#e8f5e9",
      padding: 14,
      cornerRadius: 8,
      fontWeight: "bold"
    }
  }, textIds).create();
  new Text({
    text: "Dynamic text creation \u{1F680}",
    style: {
      fontSize: 18,
      color: "#c2185b",
      backgroundColor: "#fce4ec",
      padding: 10,
      cornerRadius: 15,
      textAlignment: "center",
      shadowRadius: 3,
      shadowX: 1,
      shadowY: 1,
      shadowColor: "#000000"
    }
  }, textIds).create();
})();
//# sourceMappingURL=index.js.map
