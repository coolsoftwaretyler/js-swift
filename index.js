"use strict";
var SwiftJSBridge = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // dist/index.js
  var index_exports = {};
  __export(index_exports, {
    clearAllTexts: () => clearAllTexts,
    createCounterText: () => createCounterText,
    createRandomText: () => createRandomText
  });

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
  function createRandomText() {
    const randomTexts = [
      "Hello from JavaScript! \u{1F44B}",
      "Swift and JavaScript working together \u{1F91D}",
      "Dynamic text creation \u{1F680}",
      "This is pretty cool! \u2728",
      "JavaScript is fun! \u{1F3AE}"
    ];
    const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    const config = {
      text: randomText,
      style: {
        fontSize: 10,
        color: "#1e88e5",
        backgroundColor: "#e3f2fd",
        padding: 12,
        cornerRadius: 10,
        shadowRadius: 4,
        shadowX: 2,
        shadowY: 2,
        shadowColor: "#000000"
      }
    };
    new Text(config, textIds).create();
  }
  function createCounterText() {
    let count = 0;
    const config = {
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
    };
    const builder = new Text(config, textIds).create();
    const timerId = setInterval(() => {
      count++;
      builder.update({ text: `Counter: ${count}` });
    }, 1e3);
    timerIds.add(timerId);
  }
  function clearAllTexts() {
    timerIds.forEach((timerId) => {
      clearInterval(timerId);
    });
    timerIds.clear();
    textIds.forEach((id) => {
      removeSwiftText(id);
    });
    textIds.clear();
  }
  createRandomText();
  createCounterText();
  createRandomText();
  new Text({ text: "Hello from JavaScript!" }, textIds).create();
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=index.js.map
