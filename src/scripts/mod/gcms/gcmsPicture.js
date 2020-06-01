/**
 * [ONEMAP.M.gcmsPicture]
 * @return {[object]}
 */
define([
    'html!templates/gcms/gcmsPicture',
    'vendorDir/handlebars/handlebars',
    'css!styles/gcms/gcmsPicture'],
function(tpcLayout,Handlebars){
    //数据存放和外部调用
    var modValue = {
        options:{},
        iviewer:null,
        pictureUrl:null,
    }
   
    //地图层
    //var _map = ONEMAP.M.mapHolder.map;

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

        //获取内容数据
        getDetailData({callback:function(){
            //设置容器布局
            setPictureModal();
        }}); 
         
        
        //订阅推送
        subscribe();
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

            if(data['data']['record'][modValue.options['field_name']].length == 0){
                ONEMAP.C.publisher.publish({ type: 'warning', message: '没有图片数据' }, 'noteBar::add');
                remove();
            }else {
                ONEMAP.D.gcmsCurArticleData = data['data'];
                options.callback();
            }

        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        }); 
    }

    /**
     * 设置容器
     */
    function setPictureModal(){
        var pictureData = ONEMAP.D.gcmsCurArticleData['record'][modValue.options['field_name']];
        modValue.pictureUrl = onemapUrlConfig.gcmsServiceUrl+'/file'+pictureData+'?ticket='+ONEMAP.D.user.ticket;
        $('body').append(tpcLayout); 
        bindEvent();       
        $('#gcmsPictureViewer').show();

        if(modValue.iviewer){
            modValue.iviewer.iviewer('loadImage', modValue.pictureUrl);
            return false;
        }else {                
            modValue.iviewer = $("#gcmsPictureViewerBox").iviewer(
            {
                zoom_max:100,
                zoom_min:5,
                src: modValue.pictureUrl
            });
        } 
    }

    /**
     * 事件绑定
     * @return {[type]} [description]
     */
	function bindEvent(){
        layoutResize();
        $('#gcmsPictureViewer .modal-header .close').bind('click', function() {
            remove();
        });

        $('#gcmsPictureViewer .modal-header').dragmove($('#gcmsPictureViewer'));
    }    



    /**
     * 界面布局重置
     * @type {Function}
     */
    function layoutResize(){     
        $('#gcmsPictureViewer .modal-body').css({height:$(window).height()/2});   
    }   
    
    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe(){
        ONEMAP.C.publisher.subscribe(layoutResize,'sideBarLayoutChange');
        ONEMAP.C.publisher.subscribe(remove,'gcmsArticleShowRemove');
        ONEMAP.C.publisher.subscribe(remove, 'cleanMap');
    }

    /**
     * 取消监听
     * @type {Function}
     */
    function unSubscribe() {
        ONEMAP.C.publisher.unSubscribe(layoutResize,'sideBarLayoutChange');
    }

	/**
	 * 模块移除
	 * @return {[type]} [description]
	 */
	function remove(){
        $('#gcmsPictureViewer').remove();
		unSubscribe();
        modValue.iviewer = null;
	}

    return ONEMAP.M.gcmsPicture = {
        init:init,
        remove:remove
    }
});

