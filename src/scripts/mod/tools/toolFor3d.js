/**
 * 三维侧栏功能
 */
define([
	'html!templates/tools/toolFor3d',
	'css!styles/tools/toolFor3d'
	],
function(tpcLayout){
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
     * 三维侧栏初始化设置
     */
    function init(){
    	if(!status.initialized){
    		setLayout();
    		bindEvent();
    		$(window).resize(function() {
    			resizeLayout();
    		});
    	}
    	ONEMAP.D.currentSideBarMod = 'toolsFor3d';
    	status.initialized = true;
    	var zIndex = ONEMAP.M.sideBar.getZIndex();
    	$("#toolsFor3d").css({zIndex:zIndex});
    };
    function setLayout(){
    	$(tpcLayout).appendTo($("#sideBarBody"));
        var mxListTemplate = Handlebars.compile($('#moxing-list-item-template').html());
        $('#model3DList').append(mxListTemplate(ONEMAP.D.globalSettingData.moxing)); 
    };
    function bindEvent(){

        $('#model3DList li input:checkbox').bind('change',function(e){
            if($(this).is(':checked')){
                var modelData = ONEMAP.D.globalSettingData.moxing[$(this).val()];
                modelData.indexNum = $(this).val();
                add3DModel(modelData);
            }else {
                var modelData = {
                    indexNum:$(this).val()
                }
                add3DModel(modelData);
            }
        });

        //清除路线
        $('#clearFlyLine').bind('click',function(){
            locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
            locaSpaceMap.Globe.MemoryLayer.RemoveAllFeature();
            locaSpaceMap.Refresh();         //刷新显示
        });
        //绘制路线
        $("#drawFlyLine").bind('click',function(){
            if($(this).hasClass('cur')){
                $(this).removeClass('cur');
                locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
                locaSpaceMap.Refresh();         //刷新显示
            }else {
                $('#toolsModal .modal-body .cur').removeClass('cur');
                $(this).addClass('cur');
                locaSpaceMap.Globe.Action = 10;
                locaSpaceMap.Refresh();         //刷新显示
            }
        })
        //选定路线
        $('#selectFlyLine').bind('click',function(){
            if($(this).hasClass('cur')){
                $(this).removeClass('cur');
                locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
                locaSpaceMap.Refresh();         //刷新显示
            }else {
                $('#toolsModal .modal-body .cur').removeClass('cur');
                $(this).addClass('cur');
                locaSpaceMap.Globe.Action = 5;
                locaSpaceMap.Refresh();         //刷新显示
            }
        });
        //沿线飞行
        $('#flyByLine').bind('click',function(){
            var features=locaSpaceMap.Globe.DestLayerFeatureAdd.GetAllFeatures();
            if(locaSpaceMap.Globe.SelectedObject){
                var flyAlongLineSpeed=parseInt($('#flyOptions').find('input[name="flySpeed"]').val())?parseInt($('#flyOptions').find('input[name="flySpeed"]').val()):0;
                var flyAlongLineHeight=parseInt($('#flyOptions').find('input[name="flyHeight"]').val())?parseInt($('#flyOptions').find('input[name="flyHeight"]').val()):0;
                var flyAlongLineElev=parseInt($('#flyOptions').find('input[name="flyElevation"]').val())?parseInt($('#flyOptions').find('input[name="flyElevation"]').val()):0;
                if(flyAlongLineSpeed<100 || flyAlongLineSpeed>100000){
                    alert('请输入大于100小于100000的速度值');
                    return false;
                }
                if(flyAlongLineHeight<300 || flyAlongLineHeight>100000){
                    alert('请输入大于300小于100000的高度值');
                    return false;
                }
                if(flyAlongLineElev<1 || flyAlongLineElev>90){
                    alert('请输入大于1小于90的仰角值');
                    return false;
                }

                //禁止倾斜
                locaSpaceMap.Globe.FlyAlongLineSpeed=flyAlongLineSpeed;
                locaSpaceMap.Globe.FlyEyeAlongWithLine1(locaSpaceMap.Globe.SelectedObject.Geometry, flyAlongLineHeight, flyAlongLineElev, true, 0 , true);
                locaSpaceMap.Globe.Action = 0;

                $('#drawFlyLine, #selectFlyLine, #flyByLine').hide();
                $('#flyStop , #flyGo').show();

            }else {
                alert('请绘制或选择路线!');
            }
        });

        $('#flyGo').bind('click',function(){
            locaSpaceMap.Globe.ContinueFly();
        });

        $('#flyStop').bind('click',function(){
            $('#drawFlyLine, #selectFlyLine, #flyByLine').show();
            $('#flyStop , #flyGo').hide();
            locaSpaceMap.Globe.StopFly();
        });
        //工具
        //清除工具
        $('#clearAllTools').bind('click',function(){
            locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
            locaSpaceMap.Globe.ClearMeasure(); //清理量算遗留下来的线
            locaSpaceMap.Globe.ClearAnalysis();//清除所有分析
            locaSpaceMap.Refresh();         //刷新显示
        });
        //雷达分析
        $('#toolLDZZ').bind('click',function(){
            if($(this).hasClass('cur')){
                $(this).removeClass('cur');
                locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
                locaSpaceMap.Refresh();         //刷新显示
            }else {
                $('#toolsModal .modal-body .cur').removeClass('cur');
                var maxHeight = $('#toolsFor3d').height() > $('#toolsFor3dWrap').height()?$('#toolsFor3d').height():$('#toolsFor3dWrap').height();
                $('#coverHeight').css({height:maxHeight});
                $('#coverHeight').show();
                status.veiwHeightType='toolLDZZ';
            }
        });
        //可视域分析
        $('#toolKSYFX').bind('click',function(){
            if($(this).hasClass('cur')){
                $(this).removeClass('cur');
                locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
                locaSpaceMap.Refresh();         //刷新显示
            }else {
                $('#toolsModal .modal-body .cur').removeClass('cur');
                var maxHeight = $('#toolsFor3d').height() > $('#toolsFor3dWrap').height()?$('#toolsFor3d').height():$('#toolsFor3dWrap').height();
                $('#coverHeight').css({height:maxHeight});
                $('#coverHeight').show();
                status.veiwHeightType='toolKSYFX';
            }
        });

        $('#coverHeight .cancel').bind('click',function(){
            $('#coverHeight').hide();                
        });

        $('#coverHeight .sure').bind('click',function(){
            var height = parseInt($('#coverHeight .input').val());
            if(height>0 && height<1000){
                $('#coverHeight').hide(); 
                switch(status.veiwHeightType){
                    case 'toolLDZZ':
                        locaSpaceMap.Globe.CenterHeightOfViewEnvelopeAnalysis = height;
                        locaSpaceMap.Globe.Action=14;
                        locaSpaceMap.Refresh();         //刷新显示
                    break;
                    case 'toolKSYFX':
                        locaSpaceMap.Globe.CenterHeightOfViewshedAnalysis = height;
                        locaSpaceMap.Globe.Action=13;
                        locaSpaceMap.Refresh();         //刷新显示
                    break;
                }
            }else {
                alert('请输入大于0小于1000的高度值');
            }
            
        });

        //通视分析
        $('#toolTTFX').bind('click',function(){
            if($(this).hasClass('cur')){
                $(this).removeClass('cur');
                locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
                locaSpaceMap.Refresh();         //刷新显示
            }else {
                $('#toolsModal .modal-body .cur').removeClass('cur');
                $(this).addClass('cur');
                locaSpaceMap.Globe.Action=15;
                locaSpaceMap.Refresh();         //刷新显示
            }
        });
        //高度测量
        $('#toolGDLS').bind('click',function(){
            if($(this).hasClass('cur')){
                $(this).removeClass('cur');
                locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
                locaSpaceMap.Refresh();         //刷新显示
            }else {
                $('#toolsModal .modal-body .cur').removeClass('cur');
                $(this).addClass('cur');
                locaSpaceMap.Globe.Action=4;
                locaSpaceMap.Globe.RulerHeight.SpaceMeasure = false;  // 量算模式绘制线的时候是从地表为起点向上绘制
                locaSpaceMap.Globe.RulerHeight.ValueMode = 1;  // 量算的线上显示的值是相对地表高度
                locaSpaceMap.Refresh();         //刷新显示
            }
        });
    };
    function resizeLayout(){
    };


    /**
    * 加载/移除3D模型
    * @return {[type]} [description]
    */
    function add3DModel(options){
        if(options.name){
            modValue['model'+options.indexNum] = locaSpace.AddLayer(options.modelUrl);
            locaSpace.FlyToPlace(options.center[1],options.center[0],options.height,0,0);
        }else {
            locaSpaceMap.Globe.Layers.RemoveLayerByID(modValue['model'+options.indexNum]['ID']);
        }
        locaSpaceMap.Refresh();
    };

	return ONEMAP.M.toolFor3d = {
		init:init
	}
})