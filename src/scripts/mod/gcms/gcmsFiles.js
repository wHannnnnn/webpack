/**
 * [ONEMAP.M.gcmsFiles]
 * @return {[object]}
 */
define([
    'html!templates/gcms/gcmsFiles',
    'vendorDir/handlebars/handlebars',
    'css!styles/gcms/gcmsFiles'
],
function(tpcLayout,Handlebars){
    //参数
    var modValue = {
        options:{}
    };

    //地图层
    //var _map = ONEMAP.M.mapHolder.map;
    /**
     * 模块初始化
     * @return {[type]} [description]
     */
    function init(options){
        modValue.options = {};
        for(var op in options){
            modValue.options[op] = options[op];
        }

        //获取内容数据
        getDetailData({callback:function(){
            showFiles();
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

            if(JSON.parse(data['data']['record'][modValue.options['field_name']]).length == 0){
                ONEMAP.C.publisher.publish({ type: 'warning', message: '没有文件数据' }, 'noteBar::add');
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
     * 事件绑定
     * @return {[type]} [description]
     */
    function bindEvent(){
        $('#gcmsFilesModal .modal-header .close').bind('click', function() {
            remove();
        });

        $('#gcmsFilesModal .modal-header').dragmove($('#gcmsFilesModal'));
    }

    function showFiles(){
        $('body').append(tpcLayout);
        bindEvent();
        
        $('#gcmsFilesModal').show();


        //显示列表
        $('#gcmsFilesList').empty();
        $(JSON.parse(ONEMAP.D.gcmsCurArticleData['record'][modValue.options['field_name']])).each(function(index, el) {
            $('<li><button vUrl="'+onemapUrlConfig.gcmsServiceUrl+'/file'+el+'?ticket='+ONEMAP.D.user.ticket+'" class="btn">文件['+(index+1)+']</button></li>').appendTo($('#gcmsFilesList'));
        });

        //$('#gcmsFilesList .btn:eq(0)').addClass('selected');

        $('#gcmsFilesList .btn').bind('click',function(){
            var filesFileUrl = $(this).attr('vUrl');
            window.open(filesFileUrl);
        });
    }

    /**
     * 界面布局重置
     * @type {Function}
     */
    function layoutResize(){
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
        $('#gcmsFilesModal').remove();
        unSubscribe();
    }

    return ONEMAP.M.gcmsFiles = {
        init:init,
        remove:remove
    }
});

