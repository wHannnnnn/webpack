L.Draw.Circle = L.Draw.SimpleShape.extend({
	statics: {
		TYPE: 'circle'
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
		this.type = L.Draw.Circle.TYPE;

		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},

	_initialLabelText: L.drawLocal.draw.circle.tooltip.start,

	_drawShape: function (latlng) {
		if (!this._shape) {
			this._shape = new L.Circle(this._startLatLng, this._startLatLng.distanceTo(latlng), this.options.shapeOptions);
			this._map.addLayer(this._shape);
		} else {
			this._shape.setRadius(this._startLatLng.distanceTo(latlng));
		}
	},

	_fireCreatedEvent: function () {
		var circle = new L.Circle(this._startLatLng, this._shape.getRadius(), this.options.shapeOptions);
        circle.drawInfo = {
            shapeOptions:L.DrawClone.clone(this.options.shapeOptions),
            shapeCenter:this.options.shapeOptions.shapeCenter
        };
        circle.drawType = 'circle';
		L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, circle);
	},

	_onMouseMove: function (e) {
		var latlng = e.latlng,
			radius;

		this._tooltip.updatePosition(latlng);
		if (this._isDrawing) {
			this._drawShape(latlng);

			// Get the new radius (rouded to 1 dp)
			radius = this._shape.getRadius().toFixed(1);

			this._tooltip.updateContent({
				text: '松开鼠标完成绘制',
				subtext: '半径: ' + radius + ' m'
			});
		}
	}
});