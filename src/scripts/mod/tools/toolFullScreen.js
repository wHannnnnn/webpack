define(function() {

    var status = {
        isFullScreen: false,
        initialized: false, //是否初始化
    };

    /**
     * 初始化并订阅事件
     * @return {[type]} [description]
     */
    function init() {
        if (!status.initialized) {
            subscribe();
            status.initialized = true
        }
        ONEMAP.C.publisher.publish({
            modName: 'isFullScreen'
        }, 'tools:active');
    }
    /**
     * 监听事件
     */
    function subscribe() {
        ONEMAP.C.publisher.subscribe(remove, 'tools:active');
    }

    function remove(options) {
        if (options.modName === 'isFullScreen') {
            if (status.isFullScreen) {

                ONEMAP.C.publisher.publish(false, 'layout::fullMap');
 
                $("#toolsBar .tools-fullscreen").removeClass('cur');
                $("#toolsBar .tools-fullscreen").siblings().show();
                if(map23DData.display.map3D){
                    $(".tools-elevation").hide();
                    $(".tools-painting").hide();
                    $(".tools-marker").hide();
                    $(".tools-measuring3DE").show();
                    $(".tools-LDZZ").show();
                    $(".tools-KSFX").show();
                    $(".tools-TSFX").show();
                    $(".tools-flyLineModal").show();
                }else if(map23DData.display.map2D){
                    $(".tools-elevation").show();
                    $(".tools-painting").show();
                    $(".tools-marker").show();
                    $(".tools-measuring3DE").hide();
                    $(".tools-LDZZ").hide();
                    $(".tools-KSFX").hide();
                    $(".tools-TSFX").hide();
                    $(".tools-flyLineModal").hide();
                }
                $("#toolsBar").css({
                    top: "81px",
                    height: "auto"
                })
                $('#toolsBar .tools-fullscreen .toolslisttitle .cover-content').html("全屏");
                status.isFullScreen = false;

            } else {
                ONEMAP.C.publisher.publish(true, 'layout::fullMap');

                $("#toolsBar .tools-fullscreen").addClass('cur');
                $("#toolsBar .tools-fullscreen").siblings().hide();
                $('#toolsBar .tools-fullscreen .toolslisttitle .cover-content').html("退出全屏");
                status.isFullScreen = true;

                $("#toolsBar").css({
                    top: $(window).height() - 50,
                    height: "44px"
                })
            }
        }
    }
    return ONEMAP.M.toolFullScreen = {
        init: init
    }
})
