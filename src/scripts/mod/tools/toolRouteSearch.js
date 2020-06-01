define([
	'html!templates/tools/toolRouteSearch',
	'modDir/service/routeSearch',
	'modDir/tools/toolRoutePlaceSearch',
	'css!styles/tools/toolRouteSearch'
	],
function(tpcLayout,routeSearchF){
	/**
	* 模块数据 用于数据存储和外部调用
	* @type {Object}
	* 数据存放
	*/ 
	var modValue = {
		options:{
			searchType:'car'
		},
		directionsDataResult:null,//查询结果数据
		brushGroup:null,//路线容器
		startPoint:{	//起点坐标
			latlng:null,
			name:''
		},
		stopPoint:{		//终点坐标
			latlng:null,
			name:''
		},
		amongMarkers:{},//中间点坐标集合
		acrossPoints:{},//途经点坐标集合
		avoidPoints:{},//规避点坐标集合
		roadMarker:{},//路标 包含起点、中间点、终点
		resultHtml:null,
		pointSearchType:0,//查询起始点 0为无，1为起点，2为终点
        markerGroup:null,//地名标记图层组
	};
	/*
     * 模块状态，用于存储模块的状态 例如：收起，关闭
     * @type {Object}
     */
    var status = {
    	initialized:false//是否初始化
    };
    /**
     * 初始化
     * 事件监听
     * @type {Function}
     * @returns {*}
     */
    function init(){
    	if(!status.initialized){
    		setLayout();
    		bindEvent();
    		subscribe();
    		status.initialized = true;
            modValue.markerGroup = map23DControl.group({
                                        action: 'add'
                                    });
            modValue.brushGroup =  map23DControl.group({
                                        action: 'add'
                                    });
    	};
    	ONEMAP.C.publisher.publish({
    		modName:'toolRouteSearch'
    	},'tools:active');
    };
    function setLayout(){
    	$("#routSearchContent .cover-content").empty().append(tpcLayout);
    	$('#directionsStart').val(modValue.startPoint.name.length>0?modValue.startPoint.name:'输入起点或地图上右键选点');
		$('#directionsStop').val(modValue.stopPoint.name.length>0?modValue.stopPoint.name:'输入终点或地图上右键选点');
    	//滚动条初始
    	$('#roadViewListWrap').mCustomScrollbar({
    	    scrollInertia:0
    	});
    	$("#pointSearchResult").mCustomScrollbar({
    	    scrollInertia:0
    	});
    };
    /**
     * 监听事件
     */
    function subscribe() {
        ONEMAP.C.publisher.subscribe(cleanDirections, 'cleanMap');
        //ONEMAP.C.publisher.subscribe(reAddRoutSearch,'add3d');
        ONEMAP.C.publisher.subscribe(remove, 'tools:active');
    };
    function unSubscribe() {
        ONEMAP.C.publisher.unSubscribe(cleanDirections, 'cleanMap');
        ONEMAP.C.publisher.unSubscribe(remove, 'tools:active');
    };
    function remove(options){
    	if(options.modName != 'toolRouteSearch'){
    		$("#toolsBar .tools-routgh").removeClass('cur');
    	    $("#routSearchContent").hide();
        }else{
    		if($("#toolsBar .tools-routgh").hasClass('cur')){
    			$("#toolsBar .tools-routgh").removeClass('cur');
    			$("#routSearchContent").hide();
    		}else{
    			$("#toolsBar .tools-routgh").addClass('cur');
    			$("#routSearchContent").show();
    		}
    	}
    };
    /**
     * 三维跳转
     */
    function fly3DInView(lat,lng,zoom){
        map3DViewer.flyTo({
            center:{
                lat:lat,
                lng:lng
            }, 
            zoom:zoom,
            heading:0,//摄像机平面角度 正北为0
            tilt:0,//摄像机倾斜角
        });
    };
    /**
     * 清空图层
     */
    function clearMarker(){
        if(map23DData.display.map3D){
            $.each(map3DViewer.markers,function(value,key){
                map3DViewer.label({
                    action:'remove',
                    guid:value,
                    featureType:'marker'
                })
            })
        }
        map23DControl.group({
            action: 'cleanAll',
            guid: modValue.markerGroup
        })
    };
    /**
     * 清除路径
     */
    function cleanDirections(){
        if(map23DData.display.map3D){
            $.each(map3DViewer.markers,function(value,key){
                map3DViewer.label({
                    action:'remove',
                    guid:value,
                    featureType:'marker'
                })
            })
        }
        map23DControl.group({
            action:'cleanAll',
            guid:modValue.brushGroup
        });
        map23DControl.group({
            action:'cleanAll',
            guid:modValue.markerGroup
        });
        map23DControl.group({
            action:'cleanAll',
            guid:ONEMAP.M.routPlaceSearch.modValue.markerGroup
        });
        $("#roadViewList").empty();
        $("#slot-busWaysList").empty();

        $('#directionsStart').val('输入起点或地图上右键选点');
        modValue.startPoint = {latlng:null,name:''};

        $('#directionsStop').val('输入终点或地图上右键选点');
        modValue.stopPoint =  {latlng:null,name:''};

        modValue.amongMarkers = {};
        modValue.acrossPoints = {};
        modValue.avoidPoints = {};

        $('#abtnPrintLine, #d_fav, #abtnElevation').hide();
        $(".topBar .thtitle").show();
        $('#pointSearchResult').hide();
        $('#pointSearchResultWrap').empty();

        $("#roadViewListWrap").mCustomScrollbar("update");
        $("#pointSearchResult").mCustomScrollbar("update");        
    };
    /**
     * 清除地名查询列表
     * @return {[type]} [description]
     */
    function cleanPointSearch(){
        clearMarker();
        $('#pointSearchResult').hide()
        $('#pointSearchResultWrap').empty();
    };
    /**
     * 获取最终查询结果
     * @type {Function}
     */
    function getSearchResult(){
        if(modValue.startPoint.latlng && modValue.stopPoint.latlng && modValue.startPoint.name == $("#directionsStart").val() && modValue.stopPoint.name == $("#directionsStop").val()){
            cleanPointSearch();
            if(map23DData.display.map2D){
                map2DViewer.groups[modValue.brushGroup].clearLayers();
                map2DViewer.markers[modValue.roadMarker.start].addTo(map2DViewer.groups[modValue.brushGroup]);
                map2DViewer.markers[modValue.roadMarker.stop].addTo(map2DViewer.groups[modValue.brushGroup]);
                for(var item in modValue.amongMarkers){
                    modValue.amongMarkers[item].addTo(map2DViewer.groups[modValue.brushGroup]);
                }
            }else if(map23DData.display.map3D){
                /*map3DViewer.groups[modValue.brushGroup].clearLayers();
                map3DViewer.markers[modValue.roadMarker.start].addTo(map3DViewer.groups[modValue.brushGroup]);
                map3DViewer.markers[modValue.roadMarker.stop].addTo(map3DViewer.groups[modValue.brushGroup]);
                for(var item in modValue.amongMarkers){
                    amongMarkers[item].addTo(map3DViewer.groups[modValue.brushGroup]);
                }*/
            }
            setNotResultHtml('正在计算路径信息...');
            if(modValue.options.searchType === 'car'){ //行车查询
                var routeSearch = new routeSearchF();
                var via = [];
                var avoid = [];
                via.push([modValue.startPoint.latlng.lng,modValue.startPoint.latlng.lat]);
                for(var viaItem in modValue.acrossPoints){
                    if(modValue.acrossPoints.hasOwnProperty(viaItem)){
                        via.push([modValue.acrossPoints[viaItem].latlng.lng,modValue.acrossPoints[viaItem].latlng.lat]);
                    }
                }
                via.push([modValue.stopPoint.latlng.lng,modValue.stopPoint.latlng.lat]);
                for(var avoidItem in modValue.avoidPoints){
                    if(modValue.avoidPoints.hasOwnProperty(avoidItem)){
                        avoid.push([modValue.avoidPoints[avoidItem].latlng.lng,modValue.avoidPoints[avoidItem].latlng.lat]);
                    }
                }
                routeSearch.getNaviPath({viaAry:via,avoidAry:avoid},function(data){
                    data = data.data;
                    if(!data.hasOwnProperty('segmengList')){
                        setNotResultHtml('此线路无路径数据，无法规划路径！');
                        return false;
                    }
                    modValue.directionsDataResult = data;
                    drawCarPolyline({opacity:0.8,lineNum:0,color:'#0099ff',weight:6});
                    parseResultData();
                });
                if(map23DData.display.map2D){
                    map2DViewer.map.fitBounds(map2DViewer.groups[modValue.brushGroup].getBounds());
                }
            }
        }else if(modValue.startPoint.latlng === null) {
            setNotResultHtml('未查询到起点信息，请检查对应查询条件。');
        }else if(modValue.stopPoint.latlng === null){
            setNotResultHtml('未查询到终点信息，请检查对应查询条件。');
        }
    };
    /**
     * 在地图上画出驾车路线
     * @type {Function}
     * @param options {Object}
     * @private
     */
    function drawCarPolyline(options){
        $.each(map23DData.polylines,function(i,t){
            map23DControl.polyline({
                action: 'remove',
                guid: i
            })
        })
        var points = modValue.directionsDataResult.coors;
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
                temp = [temp[1],temp[0]];
                pointLatLng.push(temp);
            }
        };
        map23DControl.polyline({
            action: 'add',
            groupId: modValue.brushGroup,
            geojson: {
                "properties": {
                    color: '#fff',
                    weight: options.weight+3,
                    opacity: 1,
                    altitudeMode:0,
                },
                "geometry": {
                    "coordinates": pointLatLng
                }
            }
        }) 
        map23DControl.polyline({
            action: 'add',
            groupId: modValue.brushGroup,
            geojson: {
                "properties": {
                    color: options.color,
                    weight: options.weight,
                    opacity: options.opacity,
                    altitudeMode:0,
                },
                "geometry": {
                    "coordinates": pointLatLng
                }
            }
        }) 
    };
    /**
     * 解析数据 填充节点
     * @type {Function}
     * @private
     */
    function parseResultData(){
        var lineMeter = 0;
        $("#roadViewList").empty();
        if(modValue.options.searchType === 'car'){ //驾车类型
            for(var i= 0,l= modValue.directionsDataResult.segmengList.length;i<l;i++){
                var item = modValue.directionsDataResult.segmengList[i];
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
                var markerId = map23DControl.marker({
                    action: 'add',
                    groupId: modValue.markerGroup,
                    geojson: {
                        "properties": {
                            iconUrl: map23DConfig.map23DAssetsUrl + '/images/layout/ico_p_3-'+actionType+'.png',
                            iconSize: [16, 16],
                            iconAnchor: [8, 8],
                            popupAnchor: [0, -8]
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [item.coorAry[0], item.coorAry[1]]
                        }
                    }
                });
                map23DControl.marker({
                    action:'hide',
                    guid:markerId,
                })
                //if(map23DData.display.map2D){
                    map2DViewer.markers[markerId].bindPopup(item.textInfo+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',{
                        closeButton:false,
                        maxWidth:160,
                        minWidth:160
                    });
                    map2DViewer.markers[markerId].on("mouseover",function(){
                        this.openPopup();
                    });
                    map2DViewer.markers[markerId].isAdd = false;
                //}else if(map23DData.display.map3D){
                //}
                //L.olabel([item.coorAry[1],item.coorAry[0]],item.roadName).addTo(_this._brushGroup);
                li.bind("click",{m:markerId,info:item.textInfo},function(e){
                    //if(map23DData.display.map2D){
                        map23DControl.marker({
                            action:'show',
                            guid:e.data.m,
                        })
                        map2DViewer.markers[e.data.m].openPopup();
                    //}else if(map23DData.display.map3D){
                        map3DViewer.label({
                            action:'update',
                            guid:e.data.m,
                            featureType:'marker',
                            label:{
                                text:e.data.info, //标牌内容
                                textColor:'#ffffff', //标牌文字颜色
                                lineColor:'#ff0000', //标牌引线及边框颜色
                                background:'#FF0000', //标牌背景颜色
                                lineTop:10, //标牌偏移值
                                lineLeft:100 //标牌偏移值
                            }
                        })
                    //}
                    $("#roadViewList .cur").removeClass('cur');
                    $(this).addClass('cur');
                    map23DControl.setView({
                        center:{
                            lat:map2DViewer.markers[e.data.m].getLatLng().lat,
                            lng:map2DViewer.markers[e.data.m].getLatLng().lng
                        },
                        zoom:map23DData.view.zoom
                    })
                });
            }

            $("#roadViewList").prepend('<li style="text-align:center; font-size:14px;">总行驶里程: '+lineMeter/1000+'公里</li><hr/>');

            $('#abtnPrintLine').show();
            //收藏事件
            $('#d_fav').show();

            if(!/msie/.test(navigator.userAgent.toLowerCase()) || $.support.leadingWhitespace){
                //剖面量算
                //$('#abtnElevation').show();
                //$(".topBar .thtitle").hide();
            } 
        }
    };
    /**
     * 无结果列表
     * @type {Function}
     * @param notText {String} 无结果提示信息
     * @returns {*}
     * @private
     */
    function setNotResultHtml(notText){
    	$('#roadViewList').empty().append('<p class="not-result">'+notText+'</p>');
    };
    /**
     * 获取起点，终点信息  通过输入框的地名和 起始点的地名匹配判断是否相同 来确定是否进行地名查询
     * pointSearchResult
     * @return {[type]} [description]
     */
    function getStartAndStop(){
    	$('#pointSearchResultWrap').empty();
    	modValue.resultHtml='';
    	modValue.pointSearchType = 0;
    	if(modValue.startPoint.name != $("#directionsStart").val() && $('#directionsStart').val() != '' && $('#directionsStart').val() != '输入起点或地图上右键选点'){
    	    //起点展开
    	    modValue.pointSearchType = 1;
    	    buildSearch('start');
    	};
    	if(modValue.stopPoint.name != $("#directionsStop").val() && $('#directionsStop').val() != '' && $('#directionsStop').val() != '输入终点或地图上右键选点'){
    	    //如果不需查询起点的时候设置终点展开
    	    if(modValue.pointSearchType == 0){
    	        modValue.pointSearchType = 2;
    	    }
    	    buildSearch('stop');
    	}
    	setPlaceResultHtml();
    };
    /**
     * 构建查询结果 起始点顺序开始
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    function buildSearch(type){
    	switch(type){
    		case 'start':
    			modValue.resultHtml += '<div id="directionsStartSearch">'+
                    '<div class="header"><h3>查询起点</h3></div>'+
                    '<div class="d-waypoints" id="dStartResult"></div>'+
                    '</div>';
            break;
            case 'stop':
            	modValue.resultHtml += '<div id="directionsStopSearch">'+
            		'<div class="header"><h3>查询终点</h3></div>'+
            		'<div class="d-waypoints" id="dStopResult"></div>'+
            		'</div>';
            break;
    	}
    };
    /**
     * 填充侧栏html列表
     * @type {Function}
     * @returns {*}
     * @private
     */
    function setPlaceResultHtml(){
    	$('#pointSearchResultWrap').empty().append(modValue.resultHtml);
		$('#pointSearchResult').show();
		//判断查询状态，设置展开
		if(modValue.pointSearchType == 1){
		    $('#directionsStartSearch').addClass('open');
		}else if(modValue.pointSearchType == 2){
		    $('#directionsStopSearch').addClass('open');
		}else {
		    return false;
		}
		//绑定事件
		$('#directionsStartSearch .header').bind('click',function(){
		    if(modValue.pointSearchType == 2){                    
		        $('#pointSearchResult .open').removeClass('open');
		        $('#directionsStartSearch').addClass('open');
		        $('#dStopResult').empty();
		    }
		    modValue.pointSearchType = 1;
		    ONEMAP.M.routPlaceSearch.pointSearch({'keyWord':$("#directionsStart").val()});
		});

		$('#directionsStopSearch .header').bind('click',function(){
		    if(modValue.pointSearchType == 1){
		        $('#pointSearchResult .open').removeClass('open');
		        $('#directionsStopSearch').addClass('open');
		        $('#dStartResult').empty();
		    }
		    modValue.pointSearchType = 2;
		    ONEMAP.M.routPlaceSearch.pointSearch({'keyWord':$("#directionsStop").val()});
		});

		if(modValue.pointSearchType == 1){
		    ONEMAP.M.routPlaceSearch.pointSearch({'keyWord':$("#directionsStart").val()});
		}

		if(modValue.pointSearchType == 2){
		    ONEMAP.M.routPlaceSearch.pointSearch({'keyWord':$("#directionsStop").val()});
		}      
    };
    /**
     * 在地图上描绘点
     * @type {Function}
     * @param options {Object} {type , latLng}
     * @private
     */
    function setMarkers(options){
        if(options.latLng.length !=2){
            var latlng = [];
            latlng[0] = options.latLng.lng;
            latlng[1] = options.latLng.lat;
        }else{
            var latlng = [];
            latlng[0] = options.latLng[0];
            latlng[1] = options.latLng[1];
        }
        switch (options.type){
            case 'start':
                if(modValue.roadMarker.start){
                    map23DControl.marker({
                        action: 'remove',
                        guid: modValue.roadMarker.start
                    })
                }
                modValue.roadMarker.start = map23DControl.marker({
                            action:'add', 
                            groupId:modValue.brushGroup,
                            geojson:{
                                "type": "Feature",
                                "properties": {
                                    iconUrl: map23DConfig.map23DAssetsUrl+'/images/layout/ico_p_2.png',
                                    iconSize: [25,25],
                                    iconAnchor: [12, 24],
                                    popupAnchor:[0,-25],
                                    altitudeMode:1,
                                    draggable:true
                                },
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [latlng[0],latlng[1]]
                                }
                            }
                        })
                if(map23DData.display.map2D){
                    map2DViewer.markers[modValue.roadMarker.start].on('dragend',function(){
                        setStartPoint(this._latlng);
                    });
                }
                break;

            case 'across':
                var acrossMarker = map23DControl.marker({
                            action:'add', 
                            groupId:modValue.brushGroup,
                            geojson:{
                                "type": "Feature",
                                "properties": {
                                    iconUrl: map23DConfig.map23DAssetsUrl+'/images/layout/ico_p_4.png',
                                    iconSize: [25,25],
                                    iconAnchor: [12, 24],
                                    popupAnchor:[0,-25],
                                    altitudeMode:1,
                                    draggable:true
                                    },
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [latlng[0],latlng[1]]
                                }
                            }
                        })
                return acrossMarker;
                break;

            case 'avoid':
                var avoidMarker = map23DControl.marker({
                            action:'add', 
                            groupId:modValue.brushGroup,
                            geojson:{
                                "type": "Feature",
                                "properties": {
                                    iconUrl: map23DConfig.map23DAssetsUrl+'/images/layout/ico_p_5.png',
                                    iconSize: [25,25],
                                    iconAnchor: [12, 24],
                                    popupAnchor:[0,-25],
                                    altitudeMode:1,
                                    draggable:true,
                                },
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [latlng[0],latlng[1]]
                                }
                            }
                        })
                return avoidMarker;
                break;
            case 'stop':
                if(modValue.roadMarker.stop){
                    map23DControl.marker({
                        action: 'remove',
                        guid: modValue.roadMarker.stop
                    })
                }
                modValue.roadMarker.stop = map23DControl.marker({
                            action:'add',
                            groupId:modValue.brushGroup,
                            geojson:{
                                "type": "Feature",
                                "properties": {
                                    iconUrl: map23DConfig.map23DAssetsUrl+'/images/layout/ico_p_1.png',
                                    iconSize: [25,25],
                                    iconAnchor: [12, 24],
                                    popupAnchor:[0,-25],
                                    altitudeMode:1,
                                },
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [latlng[0],latlng[1]]
                                }
                            }
                        })

                if(map23DData.display.map2D){
                    map2DViewer.markers[modValue.roadMarker.stop].on('dragend',function(){
                        setStopPoint(this._latlng);
                    });
                }
                break;
        }
    };
    /**
     * 设置起点坐标
     * @type {Function}
     * @param latLng  {Object}
     */
    function setStartPoint(latLng,name){
        if(!status.initialized){
            init();
        }
        if(latLng instanceof Array){
            modValue.startPoint.latlng = new L.LatLng(latLng[1],latLng[0]);
            latLng = new L.LatLng(latLng[1],latLng[0]);
        }else{
            modValue.startPoint.latlng = latLng;
        }
    
        var nLatlng = L.Util.formatHMS(latLng);
        setMarkers({type:'start',latLng:latLng});
        if(name){
            $("#directionsStart").val(name);
            modValue.startPoint.name = name;
            if(map23DData.display.map2D){
                map2DViewer.markers[modValue.roadMarker.start].bindPopup(name+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                    {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
            }
            getSearchResult();
        }else {
                ONEMAP.M.routPlaceSearch.getInfoByZoomLatLng(latLng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }
                    $("#directionsStart").val(data.address);
                    modValue.startPoint.name = data.address;
                    if(map23DData.display.map2D){
                        map2DViewer.markers[modValue.roadMarker.start].bindPopup(data.address+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                            {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                    }
                    //setMarkers();
                });
            }
    };
    /**
     * 添加途经点坐标
     * @type {Function}
     * @param latLng  {Object}
     */
    function setAcrossPoint(latLng,name){
        if(!status.initialized){
            init();
        }
        if(ONEMAP.T.getObjNameAry(modValue.acrossPoints).length == 5){
            alert('最多可添加 5 个途经点');
            return false;
        }
        if(latLng instanceof Array){
            latLng = new L.LatLng(latLng[1],latLng[0]);
        }
        var acrossPoint = {
                name:'未知地点',
                latlng:latLng
            }
        var acrossMarkerId = setMarkers({type:'across',latLng:latLng});
        if(map23DData.display.map2D){
            var pointId = acrossMarkerId;
            modValue.amongMarkers[pointId] = map2DViewer.markers[acrossMarkerId];
            modValue.acrossPoints[pointId] = acrossPoint;
            modValue.amongMarkers[pointId].on('dragend',function(){
                modValue.acrossPoints[pointId].latlng = this._latlng;
                //去更新popup
                ONEMAP.M.routPlaceSearch.getInfoByZoomLatLng(modValue.acrossPoints[pointId].latlng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }   
                    modValue.acrossPoints[pointId].name=data.address;
                    var nLatlng = L.Util.formatHMS(modValue.acrossPoints[pointId].latlng);
                    
                    modValue.amongMarkers[pointId].bindPopup(data.address+'<a style="float:right" href="javascript:ONEMAP.M.toolRouteSearch.delAcrossPoint(\''+pointId+'\');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();                
                });
                getSearchResult();
            });
            if(name){
                modValue.acrossPoints[pointId].name=name;
                    var nLatlng = L.Util.formatHMS(latLng);                    
                    modValue.amongMarkers[pointId].bindPopup(name+'<a style="float:right" href="javascript:ONEMAP.M.toolRouteSearch.delAcrossPoint(\''+pointId+'\');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                    getSearchResult();
            }else {
                ONEMAP.M.routPlaceSearch.getInfoByZoomLatLng(latLng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }   
                    modValue.acrossPoints[pointId].name=data.address;
                    var nLatlng = L.Util.formatHMS(latLng);
                    
                    modValue.amongMarkers[pointId].bindPopup(data.address+'<a style="float:right" href="javascript:ONEMAP.M.toolRouteSearch.delAcrossPoint(\''+pointId+'\');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();     
                    getSearchResult();           
                });
            }
        }
    };
    /**
     * 移除途经点
     * @param  {[type]} pointId [description]
     * @return {[type]}         [description]
     */
    function delAcrossPoint(pointId){
        map23DControl.marker({
            action: 'remove',
            guid: pointId
        });
        delete modValue.amongMarkers[pointId];
        delete modValue.acrossPoints[pointId];
        getSearchResult();
    };
    /**
     * 添加规避点坐标
     * @type {Function}
     * @param latLng  {Object}
     */
    function setAvoidPoint(latLng,name){
        if(!status.initialized){
            init();
        }
        if(ONEMAP.T.getObjNameAry(modValue.avoidPoints).length == 5){
            alert('最多可添加 5 个规避点');
            return false;
        }
        if(latLng instanceof Array){
            latLng = new L.LatLng(latLng[1],latLng[0]);
        }
        var avoidPoint = {
                    name:'未知地点',
                    latlng:latLng
                };
        var avoidMarkerId = setMarkers({type:'avoid',latLng:latLng});
        var pointId = avoidMarkerId;
        if(map23DData.display.map2D){
            modValue.amongMarkers[pointId] = map2DViewer.markers[pointId];
            modValue.avoidPoints[pointId] = avoidPoint;
            modValue.amongMarkers[pointId].on('dragend',function(){
                modValue.avoidPoints[pointId].latlng = this._latlng;
                //去更新popup
                ONEMAP.M.routPlaceSearch.getInfoByZoomLatLng(modValue.avoidPoints[pointId].latlng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }   
                    modValue.avoidPoints[pointId].name=data.address;
                    var nLatlng = L.Util.formatHMS(modValue.avoidPoints[pointId].latlng);
                    
                    modValue.amongMarkers[pointId].bindPopup(data.address+'<a style="float:right" href="javascript:ONEMAP.M.toolRouteSearch.delAvoidPoint(\''+pointId+'\');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();                
                });
                getSearchResult();
            });

            if(name){
                modValue.avoidPoints[pointId].name=name;                
                var nLatlng = L.Util.formatHMS(latLng);                
                modValue.amongMarkers[pointId].bindPopup(name+'<a style="float:right" href="javascript:ONEMAP.M.toolRouteSearch.delAvoidPoint(\''+pointId+'\');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                    {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                getSearchResult();
            }else {
                ONEMAP.M.routPlaceSearch.getInfoByZoomLatLng(latLng,function(data){
                    if(!data.address){
                        data.address = '未知地点';
                    }
                    modValue.avoidPoints[pointId].name=data.address;                
                    var nLatlng = L.Util.formatHMS(latLng);                
                    modValue.amongMarkers[pointId].bindPopup(data.address+'<a style="float:right" href="javascript:ONEMAP.M.toolRouteSearch.delAvoidPoint(\''+pointId+'\');">移除</a><br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                        {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                    getSearchResult();
                });
            }
        }
    };
    /**
     * 移除规避点
     * @param  {[type]} pointId [description]
     * @return {[type]}         [description]
     */
    function delAvoidPoint(pointId){
        map23DControl.marker({
            action: 'remove',
            guid: pointId
        });
        delete modValue.amongMarkers[pointId];
        delete modValue.avoidPoints[pointId];
        getSearchResult();
    };
    /**
    * 设置终点坐标
    * @type {Function}
    * @param latLng {Object}
    */
   function setStopPoint(latLng,name){
        if(!status.initialized){
            init();
        }
        if(latLng instanceof Array){
            modValue.stopPoint.latlng = new L.LatLng(latLng[1],latLng[0]);
            latLng = new L.LatLng(latLng[1],latLng[0]);
        }else{
            modValue.stopPoint.latlng = latLng;
        }
        
        var nLatlng = L.Util.formatHMS(latLng);
        setMarkers({type:'stop',latLng:latLng});
        if(name){
            $("#directionsStop").val(name);
            modValue.stopPoint.name = name;
            if(map23DData.display.map2D){
                map2DViewer.markers[modValue.roadMarker.stop].bindPopup(name+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
            }
            getSearchResult();
        }else {
            ONEMAP.M.routPlaceSearch.getInfoByZoomLatLng(latLng,function(data){
                if(!data.address){
                    data.address = '未知地点';
                }
                $("#directionsStop").val(data.address);
                modValue.stopPoint.name = data.address;
                if(map23DData.display.map2D){
                    map2DViewer.markers[modValue.roadMarker.stop].bindPopup(data.address+'<br/><span style="font-size:12px; color:#fff">('+nLatlng.lng+' , '+nLatlng.lat+')</span>',
                    {closeButton:false,autoPan:false,maxWidth:160,minWidth:160}).openPopup();
                }
                getSearchResult();
            });
        }
   };
    function bindEvent(){
    	//清除路径
    	$('#d_clear a').bind('click',function(){
    	    cleanDirections();
    	});
    	//收藏
    	$('#d_fav a').unbind('click').bind('click',function(){
            var acrossPointsAry = [];
            for(var across in modValue.acrossPoints){
                //if(modValue.acrossPoints.hasOwnProperty(across)){
                    acrossPointsAry.push([modValue.acrossPoints[across].latlng.lng,modValue.acrossPoints[across].latlng.lat]);
                //}
            }
            var avoidPointsAry = [];
            for(var avoid in modValue.avoidPoints){
                //if(modValue.avoidPoints.hasOwnProperty(avoid)){
                    avoidPointsAry.push([modValue.avoidPoints[avoid].latlng.lng,modValue.avoidPoints[avoid].latlng.lat]);
                //}
            }
    	    var objData = {
               name: $('#directionsStart').val() + ' 至 '+$('#directionsStop').val(),
               startpoint_lat : modValue.startPoint.latlng.lat,
               startpoint_lon : modValue.startPoint.latlng.lng,
               stoppoint_lat : modValue.stopPoint.latlng.lat,
               stoppoint_lon : modValue.stopPoint.latlng.lng,
               acrossPoints : JSON.stringify(acrossPointsAry),
               avoidPoints : JSON.stringify(avoidPointsAry)
               //acrossPoints : acrossPointsAry,
               //avoidPoints :avoidPointsAry
            };
            require(['modDir/user/userRoute'],function(userRoute){
                userRoute.addRoute(objData);
            })
    	}); 
        $('#directionsStart').bind('focus',function(){
            $(this).val('');
        });

        $('#directionsStop').bind('focus',function(){
            $(this).val('');
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
    	    if(modValue.startPoint.latlng && modValue.stopPoint.latlng && modValue.startPoint.name == $('#directionsStart').val() && modValue.stopPoint.name == $('#directionsStop').val()){
    	        getSearchResult();
    	    }else if($.trim($('#directionsStart').val()) != '' && $('#directionsStart').val() != '输入起点或地图上右键选点' && $.trim($('#directionsStop').val()) != '' && $('#directionsStop').val() != '输入终点或地图上右键选点') {
    	        if((/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s\"]/g).test($("#directionsStart").val())){
    	            setNotResultHtml('起点只能包含英文、数字、中文');
    	            return false;
    	        } 
    	        if($.trim($("#directionsStart").val()).length < 2){
    	            setNotResultHtml('起点不允许输入单字符');
    	            return false;
    	        }      
    	        
    	        if((/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s\"]/g).test($("#directionsStop").val())){
    	            setNotResultHtml('终点只能包含英文、数字、中文');
    	            return false;
    	        }
    	        if($.trim($("#directionsStop").val()).length < 2){
    	            setNotResultHtml('终点不允许输入单字符');
    	            return false;
    	        }                           
    	        getStartAndStop();
    	    }else if($.trim($('#directionsStart').val()) == '' || $('#directionsStart').val() == '输入起点或地图上右键选点'){
    	        setNotResultHtml('起点不能为空，请检查对应查询条件。');
    	        return false;
    	    }else if($.trim($('#directionsStop').val()) == '' || $('#directionsStop').val() == '输入终点或地图上右键选点'){
    	        setNotResultHtml('终点不能为空，请检查对应查询条件。');
    	        return false;
    	    }  
    	    
    	});    
    	

    	//打印事件
    	//$('#abtnPrintLine').bind('click',function(){
    	//    
    	//});
    	////剖面量算事件 ,'d3/d3.v3.min'
    	//$('#abtnElevation').bind('click',function(){
    	//    
    	//});
    };
    return ONEMAP.M.toolRouteSearch = {
    	init:init,
        clearMarker:clearMarker,
        modValue:modValue,
        setStartPoint:setStartPoint,
        setAcrossPoint:setAcrossPoint,
        delAcrossPoint:delAcrossPoint,
        setAvoidPoint:setAvoidPoint,
        delAvoidPoint:delAvoidPoint,
        setStopPoint:setStopPoint
    }
})