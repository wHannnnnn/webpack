/**
 * @fileoverview 工具 剖面量算 模块
 * @author Song.Huang
 * @version 1.0.0
 */
define([
        'html!templates/tools/toolElevation',
        'vendorDir/map23dlib/leaflet.eleation',
        'vendorDir/map23dlib/d3.v3.min',
        'css!styles/tools/toolElevation'
    ],
    function(tpcLayout) {
        /**
         * 状态值
         * @type {Boolean}
         * @default false
         * @private
         */
        var status = {
            initialized: false //是否初始化
        };
        /**
         * 模块数据 用于数据存储和外部调用
         * @type {Object}
         * 数据存放
         */
        var modValue = {
            elevationGroup: null, //电和线容器
            lineGuide: null, //初始线
            lC: 0, //线条统计
            elevationObjs: {}, //量算线条集合
            curElevIC: null, //正在进行的量算
            isNewelevation: true, //是否是新的画线事件
        };
        /**
         * 页面初始化
         * 添加监听
         * @type {Function}
         */
        function init() {
            if (L.Browser.ie || L.Browser.firefox) {
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-ruler.cur),auto';
            } else {
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-ruler.cur) 5 5,auto';
            }
            if (!status.initialized) {
                modValue.elevationGroup = map23DControl.group({
                    action: 'add'
                });
                $('#wrapper').append(tpcLayout);
                subscribe();
                status.initialized = true;
                $(window).resize(function() {
                    layoutResize();
                });
            }
            ONEMAP.C.publisher.publish({
                modName: 'toolElevation'
            }, 'tools:active');
            map2DViewer.map.doubleClickZoom.disable();
            map2DViewer.map.on('click', onClickPoint);
            modValue.lineGuide = map23DControl.polyline({
                action: 'add',
                groupId: modValue.elevationGroup,
                geojson: {
                    "properties": {
                        color: '#edad00',
                        weight: 3,
                        opacity: 0.5,
                    },
                    "geometry": {
                        "coordinates": [
                            [0, 0],
                            [0, 0]
                        ]
                    }
                }
            })
        };
        function layoutResize(){
            $("#elevationContent").css({
                'left':0,
                'width':'100%'
            })
            $(".leaflet-control-elevation").css({
                'position':'absolute',
                'left':0,
                'bottom':0
            })
            run(null, modValue.lC);
        };
        /**
         * 鼠标单击事件，如果是第一次，则设置为初始点
         * @type {Function}
         * @param e {Event}
         * @returns {boolean}
         * @private
         */
        function onClickPoint(e) {
            var labelObj = L.DomUtil.create('p');
            var tipText = '起点';
            if (modValue.isNewelevation) {
                modValue.lC++;
                modValue.elevationObjs[modValue.lC] = new L.FeatureGroup();
                modValue.elevationObjs[modValue.lC].addTo(map2DViewer.groups[modValue.elevationGroup]);
                modValue.elevationObjs[modValue.lC].rangPoints = [];
                modValue.elevationObjs[modValue.lC].lineDistance = 0;
                modValue.elevationObjs[modValue.lC].linePoints = [];
                modValue.isNewelevation = false;
            };
            if (modValue.elevationObjs[modValue.lC].rangPoints.length > 0) {
                if (e.latlng === modValue.elevationObjs[modValue.lC].rangPoints[modValue.elevationObjs[modValue.lC].rangPoints.length - 1]) {
                    return false;
                }
                modValue.elevationObjs[modValue.lC].rangPoints.push(e.latlng);

                var _sPoint = modValue.elevationObjs[modValue.lC].rangPoints[modValue.elevationObjs[modValue.lC].rangPoints.length - 2];

                var numP = parseInt(_sPoint.distanceTo(e.latlng) / 600) > 2 ? parseInt(_sPoint.distanceTo(e.latlng) / 600) : 2;
                var qPoints = getCurvePoints([_sPoint, e.latlng], numP);

                modValue.elevationObjs[modValue.lC].linePoints.push(qPoints);

                var tem = L.polyline(qPoints, { color: '#edad00', weight: 3, opacity: 1 });
                tem.addTo(modValue.elevationObjs[modValue.lC]);
                tem.redraw();
                var lineDistance = _sPoint.distanceTo(e.latlng) + modValue.elevationObjs[modValue.lC].lineDistance;
                modValue.elevationObjs[modValue.lC].lineDistance = lineDistance;
                var lineDistanceStr = lineDistance > 1000 ? (lineDistance / 1000).toFixed(2) + '公里' : Math.ceil(lineDistance) + '米';
                tipText = lineDistanceStr;
                labelObj.innerHTML = tipText;
            } else {
                modValue.elevationObjs[modValue.lC].rangPoints.push(e.latlng);
                labelObj.innerHTML = tipText;
                map2DViewer.map.on('mousemove', onMoveLine);
            }
            modValue.elevationObjs[modValue.lC]._lastMarker = buildMarker({ latlng: e.latlng }).bindLabel(labelObj, { noHide: true });
            modValue.elevationObjs[modValue.lC]._lastMarker.showLabel();
            modValue.elevationObjs[modValue.lC]._lastMarker.addTo(modValue.elevationObjs[modValue.lC]);
        };
        /**
         * 获取弧线的节点坐标数组 //todo 有误
         * @type {Function}
         * @param points
         * @returns {Array}
         * @private
         */
        function getCurvePoints(points, num) {
            var curvePoints = [];
            for (var i = 0; i < points.length - 1; i++) {
                var p = getCurve(points[i], points[i + 1], num);
                if (p && p.length > 0) {
                    curvePoints = curvePoints.concat(p);
                }
            }
            return curvePoints;
        };
        /**
         * 根据两点获取曲线坐标点数组
         * @type {Function}
         * @param start {Object} 起点
         * @param finish {Object} 终点
         * @param segments {Number} 拐点数量
         * @returns {*}
         * @private
         */
        function getCurve(start, finish, segments) {
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
            var d = 2 * Math.asin(Math.sqrt(Math.pow((Math.sin((lat1 - lat2) / 2)), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow((Math.sin((lon1 - lon2) / 2)), 2)));

            for (var n = 0; n < segments + 1; n++) {
                var f = (1 / segments) * n;
                var A = Math.sin((1 - f) * d) / Math.sin(d);
                var B = Math.sin(f * d) / Math.sin(d);

                var x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
                var y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
                var z = A * Math.sin(lat1) + B * Math.sin(lat2);

                var lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
                var lon = Math.atan2(y, x);
                try {
                    var temp = L.latLng(lat / (Math.PI / 180), lon / (Math.PI / 180));
                    curveAry.push(temp);
                } catch (e) {}
            }
            return curveAry;
        };
        /**
         * 给起始点和目的点的鼠标画线
         * @type {Function}
         * @param e
         * @private
         */
        function onMoveLine(e) {
            if (modValue.elevationObjs[modValue.lC].rangPoints.length > 0) {
                var _startPoint = modValue.elevationObjs[modValue.lC].rangPoints[modValue.elevationObjs[modValue.lC].rangPoints.length - 1];
                var _endPoint = e.latlng;
                drawLine(_startPoint, _endPoint);
            }
        };
        /**
         * 更新画线
         * @type {Function}
         * @param start {Object} 开始点
         * @param end {Object} 结束点
         * @private
         */
        function drawLine(start, end) {
            var numP = parseInt(start.distanceTo(end) / 600) > 2 ? parseInt(start.distanceTo(end) / 600) : 2;
            var newPos = getCurvePoints([start, end], numP);
            var pointArry = [];
            for(var i=0;i<newPos.length;i++){
            	pointArry.push([newPos[i].lng,newPos[i].lat]);
            }
            map3DViewer.polyline({
                action: 'update',
                geojson: {
                    "geometry": {
                        "coordinates": pointArry
                    }
                },
                guid: modValue.lineGuide
            });
        };
        /**
         * 双击事件，结束当前线条画线测距
         * @type {Function}
         * @param e
         * @private
         */
        function onFinishClick(e) {
            map3DViewer.polyline({
                action: 'update',
                geojson: {
                    "geometry": {
                        "coordinates": [[0,0],[0,0]]
                    }
                },
                guid: modValue.lineGuide
            })
            map2DViewer.map.off('mousemove', onMoveLine);
            var _lastPoint = modValue.elevationObjs[modValue.lC].rangPoints[modValue.elevationObjs[modValue.lC].rangPoints.length - 1];
            var lineDistance = modValue.elevationObjs[modValue.lC].lineDistance;
            modValue.elevationObjs[modValue.lC].lineDistance = lineDistance;
            var lineDistanceStr = lineDistance > 1000 ? (lineDistance / 1000).toFixed(2) + '公里' : Math.ceil(lineDistance) + '米';
            var lid = modValue.lC;
            var oLabelObj = '<a href="javascript:ONEMAP.M.toolElevation.run(\''+e+'\',\''+ lid+'\')">剖面量算</a>';
            modValue.elevationObjs[modValue.lC]._lastMarker.bindPopup(oLabelObj,{
                    closeButton:false,
                    maxWidth:60,
                    minWidth:40});
            modValue.elevationObjs[modValue.lC]._lastMarker.on('mouseover',function(){
                this.openPopup();
                setTimeout(function(){modValue.elevationObjs[modValue.lC]._lastMarker.closePopup()},2000)
            });
            var curLiHtml = $('<li class="listItem cur"><a href="javascript:ONEMAP.M.toolElevation.run(\''+e+'\',\''+ lid+'\')">量算'+modValue.lC+'</a></li>')
            curLiHtml.bind('click',function(){
                modValue.elevationObjs[lid]._lastMarker.openPopup();
                setTimeout(function(){modValue.elevationObjs[lid]._lastMarker.closePopup()},2000);
                var latlng = modValue.elevationObjs[lid]._lastMarker.getLatLng();
                map2DViewer.setView({
                    center:{
                        lat:latlng.lat,
                        lng:latlng.lng
                    },
                    zoom:map23DData.view.zoom
                });
                $(this).siblings().removeClass('cur');
                $(this).addClass('cur');
            });
            $("#elevationContent .elevationList").append(curLiHtml);
            curLiHtml.siblings().removeClass('cur');
            run(null, modValue.lC);
        };
        /**
         * 进行剖面量算
         * @param  {[type]} event [description]
         * @param  {[type]} iC    [description]
         * @return {[type]}       [description]
         */
        function run(event,iC){
        	modValue.curElevIC = iC;
            $("#elevationContent .elevationList .listItem").eq(iC-1).addClass('cur');
            $("#elevationContent .elevationList .listItem").eq(iC-1).siblings().removeClass('cur');
        	var coordinates = [];
        	for(var i = 0, l = modValue.elevationObjs[iC].linePoints.length; i<l; i++){
                var pointsLatLngs = modValue.elevationObjs[iC].linePoints[i]; 
                for(var ii = 0, ll = pointsLatLngs.length; ii<ll;ii++){
                    coordinates.push(pointsLatLngs[ii]['lng']);
                    coordinates.push(pointsLatLngs[ii]['lat']);
                }
            }  

            if(coordinates.length<2){
                ONEMAP.C.publisher.publish({ type: 'success', message: '量算点数过少，无法进行剖面量算!'});
                return false;
            }
            var ajaxUrl = onemapUrlConfig.elevationDataUrl+'/v1.0/geoprocessing/profile_elevation';
            var ajaxData = {
                points:'['+coordinates.join(',')+']',
                count:8,
                zoom:map23DData.view.zoom,
                delta_zoom:0
            };
            $.ajax({
                type:"post",
                dataType:'json',
                data:ajaxData,
                url:ajaxUrl,
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

                            if(ONEMAP.M.toolElevation.elevationControl){
                                map2DViewer.map.removeControl(ONEMAP.M.toolElevation.elevationControl);
                                ONEMAP.M.toolElevation.elevationControl = null;
                            }

                            ONEMAP.M.toolElevation['elevationControl'] = L.control.elevation();
                            ONEMAP.M.toolElevation['elevationControl'].addTo(map2DViewer.map);                        
                            var gjl = L.geoJson(geojson,{
                                onEachFeature: ONEMAP.M.toolElevation.elevationControl.addData.bind(ONEMAP.M.toolElevation.elevationControl)
                            });
                            $(".leaflet-control-elevation").appendTo($("#elevationContent .itemElevation"));
                            $("#elevationContent").show();
                            $(".leaflet-control-elevation").css({
                                'position':'absolute',
                                'left':0,
                                'bottom':0
                            })
                        }else {
                            ONEMAP.C.publisher.publish({ type: 'success', message: '无量算数据显示'});
                        }
                    
                    }else {
                        ONEMAP.C.publisher.publish({ type: 'success', message:data.message});
                    }
                },
                completer:ONEMAP.V.loading.loaded()
            });
        };
        /**
         * 删除对应iC的测距
         * @type {Function}
         * @param event {Event}
         * @param iC {String} IC
         */
        function del(event,iC){
        	var event = event || window.event;
            L.DomEvent.stop(event);
            modValue.elevationGroup.removeLayer(modValue.elevationObjs[iC]);
            delete modValue.elevationObjs[iC];
            if(modValue.curElevIC == iC){
                if(ONEMAP.M.toolElevation.elevationControl){
                    ONEMAP.M.toolElevation.elevationControl.removeFrom(map2DViewer.map);
                    ONEMAP.M.toolElevation.elevationControl = null;
                }
            }  
        };
        function subscribe() {
            ONEMAP.C.publisher.subscribe(remove, 'tools:active');
            ONEMAP.C.publisher.subscribe(clearAllMap, 'cleanMap');
            ONEMAP.C.publisher.subscribe(remove, 'change23D');
            ONEMAP.C.publisher.subscribe(layoutResize, 'layout::sideBar');
        };

        function remove(options) {
            if (options.modName != 'toolElevation') {
                $(".tools-elevation").removeClass('cur');
                removeEvent();
            } else {
                if ($(".tools-elevation").hasClass('cur')) {
                    $(".tools-elevation").removeClass('cur');
                    removeEvent();
                } else {
                    $(".tools-elevation").addClass('cur');
                }
            }
        };
        /**
         * 移除剖面量算事件
         */
        function removeEvent(){
        	if (L.Browser.ie || L.Browser.firefox) {
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-none.cur),auto';
            } else {
                map2DViewer.map.getContainer().style.cursor = 'url(/scripts/vendor/map23dlib/images/cur-none.cur) 5 5,auto';
            }
        	if(modValue.isNewelevation === false){
                onFinishClick({latlng:modValue.elevationObjs[modValue.lC].rangPoints[modValue.elevationObjs[modValue.lC].rangPoints.length-1]});
            }
            modValue.isNewelevation = true;

            map2DViewer.map.off('click',onClickPoint);
            map2DViewer.map.off('mousemove',onMoveLine);
        };
        /**
         * 创建一个marker 并返回该marker
         * @type {Function}
         * @param obj {Object} marker对象
         * @returns {L.Marker}
         * @private
         */
        function buildMarker(obj){
        	var markerId = map23DControl.marker({
        	    action: 'add',
        	    geojson: { 
        	        "properties": {
        	            iconUrl: map23DConfig.map23DAssetsUrl+'/images/layout/ico_linePoint.png',
        	            iconSize: [15,15],
        	            iconAnchor: [7,7],
        	            popupAnchor: [0, -7]
        	        },
        	        "geometry": {
        	            "coordinates": [obj.latlng.lng, obj.latlng.lat]
        	        }
        	    }
        	})
        	map2DViewer.markers[markerId].on('click',function(e){
        		if(modValue.elevationObjs[modValue.lC].rangPoints.length<2){
                    return false;
                }
                //与上一个点相同，测量完成
                if(e.latlng.lat == modValue.elevationObjs[modValue.lC].rangPoints[modValue.elevationObjs[modValue.lC].rangPoints.length-1].lat ||
                   e.latlng.lng == modValue.elevationObjs[modValue.lC].rangPoints[modValue.elevationObjs[modValue.lC].rangPoints.length-1].lng ){                
                    modValue.isNewelevation = true;
                    map2DViewer.markers[markerId].off('click');
                    onFinishClick({latlng:modValue.elevationObjs[modValue.lC].rangPoints[modValue.elevationObjs[modValue.lC].rangPoints.length-1],
                    			   curMarker:this});
                    return false;
                }
        	});
        	return map2DViewer.markers[markerId];
        };
        function clearAllMap() {
        	map2DViewer.groups[modValue.elevationGroup].clearLayers();
        	modValue.elevationObjs = {};
            modValue.lC = 0;
            $("#elevationContent").hide();
            $("#elevationContent .elevationList").empty();
            $("#elevationContent .itemElevation").empty();
        	if(ONEMAP.M.toolElevation.elevationControl){
                map2DViewer.map.removeControl(ONEMAP.M.toolElevation.elevationControl);
                ONEMAP.M.toolElevation.elevationControl = null;
            }
            if ($(".tools-elevation").hasClass('cur')) {
                $(".tools-elevation").removeClass('cur');
                removeEvent();
            }
        };
        return ONEMAP.M.toolElevation = {
            init: init,
            run:run
        }
    })
