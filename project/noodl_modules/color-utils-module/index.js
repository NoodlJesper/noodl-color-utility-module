/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@noodl/noodl-sdk/index.js":
/*!************************************************!*\
  !*** ./node_modules/@noodl/noodl-sdk/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _colors = {
  "purple": "component",
  "green": "data",
  "default": "default",
  "grey": "default"
};

Noodl.defineNode = function (def) {
  var _def = {};
  _def.name = def.name;
  _def.displayNodeName = def.displayName;
  _def.usePortAsLabel = def.useInputAsLabel;
  _def.color = _colors[def.color || 'default'];
  _def.category = def.category || 'Modules';

  _def.initialize = function () {
    this.inputs = {};

    var _outputs = this.outputs = {};

    var _this = this;

    this.setOutputs = function (o) {
      for (var key in o) {
        _outputs[key] = o[key];

        _this.flagOutputDirty(key);
      }
    };

    if (typeof def.initialize === 'function') def.initialize.apply(this);
  };

  _def.inputs = {};
  _def.outputs = {};

  for (var key in def.inputs) {
    _def.inputs[key] = {
      type: _typeof(def.inputs[key]) === 'object' ? def.inputs[key].type : def.inputs[key],
      displayName: _typeof(def.inputs[key]) === 'object' ? def.inputs[key].displayName : undefined,
      group: _typeof(def.inputs[key]) === 'object' ? def.inputs[key].group : undefined,
      "default": _typeof(def.inputs[key]) === 'object' ? def.inputs[key]["default"] : undefined,
      set: function () {
        var _key = key;
        return function (value) {
          this.inputs[_key] = value;

          if (def.changed && typeof def.changed[_key] === 'function') {
            def.changed[_key].apply(this, [value]);
          }
        };
      }()
    };
  }

  for (var key in def.signals) {
    _def.inputs[key] = {
      type: 'signal',
      displayName: _typeof(def.signals[key]) === 'object' ? def.signals[key].displayName : undefined,
      valueChangedToTrue: function () {
        var _key = key;
        return function () {
          var _this2 = this;

          var _fn = _typeof(def.signals[_key]) === 'object' ? def.signals[_key].signal : def.signals[_key];

          if (typeof _fn === 'function') {
            this.scheduleAfterInputsHaveUpdated(function () {
              _fn.apply(_this2);
            });
          }
        };
      }()
    };
  }

  for (var key in def.outputs) {
    if (def.outputs[key] === 'signal') {
      _def.outputs[key] = {
        type: 'signal'
      };
    } else {
      _def.outputs[key] = {
        type: _typeof(def.outputs[key]) === 'object' ? def.outputs[key].type : def.outputs[key],
        displayName: _typeof(def.outputs[key]) === 'object' ? def.outputs[key].displayName : undefined,
        group: _typeof(def.outputs[key]) === 'object' ? def.outputs[key].group : undefined,
        getter: function () {
          var _key = key;
          return function () {
            return this.outputs[_key];
          };
        }()
      };
    }
  }

  _def.methods = _def.prototypeExtensions = {};

  for (var key in def.methods) {
    _def.prototypeExtensions[key] = def.methods[key];
  }

  if (_def.methods.onNodeDeleted) {
    // Override the onNodeDeleted if required
    _def.methods._onNodeDeleted = function () {
      this.__proto__.__proto__._onNodeDeleted.call(this);

      _def.methods.onNodeDeleted.value.call(this);
    };
  }

  return {
    node: _def,
    setup: def.setup
  };
};

Noodl.defineCollectionNode = function (def) {
  var _def = {
    name: def.name,
    category: def.category,
    color: 'data',
    inputs: def.inputs,
    outputs: Object.assign({
      Items: 'array',
      'Fetch Started': 'signal',
      'Fetch Completed': 'signal'
    }, def.outputs || {}),
    signals: Object.assign({
      Fetch: function Fetch() {
        var _this = this;

        this.sendSignalOnOutput('Fetch Started');
        var a = def.fetch.call(this, function () {
          _this.sendSignalOnOutput('Fetch Completed');
        });
        this.setOutputs({
          Items: a
        });
      }
    }, def.signals || {})
  };
  return Noodl.defineNode(_def);
};

Noodl.defineModelNode = function (def) {
  var _def = {
    name: def.name,
    category: def.category,
    color: 'data',
    inputs: {
      Id: 'string'
    },
    outputs: {
      Fetched: 'signal'
    },
    changed: {
      Id: function Id(value) {
        var _this3 = this;

        if (this._object && this._changeListener) this._object.off('change', this._changeListener);
        this._object = Noodl.Object.get(value);

        this._changeListener = function (name, value) {
          var _o = {};
          _o[name] = value;

          _this3.setOutputs(_o);
        };

        this._object.on('change', this._changeListener);

        this.setOutputs(this._object.data);
        this.sendSignalOnOutput('Fetched');
      }
    },
    initialize: function initialize() {}
  };

  for (var key in def.properties) {
    _def.inputs[key] = def.properties[key];
    _def.outputs[key] = def.properties[key];

    _def.changed[key] = function () {
      var _key = key;
      return function (value) {
        if (!this._object) return;

        this._object.set(_key, value);
      };
    }();
  }

  return Noodl.defineNode(_def);
};

Noodl.defineReactNode = function (def) {
  var _def = Noodl.defineNode(def);

  _def.node.getReactComponent = def.getReactComponent;
  _def.node.inputProps = def.inputProps;
  _def.node.inputCss = def.inputCss;
  _def.node.outputProps = def.outputProps;
  _def.node.setup = def.setup;
  return _def.node;
};

module.exports = Noodl;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//uses this library for color conversions:
//https://github.com/hhelwich/c0lor
var ColorHexToRgb = {
  name: "Color HEX to RGB",
  category: "Color",
  initialize: function initialize() {
    this._internal.inputHex = "#000000";
    this._internal.outputRGB = [0, 0, 0];
    this._internal.hasScheduledConversion = false;
  },
  inputs: {
    inputHex: {
      type: 'color',
      displayName: 'HEX color',
      group: 'HEX',
      set: function set(value) {
        if (this._internal.inputHex === value) return;
        this._internal.inputHex = value;
        this.scheduleConvertion();
      }
    }
  },
  outputs: {
    red: {
      type: 'number',
      // string, boolean, number, signal
      displayName: 'Red',
      group: 'RGB',
      getter: function getter() {
        return this._internal.outputRGB[0];
      }
    },
    green: {
      type: 'number',
      // string, boolean, number, signal
      displayName: 'Green',
      group: 'RGB',
      getter: function getter() {
        return this._internal.outputRGB[1];
      }
    },
    blue: {
      type: 'number',
      // string, boolean, number, signal
      displayName: 'Blue',
      group: 'RGB',
      getter: function getter() {
        return this._internal.outputRGB[2];
      }
    }
  },
  prototypeExtensions: {
    scheduleConvertion: function scheduleConvertion() {
      if (!this._internal.hasScheduledConversion) {
        this._internal.hasScheduledConversion = true;
        this.scheduleAfterInputsHaveUpdated(function () {
          this.convertColor();
          this._internal.hasScheduledConversion = false;
        });
      }
    },
    convertColor: function convertColor() {
      this._internal.outputRGB = hexToRGB(this._internal.inputHex);
      this.flagOutputDirty("red");
      this.flagOutputDirty("green");
      this.flagOutputDirty("blue");
    }
  }
};
var ColorRgbToHex = {
  name: "Color RGB to HEX",
  category: "Color",
  initialize: function initialize() {
    this._internal.inputRGB = [0, 0, 0];
    this._internal.outputHex = "#000000";
    this._internal.hasScheduledConversion = false;
  },
  inputs: {
    red: {
      type: 'number',
      // string, boolean, number, signal
      displayName: 'Red',
      group: 'RGB',
      set: function set(value) {
        value = this.limit(value);
        if (this._internal.inputRGB[0] === value) return;
        this._internal.inputRGB[0] = value;
        this.scheduleConvertion();
      }
    },
    green: {
      type: 'number',
      // string, boolean, number, signal
      displayName: 'Green',
      group: 'RGB',
      set: function set(value) {
        value = this.limit(value);
        if (this._internal.inputRGB[1] === value) return;
        this._internal.inputRGB[1] = value;
        this.scheduleConvertion();
      }
    },
    blue: {
      type: 'number',
      // string, boolean, number, signal
      displayName: 'Blue',
      group: 'RGB',
      set: function set(value) {
        value = this.limit(value);
        if (this._internal.inputRGB[2] === value) return;
        this._internal.inputRGB[2] = value;
        this.scheduleConvertion();
      }
    }
  },
  outputs: {
    outputHex: {
      type: 'color',
      displayName: 'Color',
      group: 'HEX',
      getter: function getter() {
        return this._internal.outputHex;
      }
    }
  },
  prototypeExtensions: {
    scheduleConvertion: function scheduleConvertion() {
      if (!this._internal.hasScheduledConversion) {
        this._internal.hasScheduledConversion = true;
        this.scheduleAfterInputsHaveUpdated(function () {
          this.convertColor();
          this._internal.hasScheduledConversion = false;
        });
      }
    },
    convertColor: function convertColor() {
      this._internal.outputHex = rgbToHEX(this._internal.inputRGB[0], this._internal.inputRGB[1], this._internal.inputRGB[2]);
      this.flagOutputDirty("outputHex");
    },
    limit: function limit(value) {
      if (value > 255) return 255;
      if (value < 0) return 0;
      return value;
    }
  }
};
var ColorHueRotation = {
  name: "Color Hue Rotation",
  category: "Color",
  initialize: function initialize() {
    this._internal.inputHex = "#000000";
    this._internal.outputHex = "#000000";
    this._internal.rotationValue = 0;
    this._internal.hasScheduledRotation = false;
  },
  inputs: {
    inputHex: {
      type: 'color',
      displayName: 'Color',
      group: 'Rotate',
      set: function set(value) {
        if (this._internal.inputHex === value) return;
        this._internal.inputHex = value;
        this.scheduleRotation();
      }
    },
    rotationValue: {
      type: 'number',
      displayName: 'Rotation',
      group: 'Rotate',
      set: function set(value) {
        if (this._internal.rotationValue === value) return;
        this._internal.rotationValue = value;
        this.scheduleRotation();
      }
    }
  },
  outputs: {
    outputHex: {
      type: 'color',
      displayName: 'Color',
      group: 'Result',
      getter: function getter() {
        return this._internal.outputHex;
      }
    }
  },
  prototypeExtensions: {
    scheduleRotation: function scheduleRotation() {
      if (!this._internal.hasScheduledRotation) {
        this._internal.hasScheduledRotation = true;
        this.scheduleAfterInputsHaveUpdated(function () {
          this.rotateColor();
          this._internal.hasScheduledRotation = false;
        });
      }
    },
    rotateColor: function rotateColor() {
      var rgb = hexToRGB(this._internal.inputHex);
      var hsl = rgbToHSL(rgb[0], rgb[1], rgb[2]);
      var offset = this._internal.rotationValue || 0;
      var hue = hsl[0] * 360;
      var v = hue + offset;
      v /= 360;
      v = v - Math.floor(v);
      rgb = hslToRGB(v, hsl[1], hsl[2]);
      this._internal.outputHex = rgbToHEX(rgb[0], rgb[1], rgb[2]);
      this.flagOutputDirty("outputHex");
    }
  }
}; // Color conversion methods are credited to: https://gist.github.com/mjackson
// and can be found here: https://gist.github.com/mjackson/5311256

function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  return [r, g, b];
}

function rgbToHEX(red, green, blue) {
  var rgb = blue | green << 8 | red << 16;
  var hex = '#' + (0x1000000 + rgb).toString(16).slice(1);
  return hex;
}

function rgbToHSL(red, green, blue) {
  var r = red / 255;
  var g = green / 255;
  var b = blue / 255;
  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h,
      s,
      l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / d + 2;
        break;

      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h, s, l];
}

function hslToRGB(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  r *= 255;
  g *= 255;
  b *= 255;
  return [r, g, b];
}

function rgbToXY(r, g, b) {
  r = r > 0.04045 ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : b / 12.92; //Apply wide gamut conversion D65

  var X = r * 0.664511 + g * 0.154324 + b * 0.162028;
  var Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
  var Z = r * 0.000088 + g * 0.072310 + b * 0.986039;
  var fx = X / (X + Y + Z);
  var fy = Y / (X + Y + Z);
  return [fx.toPrecision(4), fy.toPrecision(4)];
}

var Noodl = __webpack_require__(/*! @noodl/noodl-sdk */ "./node_modules/@noodl/noodl-sdk/index.js");

Noodl.defineModule({
  nodes: [ColorHexToRgb, ColorRgbToHex, ColorHueRotation],
  setup: function setup() {
    console.log("color-utils-module loaded");
  }
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map