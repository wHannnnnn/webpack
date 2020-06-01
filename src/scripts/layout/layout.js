/**
 * [ONEMAP.M.pcLayout]
 * @return {[object]}
 */
define([
    'html!templates/layout',
    'css!styles/layout',
    'layoutDir/noteBar'
], function(tplLayout) {

    /**
     * pc端界面布局 模块
     * @exports ONEMAP.M.pcLayout
     * @type {Object}
     */
    //布局完成后加载地图和侧栏内容，如果url传来参数，将解析参数加载相应的模块

    /**
     * 界面样式数值变量
     * @type {Object}
     */
    var styles = {
        //头部高度
        headerHeight: 61,
        //工具栏高度
        toolbarHeight: 30,
        //地图视窗宽
        mapWidth: null,
        //地图视窗高
        mapHeight: null,
        //侧栏宽度
        sideBarWidth: 270,
        //侧栏高度
        sideBarHeight: '100%',
    };
    /**
     * 模块状态，用于存储模块的状态 例如：收起，关闭
     * @type {Object}
     */
    var status = {
            showSideBar: false,
            showFullMap: false
    }
    /**
     * 加载布局 初始化
     * 先加载 CSS，html，html事件，地图，地图控件
     * @type {Function}
     * @returns {*}
     */
    function init() {
        setLayout();
        $(window).resize(function() {
            layoutResize();
        });
        subscribe();
        bindEvent();
    };
    /**
     * 设置布局
     * @return {[type]} [description]
     */
    function setLayout() {   
        $('body').append(tplLayout);
        $("#openSTSideContent").appendTo($("#map2DWrap"))
        require(['layoutDir/header'], function(header) {
            header.init();
        });
        require(['layoutDir/toolsBar'], function(toolsBar) {
            toolsBar.init();
        });
        require(['layoutDir/footer'], function(footer) {
            footer.init();
        });
        require(['layoutDir/sideNav'], function(sideNav) {
            sideNav.init();
            require(['modDir/mapHolder'], function(mapHolder) {
                mapHolder.init();
            });
        });
        require(['layoutDir/sideBar'], function(sideBar) {
            sideBar.init();
        });

    };

    function layoutResize() {
        
    };
    function  bindEvent(){
        $("#openSTSideContent").bind('click',function(){
            ONEMAP.C.publisher.publish('show','layout::sideBar');
        })
    }
    /**
     * 设置侧栏显示状态
     * @param {[type]} options [description]
     * 显示： ONEMAP.C.publisher.publish('show','layout::sideBar');
     * 隐藏： ONEMAP.C.publisher.publish('show','layout::sideBar');
     */
    function setSideBarStatus(options){
        if(options == 'show'){
            $('#wrapper').animate({
                right: 410},
                300, function() {
                    ONEMAP.C.publisher.publish({},'layout::resize');
                });
            $("#openSTSideContent").hide();
            status.showSideBar = true;
        }else {
            $('#wrapper').animate({
                right: 0},
                300, function() {
                    ONEMAP.C.publisher.publish({},'layout::resize');
                    //if(map23DData.display.map2D){
                    $("#openSTSideContent").show();
                    //}
                });
            status.showSideBar = false;
        }
    };
    /**
     * 设置全屏显示状态
     * @param {[type]} options [description]
     * 全屏： ONEMAP.C.publisher.publish(true,'layout::fullMap');
     * 取消全屏： ONEMAP.C.publisher.publish(false,'layout::fullMap');
     */
    function setFullMapStatus(options){
        if(options == true){
            status.showFullMap = true;
            ONEMAP.C.publisher.publish({},'layout::resize');
            $('#header').animate({
                top: -61},
                500, function() {});            
            $('#footer').animate({
                bottom: -30},
                500, function() {});
            $('#sideNav').hide();
        }else {
            status.showFullMap = false;
            ONEMAP.C.publisher.publish({},'layout::resize');
            $('#header').animate({
                top: 0},
                500, function() {});            
            $('#footer').animate({
                bottom: 0},
                500, function() {});
            $('#sideNav').show();
        }
    }
    
    
    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe() {
        ONEMAP.C.publisher.subscribe(setSideBarStatus,'layout::sideBar');
        ONEMAP.C.publisher.subscribe(setFullMapStatus,'layout::fullMap');
    };


    return ONEMAP.M.pcLayout = {
        init: init,
        styles:styles,
        status:status
    };
});
