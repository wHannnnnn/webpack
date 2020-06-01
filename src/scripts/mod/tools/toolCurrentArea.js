define([
        'html!templates/tools/toolCurrentArea',
        'modDir/service/regionSearch',
        'css!styles/tools/toolCurrentArea'
    ],
    function(tplLayout, regionSearchF) {
        /**
         * 模块状态，用于存储模块的状态 例如：收起，关闭
         * @type {Object}
         */
        var status = {
            initialized: false, //是否初始化
            modalStatus: false //界面是否弹出
        };

        /**
         * 模块数据 用于数据存储和外部调用
         * @type {Object}
         * 数据存放
         */
        var modValue = {
                currentAreaDataResult: {},
                currentCityInfo: null //当前区域json数据
            }
            /**
             * 初始化并订阅事件
             * @return {[type]} [description]
             */
        function init() {
            if (status.initialized === false) {                
                setLayout();
                subscribe();
                bindEvent();
                getCurrentCity();
            } else {
                if (status.modalStatus) {
                    hideModal();
                } else {
                    showModal();
                }
            }
        };
        function setLayout(){
            $("body").append(tplLayout);
            $("#provinceModal .content").mCustomScrollbar({
                scrollInertia: 0
            });
            showModal();
        };
        /**
         * 设置地图到指定的区域
         * 支持url解析
         * @type {Function}
         * @param options {Object} {center:中心点,zoom:缩放比例}
         */
        function mapToPoint(options) {
            if (map23DData.display.map2D) {
                map2DViewer.setView({
                    center: options.center,
                    zoom: options.zoom
                });
            } else if (map23DData.display.map3D) {
                map3DViewer.setView({
                    center: options.center,
                    zoom: options.zoom
                });
            }
        };
        /**
         * 显示城市跳转模态窗口
         * @type {Function}
         */
        function showModal() {
            $($("#provinceModal")).css({ left: '10px' });
            $($("#provinceModal")).css({ bottom:'40px' });
            $($("#provinceModal")).show();
            $("#provinceModal .content").mCustomScrollbar('update');
            status.modalStatus = true;
        };
        /**
         * 隐藏城市跳转模态窗口
         * @type {Function}
         */
        function hideModal() {
            $($("#provinceModal")).hide();
            status.modalStatus = false;
        };
        /**
         * 界面布局重置
         * @type {Function}
         */
        function layoutResize() {
            $("#provinceModal .content").mCustomScrollbar('update');
        };
        /**
         * 获取当前城市信息
         * @type {Function}
         * @returns {*}
         */
        function getCurrentCity() {
            var center = map23DData.view.center;
            var zoom = map23DData.view.zoom;
            getPointCity(center, zoom);
        };
        /**
         * 在ONEMAP.M.user中记录当前城市信息
         * @type {Function}
         * @param data {Object} 城市名称，中心点，bounds范围
         * @private
         */
        function setONEMAPCityInfo(data) {
            ONEMAP.D.cityInfo.name = data.name.text;
            ONEMAP.D.cityInfo.center = data.center;
            ONEMAP.D.cityInfo.pac = data.code;
            ONEMAP.D.cityInfo.zoom = data.zoom;
        };
        /**
         * 获取目标城市信息数据
         * @type {Function}
         * @param center {Object} 中心点
         * @param zoom {Number} 缩放比例，不同比例返回的 区域等级不一样
         * @returns {*}
         * @private
         */
        function getPointCity(center, zoom) {
            var regionSearch = new regionSearchF;
            regionSearch.getRegionInfo({ latLng: [center.lat, center.lng], zoom: zoom }, function(data) {
                modValue.currentAreaDataResult = data.data;
                updateCurrentAreaPanel(data.data);
            });
        };
        /**
         * 更新 当前城市信息面板 由地图拖动来驱动
         * @type {Function}
         * @param data {Object}
         * @returns {*}
         * @private
         */
        function updateCurrentAreaPanel(data) {
            var curAreaName = '';
            var curArea = $('#provinceModal .modal-header h3');
            curArea.empty();
            var nextArea = $('#CurCityInfo');
            nextArea.empty();
            if (data.hasOwnProperty('level') && data.level.length > 0) {
                var i = 0;
                var l = data.level.length;
                for (i; i < l; i++) {
                    if (i !== (l - 1)) {
                        var item = $('<a href="javascript:void(0)">' + data.level[i].name.text + '</a> > ');
                        item.bind("click", { d: data.level[i] }, function(event) {
                            mapToPoint({
                                center: [event.data.d.center.lat, event.data.d.center.lon],
                                zoom: event.data.d.zoom + 3,
                                name: event.data.d.name.text
                            });
                            setONEMAPCityInfo(event.data.d);
                        });
                    } else if (i === (l - 1)) {
                        var item = $('<strong>' + data.level[i].name.text + '</strong>');
                        curAreaName = data.level[i].name.text;
                        //更新ONEMAP.D.cityInfo
                        setONEMAPCityInfo(data.level[i]);
                    }
                    //设置当前 城市信息
                    if (data.level[i].category === 'city') {
                        modValue.currentCityInfo = data.level[i];
                    }
                    item.appendTo(curArea);
                }
                $("#curLocationArea").empty().text(curAreaName);
            } else {
                curArea.empty().html('<strong>全球</strong>');
            }

            if (data.hasOwnProperty('next_level') && data.next_level.length > 0) {
                var nextLevelAry = sortBy(data.next_level, 'code');

                for (var i = 0, l = nextLevelAry.length; i < l; i++) {
                    var item = $('<a href="javascript:void(0)">' + nextLevelAry[i].name.text + '</a>');
                    item.bind("click", { d: nextLevelAry[i] }, function(event) {
                        mapToPoint({
                            center: [event.data.d.center.lat, event.data.d.center.lon],
                            zoom: event.data.d.zoom + 3,
                            name: event.data.d.name.text
                        });
                        setONEMAPCityInfo(event.data.d);
                    });
                    item.appendTo(nextArea);
                }
            }
        };

        function sortBy(arr, prop, desc) {
            var props = [],
                ret = [],
                i = 0,
                len = arr.length;
            if (typeof prop == 'string') {
                for (; i < len; i++) {
                    var oI = arr[i];
                    (props[i] = new String(oI && oI[prop] || ''))._obj = oI;
                }
            }
            props.sort();
            for (i = 0; i < len; i++) {
                ret[i] = props[i]._obj;
            }
            if (desc) {
                ret.reverse();
            }
            return ret;
        };
        /**
         * 注册监听
         * @type {Function}
         */
        function subscribe() {
            ONEMAP.C.publisher.subscribe(getCurrentCity, 'mapChange');
        };
        /**
         * 取消监听
         * @type {Function}
         */
        function unSubscribe() {};

        /**
         * 监听数据推送
         * @type {Function}
         */
        function publish() {};
        /**
         * 点击事件绑定
         */
        function bindEvent() {
            $("#provinceModal .modal-header .close").bind("click", function() {
                hideModal();
            });
            $("#provinceModal .table a").bind("click", function() {
                var cityname = $(this).text().replace(':', '');
                require(["vendorDir/data/cityData"], function(cityData) {
                    $.each(cityData, function(index, value) {
                        if (value.n.indexOf(cityname) >= 0) {
                            mapToPoint({ center: L.latLng(cityData[index].latLng[0], cityData[index].latLng[1]), zoom: 10 });
                            return false;
                        }
                    });
                });
            });
            $("#provinceModal #CityHotCity a, #provinceModal #globalCity a").bind("click", function() {
                var cityname = $(this).text().replace(':', '');

                require(["vendorDir/data/cityData"], function(cityData) {
                    $.each(cityData, function(index, value) {
                        if (value.n.indexOf(cityname) >= 0) {
                            mapToPoint({ center: L.latLng(cityData[index].latLng[0], cityData[index].latLng[1]), zoom: 10 });
                            return false;
                        }
                    });
                });
            });
            $("#provinceModal #cityLetterList a").click(function() {
                if (L.Browser.ie6) {
                    return false;
                }
                $("#provinceModal #cityPlaceList").mCustomScrollbar("scrollTo", $(this).data("role"));
            });
            //搜索
            $('#provinceModalCitySearch .input-small').bind('focus', function(e) {
                $(this).val('');
            });
            $('#provinceModalCitySearch .input-small').bind('keyup', function(e) {
                $('#provinceModalCitySearchResult').empty();
                var cityname = $(this).val().replace(' ', '');
                if (cityname === '') {
                    $('#provinceModalCitySearchResult').css({ display: 'none' });
                    return false;
                }
                require(["vendorDir/data/cityData"], function(cityData) {
                    var count = 0;
                    $.each(cityData, function(index, value) {
                        if (value.n.indexOf(cityname) >= 0) {
                            var item = $('<li><a href="javascript:void(0)">' + cityData[index].n + '</a></li>').appendTo($('#provinceModalCitySearchResult'));
                            item.on("click", { data: value }, function(e) {
                                mapToPoint({ center: L.latLng(e.data.data.latLng[0], e.data.data.latLng[1]), zoom: 10 });
                                $('#provinceModalCitySearchResult').css({ display: 'none' });
                            });
                            count++
                            if (count > 6) {
                                return false;
                            }
                        }
                    });

                    if (count == 0) {
                        $('<li>请输入正确的城市名</li>').appendTo($('#provinceModalCitySearchResult'))
                    }

                });
                $('#provinceModalCitySearchResult').css({ display: 'block' });
            });
            $('#provinceModalCitySearch .input-small').bind('keydown', function(e) {
                if (e.keyCode === 13) {
                    $('#provinceModalCitySearchResult').empty();
                    var cityname = $(this).val().replace(' ', '');
                    if (cityname === '') {
                        $('#provinceModalCitySearchResult').css({ display: 'none' });
                        return false;
                    }
                    require(["vendorDir/data/cityData"], function(cityData) {
                        var count = 0;
                        $.each(cityData, function(index, value) {
                            if (value.n.indexOf(cityname) >= 0) {
                                var item = $('<li><a href="javascript:void(0)">' + cityData[index].n + '</a></li>').appendTo($('#provinceModalCitySearchResult'));
                                item.on("click", { data: value }, function(e) {
                                    mapToPoint({ center: L.latLng(e.data.data.latLng[0], e.data.data.latLng[1]), zoom: 10 });
                                    $('#provinceModalCitySearchResult').css({ display: 'none' });
                                });
                                count++
                                if (count > 6) {
                                    return false;
                                }
                            }
                        });

                        if (count == 0) {
                            $('<li>请输入正确的城市名</li>').appendTo($('#provinceModalCitySearchResult'))
                        }

                    });
                    $('#provinceModalCitySearchResult').css({ display: 'block' });
                }
            });
        };
    	return ONEMAP.M.CurrentArea = {
    		init:init,
    		showModal:showModal,
    		hideModal:hideModal
    	};
    })
