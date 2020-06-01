/**
 * 应用唯一全局对象
 * @namespace ONEMAP
 * @type {*|Object}
 */
var ONEMAP = ONEMAP || {}; //全局变量
/**
 * 模块对象
 * @namespace ONEMAP.M
 * @type {Object}
 */
ONEMAP.M = {};//模块
/**
 * 视图对象
 * @namespace ONEMAP.V
 * @type {Object}
 */
ONEMAP.V = {};//视图
/**
 * 管理对象
 * @namespace ONEMAP.C
 * @type {Object}
 */
ONEMAP.C = {};//管理
/**
 * 共用工具对象
 * @namespace ONEMAP.T
 * @type {Object}
 */
ONEMAP.T = {};//共用
/**
 * 数据对象
 * @namespace ONEMAP.D
 * @type {Object}
 */
ONEMAP.D = {};//数据


//require 配置
require.config({
    baseUrl: "./",
    waitSeconds:25,
    urlArgs:"v="+onemapVersion,
    paths: {
        text:"scripts/vendor/require/text",
        html:"scripts/vendor/require/html",
        css:"scripts/vendor/require/css",
        image:"scripts/vendor/require/image",
        async:"scripts/vendor/require/async",        
        font:"scripts/vendor/require/font",

        // //map23dlib
        // map23dlib: "scripts/vendor/map23dlib/map23dlib-nolib",
        // map23dlibDir: "scripts/vendor/map23dlib",
        // //cyrptoJS
        // cryptoJS: "scripts/vendor/cryptoJS/cryptoJS",
        // //jquery
        // jquery: "scripts/vendor/jquery/jquery-1.9.0",
        //jqueryDir:"scripts/vendor/jquery",
        // //moment
        // moment: "scripts/vendor/moment/moment.min",
        // //proj4js
        // proj4js:"scripts/vendor/proj4js/proj4js-compressed",
        // //shimDir
        // shimDir: "scripts/vendor/shim",
        // //lodash
        // lodash: "scripts/vendor/lodash/dist/lodash",
        // //pubsub
        // pubsub: "scripts/vendor/PubSubJS/src/pubsub",
        // //handlebars
        // handlebars:"scripts/vendor/handlebars/handlebars",
        // //cartoDir
        // cartoDir:"scripts/vendor/carto",
        // //color
        // color:"scripts/vendor/color/color",
        //modDir
        modDir: "scripts/mod",
        layoutDir:"scripts/layout",
        vendorDir:"scripts/vendor"
    }
    // ,
    // shim:{
    //     "jqueryDir/jquery.scrollbar.min":{deps:["jqueryDir/jquery.mousewheel.min","jquery"]},
    //     "jqueryDir/jquery.simpleUpload":{deps:["jquery"]},
    //     "jqueryDir/jquery.sortablelists":{deps:["jquery"]},
    //     "jqueryDir/jquery.simpletooltip":{deps:["jquery"]},
    //     "jqueryDir/jquery.dragmove":{deps:["jquery"]},
    //     "jqueryDir/jquery.datetimepicker":{deps:["jqueryDir/jquery.mousewheel.min","jqueryDir/jquery.dateFunction","css!jqueryDir/jquery.datetimepicker"]},
    //     "jqueryDir/jquery-ui":{deps:["css!jqueryDir/jquery-ui","jquery"]},
    //     "jqueryDir/jquery.iviewer.min":{deps:["jqueryDir/jquery-ui","jqueryDir/jquery.mousewheel.min"]},
    //     "map23dlib":{exports:["L","leaflet"]}
    // }
});

require([''],
function(){
    /**
     * 订阅分发模块
     * 可以实现 某模块数据改变并通过 订阅分发模块 
     * 告知其他订阅该组信息的模块进行相应的事件处理
     * @exports ONEMAP.C.publisher
     * @type {Object}
     */
    ONEMAP.C.publisher = {
        /**
         * 订阅人员分组集合
         * @type {Object}
         * @default []
         */
        subscribers: {
            any: []
        },

        /**
         * 注册订阅
         * @type {Function}
         * @param fn {Function} 事件
         * @param group {String} 订阅组名称
         * @example
         * ONEMAP.C.publisher.subscribe(function(){//something to do},'sideBarLayoutChange');
         */
        subscribe: function (fn, group) {
            group = group || 'any';
            if (typeof (this.subscribers[group]) === "undefined") {
                this.subscribers[group] = [];
            }
            this.subscribers[group].push(fn);
        },

        /**
         * 取消订阅
         * @type {Function}
         * @param fn {Function} 事件
         * @param group {String} 订阅组名称
         * @example
         * ONEMAP.C.publisher.unSubscribe(function(){//something to do},'sideBarLayoutChange');
         */
        unSubscribe: function (fn, group) {
            this.visitSubscribers('unSubscribe', fn, group);
        },

        /**
         * 推送订阅
         * @type {Function}
         * @param publicArg {*} 传递的参数
         * @param group {String} 订阅组名称
         * @example
         * ONEMAP.C.publisher.publish('','sideBarLayoutChange');
         */
        publish: function (publicArg, group) {
            this.visitSubscribers('publish', publicArg, group);
        },

        /**
         * 执行事件分发||执行取消订阅
         * @type {Function}
         * @param action {String} 执行方式
         * @param arg {*} 传递的参数
         * @param group {String} 订阅组名称
         */
        visitSubscribers: function (action, arg, group) {
            var pubGroup = group || 'any';
            if (this.subscribers[pubGroup]) {
                var subscribers = this.subscribers[pubGroup];
                var i;
                var max = subscribers.length;

                for (i = 0; i < max; i++) {
                    if (action === 'publish') {
                        subscribers[i](arg);
                    } else {
                        if (subscribers[i] === arg) {
                            subscribers.splice(i, 1);
                        }
                    }
                }
            }

        }
    };

    /**
     * 定时器
     * 用于记录应用的timeOut事件集合
     * @exports ONEMAP.C.timeOut
     * @type {Object}
     * @example
     * ONEMAP.C.timeOut.mapDrag = setTimeOut(function(){},3000);
     */
    ONEMAP.C.timeOut = {};
    

    /**
     * 加密解密 调用 CryptoJS库
     * @exports ONEMAP.C.encryption
     * @type {Object}
     */
    ONEMAP.C.encryption = {
        /**
         * BASE64加密
         * @type {Function}
         * @param str {String} 加密前的文本
         * @returns {String} 加密后的文本
         */
        enCode: function(str){
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
        },

        /**
         * BASE64解密
         * @type {Function}
         * @param str {String} 解密前的文本
         * @returns {String} 解密后的明文
         */
        deCode: function(str){
            return CryptoJS.enc.Base64.parse(str).toString(CryptoJS.enc.Utf8);
        }
    };

    
    /**
     * loading 加载列队 控制当前有加载 显示loading条，如果该列队都加载完成后，隐藏loading条
     * 发送请求前 load  ， 回调回来 loaded
     * @exports ONEMAP.V.loading
     * @type {Object}
     */
    ONEMAP.V.loading = {
        /**
         * 在线loading统计
         * @type {Number}
         * @default 0
         */
        count:0,
        /**
         * 添加一个加载统计
         * @type {Function}
         * @example
         * ONEMAP.V.loading.load()
         */
        load:function(){
            this.count ++;
            $("#loading").slideDown(50);
            //超时设置
            if(ONEMAP.C.timeOut.loading){
                clearTimeout(ONEMAP.C.timeOut.loading);
            }
            ONEMAP.C.timeOut.loading = setTimeout(function(){
                ONEMAP.V.loading.killLoad();
            },8000);
        },
        /**
         * 加载完成后调用一次，表示从加载列队中删除一此统计数
         * @type {Function}
         * @example
         * //加载
         * ONEMAP.V.loading.load();
         * //do something
         * //完成此次加载
         * ONEMAP.V.loading.loaded();
         */
        loaded:function(){
            this.count --;
            if(this.count === 0){
                $("#loading").slideUp(50);
            }
        },
        /**
         * 强制删除加载列队统计
         * @type {Function}
         * @example
         * ONEMAP.V.loading.killLoad();
         */
        killLoad:function(){
            this.count = 0;
            $("#loading").slideUp(50);
            ONEMAP.C.timeOut.loading = null;
        }
    };

    /**
     * 获取url参数
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    ONEMAP.T.getQueryString = function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return decodeURI(r[2]);
        return '';
    };

    /**
     * POST方式提交数据
     * @exports ONEMAP.T.POST
     * @type {Function}
     * @param URL {String}
     * @param PARAMS {Object}
     */
    ONEMAP.T.POST = function (URL, PARAMS) {
        var temp = document.createElement("form");
        temp.action = URL;
        temp.method = 'post';
        temp.style.display = "none";
        temp.target = '_blank';
        for (var x in PARAMS) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = PARAMS[x];
            temp.appendChild(opt);
        }
        document.body.appendChild(temp);
        temp.submit();

        setTimeout(function () {
            document.body.removeChild(temp);
        }, 1000);

        return temp;
    },

    
    /**
     * 当前用户状态 包含浏览方式  当前城市信息 数据库里保存的历史记录 当前正在使用的模块
     * @exports ONEMAP.D.user
     * @type {Object}
     */
    ONEMAP.D.user = {
        //当前正在浏览的方式： pc/mobile
        viewType: 'pc',
        searchKeyWord:null,
        //用户令牌
        ticket:'',
		action_list:[],
        name:"游客",
        guest:true		
    };

    /**
     * 当前城市信息
     * @type {Object}
     */
    ONEMAP.D.cityInfo = {
        name: null,//中文名称
        center:null,
        bounds:null,
        zoom:null,
        guid: null//唯一标识符
    }

    ONEMAP.D.currentSideBarMod = null;

    /**
     * 全局设置
     * @type {Object}
     */
    ONEMAP.D.globalSettingData = null;

    /**
     * 统计地图上叠加的专题图
     * @type {Number}
     */
    ONEMAP.D.overLayerCount = 0;
    
    /**
     * cookie管理
     * @exports ONEMAP.C.cookie
     * @type {Object}
     */
    ONEMAP.C.cookie = {
        /**
         * 设置cookie
         * @type {Function}
         * @param name {String} 名称
         * @param value {String} 值
         * @param days {Number} 过期时间(天)
         * @example
         * ONEMAP.C.cookie.set('cookieName','cookieValue',20);
         */
        set:function(name,value,days){
            document.cookie = ONEMAP.C.encryption.enCode(name) + "=" + ONEMAP.C.encryption.enCode(escape(value));
        },

        /**
         * 获取cookie
         * @type {Function}
         * @param name {String} 名称
         * @returns {null|String} 返回值
         * @example
         * ONEMAP.C.cookie.get('cookieName');
         */
        get:function(name){
            var arr,reg=new RegExp("(^| )"+ONEMAP.C.encryption.enCode(name)+"=([^;]*)(;|$)");
            arr = document.cookie.match(reg);
            if(arr) {
                return ONEMAP.C.encryption.deCode(unescape(arr[2]));
            }else {
                return null;
            }
        },

        /**
         * 删除cookie
         * @type {Function}
         * @param name {String} 名称
         * @example
         * ONEMAP.C.cookie.del('cookieName');
         */
        del:function(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=this.get(name);
            if(cval !== null) document.cookie= ONEMAP.C.encryption.enCode(name) + "="+cval+";expires="+exp.toGMTString();
        }
    };

    /**
     * 对象合并
     * @exports ONEMAP.T.objExtend
     * @type {Function}
     * @param o {Object} 原始的
     * @param n {Object} 需要并入的
     * @param override  {Boolean} 是否覆盖掉已有属性或者方法
     */
    ONEMAP.T.objExtend = function(o,n,override){
        for(var p in n){
            if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)){
                o[p]=n[p];
            }
        }
    };

    /**
     * 字符串长度截取
     * @exports ONEMAP.T.stringSub
     * @type {Function}
     * @param s {String} 原始字符串
     * @param n {Number} 保留的长度
     * @returns {String} 返回截取后的字符串
     */
    ONEMAP.T.stringSub = function(s,n){
        var r = /[^\x00-\xff]/g;
        if(s.replace(r, "mm").length <= n) return s;
        var m = Math.floor(n/2);
        for(var i=m; i<s.length; i++) {
            if(s.substr(0, i).replace(r, "mm").length>=n) return s.substr(0, i)+"..." ;
        }
        return s;
    };

    /**
     * 将obj的个属性名放到一个数组里并返回，方便取到长度和名称
     * @type {Function}
     * @exports ONEMAP.T.getObjNameAry
     * @param obj {Object} 需要查询的对象
     * @returns {Array} 返回结果数组
     */
    ONEMAP.T.getObjNameAry = function(obj){
        var item;
        var count = [];
        for(item in obj){
            if(obj.hasOwnProperty(item)){
                count.push(item);
            }
        }
        return count;
    };

    /**
     * 判断一个对象是否为空对象
     * @exports ONEMAP.T.isEmptyObject
     * @type {Function}
     * @param obj {Object} 需要查询的对象
     * @returns {boolean} 返回 true || false
     */
    ONEMAP.T.isEmptyObject = function(obj){
        for(var name in obj){
            return false;
        }
        return true;
    };

    /**
     * 判断是否为Json格式
     * @exports ONEMAP.T.isJson
     * @type {Function}
     * @param obj {Object} 需要查询的Json对象
     * @returns {boolean}　返回true || false
     */
    ONEMAP.T.isJson = function (obj) {
        var isJson = typeof obj === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
        return isJson;
    };

    /**
     * 检测flash player的版本
     * @exports ONEMAP.T.flashChecker
     * @type {Function}
     * @returns {Object}
     */
    ONEMAP.T.flashChecker = function(){
        var hasFlash = 0;
        var flashVersion =0;
        if(document.all){
            var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if(swf){
                hasFlash = 1;
                VSwf = swf.GetVariable('$version');
                flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
            }
        }else {
                if(navigator.plugins && navigator.plugins.length > 0){
                    var swf = navigator.plugins["Shockwave Flash"];
                }
                if(swf){
                    hasFlash = 1;
                    var words = swf.description.split(" ");
                    for(var i=0;i<words.length; i++){
                        if(isNaN(parseInt(words[i]))) continue;
                        flashVersion = parseInt(words[i]);
                    }
                }
        } 
        return {
            f:hasFlash,
            v:flashVersion
        };
    };




    /**
     * 没有权限提示
     * @param  {[type]} modFunction [description]
     * @param  {[type]} modTips     [description]
     * @return {[type]}             [description]
     */
    ONEMAP.C.noPermission = function(modFunction,modTips){
        ONEMAP.C.publisher.publish({type:'warning',message:'您'+modTips+'！'},'noteBar::add');
        return false;
    };

    
    /**
     * 登出
     * @return {[type]} [description]
     */
    ONEMAP.C.logout = function(modName) {
        ONEMAP.C.cookie.del('ticket');
        if(onemapUrlConfig.accessType == 'oauth'){
            $('body').append('<img src="' + onemapUrlConfig.ssoServiceUrl + '/logout?ticket=' + ONEMAP.D.user.ticket + '" width="0" height="0"/>');
        }
        if(onemapUrlConfig.accessType == 'sso'){
            $('body').append('<img src="' + onemapUrlConfig.ssoServiceUrl + '/logout?ticket=' + ONEMAP.D.user.ticket + '" width="0" height="0"/>');
        }
        delete ONEMAP.D.user.ticket;
        setTimeout(function() {
            if(onemapUrlConfig.accessType == 'oauth'){
                var jumpUrl = onemapUrlConfig.oauthServiceUrl + '/account/logout?next=/go/?site=' + onemapUrlConfig.siteUrl;
                window.location.replace(jumpUrl);
            }
            if(onemapUrlConfig.accessType == 'sso'){
                var jumpUrl = onemapUrlConfig.ssoServiceUrl + '/login?ticket=' + onemapUrlConfig.siteUrl;
                window.location.replace(jumpUrl);
            }
            
        }, 500);
        return false;
    };

    /**
     * 登入
     * @return {[type]} [description]
     */
    ONEMAP.C.login = function() {
        function downloadIEUpdata() {
            $("<div class='downloadIEUpdata'><a href='/soft/IE11.zip'>IE更新下载</a></div>").appendTo($('body'));
        };
        //判断IE浏览器版本是否为9以上
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                downloadIEUpdata();
                return false;
            }
            if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
                downloadIEUpdata();
                return false;
            }
            if (navigator.userAgent.indexOf("MSIE 8.0") > 0 && !window.innerWidth) { //这里是重点，你懂的
                downloadIEUpdata();
                return false;
            }
        }
        //ajax取用户信息
        $.ajax({
            type: "get",
            dataType: 'json',
            url: onemapUrlConfig.userDataUrl + '/v1.0/user/current_user?ticket=' + ONEMAP.D.user.ticket,
            success: function(data) {
                if (data.code == 4) {
                    ONEMAP.C.noPermission('getUserInfo', '无权限获取用户信息');
                }
                if (data.code == 3) {
                    ONEMAP.C.logout('getUserInfo');
                }

                _.merge(ONEMAP.D.user, data.data);
                ONEMAP.D.user.guest = false;

                ONEMAP.C.getGlobalData({
                    callback:function(){
                        //加载pc端
                        require(['layoutDir/layout'], function (layout) {
                            layout.init();
                        });
                    }
                });  
            }
        });
    };

    ONEMAP.C.gotoLogin = function(){
        if(onemapUrlConfig.accessType == 'oauth'){
            var jumpUrl = onemapUrlConfig.ssoServiceUrl + '/login?service=' + onemapUrlConfig.siteUrl;
            window.location.replace(jumpUrl);
        }
        if(onemapUrlConfig.accessType == 'sso'){
            var jumpUrl = onemapUrlConfig.ssoServiceUrl + '/login?service=' + onemapUrlConfig.siteUrl;
            window.location.replace(jumpUrl);
        }
    };

    /**
     * 获取系统配置数据
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    ONEMAP.C.getGlobalData = function(options) {
        $.ajax({
            type: "get",
            dataType: 'json',
            url: onemapUrlConfig.storageServiceUrl + '/storage/mapSetting?ticket=' + ONEMAP.D.user.ticket,
            success: function(data) {
                if (data.code == 4) {
                    ONEMAP.C.noPermission('getGlobalData', '无权限获取系统配置数据');
                }
                if (data.code == 3) {
                    ONEMAP.C.logout('getGlobalData');
                }
                ONEMAP.D.globalSettingData = JSON.parse(data['data']);
                //部署环境缺少map3dLayer，设置默认
                if(!ONEMAP.D.globalSettingData.baseMap3D.map3DLayer) {
                    console.log("设置map");
                    ONEMAP.D.globalSettingData.baseMap3D.map3DLayer = onemapUrlConfig.serverIP + ':5060/v1.0/gr?z=%d&x=%d&y=%d'
                }
                options.callback();
            }
        });
    };


    //加载pc端
    // require(['layoutDir/layout'], function (layout) {
    //     layout.init();
    // });
    // return false;

    $.ajaxSetup({cache:false});

    //判断url是否带ticket参数，如果带 写入cookie，并重新跳转不带ticket参数的url  
    // if(ONEMAP.T.getQueryString('ticket').length>0){
    //    ONEMAP.D.user.ticket = ONEMAP.T.getQueryString('ticket');
    //    //设置cookie
    //    ONEMAP.C.cookie.set('ticket',ONEMAP.D.user.ticket);
    //    window.location.replace(onemapUrlConfig.siteUrl);
    // }else if(ONEMAP.C.cookie.get('ticket')){
    //    ONEMAP.D.user.ticket = ONEMAP.C.cookie.get('ticket');
    //    ONEMAP.C.login();
    // }else {
    //    var jumpUrl = onemapUrlConfig.SSOServiceUrl+'/login?service='+onemapUrlConfig.siteUrl;
    //    window.location.replace(jumpUrl);
    // }
    ONEMAP.D.globalSettingData = onemapUrlConfig.defaultGlobalSettingData;
    require(['layoutDir/layout'], function (layout) {
        layout.init();
    });
});