/**
 * @fileoverview 工具 在地图上打标记 模块
 * @author Song.Huang
 * @version 1.0.0
 */
define([
    'html!templates/tools/toolMarkPoint',
    'modDir/service/addressSearch',
    'modDir/service/poiSearch',
    'modDir/service/regionSearch',
    'modDir/service/routeSearch',
    'css!styles/tools/toolMarkPoint'
], function(tplLayout, addressSearchF, poiSearchF, regionSearchF, routeSearchF) {

    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
        markerGroup: null, //marker容器
        markers: [], //marker记录
        curMarkerGuid: null,
        mayFavGuid:{},
        markerType: [
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_type_0.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_type_1_b.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_type_1_m.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_type_1_s.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_type_2_b.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_type_2_m.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_type_2_s.png'
        ],
        markerTypeIcon: [
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_icon_0.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_icon_1_b.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_icon_1_m.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_icon_1_s.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_icon_2_b.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_icon_2_m.png',
            map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_icon_2_s.png'
        ],
    };
    /**
     * 模块状态，用于存储模块的状态 例如：收起，关闭
     * @type {Object}
     */
    var status = {
        initialized: false //是否初始化
    };

    /**
     * 初始化并订阅事件
     * @return {[type]} [description]
     */
    function init() {
        if (!status.initialized) {
            bindEvent();
            subscribe();
            status.initialized = true;
        } 
        map2DViewer.map.on('click', onClickPoint);
        if (L.Browser.ie || L.Browser.firefox) {
            map2DViewer.map.getContainer().style.cursor = 'url('+map23DConfig.map23DAssetsUrl + '/scripts/vendor/map23dlib/images/marker.cur),auto';
        } else {
            map2DViewer.map.getContainer().style.cursor = 'url('+map23DConfig.map23DAssetsUrl + '/scripts/vendor/map23dlib/images/marker.cur) 5 5,auto';
        }
        modValue.markerGroup = map23DControl.group({
            action: 'add'
        });
        ONEMAP.C.publisher.publish({
            modName: 'toolMarkPoint'
        }, 'tools:active');
    };
    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe() {
        ONEMAP.C.publisher.subscribe(clearAllMarker, 'cleanMap');
        ONEMAP.C.publisher.subscribe(remove, 'tools:active');
        ONEMAP.C.publisher.subscribe(remove, 'change23D');
    };

    /**
     * 移除模块
     */
    function remove(options) {
        if (options.modName != 'toolMarkPoint') {
            clearAllMarker();
            removeCurClass();
        } else {
            if ($('.tools-marker').hasClass('cur')) {
                removeCurClass();
                clearAllMarker();
            } else {
                $('.tools-marker').addClass('cur');
            }
        }
    };
    /**
     * 样式移除
     */
    function removeCurClass() {
        $('.tools-marker').removeClass('cur');
    };
    /**
     * 填写点数据后保存数据
     * @type {Function}
     * @param guid {Number} marker的guid
     */
    function saveMarkerData(guid, address) {
        var name = $('#markerAddress').val();
        if (name === '' || name === ' ') {
            alert('名称不能为空或包含空格');
            return false;
        }
        if ((/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s]/g).test(name)) {
            alert('名称只能包含英文、数字、中文');
            return false;
        }
        map23DData.markers[guid]['adress'] = name;
        if (map23DData.markers[guid].markerAddress !== '' && map23DData.markers[guid].markerAddress !== ' ') {
            require(['modDir/user/userPoint'], function(userPoint) {
                userPoint.addPoint({
                    name: name,
                    latlng: map23DData.markers[guid].geojson.geometry.coordinates,
                    pguid: guid,
                    type: map2DViewer.markers[guid].markerType
                });
            });
            if (map23DData.display.map2D) {
                map2DViewer.markers[guid].closePopup();
            } else if (map23DData.display.map3D) {
                map3DViewer.markers[guid].closePopup();
            }
        } else {
            alert('名称不能为空值!');
        }
    };
    /**
     * 删除点
     * @type {Function}
     * @param guid {Number} marker的guid
     */
    function deleteMarker(guid) {
        map23DControl.marker({
            action: 'remove',
            guid: guid
        })
    };
    /**
     * 清除所有的点 这里有 工具 栏 模块之间相互通告清除
     * @type {Function}
     */
    function clearAllMarker() {
        map23DControl.group({
            action: 'cleanAll',
            guid: modValue.markerGroup
        })
        map2DViewer.map.off('click', onClickPoint);
        if (L.Browser.ie || L.Browser.firefox) {
            map2DViewer.map.getContainer().style.cursor = 'url('+map23DConfig.map23DAssetsUrl + '/scripts/vendor/map23dlib/images/cur-none.cur),auto';
        } else {
            map2DViewer.map.getContainer().style.cursor = 'url('+map23DConfig.map23DAssetsUrl + '/scripts/vendor/map23dlib/images/cur-none.cur) 5 5,auto';
        }
    };
    /**
     * 通过地图缩放等级和坐标查找 地名
     * @type {Function}
     * @param latLng {Object} 坐标
     * @param callBack_func {Function} 回调方法
     * @private
     */
    function getInfoByZoomLatLng(latLng, callBack_func) {
        var zoom = map23DData.view.zoom;
        var addressSearch = new addressSearchF();
        addressSearch.getAddressInfo({ zoom: zoom, latLng: [latLng.lat, latLng.lng] }, function(data) {
            ONEMAP.V.loading.loaded();
            data = data.data;
            callBack_func(data);
        });
    };
    /**
     * 标记点击修改
     * @type {Function}
     * @param e
     * @private
     */
    function onClickPoint(e) {
        createMarker(e);
        setTimeout(function() {
            $('.marker-build-list span').bind('click', function() {
                $('.marker-build-list .select').removeClass('select');
                $(this).addClass('select');
            });
        }, 200);

        getInfoByZoomLatLng(e.latlng, function(data) {
            var address = data.address.toString();
            address = address.replace(/\ /g, "");
            modValue.address = address ? address : '未知地点';
            $("#markerAddress").val(modValue.address);
        });
    };
    /**
     * 创建一个新的标记
     * @type {Function}
     * @param e
     * @returns {L.Marker}
     * @private
     */
    function myFavPoint(e){
        if(!status.initialized){
            init();
            ONEMAP.C.publisher.publish({
                modName: 'userPoint',
            }, 'tools:active');
        }
        if(modValue.mayFavGuid[e.guid]){
            var latlng = map2DViewer.markers[modValue.mayFavGuid[e.pguid]].getLatLng();
            map23DControl.setView({
                center:{
                    lat:latlng.lat,
                    lng:latlng.lng
                }
            })
        }else{
            var iconUrl =  modValue.markerTypeIcon[e.type];
            var markerId = map23DControl.marker({
                action: 'add',
                groupId: modValue.markerGroup,
                geojson: {
                    "properties": {
                        iconUrl: iconUrl,
                        iconSize: [60, 39],
                        iconAnchor: [29, 39],
                        popupAnchor: [0, -39]
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [e.latlng[1], e.latlng[0]]
                    }
                }
            });
            modValue.mayFavGuid[e.pguid] = markerId;
            modValue.markers.push(markerId);
            modValue.curMarkerGuid = markerId;
            if (map23DData.display.map2D) {
                map2DViewer.markers[markerId].bindPopup(createMarKerPopViewHtml({ address: (this.markerAddress ? this.markerAddress : ' '), guid: this.guid }), { closeButton: false, minWidth: 200, maxWidth: 200 });
                map2DViewer.markers[markerId].openPopup();
            } else if (map23DData.display.map3D) {
                map3DViewer.label({
                    action:'update',
                    guid:markerId,
                    featureType:'marker',
                    label:{
                        text:e.name, //标牌内容
                        textColor:'#ffffff', //标牌文字颜色
                        lineColor:'#ff0000', //标牌引线及边框颜色
                        background:'#FF0000', //标牌背景颜色
                        lineTop:10, //标牌偏移值
                        lineLeft:100 //标牌偏移值
                    }
                })
            }
        }
        
    }
    function createMarker(e) {
        var markerId = map23DControl.marker({
            action: 'add',
            groupId: modValue.markerGroup,
            geojson: {
                "properties": {
                    iconUrl: map23DConfig.map23DAssetsUrl + '/images/layout/marker/roadsign_icon_0.png',
                    iconSize: [60, 39],
                    iconAnchor: [29, 39],
                    popupAnchor: [0, -39]
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [e.latlng.lng, e.latlng.lat]
                }
            }
        });
        modValue.markers.push(markerId);
        modValue.curMarkerGuid = markerId;
        if (map23DData.display.map2D) {
            map2DViewer.markers[markerId].bindPopup(createMarKerPopHtml({ address: ' ', guid: markerId }), { closeButton: false, minWidth: 300, maxWidth: 300 });
            map2DViewer.markers[markerId].openPopup();
            map2DViewer.markers[markerId].on('click', function() {
                this.bindPopup(createMarKerPopViewHtml({ address: (this.markerAddress ? this.markerAddress : ' '), guid: this.guid }), { closeButton: false, minWidth: 200, maxWidth: 200 });
                this.openPopup();
            });

        } else if (map23DData.display.map3D) {

        }
    };
    /**
     * 创建标记弹出 信息，表单
     * @type {Function}
     * @param data {Object} 标记数据
     * @returns {string}
     * @private
     */
    function createMarKerPopHtml(data) {
        var markerData = data;
        modValue.curMarkerGuid = markerData.guid;
        var container = '<h3 style="font-size:16px; padding:0px 0 5px 0; margin-bottom:10px; border-bottom:1px solid #3de0ff">添加新目标</h3><div class="marker-form form-horizontal" style="cursor:auto">' +

            '<div class="control-group"> ' +
            '<label class="control-label">名称：</label>' +
            '<input id="markerAddress" maxlength="20" class="input" type="text" value="\'' + markerData.address + '\'">' +
            '</div>' +
            '<div class="control-group">' +
            '<label class="control-label">图标：</label><div class="marker-build-list icon-list">' +
            '<span><img tid="0" onclick="ONEMAP.M.toolMarkerPoint.changeMarkerType(\'' + markerData.guid + '\',0)" src="' + modValue.markerType[0] + '" /></span>' +
            '<span><img tid="1" onclick="ONEMAP.M.toolMarkerPoint.changeMarkerType(\'' + markerData.guid + '\',1)" src="' + modValue.markerType[1] + '" /></span>' +
            '<span><img tid="2" onclick="ONEMAP.M.toolMarkerPoint.changeMarkerType(\'' + markerData.guid + '\',2)" src="' + modValue.markerType[2] + '" /></span>' +
            '<span><img tid="3" onclick="ONEMAP.M.toolMarkerPoint.changeMarkerType(\'' + markerData.guid + '\',3)" src="' + modValue.markerType[3] + '" /></span>' +
            '<span><img tid="4" onclick="ONEMAP.M.toolMarkerPoint.changeMarkerType(\'' + markerData.guid + '\',4)" src="' + modValue.markerType[4] + '" /></span>' +
            '<span><img tid="5" onclick="ONEMAP.M.toolMarkerPoint.changeMarkerType(\'' + markerData.guid + '\',5)" src="' + modValue.markerType[5] + '" /></span>' +
            '<span><img tid="6" onclick="ONEMAP.M.toolMarkerPoint.changeMarkerType(\'' + markerData.guid + '\',6)" src="' + modValue.markerType[6] + '" /></span>' +
            '</div></div>' +
            '<div class="text-right submit">' +
            '<button type="button" title="保存到 我的收藏-目标 中" onclick="ONEMAP.M.toolMarkerPoint.saveMarkerData(\'' + markerData.guid + '\',\'' + markerData.address + '\')" class="btn save btn3">保存</button>' +
            '<button type="button" onclick="ONEMAP.M.toolMarkerPoint.deleteMarker(\'' + markerData.guid + '\')" class="btn delete btn2">关闭</button>' +
            '</div>' +
            '</div>';
        return container;
    };

    function changeMarkerType(guid, type) {
        if (map23DData.display.map2D) {
            map2DViewer.markers[guid].markerType = type;
            map2DViewer.marker({
                action: 'update',
                geojson: {
                    "properties": {
                        iconUrl: modValue.markerTypeIcon[type]
                    }
                },
                guid: guid
            })
        } else {
            map3DViewer.markers[guid].markerType = type;
            map3DViewer.marker({
                action: 'update',
                geojson: {
                    "properties": {
                        iconUrl: modValue.markerTypeIcon[type]
                    }
                },
                guid: guid
            })
        }
    };
    /**
     * 创建标记弹出 信息 浏览内容
     * @type {Function}
     * @param data {Object} 标记数据
     * @returns {string}
     * @private
     */
    function createMarKerPopViewHtml(data) {
        var markerData = data;
        modValue.curMarkerGuid = markerData.guid;
        var container = '' +
            '<div class="marker-info">' +
            '<p> ' +
            '<strong>' + (markerData.address ? markerData.address : ' ') + '</strong>' +
            '<a class="removemarker" onclick="ONEMAP.M.toolMarkerPoint.deleteMarker(\'' + markerData.guid + '\')" href="javascript:void(0)">移除</a>' +
            '</p>' +
            '<div class="op text-right">设为：' +
            '<a onclick="ONEMAP.M.toolMarkerPoint.setStart(\'' + markerData.guid + ',' + markerData.address + '\')" href="javascript:void(0)">起点</a> | ' +
            '<a onclick="ONEMAP.M.toolMarkerPoint.setAcross(\'' + markerData.guid + ',' + markerData.address + '\')" href="javascript:void(0)">途经点</a> | ' +
            '<a onclick="ONEMAP.M.toolMarkerPoint.setAvoid(\'' + markerData.guid + ',' + markerData.address + '\')" href="javascript:void(0)">规避点</a> | ' +
            '<a onclick="ONEMAP.M.toolMarkerPoint.setStop(\'' + markerData.guid + ',' + markerData.address + '\')" href="javascript:void(0)">终点</a><br/>' +
            '</div>' +
            '</div>';
        return container;
    };
    //冒泡窗事件
    function setStart(guid, address) {
        var data = map23DData.markers[guid];
        setDirectionsPoint(data.geojson.geometry.coordinates[1], data.geojson.geometry.coordinates[0], address);
    };

    function setAcross(guid, address) {
        var data = map23DData.markers[guid];
        setDirectionsPoint(data.geojson.geometry.coordinates[1], data.geojson.geometry.coordinates[0], address);
    };

    function setAvoid(guid, address) {
        var data = map23DData.markers[guid];
        setDirectionsPoint(data.geojson.geometry.coordinates[1], data.geojson.geometry.coordinates[0], address);
    };

    function setStop(guid, address) {
        var data = map23DData.markers[guid];
        setDirectionsPoint(data.geojson.geometry.coordinates[1], data.geojson.geometry.coordinates[0], address);
    };

    function setDirectionsPoint() {

    };

    function bindEvent() {};
    return ONEMAP.M.toolMarkerPoint = {
        init: init,
        setStop: setStop,
        setAvoid: setAvoid,
        setAcross: setAcross,
        setStart: setStart,
        deleteMarker: deleteMarker,
        changeMarkerType: changeMarkerType,
        saveMarkerData: saveMarkerData,
        myFavPoint:myFavPoint
    }
})
