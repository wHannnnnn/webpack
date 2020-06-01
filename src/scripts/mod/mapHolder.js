/**
 * [ONEMAP.M.mapHolder]
 * @return {[object]}
 * 地图框架引入
 * 地图操作
 */
define([
    'modDir/service/addressSearch',
    'modDir/service/poiSearch',
    'modDir/service/regionSearch',
    'modDir/service/routeSearch',
    'css!scripts/vendor/map23dlib/map23DView',
    'css!styles/mapHolder'
], function(addressSearchF,poiSearchF,regionSearchF,routeSearchF) {
    /**
     * 地图初始化 根据客户端的类型 初始pc端和移动端
     * @exports ONEMAP.M.mapHolder
     * @type {Object}
     */
    var modValue = {
        mainLayers:null
    } 
    /**
     * 地图初始化参数
     */
    var options = {
        center: [39.90743, 116.39134],
        zoom: 6
    };

    //模块状态
    var status = {
    }

    //右键菜单内容
    var contextmenuPlaceName = L.DomUtil.create('span', 'contextmenu-place-name');
    var contextmenuLatlng = L.DomUtil.create('span', 'contextmenu-latlng');
    var contextMenuItem = [{
            text: contextmenuPlaceName,
            runCall: getContextmenuPlaceName,
            className: 'place',
            callback: disable

        }, {
            text: contextmenuLatlng,
            runCall: getContextmenuLatlng,
            className: 'latlng',
            callback: disable
        }, {
            text: '从这里出发',
            icon: '../images/layout/ico_p_2.png',
            callback: pointStartli
        }, {
            text: '添加途经点',
            icon: '../images/layout/ico_p_4.png',
            callback: pointAcrossli
        }, {
            text: '添加规避点',
            icon: '../images/layout/ico_p_5.png',
            callback: pointAvoidli
        }, {
            text: '到这里去',
            icon: '../images/layout/ico_p_1.png',
            callback: pointStopli
        }, {
            text: '周边搜索',
            icon: '../images/layout/ico_s_search.png',
            callback: aroundFindli
        }, {
            text: '加入地图书签',
            icon: '../images/layout/ico_s_fav.png',
            callback: addBookMarker
        }, {
            text: '清空地图',
            callback: cleanMapli
        }
    ];
    
    var STLatLngLayerControl;
    
    /**
     * 初始化
     * @type {Function}
     * @returns {*}
     */
    function init() {
        if (ONEMAP.D.globalSettingData) {
            options.center = [ONEMAP.D.globalSettingData.mapSetting.center.lat, 
                            ONEMAP.D.globalSettingData.mapSetting.center.lng];
            options.zoom = ONEMAP.D.globalSettingData.mapSetting.zoom;
        }
        mapInit();
        subscribe();

        //移除加载动画
        
        if (navigator.appName == "Microsoft Internet Explorer") {
            $('#loadingGif').fadeOut(200, function() {
                $('#loadingTop').animate({
                    top: '0px'
                }, 600, 'linear');
                $('#loadingBottom').animate({
                    top: '100%'
                }, 600, 'linear', function() {
                    $('#loadingPanel').fadeOut(400);
                });
            });
        } else {
            setTimeout(function() {
                $('#loadingPanel').addClass('open');
                setTimeout(function() {
                    $('#loadingPanel').fadeOut(400);
                }, 1000)
            }, 200)
        }
    };


    function mapInit() {

        //地图加载
        map23DControl.init({
            mapWrapId: 'mapHolder',
            view: {
                center: {
                    lat: options.center[0],
                    lng: options.center[1]
                },
                zoom: options.zoom
            },
            display: {
                map2D: true,
                map3D: true
            }
        });
        map23DControl.show2D();
        $('#map3DWrap').css({height:$(window).height()-60});

        //设置地图边界
        map2DViewer.map.setMaxBounds([
            [84,180],
            [-84,-180]
            ]);

        if (ONEMAP.D.globalSettingData) {
            switch (ONEMAP.D.globalSettingData.mapSetting.type) {
                case 1:
                    map2DViewer.setDefaultTileLayer("gm");
                    modValue.mainLayers = "gm";
                    break;
                case 2:
                    map2DViewer.setDefaultTileLayer("gh");
                    modValue.mainLayers = "gh";
                    break;
                case 3:
                    map2DViewer.setDefaultTileLayer("gt");
                    modValue.mainLayers = "gt";
                    break;
            }
            ONEMAP.M.sideNav.changeMapLayerControl();
        }

        $("#map2DWrap").bind("contextmenu",function(){
            return false;
        });
        //添加右键菜单
        for(var i=0;i<contextMenuItem.length;i++){
            if(contextMenuItem[i].hasOwnProperty('runCall')){
                map2DViewer.map.contextmenu.addItem({
                    text:contextMenuItem[i].text,
                    runCall:contextMenuItem[i].runCall,
                    callback:contextMenuItem[i].callback,
                    icon:contextMenuItem[i].icon,
                    className:contextMenuItem[i].className
                })
            }else{
                map2DViewer.map.contextmenu.addItem({
                    text:contextMenuItem[i].text,
                    callback:contextMenuItem[i].callback,
                    icon:contextMenuItem[i].icon
                })
            }
        }
        //加载比例尺控件
        map2DViewer.setScaleControl({
            action: 'add',
            metric: true,
            imperial: false,
            position: 'bottomleft', //topleft topright 
            offset: [0, 0]
        });
        $(".leaflet-control-scale-line").appendTo($("#footer .f-center"));
        //缩放等级控件
        L.control.zoomslider({
            position: 'bottomleft'
        }).addTo(map2DViewer.map);
        //加载地图鼠标样式
        var mouseBlur = new L.Control.MouseBlur({
            color: '#1b417f',
            opacity: 1
        }).addTo(map2DViewer.map);
        //添加经纬网
        STLatLngLayerControl = L.control.STLatLngLayer().addTo(map2DViewer.map);
        

        //鼠标移动获取经纬度
        map2DViewer.map.on('mousemove', function(e) {
            var nLatlng = L.Util.formatHMS(e.latlng);
            $('#pointInfo').empty().append('经度：' + nLatlng.lng + '　纬度：' + nLatlng.lat);
        });
        map2DViewer.map.on('dragend',function(){
            ONEMAP.C.publisher.publish('','mapChange');
        })


        map2DViewer.map.on('zoomend',function(){
            if(map2DViewer.map.getZoom() == map2DViewer.map.options.maxZoom){
                ONEMAP.C.publisher.publish({ type: 'warning', message: '已达地图最大显示级别' }, 'noteBar::add');
            }

            if(map2DViewer.map.getZoom() == map2DViewer.map.options.minZoom){
                ONEMAP.C.publisher.publish({ type: 'warning', message: '已达地图最小显示级别' }, 'noteBar::add');
            }
        })
        
        //临时使用
        map2DViewer.tileLayer({
            action:'add',
            layer:{
                url2D:'http://www.google.cn/maps/vt/lyrs=y&z={z}&x={x}&y={y}',
                minZoom:1,
                maxZoom:19,
                attribution:'',
                opacity:1
            }
        });
    };

    /**
     * 设置经纬网
     */
    function setSTLatLngLayer(options) {
        if(options == 'show'){
            STLatLngLayerControl.changStatus(true);
            locaSpace.SetLatLonGridVisible(true);
            locaSpaceMap.Refresh()
        }else {
            STLatLngLayerControl.changStatus(false);
            locaSpace.SetLatLonGridVisible(false);
            locaSpaceMap.Refresh()
        }
    };
    
    /**
     * 右键菜单函数
     */
    //
    function disable(){
        return false
    };
    //从这里出发
    function pointStartli(e){
        require(['modDir/tools/toolRouteSearch'], function(toolRouteSearch) {
            toolRouteSearch.setStartPoint(e.latlng);
        });
    };
    //添加途经点
    function pointAcrossli(e){
        require(['modDir/tools/toolRouteSearch'], function(toolRouteSearch) {
            toolRouteSearch.setAcrossPoint(e.latlng);
        });
    };
    //添加规避点
    function pointAvoidli(e){
        require(['modDir/tools/toolRouteSearch'], function(toolRouteSearch) {
            toolRouteSearch.setAvoidPoint(e.latlng);
        });
    };
    //到这里去
    function pointStopli(e){
        require(['modDir/tools/toolRouteSearch'], function(toolRouteSearch) {
            toolRouteSearch.setStopPoint(e.latlng);
        });
    };
    //周边搜索
    function aroundFindli(e){
        require(['modDir/tools/toolPlaceSearch'], function(toolPlaceSearch) {
            toolPlaceSearch.rightClickPopup(e.latlng);
        });
    };
    //加入地图书签
    function addBookMarker(){
        require(['modDir/user/userFav'], function(userFav) {
            userFav.addFav();
        });
    };
    //清空地图
    function cleanMapli(){
        ONEMAP.C.publisher.publish('','cleanMap');
        ONEMAP.C.publisher.publish({modName: 'cleanMap',
            }, 'tools:active');
    }; 
    /**
     * 判断是否是正确的latlng
     * @param lat
     * @param lng
     * @returns {boolean}
     */
    function isNatureLatLng(lat, lng) {
        if (lat > -90 && lat < 90 && lng > -180 && lng < 180) {
            return true;
        } else {
            return false;
        }
    };
    function getContextmenuPlaceName(e){
        contextmenuPlaceName.innerHTML = '正在搜索中...';
        var earthLatlng = L.Util.formatEarthLatLng(e.latlng);
        if (isNatureLatLng(earthLatlng.lat, earthLatlng.lng)) {
            var addressSearch = new addressSearchF();
            addressSearch.getAddressInfo({
                zoom: map2DViewer.map.getZoom(),
                latLng: [earthLatlng.lat, earthLatlng.lng]
            }, function(data) {
                data = data.data;
                contextmenuPlaceName.innerHTML = data.region ? data.region : '未知地点';
            });
        }
    };
    function getContextmenuLatlng(e){
        var nLatlng = L.Util.formatHMS(e.latlng);
        contextmenuLatlng.innerHTML = nLatlng.lng + ' , ' + nLatlng.lat;
    };

    /**
     * 地图容器重置
     * @return {[type]} [description]
     */
    function mapResize(){
        if(ONEMAP.M.pcLayout.status.showFullMap){
            $('#map3DWrap').css({height:$(window).height(),top:'0px'});
        }else {
            $('#map3DWrap').css({height:$(window).height()-60,top:'60px'});
        }
        
        setTimeout(function(){
            map2DViewer.map.invalidateSize();
        },100);        
    }

    
    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe() {
        ONEMAP.C.publisher.subscribe(setSTLatLngLayer,'mapHolder::STLatLngLayer');
        ONEMAP.C.publisher.subscribe(mapResize,'layout::resize');
    };


    return ONEMAP.M.mapHolder = {
        init: init,
        modValue: modValue
    };
})
