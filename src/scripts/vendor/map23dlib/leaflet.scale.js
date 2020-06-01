/*
 * L.Control.Scale is used for displaying metric/imperial scale on the map.
 */

L.Control.Scale = L.Control.extend({
    options: {
        position: 'bottomleft',
        maxWidth: 100,
        metric: false,
        imperial: true,
        updateWhenIdle: false,
        offset:[10,10]
    },

    initialize: function (options) {
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._map = map;

        var className = 'leaflet-control-scale',
            container = L.DomUtil.create('div', className),
            options = this.options;
        switch(this.options.position){
            case 'topleft':
                container.style.marginLeft = this.options.offset[0]+'px';
                container.style.marginTop = this.options.offset[1]+'px';
                break;
            case 'topright':
                container.style.marginRight = this.options.offset[0]+'px';
                container.style.marginTop = this.options.offset[1]+'px';
                break;
            case 'bottomleft':
                container.style.marginLeft = this.options.offset[0]+'px';
                container.style.marginBottom = this.options.offset[1]+'px';
                break;
            case 'bottomright':
                container.style.marginRight = this.options.offset[0]+'px';
                container.style.marginBottom = this.options.offset[1]+'px';
                break;
        }

        this._addScales(options, className, container);

        map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
        map.whenReady(this._update, this);

        L.DomEvent.on(container,'contextmenu',L.DomEvent.stopPropagation);

        return container;
    },

    onRemove: function (map) {
        map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
    },

    getUnit:function(){
        return this.options.metric?'metric':'imperial'
    },

    setUnit:function(unit){
        if(unit == 'metric'){
            this.options.metric = true;
            this.options.imperial = false;
            this._mScale.style.display = 'block';
            this._iScale.style.display = 'none';
        }
        if(unit == 'imperial'){
            this.options.metric = false;
            this.options.imperial = true;
            this._iScale.style.display = 'block';
            this._mScale.style.display = 'none';
        }
        
        this._update();
    },

    _addScales: function (options, className, container) {
        this._mScale = L.DomUtil.create('div', className + '-line', container);
        this._iScale = L.DomUtil.create('div', className + '-line', container);
        if (options.metric) {
            this._mScale.style.display = 'block';
            this._iScale.style.display = 'none';
        }
        if (options.imperial) {
            this._iScale.style.display = 'block';
            this._mScale.style.display = 'none';
        }
    },

    _update: function () {
        var bounds = this._map.getBounds(),
            centerLat = bounds.getCenter().lat,
            halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180),
            dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,

            size = this._map.getSize(),
            options = this.options,
            maxMeters = 0;

        if (size.x > 0) {
            maxMeters = dist * (options.maxWidth / size.x);
        }

        this._updateScales(options, maxMeters);
    },

    _updateScales: function (options, maxMeters) {
        if (options.metric && maxMeters) {
            this._updateMetric(maxMeters);
        }

        if (options.imperial && maxMeters) {
            this._updateImperial(maxMeters);
        }
        
    },

    _updateMetric: function (maxMeters) {
        var meters = this._getRoundNum(maxMeters);

        this._mScale.style.width = this._getScaleWidth(meters / maxMeters) + 'px';
        this._mScale.innerHTML = meters < 1000 ? '<span>'+meters + ' 米</span>' : '<span>'+(meters / 1000) + ' 公里</span>';
    },

    _updateImperial: function (maxMeters) {
        var maxFeet = maxMeters * 3.2808399,
            scale = this._iScale,
            maxMiles, miles, feet;

            feet = this._getRoundNum(maxFeet);

            scale.style.width = this._getScaleWidth(feet / maxFeet) + 'px';
            scale.innerHTML = '<span>'+feet + ' 英尺</span>';
        
    },
    

    _getScaleWidth: function (ratio) {
        return Math.round(this.options.maxWidth * ratio) - 10;
    },

    _getRoundNum: function (num) {
        var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
            d = num / pow10;

        d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

        return pow10 * d;
    }
});

L.Map.addInitHook(function () {
    if (this.options.scaleControl) {
        this.scaleControl = new L.Control.Scale();
        this.addControl(this.scaleControl);
    }
});

L.control.scale = function (options) {
    return new L.Control.Scale(options);
};

/**
 * 添加比例尺控件
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
map2DViewer.setScaleControl = function(options) {
    var defaultData = {
        action: 'add',
        position: 'bottomleft',
        offset: [10, 10]
    }
    _.merge(defaultData, options);
    switch (defaultData.action) {
        case 'add':
            this.scaleControl = new L.Control.Scale({
                position: defaultData.position,
                offset: defaultData.offset,
                metric: defaultData.metric,
                imperial: defaultData.imperial,
            }).addTo(this.map);
            return this.scaleControl;
            break;
        case 'remove':
            this.map.removeControl(this.scaleControl)
            break;
    }
}