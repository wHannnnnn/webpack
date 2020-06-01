/**
 * @fileoverview 行政区域查询
 * @author Song.Huang
 * @version 1.0.0
 */
define(function(){
    var regionSearch = function() {
        /**
         * 通过坐标查询 父级市县和下级市县
         * @param  {[type]} options       [(lat纬度，lon经度 zoom(地图缩放等级)]
         * @param  {[type]} callbackFunc [回调方法]
         * @return {[type]}               [description]
         */
        this.getRegionInfo = function(options, callbackFunc) {
            var sUrl = onemapUrlConfig.regionSearchDataUrl + '/v1.0/area/name/'+
                        '?z=' + options.zoom + 
                        '&lon=' + options.latLng[1] + 
                        '&lat=' + options.latLng[0] +
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
        };

        /**
         * 通过经纬度和省市级编号查询边界点
         * @param latLng {LatLng} 坐标
         * @param demand {Number} 省市级编号  4-省  5-市 6-县
         * @param callbackFunc {Function} 回调方法
         */
        this.getRegionBoundary = function(options, callbackFunc) {
            var sUrl = onemapUrlConfig.regionSearchDataUrl + '/v1.0/area/edge/'+
                        '?lon=' + options.latLng[1] + 
                        '&lat=' + options.latLng[0] + 
                        '&scale=' + options.demand +
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
        }
    };

    return regionSearch;
})


