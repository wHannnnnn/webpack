/**
 * [ONEMAP.M.situation]
 * @return {[object]}
 */
define(['html!templates/situation/situation',
    'css!styles/situation/situation'],
function(tplLayout){

    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {}

    /**
     * 模块界面样式 例如：宽，高
     * @type {Object}
     */
    var styles = {}

    /**
     * 模块状态，用于存储模块的状态 例如：收起，关闭
     * @type {Object}
     */
    var status = {}
    
    /**
     * 初始化并订阅事件
     * @return {[type]} [description]
     */
    function init(){
        $('body').append(tplLayout);
        subscribe();
    }

    /**
     * 设置界面
     */
    function setLayout(){

    }

    /**
     * 界面事件绑定
     * @return {[type]} [description]
     */
    function bindEvent(){

    }

    /**
     * 界面重置
     * @return {[type]} [description]
     */
    function layoutResize(){

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
        //unSubscribe();
    }

    /**
     * 获取数据
     * @return {[type]} [description]
     */
    function getValue(name){
        if(modValue.hasOwnProperty(name)){
            return modValue[name]
        }else {
            return null;
        }
    }

    /**
     * 设置数据 默认合并
     */
    function setValue(name,value,rewrite){
        if(rewrite){
            modValue = value;
            return modValue;
        }else {
            _.merge(modValue, value);
            return modValue;
        }
    }



    return ONEMAP.M.situation = {
        init:init,
        layoutResize:layoutResize,
        getValue:getValue,
        setValue:setValue,
        remove:remove
    }
});