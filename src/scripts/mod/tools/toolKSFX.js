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
	 * 可是分析初始化
	 */
	function init(){
		if(!status.initialized){
			subscribe();
			status.initialized = true;
		}
		ONEMAP.C.publisher.publish({
	                   modName: 'toolKSFX'
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
		if(options.modName != 'toolKSFX'){
			$(".tools-KSFX").removeClass('cur');
			removetoolKSFX();
		}else{
			if($(".tools-KSFX").hasClass('cur')){
				$(".tools-KSFX").removeClass('cur');
				removetoolKSFX();
			}else{
				$(".tools-KSFX").addClass('cur');
				addtoolKSFX();
			}
		}
	}
	/**
	 *移除通视分析
	 */
	function removetoolKSFX(){
		locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
	    locaSpaceMap.Refresh();
	    $('#coverHeight').hide();
	};
	/**
	 * 加载通视分析
	 */
	function addtoolKSFX(){
		$('#coverHeight').show();
		$('#coverHeight .cancel').unbind('click').bind('click',function(){
		    $('#coverHeight').hide();
		    $(".tools-KSFX").removeClass('cur');
			removetoolKSFX();                
		});
		$('#coverHeight .sure').unbind('click').bind('click',function(){
		    var height = parseInt($('#coverHeight .input').val());
		    if(height>0 && height<1000){
		        $('#coverHeight').hide(); 
		        locaSpaceMap.Globe.CenterHeightOfViewshedAnalysis = height;
                locaSpaceMap.Globe.Action=13;
                locaSpaceMap.Refresh();
                $(".tools-KSFX").removeClass('cur');
		    }else {
		        alert('请输入大于0小于1000的高度值');
		    }
		});
	};


	return ONEMAP.M.toolKSFX = {
		init:init
	}
})