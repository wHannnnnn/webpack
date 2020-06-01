L.DrawToolbar = L.Toolbar.extend({

	options: {
		polyline: {
			title: L.drawLocal.draw.toolbar.polyline
		},
		polygon: {
			title: L.drawLocal.draw.toolbar.polygon
		},
        latlngspolygon:{
            title: L.drawLocal.draw.toolbar.latlngspolygon
        },
        latlngspolyline:{
            title: L.drawLocal.draw.toolbar.latlngspolyline
        },
		rectangle: {
			title: L.drawLocal.draw.toolbar.rectangle
		},
		circle: {
			title: L.drawLocal.draw.toolbar.circle
		},
        customcircle: {
            title: L.drawLocal.draw.toolbar.customcircle
        },
		marker: {
			title: L.drawLocal.draw.toolbar.marker
		},
        label: {
            title: L.drawLocal.draw.toolbar.label
        },
        painting: {
            title: L.drawLocal.draw.toolbar.painting,
            sure : L.drawLocal.draw.toolbar.sure
        }
	},

	initialize: function (options) {
		// Ensure that the options are merged correctly since L.extend is only shallow
		for (var type in this.options) {
			if (this.options.hasOwnProperty(type)) {
				if (options[type]) {
					options[type] = L.extend({}, this.options[type], options[type]);
				}
			}
		}

		L.Toolbar.prototype.initialize.call(this, options);
	},

	addToolbar: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-draw-section'),
			buttonIndex = 0,
			buttonClassPrefix = 'leaflet-draw-draw';

        this._container = container;

		this._toolbarContainer = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');

        if (this.options.marker) {
            var markerHandler = new L.Draw.Marker(map, this.options.marker);
            this._initModeHandler(
                markerHandler,
                this._toolbarContainer,
                buttonIndex++,
                buttonClassPrefix
            );

            this._initCustomHandler(
                markerHandler,
                this._container
            );
        }

		if (this.options.polyline) {
			this._initModeHandler(
				new L.Draw.Polyline(map, this.options.polyline),
				this._toolbarContainer,
				buttonIndex++,
				buttonClassPrefix
			);
		}

        if (this.options.latlngspolyline) {
            var latLngsPolylineHandler = new L.Draw.LatLngsPolyline(map, this.options.latlngspolyline);
            this._initModeHandler(
                latLngsPolylineHandler,
                this._toolbarContainer,
                buttonIndex++,
                buttonClassPrefix
            );

            this._initCustomHandler(
                latLngsPolylineHandler,
                this._container
            );
        }

		if (this.options.polygon) {
			this._initModeHandler(
				new L.Draw.Polygon(map, this.options.polygon),
				this._toolbarContainer,
				buttonIndex++,
				buttonClassPrefix
			);
		}

        if (this.options.latlngspolygon) {
            var latLngsPolygonHandler = new L.Draw.LatLngsPolygon(map, this.options.latlngspolygon);
            this._initModeHandler(
                latLngsPolygonHandler,
                this._toolbarContainer,
                buttonIndex++,
                buttonClassPrefix
            );

            this._initCustomHandler(
                latLngsPolygonHandler,
                this._container
            );
        }

		if (this.options.rectangle) {
			this._initModeHandler(
				new L.Draw.Rectangle(map, this.options.rectangle),
				this._toolbarContainer,
				buttonIndex++,
				buttonClassPrefix
			);
		}

		if (this.options.circle) {
			this._initModeHandler(
				new L.Draw.Circle(map, this.options.circle),
				this._toolbarContainer,
				buttonIndex++,
				buttonClassPrefix
			);
		}

        if (this.options.customcircle) {
            var customCircleHandler = new L.Draw.CustomCircle(map, this.options.customcircle);
            this._initModeHandler(
                customCircleHandler,
                this._toolbarContainer,
                buttonIndex++,
                buttonClassPrefix
            );

            this._initCustomHandler(
                customCircleHandler,
                this._container
            );
        }


        if (this.options.label) {
            this._initModeHandler(
                new L.Draw.Label(map, this.options.label),
                this._toolbarContainer,
                buttonIndex++,
                buttonClassPrefix
            );
        }

        if (this.options.painting) {
            this._initModeHandler(
                new L.Draw.Painting(map, this.options.painting),
                this._toolbarContainer,
                buttonIndex++,
                buttonClassPrefix
            );
        }



		// Save button index of the last button, -1 as we would have ++ after the last button
		this._lastButtonIndex = --buttonIndex;

		// Create the actions part of the toolbar
		/*this._actionsContainer = this._createActions([

            {
                title: L.drawLocal.draw.toolbar.sure,
                text: L.drawLocal.draw.toolbar.sure,
                callback: this.doneed,
                context: this
            },
			{
				title: L.drawLocal.draw.toolbar.title,
				text: L.drawLocal.draw.toolbar.text,
				callback: this.disable,
				context: this
			}
		]);*/

		// Add draw and cancel containers to the control container
		container.appendChild(this._toolbarContainer);
		//container.appendChild(this._actionsContainer);

		return container;
	},


    _handlerActivated: function (e) {
        // Disable active mode (if present)
        if (this._activeMode && this._activeMode.handler.enabled()) {
            this._activeMode.handler.disable();
        }
        // Cache new active feature
        this._activeMode = this._modes[e.handler];

        L.DomUtil.addClass(this._activeMode.button, 'leaflet-draw-toolbar-button-enabled');

        if(this._actionsContainer){
            this._showActionsToolbar();
        }

        //todo hacker by Song.Huang 这个是个hacker
        if(e.handler !== 'marker'){
            if(this._modes.hasOwnProperty('marker')){
                this._modes.marker.handler.pickerContainer.style.display = 'none';
            }
        }


        this.fire('enable');

    },

    resetShapeOptions:function(options){
        for (var type in this._modes) {
            if (this._modes.hasOwnProperty(type)) {
                /*if(type === 'polyline' || type === 'painting'){
                    options.shapeOptions.fill = false;
                }else {
                    options.shapeOptions.fill = true;
                }*/
                this._modes[type].handler.setOptions(options);
            }
        }
    },


	setOptions: function (options) {
		L.setOptions(this, options);

		for (var type in this._modes) {
			if (this._modes.hasOwnProperty(type) && options.hasOwnProperty(type)) {
				this._modes[type].handler.setOptions(options[type]);
			}
		}
	}
});