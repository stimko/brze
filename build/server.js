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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/***/ (function(module, exports) {

module.exports = {"client":{"js":"/static/js/bundle.4b486d5f.js","css":"/static/css/bundle.117ee951.css"}}

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./public/fonts/Gilroy-Bold.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Bold.06673e71.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-Heavy.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Heavy.dd20df36.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-Light.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Light.d4593ac3.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-Medium.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Medium.45ca2168.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-Regular.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-Regular.3796c599.woff";

/***/ }),

/***/ "./public/fonts/Gilroy-UltraLight.woff":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Gilroy-UltraLight.46dadd56.woff";

/***/ }),

/***/ "./src/App.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "body {\n  padding: 1em;\n}\n\nh1 {\n  font-size: 3em;\n  padding: 0.5em;\n  border-top: 0.05em solid #dadada;\n}\n\n.easy {\n  font-weight: 200;\n  font-size: 1.5em;\n}\n\n.brzeLogo {\n  width: 30em;\n}\n\n.makingPickupEasy {\n  font-weight: 200;\n}\n\n.carriers {\n  color: #00a39c;\n  font-weight: normal;\n  white-space: nowrap;\n}\n\n.intro {\n  background-color: #00a39c;\n  color: white;\n  font-size: 1.2em;\n  padding: 1.25em;\n  font-weight: 200;\n}\n\n.verticalBrze {\n  background-color: black;\n  padding: 0.4em 0.2em;\n  font-weight: 500;\n  font-size: 3em;\n  float: right;\n  color: white;\n  text-orientation: sideways;\n  writing-mode: vertical-rl;\n}\n\n.finally {\n  font-size: 1.5em;\n  font-weight: 200;\n  line-height: 1.3em;\n}\n\n.finally .carriers {\n  font-size: inherit;\n  color: inherit;\n  font-weight: 500;\n}\n\n.title {\n  font-size: 2em;\n  padding-bottom: 0.3em;\n}\n\n.fontWeight500 {\n  font-weight: 500;\n}\n\n.num {\n  color: #00a39c;\n  font-weight: 500;\n  font-size: 1.4em;\n  padding-right: 0.2em;\n}\n\n.numWrapper {\n  padding: 0.3em 0;\n}\n\n.currently {\n  font-weight: 500;\n  font-size: 0.8em;\n}\n\n.steps {\n  padding: 1em;\n  line-height: 1.4em;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/App.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reset_css__ = __webpack_require__("./src/reset.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__reset_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fonts_css__ = __webpack_require__("./src/fonts.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fonts_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fonts_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App_css__ = __webpack_require__("./src/App.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__App_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SignUp_SignUp__ = __webpack_require__("./src/SignUp/SignUp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);







var num = function num(n) {
  return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
    "span",
    { className: "num" },
    n
  );
};

var App = function App() {
  return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
    "div",
    null,
    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement("img", { className: "brzeLogo", alt: "Brze", src: "/images/brze.png" }),
    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      "h1",
      null,
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "span",
        { className: "makingPickupEasy" },
        "Making pickup easy! "
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "span",
        { className: "carriers" },
        "FedEx \u2022 USPS \u2022 UPS"
      )
    ),
    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      "div",
      { className: "intro" },
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "div",
        { className: "title" },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "span",
          { className: "fontWeight500" },
          "Introducing Brze. "
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "span",
          null,
          "Returns Made Easy!"
        )
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "div",
        { className: "finally" },
        "Finally, an affordable service that will pick up your package/s from your home and drop them off at",
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "span",
          { className: "carriers" },
          " FedEx, USPS, or UPS."
        )
      )
    ),
    __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      "div",
      { className: "easy" },
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "div",
        { className: "verticalBrze" },
        "Brze"
      ),
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        "div",
        { className: "steps" },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "span",
          null,
          "It\u2019s as simple as",
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            { className: "fontWeight500" },
            " 1, 2, 3"
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            null,
            "!"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "div",
          { className: "numWrapper" },
          num("1 "),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            { className: "fontWeight500" },
            "TEXT US "
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            null,
            "at"
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            { className: "fontWeight500" },
            " 848.702.3698"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "div",
          { className: "numWrapper" },
          num("2 "),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            null,
            "We come and pickup your packages*"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "div",
          { className: "numWrapper" },
          num("3 "),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            "span",
            null,
            "We text you a confirmation that inclides an image and tracking number after delivery"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          "div",
          { className: "currently" },
          " *Currently in Summit, NJ Only"
        )
      )
    ),
    Object(__WEBPACK_IMPORTED_MODULE_3__SignUp_SignUp__["a" /* default */])()
  );
};

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),

/***/ "./src/SignUp/SignUp.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".signUp {\n  border-top: .05em solid #DADADA;\n  padding: 2em;\n}\n\n.signUpTitle {\n  font-size: 2em;\n}\n\n.signUpInputWrapper {\n  padding-top: 1em;\n  font-size: 1.5em;\n}\n\n.signUpInput {\n  padding: 0.2em;\n  font-size: 1.5em;\n}\n\n.err {\n  font-size: 2em;\n}\n\n.signUpButton {\n  width: 110px;\n  height: 50px;\n  background-color: #000000;\n  font-family: inherit;\n  color: #FFFFFF;\n  font-size: 1.3em;\n  border: 0em;\n  margin-top: 1em;\n  cursor: pointer;\n}", ""]);

// exports


/***/ }),

/***/ "./src/SignUp/SignUp.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SignUpForm__ = __webpack_require__("./src/SignUp/SignUpForm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SignUp_css__ = __webpack_require__("./src/SignUp/SignUp.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SignUp_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__SignUp_css__);




var SignUp = function SignUp() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "signUp" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { className: "signUpTitle" },
      "Sign Up For Brze!"
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      null,
      " Required Field*"
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__SignUpForm__["a" /* default */], null)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (SignUp);

/***/ }),

/***/ "./src/SignUp/SignUpForm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__("babel-runtime/core-js/json/stringify");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__("babel-runtime/core-js/object/get-prototype-of");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__("babel-runtime/helpers/classCallCheck");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__("babel-runtime/helpers/createClass");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("babel-runtime/helpers/possibleConstructorReturn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__("babel-runtime/helpers/inherits");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);








var SignUpForm = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(SignUpForm, _React$Component);

  function SignUpForm(props) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, SignUpForm);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SignUpForm.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(SignUpForm)).call(this, props));

    _this.handleChange = function (prop) {
      return function (event) {
        var newState = {};
        newState[prop] = event.target.value;
        _this.setState(newState);
      };
    };

    _this.state = {
      name: "",
      phone: "",
      address: "",
      addressoptional: undefined,
      email: "",
      city: "",
      zip: "",
      state: "NJ",
      signedUp: false,
      submitDisabled: false,
      password: "",
      password2: "",
      message: ""
    };

    _this.requiredProps = ["name", "phone", "address", "email", "city", "state", "zip", "password", "password2"];

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(SignUpForm, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();

      if (this.state.password !== this.state.password2) {
        this.setState({ message: "Passwords must match!" });
      } else if (this.requiredProps.some(function (field) {
        return !_this2.state[field];
      })) {
        this.setState({ message: "Please fill in required fields." });
      } else {
        this.setState({ submitDisabled: true });

        fetch("/api/signup", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(this.state)
        }).then(function (resp) {
          debugger;
          if (resp.ok) {
            return resp.text();
          }
          throw new Error('Network response was not ok.');
        }).then(function (blob) {
          debugger;
          _this2.setState({ submitDisabled: false, message: blob });
        }).catch(function (err) {
          console.log(err);
          _this2.setState({ submitDisabled: false, message: "There was an error signing up!" });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "Name*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.name,
            onChange: this.handleChange("name")
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "Street Address*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.address,
            onChange: this.handleChange("address")
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "Apt., Floor, Unit etc. (Optional)"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.addressoptional,
            onChange: this.handleChange("addressoptional")
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "City"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.city,
            onChange: this.handleChange("city")
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "Zip Code"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.zip,
            onChange: this.handleChange("zip")
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "State*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "select",
            { defaultValue: "NJ", onChange: this.handleChange("state") },
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "AL" },
              "Alabama"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "AK" },
              "Alaska"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "AZ" },
              "Arizona"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "AR" },
              "Arkansas"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "CA" },
              "California"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "CO" },
              "Colorado"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "CT" },
              "Connecticut"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "DE" },
              "Delaware"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "DC" },
              "District Of Columbia"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "FL" },
              "Florida"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "GA" },
              "Georgia"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "HI" },
              "Hawaii"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "ID" },
              "Idaho"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "IL" },
              "Illinois"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "IN" },
              "Indiana"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "IA" },
              "Iowa"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "KS" },
              "Kansas"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "KY" },
              "Kentucky"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "LA" },
              "Louisiana"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "ME" },
              "Maine"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MD" },
              "Maryland"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MA" },
              "Massachusetts"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MI" },
              "Michigan"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MN" },
              "Minnesota"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MS" },
              "Mississippi"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MO" },
              "Missouri"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "MT" },
              "Montana"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NE" },
              "Nebraska"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NV" },
              "Nevada"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NH" },
              "New Hampshire"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NJ" },
              "New Jersey"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NM" },
              "New Mexico"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NY" },
              "New York"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "NC" },
              "North Carolina"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "ND" },
              "North Dakota"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "OH" },
              "Ohio"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "OK" },
              "Oklahoma"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "OR" },
              "Oregon"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "PA" },
              "Pennsylvania"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "RI" },
              "Rhode Island"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "SC" },
              "South Carolina"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "SD" },
              "South Dakota"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "TN" },
              "Tennessee"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "TX" },
              "Texas"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "UT" },
              "Utah"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "VT" },
              "Vermont"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "VA" },
              "Virginia"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "WA" },
              "Washington"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "WV" },
              "West Virginia"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "WI" },
              "Wisconsin"
            ),
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              "option",
              { value: "WY" },
              "Wyoming"
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "Phone Number*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.phone,
            onChange: this.handleChange("phone")
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "Email*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            className: "signUpInput",
            value: this.state.email,
            onChange: this.handleChange("email")
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "Password*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            type: "password",
            className: "signUpInput",
            value: this.state.password,
            onChange: this.handleChange("password")
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "signUpInputWrapper" },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            "div",
            null,
            "Password Again*"
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
            type: "password",
            className: "signUpInput",
            value: this.state.password2,
            onChange: this.handleChange("password2")
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          "div",
          { className: "err" },
          this.state.message
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement("input", {
          className: "signUpButton",
          disabled: this.state.submitDisabled,
          type: "submit",
          value: "Submit"
        })
      );
    }
  }]);

  return SignUpForm;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SignUpForm);

/***/ }),

/***/ "./src/fonts.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-UltraLight.woff") + ") format(\"woff\");\n  font-weight: 100;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Light.woff") + ") format(\"woff\");\n  font-weight: 200;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Regular.woff") + ") format(\"woff\");\n  font-weight: 300;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Medium.woff") + ") format(\"woff\");\n  font-weight: 400;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Bold.woff") + ") format(\"woff\");\n  font-weight: 500;\n}\n\n@font-face {\n  font-family: \"Gilroy\";\n  src: url(" + __webpack_require__("./public/fonts/Gilroy-Heavy.woff") + ") format(\"woff\");\n  font-weight: 600;\n}\n\nbody {\n  font-family: \"Gilroy\";\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__("./src/server.js");



if (false) {
  module.hot.accept('./server', function () {
    console.log('🔁  HMR Reloading `./server`...');
  });
  console.info('✅  Server-side HMR Enabled!');
}

var port = 3000 || 3000;

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_express___default()().use(function (req, res) {
  return __WEBPACK_IMPORTED_MODULE_1__server__["a" /* default */].handle(req, res);
}).listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('> Started on port ' + port);
}));

/***/ }),

/***/ "./src/reset.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./src/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__("babel-runtime/regenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__("babel-runtime/helpers/asyncToGenerator");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__("./src/App.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom_server__ = __webpack_require__("react-dom/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom_server__);



var _this = this;






var bodyParser = __webpack_require__("body-parser");
var path = __webpack_require__("path");

var _require = __webpack_require__("pg"),
    Client = _require.Client;

var twilio = __webpack_require__("twilio");
var assets = __webpack_require__("./build/assets.json");
var pgClient = new Client({ ssl: true });
var TWILIO_ACCOUNT_SID = "AC5f2cc96da38dbfe3013685ca1d957b31";
var TWILIO_AUTH_TOKEN = "adaca3c80d074c60fd8e6f0422aee6ec";
var TWILIO_NUMBER = "12018066564";
console.log(Object({"NODE_ENV":"production","PORT":3000,"VERBOSE":false,"HOST":"localhost","RAZZLE_ASSETS_MANIFEST":"/Users/stephentimko/Documents/projects/brze/build/assets.json","BUILD_TARGET":"server","RAZZLE_PUBLIC_DIR":"/Users/stephentimko/Documents/projects/brze/build/public","RAZZLE_TWILIO_ACCOUNT_SID":"AC5f2cc96da38dbfe3013685ca1d957b31","RAZZLE_TWILIO_AUTH_TOKEN":"adaca3c80d074c60fd8e6f0422aee6ec","RAZZLE_TWILIO_NUMBER":"12018066564"}));
var twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

var startPgClient = function () {
  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return pgClient.connect();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function startPgClient() {
    return _ref.apply(this, arguments);
  };
}();
startPgClient();

var findUserByNumberQuery = function findUserByNumberQuery(num) {
  return {
    name: 'fetch-breezer',
    text: 'SELECT * FROM breezers WHERE phone = $1',
    values: [num]
  };
};

var sendSms = function sendSms(num, res, msg) {
  twilioClient.messages.create({
    to: num,
    from: TWILIO_NUMBER,
    body: msg
  }, function (err, data) {
    res.send('Message is inbound!');
  });
};

var server = __WEBPACK_IMPORTED_MODULE_4_express___default()();
server.disable("x-powered-by").use(__WEBPACK_IMPORTED_MODULE_4_express___default.a.static("/Users/stephentimko/Documents/projects/brze/build/public")).use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json()).post('/api/text', function (req, postRes) {
  pgClient.query(findUserByNumberQuery(req.param('from'))).then(function (res) {
    var message = res.rows.length ? 'Welcome to Brze! Please check back soon for beta!' : 'Welcome to Brze! Please register an account at brze.io and check back for beta!';
    sendSms(req.param('from'), postRes, message);
  });
}).post('/api/signup', function (req, postRes) {
  var num = req.body.phone.replace(/\-|\s|\(|\)/g, '');
  var isValid10 = !!num.match(/\d{10}/g).length;
  var isValid11 = !!num.match(/1\d{10}/g).length;

  if (isValid10) {
    num = "1" + num;
  }

  if (!isValid10 && !isValid11) {
    postRes.send("Please enter a valid phone number");
  }
  pgClient.query(findUserByNumberQuery(req.body.phone)).then(function (res) {
    if (!res.rows.length) {
      var query = {
        name: 'write-breezer',
        text: 'INSERT INTO breezers (phone, name, address, addressoptional, zip, email, city, password, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [req.body.phone, req.body.name, req.body.address, req.body.addressoptional, req.body.zip, req.body.email, req.body.city, req.body.password, req.body.state]
      };
      pgClient.query(query).then(function (res) {
        console.log("see if phone is correct", req.body);
        sendSms(req.body.phone, postRes, 'Welcome to Brze! Please check back soon for beta!');
      }).catch(function (e) {
        return console.log("Write Failure", e);
      });
    } else {
      postRes.send("This number is already signed up!");
    }
  }).catch(function (e) {
    return console.error("Sign Up Failure", e);
  });
}).get("/*", function (req, res) {
  var markup = Object(__WEBPACK_IMPORTED_MODULE_5_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */], null));
  res.send("<!doctype html>\n    <html lang=\"\">\n    <head>\n        <meta httpEquiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta charSet='utf-8' />\n        <title>Welcome to Razz a mataz</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        " + (assets.client.css ? "<link rel=\"stylesheet\" href=\"" + assets.client.css + "\">" : "") + "\n         " + ( true ? "<script src=\"" + assets.client.js + "\" defer></script>" : "<script src=\"" + assets.client.js + "\" defer crossorigin></script>") + "\n    </head>\n    <body>\n        <div id=\"root\">" + markup + "</div>\n    </body>\n</html>");
});

/* harmony default export */ __webpack_exports__["a"] = (server);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/core-js/object/get-prototype-of":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "babel-runtime/helpers/classCallCheck":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ "babel-runtime/helpers/createClass":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ "babel-runtime/helpers/inherits":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),

/***/ "babel-runtime/helpers/possibleConstructorReturn":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "babel-runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pg":
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "twilio":
/***/ (function(module, exports) {

module.exports = require("twilio");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map