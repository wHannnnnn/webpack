/**
 * @fileoverview 用户 地点记录 模块
 * @author Song.Huang
 * @version 1.0.0
 */
define([
    'html!templates/user/userThematic',
    'css!styles/user/userThematic'],
function(tplLayout) {
    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
        options: {
            page: 1,
            pageSize: 20
        },
        favData: null
    }
    /**
     * 模块状态，用于存储模块的状态 例如：收起，关闭
     * @type {Object}
     */
    var status = {
        initialized: false,
    }

    //分页
    var pageContainer,
        favPageBtnGroup,
        pageJump;

    var overLayerOpacityControl;

    /**
     * 初始化
     * @type {Function}
     */
    function init() {
        setLayout();
        subscribe();
        showPage({
            page:1
        });
    }


    /**
     * 设置界面
     */
    function setLayout(){
        $("#usrCenterContent").empty().append(tplLayout);
        pageContainer = $('<div id="userFavPage" class="page-wrap"></div>').appendTo($("#usrCenterContent"));
        $("#userFav").mCustomScrollbar({
            scrollInertia: 0
        });
        layoutResize();
        $(window).resize(function() {
            layoutResize();
        });
    }


    /**
     * 界面重置
     * @return {[type]} [description]
     */
    function layoutResize(){
        $("#userFav").css({height:$(window).height()-154});
        $("#userFav").mCustomScrollbar("update");
    }


    /**
     * 显示指定参数的列表
     * @type {Function}
     * @param options {Object} 参数
     * @see options
     * @private
     */
    function showPage(options){
        ONEMAP.T.objExtend(modValue.options,options,true);
        getFavData();
    }


    /**
     * 获取收藏数据
     * @type {Function}
     * @private
     */
    function getFavData() {
        ONEMAP.V.loading.load();
        $.ajax({
            type: "get",
            dataType: 'json',
            url: onemapUrlConfig.userCenterUrl+ '/thematic/list'+
                '?page=' + modValue.options.page + 
                '&size=' + modValue.options.pageSize + 
                '&ticket='+ONEMAP.D.user.ticket,
            success: function(data) {
                ONEMAP.V.loading.loaded();
                modValue.favData = data;
                setFavItem();
            },
            error:function(errorData){
                ONEMAP.V.loading.loaded();
            }
        });
    }


    /**
     * 设置收藏列表item
     * @type {Function}
     * @private
     */
    function setFavItem(){
        var count = 0;
        $("#userFavList").empty();
        if(modValue.favData['list'].length > 0){
            for(var i= 0,l=modValue.favData['list'].length; i<l; i++){
                var da = modValue.favData['list'][i];
                count++;
                var itemHtml = $('<dt fid="'+da._id+'"><span class="num">'+count+'</span><span class="name">'+da.name +'</span>'+
                    '<span class="option"><a class="del" title="删除">删除</a><a class="edit" title="编辑">编辑</a></span></dt>');

                itemHtml.bind('mouseenter',function(){
                    $(this).addClass('hover');
                }).bind('mouseleave',function(){
                    $(this).removeClass('hover');
                });

                itemHtml.find('.name').bind('click',{da:da},function(e){
                    
                    removeCurrentOverLayer();
                    addOverLayerToMap(e.data.da);

                    map23DControl.setView({
                        center: {
                            lat: e.data.da.center_lat,
                            lng: e.data.da.center_lon
                        },
                        zoom: e.data.da.initial_zoom
                    })                                        
                });
                itemHtml.find('.del').bind('click',{da:da},function(e){
                    delForm(e.data.da,$(this));
                });
                itemHtml.find('.edit').bind('click',{da:da},function(e){
                    editForm(e.data.da,$(this));
                });

                $("#userFavList").append(itemHtml);
            }

            //分页
            pageContainer.empty();

            var countPages = (parseInt(modValue.favData.total % modValue.favData.size)>0?parseInt(modValue.favData.total / modValue.favData.size + 1):parseInt(modValue.favData.total / modValue.favData.size));
            if(countPages==0){
                countPages = 1;
            }
            pageJump = $('<div id="userFavPageJump" class="count"><span>第</span><input class="page_num input input-small" value="'+modValue.favData.current_page+'" type="text" /><span>/'+countPages+'页</span></div>');
            pageJump.appendTo(pageContainer);


            $("#userFavPageJump .page_num").bind('keydown', function (e) {
                if (e.keyCode === 13) {
                    var pageJump = parseInt($("#userFavPageJump .page_num").val());
                    if(!pageJump || pageJump > countPages){
                        return;
                    }else {                            
                        showPage({page:parseInt(pageJump)});
                    }
                }
            });

            favPageBtnGroup = $('<div class="btn-group"></div>').appendTo(pageContainer);

            if (modValue.favData.size < modValue.favData.total) {
                if (modValue.favData.current_page == 1) {
                    var abtnNext = $('<button type="button" class="btn btn2 btn-small next" pid=' + (modValue.favData.current_page + 1) + '>下一页</button>');
                    favPageBtnGroup.append(abtnNext);
                } else if (countPages == modValue.favData.current_page && modValue.favData.total > modValue.favData.size) {
                    var abtnPrev = $('<button type="button" class="btn btn2 btn-small prev" pid=' + (modValue.favData.current_page - 1) + '>上一页</button>');
                    favPageBtnGroup.append(abtnPrev);
                } else {
                    var abtnPrev = $('<button type="button" class="btn btn2 btn-small prev" pid=' + (modValue.favData.current_page - 1) + '>上一页</button>');
                    var abtnNext = $('<button type="button" class="btn btn2 btn-small next" pid=' + (modValue.favData.current_page + 1) + '>下一页</button>');

                    favPageBtnGroup.append(abtnPrev).append(abtnNext);
                }

                $("#userFavPage .btn").on("click", function () {
                    showPage({page: parseInt($(this).attr('pid'))});
                });
            }
        }else {
            pageContainer.empty();
            $("#userFavList").append('<p class="not-result">暂无数据!</p>');
        }

        $("#userFav").mCustomScrollbar("update");
        
    }


    /**
     * 添加专题图层到地图层
     * @type {Function}
     * @param obj {Object} 构造好了的专题图对象
     * @private
     */
    function addOverLayerToMap(data) {
        //添加到23D地图上
        //如果是2D 添加透明度控件
        modValue.currentOverLayerGuid = map23DControl.tileLayer({
            action: 'add',
            layer: {  
                url2D: onemapUrlConfig.thematicTileUrl + '/' + data.t_id + '?l={z}&x={x}&y={y}',
                url3D: onemapUrlConfig.thematicTileUrl + '/' + data.t_id + '?z=%d&x=%d&y=%d',
                minZoom: data['min_zoom'],
                maxZoom: data['max_zoom'],
                maxNativeZoom: data['max_zoom'],
                attribution: '',
                opacity: 1,
                imageType: 'png'
            }
        })

        overLayerOpacityControl = new L.Control.LayerOpacity(
            map2DViewer.layers[modValue.currentOverLayerGuid],
            {
                min_zoom:data['min_zoom'],
                max_zoom:data['max_zoom'],
                showFavBtn:false,
                closeCallback:removeCurrentOverLayer
            }            
        ).addTo(map2DViewer.map);

        ONEMAP.D.overLayerCount++;
        map2DViewer.map.setZoomScope(data['min_zoom'],data['max_zoom']);

    };

    /**
     * 移除当前显示专题图
     * @private
     */
    function removeCurrentOverLayer() {
        if(modValue.currentOverLayerGuid){
            map23DControl.tileLayer({
                action: 'remove',
                guid:modValue.currentOverLayerGuid
            })
            modValue.currentOverLayerGuid = null;
            map2DViewer.map.removeControl(overLayerOpacityControl);
            overLayerOpacityControl = null;
        }

        ONEMAP.D.overLayerCount--;
        if(ONEMAP.D.overLayerCount == 0){
            map2DViewer.map.setZoomScope(1,21);
        }
    };

    /**
     * 添加收藏
     */
    function addThematic(thematicData) {
        //构造数据
        var ajaxData = {};
        ajaxData.name = thematicData.name;
        ajaxData.center_lat = map23DData.view.center['lat'];
        ajaxData.center_lon = map23DData.view.center['lng'];
        ajaxData.initial_zoom = map23DData.view.zoom;
        ajaxData.t_id = thematicData.guid;
        ajaxData.min_zoom = thematicData.min_zoom;
        ajaxData.max_zoom = thematicData.max_zoom;
        ajaxData.map_type = thematicData.map_type;
        ajaxData.data_type = thematicData.data_type;
        ajaxData.thumb_min_id = thematicData.thumb_min_id;

        ONEMAP.V.loading.load();
        $.ajax({
            type: "get",
            dataType: 'json',
            url:onemapUrlConfig.userCenterUrl+'/thematic/add'+
                    '?ticket='+ONEMAP.D.user.ticket,
            data: ajaxData,
            success: function(data) {
                ONEMAP.V.loading.load();
                if (data.success) {
                    ONEMAP.C.publisher.publish({type:'success',message:'收藏专题图（'+thematicData.name+'）成功'},'noteBar::add');
                    getFavData();

                } else {
                    ONEMAP.C.publisher.publish({type:'error',message:'收藏专题图（'+thematicData.name+'）失败'},'noteBar::add');
                }
            },
            error:function(errorData){
                ONEMAP.V.loading.loaded();
            }
        });
    }


    /**
     * 编辑表单
     * @type {Function}
     * @param data {Object} 表单数据
     * @param self {Object} 父类
     * @private
     */
    function editForm(data,self){
        var parent = self.parent().parent();
        var formHtml = $('<div class="form">' +
            '<input type="text" class="input input-small" maxlength="20" value="'+data.name+'" />' +
            '<button class="btn sure btn2 btn-small">确定</button>' +
            '<button class="btn cancel btn2 btn-small">取消</button>' +
            '</div> ');
        formHtml.find('.cancel').bind('click',function(){
            formHtml.remove();
        });
        parent.append(formHtml);
        formHtml.find('.sure').bind('click',{da:data,self:parent},function(e){
            updateFav(e);
        });
    }

    /**
     * 更新收藏
     * @type {Function}
     * @param e
     * @returns {boolean}
     * @private
     */
    function updateFav(e){
        var name = e.data.self.find('.input').val();
        if(name ==='' || name.indexOf(' ') >= 0){
            ONEMAP.C.publisher.publish({ type: 'warning', message: '名称不能为空或包含空格' }, 'noteBar::add');
            e.data.self.find('.input').focus();
            return false;
        }
        if((/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s]/g).test(name)){
            ONEMAP.C.publisher.publish({ type: 'warning', message: '名称只能包含英文、数字、中文' }, 'noteBar::add');
            e.data.self.find('.input').focus();
            return false;
        }
        e.data.self.find('.name').text(name);
        var fId = e.data.da._id;
        var ajaxData = {_id:fId,name:name};
        e.data.self.find('.form').remove();
        ONEMAP.V.loading.load();
        $.ajax({
            type:"get",
            dataType:'json',
            url:onemapUrlConfig.userCenterUrl+'/thematic/update'+
                '?ticket='+ONEMAP.D.user.ticket,
            data:ajaxData,
            success:function(data){
                ONEMAP.V.loading.loaded();
                if(data.code == 4){
                    ONEMAP.T.noPermission('updateFav');
                }
                if(data.code == 3){
                    ONEMAP.T.logout('updateFav');
                }

                if(data.success){
                    ONEMAP.C.publisher.publish({type:'success',message:'更新专题图（'+name+'）成功'},'noteBar::add');
                    getFavData();
                }else if(data.hasOwnProperty('success') && !data.success) {
                    ONEMAP.C.publisher.publish({type:'error',message:'更新专题图（'+name+'）失败，'+data.msg},'noteBar::add');
                }else{
                    ONEMAP.C.publisher.publish({type:'error',message:'更新专题图（'+name+'）失败'},'noteBar::add');
                }
            },
            error:function(errorData){
                ONEMAP.V.loading.loaded();
            }
        });
    }

    /**
     * 删除表单
     * @param  {[type]} data [description]
     * @param  {[type]} self [description]
     * @return {[type]}      [description]
     */
    function delForm(data,self){
        var parent = self.parent().parent();
        var formHtml = $('<div class="form">' +
            '<button class="btn cancel btn2 btn-small" style="float:right;margin-right:18px;">取消</button>' +
            '<button class="btn sure btn2 btn-small" style="float:right">确定</button>' +
            '</div> ');
        formHtml.find('.cancel').bind('click',function(){
            formHtml.remove();
        });
        parent.append(formHtml);
        formHtml.find('.sure').bind('click',{da:data,self:parent},function(e){
            delFav(e.data.da._id);
        });
    }


    /**
     * 删除收藏
     * @type {Function}
     * @param id {Number}
     * @private
     */
    function delFav(id){
        var ajaxData = {_id:id};
        ONEMAP.V.loading.load();
        $.ajax({
            type:"get",
            dataType:'json',
            url:onemapUrlConfig.userCenterUrl+'/thematic/del'+
                '?ticket='+ONEMAP.D.user.ticket,
            data:ajaxData,
            success:function(data){
                ONEMAP.V.loading.loaded();
                if(data.code == 4){
                    ONEMAP.T.noPermission('delFav');
                }
                if(data.code == 3){
                    ONEMAP.T.logout('delFav');
                }
                if(data.success){
                    ONEMAP.C.publisher.publish({type:'success',message:'删除专题图成功'},'noteBar::add');
                    getFavData();
                }else if(data.hasOwnProperty('success') && !data.success) {
                    ONEMAP.C.publisher.publish({type:'error',message:'删除专题图失败，'+data.msg},'noteBar::add');
                }else{
                    ONEMAP.C.publisher.publish({type:'error',message:'删除专题图失败'},'noteBar::add');
                }
            },
            error:function(errorData){
                ONEMAP.V.loading.loaded();
            }
        });
    }

    /**
     * 注册订阅
     * @type {Function}
     * 推送：ONEMAP.C.publisher.publish(options,'userFavuleName::type');
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
        status.initialized = false;
        modValue.options ={
            page:1,
            pageSize:20
        };
    }


    return ONEMAP.M.userThematic = {
        init: init,
        remove:remove,
        addThematic: addThematic
    }
});
