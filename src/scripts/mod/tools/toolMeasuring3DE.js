define(function(){
		/**
	     * 状态值
	     * @type {Boolean}
	     * @default false
	     * @private
	     */
	    var status = {
	    	initialized:false,//是否初始化
	        veiwHeightType:null
	    };
	    /**
	     * 模块数据 用于数据存储和外部调用
	     * @type {Object}
	     * 数据存放
	     */
	    var modValue = {
	    	
	    };
	    /**
	     * 三维高度测量初始化
	     */
	    function init(){
	    	if(!status.initialized){
	    		subscribe();
	    		status.initialized = true;
	    	}
	    	ONEMAP.C.publisher.publish({
                        modName: 'toolMeasuring3DE'
                    }, 'tools:active');
	    };
	    /**
	     * 注册监听事件
	     */
	    function subscribe(){
	    	ONEMAP.C.publisher.subscribe(remove,'tools:active');
	    };
	    /**
	     * 三维高度测量加载或移除
	     */
	    function remove(options){
	    	if(options.modName != 'toolMeasuring3DE'){
	    		$(".tools-measuring3DE").removeClass('cur');
	    		removeMeasuring3DE();
	    	}else{
	    		if($(".tools-measuring3DE").hasClass('cur')){
	    			$(".tools-measuring3DE").removeClass('cur');
	    			removeMeasuring3DE();
	    		}else{
	    			$(".tools-measuring3DE").addClass('cur');
	    			addMeasuring3DE();
	    		}
	    	}
	    }
	    /**
	     * 移除测量功能
	     */
	    function removeMeasuring3DE(){
	    	locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
            locaSpaceMap.Refresh();
	    };
	    /**
	     * 加载测量动能
	     */
	    function addMeasuring3DE(){
	    	locaSpaceMap.Globe.Action=4;
	    	locaSpaceMap.Globe.RulerHeight.SpaceMeasure = false;  // 量算模式绘制线的时候是从地表为起点向上绘制
	    	locaSpaceMap.Globe.RulerHeight.ValueMode = 1;  // 量算的线上显示的值是相对地表高度
	    	locaSpaceMap.Refresh();         //刷新显示
	    };

	return ONEMAP.M.toolMeasuring3DE = {
		init:init
	}
})