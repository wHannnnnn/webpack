/**
 * 经纬网 网格显示
 * Author: Song.Huang
 * Date: 13-11-27
 * Time: 上午8:38
 */
L.Control.STLatLngLayer = L.Control.extend({

    //是否初始化
    _initialized:false,

    _STLayerGroup : new L.FeatureGroup(),
    _STLayerTextGroup : new L.FeatureGroup(),
    _offsetX :[0,0,108000,72000,54000,27000,13500,10800,5400,2700,1350,675,450,225,135,90,45,30,20,10],
    _offsetY :[0,0,72000,54000,36000,18000,9000,7200,3600,1800,900,450,300,150,90,60,30,20,10,5],


_options:{
        position:'topright',
        autoZIndex:true
    },

    initialize:function(options){
        L.setOptions(this,options);
        return this;
    },

    onAdd:function(map){
        this._map = map;
        this._createControl();
        this._map.on('cleanMap',this.disableST,this);
        return this._container;
    },

    _createControl:function(){
        var _this = this;
        this._container = L.DomUtil.create('div','leaflet-bar leaflet-control-st-latlng-layer');
        var link = L.DomUtil.create('a','leaflet-bar leaflet-control-st-latlng-layer-link',this._container);
        link.title = '经纬网';
        var span = L.DomUtil.create('span','',link);
        span.innerHTML = '经纬网';

        L.DomEvent
            .on(link,'click', L.DomEvent.stopPropagation)
            .on(link,'click', L.DomEvent.preventDefault)
            .on(link,'dblclick', L.DomEvent.preventDefault)
            .on(link,'dblclick', L.DomEvent.stopPropagation)
            .on(this._container,'contextmenu',L.DomEvent.stopPropagation)
            .on(link,'click',function(){
                if(_this._initialized){
                    _this._initialized = false;
                    L.DomUtil.removeClass(_this._container,'active');
                    _this._hideSTLayer();
                    _this._map.off('zoomend moveend resize',_this._addMapEvent,_this);
                }else {
                    _this._initialized = true;
                    L.DomUtil.addClass(_this._container,'active');
                    _this._STLayerGroup.addTo(_this._map);
                    _this._STLayerTextGroup.addTo(_this._map);
                    _this._showSTLayer({zoom:_this._map.getZoom(),bounds:_this._map.getBounds(),group:_this._STLayerGroup,textGroup:_this._STLayerTextGroup});
                    _this._map.on('zoomend moveend resize',_this._addMapEvent,_this);

                }
            });

    },

    disableST:function(){
        this.changStatus(false);
    },

    changStatus:function(status){
        var _this = this;
        if(!status){
            _this._initialized = false;
            L.DomUtil.removeClass(_this._container,'active');
            _this._hideSTLayer();
            _this._map.off('zoomend moveend resize',_this._addMapEvent,_this);
        }else {
            _this._initialized = true;
            L.DomUtil.addClass(_this._container,'active');
            _this._STLayerGroup.addTo(_this._map);
            _this._STLayerTextGroup.addTo(_this._map);
            _this._showSTLayer({zoom:_this._map.getZoom(),bounds:_this._map.getBounds(),group:_this._STLayerGroup,textGroup:_this._STLayerTextGroup});
            _this._map.on('zoomend moveend resize',_this._addMapEvent,_this);

        }
    },

    _addMapEvent:function(){
        var _this = this;
        if(_this._map.getZoom() > 1 && _this._map.getZoom() < 19){
            _this._STLayerGroup.clearLayers();
            _this._STLayerTextGroup.clearLayers();
            _this._showSTLayer({zoom:_this._map.getZoom(),bounds:_this._map.getBounds(),group:_this._STLayerGroup,textGroup:_this._STLayerTextGroup});
        }else {
            _this._STLayerGroup.clearLayers();
            _this._STLayerTextGroup.clearLayers();
        }
    },

    /**
     * 分格式化
     * @param  {[type]} latlng [分]
     * @return {[type]}        [description]
     */
    formatHMS: function (latlng){

        var lat = latlng.hasOwnProperty('lat')?latlng.lat:latlng[0];
        var lng = latlng.hasOwnProperty('lng')?latlng.lng:latlng[1];

        function setHMS(f){

            var h = parseInt(f/3600);
            var m = parseInt((f-h*3600)/60);
            var s = parseInt((f-h*3600-m*60));
            
            if(m.toString().length == 1){
                m = '0' + m.toString();
            }
            if(s.toString().length == 1){
                s = '0' + s.toString();
            }
            return h + '\u00b0' + m + '\u2032' + s + '\u2033';
        }

        var nLat = '';
        var nLng = '';

        if(lat < 0){
            nLat = 'S'+setHMS(lat*-1) ;
        }else {
            nLat = 'N'+setHMS(lat);
        }
        if(lng < 0){
            nLng = 'W'+setHMS(lng*-1);
        }else {
            nLng = 'E'+setHMS(lng);
        }

        return {lat:nLat,lng:nLng};
    },

    _showSTLayer:function(options){
        var _this = this;

        if(_this._map.getZoom() < 2){
            _this._STLayerGroup.clearLayers();
            return false;
        }

        var offsetX = _this._offsetX[options.zoom];
        var offsetY = _this._offsetY[options.zoom];

        var startSW = {lat:(parseInt(options.bounds._southWest.lat*3600/offsetY)-1)*offsetY,
            lng:(parseInt(options.bounds._southWest.lng*3600/offsetX)-1)*offsetX};

        var startNE = {lat:(parseInt(options.bounds._northEast.lat*3600/offsetY)+1)*offsetY,
            lng:(parseInt(options.bounds._northEast.lng*3600/offsetX)+1)*offsetX};
            
        //todo 这里需要做下优化  优化内容: 经纬度坐标文字更新和画线更新分离开来，让地图移动的时候让文字始终靠在界面边上
        for(var i = startSW.lat;i < startNE.lat;i+=offsetY){

            L.polyline([[i/3600,startSW.lng/3600],[i/3600,startNE.lng/3600]],{weight:1,color:'#000000',opacity:0.4}).on('mouseover',function(){
                this.setStyle({color:"#ff6600",weight:3,opacity:1})
            }).on('mouseout',function(){
                    this.setStyle({color:"#000000",weight:1,opacity:0.4})
                }).addTo(options.group);

            //左
            if(L.Util.verifyLatLng(i/3600,options.bounds._southWest.lng)){
                //var lL = L.olabel(L.latLng(i/3600,options.bounds._southWest.lng),_this.formatHMS([i,options.bounds._southWest.lng*3600]).lat,{className:'st-label st-lable-left',offset:[0,0]});
                var lL = L.circleMarker(L.latLng(i/3600,options.bounds._southWest.lng),{
                    radius:0,
                    stroke:false
                })
                lL.addTo(options.textGroup);
                lL.bindTooltip(_this.formatHMS([i,options.bounds._southWest.lng*3600]).lat,{
                    permanent:true,
                    offset:[60,0]
                }).openTooltip();
                if(!L.Browser.ie){
                    _this._map.on('move',function(){
                        this.setLatLng(L.latLng(this.getLatLng().lat,_this._map.getBounds()._southWest.lng));
                    },lL);
                }
            }
            
            //右
            if(L.Util.verifyLatLng(i/3600,options.bounds._northEast.lng)){
                //var rL = L.olabel(L.latLng(i/3600,options.bounds._northEast.lng), _this.formatHMS([i,options.bounds._northEast.lng*3600]).lat,{className:'st-label st-lable-right',offset:[0,0]});
                var rL = L.circleMarker(L.latLng(i/3600,options.bounds._northEast.lng),{
                    radius:0,
                    stroke:false
                });
                rL.addTo(options.textGroup);
                rL.bindTooltip(_this.formatHMS([i,options.bounds._northEast.lng*3600]).lat,{
                    permanent:true,
                    offset:[-10,0]
                }).openTooltip();
                if(!L.Browser.ie){
                    _this._map.on('move',function(){
                        this.setLatLng(L.latLng(this.getLatLng().lat,_this._map.getBounds()._northEast.lng));
                    },rL);
                }
            }


        }

        for(var ii = startSW.lng;ii < startNE.lng;ii+=offsetX){           
           
            L.polyline([[startSW.lat/3600,ii/3600],[startNE.lat/3600,ii/3600]],{weight:1,color:'#000000',opacity:0.4}).on('mouseover',function(){
                this.setStyle({color:"#ff6600",weight:3,opacity:1})
            }).on('mouseout',function(){
                    this.setStyle({color:"#000000",weight:1,opacity:0.4})
                }).addTo(options.group);

            if(L.Util.verifyLatLng(options.bounds._southWest.lat,ii/3600)){
                //var bL = L.olabel(L.latLng(options.bounds._southWest.lat,ii/3600),  _this.formatHMS([options.bounds._southWest.lng*3600,ii]).lng,{className:'st-label st-lable-bottom',offset:[0,0]});
                bL = L.circleMarker(L.latLng(options.bounds._southWest.lat,ii/3600),{
                    radius:0,
                    stroke:false
                });
                bL.addTo(options.textGroup);
                bL.bindTooltip(_this.formatHMS([options.bounds._southWest.lng*3600,ii]).lng,{
                    permanent:true,
                    offset:[0,-60]
                }).openTooltip();
                if(!L.Browser.ie){
                    _this._map.on('move',function(){
                        this.setLatLng(L.latLng(_this._map.getBounds()._southWest.lat,this.getLatLng().lng));
                    },bL);
                }
            }
            

            if(L.Util.verifyLatLng(options.bounds._northEast.lat,ii/3600)){
                //var tL = L.olabel(L.latLng(options.bounds._northEast.lat,ii/3600), _this.formatHMS([options.bounds._northEast.lng*3600,ii]).lng,{className:'st-label st-lable-top',offset:[0,0]});
                tL = L.circleMarker(L.latLng(options.bounds._northEast.lat,ii/3600),{
                    radius:0,
                    stroke:false
                });
                tL.addTo(options.textGroup);
                tL.bindTooltip(_this.formatHMS([options.bounds._northEast.lng*3600,ii]).lng,{
                    permanent:true,
                    offset:[0,90]
                }).openTooltip();
                if(!L.Browser.ie){
                    _this._map.on('move',function(){
                        this.setLatLng(L.latLng(_this._map.getBounds()._northEast.lat,this.getLatLng().lng));
                    },tL);
                }
            }



        }

    },

    _hideSTLayer:function(){
        var _this = this;
        _this._STLayerGroup.clearLayers();
        _this._map.removeLayer(_this._STLayerGroup);

        _this._STLayerTextGroup.clearLayers();
        _this._map.removeLayer(_this._STLayerTextGroup);
    }


});

L.control.STLatLngLayer = function(options){
    return new L.Control.STLatLngLayer(options);
};
