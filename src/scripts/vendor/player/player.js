function getplayer(id, url, width, height, vars, transparent){
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
	//document.write(html);
}