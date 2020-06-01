L.Control.Zoomslider = (function () {    
    var Knob = L.Draggable.extend({
        initialize: function (element, stepHeight, knobHeight,minZ,maxZ,knobBgElement) {
            L.Draggable.prototype.initialize.call(this, element, element);
            this._element = element;
            this._minZ = minZ;
            this._maxZ = maxZ;

            this._stepHeight = stepHeight;
            this._knobHeight = knobHeight;

            this._knobBgElement = knobBgElement;

            this.on('predrag', function () {
                this._newPos.x = 0;
                this._newPos.y = this._adjust(this._newPos.y);
            }, this);
        },

        _adjust: function (y) {
            var value = Math.round(this._toValue(y));
            value = Math.max(0, Math.min(this._maxValue, value));
            this.setValueTxt(value + this._minZ);
            return this._toY(value);
        },

        // y = k*v + m
        _toY: function (value) {
            return this._k * value + this._m;
        },
        // v = (y - m) / k
        _toValue: function (y) {
            return (y - this._m) / this._k;
        },

        setSteps: function (steps) {
            var sliderHeight = steps * this._stepHeight;
            this._maxValue = steps - 1;
            // conversion parameters
            // the conversion is just a common linear function.
            this._k = -this._stepHeight;
            this._m = sliderHeight - (this._stepHeight + this._knobHeight) / 2;
        },

        setZoomScope:function(minZ,maxZ){
            this._minZ = minZ;
            this._maxZ = maxZ;
        },

        setPosition: function (y) {
            L.DomUtil.setPosition(this._element,
                                  L.point(0, this._adjust(y)));
        },

        setValue: function (v) {
            this.setPosition(this._toY(v));
        },

        getValue: function () {
            return this._toValue(L.DomUtil.getPosition(this._element).y);
        },
        
        
        //todo 仅标记**********== 修改的内容 ==**********
        /*S add by Song.Huang*/
        setValueTxt:function(t){
            this._element.innerHTML = t;
            this._knobBgElement.style.height = (this._maxZ - t)*this._stepHeight + 'px';
        }
        /*E add by Song.Huang*/
        
        
    });

    var Zoomslider = L.Control.extend({
        options: {
            position: 'topleft',
            // Height of zoom-slider.png in px
            stepHeight: 7,
            // Height of the knob div in px (including border)
            knobHeight: 13,
            styleNS: 'leaflet-control-zoomslider'
        },

        _overTimeOut:null,

        onAdd: function (map) {
            this._map = map;
            this._ui = this._createUI();
            this._knob = new Knob(this._ui.knob,
                                  this.options.stepHeight,
                                  this.options.knobHeight,map.getMinZoom(),map.getMaxZoom(),this._ui.knobBg);

            map .whenReady(this._initKnob,           this)
                .whenReady(this._initEvents,         this)
                .whenReady(this._updateSize,         this)
                .whenReady(this._updateKnobValue,    this)
                .whenReady(this._updateDisabled,     this);
            return this._ui.bar;
        },

        onRemove: function (map) {
            map .off('zoomlevelschange',         this._updateSize,      this)
                .off('zoomend zoomlevelschange', this._updateKnobValue, this)
                .off('zoomend zoomlevelschange', this._updateDisabled,  this);
        },

        _createUI: function () {
            var _this = this;
            var ui = {},
                ns = this.options.styleNS;

            ui.bar     = L.DomUtil.create('div', ns + ' leaflet-bar'),
            ui.zoomIn  = this._createZoomBtn('in', 'top', ui.bar),
            ui.wrap    = L.DomUtil.create('div', ns + '-wrap leaflet-bar-part', ui.bar),
            ui.zoomOut = this._createZoomBtn('out', 'bottom', ui.bar),
            ui.body    = L.DomUtil.create('div', ns + '-body', ui.wrap),
            ui.knobBg    = L.DomUtil.create('div', ns + '-knob-bg'),
            ui.knob    = L.DomUtil.create('div', ns + '-knob');

            L.DomEvent.disableClickPropagation(ui.bar);
            L.DomEvent.disableClickPropagation(ui.knob);
            L.DomEvent.on(ui.bar,'contextmenu',L.DomEvent.stopPropagation);



            //todo 仅标记**********== 修改的内容 ==**********
            /*S add by Song.Huang*/

            this._barJump = L.DomUtil.create('div','leaflet-bar-p-pic',ui.bar);

            this._barJump_country = L.DomUtil.create('span','bj_country', this._barJump);

            this._barJump_province = L.DomUtil.create('span','bj_province', this._barJump);

            this._barJump_city = L.DomUtil.create('span','bj_city', this._barJump);

            this._barJump_street = L.DomUtil.create('span','bj_street', this._barJump);

            L.DomEvent.on(ui.bar,"mouseover",function(){
                if(_this._overTimeOut !== null){
                    clearTimeout(_this._overTimeOut);
                    _this._overTimeOut = null;
                }
                L.DomUtil.addClass(ui.bar,'over');
            }).on(ui.bar,"mouseout",function(){
                    clearTimeout(_this._overTimeOut);
                    _this._overTimeOut = setTimeout(function() {
                        L.DomUtil.removeClass(ui.bar, 'over');
                    },100);
                });

            /*E add by Song.Huang*/



            return ui;
        },
        _createZoomBtn: function (zoomDir, end, container) {
            var classDef = this.options.styleNS + '-' + zoomDir
                    + ' leaflet-bar-part'
                    + ' leaflet-bar-part-' + end,
                link = L.DomUtil.create('a', classDef, container);

            //link.href = '#';
            switch (zoomDir){
                case 'out':
                    link.title = "缩小";
                    link.innerHTML = "-";
                    break;
                case 'in':
                    link.title = "放大";
                    link.innerHTML = "+";
            }
            //link.title = 'Zoom ' + zoomDir;

            L.DomEvent.on(link, 'click', L.DomEvent.preventDefault);

            return link;
        },

        _initKnob: function () {
            this._knob.enable();
            this._ui.body.appendChild(this._ui.knobBg);
            this._ui.body.appendChild(this._ui.knob);
        },
        _initEvents: function () {
            this._map
                .on('zoomlevelschange',         this._updateSize,      this)
                .on('zoomend zoomlevelschange', this._updateKnobValue, this)
                .on('zoomend zoomlevelschange', this._updateDisabled,  this);
            
            
            //todo 仅标记**********== 修改的内容 ==**********
            /*S add by Song.Huang*/

            var _this = this;
            
            this._map.on('zoomstart',function(){
                    L.DomUtil.addClass(this._ui.bar,'over');
                    if(this.options.timeOut){
                        clearTimeout(this.options.timeOut);
                        this.options.timeOut = setTimeout(function(){
                            L.DomUtil.removeClass(_this._ui.bar,'over');
                        },2000);
                    }else {
                        this.options.timeOut = setTimeout(function(){
                            L.DomUtil.removeClass(_this._ui.bar,'over');
                        },2000);
                    }
                },this);

            L.DomEvent.on(this._barJump_country,'click',function(){
                this._map.setZoom(3);
            },this);

            L.DomEvent.on(this._barJump_province,'click',function(){
                this._map.setZoom(7);
            },this);

            L.DomEvent.on(this._barJump_city,'click',function(){
                this._map.setZoom(11);
            },this);

            L.DomEvent.on(this._barJump_street,'click',function(){
                this._map.setZoom(17);
            },this);
            /*E add by Song.Huang*/
            
            
            //L.DomEvent.on(this._ui.body,    'click', this._onSliderClick, this);
            L.DomEvent.on(this._ui.zoomIn,  'click', this._zoomIn,        this);
            L.DomEvent.on(this._ui.zoomOut, 'click', this._zoomOut,       this);

            this._knob.on('dragend', this._updateMapZoom, this);
            //todo 仅标记**********== 修改的内容 ==**********
            /*S add by Song.Huang*/
            //this._knob.on('drag',this.,this);
            /*E add by Song.Huang*/

        },

        /*_onSliderClick: function (e) {
            var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
                y = L.DomEvent.getMousePosition(first).y
                    - L.DomUtil.getViewportOffset(this._ui.body).y; // Cache this?

            this._knob.setPosition(y);
            this._updateMapZoom();
        },*/

        _zoomIn: function (e) {
            this._map.zoomIn(e.shiftKey ? 3 : 1);
        },
        _zoomOut: function (e) {
            this._map.zoomOut(e.shiftKey ? 3 : 1);
        },

        _zoomLevels: function () {
            var zoomLevels = this._map.getMaxZoom() - this._map.getMinZoom() + 1;
            return zoomLevels < Infinity ? zoomLevels : 0;
        },
        _toZoomLevel: function (value) {
            return value + this._map.getMinZoom();
        },
        _toValue: function (zoomLevel) {
            return zoomLevel - this._map.getMinZoom();
        },

        _updateSize: function () {
            this._knob.setZoomScope(this._map.getMinZoom(),this._map.getMaxZoom());
            var steps = this._zoomLevels();
            this._ui.body.style.height = this.options.stepHeight * steps + 1+'px';
            this._knob.setSteps(steps);

            if(this._map.getMaxZoom() != 19 || this._map.getMinZoom() != 1){
                this._barJump.style.visibility = 'visible';
            }else {
                this._barJump.style.visibility = 'visible';
            }
        },
        _updateMapZoom: function () {
            this._map.setZoom(this._toZoomLevel(this._knob.getValue()));
        },
        _updateKnobValue: function () {
            this._knob.setValue(this._toValue(this._map.getZoom()));
            
            
            //todo 仅标记**********== 修改的内容 ==**********
            /*S add by Song.Huang*/
            this._knob.setValueTxt(this._map.getZoom());            
            /*E add by Song.Huang*/
            
        },
        _updateDisabled: function () {
            var zoomLevel = this._map.getZoom(),
                className = this.options.styleNS + '-disabled';

            L.DomUtil.removeClass(this._ui.zoomIn,  className);
            L.DomUtil.removeClass(this._ui.zoomOut, className);

            if (zoomLevel === this._map.getMinZoom()) {
                L.DomUtil.addClass(this._ui.zoomOut, className);
            }
            if (zoomLevel === this._map.getMaxZoom()) {
                L.DomUtil.addClass(this._ui.zoomIn, className);
            }
        }
    });

    return Zoomslider;
})();

L.Map.mergeOptions({
    zoomControl: false,
    zoomsliderControl: false
});

L.Map.addInitHook(function () {
    if (this.options.zoomsliderControl) {
        this.zoomsliderControl = new L.Control.Zoomslider();
        this.addControl(this.zoomsliderControl);
    }
});

L.control.zoomslider = function (options) {
    return new L.Control.Zoomslider(options);
};
