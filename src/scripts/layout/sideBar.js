/**
 * [ONEMAP.M.sideBar]
 * @return {[object]}
 */
define([
    'html!templates/sideBar',
    'css!styles/sideBar'
], function(tplLayout) {

    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
        //用于输出侧栏模块的zindex值，取完加一
        modZIndex:1
    }

    function init() {
        setLayout();
        bindEvent();
    }

    function setLayout() {
        $(tplLayout).appendTo($("#sideBar .cover-content"));
    }

    function bindEvent() {
        $("#sideBar").bind("mouseleave",function(){
            ONEMAP.C.publisher.publish('hide', 'layout::sideBar');
            if(ONEMAP.M.tdEarth){
                $("#openTdSideContent").show();
            }
        })
        //关闭侧栏
        $('.abtn-mini-side-bar').bind('click', function() {
            ONEMAP.C.publisher.publish('hide', 'layout::sideBar');
            if(ONEMAP.M.tdEarth){
                $("#openTdSideContent").show();
            }
        });

        //专题地图更多
        $("#sideBarHeader .abtn-atlas").bind("click",function(){            
            require(['modDir/atlas/atlasList'],function(atlasList){
                atlasList.init();
            });
        });

        //GCMS
        $("#sideBarHeader .abtn-gcms").bind("click",function(){
            require(['modDir/gcms/gcmsNav'],function(gcmsNav){
                gcmsNav.init();
            });
        });

        //海量地图库
        $("#sideBarHeader .abtn-atlas-labrary").bind("click",function(){
            var windowOpen = window.open();
            var openUrl = onemapUrlConfig.atlasLibraryUrl;
            windowOpen.location = openUrl;
        });

        //三维数据
        $("#sideBarHeader .abtn-3dData").bind("click",function(){
            require(['modDir/tools/toolFor3d'],function(toolFor3d){
                toolFor3d.init();
            })
        });

        //我的收藏
        $("#sideBarHeader .abtn-myFav").bind("click",function(){
            require(['modDir/user/userCenter'], function(userCenter) {
                userCenter.init('userFav');
            });
        });
    }

    /**
     * 用于侧栏模块获取zIndex
     * @return {[type]} [description]
     */
    function getZIndex(){
        return modValue.modZIndex++;
    }

    return ONEMAP.M.sideBar = {
        init: init,
        getZIndex:getZIndex
    };
});
