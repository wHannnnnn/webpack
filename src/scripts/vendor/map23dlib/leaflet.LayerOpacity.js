/**
 * 图层透明度改变模块
 * Date: 13-5-23
 * Time: 下午12:06
 * Author:Song.Huang
 */
L.Control.LayerOpacity = L.Control.extend({
    options:{
        position:'bottomcenter',
        autoZIndex:true,
        timeOut:null
    },

    _mapZoomScope:{},

    initialize:function(layerObj,options){
        var _this = this;
        this._layer = layerObj;
        L.setOptions(this,options);
    },

    onAdd:function(map){
        this._mainMap = map;
        this._mapZoomScope.minZoom = this._mainMap.getMinZoom();
        this._mapZoomScope.maxZoom = this._mainMap.getMaxZoom();

        //this._mainMap.setZoomScope(this.options.min_zoom,this.options.max_zoom);

        this._createControl();
        return this._container;
    },

    /**
     * 面板移除事件
     */
    onRemove:function(){
        var _this = this;
        this._mainMap.setZoomScope(this._mapZoomScope.minZoom,this._mapZoomScope.maxZoom);
        _this._mainMap.off('click dragstart zoomend',_this._changeState,this);
        _this._mainMap.fire("layerOpacity:remove",this);

        _this._mainMap.off('click dragstart zoomend',_this._changeState,this);  
        L.DomEvent.off(_this._draggerContainer, 'click', this._onSliderClick, this);
        L.DomEvent.off(_this._dragger, 'mousedown', this._onSliderMove, this);

        if(_this.options.showFavBtn){
            L.DomEvent.off(_this._favBtn,'click',this._favOverLayer,this);
        }
        if(!_this.options.onlyShow){
            L.DomEvent.off(_this._closeBtn,'click',this._hideOverLayer,this);
        }
        L.DomEvent.off(_this._container,'mousemove',this._changeState,this);
        L.DomEvent.off(_this._dragger, 'touchmove', function(e){
            _this._changeOpacity(_this._updateDraggerPosition(e.touches[0]));
        });
    },

    /**
     * 创建控件
     * @returns {*}
     * @private
     */
    _createControl:function(){
        var _this = this;
        _this._container = L.DomUtil.create('div','leaflet-control-layerOpacity'+(_this.options.onlyShow?' only-show':''));

        _this._titleLabel = L.DomUtil.create('span','title-label',_this._container);
        _this._titleLabel.innerHTML = "透明度：";
        _this._numMaxLabel = L.DomUtil.create('span','numMax-label',_this._container);
        _this._numMaxLabel.innerHTML = "100";

        _this._draggerContainer = L.DomUtil.create('div','dragger-container',_this._container);
        _this._draggerBg = L.DomUtil.create('div','dragger-bg',_this._draggerContainer);
        _this._dragger = L.DomUtil.create('div','dragger',_this._draggerContainer);
        _this._opacityNum = L.DomUtil.create('div','opacity-num',_this._draggerContainer);
        _this._opacityNum.innerHTML = '100%';

        _this._numMinLabel = L.DomUtil.create('span','numMin-label',_this._container);
        _this._numMinLabel.innerHTML = "0";

        if(_this.options.showFavBtn || !_this.options.onlyShow){
            _this._optionsWrap = L.DomUtil.create('div','options-wrap',_this._container);
        }
        if(_this.options.showFavBtn){
            _this._favBtn = L.DomUtil.create('a','fav_abtn',_this._optionsWrap);
            _this._favBtn.title = '收藏';
            _this._favBtn.innerHTML = '收藏';
            _this._optionsWrap.style.right = '-54px';
            L.DomEvent.on(_this._favBtn,'click',this._favOverLayer,this);
        }
        if(!_this.options.onlyShow){
            _this._closeBtn = L.DomUtil.create('a','close_abtn',_this._optionsWrap);
            _this._closeBtn.title = '关闭';
            _this._closeBtn.innerHTML = '关闭';
            L.DomEvent.on(_this._closeBtn,'click',this._hideOverLayer,this);
        }
        

        L.DomEvent
            .on(_this._container,'click', L.DomEvent.stopPropagation)
            .on(_this._container,'click', L.DomEvent.preventDefault)
            .on(_this._container, 'contextmenu', L.DomEvent.stopPropagation);

        _this._container.onselectstart=function(){
            return false;
        };

        _this._mainMap.on('click dragstart zoomend',_this._changeState,this);       

        L.DomEvent.disableClickPropagation(this._container);
        L.DomEvent.on(_this._draggerContainer, 'click', this._onSliderClick, this);
        L.DomEvent.on(_this._dragger, 'mousedown', this._onSliderMove, this);
        L.DomEvent.on(_this._container,'mousemove',this._changeState,this);
        L.DomEvent.on(_this._dragger, 'touchmove', function(e){
            _this._changeOpacity(_this._updateDraggerPosition(e.touches[0]));
        });

        return _this._container;
    },

    /**
     * 点击改变进度条
     * @param e
     * @private
     */
    _onSliderClick: function (e) {
        var _this = this;
        var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e);
        _this._changeOpacity(_this._updateDraggerPosition(first));
    },
    /**
     * 鼠标滑动改变进度条
     * @param e
     * @private
     */
    _onSliderMove:function(){
        var _this = this;
        document.onmousemove = function(e){
            e = e || window.event;
            _this._changeOpacity(_this._updateDraggerPosition(e));
        };
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup   = null;
        };
    },

    /**
     * 更新进度条的位置
     * @param e
     * @returns {number}
     * @private
     */
    _updateDraggerPosition:function(e){
        var _this = this;
        var x = L.DomEvent.getMousePosition(e,_this._draggerContainer).x -
            _this._dragger.offsetWidth*0.5;
        if(x<0){
            x=0;
        }else if(x>_this._draggerContainer.offsetWidth-_this._dragger.offsetWidth){
            x=_this._draggerContainer.offsetWidth-_this._dragger.offsetWidth;
        }
        _this._dragger.style.left = x + 'px';
        _this._opacityNum.style.left = x + 'px';

        var op = 1-x/_this._draggerContainer.offsetWidth;
        if(op < 0.15){op = 0;}

        _this._opacityNum.innerHTML = parseInt(op*100)+'%';

        return op;

    },

    /**
     * 改变图层的透明度
     * @param opacity
     * @private
     */
    _changeOpacity:function(opacity){
        var _this = this;
        if(opacity >=0 && opacity <=1){
            _this._layer.setOpacity(opacity);
            _this._mainMap.fire("layerOpacity:change",{'layerOpacity':opacity});
        }
    },

    /**
     * 收藏专题图
     * @private
     */
    _favOverLayer:function(){
        this.options.favCallback(this.options.thematic_data);
    },

    /**
     * 隐藏专题图
     * @private
     */
    _hideOverLayer:function(){
        this.options.closeCallback();
    },


    /**
     * 改变面板显示/隐藏 3秒非操作状态 自动隐藏
     * @private
     */
    _changeState:function(){
        
    },
        

});

L.control.layerOpacity = function(options){
    return new L.Control.LayerOpacity(options);
};
