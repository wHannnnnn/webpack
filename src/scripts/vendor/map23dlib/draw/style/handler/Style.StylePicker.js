L.Style = {};

L.Style.StylePicker = L.Handler.extend({
    includes: L.Mixin.Events,

    statics: {
        TYPE: 'stylePicker'
    },

    options:{},

    initialize: function (map, options) {
        this._map = map;
        this._container = map._container;
        this._overlayPane = map._panes.overlayPane;
        this._popupPane = map._panes.popupPane;

        this.type = L.Style.StylePicker.TYPE;

        // Merge default shapeOptions options with custom shapeOptions
        if (options && options.shapeOptions) {
            options.shapeOptions = L.Util.extend({}, this.options.shapeOptions, options.shapeOptions);
        }
        L.Util.extend(this.options, options);
    },



    enable: function () {
        if (this._enabled) {
            this.disable();
            return;
        }

        L.Handler.prototype.enable.call(this);

        this.fire('enabled', { handler: this.type });

    },

    fireEnable:function(){
        if (this._enabled) {
            return;
        }
        L.Handler.prototype.enable.call(this);
        this.fire('enabled', { handler: this.type });
    },

    disable: function () {
        if (!this._enabled) {
            //this.enable();
            return;
        }

        L.Handler.prototype.disable.call(this);

        this.fire('disabled', { handler: this.type });

    },

    addHooks: function () {
        if (this._map) {
            L.DomUtil.disableTextSelection();

            //this._tooltip = new L.DrawTooltip(this._map);

            //L.DomEvent.addListener(this._container, 'keyup', this._cancelDrawing, this);
        }
    },

    removeHooks: function () {
        if (this._map) {
            L.DomUtil.enableTextSelection();

            //this._tooltip.dispose();
            //this._tooltip = null;

            //L.DomEvent.removeListener(this._container, 'keyup', this._cancelDrawing);
        }
    },

    setOptions: function (options) {
        L.setOptions(this, options);
    },

    _fireCreatedEvent: function (layer) {
        this._map.fire('style:created', { layer: layer, layerType: this.type });
    },

    // Cancel drawing when the escape key is pressed
    _cancelDrawing: function (e) {
        if (e.keyCode === 27) {
            this.disable();
        }
    }
});