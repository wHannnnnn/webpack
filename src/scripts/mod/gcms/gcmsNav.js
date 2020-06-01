/**
 * [ONEMAP.M.gcmsNav]
 * @return {[object]}
 */
define([
    'html!templates/gcms/gcmsNav',
    'modDir/gcms/gcmsEvents',
    'css!styles/gcms/gcmsNav'
], function(tplLayout, gcmsEvents) {


    /**
    * 模块数据 用于数据存储和外部调用
    * @type {Object}
    * 数据存放
    */
    var modValue = {
        navData:null
    };
 
    /**
     * 状态值
     * @type {Boolean}
     * @default false
     * @private
     */
    var status = {
        initialized:false
    };

    /**
     * 模块初始化
     * @return {[type]} [description]
     */
    function init() {
        //栏目列表
        ONEMAP.D.gcmsColumnObjs = {};
        //当前栏目信息
        ONEMAP.D.gcmsCurColumnData = {};
        //当前栏目内容列表
        ONEMAP.D.gcmsCurColumnListData = {};
        //当前文章详细内容
        ONEMAP.D.gcmsCurArticleData = {};
        //当前文章模型内容
        ONEMAP.D.gcmsCurColumnModelData = {};

        //未初始化，初始化布局
        if (!status.initialized) {
            //设置容器布局
            setLayout();

            getNavData();

            //订阅推送
            subscribe();
            status.initialized = true;
        }
        //设置zIndex 为最高
        var zIndex = ONEMAP.M.sideBar.getZIndex();
        $('#gcmsMainMenu').css({zIndex:zIndex});

        ONEMAP.D.currentSideBarMod = 'gcmsNav';
        //开启侧栏
        ONEMAP.C.publisher.publish('show','layout::sideBar');
    }

    /**
     * 初始化布局
     */
    function setLayout(){        
        $(tplLayout).appendTo($("#sideBarBody"));        
        layoutResize();
        $("#gcmsMainMenu .menu").mCustomScrollbar({
            scrollInertia: 0
        });
    };
    /**
     * 窗口布局重置
     * @type {Function}
     */
    function layoutResize() {
        $("#gcmsMainMenu .menu").css({ height: $(window).height() - 59 });
        $("#gcmsMainMenu .menu").mCustomScrollbar('update');
    };


    function bindEvent() {
        $('#gcmsMenuColumnList .go-back').off('click').bind('click', function() {
            var navLeft = $('#gcmsMainMenu').position().left + 410;
            var parent = $(this).parent().parent().parent();
            $('#gcmsMainMenu').animate({ left: navLeft }, 200, function() {
                parent.addClass('collapsed');
            });
        });

        $('#gcmsMenuColumnList a:not(".go-back")').off('click').bind('click', function() {
            if ($(this).next().hasClass('collapse-section')) {
                $(this).parent().removeClass('collapsed');
                var navLeft = $('#gcmsMainMenu').position().left - 410;
                $('#gcmsMainMenu').animate({ left: navLeft }, 200);
            }
            $(this).parent().parent().find('.active').removeClass('active');
            $(this).addClass('active');
        });
    }
    /**
     * 获取 菜单数据
     * @return {[type]} [description]
     */
    function getNavData() {
        ONEMAP.V.loading.load();
        $.ajax({
                url: onemapUrlConfig.gcmsServiceUrl + '/showmenu?ticket=' + ONEMAP.D.user.ticket,
                type: "GET",
                dataType: 'json'
            })
            .done(function(data) {
                ONEMAP.V.loading.loaded();
                if (data.code == 4) {
                    ONEMAP.T.noPermission('getNavData');
                }
                if (data.code == 3) {
                    ONEMAP.T.logout('getNavData');
                }
                modValue.navData = data.data;
                buildMenuColumnObjs(data.data);
                setGcmsNav();
            })
            .fail(function() {
                ONEMAP.V.loading.loaded();
            });
    }

    /**
     * 构造菜单栏目 对象集合
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function buildMenuColumnObjs(options) {
        $(options).each(function(index, el) {
            ONEMAP.D.gcmsColumnObjs[el['name']] = el;
            if (el.hasOwnProperty('son_tree')) {
                buildMenuColumnObjs(el['son_tree']);
            }
        });
    }

    /**
     * 设置栏目列表
     */
    function setGcmsNav() {
        $(modValue.navData).each(function(index, el) {
            switch (el['bind_type']) {
                case 'column':
                    var a = $('<li class="column-menu collapsible collapsed"><a class="collapse-trigger"><span class="icon icon-angle-right f-r"></span><span class="icon icon-th-list"></span>' + el['title'] + '</a></li>');

                    if (el.hasOwnProperty('son_tree')) {
                        buildSonTreeNav(el).appendTo(a);
                    }
                    a.appendTo($('#gcmsMenuColumnList'));
                    break;
                case 'cms':
                    var a = $('<li class="column-menu collapsible collapsed"><a column-value="' + el['name'] + '"><span class="icon icon-columns"></span>' + el['title'] + '</a></li>');
                    a.bind('click', { navData: el }, function(e) {
                        require(['modDir/gcms/gcmsList'], function(gcmsList) {
                            gcmsList.init({
                                type: 'cms',
                                data: e.data.navData,
                                column_name: e.data.navData['name']
                            });
                        });
                    });
                    a.appendTo($('#gcmsMenuColumnList'));
                    break;
                case 'link':
                    $('<li class="column-menu collapsible collapsed"><a href="' + el['bind_value'] + '" target="_blank">' + el['title'] + '</a></li>').appendTo($('#gcmsMenuColumnList'));
                    break;
                case 'js':
                    $('<li class="column-menu collapsible collapsed"><a onclick="' + el['bind_value'] + '">' + el['title'] + '</a></li>').appendTo($('#gcmsMenuColumnList'));
                    break;
            }
        });

        $("#partNavMenuGroup .btn-group").mCustomScrollbar('update');

        bindEvent();
    }

    function buildSonTreeNav(data) {
        var ul = $('<ul class="collapse-section"><li><a class="go-back"><span class="icon icon-angle-left"></span><lable>返回 <span>' + data['title'] + '</span></lable></a></li></ul>');
        $(data['son_tree']).each(function(index, el) {
            switch (el['bind_type']) {
                case 'column':
                    var a = $('<li class="collapsed"><a class="collapse-trigger"><span class="icon icon-angle-right f-r"></span><span class="icon icon-th-list"></span>' + el['title'] + '</a></li>');

                    if (el.hasOwnProperty('son_tree')) {
                        buildSonTreeNav(el).appendTo(a);
                    }
                    a.appendTo(ul);
                    break;
                case 'cms':
                    var a = $('<li class="collapsed"><a column-value="' + el['name'] + '"><span class="icon icon-columns"></span>' + el['title'] + '</a></li>');
                    a.bind('click', { navData: el }, function(e) {
                        require(['modDir/gcms/gcmsList'], function(gcmsList) {
                            gcmsList.init({
                                type: 'cms',
                                data: e.data.navData,
                                column_name: e.data.navData['name']
                            });
                        });
                    });
                    a.appendTo(ul);
                    break;
                case 'link':
                    $('<li class="collapsed"><a href="' + el['bind_value'] + '" target="_blank">' + el['title'] + '</a></li>').appendTo(ul);
                    break;
                case 'js':
                    $('<li class="collapsed"><a onclick="' + el['bind_value'] + '">' + el['title'] + '</a></li>').appendTo(ul);
                    break;
            }
        });

        return ul;
    }

    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe() {}

    /**
     * 取消监听
     * @type {Function}
     */
    function unSubscribe() {}

    /**
     * 模块移除
     * @return {[type]} [description]
     */
    function remove() {
        unSubscribe();
    }

    return ONEMAP.M.gcmsNav = {
        init: init,
        remove: remove
    }
});
