L.Draw.LatLngsPolygon = L.Draw.Feature.extend({
    statics: {
        TYPE: 'latlngspolygon'
    },

    options: {
        zIndexOffset: 2000, // This should be > than the highest z-index any markers
        shapeOptions: {
            stroke: true,
            color: L.DrawStyle.shapeOptions.color,
            weight: L.DrawStyle.shapeOptions.weight,
            opacity: L.DrawStyle.shapeOptions.opacity,
            fill: true,
            fillColor: L.DrawStyle.shapeOptions.fillColor, //same as color by default
            fillOpacity: L.DrawStyle.shapeOptions.fillOpacity,
            clickable: true
        }
    },

    initialize: function (map, options) {
        // Save the type so super can fire, need to do this as cannot do this.TYPE :(
        this.type = L.Draw.LatLngsPolygon.TYPE;

        L.Draw.Feature.prototype.initialize.call(this, map, options);

        this.customPicker = this.latLngsPicker();
    },



    enable:function(){
        if (this._enabled) {
            this.disable();
            return;
        }

        this.pickerContainer.style.display = 'block';

        L.Handler.prototype.enable.call(this);

        this.fire('enabled', { handler: this.type });

        this._map.fire('draw:drawstart', { layerType: this.type });

        this._map.fire('draw:startup',{ handler: this.type });
    },

    disable:function(){
        if (!this._enabled) { return; }

        this.pickerContainer.style.display = 'none';

        L.Handler.prototype.disable.call(this);

        this.fire('disabled', { handler: this.type });

        this._map.fire('draw:drawstop', { layerType: this.type });
    },


    addHooks: function () {

    },

    removeHooks: function () {

    },

    latLngsPicker:function(){
        var _this = this;
        this.pickerContainer = L.DomUtil.create('div','draw-latlngs-picker');

        L.DomEvent.on(this.pickerContainer, 'click', L.DomEvent.stopPropagation)
            .on(this.pickerContainer, 'mousedown', L.DomEvent.stopPropagation)
            .on(this.pickerContainer, 'dblclick', L.DomEvent.stopPropagation)
            .on(this.pickerContainer, 'click', L.DomEvent.preventDefault);

        var h4 = L.DomUtil.create('h4','',this.pickerContainer);
        h4.innerHTML = '坐标转多边形<small>(geojson格式)</small>';

        this.latLngsInput = L.DomUtil.create('textarea','draw-latlngs-textarea',this.pickerContainer);

        this.latLngsInput.value = '[[39,116],[40,116],[39,118]]';

        this.subButton = L.DomUtil.create('button','draw-latlngs-sub-button',this.pickerContainer);

        this.subButton.innerHTML = L.drawLocal.draw.toolbar.sure;
        L.DomEvent.on(this.subButton,'click',_this._onClick,this);
        return this.pickerContainer;
    },

    _onClick: function (e) {
        this._fireCreatedEvent(e);
        this.disable();
    },

    _fireCreatedEvent: function () {
        var polyLatLngs = this.latLngsInput.value;

        try
        {
            var geometry = JSON.parse(polyLatLngs);

            if(geometry.length > 2){
                for(var i = 0, l=geometry.length; i<l;i++){
                    geometry[i] = L.latLng(geometry[i][0],geometry[i][1]);
                }

                var poly = new L.Polygon(geometry, this.options.shapeOptions);

                poly.drawType = 'polygon';

                poly.drawInfo = {
                    shapeOptions:L.DrawClone.clone(this.options.shapeOptions)
                };

                this._map.fitBounds(poly.getBounds());

                L.Draw.Feature.prototype._fireCreatedEvent.call(this, poly);


            }else {
                window.alert('坐标数据过短。');
            }
        }
        catch(e)
        {
            window.alert('坐标数据错误。');
        }

    }
});