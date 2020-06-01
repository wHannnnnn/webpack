/**
 * [ONEMAP.M.mod]
 * @return {[object]}
 */
define(['html!templates/user/userCenter',
    'css!styles/user/userCenter'],
function(tplLayout){

    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
        subModName:null
    }

    /**
     * 模块界面样式 例如：宽，高
     * @type {Object}
     */
    var styles = {}

    /**
     * 模块状态，用于存储模块的状态 例如：收起，关闭
     * @type {Object}
     */
    var status = {
        initialized:false
    }
    
    /**
     * 初始化并订阅事件
     * @return {[type]} [description]
     */
    function init(modName){
        //未初始化，初始化布局
        if (!status.initialized) {
            //设置容器布局
            setLayout();
            bindEvent();
            
            //订阅推送
            subscribe();
            status.initialized = true;
        }
        
        setMod(modName);
        
        //设置zIndex 为最高
        var zIndex = ONEMAP.M.sideBar.getZIndex();
        $('#userCenter').css({zIndex:zIndex});

        ONEMAP.D.currentSideBarMod = 'userCenter';
        //开启侧栏
        ONEMAP.C.publisher.publish('show','layout::sideBar');
    }

    /**
     * 初始化布局
     */
    function setLayout(){        
        $(tplLayout).appendTo($("#sideBarBody"));        
        
    };
    /**
     * 窗口布局重置
     * @type {Function}
     */
    function layoutResize() {
        
    };

    /**
     * 界面事件绑定
     * @return {[type]} [description]
     */
    function bindEvent(){
        $("#userCenter .nav-userFav").bind('click',function(){
            setMod('userFav');
        });
        $("#userCenter .nav-userRoute").bind('click',function(){
            setMod('userRoute');
        });
        $("#userCenter .nav-userPoint").bind('click',function(){
            setMod('userPoint');
        });
        $("#userCenter .nav-userThematic").bind('click',function(){
            setMod('userThematic');
        });
        $("#userCenter .nav-userDraw").bind('click',function(){
            setMod('userDraw');
        });
    }

    /**
     * 显示相应模块的内容
     * @type {Function}
     * @private
     */
    function  setMod(modName){
        //移除上一个模块
        if(modValue.subModName && modValue.subModName !== modName){
            ONEMAP.M[modValue.subModName].remove();
        }
        modValue.subModName = modName;
        $('#userCenter .nav .active').removeClass('active');
        $('#userCenter .nav-'+modValue.subModName).addClass('active');
        switch (modValue.subModName){
            case "userFav":
                require(['modDir/user/userFav'],function(userFav){
                    userFav.init();
                });
                break;
            case "userRoute":
                require(['modDir/user/userRoute'],function(userRoute){
                    userRoute.init();
                });
                break;
            case "userPoint":
                require(['modDir/user/userPoint'],function(userPoint){
                    userPoint.init();
                });
                break;
            case "userThematic":
                require(['modDir/user/userThematic'],function(userThematic){
                    userThematic.init();
                });
                break;

            case "userDraw":
                require(['modDir/user/userDraw'],function(userDraw){
                    userDraw.init();
                });
                break;            
        }        
    }
    

    /**
     * 注册订阅
     * @type {Function}
     * 推送：ONEMAP.C.publisher.publish(options,'moduleName::type');
     * 订阅：ONEMAP.C.publisher.subscribe(layoutResize,'sideBarLayoutChange');
     */
    function subscribe(){}

    /**
     * 取消订阅
     * @type {Function}
     * 取消订阅：ONEMAP.C.publisher.unSubscribe(layoutResize,'sideBarLayoutChange');
     */
    function unSubscribe(){}

    /**
     * 模块移除
     * @return {[type]} [description]
     */
    function remove(){
        //取消订阅
        unSubscribe();
    }


    return ONEMAP.M.mod = {
        init:init,
        layoutResize:layoutResize
    }
});