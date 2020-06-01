L.Control.MeasureDistance = L.Control.extend({

    //是否初始化
    _initialized:false,

    //统计
    _lC:0,
 
    //测
    _measureObjs:{},

    //是否完成当前测绘
    _finished:true,


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
        this._createControl();

        this._map.on('measure-area-start',this.stop,this);
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
        this._container = L.DomUtil.create('div','leaflet-bar leaflet-control-measure-distance');

        var link = L.DomUtil.create('a','leaflet-control-measure-distance-link',this._container);
        link.title = '两点测量距离';
        L.DomUtil.create('span','',link);

        L.DomEvent
            .on(this._container,'contextmenu',L.DomEvent.stopPropagation)
            .on(link,'click', L.DomEvent.stopPropagation)
            .on(link,'click',function(){
                if(!_this._finished){
                    if(_this._measureObjs[_this._lC].distancePoints.length > 0){
                        _this._onFinishClick();
                    }
                    _this._finished = true;
                    L.DomUtil.removeClass(_this._container,'active');
                    _this._removeMeasureGroup();
                    map2DViewer.map.fire('measure-distance-stop');
                    map2DViewer.map.getContainer().style.cursor = 'auto';
                }else {
                    _this._finished = false;
                    L.DomUtil.addClass(_this._container,'active');
                    _this._addMeasureGroup();
                    map2DViewer.map.fire('measure-distance-start');

                    if(L.Browser.ie || L.Browser.firefox){
                        map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-ruler.cur),auto';
                    }else{
                        map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-ruler.cur) 5 5,auto';
                    }
                }
            })
        _this.start();
    },
 
    start:function(){
        var _this = this;
        if(!_this._finished){
            if(_this._measureObjs[_this._lC].distancePoints.length > 0){
                _this._onFinishClick();
            }
            _this._finished = true;
            L.DomUtil.removeClass(_this._container,'active');
            _this._removeMeasureGroup();
            map2DViewer.map.fire('measure-distance-stop');
            //map2DViewer.map.getContainer().style.cursor = 'auto';
        }
        _this._finished = false;
        L.DomUtil.addClass(_this._container,'active');
        _this._addMeasureGroup();
        map2DViewer.map.fire('measure-distance-start');
        if(L.Browser.ie || L.Browser.firefox){
            map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-ruler.cur),auto';
        }else{
            map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-ruler.cur) 5 5,auto';
        }
    },

    stop:function(){        
        var _this = this;
        if(!_this._finished){
            if(_this._measureObjs[_this._lC].distancePoints.length > 0){
                _this._onFinishClick();
            }
            _this._finished = true;
            L.DomUtil.removeClass(_this._container,'active');
            _this._removeMeasureGroup();
            map2DViewer.map.fire('measure-distance-stop');
            map2DViewer.map.getContainer().style.cursor = 'auto';
        }
    },

    measurePoints:function(startPoint,endPoint){
        var _this = this;
        _this.start();
        _this._onClickPoint({latlng:startPoint});
        _this._onClickPoint({latlng:endPoint});
    },

    updatelC:function(lC,startPoint,endPoint){
        var _this = this;
        _this._measureObjs[lC].distancePoints = [startPoint,endPoint];
        _this._measureObjs[lC].linePoints = [startPoint,endPoint];
        _this._measureObjs[lC].lineDistance = new L.LatLng(startPoint[0],startPoint[1]).distanceTo(new L.LatLng(endPoint[0],endPoint[1]));
        var newPos = _this._getCurvePoints([new L.LatLng(startPoint[0],startPoint[1]),new L.LatLng(endPoint[0],endPoint[1])]);
        _this._measureObjs[lC].polyLine.setLatLngs(newPos);
        _this._measureObjs[lC].polyLine.redraw();
        _this._measureObjs[lC].resultMarker.setLatLng(new L.LatLng(endPoint[0],endPoint[1]));
        var lineDistance = _this._measureObjs[lC].lineDistance;
        var lineDistanceStr = lineDistance  > 1000 ? (lineDistance  / 1000).toFixed(2) + '公里' : Math.ceil(lineDistance) + '米';
        var pointAngle = L.Util.getAngleByLatLng(startPoint[1],startPoint[0],endPoint[1],endPoint[0]);
        pointAngle += '度';
        //添加结束信息
        var pointText = L.DomUtil.create('div','measure-distance-result-text');
        pointText.innerHTML = lineDistanceStr+'<br/>'+pointAngle;

        pointText.lC = _this._lC;

        L.DomEvent.on(pointText, 'dblclick', function(e) {            
            L.DomEvent.stopPropagation(e); 
            _this.del(pointText.lC)      
        });

        _this._measureObjs[lC].removeLayer(_this._measureObjs[lC].resultMarker);
        _this._measureObjs[lC].resultMarker = L.marker(endPoint,{icon:L.divIcon({className: 'distance-div-icon'})}).bindLabel(pointText,
            {noHide: true,clickable: true,className:'measure-distance-tip',offset:[0,0]}
            ).addTo(_this._measureObjs[lC]);
        
        map2DViewer.map.fire('measure-distance-result',{lC:lC,distance:lineDistanceStr,angle:pointAngle,distancePoints:_this._measureObjs[lC].distancePoints});
    },

    /**
     * 清除所有的量算
     * @return {[type]} [description]
     */
    cleanAllMeasure:function(){
        var _this = this;
        for(var item in _this._measureObjs){
            _this.del(item);
        }
    },

    _addMeasureGroup:function(){
        var _this = this;
        if(!_this._initialized){
            _this._measureGroup = new L.featureGroup();
            _this._measureGroup.addTo(map2DViewer.map);
            _this._initialized = true;
        }
        map2DViewer.map.doubleClickZoom.disable();
        map2DViewer.map.on('click',_this._onClickPoint,this);
        _this._lC++;
        _this._measureObjs[_this._lC] = new L.FeatureGroup();
        _this._measureObjs[_this._lC].tempLine = new L.Polyline([[0,0],[0,0]],{clickable:false,color:'#ff0000',weight:2,opacity:0.2}).addTo(_this._measureObjs[_this._lC]);
        _this._measureObjs[_this._lC].addTo(_this._measureGroup);
        _this._measureObjs[_this._lC].distancePoints = [];
        _this._measureObjs[_this._lC].linePoints = [];
        _this._measureObjs[_this._lC].lineDistance = 0;

    },

    _removeMeasureGroup:function(){
        var _this = this;
        map2DViewer.map.off('mousemove',_this._onMoveLine,this);
        map2DViewer.map.doubleClickZoom.enable();
        map2DViewer.map.off('click',_this._onClickPoint,this);
    },
    _restartMearing:function(){
        var _this = this;
        map2DViewer.map.doubleClickZoom.disable();
        map2DViewer.map.on('click',_this._onClickPoint,this);
    },
    /**
     * 鼠标单击事件，如果是第一次，则设置为初始点  如果产生第二个点表示测量完成
     * @param e
     * @returns {boolean}
     * @private
     */
    _onClickPoint:function(e){
        var _this = this;
        e.latlng = L.Util.formatEarthLatLng(e.latlng);
        if(_this._measureObjs[_this._lC].distancePoints.length > 0){            

            _this._measureObjs[_this._lC].distancePoints.push(e.latlng);

            var _sPoint = _this._measureObjs[_this._lC].distancePoints[_this._measureObjs[_this._lC].distancePoints.length-2];
            var qPoints = _this._getCurvePoints([_sPoint, e.latlng]);

            _this._measureObjs[_this._lC].linePoints.push(qPoints);

            var lineDistance = _sPoint.distanceTo(e.latlng) + _this._measureObjs[_this._lC].lineDistance;
            _this._measureObjs[_this._lC].lineDistance = lineDistance;

            //更新划线
            _this._upDateLine(_this._lC);

            _this._onFinishClick();

        }else {
            _this._measureObjs[_this._lC].distancePoints.push(e.latlng);
            map2DViewer.map.on('mousemove',_this._onMoveLine,this);
        }
    },

    /**
     * 给起始点和目的点的鼠标画线
     * @type {Function}
     * @param e
     * @private
     */
    _onMoveLine:function(e){
        var _this = this;
        if(_this._measureObjs[_this._lC].distancePoints.length > 0){
            var _startPoint = _this._measureObjs[_this._lC].distancePoints[0];
            var _endPoint = e.latlng;
            _this._drawLine(_startPoint,_endPoint);
        }
    },

    /**
     * 更新画线
     * @type {Function}
     * @param start {Object} 开始点
     * @param end {Object} 结束点
     * @private
     */
    _drawLine:function(start,end){
        var _this = this;
        var newPos = _this._getCurvePoints([start,end]);
        _this._measureObjs[_this._lC].tempLine.setLatLngs(newPos);
        _this._measureObjs[_this._lC].tempLine.redraw();
    },

    _upDateLine:function(lC){
        var _this = this;
        var linePoints  = _this._measureObjs[_this._lC].linePoints;
        var allPoints = [];
        for(var i = 0,l=linePoints.length;i<l;i++){
            allPoints = allPoints.concat(linePoints[i]);
        }
        if(_this._measureObjs[lC].polyLine){
            _this._measureObjs[lC].polyLine.setLatLngs(allPoints);
        }else {
            _this._measureObjs[lC].polyLine = L.polyline(allPoints,{color:'#ff0000',weight:2, opacity:1,clickable:false})
                .addTo(_this._measureObjs[lC]);
        }
    },

    /**
     * 结束当前线条画线测距
     * @param e
     * @private
     */
    _onFinishClick:function(){
        var _this = this;        
        var _lastPoint = _this._measureObjs[_this._lC].distancePoints[_this._measureObjs[_this._lC].distancePoints.length-1];

        var lineDistance = _this._measureObjs[_this._lC].lineDistance;

        map2DViewer.map.off('mousemove',_this._onMoveLine,this);

        _this._measureObjs[_this._lC].removeLayer(_this._measureObjs[_this._lC].tempLine);

        _this._measureObjs[_this._lC].lineDistance = lineDistance;
        var lineDistanceStr = lineDistance  > 1000 ? (lineDistance  / 1000).toFixed(2) + '公里' : Math.ceil(lineDistance) + '米';
        var startPoint = _this._measureObjs[_this._lC].distancePoints[0];
        var endPoint = _this._measureObjs[_this._lC].distancePoints[1];
        var pointAngle = L.Util.getAngleByLatLng(startPoint.lng,startPoint.lat,endPoint.lng,endPoint.lat);
        pointAngle += '度';
        //添加结束信息
        var pointText = L.DomUtil.create('div','measure-distance-result-text');
        pointText.innerHTML = lineDistanceStr+'<br/>'+pointAngle;
        pointText.lC = _this._lC;

        L.DomEvent.on(pointText, 'dblclick', function(e) {            
            L.DomEvent.stopPropagation(e); 
            _this.del(pointText.lC)      
        });

        _this._measureObjs[_this._lC].resultMarker = L.marker(_lastPoint,{icon:L.divIcon({className: 'distance-div-icon'})}).bindLabel(pointText,
            {noHide: true,clickable: true,className:'measure-distance-tip',offset:[0,0]}
            ).addTo(_this._measureObjs[_this._lC]);
        _this._finished = true;

        L.DomUtil.removeClass(_this._container,'active');
        _this._removeMeasureGroup();
        map2DViewer.map.fire('measure-distance-stop');
        map2DViewer.map.getContainer().style.cursor = 'auto';

        map2DViewer.map.fire('measure-distance-result',{lC:_this._lC,distance:lineDistanceStr,angle:pointAngle,distancePoints:_this._measureObjs[_this._lC].distancePoints});
        _this.start();
    },

    /**
     * 删除对应lC的测距
     */
    del:function(lC){
        var _this = this;
        if(_this._measureObjs[lC]){
            _this._measureGroup.removeLayer(_this._measureObjs[lC]);
            delete _this._measureObjs[lC];
            map2DViewer.map.fire('measure-distance-delete',{lC:lC});
        }
    },

    /**
     * 获取弧线的节点坐标数组 
     * @type {Function}
     * @param points
     * @returns {Array}
     * @private
     */
    _getCurvePoints:function(points){
        var _this = this;
        var curvePoints = [];
        for(var i = 0; i < points.length-1;i++){
            if(points[i]['lat'] == points[i+1]['lat'] && points[i]['lng'] == points[i+1]['lng']){
                curvePoints = curvePoints.concat(points[i]);
            }else {
                var p = _this._getCurve(points[i],points[i+1],20);
                if(p && p.length > 0){
                    curvePoints = curvePoints.concat(p);
                }
            }            
        }
        return curvePoints;
    },

    /**
     * 根据两点获取曲线坐标点数组
     * @type {Function}
     * @param start {Object} 起点
     * @param finish {Object} 终点
     * @param segments {Number} 拐点数量
     * @returns {*}
     * @private
     */
    _getCurve:function(start,finish,segments){
        var startlat = start.lat;
        var startlon = start.lng;
        var finishlat = finish.lat;
        var finishlon = finish.lng;
        var segments = segments;
        var curveAry = [];

        var lat1 = startlat * (Math.PI / 180);
        var lon1 = startlon * (Math.PI / 180);
        var lat2 = finishlat * (Math.PI / 180);
        var lon2 = finishlon * (Math.PI / 180);


        var d = 2 * Math.asin(Math.sqrt(Math.pow((Math.sin((lat1-lat2)/2)),2)+Math.cos(lat1)*Math.cos(lat2)*Math.pow((Math.sin((lon1-lon2)/2)),2)));

        for(var n= 0; n<segments+1;n++){
            var f = (1/segments)*n;
            var A = Math.sin((1-f)*d)/Math.sin(d);
            var B = Math.sin(f*d)/Math.sin(d);

            var x = A * Math.cos(lat1)*Math.cos(lon1) + B*Math.cos(lat2)*Math.cos(lon2);
            var y = A * Math.cos(lat1)*Math.sin(lon1) + B*Math.cos(lat2)*Math.sin(lon2);
            var z = A * Math.sin(lat1) + B * Math.sin(lat2);

            var lat = Math.atan2(z,Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
            var lon = Math.atan2(y,x);
            try{
                var temp = L.latLng(lat/(Math.PI/180),lon/(Math.PI/180));
                curveAry.push(temp);
            }catch (e){

            }

        }


        return curveAry;
    },

    onRemove: function(map) {
        
        //this.cleanAllMeasure();
        return this;
      }

});

L.control.measureDistance = function(options){
    return new L.Control.MeasureDistance(options);
}

/**
 * 测量工具
 */
map2DViewer.distanceToolFire = function(data) {};
map2DViewer.distanceToolDelFire = function(data) {};
map2DViewer.setDistanceTool = function(options) {
    var defaultData = {
        action: 'add',
        position: 'topleft',
        offset: [10, 10]
    }
    _.merge(defaultData, options);
    switch (defaultData.action) {
        case 'add':
            this.distanceTool = new L.Control.MeasureDistance({
                position: defaultData.position,
                offset: defaultData.offset
            }).addTo(this.map);
            this.map.on('measure-distance-result', map2DViewer.distanceToolFire);
            this.map.on('measure-distance-delete', map2DViewer.distanceToolDelFire);
            return this.distanceTool;
            break;
        case 'remove':
            //this.distanceTool.cleanAllMeasure();
            this.distanceTool._removeMeasureGroup();
            //this.map.removeControl(this.distanceTool);
            this.map.off('measure-distance-result', map2DViewer.distanceToolFire);
            this.map.off('measure-distance-delete', map2DViewer.distanceToolDelFire);
            if(L.Browser.ie || L.Browser.firefox){
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-none.cur),auto';
            }else{
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-none.cur) 5 5,auto';
            }
            break;
        case 'clear':
            this.distanceTool.cleanAllMeasure();
            this.distanceTool._removeMeasureGroup();
            this.map.removeControl(this.distanceTool);
            break;
        case 'restart':
            this.distanceTool._restartMearing();
    }
}