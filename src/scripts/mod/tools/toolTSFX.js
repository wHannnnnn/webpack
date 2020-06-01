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
	                        modName: 'toolTSFX'
	                    }, 'tools:active');
		    };
		    /**
		     * 注册监听事件
		     */
		    function subscribe(){
		    	ONEMAP.C.publisher.subscribe(remove,'tools:active');
		    	ONEMAP.C.publisher.subscribe(remove, 'change23D');
		    };
		    /**
		     * 通视分析加载或移除
		     */
		    function remove(options){
		    	if(options.modName != 'toolTSFX'){
		    		$(".tools-TSFX").removeClass('cur');
		    		removetoolTSFX();
		    	}else{
		    		if($(".tools-TSFX").hasClass('cur')){
		    			$(".tools-TSFX").removeClass('cur');
		    			removetoolTSFX();
		    		}else{
		    			$(".tools-TSFX").addClass('cur');
		    			addtoolTSFX();
		    		}
		    	}
		    }
		    /**
		     *移除通视分析
		     */
		    function removetoolTSFX(){
		    	locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
	            locaSpaceMap.Refresh();
		    };
		    /**
		     * 加载通视分析
		     */
		    function addtoolTSFX(){
		    	locaSpaceMap.Globe.Action=15;
                locaSpaceMap.Refresh();        //刷新显示
		    };


	return ONEMAP.M.toolTSFX = {
		init:init
	}
})