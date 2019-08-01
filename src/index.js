import "./styles.css";
let raf =
  window.requestAnimationFrame ||
  window.setImmediate ||
  function(c) {
    return setTimeout(c, 0);
  };

/**
 * Class representing scrollbar
 * */
export class ScrollBar {
  /**
   * @constructor
   * @param {HTMLElement} targetEl - element which need to have scrollbar
   * @param {boolean} isHorizontal - decide if scrollbar horisontal
   * */
  constructor(targetEl, isHorizontal, thickness = "4px") {
    this.thickness = thickness;
    this.target = targetEl;
    this.executeOnce = true;
    this.isHorizontal = isHorizontal;

    this.currentScrollY = null;
    this.n;
    this.o;
    // this.isMaxHeightDefined = isMaxHeightDefined;

    this.init = this.init.bind(this);
    this.initProcesses = this.initProcesses.bind(this);
    this.update = this.update.bind(this);
    this.attachEvents = this.attachEvents.bind(this);
    this.scrollTo = this.scrollTo.bind(this);

    this.init();
  }

  isRTL() {
    return getComputedStyle(document.body).direction === "rtl";
  }

  init() {
    this.scrollbarInitialized();
    this.initProcesses();
  }

  initProcesses() {
    if (this.initialized) return;

    this.initHTML();
    this.initStartCss();
    if (!this.isMacOS()) {
      this.attachEvents();
      this.isScrollBarVisible();
      this.checkForUpdates();
    }
  }

  addContent(el) {
    this.container.appendChild(el);
  }

  removeContent(el) {
    this.container.removeChild(el);
  }

  destroyCss() {
    this.target.style.position = "";
    this.target.style.overflow = "";
    this.target.style.height = "";
  }

  destroyHTML() {
    while (this.container.firstChild) {
      this.target.appendChild(this.container.firstChild);
    }
    this.container.parentNode.removeChild(this.container);
    this.xDragger.parentNode.removeChild(this.xDragger);
    this.yDragger.parentNode.removeChild(this.yDragger);
    this.xBar.parentNode.removeChild(this.xBar);
    this.yBar.parentNode.removeChild(this.yBar);
  }

  isMacOS() {
    // return true;
    return !!~window.navigator.platform.toLowerCase().indexOf("mac");
  }

  destroy() {
    delete this.target.dataset.customScroll;
    this.removeEvents();
    this.destroyHTML();
    this.destroyCss();
  }

  scrollTo(val) {
    let self = this;

    let ov = self.container.scrollTop;
    let nv = val;

    let dist = Math.abs(ov - nv);

    let time = 10;
    let step = dist / time;
    var newStep = ov;

    function repeatOften() {
      if (time > 0) {
        requestAnimationFrame(repeatOften);
        time--;
        if (ov < nv) {
          newStep += step;
        } else {
          newStep -= step;
        }

        self.container.scrollTop = newStep.toFixed(2);
      }
    }

    requestAnimationFrame(repeatOften);
  }

  update() {
    if (this.isHorizontal) {
      this.currentScrollX = this.container.scrollLeft;
      this.isScrollBarVisible();
      this.moveScrollHandlerX(this.currentScrollX);
      this.target.scrollLeft = this.currentScroll;
      this.xDragger.style.width = this.calcScrollBarWidth() + "px";
    } else {
      this.currentScrollY = this.container.scrollTop;
      this.lastScrollY = this.container.scrollTop || this.lastScrollY;
      this.moveScrollHandlerY(this.currentScrollY);

      this.isScrollBarVisible();
      this.yDragger.style.height = this.calcScrollBarHeight() + "px";
    }
  }
  hideScrollBar() {
    if (this.isHorizontal) {
      this.xBar.style.display = "none";
      this.xDragger.style.width = "0";
      this.target.overflow = "";
    } else {
      this.yBar.style.display = "none";
      this.yDragger.style.height = "0";
      this.target.overflow = "";
    }
  }
  showScrollBar() {
    if (this.isHorizontal) {
      this.xBar.style.display = "block";
      this.xDragger.style.width = this.calcScrollBarWidth() + "px";
      this.target.overflow = "hidden";
    } else {
      this.yBar.style.display = "block";
      this.yDragger.style.height = this.calcScrollBarHeight() + "px";
      this.target.overflow = "hidden";
    }
  }
  isScrollable() {
    if (this.isHorizontal) {
      let clientWidth = this.target.offsetWidth;
      let scrollWidth = this.container.scrollWidth;
      return clientWidth + 1 < scrollWidth ? true : false;
    } else {
      let clientHeight = this.target.offsetHeight;
      let scrollHeight = this.container.scrollHeight;
      return clientHeight < scrollHeight ? true : false;
    }
  }
  isScrollBarVisible() {
    if (this.isScrollable()) {
      this.showScrollBar();
    } else {
      this.hideScrollBar();
    }
  }

  scrollbarInitialized() {
    this.initialized = this.target.dataset.customScroll;
  }

  initHTML() {
    this.target.dataset.customScroll = true;

    this.container = document.createElement("div");
    this.container.className = "scrollableWrapper";

    while (this.target.firstChild) {
      this.container.appendChild(this.target.firstChild);
    }

    this.target.appendChild(this.container);

    if (!this.isMacOS()) {
      this.xBar = document.createElement("div");
      this.yBar = document.createElement("div");
      this.xDragger = document.createElement("div");
      this.yDragger = document.createElement("div");
      this.xBar.className = "digi_scroll_bar digi_scroll_bar_x";
      this.yBar.className = "digi_scroll_bar digi_scroll_bar_y";
      this.xDragger.className = "digi_scroll_dragger digi_scroll_dragger_x";
      this.yDragger.className = "digi_scroll_dragger digi_scroll_dragger_y";
      this.xBar.appendChild(this.xDragger);
      this.yBar.appendChild(this.yDragger);
      this.target.appendChild(this.xBar);
      this.target.appendChild(this.yBar);
    }
  }

  initStartCss() {
    if (!this.isMacOS()) {
      this.container.style.boxSizing = "content-box";
      this.target.style.position = "relative";
      this.target.style.overflow = "hidden";
    }

    if (this.isHorizontal) {
      this.target.style.width = "100%";
      if (!this.isMacOS()) {
        this.xBar.style.position = "absolute";
        this.xBar.style.left = 0;
        this.xBar.style.right = 0;
        this.xBar.style.bottom = 0;
        this.container.style.overflowX = "scroll";
        this.container.style.marginBottom = "-17px";
      }
      if (this.isMacOS()) {
        this.container.style.overflowX = "auto";
      }
      this.container.style.width = "100%";
      this.container.style.overflowY = "hidden";
    } else {
      this.target.style.height = "100%";
      this.container.style.height = "100%";
      if (this.isMacOS()) {
        this.container.style.overflowY = "auto";
      }
      this.container.style.overflowX = "hidden";
      if (!this.isMacOS()) {
        this.container.style.overflowY = "scroll";
        this.yBar.style.position = "absolute";
        this.yBar.style.top = this.thickness;
        if (this.isRTL()) {
          this.yBar.style.left = "0";
          this.container.style.marginLeft = "-17px";
        } else {
          this.yBar.style.right = "0";
          this.container.style.marginRight = "-17px";
        }
        this.yBar.style.bottom = this.thickness;
      }
    }
  }
  calcScrollBarHeight() {
    let trackHeight = this.yBar.offsetHeight;
    let clientHeight = this.container.offsetHeight;
    let scrollHeight = this.container.scrollHeight;
    let height = Math.ceil(clientHeight / (scrollHeight / trackHeight));
    return height;
  }
  calcScrollBarWidth() {
    let trackWidth = this.xBar.offsetWidth;
    let clientWidth = this.container.offsetWidth;
    let scrollWidth = this.container.scrollWidth;
    let width = Math.ceil(clientWidth / (scrollWidth / trackWidth));
    return width;
  }
  getScrollTopForOffset(offset) {
    let scrollHeight = this.container.scrollHeight;
    let trackHeight = this.yBar.offsetHeight;
    return Math.ceil(offset / (scrollHeight / trackHeight));
  }
  getScrollLeftForOffset(offset) {
    let scrollWidth = this.container.scrollWidth;
    let trackWidth = this.xBar.offsetWidth;
    return Math.ceil(offset / (scrollWidth / trackWidth));
  }
  moveScrollHandlerX(scrollLeft) {
    this.xDragger.style.transform = `translateX(${this.getScrollLeftForOffset(
      scrollLeft
    )}px)`;
  }
  moveScrollHandlerY(scrollTop) {
    this.yDragger.style.transform = `translateY(${this.getScrollTopForOffset(
      scrollTop
    )}px)`;
  }
  attachEvents() {
    var self = this;
    window.addEventListener("resize", this.update);
    this.dragHandler();
    if (this.isHorizontal) {
      // this.container.addEventListener('wheel', this.moveScrollBar.bind(this));
      this.container.onwheel = function(e) {
        self.moveScrollBar(e);
        return false;
      };
    } else {
      this.container.addEventListener("scroll", this.moveScrollBar.bind(this));
    }
  }
  removeEvents() {
    this.container.removeEventListener("scroll", this.moveScrollBar.bind(this));
    this.container.removeEventListener("wheel", this.moveScrollBar.bind(this));

    window.removeEventListener("resize", this.update);
  }
  moveScrollBar(event) {
    let self = this;
    let scrollTop = self.container.scrollTop;

    self.moveScrollHandlerY(scrollTop);

    if (event.type === "wheel") {
      let element = self.container;
      let deltaY = event.deltaY;
      element.scrollLeft += deltaY;
      self.moveScrollHandlerX(element.scrollLeft);
    }
  }
  dragHandler() {
    let self = this;

    let lastPageY, lastPageX;
    let el = this.yDragger;
    self.yDragger.addEventListener("mousedown", function(e) {
      lastPageY = e.pageY;
      el.classList.add("ss-grabbed");
      self.target.style.userSelect = "none";
      document.body.classList.add("ss-grabbed");
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stop);
      return false;
    });

    self.xDragger.addEventListener("mousedown", function(e) {
      lastPageX = e.pageX;
      el.classList.add("ss-grabbed");
      self.target.style.userSelect = "none";
      document.body.classList.add("ss-grabbed");
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", stop);
      return false;
    });

    function drag(e) {
      let deltaY = e.pageY - lastPageY;
      lastPageY = e.pageY;
      let deltaX = e.pageX - lastPageX;
      lastPageX = e.pageX;
      raf(function() {
        if (self.isHorizontal) {
          self.container.scrollLeft +=
            deltaX / (self.xBar.clientWidth / self.container.scrollWidth);
          self.moveScrollHandlerX(self.container.scrollLeft);
        } else {
          self.container.scrollTop +=
            deltaY / (self.yBar.clientHeight / self.container.scrollHeight);
        }
      });
    }

    function stop() {
      el.classList.remove("ss-grabbed");
      document.body.classList.remove("ss-grabbed");
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", stop);
      self.target.style.userSelect = "";
    }
  }

  checkForUpdates() {
    let self = this;

    function repeatingFunc() {
      self.n =
        self.container.scrollHeight +
        self.container.scrollWidth +
        self.container.clientHeight +
        self.container.clientWidth;
      if (self.target.parentElement) {
        self.hn = self.target.parentElement.offsetHeight;
      }
      if (self.n !== self.o || self.hn !== self.ho) {
        self.ho = self.hn;
        self.o = self.n;
        self.update();
      }
      setTimeout(repeatingFunc, 1000 / 60);
    }

    setTimeout(repeatingFunc, 1000 / 60);
  }
}
