/**
 * [ONEMAP.M.gcmsEvents]
 * @return {[object]}
 */
define(function(){
    //显示详情
    function showDetail(articleId){
        require(['modDir/gcms/gcmsDetail'],function(gcmsDetail){
            gcmsDetail.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId
            });
        });
    } 
    
    //显示地图中心点
    function showMapCenter(lat,lng,zoom,style){
        require(['modDir/gcms/gcmsMapCenter'],function(gcmsMapCenter){
            gcmsMapCenter.init({
                data:{
                    lat:lat,
                    lng:lng,
                    zoom:zoom,
                    style:style
                }
            });
        });
    }

    //下载
    function showFiles(articleId,fieldName){
        require(['modDir/gcms/gcmsFiles'],function(gcmsFiles){
            gcmsFiles.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId,
                field_name:fieldName
            });
        });
    }

    //显示问卷
    function showQuestionnaire(articleId,fieldName){
        require(['modDir/gcms/gcmsQuestionnaire'],function(gcmsQuestionnaire){
            gcmsQuestionnaire.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId,
                field_name:fieldName
            });
        });
    }

    //显示标绘
    function showMapDraw(articleId,fieldName){
        require(['modDir/gcms/gcmsMapDraw'],function(gcmsMapDraw){
            gcmsMapDraw.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId,
                field_name:fieldName
            });
        });
    }
    //显示地图标记
    function showMapMarker(articleId,fieldName){
        require(['modDir/gcms/gcmsMapMarker'],function(gcmsMapMarker){
            gcmsMapMarker.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId,
                field_name:fieldName
            });
        });
    }
    //显示图片
    function showPicture(articleId,fieldName){
        require(['modDir/gcms/gcmsPicture'],function(gcmsPicture){
            gcmsPicture.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId,
                field_name:fieldName
            });
        });
    }
    //显示图册
    function showPictures(articleId,fieldName){
        require(['modDir/gcms/gcmsPictures'],function(gcmsPictures){
            gcmsPictures.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId,
                field_name:fieldName
            });
        });
    }
    //显示专题图
    function showThematic(articleId,fieldName){
        require(['modDir/gcms/gcmsThematic'],function(gcmsThematic){
            gcmsThematic.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId,
                field_name:fieldName
            });
        });
    }
    //显示视频
    function showVideo(articleId,fieldName){
        require(['modDir/gcms/gcmsVideo'],function(gcmsVideo){
            gcmsVideo.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId,
                field_name:fieldName
            });
        });
    }

    //显示音频
    function showAudio(articleId,fieldName){
        require(['modDir/gcms/gcmsAudio'],function(gcmsAudio){
            gcmsAudio.init({
                column_name:ONEMAP.D.gcmsCurColumnData['name'],
                article_id:articleId,
                field_name:fieldName
            });
        });
    }

    //根据序号定位到中心点并弹出冒泡窗
    function showMapCenterPopup(index){
        var markerArray = ONEMAP.M.gcmsList.getMarkerObj();
        if(markerObj.hasOwnProperty(index)){
            var marker = map2DViewer.markers[markerObj[index]];
            map23DControl.setView({
                center:{
                    lat:marker.getLatLng().lat,
                    lng:marker.getLatLng().lng
                },
                zoom:map23DData.view.zoom
            })
            setTimeout(function(){
                marker.openPopup();
            },1000)            
        }
    }

    //根据id定位到中心点并弹出冒泡窗
    function showMapCenterByGcmsId(id){
        var markerObj = ONEMAP.M.gcmsList.getMarkerObj();
        if(markerObj.hasOwnProperty(id)){
            var marker = map2DViewer.markers[markerObj[id]];
            map23DControl.setView({
                center:{
                    lat:marker.getLatLng().lat,
                    lng:marker.getLatLng().lng
                },
                zoom:map23DData.view.zoom
            })
            setTimeout(function(){
                marker.openPopup();
            },1000)            
        }
    }
 
    return ONEMAP.M.gcmsEvents = {
        showDetail:showDetail,
        showMapCenter:showMapCenter,
        showMapDraw:showMapDraw,
        showMapMarker:showMapMarker,
        showPicture:showPicture,
        showPictures:showPictures,
        showThematic:showThematic,
        showVideo:showVideo,
        showMapCenterPopup:showMapCenterPopup,
        showMapCenterByGcmsId:showMapCenterByGcmsId,
        showFiles:showFiles,
        showAudio:showAudio,
        showQuestionnaire:showQuestionnaire
    }
});

