/**
 * @fileoverview 位置信息查询服务
 * @author Song.Huang
 * @version 1.0.0
 */
define(function(){
    var addressSearch = function() {

        /**
         * 通过缩放等级和坐标查询位置信息
         * @param  {[type]} options       [latLng(经纬度数组[维度，经度])     zoom(地图缩放比例)]
         * @param  {[type]} callbackFunc [description]
         * @return {[type]}               [description]
         */
        this.getAddressInfo = function(options, callbackFunc) {
            var sUrl = onemapUrlConfig.addressSearchDataUrl + '/v1.0/address/near/'+
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
        }
            
    };

    return addressSearch;
})


