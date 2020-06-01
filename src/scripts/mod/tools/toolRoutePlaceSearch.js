define([
        'modDir/service/addressSearch',
        'modDir/service/poiSearch',
    ],
    function(addressSearchF, poiSearchF) {
        /**
         * 数据存放模块
         * [modValue description]
         * @type {Object}
         */
        var modValue = {
            pointSearchOptions: { //地名查询参数
                page: 1,
                pageSize: 10,
                keyWord: '',
                center: null, //中心点
                pac: 0, //区域pac
                init_query_key: '' //原始查询关键字
            },
            placeDataResult: null, //查询数据集合
            fitBounds: true,
            resultListHtml: null,
            pageHtml: null,
            markers: {}, //点查询标记集合
            dirName:{},//标记名称集合
        };
        /**
         * 根据pac的长度返回对应zoom
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        function getZoom(options) {
            var zhixiashi = [15611, 15612, 15631, 15650, 15681, 15682];
            //直辖市判断
            if (zhixiashi.indexOf(parseInt(options.pac)) != -1) {
                return 11;
            }
            switch (options.pac.toString().length) {
                case 3: //国家
                    return 4;
                case 5: //省
                    return 6;
                case 7: //市
                    return 11;
                case 9: //县
                    return 12;
                default:
                    return 12;
            }
        };
        /**
         * 通过地图缩放等级和坐标查找 地名
         * @type {Function}
         * @param latLng {Object} 坐标
         * @param callBack_func {Function} 回调
         * @private
         */
        function getInfoByZoomLatLng(latLng,callBack_func){
            var zoom = map23DData.view.zoom;
            var addressSearch = new addressSearchF();
            addressSearch.getAddressInfo({zoom:zoom,latLng:[latLng.lat,latLng.lng]},function(data){
                data = data.data;
                callBack_func(data);
            });
        };
        /**
         * 地名搜索
         * @type {Function}
         * @param options {Object} {type}
         */
        function pointSearch(options) {
            modValue.pointSearchOptions.init_query_key = options.keyWord;
            getAreaInfo({ keywords: options.keyWord }, function(data) {
                if (data.residue_addr_name.length > 0) {
                    modValue.pointSearchOptions.keyWord = data.residue_addr_name;
                    //如果只返回一个参考地址
                    if (data.address.length == 1) {
                        //如果有pac 按pac查
                        //if(data.address[0].area_pac>0){
                        modValue.pointSearchOptions.type = 'pac';
                        modValue.pointSearchOptions.pac = (data.address[0].area_pac.toString()).length > 2 ? (data.address[0].area_pac.toString().substr(2, data.address[0].area_pac.toString().length - 1)) : data.address[0].area_pac;

                        if (modValue.pointSearchOptions.pac.length > 7) {
                            modValue.pointSearchOptions.pac = modValue.pointSearchOptions.pac.substr(0, 7);
                        }
                        if (map23DData.display.map2D) {
                            map2DViewer.map.setView([data.address[0].area_lat, data.address[0].area_lon], getZoom({ 'pac': modValue.pointSearchOptions.pac }));
                        }
                        getPageResult({ page: 1 });
                        //如果返回多个参考地址，列出参考地址
                    } else {
                        createNameListForSearchResultHtml(data);
                    }

                } else {
                    modValue.fitBounds = false;
                    if (data.address[0].pac > 0) {
                        if (map2DViewer.display.map2D) {
                            map2DViewer.map.setView([data.address[0].lat, data.address[0].lon], getZoom({ 'pac': data.address[0].pac.toString().substr(2, data.address[0].pac.toString().length - 1) }));
                        }
                        ONEMAP.C.publisher.publish({ type: 'success', message: '已切换至 ' + data.address[0].name + ' 区域' }, 'noteBar::add');
                        modValue.placeDataResult = {
                            data: [{
                                cn: data.address[0].name,
                                lon: data.address[0].lon,
                                tc: 0,
                                tid: 0,
                                pac: 0,
                                lat: data.address[0].lat,
                                id: 0
                            }],
                            total: 1,
                            type: 1,
                            page: 1,
                            pagesize: 10
                        };
                        createResultHtml({ fitBounds: false })
                        updatePlaceResultHtml();
                        setTimeout(function() {
                            _this._markers[0].openPopup();
                        }, 300);
                    } else {
                        //_this._map.setView([data.address[0].area_lat,data.address[0].area_lon],_this._getZoom({'pac':data.address[0].area_pac.toString().substr(2,data.address[0].area_pac.toString().length-1)}));
                        ONEMAP.C.publisher.publish({ type: 'success', message: '已切换至 ' + data.address[0].name + ' 区域' }, 'noteBar::add');
                        modValue.placeDataResult = { data: [], total: 0, type: 1, page: 1, pagesize: 0 };
                        for (var i = 0, l = data.address.length; i < l; i++) {
                            modValue.placeDataResult.data.push({
                                cn: data.address[i].area_name,
                                lon: data.address[i].area_lon,
                                tc: 0,
                                tid: 0,
                                pac: 0,
                                lat: data.address[i].area_lat,
                                id: i
                            });
                            modValue.placeDataResult.total++;
                            modValue.placeDataResult.pagesize++;
                        }
                        createResultHtml({ fitBounds: false })
                        updatePlaceResultHtml();
                    }
                }
            });
        };
        /**
         * 创建getAreaName结果二次查询列表数据
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        function createNameListForSearchResultHtml(options){
            var createNameListHtml = $('<div class="routcategory-list-wrap"></div>')
            switch (ONEMAP.M.toolRouteSearch.modValue.pointSearchType) {
                case 1:
                    $('#dStartResult').empty();
                    $('#dStartResult').append(createNameListHtml);
                    break;
                case 2:
                    $('#dStopResult').empty();
                    $('#dStopResult').append(createNameListHtml);
                    break;
            } 
            $('<h3>请选择查询的区域:</h3>').appendTo($(".routcategory-list-wrap"));
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

                    modValue.pointSearchOptions.type = 'pac';
                    modValue.pointSearchOptions.pac = (e.data.d.area_pac.toString()).length>2?(e.data.d.area_pac.toString().substr(2,e.data.d.area_pac.toString().length-1)):e.data.d.area_pac;
                    
                    if(modValue.pointSearchOptions.pac.length>7){
                        modValue.pointSearchOptions.pac = modValue.pointSearchOptions.pac.substr(0,7);
                    }
                    if(map23DData.display.map2D){
                        map2DViewer.map.setView([e.data.d.area_lat, e.data.d.area_lon],getZoom({'pac':modValue.pointSearchOptions.pac}));
                    }else if(map23DData.display.map3D){
                        fly3DInView(e.data.d.area_lat, e.data.d.area_lon,getZoom({'pac':modValue.pointSearchOptions.pac}));
                    }
                    getPageResult({page:1});



                });
                _placeDt.appendTo(_placeDl);
                _placeDl.appendTo($(".routcategory-list-wrap"));
            }
        };
        /**
         * 更新地名查询结果列表
         * @param  {[type]} options [description]
         * @return {[type]}         [description]
         */
        function updatePlaceResultHtml() {
            switch (ONEMAP.M.toolRouteSearch.modValue.pointSearchType) {
                case 1:
                    $('#dStartResult').empty();
                    $('#dStartResult').append(modValue.resultListHtml).append(modValue.pageHtml);
                    break;
                case 2:
                    $('#dStopResult').empty();
                    $('#dStopResult').append(modValue.resultListHtml).append(modValue.pageHtml);
                    break;
            };
            $("#pointsSearchPageJump .page_num").bind('keydown', function(e) {
                if (e.keyCode === 13) {
                    var pageJump = parseInt($("#pointsSearchPageJump .page_num").val());
                    if (!pageJump || pageJump > $("#pointsSearchPageJump").attr('countPages')) {
                        return;
                    } else {
                        getPageResult({ 'page': parseInt(pageJump) });
                    }
                }
            });

            $("#pointsSearchPageJump .btn").bind('click', function() {
                getPageResult({ page: $(this).attr("pid") });
            });
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
        function createResultHtml(options) {
            ONEMAP.M.toolRouteSearch.clearMarker();
            modValue.resultListHtml = $('<div></div>');
            if (modValue.placeDataResult.type == 2) {

                $('<h3>请选择查询的区域:</h3>').appendTo(modValue.resultListHtml);

                //列出一级                 
                var place_fi_length = 0;
                for (var place_fi in modValue.placeDataResult['data']) {

                    if (ONEMAP.T.getObjNameAry(modValue.placeDataResult['data']).length > 1) {
                        place_fi_length++;
                        var _placeDl = $('<dl class="areaSelect fi" pid="' + modValue.placeDataResult['data'][place_fi]['pac'] + '"></dl>');
                        var _placeDt = $('<dt><a href="javascript:void(0)">' + place_fi + '(' + modValue.placeDataResult['data'][place_fi]['count'] + ')</a></dt>');
                        modValue.placeDataResult['data'][place_fi].area_name = place_fi;
                        _placeDl.bind('click', { d: modValue.placeDataResult['data'][place_fi] }, function(e) {
                            if (modValue.pointSearchOptions.type == 'pac') {
                                if (map23DData.display.map2D) {
                                    map2DViewer.map.setView([e.data.d.lat, e.data.d.lon], getZoom({ 'pac': e.data.d.pac }));
                                }else if(map23DData.display.map3D){
                                    fly3DInView(e.data.d.lat, e.data.d.lon, getZoom({ 'pac': e.data.d.pac }));
                                }

                                modValue.pointSearchOptions.pac = e.data.d.pac;
                                setTimeout(function() {
                                    modValue.pointSearchOptions.type = 'pac';
                                    getPageResult({ page: 1 });
                                }, 300);
                            } else {
                                if (map23DData.display.map2D) {
                                    map2DViewer.map.setView([e.data.d.lat, e.data.d.lon], map23DData.view.zoom + 2);
                                }else if(map23DData.display.map3D){
                                    fly3DInView(e.data.d.lat, e.data.d.lon, map23DData.view.zoom + 2);
                                }
                            }


                            ONEMAP.C.publisher.publish({ type: 'success', message: '已切换至 ' + e.data.d.area_name + ' 区域' }, 'noteBar::add');

                        });

                        _placeDt.appendTo(_placeDl);
                        _placeDl.appendTo(modValue.resultListHtml);
                    }

                    //列出二级
                    var place_se_length = 0;
                    for (var place_se in modValue.placeDataResult['data'][place_fi]['sub']) {
                        if (ONEMAP.T.getObjNameAry(modValue.placeDataResult['data'][place_fi]['sub']).length > 1) {
                            place_se_length++;
                            var _placeDl_se = $('<dl class="areaSelect se" pid="' + modValue.placeDataResult['data'][place_fi]['sub'][place_se]['pac'] + '"></dl>');
                            var _placeDt_se = $('<dt><a href="javascript:void(0)">' + place_se + '(' + modValue.placeDataResult['data'][place_fi]['sub'][place_se]['count'] + ')</a></dt>');
                            modValue.placeDataResult['data'][place_fi]['sub'][place_se].area_name = place_se;
                            _placeDl_se.bind('click', { d: modValue.placeDataResult['data'][place_fi]['sub'][place_se] }, function(e) {
                                if (modValue.pointSearchOptions.type == 'pac') {
                                    if (map23DData.display.map2D) {
                                        map2DViewer.map.setView([e.data.d.lat, e.data.d.lon], getZoom({ 'pac': e.data.d.pac }));
                                    }
                                    modValue.pointSearchOptions.pac = e.data.d.pac;
                                    setTimeout(function() {
                                        modValue.pointSearchOptions.type = 'pac';
                                        getPageResult({ page: 1 });
                                    }, 300);
                                } else {
                                    if (map23DData.display.map2D) {
                                        map2DViewer.map.setView([e.data.d.lat, e.data.d.lon], map23DData.view.zoom + 2);
                                    }else if(map23DData.display.map3D){
                                        fly3DInView(e.data.d.lat, e.data.d.lon, map23DData.view.zoom + 2);
                                    }
                                }
                                ONEMAP.C.publisher.publish({ type: 'success', message: '已切换至 ' + e.data.d.area_name + ' 区域' }, 'noteBar::add');
                            });

                            _placeDt_se.appendTo(_placeDl_se);
                            _placeDl_se.appendTo(modValue.resultListHtml);

                        }

                        //如果二级只有一个，列出三级
                        if (ONEMAP.T.getObjNameAry(modValue.placeDataResult['data'][place_fi]['sub']).length == 1) {
                            for (var place_th in modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub']) {
                                var _placeDl_th = $('<dl class="areaSelect th" pid="' + modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub'][place_th]['pac'] + '"></dl>');
                                var _placeDt_th = $('<dt><a href="javascript:void(0)">' + place_th + '(' + modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub'][place_th]['count'] + ')</a></dt>');
                                modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub'][place_th].area_name = place_th;
                                _placeDl_th.bind('click', { d: modValue.placeDataResult['data'][place_fi]['sub'][place_se]['sub'][place_th] }, function(e) {
                                    if (modValue.pointSearchOptions.type == 'pac') {
                                        if (map23DData.display.map2D) {
                                            map2DViewer.map.setView([e.data.d.lat, e.data.d.lon], getZoom({ 'pac': e.data.d.pac }));
                                        }else if(map23DData.display.map3D){
                                                fly3DInView(e.data.d.lat, e.data.d.lon, getZoom({ 'pac': e.data.d.pac }));
                                        }
                                        modValue.pointSearchOptions.pac = e.data.d.pac;
                                        setTimeout(function() {
                                            modValue.pointSearchOptions.type = 'pac';
                                            getPageResult({ page: 1 });
                                        }, 300);
                                    } else {
                                        if (map23DData.display.map2D) {
                                            map2DViewer.map.setView([e.data.d.lat, e.data.d.lon], map23DData.view.zoom + 2);
                                        }else if(map23DData.display.map3){
                                            fly3DInView(e.data.d.lat, e.data.d.lon, map23DData.view.zoom + 2);
                                        }
                                    }

                                    ONEMAP.C.publisher.publish({ type: 'success', message: '已切换至 ' + e.data.d.area_name + ' 区域' }, 'noteBar::add');
                                });

                                _placeDt_th.appendTo(_placeDl_th);
                                _placeDl_th.appendTo(modValue.resultListHtml);
                            }
                        }
                    }
                }
                modValue.pageHtml = $('');
            } else {
                for (var i = 0, l = modValue.placeDataResult.data.length; i < l; i++) {
                    var place = modValue.placeDataResult.data[i];
                    place.pnum = i;
                    var nLatlng = L.Util.formatHMS([place.lat, place.lon]);
                    var _placeDl = $('<dl class="place-dl" id="plm' + place.id + '"></dl>');
                    $("#roadViewList").empty()
                    var setWayBtn = '';
                    if (ONEMAP.M.toolRouteSearch.modValue.pointSearchType == 1) {
                        setWayBtn = '<button onclick="ONEMAP.M.routPlaceSearch.pointSetWayPoint(\'' + place.id + '\',\'start\')" class="btn btn4 btn-set-way">设为起点</button>';
                    } else if (ONEMAP.M.toolRouteSearch.modValue.pointSearchType == 2) {
                        setWayBtn = '<button onclick="ONEMAP.M.routPlaceSearch.pointSetWayPoint(\'' + place.id + '\',\'stop\')" class="btn btn4 btn-set-way">设为终点</button>';
                    }

                    var _placeDt = $('<dt><i class="p' + (i + 1) + '"><img src="../images/layout/marker-icon' + (i + 1) + '.png" /></i><a href="javascript:void(0)">' + place.cn + '</a>' + setWayBtn + '</dt>');
                    var _placeDd = $('<dd><p class="address"></p>' +
                        '<p class="latlng">' + nLatlng.lng + ' , ' + nLatlng.lat + '</p></dd>');

                    getPlaceName(L.latLng([place.lat, place.lon]), _placeDd);
                    if(i==0){
                        if (map23DData.display.map2D) {
                            map2DViewer.map.setView([place.lat, place.lon], map23DData.view.zoom + 2);
                        }else if(map23DData.display.map3){
                            fly3DInView(place.lon, place.lon, map23DData.view.zoom + 2);
                        }
                    }
                    _placeDt.find('a').bind('click', { d: place }, function(e) {
                        if(modValue.markers[e.data.d.id]){
                            map23DControl.marker({
                                action: 'remove',
                                guid: modValue.markers[e.data.d.id]
                            })
                            delete modValue.markers[e.data.d.id];
                            markerToMap(e.data.d);
                            map2DViewer.markers[modValue.markers[e.data.d.id]].openPopup();
                            map2DViewer.setView({
                                center:{
                                    lat:place.lat,
                                    lng:place.lon
                                },  
                                zoom:map23DData.view.zoom
                            });
                            map3DViewer.flyTo({
                                center:{
                                    lat:place.lat,
                                    lng:place.lon
                                },  
                                zoom:map23DData.view.zoom
                            });
                        }
                        var zoomTo = ((map23DData.view.zoom > 14) ? _this._map.getZoom() : 14);
                        if (map23DData.display.map2D) {
                            map2DViewer.map.setView([e.data.d.lat, e.data.d.lon], zoomTo);
                        }
                        //_this._map.setView([e.data.d.lat, e.data.d.lon],_this._getZoom({'pac':e.data.d.pac.toString().substr(2,e.data.d.pac.toString().length-1)}));
                        $("#pointSearchResult .place-dl.cur").removeClass("cur");
                        $(this).parent().parent().addClass("cur");

                    });

                    _placeDt.appendTo(_placeDl);
                    _placeDd.appendTo(_placeDl);
                    _placeDl.appendTo(modValue.resultListHtml);

                    markerToMap(place);
                }

                if (modValue.fitBounds) {
                    if (map23DData.display.map2D) {
                        //map2DViewer.map.fitBounds(map2DViewer.groups[modValue._markerGroup].getBounds(), { 'paddingTopLeft': [100, 100], 'paddingBottomRight': [100, 100] });
                    }
                }
                modValue.pageHtml = $('<div id="pointsSearchPageJump" class="page-wrap"></div>');
                var countPages = modValue.placeDataResult.num_pages;
                
                if (countPages == 0) {
                    countPages = 1;
                }
                var pageJump = $('<div countPages="' + countPages + '" class="count"><span>第</span><input class="page_num input input-small" value="' + modValue.placeDataResult.page + '" type="text" /><span>/' + countPages + '页</span></div>');
                if(modValue.placeDataResult.hasOwnProperty('num_pages')){
                    pageJump.appendTo(modValue.pageHtml);
                    $(pageJump).show();
                }else{
                    $(pageJump).hide();
                }
                var pageHtmlBtnGroup = $('<div class="btn-group"></div>').appendTo(modValue.pageHtml);

                if (modValue.placeDataResult.per_page < modValue.placeDataResult.total) {
                    if (modValue.placeDataResult.page == 1) {
                        var abtnNext = $('<button type="button" class="btn btn2 btn-small next" pid=' + (modValue.placeDataResult.page + 1) + '>下一页</button>');
                        pageHtmlBtnGroup.append(abtnNext);
                    } else if (countPages == modValue.placeDataResult.page && modValue.placeDataResult.total > modValue.placeDataResult.pagesize) {
                        var abtnPrev = $('<button type="button" class="btn btn2 btn-small prev" pid=' + (modValue.placeDataResult.page - 1) + '>上一页</button>');
                        pageHtmlBtnGroup.append(abtnPrev);
                    } else {
                        var abtnPrev = $('<button type="button" class="btn btn2 btn-small prev" pid=' + (modValue.placeDataResult.page - 1) + '>上一页</button>');
                        var abtnNext = $('<button type="button" class="btn btn2 btn-small next" pid=' + (modValue.placeDataResult.page + 1) + '>下一页</button>');

                        pageHtmlBtnGroup.append(abtnPrev).append(abtnNext);
                    }
                }
            }
            $("#pointSearchResult").mCustomScrollbar("update");
        };
        /**
         * 查询地点数据
         * @type {Function}
         * @param options {Object} {page}
         */
        function getPageResult(options) {
            modValue.pointSearchOptions.page = options.page;
            var poiSearch = new poiSearchF({
                page: modValue.pointSearchOptions.page,
                pageSize: modValue.pointSearchOptions.pageSize
            }); 
            if (modValue.pointSearchOptions.type === 'pac') {
                poiSearch.getPoiByOptions({ pac: modValue.pointSearchOptions.pac, keywords: modValue.pointSearchOptions.keyWord }, function(data) {
                    if (data.hasOwnProperty('type')) {
                        if (data.type == 1) {
                            if (data.hasOwnProperty('data') && data['data'].length > 0) {
                                data.page = data.page * 1;
                                modValue.placeDataResult = data;
                                createResultHtml(options)
                                updatePlaceResultHtml();
                            } else {
                                modValue.resultListHtml = $('<div></div>');
                                $('<p class="note">没有搜索到 ' + modValue.pointSearchOptions.init_query_key + ' 的信息，请修改搜索条件。</p>').appendTo(modValue.resultListHtml);
                                modValue.pageHtml = $('');
                                updatePlaceResultHtml();

                            }
                        } else if (data.type == 2) {
                            data.page = data.page * 1;
                            modValue.placeDataResult = data;
                            createResultHtml(options)
                            updatePlaceResultHtml();
                        }
                    } else {
                        modValue.resultListHtml = $('<div></div>');
                        $('<p class="note">没有搜索到 ' + modValue.pointSearchOptions.init_query_key + ' 的信息，请修改搜索条件。</p>').appendTo(modValue.resultListHtml);
                        modValue.pageHtml = $('');
                        updatePlaceResultHtml();
                    }

                });
            }
        };
        /**
         * 添加标记到地图
         * @type {Function}
         * @param obj {Object} marker对象
         * @private
         */
        function markerToMap(obj) {
            var markerObj = {
                latlng: [obj.lat, obj.lon],
                name: obj.cn,
                pguid: obj.id,
                pnum: obj.pnum

            };
            createMarker(markerObj);
        };
        /**
         * 地名查询冒泡设置起点/终点
         * @param  {[type]} pguid [description]
         * @param  {[type]} type  [description]
         * @return {[type]}       [description]
         */
        function pointSetWayPoint(pguid,type){
            switch(type){
                case 'start':
                    ONEMAP.M.toolRouteSearch.setStartPoint(map23DData.markers[modValue.markers[pguid]].geojson.geometry.coordinates,modValue.dirName[pguid]);
                    $.each(modValue.markers,function(index,item){
                        map23DControl.marker({
                            action: 'remove',
                            guid: modValue.markers[index]
                        })
                    })
                    map23DControl.marker({
                        action: 'remove',
                        guid: modValue.markers[pguid]
                    })
                    $('#directionsStartSearch').hide().remove();
                    if($('#directionsStopSearch')){
                        $('#directionsStopSearch .header').click();
                    }

                    break;
                case 'stop':
                    ONEMAP.M.toolRouteSearch.setStopPoint(map23DData.markers[modValue.markers[pguid]].geojson.geometry.coordinates,modValue.dirName[pguid]);
                    $.each(modValue.markers,function(index,item){
                        map23DControl.marker({
                            action: 'remove',
                            guid: modValue.markers[index]
                        })
                    })
                    map23DControl.marker({
                        action: 'remove',
                        guid: modValue.markers[pguid]
                    })
                    $('#directionsStopSearch').hide().remove();
                    if($('#directionsStartSearch')){
                        $('#directionsStartSearch .header').click();
                    }
                    break;
            }
        };
        /**
         * 添加统计图标
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
        function createMarker(obj) {
            var setWayBtn = '';
            if (ONEMAP.M.toolRouteSearch.modValue.pointSearchType == 1) {
                setWayBtn = '<a id="placeSearchPointFrom" href="javascript:ONEMAP.M.routPlaceSearch.pointSetWayPoint(\'' + obj.pguid + '\',\'start\')">起点</a>';
            } else if (ONEMAP.M.toolRouteSearch.modValue.pointSearchType == 2) {
                setWayBtn = '<a id="placeSearchPointGoTo" href="javascript:ONEMAP.M.routPlaceSearch.pointSetWayPoint(\'' + obj.pguid + '\',\'stop\')">终点</a>';
            }
            var markerHtml = '<div class="placeInfo">' +
                '<div class="op text-right">设为：' +
                setWayBtn +
                '</div>' +
                '</div>';
            var markerId = map23DControl.marker({
                action: 'add',
                groupId: ONEMAP.M.toolRouteSearch.modValue.markerGroup,
                pnum: obj.pguid,
                geojson: {
                    "properties": {
                        iconUrl: map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_icon_0.png',
                        iconSize: [60, 39],
                        iconAnchor: [29, 39],
                        popupAnchor: [0, -39]
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [obj.latlng[1], obj.latlng[0]]
                    }
                }
            });
            modValue.markers[obj.pguid] = markerId;
            modValue.dirName[obj.pguid] = obj.name;
            //if (map23DData.display.map2D) {
                map2DViewer.markers[markerId].bindPopup(markerHtml, {
                    closeButton: false,
                    maxWidth: 140,
                    minWidth: 140,
                    title: obj.name
                });
                map2DViewer.markers[markerId].on("mouseover", function() {
                    $('.d-waypoints .cur').removeClass('cur');
                    $('#plm' + this.pguid).addClass('cur');
                });
            //}else if(map23DData.display.map3D){
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
            //};
        };
        /**
         * 无结果列表
         * @type {Function}
         * @param notText {String} 无结果说明文字
         * @returns {*}
         * @private
         */
        function setNotPointResultHtml(notText) {
            $('<p class="not-result">' + notText + '</p>').appendTo(modValue.resultHtml);
        };
        /**
         * 菜单 获取地名
         * @type {Function}
         * @param latlng {Object} 坐标
         * @param abc {Object} 容器
         * @param zoom {Int} 缩放等级
         * @private
         */
        function getPlaceName(latlng, abc, zoom) {
            var addressSearch = new addressSearchF();
            addressSearch.getAddressInfo({ zoom: (zoom ? zoom : 8), latLng: [latlng.lat, latlng.lng] }, function(data) {
                data = data.data;
                abc.find('.address').empty().append(data.region);
                $("#pointSearchResult").mCustomScrollbar("update");
            });
        };
        /**
         * 获取区域信息
         * @param  {[type]} options       [description]
         * @param  {[type]} callback_func [description]
         * @return {[type]}               [description]
         */
        function getAreaInfo(options, callback_func) {
            var poiSearch = new poiSearchF();
            poiSearch.getAreaInfo({ keywords: options.keywords }, function(data) {
                data = data.data;
                callback_func(data);
            });
        };
        return ONEMAP.M.routPlaceSearch = {
        	pointSearch:pointSearch,
        	modValue:modValue,
        	pointSetWayPoint:pointSetWayPoint,
        	getInfoByZoomLatLng:getInfoByZoomLatLng
        };
    })
