define(['html!templates/3dEarth',
		'css!styles/3dEarth'],
function(tpcLayout){
	/**
     * 状态值
     * @type {Boolean}
     * @default false
     * @private
     */
    var status = {
    	initialized:false,//是否初始化
    	isOpenSetting:false,//是否打开设置框
        Sun3D:false
    };
    /**
     * 模块数据 用于数据存储和外部调用
     * @type {Object}
     * 数据存放
     */
    var modValue = {
    	model3D:false,//3D建筑模型
    	photography:false,//倾斜摄影模型
    };
    /**
     * 3维地球初始化
     */
    function init(){
    	if(!status.initialized){
    		setLayout();
    		bindEvent();
            subscribe();
            locaSpaceMap.attachEvent('FireCameraBeginMove',function(){
                if(map23DData.view.zoom <= 3){
                    if(!status.Sun3D){
                        locaSpaceMap.Globe.SunVisible = true;
                        locaSpaceMap.Refresh()
                        status.Sun3D = true;
                    }
                }else if(map23DData.view.zoom > 3){
                    //if(status.Sun3D){
                        locaSpaceMap.Globe.SunVisible = false;
                        locaSpaceMap.Refresh()
                        status.Sun3D = false;
                    //}
                }
            })
    	}
    	status.initialized = true;
    };
    /**
     * 注册监听
     */
    function subscribe(){
        ONEMAP.C.publisher.subscribe(clear3DMap, 'cleanMap');
    };

    function setLayout(){
    	$(tpcLayout).appendTo($("#map3DWrap"));
    }; 
    function bindEvent(){
    	$("#openTdSideContent").bind('click',function(){
    		//开启侧栏
        	ONEMAP.C.publisher.publish('show','layout::sideBar');
    	    require(['modDir/tools/toolFor3d'],function(toolFor3d){
                toolFor3d.init();
            })
            if(!status.isOpenSetting){
            }
        });
    	$("#btnSetting").bind('click',function(){
    		if(status.isOpenSetting){
    			$("#settingForm").hide();
    			status.isOpenSetting = false;
    		}else{
    			$("#settingForm").show();
    			status.isOpenSetting = true;
    		}
    	});
    };
    /**
     * 加载/移除3d模型
     * @return {[type]} [description]
     */
    function add3DCSMX(flag){
    	if(flag){
    		modValue.model3D = locaSpace.AddLayer(onemapUrlConfig.threeDimensionalModelUrl+"/xinjiekou/xinjiekou.kml");
    		locaSpace.FlyToPlace(116.36565327644348,39.95203372479738,600,0,45);
    	}else{
    		var xjk3d = locaSpaceMap.Globe.Layers.GetLayerByCaption("xinjiekou");
            if(xjk3d != null){
                locaSpaceMap.Globe.Layers.RemoveLayerByID(xjk3d.ID);
            } 
    	}
    	locaSpaceMap.Refresh();
    };
    /**
    * 加载/移除倾斜摄影
    * @return {[type]} [description]
    */
    function add3DQXSY(flag){
        if(flag){
            modValue.photography = locaSpace.AddLayer(onemapUrlConfig.threeDimensionalModelUrl+"/osgb_wgs84/Data/usa_idm1000_demo.lfp");
            locaSpace.FlyToPlace(-100.56859016418457,37.00241558176739,1000,0,45);
        }else {
            var qxsy3d = locaSpaceMap.Globe.Layers.GetLayerByCaption("usa_idm1000_demo");
            if(qxsy3d != null){
                locaSpaceMap.Globe.Layers.RemoveLayerByID(qxsy3d.ID);
            }
        }
        locaSpaceMap.Refresh();
    };
    /**
     * 清除标绘
     * 
     */
    function clear3DMap(){
        locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
        locaSpaceMap.Globe.ClearMeasure(); //清理量算遗留下来的线
        locaSpaceMap.Globe.ClearAnalysis();//清除所有分析
        locaSpaceMap.Refresh(); 
    }
	return ONEMAP.M.tdEarth = {
		init:init,
		add3DQXSY:add3DQXSY,
		add3DCSMX:add3DCSMX,
        clear3DMap:clear3DMap
	}
})