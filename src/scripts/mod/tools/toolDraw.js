/**
 * [ONEMAP.M.toolDraw]
 * @return {[object]}
 */
define([
    'html!templates/tools/toolDraw',
    'css!styles/tools/toolDraw'],
function(tplLayout){

    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
        drawGroup:null,
        markerIcon:[],
        drawControl:null,
        recodData:null,
        drawGroupGuid:null
    }

    /**
     * 模块界面样式 例如：宽，高
     * @type {Object}
     */
    var styles = {}

    /**
     * 模块状态，用于存储模块的状态 例如：收起，关闭
     * @type {Object}
     */
    var status = {
        isAddControl:false,
        initialized:false,
        isRecod:false,
        isAddForm:false
    }
    
    /**
     * 初始化并订阅事件
     * @return {[type]} [description]
     */
    function init(){

        //if(status.isAddControl){
        //    return;
        //}
        if(!status.initialized){
            status.initialized = true;
            //取消订阅
            unSubscribe();
            //添加订阅
            subscribe();
            modValue.drawGroupGuid = map2DViewer.group({
                action: 'add'
            });
            modValue.drawGroup = map2DViewer.groups[modValue.drawGroupGuid];
            modValue.markerIcon = [];
            //解析icon
            $.get('images/symbols/all.xml',function(data){
                $(data).find('group').each(function(index,ele){
                    var temp = {
                        icon:[]
                    };
                    temp.gName = $(ele).attr('name');
                    $(ele).find('symbol').each(function(index,ele){
                        var item = {
                            name:$(ele).attr('name'),
                            file:'images/symbols/'+(parseInt($(ele).attr('id'))+2000000000)+'.png'
                        }
                        temp.icon.push(item)
                    });

                    modValue.markerIcon.push(temp);
                });
                if(!status.isAddControl){
                    buildControl();
                }
            });

        }else {
            if(!status.isAddControl){
                buildControl();
            }
        }
        ONEMAP.C.publisher.publish({
                        modName: 'toolDraw'
                    }, 'tools:active');
    }

    /**
     * 设置界面
     */
    function setLayout(){

    }

    /**
     * 界面事件绑定
     * @return {[type]} [description]
     */
    function bindEvent(){

    }

    /**
     * 界面重置
     * @return {[type]} [description]
     */
    function layoutResize(){

    }

    function buildControl(){
        modValue.drawControl = new L.Control.Draw({
            draw: {
                position: 'topleft',
                marker:{
                    shapeOptions:{
                        icon:modValue.markerIcon
                    }
                }
            },
            edit: {
                featureGroup: modValue.drawGroup
            }
        });
        map2DViewer.map.addControl(modValue.drawControl);

        status.isAddControl = true;

        map2DViewer.map.on('draw:created', drawCreated);

        map2DViewer.map.on('draw:edit', drawEdit);

        map2DViewer.map.on('draw:edited', drawEdited);

        map2DViewer.map.on('favorite',favorite);

        map2DViewer.map.on('printDraw',printDraw);

    }
    /**
     * 打印当前标绘
     */
    function printDraw(){

    };
    /**
     * 标绘创建 添加到容器
     * @param e
     */
    function drawCreated(e){
        modValue.isRecod = false;
        var type = e.layerType,
            layer = e.layer;
        modValue.drawGroup.addLayer(layer);

        if(layer instanceof L.Circle){
            layer.centerPoint = new L.Circle(layer._latlng, 1, layer.options).addTo(modValue.drawGroup);
        }
    }

    function drawEdit(e){
        var layers = e.layers;
        layers.eachLayer(function(layer) {
            if(layer instanceof L.Circle){
                layers.removeLayer(layer.centerPoint);
            }
        });
    }


    /**
     * 标绘编辑完成后 统计
     * @param e
     */
    function drawEdited(e){
        modValue.isRecod = false;
        var layers = e.layers;

        var countOfEditedLayers = 0;
        layers.eachLayer(function(layer) {
            countOfEditedLayers++;

            if(layer instanceof L.Circle){
                layer.centerPoint.setLatLng(layer._latlng).addTo(modValue.drawGroup);
            }
        });
    }

    /**
     * 清空
     */
    function cleanAllDraw(){
        modValue.drawGroup.clearLayers();
    }

    /**
     * 解析DrawGroup图层信息并返回JSON串
     * @returns {*}
     * @private
     */
    function jsonDrawData(){
        var data = [];
        modValue.drawGroup.eachLayer(function(layer){
            var item = {};
            item.drawType = layer.drawType;

            switch (layer.drawType){
                case 'label':
                    item.value = layer._content.value;
                    item.drawInfo = {
                        center:[layer.getLatLng().lat,layer.getLatLng().lng],
                        shapeOptions:layer.drawInfo.shapeOptions
                    }
                    break;
                case 'circle':
                    item.drawInfo = {
                        startLatLng:[layer.getLatLng().lat,layer.getLatLng().lng],
                        radius:layer.getRadius(),
                        shapeOptions:layer.drawInfo.shapeOptions
                    };
                    break;
                case 'marker':
                    item.drawInfo = {
                        center:[layer.getLatLng().lat,layer.getLatLng().lng],
                        icon:layer.drawInfo.icon
                    };
                    break;
                case 'polyline':
                    item.drawInfo = {
                        LatLngs:layer.getLatLngs(),
                        shapeOptions:layer.drawInfo.shapeOptions
                    }
                    break;
                case 'painting':
                    item.drawInfo = {
                        LatLngs:layer.getLatLngs(),
                        shapeOptions:layer.drawInfo.shapeOptions
                    }
                    break;
                case 'polygon':
                    item.drawInfo = {
                        LatLngs:layer.getLatLngs(),
                        shapeOptions:layer.drawInfo.shapeOptions
                    }
                    break;
                case 'rectangle':
                    item.drawInfo = {
                        bounds:layer.getBounds(),
                        shapeOptions:layer.drawInfo.shapeOptions
                    }
                    break;
            }
            data.push(item);
        });

        return JSON.stringify(data);
    }

    /**
     * 显示保存的数据，添加到drawGroup
     * @param jsonData
     */
    function showDrawRecord(jsonData,isRecod){
        if(!status.initialized){
            init();
            status.initialized = true;
        }
        if(isRecod){
            modValue.isRecod = isRecod
            modValue.recodData = jsonData;
        }
        var recordAry = JSON.parse(jsonData.draw_data);
        for(var i= 0,l=recordAry.length;i<l;i++){
            switch (recordAry[i].drawType){
                case 'marker':
                    var marker = new L.Marker(recordAry[i].drawInfo.center, { icon: L.icon(recordAry[i].drawInfo.icon) });
                    marker.drawInfo = recordAry[i].drawInfo;
                    marker.drawType = recordAry[i].drawType;
                    marker.addTo(modValue.drawGroup);
                    break;
                case 'label':
                    var textInput = L.DomUtil.create('textarea');
                    textInput.className = 'draw-label-textarea';
                    textInput.style.fontSize = recordAry[i].drawInfo.shapeOptions.fontSize+'px';
                    textInput.style.color = recordAry[i].drawInfo.shapeOptions.fontColor;
                    textInput.setAttribute('wrap','wrap');
                    textInput.value = recordAry[i].value?recordAry[i].value:' ';

                    L.DomEvent.on(textInput,'change',function(e){
                        var el = e.target? e.target: e.srcElement;
                        el.style.width = (el.scrollWidth-4) + 'px';
                        el.style.height = '18px';
                        el.style.height = el.scrollHeight + 'px';
                    });
                    //输入框
                    var label = new L.Olabel(recordAry[i].drawInfo.center,textInput,{
                        offset: [-5, -10],
                        opacity: 1,
                        className:'draw-label'
                    });
                    L.DomEvent.on(label, 'click', L.DomEvent.stopPropagation)
                        .on(label, 'mousedown', L.DomEvent.stopPropagation)
                        .on(label, 'dblclick', L.DomEvent.stopPropagation)
                        .on(label, 'click', L.DomEvent.preventDefault);

                    label.drawInfo = recordAry[i].drawInfo;
                    label.drawType = recordAry[i].drawType;
                    label.addTo(modValue.drawGroup);

                    label._content.style.height = '18px';
                    label._content.style.height = label._content.scrollHeight + 'px';

                    label.fire('change');
                    break;
                case 'polyline':
                    var poly = new L.Polyline(recordAry[i].drawInfo.LatLngs, recordAry[i].drawInfo.shapeOptions);
                    poly.drawInfo = recordAry[i].drawInfo;
                    poly.drawType = recordAry[i].drawType;
                    poly.addTo(modValue.drawGroup);
                    break;
                case 'painting':
                    var poly = new L.Polyline(recordAry[i].drawInfo.LatLngs, recordAry[i].drawInfo.shapeOptions);
                    poly.drawInfo = recordAry[i].drawInfo;
                    poly.drawType = recordAry[i].drawType;
                    poly.addTo(modValue.drawGroup);
                    break;
                case 'polygon':
                    var poly = new L.Polygon(recordAry[i].drawInfo.LatLngs, recordAry[i].drawInfo.shapeOptions);
                    poly.drawInfo = recordAry[i].drawInfo;
                    poly.drawType = recordAry[i].drawType;
                    poly.addTo(modValue.drawGroup);
                    break;
                case 'rectangle':
                    var llBounds = [
                        [recordAry[i].drawInfo.bounds._northEast.lat, recordAry[i].drawInfo.bounds._northEast.lng],
                        [recordAry[i].drawInfo.bounds._southWest.lat, recordAry[i].drawInfo.bounds._southWest.lng]
                    ];
                    var rectangle = new L.Rectangle(llBounds, recordAry[i].drawInfo.shapeOptions);
                    rectangle.drawInfo = recordAry[i].drawInfo;
                    rectangle.drawType = recordAry[i].drawType;
                    rectangle.addTo(modValue.drawGroup);
                    break;
                case 'circle':
                    var circle = new L.Circle(recordAry[i].drawInfo.startLatLng, recordAry[i].drawInfo.radius, recordAry[i].drawInfo.shapeOptions);

                    circle.drawInfo = recordAry[i].drawInfo;
                    circle.drawType = recordAry[i].drawType;
                    circle.addTo(modValue.drawGroup);
                    circle.centerPoint = new L.Circle(recordAry[i].drawInfo.startLatLng, 1, recordAry[i].drawInfo.shapeOptions).addTo(modValue.drawGroup);
                    
                    break;
            }
        }
    }

    /**
     * 创建附件信息 例如专题图等类型
     * @returns {*}
     * @private
     */
    function buildInfo(){
        var info = {};
        if(ONEMAP.M.mapHolder.hasOwnProperty('singleLayers')){
            var thematic = ONEMAP.M.mapHolder.singleLayers.getCurrentOverLayerObj();
            if(thematic){
                info.thematic = {
                    center:[map2DViewer.map.getCenter().lat,map2DViewer.map.getCenter().lng],
                    guid:thematic.guid,
                    data_type:thematic.data_type,
                    map_type:thematic.map_type,
                    max_zoom:thematic.max_zoom,
                    min_zoom:thematic.min_zoom,
                    name:thematic.name,
                    thumb_min_id:thematic.thumb_min_id,
                    translate:thematic.translate,
                    zoom:map2DViewer.map.getZoom(),
                    tileUrl:thematic.tileLayer._url
                }
            }
        }
        return JSON.stringify(info);
    }


    /**
     * 保存当前标绘
     */
    function favorite(callbackFunc){
        //限制只能添加当前一个窗口
        if(status.isAddForm){
            return false;
        }
        status.isAddForm = true;

        $('body').append(tplLayout);
        if(typeof callbackFunc === 'function'){
            $('#userDrawAddModal .modal-header h3').empty().html('打印前请先保存标绘数据。');
        }

        $('#userDrawAddModal').show();
        $('#filterCover').show();
        $('#userDrawAddModal').find('.input').focus();


        $('#userDrawAddModal').find('.close').bind('click',function(){

            $('#filterCover').hide();
            $('#userDrawAddModal').remove();
            status.isAddForm = false;
        });

        $('#userDrawAddModal').find('.sure').bind('click',function(){
            if($('#userDrawAddModal .input').val() === ''){
                ONEMAP.C.publisher.publish({ type: 'warning', message: '请输入名称' }, 'noteBar::add');
                $('#userDrawAddModal .input').focus();
                return false;
            }


            var name = $('#userDrawAddModal .input').val();
            if(name ==='' || name.indexOf(' ') >= 0){                
                ONEMAP.C.publisher.publish({ type: 'warning', message: '名称不能为空或包含空格' }, 'noteBar::add');
                $('#userDrawAddModal .input').focus();
                return false;
            }
            if((/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\s]/g).test(name)){
                ONEMAP.C.publisher.publish({ type: 'warning', message: '名称只能包含英文、数字、中文' }, 'noteBar::add');
                $('#userDrawAddModal .input').focus();
                return false;
            }
            

            //构造数据
            var ajaxData = {};
            ajaxData.name = $('#userDrawAddModal .input').val();
            ajaxData.center_lon = map2DViewer.map.getCenter()['lng'];
            ajaxData.center_lat = map2DViewer.map.getCenter()['lat'];
            ajaxData.initial_zoom = map2DViewer.map.getZoom();
            ajaxData.map_type = 1;
            ajaxData.draw_data = jsonDrawData();
            ajaxData.info = buildInfo();
            ONEMAP.V.loading.load();
            $.ajax({
                type:"post",
                dataType:'json',
                url:onemapUrlConfig.userCenterUrl+'/draw/add'+'?ticket='+ONEMAP.D.user.ticket,
                data:ajaxData,
                success:function(data){
                    ONEMAP.V.loading.loaded();
                    if(data.code == 4){
                        ONEMAP.T.noPermission('favorite');
                    }
                    if(data.code == 3){
                        ONEMAP.T.logout('favorite');
                    }

                    if(data.success){
                        ONEMAP.C.publisher.publish({type:'success',message:'保存成功'});
                        if(ONEMAP.M.hasOwnProperty('userDraw')){
                            //ONEMAP.M.userDraw.isFavDataChange = true;
                            ONEMAP.M.userDraw.getFavData();
                        }

                        //如果保存成功，设置状态为直接打印
                        //modValue.isRecod = true;
                        //modValue.recodData._id = data.id;

                        //如果成功，回调
                        if(typeof callbackFunc === 'function'){
                            callbackFunc(data);
                        }

                    }else {
                        ONEMAP.C.publisher.publish({type:'error',message:'保存失败'});
                    }
                },
                error:function(errorData){
                    ONEMAP.V.loading.loaded();
                }
            });

            //移除添加框，恢复可添加状态
            $('#filterCover').hide();
            $('#userDrawAddModal').remove();
            status.isAddForm = false;
        });

    }


    /**
     * 注册订阅
     * @type {Function}
     * 推送：ONEMAP.C.publisher.publish(options,'moduleName::type');
     * 订阅：ONEMAP.C.publisher.subscribe(layoutResize,'sideBarLayoutChange');
     */
    function subscribe(){
        ONEMAP.C.publisher.subscribe(remove,'cleanMap');
        ONEMAP.C.publisher.subscribe(remove, 'tools:active');
        ONEMAP.C.publisher.subscribe(remove, 'change23D');
    }

    /**
     * 取消订阅
     * @type {Function}
     * 取消订阅：ONEMAP.C.publisher.unSubscribe(layoutResize,'sideBarLayoutChange');
     */
    function unSubscribe(){
        ONEMAP.C.publisher.unSubscribe(remove,'cleanMap');
        ONEMAP.C.publisher.unSubscribe(remove, 'tools:active');
    }

    /**
     * 模块移除
     * @return {[type]} [description]
     */
    function remove(options){
        if(options.modName!="toolDraw"){
            $('#toolsBar .tools-painting').removeClass('cur');
        }else{
            if($('#toolsBar .tools-painting').hasClass('cur')){
                $('#toolsBar .tools-painting').removeClass('cur');
            }else{
                $('#toolsBar .tools-painting').addClass('cur');
            }
        }
        if(status.isAddControl){
            map2DViewer.map.removeControl(modValue.drawControl);

            map2DViewer.map.off('draw:created', drawCreated);

            map2DViewer.map.off('draw:edited', drawEdited);

            map2DViewer.map.off('favorite',favorite);

            map2DViewer.map.off('printDraw',printDraw);

            modValue.drawGroup.clearLayers();
            map2DViewer.map.removeLayer(modValue.drawGroup);

            status.isAddControl = false;
            status.initialized = false;
        }
    }

    



    return ONEMAP.M.toolDraw = {
        init:init,
        remove:remove,
        showDrawRecord:showDrawRecord
    }
});