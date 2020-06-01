L.Draw.Painting = L.Draw.Feature.extend({
    statics: {
        TYPE: 'painting'
    },

    //paintingAry : [],

    Poly: L.Polyline,

    options: {
        shapeOptions: {
            stroke: true,
            color: L.DrawStyle.shapeOptions.color,
            weight: L.DrawStyle.shapeOptions.weight,
            opacity: L.DrawStyle.shapeOptions.opacity,
            fill: false,
            clickable: true
        },
        zIndexOffset: 2000 // This should be > than the highest z-index any map layers
    },

    _poly : new L.Polyline([]),

    initialize: function (map, options) {
        // Save the type so super can fire, need to do this as cannot do this.TYPE :(
        this.type = L.Draw.Painting.TYPE;

        L.Draw.Feature.prototype.initialize.call(this, map, options);
    },

    addHooks: function () {
        L.Draw.Feature.prototype.addHooks.call(this);
        if (this._map) {

            this._tooltip.updateContent(this._getTooltipText());

            this._map.dragging.disable();

            this._map
                .on('mousedown',this._onMouseDown,this)
                .on('mousemove',this._onMouserMoveTip,this)
                .on('mouseup',this._onMouseUp,this);
        }
    },


    removeHooks: function () {
        L.Draw.Feature.prototype.removeHooks.call(this);
        this._map.dragging.enable();

        this._map
            .off('mousedown',this._onMouseDown,this)
            .off('mousemove',this._onMouserMoveTip,this)
            .off('mouseup',this._onMouseUp,this);
    },

    _onMouseMove: function (e) {
        var latlng = e.latlng;

        this._currentLatLng = latlng;

        this._updateTooltip(latlng);

        this._poly.addLatLng(latlng);

        if (this._poly.getLatLngs().length === 2) {
            this._map.addLayer(this._poly);
        }

        L.DomEvent.preventDefault(e.originalEvent);
    },

    _onMouseDown: function () {
        this._map.on('mousemove', this._onMouseMove, this);
        this._poly = new L.Polyline([], this.options.shapeOptions);
        //this.paintingAry.push(this._poly);
        //this._tooltip.dispose();
    },

    _onMouseUp:function(){
        var _this = this;
        this._map.off('mousemove', this._onMouseMove, this);
        if(_this._poly.getLatLngs().length>1){
            this._fireCreatedEvent();
        }
        setTimeout(function(){
            _this._map.removeLayer(_this._poly);
            delete _this._poly;
        },1);

    },

    _onMouserMoveTip:function(e){
        var latlng = e.latlng;
        this._updateTooltip(latlng);
    },

    _updateTooltip: function (latLng) {
        if (latLng) {
            this._tooltip.updatePosition(latLng);
        }
    },

    _getTooltipText: function () {
        var labelText = {
            text: L.drawLocal.draw.painting.tooltip.start
        };
        return labelText;
    },

    _fireCreatedEvent: function () {
        var poly = new this.Poly(this._poly.getLatLngs(), this.options.shapeOptions);

        poly.drawInfo = {
            shapeOptions:L.DrawClone.clone(this.options.shapeOptions)
        };
        poly.drawType = 'painting';

        L.Draw.Feature.prototype._fireCreatedEvent.call(this, poly);
    }
});