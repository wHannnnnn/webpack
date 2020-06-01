/**
 * @fileoverview 路径规划服务
 * @author Song.Huang
 * @version 1.0.0
 */
define(function(){
    var routeSearch = function() {

        /** 必经点+规避点路线规划
         * [getNaviPathPro description]
         * @param  {[type]} options       [viaAry(第一个为起点，最后一个为终点，中间的为必经点)       avoidAry(规避点数组)]
         * @param  {[type]} callbackFunc [description]
         * @return {[type]}               [description]
         */
        this.getNaviPath = function(options, callbackFunc) {
            var sUrl = onemapUrlConfig.routeSearchDataUrl + '/v1.0/planning' + 
                    '?via=' + JSON.stringify(options.viaAry) + 
                    '&avoid=' + JSON.stringify(options.avoidAry) +
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

    return routeSearch;
})


