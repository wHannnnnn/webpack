/**
 * @fileoverview 专题图 模块
 * @author Song.Huang
 * @version 1.0.0
 */
define([ 
    'html!templates/atlas/atlasList',
    'modDir/service/regionSearch',
    'css!styles/atlas/atlasList'
], function(tplLayout,regionSearchF) {

    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
        options : {
            page: 1, //页数
            pageSize: 24, //每页条数
            searchType: 'byPage', //搜索类型
            searchKeyWord: '', //搜索关键字
            searchId: 0, //搜索ID
            theme: null, //分类
            region: '', //当前区域 0 全球
            area: ''
        },
        //查询数据集合
        thematicDataResult:null,
        //专题图分类
        thematicCategory:[]
    }


    /**
     * 状态值
     * @type {Boolean}
     * @default false
     * @private
     */
    var status = {
        initialized:false
    };

    var overLayerOpacityControl;

    /**
     * 初始化容器
     * @type {Function}
     */
    function init() {
        //未初始化，初始化布局
        if (!status.initialized) {
            //设置容器布局
            setLayout();
            bindEvent();
            //获取专题图分类后，默认显示第一页列表
            getCategory(function() {                
                listThematicCategory();
                showThematic({ page: 1, searchType: 'byPage' });
            });
            //订阅推送
            subscribe();
            status.initialized = true;
        }
        //设置zIndex 为最高
        var zIndex = ONEMAP.M.sideBar.getZIndex();
        $('#thematicPanel').css({zIndex:zIndex});

        ONEMAP.D.currentSideBarMod = 'atlas';
        //开启侧栏
        ONEMAP.C.publisher.publish('show','layout::sideBar');
    };

    /**
     * 初始化布局
     */
    function setLayout(){        
        $(tplLayout).appendTo($("#sideBarBody"));        
        layoutResize();
        $(window).resize(function(event) {
            layoutResize();
        });
        $("#thematicResultsList").mCustomScrollbar({
            scrollInertia: 0
        });
    };
    /**
     * 窗口布局重置
     * @type {Function}
     */
    function layoutResize() {
        $("#thematicResultsList").css({ height: $("#sideBar").height() - 282 });
        $("#thematicResultsList").mCustomScrollbar('update');
    };

    /**
     * 界面事件绑定
     * @return {[type]} [description]
     */
    function bindEvent(){
        //region
        $('#currentRegionCheckbox').bind('click', function() {
            $('#currentAreaCheckbox').parent().removeClass('checked');
            $('#currentAreaCheckbox').removeAttr('checked');
            $('#thematicSearchKey').val('请输入名称');
            if ($(this).parent().hasClass('checked')) {
                modValue.options.region = '';
                modValue.options.page = 1;
                modValue.options.area = '';
                modValue.options.searchKeyWord = '';
                getPageResult(modValue.options);
                map2DViewer.map.off('zoomend moveend dragend', regionThematicSearch);
                $(this).parent().removeClass('checked');
            } else {
                map2DViewer.map.off('zoomend moveend dragend', areaThematicSearch);
                map2DViewer.map.on('zoomend moveend dragend', regionThematicSearch);
                modValue.options.area = '';
                modValue.options.searchKeyWord = '';
                regionThematicSearch();
                $(this).parent().addClass('checked');
            }
        });
        //bounds
        $('#currentAreaCheckbox').bind('click', function() {
            $('#currentRegionCheckbox').parent().removeClass('checked');
            $('#currentRegionCheckbox').removeAttr('checked');
            $('#thematicSearchKey').val('请输入名称');
            if ($(this).parent().hasClass('checked')) {
                modValue.options.page = 1;
                modValue.options.area = '';
                modValue.options.searchKeyWord = '';
                getPageResult(modValue.options);
                map2DViewer.map.off('zoomend moveend dragend', areaThematicSearch);
                $(this).parent().removeClass('checked');
            } else {
                modValue.options.region = '';
                map2DViewer.map.off('zoomend moveend dragend', regionThematicSearch);
                map2DViewer.map.on('zoomend moveend dragend', areaThematicSearch);
                modValue.options.region = '';
                modValue.options.searchKeyWord = '';
                areaThematicSearch();
                $(this).parent().addClass('checked');
            }
        });


        $('#thematicSearchKey').bind('focus', function() {
            if ($(this).val() == '请输入名称') {
                $(this).val('');
            };
        });

        $('#thematicSearchKey').bind('focusout', function() {
            if ($(this).val() == '') {
                $(this).val('请输入名称');
            };
        });

        //搜索回车搜索
        $('#thematicSearchKey').bind('keydown', function(e) {
            if (e.keyCode === 13) {
                if ($('#thematicSearchKey').val() != '' && $('#thematicSearchKey').val() != '请输入名称') {
                    thematicSearchHandler({
                        keyWord: $('#thematicSearchKey').val()
                    });
                }

            }
        });

        //按钮搜索
        $('#thematicSearchSubmit').bind('click', function() {
            if ($('#thematicSearchKey').val() != '' && $('#thematicSearchKey').val() != '请输入名称') {
                thematicSearchHandler({
                    keyWord: $('#thematicSearchKey').val()
                });
            }
        });

        //海量地图库
        $('.abtn-atlas-library').bind('click',function(){
            var windowOpen = window.open();
            var openUrl = onemapUrlConfig.atlasLibraryUrl;
            windowOpen.location = openUrl;
        })
    }

    
    

    /**
     * 显示指定参数的专题列表
     * @type {Function}
     * @param options {Object} {}
     */
    function showThematic(options) {
        ONEMAP.T.objExtend(modValue.options, options, true);
        getPageResult(modValue.options);
    };

    
    /**
     * 专题图查询
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function thematicSearchHandler(options) {
        $('#thematicCategoryList .cur').removeClass('cur');
        $('#thematicCategoryList li:eq(0)').addClass('cur');
        $('#currentAreaCheckbox').removeAttr('checked');
        $('#currentAreaCheckbox').parent().removeClass('checked');
        $('#currentRegionCheckbox').removeAttr('checked');
        $('#currentRegionCheckbox').parent().removeClass('checked');
        map2DViewer.map.off('zoomend moveend dragend', areaThematicSearch);
        map2DViewer.map.off('zoomend moveend dragend', regionThematicSearch);
        modValue.options.searchKeyWord = options.keyWord;
        modValue.options.searchType = 'byKeyWord';
        modValue.options.page = 1;
        modValue.options.theme = null;
        modValue.options.area = '';
        modValue.options.region = '';
        getPageResult(modValue.options);
    };

    /**
     * 搜索分类列表内容
     * @return {[type]} [description]
     */
    function listThematicCategory() {
        $('#thematicCategoryList ul').empty();
        var allLi = $('<li class="cur"><a href="javascript:void(0)">全部</a></li>');
        allLi.appendTo($('#thematicCategoryList ul'));
        for (var i = 0, l = modValue.thematicCategory.length; i < l; i++) {
            var item = modValue.thematicCategory[i];
            var li = $('<li><a cid="' + item['id'] + '" href="javascript:void(0)">' + item['name'] + '</a></li>');
            li.appendTo($('#thematicCategoryList ul'));
        }
        $('#thematicCategoryList li').bind('click', function(e) {
            $(this).parent().find('.cur').removeClass('cur');
            $(this).addClass('cur');
            var cid = $(this).find('a').attr('cid');
            modValue.options.theme = cid;
            modValue.options.page = 1;
            modValue.options.searchType = 'byPage';
            modValue.options.searchKeyWord = '';
            //ie6 hack
            e.preventDefault();
            //获取对应分类的专题图
            getPageResult(modValue.options);
        });

    };
    

    /**
     * 按行政区域查询 判断当前是否有专题图显示，有的话不查询
     * @return {[type]} [description]
     */
    function regionThematicSearch() {
        if (!modValue.currentOverLayerGuid && ONEMAP.D.currentSideBarMod == 'atlas') {
            var regionSearch = new regionSearchF();
            var zoom = (map2DViewer.map.getZoom() - 3) > 0 ? (map2DViewer.map.getZoom() - 3) : 1;
            var center = map2DViewer.map.getCenter();
            regionSearch.getRegionInfo({ latLng: [center.lat, center.lng], zoom: zoom }, function(data) {
                modValue.options.page = 1;
                //通过pac查询
                data = data.data;
                var region = data['level'][data['level'].length - 1]['code'];
                modValue.options.region = region.toString().length > 7 ? region.toString().substr(0, 7) : region;
                getPageResult(modValue.options);
            });
        }
    };

    /**
     * 按可视区域查询 判断当前是否有专题图显示，有的话不查询
     * @return {[type]} [description]
     */
    function areaThematicSearch() {
        if (!modValue.currentOverLayerGuid && ONEMAP.D.currentSideBarMod == 'atlas') {
            modValue.options.page = 1;
            //通过区域查询
            var mapBounds = map2DViewer.map.getBounds();
            if (mapBounds.getNorthEast().lng - mapBounds.getSouthWest().lng > 360) {
                mapBounds.getNorthEast().lng = 180;
                mapBounds.getSouthWest().lng = -180;
            }
            modValue.options.area = JSON.stringify([
                [L.Util.formatEarthLatLng(mapBounds.getSouthWest()).lng, L.Util.formatEarthLatLng(mapBounds.getSouthWest()).lat],
                [L.Util.formatEarthLatLng(mapBounds.getNorthEast()).lng, L.Util.formatEarthLatLng(mapBounds.getNorthEast()).lat]
            ]);
            getPageResult(modValue.options);
        }
    };

    /**
     * 根据options查询专题图
     * @type {Function}
     * @param options {Object} {page:页数，`:每页条数，searchType:查询类型 "byPage"/"byId"/"byKeyWord}
     * @private
     */
    function getPageResult(options) {
        switch (options.searchType) {
            case "byPage":
                ONEMAP.V.loading.load();
                byDefault(function(data) {
                    ONEMAP.V.loading.loaded();
                    if (!data.hasOwnProperty('map_list')) {
                        setNotResultHtml('没有搜索到相关的信息。');
                        $("#thematicPage").hide();
                    } else {
                        modValue.thematicDataResult = data;
                        createResultHtml();
                    }
                });
                break;
            case "byKeyWord":
                ONEMAP.V.loading.load();
                byKeyWord(options.searchKeyWord, function(data) {
                    ONEMAP.V.loading.loaded();
                    if (!data.hasOwnProperty('map_list')) {
                        setNotResultHtml('没有搜索到 ' + options.searchKeyWord + ' 的信息。');
                        $("#thematicPage").hide();
                    } else {
                        modValue.thematicDataResult = data;
                        createResultHtml();
                    }
                });
                break;
        }
    };

    /**
     * 无结果列表
     * @type {Function}
     * @param notText {String} 无结果提示文字
     * @returns {*}
     * @private
     */
    function setNotResultHtml(notText) {
        $("#thematicResultsList .item-list").empty();
        $('<p class="not-result">' + notText + '</p>').appendTo($("#thematicResultsList .item-list"));
        $("#thematicPage").hide();
    };


    /**
     * 更新侧栏 列表和分页
     * @type {Function}
     * @private
     */
    function createResultHtml() {
        //清除当前加载的专题图
        removeCurrentOverLayer();
        
        if (modValue.thematicDataResult && modValue.thematicDataResult.map_list.length > 0) {
            //列表
            var ul = $('<ul class="thematic-list"></ul>');
            for (var i = 0, l = modValue.thematicDataResult.map_list.length; i < l; i++) {
                //var itemData = modValue.thematicDataResult.map_list[i];
                var num = i + 1;
                var imgsrc = (onemapUrlConfig.thematicThumbUrl + '?production_id=' + modValue.thematicDataResult.map_list[i].guid + '&thumb_id=' + modValue.thematicDataResult.map_list[i].thumb_min_id).toString() + '&v=' + (onemapVersion.split('='))[1];
                var li = $('<li><a href="javascript:void(0)" title="' + modValue.thematicDataResult.map_list[i].name + '">' +
                    '<img src="' + imgsrc + '"/>' +
                    '<span>' + modValue.thematicDataResult.map_list[i].name + '</span></a></li>');
                $(li).find('a').bind("click", { itemData: modValue.thematicDataResult.map_list[i] }, function(event) {
                    var _data = event.data.itemData;

                    if($(this).parent().hasClass('select')){
                        //移除图层
                        removeCurrentOverLayer();
                        
                    }else {
                        //先移除再添加图层到地图上
                        removeCurrentOverLayer();
                        addOverLayerToMap(_data);
                        $(this).parent().addClass('select');
                    }
                });
                $(ul).append(li);
            }
            $('#thematicResultsList').find('a').unbind();
            $("#thematicResultsList .item-list").empty().append(ul);
            $("#thematicResultsList").mCustomScrollbar('update');
            ul = null;
            //分页
            //
            if((modValue.options.page * modValue.options.pagesize) >= modValue.thematicDataResult.total){
                $("#thematicPage").hide();
                return;
            }

            $("#thematicPage").empty();
            var countPages = (parseInt(modValue.thematicDataResult.total % modValue.thematicDataResult.pagesize) > 0 ? parseInt(modValue.thematicDataResult.total / modValue.thematicDataResult.pagesize + 1) : parseInt(modValue.thematicDataResult.total / modValue.thematicDataResult.pagesize));
            if (countPages == 0) {
                countPages = 1;
            } 
            var _pageJump = $('<div class="firstpage"></div>' +
                '<div class="uppage"></div>' +
                '<div class="fg"></div>' +
                '<div id="thematicPageJump" class="count">' +
                '   <span>' + modValue.thematicDataResult.page + '/' + countPages + '页</span>' +
                '</div>' +
                '<div class="fg"></div>' +
                '<div class="nextpage"></div>' +
                '<div class="endpage"></div>'
            );
            _pageJump.appendTo($("#thematicPage"));
            if (modValue.thematicDataResult.page == 1) {
                $("#thematicPage .firstpage").css("background", "url(../images/layout/page_11.png) no-repeat 7px 11px")
                $("#thematicPage .uppage").css("background", "url(../images/layout/page_13.png) no-repeat 10px 11px")
                $("#thematicPage .nextpage").css("background", "url(../images/layout/page_06ch.png) no-repeat 10px 11px")
                $("#thematicPage .endpage").css("background", "url(../images/layout/page_08ch.png) no-repeat 7px 11px")
            } else if (modValue.thematicDataResult.page == countPages) {
                $("#thematicPage .firstpage").css("background", "url(../images/layout/page_11ch.png) no-repeat 7px 11px")
                $("#thematicPage .uppage").css("background", "url(../images/layout/page_13ch.png) no-repeat 10px 11px")
                $("#thematicPage .nextpage").css("background", "url(../images/layout/page_06.png) no-repeat 10px 11px")
                $("#thematicPage .endpage").css("background", "url(../images/layout/page_08.png) no-repeat 7px 11px")
            } else {
                $("#thematicPage .firstpage").css("background", "url(../images/layout/page_11ch.png) no-repeat 7px 11px")
                $("#thematicPage .uppage").css("background", "url(../images/layout/page_13ch.png) no-repeat 10px 11px")
                $("#thematicPage .nextpage").css("background", "url(../images/layout/page_06ch.png) no-repeat 10px 11px")
                $("#thematicPage .endpage").css("background", "url(../images/layout/page_08ch.png) no-repeat 7px 11px")
            }
            $(".firstpage").bind("click", function() {
                modValue.thematicDataResult.page = 1;
                var op = "f";
                clickpage(modValue.thematicDataResult.page, countPages);
                $("#thematicPageJump span").html(modValue.thematicDataResult.page + "/" + countPages);
            })
            $(".uppage").bind("click", function() {
                modValue.thematicDataResult.page--
                var op = "u";
                if (modValue.thematicDataResult.page < 1) {
                    modValue.thematicDataResult.page = 1
                } else {
                    clickpage(modValue.thematicDataResult.page, countPages);
                    $("#thematicPageJump span").html(modValue.thematicDataResult.page + "/" + countPages);
                }

            })
            $(".nextpage").bind("click", function() {
                modValue.thematicDataResult.page++
                    var op = "n";
                if (modValue.thematicDataResult.page > countPages) {
                    modValue.thematicDataResult.page = countPages
                } else {
                    clickpage(modValue.thematicDataResult.page, countPages);
                    $("#thematicPageJump span").html(modValue.thematicDataResult.page + "/" + countPages);
                }
            })
            $(".endpage").bind("click", function() {
                modValue.thematicDataResult.page = countPages;
                var op = "e";
                clickpage(modValue.thematicDataResult.page, countPages);
                $("#thematicPageJump span").html(modValue.thematicDataResult.page + "/" + countPages);
            })
            $("#thematicPageJump .page_num").bind('keydown', function(e) {
                if (e.keyCode === 13) {
                    var pageJump = parseInt($("#thematicPageJump .page_num").val());
                    if (!pageJump || pageJump > countPages) {
                        return;
                    } else {
                        showThematic({ page: parseInt(pageJump),});
                    }
                }
            });

            var _themtiicPageBtnGroup = $('<div class="btn-group"></div>').appendTo($("#thematicPage"));

            if (modValue.thematicDataResult.pagesize < modValue.thematicDataResult.total) {
                if (modValue.thematicDataResult.page == 1) {
                    var abtnNext = $('<button type="button" class="btn btn2 btn-small next" pid=' + (modValue.thematicDataResult.page + 1) + '>下一页</button>');
                    
                } else if (countPages == modValue.thematicDataResult.page && modValue.thematicDataResult.total > modValue.thematicDataResult.pagesize) {
                    var abtnPrev = $('<button type="button" class="btn btn2 btn-small prev" pid=' + (modValue.thematicDataResult.page - 1) + '>上一页</button>');
                    
                } else {
                    var abtnPrev = $('<button type="button" class="btn btn2 btn-small prev" pid=' + (modValue.thematicDataResult.page - 1) + '>上一页</button>');
                    var abtnNext = $('<button type="button" class="btn btn2 btn-small next" pid=' + (modValue.thematicDataResult.page + 1) + '>下一页</button>');
                }

                $("#thematicPage .btn").on("click", function() {
                    showThematic({ page: parseInt($(this).attr('pid')) });
                });
            }
            $("#thematicPage").show();
        } else {
            $("#thematicResultsList .item-list").empty().html('<p class="not-result">暂无数据！</p>');
            $("#thematicPage").hide();
        }
    };

    /**
     * 换页点击事件
     */
    function clickpage(op, allp) {
        if (op == 1) {
            $("#thematicPage .firstpage").css("background", "url(../images/layout/page_11.png) no-repeat 7px 11px")
            $("#thematicPage .uppage").css("background", "url(../images/layout/page_13.png) no-repeat 10px 11px")
            $("#thematicPage .nextpage").css("background", "url(../images/layout/page_06ch.png) no-repeat 10px 11px")
            $("#thematicPage .endpage").css("background", "url(../images/layout/page_08ch.png) no-repeat 7px 11px")
        } else if (op == allp) {
            $("#thematicPage .firstpage").css("background", "url(../images/layout/page_11ch.png) no-repeat 7px 11px")
            $("#thematicPage .uppage").css("background", "url(../images/layout/page_13ch.png) no-repeat 10px 11px")
            $("#thematicPage .nextpage").css("background", "url(../images/layout/page_06.png) no-repeat 10px 11px")
            $("#thematicPage .endpage").css("background", "url(../images/layout/page_08.png) no-repeat 7px 11px")
        } else {
            $("#thematicPage .firstpage").css("background", "url(../images/layout/page_11ch.png) no-repeat 7px 11px")
            $("#thematicPage .uppage").css("background", "url(../images/layout/page_13ch.png) no-repeat 10px 11px")
            $("#thematicPage .nextpage").css("background", "url(../images/layout/page_06ch.png) no-repeat 10px 11px")
            $("#thematicPage .endpage").css("background", "url(../images/layout/page_08ch.png) no-repeat 7px 11px")
        }
        modValue.options.page = parseInt(op);
        showThematic({ page: parseInt(op),searchType: 'byPage'});
    };
    

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
                url2D: onemapUrlConfig.thematicTileUrl + '/' + data.guid + '?l={z}&x={x}&y={y}',
                url3D: onemapUrlConfig.thematicTileUrl + '/' + data.guid + '?z=%d&x=%d&y=%d',
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
                thematic_data:data,
                min_zoom:data['min_zoom'],
                max_zoom:data['max_zoom'],
                showFavBtn:true,
                favCallback:addFavThematic,
                closeCallback:removeCurrentOverLayer
            }            
        ).addTo(map2DViewer.map);

        ONEMAP.D.overLayerCount++;
        map2DViewer.map.setZoomScope(data['min_zoom'],data['max_zoom']);
        

        map23DControl.setView({
            center: {
                lat: data['center_lat'],
                lng: data['center_lon']
            },
            zoom: data['min_zoom']
        })

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
            $('#thematicResultsList li.select').removeClass('select');
        }

        ONEMAP.D.overLayerCount--;
        if(ONEMAP.D.overLayerCount == 0){
            map2DViewer.map.setZoomScope(1,21);
        }
    };

    /**
     * 收藏专题图
     * @param {[type]} layerObj [description]
     */
    function addFavThematic(layerObj) {
        require(['modDir/user/userThematic'], function(userThematic) {
            userThematic.addThematic(layerObj);
        });
    };

    /**
     * 获取专题图分类
     * @return {[type]} [description]
     */
    function getCategory(callback_func) {
        var ajaxUrl = onemapUrlConfig.thematicDataUrl + '/map/theme';
        ONEMAP.V.loading.load();
        $.ajax({
            url: ajaxUrl,
            type: 'GET',
            dataType: 'jsonp'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            modValue.thematicCategory = data;
            callback_func(data);
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        });
    };

    /**
     * 根据 options 参数获取 专题列表信息
     * @param callback_func {Function} 回调方法
     * @return {Object}
     */
    function byDefault(callback_func) {
        var ajaxUrl = onemapUrlConfig.thematicDataUrl + '/map/list' + '?types=[1,2,4]&page=' + modValue.options.page + '&pagesize=' + modValue.options.pageSize + '&region=' + modValue.options.region + '&area=' + modValue.options.area;
        if (modValue.options.theme != null && modValue.options.theme != 'undefined') {
            ajaxUrl += '&theme=' + modValue.options.theme;
        }
        ONEMAP.V.loading.load();
        $.ajax({
            url: ajaxUrl,
            type: 'GET',
            dataType: 'jsonp'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            callback_func(data);
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        });
    };

    /**
     * 关键字查询
     * @param keyword {String} 关键字
     * @param callback_func {Function} 回调方法
     * @return {Object}
     */
    function byKeyWord(keyword, callback_func) {
        var ajaxUrl = onemapUrlConfig.thematicDataUrl + '/map/list' + '?types=[1,2,4]&page=' + modValue.options.page + '&pagesize=' + modValue.options.pageSize + '&search=' + encodeURIComponent(keyword) + '&region=' + modValue.options.region + '&area=' + modValue.options.area;
        ONEMAP.V.loading.load();
        $.ajax({
            url: ajaxUrl,
            type: 'GET',
            dataType: 'jsonp'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            callback_func(data);
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        });
    };

    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe() {
        // map2DViewer.map.on('layerOpacity:addFav', addFavThematic);
        ONEMAP.C.publisher.subscribe(removeCurrentOverLayer, 'cleanMap');
    };
    

    /**
     * 移除事件
     * @type {Function}
     */
    function remove() {
    }

    return ONEMAP.M.thematic = {
        init: init,
        addOverLayerToMap:addOverLayerToMap,
        removeCurrentOverLayer:removeCurrentOverLayer
    };

});
