/**
 * [ONEMAP.M.gcmsAudio]
 * @return {[object]}
 */
define([
    'html!templates/gcms/gcmsAudio',
    'vendorDir/handlebars/handlebars',
    'css!styles/gcms/gcmsAudio'],
function(tpcLayout,Handlebars){
    //参数
    var modValue= {
        options:{}
    };
    /**
     * 模块初始化
     * @return {[type]} [description]
     */
    function init(options){
        modValue.options = {};
        for(var op in options){
            modValue.options[op] = options[op];
        }

        //获取内容数据
        getDetailData({callback:function(){
            showAudio();
        }});
        
        //订阅推送
        subscribe();
    }

    function getDetailData(options){
        ONEMAP.V.loading.load();
        $.ajax({
            url: onemapUrlConfig.gcmsServiceUrl+'/show/'+modValue.options['column_name']+'/'+modValue.options['article_id']+'?ticket='+ONEMAP.D.user.ticket,
            type:"GET",
            dataType: 'json'
        })
        .done(function(data) {
            ONEMAP.V.loading.loaded();
            if(data.code == 4){
                ONEMAP.T.noPermission('getDetailData');
            }
            if(data.code == 3){
                ONEMAP.T.logout('getDetailData');
            }

            if(JSON.parse(data['data']['record'][modValue.options['field_name']]).length == 0){
                ONEMAP.C.publisher.publish({ type: 'success', message: '没有音频数据' }, 'noteBar::add');
                remove();
            }else {
                ONEMAP.D.gcmsCurArticleData = data['data'];
                options.callback();
            }
            
        })
        .fail(function() {
            ONEMAP.V.loading.loaded();
        }); 
    }

    /**
     * 事件绑定
     * @return {[type]} [description]
     */
    function bindEvent(){
        $('#gcmsAudioModal .modal-header .close').bind('click', function() {
            remove();
        });

        $('#gcmsAudioModal .modal-header').dragmove($('#gcmsAudioModal'));
    }

    function showAudio(){
        $('body').append(tpcLayout);
        bindEvent();

        var audioFileUrl = onemapUrlConfig.gcmsServiceUrl+'/file'+JSON.parse(ONEMAP.D.gcmsCurArticleData['record'][modValue.options['field_name']])[0]+'?ticket='+ONEMAP.D.user.ticket;


        if(Modernizr.video.h264.length>0){
            var audioPlayerHtml = '<audio src="'+audioFileUrl+'" width="400" height="80" autoplay controls></audio>';
        }else {
            var flashPlayerInfo = flashChecker();
            
            if (flashPlayerInfo && flashPlayerInfo.v > 10) {
                var audioPlayerHtml = _setFlashPlayer("audioPlayer", "scripts/vendor/player/snplayer.swf?file=type:mp3;url:" + audioFileUrl + "", "100%", "100%", "SkinURL=skin/default.zip", true);
            } else {
                if (document.all) {
                    var flashPlayerLink = onemapUrlConfig.downloadServiceUrl+'/soft/flashplayer11_8r800_94_winax.exe';
                } else {
                    var flashPlayerLink = onemapUrlConfig.downloadServiceUrl+'/soft/flashplayer11_8r800_94_win.exe';
                }
                var audioPlayerHtml = '<div class="install-flash-player" style="text-align:center">' +
                    '<p><strong>请安装Adobe flash player 11以上版本的播放器。</strong></p>' +
                    '<a href="' + flashPlayerLink + '"><img src="images/layout/get_flash.png"/><br/><span>Adobe Flash Player 11</span></a>' +
                    '</div>';
            } 
        }

        $('#gcmsAudioPlayer').empty().append(audioPlayerHtml);
        $('#gcmsAudioModal').show();


        //显示列表
        $('#gcmsAudioList').empty();
        $(JSON.parse(ONEMAP.D.gcmsCurArticleData['record'][modValue.options['field_name']])).each(function(index, el) {
            $('<li><button vUrl="'+onemapUrlConfig.gcmsServiceUrl+'/file'+el+'?ticket='+ONEMAP.D.user.ticket+'" class="btn">音频['+(index+1)+']</button></li>').appendTo($('#gcmsAudioList'));
        });

        $('#gcmsAudioList .btn:eq(0)').addClass('selected');

        $('#gcmsAudioList .btn').bind('click',function(){
            var audioFileUrl = $(this).attr('vUrl');

            if(Modernizr.video.h264.length>0){
                var audioPlayerHtml = '<audio src="'+audioFileUrl+'" width="400" height="80" autoplay controls></audio>';
            }else {
                var flashPlayerInfo = flashChecker();
                
                if (flashPlayerInfo && flashPlayerInfo.v > 10) {
                    var audioPlayerHtml = _setFlashPlayer("audioPlayer", "scripts/vendor/player/snplayer.swf?file=type:mp3;url:" + audioFileUrl + "", "100%", "100%", "SkinURL=skin/default.zip", true);
                } else {
                    if (document.all) {
                        var flashPlayerLink = onemapUrlConfig.downloadServiceUrl+'/soft/flashplayer11_8r800_94_winax.exe';
                    } else {
                        var flashPlayerLink = onemapUrlConfig.downloadServiceUrl+'/soft/flashplayer11_8r800_94_win.exe';
                    }
                    var audioPlayerHtml = '<div class="install-flash-player" style="text-align:center">' +
                        '<p><strong>请安装Adobe flash player 11以上版本的播放器。</strong></p>' +
                        '<a href="' + flashPlayerLink + '"><img src="images/layout/get_flash.png"/><br/><span>Adobe Flash Player 11</span></a>' +
                        '</div>';
                } 
            }

            $('#gcmsAudioPlayer').empty().append(audioPlayerHtml);
            $('#gcmsAudioModal').show();
            $('#gcmsAudioModal .selected').removeClass('selected');
            $(this).addClass('selected');
        });
    }

    function flashChecker(){
        var hasFlash = 0;
        var flashVersion =0;
        try{
            if(document.all){
                var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if(swf){
                    hasFlash = 1;
                    VSwf = swf.GetVariable('$version');
                    flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
                }
            }else {
                if(navigator.plugins && navigator.plugins.length > 0){
                    var swf = navigator.plugins["Shockwave Flash"];
                }
                if(swf){
                    hasFlash = 1;
                    var words = swf.description.split(" ");
                    for(var i=0;i<words.length; i++){
                        if(isNaN(parseInt(words[i]))) continue;
                        flashVersion = parseInt(words[i]);
                    }
                }
            }
        }catch (e) {
        }

        return {
            f:hasFlash,
            v:flashVersion
        };
    }

    /**
     * 添加Flash Player
     * @type {Function}
     * @param id {String} 容器id
     * @param url {String} url
     * @param width {Number} 宽度
     * @param height {Number} 高度
     * @param vars {String} 参数
     * @param transparent {String} 是否透明
     * @returns {string} flash player code
     * @private
     */
    function _setFlashPlayer(id, url, width, height, vars, transparent){        
        $('#DIVSNplayerWMPaudioPlayer').remove();
        var wmode = transparent ? "transparent" : "opaque";
        var html = '';
        html += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
        html += 'width="'+width+'" ';
        html += 'height="'+height+'" ';
        html += 'id="'+id+'"';
        html += '>';
        html += '<param name="movie" value="'+url+'" />';
        html += '<param name="allowFullScreen" value="true" />';
        html += '<param name="allowScriptAccess" value="always" />';
        html += '<param name="quality" value="high" />';
        html += '<param name="wmode" value="'+wmode+'" />';
        html += '<param name="flashvars" value="'+vars+'" />';
        html += '<embed type="application/x-shockwave-flash" ';
        html += 'width="'+width+'" ';
        html += 'height="'+height+'" ';
        html += 'name="'+id+'" ';
        html += 'src="'+url+'" ';
        html += 'allowfullscreen="true" ';
        html += 'allowscriptaccess="always" ';
        html += 'quality="high" ';
        html += 'wmode="'+wmode+'" ';
        html += 'flashvars="'+vars+'"'
        html += '></embed>';
        html += '</object>';
        return html;
    };

    

    /**
     * 界面布局重置
     * @type {Function}
     */
    function layoutResize(){
    }
    
    /**
     * 注册监听
     * @type {Function}
     */
    function subscribe(){
        ONEMAP.C.publisher.subscribe(remove,'gcmsArticleShowRemove');
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
        $('#gcmsAudioModal').remove();
        $('#DIVSNplayerWMPaudioPlayer').remove();
        unSubscribe();
    }

    return ONEMAP.M.gcmsAudio = {
        init:init,
        remove:remove
    }
});

