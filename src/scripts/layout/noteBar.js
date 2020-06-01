/**
 * [ONEMAP.M.noteBar]
 * @return {[object]}
 */
define(['html!templates/noteBar',
    'css!styles/noteBar'
],function(tplLayout){

    var count = 0;
    var timer = {};

    /**
     * 初始化并订阅事件
     * @return {[type]} [description]
     */
    function init(){
        $('body').append(tplLayout);
        subscribe();
    }
    
    /**
     * 构建外壳
     * @return {[type]} [description]
     */
    function buildNoteWrap(){
        return $('<div class="note-bar cover-panel"><iframe frameborder="0" class="cover-iframe"></iframe><div class="cover-content"></div></div>');
    }

    /**
     * 构建关闭按钮
     * @return {[type]} [description]
     */
    function buildNoteBtnClose(){
        return $('<span class="icon icon-remove ibtn-note-bar-close"></span>');
    }

    /**
     * 添加提示
     * @param {[type]} options [description]
     * options.type
     * options.message
     * options.keep
     */
    function add(options){
        var noteId = ++count;
        var wrap = buildNoteWrap();
        wrap.attr('id','noteBar-'+noteId);
        var btnClose = buildNoteBtnClose();
        var content = $('<div class="note-content"></div>');

        if(!options.hasOwnProperty('delayTime')){
            options.delayTime = 3000;
        }

        switch(options.type){
            case 'note':
                content.addClass('background-note');
                $('<span class="icon icon-cogs note-icon"></span>').appendTo(wrap.find('.cover-content'));
            break;
            case 'success':
                content.addClass('background-success');
                $('<span class="icon icon-ok note-icon"></span>').appendTo(wrap.find('.cover-content'));
            break;
            case 'warning':
                content.addClass('background-warning');
                $('<span class="icon icon-warning-sign note-icon"></span>').appendTo(wrap.find('.cover-content'));
            break;
            case 'error':
                content.addClass('background-error');
                $('<span class="icon icon-bell note-icon"></span>').appendTo(wrap.find('.cover-content'));
            break;
        }

        content.append(options.message);

        btnClose.appendTo(wrap.find('.cover-content'));
        content.appendTo(wrap.find('.cover-content'));

        wrap.appendTo($('#noteBar'));
        wrap.fadeIn('fast');

        btnClose.bind('click',{id:noteId},function(e){
            del({'id':e.data.id});
        });

        if(!options.keep){
            timer[noteId] = setTimeout(function(){
                del({'id':noteId});
            },options.delayTime);
        }

        return noteId;
    }

    /**
     * 删除提示
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function del(options){
        $('#noteBar-'+options.id).fadeOut(100,function(){
            $('#noteBar-'+options.id).remove();
            if(timer.hasOwnProperty(options.id)){
                clearTimeout(timer[options.id]);
            }
        });
    }

    /**
     * 清除所有提示
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function clean(){
        timer = {};
        count = 0;
        $('#noteBar').empty();
    }

    /**
     * 注册监听
     * @type {Function}
     * ONEMAP.C.publisher.publish(options,'noteBar::type');
     */
    function subscribe(){
        ONEMAP.C.publisher.subscribe(add,'noteBar::add');
        ONEMAP.C.publisher.subscribe(del,'noteBar::del');
        ONEMAP.C.publisher.subscribe(clean,'noteBar::clean');
    }

    init();

    return ONEMAP.M.noteBar = {
        add:add,
        del:del,
        clean:clean
    }
});