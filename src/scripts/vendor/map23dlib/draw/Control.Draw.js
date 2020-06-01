/*
 * Leaflet.draw assumes that you have already included the Leaflet library.
 */

L.drawVersion = '0.2.0-dev';

L.drawLocal = {
    draw: {
        toolbar: {
            title: '取消标绘',
            text: '取消',
            sure:'完成',
            polyline: '画线',
            polygon: '画多边形',
            latlngspolygon:'坐标转多边形',
            rectangle: '画矩形',
            circle: '画圆',
            customcircle: '自定义画圆',
            marker: '标点',
            label: '文本',
            painting: '随笔'
        },
        circle: {
            tooltip: {
                start: '左键点击拖动画圆'
            }
        },
        marker: {
            tooltip: {
                start: '左键点击地图标点'
            }
        },
        polygon: {
            tooltip: {
                start: '左键点击开始画多边形',
                cont: '左键点击继续',
                end: '点击第一个点完成绘画'
            }
        },
        latlngspolygon:{
            title: '坐标转多边形'
        },
        customcircle:{
            title: '自定义画圆'
        },
        polyline: {
            error: '<strong>提示:</strong> 超过边界线!',
            tooltip: {
                start: '左键点击开始画线',
                cont: '左键点击继续',
                end: '点击最后一个点结束画线'
            }
        },
        latlngspolyline:{
            title: '坐标转线'
        },
        rectangle: {
            tooltip: {
                start: '左键点击并拖动画矩形'
            }
        },
        simpleshape: {
            tooltip: {
                end: '释放鼠标完成绘图'
            }
        },
        label: {
            tooltip: {
                start: '左键点击并编辑内容'
            }
        },
        painting : {
            tooltip: {
                start: '按住鼠标在地图上绘画'
            }
        }
    },
    style: {
        toolbar: {
            title: '样式',
            colorPicker: '颜色选取',
            thickness: '线条粗细',
            lineColor: '线条颜色',
            fillColor: '填充色',
            opacity: '透明度',
            fontSize: '字体大小',
            fontColor: '字体颜色',
            stylePicker: {
                title: '编辑样式',
                save: {
                    title: '保存更改',
                    text: '保存'
                },
                cancel: {
                    title: '取消编辑，恢复到编辑前状态',
                    text: '取消'
                }
            }

        }
    },
    edit: {
        toolbar: {
            edit: {
                title: '编辑图层',
                save: {
                    title: '保存更改',
                    text: '确定'
                },
                cancel: {
                    title: '取消编辑，恢复到编辑前状态',
                    text: '取消'
                }
            },
            remove: {
                title: '删除图层',
                tooltip: '点击图层进行删除操作'
            },
            favorite: {
                title:'另存为'
            },
            print:{
                title:'打印'
            }
        },
        tooltip: {
            text: '',
            subtext: '点击取消按钮可撤销操作'
        }
    }
};

/**
 * object深克隆
 * @type {{clone: clone}}
 */
L.DrawClone = {
    clone:function(obj){
        if(typeof (obj) !== 'object'){
            return obj;
        }
        var re = {};
        if(obj.constructor === Array){
            re = [];
        }
        for(var i in obj){
            re[i] = L.DrawClone.clone(obj[i]);
        }

        return re;
    }
};

L.DrawStyle = {
    shapeOptions:{
        stroke:true,
        //字体大小
        fontSize:12,
        //字体颜色
        fontColor:'#000000',
        //线条粗细
        weight:2,
        //线条颜色
        color:'#FF6600',
        //填充色
        fillColor:'#ff8800',
        fillOpacity:0.4,
        //透明度
        opacity:0.8,
        clickable: true
    }
};

L.Control.Draw = L.Control.extend({

	options: {
		position: 'topright',
		draw: {},
        style:{},
		edit: false
	},



	initialize: function (options) {
		/*if (L.version <= "0.5.1") {
			throw new Error('Leaflet.draw 0.2.0+ requires Leaflet 0.6.0+. Download latest from https://github.com/Leaflet/Leaflet/');
		}*/

		L.Control.prototype.initialize.call(this, options);

		var id, toolbar;

		this._toolbars = {};

		// Initialize toolbars
		if (L.DrawToolbar && this.options.draw) {
			toolbar = new L.DrawToolbar(this.options.draw);
			id = L.stamp(toolbar);
			this._toolbars[id] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[id].on('enable', this._toolbarEnabled, this);
		}

        if (L.StyleToolbar && this.options.style) {
            toolbar = new L.StyleToolbar(this.options.style);
            id = L.stamp(toolbar);
            this._toolbars[id] = toolbar;

            // Listen for when toolbar is enabled
            this._toolbars[id].on('enable', this._toolbarEnabled, this);

            this._toolbars[id].on('resetStyle',this.resetDrawingShapeOptions, this);
        }

		if (L.EditToolbar && this.options.edit) {
			toolbar = new L.EditToolbar(this.options.edit);
			id = L.stamp(toolbar);
			this._toolbars[id] = toolbar;

			// Listen for when toolbar is enabled
			this._toolbars[id].on('enable', this._toolbarEnabled, this);
            //this._toolbars[id].on('disabled', this.setStyleDisabled, this);
            //this._toolbars[id].on('enable',this.setStyleEnabled,this);
		}
	},

	onAdd: function (map) {
		var container = L.DomUtil.create('div', 'leaflet-draw'),
			addedTopClass = false,
			topClassName = 'leaflet-draw-toolbar-top',
			toolbarContainer;

        L.DomEvent.on(container, 'contextmenu', L.DomEvent.stopPropagation);

		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId)) {
				toolbarContainer = this._toolbars[toolbarId].addToolbar(map);

				// Add class to the first toolbar to remove the margin
				if (!addedTopClass) {
					if (!L.DomUtil.hasClass(toolbarContainer, topClassName)) {
						L.DomUtil.addClass(toolbarContainer.childNodes[0], topClassName);
					}
					addedTopClass = true;
				}

				container.appendChild(toolbarContainer);
			}
		}

		return container;
	},

	onRemove: function () {
		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId)) {
				this._toolbars[toolbarId].removeToolbar();
			}
		}
	},

	setDrawingOptions: function (options) {
		for (var toolbarId in this._toolbars) {
			if (this._toolbars[toolbarId] instanceof L.DrawToolbar) {
				this._toolbars[toolbarId].setOptions(options);
			}
		}
	},

    resetDrawingShapeOptions: function () {
        for (var toolbarId in this._toolbars) {
            if (this._toolbars[toolbarId] instanceof L.DrawToolbar) {
                this._toolbars[toolbarId].resetShapeOptions(L.DrawStyle);
            }
        }
    },

	_toolbarEnabled: function (e) {

        if(e.target._activeMode.handler.type === 'stylePicker'){
            return;
        }

        //只有涉及到 style的直接显示stylePicker
        switch (e.target._activeMode.handler.type){
            case 'circle':
            case 'customcircle':
            case 'label':
            case 'latlngspolygon':
            case 'latlngspolyline':
            case 'painting':
            case 'polygon':
            case 'polyline':
            case 'rectangle':
                this.setStyleDisabled(false);
                for(var item in this._toolbars){
                    if(this._toolbars[item]._modes.hasOwnProperty('stylePicker')){
                        var stylePickerMod = this._toolbars[item]._modes.stylePicker;
                        stylePickerMod.handler.fireEnable();
                    }
                }

                break;
            default :
                this.setStyleDisabled(true);
                break;
        }


        //如果是编辑状态 让 选色器隐藏
        /*if(e.target._activeMode.handler.type === 'edit'){
            this.setStyleDisabled(true);
        }else {
            this.setStyleDisabled(false);
        }*/

		var id = '' + L.stamp(e.target);

		for (var toolbarId in this._toolbars) {
			if (this._toolbars.hasOwnProperty(toolbarId) && toolbarId !== id) {
				this._toolbars[toolbarId].disable(e);
			}
		}
	},

    setStyleDisabled:function(_boolean){
        if(_boolean){
            document.getElementById('drawStyle').style.display = 'none';
        }else {
            document.getElementById('drawStyle').style.display = 'block';
        }
    }

});

L.Map.mergeOptions({
	drawControl: false
});

L.Map.addInitHook(function () {
	if (this.options.drawControl) {
		this.drawControl = new L.Control.Draw();
		this.addControl(this.drawControl);
	}
});