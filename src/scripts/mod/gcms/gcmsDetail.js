/**
 * [ONEMAP.M.gcmsDetail]
 * @return {[object]}
 */
define([
        'html!templates/gcms/gcmsDetail',
        'css!styles/typo',
        'css!styles/gcms/gcmsDetail'],
function(tpcLayout){ 
    //参数
    var modValue = {
        options:{}
    }
    //地图层
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
            setDetailModal();
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

    /**
     * 设置容器
     */
    function setDetailModal(){
        var template = Handlebars.compile(tpcLayout);
        $('body').append(template({
            title:ONEMAP.D.gcmsCurArticleData['record']['gcms_title'],
            detailTemplate:ONEMAP.D.gcmsCurArticleData['detail_html']
        }));

        $('#gcmsDetailModal').show();
        bindEvent();
        layoutResize();

        // var pian = _getPianLatlon(_this._map.getCenter(), parseInt($(window).width() / 6), 0);
        // _map.setView(pian, _this._map.getZoom());
        if(ONEMAP.D.gcmsCurArticleData['record'].hasOwnProperty('map_center_lat')){
            var pX = -(ONEMAP.M.pcLayout.styles.mapWidth / 2 - (ONEMAP.M.pcLayout.styles.mapWidth - 330) / 2);
            var pian = _getPianLatlon(L.latLng(ONEMAP.D.gcmsCurArticleData['record']['map_center_lat'], ONEMAP.D.gcmsCurArticleData['record']['map_center_lon']), pX, 0);
            
            if(map23DData.display.map2D){
                map2DViewer.map.setView(pian, map23DData.view.zoom);
            }else if(map23DData.display.map3D){
                map3DViewer.setView({
                    center:{
                        lat:pian.lat,
                        lng:pian.lng
                    },
                    zoom:map23DData.view.zoom,
                    heading:0,//摄像机平面角度 正北为0
                    tilt:0,//摄像机倾斜角
                });
            }
        }
        

        $(window).resize(function() {
            layoutResize();
        });
    }

    /**
     * 获取偏移坐标
     * @type {Function}
     * @param latlng{Object} 坐标
     * @param x {Number} 偏移x
     * @param y {Number} 偏移y
     * @returns {L.LatLng}
     * @private
     */
    function _getPianLatlon(latlng, x, y, zoom) {
        var aLatLng = new L.LatLng(latlng.lat, latlng.lng);

        var zoom = zoom ? zoom : map23DData.view.zoom;

        var bPoints = map2DViewer.map.project(aLatLng, zoom);

        bPoints.x -= parseInt(x);
        bPoints.y -= parseInt(y);

        aLatLng = map2DViewer.map.unproject(bPoints, zoom);

        return aLatLng;
    }

    /**
     * 事件绑定
     * @return {[type]} [description]
     */
	function bindEvent(){
        $('#gcmsDetailModal .modal-header .close').bind('click', function() {
            remove();
        });

        $('#gcmsDetailModal .modal-header').dragmove($('#gcmsDetailModal'));

        
    }

    

    /**
     * 界面布局重置
     * @type {Function}
     */
    function layoutResize(){
        $('#gcmsDetailModal .modal-body').css({height:$(window).height()-480});
    }
    
    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe(){
        ONEMAP.C.publisher.subscribe(remove,'gcmsArticleShowRemove');
        ONEMAP.C.publisher.subscribe(remove, 'cleanMap');
    }

    /**
     * 取消监听
     * @type {Function}
     */
    function unSubscribe() {}

	/**
	 * 模块移除
	 * @return {[type]} [description]
	 */
	function remove(){
        $('#gcmsDetailModal').remove();
		unSubscribe();
	}

    return ONEMAP.M.gcmsDetail = {
        init:init,
        remove:remove
    }
});

