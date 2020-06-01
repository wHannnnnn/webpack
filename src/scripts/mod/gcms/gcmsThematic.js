/**
 * [ONEMAP.M.gcmsThematic]
 * @return {[object]}
 */
define(function(){
    //参数
    var modValue = {
        options:{}
    };
    

    /**
     * 模块初始化
     * @return {[type]} [description]
     */
    function init(options){
        remove();
        modValue.options = {};
        for(var op in options){
            modValue.options[op] = options[op];
        }
        //注册监听
        subscribe();

        //获取内容数据
        getDetailData({callback:function(){
            showThematic();
        }});       
    }

    function getDetailData(options){
        ONEMAP.V.loading.load();
        $.ajax({
            url: onemapUrlConfig.gcmsServiceUrl+'/show/'+modValue.options['column_name']+'/'+modValue.options['article_id']+'?ticket='+ONEMAP.D.user.ticket,
            type:"GET",
            dataType: 'json'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            if(data.code == 4){
                ONEMAP.T.noPermission('getDetailData');
            }
            if(data.code == 3){
                ONEMAP.T.logout('getDetailData');
            }
            ONEMAP.D.gcmsCurArticleData = data['data'];
            options.callback();
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        }); 
    }

    function showThematic(){
        if(ONEMAP.D.gcmsCurArticleData['record'][modValue.options['field_name']].length == 0){
            ONEMAP.C.publisher.publish({ type: 'warning', message: '没有专题图数据' }, 'noteBar::add');
            return false;
        }

        var thematicData = JSON.parse(ONEMAP.D.gcmsCurArticleData['record'][modValue.options['field_name']]);

        ONEMAP.V.loading.load();
        $.ajax({
            url: onemapUrlConfig.thematicDataUrl+'/production/metadata?production_id='+thematicData['guid']+'&ticket='+ONEMAP.D.user.ticket,
            type:"GET",
            dataType: 'json'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            if(data.code == 4){
                ONEMAP.T.noPermission('getDetailData');
            }
            if(data.code == 3){
                ONEMAP.T.logout('getDetailData');
            }
            require(['modDir/atlas/atlasList'],function(atlasList){
                var layerObj =  {
                    guid:thematicData['guid'],
                    name:'thematic_'+thematicData['guid'],
                    center:[thematicData['center_lat'],thematicData['center_lon']],
                    zoom:thematicData['min_zoom'],
                    thumb_min_id:data['metadata']['thumb_min_id'],
                    translate:thematicData['name'],
                    min_zoom:thematicData['min_zoom'],
                    max_zoom:thematicData['max_zoom'],
                    data_type:data['metadata']['data_type'],
                    map_type:data['metadata']['map_type'],
                    showFavBtn:true,
                    status:true
                }
                //atlasList._addSingleLayersControl();
                atlasList.addOverLayerToMap(layerObj);
            });  
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        }); 

          
    }


    /**
     * 收藏专题图
     * @param {[type]} layerObj [description]
     */
    function _addFavThematic(layerObj){
        require(['modDir/userThematic'],function(userThematic){
            userThematic.addThematic(layerObj);
        });
    }


    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe(){
        map2DViewer.map.on('layerOpacity:addFav',_addFavThematic);
        ONEMAP.C.publisher.subscribe(remove, 'cleanMap');
        ONEMAP.C.publisher.subscribe(remove,'gcmsArticleShowRemove');
    }

    /**
     * 取消监听
     * @type {Function}
     */
    function unSubscribe() {
        map2DViewer.map.off('layerOpacity:addFav',_addFavThematic);
    }

	/**
	 * 模块移除
	 * @return {[type]} [description]
	 */
	function remove(){
        if(ONEMAP.M.thematic){
            ONEMAP.M.thematic.removeCurrentOverLayer();
        }
		unSubscribe();
	}

    return ONEMAP.M.gcmsThematic = {
        init:init,
        remove:remove
    }
});

