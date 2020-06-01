define([
    'html!templates/tools/toolPlaceSearch',
    'modDir/service/addressSearch',
    'modDir/service/poiSearch',
    'modDir/service/routeSearch',
    'css!styles/tools/toolPlaceSearch'
], function(tpcLayout, addressSearchF, poiSearchF,routeSearchF) {

    /**
     * 索引函数
     */
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt, from) {
            var len = this.length;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0) {
                from += len;
            }

            for (; from < len; from++) {
                if (from in this && this[from] === elt) {
                    return from;
                }
                return -1;
            }
        }
    }
    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
        markers:{},
        options: {
            page: 1,
            bounds: null,
            pageSize: 10,
            keyWord: '',
            type: 'bounds', // bounds/dis
            center: null, //中心点
            dis: 0, //圆范围
            themeId: null, //类型
            pac: 0, //区域pac
            init_query_key: '' //原始查询关键字
        },
        initialized: false, //是否初始化
        placeDataResult: null, //查询数据集合
        fitBounds: true, //最优显示
        circleGroup: null, //圆容器
        searchCircle:null,
        searchPoup:null,
        markerGroup: null, //标记容器
        hotPoint: [{
                "name": "热门",
                "id": "0",
                "sons": [
                    { "name": "交通枢纽", "id": "11" },
                    { "name": "加油站", "id": "14" },
                    { "name": "停车场", "id": "16" },
                    { "name": "桥梁", "id": "12" },
                    { "name": "居民点", "id": "5" },
                    { "name": "机关团体", "id": "42" },
                    { "name": "企事业单位", "id": "43" },
                    { "name": "旅游区", "id": "6" }
                ]
            }, {
                "name": "交通",
                "id": "1",
                "sons": [{
                    "name": "交通枢纽",
                    "id": "11",
                    "sons": [
                        { "name": "山口、关隘", "id": "1341", "sons": "" },
                        { "name": "锚地", "id": "2311", "sons": "" },
                        { "name": "海港", "id": "2312", "sons": "" },
                        { "name": "河港", "id": "2313", "sons": "" },
                        { "name": "船闸、升船机战", "id": "2314", "sons": "" },
                        { "name": "渡口", "id": "2315", "sons": "" },
                        { "name": "长途汽车站", "id": "2322", "sons": "" },
                        { "name": "火车站", "id": "1232", "sons": "" },
                        { "name": "航空港", "id": "2341", "sons": "" }
                    ]
                }, {
                    "name": "桥梁",
                    "id": "12",
                    "sons": [
                        { "name": "桥梁", "id": "2361", "sons": "" }
                    ]
                }, {
                    "name": "隧道",
                    "id": "13",
                    "sons": [
                        { "name": "隧道", "id": "2362", "sons": "" }
                    ]
                }, {
                    "name": "加油站",
                    "id": "14",
                    "sons": [
                        { "name": "加油站", "id": "2366", "sons": "" }
                    ]
                }, {
                    "name": "导航站",
                    "id": "15",
                    "sons": [
                        { "name": "灯塔、导航站", "id": "2367", "sons": "" }
                    ]
                }, {
                    "name": "停车场",
                    "id": "16",
                    "sons": [
                        { "name": "停车场", "id": "2354", "sons": "" }
                    ]
                }]
            }, {
                "name": "设施",
                "id": "2",
                "sons": [{
                    "name": "电力",
                    "id": "21",
                    "sons": [
                        { "name": "电力设施", "id": "246", "sons": "" }
                    ]
                }, {
                    "name": "通信",
                    "id": "22",
                    "sons": [
                        { "name": "通信设施", "id": "247", "sons": "" }
                    ]
                }, {
                    "name": "水利",
                    "id": "23",
                    "sons": [
                        { "name": "井", "id": "241", "sons": "" },
                        { "name": "蓄水区", "id": "242", "sons": "" },
                        { "name": "排灌设施", "id": "243", "sons": "" },
                        { "name": "堤堰", "id": "244", "sons": "" },
                        { "name": "运河", "id": "245", "sons": "" }
                    ]
                }, {
                    "name": "其他",
                    "id": "29",
                    "sons": [
                        { "name": "场", "id": "263", "sons": "" }
                    ]
                }]
            }, {
                "name": "水系",
                "id": "3",
                "sons": [{
                    "name": "海岛",
                    "id": "31",
                    "sons": [
                        { "name": "海洋岛屿", "id": "115", "sons": "" }
                    ]
                }, {
                    "name": "河流",
                    "id": "32",
                    "sons": [
                        { "name": "河流", "id": "121", "sons": "" }
                    ]
                }, {
                    "name": "池塘水库",
                    "id": "33",
                    "sons": [
                        { "name": "湖泊", "id": "122", "sons": "" },
                        { "name": "池塘", "id": "2421", "sons": "" },
                        { "name": "水库", "id": "2423", "sons": "" }
                    ]
                }]
            }, {
                "name": "单位",
                "id": "4",
                "sons": [{
                    "name": "军事单位",
                    "id": "41",
                    "sons": [
                        { "name": "军事区", "id": "2175", "sons": "" },
                        { "name": "军事单位", "id": "275", "sons": "" }
                    ]
                }, {
                    "name": "机关团体",
                    "id": "42",
                    "sons": [
                        { "name": "党政机关", "id": "271", "sons": "" },
                        { "name": "民间组织", "id": "272", "sons": "" }
                    ]
                }, {
                    "name": "企事业单位",
                    "id": "43",
                    "sons": [
                        { "name": "事业单位", "id": "273", "sons": "" },
                        { "name": "企业", "id": "274", "sons": "" }
                    ]
                }, {
                    "name": "开发区",
                    "id": "44",
                    "sons": [
                        { "name": "工业区、开发区", "id": "2173", "sons": "" }
                    ]
                }, {
                    "name": "边贸口岸",
                    "id": "45",
                    "sons": [
                        { "name": "边贸区、口岸", "id": "2174", "sons": "" }
                    ]
                }]
            }, {
                "name": "居民点",
                "id": "5",
                "sons": [{
                    "name": "城镇",
                    "id": "51",
                    "sons": [
                        { "name": "城镇居民点", "id": "221", "sons": "" }
                    ]
                }, {
                    "name": "农村",
                    "id": "52",
                    "sons": [
                        { "name": "农村居民点", "id": "222", "sons": "" }
                    ]
                }, {
                    "name": "其他",
                    "id": "59",
                    "sons": [
                        { "name": "工矿点", "id": "223", "sons": "" },
                        { "name": "农、林、牧场等", "id": "224", "sons": "" },
                        { "name": "其他", "id": "229", "sons": "" }
                    ]
                }]
            }, {
                "name": "旅游",
                "id": "6",
                "sons": [{
                    "name": "纪念地",
                    "id": "61",
                    "sons": [
                        { "name": "纪念地", "id": "251", "sons": "" }
                    ]
                }, {
                    "name": "公园",
                    "id": "62",
                    "sons": [
                        { "name": "公园", "id": "252", "sons": "" }
                    ]
                }, {
                    "name": "风景区",
                    "id": "63",
                    "sons": [
                        { "name": "风景名胜区（点）", "id": "253", "sons": "" }
                    ]
                }, {
                    "name": "山地",
                    "id": "64",
                    "sons": [
                        { "name": "山地", "id": "134", "sons": "" }
                    ]
                }]
            }] //常用热点关键字
    };
    /**
     * 初始化
     * @type {Function}
     * @param options {Object}
     */
    function init() {
        if (!modValue.initialized) {
            setLayout();
            bindEvent();
            subscribe();
            modValue.initialized = true;
            modValue.markerGroup = map23DControl.group({
                action: 'add'
            });
        }
        ONEMAP.C.publisher.publish({
            modName: 'placeSearch',
        }, 'tools:active');
    };
    /**
     * 数据合并
     */
    function initData(options){
        if(typeof(options) != "undefined"){
            modValue.options.bounds = options.bounds || map2DViewer.map.getBounds();
            modValue.options.keyWord = options.keyWord || '';
            modValue.options.type = options.type || 'bounds';
            modValue.options.center = options.center || map23DData.view.center;
            modValue.options.dis = options.dis || null;
            modValue.options.themeId = options.themeId || null;
            return modValue.options;
        }
    };
    /**
     * 监听事件
     */
    function subscribe() {
        //ONEMAP.C.publisher.subscribe(rePlaceSearch,'add3d');
        ONEMAP.C.publisher.subscribe(clearMarker, 'cleanMap');
        ONEMAP.C.publisher.subscribe(remove, 'tools:active');
    }; 
    function unSubscribe() {
        ONEMAP.C.publisher.unSubscribe(clearMarker, 'cleanMap');
        ONEMAP.C.publisher.unSubscribe(remove, 'tools:active');
    };
    function clearMarker() {
        map23DControl.group({
            action: 'cleanAll',
            guid: modValue.markerGroup
        })
        map2DViewer.map.off('dragend zoomend', searchInViewFire);
        $(".category-list-wrap").empty();
        $(".place-list").empty();
        $(".page-wrap").empty();
        $("#searchInViewFrom").hide();
        $("#searchresult").hide();
    }

    function remove(options) {
        if (options.modName === 'placeSearch') {
            if (modValue.options.type === 'pac') {
                if ($(".tools-search").hasClass('cur')) {
                    $(".tools-search").removeClass('cur');
                    $("#searchInViewFrom").hide();
                    $("#searchresult").hide();
                    //clearMarker();
                } else {
                    $(".tools-search").addClass('cur');
                    $("#searchInViewKey").val('关键字');
                    $("#searchInViewFrom").show();
                    $("#searchInViewFrom").css({
                        top:1,
                    })
                    $("#searchresult").css({
                        top:39
                    })
                    //$("#searchresult").show();
                }
                $(".tools-serchView").removeClass('cur');
            } else if (modValue.options.type === 'bounds') {
                if ($(".tools-serchView").hasClass('cur')) {
                    $(".tools-serchView").removeClass('cur');
                    $("#searchInViewFrom").hide();
                    $("#searchresult").hide();
                    $("#searchInViewFrom").css({
                        top:1,
                    })
                    $("#searchresult").css({
                        top:39
                    })
                    //clearMarker();
                } else {
                    $(".tools-serchView").addClass('cur');
                    $("#searchInViewFrom").show();
                    $("#searchInViewKey").val('关键字');
                    $("#searchInViewFrom").css({
                        top:95,
                    })
                    $("#searchresult").css({
                        top:134
                    })
                    //$("#searchresult").show();
                }
                $(".tools-search").removeClass('cur');
            }
        } else {
            $(".tools-search").removeClass('cur');
            $(".tools-serchView").removeClass('cur')
            $("#searchInViewFrom").hide();
            $("#searchresult").hide();
            //clearMarker();
        }
    };

    function setLayout() {
        $("#searchresult .cover-content").empty().html(tpcLayout);
        $("#placePanel .place-list-wrap").mCustomScrollbar({
            scrollInertia: 0
        });
    };
    
    function changSearchType(type) {
        clearMarker();
        switch (type) {
            case 'pac':
                modValue.options.type = 'pac';
                map2DViewer.map.off('dragend zoomend', searchInViewFire);
                break;
            case 'bounds':
                modValue.options.type = 'bounds';
                //map2DViewer.map.on('dragend zoomend', searchInViewFire);
        }
    };

    function searchInViewFire() {
        setTimeout(function() {
            var keyWord = $('#searchInViewKey').val();
            if (keyWord != '' && keyWord != '关键字') {
                ONEMAP.D.user.searchKeyWord = keyWord;
                changeToBoundsSearch({
                    keyWord: keyWord
                });
            }
        }, 600)
    };

    function globalSearchFire() {
        var qkeyWord = $("#searchInViewKey").val();
        if (qkeyWord != '' && qkeyWord != '请输入地名关键字') {
            if (modValue.options.type === 'pac') {
                ONEMAP.D.user.searchKeyWord = qkeyWord;
                globalSearch({
                    keyWord: qkeyWord
                });
            } else {
                ONEMAP.D.user.searchKeyWord = qkeyWord;
                changeToBoundsSearch({ keyWord: qkeyWord });
                map2DViewer.map.on('dragend zoomend', searchInViewFire);
            }
        }
    };

    function globalSearch(options) {
        modValue.fitBounds = true;
        //判断输入
        if (options.keyWord == '') {
            alert('查询关键字不能为空');
            return false;
        }

        if (options.keyWord.length < 2) {
            alert('查询关键字不允许输入单字');
            return false;
        }

        if ((/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s\"]/g).test(options.keyWord)) {
            alert('查询关键字只能包含英文、数字、中文');
            return false;
        }
        modValue.options.init_query_key = options.keyWord;
        getAreaInfo({ keywords: options.keyWord }, function(data) {
            if (data.residue_addr_name.length > 0) {
                if (initData({ keyWord: data.residue_addr_name })) {
                    //如果只返回一个参考地址
                    if (data.address.length == 1) {
                        //如果有pac 按pac查
                        //if(data.address[0].area_pac>0){
                        modValue.options.type = 'pac';
                        modValue.options.pac = (data.address[0].area_pac.toString()).length > 2 ? (data.address[0].area_pac.toString().substr(2, data.address[0].area_pac.toString().length - 1)) : data.address[0].area_pac;
                        if (modValue.options.pac.length > 7) {
                            modValue.options.pac = modValue.options.pac.substr(0, 7);
                        }
                        if (map23DData.display.map2D) {
                            map2DViewer.map.setView([data.address[0].area_lat, data.address[0].area_lon], getZoom({ 'pac': modValue.options.pac }));
                        } else if (map23DData.display.map3D) {
                            fly3DInView(data.address[0].area_lat, data.address[0].area_lon,getZoom({ 'pac': modValue.options.pac }));
                        }
                        getPageResult({ page: 1 });
                        //如果返回多个参考地址，列出参考地址
                    } else {
                        createNameListForSearchResultHtml(data);
                    }
                }
            } else {
                if (data.address[0].pac > 0) {
                    if (initData({ keyWord: data.name })) {
                        if (map23DData.display.map2D) {
                            map2DViewer.map.setView([data.address[0].lat, data.address[0].lon], getZoom({ 'pac': data.address[0].pac.toString().substr(2, data.address[0].pac.toString().length - 1) }));
                        } else if (map23DData.display.map3D) {
                            fly3DInView(data.address[0].lat, data.address[0].lon, getZoom({ 'pac': data.address[0].pac.toString().substr(2, data.address[0].pac.toString().length - 1) }))
                        }
                        //ONEMAP.M.toolsBar.setSystemNote({type:'success',message:'已切换至 '+data.address[0].name+' 区域'});
                        modValue.placeDataResult = {
                            list: [{
                                cn: data.address[0].name,
                                lon: data.address[0].lon,
                                tc: 0,
                                tid: 0,
                                pac: 0,
                                lat: data.address[0].lat,
                                id: 0
                            }],
                            num_pages: 1,
                            page: 1,
                            per_page: 10,
                            total: 10,
                            type: 1
                        };
                        createResultHtml({ fitBounds: false });
                        setPlaceResultHtml();
                        setTimeout(function() {
                            modValue.markers[0].openPopup();
                        }, 300);
                    }
                } else {
                    modValue.fitBounds = true;

                    if (initData({})) {
                        createNameListResultHtml(data);
                    }
                    return false;
                }
            }
        });
    };
    function getPageResult(options){
        cleanMarkerGroup();
        modValue.options.page = options.page;
        var poiSearch = new poiSearchF({
            page:modValue.options.page,
            pageSize:modValue.options.pageSize
        });
        ONEMAP.V.loading.load();
        if(modValue.options.type === 'bounds'){
            var bounds = {
                southWest:[modValue.options.bounds.getSouthWest().lat,modValue.options.bounds.getSouthWest().lng],
                northEast:[modValue.options.bounds.getNorthEast().lat,modValue.options.bounds.getNorthEast().lng]
            };
                poiSearch.getPoiByOptions({bounds:bounds,keywords:modValue.options.keyWord},
                    function(data){
                        ONEMAP.V.loading.loaded();
                        if(data.hasOwnProperty('type')){
                            if(data.type == 1){
                                if(data.hasOwnProperty('data')&& data['data'].length>0){
                                    data.page = data.page*1;
                                    modValue.placeDataResult = data;
                                    createResultHtml(options);
                                    setPlaceResultHtml();
                                }else {
                                    setNotResultHtml('没有搜索到 '+modValue.options.init_query_key+' 的信息，请修改搜索条件。');
                                }
                            }else if(data.type == 2) {
                                data.page = data.page*1;
                                    modValue.placeDataResult = data;
                                    createResultHtml(options);
                                    setPlaceResultHtml();
                            }
                        }else {
                            setNotResultHtml('没有搜索到 '+modValue.options.init_query_key+' 的信息，请修改搜索条件。');
                        }
                });       
        }else if(modValue.options.type ==='theme'){
            var themeOptions = {
                rangeCenter:[modValue.options.center.lat,modValue.options.center.lng],
                range:modValue.options.dis
            };
            if(modValue.options.themeId || modValue.options.keyWord){                        
                if(modValue.options.themeId){
                    themeOptions.themeId = modValue.options.themeId;
                }
                if(modValue.options.keyWord){
                    themeOptions.keywords = modValue.options.keyWord;
                }
            }
            
            poiSearch.getPoiByOptions(themeOptions,function(data){
                ONEMAP.V.loading.loaded();
                if(data.hasOwnProperty('data')&& data['data'].length>0){
                    data.page = data.page*1;
                    modValue.placeDataResult = data;
                    createResultHtml(options);
                    setPlaceResultHtml();
                }else {
                    setNotResultHtml('没有搜索到相关的信息，请修改搜索条件。');
                }



            });
        }else if(modValue.options.type ==='pac'){
            poiSearch.getPoiByOptions({pac:modValue.options.pac,keywords:modValue.options.keyWord},function(data){
                ONEMAP.V.loading.loaded();
                if(data.hasOwnProperty('type')){
                    if(data.type == 1){
                        if(data.hasOwnProperty('data')&& data['data'].length>0){
                            data.page = data.page*1;
                            modValue.placeDataResult = data;
                            createResultHtml(options);
                            setPlaceResultHtml();
                        }else {
                            setNotResultHtml('没有搜索到 '+modValue.options.init_query_key+' 的信息，请修改搜索条件。');
                        }
                    }else if(data.type == 2) {
                        data.page = data.page*1;
                            modValue.placeDataResult = data;
                            createResultHtml(options);
                            setPlaceResultHtml();
                    }
                }else {
                    setNotResultHtml('没有搜索到 '+modValue.options.init_query_key+' 的信息，请修改搜索条件。');
                }                        

            });
        }
    };
    /**
     * 三维跳转
     */
    function fly3DInView(lat,lng,zoom){
        map3DViewer.flyTo({
            center:{
                lat:lat,
                lng:lng
            }, 
            zoom:zoom,
            heading:0,//摄像机平面角度 正北为0
            tilt:0,//摄像机倾斜角
        });
    };
    /**
     * 构建分页数据
     * @type {Function}
     * @returns {*}
     * @private
     */
    function createResultHtml(options){
        $(".category-list-wrap").empty();
        $(".place-list").empty();
        $(".page-wrap").empty();
        if(modValue.placeDataResult.type == 2){               

            $('<h3>请选择查询的区域:</h3>').appendTo($(".category-list-wrap"));

            //列出一级                
            var place_fi_length = 0;
            for(var place_fi in modValue.placeDataResult['data']){

                if(ONEMAP.T.getObjNameAry(modValue.placeDataResult['data']).length>1){
                    place_fi_length++;
                    var _placeDl = $('<dl class="areaSelect fi" pid="'+modValue.placeDataResult['data'][place_fi]['pac']+'"></dl>');
                    var _placeDt = $('<dt><a href="javascript:void(0)">'+place_fi+'('+modValue.placeDataResult['data'][place_fi]['count']+')</a></dt>');
                    modValue.placeDataResult['data'][place_fi].area_name = place_fi;
                    _placeDl.bind('click',{d:modValue.placeDataResult['data'][place_fi]},function(e){ 
                        if(modValue.options.type == 'pac'){
                            if(map23DData.display.map2D){
                                map2DViewer.map.setView([e.data.d.lat,e.data.d.lon],getZoom({'pac':e.data.d.pac}));  
                            }else if(map23DData.display.map3D){
                                fly3DInView(e.data.d.lat,e.data.d.lon,getZoom({'pac':e.data.d.pac}));
                            }
                            modValue.options.pac = e.data.d.pac;
                            setTimeout(function(){
                                modValue.options.type = 'pac';
                                getPageResult({page:1});
                            }, 300);
                        }else {
                            if(map23DData.display.map2D){
                                map2DViewer.map.setView([e.data.d.lat,e.data.d.lon],map23DData.view.zoom+2);  
                            }else if(map23DData.display.map2D){
                                fly3DInView(e.data.d.lat,e.data.d.lon,map23DData.view.zoom+2);
                            }
                        }
                         
                        $(".category-list-wrap").empty();
                        
                    });

                    _placeDt.appendTo(_placeDl);
                    _placeDl.appendTo($(".category-list-wrap"));
                }                    

                //列出二级
                var place_se_length = 0;
                for(var place_se in modValue.placeDataResult['data'][place_fi]['sub']){
                    if(ONEMAP.T.getObjNameAry(modValue.placeDataResult['data'][place_fi]['sub']).length > 1){
                        place_se_length++;
                        var _placeDl_se = $('<dl class="areaSelect se" pid="'+modValue.placeDataResult['data'][place_fi]['sub'][place_se]['pac']+'"></dl>');
                        var _placeDt_se = $('<dt><a href="javascript:void(0)">'+place_se+'('+modValue.placeDataResult['data'][place_fi]['sub'][place_se]['count']+')</a></dt>');
                        modValue.placeDataResult['data'][place_fi]['sub'][place_se].area_name = place_se;
                        _placeDl_se.bind('click',{d:modValue.placeDataResult['data'][place_fi]['sub'][place_se]},function(e){ 
                            if(modValue.options.type == 'pac'){
                                if(map23DData.display.map2D){
                                    map2DViewer.map.setView([e.data.d.lat,e.data.d.lon],getZoom({'pac':e.data.d.pac}));  
                                }else if(map23DData.display.map2D){
                                    fly3DInView(e.data.d.lat,e.data.d.lon,getZoom({'pac':e.data.d.pac}));
                                }
                                modValue.options.pac = e.data.d.pac;
                                setTimeout(function(){
                                    modValue.options.type = 'pac';
                                    getPageResult({page:1});
                                }, 300);
                            }else {
                                if(map23DData.display.map2D){
                                    map2DViewer.map.setView([e.data.d.lat,e.data.d.lon],map23DData.view.zoom+2);  
                                }else if(map23DData.display.map3D){
                                    fly3DInView(e.data.d.lat,e.data.d.lon,map23DData.view.zoom+2);
                                }
                            }
                               
                            $(".category-list-wrap").empty(); 
                        });

                        _placeDt_se.appendTo(_placeDl_se);
                        _placeDl_se.appendTo($(".category-list-wrap"));

                    }                        

                    //如果二级只有一个，列出三级
                    if(ONEMAP.T.getObjNameAry(modValue.placeDataResult['data'][place_fi]['sub']).length == 1){
                        for(var place_th in modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub']){
                            var _placeDl_th = $('<dl class="areaSelect th" pid="'+modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub'][place_th]['pac']+'"></dl>');
                            var _placeDt_th = $('<dt><a href="javascript:void(0)">'+place_th+'('+modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub'][place_th]['count']+')</a></dt>');
                            modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub'][place_th].area_name = place_th;
                            _placeDl_th.bind('click',{d:modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub'][place_th]},function(e){    
                                if(modValue.options.type == 'pac'){
                                    if(map23DData.display.map2D){
                                        map2DViewer.map.setView([e.data.d.lat,e.data.d.lon],getZoom({'pac':e.data.d.pac})); 
                                    }else if(map23DData.display.map3D){
                                        fly3DInView(e.data.d.lat,e.data.d.lon,getZoom({'pac':e.data.d.pac}));
                                    }
                                    modValue.options.pac = e.data.d.pac;
                                    setTimeout(function(){
                                        modValue.options.type = 'pac';
                                        getPageResult({page:1});
                                    }, 300); 
                                }else {
                                    if(map23DData.display.map2D){
                                        map2DViewer.map.setView([e.data.d.lat,e.data.d.lon],map23DData.view.zoom+2); 
                                    }else if(map23DData.display.map3D){
                                        fly3DInView(e.data.d.lat,e.data.d.lon,map23DData.view.zoom+2);
                                    }
                                }
                                $(".category-list-wrap").empty();                
                                //ONEMAP.M.toolsBar.setSystemNote({type:'success',message:'已切换至 '+e.data.d.area_name+' 区域'});                            
                            });

                            _placeDt_th.appendTo(_placeDl_th);
                            _placeDl_th.appendTo($(".category-list-wrap"));

                        }
                    }
                }
            }

        }else {
            for(var i = 0, l = modValue.placeDataResult.data.length; i<l; i++){
                var place = modValue.placeDataResult.data[i];
                place.pnum = i;
                var nLatlng = L.Util.formatHMS([place.lat,place.lon]);
                var _placeDl = $('<dl id="plm'+place.id+'"></dl>');
                var _placeDt = $('<dt><i class="p'+(i+1)+'"><img src="../images/layout/marker-icon'+(i+1)+'.png" /></i><a href="javascript:void(0)">'+place.cn+'</a></dt>');
                var _placeDd = $('<dd><p class="address"></p>' +
                    '<p class="latlng">'+nLatlng.lng+' , '+nLatlng.lat+'</p></dd>');

                getPlaceName(L.latLng([place.lat,place.lon]),_placeDd);

                _placeDl.bind('click',{d:place},function(e){
                    if(map23DData.display.map2D){
                        modValue.markers[e.data.d.pnum].openPopup();
                    }
                    var zoomTo = ((map23DData.view.zoom>14)?map23DData.view.zoom:14);
                    if(map23DData.display.map2D){
                        map2DViewer.map.setView([e.data.d.lat, e.data.d.lon],zoomTo);
                    }else if(map23DData.display.map3D){
                        fly3DInView(e.data.d.lat, e.data.d.lon,zoomTo);
                    }
                    $("#placePanel .place-list .cur").removeClass("cur");
                    $(this).addClass("cur");                        

                });

                _placeDt.appendTo(_placeDl);
                _placeDd.appendTo(_placeDl);
                _placeDl.appendTo($(".place-list"));

                markerToMap(place);
            }

            if(modValue.fitBounds){
                if(map23DData.display.map2D){
                    map2DViewer.map.fitBounds(map2DViewer.groups[modValue.markerGroup].getBounds(),{'paddingTopLeft':[100,100],'paddingBottomRight':[100,100]});
                }else if(map23DData.display.map3D){
                    
                }
            }                
            
            var countPages = modValue.placeDataResult.num_pages;
            if(countPages==0){
                countPages = 1;
            }
            modValue.pageJump = $('<div id="placeSearchPageJump" class="count"><span>第</span><input class="page_num input input-small" value="'+modValue.placeDataResult.page+'" type="text" /><span>/'+countPages+'页</span></div>');
            modValue.pageJump.appendTo($(".page-wrap"));


            $("#placeSearchPageJump .page_num").bind('keydown', function (e) {
                if (e.keyCode === 13) {
                    var pageJump = parseInt($("#placeSearchPageJump .page_num").val());
                    if(!pageJump || pageJump > countPages){
                        return;
                    }else {                            
                        getPageResult({'page':parseInt(pageJump)});
                    }
                }
            });

            var pageHtmlBtnGroup = $('<div class="btn-group"></div>').appendTo($(".page-wrap"));
        
            if (modValue.placeDataResult.per_page < modValue.placeDataResult.total) {
                if (modValue.placeDataResult.page == 1) {
                    var abtnNext = $('<button type="button" title="下一页" class="btn btn2 btn-small next" pid=' + (modValue.placeDataResult.page + 1) + '>下一页</button>');
                    pageHtmlBtnGroup.append(abtnNext);
                } else if (countPages == modValue.placeDataResult.page && modValue.placeDataResult.total > modValue.placeDataResult.per_page) {
                    var abtnPrev = $('<button type="button" title="上一页" class="btn btn2 btn-small prev" pid=' + (modValue.placeDataResult.page - 1) + '>上一页</button>');
                    pageHtmlBtnGroup.append(abtnPrev);
                } else {
                    var abtnPrev = $('<button type="button" title="上一页" class="btn btn2 btn-small prev" pid=' + (modValue.placeDataResult.page - 1) + '>上一页</button>');
                    var abtnNext = $('<button type="button" title="下一页" class="btn btn2 btn-small next" pid=' + (modValue.placeDataResult.page + 1) + '>下一页</button>');

                    pageHtmlBtnGroup.append(abtnPrev).append(abtnNext);
                }
            }
        } 
        $("#placePanel .place-list-wrap").mCustomScrollbar('update'); 

    };
    /**
     * 无结果列表
     * @type {Function}
     * @param notText {String} 无结果说明文字
     * @returns {*}
     * @private
     */
    function setNotResultHtml(notText){
        $(".category-list-wrap").empty();
        $(".place-list").empty();
        $(".page-wrap").empty();

        $('<p class="not-result">'+notText+'</p>').appendTo($(".place-list"));

    };
    /**
     * 创建getAreaName结果二次查询列表数据
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function createNameListForSearchResultHtml(options){
        $(".category-list-wrap").empty();
        $(".place-list").empty();
        $(".page-wrap").empty();
        $('<h3>请选择查询的区域:</h3>').appendTo($(".category-list-wrap"));
        for(var i = 0, l = options.address.length; i<l; i++){
            var place = options.address[i];
            place.pnum = i;
            var nLatlng = L.Util.formatHMS([place.area_lat,place.area_lon]);

            var _placeDl = $('<dl class="areaSelect fi" id="plm'+place.pnum+'"></dl>');
            var _placeDt = $('<dt><a>'+place.area_name+'</a> <span class="address" style="color:#fff"></span></dt>');

            getPlaceName(L.latLng([place.area_lat,place.area_lon]),_placeDt);

            _placeDl.bind('click',{d:place},function(e){                    
                
                $("#placePanel .place-list .cur").removeClass("cur");
                $(this).addClass("cur");  

                modValue.options.type = 'pac';
                modValue.options.pac = (e.data.d.area_pac.toString()).length>2?(e.data.d.area_pac.toString().substr(2,e.data.d.area_pac.toString().length-1)):e.data.d.area_pac;
                
                if(modValue.options.pac.length>7){
                    modValue.options.pac = modValue.options.pac.substr(0,7);
                }
                if(map23DData.display.map2D){
                    map2DViewer.map.setView([e.data.d.area_lat, e.data.d.area_lon],getZoom({'pac':modValue.options.pac}));
                }else if(map23DData.display.map3D){
                    fly3DInView(e.data.d.area_lat, e.data.d.area_lon,getZoom({'pac':modValue.options.pac}));
                }
                getPageResult({page:1});



            });

            _placeDt.appendTo(_placeDl);
            _placeDl.appendTo($(".category-list-wrap"));
        }   
    };
    /**
     * 填充侧栏html列表
     * @type {Function}
     * @returns {*}
     * @private
     */
    function setPlaceResultHtml(){
        $("#placePanel .page-wrap .btn").bind('click',function(){
            getPageResult({page:$(this).attr("pid")});
        });
    };
    /**
     * 构建分页数据
     * @type {Function}
     * @returns {*}
     * @private
     */
    function createNameListResultHtml(options){
        $(".category-list-wrap").empty();
        $(".place-list").empty();
        $(".page-wrap").empty();
        for(var i = 0, l = options.address.length; i<l; i++){
            var place = options.address[i];
            place.pnum = i;
            var nLatlng = L.Util.formatHMS([place.area_lat,place.area_lon]);
            var _placeDl = $('<dl id="plm'+place.pnum+'"></dl>');
            var _placeDt = $('<dt><i class="p'+(i+1)+'"><img src="../images/layout/marker-icon'+(i+1)+'.png" /></i><a>'+place.area_name+'</a></dt>');
            var _placeDd = $('<dd><p class="address"></p>' +
                '<p class="latlng">'+nLatlng.lng+' , '+nLatlng.lat+'</p></dd>');

            getPlaceName(L.latLng([place.area_lat,place.area_lon]),_placeDd);

            _placeDl.bind('click',{d:place},function(e){
                $.each(map23DData.markers,function(i,t){
                    if(t.pnum === e.data.d.pnum){
                        map23DControl.marker({
                            action: 'remove',
                            guid: i
                        })
                        delete modValue.markers[e.data.d.pnum];
                    }
                })
                markerToMap({
                    lat:e.data.d.area_lat,
                    lon:e.data.d.area_lon,
                    id:e.data.d.pnum,
                    cn:e.data.d.area_name,
                    pnum:e.data.d.pnum
                });
                if(map23DData.display.map2D){
                    modValue.markers[e.data.d.pnum].openPopup();
                }
                var pac = (e.data.d.area_pac.toString()).length>2?(e.data.d.area_pac.toString().substr(2,e.data.d.area_pac.toString().length-1)):e.data.d.area_pac;
                if(pac.length>7){
                    pac = pac.substr(0,7);
                }
                var zoomTo = getZoom({'pac':pac});
                if(map23DData.display.map2D){
                    map2DViewer.map.setView([e.data.d.area_lat, e.data.d.area_lon],zoomTo);
                }else if(map23DData.display.map3D){
                    fly3DInView(e.data.d.area_lat, e.data.d.area_lon,zoomTo);
                }
                $("#placePanel .place-list .cur").removeClass("cur");
                $(this).addClass("cur");
            });

            _placeDt.appendTo(_placeDl);
            _placeDd.appendTo(_placeDl);
            _placeDl.appendTo($(".place-list"));

            markerToMap({
                lat:place.area_lat,
                lon:place.area_lon,
                id:place.pnum,
                cn:place.area_name,
                pnum:place.pnum
            });
        }

        if(modValue.fitBounds && options.address.length > 1){
            if(map23DData.display.map2D){
                map2DViewer.map.fitBounds(map2DViewer.groups[modValue.markerGroup].getBounds(),{'paddingTopLeft':[100,100],'paddingBottomRight':[100,100]});
            }
        }else {
            var pac = (options.address[0].area_pac.toString()).length>2?(options.address[0].area_pac.toString().substr(2,options.address[0].area_pac.toString().length-1)):options.address[0].area_pac;
                
            if(pac.length>7){
                pac = pac.substr(0,7);
            }
            var zoomTo = getZoom({'pac':pac});
            if(map23DData.display.map2D){
                map2DViewer.map.setView([options.address[0].area_lat, options.address[0].area_lon],zoomTo);
            }else if(map23DData.display.map3D){
                fly3DInView(options.address[0].area_lat, options.address[0].area_lon,zoomTo);
            }
        }
    };
    /**
     * 添加标记到地图
     * @type {Function}
     * @param obj {Object} marker对象
     * @private
     */
    function markerToMap(obj){
        var markerObj = {
            latlng:[obj.lat,obj.lon],
            name:obj.cn,
            pguid:obj.id,
            pnum:obj.pnum

        };
        createMarker(markerObj);
    };

    
    /**
     * 创建地图标记
     * @type {Function}
     * @param obj {Object} marker
     * @returns {*}
     * @private
     */
    function createMarker(obj){
        if(!modValue.initialized){
            init();
            modValue.initialized = true;
            ONEMAP.C.publisher.publish({
                modName: 'userPoint',
            }, 'tools:active');
        }
        var markerPoup = '<div class="placeInfo">' +
                '<div class="op text-right">设为：' +
                '<a id="placeSearchPointFav" href="javascript:ONEMAP.M.placeSearch.setFav(\''+obj.pnum+'\')">目标</a> | ' +
                '<a id="placeSearchPointFrom" href="javascript:ONEMAP.M.placeSearch.setDirections(\''+obj.pnum+'\',\'start\')">起点</a> | ' +
                '<a id="placeSearchPointFrom" href="javascript:ONEMAP.M.placeSearch.setDirections(\''+obj.pnum+'\',\'across\')">途经点</a> | ' +
                '<a id="placeSearchPointFrom" href="javascript:ONEMAP.M.placeSearch.setDirections(\''+obj.pnum+'\',\'avoid\')">规避点</a> | ' +
                '<a id="placeSearchPointGoTo" href="javascript:ONEMAP.M.placeSearch.setDirections(\''+obj.pnum+'\',\'stop\')">终点</a></div>' +
                '</div>';
        var markerId = map23DControl.marker({
            action: 'add',
            groupId: modValue.markerGroup,
            pnum:obj.pnum,
            objData:obj,
            geojson: { 
                "properties": {
                    iconUrl: map23DConfig.map23DAssetsUrl+'/images/layout/marker/roadsign_icon_0.png',
                    iconSize: [60,39],
                    iconAnchor: [29,39],
                    popupAnchor: [0,-39]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [obj.latlng[1], obj.latlng[0]]
                }
            }
        });
        modValue.markers[obj.pnum] = map2DViewer.markers[markerId];
        map2DViewer.markers[markerId].bindPopup(markerPoup,{
                closeButton:false,
                maxWidth:240,
                minWidth:240,
                title:obj.name});
        map2DViewer.markers[markerId].on("mouseover",function(){
            this.openPopup();
            $('#placePanel .place-list .cur').removeClass('cur');
            $('#plm'+this.pguid).addClass('cur');
        }); 
        map3DViewer.label({
            action:'update',
            guid:markerId,
            featureType:'marker',
            label:{
                text:obj.name, //标牌内容
                textColor:'#ffffff', //标牌文字颜色
                lineColor:'#ff0000', //标牌引线及边框颜色
                background:'#FF0000', //标牌背景颜色
                lineTop:10, //标牌偏移值
                lineLeft:100 //标牌偏移值
            }
        })
    };
    function setFav(num){
        var marker = modValue.markers[num];
        var markerData = map23DData.markers[marker.guid]
        var objData = {
            latlng:[marker.getLatLng().lng,marker.getLatLng().lat],
            name:markerData.objData.name,
            obj:markerData.objData
        }
        require(['modDir/user/userPoint'],function(userPoint){
            userPoint.addPoint(objData);
        })
    };
    function setDirections(pguid,type){
        switch(type){
            case 'start': 
                var marker = modValue.markers[pguid];
                setDirectionsPoint(marker.getLatLng().lat,marker.getLatLng().lng,'start',marker.dirName);
            break;
            case 'across':
                var marker = modValue.markers[pguid];
                setDirectionsPoint(marker.getLatLng().lat,marker.getLatLng().lng,'across',marker.dirName);
            break;
            case 'avoid':
                var marker = modValue.markers[pguid];
                setDirectionsPoint(marker.getLatLng().lat,marker.getLatLng().lng,'avoid',marker.dirName);
            break;
            case 'stop':
                var marker = modValue.markers[pguid];
                setDirectionsPoint(marker.getLatLng().lat,marker.getLatLng().lng,'stop',marker.dirName);
            break;
        }
    };
    /**
     * 设置起始点
     * @type {Function}
     * @param _lat {String} 纬度
     * @param _lng {String} 经度
     * @param _type {String} 类型
     * @private
     */
    function setDirectionsPoint(_lat,_lng,_type,_name){
        switch (_type){
            case "start":
                require(['modDir/tools/toolRouteSearch'], function(toolRouteSearch) {
                    toolRouteSearch.setStartPoint(new L.LatLng(_lat,_lng),_name);
                });
                break;
            case "across":
                require(['modDir/tools/toolRouteSearch'], function(toolRouteSearch) {
                    toolRouteSearch.setAcrossPoint(new L.LatLng(_lat,_lng),_name);
                });
                break;

            case "avoid":
                require(['modDir/tools/toolRouteSearch'], function(toolRouteSearch) {
                    toolRouteSearch.setAvoidPoint(new L.LatLng(_lat,_lng),_name);
                });
                break;
            case "stop":
                require(['modDir/tools/toolRouteSearch'], function(toolRouteSearch) {
                    toolRouteSearch.setStopPoint(new L.LatLng(_lat,_lng),_name);
                });
                break;
        }
    };
    /**
     * 清除搜索结果
     * @return {[type]} [description]
     */
    function clearSearch(){
        cleanMarkerGroup();
        try{
            $(".category-list-wrap").empty();
            $(".place-list").empty();
            $(".page-wrap").empty();
        }catch(e){}
    };
    /**
     * 根据pac的长度返回对应zoom
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getZoom(options){
        var zhixiashi = [15611,15612,15631,15650,15681,15682];
        //直辖市判断
        if(zhixiashi.indexOf(parseInt(options.pac)) != -1){
            return 11;
        }
        switch(options.pac.toString().length){
            case 3: //国家
            return 4;
            case 5: //省
            return 6;
            case 7: //市
            return 11;
            case 9: //县
            return 12;
        }
        return 12;
    };
    /**
     * 菜单 获取地名
     * @type {Function}
     * @param latlng {Object} 坐标
     * @param abc {Object} 容器
     * @param zoom {Int} 缩放等级
     * @private
     */
    function getPlaceName(latlng,abc,zoom){
        var addressSearch = new addressSearchF();
        addressSearch.getAddressInfo({zoom:(zoom?zoom:8), latLng:[latlng.lat,latlng.lng]},function(data){
            ONEMAP.V.loading.loaded();
            abc.find('.address').empty().append(data.data.region);
            $("#placePanel .place-list-wrap").mCustomScrollbar('update');
        });
    };
    function clearContextMenuMarker(){
        $.each(map2DViewer.markers,function(i,t){
            map2DViewer.marker({
                action: 'remove',
                guid: i
            })
        });
    };
    /**
     * 地图周边搜索
     */
    function rightClickPopup(center){
        ONEMAP.C.publisher.publish({modName: 'clickPlaceSearch',
            }, 'tools:active');
        ONEMAP.C.publisher.subscribe(clearContextMenuMarker, 'cleanMap');
        modValue.fitBounds = false;
        modValue.options.center = center;
        if(typeof(modValue.searchPoup)!='null' || typeof(modValue.searchCircle)!='null'){
            cleanRightClickPopup();
        }
        //dis是范围等级，对应的公里数：(dis*2+1)*5
        var form = '<div id="rightClickSearchForm">' +
            '<div class="s-form"><input type="text" class="input" id="rightClickSearchForm-keyWord"><button class="btn btn2" type="button">搜索</button></div>' +
            '<div class="s-select"><span>范围选择：</span><select class="select" id="rightClickSearchForm-select">' +
            '<option selected value="0">5公里内</option>' +
            '<option value="1">15公里内</option>' +
            '<option value="2">25公里内</option>' +
            '<option value="3">35公里内</option>' +
            '<option value="4">45公里内</option>' +
            '<option value="5">55公里内</option>' +
            '<option value="6">65公里内</option>' +
            '<option value="7">75公里内</option>' +
            '<option value="8">85公里内</option>' +
            '</select></div>' +
            '<div class="s-hot-point">' +

            '<div class="s-hot-point-select">' +
            '</div>' +
            '<ul id="placeSearchRoundThemeList">' +
                '<li><a href="javascript:ONEMAP.M.placeSearch.findSurround(11)" hid="11">交通枢纽</a></li>' +
                '<li><a href="javascript:ONEMAP.M.placeSearch.findSurround(14)" hid="14">加油站</a></li>' +
                '<li><a href="javascript:ONEMAP.M.placeSearch.findSurround(16)" hid="16">停车场</a></li>' +
                '<li><a href="javascript:ONEMAP.M.placeSearch.findSurround(12)" hid="12">桥梁</a></li>' +
                '<li><a href="javascript:ONEMAP.M.placeSearch.findSurround(5)" hid="5">居民点</a></li>' +
                '<li><a href="javascript:ONEMAP.M.placeSearch.findSurround(42)" hid="42">机关团体</a></li>' +
                '<li><a href="javascript:ONEMAP.M.placeSearch.findSurround(43)" hid="43">企事业单位</a></li>' +
                '<li><a href="javascript:ONEMAP.M.placeSearch.findSurround(6)" hid="6">旅游区</a></li>' +
            '</ul>' +
            '</div>' +
            '</div>';
        modValue.searchPoup = new L.Popup({maxWidth:300});
        modValue.searchPoup.setLatLng(center)
                .setContent(form)
                .openOn(map2DViewer.map);
        drawCircle(center,5000);
        setMoreSurround();
        modValue.options.themeId = null;
        modValue.options.keyWord = '';
        bingClickEvents();
        map2DViewer.map.on('click',cleanRightClickPopup);
    };
    function bingClickEvents(){
        $("#rightClickSearchForm-select").bind('change',function(){
            var val = (parseInt($(this).val())*2+1)*5000;
            map2DViewer.circle({
                        action: 'update',
                        geojson: {
                            "properties": {
                                radius: val
                            }
                        },
                        guid: modValue.searchCircle
                    })
            //searchCircle.setRadius(val);
            map2DViewer.map.fitBounds(map2DViewer.circles[modValue.searchCircle].getBounds());
        });
        $("#rightClickSearchForm .s-form .btn").bind('click',function(){
            var keyWord = $("#rightClickSearchForm .s-form .input").val();
            var dis = $("#rightClickSearchForm .select").val();

            if(keyWord.length == 0){
                return false;
            }
            cleanRightClickPopup();
            if(initData({'keyWord' :keyWord,'dis':dis, 'type':"theme", center:modValue.options.center})){
                $(".category-list-wrap").empty();
                $(".place-list").empty();
                $(".page-wrap").empty();
                $("#searchresult").css("top","0px")
                $("#searchresult").show();
                getPageResult({'page':1});
            }
        });

        $('#rightClickSearchForm .s-form .input').on('keydown', function (e) {
            if (e.keyCode === 13) {
                var keyWord = $("#rightClickSearchForm .s-form .input").val();
                var dis = $("#rightClickSearchForm .select").val();
                if(keyWord.length == 0){
                    return false;
                }
                cleanRightClickPopup();
                if(initData({'keyWord':keyWord,'dis':dis, 'type':"theme", center:modValue.options.center})){
                    $(".category-list-wrap").empty();
                    $(".place-list").empty();
                    $(".page-wrap").empty();
                    $("#searchresult").css("top","0px")
                    $("#searchresult").show();
                    getPageResult({'page':1});
                }
            }
        });
    };
    /**
     * 设置分类
     */
    function setMoreSurround(){
        $('#rightClickSearchForm .s-hot-point-select')
            .empty()
            .append($('<div class="list"><span>地名分类：</span><select class="select first">' +
                '<option value="0">常用</option>' +
                '<option value="1">交通</option>' +
                '<option value="2">设施</option>' +
                '<option value="3">水系</option>' +
                '<option value="4">单位</option>' +
                '<option value="5">居民点</option>' +
                '<option value="6">旅游</option>' +
                '</select>' +
                '</div>'));
        $('#rightClickSearchForm .s-hot-point-select .first').bind('change',function(){
            $('#placeSearchRoundThemeList').empty();
                for(var i = 0, l= modValue.hotPoint.length; i<l; i++){
                    if(modValue.hotPoint[i].id === $(this).val()){
                        for(var ii = 0, ll = modValue.hotPoint[i].sons.length; ii<ll; ii++){
                            var item = $('<li><a href="javascript:ONEMAP.M.placeSearch.findSurround('+modValue.hotPoint[i].sons[ii].id+')" hid="'+modValue.hotPoint[i].sons[ii].id+'">'+modValue.hotPoint[i].sons[ii].name+'</a></li>');
                            item.appendTo($('#placeSearchRoundThemeList'));
                        }
                    }
                }
        });
    };
    /**
     * 根据半径画圆
     */
    function drawCircle(center,dis){
        modValue.searchCircle = map2DViewer.circle({
                action: 'add',
                geojson: {
                    "properties": {
                        color: '#ff6600',
                        weight: 1,
                        fillColor: '#ff6600',
                        opacity: 1,
                        fillOpacity: 0.5,
                        radius: dis //半径米
                    },
                    "geometry": {
                        "type": "Circle",
                        "coordinates": [center.lng, center.lat]
                    }
                }
            });
        map2DViewer.map.fitBounds(map2DViewer.circles[modValue.searchCircle].getBounds());
        map2DViewer.circles[modValue.searchCircle].on('click',function(){
            cleanCricle();
        })
    };
    function findSurround(hid){
        var keyWord = $("#rightClickSearchForm .s-form .input").val();
        if(keyWord.length == 0){
            keyWord = 'temp';
        }
        if(initData({'keyWord' :keyWord,'themeId' :hid,'dis':$("#rightClickSearchForm .select").val(), 'type':"theme", 'center':modValue.options.center})){
            if(keyWord == 'temp'){
                modValue.options.keyWord = '';
            }
            $("#searchresult").css("top","0px")
            $("#searchresult").show();
            getPageResult({'page':1});
            cleanRightClickPopup();
        }
    };
    /**
     * 清除右键弹出popup和圆
     * @type {Function}
     * @private
     */
    function cleanRightClickPopup(){
        if(map2DViewer.map.hasLayer(modValue.searchPoup)){
            map2DViewer.map.removeLayer(modValue.searchPoup)
        }
        map2DViewer.map.on('click',cleanCricle);
        map2DViewer.map.off('click',cleanRightClickPopup);
    };
    function cleanCricle(){
        map2DViewer.circle({
            action: 'remove',
            guid: modValue.searchCircle
        })
        $("#searchresult").hide();
        $("#searchresult").css("top","39px");
        map2DViewer.map.off('click',cleanCricle);
    };
    /**
     * 清除标记
     * [cleanMarkerGroup description]
     * @return {[type]} [description]
     */
    function cleanMarkerGroup(){
        if(map23DData.display.map3D){
            $.each(map3DViewer.markers,function(value,key){
                map3DViewer.label({
                    action:'remove',
                    guid:value,
                    featureType:'marker'
                })
            })
        }
        map23DControl.group({
            action: 'cleanAll',
            guid: modValue.markerGroup
        })
    };
    function getAreaInfo(options, callback_func) {
        var poiSearch = new poiSearchF();
        poiSearch.getAreaInfo({ keywords: options.keywords }, function(data) {
            callback_func(data.data);
        });
    };

    function changeToBoundsSearch(options) {
        modValue.fitBounds = false;
        //changSearchType({'type':'bounds'});
        modValue.options.init_query_key = options.keyWord;
        if(initData({keyWord:options.keyWord})){
            getPageResult({page:1});
        }
    };

    function bindEvent() {
        $('#searchInViewKey').bind('focusout', function() {
            if ($(this).val() == '') {
                $(this).val('关键字');
            };
        });

        $('#btnSearchInView').bind('click', function() {
            if($(".tools-search").hasClass('cur')){
                modValue.options.type = 'pac'
            }else if($('.tools-serchView').hasClass('cur')){
                modValue.options.type = 'bounds'
            }
            $("#searchresult").show()
            map23DControl.group({
                action: 'cleanAll',
                guid: modValue.markerGroup
            })
            globalSearchFire();
        });

        $('#searchInViewKey').bind('keydown', function(e) {
            if (e.keyCode === 13) {
                $("#searchresult").show()
                map23DControl.group({
                    action: 'cleanAll',
                    guid: modValue.markerGroup
                })
                globalSearchFire();
            }
        });

        $('#searchInViewKey').bind('focus', function() {
            $(this).val('');
        });
    };
    return ONEMAP.M.placeSearch = {
        init: init,
        setFav:setFav,
        changSearchType: changSearchType,
        modValue:modValue,
        rightClickPopup:rightClickPopup,
        findSurround:findSurround,
        getAreaInfo:getAreaInfo,
        setDirections:setDirections,
        createMarker:createMarker
    }
})
