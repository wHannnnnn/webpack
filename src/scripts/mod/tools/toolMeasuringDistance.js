define(function(){

	var status = {
		initialized:false,
		firstAddMeasuring:true
	};
	/**
	 * 初始化并订阅事件
	 * @return {[type]} [description]
	 */
	function init(){
		if(!status.initialized){
			subscribe();
			status.initialized = true
		}
	    ONEMAP.C.publisher.publish({
	        modName:'toolMeasuringDistance'
	    },'tools:active');

	}
	/**
	 * 注册订阅
	 * @type {Function}
	 * 推送：ONEMAP.C.publisher.publish(options,'moduleName::type');
	 * 订阅：ONEMAP.C.publisher.subscribe(layoutResize,'sideBarLayoutChange');
	 */
	function subscribe(){
		ONEMAP.C.publisher.subscribe(remove, 'tools:active');
		ONEMAP.C.publisher.subscribe(clearMeasuring,'cleanMap');
	}
	function clearMeasuring(){
		map2DViewer.setDistanceTool({
		    action:'clear'
		});
		status.firstAddMeasuring = true;
	};
	function remove(options){
		if(options.modName =='toolMeasuringDistance'){
			if($('#toolsBar .tools-distance').hasClass('cur')){
			    //if(map23DData.display.map2D){
			    	map2DViewer.setDistanceTool({
			    	    action:'remove',
			    	    offset:[150,50]
			    	});
			    //}else if(map23DData.display.map3D){
			    	locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
			    	locaSpaceMap.Refresh(); 
			    //}
				$('#toolsBar .tools-distance').removeClass('cur');
			}else {
				//if(map23DData.display.map2D){
				if(status.firstAddMeasuring){
					map2DViewer.setDistanceTool({
					    action:'add',
					    offset:[150,50]
					});
					status.firstAddMeasuring = false;
				}else{
					map2DViewer.setDistanceTool({
					    action:'restart',
					    offset:[150,50]
					});
				}
					
				//}else if(map23DData.display.map3D){
					locaSpaceMap.Globe.Action=2;
					locaSpaceMap.Globe.RulerDistance.MeasureMode = 0;  // 量算模式为贴地折线方式
					locaSpaceMap.Globe.RulerDistance.ValueMode = 1;  // 量算的线上显示的值是地表距离
					locaSpaceMap.Refresh();  
				//}
			    $('#toolsBar .tools-distance').addClass('cur');
			}
		}else{
			if($('#toolsBar .tools-distance').hasClass('cur')){
			    //if(map23DData.display.map2D){
			    	map2DViewer.setDistanceTool({
			    	    action:'remove',
			    	    offset:[150,50]
			    	});
			    //}else if(map23DData.display.map3D){
			    if(options.modName !='toolMeasuringArea'){
			    	locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
			    	locaSpaceMap.Refresh(); 
			    }
			    //}
				$('#toolsBar .tools-distance').removeClass('cur');
			}
		}
	}
	return ONEMAP.M.toolMeasuringDistance = {
		init:init
	}
})