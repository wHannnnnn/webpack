L.Draw.Label = L.Draw.Feature.extend({
    statics: {
        TYPE: 'label'
    },

    options: {
        icon: new L.Icon.Default(),
        zIndexOffset: 2000, // This should be > than the highest z-index any markers
        shapeOptions:{
            fontSize:12,
            fontColor:'#000000'
        }
    },

    initialize: function (map, options) {
        // Save the type so super can fire, need to do this as cannot do this.TYPE :(
        this.type = L.Draw.Label.TYPE;

        L.Draw.Feature.prototype.initialize.call(this, map, options);
    },

    addHooks: function () {
        L.Draw.Feature.prototype.addHooks.call(this);

        if (this._map) {
            this._tooltip.updateContent({ text: L.drawLocal.draw.label.tooltip.start });

            this._map.on('mousemove', this._onMouseMove, this);
            this._map.on('mousedown', this._onClick, this);
        }
    },

    removeHooks: function () {
        L.Draw.Feature.prototype.removeHooks.call(this);

        if (this._map) {

            this._map.off('mousemove', this._onMouseMove, this);
            this._map.off('mousedown', this._onClick, this);
        }
    },

    _onMouseMove: function (e) {
        var latlng = e.latlng;

        this._tooltip.updatePosition(latlng);
    },

    _onClick: function (e) {
        this._fireCreatedEvent(e);

        this.disable();
    },

    _fireCreatedEvent: function (e) {
        var textInput = L.DomUtil.create('textarea');
        textInput.className = 'draw-label-textarea';
        textInput.style.fontSize = this.options.shapeOptions.fontSize+'px';
        textInput.style.color = this.options.shapeOptions.fontColor;

        textInput.setAttribute('wrap','wrap');
        textInput.value = '    ';
        textInput.focus();



        L.DomEvent.on(textInput,'change',function(e){
            var el = e.target? e.target: e.srcElement;
            el.style.width = (el.scrollWidth-4) + 'px';
            el.style.height = '18px';
            el.style.height = el.scrollHeight + 'px';

        });
        //输入框
        var label = new L.Olabel(e.latlng,textInput,{
            offset: [-5, -10],
            opacity: 1,
            className:'draw-label'
        });

        L.DomEvent.on(label, 'click', L.DomEvent.stopPropagation)
            .on(label, 'mousedown', L.DomEvent.stopPropagation)
            .on(label, 'dblclick', L.DomEvent.stopPropagation)
            .on(label, 'click', L.DomEvent.preventDefault);


        label.drawInfo = {
            shapeOptions : L.DrawClone.clone(this.options.shapeOptions)
        };

        label.drawType = 'label';

        L.Draw.Feature.prototype._fireCreatedEvent.call(this, label);
    }
});