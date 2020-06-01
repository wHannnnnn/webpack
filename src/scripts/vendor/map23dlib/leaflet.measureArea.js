L.Control.MeasureArea = L.Control.extend({
 
    //是否初始化
    _initialized:false,
 
    //统计
    _mC:0,
 	//marker统计
 	AreaMarker:{},
    //测
    _measureAObjs:{},
    //是否已经显示测面
    isshowpolygonArea:false,
    //是否完成当前测绘
    _finished:true,
 
    /**
     * 是否是新的测量事件
     * @type {Boolean}
     * @default true
     * @private
     */
    _isNewMeasure:true,

    options:{
        position:'topright',
        autoZIndex:true,
        offset:[10,40]
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
        this._container = L.DomUtil.create('div','leaflet-bar leaflet-control-measure-area');

        var link = L.DomUtil.create('a','leaflet-control-measure-area-link',this._container);
        link.title = '测面积';
        L.DomUtil.create('span','',link);

        L.DomEvent
            .on(this._container,'contextmenu',L.DomEvent.stopPropagation)
            .on(link,'click', L.DomEvent.stopPropagation)
            .on(link,'click',function(){
                if(!_this._finished){
                    _this._finished = true;
                    L.DomUtil.removeClass(_this._container,'active');
                    _this._removeMeasureGroup();
                    map2DViewer.map.getContainer().style.cursor = 'auto';
                }else {
                    _this._finished = false;
                    L.DomUtil.addClass(_this._container,'active');
                    _this._addMeasureGroup();

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
            _this._finished = true;
            L.DomUtil.removeClass(_this._container,'active');
            _this._removeMeasureGroup();
            map2DViewer.map.getContainer().style.cursor = 'auto';
        }else {
            _this._finished = false;
            L.DomUtil.addClass(_this._container,'active');
            _this._addMeasureGroup();

            if(L.Browser.ie || L.Browser.firefox){
                map2DViewer.map.getContainer().style.cursor = 'url('+L.DefaultImagePath+'/cur-ruler.cur),auto';
            }else{
                map2DViewer.map.getContainer().style.cursor = 'url('+L.DefaultImagePath+'/cur-ruler.cur) 5 5,auto';
            }
        }
    },
    _addMeasureGroup:function(){
        var _this = this;
        _this.isshowpolygonArea = false;
        if(!_this._initialized){
            _this._measureGroup = new L.featureGroup();
            _this._measureGroup.addTo(map2DViewer.map);
            _this._initialized = true;
        }
        map2DViewer.map.doubleClickZoom.disable();
        map2DViewer.map.on('click',_this._onClickPoint,this);
    },
    _restartMeasuring:function(){
        var _this = this;
        map2DViewer.map.doubleClickZoom.disable();
        map2DViewer.map.on('click',_this._onClickPoint,this);
    },
    /**
     * 鼠标移动重绘多边形 //todo 这里应该 新建立一个临时 坐标组
     * @type {Function}
     * @param e
     * @private
     */
    _onMovePoint:function(e){
        var _this = this;
        var tempPoint = [];
        tempPoint = _this._measureAObjs[_this._mC].measurePoints.concat();
        _this._measureAObjs[_this._mC].measurePoints.push(e.latlng);

        _this._drawPolygon();
        _this._measureAObjs[_this._mC].measurePoints = tempPoint.concat();

    },
    /**
     * 鼠标单击添加多边形的点
     * @type {Function}
     * @param e
     * @private
     */ 
    _onClickPoint:function(e){
        var _this = this;
        e.latlng = L.Util.formatEarthLatLng(e.latlng);
        if(_this._isNewMeasure){
            _this._mC++;
            _this._measureAObjs[_this._mC] = new L.FeatureGroup();
            _this._measureAObjs[_this._mC].addTo(_this._measureGroup);
            _this._measureAObjs[_this._mC].measurePoints = [];
            _this._measureAObjs[_this._mC].polygon = new L.polygon([[0,0],[0,0],[0,0]],{fillColor:"blue",color:"#00b7ef",opacity:0.8,weight:3});
            _this._measureAObjs[_this._mC].polygon.addTo(_this._measureGroup);
            _this._measureAObjs[_this._mC].polygon.on('click',_this._onClickPoint,this);
            _this._isNewMeasure = false;
        }

        _this._measureAObjs[_this._mC].measurePoints.push(e.latlng);
        if(_this._measureAObjs[_this._mC].measurePoints.length > 1){
            _this._drawPolygon();
            map2DViewer.map.on('mousemove',_this._onMovePoint,this);
        }

        _this._buildMarker(e).addTo(_this._measureAObjs[_this._mC]);
        
    },
    /**
     * 鼠标双击结束多边形点添加
     * @type {Function}
     * @param e
     * @private
     */
    _onFinishClick:function(e){
        var _this = this;
        map2DViewer.map.off('mousemove',_this._onMovePoint,this);
        _this._measureAObjs[_this._mC].measurePoints.push(e.latlng);
        if(_this._measureAObjs[_this._mC].measurePoints.length > 1){
            _this._drawPolygon();
        }
        _this._measureAObjs[_this._mC].polygon.off('click',_this._onClickPoint,this);
        _this._isNewMeasure = true;
        if(!_this.isshowpolygonArea){
            _this._countArea(e);
            _this.isshowpolygonArea = true;
        }
        _this._finished = true;
        _this._removeMeasureGroup();
        _this.start();

    },
    /**
     * [cleanAllMeasure description]
     * @return {[type]} [description]
     */
    cleanAllMeasure:function(){
        var _this = this;
        for(var item in _this._measureAObjs){
            _this.del(item);
        }
    },
    /**
     * 重绘多边形
     * @type {Function}
     * @private
     */
    _drawPolygon:function(){
        var _this = this;
        _this._measureAObjs[_this._mC].polygon.setLatLngs(_this._measureAObjs[_this._mC].measurePoints);
        _this._measureAObjs[_this._mC].polygon.redraw();
    },
    /**
     * 创建一个marker 并返回该marker
     * @type {Function}
     * @param obj {Object} {latlng}
     * @returns {L.Marker}
     * @private
     */
    _buildMarker:function(obj){
        var _this = this;
        var marker  = L.marker(
            obj.latlng,
            {icon: L.divIcon({
                //className: 'my-div-icon1',
                //iconUrl: L.DefaultImagePath+'/icon-linePoint.png',
                iconSize: [5, 5]
            })}
        ); 
        marker.on('dblclick',function(e){
            if(_this._measureAObjs[_this._mC].measurePoints.length<2){
                return false;
            }
            //与上一个点相同，测量完成
            //if(e.latlng == _this._measureAObjs[_this._mC].measurePoints[_this._measureAObjs[_this._mC].measurePoints.length-1] ){                
                _this._onFinishClick({latlng:_this._measureAObjs[_this._mC].measurePoints[_this._measureAObjs[_this._mC].measurePoints.length-1]});
                return false;
            //}
        });
        _this.AreaMarker[_this._mC] = marker;
        return marker;
    },
    /**
     * 测量面积
     * @type {Function}
     * @param e
     * @private
     */
    _countArea:function(e){
        var _this = this;
        var areaLabel = L.DomUtil.create('span','area');
        areaLabel.style.color = 'red';
        areaLabel.style.fontWeight = 'bold';
        areaLabel.innerHTML = '面积：'+_this._getArea();
        //console.log(areaLabel.innerHTML);
        areaLabel.mid = _this._mC;


        var oLabelObj = L.DomUtil.create('p');
        oLabelObj.appendChild(areaLabel);
        L.DomEvent.on(oLabelObj,'dblclick', L.DomEvent.stopPropagation);
        L.DomEvent.on(oLabelObj,'dblclick',function(e){
            var mid = e.target? e.target.mid: e.srcElement.mid;
            _this.del(mid);
        });
       
        L.marker(e.latlng,{icon:L.divIcon({className: 'distance-div-icon'})}).bindLabel(oLabelObj,
            {noHide: true,clickable: true,className:'measure-distance-tip',offset:[0,0]}
            ).addTo(_this._measureAObjs[_this._mC]);

        
    }, 

    /**
     * 通过坐标点计算面积
     * @type {Function}
     * @returns {Number} 面积
     * @private
     */
    _getArea: function () {
        var _this = this;
        var latLngs = _this._measureAObjs[_this._mC].measurePoints;
        var pointsCount = latLngs.length,
            area = 0.0,
            d2r = Math.PI / 180,
            p1, p2;
        if (pointsCount > 2) {
            for (var i = 0; i < pointsCount; i++) {
                p1 = latLngs[i];
                p2 = latLngs[(i + 1) % pointsCount];
                area += ((p2.lng - p1.lng) * d2r) *
                    (2 + Math.sin(p1.lat * d2r) + Math.sin(p2.lat * d2r));
            }
            area = area * 6378137.0 * 6378137.0 / 2.0;
        }

        area =  Math.abs(area);

        if (area > 1000000) {
            area = (area * 0.000001).toFixed(2) + ' 平方公里';
        } else {
            area = area.toFixed(2) + ' 米&sup2;';
        }

        return area;
    },
    

    _removeMeasureGroup:function(){
        var _this = this;
        map2DViewer.map.off('mousemove',_this._onMovePoint,this);
        map2DViewer.map.doubleClickZoom.enable();
        map2DViewer.map.off('click',_this._onClickPoint,this);
    },
    
    
    /**
     * 删除对应iC的测距
     * @type {Function}
     */
    del:function(mC){
        var _this = this;/*
        var event = event || window.event;
        L.DomEvent.stop(event);*/
        _this._measureGroup.removeLayer(_this._measureAObjs[mC].polygon);
        _this._measureGroup.removeLayer(_this._measureAObjs[mC]);
        delete _this._measureAObjs[mC];
    },
});

L.control.measureArea = function(options){
    return new L.Control.MeasureArea(options);
}
map2DViewer.setAreaTool = function(options) {
    var defaultData = {
        action: 'add',
        position: 'topleft',
        offset: [10, 10]
    }
    _.merge(defaultData, options);
    switch (defaultData.action) {
        case 'add':
            this.areaTool = new L.Control.MeasureArea({
                position: defaultData.position,
                offset: defaultData.offset
            }).addTo(this.map);
            return this.areaTool;
            break;
        case 'remove':
            //this.areaTool.cleanAllMeasure();
            this.areaTool._removeMeasureGroup();
            //this.map.removeControl(this.areaTool);
            if(L.Browser.ie || L.Browser.firefox){
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-none.cur),auto';
            }else{
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-none.cur) 5 5,auto';
            }
            break;
        case 'clear':
            this.areaTool.cleanAllMeasure();
            this.areaTool._removeMeasureGroup();
            this.map.removeControl(this.areaTool);
            break;
        case 'restart':
            this.areaTool._restartMeasuring();
            break;
    }
}