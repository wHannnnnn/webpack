/**
 * [ONEMAP.M.gcmsMarker]
 * @return {[object]}
 */
define(function(){
	/**
	 * 模块状态，用于存储模块的状态 例如：收起，关闭
	 * @type {Object}
	 */
	var status = {
		initialized:false//是否初始化
	};
	/**
	 * 模块数据 用于数据存储和外部调用
	 * @type {Object}
	 * 数据存放
	 */
	var modValue = {
		
	};
	/**
	 * gcms标记初始化、监听事件
	 */
	function init(){
		if(!status.initialized){
			subscribe();
		}
	};
	/**
	 * 监听事件
	 */
	function subscribe(){
		ONEMAP.C.publisher.subscribe(showMarker, 'gcmsArticleShowRemove');
	};
	/**
	 * 显示标记
	 */
	function showMarker(options){
		 if(ONEMAP.D.gcmsCurColumnModelData['show_coordinate'].length>0 && 
            el['record'].hasOwnProperty('map_center_lat') && 
            el['record'].hasOwnProperty('map_center_lon') &&
            el['record'].hasOwnProperty('map_center_zoom') &&
            el['record'].hasOwnProperty('map_center_style')){
			var markerData = ONEMAP.M.gcmsList.getMarkerObj()
			curMarkerId = markerData[el['id']];
			if(map23DData.display.map2D){
				map2DViewer.setView({
				    center:{
				        lat:el['record'].map_center_lat,
				        lng:el['record'].map_center_lng
				    },
				    zoom:el['record'].map_center_zoom
				});
			}else if(map23DData.display.map3D){
				map3DViewer.flyTo({
				    center:{
				        lat:el['record'].map_center_lat,
				        lng:el['record'].map_center_lng
				    }, 
				    zoom:el['record'].map_center_zoom,
				    heading:0,//摄像机平面角度 正北为0
				    tilt:0,//摄像机倾斜角
				});
			}
			if(el['prompt_html'].length>0){
                map2DViewer.markes[curMarkerId].showPoup();
            }
		}
	};
	


	return ONEMAP.M.gcmsMarker = {

	}
})