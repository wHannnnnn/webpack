/**
 * [ONEMAP.M.gcmsMapMarker]
 * @return {[object]}
 */
define(
function(){
    //参数
    var modValue = {
        options:{},
        markersGroup:null,
        markers:{},
    };
    //地图层
    //var _map = ONEMAP.M.mapHolder.map;

    /**
     * 模块初始化
     * @return {[type]} [description]
     */
    function init(options){
        remove();
        modValue.options = {};
        modValue.markers = {};
        for(var op in options){
            modValue.options[op] = options[op];
        }
        //注册监听
        subscribe();

        //是否聚合
        if(ONEMAP.D.gcmsCurColumnModelData['field_list'][options['field_name']]['marker_cluster']){
            modValue.markersGroup = map23DControl.group({
                                        action: 'add',
                                        clustering: true, //关键 开启聚合
                                        clusterOptions:{
                                            maxClusterRadius:120,//多少像素距离的点会聚合 默认小于120像素内的点会聚合
                                            polygonOptions: {weight: 1, opacity: 0.5}, //聚合范围面样式
                                            showCoverageOnHover: true, //是否显示聚合范围
                                            disableClusteringAtZoom: null, //设置到达指定缩放等级后禁用聚合
                                        }//2D聚合参数
                                    })
        }else {
            modValue.markersGroup = map23DControl.group({
                                        action: 'add'
                                    })
        }
        //modValue.markersGroup.addTo(_map);

        //获取内容数据
        getDetailData({callback:function(){
            showMarker();
        }}); 
               
    }

    function getDetailData(options){
        ONEMAP.V.loading.load();
        $.ajax({
            url: onemapUrlConfig.gcmsServiceUrl+'/show/'+modValue.options['column_name']+'/'+modValue.options['article_id']+'?ticket='+ONEMAP.D.user.ticket,
            type:"GET",
            dataType: 'json'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            if(data.code == 4){
                ONEMAP.T.noPermission('getDetailData');
            }
            if(data.code == 3){
                ONEMAP.T.logout('getDetailData');
            }
            ONEMAP.D.gcmsCurArticleData = data['data'];
            options.callback();
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        }); 
    }

    /**
     * 坐标反转
     * @param  {[type]} latlngsAry [description]
     * @return {[type]}            [description]
     */
    function latLngsToReverse(latlngsAry){
        var tempLatlngsAry = JSON.parse(JSON.stringify(latlngsAry));
        if(!$.isArray(tempLatlngsAry[0])){
            return tempLatlngsAry.reverse();
        }else {
            $(tempLatlngsAry).each(function(index, el) {
                tempLatlngsAry[index] = latLngsToReverse(el);
            });
        }

        return tempLatlngsAry;
    };

    function showMarker(){

        

        var mapMarkerData = JSON.parse(ONEMAP.D.gcmsCurArticleData['record'][modValue.options['field_name']]);
        if(mapMarkerData['features'].length>0){
            var marker;
            $(mapMarkerData['features']).each(function(index, el) {
                marker = map2DViewer.markers[buildMarker(el)];
            });
            if(mapMarkerData['features'].length == 1){
                map23DControl.setView({
                    center: {
                        lat: marker.getLatLng().lat,
                        lng: marker.getLatLng().lng
                    },
                    zoom: map23DData.view.zoom
                })
                marker.openPopup();
            }else {
                if(map23DData.display.map2D){
                    map2DViewer.fitBounds(map2DViewer.groups[modValue.markersGroup].getBounds());
                }
            }
            
        }else {
            ONEMAP.C.publisher.publish({ type: 'warning', message: '没有地图标记数据' }, 'noteBar::add');
        }        
    }

    function buildMarker(options){
        var markerId = map23DControl.marker({
                    action:'add',
                    groupId:modValue.markersGroup,
                    geojson:{
                        "type": "Feature",
                        "properties": {
                            iconUrl: onemapUrlConfig.gcmsServiceUrl+'/file'+options['properties']['style']['iconUrl'] || "",
                            iconSize: options['properties']['style']['iconSize'], 
                            iconAnchor: options['properties']['style']['iconAnchor'], 
                            popupAnchor: [0,-options['properties']['style']['iconAnchor'][1]],
                            altitude:0,
                            altitudeMode:1,
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": options['geometry']['coordinates']
                        }
                    }
                })       
        map2DViewer.markers[markerId].bindPopup(options['properties']['popupContent'],{title:options['properties']['name']});
        modValue.markers[markerId] = map2DViewer.markers[markerId];
        return markerId;
    }


    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe(){
        ONEMAP.C.publisher.subscribe(remove,'gcmsArticleShowRemove');
        ONEMAP.C.publisher.subscribe(remove, 'cleanMap');
    }
 
    /**
     * 取消监听
     * @type {Function}
     */
    function unSubscribe() {
        ONEMAP.C.publisher.unSubscribe(remove,'gcmsArticleShowRemove');
        ONEMAP.C.publisher.unSubscribe(remove, 'cleanMap');
    }

	/**
	 * 模块移除
	 * @return {[type]} [description]
	 */
	function remove(){
        map23DControl.group({
            action:'cleanAll',
            guid:modValue.markersGroup
        });
        map23DControl.group({
            action:'remove',
            guid:modValue.markersGroup
        })
		unSubscribe();
	}

    return ONEMAP.M.gcmsMapMarker = {
        init:init,
        remove:remove
    }
});

