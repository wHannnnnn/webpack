/**
 * @fileoverview 路径规划 模块
 * @author Song.Huang
 * @version 1.0.0
 */
define([
        'html!templates/tools/toolRouteSearch',
        'modDir/service/addressSearch',
        'modDir/service/poiSearch',
        'modDir/service/regionSearch',
        'modDir/service/routeSearch',
        'css!styles/tools/toolRouteSearch'
], function(pcLayout,addressSearchF,poiSearchF,regionSearchF,routeSearchF){
    /**
     * 路径规划 模块
     * @exports ONEMAP.M.directions
     * @type {Object}
     */
    ONEMAP.M.directions = {
        /**
         * 默认配置信息
         * @type {Object}
         * @default
         * {
         *     searchType:'car', //查询方式
         *     currentBusLine:null, //当前的公交路线
         *     showCurrentBusLine:false
         * }
         */
        options:{
            searchType:'car', //查询方式
            currentBusLine:null, //当前的公交路线
            showCurrentBusLine:false
        },

        

        /**
         * Loading窗口Html
         * @type {String}
         * @private
         */
        _directionsHtml:
        '<div id="directionsSearch">' +

            '<div class="topBar">' +
                '<div class="thtitle">路径规划</div>'+
                '<div class="search_type">' +
                    '<button class="btn active btn3" type="button">机动路线</button>' +
                '</div>' +
                '<a href="javascript:void(0)" id="abtnPrintLine">打印</a>'+
                '<a href="javascript:void(0)" id="abtnElevation">剖面量算</a>'+
                '<div class="favRoute" id="d_fav">' +
                    '<a href="javascript:void(0)">收藏</a>' +
                '</div>' +
            '</div>' +
            '<div class="routingTopPanel">' +

                '<div class="waypoints">' +

                    '<div class="waypointWrapper start" style="z-index:60" id="d_start">' +
                        '<div class="waypoint">' +
                            '<div class="searchBox">' +
                                '<input type="text" id="directionsStart" class="input" title="输入起点或地图上右键选点"  placeholder="输入起点或地图上右键选点">' +
                            '</div>' +
                            '<div class="startIcon"></div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="waypointWrapper destination" style="z-index:50" id="d_destination">' +
                        '<div class="waypoint">' +
                            '<div class="searchBox">' +
                                '<input type="text" id="directionsStop" class="input" title="输入终点或地图上右键选点" placeholder="输入终点或地图上右键选点">' +
                            '</div>' +
                            '<div class="stopIcon"></div>' +
                        '</div>' +
                    '</div>' +

                    '<p style="color:#fff;padding:0 0 0 32px;">地图右键菜单可添加途经点、规避点</p>'+
                '</div>' +
                '<div class="routingPanelBar">' +
                    '<div class="btn-group" >' +
                        '<button id="directionsSearchButton" type="button" class="btn btn4">获取路线</button>' +
                    '</div>' +
                    '<div class="clearRoute" id="d_clear">' +
                        '<a href="javascript:void(0)">清除路线</a>' +
                    '</div>' +
                    
                '</div>' +
            '</div>'+

            '<div id="pointSearchResult">'+
            '<div id="pointSearchResultWrap"></div>'+
            '</div>'+


            '<div class="slot-busWays">' +
                '<ul id="slot-busWaysList"></ul>' +
            '</div>'+


            '<div class="slot-directionsContent">' +
                '<div id="roadViewListWrap">' +
                    '<ul id="roadViewList" class="routeView"></ul>' +
                '</div>' +
            '</div>' +


        '</div>',

        /**
         * 查询结果数据
         * @type {Object}
         * @default {}
         * @private
         */
        _directionsDataResult:{},

        /**
         * 用来装标记/路线的容器
         * @type {Object}
         * @private
         */
        _brushGroup: map23DControl.group({
                            action: 'add'
                        }),
        /**
         * 标记容器
         * @type {Object}
         * @private
         */
        _markerGroup: map23DControl.group({
                            action: 'add'
                        }),
        
        /**
         * 起点坐标
         * @type {Object}
         * @private
         * @default
         * {
         *     latlng:null,
         *     name:null
         * }
         */
        _startPoint:{
            latlng:null,
            name:''
        },

        /**
         * 中间点集合（途经点/规避点）
         * @type {Array}
         */
        _amongMarkers:{},

        /**
         * 途经点坐标组
         * @type {Array}
         */
        _acrossPoints:{},

        /**
         * 规避点坐标组
         * @type {Array}
         */
        _avoidPoints:{},

        /**
         * 终点坐标
         * @type {Object}
         * @private
         * @default
         * {
         *     latlng:null,
         *     name:null
         * }
         */
        _stopPoint:{
            latlng:null,
            name:''
        },
 
        /**
         * 路标 包含起点/终点/经过点
         * @type {Object}
         * @default {}
         * @private
         */
        _roadMarker:{},

        //鼠标滑过路线计时器
        //_roadListViewTimeOut:null,

        /**
         * 地图层
         * @type {Object}
         * @link ONEMAP.M.mapHolder.map
         * @private
         */
        _map:ONEMAP.M.mapHolder.outPutValue.map,

        /**
         * 是否已经初始化
         * @type {Boolean}
         * @default false
         * @private
         */
        _initialized:false,

        /**
         * 初始化
         * @type {Function}
         * @returns {*}
         */
        init:function(){
            var _this = ONEMAP.M.directions;
            //未初始化，初始化布局
            if(!_this._initialized){

                //ONEMAP.D.user.setCurrentMod({remove:true,mod:"directions"});
                //设置容器布局
                _this._setSideBarContainer();

                _this._brushGroup = map23DControl.group({
                            action: 'add'
                        });
                
                _this._markerGroup = map23DControl.group({
                                    action: 'add'
                                });

                // ONEMAP.C.publisher.publish({
                //         mod:'placeSearch',
                //         cmod:'placeSearch',
                //         text:'地名'},
                //     'globalSearchTypeChange'
                // );
                ONEMAP.C.publisher.publish({
                        mod:'directions',
                        action:'change'},
                    'modNavChange'
                );
                //订阅推送
                _this.subscribe();
                _this._brushGroup = map2DViewer.groups[_this._brushGroup]
                _this._markerGroup = map2DViewer.groups[_this._markerGroup]
            }
            _this._initialized = true;

            return _this;
        },

        /**
         * 设置侧栏容器 初始化
         * @type {Function}
         * @returns {*}
         * @private
         */
        _setSideBarContainer:function(){
            var _this = ONEMAP.M.directions;

            $("#lujingcontent .cove-con").append(_this._directionsHtml);

            $('#directionsStart').val(_this._startPoint.name.length>0?_this._startPoint.name:'输入起点或地图上右键选点');

            $('#directionsStop').val(_this._stopPoint.name.length>0?_this._stopPoint.name:'输入终点或地图上右键选点');

            //滚动条初始
            $('#roadViewListWrap').mCustomScrollbar({
                scrollInertia:0
            });

            $("#pointSearchResult").mCustomScrollbar({
                scrollInertia:0
            });

            //清除路径
            $('#d_clear a').bind('click',function(){
                _this._cleanDirections();
            });

            //收藏
            $('#d_fav a').bind('click',function(){
                require(['mod/userLine'],function(userLine){

                    var acrossPointsAry = [];
                    for(var across in _this._acrossPoints){
                        if(_this._acrossPoints.hasOwnProperty(across)){
                            acrossPointsAry.push([_this._acrossPoints[across].latlng.lat,_this._acrossPoints[across].latlng.lng]);
                        }
                    }
                    var avoidPointsAry = [];
                    for(var avoid in _this._avoidPoints){
                        if(_this._avoidPoints.hasOwnProperty(avoid)){
                            avoidPointsAry.push([_this._avoidPoints[avoid].latlng.lat,_this._avoidPoints[avoid].latlng.lng]);
                        }
                    }

                    userLine.addLine({
                        name: $('#directionsStart').val() + ' 至 '+$('#directionsStop').val(),
                        startpoint_lat : _this._startPoint.latlng.lat,
                        startpoint_lon : _this._startPoint.latlng.lng,
                        stoppoint_lat : _this._stopPoint.latlng.lat,
                        stoppoint_lon : _this._stopPoint.latlng.lng,
                        acrossPoints : JSON.stringify(acrossPointsAry),
                        avoidPoints : JSON.stringify(avoidPointsAry)
                    })
                });
            });
            
            $('#directionsStart').bind('focus',function(){
                if($(this).val() == '输入起点或地图上右键选点'){
                    $(this).val('');
                };
            });

            $('#directionsStop').bind('focus',function(){
                if($(this).val() == '输入终点或地图上右键选点'){
                    $(this).val('');
                };
            });

            
            $('#directionsStart').bind('focusout',function(){
                if($(this).val() == ''){
                    $(this).val('输入起点或地图上右键选点');
                };
            });

            $('#directionsStop').bind('focusout',function(){
                if($(this).val() == ''){
                    $(this).val('输入终点或地图上右键选点');
                };
            });
            

            //查询路线 如果有起始点，直接查询，没有，先去查询起始点的位置
            $("#directionsSearchButton").bind("click",function(){
                if(_this._startPoint.latlng && _this._stopPoint.latlng && _this._startPoint.name == $('#directionsStart').val() && _this._stopPoint.name == $('#directionsStop').val()){
                    _this.getSearchResult();
                }else if($.trim($('#directionsStart').val()) != '' && $('#directionsStart').val() != '输入起点或地图上右键选点' && $.trim($('#directionsStop').val()) != '' && $('#directionsStop').val() != '输入终点或地图上右键选点') {
                    if((/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s\"]/g).test($("#directionsStart").val())){
                        _this._setNotResultHtml('起点只能包含英文、数字、中文');
                        return false;
                    } 
                    if($.trim($("#directionsStart").val()).length < 2){
                        _this._setNotResultHtml('起点不允许输入单字符');
                        return false;
                    }      
                    
                    if((/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s\"]/g).test($("#directionsStop").val())){
                        _this._setNotResultHtml('终点只能包含英文、数字、中文');
                        return false;
                    }
                    if($.trim($("#directionsStop").val()).length < 2){
                        _this._setNotResultHtml('终点不允许输入单字符');
                        return false;
                    }                           
                    _this._getStartAndStop();
                }else if($.trim($('#directionsStart').val()) == '' || $('#directionsStart').val() == '输入起点或地图上右键选点'){
                    _this._setNotResultHtml('起点不能为空，请检查对应查询条件。');
                    return false;
                }else if($.trim($('#directionsStop').val()) == '' || $('#directionsStop').val() == '输入终点或地图上右键选点'){
                    _this._setNotResultHtml('终点不能为空，请检查对应查询条件。');
                    return false;
                }  
                
            });    
           

            //打印事件
            $('#abtnPrintLine').bind('click',function(){
                var acrossPointsAry = [];
                for(var across in _this._acrossPoints){
                    if(_this._acrossPoints.hasOwnProperty(across)){
                        acrossPointsAry.push([_this._acrossPoints[across].latlng.lat,_this._acrossPoints[across].latlng.lng]);
                    }
                }
                var avoidPointsAry = [];
                for(var avoid in _this._avoidPoints){
                    if(_this._avoidPoints.hasOwnProperty(avoid)){
                        avoidPointsAry.push([_this._avoidPoints[avoid].latlng.lat,_this._avoidPoints[avoid].latlng.lng]);
                    }
                }

                if(ONEMAP.M.mapHolder.singleLayers.getCurrentOverLayerTileUrl()){
                    var can = '?m=directions' +
                        '&dir='+_this._startPoint.latlng.lat+'|'+_this._startPoint.latlng.lng+'|'+_this._stopPoint.latlng.lat+'|'+_this._stopPoint.latlng.lng+'|' + _this._map.getMaxZoom()+
                        '&across='+ JSON.stringify(acrossPointsAry)+
                        '&avoid='+ JSON.stringify(avoidPointsAry)+
                        '&map='+ONEMAP.M.mapHolder.mainLayers.getCurLayer().mId+'|'+_this._map.getZoom()+'|'+_this._map.getCenter().lat+'|'+_this._map.getCenter().lng+
                        '&thematic='+ONEMAP.C.encryption.enCode(ONEMAP.M.mapHolder.singleLayers.getCurrentOverLayerTileUrl())+
                        '&place='+_this._startPoint.name+'|'+_this._stopPoint.name;
                }else {
                    var can = '?m=directions' +
                        '&dir='+_this._startPoint.latlng.lat+'|'+_this._startPoint.latlng.lng+'|'+_this._stopPoint.latlng.lat+'|'+_this._stopPoint.latlng.lng+'|' + _this._map.getMaxZoom()+
                        '&across='+ JSON.stringify(acrossPointsAry)+
                        '&avoid='+ JSON.stringify(avoidPointsAry)+
                        '&map='+ONEMAP.M.mapHolder.mainLayers.getCurLayer().mId+'|'+_this._map.getZoom()+'|'+_this._map.getCenter().lat+'|'+_this._map.getCenter().lng+
                        '&place='+_this._startPoint.name+'|'+_this._stopPoint.name;
                }


                /*$(this).attr('href','/print.html'+can);
                 $(this).click();*/

                window.open('/print.html'+can);

            });


            //剖面量算事件 ,'d3/d3.v3.min'
            $('#abtnElevation').bind('click',function(){


                var coordinates = ''+_this._startPoint.latlng.lng+','+_this._startPoint.latlng.lat+',';
                var points = _this._directionsDataResult.coors;
                //转换为可用坐标
                var pArray = points.split(',');
                var pointLatLng = [];
                var dDouble = true;
                var temp = [];
                for(var i= 0,l=pArray.length;i<l;i++){
                    if(dDouble){
                        temp = [];
                        temp.push(pArray[i]);
                        dDouble = false;
                    }else{
                        temp.unshift(pArray[i]);
                        dDouble = true;
                        temp = L.latLng(temp);
                        pointLatLng.push(temp);
                    }
                }    

                for(var ii = 0, ll = pointLatLng.length; ii<ll;ii++){
                    if(ii%2 == 0){
                        coordinates += pointLatLng[ii]['lng']+','+pointLatLng[ii]['lat']+',';
                    }
                }

                coordinates += _this._stopPoint.latlng.lng+','+_this._stopPoint.latlng.lat;

                var url = MapplusUrlConfig.elevationDataUrl+'/terrain/profile';
                var ajaxData = {
                    points:'['+coordinates+']',
                    count:8,
                    zoom:_this._map.getZoom(),
                    delta_zoom:0
                };
                $.ajax({
                    type:"post",
                    dataType:'json',
                    url:url,
                    data:ajaxData,
                    beforeSend:ONEMAP.V.loading.load(),
                    success:function(data){
                        data = data.data;
                        if(data.length>0){

                            require(['d3/d3.v3.min'], function () {
                    
                                var coordinatesAll = [];
                                var coordinatesTemp = [];
                                var gap = 1;
                                for(var i = 0, l = data.length; i<l; i++){
                                    coordinatesTemp = [data[i+2],data[i+3],data[i+1]];
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
                                    var gjl = L.geoJson(geojson,{
                                        onEachFeature: ONEMAP.M.mapHolder._elevationControl.addData.bind(ONEMAP.M.mapHolder._elevationControl)
                                    });
                                }else {
                                    require(['ocean/Control.Elevation','d3/d3.v3.min'], function () {
                                        ONEMAP.M.mapHolder._elevationControl = L.control.elevation();
                                        ONEMAP.M.mapHolder._elevationControl.addTo(_this._map);
                                        var gjl = L.geoJson(geojson,{
                                            onEachFeature: ONEMAP.M.mapHolder._elevationControl.addData.bind(ONEMAP.M.mapHolder._elevationControl)
                                        });
                                    });                                    
                                }

                            });


                            
                        }else {
                            ONEMAP.C.publisher.publish({type:'error',message:'无法进行计算'},'noteBar::add');
                            
                        }
                        

                    },
                    completer:ONEMAP.V.loading.loaded()
                });

            });

            _this.layoutResize();

            return _this;
        },



        /**
         * 清除路径
         * @type {Function}
         * @private
         */
        _cleanDirections:function(){
            var _this = ONEMAP.M.directions;
            _this._brushGroup.clearLayers();
            $("#roadViewList").empty();
            $("#slot-busWaysList").empty();

            $('#directionsStart').val('输入起点或地图上右键选点');
            _this._startPoint = {latlng:null,name:''};

            $('#directionsStop').val('输入终点或地图上右键选点');
            _this._stopPoint =  {latlng:null,name:''};
            //$("#cuntLineMeter").empty();
            
            _this._amongMarkers = {};
            _this._acrossPoints = {};
            _this._avoidPoints = {};

            $('#abtnPrintLine, #d_fav, #abtnElevation').hide();
            $(".topBar .thtitle").show();
            _this._cleanMarkerGroup();
            $('#pointSearchResult').hide();
            $('#pointSearchResultWrap').empty();

            if(ONEMAP.M.mapHolder._elevationControl){
                ONEMAP.M.mapHolder._elevationControl.removeFrom(_this._map);
                ONEMAP.M.mapHolder._elevationControl = null;
            }
            $("#roadViewListWrap").mCustomScrollbar("update");
            $("#pointSearchResult").mCustomScrollbar("update");
        },

        /**
         * 界面布局重置
         * @type {Function}
         */
        layoutResize:function(){
            var _this = ONEMAP.M.directions;
            if(_this.options.searchType === 'bus'){
                var slotHeight = 467 - $('#directionsSearch .topBar').height()-$('#directionsSearch .routingTopPanel').height()- $(".slot-busWays").height();
            }else {
                var slotHeight = 467 - $('#directionsSearch .topBar').height()-$('#directionsSearch .routingTopPanel').height();
            }

            $('.slot-directionsContent, #pointSearchResult').css({height:slotHeight});
            $("#roadViewListWrap").mCustomScrollbar("update");
            $("#pointSearchResult").mCustomScrollbar("update");
        },

        /**
         * 显示收藏夹收藏的路线
         * @param  {[type]} lineData [description]
         * @return {[type]}          [description]
         */
        showFavLine:function(lineData){
            var _this = ONEMAP.M.directions;
            _this.setStartPoint({lat:parseFloat(lineData.startpoint_lat),lng:parseFloat(lineData.startpoint_lon)});
            var acrossPointAry = JSON.parse(lineData.type_l1);
            if(acrossPointAry !== null){
                for(var i = 0,l=acrossPointAry.length;i<l;i++){
                    _this.setAcrossPoint(new L.LatLng(acrossPointAry[i][0],acrossPointAry[i][1]));
                }
            }       
            var avoidPointAry = JSON.parse(lineData.type_l2);
            if(avoidPointAry !== null){
                for(var ii = 0,ll=avoidPointAry.length;ii<ll;ii++){
                    _this.setAvoidPoint(new L.LatLng(avoidPointAry[ii][0],avoidPointAry[ii][1]));
                }
            }     

            _this.setStopPoint({lat:parseFloat(lineData.stoppoint_lat),lng:parseFloat(lineData.stoppoint_lon)});
        },

        

        /**
         * 设置搜索方式 car/bus
         * @type {Function}
         * @param type {String}
         */
        setSearchType:function(type){
            var _this = ONEMAP.M.directions;
            _this.options.searchType = type;
            if(type === 'car'){
                $('#slot-busWaysList').empty().hide();
            }else if(type === 'bus'){
                $('#slot-busWaysList').empty().show();
            }
        },

        /**
         * 设置起点坐标
         * @type {Function}
         * @param latLng  {Object}
         */
        setStartPoint:function(latLng,name){
            var _this = ONEMAP.M.directions;
            if(!_this._initialized){
                _this.init();
            }
            //清除路径
            //_this._cleanDirections();
            _this._startPoint.latlng = latLng;
            var nLatlng = L.Util.formatHMS(latLng);
            _this._setMarkers({type:'start',latLng:latLng});
            if(name){
                $("#directionsStart").val(name);
                _this._startPoint.name = name;
                _this._roadMarker.start.bindPopup(name+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                _this.getSearchResult();
            }else {
                _this._getInfoByZoomLatLng(latLng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }
                    $("#directionsStart").val(data.address);
                    _this._startPoint.name = data.address;
                    _this._roadMarker.start.bindPopup(data.address+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                    _this.getSearchResult();
                });
            }
        },

        /**
         * 添加途经点坐标
         * @type {Function}
         * @param latLng  {Object}
         */
        setAcrossPoint:function(latLng,name){
            var _this = ONEMAP.M.directions;
            if(!_this._initialized){
                _this.init();
            }

            if(ONEMAP.T.getObjNameAry(_this._acrossPoints).length == 5){
                alert('最多可添加 5 个途经点');
                return false;
            }

            var acrossPoint = {
                    name:'未知地点',
                    latlng:latLng
                }
            var acrossMarker = _this._setMarkers({type:'across',latLng:latLng});
            var pointId = L.stamp(acrossMarker);
            _this._amongMarkers[pointId] = acrossMarker;
            _this._acrossPoints[pointId] = acrossPoint;

            _this._amongMarkers[pointId].on('dragend',function(){
                _this._acrossPoints[pointId].latlng = this._latlng;
                //去更新popup
                _this._getInfoByZoomLatLng(_this._acrossPoints[pointId].latlng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }   
                    _this._acrossPoints[pointId].name=data.address;
                    var nLatlng = L.Util.formatHMS(_this._acrossPoints[pointId].latlng);
                    
                    _this._amongMarkers[pointId].bindPopup(data.address+'<a style="float:right" href="javascript:ONEMAP.M.directions.delAcrossPoint('+pointId+');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();                
                });
                _this.getSearchResult();
            });

            if(name){
                _this._acrossPoints[pointId].name=name;
                    var nLatlng = L.Util.formatHMS(latLng);                    
                    _this._amongMarkers[pointId].bindPopup(name+'<a style="float:right" href="javascript:ONEMAP.M.directions.delAcrossPoint('+pointId+');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                    _this.getSearchResult();
            }else {
                _this._getInfoByZoomLatLng(latLng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }   
                    _this._acrossPoints[pointId].name=data.address;
                    var nLatlng = L.Util.formatHMS(latLng);
                    
                    _this._amongMarkers[pointId].bindPopup(data.address+'<a style="float:right" href="javascript:ONEMAP.M.directions.delAcrossPoint('+pointId+');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();     
                    _this.getSearchResult();           
                });
            }
        },

        /**
         * 移除途经点
         * @param  {[type]} pointId [description]
         * @return {[type]}         [description]
         */
        delAcrossPoint:function(pointId){
            var _this = ONEMAP.M.directions;
            _this._brushGroup.removeLayer(_this._amongMarkers[pointId]);
            delete _this._amongMarkers[pointId];
            delete _this._acrossPoints[pointId];
            _this.getSearchResult();
        },

        /**
         * 添加规避点坐标
         * @type {Function}
         * @param latLng  {Object}
         */
        setAvoidPoint:function(latLng,name){
            var _this = ONEMAP.M.directions;
            if(!_this._initialized){
                _this.init();
            }

            if(ONEMAP.T.getObjNameAry(_this._avoidPoints).length == 5){
                alert('最多可添加 5 个规避点');
                return false;
            }

            var avoidPoint = {
                    name:'未知地点',
                    latlng:latLng
                };
            var avoidMarker = _this._setMarkers({type:'avoid',latLng:latLng});
            var pointId = L.stamp(avoidMarker);
            _this._amongMarkers[pointId] = avoidMarker;
            _this._avoidPoints[pointId] = avoidPoint;


            _this._amongMarkers[pointId].on('dragend',function(){
                _this._avoidPoints[pointId].latlng = this._latlng;
                //去更新popup
                _this._getInfoByZoomLatLng(_this._avoidPoints[pointId].latlng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }   
                    _this._avoidPoints[pointId].name=data.address;
                    var nLatlng = L.Util.formatHMS(_this._avoidPoints[pointId].latlng);
                    
                    _this._amongMarkers[pointId].bindPopup(data.address+'<a style="float:right" href="javascript:ONEMAP.M.directions.delAvoidPoint('+pointId+');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();                
                });
                _this.getSearchResult();
            });

            if(name){
                _this._avoidPoints[pointId].name=name;                
                var nLatlng = L.Util.formatHMS(latLng);                
                _this._amongMarkers[pointId].bindPopup(name+'<a style="float:right" href="javascript:ONEMAP.M.directions.delAvoidPoint('+pointId+');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                    {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                _this.getSearchResult();
            }else {
                _this._getInfoByZoomLatLng(latLng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }
                    _this._avoidPoints[pointId].name=data.address;                
                    var nLatlng = L.Util.formatHMS(latLng);                
                    _this._amongMarkers[pointId].bindPopup(data.address+'<a style="float:right" href="javascript:ONEMAP.M.directions.delAvoidPoint('+pointId+');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                    _this.getSearchResult();
                });
            }
        },

        /**
         * 移除规避点
         * @param  {[type]} pointId [description]
         * @return {[type]}         [description]
         */
        delAvoidPoint:function(pointId){
            var _this = ONEMAP.M.directions;
            _this._brushGroup.removeLayer(_this._amongMarkers[pointId]);
            delete _this._amongMarkers[pointId];
            delete _this._avoidPoints[pointId];
            _this.getSearchResult();
        },

        /**
         * 设置终点坐标
         * @type {Function}
         * @param latLng {Object}
         */
        setStopPoint:function(latLng,name){
            var _this = ONEMAP.M.directions;
            if(!_this._initialized){
                _this.init();
            }
            _this._stopPoint.latlng = latLng;
            var nLatlng = L.Util.formatHMS(latLng);
            _this._setMarkers({type:'stop',latLng:latLng});
            if(name){
                $("#directionsStop").val(name);
                _this._stopPoint.name = name;
                _this._roadMarker.stop.bindPopup(name+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                    {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                _this.getSearchResult();
            }else {
                _this._getInfoByZoomLatLng(latLng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }
                    $("#directionsStop").val(data.address);
                    _this._stopPoint.name = data.address;
                    _this._roadMarker.stop.bindPopup(data.address+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                    _this.getSearchResult();
                });
            }
        },
        /**
         * 获取当前起点坐标
         * @type {Function}
         * @returns {*}
         */
        getStartPoint:function(){
            var _this = ONEMAP.M.directions;
            return _this._startPoint;
        },

        /**
         * 获取规避点
         * @return {[Array]} [规避点数组]
         */
        getAvoidPoints:function(){
            var _this = ONEMAP.M.directions;
            return _this._avoidPoints;
        },

        /**
         * 获取途经点
         * @return {[Array]} [途经点数组]
         */
        getAcrossPoints:function(){
            var _this = ONEMAP.M.directions;
            return _this._acrossPoints;
        },

        /**
         * 获取当前终点坐标
         * @type {Function}
         * @returns {*}
         */
        getStopPoint:function(){
            var _this = ONEMAP.M.directions;
            return _this._stopPoint;
        },
        /**
         * 获取最终查询结果
         * @type {Function}
         */
        getSearchResult:function(){
            var _this = ONEMAP.M.directions;
            //如果设置了起点/终点 便开始查询路径
            if(_this._startPoint.latlng && _this._stopPoint.latlng && _this._startPoint.name == $("#directionsStart").val() && _this._stopPoint.name == $("#directionsStop").val()){
                
                _this._cleanPointSearch();

                if(ONEMAP.M.mapHolder._elevationControl){
                    ONEMAP.M.mapHolder._elevationControl.removeFrom(_this._map);
                    ONEMAP.M.mapHolder._elevationControl = null;
                }

                _this._brushGroup.clearLayers();
                _this._roadMarker.start.addTo(_this._brushGroup);
                _this._roadMarker.stop.addTo(_this._brushGroup);
                for(var item in _this._amongMarkers){
                    _this._amongMarkers[item].addTo(_this._brushGroup);
                }

                _this._setNotResultHtml('正在计算路径信息...');

                if(_this.options.searchType === 'bus'){ //公交查询
                    if(ONEMAP.M.currentArea.currentCityInfo){
                        var busSearch = new L.busSearch();
                        ONEMAP.V.loading.load();
                        busSearch.byTwoPoi({
                            start:_this._startPoint.latlng,
                            stop:_this._stopPoint.latlng
                        },encodeURI(ONEMAP.M.currentArea.currentCityInfo.name.text),function(data){

                            ONEMAP.V.loading.loaded();
                            _this._directionsDataResult = data;
                            _this._drawBusPolyline({opacity:0.8,lineNum:0,color:'#cc00ff',weight:6}) ;
                            _this._parseResultData();
                            _this.options.currentBusLine = 0;
                        });
                    }else {
                        alert("当前城市暂时不支持公交线路查询！");
                        return false;
                    }

                }else if(_this.options.searchType === 'car'){ //行车查询
                    var routeSearch = new routeSearchF();
                    ONEMAP.V.loading.load();
                    var via = [];
                    var avoid = [];
                    via.push([_this._startPoint.latlng.lng,_this._startPoint.latlng.lat]);
                    for(var viaItem in _this._acrossPoints){
                        if(_this._acrossPoints.hasOwnProperty(viaItem)){
                            via.push([_this._acrossPoints[viaItem].latlng.lng,_this._acrossPoints[viaItem].latlng.lat]);
                        }
                    }
                    via.push([_this._stopPoint.latlng.lng,_this._stopPoint.latlng.lat]);
                    for(var avoidItem in _this._avoidPoints){
                        if(_this._avoidPoints.hasOwnProperty(avoidItem)){
                            avoid.push([_this._avoidPoints[avoidItem].latlng.lng,_this._avoidPoints[avoidItem].latlng.lat]);
                        }
                    }
                    routeSearch.getNaviPath({viaAry:via,avoidAry:avoid},function(data){
                        ONEMAP.V.loading.loaded();  
                        data = data.data;
                        if(!data.hasOwnProperty('segmengList')){
                            _this._setNotResultHtml('此线路无路径数据，无法规划路径！');
                            return false;
                        }
                        _this._directionsDataResult = data;
                        _this._drawCarPolyline({opacity:0.8,lineNum:0,color:'#0099ff',weight:6});
                        _this._parseResultData();
                    });
                    ONEMAP.M.mapHolder.outPutValue.map.fitBounds(_this._brushGroup.getBounds());
                }
            }else if(_this._startPoint.latlng === null) {
                _this._setNotResultHtml('未查询到起点信息，请检查对应查询条件。');
            }else if(_this._stopPoint.latlng === null){
                _this._setNotResultHtml('未查询到终点信息，请检查对应查询条件。');
            }
        },
        /**
         * 无结果列表
         * @type {Function}
         * @param notText {String} 无结果提示信息
         * @returns {*}
         * @private
         */
        _setNotResultHtml:function(notText){
            var _this = ONEMAP.M.directions;
            $('#roadViewList').empty().append('<p class="not-result">'+notText+'</p>');
            return _this;
        },
        /**
         * 通过地图缩放等级和坐标查找 地名
         * @type {Function}
         * @param latLng {Object} 坐标
         * @param callBack_func {Function} 回调
         * @private
         */
        _getInfoByZoomLatLng:function(latLng,callBack_func){
            var zoom = ONEMAP.M.mapHolder.outPutValue.map.getMaxZoom();
            var addressSearch = new addressSearchF();
            ONEMAP.V.loading.load();
            addressSearch.getAddressInfo({zoom:zoom,latLng:[latLng.lat,latLng.lng]},function(data){
                ONEMAP.V.loading.loaded();
                data = data.data;
                callBack_func(data);
            });
        },

        /**
         * 解析数据 填充节点
         * @type {Function}
         * @private
         */
        _parseResultData:function(){
            var _this = ONEMAP.M.directions;
            var lineMeter = 0;
            $("#roadViewList").empty();

            if(_this.options.searchType === 'car'){ //驾车类型
                for(var i= 0,l= _this._directionsDataResult.segmengList.length;i<l;i++){
                    var item = _this._directionsDataResult.segmengList[i];
                    item.coorAry = item.coor.split(',');
                    lineMeter += item.roadLength;
                    var actionType = 'C';

                    if(item.textInfo.indexOf('直行') >= 0){
                        actionType = 'C';
                    }
                    if(item.textInfo.indexOf('左转') >= 0){
                        actionType = 'TL';
                    }
                    if(item.textInfo.indexOf('稍向左转') >= 0){
                        actionType = 'TSLL';
                    }
                    if(item.textInfo.indexOf('向左急转') >= 0){
                        actionType = 'TSHL';
                    }
                    if(item.textInfo.indexOf('右转') >= 0){
                        actionType = 'TR';
                    }
                    if(item.textInfo.indexOf('稍向右转') >= 0){
                        actionType = 'TSLR';
                    }
                    if(item.textInfo.indexOf('向右急转') >= 0){
                        actionType = 'TSHR';
                    }
                    if(item.textInfo.indexOf('保持左行') >= 0){
                        actionType = 'KL';
                    }
                    if(item.textInfo.indexOf('保持右行') >= 0){
                        actionType = 'KR';
                    }
                    if(item.textInfo.indexOf('前方掉头') >= 0){
                        actionType = 'TU';
                    }
                    if(item.textInfo.indexOf('前方右侧掉头') >= 0){
                        actionType = 'TRU';
                    }
                    if(item.textInfo.indexOf('EXIT0') >= 0){
                        actionType = 'EXIT';
                    }

                    var nLatlng = L.Util.formatHMS([item.coorAry[1],item.coorAry[0]]);

                    var li = $('' +
                        '<li class="withoutChildren" title="'+nLatlng.lng+' , '+nLatlng.lat+'"  data-position-lat="'+item.coorAry[1]+'" data-position-lon="'+item.coorAry[0]+'">' +
                            '<span class="maneuverLink">' +
                                '<span class="maneuverWrapper">' +
                                    '<span class="maneuverHolder">' +
                                        '<span class="maneuverType">' +
                                            '<span class="maneuverNumber '+actionType+'">'+(i+1)+'.</span>' +
                                        '</span>' +
                                        '<span class="maneuverProgress">'+item.roadLength+'&nbsp;米</span>' +
                                        '<span class="maneuverDescription">' +
                                            '<span class="maneuverInstruction">' +
                                                //'<span class="next-street">'+item.roadName+'</span>. ' +
                                                '<span class="distance-description">'+item.textInfo+'</span>.' +
                                            '</span>' +
                                        '</span>' +
                                    '</span>' +
                                '</span>' +
                            '</span>' +
                        '</li><hr/>');
                    $("#roadViewList").append(li);
                    var marker = new L.Marker([item.coorAry[1],item.coorAry[0]],{
                        icon: L.icon({
                                iconUrl: '../images/layout/ico_p_3-'+actionType+'.png',
                                iconSize: [16, 16],
                                iconAnchor: [8, 8],
                                popupAnchor: [0, -8]}
                        )})
                        //.addTo(_this._brushGroup)
                        .bindPopup(item.textInfo+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',{
                            closeButton:false,
                            maxWidth:160,
                            minWidth:160
                        });
                    marker.on("mouseover",function(){
                        this.openPopup();
                    });
                    marker.isAdd = false;
                    //L.olabel([item.coorAry[1],item.coorAry[0]],item.roadName).addTo(_this._brushGroup);
                    li.bind("click",{m:marker},function(e){

                        if(!e.data.m.isAdd){
                            e.data.m.addTo(_this._brushGroup);
                            e.data.m.isAdd = true;
                        }

                        $("#roadViewList .cur").removeClass('cur');
                        $(this).addClass('cur');
                        ONEMAP.M.mapHolder.outPutValue.map.setView(e.data.m.getLatLng(),ONEMAP.M.mapHolder.outPutValue.map.getZoom());
                        e.data.m.openPopup();
                    });
                }

                $("#roadViewList").prepend('<li style="text-align:center; font-size:14px;">总行驶里程: '+lineMeter/1000+'公里</li><hr/>');

                $('#abtnPrintLine').show();
                //收藏事件
                $('#d_fav').show();

                if(!$.browser.msie || $.browser.version > 8){
                    //剖面量算
                    $('#abtnElevation').show();
                    $(".topBar .thtitle").hide();
                }                


            }else if(_this.options.searchType === 'bus'){ //公交类型
                $("#slot-busWaysList").empty();
                //先解析出公交换乘的路线 只显示前3条类型
                for(var i = 1 ;i < 4;i++){
                    var busWay =  _this._directionsDataResult.busList[i];
                    var wayName = $('<li></li>');
                    var lineName = [];
                    for(var ii = 0,ll=busWay.segmentList.length;ii<ll;ii++){
                        var line = busWay.segmentList[ii];
                        lineName.push(line.busName.replace(/\((.*?)\)/,''));
                    }
                    wayName.text(i+'. '+lineName.join(' 转 '));
                    wayName.bind('click',{d:i},function(e){
                        $("#slot-busWaysList .cur").removeClass('cur');
                        $(this).addClass('cur');
                        _this._drawBusPolyline({opacity:0.8,lineNum:(e.data.d-1),color:'#cc00ff',weight:6}) ;
                    });

                    $("#slot-busWaysList").append(wayName);

                }

            }


            $("#roadViewListWrap").mCustomScrollbar("update");
            $("#pointSearchResult").mCustomScrollbar("update");


        },

        /**
         * 在地图上画出驾车路线
         * @type {Function}
         * @param options  {Object} 参数 {color,weight,opacity}
         * @private
         */
        _drawBusPolyline:function(options){
            var _this = this;
            $("#roadViewList").empty();
            _this._brushGroup.clearLayers();
            _this._roadMarker.start.addTo(_this._brushGroup);
            _this._roadMarker.stop.addTo(_this._brushGroup);

            if(_this._roadPolyline){
                _this._brushGroup.removeLayer(_this._roadPolyline);
            }
            var lineData = _this._directionsDataResult.busList[options.lineNum];

            //记录起始点坐标，用于连接 班次之间的步行路段  默认为起点
            var endfirst = _this._startPoint.latlng;

            for(var ii = 0, ll=lineData.segmentList.length; ii<ll;ii++){

                var points = lineData.segmentList[ii].coordinateList;
                //转换为可用坐标
                var pArray = points.split(',');
                var pointLatLng = [];
                var dDouble = true;
                var temp = [];
                for(var i= 0,l=pArray.length;i<l;i++){
                    if(dDouble){
                        temp = [];
                        temp.push(pArray[i]);
                        dDouble = false;
                    }else{
                        temp.unshift(pArray[i]);
                        dDouble = true;
                        temp = L.latLng(temp);
                        pointLatLng.push(temp);
                    }
                }

                //先连接起点 虚线
                _this._roadPolyline = L.polyline([endfirst,pointLatLng[0]], {color: '#63e61e',weight:options.weight, opacity:options.opacity}).addTo(_this._brushGroup).bindLabel('步行路段');
                endfirst = pointLatLng[pointLatLng.length-1];

                //再划路线的线
                _this._roadPolyline = L.polyline(pointLatLng, {color: options.color,weight:options.weight, opacity:options.opacity}).addTo(_this._brushGroup).bindLabel(lineData.segmentList[ii].busName.replace(/\((.*?)\)/,''));

                //连接终点
                if(ii === (ll-1)){
                    _this._roadPolyline = L.polyline([endfirst,_this._stopPoint.latlng], {color: '#63e61e',weight:options.weight, opacity:options.opacity}).addTo(_this._brushGroup).bindLabel('步行路段');
                }

                //打点
                var marker = new L.Marker(pointLatLng[0],{
                    icon: L.icon({iconUrl: '../images/layout/ico_p_3.png', iconAnchor: [12, 24],iconSize: [25, 25], popupAnchor: [0, -12]})})
                    .addTo(_this._brushGroup)
                    .bindPopup(lineData.segmentList[ii].startName+' 乘坐 '+lineData.segmentList[ii].busName.replace(/\((.*?)\)/,'')+',<br/>到'+lineData.segmentList[ii].endName+'下车',{
                        closeButton:false,
                        maxWidth:100,
                        mixWidth:100
                    });
                marker.on("mouseover",function(){
                    this.openPopup();
                });

                //侧栏列表填充
                var li = $('' +
                    '<li class="withoutChildren">' +
                        '<div class="maneuverLink">' +
                            '<span class="maneuverWrapper">' +
                                '<span class="maneuverHolder">' +
                                    '<span class="maneuverType">' +
                                        '<span class="maneuverNumber">'+(ii+1)+'.</span>' +
                                    '</span>' +
                                    '<span class="maneuverProgress">经过'+lineData.segmentList[ii].passDepotCount+'&nbsp;站</span>' +
                                    '<span class="maneuverDescription">' +
                                        '<span class="maneuverInstruction">在 '+lineData.segmentList[ii].startName+' 乘坐 '+lineData.segmentList[ii].busName.replace(/\((.*?)\)/,'')+' ' +
                                            '<span class="next-street"> 到'+lineData.segmentList[ii].endName+'</span>下车.' +
                                        '</span>' +
                                    '</span>' +
                                '</span>' +
                            '</span>' +
                        '</div>' +
                    '</li>');
                $("#roadViewList").append(li);
                li.bind('mouseenter',{m:marker},function(e){
                    $("#roadViewList .cur").removeClass('cur');
                    $(this).addClass('cur');
                    _this._map.setView(e.data.m.getLatLng(),_this._map.getZoom());
                    e.data.m.openPopup();
                });
            }

            //缩放
            var busLineBounds = lineData.bounds.split(';');
            ONEMAP.M.mapHolder.outPutValue.map.fitBounds(new L.LatLngBounds([busLineBounds[1],busLineBounds[0]], [busLineBounds[3],busLineBounds[2]]));
        },

        /**
         * 在地图上画出驾车路线
         * @type {Function}
         * @param options {Object}
         * @private
         */
        _drawCarPolyline:function(options){
            var _this = ONEMAP.M.directions;
            if(_this._roadPolyline){
                _this._brushGroup.removeLayer(_this._roadPolyline);
            }
            var points = _this._directionsDataResult.coors;
            //转换为可用坐标
            var pArray = points.split(',');
            var pointLatLng = [];
            var dDouble = true;
            var temp = [];
            for(var i= 0,l=pArray.length;i<l;i++){
                if(dDouble){
                    temp = [];
                    temp.push(pArray[i]);
                    dDouble = false;
                }else{
                    temp.unshift(pArray[i]);
                    dDouble = true;
                    temp = L.latLng(temp);
                    pointLatLng.push(temp);
                }
            }            

            //划起点，终点连线
            _this._roadPolyline = L.polyline([_this._startPoint.latlng,pointLatLng[0]], {color:  '#FFFFFF',weight:options.weight+2, opacity:1}).addTo(_this._brushGroup);
            _this._roadPolyline = L.polyline([_this._stopPoint.latlng,pointLatLng[pointLatLng.length-1]], {color: '#FFFFFF',weight:options.weight+2, opacity:1}).addTo(_this._brushGroup);
            _this._roadPolyline = L.polyline([_this._startPoint.latlng,pointLatLng[0]], {color:'#FF6600',weight:options.weight-1, opacity:options.opacity,dashArray:'1,10'}).addTo(_this._brushGroup);
            _this._roadPolyline = L.polyline([_this._stopPoint.latlng,pointLatLng[pointLatLng.length-1]], {color:'#FF6600',weight:options.weight-1, opacity:options.opacity,dashArray:'1,10'}).addTo(_this._brushGroup);

            //划线
            _this._roadPolyline = L.polyline(pointLatLng, {color: '#ffffff',weight:options.weight+3, opacity:1}).addTo(_this._brushGroup);
            _this._roadPolyline = L.polyline(pointLatLng, {color: options.color,weight:options.weight, opacity:options.opacity}).addTo(_this._brushGroup);
           // _this._map.fitBounds(_this._roadPolyline.getBounds());
        },
        /**
         * 在地图上描绘点
         * @type {Function}
         * @param options {Object} {type , latLng}
         * @private
         */
        _setMarkers:function(options){
            var _this = ONEMAP.M.directions;
            switch (options.type){
                case 'start':
                    if(_this._roadMarker.start){
                        _this._brushGroup.removeLayer(_this._roadMarker.start);
                    }
                    var iconUrl = '../images/layout/ico_p_2.png';
                    _this._roadMarker.start = new L.Marker(
                        options.latLng,
                        {draggable:true,
                            icon: L.icon({iconUrl: iconUrl,iconSize: [25, 25], iconAnchor: [12, 24], popupAnchor: [0, -25]}),
                            closeButton:false,
                            maxWidth:160,
                            minWidth:160
                        }
                    );

                    _this._roadMarker.start.on('dragend',function(){
                        _this.setStartPoint(this._latlng);
                    });

                    _this._roadMarker.start.addTo(_this._brushGroup);
                    return _this._roadMarker.start;
                    break;

                case 'across':
                    var iconUrl = '../images/layout/ico_p_4.png';
                    var acrossMarker = new L.Marker(
                        options.latLng,
                        {draggable:true,
                            icon: L.icon({iconUrl: iconUrl,iconSize: [25, 25], iconAnchor: [12, 24], popupAnchor: [0, -25]}),
                            closeButton:false,
                            maxWidth:160,
                            minWidth:160
                        }
                    );
                    acrossMarker.addTo(_this._brushGroup);
                    return acrossMarker;
                    break;

                case 'avoid':
                    var iconUrl = '../images/layout/ico_p_5.png';
                    var avoidMarker = new L.Marker(
                        options.latLng,
                        {draggable:true,
                            icon: L.icon({iconUrl: iconUrl,iconSize: [25, 25], iconAnchor: [12, 24], popupAnchor: [0, -25]}),
                            closeButton:false,
                            maxWidth:160,
                            minWidth:160
                        }
                    );                    
                    avoidMarker.addTo(_this._brushGroup);
                    return avoidMarker;
                    break;

                case 'stop':
                    if(_this._roadMarker.stop){
                        _this._brushGroup.removeLayer(_this._roadMarker.stop);
                    }
                    var iconUrl = '../images/layout/ico_p_1.png';
                    _this._roadMarker.stop = new L.Marker(
                        options.latLng,
                        {draggable:true,icon: L.icon({iconUrl: iconUrl,iconSize: [25, 25], iconAnchor: [12, 24], popupAnchor: [0, -25]}),
                            closeButton:false,
                            maxWidth:160,
                            minWidth:160
                        }
                    );

                    _this._roadMarker.stop.on('dragend',function(){
                        _this.setStopPoint(this._latlng);
                    });

                    _this._roadMarker.stop.addTo(_this._brushGroup);

                    return _this._roadMarker.stop;
                    break;
            }
        },

        /**
         * 注册监听
         * @type {Function}
         */
        subscribe:function(){
            var _this = ONEMAP.M.directions;
            ONEMAP.C.publisher.subscribe(_this.layoutResize,'sideBarLayoutChange');
            _this._map.on('cleanMap',_this._cleanDirections);
        },

        /**
         * 取消监听
         * @type {Function}
         */
        unSubscribe: function () {
            var _this = ONEMAP.M.directions;
            ONEMAP.C.publisher.unSubscribe(_this.layoutResize,'sideBarLayoutChange');
            _this._map.off('cleanMap',_this._cleanDirections);
        },

        /**
         * 模块移除  移除监听/清除地图上的图层组 推送移除信息
         * @type {Function}
         */
        remove:function(){
            var _this = ONEMAP.M.directions;
            _this.unSubscribe();

            _this._cleanDirections();

            /*ONEMAP.M.pcSideBar.hideSideBarLevel({
                hideLevel:2,
                empty:true,
                showLevel:1});*/

            ONEMAP.C.publisher.publish({
                    mod:'directions',
                    action:'remove'},
                'modNavChange'
            );

            _this._initialized = false;
        },













        /**
         * 地名查询参数
         * @type {Object}
         */
        _pointSearchOptions:{
            page:1,
            pageSize:10,
            keyWord:'',
            center:null, //中心点
            pac:0,//区域pac
            init_query_key:''//原始查询关键字
        },



        /**
         * 查询数据集合
         * @type {Object}
         * @default null
         * @private
         */
        _placeDataResult : null,

        /**
         * 标记集合
         * @type {Object}
         * @default {}
         * @private
         */
        _markers:{},

        /**
         * 结果Html
         * @type {String}
         * @default null
         * @private
         */
        _resultHtml:$(''),
        /**
         * 分页html
         * @type {String}
         * @default null
         * @private
         */
        _pageHtml:$('<div class="page-wrap"></div>'),

        /**
         * 结果列表内容
         * @type {String}
         */
        _resultListHtml:$('<div></div>'),

        /**
         * 是否fitBounds结果
         * @type {Boolean}
         */
        _fitBounds:true,

        /**
         * 查询起始点 0 为无 1为起点 2为终点
         * @type {String}
         */
        _pointSearchType:0,

        /**
         * 根据pac的长度返回对应zoom
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        _getZoom:function(options){
            var zhixiashi = [15611,15612,15631,15650,15681,15682];
            //直辖市判断
            if(zhixiashi.indexOf(parseInt(options.pac)) != -1){
                return 11;
            }
            switch(options.pac.toString().length){
                case 3: //国家
                return 4;
                case 5: //省
                return 6;
                case 7: //市
                return 11;
                case 9: //县
                return 12;
                default:
                return 12;
            }
        },

        /**
         * 获取区域信息
         * @param  {[type]} options       [description]
         * @param  {[type]} callback_func [description]
         * @return {[type]}               [description]
         */
        _getAreaInfo:function(options,callback_func){
            var _this = ONEMAP.M.directions;
            var poiSearch = new poiSearchF();
            poiSearch.getAreaInfo({keywords:options.keywords},function(data){
                data = data.data;
                callback_func(data);
            });
        },

        /**
         * 获取起点，终点信息  通过输入框的地名和 起始点的地名匹配判断是否相同 来确定是否进行地名查询
         * pointSearchResult
         * @return {[type]} [description]
         */
        _getStartAndStop:function(){
            var _this = ONEMAP.M.directions;

            $('#pointSearchResultWrap').empty();
            _this._resultHtml = '';
            _this._pointSearchType = 0;

            if(_this._startPoint.name != $("#directionsStart").val() && $('#directionsStart').val() != '' && $('#directionsStart').val() != '输入起点或地图上右键选点'){
                //起点展开
                _this._pointSearchType = 1;
                _this._buildSearch('start');
            }

            if(_this._stopPoint.name != $("#directionsStop").val() && $('#directionsStop').val() != '' && $('#directionsStop').val() != '输入终点或地图上右键选点'){
                
                //如果不需查询起点的时候设置终点展开
                if(_this._pointSearchType == 0){
                    _this._pointSearchType = 2;
                }
                _this._buildSearch('stop');
            }
            _this._setPlaceResultHtml();
        },

        /**
         * 构建查询结果 起始点顺序开始
         * @param  {[type]} type [description]
         * @return {[type]}      [description]
         */
        _buildSearch:function(type){
            var _this = ONEMAP.M.directions;
            switch(type){
                case 'start':
                    _this._resultHtml += '<div id="directionsStartSearch">'+
                    '<div class="header"><h3>查询起点</h3></div>'+
                    '<div class="d-waypoints" id="dStartResult"></div>'+
                    '</div>';
                break;
                case 'stop':
                    _this._resultHtml += '<div id="directionsStopSearch">'+
                    '<div class="header"><h3>查询终点</h3></div>'+
                    '<div class="d-waypoints" id="dStopResult"></div>'+
                    '</div>';
                break;
            }
        },

        /**
         * 填充侧栏html列表
         * @type {Function}
         * @returns {*}
         * @private
         */
        _setPlaceResultHtml:function(){
            var _this = ONEMAP.M.directions;
            $('#pointSearchResultWrap').empty().append(_this._resultHtml);

            $('#pointSearchResult').show();

            //判断查询状态，设置展开
            if(_this._pointSearchType == 1){
                $('#directionsStartSearch').addClass('open');
            }else if(_this._pointSearchType == 2){
                $('#directionsStopSearch').addClass('open');
            }else {
                return false;
            }

            //绑定事件
            $('#directionsStartSearch .header').bind('click',function(){
                if(_this._pointSearchType == 2){                    
                    $('#pointSearchResult .open').removeClass('open');
                    $('#directionsStartSearch').addClass('open');
                    $('#dStopResult').empty();
                }
                _this._pointSearchType = 1;
                _this._pointSearch({'keyWord':$("#directionsStart").val()});
            });

            $('#directionsStopSearch .header').bind('click',function(){
                if(_this._pointSearchType == 1){
                    $('#pointSearchResult .open').removeClass('open');
                    $('#directionsStopSearch').addClass('open');
                    $('#dStartResult').empty();
                }
                _this._pointSearchType = 2;
                _this._pointSearch({'keyWord':$("#directionsStop").val()});
            });

            if(_this._pointSearchType == 1){
                _this._pointSearch({'keyWord':$("#directionsStart").val()});
                return _this;
            }

            if(_this._pointSearchType == 2){
                _this._pointSearch({'keyWord':$("#directionsStop").val()});
                return _this;
            }            
        },


        /**
         * 地名搜索
         * @type {Function}
         * @param options {Object} {type}
         */
        _pointSearch:function(options){
            var _this = ONEMAP.M.directions;
            
            _this._pointSearchOptions.init_query_key = options.keyWord;

            _this._getAreaInfo({keywords:options.keyWord},function(data){
                if(data.residue_addr_name.length>0){ 
                    _this._pointSearchOptions.keyWord = data.residue_addr_name;   


                    //如果只返回一个参考地址
                    if(data.address.length == 1){

                        //如果有pac 按pac查
                        //if(data.address[0].area_pac>0){
                            _this._pointSearchOptions.type = 'pac';
                            _this._pointSearchOptions.pac = (data.address[0].area_pac.toString()).length>2?(data.address[0].area_pac.toString().substr(2,data.address[0].area_pac.toString().length-1)):data.address[0].area_pac;
                            
                            if(_this._pointSearchOptions.pac.length>7){
                                _this._pointSearchOptions.pac = _this._pointSearchOptions.pac.substr(0,7);
                            }
                            _this._map.setView([data.address[0].area_lat,data.address[0].area_lon],_this._getZoom({'pac':_this._pointSearchOptions.pac}));
                            _this._getPageResult({page:1});

                        // }else {
                        //     //没有pac 按当前区域 pac 查                            
                        //     if(ONEMAP.D.cityInfo.pac.length<3){
                        //         _this._pointSearchOptions.type  = 'pac';
                        //         var partition = new L.Partition();
                        //         partition.byLatLng(_this._map.getCenter(), 3, function (data) {
                        //             if(data['level'][data['level'].length-1]['code'].length>2){
                        //                 _this._pointSearchOptions.pac = data['level'][data['level'].length-1]['code'].toString().substr(2,data['level'][data['level'].length-1]['code'].toString().length-1);
                        //                 if(_this._pointSearchOptions.pac.length>7){
                        //                     _this._pointSearchOptions.pac = _this._pointSearchOptions.pac.substr(0,7);
                        //                 }
                        //                 _this._getPageResult({page:1});
                        //             }else {
                        //                 //_this._setNotPointResultHtml('范围过大，无法搜索到信息，请放大地图重试。');
                        //                 _this._resultListHtml = $('<div></div>');
                        //                 $('<p class="note">查询范围过大，无法搜索到信息，请放大地图重试。</p>').appendTo(_this._resultListHtml);
                        //                 _this._pageHtml = $('');
                        //                 _this._updatePlaceResultHtml();
                        //             }
                        //         });
                        //     }else {
                        //         _this._pointSearchOptions.type = 'pac';
                        //         _this._pointSearchOptions.pac = (ONEMAP.D.cityInfo.pac.toString().substr(2,ONEMAP.D.cityInfo.pac.toString().length-1));
                        //         if(_this._pointSearchOptions.pac.length>7){
                        //             _this._pointSearchOptions.pac = _this._pointSearchOptions.pac.substr(0,7);
                        //         }
                        //         _this._getPageResult({page:1});
                        //     }
                            
                        // }


                    //如果返回多个参考地址，列出参考地址
                    }else {
                        _this._createNameListForSearchResultHtml(data);
                    }
                    
                }else {
                    _this._fitBounds = false;
                    if(data.address[0].pac>0){                        
                        _this._map.setView([data.address[0].lat,data.address[0].lon],_this._getZoom({'pac':data.address[0].pac.toString().substr(2,data.address[0].pac.toString().length-1)}));
                        ONEMAP.C.publisher.publish({type:'success',message:'已切换至 '+data.address[0].name+' 区域'},'noteBar::add');
                        _this._placeDataResult = {list: [{
                                                        cn: data.address[0].name,
                                                        lon: data.address[0].lon,
                                                        tc: 0,
                                                        tid: 0,
                                                        pac: 0,
                                                        lat: data.address[0].lat,
                                                        id: 0
                                                    }],
                                                    total: 1,type: 1,page: 1,pagesize: 10};
                        _this._createResultHtml({fitBounds:false})._updatePlaceResultHtml();                            
                        setTimeout(function(){
                            _this._markers[0].openPopup();
                        }, 300);                       
                    }else {
                        //_this._map.setView([data.address[0].area_lat,data.address[0].area_lon],_this._getZoom({'pac':data.address[0].area_pac.toString().substr(2,data.address[0].area_pac.toString().length-1)}));
                        ONEMAP.C.publisher.publish({type:'success',message:'已切换至 '+data.address[0].name+' 区域'},'noteBar::add');

                        _this._placeDataResult = {list: [],total: 0,type: 1,page: 1,pagesize: 0};

                        for(var i = 0, l = data.address.length; i<l; i++){
                            _this._placeDataResult.list.push({
                                cn: data.address[i].area_name,
                                lon: data.address[i].area_lon,
                                tc: 0,
                                tid: 0,
                                pac: 0,
                                lat: data.address[i].area_lat,
                                id: i+1
                            });

                            _this._placeDataResult.total++;
                            _this._placeDataResult.pagesize++;
                        }


                        _this._createResultHtml({fitBounds:false})._updatePlaceResultHtml(); 



                        /*setTimeout(function(){
                            _this._markers[0].openPopup();
                        }, 300); */                                          
                    }
                }

            });            
        },


        /**
         * 创建getAreaName结果二次查询列表数据
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        _createNameListForSearchResultHtml:function(options){
            var _this = ONEMAP.M.directions;  
            _this._cleanMarkerGroup();
            _this._resultListHtml=$('<div></div>');
            _this._pageHtml = $('');

            $('<h3>请选择查询的区域:</h3>').appendTo(_this._resultListHtml);

            for(var i = 0, l = options.address.length; i<l; i++){
                var place = options.address[i];
                place.pnum = i;
                var nLatlng = L.Util.formatHMS([place.area_lat,place.area_lon]);

                var _placeDl = $('<dl style="float:none" class="areaSelect th" id="plm'+place.pnum+'"></dl>');
                var _placeDt = $('<dt><a href="javascript:void(0)">'+place.area_name+'</a> <span class="address" style="color:#fff"></span></dt>');

                _this._getPlaceName(L.latLng([place.area_lat,place.area_lon]),_placeDt);

                _placeDl.bind('click',{d:place},function(e){                       
                    
                    _this._pointSearchOptions.pac = (e.data.d.area_pac.toString()).length>2?(e.data.d.area_pac.toString().substr(2,e.data.d.area_pac.toString().length-1)):e.data.d.area_pac;
                    if(_this._pointSearchOptions.pac.length>7){
                        _this._pointSearchOptions.pac = _this._pointSearchOptions.pac.substr(0,7);
                    }

                    _this._map.setView([e.data.d.area_lat, e.data.d.area_lon],_this._getZoom({'pac':_this._pointSearchOptions.pac}));
                    
                    ONEMAP.C.publisher.publish({type:'success',message:'已切换至 '+e.data.d.area_name+' 区域'},'noteBar::add');
                    setTimeout(function(){
                        _this._pointSearchOptions.type = 'pac';
                        _this._getPageResult({page:1});
                    }, 300);


                });

                _placeDt.appendTo(_placeDl);
                _placeDl.appendTo(_this._resultListHtml);
            }            

            _this._updatePlaceResultHtml();
           
        },

        /**
         * 查询地点数据
         * @type {Function}
         * @param options {Object} {page}
         */
        _getPageResult:function(options){
            var _this = ONEMAP.M.directions;

            _this._pointSearchOptions.page = options.page;

            var poiSearch = new poiSearchF({
                page:_this._pointSearchOptions.page,
                pageSize:_this._pointSearchOptions.pageSize
            });

                ONEMAP.V.loading.load();
                if(_this._pointSearchOptions.type ==='pac'){
                    poiSearch.byOptions({pac:_this._pointSearchOptions.pac,keywords:_this._pointSearchOptions.keyWord},function(data){
                        ONEMAP.V.loading.loaded();

                        if(data.hasOwnProperty('type')){
                            if(data.type == 1){
                                if(data.hasOwnProperty('list')&& data['list'].length>0){
                                    data.page = data.page*1;
                                    _this._placeDataResult = data;
                                    _this._createResultHtml(options)._updatePlaceResultHtml();
                                }else {
                                    _this._resultListHtml = $('<div></div>');
                                    $('<p class="note">没有搜索到 '+_this._pointSearchOptions.init_query_key+' 的信息，请修改搜索条件。</p>').appendTo(_this._resultListHtml);
                                    _this._pageHtml = $('');
                                    _this._updatePlaceResultHtml();
                                    
                                }
                            }else if(data.type == 2) {
                                data.page = data.page*1;
                                    _this._placeDataResult = data;
                                    _this._createResultHtml(options)._updatePlaceResultHtml();
                            }
                        }else {
                            _this._resultListHtml = $('<div></div>');
                            $('<p class="note">没有搜索到 '+_this._pointSearchOptions.init_query_key+' 的信息，请修改搜索条件。</p>').appendTo(_this._resultListHtml);
                            _this._pageHtml = $('');
                            _this._updatePlaceResultHtml();                            
                        }                        

                    });
                }
        },

        /**
         * 更新地名查询结果列表
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        _updatePlaceResultHtml:function(options){
            var _this = ONEMAP.M.directions;
            switch(_this._pointSearchType){
                case 1:
                    $('#dStartResult').empty();
                    $('#dStartResult').append(_this._resultListHtml).append(_this._pageHtml);
                break;
                case 2:
                    $('#dStopResult').empty();
                    $('#dStopResult').append(_this._resultListHtml).append(_this._pageHtml);
                break;
            }

            $("#pointsSearchPageJump .page_num").bind('keydown', function (e) {
                if (e.keyCode === 13) {
                    var pageJump = parseInt($("#pointsSearchPageJump .page_num").val());
                    if(!pageJump || pageJump > $("#pointsSearchPageJump").attr('countPages')){
                        return;
                    }else {                            
                        _this._getPageResult({'page':parseInt(pageJump)});
                    }
                }
            });

            $("#pointsSearchPageJump .btn").bind('click',function(){
                _this._getPageResult({page:$(this).attr("pid")});
            });
        },

        

        /**
         * 添加标记到地图
         * @type {Function}
         * @param obj {Object} marker对象
         * @private
         */
        _markerToMap:function(obj){
            var _this = ONEMAP.M.directions;
            var markerObj = {
                latlng:[obj.lat,obj.lon],
                name:obj.cn,
                pguid:obj.id,
                pnum:obj.pnum

            };
            _this._createMarker(markerObj).addTo(_this._markerGroup);

            return _this;
        },

        /**
         * 添加统计图标
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
        _addCountMarker:function(obj){
            var _this = ONEMAP.M.directions;
            var marker = new L.Marker(obj.latlng,{icon:L.icon({
                iconUrl:  onemapUrlConfig.siteUrl+'/static/images/marker-icon00.png',
                iconSize: [25, 41],
                iconAnchor: [13, 40],
                popupAnchor: [0, -38]
            })});
            marker.on('click',function(){
                $('.areaSelect[pid='+obj.pclick+']').click();
            });
            marker.addTo(_this._markerGroup);
            L.olabel(obj.latlng,'<span>'+obj.count.toString()+'</span>',{offset: [-24, -32],className:'place-search-olabel'}).on('click',function(){
                $('.areaSelect[pid='+obj.pclick+']').click();
            }).addTo(_this._markerGroup);

        },
        /**
         * 清空地名标记
         * @return {[type]} [description]
         */
        _cleanMarkerGroup:function(){
            var _this = ONEMAP.M.directions;
            _this._markerGroup.clearLayers();
            _this._markers = [];
            return _this;
        },

        /**
         * 清除地名查询列表
         * @return {[type]} [description]
         */
        _cleanPointSearch:function(){
            var _this = ONEMAP.M.directions;
            _this._cleanMarkerGroup();
            $('#pointSearchResult').hide()
            $('#pointSearchResultWrap').empty();
        },

        /**
         * 地名查询冒泡设置起点/终点
         * @param  {[type]} pguid [description]
         * @param  {[type]} type  [description]
         * @return {[type]}       [description]
         */
        pointSetWayPoint:function(pguid,type){
            var _this = ONEMAP.M.directions;
            switch(type){
                case 'start':
                    _this.setStartPoint(_this._markers[pguid].getLatLng(),_this._markers[pguid]['dirName']);
                    $('#directionsStartSearch').hide().remove();
                    if($('#directionsStopSearch')){
                        $('#directionsStopSearch .header').click();
                    }

                    break;
                case 'stop':
                    _this.setStopPoint(_this._markers[pguid].getLatLng(),_this._markers[pguid]['dirName']);
                    $('#directionsStopSearch').hide().remove();
                    if($('#directionsStartSearch')){
                        $('#directionsStartSearch .header').click();
                    }
                    break;
            }
        },

        /**
         * 创建地图标记
         * @type {Function}
         * @param obj {Object} marker
         * @returns {*}
         * @private
         */
        _createMarker:function(obj){
            var _this = ONEMAP.M.directions;
            if(_this._markers[obj.pguid]){
                return _this._markers[obj.pguid];
            }
            var setWayBtn = '';
            if(_this._pointSearchType == 1){
                setWayBtn = '<a id="placeSearchPointFrom" href="javascript:ONEMAP.M.directions.pointSetWayPoint(\''+obj.pguid+'\',\'start\')">起点</a>';
            }else if(_this._pointSearchType == 2){
                setWayBtn = '<a id="placeSearchPointGoTo" href="javascript:ONEMAP.M.directions.pointSetWayPoint(\''+obj.pguid+'\',\'stop\')">终点</a>';
            }
            var markerHtml = '<div class="placeInfo">' +
                '<div class="op text-right">设为：' +
                 setWayBtn+
                '</div>' +
                '</div>';
            var marker = new L.Marker(obj.latlng,{icon:L.icon({
                iconUrl: onemapUrlConfig.siteUrl+'/static/images/marker-icon'+(parseInt(obj.pnum)+1)+'.png',
                iconSize: [25, 41],
                iconAnchor: [13, 40],
                popupAnchor: [0, -38]
            })})
                .bindPopup(markerHtml,{
                    closeButton:false,
                    maxWidth:140,
                    minWidth:140,
                    title:obj.name});
            marker.pguid = obj.pguid;
            marker.dirName = obj.name;
            _this._markers[obj.pguid] = marker;
            marker.on("mouseover",function(){
                $('.d-waypoints .cur').removeClass('cur');
                $('#plm'+this.pguid).addClass('cur');
            });            
            return marker;
        },

        /**
         * 无结果列表
         * @type {Function}
         * @param notText {String} 无结果说明文字
         * @returns {*}
         * @private
         */
        _setNotPointResultHtml:function(notText){
            var _this = ONEMAP.M.directions;
            $('<p class="not-result">'+notText+'</p>').appendTo(_this._resultHtml);
            return _this;
        },



        /**
         * 构建分页数据
         * @type {Function}
         * @returns {*}
         * @private
         */
        _createResultHtml:function(options){
            var _this = ONEMAP.M.directions; 
            _this._cleanMarkerGroup();
            _this._resultListHtml=$('<div></div>');
            if(_this._placeDataResult.type == 2){               

                $('<h3>请选择查询的区域:</h3>').appendTo(_this._resultListHtml);

                //列出一级                
                var place_fi_length = 0;
                for(var place_fi in _this._placeDataResult['list']){

                    if(ONEMAP.T.getObjNameAry(_this._placeDataResult['list']).length>1){
                        place_fi_length++;
                        var _placeDl = $('<dl class="areaSelect fi" pid="'+_this._placeDataResult['list'][place_fi]['pac']+'"></dl>');
                        var _placeDt = $('<dt><a href="javascript:void(0)">'+place_fi+'('+_this._placeDataResult['list'][place_fi]['count']+')</a></dt>');
                        _this._placeDataResult['list'][place_fi].area_name = place_fi;
                        _placeDl.bind('click',{d:_this._placeDataResult['list'][place_fi]},function(e){ 
                            if(_this._pointSearchOptions.type == 'pac'){
                                _this._map.setView([e.data.d.lat,e.data.d.lon],_this._getZoom({'pac':e.data.d.pac}));  
                                _this._pointSearchOptions.pac = e.data.d.pac;
                                setTimeout(function(){
                                    _this._pointSearchOptions.type = 'pac';
                                    _this._getPageResult({page:1});
                                }, 300);
                            }else {
                                _this._map.setView([e.data.d.lat,e.data.d.lon],_this._map.getZoom()+2);  
                            }
                             
                            
                    ONEMAP.C.publisher.publish({type:'success',message:'已切换至 '+e.data.d.area_name+' 区域'},'noteBar::add');
                            
                        });

                        _placeDt.appendTo(_placeDl);
                        _placeDl.appendTo(_this._resultListHtml);
                    }                    

                    //列出二级
                    var place_se_length = 0;
                    for(var place_se in _this._placeDataResult['list'][place_fi]['sub']){
                        if(ONEMAP.T.getObjNameAry(_this._placeDataResult['list'][place_fi]['sub']).length > 1){
                            place_se_length++;
                            var _placeDl_se = $('<dl class="areaSelect se" pid="'+_this._placeDataResult['list'][place_fi]['sub'][place_se]['pac']+'"></dl>');
                            var _placeDt_se = $('<dt><a href="javascript:void(0)">'+place_se+'('+_this._placeDataResult['list'][place_fi]['sub'][place_se]['count']+')</a></dt>');
                            _this._placeDataResult['list'][place_fi]['sub'][place_se].area_name = place_se;
                            _placeDl_se.bind('click',{d:_this._placeDataResult['list'][place_fi]['sub'][place_se]},function(e){ 
                                if(_this._pointSearchOptions.type == 'pac'){
                                    _this._map.setView([e.data.d.lat,e.data.d.lon],_this._getZoom({'pac':e.data.d.pac})); 
                                    _this._pointSearchOptions.pac = e.data.d.pac;
                                    setTimeout(function(){
                                        _this._pointSearchOptions.type = 'pac';
                                        _this._getPageResult({page:1});
                                    }, 300);
                                }else {
                                    _this._map.setView([e.data.d.lat,e.data.d.lon],_this._map.getZoom()+2); 
                                }
                                
                    ONEMAP.C.publisher.publish({type:'success',message:'已切换至 '+e.data.d.area_name+' 区域'},'noteBar::add');
                            });

                            _placeDt_se.appendTo(_placeDl_se);
                            _placeDl_se.appendTo(_this._resultListHtml);

                            _this._addCountMarker({
                                'latlng':[_this._placeDataResult['list'][place_fi]['sub'][place_se].lat,_this._placeDataResult['list'][place_fi]['sub'][place_se].lon],
                                'count':_this._placeDataResult['list'][place_fi]['sub'][place_se]['count'],
                                'pclick':_this._placeDataResult['list'][place_fi]['sub'][place_se]['pac']
                            });
                        }                        

                        //如果二级只有一个，列出三级
                        if(ONEMAP.T.getObjNameAry(_this._placeDataResult['list'][place_fi]['sub']).length == 1){
                            for(var place_th in _this._placeDataResult['list'][place_fi]['sub'][place_se]['sub']){
                                var _placeDl_th = $('<dl class="areaSelect th" pid="'+_this._placeDataResult['list'][place_fi]['sub'][place_se]['sub'][place_th]['pac']+'"></dl>');
                                var _placeDt_th = $('<dt><a href="javascript:void(0)">'+place_th+'('+_this._placeDataResult['list'][place_fi]['sub'][place_se]['sub'][place_th]['count']+')</a></dt>');
                                _this._placeDataResult['list'][place_fi]['sub'][place_se]['sub'][place_th].area_name = place_th;
                                _placeDl_th.bind('click',{d:_this._placeDataResult['list'][place_fi]['sub'][place_se]['sub'][place_th]},function(e){    
                                    if(_this._pointSearchOptions.type == 'pac'){
                                        _this._map.setView([e.data.d.lat,e.data.d.lon],_this._getZoom({'pac':e.data.d.pac})); 
                                        _this._pointSearchOptions.pac = e.data.d.pac;
                                        setTimeout(function(){
                                            _this._pointSearchOptions.type = 'pac';
                                            _this._getPageResult({page:1});
                                        }, 300); 
                                    }else {
                                        _this._map.setView([e.data.d.lat,e.data.d.lon],_this._map.getZoom()+2); 
                                    }  

                    ONEMAP.C.publisher.publish({type:'success',message:'已切换至 '+e.data.d.area_name+' 区域'},'noteBar::add');                            
                                });

                                _placeDt_th.appendTo(_placeDl_th);
                                _placeDl_th.appendTo(_this._resultListHtml);

                                _this._addCountMarker({
                                    'latlng':[_this._placeDataResult['list'][place_fi]['sub'][place_se]['sub'][place_th].lat,_this._placeDataResult['list'][place_fi]['sub'][place_se]['sub'][place_th].lon],
                                    'count':_this._placeDataResult['list'][place_fi]['sub'][place_se]['sub'][place_th]['count'],
                                    'pclick':_this._placeDataResult['list'][place_fi]['sub'][place_se]['sub'][place_th]['pac']
                                });
                            }
                        }
                    }
                }

                _this._pageHtml = $('');

            }else {                
                for(var i = 0, l = _this._placeDataResult.list.length; i<l; i++){
                    var place = _this._placeDataResult.list[i];
                    place.pnum = i;
                    var nLatlng = L.Util.formatHMS([place.lat,place.lon]);
                    var _placeDl = $('<dl class="place-dl" id="plm'+place.id+'"></dl>');

                    var setWayBtn = '';
                    if(_this._pointSearchType == 1){
                        setWayBtn = '<button onclick="ONEMAP.M.directions.pointSetWayPoint(\''+place.id+'\',\'start\')" class="btn btn4 btn-set-way">设为起点</button>';
                    }else if(_this._pointSearchType == 2){
                        setWayBtn = '<button onclick="ONEMAP.M.directions.pointSetWayPoint(\''+place.id+'\',\'stop\')" class="btn btn4 btn-set-way">设为终点</button>';
                    }

                    var _placeDt = $('<dt><i class="p'+(i+1)+'"><img src="../images/layout/marker-icon'+(i+1)+'.png" /></i><a href="javascript:void(0)">'+place.cn+'</a>'+setWayBtn+'</dt>');
                    var _placeDd = $('<dd><p class="address"></p>' +
                        '<p class="latlng">'+nLatlng.lng+' , '+nLatlng.lat+'</p></dd>');

                    _this._getPlaceName(L.latLng([place.lat,place.lon]),_placeDd);

                    _placeDt.find('a').bind('click',{d:place},function(e){
                        if(_this._markers[e.data.d.id]){
                            _this._markerGroup.removeLayer(_this._markers[e.data.d.id]);
                            delete _this._markers[e.data.d.id];
                            _this._markerToMap(e.data.d);
                            setTimeout(function(){
                                _this._markers[e.data.d.id].openPopup();
                            }, 300);                            
                        }
                        var zoomTo = ((_this._map.getZoom()>14)?_this._map.getZoom():14);
                        _this._map.setView([e.data.d.lat, e.data.d.lon],zoomTo);
                        //_this._map.setView([e.data.d.lat, e.data.d.lon],_this._getZoom({'pac':e.data.d.pac.toString().substr(2,e.data.d.pac.toString().length-1)}));
                        $("#pointSearchResult .place-dl.cur").removeClass("cur");
                        $(this).parent().parent().addClass("cur");                        

                    });

                    _placeDt.appendTo(_placeDl);
                    _placeDd.appendTo(_placeDl);
                    _placeDl.appendTo(_this._resultListHtml);

                    _this._markerToMap(place);
                }

                if(_this._fitBounds){
                    _this._map.fitBounds(_this._markerGroup.getBounds(),{'paddingTopLeft':[100,100],'paddingBottomRight':[100,100]});
                    //_this._map.setView(_this._markerGroup.getBounds().getCenter(),_this._map.getZoom());
                }                
                _this._pageHtml = $('<div id="pointsSearchPageJump" class="page-wrap"></div>');
                var countPages = (parseInt(_this._placeDataResult.total % _this._placeDataResult.pagesize)>0?parseInt(_this._placeDataResult.total / _this._placeDataResult.pagesize+1):parseInt(_this._placeDataResult.total / _this._placeDataResult.pagesize));
                if(countPages==0){
                    countPages = 1;
                }
                _this._pageJump = $('<div countPages="'+countPages+'" class="count"><span>第</span><input class="page_num input input-small" value="'+_this._placeDataResult.page+'" type="text" /><span>/'+countPages+'页</span></div>');
                _this._pageJump.appendTo(_this._pageHtml);

                _this._pageHtmlBtnGroup = $('<div class="btn-group"></div>').appendTo(_this._pageHtml);

                if (_this._placeDataResult.pagesize < _this._placeDataResult.total) {
                    if (_this._placeDataResult.page == 1) {
                        var abtnNext = $('<button type="button" class="btn btn2 btn-small next" pid=' + (_this._placeDataResult.page + 1) + '>下一页</button>');
                        _this._pageHtmlBtnGroup.append(abtnNext);
                    } else if (countPages == _this._placeDataResult.page && _this._placeDataResult.total > _this._placeDataResult.pagesize) {
                        var abtnPrev = $('<button type="button" class="btn btn2 btn-small prev" pid=' + (_this._placeDataResult.page - 1) + '>上一页</button>');
                        _this._pageHtmlBtnGroup.append(abtnPrev);
                    } else {
                        var abtnPrev = $('<button type="button" class="btn btn2 btn-small prev" pid=' + (_this._placeDataResult.page - 1) + '>上一页</button>');
                        var abtnNext = $('<button type="button" class="btn btn2 btn-small next" pid=' + (_this._placeDataResult.page + 1) + '>下一页</button>');

                        _this._pageHtmlBtnGroup.append(abtnPrev).append(abtnNext);
                    }
                }

            }    

            $("#pointSearchResult").mCustomScrollbar("update");       

            return _this;
        },


        /**
         * 菜单 获取地名
         * @type {Function}
         * @param latlng {Object} 坐标
         * @param abc {Object} 容器
         * @param zoom {Int} 缩放等级
         * @private
         */
        _getPlaceName:function(latlng,abc,zoom){
            var addressSearch = new addressSearchF();
            ONEMAP.V.loading.load();
            addressSearch.getAddressInfo({zoom:(zoom?zoom:8), latLng:[latlng.lat,latlng.lng]},function(data){
                ONEMAP.V.loading.loaded();
                data = data.data;
                abc.find('.address').empty().append(data.region);
                $("#pointSearchResult").mCustomScrollbar("update");
            });
        }

    };

    return ONEMAP.M.directions;

});
