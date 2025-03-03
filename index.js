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

  // javascript/entrypoint.js
  var entrypoint_exports = {};
  __export(entrypoint_exports, {
    clearAllTexts: () => clearAllTexts,
    createCounterText: () => createCounterText,
    createRandomText: () => createRandomText
  });

  // javascript/TextBuilder.js
  var TextBuilder = class {
    // textIds is a Set of all text IDs
    constructor(id, text2, textIds2) {
      this.textIds = textIds2;
      this.id = id;
      this.text = text2;
      this.style = {
        fontSize: 32,
        fontWeight: "regular",
        color: "#000000",
        backgroundColor: "clear",
        padding: 8,
        cornerRadius: 8,
        italic: false,
        underline: false,
        strikethrough: false,
        kerning: 0,
        lineSpacing: 0,
        textAlignment: "leading"
      };
    }
    // Font styling
    fontSize(size) {
      this.style.fontSize = size;
      return this;
    }
    fontWeight(weight) {
      this.style.fontWeight = weight;
      return this;
    }
    // Colors
    color(hex) {
      this.style.color = hex;
      return this;
    }
    backgroundColor(hex) {
      this.style.backgroundColor = hex;
      return this;
    }
    // Layout
    padding(value) {
      this.style.padding = value;
      return this;
    }
    cornerRadius(value) {
      this.style.cornerRadius = value;
      return this;
    }
    // Text style
    italic() {
      this.style.italic = true;
      return this;
    }
    underline() {
      this.style.underline = true;
      return this;
    }
    strikethrough() {
      this.style.strikethrough = true;
      return this;
    }
    kerning(value) {
      this.style.kerning = value;
      return this;
    }
    lineSpacing(value) {
      this.style.lineSpacing = value;
      return this;
    }
    align(alignment) {
      this.style.textAlignment = alignment;
      return this;
    }
    // Shadow
    shadow(radius, x = 0, y = 0, color = "#000000") {
      this.style.shadowRadius = radius;
      this.style.shadowX = x;
      this.style.shadowY = y;
      this.style.shadowColor = color;
      return this;
    }
    // Create the text in SwiftUI
    create() {
      createSwiftText(this.id, this.text, this.style);
      this.textIds.add(this.id);
      return this;
    }
    // Update existing text
    update(newText = null) {
      updateSwiftText(this.id, newText || this.text, this.style);
      return this;
    }
  };

  // javascript/entrypoint.js
  var textIds = /* @__PURE__ */ new Set();
  var timerIds = /* @__PURE__ */ new Set();
  function generateId() {
    return "text_" + Math.random().toString(36).substr(2, 9);
  }
  function text(content) {
    return new TextBuilder(generateId(), content, textIds);
  }
  function createRandomText() {
    const randomTexts = [
      "Hello from JavaScript! \u{1F44B}",
      "Swift and JavaScript working together \u{1F91D}",
      "Dynamic text creation \u{1F680}",
      "This is pretty cool! \u2728",
      "JavaScript is fun! \u{1F3AE}"
    ];
    const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    text(randomText).fontSize(10).color("#1e88e5").backgroundColor("#e3f2fd").padding(12).cornerRadius(10).shadow(4, 2, 2, "#000000").create();
  }
  function createCounterText() {
    const id = generateId();
    let count = 0;
    const builder = text(`Counter: ${count}`).fontSize(24).fontWeight("bold").color("#4a148c").backgroundColor("#f3e5f5").padding(16).cornerRadius(12).align("center").create();
    const timerId = setInterval(() => {
      count++;
      builder.update(`Counter: ${count}`);
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
  return __toCommonJS(entrypoint_exports);
})();
window.SwiftJSBridge = SwiftJSBridge.default || SwiftJSBridge;
//# sourceMappingURL=index.js.map
