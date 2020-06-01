/**
 * @fileoverview 应用配置文件
 * @author Song.Huang
 * @version 1.0.0
 */

/**
 * 版本号
 */
var onemapVersion = '2.1.9'+'-'+(new Date()).getTime();

/**
 * map引擎配置
 */
var map23DConfig = {
    serverIP: 'http://192.168.6.247',
    //瓦片服务地址 
	//tileServerUrl: 'http://192.168.6.247:507{s}/v1.0',
	tileServerUrl: 'http://192.168.6.247:5060/v1.0',
	//tileServerUrl: 'http://192.168.6.111:1500{s}',
    //瓦片服务地址3D 
    tileServerFor3DUrl: 'http://192.168.6.247:5060/v1.0',
    //3D认证服务地址
    threeDimensionalServerUrl: '192.168.6.247',//'123.206.16.25',
    //2D地图最小缩放等级
    map2DMinZoom:2,
    //2D地图最大缩放等级
    map2DMaxZoom:19,

    subdomains:'123456789',

    //cartodbIP
    cartodbIP:'http://192.168.6.247:8181',
    //cartodbKey
    cartodbKey:'96f34723cc3398ea5c18d3e75e3de6273a959c01',
    cartodbType:'82612ab07a947070bca0370289cc9ced:1498301568829/',
    cartodbData: 'http://192.168.6.247:3000/user/dev/api/v2/viz/58a194b4-58cb-11e7-8a1b-0242ac11000a/viz.json',

    //23D资源文件 
    map23DAssetsUrl:'http://192.168.6.111:5100',//+ 文件名
};


/**
 * 应用Url配置
 * @type {Object}
 */
var onemapUrlConfig = {
    //域名
    siteUrl:'http://192.168.6.111:5100',

    serverIP: 'http://192.168.6.247',

    //系统名称
    systemName:'伪装检测',
    //系统logo
    systemLogoUrl:'http://192.168.6.111:5100/images/layout/logo.png',

    //版权
    systemCopy:'-',

    //全球一张图权限管理系统
    userManageSiteUrl:'http://192.168.6.247:5300',

    //地理空间内容采编系统
    gcmsSiteUrl:'http://192.168.6.247:5500',

    //全息地图数据管理系统
    hmdmsSiteUrl:'http://192.168.6.247:5201',

    //下载资源服务器
    downloadServiceUrl:'http://192.168.6.247',

    //Thematic  专题图查询
    thematicDataUrl:'http://192.168.6.247:5090',
    //专题图缩略图接口
    thematicThumbUrl:'http://192.168.6.247:5090/production/thumb',
    //专题图瓦片路径
    thematicTileUrl:'http://192.168.6.247:5060/v1.0',
    //专题图数据查询接口
    thematicDataServerUrl:'http://192.168.6.247:5090',

    //海量地图库
    atlasLibraryUrl:'http://192.168.6.247:5201',

    //3D地球数据
    threeDimensionalDataUrl:'http://192.168.6.247:10260/v1.0',
    //默认3D注记服务地址
    placeNameServerUrl:'http://192.168.6.247:5050/v1.0',
    //默认3d瓦片服务地址
    threeDimensionalTileServerUrl:'http://192.168.6.247:5060/v1.0',
    //默认3D地形服务地址
    terrainServerUrl:'http://192.168.6.247:5060/v1.0',

    //游客模式
    guestMode:false,
    //接入方式
    accessType:'sso', //sso/oauth
   //sso地址
    ssoServiceUrl:'http://192.168.6.247:5230',
    //oauth地址
    oauthServiceUrl:'http://192.168.6.247:3010',

    //全局设置服务 调用GCMS的storage服务
    storageServiceUrl:'http://192.168.6.111:5100/proxy_gcms',//'http://192.168.6.247:5201',

    //用户信息
    userDataUrl:'http://192.168.6.111:5100/proxy_user',//'http://114.255.121.200:5030',http://192.168.6.247:5201

    //用户资源
    userCenterUrl:'http://192.168.6.111:5100/proxy_resource',//'http://114.255.121.200:5070',
    //用户记录
    userRecordUrl:'http://192.168.6.111:5100/proxy_resource',//'http://114.255.121.200:5070',
    //用户记录资源获取
    userRecordResourceUrl:'http://192.168.6.111:5100/proxy_resource',//'http://114.255.121.200:5070',

    //GCMS服务
    gcmsServiceUrl:'http://192.168.6.111:5100/proxy_gcms',//http://114.255.121.200:5500',

     //剖面量算
    elevationDataUrl:'http://192.168.6.111:5100/proxy_geo',//'http://192.168.6.247:5110',
    //默认区域信息查询服务地址
    regionSearchDataUrl:'http://192.168.6.247:5040',
    //默认地名检索服务地址
    poiSearchDataUrl:'http://192.168.6.247:5040',
    //默认位置信息查询服务地址
    addressSearchDataUrl:'http://192.168.6.247:5040',
    //默认路径规划服务地址
    routeSearchDataUrl:'http://192.168.6.247:5080',

    //截图下载服务器
    mapShotDownServerUrl:'http://192.168.6.247:5250',
    //截图最大尺寸 像素
    mapShotMaxPicWidth:1000000000000000000,
    mapShotMaxPicHeight:1000000000000000000,
    defaultGlobalSettingData:{
        "mapSetting": {
            "center": {
                "lat": 39,
                "lng": 116
            },
            "type": 2,
            "zoom": 5
        },
        "map2DThematicSetting": [],
        "map2DThematicCategory": [],
        "baseMap3D": {
            "map3DLayer": "http://192.168.6.247:15000/gr?z=%d&x=%d&y=%d",
            "map3DDEM": "http://192.168.6.247:5060/v1.0/dem?z=%d&x=%d&y=%d",
            "map3DName": "http://192.168.6.247:5050/v1.0/name?x=%d&y=%d&z=%d"
        },
        "map3DModelSettingCategory": [],
        "map3DModelSetting": [],
        "importantGoalsCategory": [],
        "importantGoalsSetting": []
    },
};
