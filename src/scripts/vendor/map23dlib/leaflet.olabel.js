L.Handler.OlabelDrag = L.Handler.extend({
    initialize: function (olabel) {
        this._olabel = olabel;
    },

    addHooks: function () {
        var _contentWrap = this._olabel._contentWrap;
        if (!this._draggable) {
            this._draggable = new L.Draggable(_contentWrap, _contentWrap);
        }

        this._draggable
            .on('dragstart', this._onDragStart, this)
            .on('drag', this._onDrag, this)
            .on('dragend', this._onDragEnd, this);
        this._draggable.enable();
    },

    removeHooks: function () {
        this._draggable
            .off('dragstart', this._onDragStart, this)
            .off('drag', this._onDrag, this)
            .off('dragend', this._onDragEnd, this);

        this._draggable.disable();
    },

    moved: function () {
        return this._draggable && this._draggable._moved;
    },

    _onDragStart: function () {
        this._olabel
            .fire('movestart')
            .fire('dragstart');
    },

    _onDrag: function () {
        var olabel = this._olabel,
            iconPos = L.DomUtil.getPosition(olabel._contentWrap),
            latlng = olabel._map.layerPointToLatLng(iconPos);


        olabel._latlng = latlng;

        olabel
            .fire('move', {latlng: latlng})
            .fire('drag');
    },

    _onDragEnd: function () {
        this._olabel
            .fire('moveend')
            .fire('dragend');
    }
});


L.Olabel = L.Class.extend({
    includes: L.Mixin.Events,

    options: {
        minWidth: 10,
        maxWidth: 300,
        maxHeight: 300,
        offset: [11, -15],
        opacity: 1,
        draggable: false,
        className:''
    },

    initialize: function (latlng, content, options) { // (String, LatLngBounds, Object)
        this._content = content;
        this._latlng = L.latLng(latlng);
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._map = map;
        if (!this._contentWrap) {
            this._initContent();
        }

        map._panes.popupPane.appendChild(this._contentWrap);

        this._updateLayout();

        if (map.options.zoomAnimation) {
            map.on('zoomanim', this._animateZoom, this);
        }

        map.on('viewreset', this._reset, this);

        this._reset();
    },

    onRemove: function (map) {
        map.getPanes().popupPane.removeChild(this._contentWrap);

        map.off('viewreset', this._reset, this);
        map.off('zoomanim', this._animateZoom, this);
    },

    addTo: function (map) {
        map.addLayer(this);
        return this;
    },

    setOpacity: function (opacity) {
        this.options.opacity = opacity;
        this._updateOpacity();
        return this;
    },

    setLatLng:function(latlng){
        this._latlng = L.latLng(latlng);
        this._reset();
    },

    getLatLng:function(){
        return this._latlng;
    },


    _initContent: function () {
        this._contentWrap = L.DomUtil.create('div', 'leaflet-olabel '+ this.options.className);

        L.DomEvent.on(this._contentWrap, 'click', L.DomEvent.stopPropagation)
            .on(this._contentWrap, 'mousedown', L.DomEvent.stopPropagation)
            .on(this._contentWrap, 'dblclick', L.DomEvent.stopPropagation)
            .on(this._contentWrap, 'click', L.DomEvent.preventDefault);

        L.DomEvent.disableScrollPropagation(this._contentWrap);
        L.DomEvent.on(this._contentWrap, 'contextmenu', L.DomEvent.stopPropagation);        

        if(typeof this._content === 'string'){
            this._contentWrap.innerHTML = this._content;
        }else {
            this._contentWrap.appendChild(this._content);
        }

        L.DomUtil.create('div','leaflet-olabel-tips',this._contentWrap);
          
        this._updateOpacity();

        if (L.Handler.OlabelDrag) {
            this.dragging = new L.Handler.OlabelDrag(this);

            if (this.options.draggable) {
                this.dragging.enable();
            }
        }

        L.DomEvent.on(this._contentWrap, 'click', this._onMouseClick, this);
    },

    _updateLayout: function () {

        this._contentWrap.style.whiteSpace = 'nowrap';      

        var width = this._contentWrap.offsetWidth;
        width = Math.min(width, this.options.maxWidth);
        width = Math.max(width, this.options.minWidth);

        this._contentWrap.style.width = width + 'px';
        this._contentWrap.style.whiteSpace = '';

        var height = this._contentWrap.offsetHeight,
            maxHeight = this.options.maxHeight,
            scrolledClass = 'leaflet-olabel-scrolled';

        if (maxHeight && height > maxHeight) {
            this._contentWrap.style.height = maxHeight + 'px';
            L.DomUtil.addClass(this._contentWrap, scrolledClass);
        } else {
            L.DomUtil.removeClass(this._contentWrap, scrolledClass);
        }

        
        this._contentWrap.style.whiteSpace = '';
    },

    _onMouseClick: function (e) {
        var wasDragged = this.dragging && this.dragging.moved();

        if (this.hasEventListeners(e.type) || wasDragged) {
            L.DomEvent.stopPropagation(e);
        }

        if (wasDragged) { return; }

        if ((!this.dragging || !this.dragging._enabled) && this._map.dragging && this._map.dragging.moved()) { return; }

        this.fire(e.type, {
            originalEvent: e,
            latlng: this._latlng
        });
    },
 
    _animateZoom: function (opt) {
        var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center);
        pos = pos.add(this.options.offset);
        L.DomUtil.setPosition(this._contentWrap, pos);
    },

    _reset: function () {
        var content   = this._contentWrap;
        var pos = this._map.latLngToLayerPoint(this._latlng).round();
        pos = pos.add(new L.Point(this.options.offset[0],this.options.offset[1]));
        L.DomUtil.setPosition(content, pos);
    },

    _updateOpacity: function () {
        L.DomUtil.setOpacity(this._contentWrap, this.options.opacity);
    }
});

L.olabel = function (latlng, content, options) {
    return new L.Olabel(latlng, content, options);
};

