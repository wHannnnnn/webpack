L.StyleToolbar = L.Toolbar.extend({

    options: {
        stylePicker:{
            title: L.drawLocal.style.toolbar.stylePicker.title
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
        var _this = this;
        var container = L.DomUtil.create('div', 'leaflet-draw-section'),
            buttonIndex = 0,
            buttonClassPrefix = 'leaflet-draw-style';

        container.id = 'drawStyle';

        L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation)
            .on(container, 'mousedown', L.DomEvent.stopPropagation)
            .on(container, 'dblclick', L.DomEvent.stopPropagation)
            .on(container, 'click', L.DomEvent.preventDefault);

        this._toolbarContainer = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');

        if (this.options.stylePicker) {
            this._initModeHandler(
                new L.Style.StylePicker(map, this.options.stylePicker),
                this._toolbarContainer,
                buttonIndex++,
                buttonClassPrefix
            );
        }


        // Save button index of the last button, -1 as we would have ++ after the last button
        this._lastButtonIndex = --buttonIndex;



        //Create the edit Panel this._actionsContainer
        this._actionsContainer = L.DomUtil.create('div', 'leaflet-draw-toolbar-style-edit');

        //文本大小
        this._fontsize_label = L.DomUtil.create('label','leaflet-draw-toolbar-style-edit-fontsize-label');
        this._fontsize_label.innerHTML = L.drawLocal.style.toolbar.fontSize;
        this._fontsize_input = L.DomUtil.create('input','leaflet-draw-toolbar-style-edit-fontsize-input');
        this._fontsize_input.value = '12';
        this._fontsize_input.style.textAlign = 'center';
        this._fontsize_input.id = 'fontSizeInput';
        L.DomEvent.on(this._fontsize_input,'change',function(e){
            var fontSize = e.target?e.target.value: e.srcElement.value;

            if(fontSize ==='' || fontSize.indexOf(' ') >= 0){
                window.alert('文本大小不能为空');
                return false;
            }
            if((/[^0-9]/g).test(fontSize)){
                window.alert('文本大小只能是数字');
                return false;
            }

            if(fontSize*1 > 30 || fontSize*1 < 12){
                window.alert('请输入大于12小于30的字体大小。');
                L.DrawStyle.shapeOptions.fontSize = 12;
                return false;
            }
            L.DrawStyle.shapeOptions.fontSize = fontSize;
            _this.resetStyle();
        });

        //文本颜色
        this._fontcolor_label = L.DomUtil.create('label','leaflet-draw-toolbar-style-edit-fontcolor-label');
        this._fontcolor_label.innerHTML = L.drawLocal.style.toolbar.fontColor;
        this._fontcolor_input = L.DomUtil.create('input','leaflet-draw-toolbar-style-edit-fontcolor-input');
        this._fontcolor_input.value = '#000000';
        this._fontcolor_input.id = 'fontColorInput';
        this._fontcolor_input.style.color = '#000000';
        this._fontcolor_input.style.background = '#000000';
        L.DomEvent.on(this._fontcolor_input,'change',function(e){
            var el = e.target ? e.target : e.srcElement;
            L.DrawStyle.shapeOptions.fontColor = el.value;
            el.style.color = el.value;
            el.style.background = el.value;
            _this.resetStyle();
        });
        L.DomEvent.on(this._fontcolor_input,'click',function(e){
            var el = e.target ? e.target : e.srcElement;
            _this._colorPicker.cEle = el.id;
            _this._colorPicker.style.display = 'block';
        });

        //线条粗细
        this._thickness_label = L.DomUtil.create('label','leaflet-draw-toolbar-style-edit-thickness-label');
        this._thickness_label.innerHTML = L.drawLocal.style.toolbar.thickness;
        this._thickness_input = L.DomUtil.create('input','leaflet-draw-toolbar-style-edit-thickness-input');
        this._thickness_input.value = '2';
        this._thickness_input.style.textAlign = 'center';
        this._thickness_input.id='thicknessInput';
        L.DomEvent.on(this._thickness_input,'change',function(e){
            var el = e.target ? e.target : e.srcElement;

            if(el.value ==='' || el.value.indexOf(' ') >= 0){
                window.alert('线条粗细不能为空');
                return false;
            }
            if((/[^0-9]/g).test(el.value)){
                window.alert('线条粗细只能是数字');
                return false;
            }

            if(el.value*1 > 100){
                window.alert('线条粗细不能超过100');
                return false;
            }


            L.DrawStyle.shapeOptions.weight = el.value*1;
            _this.resetStyle();
        });

        //线条颜色
        this._linecolor_label = L.DomUtil.create('label','leaflet-draw-toolbar-style-edit-linecolor-label');
        this._linecolor_label.innerHTML = L.drawLocal.style.toolbar.lineColor;
        this._linecolor_input = L.DomUtil.create('input','leaflet-draw-toolbar-style-edit-linecolor-input');
        this._linecolor_input.style.background = '#FF6600';
        this._linecolor_input.style.color ='#ff6600';
        this._linecolor_input.id='lineColorInput';
        this._linecolor_input.value = '#ff6600';
        L.DomEvent.on(this._linecolor_input,'change',function(e){
            var el = e.target ? e.target : e.srcElement;
            L.DrawStyle.shapeOptions.color = el.value;
            el.style.background = el.value;
            el.style.color = el.value;
            _this.resetStyle();
        });
        L.DomEvent.on(this._linecolor_input,'click',function(e){
            var el = e.target ? e.target : e.srcElement;
            _this._colorPicker.cEle = el.id;
            _this._colorPicker.style.display = 'block';
        });

        //填充色
        this._fillcolor_label = L.DomUtil.create('label','leaflet-draw-toolbar-style-edit-fillcolor-label');
        this._fillcolor_label.innerHTML = L.drawLocal.style.toolbar.fillColor;
        this._fillcolor_input = L.DomUtil.create('input','leaflet-draw-toolbar-style-edit-fillcolor-input');
        this._fillcolor_input.style.background = '#ff8800';
        this._fillcolor_input.style.color ='#ff8800';
        this._fillcolor_input.id='fillColorInput';
        this._fillcolor_input.value = '#ff8800';
        L.DomEvent.on(this._fillcolor_input,'change',function(e){
            var el = e.target ? e.target : e.srcElement;
            L.DrawStyle.shapeOptions.fillColor = el.value;
            el.style.background = el.value;
            el.style.color = el.value;
            _this.resetStyle();
        });
        L.DomEvent.on(this._fillcolor_input,'click',function(e){
            var el = e.target ? e.target : e.srcElement;
            _this._colorPicker.cEle = el.id;
            _this._colorPicker.style.display = 'block';
        });

        //透明度
        this._opacity_label = L.DomUtil.create('label','leaflet-draw-toolbar-style-edit-opacity-label');
        this._opacity_label.innerHTML = L.drawLocal.style.toolbar.opacity;
        this._opacity_input = L.DomUtil.create('input','leaflet-draw-toolbar-style-edit-opacity-input');
        this._opacity_input.value = '0.8';
        this._opacity_input.style.textAlign='center';
        this._opacity_input.id='opacityInput';
        L.DomEvent.on(this._opacity_input,'change',function(e){
            var el = e.target ? e.target : e.srcElement;

            if(el.value ==='' || el.value.indexOf(' ') >= 0){
                window.alert('透明度不能为空');
                return false;
            }
            if((/[^\.0-9]/g).test(el.value) || el.value<0 || el.value>1){
                window.alert('透明度只能是0-1的数值');
                return false;
            }



            L.DrawStyle.shapeOptions.opacity = el.value*1;
            L.DrawStyle.shapeOptions.fillOpacity = el.value*1/2;
            _this.resetStyle();
        });


        
        this._actionsContainer.appendChild(this._fontsize_label);
        this._actionsContainer.appendChild(this._fontsize_input);
        this._actionsContainer.appendChild(this._fontcolor_label);
        this._actionsContainer.appendChild(this._fontcolor_input);
        this._actionsContainer.appendChild(this._thickness_label);
        this._actionsContainer.appendChild(this._thickness_input);
        this._actionsContainer.appendChild(this._linecolor_label);
        this._actionsContainer.appendChild(this._linecolor_input);
        this._actionsContainer.appendChild(this._fillcolor_label);
        this._actionsContainer.appendChild(this._fillcolor_input);

        this._actionsContainer.appendChild(this._opacity_label);
        this._actionsContainer.appendChild(this._opacity_input);
        

        this._colorPicker = L.DomUtil.create('div', 'leaflet-draw-toolbar-style-color-picker');


        var colorContainer = L.DomUtil.create('ul', 'leaflet-draw-toolbar-style-color-picker-actions',this._colorPicker);



        this._colorPicker.aColor = ['00','33','66','99','cc','ff'];
        for(var r =0;r<6;r++){
            for(var g = 0; g<6;g++){
                for(var b= 0;b<6;b++){
                    var color = '#'+this._colorPicker.aColor[r].toString()+this._colorPicker.aColor[g].toString()+this._colorPicker.aColor[b].toString();
                    var li = L.DomUtil.create('li', '', colorContainer);
                    li.title = color;
                    li.style.background = color;
                    li.setAttribute('colorText',color);
                    L.DomEvent.on(li,'click',function(e){
                        _this._colorPicker.currentColor = (e.target? e.target: e.srcElement).getAttribute('colorText');
                        _this._changeColor();
                    });
                }
            }
        }



        // Add draw and cancel containers to the control container
        container.appendChild(this._toolbarContainer);
        container.appendChild(this._actionsContainer);
        this._actionsContainer.appendChild(this._colorPicker);

        return container;
    },

    _changeColor:function(){
        var _this = this;
        var cEle = document.getElementById(_this._colorPicker.cEle);
        cEle.value = _this._colorPicker.currentColor;
        _this._colorPicker.style.display = 'none';
        if(L.Browser.ielt9){
            cEle.fireEvent('onChange');
        }else {
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('change',true,true,window,0,0,0,0,0,false,false,false,false,0,null);
            cEle.dispatchEvent(evt);
        }

    },

    changeType:function(type){
        switch (type){
            case 'label':
                this._fontsize_label.style.display = 'block';
                this._fontsize_input.style.display = 'block';
                this._fontcolor_label.style.display = 'block';
                this._fontcolor_input.style.display = 'block';

                this._thickness_label.style.display = 'none';
                this._thickness_input.style.display = 'none';
                this._linecolor_label.style.display = 'none';
                this._linecolor_input.style.display = 'none';
                this._fillcolor_label.style.display = 'none';
                this._fillcolor_input.style.display = 'none';
                this._opacity_label.style.display = 'none';
                this._opacity_input.style.display = 'none';
                break;
            case 'circle':
            case 'customcircle':
            case 'polygon':
            case 'rectangle':
            case 'latlngspolygon':
                this._fontsize_label.style.display = 'none';
                this._fontsize_input.style.display = 'none';
                this._fontcolor_label.style.display = 'none';
                this._fontcolor_input.style.display = 'none';

                this._thickness_label.style.display = 'block';
                this._thickness_input.style.display = 'block';
                this._linecolor_label.style.display = 'block';
                this._linecolor_input.style.display = 'block';
                this._fillcolor_label.style.display = 'block';
                this._fillcolor_input.style.display = 'block';
                this._opacity_label.style.display = 'block';
                this._opacity_input.style.display = 'block';
                break;
            case 'polyline':
            case 'latlngspolyline':
            case 'painting':
                this._fontsize_label.style.display = 'none';
                this._fontsize_input.style.display = 'none';
                this._fontcolor_label.style.display = 'none';
                this._fontcolor_input.style.display = 'none';
                this._fillcolor_label.style.display = 'none';
                this._fillcolor_input.style.display = 'none';

                this._thickness_label.style.display = 'block';
                this._thickness_input.style.display = 'block';
                this._linecolor_label.style.display = 'block';
                this._linecolor_input.style.display = 'block';
                this._opacity_label.style.display = 'block';
                this._opacity_input.style.display = 'block';
                break;
            default :
                this.fire('disable');
                break;
        }
    },

    setOptions: function (options) {
        L.setOptions(this, options);

        for (var type in this._modes) {
            if (this._modes.hasOwnProperty(type) && options.hasOwnProperty(type)) {
                this._modes[type].handler.setOptions(options[type]);
            }
        }
    },

    resetStyle:function(){
        this.fire('resetStyle');
    },

    enable:function(){
    },

    disable: function (e) {
        this.changeType(e.target._activeMode.handler.type);
    },

    _save: function () {
        
    }
});