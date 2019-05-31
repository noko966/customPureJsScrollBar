var SportDIGI =
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: ScrollBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollBar", function() { return ScrollBar; });
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Class representing scrollbar
 * */
class ScrollBar {
    /**
     * @constructor
     * @param {HTMLElement} targetEl - element which need to have scrollbar
     * @param {boolean} isHorizontal - decide if scrollbar horisontal
     * */
    constructor(targetEl, isHorizontal, thickness="6px"){
        this.thickness = thickness;
        this.target = targetEl;
        this.isHorizontal = isHorizontal;
        this.init();
        this.currentScrollY = null;
        
    }

    init() {
        this.initHTML();
        this.initStartCss();
        this.attachEvents();
    }

    update() {
        this.currentScrollY = this.wrapper.scrollTop;
        this.moveScrollHandlerY(this.currentScrollY);
        this.wrapper.scrollTop = this.currentScrollY;
        
        this.yDragger.style.height = this.calcScrollBarHeight() + 'px';
        this.xDragger.style.width = this.calcScrollBarWidth() + 'px';
    }

    addContent(content) {
        this.destroy();
        this.target.insertAdjacentHTML( 'beforeend', content );
        this.init();
    }

    destroy() {
        while (this.wrapper.firstChild) {
            this.target.appendChild(this.wrapper.firstChild);
        }
        this.wrapper.parentNode.removeChild(this.wrapper);
        this.xBar.parentNode.removeChild(this.xBar);
        this.yBar.parentNode.removeChild(this.yBar);
        this.xDragger.parentNode.removeChild(this.xDragger);
        this.yDragger.parentNode.removeChild(this.yDragger);
        this.target.classList.remove("digi_scroll");
    }

    initHTML() {
        this.wrapper = document.createElement("div");
        this.wrapper.className = "digi_scroll_wrapper";
        this.xBar = document.createElement("div");
        this.yBar = document.createElement("div");
        this.xDragger = document.createElement("div");
        this.yDragger = document.createElement("div");
        this.xBar.className = "digi_scroll_bar digi_scroll_bar_x";
        this.yBar.className = "digi_scroll_bar digi_scroll_bar_y";
        this.xDragger.className = "digi_scroll_dragger digi_scroll_dragger_x";
        this.yDragger.className = "digi_scroll_dragger digi_scroll_dragger_y";
        this.target.classList.add("digi_scroll");
        while (this.target.firstChild) {
            this.wrapper.appendChild(this.target.firstChild);
        }
        this.target.appendChild(this.wrapper);
        this.xBar.appendChild(this.xDragger);
        this.yBar.appendChild(this.yDragger);
        this.target.appendChild(this.xBar);
        this.target.appendChild(this.yBar);
    }
    initStartCss(){
        
        
        this.wrapper.style.position = "absolute";
        this.wrapper.style.top = "0";
        this.wrapper.style.right = "0";
        this.wrapper.style.bottom = "0";
        this.wrapper.style.left = "0";
        
        this.target.style.position = "relative";
        this.target.style.overflow = "hidden";
        if(this.isHorizontal){
            this.xBar.style.position = "absolute";
            this.xBar.style.left = this.thickness;
            this.xBar.style.bottom = "0";
            this.xBar.style.right = this.thickness;
            this.xBar.style.height = this.thickness;
            this.wrapper.style.marginBottom = "-17px";
            this.xDragger.style.height = this.thickness;
            this.wrapper.style.overflowY = "hidden";
            this.wrapper.style.overflowX = "scroll";
            this.wrapper.style.display = "flex";
            this.target.style.height = "50px";
            this.xDragger.style.width = this.calcScrollBarWidth() + 'px';
        }
        else{
            this.yBar.style.position = "absolute";
            this.yBar.style.top = this.thickness;
            this.yBar.style.right = "0";
            this.yBar.style.bottom = this.thickness;
            this.yBar.style.width = this.thickness;
            this.wrapper.style.marginRight = "-17px";
            this.yDragger.style.height = this.calcScrollBarHeight() + 'px';
            this.wrapper.style.overflowY = "scroll";
            this.wrapper.style.overflowX = "hidden";
        }
    }
    calcScrollBarHeight(){
        let trackHeight = this.yBar.offsetHeight;
        let clientHeight = this.target.offsetHeight;
        let scrollHeight = this.wrapper.scrollHeight;
        let height = Math.ceil(clientHeight / (scrollHeight / trackHeight));
        if ((trackHeight - height) < 1) return 0;
        return height;
    }
    calcScrollBarWidth(){
        let trackWidth = this.xBar.offsetWidth;
        let clientWidth = this.target.offsetWidth;
        let scrollWidth = this.wrapper.scrollWidth;
        let width = Math.ceil(clientWidth / (scrollWidth / trackWidth));
        if ((trackWidth - width) < 1) return 0;
        return width;
    }
    getScrollTopForOffset(offset) {
        let scrollHeight = this.wrapper.scrollHeight;
        let trackHeight = this.yBar.offsetHeight;
        return Math.ceil(offset / (scrollHeight / trackHeight));
    }
    getScrollLeftForOffset(offset) {
        let scrollWidth = this.wrapper.scrollWidth;
        let trackWidth = this.xBar.offsetWidth;
        return Math.ceil(offset / (scrollWidth / trackWidth));
    }
    moveScrollHandlerX(scrollLeft){
        this.xDragger.style.transform = `translateX(${this.getScrollLeftForOffset(scrollLeft)}px)`
    }
    moveScrollHandlerY(scrollTop){
        this.yDragger.style.transform = `translateY(${this.getScrollTopForOffset(scrollTop)}px)`
    }
    attachEvents(){
        window.addEventListener('resize', this.update.bind(this));
        this.dragHandler();
        this.wrapper.addEventListener('scroll', this.moveScrollBar.bind(this));
        if (this.isHorizontal) {
            this.wrapper.addEventListener('wheel', this.moveScrollBar.bind(this));
        }
    }
    removeEvents(){
        this.wrapper.removeEventListener('scroll', this.moveScrollBar.bind(this));
        window.removeEventListener('resize', this.update.bind(this));
    }
    moveScrollBar(event){
        let self = this;
        let scrollTop = self.wrapper.scrollTop;
        self.moveScrollHandlerY(scrollTop);

        if(event.type === 'wheel'){
            let element = self.wrapper;
            let deltaY = event.deltaY;
            element.scrollLeft += deltaY;
            self.moveScrollHandlerX(element.scrollLeft);
        }
        
    }
    dragHandler(){
        let self = this;

        let clientHeight = this.target.offsetHeight;
        let scrollHeight = this.wrapper.scrollHeight;
        let clientWidth = this.target.offsetWidth;
        let scrollWidth = this.wrapper.scrollWidth;
        let yRatio = clientHeight / scrollHeight;
        let xRatio = clientHeight / scrollHeight;


        let lastPageY, lastPageX;
        let el = this.yDragger;
        self.yDragger.addEventListener('mousedown', function (e) {
            lastPageY = e.pageY;
            el.classList.add('ss-grabbed');
            self.target.style.userSelect = 'none';
            document.body.classList.add('ss-grabbed');
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stop);
            return false;
        });

        self.xDragger.addEventListener('mousedown', function (e) {
            lastPageX = e.pageX;
            el.classList.add('ss-grabbed');
            self.target.style.userSelect = 'none';
            document.body.classList.add('ss-grabbed');
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stop);
            return false;
        });

        function drag(e) {
            let deltaY = e.pageY - lastPageY;
            lastPageY = e.pageY;
            let deltaX = e.pageX - lastPageX;
            lastPageX = e.pageX;
            raf(function () {
                if(self.isHorizontal){
                    self.wrapper.scrollLeft += deltaX / xRatio;                   
                }
                else{
                    self.wrapper.scrollTop += deltaY / yRatio;
                }
            });
        }
    
        function stop() {
            el.classList.remove('ss-grabbed');
            document.body.classList.remove('ss-grabbed');
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stop);
            self.target.style.userSelect = '';
        }

    }


}

let raf =  window.requestAnimationFrame || window.setImmediate || function (c) {
    return setTimeout(c, 0);
};



/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TcG9ydERJR0kvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU3BvcnRESUdJLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL1Nwb3J0RElHSS8uL3NyYy9zdHlsZXMuY3NzPzE1NTMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHdDQUF3QztBQUM5RjtBQUNBO0FBQ0Esc0RBQXNELHNDQUFzQztBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2T0EsdUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgXCIuL3N0eWxlcy5jc3NcIjtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgc2Nyb2xsYmFyXHJcbiAqICovXHJcbmV4cG9ydCBjbGFzcyBTY3JvbGxCYXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldEVsIC0gZWxlbWVudCB3aGljaCBuZWVkIHRvIGhhdmUgc2Nyb2xsYmFyXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzSG9yaXpvbnRhbCAtIGRlY2lkZSBpZiBzY3JvbGxiYXIgaG9yaXNvbnRhbFxyXG4gICAgICogKi9cclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldEVsLCBpc0hvcml6b250YWwsIHRoaWNrbmVzcz1cIjZweFwiKXtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldEVsO1xyXG4gICAgICAgIHRoaXMuaXNIb3Jpem9udGFsID0gaXNIb3Jpem9udGFsO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNjcm9sbFkgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0SFRNTCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFN0YXJ0Q3NzKCk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2Nyb2xsWSA9IHRoaXMud3JhcHBlci5zY3JvbGxUb3A7XHJcbiAgICAgICAgdGhpcy5tb3ZlU2Nyb2xsSGFuZGxlclkodGhpcy5jdXJyZW50U2Nyb2xsWSk7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyLnNjcm9sbFRvcCA9IHRoaXMuY3VycmVudFNjcm9sbFk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy55RHJhZ2dlci5zdHlsZS5oZWlnaHQgPSB0aGlzLmNhbGNTY3JvbGxCYXJIZWlnaHQoKSArICdweCc7XHJcbiAgICAgICAgdGhpcy54RHJhZ2dlci5zdHlsZS53aWR0aCA9IHRoaXMuY2FsY1Njcm9sbEJhcldpZHRoKCkgKyAncHgnO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZENvbnRlbnQoY29udGVudCkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0Lmluc2VydEFkamFjZW50SFRNTCggJ2JlZm9yZWVuZCcsIGNvbnRlbnQgKTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLndyYXBwZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud3JhcHBlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMud3JhcHBlcik7XHJcbiAgICAgICAgdGhpcy54QmFyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy54QmFyKTtcclxuICAgICAgICB0aGlzLnlCYXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnlCYXIpO1xyXG4gICAgICAgIHRoaXMueERyYWdnZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnhEcmFnZ2VyKTtcclxuICAgICAgICB0aGlzLnlEcmFnZ2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy55RHJhZ2dlcik7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImRpZ2lfc2Nyb2xsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRIVE1MKCkge1xyXG4gICAgICAgIHRoaXMud3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyLmNsYXNzTmFtZSA9IFwiZGlnaV9zY3JvbGxfd3JhcHBlclwiO1xyXG4gICAgICAgIHRoaXMueEJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdGhpcy55QmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0aGlzLnhEcmFnZ2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0aGlzLnlEcmFnZ2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0aGlzLnhCYXIuY2xhc3NOYW1lID0gXCJkaWdpX3Njcm9sbF9iYXIgZGlnaV9zY3JvbGxfYmFyX3hcIjtcclxuICAgICAgICB0aGlzLnlCYXIuY2xhc3NOYW1lID0gXCJkaWdpX3Njcm9sbF9iYXIgZGlnaV9zY3JvbGxfYmFyX3lcIjtcclxuICAgICAgICB0aGlzLnhEcmFnZ2VyLmNsYXNzTmFtZSA9IFwiZGlnaV9zY3JvbGxfZHJhZ2dlciBkaWdpX3Njcm9sbF9kcmFnZ2VyX3hcIjtcclxuICAgICAgICB0aGlzLnlEcmFnZ2VyLmNsYXNzTmFtZSA9IFwiZGlnaV9zY3JvbGxfZHJhZ2dlciBkaWdpX3Njcm9sbF9kcmFnZ2VyX3lcIjtcclxuICAgICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZGlnaV9zY3JvbGxcIik7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMudGFyZ2V0LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMudGFyZ2V0LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xyXG4gICAgICAgIHRoaXMueEJhci5hcHBlbmRDaGlsZCh0aGlzLnhEcmFnZ2VyKTtcclxuICAgICAgICB0aGlzLnlCYXIuYXBwZW5kQ2hpbGQodGhpcy55RHJhZ2dlcik7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy54QmFyKTtcclxuICAgICAgICB0aGlzLnRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLnlCYXIpO1xyXG4gICAgfVxyXG4gICAgaW5pdFN0YXJ0Q3NzKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgIHRoaXMud3JhcHBlci5zdHlsZS50b3AgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLndyYXBwZXIuc3R5bGUucmlnaHQgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLndyYXBwZXIuc3R5bGUuYm90dG9tID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLmxlZnQgPSBcIjBcIjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRhcmdldC5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcclxuICAgICAgICB0aGlzLnRhcmdldC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgaWYodGhpcy5pc0hvcml6b250YWwpe1xyXG4gICAgICAgICAgICB0aGlzLnhCYXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMueEJhci5zdHlsZS5sZWZ0ID0gdGhpcy50aGlja25lc3M7XHJcbiAgICAgICAgICAgIHRoaXMueEJhci5zdHlsZS5ib3R0b20gPSBcIjBcIjtcclxuICAgICAgICAgICAgdGhpcy54QmFyLnN0eWxlLnJpZ2h0ID0gdGhpcy50aGlja25lc3M7XHJcbiAgICAgICAgICAgIHRoaXMueEJhci5zdHlsZS5oZWlnaHQgPSB0aGlzLnRoaWNrbmVzcztcclxuICAgICAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiLTE3cHhcIjtcclxuICAgICAgICAgICAgdGhpcy54RHJhZ2dlci5zdHlsZS5oZWlnaHQgPSB0aGlzLnRoaWNrbmVzcztcclxuICAgICAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLm92ZXJmbG93WSA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcHBlci5zdHlsZS5vdmVyZmxvd1ggPSBcInNjcm9sbFwiO1xyXG4gICAgICAgICAgICB0aGlzLndyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zdHlsZS5oZWlnaHQgPSBcIjUwcHhcIjtcclxuICAgICAgICAgICAgdGhpcy54RHJhZ2dlci5zdHlsZS53aWR0aCA9IHRoaXMuY2FsY1Njcm9sbEJhcldpZHRoKCkgKyAncHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnlCYXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMueUJhci5zdHlsZS50b3AgPSB0aGlzLnRoaWNrbmVzcztcclxuICAgICAgICAgICAgdGhpcy55QmFyLnN0eWxlLnJpZ2h0ID0gXCIwXCI7XHJcbiAgICAgICAgICAgIHRoaXMueUJhci5zdHlsZS5ib3R0b20gPSB0aGlzLnRoaWNrbmVzcztcclxuICAgICAgICAgICAgdGhpcy55QmFyLnN0eWxlLndpZHRoID0gdGhpcy50aGlja25lc3M7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcHBlci5zdHlsZS5tYXJnaW5SaWdodCA9IFwiLTE3cHhcIjtcclxuICAgICAgICAgICAgdGhpcy55RHJhZ2dlci5zdHlsZS5oZWlnaHQgPSB0aGlzLmNhbGNTY3JvbGxCYXJIZWlnaHQoKSArICdweCc7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcHBlci5zdHlsZS5vdmVyZmxvd1kgPSBcInNjcm9sbFwiO1xyXG4gICAgICAgICAgICB0aGlzLndyYXBwZXIuc3R5bGUub3ZlcmZsb3dYID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYWxjU2Nyb2xsQmFySGVpZ2h0KCl7XHJcbiAgICAgICAgbGV0IHRyYWNrSGVpZ2h0ID0gdGhpcy55QmFyLm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgY2xpZW50SGVpZ2h0ID0gdGhpcy50YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGxldCBzY3JvbGxIZWlnaHQgPSB0aGlzLndyYXBwZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBNYXRoLmNlaWwoY2xpZW50SGVpZ2h0IC8gKHNjcm9sbEhlaWdodCAvIHRyYWNrSGVpZ2h0KSk7XHJcbiAgICAgICAgaWYgKCh0cmFja0hlaWdodCAtIGhlaWdodCkgPCAxKSByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgY2FsY1Njcm9sbEJhcldpZHRoKCl7XHJcbiAgICAgICAgbGV0IHRyYWNrV2lkdGggPSB0aGlzLnhCYXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgbGV0IGNsaWVudFdpZHRoID0gdGhpcy50YXJnZXQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgbGV0IHNjcm9sbFdpZHRoID0gdGhpcy53cmFwcGVyLnNjcm9sbFdpZHRoO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IE1hdGguY2VpbChjbGllbnRXaWR0aCAvIChzY3JvbGxXaWR0aCAvIHRyYWNrV2lkdGgpKTtcclxuICAgICAgICBpZiAoKHRyYWNrV2lkdGggLSB3aWR0aCkgPCAxKSByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gd2lkdGg7XHJcbiAgICB9XHJcbiAgICBnZXRTY3JvbGxUb3BGb3JPZmZzZXQob2Zmc2V0KSB7XHJcbiAgICAgICAgbGV0IHNjcm9sbEhlaWdodCA9IHRoaXMud3JhcHBlci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgbGV0IHRyYWNrSGVpZ2h0ID0gdGhpcy55QmFyLm9mZnNldEhlaWdodDtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG9mZnNldCAvIChzY3JvbGxIZWlnaHQgLyB0cmFja0hlaWdodCkpO1xyXG4gICAgfVxyXG4gICAgZ2V0U2Nyb2xsTGVmdEZvck9mZnNldChvZmZzZXQpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsV2lkdGggPSB0aGlzLndyYXBwZXIuc2Nyb2xsV2lkdGg7XHJcbiAgICAgICAgbGV0IHRyYWNrV2lkdGggPSB0aGlzLnhCYXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChvZmZzZXQgLyAoc2Nyb2xsV2lkdGggLyB0cmFja1dpZHRoKSk7XHJcbiAgICB9XHJcbiAgICBtb3ZlU2Nyb2xsSGFuZGxlclgoc2Nyb2xsTGVmdCl7XHJcbiAgICAgICAgdGhpcy54RHJhZ2dlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3RoaXMuZ2V0U2Nyb2xsTGVmdEZvck9mZnNldChzY3JvbGxMZWZ0KX1weClgXHJcbiAgICB9XHJcbiAgICBtb3ZlU2Nyb2xsSGFuZGxlclkoc2Nyb2xsVG9wKXtcclxuICAgICAgICB0aGlzLnlEcmFnZ2VyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dGhpcy5nZXRTY3JvbGxUb3BGb3JPZmZzZXQoc2Nyb2xsVG9wKX1weClgXHJcbiAgICB9XHJcbiAgICBhdHRhY2hFdmVudHMoKXtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5kcmFnSGFuZGxlcigpO1xyXG4gICAgICAgIHRoaXMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1vdmVTY3JvbGxCYXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMubW92ZVNjcm9sbEJhci5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW1vdmVFdmVudHMoKXtcclxuICAgICAgICB0aGlzLndyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tb3ZlU2Nyb2xsQmFyLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIG1vdmVTY3JvbGxCYXIoZXZlbnQpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gc2VsZi53cmFwcGVyLnNjcm9sbFRvcDtcclxuICAgICAgICBzZWxmLm1vdmVTY3JvbGxIYW5kbGVyWShzY3JvbGxUb3ApO1xyXG5cclxuICAgICAgICBpZihldmVudC50eXBlID09PSAnd2hlZWwnKXtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBzZWxmLndyYXBwZXI7XHJcbiAgICAgICAgICAgIGxldCBkZWx0YVkgPSBldmVudC5kZWx0YVk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVk7XHJcbiAgICAgICAgICAgIHNlbGYubW92ZVNjcm9sbEhhbmRsZXJYKGVsZW1lbnQuc2Nyb2xsTGVmdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZHJhZ0hhbmRsZXIoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBjbGllbnRIZWlnaHQgPSB0aGlzLnRhcmdldC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IHNjcm9sbEhlaWdodCA9IHRoaXMud3JhcHBlci5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgbGV0IGNsaWVudFdpZHRoID0gdGhpcy50YXJnZXQub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgbGV0IHNjcm9sbFdpZHRoID0gdGhpcy53cmFwcGVyLnNjcm9sbFdpZHRoO1xyXG4gICAgICAgIGxldCB5UmF0aW8gPSBjbGllbnRIZWlnaHQgLyBzY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgbGV0IHhSYXRpbyA9IGNsaWVudEhlaWdodCAvIHNjcm9sbEhlaWdodDtcclxuXHJcblxyXG4gICAgICAgIGxldCBsYXN0UGFnZVksIGxhc3RQYWdlWDtcclxuICAgICAgICBsZXQgZWwgPSB0aGlzLnlEcmFnZ2VyO1xyXG4gICAgICAgIHNlbGYueURyYWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgbGFzdFBhZ2VZID0gZS5wYWdlWTtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc3MtZ3JhYmJlZCcpO1xyXG4gICAgICAgICAgICBzZWxmLnRhcmdldC5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3NzLWdyYWJiZWQnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZWxmLnhEcmFnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxhc3RQYWdlWCA9IGUucGFnZVg7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3NzLWdyYWJiZWQnKTtcclxuICAgICAgICAgICAgc2VsZi50YXJnZXQuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzcy1ncmFiYmVkJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYWcpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3RvcCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhZyhlKSB7XHJcbiAgICAgICAgICAgIGxldCBkZWx0YVkgPSBlLnBhZ2VZIC0gbGFzdFBhZ2VZO1xyXG4gICAgICAgICAgICBsYXN0UGFnZVkgPSBlLnBhZ2VZO1xyXG4gICAgICAgICAgICBsZXQgZGVsdGFYID0gZS5wYWdlWCAtIGxhc3RQYWdlWDtcclxuICAgICAgICAgICAgbGFzdFBhZ2VYID0gZS5wYWdlWDtcclxuICAgICAgICAgICAgcmFmKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGYuaXNIb3Jpem9udGFsKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLndyYXBwZXIuc2Nyb2xsTGVmdCArPSBkZWx0YVggLyB4UmF0aW87ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLndyYXBwZXIuc2Nyb2xsVG9wICs9IGRlbHRhWSAvIHlSYXRpbztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcCgpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc3MtZ3JhYmJlZCcpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3NzLWdyYWJiZWQnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZHJhZyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wKTtcclxuICAgICAgICAgICAgc2VsZi50YXJnZXQuc3R5bGUudXNlclNlbGVjdCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxubGV0IHJhZiA9ICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5zZXRJbW1lZGlhdGUgfHwgZnVuY3Rpb24gKGMpIHtcclxuICAgIHJldHVybiBzZXRUaW1lb3V0KGMsIDApO1xyXG59O1xyXG5cclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==