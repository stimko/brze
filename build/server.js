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

module.exports = {"client":{"js":"/static/js/bundle.f7fa7dfa.js"}}

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__server__ = __webpack_require__("./src/server.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http__ = __webpack_require__("http");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_http__);



var server = __WEBPACK_IMPORTED_MODULE_1_http___default.a.createServer(__WEBPACK_IMPORTED_MODULE_0__server__["a" /* default */]);

var currentApp = __WEBPACK_IMPORTED_MODULE_0__server__["a" /* default */];

console.log(3000);
server.listen(3000 || 3000);

if (false) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', function () {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    var newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}

/***/ }),

/***/ "./src/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_elm_static_html_lib__ = __webpack_require__("elm-static-html-lib");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_elm_static_html_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_elm_static_html_lib__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);


//require('./Main');

var assets = __webpack_require__("./build/assets.json");
var bodyParser = __webpack_require__("body-parser");
console.log("/Users/stephentimko/Documents/projects/brze/build/assets.json");

var model = { signUp: {
    name: "",
    phoneNumber: "",
    number: "",
    address1: "",
    address2: "",
    email: "",
    creditCard: "",
    city: "",
    zip: "",
    signedUpErr: "",
    signedUp: false,
    submitDisabled: false
  } };
var options = { model: model, decoder: "App.decodeModel" };

var server = __WEBPACK_IMPORTED_MODULE_1_express___default()();
server.disable('x-powered-by').use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static("/Users/stephentimko/Documents/projects/brze/build/public")).use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json()).post('/api/signup', function (req, res) {
  console.log("handle shit here");
}).get('/*', function (req, res) {
  __WEBPACK_IMPORTED_MODULE_0_elm_static_html_lib___default()(process.cwd(), "App.view", options).then(function (generatedHtml) {
    var markup = generatedHtml;
    res.send('<!doctype html>\n      <html lang="">\n        <head>\n            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />\n            <meta charSet=\'utf-8\' />\n            <title>Welcome to Razzle</title>\n            <meta name="viewport" content="width=device-width, initial-scale=1">\n            <link rel="stylesheet" href="./reset.css">\n            <link rel="stylesheet" href="./fonts/fonts.css">\n            ' + (assets.client.css ? '<link rel="stylesheet" href="' + assets.client.css + '">' : '') + '          \n            \n        </head>\n        <body>\n            <div id="root">' + markup + '</div>\n        </body>\n        ' + ( true ? '<script src="' + assets.client.js + '"></script>' : '<script src="' + assets.client.js + '"></script>') + '\n      </html>');
  }).catch(function (error) {
    console.log(error);
    res.status(500).send('<h1>An error ocurred on server, please try later, or contact support</h1>');
  });
});

/* harmony default export */ __webpack_exports__["a"] = (server);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "elm-static-html-lib":
/***/ (function(module, exports) {

module.exports = require("elm-static-html-lib");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map