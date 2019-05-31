import "./styles.css";

/**
 * Class representing scrollbar
 * */
export class ScrollBar {
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

