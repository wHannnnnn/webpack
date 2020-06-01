/**
 * [ONEMAP.M.gcmsMapDraw]
 * @return {[object]}
 */
define(function(){
    //数据存放和外部调用
    var modValue = {
        options:{},
        mapDrawGroup:null,
    };
    
    //地图层
    //var _map = ONEMAP.M.mapHolder.map;


    /**
     * 模块初始化
     * @return {[type]} [description]
     */
    function init(options){
        remove();
        modValue.mapDrawGroup = map23DControl.group({
                                    action: 'add'
                                });
        modValue.options = {};
        for(var op in options){
            modValue.options[op] = options[op];
        }

        //订阅推送
        subscribe();
        //modValue.mapDrawGroup.addTo(_map);

        //获取内容数据
        getDetailData({callback:function(){
            showDrawLayer();
        }}); 
        
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
     * 显示标绘内容
     * @return {[type]} [description]
     */
	function showDrawLayer(){
        var mapDrawData = JSON.parse(ONEMAP.D.gcmsCurArticleData['record'][modValue.options['field_name']]);
        if(mapDrawData['features'].length>0){
            $(mapDrawData['features']).each(function(index, el) {
                switch(el['properties']['type']){
                    case 'Point'://点
                        buildMarker(el);
                    break;
                    case 'LineString'://线
                        buildPolyline(el);
                    break;
                    case 'Polygon'://面
                        buildPolygon(el);
                    break;
                    case 'Text'://文本
                        //buildPolyText(el).addTo(map2DViewer.groups[modValue.mapDrawGroup]);
                        //buildPolyText(el);
                    break;
                    case 'Circle'://圆
                        buildPolyCircle(el);
                    break;
                }
            });

            map2DViewer.map.fitBounds(map2DViewer.groups[modValue.mapDrawGroup].getBounds());
                        
        }else {
            ONEMAP.C.publisher.publish({ type: 'warning', message: '没有标绘数据' }, 'noteBar::add');
        }
    }

    function buildPolyCircle(options){

        if(!options['properties']['style']){
            _.merge(options['properties'],{
                style:{
                    color:'#0033ff',
                    weight:5,
                    opacity:0.5,
                    fillColor:'#0033ff',
                    fillOpacity:0.2
                }
            })
        }
        map23DControl.circle({
            action: 'add',
            groupId: modValue.mapDrawGroup,
            geojson: {
                "properties": {
                    altitudeMode:0,
                    color: options['properties']['style'].color,
                    weight: options['properties']['style'].weight,
                    opacity: options['properties']['style'].opacity,
                    radius:options['properties']['radius']||0,
                    fillColor:options['properties']['style'].fillColor,
                    fillOpacity:options['properties']['style'].fillOpacity,
                },
                "geometry": {
                    "coordinates": options['geometry']['coordinates'][0][0]
                }
            }
        })
    }

    function buildPolyline(options){
        if(!options['properties']['style']){
            _.merge(options['properties'],{
                style:{
                    color:'#0033ff',
                    weight:5,
                    opacity:0.5
                }
            })
        }
        map23DControl.polyline({
            action: 'add',
            groupId: modValue.mapDrawGroup,
            geojson: {
                "properties": {
                    altitudeMode:0,
                    color: options['properties']['style'].color,
                    weight: options['properties']['style'].weight,
                    opacity: options['properties']['style'].opacity,
                },
                "geometry": {
                    "coordinates": options['geometry']['coordinates']
                }
            }
        })
    }

    function buildPolygon(options){
        if(!options['properties']['style']){
           _.merge(options['properties'],{
               style:{
                   color:'#0033ff',
                   weight:5,
                   opacity:0.5,
                   fillColor:'#0033ff',
                   fillOpacity:0.2,
                   stroke:true
               }
           })
       }
        map23DControl.polygon({
            action: 'add',
            groupId: modValue.mapDrawGroup,
            geojson: {
                "properties": {
                    altitudeMode:0,
                    color: options['properties']['style'].color,
                    weight: options['properties']['style'].weight,
                    opacity: options['properties']['style'].opacity,
                    fillColor:options['properties']['style'].fillColor,
                    fillOpacity:options['properties']['style'].fillOpacity,
                    stroke:options['properties']['style'].stroke
                },
                "geometry": {
                    "coordinates": options['geometry']['coordinates']
                }
            }
        })
    }

    function buildPolyText(options){
        var textInput = L.DomUtil.create('textarea');
        textInput.className = 'draw-label-textarea';
        textInput.style.fontSize = options['properties']['fontSize']+'px';
        textInput.style.color = options['properties']['fontColor'];
        textInput.setAttribute('wrap','wrap');
        textInput.value = options['properties']['text'];
        //输入框
        var label = new L.Plabel(latLngsToReverse(options['geometry']['coordinates']),textInput,{
            offset: [-5, -10],
            opacity: 1,
            className:'draw-label'
        });
        return label;
    }

    function buildMarker(options){
       map23DControl.marker({
           action: 'add',
           groupId: modValue.mapDrawGroup,
           geojson: { 
               "properties": {
                   altitudeMode:0,
                   iconUrl: options['properties']['style']['iconUrl'],
                   iconSize: options['properties']['style']['iconSize'],
                   iconAnchor: options['properties']['style']['iconAnchor'],
                   popupAnchor: [0,-options['properties']['style']['iconAnchor'][1]]
               },
               "geometry": {
                   "coordinates": options['geometry']['coordinates']
               }
           }
       })
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
    function unSubscribe() {}

	/**
	 * 模块移除
	 * @return {[type]} [description]
	 */
	function remove(){
        map23DControl.group({
            action: 'cleanAll',
            guid: modValue.mapDrawGroup
        })
        map23DControl.group({
            action: 'remove',
            guid: modValue.mapDrawGroup
        })
		unSubscribe();
	}

    return ONEMAP.M.gcmsMapDraw = {
        init:init,
        remove:remove
    }
});

