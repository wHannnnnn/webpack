define(['html!templates/tools/toolJumpToLatlng',
        'modDir/service/poiSearch',
        'css!styles/tools/toolJumpToLatlng'],
    function(tplLayout,poiSearchF){

    	/**
    	 * 模块状态，用于存储模块的状态 例如：收起，关闭
    	 * @type {Object}
    	 */
    	var status = {
    		initialized:false//是否初始化
    	};
    	/**
    	 * 模块数据 用于数据存储和外部调用
    	 * @type {Object}
    	 * 数据存放
    	 */
    	var modValue = {
    		InputType:1,//查询方式
    		jumpLatLng:{//查询默认参数
    			lat:0,
    			lng:0,
    			zoom:1
    		},
    		marker:null,//图标
    		jumpObj:{}//收藏数据
    	};
    	/**
    	 * 初始化并订阅事件
    	 * @return {[type]} [description]
    	 */
    	function init(){
    		if(!status.initialized){
                setLayout();
    			bindEvent();
                subscribe();
    			status.initialized = true;
    		}
            $('#jumpToZoom').val(map23DData.view.zoom);
            $("#jumpToLatlngForm .input").val('0');
            $("#jumpToLatlngModal").show();
            $("#jumpToLatlngModal #lngD").val("");
            $("#jumpToLatlngModal #lngD").focus();
            ONEMAP.C.publisher.publish({
                modName:'toolJumpToLatlng'
            },'tools:active');
    	};
        function setLayout(){
            $('body').append(tplLayout);
        };
    	/**
    	 * 注册监听
    	 * @type {Function}
    	 */
    	function subscribe(){
    		ONEMAP.C.publisher.subscribe(clearMarker,'cleanMap');
            ONEMAP.C.publisher.subscribe(remove, 'tools:active');
    	};
        /**
         * 关闭模块
         * @return {[type]} [description]
         */
        function remove(options){
            if(options.modName != 'toolJumpToLatlng'){
                removeCurClass();
            }else{
                if($('.tools-toolJumpToLatlng').hasClass('cur')){
                    removeCurClass();
                }else{
                    $('.tools-toolJumpToLatlng').addClass('cur');
                }
            }
        }
    	/**
    	 * 工具栏状态控制
    	 */
    	function removeCurClass(options){
            $('#toolsBar .tools-toolJumpToLatlng').removeClass('cur');
            $("#jumpToLatlngModal").hide();
    	};
    	/**
    	 * 获取并计算经纬度
    	 * @private
    	 */
    	function getLatLng(){
    		if(modValue.InputType === 1){
    		    modValue.jumpLatLng.lng = L.Util.HMStoLatLng(
    		        $('#jumpToLatlngForm dt .lng').attr('v'),
    		        ($('#lngD').val()?$('#lngD').val():0),
    		        ($('#lngF').val()?$('#lngF').val():0),
    		        ($('#lngM').val()?$('#lngM').val():0)
    		    );
    		    modValue.jumpLatLng.lat = L.Util.HMStoLatLng(
    		        $('#jumpToLatlngForm dt .lat').attr('v'),
    		        ($('#latD').val()?$('#latD').val():0),
    		        ($('#latF').val()?$('#latF').val():0),
    		        ($('#latM').val()?$('#latM').val():0)
    		    );
    		}else if(modValue.InputType === 2){
                var lng = parseFloat($('#jumpToLngInput').val()?$('#jumpToLngInput').val():0);
                var lat = parseFloat($('#jumpToLatInput').val()?$('#jumpToLatInput').val():0);
                if($('#jumpToLatlngForm dt .lat').attr('v') === 's'){
                    lat = -1 * lat;
                }
                if($('#jumpToLatlngForm dt .lng').attr('v') === 'w'){
                    lng = -1 * lng;
                }
                modValue.jumpLatLng.lat = lat;
                modValue.jumpLatLng.lng = lng;
            }
            modValue.jumpLatLng.zoom = parseInt($('#jumpToZoom').val());
    		jumpTo()
    	};
    	/**
    	 * 清除marker
    	 * @return {[type]} [description]
    	 */
    	function clearMarker(){
    		var key=modValue.marker;
    		map23DControl.marker({
    		    action: 'remove',
    		    guid: key
    		})
    	}
    	/**
    	 * 获取输入信息并跳转到指定的坐标
    	 * @type {Function}
    	 * @private
    	 */
    	function jumpTo(){
    		if(!L.Util.verifyLatLng(modValue.jumpLatLng.lat,modValue.jumpLatLng.lng)){
    		    alert('请正确输入经纬范围（经度0-180、纬度0-90）');
    		    return false;
    		}
    		clearMarker();
            if(map23DData.display.map2D){
                map2DViewer.setView({
                    center:{
                        lat:modValue.jumpLatLng.lat,
                        lng:modValue.jumpLatLng.lng
                    },
                    zoom:modValue.jumpLatLng.zoom
                });
            }else if(map23DData.display.map3D){
                map3DViewer.setView({
                    center:{
                        lat:modValue.jumpLatLng.lat,
                        lng:modValue.jumpLatLng.lng
                    },
                    zoom:modValue.jumpLatLng.zoom
                });
            }
    		$("#jumpToLatlngModal").hide();
            removeCurClass();
    		ONEMAP.V.loading.load();
    	};
    	//设为目标
    	function setPoint(){
    		_setDirectionsPoint(modValue.jumpObj.latlng[0],modValue.jumpObj.latlng[1],'start',modValue.jumpObj.name);
    	};
    	//设为起点
    	function setStart(){
    		_setDirectionsPoint(modValue.jumpObj.latlng[0],modValue.jumpObj.latlng[1],'start',modValue.jumpObj.name);
    	};
    	//途经点
    	function setAcross(){
    		_setDirectionsPoint(modValue.jumpObj.latlng[0],modValue.jumpObj.latlng[1],'start',modValue.jumpObj.name);
    	};
    	//规避点
    	function setAvoid(){
    		_setDirectionsPoint(modValue.jumpObj.latlng[0],modValue.jumpObj.latlng[1],'start',modValue.jumpObj.name);
    	};
    	//终点
    	function setStop(){
    		_setDirectionsPoint(modValue.jumpObj.latlng[0],modValue.jumpObj.latlng[1],'start',modValue.jumpObj.name);
    	};
    	function _setDirectionsPoint(_lat,_lng,_type,_name){
    		    switch (_type){
    		        case "start":
    		            if (ONEMAP.M.directions) {
    		                ONEMAP.M.directions.setStartPoint(new L.LatLng(_lat,_lng),_name);
    		            } else {
    		                require(['mod/directions'], function (directions) {
    		                    directions.init();
    		                    directions.setStartPoint(new L.LatLng(_lat,_lng),_name);
    		                });
    		            }
    		            break;
    		        case "across":
    		            if (ONEMAP.M.directions) {
    		                ONEMAP.M.directions.setAcrossPoint(new L.LatLng(_lat,_lng),_name);
    		            } else {
    		                require(['mod/directions'], function (directions) {
    		                    directions.init();
    		                    directions.setAcrossPoint(new L.LatLng(_lat,_lng),_name);
    		                });
    		            }
    		            break;

    		        case "avoid":
    		            if (ONEMAP.M.directions) {
    		                ONEMAP.M.directions.setAvoidPoint(new L.LatLng(_lat,_lng),_name);
    		            } else {
    		                require(['mod/directions'], function (directions) {
    		                    directions.init();
    		                    directions.setAvoidPoint(new L.LatLng(_lat,_lng),_name);
    		                });
    		            }
    		            break;
    		        case "stop":
    		            if (ONEMAP.M.directions) {
    		                ONEMAP.M.directions.setStopPoint(new L.LatLng(_lat,_lng),_name);
    		            } else {
    		                require(['mod/directions'], function (directions) {
    		                    directions.init();
    		                    directions.setStopPoint(new L.LatLng(_lat,_lng),_name);
    		                });
    		            }
    		            break;
    		    }
    	};
    	//
    	/**
    	 * 事件绑定
    	 */
    	function bindEvent(){
    		$("#jumpToLatlngForm .input").bind('click',function(){
    		    $(this).val('');
    		});
    		$("#jumpToLatlngModal .btn.close").bind('click',function(){
    		    removeCurClass();
    		});
    		$("#jumpToLatlngModal .btn-default.sure").bind('click',function(){
    		    getLatLng();
    		    //removeCurClass();
    		});
    		//回车执行
    		$('#jumpToLngInput, #jumpToLatInput').bind('keydown', function (e) {
    		    if (e.keyCode === 13) {
    		        getLatLng();
    		        //removeCurClass();
    		    }
    		});

    		$('#jumpToLatlngForm dt .lng').bind('click',function(){
    		    if($(this).attr('v') === 'e'){
    		        $(this).attr('v','w');
    		        $(this).html('西经');
    		    }else {
    		        $(this).attr('v','e');
    		        $(this).html('东经');
    		    }
    		});
    		$('#jumpToLatlngForm dt .lat').bind('click',function(){
    		    if($(this).attr('v') === 'n'){
    		        $(this).attr('v','s');
    		        $(this).html('南纬');
    		    }else {
    		        $(this).attr('v','n');
    		        $(this).html('北纬');
    		    }
    		});

    		$('#jumpToLatlngInputType').bind('click',function(){
    		    if(modValue.InputType === 1){
    		        $('#jumpToLatlngForm').removeClass().addClass('type-2');
    		        $(this).html('度分秒');
    		        modValue.InputType = 2;
    		    }else if(modValue.InputType === 2){
    		        $('#jumpToLatlngForm').removeClass().addClass('type-1');
    		        $(this).html('十进制');
    		        modValue.InputType = 1;
    		    }
    		});
    	};
    return ONEMAP.M.toolJumpToLatlng = {
        init:init,
        setStop:setStop,
        setAvoid:setAvoid,
        setAcross:setAcross,
        setStart:setStart,
        setStop:setStop,
        setPoint:setPoint,
        clearMarker:clearMarker 
    };
})