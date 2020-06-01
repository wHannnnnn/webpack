/**
 * [ONEMAP.M.header]
 * @return {[object]}
 */
define([
    'html!templates/header',
    'css!styles/header',
], function(tplLayout) {

    function init() {
        setLayout();
        //添加系统logo
        setLogo();
        //设置作战时间    
        setClock();
        subscribe();
    };

    function setLayout() {
        $(tplLayout).appendTo($("#header .cover-content"));
        layoutResize();
        $(window).resize(function() {
            layoutResize();
        });
    }

    function layoutResize() {}

    /**
     * 添加系统logo
     */
    function setLogo() {}

    /**
     * 设置作战时间
     */
    function setClock() {
        setInterval(function() {
            $("#operationalTime .time").empty();
            $("#standardTime .time").empty();
            var newdata = new Date();
            var year = newdata.getFullYear();
            var month = newdata.getMonth() + 1;
            var day = newdata.getDate();
            var hour = newdata.getHours();
            var mintes = newdata.getMinutes();
            var second = newdata.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hour < 10) {
                hour = "0" + hour;
            }
            if (mintes < 10) {
                mintes = "0" + mintes;
            }
            if (second < 10) {
                second = "0" + second;
            }
            $("<span>" + year + "年" + month + "月" + day + "日 " + hour + "：" + mintes + "：" + second + "</span>").appendTo($("#operationalTime .time"));
            $("<span>" + year + "年" + month + "月" + day + "日 " + hour + "：" + mintes + "：" + second + "</span>").appendTo($("#standardTime .time"));

        }, 1000)
    }

    function change23D(options){
        if(options == '2d'){
            $('#header').removeClass('class3d');
        }else{
            $('#header').addClass('class3d');
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

    return ONEMAP.M.header = {
        init: init
    };
})
