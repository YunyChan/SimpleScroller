(function(oWin, oDoc){
    // Helper
    var Helper = {
        listenEvent: fListenEvent
    };

    function fListenEvent(oDom, sEventName, fCallback, bUseCapture){
        if(oWin.attachEvent){
            oDom.attachEvent('on' + sEventName, function(){
                var oEvent = oWin.event;
                fCallback && fCallback(oEvent);
            });
        }else{
            oDom.addEventListener(sEventName, fCallback, !!bUseCapture);
        }
    }
    
    var SimpleScroller = fConstructor;
    // 静态变量
    //SimpleScroller.prototype.xxx = '';
    // 静态方法
    SimpleScroller.prototype.init = fInit;
    SimpleScroller.prototype.initEvents = fInitEvents;
    SimpleScroller.prototype.render = fRender;
    SimpleScroller.prototype.createItems = fCreateItems;
    SimpleScroller.prototype.getItemsWidthAndHeight = fGetItemsWidthAndHeight;
    SimpleScroller.prototype.setWrapWidthAndHeight = fSetWrapWidthAndHeight;
    SimpleScroller.prototype.setStartPosition = fSetStartPosition;
    SimpleScroller.prototype.run = fRun;
    SimpleScroller.prototype.stop = fStop;
    SimpleScroller.prototype.onUpdate = fOnUpdate;
    SimpleScroller.prototype.scroll = fScroll;
    SimpleScroller.prototype.onAnimationFinish = fOnAnimationFinish;

    function fConstructor(oConf){
        this.config =  oConf = oConf || {};
        this.height = oConf.height;
        this.scrollHeight = oConf.scrollHeight || oConf.height;
        this.unit = oConf.unit || 'px';
        this.data = oConf.data || [];
        this.item = oConf.item || '';
        
        this.interval = oConf.interval || 4000;
        this.animationDuration = oConf.animationDuration || 1000;
        if(this.animationDuration > this.interval){
            this.animationDuration = this.animationDuration + this.interval;
            this.interval = this.animationDuration - this.interval;
            this.animationDuration = this.animationDuration - this.interval;
        }
        this.isAnimationDisable = /MSIE [6-9]]/.test(window.navigator.userAgent);
        
        this.init();
        return this;
    }

    function fInit(){
        this.initEvents();
    }

    function fInitEvents() {
        var that = this;
    }

    function fRender(oTarget) {
        this.target = oTarget;

        this.wrap = oDoc.createElement('ul');
        this.wrap.innerHTML = this.createItems();
        this.baseStyle = 'position: absolute; left: 0;';

        this.target.style.height = this.height + this.unit;
        this.target.style.position = 'relative';
        this.target.style.overflow = 'hidden';
        this.target.appendChild(this.wrap);

        var oItemsWithAndHeight = this.getItemsWidthAndHeight();
        this.setWrapWidthAndHeight(oItemsWithAndHeight);
        this.setStartPosition();
        return this;
    }
    
    function fCreateItems() {
        var sItemsHTML = '';
        for(var cnt = 0, length = this.data.length; cnt < length; cnt++){
            var oData = this.data[cnt];
            sItemsHTML += '<li>' + this.item(cnt, oData) + '</li>';
        }
        return sItemsHTML;
    }

    function fGetItemsWidthAndHeight() {
        var oLis = this.target.getElementsByTagName('li');
        var nCurrentMaxWidth = 0;
        var nTotalHeight = 0;
        for(var cnt = 0, length = oLis.length; cnt < length; cnt ++){
            var oLi = oLis[cnt];
            if(oLi.offsetWidth > nCurrentMaxWidth){
                nCurrentMaxWidth = oLi.offsetWidth;
            }
            nTotalHeight += oLi.offsetHeight;
        }

        this.header = oLis[0];
        this.last = oLis[oLis.length - 1];
        return {
            width: nCurrentMaxWidth + 1, // +1 是用于修正被末位舍弃的尾数
            height: nTotalHeight
        }
    }

    function fSetWrapWidthAndHeight(oParams) {
        this.baseStyle += 'width: ' + oParams.width + 'px;';
        this.baseStyle += 'height: ' + oParams.height + 'px;';

        this.target.style.width = oParams.width + 'px';
    }

    function fSetStartPosition() {
        this.baseStyle += 'top: 0;';
        this.wrap.setAttribute('style', this.baseStyle);
    }
    
    function fRun() {
        var that = this;
        if(this.data.length > 0){
            this.intervalID = setInterval(function(){
                that.onUpdate();
            }, this.interval);
        }
        return this;
    }
    
    function fStop() {
        if(this.data.length > 0){
            clearInterval(this.intervalID);
        }
        return this;
    }
    
    function fOnUpdate() {
        var that = this;
        this.scroll(this.scrollHeight);
        if(this.isAnimationDisable){
            this.onAnimationFinish();
        }else{
            setTimeout(function () {
                that.onAnimationFinish();
            }, this.animationDuration);
        }
    }

    function fScroll(nHeight) {
        var sRawTransition = 'transition: top 1s ease-in;';
        var sTransition = '';
        var aPrefix = ['', '-moz-', '-webkit-', '-o-'];
        for(var cnt = 0, length = aPrefix.length; cnt < length; cnt ++){
            sTransition += aPrefix[cnt] + sRawTransition;
        }
        this.wrap.setAttribute('style', this.baseStyle + sTransition);
        this.wrap.style.top = -nHeight + this.unit;
    }

    function fOnAnimationFinish() {
        this.wrap.setAttribute('style', this.baseStyle);
        var oItems = this.wrap.getElementsByTagName('li');
        var oFirstItem = this.wrap.removeChild(oItems[0]);
        this.wrap.appendChild(oFirstItem);
    }

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return SimpleScroller;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = function(oConf){
            return new SimpleScroller(oConf);
        };
        module.exports.SimpleScroller = SimpleScroller;
    } else {
        if(!oWin.SimpleScroller){
            oWin.SimpleScroller = SimpleScroller;
        }else{
            throw new Error("It's duplicate to defined 'SimpleList', please check the scripts which you has been imported!");
        }
    }

})(window, document);