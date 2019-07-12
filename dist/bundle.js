var SCROLLBAR=function(t){var e={};function i(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(r,s,function(e){return t[e]}.bind(null,s));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e),i.d(e,"ScrollBar",function(){return n});i(1);function r(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var s=window.requestAnimationFrame||window.setImmediate||function(t){return setTimeout(t,0)},n=function(){function t(e,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"4px";!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.thickness=r,this.target=e,this.executeOnce=!0,this.isHorizontal=i,this.currentScrollY=null,this.n,this.o,this.init=this.init.bind(this),this.initProcesses=this.initProcesses.bind(this),this.update=this.update.bind(this),this.attachEvents=this.attachEvents.bind(this),this.scrollTo=this.scrollTo.bind(this),this.init()}var e,i,n;return e=t,(i=[{key:"isRTL",value:function(){return"rtl"===getComputedStyle(document.body).direction}},{key:"init",value:function(){this.scrollbarInitialized(),this.initProcesses()}},{key:"initProcesses",value:function(){this.initialized||(this.initHTML(),this.initStartCss(),this.isMacOS()||(this.attachEvents(),this.isScrollBarVisible(),this.checkForUpdates()))}},{key:"addContent",value:function(t){this.container.appendChild(t)}},{key:"removeContent",value:function(t){this.container.removeChild(t)}},{key:"destroyCss",value:function(){this.target.style.position="",this.target.style.overflow="",this.target.style.height=""}},{key:"destroyHTML",value:function(){for(;this.container.firstChild;)this.target.appendChild(this.container.firstChild);this.container.parentNode.removeChild(this.container),this.xDragger.parentNode.removeChild(this.xDragger),this.yDragger.parentNode.removeChild(this.yDragger),this.xBar.parentNode.removeChild(this.xBar),this.yBar.parentNode.removeChild(this.yBar)}},{key:"isMacOS",value:function(){return!!~window.navigator.platform.toLowerCase().indexOf("mac")}},{key:"destroy",value:function(){delete this.target.dataset.customScroll,this.removeEvents(),this.destroyHTML(),this.destroyCss()}},{key:"scrollTo",value:function(t){var e=this,i=e.container.scrollTop,r=t,s=Math.abs(i-r),n=10,o=s/n,a=i;requestAnimationFrame(function t(){n>0&&(requestAnimationFrame(t),n--,i<r?a+=o:a-=o,e.container.scrollTop=a.toFixed(2))})}},{key:"update",value:function(){this.isHorizontal?(this.currentScrollX=this.container.scrollLeft,this.isScrollBarVisible(),this.moveScrollHandlerX(this.currentScrollX),this.target.scrollLeft=this.currentScroll,this.xDragger.style.width=this.calcScrollBarWidth()+"px"):(this.currentScrollY=this.container.scrollTop,this.lastScrollY=this.container.scrollTop||this.lastScrollY,this.moveScrollHandlerY(this.currentScrollY),this.isScrollBarVisible(),this.yDragger.style.height=this.calcScrollBarHeight()+"px")}},{key:"hideScrollBar",value:function(){this.isHorizontal?(this.xBar.style.display="none",this.xDragger.style.width="0",this.target.overflow=""):(this.yBar.style.display="none",this.yDragger.style.height="0",this.target.overflow="")}},{key:"showScrollBar",value:function(){this.isHorizontal?(this.xBar.style.display="block",this.xDragger.style.width=this.calcScrollBarWidth()+"px",this.target.overflow="hidden"):(this.yBar.style.display="block",this.yDragger.style.height=this.calcScrollBarHeight()+"px",this.target.overflow="hidden")}},{key:"isScrollable",value:function(){return this.isHorizontal?this.target.offsetWidth+1<this.container.scrollWidth:this.target.offsetHeight<this.container.scrollHeight}},{key:"isScrollBarVisible",value:function(){this.isScrollable()?this.showScrollBar():this.hideScrollBar()}},{key:"scrollbarInitialized",value:function(){this.initialized=this.target.dataset.customScroll}},{key:"initHTML",value:function(){for(this.target.dataset.customScroll=!0,this.container=document.createElement("div"),this.container.className="scrollableWrapper";this.target.firstChild;)this.container.appendChild(this.target.firstChild);this.target.appendChild(this.container),this.isMacOS()||(this.xBar=document.createElement("div"),this.yBar=document.createElement("div"),this.xDragger=document.createElement("div"),this.yDragger=document.createElement("div"),this.xBar.className="digi_scroll_bar digi_scroll_bar_x",this.yBar.className="digi_scroll_bar digi_scroll_bar_y",this.xDragger.className="digi_scroll_dragger digi_scroll_dragger_x",this.yDragger.className="digi_scroll_dragger digi_scroll_dragger_y",this.xBar.appendChild(this.xDragger),this.yBar.appendChild(this.yDragger),this.target.appendChild(this.xBar),this.target.appendChild(this.yBar))}},{key:"initStartCss",value:function(){this.isMacOS()||(this.container.style.boxSizing="content-box",this.target.style.position="relative",this.target.style.overflow="hidden"),this.isHorizontal?(this.target.style.width="100%",this.isMacOS()||(this.xDragger.style.height=this.thickness,this.xBar.style.position="absolute",this.xBar.style.left=0,this.xBar.style.right=0,this.xBar.style.bottom=0,this.xBar.style.height=this.thickness,this.container.style.overflowX="scroll",this.container.style.marginBottom="-17px"),this.isMacOS()&&(this.container.style.overflowX="auto"),this.container.style.width="100%",this.container.style.overflowY="hidden"):(this.target.style.height="100%",this.container.style.height="100%",this.isMacOS()&&(this.container.style.overflowY="auto"),this.container.style.overflowX="hidden",this.isMacOS()||(this.container.style.overflowY="scroll",this.yBar.style.position="absolute",this.yBar.style.top=this.thickness,this.isRTL()?(this.yBar.style.left="0",this.container.style.marginLeft="-17px"):(this.yBar.style.right="0",this.container.style.marginRight="-17px"),this.yBar.style.bottom=this.thickness,this.yBar.style.width=this.thickness))}},{key:"calcScrollBarHeight",value:function(){var t=this.yBar.offsetHeight,e=this.container.offsetHeight,i=this.container.scrollHeight;return Math.ceil(e/(i/t))}},{key:"calcScrollBarWidth",value:function(){var t=this.xBar.offsetWidth,e=this.container.offsetWidth,i=this.container.scrollWidth;return Math.ceil(e/(i/t))}},{key:"getScrollTopForOffset",value:function(t){var e=this.container.scrollHeight,i=this.yBar.offsetHeight;return Math.ceil(t/(e/i))}},{key:"getScrollLeftForOffset",value:function(t){var e=this.container.scrollWidth,i=this.xBar.offsetWidth;return Math.ceil(t/(e/i))}},{key:"moveScrollHandlerX",value:function(t){this.xDragger.style.transform="translateX(".concat(this.getScrollLeftForOffset(t),"px)")}},{key:"moveScrollHandlerY",value:function(t){this.yDragger.style.transform="translateY(".concat(this.getScrollTopForOffset(t),"px)")}},{key:"attachEvents",value:function(){var t=this;window.addEventListener("resize",this.update),this.dragHandler(),this.isHorizontal?this.container.onwheel=function(e){return t.moveScrollBar(e),!1}:this.container.addEventListener("scroll",this.moveScrollBar.bind(this))}},{key:"removeEvents",value:function(){this.container.removeEventListener("scroll",this.moveScrollBar.bind(this)),this.container.removeEventListener("wheel",this.moveScrollBar.bind(this)),window.removeEventListener("resize",this.update)}},{key:"moveScrollBar",value:function(t){var e=this.container.scrollTop;if(this.moveScrollHandlerY(e),"wheel"===t.type){var i=this.container,r=t.deltaY;i.scrollLeft+=r,this.moveScrollHandlerX(i.scrollLeft)}}},{key:"dragHandler",value:function(){var t,e,i=this,r=this.yDragger;function n(r){var n=r.pageY-t;t=r.pageY;var o=r.pageX-e;e=r.pageX,s(function(){i.isHorizontal?(i.container.scrollLeft+=o/(i.xBar.clientWidth/i.container.scrollWidth),i.moveScrollHandlerX(i.container.scrollLeft)):i.container.scrollTop+=n/(i.yBar.clientHeight/i.container.scrollHeight)})}function o(){r.classList.remove("ss-grabbed"),document.body.classList.remove("ss-grabbed"),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",o),i.target.style.userSelect=""}i.yDragger.addEventListener("mousedown",function(e){return t=e.pageY,r.classList.add("ss-grabbed"),i.target.style.userSelect="none",document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",n),document.addEventListener("mouseup",o),!1}),i.xDragger.addEventListener("mousedown",function(t){return e=t.pageX,r.classList.add("ss-grabbed"),i.target.style.userSelect="none",document.body.classList.add("ss-grabbed"),document.addEventListener("mousemove",n),document.addEventListener("mouseup",o),!1})}},{key:"checkForUpdates",value:function(){var t=this;setTimeout(function e(){t.n=t.container.scrollHeight+t.container.scrollWidth+t.container.clientHeight+t.container.clientWidth,t.target.parentElement&&(t.hn=t.target.parentElement.offsetHeight),t.n===t.o&&t.hn===t.ho||(t.ho=t.hn,t.o=t.n,t.update()),setTimeout(e,1e3/60)},1e3/60)}}])&&r(e.prototype,i),n&&r(e,n),t}()},function(t,e,i){}]);