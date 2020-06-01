L.Control.AltitudeTool = L.Control.extend({
    
    /**
     * 线条统计
     * @type {Number}
     * @default 0
     * @private
     */
    _lC:0,

    /**
     * 量算集合
     * @type {Object}
     * @default {}
     * @private
     */
    _altitudeObjs:{},


    /**
     * 点和线容器
     * @type {Object}
     * @private
     */
    _altitudeGroup: new L.FeatureGroup(),

    

    /**
     * 正在进行量算的
     * @type {[type]}
     */
    _curElevIC:null,

    /**
     * 是否是新的量算事件
     * @type {Boolean}
     * @default true
     * @private
     */
    _isNewaltitude:true,

    /**
     * 布局参数
     * @type {Object}
     */
    options:{
        position:'topright',
        autoZIndex:true,
        offset:[10,10]
    },

    initialize:function(options){
        L.setOptions(this, options);
        return this;
    },


    onAdd:function(map){
        this._map = map;
        this._altitudeGroup.addTo(this._map);
        this._createControl();

        switch(this.options.position){
            case 'topleft':
                this._container.style.marginLeft = this.options.offset[0]+'px';
                this._container.style.marginTop = this.options.offset[1]+'px';
                break;
            case 'topright':
                this._container.style.marginRight = this.options.offset[0]+'px';
                this._container.style.marginTop = this.options.offset[1]+'px';
                break;
            case 'bottomleft':
                this._container.style.marginLeft = this.options.offset[0]+'px';
                this._container.style.marginBottom = this.options.offset[1]+'px';
                break;
            case 'bottomright':
                this._container.style.marginRight = this.options.offset[0]+'px';
                this._container.style.marginBottom = this.options.offset[1]+'px';
                break;
        }
        
        return this._container;
    },

    _createControl:function(){
        var _this = this;
        this._container = L.DomUtil.create('div','leaflet-bar leaflet-control-altitude-tool');

        var link = L.DomUtil.create('a','leaflet-control-altitude-tool-link',this._container);
        link.title = '高程量算';
        link.innerHTML = 'G'
        L.DomUtil.create('span','',link);

        L.DomEvent.on(this._container,'contextmenu',L.DomEvent.stopPropagation);

        L.DomEvent
            .on(link,'click', L.DomEvent.stopPropagation)
            .on(link,'click', L.DomEvent.preventDefault)
            .on(link,'click',function(){
                if(!_this._isNewaltitude){
                    _this.remove();                    
                }else {
                    _this._isNewaltitude = false;
                    L.DomUtil.addClass(_this._container,'active');
                    _this._map.doubleClickZoom.disable();
                    _this._map.on('click',_this._onClickPoint,_this);
                    if(L.Browser.ie || L.Browser.firefox){
                        _this._map.getContainer().style.cursor = 'url('+L.DefaultImagePath+'/cur-ruler.cur),auto';
                    }else{
                        _this._map.getContainer().style.cursor = 'url('+L.DefaultImagePath+'/cur-ruler.cur) 5 5,auto';
                    }
                }
            })
    },

    

    /**
     * 鼠标单击事件
     * @param e
     * @returns {boolean}
     * @private
     */
    _onClickPoint:function(e){
        var _this = this;

        _this._lC++;
        _this._altitudeObjs[_this._lC] = new L.FeatureGroup();
        _this._altitudeObjs[_this._lC].addTo(_this._altitudeGroup);

        //e.latlng
        _this._buildMarker({latlng: e.latlng});
    },    

    /**
     * 删除对应iC的测距
     */
    del:function(event,iC){
        var _this = this;
        var event = event || window.event;
        L.DomEvent.stop(event);
        _this._altitudeGroup.removeLayer(_this._altitudeObjs[iC]);
        delete _this._altitudeObjs[iC];
    },

    /**
     * 清除所有的测距
     * @type {Function}
     */
    clearAllelevation:function(){
        var _this = this;
        _this._altitudeGroup.clearLayers();
        _this._altitudeObjs = {};
    },

    /**
     * 进行剖面量算
     * @param  {[type]} event [description]
     * @param  {[type]} iC    [description]
     * @return {[type]}       [description]
     */
    run:function(latlng,callBackFunc){
        var _this = this;            
        var url = map23DConfig.altitudeServerUrl+'/terrain/elevation';
        var ajaxData = {
            lat:latlng.lat,
            lon:latlng.lng,
            zoom:_this._map.getZoom(),
            delta_zoom:0
        };
        $.ajax({
            type:"post",
            dataType:'json',
            data:ajaxData,
            url:url,
            success:function(data){
                callBackFunc(data);
            }
        });
    },


    /**
     * 创建一个marker 并返回该marker
     * @param obj
     * @returns {L.Marker}
     * @private
     */
    _buildMarker:function(obj){
        var _this = this;
        _this.run(obj.latlng,function(data){
            
            var altitudeLabel = L.DomUtil.create('span','altitude-span');
            altitudeLabel.lid = _this._lC
            altitudeLabel.style.color = 'red';
            altitudeLabel.innerHTML = '高程：'+data.data+ '米';
            L.DomEvent.on(altitudeLabel,'dblclick',function(e){
                L.DomEvent.stopPropagation(e); 
                var lid = e.target? e.target.lid: e.srcElement.lid;
                _this.del(e,lid)
            });            
            new L.Marker(
                obj.latlng,
                {icon: L.icon({
                    iconUrl: L.DefaultImagePath+'/icon-linePoint.png',
                    iconSize: [15, 15],
                    iconAnchor: [7, 7],
                    popupAnchor: [0, -7]
                }),
                    clickable:false
                }
            ).bindLabel(altitudeLabel,{
                noHide:true,
            }).addTo(_this._altitudeObjs[_this._lC]);

        });

        _this.remove();
    },


    /**
     * 计算完成
     * @type {Function}
     */
    remove:function(){
        var _this = this;
        _this._map.doubleClickZoom.enable();
        _this._map.getContainer().style.cursor = 'auto';

        _this._isNewaltitude = true;
        _this._map.off('click',_this._onClickPoint,this);

        L.DomUtil.removeClass(_this._container,'active');
    }

});

L.control.altitudeTool = function(options){
    return new L.Control.AltitudeTool(options);
}


/**
 * 高程量算
 */
map2DViewer.altitudeToolsFire = function(data) {};
map2DViewer.setAltitudeTools = function(options) {
    var defaultData = {
        action: 'add',
        position: 'topleft',
        offset: [10, 10]
    }
    _.merge(defaultData, options);
    switch (defaultData.action) {
        case 'add':
            this.altitudeTools = new L.Control.AltitudeTool({
                position: defaultData.position,
                offset: defaultData.offset
            }).addTo(this.map);
            this.map.on('measure-distance-result', map2DViewer.altitudeToolsFire);
            return this.altitudeTools;
            break;
        case 'remove':
            this.altitudeTools.cleanAllMeasure();
            this.map.removeControl(this.altitudeTools);
            this.map.off('measure-distance-result', map2DViewer.altitudeToolsFire);
            break;
    }
};