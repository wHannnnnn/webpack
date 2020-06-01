/**
 * [ONEMAP.M.gcmsMapCenter]
 * @return {[object]}
 */
define(['handlebars','css!cssDir/mod-gcms'],
function(Handlebars){
    //参数
    var _options = {};

    //地图层
    var _map = ONEMAP.M.mapHolder.map;

    /**
     * 模块初始化
     * @return {[type]} [description]
     */
    function init(options){
        remove();
        _options = {};
        for(var op in options){
            _options[op] = options[op];
        }

        jumpMapCenter();
    }

    function jumpMapCenter(){
        _map.setView([_options['data']['lat'],_options['data']['lng']],_options['data']['zoom']);        
    }  

	/**
	 * 模块移除
	 * @return {[type]} [description]
	 */
	function remove(){
	}

    return ONEMAP.M.gcmsMapCenter = {
        init:init,
        remove:remove
    }
});

