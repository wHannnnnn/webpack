L.Draw.Marker = L.Draw.Feature.extend({
	statics: {
		TYPE: 'marker'
	},

	options: {
		icon: new L.Icon.Default(),
		zIndexOffset: 2000, // This should be > than the highest z-index any markers
        shapeOptions:{
        	icon :[
        	{
        		//默认
        		gName:'默认',
	            icon:[
	            	{name:'标注1',file:L.Icon.Default.imagePath+'/marker-icon.png'}
	            ]
        	}
        		
        	]           
        }
	},


    enable: function () {
        if(this.pickerContainer.style.display === 'block'){
            this.pickerContainer.style.display = 'none';
        }else {
            this.pickerContainer.style.display = 'block';

        }
    },

    disable: function () {
        this.endEnable();
        this.pickerContainer.style.display = 'none';
    },


    openPicker:function(){

    },

    startEnable:function(){
        if (this._enabled) { return; }

        L.Handler.prototype.enable.call(this);

        this.fire('enabled', { handler: this.type });

        this._map.fire('draw:drawstart', { layerType: this.type });

        this._map.fire('draw:startup',{ handler: this.type });
    },

    endEnable:function(){
        if (!this._enabled) { return; }

        L.Handler.prototype.disable.call(this);

        this.fire('disabled', { handler: this.type });

        this._map.fire('draw:drawstop', { layerType: this.type });
    },



	initialize: function (map, options) {
		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.Draw.Marker.TYPE;

		L.Draw.Feature.prototype.initialize.call(this, map, options);

        this.customPicker = this.markerPicker();
	},

	addHooks: function () {
		L.Draw.Feature.prototype.addHooks.call(this);

		if (this._map) {
			this._tooltip.updateContent({ text: L.drawLocal.draw.marker.tooltip.start });

			// Same mouseMarker as in Draw.Polyline
			if (!this._mouseMarker) {
				this._mouseMarker = L.marker(this._map.getCenter(), {
					icon: L.divIcon({
						className: 'leaflet-mouse-marker',
						iconAnchor: [20, 20],
						iconSize: [40, 40]
					}),
					opacity: 0,
					zIndexOffset: this.options.zIndexOffset
				});
			}

			this._mouseMarker
				.on('click', this._onClick, this)
				.addTo(this._map);

			this._map.on('mousemove', this._onMouseMove, this);
		}
	},

    markerPicker:function(){
        var _this = this;
        this.pickerContainer = L.DomUtil.create('div','draw-marker-picker');
        L.DomEvent.on(this.pickerContainer, 'click', L.DomEvent.stopPropagation)
            .on(this.pickerContainer, 'mousedown', L.DomEvent.stopPropagation)
            .on(this.pickerContainer, 'dblclick', L.DomEvent.stopPropagation)
            .on(this.pickerContainer, 'click', L.DomEvent.preventDefault);
        for(var i = 0, l = this.options.shapeOptions.icon.length; i<l; i++){
            var h4 = L.DomUtil.create('h4','',this.pickerContainer);
            h4.innerHTML = this.options.shapeOptions.icon[i].gName;
            var iconUl = L.DomUtil.create('ul','',this.pickerContainer);
            for(var ii= 0,ll=this.options.shapeOptions.icon[i].icon.length;ii<ll; ii++) {
                var li = L.DomUtil.create('li', '', iconUl);
                var img = L.DomUtil.create('img','',li);
                img.title = this.options.shapeOptions.icon[i].icon[ii].name;
                img.src = this.options.shapeOptions.icon[i].icon[ii].file;
                //li.innerHTML = '<img title="'+this.options.shapeOptions.icon[i].icon[ii].name+'" src="' + L.Icon.Default.imagePath + '/symbols/' + this.options.shapeOptions.icon[i].icon[ii].file + '"/>';
                L.DomEvent.on(img, 'click', function (e) {
                    var el = e.target ? e.target : e.srcElement;
                    _this.options.icon = L.icon({
                        iconUrl: el.src,
                        iconSize: [50, 50],
                        iconAnchor: [25, 25],
                        popupAnchor: [0, -25]
                    });//el.src;
                    _this.pickerContainer.style.display = 'none';
                    _this.startEnable();
                });
            }

        }
        //this.pickerContainer.style.width = this.options.shapeOptions.icon.length*26 + 'px';
        //this.pickerContainer.style.width = '260px';
        return this.pickerContainer;
    },

	removeHooks: function () {
		L.Draw.Feature.prototype.removeHooks.call(this);

		if (this._map) {
			if (this._marker) {
				this._marker.off('click', this._onClick, this);
				this._map
					.off('click', this._onClick, this)
					.removeLayer(this._marker);
				delete this._marker;
			}

			this._mouseMarker.off('click', this._onClick, this);
			this._map.removeLayer(this._mouseMarker);
			delete this._mouseMarker;

			this._map.off('mousemove', this._onMouseMove, this);
		}
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng;

		this._tooltip.updatePosition(latlng);
		this._mouseMarker.setLatLng(latlng);

		if (!this._marker) {
			this._marker = new L.Marker(latlng, {
				icon: this.options.icon,
				zIndexOffset: this.options.zIndexOffset
			});
			// Bind to both marker and map to make sure we get the click event.
			this._marker.on('click', this._onClick, this);
			this._map
				.on('click', this._onClick, this)
				.addLayer(this._marker);
		}
		else {
			this._marker.setLatLng(latlng);
		}
	},

	_onClick: function () {
		this._fireCreatedEvent();

		this.disable();
	},

	_fireCreatedEvent: function () {
		var marker = new L.Marker(this._marker.getLatLng(), { icon: this.options.icon });
        marker.drawInfo = {
            icon: L.DrawClone.clone(this.options.icon.options)
        };
        marker.drawType = 'marker';
        //center:lat/lng  icon:iconUrl/iconSize/iconAnchor/popupAnchor/zIndexOffset
		L.Draw.Feature.prototype._fireCreatedEvent.call(this, marker);
	}
});