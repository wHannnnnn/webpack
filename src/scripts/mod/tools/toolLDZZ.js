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
	                   modName: 'toolLDZZ'
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
		if(options.modName != 'toolLDZZ'){
			$(".tools-LDZZ").removeClass('cur');
			removetoolLDZZ();
		}else{
			if($(".tools-LDZZ").hasClass('cur')){
				$(".tools-LDZZ").removeClass('cur');
				removetoolLDZZ();
			}else{
				$(".tools-LDZZ").addClass('cur');
				addtoolLDZZ();
			}
		}
	}
	/**
	 *移除通视分析
	 */
	function removetoolLDZZ(){
		locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
	    locaSpaceMap.Refresh();
	    $('#coverHeight').hide();
	};
	/**
	 * 加载通视分析
	 */
	function addtoolLDZZ(){
		$('#coverHeight').show();
		$('#coverHeight .cancel').unbind('click').bind('click',function(){
		    $('#coverHeight').hide();
		    $(".tools-LDZZ").removeClass('cur');
			removetoolLDZZ();                
		});
		$('#coverHeight .sure').unbind('click').bind('click',function(){
		    var height = parseInt($('#coverHeight .input').val());
		    if(height>0 && height<1000){
		        $('#coverHeight').hide(); 
		        locaSpaceMap.Globe.CenterHeightOfViewEnvelopeAnalysis = height;
		        locaSpaceMap.Globe.Action=14;
		        locaSpaceMap.Refresh();
		        $(".tools-LDZZ").removeClass('cur');
		    }else {
		        alert('请输入大于0小于1000的高度值');
		    }
		});
	};


	return ONEMAP.M.toolTSFX = {
		init:init
	}
})