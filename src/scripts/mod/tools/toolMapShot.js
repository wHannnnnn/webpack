/**
 * @fileoverview 工具 测量地图面积 模块
 * @author Song.Huang
 * @version 1.0.0
 */
define(['html!templates/tools/toolMapShot',
		'css!styles/tools/toolMapShot'],
function(tpcLayout){
	/**
	 * 状态值
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	var status ={
		initialized:false//是否初始化
	}
	/**
	 * 模块数据 用于数据存储和外部调用
	 * @type {Object}
	 * 数据存放
	 */
	var modValue ={
		udCapture:null
	}
	/**
	 * 初始化
	 * 监听事件
	 * @type {Function}
	 */
	function init(){
		if(!status.initialized){
			status.initialized = true;
			setLayout();
			bindEvent();
			subscribe();
		}
		ONEMAP.C.publisher.publish({
		    modName:'toolMapShot'
		},'tools:active');
	};
	function setLayout(){
		$('body').append(tpcLayout);
		$("#mapShotShow .mapShotShowBody").mCustomScrollbar({
            								    scrollInertia: 0
            								});
	};
	function bindEvent(){
		modValue.udCapture = new UdCapture({
		    OnCaptureCompleted: function (file, imgData) {
		        //alert(imgData);
		        if (imgData == "") {
		            var msg = "截图失败,请重试！"
		            return;
		        }
		        $('.tools-mapshot').removeClass('cur');
		        $('#mapShotShow .mapShotShowBody').html('<img src="data:image/png;base64,'+imgData+'"/>');
		        $("#mapShotShow .mapShotShowBody").mCustomScrollbar('update');
		        $("#mapShotShow").show();
		    },
		    OnCaptureCanceled:function(){
		    	$('.tools-mapshot').removeClass('cur');
		    },
		    onUploadCompleted:function(){
		    	$('.tools-mapshot').removeClass('cur');
		    }
		});
		$("#mapShotShow .mapShotShowHeader .closemapShot").bind('click',function(){
			$("#mapShotShow").hide();
		})
	};
	/**
	 * 注册监听
	 */
	 function subscribe(){
	 	ONEMAP.C.publisher.subscribe(remove, 'tools:active');
	 };
	/**
	 * 功能移除
	 */
	function remove(options){
		if(options.modName != 'toolMapShot'){
			$('.tools-mapshot').removeClass('cur')
		}else{
			if($('.tools-mapshot').hasClass('cur')){
				$('.tools-mapshot').removeClass('cur');
			}else{
				$('.tools-mapshot').addClass('cur');
				modValue.udCapture.StartCapture(true);
			}
		}
	};

return ONEMAP.M.toolMapShot = {
	init:init
}
});