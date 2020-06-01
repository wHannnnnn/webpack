define([
'html!templates/tools/toolFlyLineModal',
'css!styles/tools/toolFlyLineModal'],function(tpcLayout){
	/**
	 * 状态值
	 * @type {Boolean}
	 * @default false
	 * @private
	 */
	var status = {
		initialized:false,//是否初始化
	    veiwHeightType:null
	};
	/**
	 * 模块数据 用于数据存储和外部调用
	 * @type {Object}
	 * 数据存放
	 */
	var modValue = {
		
	};
	/**
	 * 飞行模拟初始化
	 */
	function init(){
		if(!status.initialized){
			setLayout();
    		bindEvent();
    		subscribe();
    		status.initialized = true;
		}
		ONEMAP.C.publisher.publish({
            modName: 'toolFlyLineModel'
        }, 'tools:active');
	};
	function setLayout(){
		$('body').append(tpcLayout);
	};
	function subscribe(){
		ONEMAP.C.publisher.subscribe(remove,'tools:active');
		ONEMAP.C.publisher.subscribe(remove, 'change23D');
	};
	function remove(options){
		if(options.modName != 'toolFlyLineModel'){
			$(".tools-flyLineModal").removeClass('cur');
			removeflyLineModal();
		}else{
			if($(".tools-flyLineModal").hasClass('cur')){
				$(".tools-flyLineModal").removeClass('cur');
				removeflyLineModal();
			}else{
				$(".tools-flyLineModal").addClass('cur');
				addflyLineModal();
			}
		}
	}
	/**
	 * 加载模拟飞行
	 */
	function addflyLineModal(){
		$("#flyLineModal").show();
	};
	/**
	 * 移除模拟飞行
	 */
	function removeflyLineModal(){
		$("#flyLineModal").hide();
	}
	//根据经度+缩放等级查询列号
	function long2tile(lon, zoom) {
		return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
	}
	//根据纬度+缩放等级查询行号
	function lat2tile(lat, zoom) {
		console.log(lat)
		console.log((Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))))
		return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
	}
	//距离转换为经度
	function doLngDegress(distance,latitude){
		// console.log(Math.sin(latitude))
		// console.log(Math.sin(distance*1000/12742))
		// console.log(Math.cos(latitude*(180/Math.PI)))
		// console.log(Math.sin(distance*1000/12742)/Math.cos(latitude*(180/Math.PI)))
		var IngDegress = 2 * Math.asin(Math.sin(distance*1000/12742)/Math.cos(latitude*(180/Math.PI)))
		// console.log(IngDegress)
		// console.log(" ")
		return Math.abs(IngDegress);
	}
	//距离转换为纬度
	function doLatDegress(distance){
		var LatDegress = distance*1000/6371
		return LatDegress;
	}
	/**
	 * 绑定点击事件
	 */
	function bindEvent(){
		//清除路线
		$('#clearFlyLine').bind('click',function(){
			$("#drawFlyLine").removeClass('cur');
			$("#selectFlyLine").removeClass('cur');
		    locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
		    locaSpaceMap.Globe.MemoryLayer.RemoveAllFeature();
		    locaSpaceMap.Refresh();         //刷新显示
		});

		//取出地图
		$('#getMap').bind('click',function(){
			var buffer=parseInt($('#flyOptions').find('input[name="buffer"]').val())?parseInt($('#flyOptions').find('input[name="buffer"]').val()):10; //缓冲公里数
			var minZoom = parseInt($('#flyOptions').find('input[name="minZoom"]').val())?parseInt($('#flyOptions').find('input[name="minZoom"]').val()):1; //最小等级
			var maxZoom = parseInt($('#flyOptions').find('input[name="maxZoom"]').val())?parseInt($('#flyOptions').find('input[name="maxZoom"]').val()):5; //最大等级

		    if(locaSpaceMap.Globe.SelectedObject){
		        var line = locaSpaceMap.Globe.SelectedObject.Geometry;
		        console.log("该线共" + line.Item(0).Count +"个点"); // 打印点数
		        console.log("该线共" + (line.Item(0).Count-1) +"条线"); // 打印线数
		        var lines = []
		  		for (var i = 0; i < line.Item(0).Count; i++) {
		  			if (i!=line.Item(0).Count-1) { 
		  				var line_tmp = {
			  				x1:line.Item(0).Item(i).x,
			  				y1:line.Item(0).Item(i).y,
			  				x2:line.Item(0).Item(i+1).x,
			  				y2:line.Item(0).Item(i+1).y,
			  			}
			  			lines.push(line_tmp)
		  			}
		  		}
		  		console.log("该线分段经纬度数据")
		        console.log(lines)

		        var Polygons_t = []
		 		for (var i = 0; i < lines.length; i++) {
		  			var Polygon_t_tmp = {
		  				min_x:lines[i].x1>lines[i].x2?lines[i].x2:lines[i].x1,
		  				max_x:lines[i].x1<lines[i].x2?lines[i].x2:lines[i].x1,
		  				min_y:lines[i].y1>lines[i].y2?lines[i].y2:lines[i].y1,
		  				max_y:lines[i].y1<lines[i].y2?lines[i].y2:lines[i].y1,
		  			}
		  			Polygons_t.push(Polygon_t_tmp)
		  		}
		  		console.log("该线分段经纬度范围数据")
		  		console.log(Polygons_t)

		  		var Polygons = []
		  		for (var i = 0; i < Polygons_t.length; i++) {
		  			var Polygon_tmp = {
		  				min_x:Polygons_t[i].min_x-doLngDegress(buffer,Polygons_t[i].min_y)>-180?Polygons_t[i].min_x-doLngDegress(buffer,Polygons_t[i].min_y):-180,
		  				max_x:Polygons_t[i].max_x+doLngDegress(buffer,Polygons_t[i].max_y)<180?Polygons_t[i].max_x+doLngDegress(buffer,Polygons_t[i].max_y):180,
		  				min_y:Polygons_t[i].min_y-doLatDegress(buffer)>-90?Polygons_t[i].min_y-doLatDegress(buffer):-90,
		  				max_y:Polygons_t[i].max_y+doLatDegress(buffer)<90?Polygons_t[i].max_y+doLatDegress(buffer):90
		  			}
		  			Polygons.push(Polygon_tmp)
		  		}
		  		console.log("该线分段缓冲区经纬度范围数据")
		  		console.log(Polygons)

		  		//调用后台
		  		console.log(minZoom)
		  		console.log(maxZoom)
		  		for (var i = 0; i < Polygons.length; i++) {
		  			for (var j = minZoom; j <= maxZoom; j++) {
			  			$.support.cors = true
			  			$.ajax({
				            type: "get",
				            dataType: 'json',
				            data:{
				            	minRow:long2tile(Polygons[i].min_x,j),
				            	maxRow:long2tile(Polygons[i].max_x,j),
				            	maxCol:lat2tile(Polygons[i].min_y,j),
				            	minCol:lat2tile(Polygons[i].max_y,j),
				            	zoom:j
				            },
				            url: 'http://localhost:8089/DBZQ/test/test',
				            success: function(data) {
				               //alert('获取切片成功');
				            }
				        });
			  		}
		  		}
		    }else {
		        alert('请绘制或选择路线!');
		    }
		});

		//绘制路线
		$("#drawFlyLine").bind('click',function(){
		    if($(this).hasClass('cur')){
		        $(this).removeClass('cur');
		        locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
		        locaSpaceMap.Refresh();         //刷新显示
		    }else {
		        $('#toolsModal .modal-body .cur').removeClass('cur');
		        $(this).addClass('cur');
		        locaSpaceMap.Globe.Action = 10;
		        locaSpaceMap.Refresh();         //刷新显示
		    }
		})
		//选定路线
		$('#selectFlyLine').bind('click',function(){
		    if($(this).hasClass('cur')){
		        $(this).removeClass('cur');
		        locaSpaceMap.Globe.Action = 0;      //使鼠标动作返回普通浏览状态
		        locaSpaceMap.Refresh();         //刷新显示
		    }else {
		        $('#flyLineModal .modal-body .cur').removeClass('cur');
		        $(this).addClass('cur');
		        locaSpaceMap.Globe.Action = 5;
		        locaSpaceMap.Refresh();         //刷新显示
		    }
		});
		//沿线飞行
		$('#flyByLine').bind('click',function(){
		    var features=locaSpaceMap.Globe.DestLayerFeatureAdd.GetAllFeatures();
		    if(locaSpaceMap.Globe.SelectedObject){
		        var flyAlongLineSpeed=parseInt($('#flyOptions').find('input[name="flySpeed"]').val())?parseInt($('#flyOptions').find('input[name="flySpeed"]').val()):0;
		        var flyAlongLineHeight=parseInt($('#flyOptions').find('input[name="flyHeight"]').val())?parseInt($('#flyOptions').find('input[name="flyHeight"]').val()):0;
		        var flyAlongLineElev=parseInt($('#flyOptions').find('input[name="flyElevation"]').val())?parseInt($('#flyOptions').find('input[name="flyElevation"]').val()):0;
		        if(flyAlongLineSpeed<100 || flyAlongLineSpeed>100000){
		            alert('请输入大于100小于100000的速度值');
		            return false;
		        }
		        if(flyAlongLineHeight<300 || flyAlongLineHeight>100000){
		            alert('请输入大于300小于100000的高度值');
		            return false;
		        }
		        if(flyAlongLineElev<1 || flyAlongLineElev>90){
		            alert('请输入大于1小于90的仰角值');
		            return false;
		        }

		        //禁止倾斜
		        locaSpaceMap.Globe.FlyAlongLineSpeed=flyAlongLineSpeed;
		        locaSpaceMap.Globe.FlyEyeAlongWithLine1(locaSpaceMap.Globe.SelectedObject.Geometry, flyAlongLineHeight, flyAlongLineElev, true, 0 , true);
		        locaSpaceMap.Globe.Action = 0;

		        $('#drawFlyLine, #selectFlyLine, #flyByLine').hide();
		        $('#flyStop , #flyGo').show();

		    }else {
		        alert('请绘制或选择路线!');
		    }
		});

		$('#flyGo').bind('click',function(){
		    locaSpaceMap.Globe.ContinueFly();
		});

		$('#flyStop').bind('click',function(){
		    $('#drawFlyLine, #selectFlyLine, #flyByLine').show();
		    $('#flyStop , #flyGo').hide();
		    locaSpaceMap.Globe.StopFly();
		});
	}

	return ONEMAP.M.toolFlyLineModel = {
		init:init
	}
})