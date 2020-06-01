
;(function () {
    var UDCAPTURE_NEWVERSION = "2.0.1"; //当前最新的控件版本号
    var UDCAPTURE_LICENSE = ""; //注册授权许可号
    
    //安装文件 
    var UDCAPTURE_SETUP_32 = "/soft/udcapture/UdCapture.msi?" + UDCAPTURE_NEWVERSION;
    var UDCAPTURE_SETUP_64 = "/soft/udcapture/UdCapture64.msi?" + UDCAPTURE_NEWVERSION;
    var UDCAPTURE_SETUP_CRX = "/soft/udcapture/UdCaptureCrx.msi?" + UDCAPTURE_NEWVERSION; 
                
    var supportActiveX = (window.ActiveXObject !== undefined); //是否支持ActiveX,IE   
    
    function UdCapture(options) {
		var that = this;

        //that.el = typeof el == 'object' ? el : document.getElementById(el);
        that.options = options || {};    

        //设置默认属性    
        that.IsReady = false;
        if(that.options.AutoMinimize) 
            that.AutoMinimize = that.options.AutoMinimize;
        else
            that.AutoMinimize = false;
            
        if(that.options.License)
            that.License = that.options.License;
        else
            that.License = UDCAPTURE_LICENSE;            
            
        if(that.options.FileField) that.FileField = that.options.FileField;  
        if(that.options.FileName) that.FileName = that.options.FileName;   
        if(that.options.TipInfo) that.TipInfo = that.options.TipInfo;     
                
        if(!that.options.OnClick){
            that.options.OnClick = function(){
                that.startCapture();
            };
        }
        //if(that.el.attachEvent)
        //    that.el.attachEvent('onclick', that.options.OnClick);
        //else
        //    that.el.addEventListener("click", that.options.OnClick, false);   

        that.Init();
    }


    UdCapture.prototype = {
        IsReady:false,
        Init:function(){
            var that = this;
            if (supportActiveX) {//if IE               
                var ctlObj = document.getElementById("udCaptureCtl");        
                if(ctlObj == null){
                    ctlObj = document.createElement("object");
                    ctlObj.id = "udCaptureCtl";                
                    ctlObj.setAttribute("classid","CLSID:0FAE7655-0200-4DEE-9620-CD7ED969B3F2");
                    ctlObj.setAttribute("width",0);
                    ctlObj.setAttribute("height",0);
                    document.body.appendChild(ctlObj); 
                }
                if (typeof ctlObj.IsReady == "undefined")
                    return;                   
                else{                    
                    if(that.options.OnCaptureCanceled) _addEvent(ctlObj, "OnCaptureCanceled", _onCaptureCanceled);            
                    if(that.options.OnCaptureCompleted) _addEvent(ctlObj, "OnCaptureCompleted", _onCaptureCompleted);    
                    if(that.options.OnUploadCompleted) _addEvent(ctlObj, "OnUploadCompleted", _onUploadCompleted);            
                    if(that.options.OnUploadFailed) _addEvent(ctlObj, "OnUploadFailed", _onUploadFailed);
                    that._udCapCtl = ctlObj;                    
                    that._version = ctlObj.GetVersion();
                }
            }    
            else if(_neetCrx()){
                if(document.getElementById("UdCaptureCrx") == null)
                    return;
                else{
                    that._udCapCtl = new UdCaptureCrx();                    
                    that._version = that._udCapCtl.GetVersion();
                }
            }else{
                if(navigator.plugins)
                    navigator.plugins.refresh(false);   
                var udCaptureMimeType = "application/udcapture-plugin"
                var plugin = (navigator.mimeTypes && navigator.mimeTypes[udCaptureMimeType]) ? navigator.mimeTypes[udCaptureMimeType].enabledPlugin : 0;
                if (plugin) {
                    var pluginVersion = "v1.0.0";
                    var words = plugin.description.split(" ");
                    if (words[words.length - 1].substring(0, 1) == "v")
                        pluginVersion = words[words.length - 1];                        
                    if (pluginVersion.substring(0, 1) == 'v')
                        pluginVersion = pluginVersion.substring(1, pluginVersion.length);
                    that._version = pluginVersion;
                }
                var ctlObj = document.getElementById("udCapturePlugin");        
                if(ctlObj == null){
                    ctlObj = document.createElement("embed");
                    ctlObj.id = "udCapturePlugin";                
                    ctlObj.setAttribute("type",udCaptureMimeType);
                    ctlObj.setAttribute("width",0);
                    ctlObj.setAttribute("height",0);
                    document.body.appendChild(ctlObj); 
                }
                if (typeof ctlObj.IsReady == "undefined"){
                    return;                   
                }
                else{
                    if(that.options.OnCaptureCanceled) ctlObj.OnCaptureCanceled ="_onCaptureCanceled";                      
                    if(that.options.OnCaptureCompleted) ctlObj.OnCaptureCompleted ="_onCaptureCompleted"; 
                    if(that.options.OnUploadCompleted) ctlObj.OnUploadCompleted ="_onUploadCompleted";         
                    if(that.options.OnUploadFailed) ctlObj.OnUploadFailed ="_onUploadFailed";
                    that._udCapCtl = ctlObj;       
                    that._version = ctlObj.GetVersion();       
                }
            }         
            that.IsReady = true; 
            _udCapLib = that;
        },
        StopCapture:function(){        
            this._udCapCtl.StopCapture();
            $('#toolsBar .tools-mapshot').removeClass('cur');
        },
        StartCapture:function(){    
            var that = this;            
            if (that.InstallCheck()) {
                that._udCapCtl.StartCapture();
            }
        },
        Capture:function(){    
            var that = this;            
            if (that.InstallCheck()) {
                that._udCapCtl.Capture();
            }
        },
        CaptureScreen:function(){        
            var that = this;
            if (that.InstallCheck()) {
                that._udCapCtl.CaptureScreen();
            }
        },
        CaptureWindow:function(n){           
            var that = this;
            if (that.InstallCheck()) {
                that._udCapCtl.CaptureWindow(n);
            }
        },
        CaptureRect:function(left,top,width,height){                 
            var that = this;
            if (that.InstallCheck()) {
                that._udCapCtl.CaptureRect(left,top,width,height);
            }
        },
        GetVersion:function(){
            return this._version;
        },
        GetImageData:function(){
            return this._udCapCtl.GetImageData();
        },
        Upload:function(url,params){
            this._udCapCtl.Upload(url,params);
        },
        //检查是否安装了插件
        InstallCheck: function() {
            var that = this;
            if (!that._udCapCtl)  
                that.Init();
            if(!that._udCapCtl){
                if (confirm("您尚未安装屏幕截图控件，是否现在进行安装？\r\n安装完成后请重新刷新浏览器。")) {
                    that.StartSetup();
                    that.Destory(); 
                }
                return false;
            }
            else if(_checkNewVersion(that._version)){
                if (confirm("屏幕截图控件有新版本v" + UDCAPTURE_NEWVERSION + "，需要升级后才能使用。\r\n是否现在进行升级？")) {
                    that.StartSetup();
                    that.Destory();
                }
                return false;
            }            
            that._udCapCtl.AutoMinimize = that.AutoMinimize;  
            if(that.License) that._udCapCtl.License = that.License;
            if(that.PostUrl) that._udCapCtl.PostUrl = that.PostUrl;  
            if(that.FileField) that._udCapCtl.FileField = that.FileField;  
            if(that.FileName) that._udCapCtl.FileName = that.FileName;  
            if(that.PostParams) that._udCapCtl.PostParams = that.PostParams;  
            if(that.TipInfo) that._udCapCtl.TipInfo = that.TipInfo;     
            that._udCapCtl.WebCodePage = that.WebCodePage;  
            that._udCapCtl.IsUtf8Url = that.IsUtf8Url; 
            that._udCapCtl.IsUtf8Data = that.IsUtf8Data;              
            if(that.options.OnBeforeCapture) that.options.OnBeforeCapture.call(that);
            return true;
        },        
        //下载安装文件进行安装
        StartSetup: function(){ 
            var iframe = document.getElementById("udCaptureSetupFrame");
            if(iframe == null){
                iframe = document.createElement("iframe");
                iframe.id = "udCaptureSetupFrame";            
                iframe.style.display = "none";
                document.body.appendChild(iframe);
            }    
            var setupFile = UDCAPTURE_SETUP_32;
            if (supportActiveX && (window.navigator.platform == "Win64" || window.navigator.cpuClass == "x64"))//64位IE浏览器安装文件
                setupFile = UDCAPTURE_SETUP_64
            if(_neetCrx())
                setupFile = UDCAPTURE_SETUP_CRX
            iframe.setAttribute("src",setupFile);
            
            if(this.options.OnStartSetup)this.options.OnStartSetup.call(this,setupFile);
        },
        Destory:function(){
            var that = this;
            if(that._udCapCtl){
                document.body.removeChild(that._udCapCtl);
                that._udCapCtl = null;
            }
            that.IsReady = false;
        }
    }

    //IE事件注册
    function _addEvent(element, type, handler) {   
        if (element.attachEvent) {
            element.attachEvent(type, handler);
        } else {
            _attachIE11Event(element, type, handler);
        }
    };
    //单独处理IE11的事件
    function _attachIE11Event(obj, eventId, _functionCallback) {
        var nameFromToStringRegex = /^function\s?([^\s(]*)/;
        var paramsFromToStringRegex = /\(\)|\(.+\)/;
        var params = _functionCallback.toString().match(paramsFromToStringRegex)[0];
        var functionName = _functionCallback.name || _functionCallback.toString().match(nameFromToStringRegex)[1];
        var handler = document.createElement("script");
        handler.setAttribute("for", obj.id);
        handler.event = eventId + params;
        handler.appendChild(document.createTextNode(functionName + params + ";"));
        document.body.appendChild(handler);
    };
    //检查是否有新版本
    function _checkNewVersion(instVer){
        var newVer = UDCAPTURE_NEWVERSION.split(".");
        var curVer = instVer.split(".");
        if (parseInt(newVer[0]) > parseInt(curVer[0]))
            return true;
        if (parseInt(newVer[0]) == parseInt(curVer[0]) && parseInt(newVer[1]) > parseInt(curVer[1]))
            return true;
        if (parseInt(newVer[0]) == parseInt(curVer[0]) && parseInt(newVer[1]) == parseInt(curVer[1])
                 && parseInt(newVer[2]) > parseInt(curVer[2]))
            return true;            
        return false;
    };
    //判断是否需要Crx安装    
    function _neetCrx(){ 
        var agent = window.navigator.userAgent.toLowerCase();            
        var isQQBrowser = agent.indexOf("qqbrowser") != -1;
        if(isQQBrowser)
            return false;

        var isChrome = agent.indexOf("chrome") != -1;
        if(isChrome) {
            if(chrome&&chrome.runtime){ 
                var gsChromeVer=""+(/chrome\/((\d|\.)+)/i.test(agent)&&RegExp["$1"]);
                if(gsChromeVer != "false"){
                    var mainVer = parseInt(gsChromeVer);
                    if(mainVer>41)
                        return true;
                }
            }
        }
        return false;
    };

    //Crx插件处理类
    function UdCaptureCrx(){
        var _imageData = "";
        document.addEventListener('UdCaptureEventCallBack', function(evt) { 
            if(evt.detail.EventName == "OnCaptureCanceled")_onCaptureCanceled();
            else if(evt.detail.EventName == "OnCaptureCompleted"){
                _imageData = evt.detail.arg2;
                _onCaptureCompleted(evt.detail.arg1,_imageData);
            }
            else if(evt.detail.EventName == "OnUploadCompleted")_onUploadCompleted(evt.detail.arg1);
            else if(evt.detail.EventName == "OnUploadFailed")_onUploadFailed();
	    });
        this.PageUrl = location.href;
        this.WinName = document.title + " - Google Chrome";
        
        this.GetVersion = function(){
            return document.getElementById("UdCaptureCrx").getAttribute("version");
        };
        this.GetImageData = function(){
            return _imageData;
        };
        this.ExecCommand = function(){
            var that = this;
            var json = JSON.stringify(that);
            var evt = document.createEvent("CustomEvent");  
            evt.initCustomEvent('UdCaptureEvent', true, false, json);  
            document.dispatchEvent(evt);  
        };
        this.StopCapture = function(){
            this.Command = "StopCapture";
            this.ExecCommand();
        };
        this.StartCapture = function(){
            this.Command = "StartCapture";
            this.ExecCommand();
        };
        this.Capture = function(){
            this.Command = "Capture";
            this.ExecCommand();
        };
        this.CaptureScreen = function(){
            this.Command = "CaptureScreen";
            this.ExecCommand();
        };
        this.CaptureWindow = function(n){
            this.Command = "CaptureWindow";
            if(typeof(n) != "undefined");
                this.CaptureWinIndex = n;
            this.ExecCommand();
        };
        this.CaptureRect = function(left,top,width,height){
            this.Command = "CaptureRect";
            this.CaptureLeft = left;
            this.CaptureTop = top;
            this.CaptureWidth = width;
            this.CaptureHeight = height;
            this.ExecCommand();
        };
        this.Upload = function(url,params){
            this.Command = "Upload";
            this.PostUrl = url;
            this.PostParams = params;
            this.ExecCommand();
        };
    }
    
    /**
    * Factory method for creating a UdCapture object
    *
    * @param {Element} The el to listen on
    * @param {Object} [options={}] The options to override the defaults
    */
    UdCapture.Attach = function (el, options) {
        return new UdCapture(el, options);
    };


    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () {
            return UdCapture;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = UdCapture.Attach;
        module.exports.UdCapture = UdCapture;
    } else {
        window.UdCapture = UdCapture;
    }
}());

//NPAPI的事件处理
var _udCapLib

function _onCaptureCanceled(){
    if(_udCapLib.options.OnCaptureCanceled)
        _udCapLib.options.OnCaptureCanceled.call(_udCapLib);
}
function _onCaptureCompleted(file){
    if(_udCapLib.options.OnCaptureCompleted){
        var imgData = _udCapLib.GetImageData();
        _udCapLib.options.OnCaptureCompleted.call(_udCapLib,file,imgData);
    }
}
function _onUploadCompleted(responseText){
    if(_udCapLib.options.OnUploadCompleted)
        _udCapLib.options.OnUploadCompleted.call(_udCapLib,responseText);
}
function _onUploadFailed(){
    if(_udCapLib.options.OnUploadFailed)
        _udCapLib.options.OnUploadFailed.call(_udCapLib);
}