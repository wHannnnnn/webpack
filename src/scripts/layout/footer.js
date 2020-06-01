/**
 * [ONEMAP.M.footer]
 * @return {[object]}
 */
define([
    'html!templates/footer',
    'css!styles/footer'
], function(tplLayout) {

    function init() {
        setLayout();
        layoutResize();
        bindEvent();
        subscribe();
    };

    function setLayout() {
        $(tplLayout).appendTo($("#footer .cover-content"));
        layoutResize();
        $(window).resize(function() {
            layoutResize();
        });
    }

    function layoutResize() {}

    function bindEvent() {
        $("#footer .Arealinkimg").bind("click", function() {
            require(['modDir/tools/toolCurrentArea'], function(currentArea) {
                currentArea.init();
            })
        });
    };


    function change23D(options){
        if(options == '2d'){
            $('#footer').removeClass('class3d');
        }else{
            $('#footer').addClass('class3d');
        }
    }

    /**
     * 注册订阅
     * @type {Function}
     * 推送：ONEMAP.C.publisher.publish(options,'moduleName::type');
     * 订阅：ONEMAP.C.publisher.subscribe(layoutResize,'sideBarLayoutChange');
     */
    function subscribe() {
        ONEMAP.C.publisher.subscribe(change23D,'change23D');
    }

    return ONEMAP.M.footer = {
        init: init
    };
})
