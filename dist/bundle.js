var SCROLLBAR=function(t){var e={};function i(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(r,s,function(e){return t[e]}.bind(null,s));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i.d(e,"ScrollBar",function(){return s});i(1);let r=window.requestAnimationFrame||window.setImmediate||function(t){return setTimeout(t,0)};class s{constructor(t,e,i="4px",r){this.thickness=i,this.target=t,this.executeOnce=!0,this.isHorizontal=e,this.isMaxHeightPercentage=r,this.currentScrollY=null,this.n,this.o,this.init=this.init.bind(this),this.initProcesses=this.initProcesses.bind(this),this.update=this.update.bind(this),this.attachEvents=this.attachEvents.bind(this),this.scrollTo=this.scrollTo.bind(this),this.init()}isRTL(){return"rtl"===getComputedStyle(document.body).direction}init(){this.scrollbarInitialized(),this.initProcesses()}initProcesses(){this.initialized||(this.initHTML(),this.initStartCss(),this.attachEvents(),this.isScrollBarVisible(),this.checkForUpdates())}addContent(t){this.container.appendChild(t)}removeContent(t){this.container.removeChild(t)}destroyCss(){this.target.style.position="",this.target.style.overflow="",this.target.style.height=""}destroyHTML(){for(;this.container.firstChild;)this.target.appendChild(this.container.firstChild);this.container.parentNode.removeChild(this.container),this.xDragger.parentNode.removeChild(this.xDragger),this.yDragger.parentNode.removeChild(this.yDragger),this.xBar.parentNode.removeChild(this.xBar),this.yBar.parentNode.removeChild(this.yBar)}destroy(){delete this.target.dataset.customScroll,this.removeEvents(),this.destroyHTML(),this.destroyCss()}scrollTo(t){let e=this,i=this.container.scrollTop,r=t;requestAnimationFrame(function t(){Math.abs(r-i)>17?(r<i?i-=17:i+=17,e.container.scrollTop=i):cancelAnimationFrame(t),requestAnimationFrame(t)})}update(){this.isHorizontal?(this.currentScrollX=this.container.scrollLeft,this.isScrollBarVisible(),this.moveScrollHandlerX(this.currentScrollX),this.target.scrollLeft=this.currentScroll,this.xDragger.style.width=this.calcScrollBarWidth()+"px"):(this.currentScrollY=this.container.scrollTop,this.lastScrollY=this.container.scrollTop||this.lastScrollY,this.moveScrollHandlerY(this.currentScrollY),this.isMaxHeightPercentage&&(this.container.style.maxHeight="",this.container.style.maxHeight=this.target.clientHeight+"px",!this.currentScrollY&&this.lastScrollY&&this.moveScrollHandlerY(this.lastScrollY)),this.isScrollBarVisible(),this.yDragger.style.height=this.calcScrollBarHeight()+"px")}hideScrollBar(){this.isHorizontal?(this.xBar.style.display="none",this.xDragger.style.width="0",this.target.overflow=""):(this.yBar.style.display="none",this.yDragger.style.height="0",this.target.overflow="")}showScrollBar(){this.isHorizontal?(this.xBar.style.display="block",this.xDragger.style.width=this.calcScrollBarWidth()+"px",this.target.overflow="hidden"):(this.yBar.style.display="block",this.yDragger.style.height=this.calcScrollBarHeight()+"px",this.target.overflow="hidden")}isScrollable(){if(this.isHorizontal){return this.target.offsetWidth+1<this.container.scrollWidth}return this.target.offsetHeight<this.container.scrollHeight}isScrollBarVisible(){this.isScrollable()?this.showScrollBar():this.hideScrollBar()}scrollbarInitialized(){this.initialized=this.target.dataset.customScroll}initHTML(){for(this.target.dataset.customScroll=!0,this.xBar=document.createElement("div"),this.yBar=document.createElement("div"),this.xDragger=document.createElement("div"),this.yDragger=document.createElement("div"),this.xBar.className="digi_scroll_bar digi_scroll_bar_x",this.yBar.className="digi_scroll_bar digi_scroll_bar_y",this.xDragger.className="digi_scroll_dragger digi_scroll_dragger_x",this.yDragger.className="digi_scroll_dragger digi_scroll_dragger_y",this.container=document.createElement("div"),this.container.className="scrollableWrapper";this.target.firstChild;)this.container.appendChild(this.target.firstChild);this.target.appendChild(this.container),this.xBar.appendChild(this.xDragger),this.yBar.appendChild(this.yDragger),this.target.appendChild(this.xBar),this.target.appendChild(this.yBar)}initStartCss(){this.container.style.boxSizing="content-box",this.target.style.position="relative",this.target.style.overflow="hidden",this.isHorizontal?(this.xDragger.style.height=this.thickness,this.target.style.width="100%",this.xBar.style.position="absolute",this.xBar.style.left=0,this.xBar.style.right=0,this.xBar.style.bottom=0,this.xBar.style.height=this.thickness,this.container.style.marginBottom="-17px",this.container.style.width="100%",this.container.style.overflowY="hidden",this.container.style.overflowX="scroll"):(this.target.style.height="100%",this.yBar.style.position="absolute",this.yBar.style.top=this.thickness,this.isRTL()?(this.yBar.style.left="0",this.container.style.marginLeft="-17px"):(this.yBar.style.right="0",this.container.style.marginRight="-17px"),this.yBar.style.bottom=this.thickness,this.yBar.style.width=this.thickness,this.container.style.height="100%",this.isMaxHeightPercentage&&(this.container.style.maxHeight=this.target.clientHeight+"px"),this.container.style.overflowY="scroll",this.container.style.overflowX="hidden")}calcScrollBarHeight(){let t=this.yBar.offsetHeight,e=this.container.offsetHeight,i=this.container.scrollHeight;return Math.ceil(e/(i/t))}calcScrollBarWidth(){let t=this.xBar.offsetWidth,e=this.container.offsetWidth,i=this.container.scrollWidth;return Math.ceil(e/(i/t))}getScrollTopForOffset(t){let e=this.container.scrollHeight,i=this.yBar.offsetHeight;return Math.ceil(t/(e/i))}getScrollLeftForOffset(t){let e=this.container.scrollWidth,i=this.xBar.offsetWidth;return Math.ceil(t/(e/i))}moveScrollHandlerX(t){this.xDragger.style.transform=`translateX(${this.getScrollLeftForOffset(t)}px)`}moveScrollHandlerY(t){this.yDragger.style.transform=`translateY(${this.getScrollTopForOffset(t)}px)`}attachEvents(){var t=this;window.addEventListener("resize",this.update),this.dragHandler(),this.isHorizontal?this.container.onwheel=function(e){return t.moveScrollBar(e),!1}:this.container.addEventListener("scroll",this.moveScrollBar.bind(this))}removeEvents(){this.container.removeEventListener("scroll",this.moveScrollBar.bind(this)),this.container.removeEventListener("wheel",this.moveScrollBar.bind(this)),window.removeEventListener("resize",this.update)}moveScrollBar(t){let e=this,i=e.container.scrollTop;if(e.moveScrollHandlerY(i),"wheel"===t.type){let i=e.container,r=t.deltaY;i.scrollLeft+=r,e.moveScrollHandlerX(i.scrollLeft)}}dragHandler(){let t,e,i=this,s=this.yDragger;function o(s){let o=s.pageY-t;t=s.pageY;let n=s.pageX-e;e=s.pageX,r(function(){i.isHorizontal?(i.container.scrollLeft+=n/(i.xBar.clientWidth/i.container.scrollWidth),i.moveScrollHandlerX(i.container.scrollLeft)):i.container.scrollTop+=o/(i.yBar.clientHeight/i.container.scrollHeight)})}function n(){s.classList.remove("ss-grabbed"),document.body.classList.remove("ss-grabbed"),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",n),i.target.style.userSelect=""}i.yDragger.addEventListener("mousedown",function(e){return t=e.pageY,s.classList.add("ss-grabbed"),i.target.style.userSelect="none",document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",o),document.addEventListener("mouseup",n),!1}),i.xDragger.addEventListener("mousedown",function(t){return e=t.pageX,s.classList.add("ss-grabbed"),i.target.style.userSelect="none",document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",o),document.addEventListener("mouseup",n),!1})}checkForUpdates(){let t=this;setTimeout(function e(){t.n=t.container.scrollHeight+t.container.scrollWidth+t.container.clientHeight+t.container.clientWidth,t.target.parentElement&&(t.hn=t.target.parentElement.offsetHeight),t.n===t.o&&t.hn===t.ho||(t.ho=t.hn,t.o=t.n,t.update()),setTimeout(e,1e3/60)},1e3/60)}detectDOMChanges(t,e,i={}){i=Object.assign({attributes:!1,childList:!0,subtree:!0},i);let r=new MutationObserver(function(t,i){for(let i of t)"childList"===i.type&&e(...arguments),"attributes"==i.type&&console.log("The "+i.attributeName+" attribute was modified.")});return r.observe(t,i),r.disconnect.bind(r)}}},function(t,e,i){}]);