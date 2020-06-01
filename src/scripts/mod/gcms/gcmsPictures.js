/**
 * [ONEMAP.M.gcmsPictures]
 * @return {[object]}
 */
define([
    'html!templates/gcms/gcmsPictures',
    'vendorDir/handlebars/handlebars',
    'css!styles/gcms/gcmsPictures'],
function(tpcLayout,Handlebars){

    //数据存放和外部数据调用
    var modValue = {
        options:{},
        iviewer:null,
        picturesData:[]
    };
    

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
            setPicturesModal();
            bindEvent();
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
                ONEMAP.C.publisher.publish({ type: 'warning', message: '没有图册数据' }, 'noteBar::add');
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
    function setPicturesModal(){
        var picturesData = JSON.parse(ONEMAP.D.gcmsCurArticleData['record'][modValue.options['field_name']]);
        modValue.picturesData = [];

        $(picturesData).each(function(index, el) {
            modValue.picturesData.push({
                title:'图片'+(index+1),
                thumbnail_url:onemapUrlConfig.gcmsServiceUrl+'/file/thumbnail'+el+'?w=200&h=100'+'&ticket='+ONEMAP.D.user.ticket,
                img_url:onemapUrlConfig.gcmsServiceUrl+'/file'+el+'?ticket='+ONEMAP.D.user.ticket
            })
        });

        var template = Handlebars.compile(tpcLayout);
        $('body').append(template(modValue.picturesData));        
        $('#gcmsPicturesModal').show();
        setTimeout(function(){
            $('#gcmsPicturesModal .modal-body').mCustomScrollbar({
                horizontalScroll:true
            });
        },300);
        
    }

    /**
     * 事件绑定
     * @return {[type]} [description]
     */
	function bindEvent(){
        layoutResize();

        $('#gcmsPicturesModal .modal-header .close').bind('click', function() {
            remove();
        });

        $('#gcmsPicturesViewer .modal-header .close').bind('click',function(){
            $("#gcmsPicturesViewer").hide();
            $('#gcmsPicturesList .selected').removeClass('selected');
            modValue.iviewer.iviewer('loadImage', onemapUrlConfig.siteLibUrl+'/images/bg_fff_1.png');
        });

        $('#gcmsPicturesList li').bind('click', function () {
            $('#gcmsPicturesList .selected').removeClass('selected');
            $(this).addClass('selected');  
            $("#gcmsPicturesViewer").show();
            $('#gcmsPicturesViewerInfo .title').html(modValue.picturesData[$(this).attr('pid')]['title']);
            if(modValue.iviewer){
                modValue.iviewer.iviewer('loadImage', modValue.picturesData[$(this).attr('pid')]['img_url']);
                return false;
            }else {                
                modValue.iviewer = $("#gcmsPicturesViewerBox").iviewer(
                {
                    zoom_max:100,
                    zoom_min:5,
                    src: modValue.picturesData[$(this).attr('pid')]['img_url']
                });
            }  
        });

        $('#gcmsPicturesViewer .modal-header').dragmove($('#gcmsPicturesViewer'));

        


    }    



    /**
     * 界面布局重置
     * @type {Function}
     */
    function layoutResize(){
        //$('#gcmsPicturesModal').css({width:$(window).width()-50});
        $('#gcmsPicturesViewer .modal-body').css({height:$(window).height()/2});
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
        $('#gcmsPicturesModal').remove();
        $('#gcmsPicturesViewer').remove();
		unSubscribe();
        modValue.iviewer = null;
	}

    return ONEMAP.M.gcmsPictures = {
        init:init,
        remove:remove
    }
});

