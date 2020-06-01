L.Draw.CustomCircle = L.Draw.Feature.extend({
    statics: {
        TYPE: 'customcircle'
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
        this.type = L.Draw.CustomCircle.TYPE;

        L.Draw.Feature.prototype.initialize.call(this, map, options);

        this.customPicker = this.customPicker();
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

    customPicker:function(){
        var _this = this;
        this.pickerContainer = L.DomUtil.create('div','draw-custom-circle-picker');
        L.DomEvent.on(this.pickerContainer, 'click', L.DomEvent.stopPropagation)
            .on(this.pickerContainer, 'mousedown', L.DomEvent.stopPropagation)
            .on(this.pickerContainer, 'dblclick', L.DomEvent.stopPropagation)
            .on(this.pickerContainer, 'click', L.DomEvent.preventDefault);
        var h4 = L.DomUtil.create('h4','',this.pickerContainer);
        h4.innerHTML = '自定义画圆';

        this.t1= L.DomUtil.create('label','draw-custom-circle-label',this.pickerContainer);
        this.t1.innerHTML= '经度<small>(十进制)</small>:';
        this.lngInput = L.DomUtil.create('input','draw-custom-circle-lng',this.pickerContainer);

        this.t2= L.DomUtil.create('label','draw-custom-circle-label',this.pickerContainer);
        this.t2.innerHTML= '纬度<small>(十进制)</small>:';
        this.latInput = L.DomUtil.create('input','draw-custom-circle-lat',this.pickerContainer);
        this.t3= L.DomUtil.create('label','draw-custom-circle-label',this.pickerContainer);
        this.t3.innerHTML= '半径<small>(KM)</small>:';
        this.radiusInput = L.DomUtil.create('input','draw-custom-circle-lng',this.pickerContainer);


        this.subButton = L.DomUtil.create('button','draw-custom-circle-sub-button',this.pickerContainer);

        this.subButton.innerHTML = L.drawLocal.draw.toolbar.sure;
        L.DomEvent.on(this.subButton,'click',_this._onClick,this);
        return this.pickerContainer;
    },

    _onClick: function (e) {
        if(this.latInput.value ==='' || this.latInput.value.indexOf(' ') >= 0 ||
                this.lngInput.value ==='' || this.lngInput.value.indexOf(' ') >= 0 ||
                this.radiusInput.value ==='' || this.radiusInput.value.indexOf(' ') >= 0){
                window.alert('输入数据不能为空');
                return false;
            }

        if(this.latInput.value && this.lngInput.value && this.radiusInput.value){
            
            if((/[^-\.0-9]/g).test(this.lngInput.value)){
                window.alert('经度只能是数字');
                return false;
            }
            if(this.lngInput.value*1 > 180 || this.lngInput.value*1 < -180){
                window.alert('请输入大于-180小于180的经度。');
                return false;
            }
            if((/[^-\.0-9]/g).test(this.latInput.value)){
                window.alert('纬度只能是数字');
                return false;
            }
            if(this.latInput.value*1 > 85 || this.latInput.value*1 < -85){
                window.alert('请输入大于-85小于85的纬度。');
                return false;
            }

            if((/[^\.0-9]/g).test(this.radiusInput.value) || this.radiusInput.value*1 < 0){
                window.alert('半径只能是大于0的数字');
                return false;
            }            

            this._fireCreatedEvent(e);
            this.disable();
        }else {
            window.alert('数据不正确，请重新填写！');
        }
    },

    _fireCreatedEvent: function () {
            var circle = new L.Circle(new L.LatLng(this.latInput.value,this.lngInput.value), this.radiusInput.value*1000, this.options.shapeOptions);
            circle.drawInfo = {
                shapeOptions:L.DrawClone.clone(this.options.shapeOptions)
            };
            circle.drawType = 'circle';
            //this._map.fitBounds(circle.getBounds());
            this._map.setView(circle._latlng)
            L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, circle);
    }
});