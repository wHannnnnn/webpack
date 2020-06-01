<span onclick="ONEMAP.M.gcmsEvents.showDetail({{data.gcms_id}})">{{data.gcms_title}}</span>
<span onclick="ONEMAP.M.gcmsEvents.showMapMarker({{data.gcms_id}},'map_marker')">[标绘信息]</span>
<span onclick="ONEMAP.M.gcmsEvents.showPictures({{data.gcms_id}},'pictures')">[图册]</span>
<span onclick="ONEMAP.M.gcmsEvents.showMapCenter({{data.map_center_lat}},{{data.map_center_lon}},{{data.map_center_zoom}})">移动地图中心</span>




















<!-- S gcmsTab标签页，用于显示各个模块内容-->
<div class="gcms-tabs">
    <ul>
        <li onclick="ONEMAP.M.gcmsEvents.showPicture({{data.gcms_id}},'picture')"><span><em class="up"></em><em class="name">图片</em><em class="dn"></em></span></li>
        <li onclick="ONEMAP.M.gcmsEvents.showVideo({{data.gcms_id}},'video')"><span><em class="up"></em><em class="name">视频</em><em class="dn"></em></span></li>
        <li onclick="ONEMAP.M.gcmsEvents.showPictures({{data.gcms_id}},'pictures')"><span><em class="up"></em><em class="name">图册</em><em class="dn"></em></span></li>
        <li onclick="ONEMAP.M.gcmsEvents.showThematic({{data.gcms_id}},'thematic')"><span><em class="up"></em><em class="name">专题图</em><em class="dn"></em></span></li>
        <li onclick="ONEMAP.M.gcmsEvents.showMapDraw({{data.gcms_id}},'map_draw')"><span><em class="up"></em><em class="name">地图标绘</em><em class="dn"></em></span></li>
        <li onclick="ONEMAP.M.gcmsEvents.showMapMarker({{data.gcms_id}},'map_marker')"><span><em class="up"></em><em class="name">地图标记</em><em class="dn"></em></span></li>
        <li><span><em class="up"></em><em class="name">文件下载</em><em class="dn"></em></span></li>
    </ul>
</div>
<!-- E gcmsTab标签页，用于显示各个模块内容-->
<!-- S gcms正文内容-->
<div class="typo">
{{data.content}}
</div>
<!-- E gcms正文内容-->
  
<!-- S gcms脚本执行-->
<script>
//显示中心点
//ONEMAP.M.gcmsEvents.showMapCenter({{data.map_center_lat}},{{data.map_center_lon}},{{data.map_center_zoom}});
//显示地图标记
//ONEMAP.M.gcmsEvents.showMapMarker({{data.gcms_id}},'map_marker');
//显示图层

</script>
<!-- E gcms脚本执行-->