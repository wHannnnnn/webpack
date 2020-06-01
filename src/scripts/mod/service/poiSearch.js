/**
 * @fileoverview 地名检索服务
 * @author Song.Huang
 * @version 1.0.0
 */
define(function(){
    var poiSearch = function(options) {

        this._options = {
            page: 1,
            pageSize: 50
        }

        _.merge(this._options,options);

        /**
         * 检索关键字检查，是否需要分词
         * @param  {[type]} options       [keywords(检索关键字 查询是否需要分词和二次查询)]
         * @param  {[type]} callbackFunc [description]
         * @return {[type]}               [description]
         */
        this.getAreaInfo = function(options, callbackFunc) {
            options.keywords = encodeURIComponent(options.keywords);
            var sUrl = onemapUrlConfig.poiSearchDataUrl + '/v1.0/area/match/'+
                        '?address_name=' + options.keywords +
                        '&ticket=' + ONEMAP.D.user.ticket;
            ONEMAP.V.loading.load();
            $.ajax({
                url: sUrl,
                type: 'GET',
                dataType: 'jsonp'
            })
            .done(function(data) {
                ONEMAP.V.loading.loaded();
                callbackFunc(data);
            })
            .fail(function() {
                ONEMAP.V.loading.loaded();
            });
        },
        this.byZoomLatLng = function(zoomLevel,latLng,callback_func){
            var url= onemapUrlConfig.addressSearchDataUrl+':80/v1.0/address/near/?z'+zoomLevel+
                        '&lon='+latLng.lng+
                        '&lat='+latLng.lat;

            L.Util.ajax(url,{jsonp:true,cbParam:'callback'},function(data){
                callback_func(data);
            });
        },
        /**
         * 检索关键字
         * @param  {[type]} options       [description]
         * @param  {[type]} callbackFunc [description]
         * @return {[type]}               [description]
         */
        this.getPoiByOptions = function(options, callbackFunc) {
            var sUrl = onemapUrlConfig.poiSearchDataUrl + '/v1.0/address/?' +
                'page=' + this._options.page +
                '&pre_page=' + this._options.pageSize +
                '&ticket=' + ONEMAP.D.user.ticket;

            //区域代码            
            if (options.hasOwnProperty('pac')) {
                sUrl += '&pac=' + options.pac;
            }
            //关键字
            if (options.hasOwnProperty('keywords')) {
                options.keywords = encodeURIComponent(options.keywords);
                sUrl += '&address_name=' + options.keywords;
            }
            //专题id
            if (options.hasOwnProperty('themeId')) {
                sUrl += '&theme_id=' + options.themeId;
            }

            //带矩形范围
            if (options.hasOwnProperty('bounds')) {
                sUrl += '&min_lat=' + options.bounds.southWest[0] +
                    '&min_lon=' + options.bounds.southWest[1] +
                    '&max_lat=' + options.bounds.northEast[0] +
                    '&max_lon=' + options.bounds.northEast[1];
            }
            //中心点外扩
            if (options.hasOwnProperty('range') && options.hasOwnProperty('rangeCenter')) {
                sUrl += '&search_range=' + options.range +
                    '&min_lat=' + options.rangeCenter[0] +
                    '&min_lon=' + options.rangeCenter[1];
            }
            
            ONEMAP.V.loading.load();
            $.ajax({
                url: sUrl,
                type: 'GET',
                dataType: 'jsonp'
            })
            .done(function(data) {
                ONEMAP.V.loading.loaded();
                callbackFunc(data);
            })
            .fail(function() {
                ONEMAP.V.loading.loaded();
            });
        }
    };

    return poiSearch;
})


