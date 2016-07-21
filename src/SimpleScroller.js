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

    function fConstructor(oConf){
        this.config =  oConf = oConf || {};
        this.target = oConf.target;
        this.init();
        return this;
    }

    function fInit(){
        this.render();
        this.initEvents();
    }

    function fInitEvents() {
        var that = this;
    }

    function fRender() {
        this.renderDOM();
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