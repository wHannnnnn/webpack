/**
 * [ONEMAP.M.gcmsList]
 * @return {[object]}
 */
define(['html!templates/gcms/gcmsList',
    'css!styles/gcms/gcmsList'
],function(tplLayout){

    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
        //参数
        options:{},
        //查询面板高度 默认为0
        searchPanelHeight:0,
        markersGroupGuid:null,

        markerObj:{}//标记点集合
    };

    /**
     * 模块初始化
     * @return {[type]} [description]
     */
    function init(options){
        remove();
        modValue.searchPanelHeight = 0;
        modValue.options = {
            column_name:'',
            page:{
                page:1
            },
            search:{}
        };
        for(var op in options){
            modValue.options[op] = options[op];
        }

        //设置容器布局
        setLayout();
        
        ONEMAP.D.gcmsCurColumnData = ONEMAP.D.gcmsColumnObjs[modValue.options['column_name']];
        showCmsColumn();
        //没有子菜单，添加 class 用来判断
        $('#gcmsListContent').addClass('single');
        $('#gcmsArticlesListPage').addClass('single');
        $('#gcmsListSearchPanel').addClass('single');
        $('#gcmsListContent').addClass('single');

        bindEvent();

        //订阅推送
        subscribe();

        //设置zIndex 为最高
        var zIndex = ONEMAP.M.sideBar.getZIndex();
        $('#gcmsListWrap').css({zIndex:zIndex});

        ONEMAP.D.currentSideBarMod = 'gcmsList';
        //开启侧栏
        ONEMAP.C.publisher.publish('show','layout::sideBar');

    }

    /**
     * 设置容器
     */
    function setLayout(){
        $(tplLayout).appendTo($("#sideBarBody"));
        $('#gcmsListWrap .panel-header h3').html(modValue.options['data']['title']);        
        layoutResize();
        $(window).resize(function(){
            layoutResize();
        });
        $("#gcmsListContent").mCustomScrollbar({
            scrollInertia: 0
        });
    }

    /**
     * 事件绑定
     * @return {[type]} [description]
     */
	function bindEvent(){ 
        $('#gcmsListWrap .panel-header .abtn-goback').bind('click',function(){
            remove();
        })       
    }
    

    /**
     * 显示cms栏目 搜索栏，列表
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function showCmsColumn(options){      
        //ONEMAP.C.publisher.publish('','gcmsArticleShowRemove'); 
        //获取栏目模型后 去获取栏目数据
        getColumnModelData({
            callback:function(){
                map23DControl.group({
                    action:'cleanAll',
                    guid:modValue.markersGroupGuid
                });
                map23DControl.group({
                    action:'remove',
                    guid:modValue.markersGroupGuid
                });
                //地图中心点 是否聚合
                if(ONEMAP.D.gcmsCurColumnModelData['field_list'].hasOwnProperty('map_center')){
                    
                    if(ONEMAP.D.gcmsCurColumnModelData['field_list']['map_center']['marker_cluster']){
                        modValue.markersGroupGuid  = map23DControl.group({
                            action: 'add',
                            clustering: true, //关键 开启聚合
                            clusterOptions:{
                                maxClusterRadius:120,//多少像素距离的点会聚合 默认小于120像素内的点会聚合
                                polygonOptions: {weight: 1, opacity: 0.5}, //聚合范围面样式
                                showCoverageOnHover: true, //是否显示聚合范围
                                disableClusteringAtZoom: null, //设置到达指定缩放等级后禁用聚合
                            }//2D聚合参数
                        });
                    }else {
                        modValue.markersGroupGuid  = map23DControl.group({
                            action: 'add'
                        });
                    }
                }

                //检测是否有初始函数，有的执行
                if(ONEMAP.D.gcmsCurColumnModelData.hasOwnProperty('js_script')){
                    if(ONEMAP.D.gcmsCurColumnModelData.js_script.length>0){
                        eval("var modelFunction="+ONEMAP.D.gcmsCurColumnModelData.js_script);
                        if(modelFunction.hasOwnProperty('init')){
                            modelFunction.init();
                        }
                    }
                }

                //设置栏目class
                $('#gcmsListWrap').removeClass().addClass(ONEMAP.D.gcmsCurColumnModelData['name']); 
                //设置栏目css
                $('#gcmsModelCssStyle').remove();
                $('<style type="text/css" id="gcmsModelCssStyle">'+ONEMAP.D.gcmsCurColumnModelData['css_style']+'</style>').appendTo('head');
                setSearchPanel();
                getColumnData();
            }
        });
    }



    /**
     * 获取栏目模型数据
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getColumnModelData(options){
        ONEMAP.V.loading.load();
        $.ajax({
            url: onemapUrlConfig.gcmsServiceUrl+'/showmodel/'+modValue.options['column_name']+'?ticket='+ONEMAP.D.user.ticket,
            type:"GET",
            dataType: 'json'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            if(data.code == 4){
                //ONEMAP.T.noPermission('getColumnModelData');
            }
            if(data.code == 3){
                //ONEMAP.T.logout('getColumnModelData');
            }
            ONEMAP.D.gcmsCurColumnModelData = data['data'];
            modValue.options['page']['page_size'] = ONEMAP.D.gcmsCurColumnModelData['query_count'];
            options.callback();
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        });          
    }

    /**
     * 获取栏目数据
     * @return {[type]} [description]
     */
    function getColumnData(){
        ONEMAP.C.publisher.publish('','gcmsArticleShowRemove');
        ONEMAP.V.loading.load();
        var ajaxData = {
            page:modValue.options['page']['page']
        };

        for(var item in modValue.options['search']){
            ajaxData[item] = modValue.options['search'][item];
        }

        //检测是否有before函数，有的执行
        if(ONEMAP.D.gcmsCurColumnModelData.hasOwnProperty('js_script')){
            if(ONEMAP.D.gcmsCurColumnModelData.js_script.length>0){
                eval("var modelFunction="+ONEMAP.D.gcmsCurColumnModelData.js_script);
                if(modelFunction.hasOwnProperty('before')){
                    modelFunction.before();
                }
            }
        }

        $.ajax({
            url: onemapUrlConfig.gcmsServiceUrl+'/show/'+modValue.options['column_name']+'?ticket='+ONEMAP.D.user.ticket,
            type:"GET",
            dataType: 'json',
            data:ajaxData
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            if(data.code == 4){
                ONEMAP.T.noPermission('getColumnData');
            }
            if(data.code == 3){
                ONEMAP.T.logout('getColumnData');
            }
            ONEMAP.D.gcmsCurColumnListData = data;
            modValue.options['page']['total'] = ONEMAP.D.gcmsCurColumnListData['total'];
            setArticlesList();
            //是否有after函数，有的执行
            if(ONEMAP.D.gcmsCurColumnModelData.hasOwnProperty('js_script')){
                if(ONEMAP.D.gcmsCurColumnModelData.js_script.length>0){
                    eval("var modelFunction="+ONEMAP.D.gcmsCurColumnModelData.js_script);
                    if(modelFunction.hasOwnProperty('after')){
                        modelFunction.after();
                    }
                }
            }
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        });          
    }

    /**
     * 设置搜索面板  // layout下拉列表1  列表2  输入框3
     */
    function setSearchPanel(){
        if(ONEMAP.D.gcmsCurColumnModelData['query_field'].length == 0){
            modValue.searchPanelHeight = 0;
            $('#gcmsListSearchPanel').unbind('resize')
            $('#gcmsListSearchPanel').empty().hide();
            layoutResize();
            return false;
        }
        $('#gcmsListSearchPanel').empty().show();

        $('#gcmsListSearchPanel').unbind('resize').bind('resize',function(){            
            modValue.searchPanelHeight = $(this).height() + 11;
            layoutResize();
        });

        var systemFields = ['gcms_title','gcms_create_time','gcms_change_time','gcms_audit_time','gcms_publish_time','gcms_read_number','gcms_secret_level'];
        //
        var searchHtml = $('<div><div id="gcmsListSearchForm"></div><div class="submit-group"><button id="gcmsListBtnSearch" class="btn btn3 sure">搜索</button></div></div>');
        var searchPanelForm = searchHtml.find('#gcmsListSearchForm');
        searchHtml.appendTo($('#gcmsListSearchPanel'));

        $('#gcmsListBtnSearch').bind('click',function(){
            getColumnData();
        });

        $(ONEMAP.D.gcmsCurColumnModelData['query_field']).each(function(index, el) {
            if($.inArray(el['field'],systemFields) != -1){
                //系统字段
                switch(el['field']){
                    case 'gcms_title':
                        buildSearchFormInput({
                            field_data:{
                                'name':'gcms_title',
                                'front_type':'gcms_title',
                                'alias':'标题'
                            },
                            query_data:el
                        }).appendTo(searchPanelForm);
                    break;
                    case 'gcms_create_time':
                        buildSearchFormTime({
                            field_data:{
                                'name':'gcms_create_time',
                                'front_type':'gcms_create_time',
                                'alias':'创建时间'
                            },
                            query_data:el
                        }).appendTo(searchPanelForm);
                    break;
                    case 'gcms_change_time':
                        buildSearchFormTime({
                            field_data:{
                                'name':'gcms_change_time',
                                'front_type':'gcms_change_time',
                                'alias':'修改时间'
                            },
                            query_data:el
                        }).appendTo(searchPanelForm);
                    break;
                    case 'gcms_audit_time':
                        buildSearchFormTime({
                            field_data:{
                                'name':'gcms_audit_time',
                                'front_type':'gcms_audit_time',
                                'alias':'审核时间'
                            },
                            query_data:el
                        }).appendTo(searchPanelForm);
                    break;
                    case 'gcms_publish_time':
                        buildSearchFormTime({
                            field_data:{
                                'name':'gcms_publish_time',
                                'front_type':'gcms_publish_time',
                                'alias':'发布时间'
                            },
                            query_data:el
                        }).appendTo(searchPanelForm);
                    break;
                    case 'gcms_read_number':
                        buildSearchFormInput({
                            field_data:{
                                'name':'gcms_read_number',
                                'front_type':'gcms_read_number',
                                'alias':'阅读次数'
                            },
                            query_data:el
                        }).appendTo(searchPanelForm);
                    break;
                    case 'gcms_secret_level':
                        buildSearchFormSecretLevel({
                            field_data:{
                                'name':'gcms_secret_level',
                                'front_type':'gcms_secret_level',
                                'alias':'密级'
                            },
                            query_data:[
                                        {name: "无",value: 0},
                                        {name: "公开",value: 1},
                                        {name: "内部",value: 2},
                                        {name: "一般",value: 3},
                                        {name: "重要",value: 4},
                                        {name: "核心",value: 5}
                                    ]
                        }).appendTo(searchPanelForm);
                    break;
                }
            }else {
                //自定义字段
                var fieldFrontType = ONEMAP.D.gcmsCurColumnModelData['field_list'][el['field']]['front_type'];
                var fieldData = ONEMAP.D.gcmsCurColumnModelData['field_list'][el['field']];
                switch(fieldFrontType){
                    case 'select':
                        if(el['layout'] == 1){
                            buildSearchFormType({
                                field_data:fieldData,
                                query_data:el
                            }).appendTo(searchPanelForm);
                        }else if(el['layout'] == 2){
                            buildSearchFormList({
                                field_data:fieldData,
                                query_data:el
                            }).appendTo(searchPanelForm);
                        }                        
                    break;
                    case 'multiple_select':
                        buildSearchFormMtype({
                            field_data:fieldData,
                            query_data:el
                        }).appendTo(searchPanelForm);
                    break;
                    case 'int_num':
                        if(el['method'] == 0){
                            buildSearchFormInput({
                                field_data:fieldData,
                                query_data:el
                            }).appendTo(searchPanelForm);
                        }else if(el['method'] == 1){
                            buildSearchFormLimits({
                                field_data:fieldData,
                                query_data:el
                            }).appendTo(searchPanelForm);
                        }                       
                    break;
                    case 'float_num':
                        if(el['method'] == 0){
                            buildSearchFormInput({
                                field_data:fieldData,
                                query_data:el
                            }).appendTo(searchPanelForm);
                        }else if(el['method'] == 1){
                            buildSearchFormLimits({
                                field_data:fieldData,
                                query_data:el
                            }).appendTo(searchPanelForm);
                        }
                    break;
                    case 'date_time':
                        buildSearchFormTime({
                            field_data:fieldData,
                            query_data:el
                        }).appendTo(searchPanelForm);
                    break;
                }
            }
        });
    }

    /**
     * 构建下拉列表
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function buildSearchFormType(options){
        var form = $('<dl class="search-item '+options['field_data']['name']+'"><dt>'+options['field_data']['alias']+'</dt><dd></dd></dl>');
        var selectForm = $('<select class="select" id="'+options['field_data']['name']+'"></select>');
        selectForm.appendTo(form.find('dd'));
        $('<option value="-1">全部</option>').appendTo(selectForm);
        getTypeFieldTypeData({
            type:'type',
            name:options['field_data']['custom_type'],
            callback:function(data){
                $(data['data']).each(function(index, el) {
                    $('<option value="'+index+'">'+el['name']+'</option>').appendTo(selectForm);
                });
                //绑定事件
                selectForm.bind('change',function(){
                    if($(this).val() == '-1'){
                        delete modValue.options['search'][options['field_data']['name']];
                    }else {
                        modValue.options['search'][options['field_data']['name']] = parseInt($(this).val());
                    }
                });
            }
        })
        return form;
    }

    /**
     * 构建密级选择
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function buildSearchFormSecretLevel(options){
        var form = $('<dl class="search-item '+options['field_data']['name']+'"><dt>'+options['field_data']['alias']+'</dt><dd></dd></dl>');
        var selectForm = $('<select class="select" id="'+options['field_data']['name']+'"></select>');
        selectForm.appendTo(form.find('dd'));
        $('<option value="-1">全部</option>').appendTo(selectForm);
        
        $(options['query_data']).each(function(index, el) {
            $('<option value="'+el['value']+'">'+el['name']+'</option>').appendTo(selectForm);
        });
        //绑定事件
        selectForm.bind('change',function(){
            if($(this).val() == '-1'){
                delete modValue.options['search'][options['field_data']['name']];
            }else {
                modValue.options['search'][options['field_data']['name']] = parseInt($(this).val());
            }
        });
           
        return form;
    }

    /**
     * 构建输入型查询范围
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function buildSearchFormLimits(options){
        var form = $('<dl class="search-item '+options['field_data']['name']+' limites-search"><dt>'+options['field_data']['alias']+'</dt><dd></dd></dl>');
        var inputFormStart = $('<input class="input" id="'+options['field_data']['name']+'_satrt" type="text" />');
        inputFormStart.appendTo(form.find('dd'));
        $('<label>至</label>').appendTo(form.find('dd'));
        var inputFormEnd = $('<input class="input" id="'+options['field_data']['name']+'_end" type="text" />');
        inputFormEnd.appendTo(form.find('dd'));
        
        //绑定事件
        inputFormStart.bind('change',function(){
            if($.trim($(this).val()).length == 0){
                delete modValue.options['search'][(options['field_data']['name']+'_start')];
            }else {
                modValue.options['search'][(options['field_data']['name']+'_start')] = $(this).val();
            }
        });
        inputFormEnd.bind('change',function(){
            if($.trim($(this).val()).length == 0){
                delete modValue.options['search'][(options['field_data']['name']+'_end')];
            }else {
                modValue.options['search'][(options['field_data']['name']+'_end')] = $(this).val();
            }
        });
           
        return form;
    }

    /**
     * 构建多级下拉菜单
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function buildSearchFormMtype(options){
        var form = $('<dl class="search-item '+options['field_data']['name']+'"><dt>'+options['field_data']['alias']+'</dt><dd></dd></dl>');
        selectForm = form.find('dd');        
        getTypeFieldTypeData({
            type:'mtype',
            name:options['field_data']['custom_type'],
            callback:function(data){
                buildSelectOptions({
                    yData:data,
                    value:[-1],
                    wrap:selectForm,
                    filedName:options['field_data']['name']
                })
            }
        })
        return form;
    }
    /**
     * 构建多级类别
     * @param  {[type]} options [description] {yData,value}
     * @return {[type]}         [description]
     */
    function buildSelectOptions(options){
        options['wrap'].empty();
        var curData = options['yData']['data'];
        var pidAry = [];
        $(options['value']).each(function(index,el) {  
            pidAry.push(el);                                 
            var selectObj = buildSelect({
                yData:options['yData'],
                data:curData,
                value:el,
                pid:pidAry,
                wrap:options['wrap'],
                filedName:options['filedName']
            });
            selectObj.appendTo(options['wrap']);
            if(el == -1){
                return;
            }
            if(curData[el].hasOwnProperty('son_tree')){
                curData = curData[el]['son_tree'];
                if(index == options['value'].length-1){
                    pidAry.push(-1); 
                    var selectObj = buildSelect({
                        yData:options['yData'],
                        data:curData,
                        value:-1,
                        pid:pidAry,
                        wrap:options['wrap'],
                        filedName:options['filedName']
                    });
                    selectObj.appendTo(options['wrap']);
                }
            }            
        });
    }

    function buildSelect(options){
        var newSelect = $('<select pid="'+options['pid'].join("~")+'" class="select"></select>');
        newSelect.yOptinos = options;
        $('<option value="-1">全部</option>').appendTo(newSelect);
        $(options['data']).each(function(index, el) {
            $('<option value="'+index+'">'+el['name']+'</option>').appendTo(newSelect);
        });
        newSelect.val(options['value']);
        newSelect.bind('change',function(){
            var sValue = newSelect.attr('pid').split('~');
            sValue = $.map(sValue,function(item){
                return parseInt(item);
            });
            if(parseInt($(this).val()) == -1 && sValue.length>1){
                //delete sValue[(sValue.length-1)];
                sValue.splice(sValue.length-1,1);
            }else{
                sValue[(sValue.length-1)] = parseInt($(this).val());
            }

            buildSelectOptions({
                    yData:newSelect.yOptinos['yData'],
                    value:sValue,
                    wrap:newSelect.yOptinos['wrap'],
                    filedName:options['filedName']
                });
            if(sValue[0] == -1){
                for(var i = 0;i<newSelect.yOptinos['yData']['depth'];i++){
                    var name = options['filedName']+'_'+i;
                    delete modValue.options['search'][name];
                }
            }else {
                for(var i = 0;i<newSelect.yOptinos['yData']['depth'];i++){
                    var name = options['filedName']+'_'+i;
                    delete modValue.options['search'][name];
                }
                $(sValue).each(function(index, el) {
                    var name = options['filedName']+'_'+index;
                    modValue.options['search'][name] = el;
                });
            }
            
        });
        return newSelect;
    }

    /**
     * 构建列表选择
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function buildSearchFormList(options){
        var form = $('<dl class="search-item '+options['field_data']['name']+'"><dt>'+options['field_data']['alias']+'</dt><dd></dd></dl>');
        var selectForm = $('<ul class="list" id="'+options['field_data']['name']+'"></ul>');
        selectForm.appendTo(form.find('dd'));
        $('<li><a class="selected" v="-1">全部</a></li>').appendTo(selectForm);
        getTypeFieldTypeData({
            type:'type',
            name:options['field_data']['custom_type'],
            callback:function(data){
                $(data['data']).each(function(index, el) {
                    $('<li><a v="'+index+'">'+el['name']+'</a></li>').appendTo(selectForm);
                });
                //绑定事件
                selectForm.find('a').bind('click',function(){
                    selectForm.find('.selected').removeClass('selected');
                    $(this).addClass('selected');
                    if($(this).attr('v') == '-1'){
                        delete modValue.options['search'][options['field_data']['name']];
                    }else {
                        modValue.options['search'][options['field_data']['name']] = parseInt($(this).attr('v'));
                    }
                });
            }
        });        

        return form;
    }

    /**
     * 构建输入框
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function buildSearchFormInput(options){
        var form = $('<dl class="search-item '+options['field_data']['name']+'"><dt>'+options['field_data']['alias']+'</dt><dd></dd></dl>');
        var inputForm = $('<input class="input" id="'+options['field_data']['name']+'" type="text" />');
        inputForm.appendTo(form.find('dd'));
        inputForm.bind('change',function(){
            if($.trim($(this).val()).length == 0){
                delete modValue.options['search'][options['field_data']['name']];
            }else {
                modValue.options['search'][options['field_data']['name']] = $(this).val();
            }
        });
        return form;
    }

    /**
     * 构建日期选择
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function buildSearchFormTime(options){
        var form = $('<dl class="search-item '+options['field_data']['name']+'"><dt>'+options['field_data']['alias']+'</dt><dd></dd></dl>');
        var inputForm = $('<input readonly="readonly" class="input time-input" id="'+options['field_data']['name']+'" type="text" />');
        var btnClean = $('<span class="timepicker-clean">X</span>');
        var datePicker = $('<button class="btn btn2">选择</button>');
        inputForm.appendTo(form.find('dd'));
        btnClean.appendTo(form.find('dd'));
        datePicker.appendTo(form.find('dd'));

        btnClean.bind('click',function(){
            delete modValue.options['search'][(options['field_data']['name']+'_start')];
            delete modValue.options['search'][(options['field_data']['name']+'_end')];
            inputForm.val('');
            $(this).hide();
        });

        datePicker.bind('click',function(evt){
            evt.stopPropagation();
            inputForm.dateRangePicker({
                showShortcuts: false,
                format: 'YYYY/MM/DD',
                autoClose: true,
                separator: ' 至 '
            }).one('datepicker-change', function(evt, obj) {
                modValue.options['search'][(options['field_data']['name']+'_start')] = moment(obj.date1).unix()*1000;
                modValue.options['search'][(options['field_data']['name']+'_end')] = moment(obj.date2).unix()*1000;
                inputForm.val(obj.value);
                btnClean.show();
            }).one('datepicker-closed',function(){
                $(inputForm).data('dateRangePicker').destroy();
            });
            inputForm.data('dateRangePicker').open();
        });

        return form;
    }

    function getTypeFieldTypeData(options){
        ONEMAP.V.loading.load();
        var ajaxData = {};
        $.ajax({
            url: onemapUrlConfig.gcmsServiceUrl+'/'+options['type']+'/'+options['name']+'?ticket='+ONEMAP.D.user.ticket,
            type:"GET",
            dataType: 'json'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            if(data.code == 4){
                ONEMAP.T.noPermission('getTypeFieldData');
            }
            if(data.code == 3){
                ONEMAP.T.logout('getTypeFieldData');
            }
            options.callback(data['data']);
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        }); 
    }

    /**
     * 填充内容列表
     */
    function setArticlesList(){
        $('#gcmsArticlesList').empty();

        var ul = $('<ul class="gcms-article-list"></ul>');
        $(ONEMAP.D.gcmsCurColumnListData['data']).each(function(index, el) {
            var li = $('<li>'+el['list_html']+'</li>');
            li.appendTo(ul);

            li.bind('click',function(){
                $(this).addClass('cur');
                $(this).siblings().removeClass('cur');

            });

            //如果有map_center字段 显示地图标记
            if(ONEMAP.D.gcmsCurColumnModelData['show_coordinate'].length>0 && 
                el['record'].hasOwnProperty('map_center_lat') && 
                el['record'].hasOwnProperty('map_center_lon') &&
                el['record'].hasOwnProperty('map_center_zoom') &&
                el['record'].hasOwnProperty('map_center_style')){
                var iconStyle = ONEMAP.D.gcmsCurColumnModelData['show_coordinate'][el['record']['map_center_style']];
               
                var markerId = map23DControl.marker({
                    action:'add',
                    groupId:modValue.markersGroupGuid,
                    geojson:{
                        "type": "Feature",
                        "properties": {
                            title:'',
                            iconUrl: onemapUrlConfig.gcmsServiceUrl+'/file'+iconStyle['icon']+'?ticket='+ONEMAP.D.user.ticket,
                            iconSize: [iconStyle['width'], iconStyle['height']],
                            iconAnchor: [iconStyle['width']/2, iconStyle['height']/2],
                            popupAnchor:[0, -iconStyle['height']/2],
                            altitude:0,
                            altitudeMode:1,
                            popupContent:el['prompt_html']||''
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [el['record']['map_center_lon'],el['record']['map_center_lat']]
                        }
                    }
                })

                modValue.markerObj[el['id']] = markerId;
            }
        }); 
        if(ONEMAP.D.gcmsCurColumnListData['data'].length == 0){
            var li = $('<li class="cell t-c">暂无数据</li>');
            li.appendTo(ul)
        }
        ul.appendTo($('#gcmsArticlesList'));   
        $('#gcmsListContent').mCustomScrollbar("update");
        //分页
        if(ONEMAP.D.gcmsCurColumnListData['data'].length>0){
            $('#gcmsArticlesListPage').empty().append(buildPagination());
        }else {
            $('#gcmsArticlesListPage').empty();
        }     
    }

    /**
     * 界面布局重置
     * @type {Function}
     */
    function layoutResize(){
        $('#gcmsListContent').css({height:$(window).height()-170-modValue.searchPanelHeight});   
        $('#gcmsListContent').mCustomScrollbar("update");     
    }

    /**
     * 构建分页  
     * @return {[type]}         [description]
     */
    function buildPagination(){        
        var phtml = $('<div class="count">'+
                            '<span>第</span>'+
                            '<input class="page_num input input-small jump-page" type="text">'+
                            '<span>/<span class="count-num"></span>页</span>'+
                        '</div>'+
                        '<div class="btn-group">'+
                            '<button type="button" class="btn btn2 btn-small prev abtn-prev" pid="2" title="上一页">上一页</button>'+
                            '<button type="button" class="btn btn2 btn-small next abtn-next" pid="4" title="下一页">下一页</button>'+
                        '</div>');
        var abtnPrev = phtml.find('.abtn-prev');
        var abtnNext = phtml.find('.abtn-next');
        var pageJumpInput = phtml.find('.jump-page');
        var pageCount = phtml.find('.count-num');
        var countPage = parseInt( modValue.options['page']['total']%modValue.options['page']['page_size']>0?(modValue.options['page']['total']/modValue.options['page']['page_size']+1):(modValue.options['page']['total']/modValue.options['page']['page_size']) );
        pageJumpInput.val(modValue.options['page']['page']);
        pageCount.html(countPage);
        if(modValue.options['page']['page'] == 1){
            abtnPrev.remove();
        }
        if(modValue.options['page']['page'] == countPage){
            abtnNext.remove();
        }
        if(countPage == 1){
            pageJumpInput.attr('readonly','readonly');
        }
        abtnPrev.bind('click',function(){
            modValue.options['page']['page'] -= 1;
            getColumnData();
        });
        abtnNext.bind('click',function(){
            modValue.options['page']['page'] += 1;
            getColumnData();
        });
        pageJumpInput.bind('keydown',function(e){
            if (e.keyCode === 13) {
                var jumpNum = pageJumpInput.val();
                //验证是否是有效数字
                var re = /^[+-]?\d*$/;
                if(!re.test(jumpNum)){
                    ONEMAP.C.publisher.publish({ type: 'warning', message: '页面格式为数字' }, 'noteBar::add');
                    pageJumpInput.val(modValue.options['page']['page']);
                    return false;
                } 
                if(jumpNum<0||jumpNum>countPage){
                    ONEMAP.C.publisher.publish({ type: 'warning', message: '页码输入超出范围' }, 'noteBar::add');
                    pageJumpInput.val(modValue.options['page']['page']);
                    return false;
                }
                modValue.options['page']['page'] = parseInt(jumpNum);
                getColumnData();                
            }            
        });
        return phtml;
    }



    function getMarkerObj(){
        return modValue.markerObj;
    }
    
    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe(){
        ONEMAP.C.publisher.subscribe(remove, 'cleanMap');
    }

    /**
     * 取消监听
     * @type {Function}
     */
    function unSubscribe() {}

	/**
	 * 模块移除
	 * @return {[type]} [description]
	 */
	function remove(){
		unSubscribe();
        $('#gcmsListWrap').remove();
        map23DControl.group({
            action:'cleanAll',
            guid:modValue.markersGroupGuid
        });
        map23DControl.group({
            action:'remove',
            guid:modValue.markersGroupGuid
        })
	}

    return ONEMAP.M.gcmsList = {
        init:init,
        remove:remove,
        getMarkerObj:getMarkerObj
    }
});

