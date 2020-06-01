/**
 * @fileoverview 全局设置 模块
 * @author Song.Huang
 * @version 1.0.0
 */
define(['html!templates/user/userSetting',
    'css!styles/user/userSetting'
], function(tplLayout) {

    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {}

    /**
     * 是否已经初始化
     * @type {Boolean}
     * @default false
     */
    var status = {
        initialized: false,
        //是否可以post数据 用于表单验证
        canPost: false
    };

    /**
     * 初始化
     * @type {Function}
     */
    function init() {
        if (!status.initialized) {
            setLayout();
            bindEvent();
            status.initialized = true;            
        }

        //设置zIndex 为最高
        var zIndex = ONEMAP.M.sideBar.getZIndex();
        $('#globalSetting').css({zIndex:zIndex});

        ONEMAP.D.currentSideBarMod = 'userSetting';
        //开启侧栏
        ONEMAP.C.publisher.publish('show','layout::sideBar');
    };

    /**
     * 设置界面
     */
    function setLayout() {
        $(tplLayout).appendTo($("#sideBarBody"));
        layoutResize();

        if (ONEMAP.D.globalSettingData.mapSetting) {
            $('#mapLat').val(ONEMAP.D.globalSettingData.mapSetting.center.lat);
            $('#mapLng').val(ONEMAP.D.globalSettingData.mapSetting.center.lng);
            $('#mapZoom').val(ONEMAP.D.globalSettingData.mapSetting.zoom);
            $('#mapType').val(ONEMAP.D.globalSettingData.mapSetting.type);
        }
        buildDxForm();
        $("#dxForm .body").mCustomScrollbar({
            scrollInertia: 0
        });

        buildMxForm();
        $("#mxForm .body").mCustomScrollbar({
            scrollInertia: 0
        });

        $("#globalSetting .panel-body").mCustomScrollbar({
            scrollInertia: 0
        });
    }

    /**
     * 界面重置
     * @return {[type]} [description]
     */
    function layoutResize(){
        $('#dxForm .body').css({height:400});
        $('#mxForm .body').css({height:400});
        $("#globalSetting .panel-body").css({height:$(window).height()-100});
    }

    /**
     * 界面事件绑定
     * @return {[type]} [description]
     */
    function bindEvent() {
        $("#globalSetting .panel-footer .sure").bind('click', function() {
            saveSetting();
        });

        $('#dxForm .add-new').bind('click', function() {
            addNewDxForm();
        });

        $('#dxForm').on('click', '.delete', function(e) {
            if (window.confirm('确定删除?')) {
                var el = e.target ? e.target : e.srcElement;
                $(el).parent().remove();
                $("#dxForm .body").mCustomScrollbar('update');
            }
        });
        $('#dxForm').on('click','.up',function(e){
            var _this = $(this).parent();
                $(_this).prev().before(_this)
        })
        $('#dxForm').on('click','.down',function(e){
            var _this = $(this).parent();
                $(_this).next().after(_this)
        })
        $('#mxForm').on('click','.up',function(e){
            var _this = $(this).parent();
                $(_this).prev().before(_this)
        })
        $('#mxForm').on('click','.down',function(e){
            var _this = $(this).parent();
                $(_this).next().after(_this)
        })
        $('#mxForm .add-new').bind('click', function() {
            addNewMxForm();
        });

        $('#mxForm').on('click', '.delete', function(e) {
            if (window.confirm('确定删除?')) {
                var el = e.target ? e.target : e.srcElement;
                $(el).parent().remove();
                $("#mxForm .body").mCustomScrollbar('update');
            }
        });

        
    }

    

    /**
     * 构建地形图数据列表
     * @type {Function}
     * @private
     */
    function buildDxForm() {
        var dxListTemplate = Handlebars.compile($('#dixing-item-template').html());
        $('#dxList').append(dxListTemplate(ONEMAP.D.globalSettingData.dixing));        
    };

    /**
     * 添加一条新的地形图表单
     * @type {Function}
     * @private
     */
    function addNewDxForm() {        
        $('#dxList').append($('#dixing-item-form-template').html());
        $("#dxForm .body").mCustomScrollbar("update");
        $("#dxForm .body").mCustomScrollbar("scrollTo", "bottom");
    };


    /**
     * 构建模型数据列表
     * @type {Function}
     * @private
     */
    function buildMxForm() {
        var mxListTemplate = Handlebars.compile($('#moxing-item-template').html());
        $('#mxList').append(mxListTemplate(ONEMAP.D.globalSettingData.moxing));        
    };

    /**
     * 添加一条新的模型表单
     * @type {Function}
     * @private
     */
    function addNewMxForm() {        
        $('#mxList').append($('#moxing-item-form-template').html());
        $("#mxForm .body").mCustomScrollbar("update");
        $("#mxForm .body").mCustomScrollbar("scrollTo", "bottom");
    };

    /**
     * 获取地形图表单数据
     * @type {Function}
     * @returns {Array} 地形图数据数组
     * @private
     */
    function getDxFormData() {
        var dxData = [];
        if ($('#dxForm .item-form').length > 0) {
            $('#dxForm .item-form').each(function(index, item) {
                var tempObj = {};
                var name = ($(item).find('input[name="name"]').val()).replace(/\ /g, "");
                var guid = ($(item).find('input[name="guid"]').val()).replace(/\ /g, "");
                var min_zoom = ($(item).find('input[name="min_zoom"]')).val().replace(/\ /g, "");
                var max_zoom = ($(item).find('input[name="max_zoom"]')).val().replace(/\ /g, "");
                var zoom = ($(item).find('input[name="zoom"]').val()).replace(/\ /g, "");
                var centerLat = ($(item).find('input[name="center-lat"]').val()).replace(/\ /g, "");
                var centerLng = ($(item).find('input[name="center-lng"]').val()).replace(/\ /g, "");
                var tileLayerUrl = ($(item).find('input[name="tileLayerUrl"]').val()).replace(/\ /g, "");
                if (name.length > 0 && guid.length > 0 && min_zoom.length > 0 && max_zoom.length > 0 && zoom.length > 0 && centerLat.length > 0 && centerLng.length > 0 && tileLayerUrl.length > 0) {

                    if (name.length > 8) {
                        alert('名称为 ' + name + ' 的文字长度不能超过8个字符');
                        status.canPost = false;
                        return false;
                    }


                    if (centerLat < -90 || centerLat > 90 || centerLng < -180 || centerLng > 180) {
                        alert('名称为 ' + name + ' 的中心点超出经纬度范围');
                        status.canPost = false;
                        return false;
                    }

                    if (parseInt(min_zoom) > parseInt(max_zoom)) {
                        alert('名称为 ' + name + ' 的最小缩放等级不能大于最大缩放等级');
                        status.canPost = false;
                        return false;
                    }

                    if (parseInt(zoom) > parseInt(max_zoom) || parseInt(zoom) < parseInt(min_zoom)) {
                        alert('名称为 ' + name + ' 的初始缩放等级必须在最小/最大缩放等级范围内。');
                        status.canPost = false;
                        return false;
                    }
                    tempObj.name = name;
                    tempObj.guid = guid;
                    tempObj.min_zoom = parseInt(min_zoom);
                    tempObj.max_zoom = parseInt(max_zoom);
                    tempObj.zoom = parseInt(zoom);
                    tempObj.center = [parseFloat(centerLat), parseFloat(centerLng)];
                    tempObj.tileLayerUrl = tileLayerUrl;
                    dxData.push(tempObj);
                    status.canPost = true;
                } else {
                    alert('名称为 ' + name + ' 的所有选项都是必填选项！请填写完整');
                    status.canPost = false;
                    return false;
                }
            });
        } else {
            status.canPost = true;
        }

        return dxData;
    };

    /**
     * 获取模型表单数据
     * @type {Function}
     * @returns {Array} 模型数据数组
     * @private
     */
    function getMxFormData() {
        var mxData = [];
        if ($('#mxForm .item-form').length > 0) {
            $('#mxForm .item-form').each(function(index, item) {
                var tempObj = {};
                var name = ($(item).find('input[name="name"]').val()).replace(/\ /g, "");
                var height = ($(item).find('input[name="height"]').val()).replace(/\ /g, "");
                var centerLat = ($(item).find('input[name="center-lat"]').val()).replace(/\ /g, "");
                var centerLng = ($(item).find('input[name="center-lng"]').val()).replace(/\ /g, "");
                var modelUrl = ($(item).find('input[name="modelUrl"]').val()).replace(/\ /g, "");
                if (name.length > 0 && height.length > 0 && centerLat.length > 0 && centerLng.length > 0 && modelUrl.length > 0) {

                    if (name.length > 8) {
                        alert('名称为 ' + name + ' 的文字长度不能超过8个字符');
                        status.canPost = false;
                        return false;
                    }


                    if (centerLat < -90 || centerLat > 90 || centerLng < -180 || centerLng > 180) {
                        alert('名称为 ' + name + ' 的中心点超出经纬度范围');
                        status.canPost = false;
                        return false;
                    }

                    tempObj.name = name;
                    tempObj.height = parseInt(height);
                    tempObj.center = [parseFloat(centerLat), parseFloat(centerLng)];
                    tempObj.modelUrl = modelUrl;
                    mxData.push(tempObj);
                    status.canPost = true;
                } else {
                    alert('名称为 ' + name + ' 的所有选项都是必填选项！请填写完整');
                    status.canPost = false;
                    return false;
                }
            });
        } else {
            status.canPost = true;
        }

        return mxData;
    };

    /**
     * 获取地图模式设置单数据
     * @type {Function}
     * @returns {Array} 
     * @private
     */
    function getMapFormData() {
        var mapData = {};
        var mapLat = ($('#mapForm').find('input[name="mapLat"]').val()).replace(/\ /g, "");
        var mapLng = ($('#mapForm').find('input[name="mapLng"]')).val().replace(/\ /g, "");
        var mapZoom = $('#mapZoom').val();
        var mapType = $('#mapType').val();

        if (mapLat.length > 0 && mapLng.length > 0) {

            if (mapLat < -90 || mapLat > 90 || mapLng < -180 || mapLng > 180) {
                alert('地图默认中心点超出经纬度范围');
                status.canPost = false;
                return false;
            }

            mapData.center = { lat: mapLat, lng: mapLng };
            mapData.type = parseInt(mapType);
            mapData.zoom = parseInt(mapZoom);
            status.canPost = true;
        } else {
            alert('所有选项都是必填选项！请填写完整');
            status.canPost = false;
            return false;
        }
        return mapData;
    };

    /**
     * 保存设置 保存成功则刷新页面
     * @type {Function}
     * @returns {boolean}
     * @private
     */
    function saveSetting() {
        var ajaxData = {};
        var mapData = getMapFormData();
        ajaxData.mapSetting = mapData;
        var dxData = getDxFormData();
        ajaxData.dixing = dxData;
        var mxData = getMxFormData();
        ajaxData.moxing = mxData;
        if (status.canPost) {
            $.ajax({
                type: "post",
                dataType: 'json',
                url: onemapUrlConfig.storageServiceUrl + '/storage?ticket=' + ONEMAP.D.user.ticket,
                data: { mapSetting: JSON.stringify(ajaxData) },
                beforeSend: ONEMAP.V.loading.load(),
                success: function(data) {
                    if (window.confirm('保存成功，是否刷新页面应用设置？')) {
                        location.reload(true);
                    }
                },
                error: function(data) {
                    alert('保存失败，请重试!');
                },
                completer: ONEMAP.V.loading.loaded()
            });
        }
    };

    return ONEMAP.M.setting = {
        init: init
    };
});
