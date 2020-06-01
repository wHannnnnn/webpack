define(function(){

	var status = {
		initialized:false,
		firstAdd:true
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
	        modName:'toolMeasuringArea'
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
		map2DViewer.setAreaTool({
		    action:'clear'
		});
		status.firstAdd = true;
	};
	function remove(options){
		if(options.modName =='toolMeasuringArea'){
			if($('.tools-area').hasClass('cur')){
				//if(map23DData.display.map2D){
					map2DViewer.setAreaTool({
					    action:'remove',
					    offset:[150,50]
					});
				//}else if(map23DData.display.map3D){
					locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
					locaSpaceMap.Refresh();
				//}
				$('#toolsBar .tools-area').removeClass('cur');
			}else{
				//if(map23DData.display.map2D){
				if(status.firstAdd){
					map2DViewer.setAreaTool({
					    action:'add',
					    offset:[150,50]
					});
					status.firstAdd = false;
				}else{
					map2DViewer.setAreaTool({
					    action:'restart',
					    offset:[150,50]
					});
				}
					
				//}else if(map23DData.display.map3D){
					locaSpaceMap.Globe.Action=3;
					locaSpaceMap.Globe.RulerArea.SpaceMeasure = false;  // 量算模式为绘制贴地面方式
					locaSpaceMap.Globe.RulerArea.ValueMode = 1;  // 量算的面上显示的值是地表面积
					locaSpaceMap.Refresh();    
				//}
			    $('#toolsBar .tools-area').addClass('cur');
			}
		}else{
			if($('#toolsBar .tools-area').hasClass('cur')){
			    //if(map23DData.display.map2D){
			    	map2DViewer.setAreaTool({
			    	    action:'remove',
			    	    offset:[150,50]
			    	});
			    //}else if(map23DData.display.map3D){
			    if(options.modName != 'toolMeasuringDistance'){
			    	locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
			    	locaSpaceMap.Refresh();
			    }
			    	
			    //}
			    $('#toolsBar .tools-area').removeClass('cur');
			}
		}
	}
	return ONEMAP.M.toolMeasuringArea = {
		init:init
	}
})