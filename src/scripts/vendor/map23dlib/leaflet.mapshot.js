L.Control.MapShot = L.Control.extend({

	options:{
        position: 'topleft',
	},    
    
    /**
     * 地图实例
     * @type {Object}
     * @private
     */
    _map:null,

    /**
     * 截图容器
     * @type {L}
     */
    _shotGroup:new L.FeatureGroup(),
    
    /**
     * 是否正在截图
     * @type {Boolean}
     * @default false
     * @private
     */
    _isScreenShot:false,


	initialize:function(options){
        L.setOptions(this, options);
        return this;
    },

	onAdd: function(map) {
        this._map = map;
        this._map.addLayer(this._shotGroup);
        this.rectangle = new L.Draw.Rectangle(this._map);
        this._createControl();
        return this._container;
    },


    _createControl:function(){
        var _this = this;
        var className = 'leaflet-control-mapshot',
            classNames = className + ' leaflet-bar leaflet-control';
        this._container = L.DomUtil.create('div', classNames);

        var link = L.DomUtil.create('a', 'leaflet-mapshot-link', this._container);

        var span = L.DomUtil.create('span','',link);
        span.innerHTML = '截图';

        L.DomEvent.on(this._container,'mousedown',L.DomEvent.stopPropagation)
            .on(this._container,'dblclick',L.DomEvent.stopPropagation)
            .on(this._container,'click',L.DomEvent.stopPropagation)
            .on(this._container,'mousewheel',L.DomEvent.stopPropagation)
            .on(this._container,'contextmenu',L.DomEvent.stopPropagation);


        //绑定事件
        L.DomEvent
            .on(link,'click', L.DomEvent.stopPropagation)
            .on(link,'click', L.DomEvent.preventDefault)
            .on(link,'click',function(){
                if(_this._isScreenShot){                    
                    _this.remove();
                }else {                    
                    _this.init();
                }
            });


        _this.mapShotInfoContainer = L.DomUtil.create('div', 'leaflet-mapshot-info', this._container);

        var title = L.DomUtil.create('h3','', _this.mapShotInfoContainer);
        title.innerHTML = '截图信息';

        var labelLT = L.DomUtil.create('label','', _this.mapShotInfoContainer);
        labelLT.innerHTML = '左上角坐标:';
        _this.pLT = L.DomUtil.create('p','', _this.mapShotInfoContainer);

        var labelRB = L.DomUtil.create('label','', _this.mapShotInfoContainer);
        labelRB.innerHTML = '右下角坐标:';
        _this.pRB = L.DomUtil.create('p','', _this.mapShotInfoContainer);

        var labelType = L.DomUtil.create('label','', _this.mapShotInfoContainer);
        labelType.innerHTML = '图种名称:';
        _this.labelType = L.DomUtil.create('p','', _this.mapShotInfoContainer);

        var labelZoom = L.DomUtil.create('label','', _this.mapShotInfoContainer);
        labelZoom.innerHTML = '缩放级别:';
        _this.selectZoom = L.DomUtil.create('select','', _this.mapShotInfoContainer);

        
        var labelPicType = L.DomUtil.create('label','', _this.mapShotInfoContainer);
        labelPicType.innerHTML = '图片格式:';
        _this.selectPicType = L.DomUtil.create('select','', _this.mapShotInfoContainer);
        var picType = ['jpg','png','tif'];
        for(var ii=0;ii<picType.length;ii++){
            var item = new Option(picType[ii],picType[ii]);
            _this.selectPicType.options.add(item);
        }

        var subDiv = L.DomUtil.create('div','subdiv', _this.mapShotInfoContainer);

        _this.subBtn = L.DomUtil.create('button','', subDiv);
        _this.subBtn.innerHTML = '提交下载';

        _this.downDiv = L.DomUtil.create('div','download-panel', _this.mapShotInfoContainer);
        _this.downLink = L.DomUtil.create('p','download-link', _this.downDiv);

        L.DomEvent.on(_this.subBtn,'click',function(){
            _this._postScreenShotInfo();
        });
    },


    /**
     * 初始化
     * @type {Function}
     */
    init:function(){
        var _this = this;
        _this.rectangle.enable();
        _this._shotGroup.clearLayers();

        _this._isScreenShot = true;
        L.DomUtil.addClass(_this._container,'active');

        _this._map.on('draw:created', _this.drawCreated,this);
        _this._map.on('singleLayer:addToMap',_this.updatePanel,this);

        _this._map.on('singleLayer:removeFromMap',_this.getBaseMap,this);

        _this._map.on('mainLayer:addLayer',_this.getBaseMap,this);
        _this._map.on('overLayer:addLayer',_this.getBaseMap,this);
    },

    /**
     * 更新截图信息面板
     * @param  {[type]} layerObj [description]
     * @return {[type]}          [description]
     */
    updatePanel:function(layerObj){
        var _this = this;
        _this.curLayerObj = layerObj.obj;
        _this.labelType.innerHTML = layerObj.obj.translate;

        for(var i=0;_this.selectZoom.options.length !=0;i++){
            _this.selectZoom.options.remove(0);
        }

        for(var ii=layerObj.obj.min_zoom;ii<=layerObj.obj.max_zoom;ii++){
            var item = new Option(ii,ii);
            _this.selectZoom.options.add(item);
        }

        //_this.selectZoom.value = _this._map.getZoom();
    },

    /**
     * 获取当前底图信息并更新信息面板
     * @return {[type]} [description]
     */
    getBaseMap:function(){
        var _this = this;
        var baseMapObj = MAPPLUS.M.mapHolder.currentMainLayer;

        if(baseMapObj._url.indexOf('gm') != -1){
            baseMapObj.translate = '交通图';
            baseMapObj.guid = 'gm';
        }
        if(baseMapObj._url.indexOf('gr') != -1){
            baseMapObj.translate = '影像图';
            baseMapObj.guid = 'gr';
        }
        if(baseMapObj._url.indexOf('gh') != -1){
            baseMapObj.translate = '影像叠加地名图';
            baseMapObj.guid = 'gh';
        }
        if(baseMapObj._url.indexOf('gt') != -1){
            baseMapObj.translate = '地势图';
            baseMapObj.guid = 'gt';
        }

        _this.curLayerObj = baseMapObj;
        

        _this.labelType.innerHTML = baseMapObj.translate;

        for(var i=0;_this.selectZoom.options.length !=0;i++){
            _this.selectZoom.options.remove(0);
        }

        for(var ii=baseMapObj.options.minZoom;ii<=baseMapObj.options.maxZoom;ii++){
            var item = new Option(ii,ii);
            _this.selectZoom.options.add(item);
        }

        //_this.selectZoom.value = _this._map.getZoom();
        
    },

    updateShotBounds:function(){
        var _this = this;
        var bounds = _this.shotLayer.getBounds();

        _this.pLT.innerHTML = '[' +bounds.getNorthWest().lat.toFixed(5) + ',' + bounds.getNorthWest().lng.toFixed(5) + ']';

        _this.pRB.innerHTML = '[' +bounds.getSouthEast().lat.toFixed(5) + ',' + bounds.getSouthEast().lng.toFixed(5) + ']'; 
    },

    /**
     * 标绘创建 添加到容器
     * @param e
     */
    drawCreated:function(e){
        var _this = this;
        var type = e.layerType;
        _this.shotLayer = e.layer;
        _this._shotGroup.addLayer(_this.shotLayer);
        _this.shotLayer.editing.enable(); 

        var thematic = {
            curThematic:{
                min_zoom:1,
                max_zoom:19,
                translate:"未知",
                guid:'null'
            }
        };
 
        if(MAPPLUS.M.mapHolder.singleLayers.getCurrentOverLayerObj()){
            var singleObj = MAPPLUS.M.mapHolder.singleLayers.getCurrentOverLayerObj();

            thematic.curThematic.min_zoom = singleObj.min_zoom;
            thematic.curThematic.max_zoom = singleObj.max_zoom;
            thematic.curThematic.translate = singleObj.translate;
            thematic.curThematic.guid = singleObj.guid;

        }else {
            var baseMapObj = MAPPLUS.M.mapHolder.currentMainLayer;

            thematic.curThematic.min_zoom = baseMapObj.options.minZoom;
            thematic.curThematic.max_zoom = baseMapObj.options.maxZoom;

            if(baseMapObj._url.indexOf('gm') != -1){
                baseMapObj.translate = '交通图';
                baseMapObj.guid = 'gm';
            }
            if(baseMapObj._url.indexOf('gr') != -1){
                baseMapObj.translate = '影像图';
                baseMapObj.guid = 'gr';
            }
            if(baseMapObj._url.indexOf('gh') != -1){
                baseMapObj.translate = '影像叠加地名图';
                baseMapObj.guid = 'gh';
            }
            if(baseMapObj._url.indexOf('gt') != -1){
                baseMapObj.translate = '地势图';
                baseMapObj.guid = 'gt';
            }

            thematic.curThematic.translate = baseMapObj.translate;
            thematic.curThematic.guid = baseMapObj.guid;
        }

        
        _this.curLayerObj = thematic.curThematic;  

        _this._map.on('editDraging',_this.updateShotBounds,this);   

        var bounds = _this.shotLayer.getBounds();

        _this.pLT.innerHTML = '[' +bounds.getNorthWest().lat.toFixed(5) + ',' + bounds.getNorthWest().lng.toFixed(5) + ']';

        _this.pRB.innerHTML = '[' +bounds.getSouthEast().lat.toFixed(5) + ',' + bounds.getSouthEast().lng.toFixed(5) + ']'; 

        for(var i=0;_this.selectZoom.options.length !=0;i++){
            _this.selectZoom.options.remove(0);
        }

        for(var ii=thematic.curThematic.min_zoom;ii<=thematic.curThematic.max_zoom;ii++){
            var item = new Option(ii,ii);
            _this.selectZoom.options.add(item);
        }
        
        //_this.selectZoom.value = _this._map.getZoom();

        _this.labelType.innerHTML = thematic.curThematic.translate;               

        _this.mapShotInfoContainer.style.display = 'block';

    },



    /**
     * 提交数据到服务器
     * @type {Function}
     * @private
     */
    _postScreenShotInfo:function(){
        var _this = this;

        var bounds = _this.shotLayer.getBounds(); 

        var postData = {
            bbox:'[' +bounds.getNorthWest().lng.toFixed(5) + ',' + bounds.getNorthWest().lat.toFixed(5) +',' +bounds.getSouthEast().lng.toFixed(5) + ',' + bounds.getSouthEast().lat.toFixed(5) + ']',
            name:_this.curLayerObj.translate,
            zoom:_this.selectZoom.value,
            guid:_this.curLayerObj.guid,
            ext:_this.selectPicType.value
        }

        _this._map.fire('mapShot:postData',postData);

        //_this.remove();
    },

    /**
     * 移除事件
     * @type {Function}
     */
    remove:function(){
        var _this = this;
        _this._isScreenShot = false;        

        L.DomUtil.removeClass(_this._container,'active');

        _this.rectangle.disable();
        _this._shotGroup.clearLayers();

        _this.mapShotInfoContainer.style.display = 'none';


        _this._map.off('draw:created', _this.drawCreated,this);
        //_this._map.off('draw:edit', _this.drawEdit,this);

        _this._map.off('singleLayer:addToMap',_this.updatePanel,this);
        _this._map.off('singleLayer:removeFromMap',_this.getBaseMap,this);
        _this._map.off('editDraging',_this.updateShotBounds,this); 

        _this._map.off('mainLayer:addLayer',_this.getBaseMap,this);
        _this._map.off('overLayer:addLayer',_this.getBaseMap,this);

    }

});

L.control.mapShot = function(options){
    return new L.Control.MapShot(options);
};