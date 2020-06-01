/**
 * [ONEMAP.M.toolsBar]
 * @return {[object]}
 */
define([ 
	'html!templates/toolsBar',
    'css!styles/toolsBar'
],function(tplLayout){
        function init(){
            setLayout();
            //工具栏事件绑定
            bingEvents();
    	};
        function setLayout(){
            $(tplLayout).appendTo($("#toolsBar .cover-content"));
        };
        function bingEvents(){
            //全局搜索
            $(".tools-search").unbind('click').bind("click",function(){
               require(['modDir/tools/toolPlaceSearch'], function(toolPlaceSearch) {
                           toolPlaceSearch.changSearchType('pac');
                           toolPlaceSearch.init();
                       });
            });
            //视野内搜索
            $(".tools-serchView").unbind('click').bind('click',function(){
                require(['modDir/tools/toolPlaceSearch'], function(toolPlaceSearch) {
                           toolPlaceSearch.changSearchType('bounds');
                           toolPlaceSearch.init();
                       });
            });
            
            //路径规划
            $(".tools-routgh").unbind('click').bind("click",function(){
                require(['modDir/tools/toolRouteSearch'], function(toolRouteSearch) {
                            toolRouteSearch.init();
                        });
            });
            //标注工具
            $(".tools-marker").unbind('click').bind('click',function(){
                require(['modDir/tools/toolMarkPoint'], function(toolMarkPoint) {
                            toolMarkPoint.init();
                        });
            });
            //测距工具
            $('.tools-distance').unbind('click').bind('click',function(){
                require(['modDir/tools/toolMeasuringDistance'], function(toolMeasuringDistance) {
                            toolMeasuringDistance.init();
                        });
            });
            //测面工具
            $(".tools-area").unbind('click').bind('click',function(){
                require(['modDir/tools/toolMeasuringArea'], function(toolMeasuringArea) {
                            toolMeasuringArea.init();
                        });
            });
            //标绘工具
            $(".tools-painting").unbind('click').bind('click',function(){
                require(['modDir/tools/toolDraw'], function(toolDraw) {
                            toolDraw.init();
                        });
            });
            //剖面量算
            $(".tools-elevation").unbind('click').bind('click',function(){
                require(['modDir/tools/toolElevation'], function(toolElevation) {
                            toolElevation.init();
                        });
            });
            //定位
            $(".tools-toolJumpToLatlng").unbind('click').bind('click',function(){
                require(['modDir/tools/toolJumpToLatlng'], function(toolJumpToLatlng) {
                            toolJumpToLatlng.init();
                        });
            })
            //截屏
            $(".tools-mapshot").unbind('click').bind('click',function(){
                require(['modDir/tools/toolMapShot'], function(toolMapShot) {
                            toolMapShot.init();
                        });
            });
            //全屏
            $(".tools-fullscreen").unbind('click').bind('click',function(){
                require(['modDir/tools/toolFullScreen'], function(toolFullScreen) {
                            toolFullScreen.init();
                        });
            });
            //三维高度测量
            $(".tools-measuring3DE").unbind('click').bind('click',function(){
                require(['modDir/tools/toolMeasuring3DE'], function(toolMeasuring3DE) {
                            toolMeasuring3DE.init();
                        });
            });
            //通视分析
            $(".tools-TSFX").unbind('click').bind('click',function(){
                require(['modDir/tools/toolTSFX'], function(toolTSFX) {
                            toolTSFX.init();
                        });
            });
            //可视域分析
            $(".tools-KSFX").unbind('click').bind('click',function(){
                require(['modDir/tools/toolKSFX'], function(toolKSFX) {
                            toolKSFX.init();
                        });
            });
            //飞机模型
            $(".tools-flyLineModal").unbind('click').bind('click',function(){
                require(['modDir/tools/toolFlyLineModal'], function(toolFlyLineModal) {
                            toolFlyLineModal.init();
                        });
            });
            //雷达遮罩
            $(".tools-LDZZ").unbind('click').bind('click',function(){
                require(['modDir/tools/toolLDZZ'], function(toolLDZZ) {
                            toolLDZZ.init();
                        });
            });
        };
        function unbindEvents(){
            $(".tools-marker").unbind('click');
            $(".tools-elevation").unbind('click');
            $(".tools-painting").unbind('click');
        }
    return ONEMAP.M.toolsBar = {
        init:init,
        bingEvents:bingEvents,
        unbindEvents:unbindEvents
    };
})