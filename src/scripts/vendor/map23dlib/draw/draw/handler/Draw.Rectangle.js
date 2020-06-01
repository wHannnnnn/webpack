L.Draw.Rectangle = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'rectangle'
	},

	options: {
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
		this.type = L.Draw.Rectangle.TYPE;

		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},
	_initialLabelText: L.drawLocal.draw.rectangle.tooltip.start,

	_drawShape: function (latlng) {
		if (!this._shape) {
			this._shape = new L.Rectangle(new L.LatLngBounds(this._startLatLng, latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setBounds(new L.LatLngBounds(this._startLatLng, latlng));
		}
	},

	_fireCreatedEvent: function () {
		var rectangle = new L.Rectangle(this._shape.getBounds(), this.options.shapeOptions);
        rectangle.drawInfo = {
            shapeOptions:L.DrawClone.clone(this.options.shapeOptions)
        };
        rectangle.drawType = 'rectangle';
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, rectangle);
	}
});
