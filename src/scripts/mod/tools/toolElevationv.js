/**
 * @fileoverview 工具 剖面量算 模块
 * @author Song.Huang
 * @version 1.0.0
 */
define(['vendorDir/map23dlib/leaflet.eleation',
        'vendorDir/map23dlib/d3.v3.min'],function(){
    /**
     * 工具 剖面量算 模块 
     * @exports ONEMAP.M.elevationTool
     * @type {Object}
     */
    ONEMAP.M.elevationTool = {
        /**
         * 地图实例
         * @type {Object}
         * @link ONEMAP.M.mapHolder.outPutValue.map
         * @private
         */
        _map: ONEMAP.M.mapHolder.outPutValue.map,

        /**
         * 点和线容器
         * @type {Object}
         * @private
         */
        _elevationGroup: map23DControl.group({
                            action: 'add'
                        }),
        /**
         * 
         * 是否初始化
         * @type {Boolean}
         * @default false
         * @private
         */
        _initialized: false,

        /**
         * 初始线
         * @type {Object}
         * @private
         */
        _lineGuide:new L.Polyline([[0,0],[0,0]],{clickable:false,color:'#edad00',weight:3,opacity:0.5}),

        /**
         * 线条统计
         * @type {Number}
         * @default 0
         * @private
         */
        _lC:0,

        /**
         * 量算线条集合
         * @type {Object}
         * @default {}
         * @private
         */
        _elevationObjs:{},

        /**
         * 正在进行量算的
         * @type {[type]}
         */
        _curElevIC:null,

        /**
         * 是否是新的画线事件
         * @type {Boolean}
         * @default true
         * @private
         */
        _isNewelevation:true,

        /**
         * 初始化
         * @type {Function}
         */
        init:function(){
            var _this = ONEMAP.M.elevationTool;

            ONEMAP.C.publisher.publish('elevation','mapTools');
            //_this.subscribe();

            if(L.Browser.ie || L.Browser.firefox){
                _this._map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/ruler.cur),auto';
            }else{
                _this._map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/ruler.cur) 5 5,auto';
            }

            if(_this._initialized === false){
                _this._elevationGroup =  map23DControl.group({
                                    action: 'add'
                                });
                _this._elevationGroup = map2DViewer.groups[_this._elevationGroup];
                //_this._elevationGroup.addTo(_this._map);
                _this._lC = 0;
                _this._initialized = false;
            }


            _this._map.doubleClickZoom.disable();

            _this._map.on('click',_this._onClickPoint,this);
        },
        removeCurClass:function(options){
            if(options == 'elevation'){
                if($(".tools-elevation").hasClass('cur')){
                    $('.tools-elevation').removeClass('elevationchoose');
                    $('.tools-elevation').removeClass('cur');
                }else{
                    $('.tools-elevation').addClass('elevationchoose');
                    $('.tools-elevation').addClass('cur');
                }
            }else{
                if($(".tools-elevation").hasClass('cur')){
                    $('.tools-elevation').removeClass('elevationchoose');
                    $('.tools-elevation').removeClass('cur');
                }
            }
        },
        /**
         * 鼠标单击事件，如果是第一次，则设置为初始点
         * @type {Function}
         * @param e {Event}
         * @returns {boolean}
         * @private
         */
        _onClickPoint:function(e){
            var _this = ONEMAP.M.elevationTool;
            var labelObj = L.DomUtil.create('p');
            var tipText = '起点';
            if(_this._isNewelevation){
                _this._lC++;

                _this._lineGuide.addTo(_this._elevationGroup);

                _this._elevationObjs[_this._lC] = new L.FeatureGroup();
                _this._elevationObjs[_this._lC].addTo(_this._elevationGroup);
                _this._elevationObjs[_this._lC].rangPoints = [];
                _this._elevationObjs[_this._lC].lineDistance = 0;
                _this._elevationObjs[_this._lC].linePoints = [];

                _this._isNewelevation = false;
            }


            if(_this._elevationObjs[_this._lC].rangPoints.length > 0){
                if(e.latlng === _this._elevationObjs[_this._lC].rangPoints[_this._elevationObjs[_this._lC].rangPoints.length-1] ){
                    return false;
                }
                _this._elevationObjs[_this._lC].rangPoints.push(e.latlng);

                var _sPoint = _this._elevationObjs[_this._lC].rangPoints[_this._elevationObjs[_this._lC].rangPoints.length-2];

                var numP = parseInt(_sPoint.distanceTo(e.latlng)/600)>2?parseInt(_sPoint.distanceTo(e.latlng)/600):2;
                var qPoints = _this._getCurvePoints([_sPoint, e.latlng],numP);

                _this._elevationObjs[_this._lC].linePoints.push(qPoints);

                var tem = L.polyline(qPoints,{color:'#edad00',weight:3, opacity:1});
                tem.addTo(_this._elevationObjs[_this._lC]);
                tem.redraw();
                var lineDistance = _sPoint.distanceTo(e.latlng) + _this._elevationObjs[_this._lC].lineDistance;
                _this._elevationObjs[_this._lC].lineDistance = lineDistance;
                var lineDistanceStr = lineDistance  > 1000 ? (lineDistance  / 1000).toFixed(2) + '公里' : Math.ceil(lineDistance) + '米';
                tipText = lineDistanceStr;
                labelObj.innerHTML = tipText;
            }else {
                _this._elevationObjs[_this._lC].rangPoints.push(e.latlng);
                labelObj.innerHTML = tipText;
                _this._map.on('mousemove',_this._onMoveLine,this);
            }

            _this._elevationObjs[_this._lC]._lastMarker  = _this._buildMarker({latlng: e.latlng}).bindLabel(labelObj,{noHide: true});
            _this._elevationObjs[_this._lC]._lastMarker.addTo(_this._elevationObjs[_this._lC]);
        },


        /**
         * 给起始点和目的点的鼠标画线
         * @type {Function}
         * @param e
         * @private
         */
        _onMoveLine:function(e){
            var _this = ONEMAP.M.elevationTool;
            if(_this._elevationObjs[_this._lC].rangPoints.length > 0){
                var _startPoint = _this._elevationObjs[_this._lC].rangPoints[_this._elevationObjs[_this._lC].rangPoints.length-1];
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
            var _this = ONEMAP.M.elevationTool;
            var numP = parseInt(start.distanceTo(end)/600)>2?parseInt(start.distanceTo(end)/600):2;
            var newPos = _this._getCurvePoints([start,end],numP);
            _this._lineGuide.setLatLngs(newPos);
            _this._lineGuide.redraw();

            //var lineDistance = start.distanceTo(end) + _this._elevationObjs[_this._lC].lineDistance;
            //var lineDistanceStr = lineDistance  > 1000 ? (lineDistance  / 1000).toFixed(2) + '公里' : Math.ceil(lineDistance) + '米';

            //if(_this.tempOlabel){
            //    _this._elevationGroup.removeLayer(_this.tempOlabel);
            //}
            //_this.tempOlabel = new L.Olabel(end,'总距离:'+lineDistanceStr+' <span style="color:#ff0000">(双击结束)</span>').addTo(_this._elevationGroup);
        },


        /**
         * 双击事件，结束当前线条画线测距
         * @type {Function}
         * @param e
         * @private
         */
        _onFinishClick:function(e){
            var _this = ONEMAP.M.elevationTool;

            if(_this.tempOlabel){
                _this._elevationGroup.removeLayer(_this.tempOlabel);
            }

            _this._lineGuide.setLatLngs([[0,0],[0,0]]);
            _this._lineGuide.redraw();

            _this._map.off('mousemove',_this._onMoveLine,this);
            var _lastPoint = _this._elevationObjs[_this._lC].rangPoints[_this._elevationObjs[_this._lC].rangPoints.length-1];
            var lineDistance = _this._elevationObjs[_this._lC].lineDistance;
            _this._elevationObjs[_this._lC].lineDistance = lineDistance;
            var lineDistanceStr = lineDistance  > 1000 ? (lineDistance  / 1000).toFixed(2) + '公里' : Math.ceil(lineDistance) + '米';


            var delLabel = L.DomUtil.create('span','elevation-ico-del');
            delLabel.lid = _this._lC;
            L.DomEvent.on(delLabel,'click',function(e){
                var lid = e.target? e.target.lid: e.srcElement.lid;
                _this.del(e,lid);
            });

            var runLabel = L.DomUtil.create('span','elevation-ico-run');
            runLabel.lid = _this._lC;
            runLabel.innerHTML = '进行量算';
            L.DomEvent.on(runLabel,'click',function(e){
                var lid = e.target? e.target.lid: e.srcElement.lid;
                _this.run(e,lid);
            });

            var oLabelObj = L.DomUtil.create('p');
            oLabelObj.appendChild(runLabel);
            oLabelObj.appendChild(delLabel);


            /*L.olabel(_lastPoint,oLabelObj)
                .addTo(_this._elevationObjs[_this._lC]);*/

            _this.run(null,_this._lC);

            _this._isNewelevation = true;
        },

        /**
         * 进行剖面量算
         * @param  {[type]} event [description]
         * @param  {[type]} iC    [description]
         * @return {[type]}       [description]
         */
        run:function(event,iC){
            var _this = ONEMAP.M.elevationTool;
            // var event = event || window.event;
            // L.DomEvent.stop(event);

            _this._curElevIC = iC;

            var coordinates = [];

            

            for(var i = 0, l = _this._elevationObjs[iC].linePoints.length; i<l; i++){
                var pointsLatLngs = _this._elevationObjs[iC].linePoints[i]; 
                for(var ii = 0, ll = pointsLatLngs.length; ii<ll;ii++){
                    coordinates.push(pointsLatLngs[ii]['lng']);
                    coordinates.push(pointsLatLngs[ii]['lat']);
                }
            }  

            if(coordinates.length<2){
                ONEMAP.C.publisher.publish({type:'error',message:'量算点数过少，无法进行剖面量算!'},'noteBar::add');
                return false;
            }          

            var url = onemapUrlConfig.elevationDataUrl+'/terrain/profile';
            var ajaxData = {
                points:'['+coordinates.join(',')+']',
                count:8,
                zoom:_this._map.getZoom(),
                delta_zoom:0
            };
            $.ajax({
                type:"post",
                dataType:'json',
                data:ajaxData,
                url:url,
                beforeSend:ONEMAP.V.loading.load(),
                success:function(data){
                    if(data.code == 0){
                    
                        if(data.data.length>0){
                            var coordinatesAll = [];
                            var coordinatesTemp = [];
                            var gap = 1;
                            for(var i = 0, l = data.data.length; i<l; i++){
                                coordinatesTemp = [data.data[i+2],data.data[i+3],data.data[i+1]];
                                coordinatesAll.push(coordinatesTemp);
                                i = i+3;
                            }

                            var geojson = {"name":"NewFeatureType","type":"FeatureCollection"
                            ,"features":[
                            {"type":"Feature","geometry":{"type":"LineString"
                            ,"coordinates":coordinatesAll}
                            ,"properties":null}
                            ]};

                            if(ONEMAP.M.mapHolder._elevationControl){
                                ONEMAP.M.mapHolder._elevationControl.removeFrom(_this._map);
                                ONEMAP.M.mapHolder._elevationControl = null;
                            }

                            ONEMAP.M.mapHolder._elevationControl = L.control.elevation();
                            ONEMAP.M.mapHolder._elevationControl.addTo(_this._map);                        
                            var gjl = L.geoJson(geojson,{
                                onEachFeature: ONEMAP.M.mapHolder._elevationControl.addData.bind(ONEMAP.M.mapHolder._elevationControl)
                            });
                        }else {
                            ONEMAP.C.publisher.publish({type:'error',message:'无量算数据显示!'},'noteBar::add');
                        }
                    
                    }else {
                        ONEMAP.C.publisher.publish({type:'error',message:data.message},'noteBar::add');
                    }
                },
                completer:ONEMAP.V.loading.loaded()
            });

            //_this._elevationGroup.removeLayer(_this._elevationObjs[iC]);
        },

        /**
         * 删除对应iC的测距
         * @type {Function}
         * @param event {Event}
         * @param iC {String} IC
         */
        del:function(event,iC){
            var _this = ONEMAP.M.elevationTool;
            var event = event || window.event;
            L.DomEvent.stop(event);
            _this._elevationGroup.removeLayer(_this._elevationObjs[iC]);
            delete _this._elevationObjs[iC];
            if(_this._curElevIC == iC){
                if(ONEMAP.M.mapHolder._elevationControl){
                    ONEMAP.M.mapHolder._elevationControl.removeFrom(_this._map);
                    ONEMAP.M.mapHolder._elevationControl = null;
                }
            }            
        },

        /**
         * 清除所有的测距
         * @type {Function}
         */
        clearAllelevation:function(){
            var _this = ONEMAP.M.elevationTool;
            _this._mapTools();
            _this._elevationGroup.clearLayers();
            _this._elevationObjs = {};
            if(ONEMAP.M.mapHolder._elevationControl){
                ONEMAP.M.mapHolder._elevationControl.removeFrom(_this._map);
                ONEMAP.M.mapHolder._elevationControl = null;
            }
        },



        /**
         * 创建一个marker 并返回该marker
         * @type {Function}
         * @param obj {Object} marker对象
         * @returns {L.Marker}
         * @private
         */
        _buildMarker:function(obj){
            var _this = this;
            var marker  = new L.Marker(
                obj.latlng,
                {icon: L.icon({
                    iconUrl: '/images/layout/ico_linePoint.png',
                    iconSize: [15, 15],
                    iconAnchor: [7, 7],
                    popupAnchor: [0, -7]
                })}
            );
            marker.on('dblclick',function(e){
                if(_this._elevationObjs[_this._lC].rangPoints.length<2){
                    return false;
                }
                //与上一个点相同，测量完成
                if(e.latlng.lat == _this._elevationObjs[_this._lC].rangPoints[_this._elevationObjs[_this._lC].rangPoints.length-1].lat && e.latlng.lng == _this._elevationObjs[_this._lC].rangPoints[_this._elevationObjs[_this._lC].rangPoints.length-1].lng){                
                    _this._onFinishClick({latlng:_this._elevationObjs[_this._lC].rangPoints[_this._elevationObjs[_this._lC].rangPoints.length-1]});
                    return false;
                }
            });
            return marker;
        },

        /**
         * 获取弧线的节点坐标数组 //todo 有误
         * @type {Function}
         * @param points
         * @returns {Array}
         * @private
         */
        _getCurvePoints:function(points,num){
            var _this = ONEMAP.M.elevationTool;
            var curvePoints = [];
            for(var i = 0; i < points.length-1;i++){
                var p = _this._getCurve(points[i],points[i+1],num);
                if(p && p.length > 0){
                    curvePoints = curvePoints.concat(p);
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


        /**
         * 工具模块相互通告移除
         * @type {Function}
         * @param name {String} 模块名称
         * @private
         */
        _mapTools:function(name){
            var _this = ONEMAP.M.elevationTool;
            if(name === 'elevation'){

            }else{
                $("#tools .tools-elevation .abtn_elevation").removeClass('cur');
                _this.remove();
            }
        },


        /**
         * 注册监听
         * @type {Function}
         */
        subscribe:function(){
            var _this = ONEMAP.M.elevationTool;
            //ONEMAP.C.publisher.subscribe(_this._mapTools,'mapTools');
            ONEMAP.C.publisher.subscribe(_this.removeCurClass, 'removeToolsCalss');
        },

        /**
         * 取消监听
         * @type {Function}
         */
        unSubscribe: function () {
            var _this = ONEMAP.M.elevationTool;
            ONEMAP.C.publisher.unSubscribe(_this._mapTools,'mapTools');
        },

        /**
         * 模块移除
         * @type {Function}
         */
        remove:function(){
            var _this = ONEMAP.M.elevationTool;
            _this._map.doubleClickZoom.enable();
            $('#mapHolder').css({cursor:'auto'});

            if(_this._isNewelevation === false){
                _this._onFinishClick({latlng:_this._elevationObjs[_this._lC].rangPoints[_this._elevationObjs[_this._lC].rangPoints.length-1]});
            }
            _this._isNewelevation = true;

            _this._map.off('click',_this._onClickPoint,this)
                .off('mousemove',_this._onFinishClick,this);
            _this.unSubscribe();
            //ONEMAP.M.pcLayout.cancellMouseBlur();
            if(L.Browser.ie || L.Browser.firefox){
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-none.cur),auto';
            }else{
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-none.cur) 5 5,auto';
            }
        }

    };

    return ONEMAP.M.elevationTool;
});