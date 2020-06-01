/**
 * [ONEMAP.M.side_nav]
 * @return {[object]}
 */
define([
    'html!templates/sideNav',
    'html!templates/sideNavMapControl',
    'css!styles/sideNav',
    'css!styles/sideNavMapControl'
], function(tplSideNav, tplSideNavMapControl) {

    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
        currentOverLayerGuid: null
    }

    var status = {
        showSideNavMapControl: false,
        curMap2Dstatus: true,
        isAdd3d:false
    }

    var overLayerOpacityControl;

    function init() {
        setLayout();
        bindEvent();
        setDixingList();
        subscribe();
    };

    function setLayout() {
        $(tplSideNav).appendTo($("#sideNav .cover-content"));
        $(tplSideNavMapControl).appendTo($("#sideNav .cover-content"));

        $('#sideNavMapControl .usercentercon a').html(ONEMAP.D.user.name)

        if (ONEMAP.D.globalSettingData) {
            switch (ONEMAP.D.globalSettingData.mapSetting.type) {
                case 1:
                    $("#mapBaseLayerControl .choosemap .map-list li[mId='gm']").children('.biankuang').addClass('mapchoose');
                    break;
                case 2:
                    $("#mapBaseLayerControl .choosemap .map-list li[mId='gh']").children('.biankuang').addClass('mapchoose');
                    $('#mapBaseLayerControl .show-name').show();
                    $("#mapBaseLayerControl .show-name .chooseshow").addClass('active');
                    break;
                case 3:
                    $("#mapBaseLayerControl .choosemap .map-list li[mId='gt']").children('.biankuang').addClass('mapchoose');
                    break;
            }
        }

        $("#sideNavMapControl .ii-body").mCustomScrollbar({
            scrollInertia: 0
        });
    }

    function layoutResize() {};

    function subscribe(){
        ONEMAP.C.publisher.subscribe(closeSideNav,'layout::sideBar');
        ONEMAP.C.publisher.subscribe(closeSideNav,'mapChange');
    };
    function closeSideNav(){
        $('#sideNavMapControl').hide();
        $('#mapLayerControl').removeClass('open');
        status.showSideNavMapControl = false;
        changeMapLayerControl();
    };
    //地图导航栏图标变化
    function changeMapLayerControl(){
        var curMapName = ONEMAP.M.mapHolder.modValue.mainLayers;
        if(!status.showSideNavMapControl){
            if(curMapName ==='gt'){
                $("#mapLayerControl").css("background","url(/images/layout/maphideds.png) no-repeat center center");
            }else if(curMapName ==='gm'){
                $("#mapLayerControl").css("background","url(/images/layout/maphidexh.png) no-repeat center center");
            }else if(curMapName ==='gh'){
                $("#mapLayerControl").css("background","url(/images/layout/maphide.png) no-repeat center center");
            }else{
                $("#mapLayerControl").css("background","url(/images/layout/maphide3D.png) no-repeat center center");
            }
        }else{
            if(curMapName ==='gt'){
                $("#mapLayerControl").css("background","url(/images/layout/mapshowds.png) no-repeat center center");
            }else if(curMapName ==='gm'){
                $("#mapLayerControl.open").css("background","url(/images/layout/mapshowxh.png) no-repeat center center");
            }else if(curMapName ==='gh'){
                $("#mapLayerControl.open").css("background","url(/images/layout/mapshow.png) no-repeat center center");
            }else{
                $("#mapLayerControl").css("background","url(/images/layout/mapshowtd.png) no-repeat center center");
            }
        }
    }
    function bindEvent() {
        //控制地图导航栏显隐
        $('#mapLayerControl').bind('click', function() {
            if (!status.showSideNavMapControl) {
                $('#sideNavMapControl').show();
                $(this).addClass('open');
                status.showSideNavMapControl = true;
            } else {
                $('#sideNavMapControl').hide();
                $(this).removeClass('open');
                status.showSideNavMapControl = false;
            }
            changeMapLayerControl();
        });

        //底图图层切换
        $("#mapBaseLayerControl .choosemap .map-list li").bind("click", function() {
            var cid = $(this).attr("mId");
            $(this).children('.biankuang').addClass('mapchoose');
            $(this).siblings().children('.biankuang').removeClass('mapchoose');
            switch (cid) {
                case 'gt':
                case 'gm':
                case 'gh':
                    map23DControl.show2D();
                    map2DViewer.setDefaultTileLayer(cid);
                    ONEMAP.M.mapHolder.modValue.mainLayers = cid;
                    $($(".leaflet-control-scale-line")[0]).show();
                    if (!status.curMap2Dstatus) {
                        status.curMap2Dstatus = true;
                        $(".tools-elevation").show();
                        $(".tools-painting").show();
                        $(".tools-marker").show();
                        $(".tools-measuring3DE").hide();
                        $(".tools-LDZZ").hide();
                        $(".tools-KSFX").hide();
                        $(".tools-TSFX").hide();
                        $(".tools-flyLineModal").hide();
                        $("#sideLink3dData").hide();
                    }
                    ONEMAP.C.publisher.publish('2d', 'change23D');
                    break;
                case '3d':
                    map23DControl.show3D();
                    $($(".leaflet-control-scale-line")[0]).hide();
                    ONEMAP.M.mapHolder.modValue.mainLayers = cid;
                    if (!status.tdmapStatus) {
                        setTimeout(function() {
                            map3DViewer.tileLayer({
                                action: 'add',
                                layer: {
                                    url3D: map23DConfig.tileServerUrl + '/gr?z=%d&x=%d&y=%d',
                                    imageType: 'jpeg'
                                }
                            });
                            map3DViewer.DEMTileLayer({
                                action: 'add'
                            });

                            locaSpaceMap.Globe.Layers.AddTileLayer(3,256,0,19,-180,180,-90,90,"vtpt",onemapUrlConfig.placeNameServerUrl+"/name?x=%d&y=%d&z=%d","nameLayer","urlformat");

                            if(!status.isAdd3d){
                                ONEMAP.C.publisher.publish('3D', 'add3d');
                                status.isAdd3d = true;
                            }
                            locaSpaceMap.attachEvent('FireSceneMouseMove', FireSceneMouseMove)
                        }, 2000)
                        status.tdmapStatus = true;
                    } 
                    if (status.curMap2Dstatus) {
                        status.curMap2Dstatus = false;
                        $(".tools-elevation").hide();
                        $(".tools-painting").hide();
                        $(".tools-marker").hide();
                        $(".tools-measuring3DE").show();
                        $(".tools-LDZZ").show();
                        $(".tools-KSFX").show();
                        $(".tools-TSFX").show();
                        $(".tools-flyLineModal").show();
                        $("#sideLink3dData").css({display:'inline'});
                    }
                    ONEMAP.C.publisher.publish('3d', 'change23D');
                    require(['modDir/3dEarth'],function(tdEarth){
                        tdEarth.init();
                    });
                    break;
            }
            changeMapLayerControl();
            if (cid == 'gh') {
                $('#mapBaseLayerControl .show-name').show();
                $("#mapBaseLayerControl .show-name .chooseshow").addClass('active');
            } else {
                $('#mapBaseLayerControl .show-name').hide();
            }

        });
        //显示经纬网
        $("#mapBaseLayerControl .show-STLayer .chooseshow").bind("click", function() {
            if ($(this).hasClass('active')) {
                ONEMAP.C.publisher.publish('hide', 'mapHolder::STLatLngLayer');
                $(this).removeClass('active');
            } else {
                ONEMAP.C.publisher.publish('show', 'mapHolder::STLatLngLayer');
                $(this).addClass('active');
            }
        });
        //显示地名层
        $("#mapBaseLayerControl .show-name .chooseshow").bind("click", function() {
            if ($(this).hasClass('active')) {
                map2DViewer.setDefaultTileLayer('gr');
                $(this).removeClass('active');
            } else {
                map2DViewer.setDefaultTileLayer('gh');
                $(this).addClass('active');
            }
        })


        //专题地图更多
        $(".morethematicmap").bind("click", function() {
            require(['modDir/atlas/atlasList'], function(atlasList) {
                atlasList.init();
            });
        });

        //GCMS
        $("#sideNavMapControl .btn-gcms").bind("click", function() {
            require(['modDir/gcms/gcmsNav'], function(gcmsNav) {
                gcmsNav.init();
            });
        });

        //海量地图库
        $("#sideNavMapControl .btn-atals-labrary").bind("click", function() {
            var windowOpen = window.open();
            var openUrl = onemapUrlConfig.atlasLibraryUrl;
            windowOpen.location = openUrl;
        });

        //收藏
        $('#sideNavMapControl .abtn-user-fav').bind('click', function() {
            require(['modDir/user/userCenter'], function(userCenter) {
                userCenter.init('userFav');
            });
        });

        //设置
        $('#sideNavMapControl .abtn-user-setting').bind('click', function() {
            require(['modDir/user/userSetting'], function(userSetting) {
                userSetting.init();
            });
        });


        //更多专题地图
        $('#userThematic .abtn-more').bind('click', function() {
            //开启侧栏
            ONEMAP.C.publisher.publish('show', 'layout::sideBar');
            require(['modDir/atlas/atlasList'], function(atlasList) {
                atlasList.init();
            });
        });

    }

    function FireSceneMouseMove(e, sender, x, y) {
        var point2d = locaSpaceMap.CreatePoint2d();
        point2d.SetValue(x, y);
        point2d = locaSpaceMap.Globe.ScreenToScene(point2d);
        var latlng = {
            lat: point2d.Y,
            lng: point2d.X
        };
        var nLatlng = L.Util.formatHMS(latlng);
        $('#pointInfo').empty().append('经度：' + nLatlng.lng + '　纬度：' + nLatlng.lat);
    }
    //添加地形图组
    function setDixingList() {

        $(ONEMAP.D.globalSettingData.dixing).each(function(index, el) {
            var thematicLink = $('<a class="item thematic-layer-link"><span class="translate">' + el.name + '</span></a>');
            thematicLink.bind('click', el, function(e) {

                if ($(this).hasClass('selected')) {
                    removeCurrentOverLayer();
                    $(this).removeClass('selected');
                } else {

                    removeCurrentOverLayer();

                    //todo 此处需要完善 url
                    var tdTileLayerUrl = e.data['tileLayerUrl'].replace('?x={x}&y={y}&z={z}', '?z=%d&x=%d&y=%d');
                    tdTileLayerUrl = e.data['tileLayerUrl'].replace('{z}/{y}/{x}', '%dy/%d/%d');

                    modValue.currentOverLayerGuid = map23DControl.tileLayer({
                        action: 'add',
                        layer: {
                            url2D: e.data['tileLayerUrl'],
                            url3D: tdTileLayerUrl,
                            minZoom: e.data['min_zoom'],
                            maxZoom: e.data['max_zoom'],
                            maxNativeZoom: e.data['max_zoom'],
                            attribution: '',
                            opacity: 1,
                            imageType: 'png'
                        }
                    })
                    //添加图层透明度控件
                    overLayerOpacityControl = new L.Control.LayerOpacity(
                        map2DViewer.layers[modValue.currentOverLayerGuid], {
                            min_zoom: e.data['min_zoom'],
                            max_zoom: e.data['max_zoom'],
                            showFavBtn: false,
                            closeCallback: function() {
                                removeCurrentOverLayer();
                                $('#userThematicList .selected').removeClass('selected');
                            }
                        }
                    ).addTo(map2DViewer.map);

                    ONEMAP.D.overLayerCount++;

                    map2DViewer.map.setZoomScope(e.data['min_zoom'],e.data['max_zoom']);

                    map23DControl.setView({
                        center: {
                            lat: e.data['center'][0],
                            lng: e.data['center'][1]
                        },
                        zoom: e.data['min_zoom']
                    })

                    $('#userThematicList .selected').removeClass('selected');
                    $(this).addClass('selected');
                }


            });
            thematicLink.appendTo('#userThematicList');
        });
        //更新滚动条
        $('#userThematic .ii-body').mCustomScrollbar('update');
    }


    function removeCurrentOverLayer(){
        if (modValue.currentOverLayerGuid) {
            map23DControl.tileLayer({
                action: 'remove',
                guid: modValue.currentOverLayerGuid
            })
            modValue.currentOverLayerGuid = null;
            map2DViewer.map.removeControl(overLayerOpacityControl);
            overLayerOpacityControl = null;
        }

        ONEMAP.D.overLayerCount--;
        if(ONEMAP.D.overLayerCount == 0){
            map2DViewer.map.setZoomScope(1,21);
        }
    }

    return ONEMAP.M.sideNav = {
        init: init,
        changeMapLayerControl:changeMapLayerControl
    };

})
