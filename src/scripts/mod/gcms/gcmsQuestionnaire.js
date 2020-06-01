/**
 * [ONEMAP.M.gcmsQuestionnaire]
 * @return {[object]}
 */
define(['handlebars','css!cssDir/mod-gcms','jquery/jquery.drag'],
function(Handlebars){
    //参数
    var _options = {};

    //地图层
    var _map = ONEMAP.M.mapHolder.map;
    var _questionnaireListData = [];
    var _questionnaireDetailData;

    var _tpl = '<div id="gcmsQuestionnaireViewer" class="modal">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="btn btn1 close">×</button>'+
                        '<h3>问卷列表</h3>'+
                    '</div>'+
                    '<div class="modal-body" style="height:100%">'+
                        '<ul id="gcmsQuestionnaireViewerList"></ul>'+
                    '</div>'+
                '</div>';
    var _detailTpl = '<div id="gcmsQuestionnaireDetail" class="modal">'+
                        '<div class="modal-header">'+
                            '<button type="button" class="btn btn1 close">×</button>'+
                            '<h3>问卷详情</h3>'+
                        '</div>'+
                        '<div class="modal-body" style="height:100%">'+
                        '<div id="gcmsQuestionnaireDetailBox"></div>'+
                        '</div>'+
                    '</div>';

    /**
     * 模块初始化
     * @return {[type]} [description]
     */
    function init(options){
        remove();
        _options = {};
        _questionnaireListData = [];
        _questionnaireDetailData = null;
        for(var op in options){
            _options[op] = options[op];
        }
        
        getArticleData({callback:function(){
            //设置容器布局
            setQuestionnaireModal();
        }})
                 
        
        //订阅推送
        subscribe();
    }


    function getArticleData(options){
        ONEMAP.V.loading.load();
        $.ajax({
            url: onemapUrlConfig.gcmsServiceUrl+'/show/'+_options['column_name']+'/'+_options['article_id']+'?ticket='+ONEMAP.D.user.ticket,
            type:"GET",
            dataType: 'jsonp'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            if(data.code == 4){
                ONEMAP.T.noPermission('getDetailData');
            }
            if(data.code == 3){
                ONEMAP.T.logout('getDetailData');
            }
            ONEMAP.D.gcmsCurArticleData = data['data'];
            options.callback();
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        }); 
    }

    function getDetailData(options){

        _questionnaireDetailData =  {
            "jibenxinxi": {
                "values": [
                    [
                        {
                            "id": "xuexiaomingcheng",
                            "label": "学校名称",
                            "type": "Text",
                            "value": "北京实验小学"
                        },
                        {
                            "id": "xueduan",
                            "label": "学校学段",
                            "type": "Text",
                            "value": "初级"
                        },
                        {
                            "filename": "9_31.jpg",
                            "size": 0,
                            "id": "logo",
                            "label": "学校校徽/LOGO",
                            "type": "File",
                            "value": "9_31.jpg"
                        }
                    ],
                    [
                        {
                            "id": "xuexiaomingcheng",
                            "label": "学校名称",
                            "type": "Text",
                            "value": "北京清华附小"
                        },
                        {
                            "id": "xueduan",
                            "label": "学校学段",
                            "type": "Text",
                            "value": "初级"
                        },
                        {
                            "filename": "9_46.jpg",
                            "size": 0,
                            "id": "logo",
                            "label": "学校校徽/LOGO",
                            "type": "File",
                            "value": "9_46.jpg"
                        }
                    ]
                ],
                "label": "学校基本信息",
                "type": "Entity"
            },
            "kecheng": {
                "values": [
                    [
                        {
                            "code": "小学一年级",
                            "qualifier": null,
                            "id": "nianji",
                            "label": "年级",
                            "type": "Code",
                            "value": "小学一年级"
                        },
                        {
                            "code": "自然",
                            "qualifier": "学期",
                            "id": "kecheng",
                            "label": "课程",
                            "type": "Code",
                            "value": "其他"
                        },
                        {
                            "id": "beizhu",
                            "label": "备注",
                            "type": "Text",
                            "value": "选修"
                        }
                    ],
                    [
                        {
                            "code": "小学二年级",
                            "qualifier": null,
                            "id": "nianji",
                            "label": "年级",
                            "type": "Code",
                            "value": "小学二年级"
                        },
                        {
                            "code": "数学",
                            "qualifier": null,
                            "id": "kecheng",
                            "label": "课程",
                            "type": "Code",
                            "value": "数学"
                        },
                        {
                            "id": "beizhu",
                            "label": "备注",
                            "type": "Text",
                            "value": "必学"
                        }
                    ]
                ],
                "label": "各年级开设的课程（教材版本）",
                "type": "Entity"
            },
            "beizhu": {
                "id": "beizhu",
                "label": "备注",
                "type": "Text",
                "value": "小学教育调查"
            }
        };

        options.callback();

        // ONEMAP.V.loading.load();
        // $.ajax({
        //     url: onemapUrlConfig.gcmsServiceUrl+'/show/'+_options['column_name']+'/'+_options['article_id']+'?ticket='+ONEMAP.D.user.ticket,
        //     type:"GET",
        //     dataType: 'jsonp'
        // })
        // .done(function(data) {
        //     ONEMAP.V.loading.loaded();
            
        // })
        // .fail(function() {
        //     ONEMAP.V.loading.loaded();
        // }); 
    }

    /**
     * 设置容器
     */
    function setQuestionnaireModal(){
        _questionnaireListData = JSON.parse(ONEMAP.D.gcmsCurColumnModelData['field_list'][_options['field_name']]['custom_value']);
        $('body').append(_tpl); 
        $('body').append(_detailTpl);

        layoutResize();

        $('#gcmsQuestionnaireViewerList').empty();
        $(_questionnaireListData).each(function(index, el) {
            $('#gcmsQuestionnaireViewerList').append('<li><button mid="'+el['id']+'" class="btn">'+el['name']+'</button></li>')
        });

        $('#gcmsQuestionnaireViewerList .btn').bind('click',function(){
            //根据id获取问卷内容列表，根据文章名称筛选出问卷ID，再根据ID获取问卷详情 orz!
            var mid = $(this).attr('mid');
            getDetailData({
                mid:mid,
                article_title:ONEMAP.D.gcmsCurArticleData['record']['gcms_title'],
                callback:function(){
                    showQuestionnaireDetail();
                }
            });
        });

        bindEvent();       
        $('#gcmsQuestionnaireViewer').show();

        
    }

    
    /**
     * 显示问卷详情
     * @return {[type]} [description]
     */
    function showQuestionnaireDetail(){
        $('#gcmsQuestionnaireDetailBox').empty();
        for(var name in _questionnaireDetailData){
            var item = _questionnaireDetailData[name];            
            var func = 'get'+item['type']+'Detail';
            $('#gcmsQuestionnaireDetailBox').append(eval(func+'(item)'));  
        }

        $('#gcmsQuestionnaireDetail').show();
    }

    function getTextDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']);
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getFileDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']);
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getCodeDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']);
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getBooleanDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']);
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getCoordinateDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']);
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getIntegerDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']+'('+data['unit']+')');
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getIntegerRangeDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']+'('+data['unit']+')');
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getRealDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']+'('+data['unit']+')');
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getRealRangeDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']+'('+data['unit']+')');
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getDateDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']);
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getTimeDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']);
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getTaxonDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']);
        tr.find('td:first').html(data['value']);
        tr.appendTo(table.find('tbody'));
        return table;
    }

    function getEntityDetail(data){
        var table = $('<table class="border box-header"><tbody></tbody></table>');
        var tr = $('<tr><th></th><td></td></tr>');
        tr.find('th:first').html(data['label']);
        $(data.values).each(function(index, el) {
            var table_in = $('<table class="border box-header"><tbody></tbody></table>');
            var tr_in = $('<tr><td></td></tr>');
            $(el).each(function(index_in, el_in) {
                var func = 'get'+el_in['type']+'Detail';
                tr_in.find('td:first').append(eval(func+'(el_in)'));
            });
            tr_in.appendTo(table_in.find('tbody'));
            tr.find('td:first').append(table_in);
        });
        tr.appendTo(table.find('tbody'));
        return table;
    }

    /**
     * 事件绑定
     * @return {[type]} [description]
     */
    function bindEvent(){
        $('#gcmsQuestionnaireViewer .modal-header .close').bind('click', function() {
            remove();
        });

        var $box = $('#gcmsQuestionnaireViewer').mousedown(function(e) {
            var offset = $(this).offset();
            
            this.posix = {'x': e.pageX - offset.left, 'y': ((e.pageY - offset.top)>0?(e.pageY - offset.top):0)};
            $.extend(document, {'move': true, 'move_target': this});
        });

        $('#gcmsQuestionnaireViewer .modal-body').on('mousedown',function(e){
            return false;
        });

        $('#gcmsQuestionnaireDetail .modal-header .close').bind('click', function() {
            $('#gcmsQuestionnaireDetail').hide();
        });

        var $box2 = $('#gcmsQuestionnaireDetail').mousedown(function(e) {
            var offset = $(this).offset();
            
            this.posix = {'x': e.pageX - offset.left, 'y': ((e.pageY - offset.top)>0?(e.pageY - offset.top):0)};
            $.extend(document, {'move': true, 'move_target': this});
        });

        $('#gcmsQuestionnaireDetail .modal-body').on('mousedown',function(e){
            return false;
        });
    }    



    /**
     * 界面布局重置
     * @type {Function}
     */
    function layoutResize(){     
        $('#gcmsQuestionnaireDetail .modal-body').css({height:ONEMAP.M.pcLayout.styles.mapHeight-300});   
    }   
    
    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe(){
        ONEMAP.C.publisher.subscribe(layoutResize,'sideBarLayoutChange');
        ONEMAP.C.publisher.subscribe(remove,'gcmsArticleShowRemove');
    }

    /**
     * 取消监听
     * @type {Function}
     */
    function unSubscribe() {
        ONEMAP.C.publisher.unSubscribe(layoutResize,'sideBarLayoutChange');
    }

    /**
     * 模块移除
     * @return {[type]} [description]
     */
    function remove(){
        $('#gcmsQuestionnaireViewer').remove();
        $('#gcmsQuestionnaireDetail').remove();
        _questionnaireListData = [];
        _questionnaireDetailData = null;
        unSubscribe();
    }

    return ONEMAP.M.gcmsQuestionnaire = {
        init:init,
        remove:remove
    }
});

