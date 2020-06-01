L.Control.MouseBlur = L.Control.extend({
    //是否初始化 
    _initialized: false,
    options: {
        weight: 1,
        color: '#000000',
        opacity: 0.8
    },
    linesData: {
        lineX: null,
        lineY: null
    },
    initialize: function(options) {
        L.setOptions(this, options);
        return this;
    },
    onAdd: function(map) {
        this._map = map;
        this.craetMouse();
        this._map.on('mousemove', this.mouseMove, this);
        this._container = L.DomUtil.create('div', 'leaflet-bar leaflet-cross');
        return this._container;
    },
    craetMouse: function() {
        var _this = this;
        _this.printBounds = _this._map.getBounds();
        _this.center = _this._map.getCenter();
        _this.linesData.lineX = [
            [_this.center.lat, _this.printBounds._northEast.lng],
            [_this.center.lat, _this.printBounds._southWest.lng]
        ];
        _this.linesData.lineY = [
            [_this.printBounds._northEast.lat, _this.center.lng],
            [_this.printBounds._southWest.lat, _this.center.lng]
        ];
        _this.crosslineX = L.polyline(
            _this.linesData.lineX,
            _this.options
        ).addTo(_this._map);
        _this.crosslineY = L.polyline(
            _this.linesData.lineY,
            _this.options
        ).addTo(_this._map);
        if (L.Browser.ie || L.Browser.firefox) {
            _this._map.getContainer().style.cursor = 'url(../scripts/vendor/map23dlib/images/cur-none.cur),auto';
        } else {
            _this._map.getContainer().style.cursor = 'url(../scripts/vendor/map23dlib/images/cur-none.cur) 5 5,auto';
        }
    },
    mouseMove: function(e) {
        var _this = this;
        _this.center = e.latlng;
        _this.linesData.lineX = [
            [_this.center.lat, 180],
            [_this.center.lat, -180]
        ];
        _this.linesData.lineY = [
            [90, _this.center.lng],
            [-90, _this.center.lng]
        ];
        _this.crosslineX.setLatLngs(_this.linesData.lineX);
        _this.crosslineY.setLatLngs(_this.linesData.lineY);
    },
    remove: function() {
        var _this = this;
        /*_this._map.removeLayer(_this.crosslineY);
        _this._map.removeLayer(_this.crosslineX);
        _this._map.getContainer().style.cursor = "auto";*/
    }
});



L.control.mouseblur = function(options) {

    return new L.Control.MouseBlur(options);

}
