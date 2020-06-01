;(function (window, document, undefined) {
    window.map23DVersion = '2.0.8'

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = map23DVersion;
    } else if (typeof define === 'function' && define.amd) {
        define(map23DVersion);
    }

}(window, document));
/*
 Leaflet 1.0.2+4bbb16c, a JS library for interactive maps. http://leafletjs.com
 (c) 2010-2016 Vladimir Agafonkin, (c) 2010-2011 CloudMade
*/
!function(t,e,i){function n(){var e=t.L;o.noConflict=function(){return t.L=e,this},t.L=o}var o={version:"1.0.2+4bbb16c"};"object"==typeof module&&"object"==typeof module.exports?module.exports=o:"function"==typeof define&&define.amd&&define(o),"undefined"!=typeof t&&n(),o.Util={extend:function(t){var e,i,n,o;for(i=1,n=arguments.length;i<n;i++){o=arguments[i];for(e in o)t[e]=o[e]}return t},create:Object.create||function(){function t(){}return function(e){return t.prototype=e,new t}}(),bind:function(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments)}},stamp:function(t){return t._leaflet_id=t._leaflet_id||++o.Util.lastId,t._leaflet_id},lastId:0,throttle:function(t,e,i){var n,o,s,r;return r=function(){n=!1,o&&(s.apply(i,o),o=!1)},s=function(){n?o=arguments:(t.apply(i,arguments),setTimeout(r,e),n=!0)}},wrapNum:function(t,e,i){var n=e[1],o=e[0],s=n-o;return t===n&&i?t:((t-o)%s+s)%s+o},falseFn:function(){return!1},formatNum:function(t,e){var i=Math.pow(10,e||5);return Math.round(t*i)/i},trim:function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},splitWords:function(t){return o.Util.trim(t).split(/\s+/)},setOptions:function(t,e){t.hasOwnProperty("options")||(t.options=t.options?o.Util.create(t.options):{});for(var i in e)t.options[i]=e[i];return t.options},getParamString:function(t,e,i){var n=[];for(var o in t)n.push(encodeURIComponent(i?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));return(e&&e.indexOf("?")!==-1?"&":"?")+n.join("&")},template:function(t,e){return t.replace(o.Util.templateRe,function(t,n){var o=e[n];if(o===i)throw new Error("No value provided for variable "+t);return"function"==typeof o&&(o=o(e)),o})},templateRe:/\{ *([\w_\-]+) *\}/g,isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},indexOf:function(t,e){for(var i=0;i<t.length;i++)if(t[i]===e)return i;return-1},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function e(e){return t["webkit"+e]||t["moz"+e]||t["ms"+e]}function i(e){var i=+new Date,o=Math.max(0,16-(i-n));return n=i+o,t.setTimeout(e,o)}var n=0,s=t.requestAnimationFrame||e("RequestAnimationFrame")||i,r=t.cancelAnimationFrame||e("CancelAnimationFrame")||e("CancelRequestAnimationFrame")||function(e){t.clearTimeout(e)};o.Util.requestAnimFrame=function(e,n,r){return r&&s===i?void e.call(n):s.call(t,o.bind(e,n))},o.Util.cancelAnimFrame=function(e){e&&r.call(t,e)}}(),o.extend=o.Util.extend,o.bind=o.Util.bind,o.stamp=o.Util.stamp,o.setOptions=o.Util.setOptions,o.Class=function(){},o.Class.extend=function(t){var e=function(){this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},i=e.__super__=this.prototype,n=o.Util.create(i);n.constructor=e,e.prototype=n;for(var s in this)this.hasOwnProperty(s)&&"prototype"!==s&&(e[s]=this[s]);return t.statics&&(o.extend(e,t.statics),delete t.statics),t.includes&&(o.Util.extend.apply(null,[n].concat(t.includes)),delete t.includes),n.options&&(t.options=o.Util.extend(o.Util.create(n.options),t.options)),o.extend(n,t),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=n._initHooks.length;t<e;t++)n._initHooks[t].call(this)}},e},o.Class.include=function(t){return o.extend(this.prototype,t),this},o.Class.mergeOptions=function(t){return o.extend(this.prototype.options,t),this},o.Class.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this},o.Evented=o.Class.extend({on:function(t,e,i){if("object"==typeof t)for(var n in t)this._on(n,t[n],e);else{t=o.Util.splitWords(t);for(var s=0,r=t.length;s<r;s++)this._on(t[s],e,i)}return this},off:function(t,e,i){if(t)if("object"==typeof t)for(var n in t)this._off(n,t[n],e);else{t=o.Util.splitWords(t);for(var s=0,r=t.length;s<r;s++)this._off(t[s],e,i)}else delete this._events;return this},_on:function(t,e,n){this._events=this._events||{};var o=this._events[t];o||(o=[],this._events[t]=o),n===this&&(n=i);for(var s={fn:e,ctx:n},r=o,a=0,h=r.length;a<h;a++)if(r[a].fn===e&&r[a].ctx===n)return;r.push(s),o.count++},_off:function(t,e,n){var s,r,a;if(this._events&&(s=this._events[t])){if(!e){for(r=0,a=s.length;r<a;r++)s[r].fn=o.Util.falseFn;return void delete this._events[t]}if(n===this&&(n=i),s)for(r=0,a=s.length;r<a;r++){var h=s[r];if(h.ctx===n&&h.fn===e)return h.fn=o.Util.falseFn,this._firingCount&&(this._events[t]=s=s.slice()),void s.splice(r,1)}}},fire:function(t,e,i){if(!this.listens(t,i))return this;var n=o.Util.extend({},e,{type:t,target:this});if(this._events){var s=this._events[t];if(s){this._firingCount=this._firingCount+1||1;for(var r=0,a=s.length;r<a;r++){var h=s[r];h.fn.call(h.ctx||this,n)}this._firingCount--}}return i&&this._propagateEvent(n),this},listens:function(t,e){var i=this._events&&this._events[t];if(i&&i.length)return!0;if(e)for(var n in this._eventParents)if(this._eventParents[n].listens(t,e))return!0;return!1},once:function(t,e,i){if("object"==typeof t){for(var n in t)this.once(n,t[n],e);return this}var s=o.bind(function(){this.off(t,e,i).off(t,s,i)},this);return this.on(t,e,i).on(t,s,i)},addEventParent:function(t){return this._eventParents=this._eventParents||{},this._eventParents[o.stamp(t)]=t,this},removeEventParent:function(t){return this._eventParents&&delete this._eventParents[o.stamp(t)],this},_propagateEvent:function(t){for(var e in this._eventParents)this._eventParents[e].fire(t.type,o.extend({layer:t.target},t),!0)}});var s=o.Evented.prototype;s.addEventListener=s.on,s.removeEventListener=s.clearAllEventListeners=s.off,s.addOneTimeEventListener=s.once,s.fireEvent=s.fire,s.hasEventListeners=s.listens,o.Mixin={Events:s},function(){var i=navigator.userAgent.toLowerCase(),n=e.documentElement,s="ActiveXObject"in t,r=i.indexOf("webkit")!==-1,a=i.indexOf("phantom")!==-1,h=i.search("android [23]")!==-1,l=i.indexOf("chrome")!==-1,u=i.indexOf("gecko")!==-1&&!r&&!t.opera&&!s,c=0===navigator.platform.indexOf("Win"),d="undefined"!=typeof orientation||i.indexOf("mobile")!==-1,_=!t.PointerEvent&&t.MSPointerEvent,m=t.PointerEvent||_,p=s&&"transition"in n.style,f="WebKitCSSMatrix"in t&&"m11"in new t.WebKitCSSMatrix&&!h,g="MozPerspective"in n.style,v="OTransition"in n.style,y=!t.L_NO_TOUCH&&(m||"ontouchstart"in t||t.DocumentTouch&&e instanceof t.DocumentTouch);o.Browser={ie:s,ielt9:s&&!e.addEventListener,edge:"msLaunchUri"in navigator&&!("documentMode"in e),webkit:r,gecko:u,android:i.indexOf("android")!==-1,android23:h,chrome:l,safari:!l&&i.indexOf("safari")!==-1,win:c,ie3d:p,webkit3d:f,gecko3d:g,opera12:v,any3d:!t.L_DISABLE_3D&&(p||f||g)&&!v&&!a,mobile:d,mobileWebkit:d&&r,mobileWebkit3d:d&&f,mobileOpera:d&&t.opera,mobileGecko:d&&u,touch:!!y,msPointer:!!_,pointer:!!m,retina:(t.devicePixelRatio||t.screen.deviceXDPI/t.screen.logicalXDPI)>1}}(),o.Point=function(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e},o.Point.prototype={clone:function(){return new o.Point(this.x,this.y)},add:function(t){return this.clone()._add(o.point(t))},_add:function(t){return this.x+=t.x,this.y+=t.y,this},subtract:function(t){return this.clone()._subtract(o.point(t))},_subtract:function(t){return this.x-=t.x,this.y-=t.y,this},divideBy:function(t){return this.clone()._divideBy(t)},_divideBy:function(t){return this.x/=t,this.y/=t,this},multiplyBy:function(t){return this.clone()._multiplyBy(t)},_multiplyBy:function(t){return this.x*=t,this.y*=t,this},scaleBy:function(t){return new o.Point(this.x*t.x,this.y*t.y)},unscaleBy:function(t){return new o.Point(this.x/t.x,this.y/t.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},distanceTo:function(t){t=o.point(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)},equals:function(t){return t=o.point(t),t.x===this.x&&t.y===this.y},contains:function(t){return t=o.point(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y)},toString:function(){return"Point("+o.Util.formatNum(this.x)+", "+o.Util.formatNum(this.y)+")"}},o.point=function(t,e,n){return t instanceof o.Point?t:o.Util.isArray(t)?new o.Point(t[0],t[1]):t===i||null===t?t:"object"==typeof t&&"x"in t&&"y"in t?new o.Point(t.x,t.y):new o.Point(t,e,n)},o.Bounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])},o.Bounds.prototype={extend:function(t){return t=o.point(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this},getCenter:function(t){return new o.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t)},getBottomLeft:function(){return new o.Point(this.min.x,this.max.y)},getTopRight:function(){return new o.Point(this.max.x,this.min.y)},getSize:function(){return this.max.subtract(this.min)},contains:function(t){var e,i;return t="number"==typeof t[0]||t instanceof o.Point?o.point(t):o.bounds(t),t instanceof o.Bounds?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y},intersects:function(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,r=s.x>=e.x&&n.x<=i.x,a=s.y>=e.y&&n.y<=i.y;return r&&a},overlaps:function(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,r=s.x>e.x&&n.x<i.x,a=s.y>e.y&&n.y<i.y;return r&&a},isValid:function(){return!(!this.min||!this.max)}},o.bounds=function(t,e){return!t||t instanceof o.Bounds?t:new o.Bounds(t,e)},o.Transformation=function(t,e,i,n){this._a=t,this._b=e,this._c=i,this._d=n},o.Transformation.prototype={transform:function(t,e){return this._transform(t.clone(),e)},_transform:function(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t},untransform:function(t,e){return e=e||1,new o.Point((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c)}},o.DomUtil={get:function(t){return"string"==typeof t?e.getElementById(t):t},getStyle:function(t,i){var n=t.style[i]||t.currentStyle&&t.currentStyle[i];if((!n||"auto"===n)&&e.defaultView){var o=e.defaultView.getComputedStyle(t,null);n=o?o[i]:null}return"auto"===n?null:n},create:function(t,i,n){var o=e.createElement(t);return o.className=i||"",n&&n.appendChild(o),o},remove:function(t){var e=t.parentNode;e&&e.removeChild(t)},empty:function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},toFront:function(t){t.parentNode.appendChild(t)},toBack:function(t){var e=t.parentNode;e.insertBefore(t,e.firstChild)},hasClass:function(t,e){if(t.classList!==i)return t.classList.contains(e);var n=o.DomUtil.getClass(t);return n.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(n)},addClass:function(t,e){if(t.classList!==i)for(var n=o.Util.splitWords(e),s=0,r=n.length;s<r;s++)t.classList.add(n[s]);else if(!o.DomUtil.hasClass(t,e)){var a=o.DomUtil.getClass(t);o.DomUtil.setClass(t,(a?a+" ":"")+e)}},removeClass:function(t,e){t.classList!==i?t.classList.remove(e):o.DomUtil.setClass(t,o.Util.trim((" "+o.DomUtil.getClass(t)+" ").replace(" "+e+" "," ")))},setClass:function(t,e){t.className.baseVal===i?t.className=e:t.className.baseVal=e},getClass:function(t){return t.className.baseVal===i?t.className:t.className.baseVal},setOpacity:function(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&o.DomUtil._setOpacityIE(t,e)},_setOpacityIE:function(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n)}catch(t){if(1===e)return}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")"},testProp:function(t){for(var i=e.documentElement.style,n=0;n<t.length;n++)if(t[n]in i)return t[n];return!1},setTransform:function(t,e,i){var n=e||new o.Point(0,0);t.style[o.DomUtil.TRANSFORM]=(o.Browser.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"")},setPosition:function(t,e){t._leaflet_pos=e,o.Browser.any3d?o.DomUtil.setTransform(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px")},getPosition:function(t){return t._leaflet_pos||new o.Point(0,0)}},function(){o.DomUtil.TRANSFORM=o.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]);var i=o.DomUtil.TRANSITION=o.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]);if(o.DomUtil.TRANSITION_END="webkitTransition"===i||"OTransition"===i?i+"End":"transitionend","onselectstart"in e)o.DomUtil.disableTextSelection=function(){o.DomEvent.on(t,"selectstart",o.DomEvent.preventDefault)},o.DomUtil.enableTextSelection=function(){o.DomEvent.off(t,"selectstart",o.DomEvent.preventDefault)};else{var n=o.DomUtil.testProp(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);o.DomUtil.disableTextSelection=function(){if(n){var t=e.documentElement.style;this._userSelect=t[n],t[n]="none"}},o.DomUtil.enableTextSelection=function(){n&&(e.documentElement.style[n]=this._userSelect,delete this._userSelect)}}o.DomUtil.disableImageDrag=function(){o.DomEvent.on(t,"dragstart",o.DomEvent.preventDefault)},o.DomUtil.enableImageDrag=function(){o.DomEvent.off(t,"dragstart",o.DomEvent.preventDefault)},o.DomUtil.preventOutline=function(e){for(;e.tabIndex===-1;)e=e.parentNode;e&&e.style&&(o.DomUtil.restoreOutline(),this._outlineElement=e,this._outlineStyle=e.style.outline,e.style.outline="none",o.DomEvent.on(t,"keydown",o.DomUtil.restoreOutline,this))},o.DomUtil.restoreOutline=function(){this._outlineElement&&(this._outlineElement.style.outline=this._outlineStyle,delete this._outlineElement,delete this._outlineStyle,o.DomEvent.off(t,"keydown",o.DomUtil.restoreOutline,this))}}(),o.LatLng=function(t,e,n){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,n!==i&&(this.alt=+n)},o.LatLng.prototype={equals:function(t,e){if(!t)return!1;t=o.latLng(t);var n=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return n<=(e===i?1e-9:e)},toString:function(t){return"LatLng("+o.Util.formatNum(this.lat,t)+", "+o.Util.formatNum(this.lng,t)+")"},distanceTo:function(t){return o.CRS.Earth.distance(this,o.latLng(t))},wrap:function(){return o.CRS.Earth.wrapLatLng(this)},toBounds:function(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return o.latLngBounds([this.lat-e,this.lng-i],[this.lat+e,this.lng+i])},clone:function(){return new o.LatLng(this.lat,this.lng,this.alt)}},o.latLng=function(t,e,n){return t instanceof o.LatLng?t:o.Util.isArray(t)&&"object"!=typeof t[0]?3===t.length?new o.LatLng(t[0],t[1],t[2]):2===t.length?new o.LatLng(t[0],t[1]):null:t===i||null===t?t:"object"==typeof t&&"lat"in t?new o.LatLng(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===i?null:new o.LatLng(t,e,n)},o.LatLngBounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++)this.extend(i[n])},o.LatLngBounds.prototype={extend:function(t){var e,i,n=this._southWest,s=this._northEast;if(t instanceof o.LatLng)e=t,i=t;else{if(!(t instanceof o.LatLngBounds))return t?this.extend(o.latLng(t)||o.latLngBounds(t)):this;if(e=t._southWest,i=t._northEast,!e||!i)return this}return n||s?(n.lat=Math.min(e.lat,n.lat),n.lng=Math.min(e.lng,n.lng),s.lat=Math.max(i.lat,s.lat),s.lng=Math.max(i.lng,s.lng)):(this._southWest=new o.LatLng(e.lat,e.lng),this._northEast=new o.LatLng(i.lat,i.lng)),this},pad:function(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t;return new o.LatLngBounds(new o.LatLng(e.lat-n,e.lng-s),new o.LatLng(i.lat+n,i.lng+s))},getCenter:function(){return new o.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new o.LatLng(this.getNorth(),this.getWest())},getSouthEast:function(){return new o.LatLng(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(t){t="number"==typeof t[0]||t instanceof o.LatLng?o.latLng(t):o.latLngBounds(t);var e,i,n=this._southWest,s=this._northEast;return t instanceof o.LatLngBounds?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=s.lat&&e.lng>=n.lng&&i.lng<=s.lng},intersects:function(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),r=s.lat>=e.lat&&n.lat<=i.lat,a=s.lng>=e.lng&&n.lng<=i.lng;return r&&a},overlaps:function(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),r=s.lat>e.lat&&n.lat<i.lat,a=s.lng>e.lng&&n.lng<i.lng;return r&&a},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(t){return!!t&&(t=o.latLngBounds(t),this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast()))},isValid:function(){return!(!this._southWest||!this._northEast)}},o.latLngBounds=function(t,e){return t instanceof o.LatLngBounds?t:new o.LatLngBounds(t,e)},o.Projection={},o.Projection.LonLat={project:function(t){return new o.Point(t.lng,t.lat)},unproject:function(t){return new o.LatLng(t.y,t.x)},bounds:o.bounds([-180,-90],[180,90])},o.Projection.SphericalMercator={R:6378137,MAX_LATITUDE:85.0511287798,project:function(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=Math.sin(n*e);return new o.Point(this.R*t.lng*e,this.R*Math.log((1+s)/(1-s))/2)},unproject:function(t){var e=180/Math.PI;return new o.LatLng((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R)},bounds:function(){var t=6378137*Math.PI;return o.bounds([-t,-t],[t,t])}()},o.CRS={latLngToPoint:function(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n)},pointToLatLng:function(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n)},project:function(t){return this.projection.project(t)},unproject:function(t){return this.projection.unproject(t)},scale:function(t){return 256*Math.pow(2,t)},zoom:function(t){return Math.log(t/256)/Math.LN2},getProjectedBounds:function(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),s=this.transformation.transform(e.max,i);return o.bounds(n,s)},infinite:!1,wrapLatLng:function(t){var e=this.wrapLng?o.Util.wrapNum(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?o.Util.wrapNum(t.lat,this.wrapLat,!0):t.lat,n=t.alt;return o.latLng(i,e,n)}},o.CRS.Simple=o.extend({},o.CRS,{projection:o.Projection.LonLat,transformation:new o.Transformation(1,0,-1,0),scale:function(t){return Math.pow(2,t)},zoom:function(t){return Math.log(t)/Math.LN2},distance:function(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n)},infinite:!0}),o.CRS.Earth=o.extend({},o.CRS,{wrapLng:[-180,180],R:6371e3,distance:function(t,e){var i=Math.PI/180,n=t.lat*i,o=e.lat*i,s=Math.sin(n)*Math.sin(o)+Math.cos(n)*Math.cos(o)*Math.cos((e.lng-t.lng)*i);return this.R*Math.acos(Math.min(s,1))}}),o.CRS.EPSG3857=o.extend({},o.CRS.Earth,{code:"EPSG:3857",projection:o.Projection.SphericalMercator,transformation:function(){var t=.5/(Math.PI*o.Projection.SphericalMercator.R);return new o.Transformation(t,.5,-t,.5)}()}),o.CRS.EPSG900913=o.extend({},o.CRS.EPSG3857,{code:"EPSG:900913"}),o.CRS.EPSG4326=o.extend({},o.CRS.Earth,{code:"EPSG:4326",projection:o.Projection.LonLat,transformation:new o.Transformation(1/180,1,-1/180,.5)}),o.Map=o.Evented.extend({options:{crs:o.CRS.EPSG3857,center:i,zoom:i,minZoom:i,maxZoom:i,layers:[],maxBounds:i,renderer:i,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(t,e){e=o.setOptions(this,e),this._initContainer(t),this._initLayout(),this._onResize=o.bind(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==i&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==i&&this.setView(o.latLng(e.center),e.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this.callInitHooks(),this._zoomAnimated=o.DomUtil.TRANSITION&&o.Browser.any3d&&!o.Browser.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),o.DomEvent.on(this._proxy,o.DomUtil.TRANSITION_END,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(t,e,n){if(e=e===i?this._zoom:this._limitZoom(e),t=this._limitCenter(o.latLng(t),e,this.options.maxBounds),n=n||{},this._stop(),this._loaded&&!n.reset&&n!==!0){n.animate!==i&&(n.zoom=o.extend({animate:n.animate},n.zoom),n.pan=o.extend({animate:n.animate,duration:n.duration},n.pan));var s=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan);if(s)return clearTimeout(this._sizeTimer),this}return this._resetView(t,e),this},setZoom:function(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this)},zoomIn:function(t,e){return t=t||(o.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e)},zoomOut:function(t,e){return t=t||(o.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e)},setZoomAround:function(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),r=t instanceof o.Point?t:this.latLngToContainerPoint(t),a=r.subtract(s).multiplyBy(1-1/n),h=this.containerPointToLatLng(s.add(a));return this.setView(h,e,{zoom:i})},_getBoundsCenterZoom:function(t,e){e=e||{},t=t.getBounds?t.getBounds():o.latLngBounds(t);var i=o.point(e.paddingTopLeft||e.padding||[0,0]),n=o.point(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n));s="number"==typeof e.maxZoom?Math.min(e.maxZoom,s):s;var r=n.subtract(i).divideBy(2),a=this.project(t.getSouthWest(),s),h=this.project(t.getNorthEast(),s),l=this.unproject(a.add(h).divideBy(2).add(r),s);return{center:l,zoom:s}},fitBounds:function(t,e){if(t=o.latLngBounds(t),!t.isValid())throw new Error("Bounds are not valid.");var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e)},fitWorld:function(t){return this.fitBounds([[-90,-180],[90,180]],t)},panTo:function(t,e){return this.setView(t,this._zoom,{pan:e})},panBy:function(t,e){if(t=o.point(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new o.PosAnimation,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){o.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity)}else this._rawPanBy(t),this.fire("move").fire("moveend");return this},flyTo:function(t,e,n){function s(t){var e=t?-1:1,i=t?v:g,n=v*v-g*g+e*L*L*y*y,o=2*i*L*y,s=n/o,r=Math.sqrt(s*s+1)-s,a=r<1e-9?-18:Math.log(r);return a}function r(t){return(Math.exp(t)-Math.exp(-t))/2}function a(t){return(Math.exp(t)+Math.exp(-t))/2}function h(t){return r(t)/a(t)}function l(t){return g*(a(x)/a(x+P*t))}function u(t){return g*(a(x)*h(x+P*t)-r(x))/L}function c(t){return 1-Math.pow(1-t,1.5)}function d(){var i=(Date.now()-b)/T,n=c(i)*w;i<=1?(this._flyToFrame=o.Util.requestAnimFrame(d,this),this._move(this.unproject(_.add(m.subtract(_).multiplyBy(u(n)/y)),f),this.getScaleZoom(g/l(n),f),{flyTo:!0})):this._move(t,e)._moveEnd(!0)}if(n=n||{},n.animate===!1||!o.Browser.any3d)return this.setView(t,e,n);this._stop();var _=this.project(this.getCenter()),m=this.project(t),p=this.getSize(),f=this._zoom;t=o.latLng(t),e=e===i?f:e;var g=Math.max(p.x,p.y),v=g*this.getZoomScale(f,e),y=m.distanceTo(_)||1,P=1.42,L=P*P,x=s(0),b=Date.now(),w=(s(1)-x)/P,T=n.duration?1e3*n.duration:1e3*w*.8;return this._moveStart(!0),d.call(this),this},flyToBounds:function(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e)},setMaxBounds:function(t){return t=o.latLngBounds(t),t.isValid()?(this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this.off("moveend",this._panInsideMaxBounds))},setMinZoom:function(t){return this.options.minZoom=t,this._loaded&&this.getZoom()<this.options.minZoom?this.setZoom(t):this},setMaxZoom:function(t){return this.options.maxZoom=t,this._loaded&&this.getZoom()>this.options.maxZoom?this.setZoom(t):this},panInsideBounds:function(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,o.latLngBounds(t));return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this},invalidateSize:function(t){if(!this._loaded)return this;t=o.extend({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),s=i.divideBy(2).round(),r=n.subtract(s);return r.x||r.y?(t.animate&&t.pan?this.panBy(r):(t.pan&&this._rawPanBy(r),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(o.bind(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i})):this},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(t){if(t=this._locateOptions=o.extend({timeout:1e4,watch:!1},t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=o.bind(this._handleGeolocationResponse,this),i=o.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(t){var e=t.code,i=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."})},_handleGeolocationResponse:function(t){var e=t.coords.latitude,i=t.coords.longitude,n=new o.LatLng(e,i),s=n.toBounds(t.coords.accuracy),r=this._locateOptions;if(r.setView){var a=this.getBoundsZoom(s);this.setView(n,r.maxZoom?Math.min(a,r.maxZoom):a)}var h={latlng:n,bounds:s,timestamp:t.timestamp};for(var l in t.coords)"number"==typeof t.coords[l]&&(h[l]=t.coords[l]);this.fire("locationfound",h)},addHandler:function(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this},remove:function(){if(this._initEvents(!0),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch(t){this._container._leaflet_id=i,this._containerId=i}o.DomUtil.remove(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this._loaded&&this.fire("unload");for(var t in this._layers)this._layers[t].remove();return this},createPane:function(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=o.DomUtil.create("div",i,e||this._mapPane);return t&&(this._panes[t]=n),n},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter:this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new o.LatLngBounds(e,i)},getMinZoom:function(){return this.options.minZoom===i?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===i?this._layersMaxZoom===i?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(t,e,i){t=o.latLngBounds(t),i=o.point(i||[0,0]);var n=this.getZoom()||0,s=this.getMinZoom(),r=this.getMaxZoom(),a=t.getNorthWest(),h=t.getSouthEast(),l=this.getSize().subtract(i),u=this.project(h,n).subtract(this.project(a,n)),c=o.Browser.any3d?this.options.zoomSnap:1,d=Math.min(l.x/u.x,l.y/u.y);return n=this.getScaleZoom(d,n),c&&(n=Math.round(n/(c/100))*(c/100),n=e?Math.ceil(n/c)*c:Math.floor(n/c)*c),Math.max(s,Math.min(r,n))},getSize:function(){return this._size&&!this._sizeChanged||(this._size=new o.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(t,e){var i=this._getTopLeftPoint(t,e);return new o.Bounds(i,i.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(t){return this.options.crs.getProjectedBounds(t===i?this.getZoom():t)},getPane:function(t){return"string"==typeof t?this._panes[t]:t},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(t,e){var n=this.options.crs;return e=e===i?this._zoom:e,n.scale(t)/n.scale(e)},getScaleZoom:function(t,e){var n=this.options.crs;e=e===i?this._zoom:e;var o=n.zoom(t*n.scale(e));return isNaN(o)?1/0:o},project:function(t,e){return e=e===i?this._zoom:e,this.options.crs.latLngToPoint(o.latLng(t),e)},unproject:function(t,e){return e=e===i?this._zoom:e,this.options.crs.pointToLatLng(o.point(t),e)},layerPointToLatLng:function(t){var e=o.point(t).add(this.getPixelOrigin());return this.unproject(e)},latLngToLayerPoint:function(t){var e=this.project(o.latLng(t))._round();return e._subtract(this.getPixelOrigin())},wrapLatLng:function(t){return this.options.crs.wrapLatLng(o.latLng(t))},distance:function(t,e){return this.options.crs.distance(o.latLng(t),o.latLng(e))},containerPointToLayerPoint:function(t){return o.point(t).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(t){return o.point(t).add(this._getMapPanePos())},containerPointToLatLng:function(t){var e=this.containerPointToLayerPoint(o.point(t));return this.layerPointToLatLng(e)},latLngToContainerPoint:function(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))},mouseEventToContainerPoint:function(t){return o.DomEvent.getMousePosition(t,this._container)},mouseEventToLayerPoint:function(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))},mouseEventToLatLng:function(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))},_initContainer:function(t){var e=this._container=o.DomUtil.get(t);if(!e)throw new Error("Map container not found.");if(e._leaflet_id)throw new Error("Map container is already initialized.");o.DomEvent.addListener(e,"scroll",this._onScroll,this),this._containerId=o.Util.stamp(e)},_initLayout:function(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&o.Browser.any3d,o.DomUtil.addClass(t,"leaflet-container"+(o.Browser.touch?" leaflet-touch":"")+(o.Browser.retina?" leaflet-retina":"")+(o.Browser.ielt9?" leaflet-oldie":"")+(o.Browser.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=o.DomUtil.getStyle(t,"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),this._initPanes(),
this._initControlPos&&this._initControlPos()},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),o.DomUtil.setPosition(this._mapPane,new o.Point(0,0)),this.createPane("tilePane"),this.createPane("shadowPane"),this.createPane("overlayPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(o.DomUtil.addClass(t.markerPane,"leaflet-zoom-hide"),o.DomUtil.addClass(t.shadowPane,"leaflet-zoom-hide"))},_resetView:function(t,e){o.DomUtil.setPosition(this._mapPane,new o.Point(0,0));var i=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var n=this._zoom!==e;this._moveStart(n)._move(t,e)._moveEnd(n),this.fire("viewreset"),i&&this.fire("load")},_moveStart:function(t){return t&&this.fire("zoomstart"),this.fire("movestart")},_move:function(t,e,n){e===i&&(e=this._zoom);var o=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),(o||n&&n.pinch)&&this.fire("zoom",n),this.fire("move",n)},_moveEnd:function(t){return t&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return o.Util.cancelAnimFrame(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(t){o.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(e){if(o.DomEvent){this._targets={},this._targets[o.stamp(this._container)]=this;var i=e?"off":"on";o.DomEvent[i](this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress",this._handleDOMEvent,this),this.options.trackResize&&o.DomEvent[i](t,"resize",this._onResize,this),o.Browser.any3d&&this.options.transform3DLimit&&this[i]("moveend",this._onMoveEnd)}},_onResize:function(){o.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=o.Util.requestAnimFrame(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(t,e){for(var i,n=[],s="mouseout"===e||"mouseover"===e,r=t.target||t.srcElement,a=!1;r;){if(i=this._targets[o.stamp(r)],i&&("click"===e||"preclick"===e)&&!t._simulated&&this._draggableMoved(i)){a=!0;break}if(i&&i.listens(e,!0)){if(s&&!o.DomEvent._isExternalTarget(r,t))break;if(n.push(i),s)break}if(r===this._container)break;r=r.parentNode}return n.length||a||s||!o.DomEvent._isExternalTarget(r,t)||(n=[this]),n},_handleDOMEvent:function(t){if(this._loaded&&!o.DomEvent._skipped(t)){var e="keypress"===t.type&&13===t.keyCode?"click":t.type;"mousedown"===e&&o.DomUtil.preventOutline(t.target||t.srcElement),this._fireDOMEvent(t,e)}},_fireDOMEvent:function(t,e,i){if("click"===t.type){var n=o.Util.extend({},t);n.type="preclick",this._fireDOMEvent(n,n.type,i)}if(!t._stopped&&(i=(i||[]).concat(this._findEventTargets(t,e)),i.length)){var s=i[0];"contextmenu"===e&&s.listens(e,!0)&&o.DomEvent.preventDefault(t);var r={originalEvent:t};if("keypress"!==t.type){var a=s instanceof o.Marker;r.containerPoint=a?this.latLngToContainerPoint(s.getLatLng()):this.mouseEventToContainerPoint(t),r.layerPoint=this.containerPointToLayerPoint(r.containerPoint),r.latlng=a?s.getLatLng():this.layerPointToLatLng(r.layerPoint)}for(var h=0;h<i.length;h++)if(i[h].fire(e,r,!0),r.originalEvent._stopped||i[h].options.nonBubblingEvents&&o.Util.indexOf(i[h].options.nonBubblingEvents,e)!==-1)return}},_draggableMoved:function(t){return t=t.dragging&&t.dragging.enabled()?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var t=0,e=this._handlers.length;t<e;t++)this._handlers[t].disable()},whenReady:function(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this},_getMapPanePos:function(){return o.DomUtil.getPosition(this._mapPane)||new o.Point(0,0)},_moved:function(){var t=this._getMapPanePos();return t&&!t.equals([0,0])},_getTopLeftPoint:function(t,e){var n=t&&e!==i?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return n.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(n)},_latLngBoundsToNewLayerBounds:function(t,e,i){var n=this._getNewPixelOrigin(i,e);return o.bounds([this.project(t.getSouthWest(),e)._subtract(n),this.project(t.getNorthWest(),e)._subtract(n),this.project(t.getSouthEast(),e)._subtract(n),this.project(t.getNorthEast(),e)._subtract(n)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())},_limitCenter:function(t,e,i){if(!i)return t;var n=this.project(t,e),s=this.getSize().divideBy(2),r=new o.Bounds(n.subtract(s),n.add(s)),a=this._getBoundsOffset(r,i,e);return a.round().equals([0,0])?t:this.unproject(n.add(a),e)},_limitOffset:function(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new o.Bounds(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e))},_getBoundsOffset:function(t,e,i){var n=o.bounds(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),s=n.min.subtract(t.min),r=n.max.subtract(t.max),a=this._rebound(s.x,-r.x),h=this._rebound(s.y,-r.y);return new o.Point(a,h)},_rebound:function(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e))},_limitZoom:function(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=o.Browser.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){o.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(t,e){var i=this._getCenterOffset(t)._floor();return!((e&&e.animate)!==!0&&!this.getSize().contains(i))&&(this.panBy(i,e),!0)},_createAnimProxy:function(){var t=this._proxy=o.DomUtil.create("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var i=o.DomUtil.TRANSFORM,n=t.style[i];o.DomUtil.setTransform(t,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===t.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",function(){var e=this.getCenter(),i=this.getZoom();o.DomUtil.setTransform(t,this.project(e,i),this.getZoomScale(i,1))},this)},_catchTransitionEnd:function(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),s=this._getCenterOffset(t)._divideBy(1-1/n);return!(i.animate!==!0&&!this.getSize().contains(s))&&(o.Util.requestAnimFrame(function(){this._moveStart(!0)._animateZoom(t,e,!0)},this),!0)},_animateZoom:function(t,e,i,n){i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,o.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),setTimeout(o.bind(this._onZoomTransitionEnd,this),250)},_onZoomTransitionEnd:function(){this._animatingZoom&&(o.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom),o.Util.requestAnimFrame(function(){this._moveEnd(!0)},this))}}),o.map=function(t,e){return new o.Map(t,e)},o.Layer=o.Evented.extend({options:{pane:"overlayPane",nonBubblingEvents:[],attribution:null},addTo:function(t){return t.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(t){return t&&t.removeLayer(this),this},getPane:function(t){return this._map.getPane(t?this.options[t]||t:this.options.pane)},addInteractiveTarget:function(t){return this._map._targets[o.stamp(t)]=this,this},removeInteractiveTarget:function(t){return delete this._map._targets[o.stamp(t)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents();e.on(i,this),this.once("remove",function(){e.off(i,this)},this)}this.onAdd(e),this.getAttribution&&this._map.attributionControl&&this._map.attributionControl.addAttribution(this.getAttribution()),this.fire("add"),e.fire("layeradd",{layer:this})}}}),o.Map.include({addLayer:function(t){var e=o.stamp(t);return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this)},removeLayer:function(t){var e=o.stamp(t);return this._layers[e]?(this._loaded&&t.onRemove(this),t.getAttribution&&this.attributionControl&&this.attributionControl.removeAttribution(t.getAttribution()),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this},hasLayer:function(t){return!!t&&o.stamp(t)in this._layers},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},_addLayers:function(t){t=t?o.Util.isArray(t)?t:[t]:[];for(var e=0,i=t.length;e<i;e++)this.addLayer(t[e])},_addZoomLimit:function(t){!isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[o.stamp(t)]=t,this._updateZoomLevels())},_removeZoomLimit:function(t){var e=o.stamp(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels())},_updateZoomLevels:function(){var t=1/0,e=-(1/0),n=this._getZoomSpan();for(var o in this._zoomBoundLayers){var s=this._zoomBoundLayers[o].options;t=s.minZoom===i?t:Math.min(t,s.minZoom),e=s.maxZoom===i?e:Math.max(e,s.maxZoom)}this._layersMaxZoom=e===-(1/0)?i:e,this._layersMinZoom=t===1/0?i:t,n!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===i&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===i&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var r="_leaflet_events";o.DomEvent={on:function(t,e,i,n){if("object"==typeof e)for(var s in e)this._on(t,s,e[s],i);else{e=o.Util.splitWords(e);for(var r=0,a=e.length;r<a;r++)this._on(t,e[r],i,n)}return this},off:function(t,e,i,n){if("object"==typeof e)for(var s in e)this._off(t,s,e[s],i);else{e=o.Util.splitWords(e);for(var r=0,a=e.length;r<a;r++)this._off(t,e[r],i,n)}return this},_on:function(e,i,n,s){var a=i+o.stamp(n)+(s?"_"+o.stamp(s):"");if(e[r]&&e[r][a])return this;var h=function(i){return n.call(s||e,i||t.event)},l=h;return o.Browser.pointer&&0===i.indexOf("touch")?this.addPointerListener(e,i,h,a):o.Browser.touch&&"dblclick"===i&&this.addDoubleTapListener?this.addDoubleTapListener(e,h,a):"addEventListener"in e?"mousewheel"===i?e.addEventListener("onwheel"in e?"wheel":"mousewheel",h,!1):"mouseenter"===i||"mouseleave"===i?(h=function(i){i=i||t.event,o.DomEvent._isExternalTarget(e,i)&&l(i)},e.addEventListener("mouseenter"===i?"mouseover":"mouseout",h,!1)):("click"===i&&o.Browser.android&&(h=function(t){return o.DomEvent._filterClick(t,l)}),e.addEventListener(i,h,!1)):"attachEvent"in e&&e.attachEvent("on"+i,h),e[r]=e[r]||{},e[r][a]=h,this},_off:function(t,e,i,n){var s=e+o.stamp(i)+(n?"_"+o.stamp(n):""),a=t[r]&&t[r][s];return a?(o.Browser.pointer&&0===e.indexOf("touch")?this.removePointerListener(t,e,s):o.Browser.touch&&"dblclick"===e&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,s):"removeEventListener"in t?"mousewheel"===e?t.removeEventListener("onwheel"in t?"wheel":"mousewheel",a,!1):t.removeEventListener("mouseenter"===e?"mouseover":"mouseleave"===e?"mouseout":e,a,!1):"detachEvent"in t&&t.detachEvent("on"+e,a),t[r][s]=null,this):this},stopPropagation:function(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,o.DomEvent._skipped(t),this},disableScrollPropagation:function(t){return o.DomEvent.on(t,"mousewheel",o.DomEvent.stopPropagation)},disableClickPropagation:function(t){var e=o.DomEvent.stopPropagation;return o.DomEvent.on(t,o.Draggable.START.join(" "),e),o.DomEvent.on(t,{click:o.DomEvent._fakeStop,dblclick:e})},preventDefault:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this},stop:function(t){return o.DomEvent.preventDefault(t).stopPropagation(t)},getMousePosition:function(t,e){if(!e)return new o.Point(t.clientX,t.clientY);var i=e.getBoundingClientRect();return new o.Point(t.clientX-i.left-e.clientLeft,t.clientY-i.top-e.clientTop)},_wheelPxFactor:o.Browser.win&&o.Browser.chrome?2:o.Browser.gecko?t.devicePixelRatio:1,getWheelDelta:function(t){return o.Browser.edge?t.wheelDeltaY/2:t.deltaY&&0===t.deltaMode?-t.deltaY/o.DomEvent._wheelPxFactor:t.deltaY&&1===t.deltaMode?20*-t.deltaY:t.deltaY&&2===t.deltaMode?60*-t.deltaY:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?20*-t.detail:t.detail?t.detail/-32765*60:0},_skipEvents:{},_fakeStop:function(t){o.DomEvent._skipEvents[t.type]=!0},_skipped:function(t){var e=this._skipEvents[t.type];return this._skipEvents[t.type]=!1,e},_isExternalTarget:function(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;)i=i.parentNode}catch(t){return!1}return i!==t},_filterClick:function(t,e){var i=t.timeStamp||t.originalEvent&&t.originalEvent.timeStamp,n=o.DomEvent._lastClick&&i-o.DomEvent._lastClick;return n&&n>100&&n<500||t.target._simulatedClick&&!t._simulated?void o.DomEvent.stop(t):(o.DomEvent._lastClick=i,void e(t))}},o.DomEvent.addListener=o.DomEvent.on,o.DomEvent.removeListener=o.DomEvent.off,o.PosAnimation=o.Evented.extend({run:function(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=o.DomUtil.getPosition(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=o.Util.requestAnimFrame(this._animate,this),this._step()},_step:function(t){var e=+new Date-this._startTime,i=1e3*this._duration;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete())},_runFrame:function(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),o.DomUtil.setPosition(this._el,i),this.fire("step")},_complete:function(){o.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(t){return 1-Math.pow(1-t,this._easeOutPower)}}),o.Projection.Mercator={R:6378137,R_MINOR:6356752.314245179,bounds:o.bounds([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function(t){var e=Math.PI/180,i=this.R,n=t.lat*e,s=this.R_MINOR/i,r=Math.sqrt(1-s*s),a=r*Math.sin(n),h=Math.tan(Math.PI/4-n/2)/Math.pow((1-a)/(1+a),r/2);return n=-i*Math.log(Math.max(h,1e-10)),new o.Point(t.lng*e*i,n)},unproject:function(t){for(var e,i=180/Math.PI,n=this.R,s=this.R_MINOR/n,r=Math.sqrt(1-s*s),a=Math.exp(-t.y/n),h=Math.PI/2-2*Math.atan(a),l=0,u=.1;l<15&&Math.abs(u)>1e-7;l++)e=r*Math.sin(h),e=Math.pow((1-e)/(1+e),r/2),u=Math.PI/2-2*Math.atan(a*e)-h,h+=u;return new o.LatLng(h*i,t.x*i/n)}},o.CRS.EPSG3395=o.extend({},o.CRS.Earth,{code:"EPSG:3395",projection:o.Projection.Mercator,transformation:function(){var t=.5/(Math.PI*o.Projection.Mercator.R);return new o.Transformation(t,.5,-t,.5)}()}),o.GridLayer=o.Layer.extend({options:{tileSize:256,opacity:1,updateWhenIdle:o.Browser.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:i,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(t){o.setOptions(this,t)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView(),this._update()},beforeAdd:function(t){t._addZoomLimit(this)},onRemove:function(t){this._removeAllTiles(),o.DomUtil.remove(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=null},bringToFront:function(){return this._map&&(o.DomUtil.toFront(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(o.DomUtil.toBack(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(t){return this.options.opacity=t,this._updateOpacity(),this},setZIndex:function(t){return this.options.zIndex=t,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){return this._map&&(this._removeAllTiles(),this._update()),this},getEvents:function(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=o.Util.throttle(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},createTile:function(){return e.createElement("div")},getTileSize:function(){var t=this.options.tileSize;return t instanceof o.Point?t:new o.Point(t,t)},_updateZIndex:function(){this._container&&this.options.zIndex!==i&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(t){for(var e,i=this.getPane().children,n=-t(-(1/0),1/0),o=0,s=i.length;o<s;o++)e=i[o].style.zIndex,i[o]!==this._container&&e&&(n=t(n,+e));isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!o.Browser.ielt9){o.DomUtil.setOpacity(this._container,this.options.opacity);var t=+new Date,e=!1,i=!1;for(var n in this._tiles){var s=this._tiles[n];if(s.current&&s.loaded){var r=Math.min(1,(t-s.loaded)/200);o.DomUtil.setOpacity(s.el,r),r<1?e=!0:(s.active&&(i=!0),s.active=!0)}}i&&!this._noPrune&&this._pruneTiles(),e&&(o.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=o.Util.requestAnimFrame(this._updateOpacity,this))}},_initContainer:function(){this._container||(this._container=o.DomUtil.create("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var t=this._tileZoom,e=this.options.maxZoom;if(t===i)return i;for(var n in this._levels)this._levels[n].el.children.length||n===t?this._levels[n].el.style.zIndex=e-Math.abs(t-n):(o.DomUtil.remove(this._levels[n].el),this._removeTilesAtZoom(n),delete this._levels[n]);var s=this._levels[t],r=this._map;return s||(s=this._levels[t]={},s.el=o.DomUtil.create("div","leaflet-tile-container leaflet-zoom-animated",this._container),s.el.style.zIndex=e,s.origin=r.project(r.unproject(r.getPixelOrigin()),t).round(),s.zoom=t,this._setZoomTransform(s,r.getCenter(),r.getZoom()),o.Util.falseFn(s.el.offsetWidth)),this._level=s,s},_pruneTiles:function(){if(this._map){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom)return void this._removeAllTiles();for(t in this._tiles)e=this._tiles[t],e.retain=e.current;for(t in this._tiles)if(e=this._tiles[t],e.current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2)}for(t in this._tiles)this._tiles[t].retain||this._removeTile(t)}},_removeTilesAtZoom:function(t){for(var e in this._tiles)this._tiles[e].coords.z===t&&this._removeTile(e)},_removeAllTiles:function(){for(var t in this._tiles)this._removeTile(t)},_invalidateAll:function(){for(var t in this._levels)o.DomUtil.remove(this._levels[t].el),delete this._levels[t];this._removeAllTiles(),this._tileZoom=null},_retainParent:function(t,e,i,n){var s=Math.floor(t/2),r=Math.floor(e/2),a=i-1,h=new o.Point(+s,+r);h.z=+a;var l=this._tileCoordsToKey(h),u=this._tiles[l];return u&&u.active?(u.retain=!0,!0):(u&&u.loaded&&(u.retain=!0),a>n&&this._retainParent(s,r,a,n))},_retainChildren:function(t,e,i,n){for(var s=2*t;s<2*t+2;s++)for(var r=2*e;r<2*e+2;r++){var a=new o.Point(s,r);a.z=i+1;var h=this._tileCoordsToKey(a),l=this._tiles[h];l&&l.active?l.retain=!0:(l&&l.loaded&&(l.retain=!0),i+1<n&&this._retainChildren(s,r,i+1,n))}},_resetView:function(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e)},_animateZoom:function(t){this._setView(t.center,t.zoom,!0,t.noUpdate)},_setView:function(t,e,n,o){var s=Math.round(e);(this.options.maxZoom!==i&&s>this.options.maxZoom||this.options.minZoom!==i&&s<this.options.minZoom)&&(s=i);var r=this.options.updateWhenZooming&&s!==this._tileZoom;o&&!r||(this._tileZoom=s,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),s!==i&&this._update(t),n||this._pruneTiles(),this._noPrune=!!n),this._setZoomTransforms(t,e)},_setZoomTransforms:function(t,e){for(var i in this._levels)this._setZoomTransform(this._levels[i],t,e)},_setZoomTransform:function(t,e,i){var n=this._map.getZoomScale(i,t.zoom),s=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();o.Browser.any3d?o.DomUtil.setTransform(t.el,s,n):o.DomUtil.setPosition(t.el,s)},_resetGrid:function(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)]},_onMoveEnd:function(){this._map&&!this._map._animatingZoom&&this._update()},_getTiledPixelBounds:function(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),s=e.project(t,this._tileZoom).floor(),r=e.getSize().divideBy(2*n);return new o.Bounds(s.subtract(r),s.add(r))},_update:function(t){var n=this._map;if(n){var s=n.getZoom();if(t===i&&(t=n.getCenter()),this._tileZoom!==i){var r=this._getTiledPixelBounds(t),a=this._pxBoundsToTileRange(r),h=a.getCenter(),l=[],u=this.options.keepBuffer,c=new o.Bounds(a.getBottomLeft().subtract([u,-u]),a.getTopRight().add([u,-u]));for(var d in this._tiles){var _=this._tiles[d].coords;_.z===this._tileZoom&&c.contains(o.point(_.x,_.y))||(this._tiles[d].current=!1)}if(Math.abs(s-this._tileZoom)>1)return void this._setView(t,s);for(var m=a.min.y;m<=a.max.y;m++)for(var p=a.min.x;p<=a.max.x;p++){var f=new o.Point(p,m);if(f.z=this._tileZoom,this._isValidTile(f)){var g=this._tiles[this._tileCoordsToKey(f)];g?g.current=!0:l.push(f)}}if(l.sort(function(t,e){return t.distanceTo(h)-e.distanceTo(h)}),0!==l.length){this._loading||(this._loading=!0,this.fire("loading"));var v=e.createDocumentFragment();for(p=0;p<l.length;p++)this._addTile(l[p],v);this._level.el.appendChild(v)}}}},_isValidTile:function(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return o.latLngBounds(this.options.bounds).overlaps(n)},_keyToBounds:function(t){return this._tileCoordsToBounds(this._keyToTileCoords(t))},_tileCoordsToBounds:function(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),s=n.add(i),r=e.unproject(n,t.z),a=e.unproject(s,t.z);return this.options.noWrap||(r=e.wrapLatLng(r),a=e.wrapLatLng(a)),new o.LatLngBounds(r,a)},_tileCoordsToKey:function(t){return t.x+":"+t.y+":"+t.z},_keyToTileCoords:function(t){var e=t.split(":"),i=new o.Point(+e[0],+e[1]);return i.z=+e[2],i},_removeTile:function(t){var e=this._tiles[t];e&&(o.DomUtil.remove(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}))},_initTile:function(t){o.DomUtil.addClass(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=o.Util.falseFn,t.onmousemove=o.Util.falseFn,o.Browser.ielt9&&this.options.opacity<1&&o.DomUtil.setOpacity(t,this.options.opacity),o.Browser.android&&!o.Browser.android23&&(t.style.WebkitBackfaceVisibility="hidden")},_addTile:function(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),s=this.createTile(this._wrapCoords(t),o.bind(this._tileReady,this,t));this._initTile(s),this.createTile.length<2&&o.Util.requestAnimFrame(o.bind(this._tileReady,this,t,null,s)),o.DomUtil.setPosition(s,i),this._tiles[n]={el:s,coords:t,current:!0},e.appendChild(s),this.fire("tileloadstart",{tile:s,coords:t})},_tileReady:function(t,e,i){if(this._map){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);i=this._tiles[n],i&&(i.loaded=+new Date,this._map._fadeAnimated?(o.DomUtil.setOpacity(i.el,0),o.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=o.Util.requestAnimFrame(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(o.DomUtil.addClass(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),o.Browser.ielt9||!this._map._fadeAnimated?o.Util.requestAnimFrame(this._pruneTiles,this):setTimeout(o.bind(this._pruneTiles,this),250)))}},_getTilePos:function(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(t){var e=new o.Point(this._wrapX?o.Util.wrapNum(t.x,this._wrapX):t.x,this._wrapY?o.Util.wrapNum(t.y,this._wrapY):t.y);return e.z=t.z,e},_pxBoundsToTileRange:function(t){var e=this.getTileSize();return new o.Bounds(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var t in this._tiles)if(!this._tiles[t].loaded)return!1;return!0}}),o.gridLayer=function(t){return new o.GridLayer(t)},o.TileLayer=o.GridLayer.extend({options:{minZoom:0,maxZoom:18,maxNativeZoom:null,minNativeZoom:null,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1},initialize:function(t,e){this._url=t,e=o.setOptions(this,e),e.detectRetina&&o.Browser.retina&&e.maxZoom>0&&(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom++):(e.zoomOffset++,e.maxZoom--),e.minZoom=Math.max(0,e.minZoom)),"string"==typeof e.subdomains&&(e.subdomains=e.subdomains.split("")),o.Browser.android||this.on("tileunload",this._onTileRemove)},setUrl:function(t,e){return this._url=t,e||this.redraw(),this},createTile:function(t,i){var n=e.createElement("img");return o.DomEvent.on(n,"load",o.bind(this._tileOnLoad,this,i,n)),o.DomEvent.on(n,"error",o.bind(this._tileOnError,this,i,n)),this.options.crossOrigin&&(n.crossOrigin=""),n.alt="",n.setAttribute("role","presentation"),n.src=this.getTileUrl(t),n},getTileUrl:function(t){var e={r:o.Browser.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i}return o.Util.template(this._url,o.extend(e,this.options))},_tileOnLoad:function(t,e){o.Browser.ielt9?setTimeout(o.bind(t,this,null,e),0):t(null,e)},_tileOnError:function(t,e,i){var n=this.options.errorTileUrl;n&&(e.src=n),t(i,e)},getTileSize:function(){var t=this._map,e=o.GridLayer.prototype.getTileSize.call(this),i=this._tileZoom+this.options.zoomOffset,n=this.options.minNativeZoom,s=this.options.maxNativeZoom;return null!==n&&i<n?e.divideBy(t.getZoomScale(n,i)).round():null!==s&&i>s?e.divideBy(t.getZoomScale(s,i)).round():e},_onTileRemove:function(t){t.tile.onload=null},_getZoomForUrl:function(){var t=this._tileZoom,e=this.options.maxZoom,i=this.options.zoomReverse,n=this.options.zoomOffset,o=this.options.minNativeZoom,s=this.options.maxNativeZoom;return i&&(t=e-t),t+=n,null!==o&&t<o?o:null!==s&&t>s?s:t},_getSubdomain:function(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e]},_abortLoading:function(){var t,e;for(t in this._tiles)this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=o.Util.falseFn,e.onerror=o.Util.falseFn,e.complete||(e.src=o.Util.emptyImageUrl,o.DomUtil.remove(e)))}}),o.tileLayer=function(t,e){return new o.TileLayer(t,e)},o.TileLayer.WMS=o.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(t,e){this._url=t;var i=o.extend({},this.defaultWmsParams);for(var n in e)n in this.options||(i[n]=e[n]);e=o.setOptions(this,e),i.width=i.height=e.tileSize*(e.detectRetina&&o.Browser.retina?2:1),this.wmsParams=i},onAdd:function(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,o.TileLayer.prototype.onAdd.call(this,t)},getTileUrl:function(t){var e=this._tileCoordsToBounds(t),i=this._crs.project(e.getNorthWest()),n=this._crs.project(e.getSouthEast()),s=(this._wmsVersion>=1.3&&this._crs===o.CRS.EPSG4326?[n.y,i.x,i.y,n.x]:[i.x,n.y,n.x,i.y]).join(","),r=o.TileLayer.prototype.getTileUrl.call(this,t);return r+o.Util.getParamString(this.wmsParams,r,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+s},setParams:function(t,e){return o.extend(this.wmsParams,t),e||this.redraw(),this}}),o.tileLayer.wms=function(t,e){return new o.TileLayer.WMS(t,e)},o.ImageOverlay=o.Layer.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1},initialize:function(t,e,i){this._url=t,this._bounds=o.latLngBounds(e),o.setOptions(this,i)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(o.DomUtil.addClass(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){o.DomUtil.remove(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this},setStyle:function(t){return t.opacity&&this.setOpacity(t.opacity),this},bringToFront:function(){return this._map&&o.DomUtil.toFront(this._image),this},bringToBack:function(){return this._map&&o.DomUtil.toBack(this._image),this},setUrl:function(t){return this._url=t,this._image&&(this._image.src=t),this},setBounds:function(t){return this._bounds=t,this._map&&this._reset(),this},getEvents:function(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var t=this._image=o.DomUtil.create("img","leaflet-image-layer "+(this._zoomAnimated?"leaflet-zoom-animated":""));t.onselectstart=o.Util.falseFn,t.onmousemove=o.Util.falseFn,t.onload=o.bind(this.fire,this,"load"),this.options.crossOrigin&&(t.crossOrigin=""),t.src=this._url,t.alt=this.options.alt},_animateZoom:function(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngBoundsToNewLayerBounds(this._bounds,t.zoom,t.center).min;o.DomUtil.setTransform(this._image,i,e)},_reset:function(){var t=this._image,e=new o.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();o.DomUtil.setPosition(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px"},_updateOpacity:function(){
o.DomUtil.setOpacity(this._image,this.options.opacity)}}),o.imageOverlay=function(t,e,i){return new o.ImageOverlay(t,e,i)},o.Icon=o.Class.extend({initialize:function(t){o.setOptions(this,t)},createIcon:function(t){return this._createIcon("icon",t)},createShadow:function(t){return this._createIcon("shadow",t)},_createIcon:function(t,e){var i=this._getIconUrl(t);if(!i){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null}var n=this._createImg(i,e&&"IMG"===e.tagName?e:null);return this._setIconStyles(n,t),n},_setIconStyles:function(t,e){var i=this.options,n=i[e+"Size"];"number"==typeof n&&(n=[n,n]);var s=o.point(n),r=o.point("shadow"===e&&i.shadowAnchor||i.iconAnchor||s&&s.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),r&&(t.style.marginLeft=-r.x+"px",t.style.marginTop=-r.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px")},_createImg:function(t,i){return i=i||e.createElement("img"),i.src=t,i},_getIconUrl:function(t){return o.Browser.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"]}}),o.icon=function(t){return new o.Icon(t)},o.Icon.Default=o.Icon.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(t){return o.Icon.Default.imagePath||(o.Icon.Default.imagePath=this._detectIconPath()),(this.options.imagePath||o.Icon.Default.imagePath)+o.Icon.prototype._getIconUrl.call(this,t)},_detectIconPath:function(){var t=o.DomUtil.create("div","leaflet-default-icon-path",e.body),i=o.DomUtil.getStyle(t,"background-image")||o.DomUtil.getStyle(t,"backgroundImage");return e.body.removeChild(t),0===i.indexOf("url")?i.replace(/^url\([\"\']?/,"").replace(/marker-icon\.png[\"\']?\)$/,""):""}}),o.Marker=o.Layer.extend({options:{icon:new o.Icon.Default,interactive:!0,draggable:!1,keyboard:!0,title:"",alt:"",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",nonBubblingEvents:["click","dblclick","mouseover","mouseout","contextmenu"]},initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t)},onAdd:function(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(t){var e=this._latlng;return this._latlng=o.latLng(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng})},setZIndexOffset:function(t){return this.options.zIndexOffset=t,this.update()},setIcon:function(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t)}return this},_initIcon:function(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),t.alt&&(i.alt=t.alt)),o.DomUtil.addClass(i,e),t.keyboard&&(i.tabIndex="0"),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex});var s=t.icon.createShadow(this._shadow),r=!1;s!==this._shadow&&(this._removeShadow(),r=!0),s&&o.DomUtil.addClass(s,e),this._shadow=s,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),s&&r&&this.getPane("shadowPane").appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),o.DomUtil.remove(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&o.DomUtil.remove(this._shadow),this._shadow=null},_setPos:function(t){o.DomUtil.setPosition(this._icon,t),this._shadow&&o.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(t){this._icon.style.zIndex=this._zIndex+t},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e)},_initInteraction:function(){if(this.options.interactive&&(o.DomUtil.addClass(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),o.Handler.MarkerDrag)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new o.Handler.MarkerDrag(this),t&&this.dragging.enable()}},setOpacity:function(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var t=this.options.opacity;o.DomUtil.setOpacity(this._icon,t),this._shadow&&o.DomUtil.setOpacity(this._shadow,t)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor||[0,0]},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor||[0,0]}}),o.marker=function(t,e){return new o.Marker(t,e)},o.DivIcon=o.Icon.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(t){var i=t&&"DIV"===t.tagName?t:e.createElement("div"),n=this.options;if(i.innerHTML=n.html!==!1?n.html:"",n.bgPos){var s=o.point(n.bgPos);i.style.backgroundPosition=-s.x+"px "+-s.y+"px"}return this._setIconStyles(i,"icon"),i},createShadow:function(){return null}}),o.divIcon=function(t){return new o.DivIcon(t)},o.DivOverlay=o.Layer.extend({options:{offset:[0,7],className:"",pane:"popupPane"},initialize:function(t,e){o.setOptions(this,t),this._source=e},onAdd:function(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&o.DomUtil.setOpacity(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&o.DomUtil.setOpacity(this._container,1),this.bringToFront()},onRemove:function(t){t._fadeAnimated?(o.DomUtil.setOpacity(this._container,0),this._removeTimeout=setTimeout(o.bind(o.DomUtil.remove,o.DomUtil,this._container),200)):o.DomUtil.remove(this._container)},getLatLng:function(){return this._latlng},setLatLng:function(t){return this._latlng=o.latLng(t),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(t){return this._content=t,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&o.DomUtil.toFront(this._container),this},bringToBack:function(){return this._map&&o.DomUtil.toBack(this._container),this},_updateContent:function(){if(this._content){var t=this._contentNode,e="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof e)t.innerHTML=e;else{for(;t.hasChildNodes();)t.removeChild(t.firstChild);t.appendChild(e)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=o.point(this.options.offset),i=this._getAnchor();this._zoomAnimated?o.DomUtil.setPosition(this._container,t.add(i)):e=e.add(t).add(i);var n=this._containerBottom=-e.y,s=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=n+"px",this._container.style.left=s+"px"}},_getAnchor:function(){return[0,0]}}),o.Popup=o.DivOverlay.extend({options:{maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,className:""},openOn:function(t){return t.openPopup(this),this},onAdd:function(t){o.DivOverlay.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof o.Path||this._source.on("preclick",o.DomEvent.stopPropagation))},onRemove:function(t){o.DivOverlay.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof o.Path||this._source.off("preclick",o.DomEvent.stopPropagation))},getEvents:function(){var t=o.DivOverlay.prototype.getEvents.call(this);return("closeOnClick"in this.options?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t},_close:function(){this._map&&this._map.closePopup(this)},_initLayout:function(){var t="leaflet-popup",e=this._container=o.DomUtil.create("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated");if(this.options.closeButton){var i=this._closeButton=o.DomUtil.create("a",t+"-close-button",e);i.href="#close",i.innerHTML="&#215;",o.DomEvent.on(i,"click",this._onCloseButtonClick,this)}var n=this._wrapper=o.DomUtil.create("div",t+"-content-wrapper",e);this._contentNode=o.DomUtil.create("div",t+"-content",n),o.DomEvent.disableClickPropagation(n).disableScrollPropagation(this._contentNode).on(n,"contextmenu",o.DomEvent.stopPropagation),this._tipContainer=o.DomUtil.create("div",t+"-tip-container",e),this._tip=o.DomUtil.create("div",t+"-tip",this._tipContainer)},_updateLayout:function(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,s=this.options.maxHeight,r="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",o.DomUtil.addClass(t,r)):o.DomUtil.removeClass(t,r),this._containerWidth=this._container.offsetWidth},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor();o.DomUtil.setPosition(this._container,e.add(i))},_adjustPan:function(){if(!(!this.options.autoPan||this._map._panAnim&&this._map._panAnim._inProgress)){var t=this._map,e=parseInt(o.DomUtil.getStyle(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,s=new o.Point(this._containerLeft,-i-this._containerBottom);s._add(o.DomUtil.getPosition(this._container));var r=t.layerPointToContainerPoint(s),a=o.point(this.options.autoPanPadding),h=o.point(this.options.autoPanPaddingTopLeft||a),l=o.point(this.options.autoPanPaddingBottomRight||a),u=t.getSize(),c=0,d=0;r.x+n+l.x>u.x&&(c=r.x+n-u.x+l.x),r.x-c-h.x<0&&(c=r.x-h.x),r.y+i+l.y>u.y&&(d=r.y+i-u.y+l.y),r.y-d-h.y<0&&(d=r.y-h.y),(c||d)&&t.fire("autopanstart").panBy([c,d])}},_onCloseButtonClick:function(t){this._close(),o.DomEvent.stop(t)},_getAnchor:function(){return o.point(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),o.popup=function(t,e){return new o.Popup(t,e)},o.Map.mergeOptions({closePopupOnClick:!0}),o.Map.include({openPopup:function(t,e,i){return t instanceof o.Popup||(t=new o.Popup(i).setContent(t)),e&&t.setLatLng(e),this.hasLayer(t)?this:(this._popup&&this._popup.options.autoClose&&this.closePopup(),this._popup=t,this.addLayer(t))},closePopup:function(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&this.removeLayer(t),this}}),o.Layer.include({bindPopup:function(t,e){return t instanceof o.Popup?(o.setOptions(t,e),this._popup=t,t._source=this):(this._popup&&!e||(this._popup=new o.Popup(e,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(t,e){if(t instanceof o.Layer||(e=t,t=this),t instanceof o.FeatureGroup)for(var i in this._layers){t=this._layers[i];break}return e||(e=t.getCenter?t.getCenter():t.getLatLng()),this._popup&&this._map&&(this._popup._source=t,this._popup.update(),this._map.openPopup(this._popup,e)),this},closePopup:function(){return this._popup&&this._popup._close(),this},togglePopup:function(t){return this._popup&&(this._popup._map?this.closePopup():this.openPopup(t)),this},isPopupOpen:function(){return this._popup.isOpen()},setPopupContent:function(t){return this._popup&&this._popup.setContent(t),this},getPopup:function(){return this._popup},_openPopup:function(t){var e=t.layer||t.target;if(this._popup&&this._map)return o.DomEvent.stop(t),e instanceof o.Path?void this.openPopup(t.layer||t.target,t.latlng):void(this._map.hasLayer(this._popup)&&this._popup._source===e?this.closePopup():this.openPopup(e,t.latlng))},_movePopup:function(t){this._popup.setLatLng(t.latlng)}}),o.Tooltip=o.DivOverlay.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,interactive:!1,opacity:.9},onAdd:function(t){o.DivOverlay.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&this._source.fire("tooltipopen",{tooltip:this},!0)},onRemove:function(t){o.DivOverlay.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&this._source.fire("tooltipclose",{tooltip:this},!0)},getEvents:function(){var t=o.DivOverlay.prototype.getEvents.call(this);return o.Browser.touch&&!this.options.permanent&&(t.preclick=this._close),t},_close:function(){this._map&&this._map.closeTooltip(this)},_initLayout:function(){var t="leaflet-tooltip",e=t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=o.DomUtil.create("div",e)},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(t){var e=this._map,i=this._container,n=e.latLngToContainerPoint(e.getCenter()),s=e.layerPointToContainerPoint(t),r=this.options.direction,a=i.offsetWidth,h=i.offsetHeight,l=o.point(this.options.offset),u=this._getAnchor();"top"===r?t=t.add(o.point(-a/2+l.x,-h+l.y+u.y,!0)):"bottom"===r?t=t.subtract(o.point(a/2-l.x,-l.y,!0)):"center"===r?t=t.subtract(o.point(a/2+l.x,h/2-u.y+l.y,!0)):"right"===r||"auto"===r&&s.x<n.x?(r="right",t=t.add(o.point(l.x+u.x,u.y-h/2+l.y,!0))):(r="left",t=t.subtract(o.point(a+u.x-l.x,h/2-u.y-l.y,!0))),o.DomUtil.removeClass(i,"leaflet-tooltip-right"),o.DomUtil.removeClass(i,"leaflet-tooltip-left"),o.DomUtil.removeClass(i,"leaflet-tooltip-top"),o.DomUtil.removeClass(i,"leaflet-tooltip-bottom"),o.DomUtil.addClass(i,"leaflet-tooltip-"+r),o.DomUtil.setPosition(i,t)},_updatePosition:function(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t)},setOpacity:function(t){this.options.opacity=t,this._container&&o.DomUtil.setOpacity(this._container,t)},_animateZoom:function(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e)},_getAnchor:function(){return o.point(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),o.tooltip=function(t,e){return new o.Tooltip(t,e)},o.Map.include({openTooltip:function(t,e,i){return t instanceof o.Tooltip||(t=new o.Tooltip(i).setContent(t)),e&&t.setLatLng(e),this.hasLayer(t)?this:this.addLayer(t)},closeTooltip:function(t){return t&&this.removeLayer(t),this}}),o.Layer.include({bindTooltip:function(t,e){return t instanceof o.Tooltip?(o.setOptions(t,e),this._tooltip=t,t._source=this):(this._tooltip&&!e||(this._tooltip=o.tooltip(e,this)),this._tooltip.setContent(t)),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(t){if(t||!this._tooltipHandlersAdded){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),o.Browser.touch&&(i.click=this._openTooltip)),this[e](i),this._tooltipHandlersAdded=!t}},openTooltip:function(t,e){if(t instanceof o.Layer||(e=t,t=this),t instanceof o.FeatureGroup)for(var i in this._layers){t=this._layers[i];break}return e||(e=t.getCenter?t.getCenter():t.getLatLng()),this._tooltip&&this._map&&(this._tooltip._source=t,this._tooltip.update(),this._map.openTooltip(this._tooltip,e),this._tooltip.options.interactive&&this._tooltip._container&&(o.DomUtil.addClass(this._tooltip._container,"leaflet-clickable"),this.addInteractiveTarget(this._tooltip._container))),this},closeTooltip:function(){return this._tooltip&&(this._tooltip._close(),this._tooltip.options.interactive&&this._tooltip._container&&(o.DomUtil.removeClass(this._tooltip._container,"leaflet-clickable"),this.removeInteractiveTarget(this._tooltip._container))),this},toggleTooltip:function(t){return this._tooltip&&(this._tooltip._map?this.closeTooltip():this.openTooltip(t)),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(t){return this._tooltip&&this._tooltip.setContent(t),this},getTooltip:function(){return this._tooltip},_openTooltip:function(t){var e=t.layer||t.target;this._tooltip&&this._map&&this.openTooltip(e,this._tooltip.options.sticky?t.latlng:i)},_moveTooltip:function(t){var e,i,n=t.latlng;this._tooltip.options.sticky&&t.originalEvent&&(e=this._map.mouseEventToContainerPoint(t.originalEvent),i=this._map.containerPointToLayerPoint(e),n=this._map.layerPointToLatLng(i)),this._tooltip.setLatLng(n)}}),o.LayerGroup=o.Layer.extend({initialize:function(t){this._layers={};var e,i;if(t)for(e=0,i=t.length;e<i;e++)this.addLayer(t[e])},addLayer:function(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this},removeLayer:function(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this},hasLayer:function(t){return!!t&&(t in this._layers||this.getLayerId(t)in this._layers)},clearLayers:function(){for(var t in this._layers)this.removeLayer(this._layers[t]);return this},invoke:function(t){var e,i,n=Array.prototype.slice.call(arguments,1);for(e in this._layers)i=this._layers[e],i[t]&&i[t].apply(i,n);return this},onAdd:function(t){for(var e in this._layers)t.addLayer(this._layers[e])},onRemove:function(t){for(var e in this._layers)t.removeLayer(this._layers[e])},eachLayer:function(t,e){for(var i in this._layers)t.call(e,this._layers[i]);return this},getLayer:function(t){return this._layers[t]},getLayers:function(){var t=[];for(var e in this._layers)t.push(this._layers[e]);return t},setZIndex:function(t){return this.invoke("setZIndex",t)},getLayerId:function(t){return o.stamp(t)}}),o.layerGroup=function(t){return new o.LayerGroup(t)},o.FeatureGroup=o.LayerGroup.extend({addLayer:function(t){return this.hasLayer(t)?this:(t.addEventParent(this),o.LayerGroup.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}))},removeLayer:function(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),o.LayerGroup.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this},setStyle:function(t){return this.invoke("setStyle",t)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var t=new o.LatLngBounds;for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng())}return t}}),o.featureGroup=function(t){return new o.FeatureGroup(t)},o.Renderer=o.Layer.extend({options:{padding:.1},initialize:function(t){o.setOptions(this,t),o.stamp(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),this._zoomAnimated&&o.DomUtil.addClass(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){o.DomUtil.remove(this._container),this.off("update",this._updatePaths,this)},getEvents:function(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t},_onAnimZoom:function(t){this._updateTransform(t.center,t.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(t,e){var i=this._map.getZoomScale(e,this._zoom),n=o.DomUtil.getPosition(this._container),s=this._map.getSize().multiplyBy(.5+this.options.padding),r=this._map.project(this._center,e),a=this._map.project(t,e),h=a.subtract(r),l=s.multiplyBy(-i).add(n).add(s).subtract(h);o.Browser.any3d?o.DomUtil.setTransform(this._container,l,i):o.DomUtil.setPosition(this._container,l)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var t in this._layers)this._layers[t]._reset()},_onZoomEnd:function(){for(var t in this._layers)this._layers[t]._project()},_updatePaths:function(){for(var t in this._layers)this._layers[t]._update()},_update:function(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new o.Bounds(i,i.add(e.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),o.Map.include({getRenderer:function(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this.options.preferCanvas&&o.canvas()||o.svg()),this.hasLayer(e)||this.addLayer(e),e},_getPaneRenderer:function(t){if("overlayPane"===t||t===i)return!1;var e=this._paneRenderers[t];return e===i&&(e=o.SVG&&o.svg({pane:t})||o.Canvas&&o.canvas({pane:t}),this._paneRenderers[t]=e),e}}),o.Path=o.Layer.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0},beforeAdd:function(t){this._renderer=t.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(t){return o.setOptions(this,t),this._renderer&&this._renderer._updateStyle(this),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(o.Browser.touch?10:0)}}),o.LineUtil={simplify:function(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=this._reducePoints(t,i),t=this._simplifyDP(t,i)},pointToSegmentDistance:function(t,e,i){return Math.sqrt(this._sqClosestPointOnSegment(t,e,i,!0))},closestPointOnSegment:function(t,e,i){return this._sqClosestPointOnSegment(t,e,i)},_simplifyDP:function(t,e){var n=t.length,o=typeof Uint8Array!=i+""?Uint8Array:Array,s=new o(n);s[0]=s[n-1]=1,this._simplifyDPStep(t,s,e,0,n-1);var r,a=[];for(r=0;r<n;r++)s[r]&&a.push(t[r]);return a},_simplifyDPStep:function(t,e,i,n,o){var s,r,a,h=0;for(r=n+1;r<=o-1;r++)a=this._sqClosestPointOnSegment(t[r],t[n],t[o],!0),a>h&&(s=r,h=a);h>i&&(e[s]=1,this._simplifyDPStep(t,e,i,n,s),this._simplifyDPStep(t,e,i,s,o))},_reducePoints:function(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;n<s;n++)this._sqDist(t[n],t[o])>e&&(i.push(t[n]),o=n);return o<s-1&&i.push(t[s-1]),i},clipSegment:function(t,e,i,n,o){var s,r,a,h=n?this._lastCode:this._getBitCode(t,i),l=this._getBitCode(e,i);for(this._lastCode=l;;){if(!(h|l))return[t,e];if(h&l)return!1;s=h||l,r=this._getEdgeIntersection(t,e,s,i,o),a=this._getBitCode(r,i),s===h?(t=r,h=a):(e=r,l=a)}},_getEdgeIntersection:function(t,e,i,n,s){var r,a,h=e.x-t.x,l=e.y-t.y,u=n.min,c=n.max;return 8&i?(r=t.x+h*(c.y-t.y)/l,a=c.y):4&i?(r=t.x+h*(u.y-t.y)/l,a=u.y):2&i?(r=c.x,a=t.y+l*(c.x-t.x)/h):1&i&&(r=u.x,a=t.y+l*(u.x-t.x)/h),new o.Point(r,a,s)},_getBitCode:function(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i},_sqDist:function(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n},_sqClosestPointOnSegment:function(t,e,i,n){var s,r=e.x,a=e.y,h=i.x-r,l=i.y-a,u=h*h+l*l;return u>0&&(s=((t.x-r)*h+(t.y-a)*l)/u,s>1?(r=i.x,a=i.y):s>0&&(r+=h*s,a+=l*s)),h=t.x-r,l=t.y-a,n?h*h+l*l:new o.Point(r,a)}},o.Polyline=o.Path.extend({options:{smoothFactor:1,noClip:!1},initialize:function(t,e){o.setOptions(this,e),this._setLatLngs(t)},getLatLngs:function(){return this._latlngs},setLatLngs:function(t){return this._setLatLngs(t),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(t){for(var e,i,n=1/0,s=null,r=o.LineUtil._sqClosestPointOnSegment,a=0,h=this._parts.length;a<h;a++)for(var l=this._parts[a],u=1,c=l.length;u<c;u++){e=l[u-1],i=l[u];var d=r(t,e,i,!0);d<n&&(n=d,s=r(t,e,i))}return s&&(s.distance=Math.sqrt(n)),s},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,e,i,n,o,s,r,a=this._rings[0],h=a.length;if(!h)return null;for(t=0,e=0;t<h-1;t++)e+=a[t].distanceTo(a[t+1])/2;if(0===e)return this._map.layerPointToLatLng(a[0]);for(t=0,n=0;t<h-1;t++)if(o=a[t],s=a[t+1],i=o.distanceTo(s),n+=i,n>e)return r=(n-e)/i,this._map.layerPointToLatLng([s.x-r*(s.x-o.x),s.y-r*(s.y-o.y)])},getBounds:function(){return this._bounds},addLatLng:function(t,e){return e=e||this._defaultShape(),t=o.latLng(t),e.push(t),this._bounds.extend(t),this.redraw()},_setLatLngs:function(t){this._bounds=new o.LatLngBounds,this._latlngs=this._convertLatLngs(t)},_defaultShape:function(){return o.Polyline._flat(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(t){for(var e=[],i=o.Polyline._flat(t),n=0,s=t.length;n<s;n++)i?(e[n]=o.latLng(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);return e},_project:function(){var t=new o.Bounds;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t);var e=this._clickTolerance(),i=new o.Point(e,e);this._bounds.isValid()&&t.isValid()&&(t.min._subtract(i),t.max._add(i),this._pxBounds=t)},_projectLatlngs:function(t,e,i){var n,s,r=t[0]instanceof o.LatLng,a=t.length;if(r){for(s=[],n=0;n<a;n++)s[n]=this._map.latLngToLayerPoint(t[n]),i.extend(s[n]);e.push(s)}else for(n=0;n<a;n++)this._projectLatlngs(t[n],e,i)},_clipPoints:function(){var t=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t)){if(this.options.noClip)return void(this._parts=this._rings);var e,i,n,s,r,a,h,l=this._parts;for(e=0,n=0,s=this._rings.length;e<s;e++)for(h=this._rings[e],i=0,r=h.length;i<r-1;i++)a=o.LineUtil.clipSegment(h[i],h[i+1],t,i,!0),a&&(l[n]=l[n]||[],l[n].push(a[0]),a[1]===h[i+1]&&i!==r-2||(l[n].push(a[1]),n++))}},_simplifyPoints:function(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++)t[i]=o.LineUtil.simplify(t[i],e)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)}}),o.polyline=function(t,e){return new o.Polyline(t,e)},o.Polyline._flat=function(t){return!o.Util.isArray(t[0])||"object"!=typeof t[0][0]&&"undefined"!=typeof t[0][0]},o.PolyUtil={},o.PolyUtil.clipPolygon=function(t,e,i){var n,s,r,a,h,l,u,c,d,_=[1,4,2,8],m=o.LineUtil;for(s=0,u=t.length;s<u;s++)t[s]._code=m._getBitCode(t[s],e);for(a=0;a<4;a++){for(c=_[a],n=[],s=0,u=t.length,r=u-1;s<u;r=s++)h=t[s],l=t[r],h._code&c?l._code&c||(d=m._getEdgeIntersection(l,h,c,e,i),d._code=m._getBitCode(d,e),n.push(d)):(l._code&c&&(d=m._getEdgeIntersection(l,h,c,e,i),d._code=m._getBitCode(d,e),n.push(d)),n.push(h));t=n}return t},o.Polygon=o.Polyline.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,e,i,n,o,s,r,a,h,l=this._rings[0],u=l.length;if(!u)return null;for(s=r=a=0,t=0,e=u-1;t<u;e=t++)i=l[t],n=l[e],o=i.y*n.x-n.y*i.x,r+=(i.x+n.x)*o,a+=(i.y+n.y)*o,s+=3*o;return h=0===s?l[0]:[r/s,a/s],this._map.layerPointToLatLng(h)},_convertLatLngs:function(t){var e=o.Polyline.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof o.LatLng&&e[0].equals(e[i-1])&&e.pop(),e},_setLatLngs:function(t){o.Polyline.prototype._setLatLngs.call(this,t),o.Polyline._flat(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return o.Polyline._flat(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var t=this._renderer._bounds,e=this.options.weight,i=new o.Point(e,e);if(t=new o.Bounds(t.min.subtract(i),t.max.add(i)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(t)){if(this.options.noClip)return void(this._parts=this._rings);for(var n,s=0,r=this._rings.length;s<r;s++)n=o.PolyUtil.clipPolygon(this._rings[s],t,!0),n.length&&this._parts.push(n)}},_updatePath:function(){this._renderer._updatePoly(this,!0)}}),o.polygon=function(t,e){return new o.Polygon(t,e)},o.Rectangle=o.Polygon.extend({initialize:function(t,e){o.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(t),e)},setBounds:function(t){return this.setLatLngs(this._boundsToLatLngs(t))},_boundsToLatLngs:function(t){return t=o.latLngBounds(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()]}}),o.rectangle=function(t,e){return new o.Rectangle(t,e)},o.CircleMarker=o.Path.extend({options:{fill:!0,radius:10},initialize:function(t,e){o.setOptions(this,e),this._latlng=o.latLng(t),this._radius=this.options.radius},setLatLng:function(t){return this._latlng=o.latLng(t),this.redraw(),this.fire("move",{latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return o.Path.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new o.Bounds(this._point.subtract(n),this._point.add(n))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)}}),o.circleMarker=function(t,e){return new o.CircleMarker(t,e)},o.Circle=o.CircleMarker.extend({initialize:function(t,e,i){if("number"==typeof e&&(e=o.extend({},i,{radius:e})),o.setOptions(this,e),this._latlng=o.latLng(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(t){return this._mRadius=t,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var t=[this._radius,this._radiusY||this._radius];return new o.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)))},setStyle:o.Path.prototype.setStyle,_project:function(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;
if(n.distance===o.CRS.Earth.distance){var s=Math.PI/180,r=this._mRadius/o.CRS.Earth.R/s,a=i.project([e+r,t]),h=i.project([e-r,t]),l=a.add(h).divideBy(2),u=i.unproject(l).lat,c=Math.acos((Math.cos(r*s)-Math.sin(e*s)*Math.sin(u*s))/(Math.cos(e*s)*Math.cos(u*s)))/s;(isNaN(c)||0===c)&&(c=r/Math.cos(Math.PI/180*e)),this._point=l.subtract(i.getPixelOrigin()),this._radius=isNaN(c)?0:Math.max(Math.round(l.x-i.project([u,t-c]).x),1),this._radiusY=Math.max(Math.round(l.y-a.y),1)}else{var d=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(d).x}this._updateBounds()}}),o.circle=function(t,e,i){return new o.Circle(t,e,i)},o.SVG=o.Renderer.extend({getEvents:function(){var t=o.Renderer.prototype.getEvents.call(this);return t.zoomstart=this._onZoomStart,t},_initContainer:function(){this._container=o.SVG.create("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=o.SVG.create("g"),this._container.appendChild(this._rootGroup)},_onZoomStart:function(){this._update()},_update:function(){if(!this._map._animatingZoom||!this._bounds){o.Renderer.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;this._svgSize&&this._svgSize.equals(e)||(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),o.DomUtil.setPosition(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update")}},_initPath:function(t){var e=t._path=o.SVG.create("path");t.options.className&&o.DomUtil.addClass(e,t.options.className),t.options.interactive&&o.DomUtil.addClass(e,"leaflet-interactive"),this._updateStyle(t),this._layers[o.stamp(t)]=t},_addPath:function(t){this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path)},_removePath:function(t){o.DomUtil.remove(t._path),t.removeInteractiveTarget(t._path),delete this._layers[o.stamp(t)]},_updatePath:function(t){t._project(),t._update()},_updateStyle:function(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"))},_updatePoly:function(t,e){this._setPath(t,o.SVG.pointsToPath(t._parts,e))},_updateCircle:function(t){var e=t._point,i=t._radius,n=t._radiusY||i,o="a"+i+","+n+" 0 1,0 ",s=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+o+2*i+",0 "+o+2*-i+",0 ";this._setPath(t,s)},_setPath:function(t,e){t._path.setAttribute("d",e)},_bringToFront:function(t){o.DomUtil.toFront(t._path)},_bringToBack:function(t){o.DomUtil.toBack(t._path)}}),o.extend(o.SVG,{create:function(t){return e.createElementNS("http://www.w3.org/2000/svg",t)},pointsToPath:function(t,e){var i,n,s,r,a,h,l="";for(i=0,s=t.length;i<s;i++){for(a=t[i],n=0,r=a.length;n<r;n++)h=a[n],l+=(n?"L":"M")+h.x+" "+h.y;l+=e?o.Browser.svg?"z":"x":""}return l||"M0 0"}}),o.Browser.svg=!(!e.createElementNS||!o.SVG.create("svg").createSVGRect),o.svg=function(t){return o.Browser.svg||o.Browser.vml?new o.SVG(t):null},o.Browser.vml=!o.Browser.svg&&function(){try{var t=e.createElement("div");t.innerHTML='<v:shape adj="1"/>';var i=t.firstChild;return i.style.behavior="url(#default#VML)",i&&"object"==typeof i.adj}catch(t){return!1}}(),o.SVG.include(o.Browser.vml?{_initContainer:function(){this._container=o.DomUtil.create("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(o.Renderer.prototype._update.call(this),this.fire("update"))},_initPath:function(t){var e=t._container=o.SVG.create("shape");o.DomUtil.addClass(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=o.SVG.create("path"),e.appendChild(t._path),this._updateStyle(t)},_addPath:function(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e)},_removePath:function(t){var e=t._container;o.DomUtil.remove(e),t.removeInteractiveTarget(e)},_updateStyle:function(t){var e=t._stroke,i=t._fill,n=t.options,s=t._container;s.stroked=!!n.stroke,s.filled=!!n.fill,n.stroke?(e||(e=t._stroke=o.SVG.create("stroke")),s.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=o.Util.isArray(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(s.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=o.SVG.create("fill")),s.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(s.removeChild(i),t._fill=null)},_updateCircle:function(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,23592600")},_setPath:function(t,e){t._path.v=e},_bringToFront:function(t){o.DomUtil.toFront(t._container)},_bringToBack:function(t){o.DomUtil.toBack(t._container)}}:{}),o.Browser.vml&&(o.SVG.create=function(){try{return e.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return e.createElement("<lvml:"+t+' class="lvml">')}}catch(t){return function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}}()),o.Canvas=o.Renderer.extend({onAdd:function(){o.Renderer.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var t=this._container=e.createElement("canvas");o.DomEvent.on(t,"mousemove",o.Util.throttle(this._onMouseMove,32,this),this).on(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this).on(t,"mouseout",this._handleMouseOut,this),this._ctx=t.getContext("2d")},_updatePaths:function(){var t;this._redrawBounds=null;for(var e in this._layers)t=this._layers[e],t._update();this._redraw()},_update:function(){if(!this._map._animatingZoom||!this._bounds){this._drawnLayers={},o.Renderer.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=o.Browser.retina?2:1;o.DomUtil.setPosition(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",o.Browser.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update")}},_initPath:function(t){this._updateDashArray(t),this._layers[o.stamp(t)]=t;var e=t._order={layer:t,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=e),this._drawLast=e,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(t){this._requestRedraw(t)},_removePath:function(t){var e=t._order,i=e.next,n=e.prev;i?i.prev=n:this._drawLast=n,n?n.next=i:this._drawFirst=i,delete t._order,delete this._layers[o.stamp(t)],this._requestRedraw(t)},_updatePath:function(t){this._extendRedrawBounds(t),t._project(),t._update(),this._requestRedraw(t)},_updateStyle:function(t){this._updateDashArray(t),this._requestRedraw(t)},_updateDashArray:function(t){if(t.options.dashArray){var e,i=t.options.dashArray.split(","),n=[];for(e=0;e<i.length;e++)n.push(Number(i[e]));t.options._dashArray=n}},_requestRedraw:function(t){this._map&&(this._extendRedrawBounds(t),this._redrawRequest=this._redrawRequest||o.Util.requestAnimFrame(this._redraw,this))},_extendRedrawBounds:function(t){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new o.Bounds,this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e]))},_redraw:function(){this._redrawRequest=null,this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var t=this._redrawBounds;if(t){var e=t.getSize();this._ctx.clearRect(t.min.x,t.min.y,e.x,e.y)}else this._ctx.clearRect(0,0,this._container.width,this._container.height)},_draw:function(){var t,e=this._redrawBounds;if(this._ctx.save(),e){var i=e.getSize();this._ctx.beginPath(),this._ctx.rect(e.min.x,e.min.y,i.x,i.y),this._ctx.clip()}this._drawing=!0;for(var n=this._drawFirst;n;n=n.next)t=n.layer,(!e||t._pxBounds&&t._pxBounds.intersects(e))&&t._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(t,e){if(this._drawing){var i,n,o,s,r=t._parts,a=r.length,h=this._ctx;if(a){for(this._drawnLayers[t._leaflet_id]=t,h.beginPath(),h.setLineDash&&h.setLineDash(t.options&&t.options._dashArray||[]),i=0;i<a;i++){for(n=0,o=r[i].length;n<o;n++)s=r[i][n],h[n?"lineTo":"moveTo"](s.x,s.y);e&&h.closePath()}this._fillStroke(h,t)}}},_updateCircle:function(t){if(this._drawing&&!t._empty()){var e=t._point,i=this._ctx,n=t._radius,o=(t._radiusY||n)/n;this._drawnLayers[t._leaflet_id]=t,1!==o&&(i.save(),i.scale(1,o)),i.beginPath(),i.arc(e.x,e.y/o,n,0,2*Math.PI,!1),1!==o&&i.restore(),this._fillStroke(i,t)}},_fillStroke:function(t,e){var i=e.options;i.fill&&(t.globalAlpha=i.fillOpacity,t.fillStyle=i.fillColor||i.color,t.fill(i.fillRule||"evenodd")),i.stroke&&0!==i.weight&&(t.globalAlpha=i.opacity,t.lineWidth=i.weight,t.strokeStyle=i.color,t.lineCap=i.lineCap,t.lineJoin=i.lineJoin,t.stroke())},_onClick:function(t){for(var e,i,n=this._map.mouseEventToLayerPoint(t),s=this._drawFirst;s;s=s.next)e=s.layer,e.options.interactive&&e._containsPoint(n)&&!this._map._draggableMoved(e)&&(i=e);i&&(o.DomEvent._fakeStop(t),this._fireEvent([i],t))},_onMouseMove:function(t){if(this._map&&!this._map.dragging.moving()&&!this._map._animatingZoom){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseHover(t,e)}},_handleMouseOut:function(t){var e=this._hoveredLayer;e&&(o.DomUtil.removeClass(this._container,"leaflet-interactive"),this._fireEvent([e],t,"mouseout"),this._hoveredLayer=null)},_handleMouseHover:function(t,e){for(var i,n,s=this._drawFirst;s;s=s.next)i=s.layer,i.options.interactive&&i._containsPoint(e)&&(n=i);n!==this._hoveredLayer&&(this._handleMouseOut(t),n&&(o.DomUtil.addClass(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n)),this._hoveredLayer&&this._fireEvent([this._hoveredLayer],t)},_fireEvent:function(t,e,i){this._map._fireDOMEvent(e,i||e.type,t)},_bringToFront:function(t){var e=t._order,i=e.next,n=e.prev;i&&(i.prev=n,n?n.next=i:i&&(this._drawFirst=i),e.prev=this._drawLast,this._drawLast.next=e,e.next=null,this._drawLast=e,this._requestRedraw(t))},_bringToBack:function(t){var e=t._order,i=e.next,n=e.prev;n&&(n.next=i,i?i.prev=n:n&&(this._drawLast=n),e.prev=null,e.next=this._drawFirst,this._drawFirst.prev=e,this._drawFirst=e,this._requestRedraw(t))}}),o.Browser.canvas=function(){return!!e.createElement("canvas").getContext}(),o.canvas=function(t){return o.Browser.canvas?new o.Canvas(t):null},o.Polyline.prototype._containsPoint=function(t,e){var i,n,s,r,a,h,l=this._clickTolerance();if(!this._pxBounds.contains(t))return!1;for(i=0,r=this._parts.length;i<r;i++)for(h=this._parts[i],n=0,a=h.length,s=a-1;n<a;s=n++)if((e||0!==n)&&o.LineUtil.pointToSegmentDistance(t,h[s],h[n])<=l)return!0;return!1},o.Polygon.prototype._containsPoint=function(t){var e,i,n,s,r,a,h,l,u=!1;if(!this._pxBounds.contains(t))return!1;for(s=0,h=this._parts.length;s<h;s++)for(e=this._parts[s],r=0,l=e.length,a=l-1;r<l;a=r++)i=e[r],n=e[a],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(u=!u);return u||o.Polyline.prototype._containsPoint.call(this,t,!0)},o.CircleMarker.prototype._containsPoint=function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance()},o.GeoJSON=o.FeatureGroup.extend({initialize:function(t,e){o.setOptions(this,e),this._layers={},t&&this.addData(t)},addData:function(t){var e,i,n,s=o.Util.isArray(t)?t:t.features;if(s){for(e=0,i=s.length;e<i;e++)n=s[e],(n.geometries||n.geometry||n.features||n.coordinates)&&this.addData(n);return this}var r=this.options;if(r.filter&&!r.filter(t))return this;var a=o.GeoJSON.geometryToLayer(t,r);return a?(a.feature=o.GeoJSON.asFeature(t),a.defaultOptions=a.options,this.resetStyle(a),r.onEachFeature&&r.onEachFeature(t,a),this.addLayer(a)):this},resetStyle:function(t){return t.options=o.Util.extend({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this},setStyle:function(t){return this.eachLayer(function(e){this._setLayerStyle(e,t)},this)},_setLayerStyle:function(t,e){"function"==typeof e&&(e=e(t.feature)),t.setStyle&&t.setStyle(e)}}),o.extend(o.GeoJSON,{geometryToLayer:function(t,e){var i,n,s,r,a="Feature"===t.type?t.geometry:t,h=a?a.coordinates:null,l=[],u=e&&e.pointToLayer,c=e&&e.coordsToLatLng||this.coordsToLatLng;if(!h&&!a)return null;switch(a.type){case"Point":return i=c(h),u?u(t,i):new o.Marker(i);case"MultiPoint":for(s=0,r=h.length;s<r;s++)i=c(h[s]),l.push(u?u(t,i):new o.Marker(i));return new o.FeatureGroup(l);case"LineString":case"MultiLineString":return n=this.coordsToLatLngs(h,"LineString"===a.type?0:1,c),new o.Polyline(n,e);case"Polygon":case"MultiPolygon":return n=this.coordsToLatLngs(h,"Polygon"===a.type?1:2,c),new o.Polygon(n,e);case"GeometryCollection":for(s=0,r=a.geometries.length;s<r;s++){var d=this.geometryToLayer({geometry:a.geometries[s],type:"Feature",properties:t.properties},e);d&&l.push(d)}return new o.FeatureGroup(l);default:throw new Error("Invalid GeoJSON object.")}},coordsToLatLng:function(t){return new o.LatLng(t[1],t[0],t[2])},coordsToLatLngs:function(t,e,i){for(var n,o=[],s=0,r=t.length;s<r;s++)n=e?this.coordsToLatLngs(t[s],e-1,i):(i||this.coordsToLatLng)(t[s]),o.push(n);return o},latLngToCoords:function(t){return t.alt!==i?[t.lng,t.lat,t.alt]:[t.lng,t.lat]},latLngsToCoords:function(t,e,i){for(var n=[],s=0,r=t.length;s<r;s++)n.push(e?o.GeoJSON.latLngsToCoords(t[s],e-1,i):o.GeoJSON.latLngToCoords(t[s]));return!e&&i&&n.push(n[0]),n},getFeature:function(t,e){return t.feature?o.extend({},t.feature,{geometry:e}):o.GeoJSON.asFeature(e)},asFeature:function(t){return"Feature"===t.type||"FeatureCollection"===t.type?t:{type:"Feature",properties:{},geometry:t}}});var a={toGeoJSON:function(){return o.GeoJSON.getFeature(this,{type:"Point",coordinates:o.GeoJSON.latLngToCoords(this.getLatLng())})}};o.Marker.include(a),o.Circle.include(a),o.CircleMarker.include(a),o.Polyline.prototype.toGeoJSON=function(){var t=!o.Polyline._flat(this._latlngs),e=o.GeoJSON.latLngsToCoords(this._latlngs,t?1:0);return o.GeoJSON.getFeature(this,{type:(t?"Multi":"")+"LineString",coordinates:e})},o.Polygon.prototype.toGeoJSON=function(){var t=!o.Polyline._flat(this._latlngs),e=t&&!o.Polyline._flat(this._latlngs[0]),i=o.GeoJSON.latLngsToCoords(this._latlngs,e?2:t?1:0,!0);return t||(i=[i]),o.GeoJSON.getFeature(this,{type:(e?"Multi":"")+"Polygon",coordinates:i})},o.LayerGroup.include({toMultiPoint:function(){var t=[];return this.eachLayer(function(e){t.push(e.toGeoJSON().geometry.coordinates)}),o.GeoJSON.getFeature(this,{type:"MultiPoint",coordinates:t})},toGeoJSON:function(){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===t)return this.toMultiPoint();var e="GeometryCollection"===t,i=[];return this.eachLayer(function(t){if(t.toGeoJSON){var n=t.toGeoJSON();i.push(e?n.geometry:o.GeoJSON.asFeature(n))}}),e?o.GeoJSON.getFeature(this,{geometries:i,type:"GeometryCollection"}):{type:"FeatureCollection",features:i}}}),o.geoJSON=function(t,e){return new o.GeoJSON(t,e)},o.geoJson=o.geoJSON,o.Draggable=o.Evented.extend({options:{clickTolerance:3},statics:{START:o.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"}},initialize:function(t,e,i){this._element=t,this._dragStartTarget=e||t,this._preventOutline=i},enable:function(){this._enabled||(o.DomEvent.on(this._dragStartTarget,o.Draggable.START.join(" "),this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(o.Draggable._dragging===this&&this.finishDrag(),o.DomEvent.off(this._dragStartTarget,o.Draggable.START.join(" "),this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(t){if(!t._simulated&&this._enabled&&(this._moved=!1,!o.DomUtil.hasClass(this._element,"leaflet-zoom-anim")&&!(o.Draggable._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches||(o.Draggable._dragging=this,this._preventOutline&&o.DomUtil.preventOutline(this._element),o.DomUtil.disableImageDrag(),o.DomUtil.disableTextSelection(),this._moving)))){this.fire("down");var i=t.touches?t.touches[0]:t;this._startPoint=new o.Point(i.clientX,i.clientY),o.DomEvent.on(e,o.Draggable.MOVE[t.type],this._onMove,this).on(e,o.Draggable.END[t.type],this._onUp,this)}},_onMove:function(i){if(!i._simulated&&this._enabled){if(i.touches&&i.touches.length>1)return void(this._moved=!0);var n=i.touches&&1===i.touches.length?i.touches[0]:i,s=new o.Point(n.clientX,n.clientY),r=s.subtract(this._startPoint);(r.x||r.y)&&(Math.abs(r.x)+Math.abs(r.y)<this.options.clickTolerance||(o.DomEvent.preventDefault(i),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=o.DomUtil.getPosition(this._element).subtract(r),o.DomUtil.addClass(e.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,t.SVGElementInstance&&this._lastTarget instanceof SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),o.DomUtil.addClass(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(r),this._moving=!0,o.Util.cancelAnimFrame(this._animRequest),this._lastEvent=i,this._animRequest=o.Util.requestAnimFrame(this._updatePosition,this,!0)))}},_updatePosition:function(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),o.DomUtil.setPosition(this._element,this._newPos),this.fire("drag",t)},_onUp:function(t){!t._simulated&&this._enabled&&this.finishDrag()},finishDrag:function(){o.DomUtil.removeClass(e.body,"leaflet-dragging"),this._lastTarget&&(o.DomUtil.removeClass(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null);for(var t in o.Draggable.MOVE)o.DomEvent.off(e,o.Draggable.MOVE[t],this._onMove,this).off(e,o.Draggable.END[t],this._onUp,this);o.DomUtil.enableImageDrag(),o.DomUtil.enableTextSelection(),this._moved&&this._moving&&(o.Util.cancelAnimFrame(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1,o.Draggable._dragging=!1}}),o.Handler=o.Class.extend({initialize:function(t){this._map=t},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}}),o.Map.mergeOptions({dragging:!0,inertia:!o.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0}),o.Map.Drag=o.Handler.extend({addHooks:function(){if(!this._draggable){var t=this._map;this._draggable=new o.Draggable(t._mapPane,t._container),this._draggable.on({down:this._onDown,dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this))}o.DomUtil.addClass(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){o.DomUtil.removeClass(this._map._container,"leaflet-grab"),o.DomUtil.removeClass(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDown:function(){this._map._stop()},_onDragStart:function(){var t=this._map;if(this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=o.latLngBounds(this._map.options.maxBounds);this._offsetLimit=o.bounds(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(t){if(this._map.options.inertia){var e=this._lastTime=+new Date,i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),e-this._times[0]>50&&(this._positions.shift(),this._times.shift())}this._map.fire("move",t).fire("drag",t)},_onZoomEnd:function(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(t,e){return t-(t-e)*this._viscosity},_onPreDragLimit:function(){if(this._viscosity&&this._offsetLimit){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t)}},_onPreDragWrap:function(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,s=(n+e+i)%t-e-i,r=Math.abs(o+i)<Math.abs(s+i)?o:s;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=r},_onDragEnd:function(t){var e=this._map,i=e.options,n=!i.inertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{var s=this._lastPos.subtract(this._positions[0]),r=(this._lastTime-this._times[0])/1e3,a=i.easeLinearity,h=s.multiplyBy(a/r),l=h.distanceTo([0,0]),u=Math.min(i.inertiaMaxSpeed,l),c=h.multiplyBy(u/l),d=u/(i.inertiaDeceleration*a),_=c.multiplyBy(-d/2).round();_.x||_.y?(_=e._limitOffset(_,e.options.maxBounds),o.Util.requestAnimFrame(function(){e.panBy(_,{duration:d,easeLinearity:a,noMoveStart:!0,animate:!0})})):e.fire("moveend")}}}),o.Map.addInitHook("addHandler","dragging",o.Map.Drag),o.Map.mergeOptions({doubleClickZoom:!0}),o.Map.DoubleClickZoom=o.Handler.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,o=t.originalEvent.shiftKey?i-n:i+n;"center"===e.options.doubleClickZoom?e.setZoom(o):e.setZoomAround(t.containerPoint,o)}}),o.Map.addInitHook("addHandler","doubleClickZoom",o.Map.DoubleClickZoom),o.Map.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60}),o.Map.ScrollWheelZoom=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){o.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll,this)},_onWheelScroll:function(t){var e=o.DomEvent.getWheelDelta(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date);var n=Math.max(i-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(o.bind(this._performZoom,this),n),o.DomEvent.stop(t)},_performZoom:function(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(4*this._map.options.wheelPxPerZoomLevel),o=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,s=i?Math.ceil(o/i)*i:o,r=t._limitZoom(e+(this._delta>0?s:-s))-e;this._delta=0,this._startTime=null,r&&("center"===t.options.scrollWheelZoom?t.setZoom(e+r):t.setZoomAround(this._lastMousePos,e+r))}}),o.Map.addInitHook("addHandler","scrollWheelZoom",o.Map.ScrollWheelZoom),o.extend(o.DomEvent,{_touchstart:o.Browser.msPointer?"MSPointerDown":o.Browser.pointer?"pointerdown":"touchstart",_touchend:o.Browser.msPointer?"MSPointerUp":o.Browser.pointer?"pointerup":"touchend",addDoubleTapListener:function(t,e,i){function n(t){var e;if(e=o.Browser.pointer?o.DomEvent._pointersCount:t.touches.length,!(e>1)){var i=Date.now(),n=i-(r||i);a=t.touches?t.touches[0]:t,h=n>0&&n<=l,r=i}}function s(){if(h&&!a.cancelBubble){if(o.Browser.pointer){var t,i,n={};for(i in a)t=a[i],n[i]=t&&t.bind?t.bind(a):t;a=n}a.type="dblclick",e(a),r=null}}var r,a,h=!1,l=250,u="_leaflet_",c=this._touchstart,d=this._touchend;return t[u+c+i]=n,t[u+d+i]=s,t[u+"dblclick"+i]=e,t.addEventListener(c,n,!1),t.addEventListener(d,s,!1),o.Browser.edge||t.addEventListener("dblclick",e,!1),this},removeDoubleTapListener:function(t,e){var i="_leaflet_",n=t[i+this._touchstart+e],s=t[i+this._touchend+e],r=t[i+"dblclick"+e];return t.removeEventListener(this._touchstart,n,!1),t.removeEventListener(this._touchend,s,!1),o.Browser.edge||t.removeEventListener("dblclick",r,!1),this}}),o.extend(o.DomEvent,{POINTER_DOWN:o.Browser.msPointer?"MSPointerDown":"pointerdown",POINTER_MOVE:o.Browser.msPointer?"MSPointerMove":"pointermove",POINTER_UP:o.Browser.msPointer?"MSPointerUp":"pointerup",POINTER_CANCEL:o.Browser.msPointer?"MSPointerCancel":"pointercancel",TAG_WHITE_LIST:["INPUT","SELECT","OPTION"],_pointers:{},_pointersCount:0,addPointerListener:function(t,e,i,n){return"touchstart"===e?this._addPointerStart(t,i,n):"touchmove"===e?this._addPointerMove(t,i,n):"touchend"===e&&this._addPointerEnd(t,i,n),this},removePointerListener:function(t,e,i){var n=t["_leaflet_"+e+i];return"touchstart"===e?t.removeEventListener(this.POINTER_DOWN,n,!1):"touchmove"===e?t.removeEventListener(this.POINTER_MOVE,n,!1):"touchend"===e&&(t.removeEventListener(this.POINTER_UP,n,!1),t.removeEventListener(this.POINTER_CANCEL,n,!1)),this},_addPointerStart:function(t,i,n){var s=o.bind(function(t){if("mouse"!==t.pointerType&&t.pointerType!==t.MSPOINTER_TYPE_MOUSE){if(!(this.TAG_WHITE_LIST.indexOf(t.target.tagName)<0))return;o.DomEvent.preventDefault(t)}this._handlePointer(t,i)},this);if(t["_leaflet_touchstart"+n]=s,t.addEventListener(this.POINTER_DOWN,s,!1),!this._pointerDocListener){var r=o.bind(this._globalPointerUp,this);e.documentElement.addEventListener(this.POINTER_DOWN,o.bind(this._globalPointerDown,this),!0),e.documentElement.addEventListener(this.POINTER_MOVE,o.bind(this._globalPointerMove,this),!0),e.documentElement.addEventListener(this.POINTER_UP,r,!0),e.documentElement.addEventListener(this.POINTER_CANCEL,r,!0),this._pointerDocListener=!0}},_globalPointerDown:function(t){this._pointers[t.pointerId]=t,this._pointersCount++},_globalPointerMove:function(t){this._pointers[t.pointerId]&&(this._pointers[t.pointerId]=t)},_globalPointerUp:function(t){delete this._pointers[t.pointerId],this._pointersCount--},_handlePointer:function(t,e){t.touches=[];for(var i in this._pointers)t.touches.push(this._pointers[i]);t.changedTouches=[t],e(t)},_addPointerMove:function(t,e,i){var n=o.bind(function(t){(t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&"mouse"!==t.pointerType||0!==t.buttons)&&this._handlePointer(t,e)},this);t["_leaflet_touchmove"+i]=n,t.addEventListener(this.POINTER_MOVE,n,!1)},_addPointerEnd:function(t,e,i){var n=o.bind(function(t){this._handlePointer(t,e)},this);t["_leaflet_touchend"+i]=n,t.addEventListener(this.POINTER_UP,n,!1),t.addEventListener(this.POINTER_CANCEL,n,!1)}}),o.Map.mergeOptions({touchZoom:o.Browser.touch&&!o.Browser.android23,bounceAtZoomLimits:!0}),o.Map.TouchZoom=o.Handler.extend({addHooks:function(){o.DomUtil.addClass(this._map._container,"leaflet-touch-zoom"),o.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){o.DomUtil.removeClass(this._map._container,"leaflet-touch-zoom"),o.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var i=this._map;if(t.touches&&2===t.touches.length&&!i._animatingZoom&&!this._zooming){var n=i.mouseEventToContainerPoint(t.touches[0]),s=i.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=i.getSize()._divideBy(2),this._startLatLng=i.containerPointToLatLng(this._centerPoint),"center"!==i.options.touchZoom&&(this._pinchStartLatLng=i.containerPointToLatLng(n.add(s)._divideBy(2))),this._startDist=n.distanceTo(s),this._startZoom=i.getZoom(),this._moved=!1,this._zooming=!0,i._stop(),o.DomEvent.on(e,"touchmove",this._onTouchMove,this).on(e,"touchend",this._onTouchEnd,this),o.DomEvent.preventDefault(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&this._zooming){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),s=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(s,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&s<1||this._zoom>e.getMaxZoom()&&s>1)&&(this._zoom=e._limitZoom(this._zoom)),"center"===e.options.touchZoom){if(this._center=this._startLatLng,1===s)return}else{var r=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(1===s&&0===r.x&&0===r.y)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(r),this._zoom)}this._moved||(e._moveStart(!0),this._moved=!0),o.Util.cancelAnimFrame(this._animRequest);var a=o.bind(e._move,e,this._center,this._zoom,{pinch:!0,round:!1});this._animRequest=o.Util.requestAnimFrame(a,this,!0),o.DomEvent.preventDefault(t)}},_onTouchEnd:function(){return this._moved&&this._zooming?(this._zooming=!1,o.Util.cancelAnimFrame(this._animRequest),o.DomEvent.off(e,"touchmove",this._onTouchMove).off(e,"touchend",this._onTouchEnd),void(this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom)))):void(this._zooming=!1)}}),o.Map.addInitHook("addHandler","touchZoom",o.Map.TouchZoom),o.Map.mergeOptions({tap:!0,tapTolerance:15}),o.Map.Tap=o.Handler.extend({addHooks:function(){o.DomEvent.on(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){o.DomEvent.off(this._map._container,"touchstart",this._onDown,this)},_onDown:function(t){if(t.touches){if(o.DomEvent.preventDefault(t),this._fireClick=!0,t.touches.length>1)return this._fireClick=!1,void clearTimeout(this._holdTimeout);var i=t.touches[0],n=i.target;this._startPos=this._newPos=new o.Point(i.clientX,i.clientY),n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.addClass(n,"leaflet-active"),this._holdTimeout=setTimeout(o.bind(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",i))},this),1e3),this._simulateEvent("mousedown",i),o.DomEvent.on(e,{touchmove:this._onMove,touchend:this._onUp},this)}},_onUp:function(t){if(clearTimeout(this._holdTimeout),o.DomEvent.off(e,{touchmove:this._onMove,touchend:this._onUp},this),this._fireClick&&t&&t.changedTouches){var i=t.changedTouches[0],n=i.target;n&&n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.removeClass(n,"leaflet-active"),this._simulateEvent("mouseup",i),this._isTapValid()&&this._simulateEvent("click",i)}},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_onMove:function(t){var e=t.touches[0];this._newPos=new o.Point(e.clientX,e.clientY),this._simulateEvent("mousemove",e)},_simulateEvent:function(i,n){var o=e.createEvent("MouseEvents");o._simulated=!0,n.target._simulatedClick=!0,o.initMouseEvent(i,!0,!0,t,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(o)}}),o.Browser.touch&&!o.Browser.pointer&&o.Map.addInitHook("addHandler","tap",o.Map.Tap),o.Map.mergeOptions({boxZoom:!0}),o.Map.BoxZoom=o.Handler.extend({initialize:function(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane},addHooks:function(){o.DomEvent.on(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){o.DomEvent.off(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_resetState:function(){
this._moved=!1},_onMouseDown:function(t){return!(!t.shiftKey||1!==t.which&&1!==t.button)&&(this._resetState(),o.DomUtil.disableTextSelection(),o.DomUtil.disableImageDrag(),this._startPoint=this._map.mouseEventToContainerPoint(t),void o.DomEvent.on(e,{contextmenu:o.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this))},_onMouseMove:function(t){this._moved||(this._moved=!0,this._box=o.DomUtil.create("div","leaflet-zoom-box",this._container),o.DomUtil.addClass(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new o.Bounds(this._point,this._startPoint),i=e.getSize();o.DomUtil.setPosition(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px"},_finish:function(){this._moved&&(o.DomUtil.remove(this._box),o.DomUtil.removeClass(this._container,"leaflet-crosshair")),o.DomUtil.enableTextSelection(),o.DomUtil.enableImageDrag(),o.DomEvent.off(e,{contextmenu:o.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(t){if((1===t.which||1===t.button)&&(this._finish(),this._moved)){setTimeout(o.bind(this._resetState,this),0);var e=new o.LatLngBounds(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e})}},_onKeyDown:function(t){27===t.keyCode&&this._finish()}}),o.Map.addInitHook("addHandler","boxZoom",o.Map.BoxZoom),o.Map.mergeOptions({keyboard:!0,keyboardPanDelta:80}),o.Map.Keyboard=o.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta)},addHooks:function(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),o.DomEvent.on(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),o.DomEvent.off(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=e.body,n=e.documentElement,o=i.scrollTop||n.scrollTop,s=i.scrollLeft||n.scrollLeft;this._map._container.focus(),t.scrollTo(s,o)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(t){var e,i,n=this._panKeys={},o=this.keyCodes;for(e=0,i=o.left.length;e<i;e++)n[o.left[e]]=[-1*t,0];for(e=0,i=o.right.length;e<i;e++)n[o.right[e]]=[t,0];for(e=0,i=o.down.length;e<i;e++)n[o.down[e]]=[0,t];for(e=0,i=o.up.length;e<i;e++)n[o.up[e]]=[0,-1*t]},_setZoomDelta:function(t){var e,i,n=this._zoomKeys={},o=this.keyCodes;for(e=0,i=o.zoomIn.length;e<i;e++)n[o.zoomIn[e]]=t;for(e=0,i=o.zoomOut.length;e<i;e++)n[o.zoomOut[e]]=-t},_addHooks:function(){o.DomEvent.on(e,"keydown",this._onKeyDown,this)},_removeHooks:function(){o.DomEvent.off(e,"keydown",this._onKeyDown,this)},_onKeyDown:function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e,i=t.keyCode,n=this._map;if(i in this._panKeys){if(n._panAnim&&n._panAnim._inProgress)return;e=this._panKeys[i],t.shiftKey&&(e=o.point(e).multiplyBy(3)),n.panBy(e),n.options.maxBounds&&n.panInsideBounds(n.options.maxBounds)}else if(i in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[i]);else{if(27!==i)return;n.closePopup()}o.DomEvent.stop(t)}}}),o.Map.addInitHook("addHandler","keyboard",o.Map.Keyboard),o.Handler.MarkerDrag=o.Handler.extend({initialize:function(t){this._marker=t},addHooks:function(){var t=this._marker._icon;this._draggable||(this._draggable=new o.Draggable(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),o.DomUtil.addClass(t,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&o.DomUtil.removeClass(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup().fire("movestart").fire("dragstart")},_onDrag:function(t){var e=this._marker,i=e._shadow,n=o.DomUtil.getPosition(e._icon),s=e._map.layerPointToLatLng(n);i&&o.DomUtil.setPosition(i,n),e._latlng=s,t.latlng=s,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t)},_onDragEnd:function(t){delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t)}}),o.Control=o.Class.extend({options:{position:"topright"},initialize:function(t){o.setOptions(this,t)},getPosition:function(){return this.options.position},setPosition:function(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this},getContainer:function(){return this._container},addTo:function(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return o.DomUtil.addClass(e,"leaflet-control"),i.indexOf("bottom")!==-1?n.insertBefore(e,n.firstChild):n.appendChild(e),this},remove:function(){return this._map?(o.DomUtil.remove(this._container),this.onRemove&&this.onRemove(this._map),this._map=null,this):this},_refocusOnMap:function(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus()}}),o.control=function(t){return new o.Control(t)},o.Map.include({addControl:function(t){return t.addTo(this),this},removeControl:function(t){return t.remove(),this},_initControlPos:function(){function t(t,s){var r=i+t+" "+i+s;e[t+s]=o.DomUtil.create("div",r,n)}var e=this._controlCorners={},i="leaflet-",n=this._controlContainer=o.DomUtil.create("div",i+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right")},_clearControlPos:function(){o.DomUtil.remove(this._controlContainer)}}),o.Control.Zoom=o.Control.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"-",zoomOutTitle:"Zoom out"},onAdd:function(t){var e="leaflet-control-zoom",i=o.DomUtil.create("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i},onRemove:function(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1))},_zoomOut:function(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1))},_createButton:function(t,e,i,n,s){var r=o.DomUtil.create("a",i,n);return r.innerHTML=t,r.href="#",r.title=e,r.setAttribute("role","button"),r.setAttribute("aria-label",e),o.DomEvent.on(r,"mousedown dblclick",o.DomEvent.stopPropagation).on(r,"click",o.DomEvent.stop).on(r,"click",s,this).on(r,"click",this._refocusOnMap,this),r},_updateDisabled:function(){var t=this._map,e="leaflet-disabled";o.DomUtil.removeClass(this._zoomInButton,e),o.DomUtil.removeClass(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMinZoom())&&o.DomUtil.addClass(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMaxZoom())&&o.DomUtil.addClass(this._zoomInButton,e)}}),o.Map.mergeOptions({zoomControl:!0}),o.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new o.Control.Zoom,this.addControl(this.zoomControl))}),o.control.zoom=function(t){return new o.Control.Zoom(t)},o.Control.Attribution=o.Control.extend({options:{position:"bottomright",prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function(t){o.setOptions(this,t),this._attributions={}},onAdd:function(t){t.attributionControl=this,this._container=o.DomUtil.create("div","leaflet-control-attribution"),o.DomEvent&&o.DomEvent.disableClickPropagation(this._container);for(var e in t._layers)t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());return this._update(),this._container},setPrefix:function(t){return this.options.prefix=t,this._update(),this},addAttribution:function(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this},removeAttribution:function(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this},_update:function(){if(this._map){var t=[];for(var e in this._attributions)this._attributions[e]&&t.push(e);var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(" | ")}}}),o.Map.mergeOptions({attributionControl:!0}),o.Map.addInitHook(function(){this.options.attributionControl&&(new o.Control.Attribution).addTo(this)}),o.control.attribution=function(t){return new o.Control.Attribution(t)},o.Control.Scale=o.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(t){var e="leaflet-control-scale",i=o.DomUtil.create("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i},onRemove:function(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(t,e,i){t.metric&&(this._mScale=o.DomUtil.create("div",e,i)),t.imperial&&(this._iScale=o.DomUtil.create("div",e,i))},_update:function(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i)},_updateScales:function(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t)},_updateMetric:function(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t)},_updateImperial:function(t){var e,i,n,o=3.2808399*t;o>5280?(e=o/5280,i=this._getRoundNum(e),this._updateScale(this._iScale,i+" mi",i/e)):(n=this._getRoundNum(o),this._updateScale(this._iScale,n+" ft",n/o))},_updateScale:function(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e},_getRoundNum:function(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i}}),o.control.scale=function(t){return new o.Control.Scale(t)},o.Control.Layers=o.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(t,e,i,n){return i<n?-1:n<i?1:0}},initialize:function(t,e,i){o.setOptions(this,i),this._layers=[],this._lastZIndex=0,this._handlingClick=!1;for(var n in t)this._addLayer(t[n],n);for(n in e)this._addLayer(e[n],n,!0)},onAdd:function(t){return this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this),this._container},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++)this._layers[t].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(t,e){return this._addLayer(t,e),this._map?this._update():this},addOverlay:function(t,e){return this._addLayer(t,e,!0),this._map?this._update():this},removeLayer:function(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(o.stamp(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this},expand:function(){o.DomUtil.addClass(this._container,"leaflet-control-layers-expanded"),this._form.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._form.clientHeight?(o.DomUtil.addClass(this._form,"leaflet-control-layers-scrollbar"),this._form.style.height=t+"px"):o.DomUtil.removeClass(this._form,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return o.DomUtil.removeClass(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var t="leaflet-control-layers",e=this._container=o.DomUtil.create("div",t);e.setAttribute("aria-haspopup",!0),o.DomEvent.disableClickPropagation(e),o.Browser.touch||o.DomEvent.disableScrollPropagation(e);var i=this._form=o.DomUtil.create("form",t+"-list");o.Browser.android||o.DomEvent.on(e,{mouseenter:this.expand,mouseleave:this.collapse},this);var n=this._layersLink=o.DomUtil.create("a",t+"-toggle",e);n.href="#",n.title="Layers",o.Browser.touch?o.DomEvent.on(n,"click",o.DomEvent.stop).on(n,"click",this.expand,this):o.DomEvent.on(n,"focus",this.expand,this),o.DomEvent.on(i,"click",function(){setTimeout(o.bind(this._onInputClick,this),0)},this),this._map.on("click",this.collapse,this),this.options.collapsed||this.expand(),this._baseLayersList=o.DomUtil.create("div",t+"-base",i),this._separator=o.DomUtil.create("div",t+"-separator",i),this._overlaysList=o.DomUtil.create("div",t+"-overlays",i),e.appendChild(i)},_getLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e]&&o.stamp(this._layers[e].layer)===t)return this._layers[e]},_addLayer:function(t,e,i){t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.sortLayers&&this._layers.sort(o.bind(function(t,e){return this.options.sortFunction(t.layer,e.layer,t.name,e.name)},this)),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex))},_update:function(){if(!this._container)return this;o.DomUtil.empty(this._baseLayersList),o.DomUtil.empty(this._overlaysList);var t,e,i,n,s=0;for(i=0;i<this._layers.length;i++)n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,s+=n.overlay?0:1;return this.options.hideSingleBase&&(t=t&&s>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this},_onLayerChange:function(t){this._handlingClick||this._update();var e=this._getLayer(o.stamp(t.target)),i=e.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null;i&&this._map.fire(i,e)},_createRadioElement:function(t,i){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(i?' checked="checked"':"")+"/>",o=e.createElement("div");return o.innerHTML=n,o.firstChild},_addItem:function(t){var i,n=e.createElement("label"),s=this._map.hasLayer(t.layer);t.overlay?(i=e.createElement("input"),i.type="checkbox",i.className="leaflet-control-layers-selector",i.defaultChecked=s):i=this._createRadioElement("leaflet-base-layers",s),i.layerId=o.stamp(t.layer),o.DomEvent.on(i,"click",this._onInputClick,this);var r=e.createElement("span");r.innerHTML=" "+t.name;var a=e.createElement("div");n.appendChild(a),a.appendChild(i),a.appendChild(r);var h=t.overlay?this._overlaysList:this._baseLayersList;return h.appendChild(n),this._checkDisabledLayers(),n},_onInputClick:function(){var t,e,i,n=this._form.getElementsByTagName("input"),o=[],s=[];this._handlingClick=!0;for(var r=n.length-1;r>=0;r--)t=n[r],e=this._getLayer(t.layerId).layer,i=this._map.hasLayer(e),t.checked&&!i?o.push(e):!t.checked&&i&&s.push(e);for(r=0;r<s.length;r++)this._map.removeLayer(s[r]);for(r=0;r<o.length;r++)this._map.addLayer(o[r]);this._handlingClick=!1,this._refocusOnMap()},_checkDisabledLayers:function(){for(var t,e,n=this._form.getElementsByTagName("input"),o=this._map.getZoom(),s=n.length-1;s>=0;s--)t=n[s],e=this._getLayer(t.layerId).layer,t.disabled=e.options.minZoom!==i&&o<e.options.minZoom||e.options.maxZoom!==i&&o>e.options.maxZoom},_expand:function(){return this.expand()},_collapse:function(){return this.collapse()}}),o.control.layers=function(t,e,i){return new o.Control.Layers(t,e,i)}}(window,document);

/**
 * 经纬度转墨卡托
 */
L.Util.transformMercator =function(lonLat){
    var mercator = {};
    var x = lonLat.x * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lonLat.y) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    mercator.x = x;
    mercator.y = y;
    return mercator;
};

/**
 * 航向量算
 */
L.Util.getAngleByLatLng = function(startLong,startLat,endLong,endLat){
    startLong = parseFloat(startLong);
    startLat = parseFloat(startLat);
    endLong = parseFloat(endLong);
    endLat = parseFloat(endLat);
    var stsrtP = {
        x:startLong,
        y:startLat
    };
    var endP = {};
    endP.x=endLong;
    endP.y=endLat;

    var startPX_LatLongCoords = startLong;
    var startPY_LatLongCoords = startLat;
    var endPX_LatLongCoords = endLong;
    var endPY_LatLongCoords = endLat;

    var zhongjianX;
    var zhongjianY;
    zhongjianX = startPX_LatLongCoords > endPX_LatLongCoords ? startPX_LatLongCoords : endPX_LatLongCoords;
    zhongjianY = startPX_LatLongCoords > endPX_LatLongCoords ? startPY_LatLongCoords : endPY_LatLongCoords;
    var thirdX = zhongjianX;
    var thirdY = zhongjianY + 10;

    var prjParaPointC = {};
    prjParaPointC.x=thirdX;
    prjParaPointC.y=thirdY;

    stsrtP = L.Util.transformMercator(stsrtP);
    endP = L.Util.transformMercator(endP);
    var startPX = stsrtP.x;
    var startPY = stsrtP.y;
    var endPX = endP.x;
    var endPY = endP.y;

    prjParaPointC = L.Util.transformMercator(prjParaPointC);
    var objChangeCx = prjParaPointC.x;
    var objChangeCy = prjParaPointC.y; 

    //有三点计算角度，使用向量方法
    var mx, my, ax, ay, bx, by, ma_x, ma_y, mb_x, mb_y;
    mx = startPX_LatLongCoords > endPX_LatLongCoords ? startPX : endPX;
    my = startPX_LatLongCoords > endPX_LatLongCoords ? startPY : endPY;
    if (mx == startPX && my == startPY) {
        ax = endPX;
        ay = endPY;
    } else {
        ax = startPX;
        ay = startPY;
    }
    bx = objChangeCx;
    by = objChangeCy;
    ma_x = ax - mx;
    ma_y = ay - my;
    mb_x = bx - mx;
    mb_y = by - my;
    var v1 = (ma_x * mb_x) + (ma_y * mb_y);
    var ma_val = Math.sqrt(ma_x * ma_x + ma_y * ma_y);
    var mb_val = Math.sqrt(mb_x * mb_x + mb_y * mb_y);
    var cosM = v1 / (ma_val * mb_val);
    var angleAMB = Math.acos(cosM) * 180 / Math.PI;


    var xiangxian = 0; // 定义象限变量
    var lastAngle = 0;
    if ((endPY_LatLongCoords - startPY_LatLongCoords) > 0 && (endPX_LatLongCoords - startPX_LatLongCoords) == 0) {
        lastAngle = 0;
    } else if ((endPY_LatLongCoords - startPY_LatLongCoords) == 0
            && (endPX_LatLongCoords - startPX_LatLongCoords) > 0) {
        lastAngle = 90;
    } else if ((endPY_LatLongCoords - startPY_LatLongCoords) < 0
            && (endPX_LatLongCoords - startPX_LatLongCoords) == 0) {
        lastAngle = 180;
    } else if ((endPY_LatLongCoords - startPY_LatLongCoords) == 0
            && (endPX_LatLongCoords - startPX_LatLongCoords) < 0) {
        lastAngle = 270;
    } else if ((endPY_LatLongCoords - startPY_LatLongCoords) > 0
            && (endPX_LatLongCoords - startPX_LatLongCoords) > 0) {
        xiangxian = 1;
    } else if ((endPY_LatLongCoords - startPY_LatLongCoords) > 0
            && (endPX_LatLongCoords - startPX_LatLongCoords) < 0) {
        xiangxian = 2;
    } else if ((endPY_LatLongCoords - startPY_LatLongCoords) < 0
            && (endPX_LatLongCoords - startPX_LatLongCoords) < 0) {
        xiangxian = 3;
    } else if ((endPY_LatLongCoords - startPY_LatLongCoords) < 0
            && (endPX_LatLongCoords - startPX_LatLongCoords) > 0) {
        xiangxian = 4;
    };


    switch (xiangxian) {
    case 1:
        lastAngle = 180 - angleAMB;
        break;
    case 2:
        lastAngle = 360 - angleAMB;
        break;
    case 3:
        lastAngle = 360 - angleAMB;
        break;
    case 4:
        lastAngle = 180 - angleAMB;
        break;
    default:
        //alert("none");
    }

    return parseInt(Math.round(lastAngle));
}


/**
 * 判断是否是合法的经纬度
 * @param  {[type]} lat [纬度]
 * @param  {[type]} lng [经度]
 * @return {[type]}     [布尔值]
 */
L.Util.verifyLatLng = function(lat, lng) {
    if (parseFloat(lat) >= -90 && parseFloat(lat) <= 90 && parseFloat(lng) >= -180 && parseFloat(lng) <= 180) {
        return true;
    } else {
        return false;
    }
};

/**
 * 地球坐标纠正
 * @param  {[type]} latlng [description]
 * @return {[type]}        [description]
 */
L.Util.formatEarthLatLng = function(latlng){
    var lat = latlng.hasOwnProperty('lat') ? latlng.lat : latlng[0];
    var lng = latlng.hasOwnProperty('lng') ? latlng.lng : latlng[1];
    lng = lng%360;
    if(lng>180){
        lng = (lng%180)-180;
    }else if(lng<-180){
        lng = 180+(lng%180);
    }    
    return new L.LatLng(lat,lng);
};

/**
 * 十进制经纬度转度分秒
 * @param  {[type]} latlng [对象或数组]
 * @return {[type]}        [度分秒]
 */
L.Util.formatHMS = function(latlng) {
    var lat = latlng.hasOwnProperty('lat') ? latlng.lat : latlng[0];
    var lng = latlng.hasOwnProperty('lng') ? latlng.lng : latlng[1];
    lng = lng%360;
    if(lng>180){
        lng = (lng%180)-180;
    }else if(lng<-180){
        lng = 180+(lng%180);
    }    
    function setHMS(f) {
        f = parseInt(f * 3600);
        var h = parseInt(f / 3600);
        var m = parseInt((f - h * 3600) / 60);
        var s = parseInt((f - h * 3600 - m * 60));
        if (m.toString().length == 1) {
            m = '0' + m.toString();
        }
        if (s.toString().length == 1) {
            s = '0' + s.toString();
        }
        return h + '\u00b0' + m + '\u2032' + s + '\u2033';
    }
    var nLat = '';
    var nLng = '';
    if (lat < 0) {
        nLat = 'S' + setHMS(lat * -1);
    } else {
        nLat = 'N' + setHMS(lat);
    }
    if (lng < 0) {
        nLng = 'W' + setHMS(lng * -1);
    } else {
        nLng = 'E' + setHMS(lng);
    }
    return {
        lat: nLat,
        lng: nLng
    };
};

/**
 * 度分秒转经纬度
 * @param {[type]} p [方位]
 * @param {[type]} d [度]
 * @param {[type]} f [分]
 * @param {[type]} m [秒]
 */
L.Util.HMStoLatLng = function(p, d, f, m) {
    var dfm = parseFloat(d) + parseFloat(f) / 60 + parseFloat(m) / 3600;
    if (p.toLowerCase() === 'w' || p.toLowerCase() === 's') {
        dfm = -1 * dfm;
    }
    return dfm;
};



/**
 * 获取弧线的节点坐标数组 
 * @type {Function}
 * @param points
 * @returns {Array}
 * @private
 */
L.Util.getCurvePoints = function(points){
    var getCurve = function(start,finish,segments){
        var startlat = start.lat;
        var startlon = start.lng;
        var finishlat = finish.lat;
        var finishlon = finish.lng;
        var segments = segments;
        var curveAry = [];

        var lat1 = startlat * (Math.PI / 180);
        var lon1 = startlon * (Math.PI / 180);
        var lat2 = finishlat * (Math.PI / 180);
        var lon2 = finishlon * (Math.PI / 180);


        var d = 2 * Math.asin(Math.sqrt(Math.pow((Math.sin((lat1-lat2)/2)),2)+Math.cos(lat1)*Math.cos(lat2)*Math.pow((Math.sin((lon1-lon2)/2)),2)));

        for(var n= 0; n<segments+1;n++){
            var f = (1/segments)*n;
            var A = Math.sin((1-f)*d)/Math.sin(d);
            var B = Math.sin(f*d)/Math.sin(d);

            var x = A * Math.cos(lat1)*Math.cos(lon1) + B*Math.cos(lat2)*Math.cos(lon2);
            var y = A * Math.cos(lat1)*Math.sin(lon1) + B*Math.cos(lat2)*Math.sin(lon2);
            var z = A * Math.sin(lat1) + B * Math.sin(lat2);

            var lat = Math.atan2(z,Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
            var lon = Math.atan2(y,x);
            try{
                var temp = L.latLng(lat/(Math.PI/180),lon/(Math.PI/180));
                curveAry.push(temp);
            }catch (e){

            }
        }
        return curveAry;
    };
    var curvePoints = [];
    for(var i = 0; i < points.length-1;i++){
        if(points[i]['lat'] == points[i+1]['lat'] && points[i]['lng'] == points[i+1]['lng']){
            curvePoints = curvePoints.concat(points[i]);
        }else {
            var p = getCurve(points[i],points[i+1],20);
            if(p && p.length > 0){
                curvePoints = curvePoints.concat(p);
            }
        }
        
    }
    return curvePoints;
},


/**
 * 画大圆标绘坐标转换
 */

L.Util.circleDrawLatlng = function(poly){
    var distance = [];
    var lineDistance;
    if(poly._latlngs.length ===1){
        poly._latlngs = poly._latlngs[0];
        for(i=0,l=poly._latlngs.length;i<l;i++){
            if(i<poly._latlngs.length-1){
                lineDistance = poly._latlngs[i].distanceTo(poly._latlngs[i+1]);
        }
            else{
                lineDistance = poly._latlngs[i].distanceTo(poly._latlngs[0]);
            }
    
            distance.push(lineDistance);
        }
    }else{
        for(i=0,l=poly._latlngs.length;i<l;i++){
            if(i<poly._latlngs.length-1){
                lineDistance = poly._latlngs[i].distanceTo(poly._latlngs[i+1]);
                distance.push(lineDistance);
            }
        }
    }
    

    var segments;
    var bigcurveAry = []; 
    for (i = 0, l = poly._latlngs.length; i < l ; i++) {
        var startlat = poly._latlngs[i].lat;
        var startlon = poly._latlngs[i].lng;
        if(i==poly._latlngs.length-1){
            var finishlat = poly._latlngs[0].lat;
            var finishlon = poly._latlngs[0].lng;
        }
        else{
            var finishlat = poly._latlngs[i + 1].lat;
            var finishlon = poly._latlngs[i + 1].lng;
        }
        var curveAry = [];
        var lat1 = startlat * (Math.PI / 180);
        var lon1 = startlon * (Math.PI / 180);
        var lat2 = finishlat * (Math.PI / 180);
        var lon2 = finishlon * (Math.PI / 180);
        var d = 2 * Math.asin(Math.sqrt(Math.pow((Math.sin((lat1 - lat2) / 2)), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow((Math.sin((lon1 - lon2) / 2)), 2)));
        segments = Math.ceil((distance[i] / 1000) / 100);
        for (var n = 0; n < segments + 1; n++) {
            var f = (1 / segments) * n;
            var A = Math.sin((1 - f) * d) / Math.sin(d);
            var B = Math.sin(f * d) / Math.sin(d);
            var x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
            var y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
            var z = A * Math.sin(lat1) + B * Math.sin(lat2);
            var lat = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
            var lon = Math.atan2(y, x);
            try {
                var temp = L.latLng(lat / (Math.PI / 180), lon / (Math.PI / 180));
                curveAry.push(temp);
                bigcurveAry.push(temp);
            } catch (e) {
            }
        }
    }
    //return bigcurveAry;
    poly.setLatLngs(bigcurveAry);
},

/**
 * ajax 方法 支持jsonp
 * @param  {[type]}   url     [提交url]
 * @param  {[type]}   options [参数]
 * @param  {Function} cb      [回调方法]
 * @return {[type]}           [description]
 */
L.Util.ajax = function (url,options, cb) {
    var cbName,ourl,cbSuffix,scriptNode, head, cbParam, XMHreq;
    try{
        if(typeof options === "function"){
            cb = options;
            options = {};
        }
        if(options.jsonp){

            head = document.getElementsByTagName('head')[0];
            cbParam = options.cbParam || "callback";
            if(options.callbackName){
                cbName= options.callbackName;
            }else{
                cbSuffix = "_" + ("" + Math.random()).slice(2);
                cbName = "L.Util.ajax.cb." + cbSuffix;
            }
            scriptNode = document.createElement('script');
            scriptNode.setAttribute('type','text/javascript');

            if (url.indexOf("?") === -1 ){
                ourl =  url+"?"+cbParam+"="+cbName;
            }else{
                ourl =  url+"&"+cbParam+"="+cbName;
            }
            scriptNode.setAttribute('src',ourl);

            head.appendChild(scriptNode);

            if(cbSuffix) {
                L.Util.ajax.cb[cbSuffix] = function(data){
                    delete L.Util.ajax.cb[cbSuffix];
                    cb(data);
                    head.removeChild(scriptNode);
                };
            }

            return {abort:function(){return false;}};
        }else{
            // the following is from JavaScript: The Definitive Guide
            if (window.XMLHttpRequest === undefined) {
                XMHreq = function() {
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                        //return new ActiveXObject("Microsoft.XMLHTTP.6.0");
                    }
                    catch  (e1) {
                        try {
                            return new ActiveXObject("Microsoft.XMLHTTP.3.0");
                        }
                        catch (e2) {
                            throw new Error("XMLHttpRequest is not supported");
                        }
                    }
                };
            }else{
                XMHreq = window.XMLHttpRequest;
            }

            var response, request = new XMHreq();
            request.open("GET", url);
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    if(window.JSON) {
                        response = JSON.parse(request.responseText);
                    } else {
                        response = eval("("+ request.responseText + ")");
                    }
                    cb(response);
                }
            };
            request.send();
            return request;
        }

    }catch (e){
        cb(e);
    }

};
L.Util.ajax.cb = {};


L.DefaultImagePath = (function () {
    var scripts = document.getElementsByTagName('script'),
        leafletRe = /[\/^]map23dlib[\-\._]?([\w\-\._]*)\.js\??/;
 
    var i, len, src, path;

    for (i = 0, len = scripts.length; i < len; i++) {
        src = scripts[i].src || '';

        if (src.match(leafletRe)) {
            path = src.split(leafletRe)[0];
            return (path ? path + '/' : '') + 'images';
        }
    }
}());

if(!L.DefaultImagePath){
    L.DefaultImagePath = '/dist/images'
}




L.Map.include({
    setZoomScope:function(minZoom,maxZoom){
        if(maxZoom >= minZoom){
            this.options.minZoom = minZoom;
            this.options.maxZoom = maxZoom;
            this.fire('zoomlevelschange');
        }
    }
});
L.Control.include({
    addTo: function (map) {
        this.remove();
        this._map = map;

        var container = this._container = this.onAdd(map),
            pos = this.getPosition(),
            corner = map._controlCorners[pos];

        L.DomUtil.addClass(container, 'leaflet-control');

        if (pos.indexOf('bottom') !== -1) {
            corner.insertBefore(container, corner.firstChild);
        } else {
            corner.appendChild(container);
        }

        if(this._callBack){
            this._callBack();
        }

        return this;
    }
});


L.Map.include({
    _initControlPos: function () {
        var corners = this._controlCorners = {},
            l = 'leaflet-',
            container = this._controlContainer =
                    L.DomUtil.create('div', l + 'control-container', this._container);

        function createCorner(vSide, hSide) {
            var className = l + vSide + ' ' + l + hSide;

            corners[vSide + hSide] = L.DomUtil.create('div', className, container);
        }
        createCorner('top', 'left');
        createCorner('top', 'center');
        createCorner('top', 'right');
        createCorner('bottom', 'left');
        createCorner('bottom', 'center');
        createCorner('bottom', 'right');
    }
});

/*!
 * Copyright (c) 2012, Smartrak, David Leaver
 * Leaflet.utfgrid is an open-source JavaScript library that provides utfgrid interaction on leaflet powered maps.
 * https://github.com/danzel/Leaflet.utfgrid
 *
 * @license MIT
 */
(function (window, undefined) {

L.Util.utfgridAjax = function (url, success, error) {
	// the following is from JavaScript: The Definitive Guide
	// and https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/Using_XMLHttpRequest_in_IE6
	if (window.XMLHttpRequest === undefined) {
		window.XMLHttpRequest = function () {
			/*global ActiveXObject:true */
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch  (e) {
				throw new Error("XMLHttpRequest is not supported");
			}
		};
	}
	var response, request = new XMLHttpRequest();
	request.open("GET", url);
	request.onreadystatechange = function () {
		/*jshint evil: true */
		if (request.readyState === 4) {
			if (request.status === 200) {
				if (window.JSON) {
					response = JSON.parse(request.responseText);
				} else {
					response = eval("(" + request.responseText + ")");
				}
				success(response);
			} else if (request.status !== 0 && error !== undefined) {
				error(request.status);
			}
		}
	};
	request.ontimeout = function () { error('timeout'); };
	request.send();
	return request;
};
L.UtfGrid = (L.Layer || L.Class).extend({
	includes: L.Mixin.Events,
	options: {
		subdomains: 'abc',

		minZoom: 0,
		maxZoom: 18,
		tileSize: 256,

		resolution: 4,

		useJsonP: true,
		pointerCursor: true,

		maxRequests: 4,
		requestTimeout: 60000
	},

	//The thing the mouse is currently on
	_mouseOn: null,

	initialize: function (url, options) {
		L.Util.setOptions(this, options);

		// The requests
		this._requests = {};
		this._request_queue = [];
		this._requests_in_process = [];

		this._url = url;
		this._cache = {};

		//Find a unique id in window we can use for our callbacks
		//Required for jsonP
		var i = 0;
		while (window['lu' + i]) {
			i++;
		}
		this._windowKey = 'lu' + i;
		window[this._windowKey] = {};

		var subdomains = this.options.subdomains;
		if (typeof this.options.subdomains === 'string') {
			this.options.subdomains = subdomains.split('');
		}
	},

	onAdd: function (map) {
		this._map = map;
		this._container = this._map._container;

		this._update();

		var zoom = Math.round(this._map.getZoom());

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		map.on('click', this._click, this);
		map.on('mousemove', this._move, this);
		map.on('moveend', this._update, this);
	},

	onRemove: function () {
		var map = this._map;
		map.off('click', this._click, this);
		map.off('mousemove', this._move, this);
		map.off('moveend', this._update, this);
		if (this.options.pointerCursor) {
			this._container.style.cursor = '';
		}
	},

	setUrl: function (url, noRedraw) {
		this._url = url;

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	},

	redraw: function () {
		// Clear cache to force all tiles to reload
		this._request_queue = [];
		for (var req_key in this._requests) {
			if (this._requests.hasOwnProperty(req_key)) {
				this._abort_request(req_key);
			}
		}
		this._cache = {};
		this._update();
	},

	_click: function (e) {
		this.fire('click', this._objectForEvent(e));
	},
	_move: function (e) {
		var on = this._objectForEvent(e);

		if (on.data !== this._mouseOn) {
			if (this._mouseOn) {
				this.fire('mouseout', { latlng: e.latlng, data: this._mouseOn });
				if (this.options.pointerCursor) {
					this._container.style.cursor = '';
				}
			}
			if (on.data) {
				this.fire('mouseover', on);
				if (this.options.pointerCursor) {
					this._container.style.cursor = 'pointer';
				}
			}

			this._mouseOn = on.data;
		} else if (on.data) {
			this.fire('mousemove', on);
		}
	},

	_objectForEvent: function (e) {
		var map = this._map,
		    point = map.project(e.latlng),
		    tileSize = this.options.tileSize,
		    resolution = this.options.resolution,
		    x = Math.floor(point.x / tileSize),
		    y = Math.floor(point.y / tileSize),
		    gridX = Math.floor((point.x - (x * tileSize)) / resolution),
		    gridY = Math.floor((point.y - (y * tileSize)) / resolution),
			max = map.options.crs.scale(map.getZoom()) / tileSize;

		x = (x + max) % max;
		y = (y + max) % max;

		var data = this._cache[map.getZoom() + '_' + x + '_' + y];
		var result = null;
		if (data && data.grid) {
			var idx = this._utfDecode(data.grid[gridY].charCodeAt(gridX)),
				key = data.keys[idx];

			if (data.data.hasOwnProperty(key)) {
				result = data.data[key];
			}
		}

		return L.extend({ latlng: e.latlng, data: result }, e);
	},

	//Load up all required json grid files
	//TODO: Load from center etc
	_update: function () {

		var bounds = this._map.getPixelBounds(),
		    zoom = Math.round(this._map.getZoom()),
		    tileSize = this.options.tileSize;

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		var nwTilePoint = new L.Point(
				Math.floor(bounds.min.x / tileSize),
				Math.floor(bounds.min.y / tileSize)),
			seTilePoint = new L.Point(
				Math.floor(bounds.max.x / tileSize),
				Math.floor(bounds.max.y / tileSize)),
				max = this._map.options.crs.scale(zoom) / tileSize;

		//Load all required ones
		var visible_tiles = [];
		for (var x = nwTilePoint.x; x <= seTilePoint.x; x++) {
			for (var y = nwTilePoint.y; y <= seTilePoint.y; y++) {

				var xw = (x + max) % max, yw = (y + max) % max;
				var key = zoom + '_' + xw + '_' + yw;
				visible_tiles.push(key);

				if (!this._cache.hasOwnProperty(key)) {
					this._cache[key] = null;

					if (this.options.useJsonP) {
						this._loadTileP(zoom, xw, yw);
					} else {
						this._loadTile(zoom, xw, yw);
					}
				}
			}
		}
		// If we still have requests for tiles that have now gone out of sight, attempt to abort them.
		for (var req_key in this._requests) {
			if (visible_tiles.indexOf(req_key) < 0) {
				this._abort_request(req_key);
			}
		}
	},

	_loadTileP: function (zoom, x, y) {
		var head = document.getElementsByTagName('head')[0],
		    key = zoom + '_' + x + '_' + y,
		    functionName = 'lu_' + key,
		    wk = this._windowKey,
		    self = this;

		var url = L.Util.template(this._url, L.Util.extend({
			s: L.TileLayer.prototype._getSubdomain.call(this, { x: x, y: y }),
			z: zoom,
			x: x,
			y: y,
			cb: wk + '.' + functionName
		}, this.options));

		var script = document.createElement('script');
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", url);

		window[wk][functionName] = function (data) {
			try {
				self._cache[key] = data;
				delete window[wk][functionName];
				head.removeChild(script);
				self._finish_request(key);
			}
			catch (e) {				
			}			
		};

		this._queue_request(key, url, function () {
			head.appendChild(script);
			return {
				abort: function () {
					head.removeChild(script);
				}
			};
		});
	},

	_loadTile: function (zoom, x, y) {
		var url = L.Util.template(this._url, L.Util.extend({
			s: L.TileLayer.prototype._getSubdomain.call(this, { x: x, y: y }),
			z: zoom,
			x: x,
			y: y
		}, this.options));

		var key = zoom + '_' + x + '_' + y;
		this._queue_request(key, url, this._ajaxRequestFactory(key, url));
	},

	_ajaxRequestFactory: function (key, url) {
		var successCallback = this._successCallbackFactory(key);
		var errorCallback = this._errorCallbackFactory(url);
		return function () {
			var request = L.Util.utfgridAjax(url, successCallback, errorCallback);
			request.timeout = this.options.requestTimeout;
			return request;
		}.bind(this);
	},

	_successCallbackFactory: function (key) {
		return function (data) {
			this._cache[key] = data;
			this._finish_request(key);
		}.bind(this);
	},

	_errorCallbackFactory: function (tileurl) {
		return function (statuscode) {
			this.fire('tileerror', {
				url: tileurl,
				code: statuscode
			});
		}.bind(this);
	},

	_queue_request: function (key, url, callback) {
		this._requests[key] = {
			callback: callback,
			timeout: null,
			handler: null,
			url: url
		};
		this._request_queue.push(key);
		this._process_queued_requests();
	},

	_finish_request: function (key) {
		// Remove from requests in process
		var pos = this._requests_in_process.indexOf(key);
		if (pos >= 0) {
			this._requests_in_process.splice(pos, 1);
		}
		// Remove from request queue
		pos = this._request_queue.indexOf(key);
		if (pos >= 0) {
			this._request_queue.splice(pos, 1);
		}
		// Remove the request entry
		if (this._requests[key]) {
			if (this._requests[key].timeout) {
				window.clearTimeout(this._requests[key].timeout);
			}
			delete this._requests[key];
		}
		// Recurse
		this._process_queued_requests();
		// Fire 'load' event if all tiles have been loaded
		if (this._requests_in_process.length === 0) {
			this.fire('load');
		}
	},

	_abort_request: function (key) {
		// Abort the request if possible
		if (this._requests[key] && this._requests[key].handler) {
			if (typeof this._requests[key].handler.abort === 'function') {
				this._requests[key].handler.abort();
			}
		}
		// Ensure we don't keep a false copy of the data in the cache
		if (this._cache[key] === null) {
			delete this._cache[key];
		}
		// And remove the request
		this._finish_request(key);
	},

	_process_queued_requests: function () {
		while (this._request_queue.length > 0 && (this.options.maxRequests === 0 ||
		       this._requests_in_process.length < this.options.maxRequests)) {
			this._process_request(this._request_queue.pop());
		}
	},

	_process_request: function (key) {
		this._requests_in_process.push(key);
		// The callback might call _finish_request, so don't assume _requests[key] still exists.
		var handler = this._requests[key].callback();
		if (this._requests[key]) {
			this._requests[key].handler = handler;
			if (handler.timeout === undefined) {
				var timeoutCallback = this._timeoutCallbackFactory(key);
				this._requests[key].timeout = window.setTimeout(timeoutCallback, this.options.requestTimeout);
			}
		}
	},

	_timeoutCallbackFactory: function (key) {
		var tileurl = this._requests[key].url;
		return function () {
			this.fire('tileerror', { url: tileurl, code: 'timeout' });
			this._abort_request(key);
		}.bind(this);
	},

	_utfDecode: function (c) {
		if (c >= 93) {
			c--;
		}
		if (c >= 35) {
			c--;
		}
		return c - 32;
	}
});

L.utfGrid = function (url, options) {
	return new L.UtfGrid(url, options);
};



}(window));
/*
    Leaflet.label, a plugin that adds labels to markers and vectors for Leaflet powered maps.
    (c) 2012-2013, Jacob Toye, Smartrak

    https://github.com/Leaflet/Leaflet.label
    http://leafletjs.com
    https://github.com/jacobtoye
*/
(function () {
//var L = window.L;
/*
 * Leaflet.label assumes that you have already included the Leaflet library.
 */

//L.labelVersion = '0.2.2-dev';

L.Label = (L.Layer ? L.Layer : L.Class).extend({

    includes: L.Mixin.Events,

    options: {
        className: '',
        clickable: false,
        direction: 'auto',
        noHide: false,
        offset: [13, -16], // 6 (width of the label triangle) + 6 (padding)
        opacity: 1,
        zoomAnimation: true
    },

    initialize: function (options, source) {
        L.setOptions(this, options);

        this._source = source;
        this._animated = L.Browser.any3d && this.options.zoomAnimation;
        this._isOpen = false;
    },

    onAdd: function (map) {
        this._map = map;

        this._pane = this.options.pane ? map._panes[this.options.pane] :
            this._source instanceof L.Marker ? map._panes.markerPane : map._panes.popupPane;

        if (!this._container) {
            this._initLayout();
        }

        this._pane.appendChild(this._container);

        this._initInteraction();

        this._update();

        this.setOpacity(this.options.opacity);

        map
            .on('moveend', this._onMoveEnd, this)
            .on('viewreset', this._onViewReset, this);

        if (this._animated) {
            map.on('zoomanim', this._zoomAnimation, this);
        }

        if (L.Browser.touch && !this.options.noHide) {
            L.DomEvent.on(this._container, 'click', this.close, this);
            map.on('click', this.close, this);
        }
    },

    onRemove: function (map) {
        this._pane.removeChild(this._container);

        map.off({
            zoomanim: this._zoomAnimation,
            moveend: this._onMoveEnd,
            viewreset: this._onViewReset
        }, this);

        this._removeInteraction();

        this._map = null;
    },

    setLatLng: function (latlng) {
        this._latlng = L.latLng(latlng);
        if (this._map) {
            this._updatePosition();
        }
        return this;
    },

    setContent: function (content) {
        // Backup previous content and store new content
        this._previousContent = this._content;
        this._content = content;

        this._updateContent();

        return this;
    },

    close: function () {
        var map = this._map;

        if (map) {
            if (L.Browser.touch && !this.options.noHide) {
                L.DomEvent.off(this._container, 'click', this.close);
                map.off('click', this.close, this);
            }

            map.removeLayer(this);
        }
    },

    updateZIndex: function (zIndex) {
        this._zIndex = zIndex;

        if (this._container && this._zIndex) {
            this._container.style.zIndex = zIndex;
        }
    },

    setOpacity: function (opacity) {
        this.options.opacity = opacity;

        if (this._container) {
            L.DomUtil.setOpacity(this._container, opacity);
        }
    },

    _initLayout: function () {
        this._container = L.DomUtil.create('div', 'leaflet-label ' + this.options.className + ' leaflet-zoom-animated');
        this.updateZIndex(this._zIndex);
    },

    _update: function () {
        if (!this._map) { return; }

        this._container.style.visibility = 'hidden';

        this._updateContent();
        this._updatePosition();

        this._container.style.visibility = '';
    },

    _updateContent: function () {
        if (!this._content || !this._map || this._prevContent === this._content) {
            return;
        }

        if (typeof this._content === 'string') {
            this._container.innerHTML = this._content;
            this._prevContent = this._content;
            this._labelWidth = this._container.offsetWidth;
        }else {
            this._container.appendChild(this._content);
            this._prevContent = this._content;
            this._labelWidth = this._container.offsetWidth;
        }
//==S== 修改标记
        L.DomUtil.create('div','leaflet-label-tips',this._container);
//==E== 修改标记        
    },

    _updatePosition: function () {
        var pos = this._map.latLngToLayerPoint(this._latlng);

        this._setPosition(pos);
    },

    _setPosition: function (pos) {
        var map = this._map,
            container = this._container,
            centerPoint = map.latLngToContainerPoint(map.getCenter()),
            labelPoint = map.layerPointToContainerPoint(pos),
            direction = this.options.direction,
            labelWidth = this._labelWidth,
            offset = L.point(this.options.offset);

        // position to the right (right or auto & needs to)
        if (direction === 'right' || direction === 'auto' && labelPoint.x < centerPoint.x) {
            L.DomUtil.addClass(container, 'leaflet-label-right');
            L.DomUtil.removeClass(container, 'leaflet-label-left');

            pos = pos.add(offset);
        } else { // position to the left
            L.DomUtil.addClass(container, 'leaflet-label-left');
            L.DomUtil.removeClass(container, 'leaflet-label-right');

            pos = pos.add(L.point(-offset.x - labelWidth, offset.y));
        }

        L.DomUtil.setPosition(container, pos);
    },

    _zoomAnimation: function (opt) {
        var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

        this._setPosition(pos);
    },

    _onMoveEnd: function () {
        if (!this._animated || this.options.direction === 'auto') {
            this._updatePosition();
        }
    },

    _onViewReset: function (e) {
        /* if map resets hard, we must update the label */
        if (e && e.hard) {
            this._update();
        }
    },

    _initInteraction: function () {
        if (!this.options.clickable) { return; }

        var container = this._container,
            events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

        L.DomUtil.addClass(container, 'leaflet-clickable');
        L.DomEvent.on(container, 'click', this._onMouseClick, this);

        for (var i = 0; i < events.length; i++) {
            L.DomEvent.on(container, events[i], this._fireMouseEvent, this);
        }
    },

    _removeInteraction: function () {
        if (!this.options.clickable) { return; }

        var container = this._container,
            events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

        L.DomUtil.removeClass(container, 'leaflet-clickable');
        L.DomEvent.off(container, 'click', this._onMouseClick, this);

        for (var i = 0; i < events.length; i++) {
            L.DomEvent.off(container, events[i], this._fireMouseEvent, this);
        }
    },

    _onMouseClick: function (e) {
        if (this.hasEventListeners(e.type)) {
            L.DomEvent.stopPropagation(e);
        }

        this.fire(e.type, {
            originalEvent: e
        });
    },

    _fireMouseEvent: function (e) {
        this.fire(e.type, {
            originalEvent: e
        });

        // TODO proper custom event propagation
        // this line will always be called if marker is in a FeatureGroup
        if (e.type === 'contextmenu' && this.hasEventListeners(e.type)) {
            L.DomEvent.preventDefault(e);
        }
        if (e.type !== 'mousedown') {
            L.DomEvent.stopPropagation(e);
        } else {
            L.DomEvent.preventDefault(e);
        }
    }
});


// This object is a mixin for L.Marker and L.CircleMarker. We declare it here as both need to include the contents.
L.BaseMarkerMethods = {
    showLabel: function () {
        if (this.label && this._map) {
            this.label.setLatLng(this._latlng);
            this._map.showLabel(this.label);
        }

        return this;
    },

    hideLabel: function () {
        if (this.label) {
            this.label.close();
        }
        return this;
    },

    setLabelNoHide: function (noHide) {
        if (this._labelNoHide === noHide) {
            return;
        }

        this._labelNoHide = noHide;

        if (noHide) {
            this._removeLabelRevealHandlers();
            this.showLabel();
        } else {
            this._addLabelRevealHandlers();
            this.hideLabel();
        }
    },

    bindLabel: function (content, options) {
        if(this.label){
            return false;
        }
        var labelAnchor = this.options.icon ? this.options.icon.options.labelAnchor : this.options.labelAnchor,
            anchor = L.point(labelAnchor) || L.point(0, 0);

        anchor = anchor.add(L.Label.prototype.options.offset);

        if (options && options.offset) {
            anchor = anchor.add(options.offset);
        }

        options = L.Util.extend({offset: anchor}, options);

        this._labelNoHide = options.noHide;

        if (!this.label) {
            if (!this._labelNoHide) {
                this._addLabelRevealHandlers();
            }

            this
                .on('remove', this.hideLabel, this)
                .on('move', this._moveLabel, this)
                .on('add', this._onMarkerAdd, this);

            this._hasLabelHandlers = true;
        }

        this.label = new L.Label(options, this)
            .setContent(content);

        return this;
    },

    unbindLabel: function () {
        if (this.label) {
            this.hideLabel();

            this.label = null;

            if (this._hasLabelHandlers) {
                if (!this._labelNoHide) {
                    this._removeLabelRevealHandlers();
                }

                this
                    .off('remove', this.hideLabel, this)
                    .off('move', this._moveLabel, this)
                    .off('add', this._onMarkerAdd, this);
            }

            this._hasLabelHandlers = false;
        }
        return this;
    },

    updateLabelContent: function (content) {
        if (this.label) {
            this.label.setContent(content);
        }
    },

    getLabel: function () {
        return this.label;
    },

    _onMarkerAdd: function () {
        if (this._labelNoHide) {
            this.showLabel();
        }
    },

    _addLabelRevealHandlers: function () {
        this
            .on('mouseover', this.showLabel, this)
            .on('mouseout', this.hideLabel, this);

        if (L.Browser.touch) {
            this.on('click', this.showLabel, this);
        }
    },

    _removeLabelRevealHandlers: function () {
        this
            .off('mouseover', this.showLabel, this)
            .off('mouseout', this.hideLabel, this);

        if (L.Browser.touch) {
            this.off('click', this.showLabel, this);
        }
    },

    _moveLabel: function (e) {
        this.label.setLatLng(e.latlng);
    }
};

// Add in an option to icon that is used to set where the label anchor is
L.Icon.Default.mergeOptions({
    labelAnchor: new L.Point(4, -15)
});

// Have to do this since Leaflet is loaded before this plugin and initializes
// L.Marker.options.icon therefore missing our mixin above.
L.Marker.mergeOptions({
    icon: new L.Icon.Default()
});

L.Marker.include(L.BaseMarkerMethods);
L.Marker.include({
    _originalUpdateZIndex: L.Marker.prototype._updateZIndex,

    _updateZIndex: function (offset) {
        var zIndex = this._zIndex + offset;

        this._originalUpdateZIndex(offset);

        if (this.label) {
            this.label.updateZIndex(zIndex);
        }
    },

    _originalSetOpacity: L.Marker.prototype.setOpacity,

    setOpacity: function (opacity, labelHasSemiTransparency) {
        this.options.labelHasSemiTransparency = labelHasSemiTransparency;

        this._originalSetOpacity(opacity);
    },

    _originalUpdateOpacity: L.Marker.prototype._updateOpacity,

    _updateOpacity: function () {
        var absoluteOpacity = this.options.opacity === 0 ? 0 : 1;

        this._originalUpdateOpacity();

        if (this.label) {
            this.label.setOpacity(this.options.labelHasSemiTransparency ? this.options.opacity : absoluteOpacity);
        }
    },

    _originalSetLatLng: L.Marker.prototype.setLatLng,

    setLatLng: function (latlng) {
        if (this.label && !this._labelNoHide) {
            this.hideLabel();
        }

        return this._originalSetLatLng(latlng);
    }
});

// Add in an option to icon that is used to set where the label anchor is
L.CircleMarker.mergeOptions({
    labelAnchor: new L.Point(-5, 5)
});


L.CircleMarker.include(L.BaseMarkerMethods);

L.Path.include({
    bindLabel: function (content, options) {
        if (!this.label || this.label.options !== options) {
            this.label = new L.Label(options, this);
        }

        this.label.setContent(content);

        if (!this._showLabelAdded) {
            this
                .on('mouseover', this._showLabel, this)
                .on('mousemove', this._moveLabel, this)
                .on('mouseout remove', this._hideLabel, this);

            if (L.Browser.touch) {
                this.on('click', this._showLabel, this);
            }
            this._showLabelAdded = true;
        }

        return this;
    },

    unbindLabel: function () {
        if (this.label) {
            this._hideLabel();
            this.label = null;
            this._showLabelAdded = false;
            this
                .off('mouseover', this._showLabel, this)
                .off('mousemove', this._moveLabel, this)
                .off('mouseout remove', this._hideLabel, this);
        }
        return this;
    },

    updateLabelContent: function (content) {
        if (this.label) {
            this.label.setContent(content);
        }
    },

    _showLabel: function (e) {
        this.label.setLatLng(e.latlng);
        this._map.showLabel(this.label);
    },

    _moveLabel: function (e) {
        this.label.setLatLng(e.latlng);
    },

    _hideLabel: function () {
        this.label.close();
    }
});

L.Map.include({
    showLabel: function (label) {
        return this.addLayer(label);
    }
});

L.FeatureGroup.include({
    // TODO: remove this when AOP is supported in Leaflet, need this as we cannot put code in removeLayer()
    clearLayers: function () {
        this.unbindLabel();
        this.eachLayer(this.removeLayer, this);
        return this;
    },

    bindLabel: function (content, options) {
        return this.invoke('bindLabel', content, options);
    },

    unbindLabel: function () {
        return this.invoke('unbindLabel');
    },

    updateLabelContent: function (content) {
        this.invoke('updateLabelContent', content);
    }
});

}(window, document));
/*
    Leaflet.plabel, a plugin that adds plabels to markers and vectors for Leaflet powered maps.
    (c) 2012-2013, Jacob Toye, Smartrak

    https://github.com/Leaflet/Leaflet.plabel
    http://leafletjs.com
    https://github.com/jacobtoye
*/
(function () {
//var L = window.L;
/*
 * Leaflet.plabel assumes that you have already included the Leaflet library.
 */

//L.plabelVersion = '0.2.2-dev';

L.Plabel = (L.Layer ? L.Layer : L.Class).extend({

    includes: L.Mixin.Events,

    options: {
        className: '',
        clickable: true,
        direction: 'right',
        noHide: false,
        offset: [0, 0], // 6 (width of the plabel triangle) + 6 (padding)
        opacity: 1,
        color:'#000000',
        bold:false,
        background:'',
        zoomAnimation: true,
        lineWidth:42.4,
    },

    initialize: function (options, source) {
        L.setOptions(this, options);

        this._source = source;
        this._animated = L.Browser.any3d && this.options.zoomAnimation;
        this._isOpen = false;
    },

    onAdd: function (map) {
        this._map = map;
        this._isOpen = true;
        this._pane = this.options.pane ? map._panes[this.options.pane] :
            this._source instanceof L.Marker ? map._panes.markerPane : map._panes.popupPane;

        if (!this._container) {
            this._initLayout();
        }

        this._pane.appendChild(this._container);

        this._initInteraction();

        this._update();

        this.setOpacity(this.options.opacity);

        map
            .on('moveend', this._onMoveEnd, this)
            .on('move',this._onMoveEnd,this)
            .on('viewreset', this._onViewReset, this);

        if (this._animated) {
            map.on('zoomanim', this._zoomAnimation, this);
        }

        // if (L.Browser.touch && !this.options.noHide) {
        //     L.DomEvent.on(this._container, 'click', this.close, this);
        //     map.on('click', this.close, this);
        // }
    },

    onRemove: function (map) {
        this._pane.removeChild(this._container);
        this._isOpen = false;
        map.off({
            zoomanim: this._zoomAnimation,
            move:this._onMoveEnd,
            moveend: this._onMoveEnd,
            viewreset: this._onViewReset
        }, this);

        this._removeInteraction();

        this._map = null;
    },

    setLatLng: function (latlng) {
        this._latlng = L.latLng(latlng);
        if (this._map) {
            this._updatePosition();
        }
        return this;
    },

    setContent: function (content) {
        // Backup previous content and store new content
        this._previousContent = this._content;
        this._content = content;
        this._updateContent();
        return this;
    },

    setColor:function(color){
        this.options.color = color;
        if (this._container) {
            this._containerLine.style.borderBottomColor = color;
            this._containerText.style.color = color;
        }        
        return this;
    },

    setBold:function(flag){
        this.options.bold = flag;
        if (this._container) {
            if(flag){
                this._containerLine.style.borderBottomWidth = '2px';
                this._containerText.style.fontWeight = 800;
            }else{
                this._containerLine.style.borderBottomWidth = '1px';
                this._containerText.style.fontWeight = 400;
            }
        }
        return this;
    },

    setBackground:function(color){
        this.options.background = color;
        if (this._container) {
            if(color){
                this._containerText.style.backgroundColor = color;
            }else{
                this._containerText.style.backgroundColor = '';
            }
        }            
        return this;
    },

    close: function () {
        var map = this._map;
        this._isOpen = false;
        if (map) {
            // if (L.Browser.touch && !this.options.noHide) {
            //     L.DomEvent.off(this._container, 'click', this.close);
            //     map.off('click', this.close, this);
            // }

            map.removeLayer(this);
        }
    },

    updateZIndex: function (zIndex) {
        this._zIndex = zIndex;

        if (this._container && this._zIndex) {
            this._container.style.zIndex = zIndex;
        }
    },

    setOpacity: function (opacity) {
        this.options.opacity = opacity;
        if (this._container) {
            L.DomUtil.setOpacity(this._container, opacity);
        }
    },

    _initLayout: function () {
        this._container = L.DomUtil.create('div', 'leaflet-plabel ' + this.options.className + ' leaflet-zoom-animated');
        this._containerLine = L.DomUtil.create('div','leaflet-plabel-line',this._container);
        this._containerText = L.DomUtil.create('div','leaflet-plabel-text',this._container);
        $(this._containerText).dragmove();

        var lleft = Math.pow(Math.pow(this.options.lineWidth,2)/2,0.5)+'px';
        var ltop = -Math.pow(Math.pow(this.options.lineWidth,2)/2,0.5)+'px';
        this._containerText.style.left = lleft;
        this._containerText.style.top = ltop;
        this._containerLine.style.width = this.options.lineWidth+'px';
        this._containerText.style.backgroundColor = this.options.background;

        L.DomEvent.on(this._containerText,'mousedown',function(e){
            this._map.dragging.disable();
        },this)

        L.DomEvent.on(this._containerText,'mousemove',function(e){
            var left = parseInt(this._containerText.style.left||30);
            var top = parseInt(this._containerText.style.top||-30);
            var angle = this._angle({x:0,y:0},{x:left,y:top})
            this._containerLine.style.transform = 'rotate('+angle+'deg)';
            this._containerLine.style.msTransform = 'rotate('+angle+'deg)';
            var lineWidth = Math.pow((Math.abs(left) * Math.abs(left) + Math.abs(top) * Math.abs(top)), 0.5)
            this._containerLine.style.width = lineWidth+'px';
        },this)

        L.DomEvent.on(this._containerText,'mouseup',function(e){
            this._map.dragging.enable();
        },this)

        this.updateZIndex(this._zIndex);
    },

    _angle:function(start,end){
        var diff_x = end.x - start.x,
            diff_y = end.y - start.y;
        //返回角度,不是弧度
        var angle =  360*Math.atan(diff_y/diff_x)/(2*Math.PI);

        if(end.x<start.x){
            angle += 180
        }

        return angle;
    },

    

    _update: function () {
        if (!this._map) { return; }

        this._container.style.visibility = 'hidden';

        this._updateContent();
        this._updatePosition();

        this._container.style.visibility = '';
        this._containerText.style.backgroundColor = this.options.background;

        if(this.options.bold){
            this._containerLine.style.borderBottomWidth = '2px';
            this._containerText.style.fontWeight = 800;
        }else{
            this._containerLine.style.borderBottomWidth = '1px';
            this._containerText.style.fontWeight = 400;
        }

        this._containerLine.style.borderBottomColor = this.options.color;
        this._containerText.style.color = this.options.color;
    },

    _updateContent: function () {
        if (!this._content || !this._map || this._prevContent === this._content) {
            return;
        }

        if (typeof this._content === 'string') {
            this._containerText.innerHTML = this._content;
            this._prevContent = this._content;
            this._plabelWidth = this._containerText.offsetWidth;
        }else {
            this._containerText.appendChild(this._content);
            this._prevContent = this._content;
            this._plabelWidth = this._containerText.offsetWidth;
        }       
    },

    _updatePosition: function () {
        var pos = this._map.latLngToLayerPoint(this._latlng);

        this._setPosition(pos);
    },

    _setPosition: function (pos) {
        var map = this._map,
            container = this._container,
            centerPoint = map.latLngToContainerPoint(map.getCenter()),
            plabelPoint = map.layerPointToContainerPoint(pos),
            direction = this.options.direction,
            plabelWidth = this._plabelWidth,
            offset = L.point(this.options.offset);

        // position to the right (right or auto & needs to)
        if (direction === 'right' || direction === 'auto' && plabelPoint.x < centerPoint.x) {
            L.DomUtil.addClass(container, 'leaflet-plabel-right');
            L.DomUtil.removeClass(container, 'leaflet-plabel-left');

            pos = pos.add(offset);
        } else { // position to the left
            L.DomUtil.addClass(container, 'leaflet-plabel-left');
            L.DomUtil.removeClass(container, 'leaflet-plabel-right');

            pos = pos.add(L.point(-offset.x - plabelWidth, offset.y));
        }

        L.DomUtil.setPosition(container, pos);
    },

    _zoomAnimation: function (opt) {
        var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

        this._setPosition(pos);
    },

    _onMoveEnd: function () {
        //if (!this._animated || this.options.direction === 'auto') {
            this._updatePosition();
        //}
    },

    _onViewReset: function (e) {
        /* if map resets hard, we must update the plabel */
        if (e && e.hard) {
            this._update();
        }
    },

    _initInteraction: function () {
        if (!this.options.clickable) { return; }

        var container = this._container,
            events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

        L.DomUtil.addClass(container, 'leaflet-clickable');
        L.DomEvent.on(container, 'click', this._onMouseClick, this);

        for (var i = 0; i < events.length; i++) {
            L.DomEvent.on(container, events[i], this._fireMouseEvent, this);
        }
    },

    _removeInteraction: function () {
        if (!this.options.clickable) { return; }

        var container = this._container,
            events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

        L.DomUtil.removeClass(container, 'leaflet-clickable');
        L.DomEvent.off(container, 'click', this._onMouseClick, this);

        for (var i = 0; i < events.length; i++) {
            L.DomEvent.off(container, events[i], this._fireMouseEvent, this);
        }
    },

    _onMouseClick: function (e) {
        if (this.hasEventListeners(e.type)) {
            L.DomEvent.stopPropagation(e);
        }

        this.fire(e.type, {
            originalEvent: e
        });
    },

    _fireMouseEvent: function (e) {
        this.fire(e.type, {
            originalEvent: e
        });

        // TODO proper custom event propagation
        // this line will always be called if marker is in a FeatureGroup
        if (e.type === 'contextmenu' && this.hasEventListeners(e.type)) {
            L.DomEvent.preventDefault(e);
        }
        if (e.type !== 'mousedown') {
            L.DomEvent.stopPropagation(e);
        } else {
            L.DomEvent.preventDefault(e);
        }
    }
});


// This object is a mixin for L.Marker and L.CircleMarker. We declare it here as both need to include the contents.
L.BasePMarkerMethods = {
    showPlabel: function () {
        if (this.plabel && this._map) {
            this.plabel.setLatLng(this._latlng);
            if(!this.plabel._isOpen){
                this._map.showPlabel(this.plabel);
            }            
        }

        return this;
    },

    hidePlabel: function () {

        if (this.plabel) {
            this.plabel.close();
        }
        return this;
    },

    setPlabelNoHide: function (noHide) {
        if (this._plabelNoHide === noHide) {
            return;
        }

        this._plabelNoHide = noHide;
        this.options.noHide = noHide;

        if (noHide) {
            this._removePlabelRevealHandlers();
            this.showPlabel();
        } else {
            this._addPlabelRevealHandlers();
            this.hidePlabel();
        }
    },

    bindPlabel: function (content, options) {
        if(this.plabel){
            return false;
        }
        var plabelAnchor = this.options.icon ? this.options.icon.options.plabelAnchor : this.options.plabelAnchor,
            anchor = L.point(plabelAnchor) || L.point(0, 0);

        anchor = anchor.add(L.Plabel.prototype.options.offset);

        if (options && options.offset) {
            anchor = anchor.add(options.offset);
        }

        options = L.Util.extend({offset: anchor}, options);

        this._plabelNoHide = options.noHide;

        if (!this.plabel) {
            if (!this._plabelNoHide) {
                this._addPlabelRevealHandlers();
            }

            this
                .on('remove', this.hidePlabel, this)
                .on('move', this._movePlabel, this)
                .on('add', this._onPMarkerAdd, this);

            this._hasPlabelHandlers = true;
        }

        this.plabel = new L.Plabel(options, this)
            .setContent(content);

        return this;
    },

    unbindPlabel: function () {
        if (this.plabel) {
            this.hidePlabel();

            this.plabel = null;

            if (this._hasPlabelHandlers) {
                if (!this._plabelNoHide) {
                    this._removePlabelRevealHandlers();
                }

                this
                    .off('remove', this.hidePlabel, this)
                    .off('move', this._movePlabel, this)
                    .off('add', this._onPMarkerAdd, this);
            }

            this._hasPlabelHandlers = false;
        }
        return this;
    },

    updatePlabelContent: function (content) {
        if (this.plabel) {
            this.plabel.setContent(content);
        }
    },

    getPlabel: function () {
        return this.plabel;
    },

    _onPMarkerAdd: function () {
        if (this._plabelNoHide) {
            this.showPlabel();
        }
    },

    _addPlabelRevealHandlers: function () {
        this
            .on('mouseover', this.showPlabel, this)
            .on('mouseout', this.hidePlabel, this);

        if (L.Browser.touch) {
            this.on('click', this.showPlabel, this);
        }
    },

    _removePlabelRevealHandlers: function () {
        this
            .off('mouseover', this.showPlabel, this)
            .off('mouseout', this.hidePlabel, this);

        if (L.Browser.touch) {
            this.off('click', this.showPlabel, this);
        }
    },

    _movePlabel: function (e) {
        this.plabel.setLatLng(e.latlng);
    }
};

// Add in an option to icon that is used to set where the plabel anchor is
L.Icon.Default.mergeOptions({
    plabelAnchor: new L.Point(4, -15)
});

// Have to do this since Leaflet is loaded before this plugin and initializes
// L.Marker.options.icon therefore missing our mixin above.
// L.Marker.mergeOptions({
//     icon: new L.Icon.Default()
// });

L.Marker.include(L.BasePMarkerMethods);
L.Marker.include({
    _originalUpdatePZIndex: L.Marker.prototype._updateZIndex,

    _updateZIndex: function (offset) {
        var zIndex = this._zIndex + offset;

        this._originalUpdatePZIndex(offset);

        if (this.plabel) {
            this.plabel.updateZIndex(zIndex);
        }
    },

    _originalSetPOpacity: L.Marker.prototype.setOpacity,

    setOpacity: function (opacity, plabelHasSemiTransparency) {
        this.options.plabelHasSemiTransparency = plabelHasSemiTransparency;

        this._originalSetPOpacity(opacity);
    },

    _originalUpdatePOpacity: L.Marker.prototype._updateOpacity,

    _updateOpacity: function () {
        var absoluteOpacity = this.options.opacity === 0 ? 0 : 1;

        this._originalUpdatePOpacity();

        if (this.plabel) {
            this.plabel.setOpacity(this.options.plabelHasSemiTransparency ? this.options.opacity : absoluteOpacity);
        }
    },

    _originalPSetLatLng: L.Marker.prototype.setLatLng,

    setLatLng: function (latlng) {        
        if (this.plabel) {
            this.plabel.setLatLng(latlng)
        }                
        return this._originalPSetLatLng(latlng);
    }
});

// Add in an option to icon that is used to set where the plabel anchor is
L.CircleMarker.mergeOptions({
    plabelAnchor: new L.Point(1, 1)
});


L.CircleMarker.include(L.BasePMarkerMethods);


L.Path.include({
    showPlabel: function () {
        if (this.plabel && this._map) {
            this.plabel.setLatLng(this._latlngs[0]);
            this._map.showPlabel(this.plabel);
        }
        return this;
    },

    hidePlabel: function () {        
        if (this.plabel) {
            this.plabel.close();
        }
        return this;
    },
    bindPlabel: function (content, options) {
        if (!this.plabel || this.plabel.options !== options) {
            this.plabel = new L.Plabel(options, this);
        }

        this.plabel.setContent(content);

        //if (!this._showPlabelAdded) {
            // this
            //     .on('mouseover', this._showPlabel, this)
            //     .on('mousemove', this._movePlabel, this)
            //     .on('mouseout remove', this._hidePlabel, this);
            this.on('remove', this._hidePlabel, this);

            if (L.Browser.touch) {
                this.on('click', this._showPlabel, this);
            }
            this._showPlabelAdded = true;
        //}


        return this;
    },

    unbindPlabel: function () {
        if (this.plabel) {
            this._hidePlabel();
            this.plabel = null;
            //this._showPlabelAdded = false;
            // this
            //     .off('mouseover', this._showPlabel, this)
            //     .off('mousemove', this._movePlabel, this)
            //     .off('mouseout remove', this._hidePlabel, this);
            this.off('remove', this._hidePlabel, this);
        }
        return this;
    },

    updatePlabelContent: function (content) {
        if (this.plabel) {
            this.plabel.setContent(content);
        }
    },

    _showPlabel: function (e) {
        this.plabel.setLatLng(e.latlng);
        //this.plabel.setLatLng(this.latlngs[0])
        this._map.showPlabel(this.plabel);
    },

    _movePlabel: function (e) {
        this.plabel.setLatLng(e.latlng);
    },

    _hidePlabel: function () {
        this.plabel.close();
    }
});



L.Polyline.include({
    showPlabel: function () {
        if (this.plabel && this._map) {
            var pCenter = this._latlngs[parseInt(this._latlngs.length/2)];
            if(this._latlngs.length == 2){
                pCenter = [(this._latlngs[0].lat+this._latlngs[1].lat)/2,(this._latlngs[0].lng+this._latlngs[1].lng)/2]
            }
            this.plabel.setLatLng(pCenter);
            this._map.showPlabel(this.plabel);
        }
        return this;
    }
});


L.Polygon.include({
    showPlabel: function () {
        if (this.plabel && this._map) {

            this.plabel.setLatLng(this.getBounds().getCenter());
            this._map.showPlabel(this.plabel);
        }
        return this;
    }

    
});


L.Circle.include({
    showPlabel: function () {
        if (this.plabel && this._map) {
            this.plabel.setLatLng(this._latlng);
            this._map.showPlabel(this.plabel);
        }
        return this;
    }
});




L.Map.include({
    showPlabel: function (plabel) {
        return this.addLayer(plabel);
    }
});

L.FeatureGroup.include({
    // TODO: remove this when AOP is supported in Leaflet, need this as we cannot put code in removeLayer()
    clearLayers: function () {
        this.unbindPlabel();
        this.eachLayer(this.removeLayer, this);
        return this;
    },

    bindPlabel: function (content, options) {
        return this.invoke('bindPlabel', content, options);
    },

    unbindPlabel: function () {
        return this.invoke('unbindPlabel');
    },

    updatePlabelContent: function (content) {
        this.invoke('updatePlabelContent', content);
    }
});

}(window, document));
L.AnimatedMarker = L.Marker.extend({
  options: {
    // meters
    distance: 200,
    // ms
    interval: 800,
    //速度倍数
    speedMultiple:0.001,
    // animate on add?
    autoStart: true,
    // callback onend
    onEnd: function(){},
    clickable: false
  },

  initialize: function (latlngs, options) {
    this.setLine(latlngs);
    L.Marker.prototype.initialize.call(this, latlngs[0], options);

  },

  // Breaks the line up into tiny chunks (see options) ONLY if CSS3 animations
  // are not supported.
  _chunk: function(latlngs) {
    var i,
        len = latlngs.length,
        chunkedLatLngs = [];

    for (i=1;i<len;i++) { 
      var cur = latlngs[i-1],
          next = latlngs[i],
          dist = cur.distanceTo(next),
          factor = this.options.distance / dist,
          dLat = factor * (next.lat - cur.lat),
          dLng = factor * (next.lng - cur.lng);

      if (dist > this.options.distance) {
        while (dist > this.options.distance) {
          cur = new L.LatLng(cur.lat + dLat, cur.lng + dLng);
          dist = cur.distanceTo(next);
          chunkedLatLngs.push(cur);
        }
      } else {
        chunkedLatLngs.push(cur);
      }
    }
    chunkedLatLngs.push(latlngs[len-1]);

    return chunkedLatLngs;
  },

  onAdd: function (map) {
    L.Marker.prototype.onAdd.call(this, map);

    // Start animating when added to the map
    if (this.options.autoStart) {
      this.start();
    }
  },

  animate: function() {
    var self = this,
        len = this._latlngs.length,
        speed = this.options.speedMultiple;
    var guid = this.guid;
    $.each(map23DData.timeLineData,function(i,t){
      if((guid === i) && (t._i > 0)){
        self._i = t._i;
        t._i = -11;
      }
    });
    // Normalize the transition speed from vertex to vertex
    if (this._i < len && this._i > 0) {
      var maxlength = $("#"+guid+" .Main").width();
      var curlength = Math.round((self._i/(len-1))*maxlength);
      $("#"+guid+" .scroll_Thumb").css("left", curlength -32+ "px");
      $("#"+guid+" .scroll_Track").css("width", curlength + "px");
      $("#"+guid+" .scrollBarTxt").html(self._i + "/" + len);
      var turnrorate = L.Util.getAngleByLatLng(this._latlngs[this._i-1].lng,this._latlngs[this._i-1].lat,this._latlngs[this._i].lng,this._latlngs[this._i].lat);
          turnrorate = turnrorate;
      var markerData = map23DData.markers[guid];
      var marker = map2DViewer.markers[guid];
      if(!!markerData){
        var icon_html='<img width="'+markerData.geojson.properties.iconSize[0]+'" height="'+markerData.geojson.properties.iconSize[1]+'" src="'+markerData.geojson.properties.iconUrl+'" style=" -webkit-transform: rotate('+turnrorate+'deg); -moz-transform:rotate('+turnrorate+'deg);-ms-transform:rotate('+turnrorate+'deg);" />';
        var setDivIcon = L.divIcon({
            className:'rorate_div',
            html:icon_html,
            iconAnchor:markerData.geojson.properties.iconAnchor,
            iconSize:markerData.geojson.properties.iconSize,
            popupAnchor:markerData.geojson.properties.popupAnchor});
        marker.setIcon(setDivIcon);
      //var curTime = Date.parse(map23DData.markers[guid].geojson.properties.markerTime[this._i-1]);
      //var curPreTime = Date.parse(map23DData.markers[guid].geojson.properties.markerTime[this._i]);
      var curTime = map23DData.markers[guid].geojson.properties.markerTime[this._i-1];
      var curPreTime = map23DData.markers[guid].geojson.properties.markerTime[this._i];
      if(this._i === 1){
        speed = 1;
      }else{
        speed = (curPreTime - curTime)/this.options.speedMultiple;
      }
      }
      
    }else if(this._i == len){
      
    }

    // Only if CSS3 transitions are supported
    if (L.DomUtil.TRANSITION) {
      if (this._icon) { this._icon.style[L.DomUtil.TRANSITION] = ('all ' + speed + 'ms linear'); }
      if (this._shadow) { this._shadow.style[L.DomUtil.TRANSITION] = 'all ' + speed + 'ms linear'; }
    }

    // Move to the next vertex
    this.setLatLng(this._latlngs[this._i]);
    this._i++;

    // Queue up the animation to the next next vertex
    this._tid = setTimeout(function(){
      if (self._i === len) {
        $.each(map2DViewer.routeBackGroup,function(i,t){
          if(map2DViewer.routeBackGroup[i].marker === guid){
            map2DViewer.routeBackGroup[i].isEnd = true;
            PubSub.publishSync('payBackEnd',i);
          };
        })
        self.options.onEnd.apply(self, Array.prototype.slice.call(arguments));
      } else {
        self.animate();
      }
    }, speed);
  },

  // Start the animation
  start: function() {
    this.animate();
    window.marker_Animate = true;
    $.each(map2DViewer.routeBackGroup,function(i,t){
        map2DViewer.routeBackGroup[i].marker === this.guid;
        map2DViewer.routeBackGroup[i].isEnd = false;
    })
  }, 
  restart:function(){
    this.stop();
    this['_i'] = 0;
    this.start();
  },
  // Stop the animation in place
  stop: function() {
    if (this._tid) {
      clearTimeout(this._tid);
      window.marker_Animate = false;
      //this.animate();
    }
  },
  
  setLine: function(latlngs){
    if (L.DomUtil.TRANSITION) {
      // No need to to check up the line if we can animate using CSS3
      this._latlngs = latlngs;
    } else {
      // Chunk up the lines into options.distance bits
      this._latlngs = this._chunk(latlngs);
      this.options.distance = 10;
      this.options.interval = 3;
    }
    this._i = 0;
  }

});

L.animatedMarker = function (latlngs, options) {
  return new L.AnimatedMarker(latlngs, options);
};

/*
 Leaflet.markercluster, Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 https://github.com/Leaflet/Leaflet.markercluster
 (c) 2012-2013, Dave Leaver, smartrak
*/
(function (window, document, undefined) {/*
 * L.MarkerClusterGroup extends L.FeatureGroup by clustering the markers contained within
 */

L.MarkerClusterGroup = L.FeatureGroup.extend({

	options: {
		maxClusterRadius: 120, //A cluster will cover at most this many pixels from its center
		iconCreateFunction: null,

		spiderfyOnMaxZoom: false,
		showCoverageOnHover: false,
		zoomToBoundsOnClick: true,
		singleMarkerMode: false,

		disableClusteringAtZoom: null,

		// Setting this to false prevents the removal of any clusters outside of the viewpoint, which
		// is the default behaviour for performance reasons.
		removeOutsideVisibleBounds: true,

		// Set to false to disable all animations (zoom and spiderfy).
		// If false, option animateAddingMarkers below has no effect.
		// If L.DomUtil.TRANSITION is falsy, this option has no effect.
		animate: true,

		//Whether to animate adding markers after adding the MarkerClusterGroup to the map
		// If you are adding individual markers set to true, if adding bulk markers leave false for massive performance gains.
		animateAddingMarkers: false,

		//Increase to increase the distance away that spiderfied markers appear from the center
		spiderfyDistanceMultiplier: 1,

		// Make it possible to specify a polyline options on a spider leg
		spiderLegPolylineOptions: { weight: 1, color: '#222', opacity: 0.5 },

		// When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call, others will be loaded during setTimeouts
		chunkedLoading: false,
		chunkInterval: 200, // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
		chunkDelay: 50, // at the end of each interval, give n milliseconds back to system/browser
		chunkProgress: null, // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)

		//Options to pass to the L.Polygon constructor
		polygonOptions: {weight: 1, opacity: 0.5}
	},

	initialize: function (options) {
		L.Util.setOptions(this, options);
		if (!this.options.iconCreateFunction) {
			this.options.iconCreateFunction = this._defaultIconCreateFunction;
		}

		this._featureGroup = L.featureGroup();
		this._featureGroup.addEventParent(this);

		this._nonPointGroup = L.featureGroup();
		this._nonPointGroup.addEventParent(this);

		this._inZoomAnimation = 0;
		this._needsClustering = [];
		this._needsRemoving = []; //Markers removed while we aren't on the map need to be kept track of
		//The bounds of the currently shown area (from _getExpandedVisibleBounds) Updated on zoom/move
		this._currentShownBounds = null;

		this._queue = [];

		// Hook the appropriate animation methods.
		var animate = L.DomUtil.TRANSITION && this.options.animate;
		L.extend(this, animate ? this._withAnimation : this._noAnimation);
		// Remember which MarkerCluster class to instantiate (animated or not).
		this._markerCluster = animate ? L.MarkerCluster : L.MarkerClusterNonAnimated;
	},

	addLayer: function (layer) {

		if (layer instanceof L.LayerGroup) {
			return this.addLayers([layer]);
		}

		//Don't cluster non point data
		if (!layer.getLatLng) {
			this._nonPointGroup.addLayer(layer);
			return this;
		}

		if (!this._map) {
			this._needsClustering.push(layer);
			return this;
		}

		if (this.hasLayer(layer)) {
			return this;
		}


		//If we have already clustered we'll need to add this one to a cluster

		if (this._unspiderfy) {
			this._unspiderfy();
		}

		this._addLayer(layer, this._maxZoom);

		// Refresh bounds and weighted positions.
		this._topClusterLevel._recalculateBounds();

		this._refreshClustersIcons();

		//Work out what is visible
		var visibleLayer = layer,
		    currentZoom = this._zoom;
		if (layer.__parent) {
			while (visibleLayer.__parent._zoom >= currentZoom) {
				visibleLayer = visibleLayer.__parent;
			}
		}

		if (this._currentShownBounds.contains(visibleLayer.getLatLng())) {
			if (this.options.animateAddingMarkers) {
				this._animationAddLayer(layer, visibleLayer);
			} else {
				this._animationAddLayerNonAnimated(layer, visibleLayer);
			}
		}
		return this;
	},

	removeLayer: function (layer) {

		if (layer instanceof L.LayerGroup) {
			return this.removeLayers([layer]);
		}

		//Non point layers
		if (!layer.getLatLng) {
			this._nonPointGroup.removeLayer(layer);
			return this;
		}

		if (!this._map) {
			if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) {
				this._needsRemoving.push(layer);
			}
			return this;
		}

		if (!layer.__parent) {
			return this;
		}

		if (this._unspiderfy) {
			this._unspiderfy();
			this._unspiderfyLayer(layer);
		}

		//Remove the marker from clusters
		this._removeLayer(layer, true);

		// Refresh bounds and weighted positions.
		this._topClusterLevel._recalculateBounds();

		this._refreshClustersIcons();

		layer.off('move', this._childMarkerMoved, this);

		if (this._featureGroup.hasLayer(layer)) {
			this._featureGroup.removeLayer(layer);
			if (layer.clusterShow) {
				layer.clusterShow();
			}
		}

		return this;
	},

	//Takes an array of markers and adds them in bulk
	addLayers: function (layersArray) {
		if (!L.Util.isArray(layersArray)) {
			return this.addLayer(layersArray);
		}

		var fg = this._featureGroup,
		    npg = this._nonPointGroup,
		    chunked = this.options.chunkedLoading,
		    chunkInterval = this.options.chunkInterval,
		    chunkProgress = this.options.chunkProgress,
		    l = layersArray.length,
		    offset = 0,
		    originalArray = true,
		    m;

		if (this._map) {
			var started = (new Date()).getTime();
			var process = L.bind(function () {
				var start = (new Date()).getTime();
				for (; offset < l; offset++) {
					if (chunked && offset % 200 === 0) {
						// every couple hundred markers, instrument the time elapsed since processing started:
						var elapsed = (new Date()).getTime() - start;
						if (elapsed > chunkInterval) {
							break; // been working too hard, time to take a break :-)
						}
					}

					m = layersArray[offset];

					// Group of layers, append children to layersArray and skip.
					// Side effects:
					// - Total increases, so chunkProgress ratio jumps backward.
					// - Groups are not included in this group, only their non-group child layers (hasLayer).
					// Changing array length while looping does not affect performance in current browsers:
					// http://jsperf.com/for-loop-changing-length/6
					if (m instanceof L.LayerGroup) {
						if (originalArray) {
							layersArray = layersArray.slice();
							originalArray = false;
						}
						this._extractNonGroupLayers(m, layersArray);
						l = layersArray.length;
						continue;
					}

					//Not point data, can't be clustered
					if (!m.getLatLng) {
						npg.addLayer(m);
						continue;
					}

					if (this.hasLayer(m)) {
						continue;
					}

					this._addLayer(m, this._maxZoom);

					//If we just made a cluster of size 2 then we need to remove the other marker from the map (if it is) or we never will
					if (m.__parent) {
						if (m.__parent.getChildCount() === 2) {
							var markers = m.__parent.getAllChildMarkers(),
							    otherMarker = markers[0] === m ? markers[1] : markers[0];
							fg.removeLayer(otherMarker);
						}
					}
				}

				if (chunkProgress) {
					// report progress and time elapsed:
					chunkProgress(offset, l, (new Date()).getTime() - started);
				}

				// Completed processing all markers.
				if (offset === l) {

					// Refresh bounds and weighted positions.
					this._topClusterLevel._recalculateBounds();

					this._refreshClustersIcons();

					this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);
				} else {
					setTimeout(process, this.options.chunkDelay);
				}
			}, this);

			process();
		} else {
			var needsClustering = this._needsClustering;

			for (; offset < l; offset++) {
				m = layersArray[offset];

				// Group of layers, append children to layersArray and skip.
				if (m instanceof L.LayerGroup) {
					if (originalArray) {
						layersArray = layersArray.slice();
						originalArray = false;
					}
					this._extractNonGroupLayers(m, layersArray);
					l = layersArray.length;
					continue;
				}

				//Not point data, can't be clustered
				if (!m.getLatLng) {
					npg.addLayer(m);
					continue;
				}

				if (this.hasLayer(m)) {
					continue;
				}

				needsClustering.push(m);
			}
		}
		return this;
	},

	//Takes an array of markers and removes them in bulk
	removeLayers: function (layersArray) {
		var i, m,
		    l = layersArray.length,
		    fg = this._featureGroup,
		    npg = this._nonPointGroup,
		    originalArray = true;

		if (!this._map) {
			for (i = 0; i < l; i++) {
				m = layersArray[i];

				// Group of layers, append children to layersArray and skip.
				if (m instanceof L.LayerGroup) {
					if (originalArray) {
						layersArray = layersArray.slice();
						originalArray = false;
					}
					this._extractNonGroupLayers(m, layersArray);
					l = layersArray.length;
					continue;
				}

				this._arraySplice(this._needsClustering, m);
				npg.removeLayer(m);
				if (this.hasLayer(m)) {
					this._needsRemoving.push(m);
				}
			}
			return this;
		}

		if (this._unspiderfy) {
			this._unspiderfy();

			// Work on a copy of the array, so that next loop is not affected.
			var layersArray2 = layersArray.slice(),
			    l2 = l;
			for (i = 0; i < l2; i++) {
				m = layersArray2[i];

				// Group of layers, append children to layersArray and skip.
				if (m instanceof L.LayerGroup) {
					this._extractNonGroupLayers(m, layersArray2);
					l2 = layersArray2.length;
					continue;
				}

				this._unspiderfyLayer(m);
			}
		}

		for (i = 0; i < l; i++) {
			m = layersArray[i];

			// Group of layers, append children to layersArray and skip.
			if (m instanceof L.LayerGroup) {
				if (originalArray) {
					layersArray = layersArray.slice();
					originalArray = false;
				}
				this._extractNonGroupLayers(m, layersArray);
				l = layersArray.length;
				continue;
			}

			if (!m.__parent) {
				npg.removeLayer(m);
				continue;
			}

			this._removeLayer(m, true, true);

			if (fg.hasLayer(m)) {
				fg.removeLayer(m);
				if (m.clusterShow) {
					m.clusterShow();
				}
			}
		}

		// Refresh bounds and weighted positions.
		this._topClusterLevel._recalculateBounds();

		this._refreshClustersIcons();

		//Fix up the clusters and markers on the map
		this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds);

		return this;
	},

	//Removes all layers from the MarkerClusterGroup
	clearLayers: function () {
		//Need our own special implementation as the LayerGroup one doesn't work for us

		//If we aren't on the map (yet), blow away the markers we know of
		if (!this._map) {
			this._needsClustering = [];
			delete this._gridClusters;
			delete this._gridUnclustered;
		}

		if (this._noanimationUnspiderfy) {
			this._noanimationUnspiderfy();
		}

		//Remove all the visible layers
		this._featureGroup.clearLayers();
		this._nonPointGroup.clearLayers();

		this.eachLayer(function (marker) {
			marker.off('move', this._childMarkerMoved, this);
			delete marker.__parent;
		});

		if (this._map) {
			//Reset _topClusterLevel and the DistanceGrids
			this._generateInitialClusters();
		}

		return this;
	},

	//Override FeatureGroup.getBounds as it doesn't work
	getBounds: function () {
		var bounds = new L.LatLngBounds();

		if (this._topClusterLevel) {
			bounds.extend(this._topClusterLevel._bounds);
		}

		for (var i = this._needsClustering.length - 1; i >= 0; i--) {
			bounds.extend(this._needsClustering[i].getLatLng());
		}

		bounds.extend(this._nonPointGroup.getBounds());

		return bounds;
	},

	//Overrides LayerGroup.eachLayer
	eachLayer: function (method, context) {
		var markers = this._needsClustering.slice(),
			needsRemoving = this._needsRemoving,
			i;

		if (this._topClusterLevel) {
			this._topClusterLevel.getAllChildMarkers(markers);
		}

		for (i = markers.length - 1; i >= 0; i--) {
			if (needsRemoving.indexOf(markers[i]) === -1) {
				method.call(context, markers[i]);
			}
		}

		this._nonPointGroup.eachLayer(method, context);
	},

	//Overrides LayerGroup.getLayers
	getLayers: function () {
		var layers = [];
		this.eachLayer(function (l) {
			layers.push(l);
		});
		return layers;
	},

	//Overrides LayerGroup.getLayer, WARNING: Really bad performance
	getLayer: function (id) {
		var result = null;
		
		id = parseInt(id, 10);

		this.eachLayer(function (l) {
			if (L.stamp(l) === id) {
				result = l;
			}
		});

		return result;
	},

	//Returns true if the given layer is in this MarkerClusterGroup
	hasLayer: function (layer) {
		if (!layer) {
			return false;
		}

		var i, anArray = this._needsClustering;

		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === layer) {
				return true;
			}
		}

		anArray = this._needsRemoving;
		for (i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === layer) {
				return false;
			}
		}

		return !!(layer.__parent && layer.__parent._group === this) || this._nonPointGroup.hasLayer(layer);
	},

	//Zoom down to show the given layer (spiderfying if necessary) then calls the callback
	zoomToShowLayer: function (layer, callback) {
		
		if (typeof callback !== 'function') {
			callback = function () {};
		}

		var showMarker = function () {
			if ((layer._icon || layer.__parent._icon) && !this._inZoomAnimation) {
				this._map.off('moveend', showMarker, this);
				this.off('animationend', showMarker, this);

				if (layer._icon) {
					callback();
				} else if (layer.__parent._icon) {
					this.once('spiderfied', callback, this);
					layer.__parent.spiderfy();
				}
			}
		};

		if (layer._icon && this._map.getBounds().contains(layer.getLatLng())) {
			//Layer is visible ond on screen, immediate return
			callback();
		} else if (layer.__parent._zoom < Math.round(this._map._zoom)) {
			//Layer should be visible at this zoom level. It must not be on screen so just pan over to it
			this._map.on('moveend', showMarker, this);
			this._map.panTo(layer.getLatLng());
		} else {
			var moveStart = function () {
				this._map.off('movestart', moveStart, this);
				moveStart = null;
			};

			this._map.on('movestart', moveStart, this);
			this._map.on('moveend', showMarker, this);
			this.on('animationend', showMarker, this);
			layer.__parent.zoomToBounds();

			if (moveStart) {
				//Never started moving, must already be there, probably need clustering however
				showMarker.call(this);
			}
		}
	},

	//Overrides FeatureGroup.onAdd
	onAdd: function (map) {
		this._map = map;
		var i, l, layer;

		if (!isFinite(this._map.getMaxZoom())) {
			throw "Map has no maxZoom specified";
		}

		this._featureGroup.addTo(map);
		this._nonPointGroup.addTo(map);

		if (!this._gridClusters) {
			this._generateInitialClusters();
		}

		this._maxLat = map.options.crs.projection.MAX_LATITUDE;

		for (i = 0, l = this._needsRemoving.length; i < l; i++) {
			layer = this._needsRemoving[i];
			this._removeLayer(layer, true);
		}
		this._needsRemoving = [];

		//Remember the current zoom level and bounds
		this._zoom = Math.round(this._map._zoom);
		this._currentShownBounds = this._getExpandedVisibleBounds();

		this._map.on('zoomend', this._zoomEnd, this);
		this._map.on('moveend', this._moveEnd, this);

		if (this._spiderfierOnAdd) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
			this._spiderfierOnAdd();
		}

		this._bindEvents();

		//Actually add our markers to the map:
		l = this._needsClustering;
		this._needsClustering = [];
		this.addLayers(l);
	},

	//Overrides FeatureGroup.onRemove
	onRemove: function (map) {
		map.off('zoomend', this._zoomEnd, this);
		map.off('moveend', this._moveEnd, this);

		this._unbindEvents();

		//In case we are in a cluster animation
		this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');

		if (this._spiderfierOnRemove) { //TODO FIXME: Not sure how to have spiderfier add something on here nicely
			this._spiderfierOnRemove();
		}

		delete this._maxLat;

		//Clean up all the layers we added to the map
		this._hideCoverage();
		this._featureGroup.remove();
		this._nonPointGroup.remove();

		this._featureGroup.clearLayers();

		this._map = null;
	},

	getVisibleParent: function (marker) {
		var vMarker = marker;
		while (vMarker && !vMarker._icon) {
			vMarker = vMarker.__parent;
		}
		return vMarker || null;
	},

	//Remove the given object from the given array
	_arraySplice: function (anArray, obj) {
		for (var i = anArray.length - 1; i >= 0; i--) {
			if (anArray[i] === obj) {
				anArray.splice(i, 1);
				return true;
			}
		}
	},

	/**
	 * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
	 * @param marker to be removed from _gridUnclustered.
	 * @param z integer bottom start zoom level (included)
	 * @private
	 */
	_removeFromGridUnclustered: function (marker, z) {
		var map             = this._map,
		    gridUnclustered = this._gridUnclustered;

		for (; z >= 0; z--) {
			if (!gridUnclustered[z].removeObject(marker, map.project(marker.getLatLng(), z))) {
				break;
			}
		}
	},

	_childMarkerMoved: function (e) {
		if (!this._ignoreMove) {
			e.target._latlng = e.oldLatLng;
			this.removeLayer(e.target);

			e.target._latlng = e.latlng;
			this.addLayer(e.target);
		}
	},

	//Internal function for removing a marker from everything.
	//dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
	_removeLayer: function (marker, removeFromDistanceGrid, dontUpdateMap) {
		var gridClusters = this._gridClusters,
			gridUnclustered = this._gridUnclustered,
			fg = this._featureGroup,
			map = this._map;

		//Remove the marker from distance clusters it might be in
		if (removeFromDistanceGrid) {
			this._removeFromGridUnclustered(marker, this._maxZoom);
		}

		//Work our way up the clusters removing them as we go if required
		var cluster = marker.__parent,
			markers = cluster._markers,
			otherMarker;

		//Remove the marker from the immediate parents marker list
		this._arraySplice(markers, marker);

		while (cluster) {
			cluster._childCount--;
			cluster._boundsNeedUpdate = true;

			if (cluster._zoom < 0) {
				//Top level, do nothing
				break;
			} else if (removeFromDistanceGrid && cluster._childCount <= 1) { //Cluster no longer required
				//We need to push the other marker up to the parent
				otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0];

				//Update distance grid
				gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cLatLng, cluster._zoom));
				gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getLatLng(), cluster._zoom));

				//Move otherMarker up to parent
				this._arraySplice(cluster.__parent._childClusters, cluster);
				cluster.__parent._markers.push(otherMarker);
				otherMarker.__parent = cluster.__parent;

				if (cluster._icon) {
					//Cluster is currently on the map, need to put the marker on the map instead
					fg.removeLayer(cluster);
					if (!dontUpdateMap) {
						fg.addLayer(otherMarker);
					}
				}
			} else {
				cluster._iconNeedsUpdate = true;
			}

			cluster = cluster.__parent;
		}

		delete marker.__parent;
	},

	_isOrIsParent: function (el, oel) {
		while (oel) {
			if (el === oel) {
				return true;
			}
			oel = oel.parentNode;
		}
		return false;
	},

	//Override L.Evented.fire
	fire: function (type, data, propagate) {
		if (data && data.layer instanceof L.MarkerCluster) {
			//Prevent multiple clustermouseover/off events if the icon is made up of stacked divs (Doesn't work in ie <= 8, no relatedTarget)
			if (data.originalEvent && this._isOrIsParent(data.layer._icon, data.originalEvent.relatedTarget)) {
				return;
			}
			type = 'cluster' + type;
		}

		L.FeatureGroup.prototype.fire.call(this, type, data, propagate);
	},

	//Override L.Evented.listens
	listens: function (type, propagate) {
		return L.FeatureGroup.prototype.listens.call(this, type, propagate) || L.FeatureGroup.prototype.listens.call(this, 'cluster' + type, propagate);
	},

	//Default functionality
	_defaultIconCreateFunction: function (cluster) {
		var childCount = cluster.getChildCount();

		var c = ' marker-cluster-';
		if (childCount < 10) {
			c += 'small';
		} else if (childCount < 100) {
			c += 'medium';
		} else {
			c += 'large';
		}

		return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
	},

	_bindEvents: function () {
		var map = this._map,
		    spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
		    showCoverageOnHover = this.options.showCoverageOnHover,
		    zoomToBoundsOnClick = this.options.zoomToBoundsOnClick;

		//Zoom on cluster click or spiderfy if we are at the lowest level
		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.on('clusterclick', this._zoomOrSpiderfy, this);
		}

		//Show convex hull (boundary) polygon on mouse over
		if (showCoverageOnHover) {
			this.on('clustermouseover', this._showCoverage, this);
			this.on('clustermouseout', this._hideCoverage, this);
			map.on('zoomend', this._hideCoverage, this);
		}
	},

	_zoomOrSpiderfy: function (e) {
		var cluster = e.layer,
		    bottomCluster = cluster;

		while (bottomCluster._childClusters.length === 1) {
			bottomCluster = bottomCluster._childClusters[0];
		}

		if (bottomCluster._zoom === this._maxZoom &&
			bottomCluster._childCount === cluster._childCount &&
			this.options.spiderfyOnMaxZoom) {

			// All child markers are contained in a single cluster from this._maxZoom to this cluster.
			cluster.spiderfy();
		} else if (this.options.zoomToBoundsOnClick) {
			cluster.zoomToBounds();
		}

		// Focus the map again for keyboard users.
		if (e.originalEvent && e.originalEvent.keyCode === 13) {
			this._map._container.focus();
		}
	},

	_showCoverage: function (e) {
		var map = this._map;
		if (this._inZoomAnimation) {
			return;
		}
		if (this._shownPolygon) {
			map.removeLayer(this._shownPolygon);
		}
		if (e.layer.getChildCount() > 2 && e.layer !== this._spiderfied) {
			this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions);
			map.addLayer(this._shownPolygon);
		}
	},

	_hideCoverage: function () {
		if (this._shownPolygon) {
			this._map.removeLayer(this._shownPolygon);
			this._shownPolygon = null;
		}
	},

	_unbindEvents: function () {
		var spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
			showCoverageOnHover = this.options.showCoverageOnHover,
			zoomToBoundsOnClick = this.options.zoomToBoundsOnClick,
			map = this._map;

		if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
			this.off('clusterclick', this._zoomOrSpiderfy, this);
		}
		if (showCoverageOnHover) {
			this.off('clustermouseover', this._showCoverage, this);
			this.off('clustermouseout', this._hideCoverage, this);
			map.off('zoomend', this._hideCoverage, this);
		}
	},

	_zoomEnd: function () {
		if (!this._map) { //May have been removed from the map by a zoomEnd handler
			return;
		}
		this._mergeSplitClusters();

		this._zoom = Math.round(this._map._zoom);
		this._currentShownBounds = this._getExpandedVisibleBounds();
	},

	_moveEnd: function () {
		if (this._inZoomAnimation) {
			return;
		}

		var newBounds = this._getExpandedVisibleBounds();

		this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, newBounds);
		this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), newBounds);

		this._currentShownBounds = newBounds;
		return;
	},

	_generateInitialClusters: function () {
		var maxZoom = this._map.getMaxZoom(),
			radius = this.options.maxClusterRadius,
			radiusFn = radius;
	
		//If we just set maxClusterRadius to a single number, we need to create
		//a simple function to return that number. Otherwise, we just have to
		//use the function we've passed in.
		if (typeof radius !== "function") {
			radiusFn = function () { return radius; };
		}

		if (this.options.disableClusteringAtZoom) {
			maxZoom = this.options.disableClusteringAtZoom - 1;
		}
		this._maxZoom = maxZoom;
		this._gridClusters = {};
		this._gridUnclustered = {};
	
		//Set up DistanceGrids for each zoom
		for (var zoom = maxZoom; zoom >= 0; zoom--) {
			this._gridClusters[zoom] = new L.DistanceGrid(radiusFn(zoom));
			this._gridUnclustered[zoom] = new L.DistanceGrid(radiusFn(zoom));
		}

		// Instantiate the appropriate L.MarkerCluster class (animated or not).
		this._topClusterLevel = new this._markerCluster(this, -1);
	},

	//Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
	_addLayer: function (layer, zoom) {
		var gridClusters = this._gridClusters,
		    gridUnclustered = this._gridUnclustered,
		    markerPoint, z;

		if (this.options.singleMarkerMode) {
			this._overrideMarkerIcon(layer);
		}

		layer.on('move', this._childMarkerMoved, this);

		//Find the lowest zoom level to slot this one in
		for (; zoom >= 0; zoom--) {
			markerPoint = this._map.project(layer.getLatLng(), zoom); // calculate pixel position

			//Try find a cluster close by
			var closest = gridClusters[zoom].getNearObject(markerPoint);
			if (closest) {
				closest._addChild(layer);
				layer.__parent = closest;
				return;
			}

			//Try find a marker close by to form a new cluster with
			closest = gridUnclustered[zoom].getNearObject(markerPoint);
			if (closest) {
				var parent = closest.__parent;
				if (parent) {
					this._removeLayer(closest, false);
				}

				//Create new cluster with these 2 in it

				var newCluster = new this._markerCluster(this, zoom, closest, layer);
				gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cLatLng, zoom));
				closest.__parent = newCluster;
				layer.__parent = newCluster;

				//First create any new intermediate parent clusters that don't exist
				var lastParent = newCluster;
				for (z = zoom - 1; z > parent._zoom; z--) {
					lastParent = new this._markerCluster(this, z, lastParent);
					gridClusters[z].addObject(lastParent, this._map.project(closest.getLatLng(), z));
				}
				parent._addChild(lastParent);

				//Remove closest from this zoom level and any above that it is in, replace with newCluster
				this._removeFromGridUnclustered(closest, zoom);

				return;
			}

			//Didn't manage to cluster in at this zoom, record us as a marker here and continue upwards
			gridUnclustered[zoom].addObject(layer, markerPoint);
		}

		//Didn't get in anything, add us to the top
		this._topClusterLevel._addChild(layer);

		layer.__parent = this._topClusterLevel;
		return;
	},

	/**
	 * Refreshes the icon of all "dirty" visible clusters.
	 * Non-visible "dirty" clusters will be updated when they are added to the map.
	 * @private
	 */
	_refreshClustersIcons: function () {
		this._featureGroup.eachLayer(function (c) {
			if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
				c._updateIcon();
			}
		});
	},

	//Enqueue code to fire after the marker expand/contract has happened
	_enqueue: function (fn) {
		this._queue.push(fn);
		if (!this._queueTimeout) {
			this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300);
		}
	},
	_processQueue: function () {
		for (var i = 0; i < this._queue.length; i++) {
			this._queue[i].call(this);
		}
		this._queue.length = 0;
		clearTimeout(this._queueTimeout);
		this._queueTimeout = null;
	},

	//Merge and split any existing clusters that are too big or small
	_mergeSplitClusters: function () {
		var mapZoom = Math.round(this._map._zoom);

		//In case we are starting to split before the animation finished
		this._processQueue();

		if (this._zoom < mapZoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) { //Zoom in, split
			this._animationStart();
			//Remove clusters now off screen
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, this._getExpandedVisibleBounds());

			this._animationZoomIn(this._zoom, mapZoom);

		} else if (this._zoom > mapZoom) { //Zoom out, merge
			this._animationStart();

			this._animationZoomOut(this._zoom, mapZoom);
		} else {
			this._moveEnd();
		}
	},

	//Gets the maps visible bounds expanded in each direction by the size of the screen (so the user cannot see an area we do not cover in one pan)
	_getExpandedVisibleBounds: function () {
		if (!this.options.removeOutsideVisibleBounds) {
			return this._mapBoundsInfinite;
		} else if (L.Browser.mobile) {
			return this._checkBoundsMaxLat(this._map.getBounds());
		}

		return this._checkBoundsMaxLat(this._map.getBounds().pad(1)); // Padding expands the bounds by its own dimensions but scaled with the given factor.
	},

	/**
	 * Expands the latitude to Infinity (or -Infinity) if the input bounds reach the map projection maximum defined latitude
	 * (in the case of Web/Spherical Mercator, it is 85.0511287798 / see https://en.wikipedia.org/wiki/Web_Mercator#Formulas).
	 * Otherwise, the removeOutsideVisibleBounds option will remove markers beyond that limit, whereas the same markers without
	 * this option (or outside MCG) will have their position floored (ceiled) by the projection and rendered at that limit,
	 * making the user think that MCG "eats" them and never displays them again.
	 * @param bounds L.LatLngBounds
	 * @returns {L.LatLngBounds}
	 * @private
	 */
	_checkBoundsMaxLat: function (bounds) {
		var maxLat = this._maxLat;

		if (maxLat !== undefined) {
			if (bounds.getNorth() >= maxLat) {
				bounds._northEast.lat = Infinity;
			}
			if (bounds.getSouth() <= -maxLat) {
				bounds._southWest.lat = -Infinity;
			}
		}

		return bounds;
	},

	//Shared animation code
	_animationAddLayerNonAnimated: function (layer, newCluster) {
		if (newCluster === layer) {
			this._featureGroup.addLayer(layer);
		} else if (newCluster._childCount === 2) {
			newCluster._addToMap();

			var markers = newCluster.getAllChildMarkers();
			this._featureGroup.removeLayer(markers[0]);
			this._featureGroup.removeLayer(markers[1]);
		} else {
			newCluster._updateIcon();
		}
	},

	/**
	 * Extracts individual (i.e. non-group) layers from a Layer Group.
	 * @param group to extract layers from.
	 * @param output {Array} in which to store the extracted layers.
	 * @returns {*|Array}
	 * @private
	 */
	_extractNonGroupLayers: function (group, output) {
		var layers = group.getLayers(),
		    i = 0,
		    layer;

		output = output || [];

		for (; i < layers.length; i++) {
			layer = layers[i];

			if (layer instanceof L.LayerGroup) {
				this._extractNonGroupLayers(layer, output);
				continue;
			}

			output.push(layer);
		}

		return output;
	},

	/**
	 * Implements the singleMarkerMode option.
	 * @param layer Marker to re-style using the Clusters iconCreateFunction.
	 * @returns {L.Icon} The newly created icon.
	 * @private
	 */
	_overrideMarkerIcon: function (layer) {
		var icon = layer.options.icon = this.options.iconCreateFunction({
			getChildCount: function () {
				return 1;
			},
			getAllChildMarkers: function () {
				return [layer];
			}
		});

		return icon;
	}
});

// Constant bounds used in case option "removeOutsideVisibleBounds" is set to false.
L.MarkerClusterGroup.include({
	_mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity))
});

L.MarkerClusterGroup.include({
	_noAnimation: {
		//Non Animated versions of everything
		_animationStart: function () {
			//Do nothing...
		},
		_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel);
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

			//We didn't actually animate, but we use this event to mean "clustering animations have finished"
			this.fire('animationend');
		},
		_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel);
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());

			//We didn't actually animate, but we use this event to mean "clustering animations have finished"
			this.fire('animationend');
		},
		_animationAddLayer: function (layer, newCluster) {
			this._animationAddLayerNonAnimated(layer, newCluster);
		}
	},

	_withAnimation: {
		//Animated versions here
		_animationStart: function () {
			this._map._mapPane.className += ' leaflet-cluster-anim';
			this._inZoomAnimation++;
		},

		_animationZoomIn: function (previousZoomLevel, newZoomLevel) {
			var bounds = this._getExpandedVisibleBounds(),
			    fg     = this._featureGroup,
			    i;

			this._ignoreMove = true;

			//Add all children of current clusters to map and remove those clusters from map
			this._topClusterLevel._recursively(bounds, previousZoomLevel, 0, function (c) {
				var startPos = c._latlng,
				    markers  = c._markers,
				    m;

				if (!bounds.contains(startPos)) {
					startPos = null;
				}

				if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) { //Immediately add the new child and remove us
					fg.removeLayer(c);
					c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds);
				} else {
					//Fade out old cluster
					c.clusterHide();
					c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds);
				}

				//Remove all markers that aren't visible any more
				//TODO: Do we actually need to do this on the higher levels too?
				for (i = markers.length - 1; i >= 0; i--) {
					m = markers[i];
					if (!bounds.contains(m._latlng)) {
						fg.removeLayer(m);
					}
				}

			});

			this._forceLayout();

			//Update opacities
			this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel);
			//TODO Maybe? Update markers in _recursivelyBecomeVisible
			fg.eachLayer(function (n) {
				if (!(n instanceof L.MarkerCluster) && n._icon) {
					n.clusterShow();
				}
			});

			//update the positions of the just added clusters/markers
			this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function (c) {
				c._recursivelyRestoreChildPositions(newZoomLevel);
			});

			this._ignoreMove = false;

			//Remove the old clusters and close the zoom animation
			this._enqueue(function () {
				//update the positions of the just added clusters/markers
				this._topClusterLevel._recursively(bounds, previousZoomLevel, 0, function (c) {
					fg.removeLayer(c);
					c.clusterShow();
				});

				this._animationEnd();
			});
		},

		_animationZoomOut: function (previousZoomLevel, newZoomLevel) {
			this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel);

			//Need to add markers for those that weren't on the map before but are now
			this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds());
			//Remove markers that were on the map before but won't be now
			this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel, this._getExpandedVisibleBounds());
		},

		_animationAddLayer: function (layer, newCluster) {
			var me = this,
			    fg = this._featureGroup;

			fg.addLayer(layer);
			if (newCluster !== layer) {
				if (newCluster._childCount > 2) { //Was already a cluster

					newCluster._updateIcon();
					this._forceLayout();
					this._animationStart();

					layer._setPos(this._map.latLngToLayerPoint(newCluster.getLatLng()));
					layer.clusterHide();

					this._enqueue(function () {
						fg.removeLayer(layer);
						layer.clusterShow();

						me._animationEnd();
					});

				} else { //Just became a cluster
					this._forceLayout();

					me._animationStart();
					me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._zoom);
				}
			}
		}
	},

	// Private methods for animated versions.
	_animationZoomOutSingle: function (cluster, previousZoomLevel, newZoomLevel) {
		var bounds = this._getExpandedVisibleBounds();

		//Animate all of the markers in the clusters to move to their cluster center point
		cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, previousZoomLevel + 1, newZoomLevel);

		var me = this;

		//Update the opacity (If we immediately set it they won't animate)
		this._forceLayout();
		cluster._recursivelyBecomeVisible(bounds, newZoomLevel);

		//TODO: Maybe use the transition timing stuff to make this more reliable
		//When the animations are done, tidy up
		this._enqueue(function () {

			//This cluster stopped being a cluster before the timeout fired
			if (cluster._childCount === 1) {
				var m = cluster._markers[0];
				//If we were in a cluster animation at the time then the opacity and position of our child could be wrong now, so fix it
				this._ignoreMove = true;
				m.setLatLng(m.getLatLng());
				this._ignoreMove = false;
				if (m.clusterShow) {
					m.clusterShow();
				}
			} else {
				cluster._recursively(bounds, newZoomLevel, 0, function (c) {
					c._recursivelyRemoveChildrenFromMap(bounds, previousZoomLevel + 1);
				});
			}
			me._animationEnd();
		});
	},

	_animationEnd: function () {
		if (this._map) {
			this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '');
		}
		this._inZoomAnimation--;
		this.fire('animationend');
	},

	//Force a browser layout of stuff in the map
	// Should apply the current opacity and location to all elements so we can update them again for an animation
	_forceLayout: function () {
		//In my testing this works, infact offsetWidth of any element seems to work.
		//Could loop all this._layers and do this for each _icon if it stops working

		L.Util.falseFn(document.body.offsetWidth);
	}
});

L.markerClusterGroup = function (options) {
	return new L.MarkerClusterGroup(options);
};


L.MarkerCluster = L.Marker.extend({
	initialize: function (group, zoom, a, b) {

		L.Marker.prototype.initialize.call(this, a ? (a._cLatLng || a.getLatLng()) : new L.LatLng(0, 0), { icon: this });


		this._group = group;
		this._zoom = zoom;

		this._markers = [];
		this._childClusters = [];
		this._childCount = 0;
		this._iconNeedsUpdate = true;
		this._boundsNeedUpdate = true;

		this._bounds = new L.LatLngBounds();

		if (a) {
			this._addChild(a);
		}
		if (b) {
			this._addChild(b);
		}
	},

	//Recursively retrieve all child markers of this cluster
	getAllChildMarkers: function (storageArray) {
		storageArray = storageArray || [];

		for (var i = this._childClusters.length - 1; i >= 0; i--) {
			this._childClusters[i].getAllChildMarkers(storageArray);
		}

		for (var j = this._markers.length - 1; j >= 0; j--) {
			storageArray.push(this._markers[j]);
		}

		return storageArray;
	},

	//Returns the count of how many child markers we have
	getChildCount: function () {
		return this._childCount;
	},

	//Zoom to the minimum of showing all of the child markers, or the extents of this cluster
	zoomToBounds: function () {
		var childClusters = this._childClusters.slice(),
			map = this._group._map,
			boundsZoom = map.getBoundsZoom(this._bounds),
			zoom = this._zoom + 1,
			mapZoom = map.getZoom(),
			i;

		//calculate how far we need to zoom down to see all of the markers
		while (childClusters.length > 0 && boundsZoom > zoom) {
			zoom++;
			var newClusters = [];
			for (i = 0; i < childClusters.length; i++) {
				newClusters = newClusters.concat(childClusters[i]._childClusters);
			}
			childClusters = newClusters;
		}

		if (boundsZoom > zoom) {
			this._group._map.setView(this._latlng, zoom);
		} else if (boundsZoom <= mapZoom) { //If fitBounds wouldn't zoom us down, zoom us down instead
			this._group._map.setView(this._latlng, mapZoom + 1);
		} else {
			this._group._map.fitBounds(this._bounds);
		}
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds();
		bounds.extend(this._bounds);
		return bounds;
	},

	_updateIcon: function () {
		this._iconNeedsUpdate = true;
		if (this._icon) {
			this.setIcon(this);
		}
	},

	//Cludge for Icon, we pretend to be an icon for performance
	createIcon: function () {
		if (this._iconNeedsUpdate) {
			this._iconObj = this._group.options.iconCreateFunction(this);
			this._iconNeedsUpdate = false;
		}
		return this._iconObj.createIcon();
	},
	createShadow: function () {
		return this._iconObj.createShadow();
	},


	_addChild: function (new1, isNotificationFromChild) {

		this._iconNeedsUpdate = true;

		this._boundsNeedUpdate = true;
		this._setClusterCenter(new1);

		if (new1 instanceof L.MarkerCluster) {
			if (!isNotificationFromChild) {
				this._childClusters.push(new1);
				new1.__parent = this;
			}
			this._childCount += new1._childCount;
		} else {
			if (!isNotificationFromChild) {
				this._markers.push(new1);
			}
			this._childCount++;
		}

		if (this.__parent) {
			this.__parent._addChild(new1, true);
		}
	},

	/**
	 * Makes sure the cluster center is set. If not, uses the child center if it is a cluster, or the marker position.
	 * @param child L.MarkerCluster|L.Marker that will be used as cluster center if not defined yet.
	 * @private
	 */
	_setClusterCenter: function (child) {
		if (!this._cLatLng) {
			// when clustering, take position of the first point as the cluster center
			this._cLatLng = child._cLatLng || child._latlng;
		}
	},

	/**
	 * Assigns impossible bounding values so that the next extend entirely determines the new bounds.
	 * This method avoids having to trash the previous L.LatLngBounds object and to create a new one, which is much slower for this class.
	 * As long as the bounds are not extended, most other methods would probably fail, as they would with bounds initialized but not extended.
	 * @private
	 */
	_resetBounds: function () {
		var bounds = this._bounds;

		if (bounds._southWest) {
			bounds._southWest.lat = Infinity;
			bounds._southWest.lng = Infinity;
		}
		if (bounds._northEast) {
			bounds._northEast.lat = -Infinity;
			bounds._northEast.lng = -Infinity;
		}
	},

	_recalculateBounds: function () {
		var markers = this._markers,
		    childClusters = this._childClusters,
		    latSum = 0,
		    lngSum = 0,
		    totalCount = this._childCount,
		    i, child, childLatLng, childCount;

		// Case where all markers are removed from the map and we are left with just an empty _topClusterLevel.
		if (totalCount === 0) {
			return;
		}

		// Reset rather than creating a new object, for performance.
		this._resetBounds();

		// Child markers.
		for (i = 0; i < markers.length; i++) {
			childLatLng = markers[i]._latlng;

			this._bounds.extend(childLatLng);

			latSum += childLatLng.lat;
			lngSum += childLatLng.lng;
		}

		// Child clusters.
		for (i = 0; i < childClusters.length; i++) {
			child = childClusters[i];

			// Re-compute child bounds and weighted position first if necessary.
			if (child._boundsNeedUpdate) {
				child._recalculateBounds();
			}

			this._bounds.extend(child._bounds);

			childLatLng = child._wLatLng;
			childCount = child._childCount;

			latSum += childLatLng.lat * childCount;
			lngSum += childLatLng.lng * childCount;
		}

		this._latlng = this._wLatLng = new L.LatLng(latSum / totalCount, lngSum / totalCount);

		// Reset dirty flag.
		this._boundsNeedUpdate = false;
	},

	//Set our markers position as given and add it to the map
	_addToMap: function (startPos) {
		if (startPos) {
			this._backupLatlng = this._latlng;
			this.setLatLng(startPos);
		}
		this._group._featureGroup.addLayer(this);
		if(this.plabel){
			if(this.plabel._isOpen){
				this.showPlabel();
			}
		}
	},

	_recursivelyAnimateChildrenIn: function (bounds, center, maxZoom) {
		this._recursively(bounds, 0, maxZoom - 1,
			function (c) {
				var markers = c._markers,
					i, m;
				for (i = markers.length - 1; i >= 0; i--) {
					m = markers[i];

					//Only do it if the icon is still on the map
					if (m._icon) {
						m._setPos(center);
						m.clusterHide();
					}
				}
			},
			function (c) {
				var childClusters = c._childClusters,
					j, cm;
				for (j = childClusters.length - 1; j >= 0; j--) {
					cm = childClusters[j];
					if (cm._icon) {
						cm._setPos(center);
						cm.clusterHide();
					}
				}
			}
		);
	},

	_recursivelyAnimateChildrenInAndAddSelfToMap: function (bounds, previousZoomLevel, newZoomLevel) {
		this._recursively(bounds, newZoomLevel, 0,
			function (c) {
				c._recursivelyAnimateChildrenIn(bounds, c._group._map.latLngToLayerPoint(c.getLatLng()).round(), previousZoomLevel);

				//TODO: depthToAnimateIn affects _isSingleParent, if there is a multizoom we may/may not be.
				//As a hack we only do a animation free zoom on a single level zoom, if someone does multiple levels then we always animate
				if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
					c.clusterShow();
					c._recursivelyRemoveChildrenFromMap(bounds, previousZoomLevel); //Immediately remove our children as we are replacing them. TODO previousBounds not bounds
				} else {
					c.clusterHide();
				}

				c._addToMap();
			}
		);
	},

	_recursivelyBecomeVisible: function (bounds, zoomLevel) {
		this._recursively(bounds, 0, zoomLevel, null, function (c) {
			c.clusterShow();
		});
	},

	_recursivelyAddChildrenToMap: function (startPos, zoomLevel, bounds) {
		this._recursively(bounds, -1, zoomLevel,
			function (c) {
				if (zoomLevel === c._zoom) {
					return;
				}

				//Add our child markers at startPos (so they can be animated out)
				for (var i = c._markers.length - 1; i >= 0; i--) {
					var nm = c._markers[i];

					if (!bounds.contains(nm._latlng)) {
						continue;
					}

					if (startPos) {
						nm._backupLatlng = nm.getLatLng();

						nm.setLatLng(startPos);
						if (nm.clusterHide) {
							nm.clusterHide();
						}
					}

					c._group._featureGroup.addLayer(nm);
				}
			},
			function (c) {
				c._addToMap(startPos);
			}
		);
	},

	_recursivelyRestoreChildPositions: function (zoomLevel) {
		//Fix positions of child markers
		for (var i = this._markers.length - 1; i >= 0; i--) {
			var nm = this._markers[i];
			if (nm._backupLatlng) {
				nm.setLatLng(nm._backupLatlng);
				delete nm._backupLatlng;
			}
		}

		if (zoomLevel - 1 === this._zoom) {
			//Reposition child clusters
			for (var j = this._childClusters.length - 1; j >= 0; j--) {
				this._childClusters[j]._restorePosition();
			}
		} else {
			for (var k = this._childClusters.length - 1; k >= 0; k--) {
				this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel);
			}
		}
	},

	_restorePosition: function () {
		if (this._backupLatlng) {
			this.setLatLng(this._backupLatlng);
			delete this._backupLatlng;
		}
	},

	//exceptBounds: If set, don't remove any markers/clusters in it
	_recursivelyRemoveChildrenFromMap: function (previousBounds, zoomLevel, exceptBounds) {
		var m, i;
		this._recursively(previousBounds, -1, zoomLevel - 1,
			function (c) {
				//Remove markers at every level
				for (i = c._markers.length - 1; i >= 0; i--) {
					m = c._markers[i];
					if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
						c._group._featureGroup.removeLayer(m);
						if (m.clusterShow) {
							m.clusterShow();
						}
					}
				}
			},
			function (c) {
				//Remove child clusters at just the bottom level
				for (i = c._childClusters.length - 1; i >= 0; i--) {
					m = c._childClusters[i];
					if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
						c._group._featureGroup.removeLayer(m);
						if (m.clusterShow) {
							m.clusterShow();
						}
					}
				}
			}
		);
	},

	//Run the given functions recursively to this and child clusters
	// boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
	// zoomLevelToStart: zoom level to start running functions (inclusive)
	// zoomLevelToStop: zoom level to stop running functions (inclusive)
	// runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
	// runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
	_recursively: function (boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
		var childClusters = this._childClusters,
		    zoom = this._zoom,
		    i, c;

		if (zoomLevelToStart <= zoom) {
			if (runAtEveryLevel) {
				runAtEveryLevel(this);
			}
			if (runAtBottomLevel && zoom === zoomLevelToStop) {
				runAtBottomLevel(this);
			}
		}

		if (zoom < zoomLevelToStart || zoom < zoomLevelToStop) {
			for (i = childClusters.length - 1; i >= 0; i--) {
				c = childClusters[i];
				if (boundsToApplyTo.intersects(c._bounds)) {
					c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel);
				}
			}
		}
	},

	//Returns true if we are the parent of only one cluster and that cluster is the same as us
	_isSingleParent: function () {
		//Don't need to check this._markers as the rest won't work if there are any
		return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
	}
});



/*
* Extends L.Marker to include two extra methods: clusterHide and clusterShow.
* 
* They work as setOpacity(0) and setOpacity(1) respectively, but
* they will remember the marker's opacity when hiding and showing it again.
* 
*/


L.Marker.include({
	
	clusterHide: function () {
		this.options.opacityWhenUnclustered = this.options.opacity || 1;
		return this.setOpacity(0);
	},
	
	clusterShow: function () {
		var ret = this.setOpacity(this.options.opacity || this.options.opacityWhenUnclustered);
		delete this.options.opacityWhenUnclustered;
		return ret;
	}
	
});





L.DistanceGrid = function (cellSize) {
	this._cellSize = cellSize;
	this._sqCellSize = cellSize * cellSize;
	this._grid = {};
	this._objectPoint = { };
};

L.DistanceGrid.prototype = {

	addObject: function (obj, point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    grid = this._grid,
		    row = grid[y] = grid[y] || {},
		    cell = row[x] = row[x] || [],
		    stamp = L.Util.stamp(obj);

		this._objectPoint[stamp] = point;

		cell.push(obj);
	},

	updateObject: function (obj, point) {
		this.removeObject(obj);
		this.addObject(obj, point);
	},

	//Returns true if the object was found
	removeObject: function (obj, point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    grid = this._grid,
		    row = grid[y] = grid[y] || {},
		    cell = row[x] = row[x] || [],
		    i, len;

		delete this._objectPoint[L.Util.stamp(obj)];

		for (i = 0, len = cell.length; i < len; i++) {
			if (cell[i] === obj) {

				cell.splice(i, 1);

				if (len === 1) {
					delete row[x];
				}

				return true;
			}
		}

	},

	eachObject: function (fn, context) {
		var i, j, k, len, row, cell, removed,
		    grid = this._grid;

		for (i in grid) {
			row = grid[i];

			for (j in row) {
				cell = row[j];

				for (k = 0, len = cell.length; k < len; k++) {
					removed = fn.call(context, cell[k]);
					if (removed) {
						k--;
						len--;
					}
				}
			}
		}
	},

	getNearObject: function (point) {
		var x = this._getCoord(point.x),
		    y = this._getCoord(point.y),
		    i, j, k, row, cell, len, obj, dist,
		    objectPoint = this._objectPoint,
		    closestDistSq = this._sqCellSize,
		    closest = null;

		for (i = y - 1; i <= y + 1; i++) {
			row = this._grid[i];
			if (row) {

				for (j = x - 1; j <= x + 1; j++) {
					cell = row[j];
					if (cell) {

						for (k = 0, len = cell.length; k < len; k++) {
							obj = cell[k];
							dist = this._sqDist(objectPoint[L.Util.stamp(obj)], point);
							if (dist < closestDistSq) {
								closestDistSq = dist;
								closest = obj;
							}
						}
					}
				}
			}
		}
		return closest;
	},

	_getCoord: function (x) {
		return Math.floor(x / this._cellSize);
	},

	_sqDist: function (p, p2) {
		var dx = p2.x - p.x,
		    dy = p2.y - p.y;
		return dx * dx + dy * dy;
	}
};


/* Copyright (c) 2012 the authors listed at the following URL, and/or
the authors of referenced articles or incorporated external code:
http://en.literateprograms.org/Quickhull_(Javascript)?action=history&offset=20120410175256

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Retrieved from: http://en.literateprograms.org/Quickhull_(Javascript)?oldid=18434
*/

(function () {
	L.QuickHull = {

		/*
		 * @param {Object} cpt a point to be measured from the baseline
		 * @param {Array} bl the baseline, as represented by a two-element
		 *   array of latlng objects.
		 * @returns {Number} an approximate distance measure
		 */
		getDistant: function (cpt, bl) {
			var vY = bl[1].lat - bl[0].lat,
				vX = bl[0].lng - bl[1].lng;
			return (vX * (cpt.lat - bl[0].lat) + vY * (cpt.lng - bl[0].lng));
		},

		/*
		 * @param {Array} baseLine a two-element array of latlng objects
		 *   representing the baseline to project from
		 * @param {Array} latLngs an array of latlng objects
		 * @returns {Object} the maximum point and all new points to stay
		 *   in consideration for the hull.
		 */
		findMostDistantPointFromBaseLine: function (baseLine, latLngs) {
			var maxD = 0,
				maxPt = null,
				newPoints = [],
				i, pt, d;

			for (i = latLngs.length - 1; i >= 0; i--) {
				pt = latLngs[i];
				d = this.getDistant(pt, baseLine);

				if (d > 0) {
					newPoints.push(pt);
				} else {
					continue;
				}

				if (d > maxD) {
					maxD = d;
					maxPt = pt;
				}
			}

			return { maxPoint: maxPt, newPoints: newPoints };
		},


		/*
		 * Given a baseline, compute the convex hull of latLngs as an array
		 * of latLngs.
		 *
		 * @param {Array} latLngs
		 * @returns {Array}
		 */
		buildConvexHull: function (baseLine, latLngs) {
			var convexHullBaseLines = [],
				t = this.findMostDistantPointFromBaseLine(baseLine, latLngs);

			if (t.maxPoint) { // if there is still a point "outside" the base line
				convexHullBaseLines =
					convexHullBaseLines.concat(
						this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints)
					);
				convexHullBaseLines =
					convexHullBaseLines.concat(
						this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints)
					);
				return convexHullBaseLines;
			} else {  // if there is no more point "outside" the base line, the current base line is part of the convex hull
				return [baseLine[0]];
			}
		},

		/*
		 * Given an array of latlngs, compute a convex hull as an array
		 * of latlngs
		 *
		 * @param {Array} latLngs
		 * @returns {Array}
		 */
		getConvexHull: function (latLngs) {
			// find first baseline
			var maxLat = false, minLat = false,
				maxLng = false, minLng = false,
				maxLatPt = null, minLatPt = null,
				maxLngPt = null, minLngPt = null,
				maxPt = null, minPt = null,
				i;

			for (i = latLngs.length - 1; i >= 0; i--) {
				var pt = latLngs[i];
				if (maxLat === false || pt.lat > maxLat) {
					maxLatPt = pt;
					maxLat = pt.lat;
				}
				if (minLat === false || pt.lat < minLat) {
					minLatPt = pt;
					minLat = pt.lat;
				}
				if (maxLng === false || pt.lng > maxLng) {
					maxLngPt = pt;
					maxLng = pt.lng;
				}
				if (minLng === false || pt.lng < minLng) {
					minLngPt = pt;
					minLng = pt.lng;
				}
			}
			
			if (minLat !== maxLat) {
				minPt = minLatPt;
				maxPt = maxLatPt;
			} else {
				minPt = minLngPt;
				maxPt = maxLngPt;
			}

			var ch = [].concat(this.buildConvexHull([minPt, maxPt], latLngs),
								this.buildConvexHull([maxPt, minPt], latLngs));
			return ch;
		}
	};
}());

L.MarkerCluster.include({
	getConvexHull: function () {
		var childMarkers = this.getAllChildMarkers(),
			points = [],
			p, i;

		for (i = childMarkers.length - 1; i >= 0; i--) {
			p = childMarkers[i].getLatLng();
			points.push(p);
		}

		return L.QuickHull.getConvexHull(points);
	}
});


//This code is 100% based on https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
//Huge thanks to jawj for implementing it first to make my job easy :-)

L.MarkerCluster.include({

	_2PI: Math.PI * 2,
	_circleFootSeparation: 25, //related to circumference of circle
	_circleStartAngle: Math.PI / 6,

	_spiralFootSeparation:  28, //related to size of spiral (experiment!)
	_spiralLengthStart: 11,
	_spiralLengthFactor: 5,

	_circleSpiralSwitchover: 9, //show spiral instead of circle from this marker count upwards.
								// 0 -> always spiral; Infinity -> always circle

	spiderfy: function () {
		if (this._group._spiderfied === this || this._group._inZoomAnimation) {
			return;
		}

		var childMarkers = this.getAllChildMarkers(),
			group = this._group,
			map = group._map,
			center = map.latLngToLayerPoint(this._latlng),
			positions;

		this._group._unspiderfy();
		this._group._spiderfied = this;

		//TODO Maybe: childMarkers order by distance to center

		if (childMarkers.length >= this._circleSpiralSwitchover) {
			positions = this._generatePointsSpiral(childMarkers.length, center);
		} else {
			center.y += 10; // Otherwise circles look wrong => hack for standard blue icon, renders differently for other icons.
			positions = this._generatePointsCircle(childMarkers.length, center);
		}

		this._animationSpiderfy(childMarkers, positions);
	},

	unspiderfy: function (zoomDetails) {
		/// <param Name="zoomDetails">Argument from zoomanim if being called in a zoom animation or null otherwise</param>
		if (this._group._inZoomAnimation) {
			return;
		}
		this._animationUnspiderfy(zoomDetails);

		this._group._spiderfied = null;
	},

	_generatePointsCircle: function (count, centerPt) {
		var circumference = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count),
			legLength = circumference / this._2PI,  //radius from circumference
			angleStep = this._2PI / count,
			res = [],
			i, angle;

		res.length = count;

		for (i = count - 1; i >= 0; i--) {
			angle = this._circleStartAngle + i * angleStep;
			res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
		}

		return res;
	},

	_generatePointsSpiral: function (count, centerPt) {
		var spiderfyDistanceMultiplier = this._group.options.spiderfyDistanceMultiplier,
			legLength = spiderfyDistanceMultiplier * this._spiralLengthStart,
			separation = spiderfyDistanceMultiplier * this._spiralFootSeparation,
			lengthFactor = spiderfyDistanceMultiplier * this._spiralLengthFactor * this._2PI,
			angle = 0,
			res = [],
			i;

		res.length = count;

		// Higher index, closer position to cluster center.
		for (i = count - 1; i >= 0; i--) {
			angle += separation / legLength + i * 0.0005;
			res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round();
			legLength += lengthFactor / angle;
		}
		return res;
	},

	_noanimationUnspiderfy: function () {
		var group = this._group,
			map = group._map,
			fg = group._featureGroup,
			childMarkers = this.getAllChildMarkers(),
			m, i;

		group._ignoreMove = true;

		this.setOpacity(1);
		for (i = childMarkers.length - 1; i >= 0; i--) {
			m = childMarkers[i];

			fg.removeLayer(m);

			if (m._preSpiderfyLatlng) {
				m.setLatLng(m._preSpiderfyLatlng);
				delete m._preSpiderfyLatlng;
			}
			if (m.setZIndexOffset) {
				m.setZIndexOffset(0);
			}

			if (m._spiderLeg) {
				map.removeLayer(m._spiderLeg);
				delete m._spiderLeg;
			}
		}

		group.fire('unspiderfied', {
			cluster: this,
			markers: childMarkers
		});
		group._ignoreMove = false;
		group._spiderfied = null;
	}
});

//Non Animated versions of everything
L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
	_animationSpiderfy: function (childMarkers, positions) {
		var group = this._group,
			map = group._map,
			fg = group._featureGroup,
			legOptions = this._group.options.spiderLegPolylineOptions,
			i, m, leg, newPos;

		group._ignoreMove = true;

		// Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
		// The reverse order trick no longer improves performance on modern browsers.
		for (i = 0; i < childMarkers.length; i++) {
			newPos = map.layerPointToLatLng(positions[i]);
			m = childMarkers[i];

			// Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
			leg = new L.Polyline([this._latlng, newPos], legOptions);
			map.addLayer(leg);
			m._spiderLeg = leg;

			// Now add the marker.
			m._preSpiderfyLatlng = m._latlng;
			m.setLatLng(newPos);
			if (m.setZIndexOffset) {
				m.setZIndexOffset(1000000); //Make these appear on top of EVERYTHING
			}

			fg.addLayer(m);
		}
		this.setOpacity(0.3);

		group._ignoreMove = false;
		group.fire('spiderfied', {
			cluster: this,
			markers: childMarkers
		});
	},

	_animationUnspiderfy: function () {
		this._noanimationUnspiderfy();
	}
});

//Animated versions here
L.MarkerCluster.include({

	_animationSpiderfy: function (childMarkers, positions) {
		var me = this,
			group = this._group,
			map = group._map,
			fg = group._featureGroup,
			thisLayerLatLng = this._latlng,
			thisLayerPos = map.latLngToLayerPoint(thisLayerLatLng),
			svg = L.Path.SVG,
			legOptions = L.extend({}, this._group.options.spiderLegPolylineOptions), // Copy the options so that we can modify them for animation.
			finalLegOpacity = legOptions.opacity,
			i, m, leg, legPath, legLength, newPos;

		if (finalLegOpacity === undefined) {
			finalLegOpacity = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity;
		}

		if (svg) {
			// If the initial opacity of the spider leg is not 0 then it appears before the animation starts.
			legOptions.opacity = 0;

			// Add the class for CSS transitions.
			legOptions.className = (legOptions.className || '') + ' leaflet-cluster-spider-leg';
		} else {
			// Make sure we have a defined opacity.
			legOptions.opacity = finalLegOpacity;
		}

		group._ignoreMove = true;

		// Add markers and spider legs to map, hidden at our center point.
		// Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
		// The reverse order trick no longer improves performance on modern browsers.
		for (i = 0; i < childMarkers.length; i++) {
			m = childMarkers[i];

			newPos = map.layerPointToLatLng(positions[i]);

			// Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
			leg = new L.Polyline([thisLayerLatLng, newPos], legOptions);
			map.addLayer(leg);
			m._spiderLeg = leg;

			// Explanations: https://jakearchibald.com/2013/animated-line-drawing-svg/
			// In our case the transition property is declared in the CSS file.
			if (svg) {
				legPath = leg._path;
				legLength = legPath.getTotalLength() + 0.1; // Need a small extra length to avoid remaining dot in Firefox.
				legPath.style.strokeDasharray = legLength; // Just 1 length is enough, it will be duplicated.
				legPath.style.strokeDashoffset = legLength;
			}

			// If it is a marker, add it now and we'll animate it out
			if (m.setZIndexOffset) {
				m.setZIndexOffset(1000000); // Make normal markers appear on top of EVERYTHING
			}
			if (m.clusterHide) {
				m.clusterHide();
			}
			
			// Vectors just get immediately added
			fg.addLayer(m);

			if (m._setPos) {
				m._setPos(thisLayerPos);
			}
		}

		group._forceLayout();
		group._animationStart();

		// Reveal markers and spider legs.
		for (i = childMarkers.length - 1; i >= 0; i--) {
			newPos = map.layerPointToLatLng(positions[i]);
			m = childMarkers[i];

			//Move marker to new position
			m._preSpiderfyLatlng = m._latlng;
			m.setLatLng(newPos);
			
			if (m.clusterShow) {
				m.clusterShow();
			}

			// Animate leg (animation is actually delegated to CSS transition).
			if (svg) {
				leg = m._spiderLeg;
				legPath = leg._path;
				legPath.style.strokeDashoffset = 0;
				//legPath.style.strokeOpacity = finalLegOpacity;
				leg.setStyle({opacity: finalLegOpacity});
			}
		}
		this.setOpacity(0.3);

		group._ignoreMove = false;

		setTimeout(function () {
			group._animationEnd();
			group.fire('spiderfied', {
				cluster: me,
				markers: childMarkers
			});
		}, 200);
	},

	_animationUnspiderfy: function (zoomDetails) {
		var me = this,
			group = this._group,
			map = group._map,
			fg = group._featureGroup,
			thisLayerPos = zoomDetails ? map._latLngToNewLayerPoint(this._latlng, zoomDetails.zoom, zoomDetails.center) : map.latLngToLayerPoint(this._latlng),
			childMarkers = this.getAllChildMarkers(),
			svg = L.Path.SVG,
			m, i, leg, legPath, legLength, nonAnimatable;

		group._ignoreMove = true;
		group._animationStart();

		//Make us visible and bring the child markers back in
		this.setOpacity(1);
		for (i = childMarkers.length - 1; i >= 0; i--) {
			m = childMarkers[i];

			//Marker was added to us after we were spiderfied
			if (!m._preSpiderfyLatlng) {
				continue;
			}

			//Fix up the location to the real one
			m.setLatLng(m._preSpiderfyLatlng);
			delete m._preSpiderfyLatlng;

			//Hack override the location to be our center
			nonAnimatable = true;
			if (m._setPos) {
				m._setPos(thisLayerPos);
				nonAnimatable = false;
			}
			if (m.clusterHide) {
				m.clusterHide();
				nonAnimatable = false;
			}
			if (nonAnimatable) {
				fg.removeLayer(m);
			}

			// Animate the spider leg back in (animation is actually delegated to CSS transition).
			if (svg) {
				leg = m._spiderLeg;
				legPath = leg._path;
				legLength = legPath.getTotalLength() + 0.1;
				legPath.style.strokeDashoffset = legLength;
				leg.setStyle({opacity: 0});
			}
		}

		group._ignoreMove = false;

		setTimeout(function () {
			//If we have only <= one child left then that marker will be shown on the map so don't remove it!
			var stillThereChildCount = 0;
			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i];
				if (m._spiderLeg) {
					stillThereChildCount++;
				}
			}


			for (i = childMarkers.length - 1; i >= 0; i--) {
				m = childMarkers[i];

				if (!m._spiderLeg) { //Has already been unspiderfied
					continue;
				}

				if (m.clusterShow) {
					m.clusterShow();
				}
				if (m.setZIndexOffset) {
					m.setZIndexOffset(0);
				}

				if (stillThereChildCount > 1) {
					fg.removeLayer(m);
				}

				map.removeLayer(m._spiderLeg);
				delete m._spiderLeg;
			}
			group._animationEnd();
			group.fire('unspiderfied', {
				cluster: me,
				markers: childMarkers
			});
		}, 200);
	}
});


L.MarkerClusterGroup.include({
	//The MarkerCluster currently spiderfied (if any)
	_spiderfied: null,

	unspiderfy: function () {
		this._unspiderfy.apply(this, arguments);
	},

	_spiderfierOnAdd: function () {
		this._map.on('click', this._unspiderfyWrapper, this);

		if (this._map.options.zoomAnimation) {
			this._map.on('zoomstart', this._unspiderfyZoomStart, this);
		}
		//Browsers without zoomAnimation or a big zoom don't fire zoomstart
		this._map.on('zoomend', this._noanimationUnspiderfy, this);

		if (!L.Browser.touch) {
			this._map.getRenderer(this);
			//Needs to happen in the pageload, not after, or animations don't work in webkit
			//  http://stackoverflow.com/questions/8455200/svg-animate-with-dynamically-added-elements
			//Disable on touch browsers as the animation messes up on a touch zoom and isn't very noticable
		}
	},

	_spiderfierOnRemove: function () {
		this._map.off('click', this._unspiderfyWrapper, this);
		this._map.off('zoomstart', this._unspiderfyZoomStart, this);
		this._map.off('zoomanim', this._unspiderfyZoomAnim, this);
		this._map.off('zoomend', this._noanimationUnspiderfy, this);

		//Ensure that markers are back where they should be
		// Use no animation to avoid a sticky leaflet-cluster-anim class on mapPane
		this._noanimationUnspiderfy();
	},

	//On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
	//This means we can define the animation they do rather than Markers doing an animation to their actual location
	_unspiderfyZoomStart: function () {
		if (!this._map) { //May have been removed from the map by a zoomEnd handler
			return;
		}

		this._map.on('zoomanim', this._unspiderfyZoomAnim, this);
	},

	_unspiderfyZoomAnim: function (zoomDetails) {
		//Wait until the first zoomanim after the user has finished touch-zooming before running the animation
		if (L.DomUtil.hasClass(this._map._mapPane, 'leaflet-touching')) {
			return;
		}

		this._map.off('zoomanim', this._unspiderfyZoomAnim, this);
		this._unspiderfy(zoomDetails);
	},

	_unspiderfyWrapper: function () {
		/// <summary>_unspiderfy but passes no arguments</summary>
		this._unspiderfy();
	},

	_unspiderfy: function (zoomDetails) {
		if (this._spiderfied) {
			this._spiderfied.unspiderfy(zoomDetails);
		}
	},

	_noanimationUnspiderfy: function () {
		if (this._spiderfied) {
			this._spiderfied._noanimationUnspiderfy();
		}
	},

	//If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
	_unspiderfyLayer: function (layer) {
		if (layer._spiderLeg) {
			this._featureGroup.removeLayer(layer);

			if (layer.clusterShow) {
				layer.clusterShow();
			}
				//Position will be fixed up immediately in _animationUnspiderfy
			if (layer.setZIndexOffset) {
				layer.setZIndexOffset(0);
			}

			this._map.removeLayer(layer._spiderLeg);
			delete layer._spiderLeg;
		}
	}
});


/**
 * Adds 1 public method to MCG and 1 to L.Marker to facilitate changing
 * markers' icon options and refreshing their icon and their parent clusters
 * accordingly (case where their iconCreateFunction uses data of childMarkers
 * to make up the cluster icon).
 */


L.MarkerClusterGroup.include({
	/**
	 * Updates the icon of all clusters which are parents of the given marker(s).
	 * In singleMarkerMode, also updates the given marker(s) icon.
	 * @param layers L.MarkerClusterGroup|L.LayerGroup|Array(L.Marker)|Map(L.Marker)|
	 * L.MarkerCluster|L.Marker (optional) list of markers (or single marker) whose parent
	 * clusters need to be updated. If not provided, retrieves all child markers of this.
	 * @returns {L.MarkerClusterGroup}
	 */
	refreshClusters: function (layers) {
		if (!layers) {
			layers = this._topClusterLevel.getAllChildMarkers();
		} else if (layers instanceof L.MarkerClusterGroup) {
			layers = layers._topClusterLevel.getAllChildMarkers();
		} else if (layers instanceof L.LayerGroup) {
			layers = layers._layers;
		} else if (layers instanceof L.MarkerCluster) {
			layers = layers.getAllChildMarkers();
		} else if (layers instanceof L.Marker) {
			layers = [layers];
		} // else: must be an Array(L.Marker)|Map(L.Marker)
		this._flagParentsIconsNeedUpdate(layers);
		this._refreshClustersIcons();

		// In case of singleMarkerMode, also re-draw the markers.
		if (this.options.singleMarkerMode) {
			this._refreshSingleMarkerModeMarkers(layers);
		}

		return this;
	},

	/**
	 * Simply flags all parent clusters of the given markers as having a "dirty" icon.
	 * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
	 * @private
	 */
	_flagParentsIconsNeedUpdate: function (layers) {
		var id, parent;

		// Assumes layers is an Array or an Object whose prototype is non-enumerable.
		for (id in layers) {
			// Flag parent clusters' icon as "dirty", all the way up.
			// Dumb process that flags multiple times upper parents, but still
			// much more efficient than trying to be smart and make short lists,
			// at least in the case of a hierarchy following a power law:
			// http://jsperf.com/flag-nodes-in-power-hierarchy/2
			parent = layers[id].__parent;
			while (parent) {
				parent._iconNeedsUpdate = true;
				parent = parent.__parent;
			}
		}
	},

	/**
	 * Re-draws the icon of the supplied markers.
	 * To be used in singleMarkerMode only.
	 * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
	 * @private
	 */
	_refreshSingleMarkerModeMarkers: function (layers) {
		var id, layer;

		for (id in layers) {
			layer = layers[id];

			// Make sure we do not override markers that do not belong to THIS group.
			if (this.hasLayer(layer)) {
				// Need to re-create the icon first, then re-draw the marker.
				layer.setIcon(this._overrideMarkerIcon(layer));
			}
		}
	}
});

L.Marker.include({
	/**
	 * Updates the given options in the marker's icon and refreshes the marker.
	 * @param options map object of icon options.
	 * @param directlyRefreshClusters boolean (optional) true to trigger
	 * MCG.refreshClustersOf() right away with this single marker.
	 * @returns {L.Marker}
	 */
	refreshIconOptions: function (options, directlyRefreshClusters) {
		var icon = this.options.icon;

		L.setOptions(icon, options);

		this.setIcon(icon);

		// Shortcut to refresh the associated MCG clusters right away.
		// To be used when refreshing a single marker.
		// Otherwise, better use MCG.refreshClusters() once at the end with
		// the list of modified markers.
		if (directlyRefreshClusters && this.__parent) {
			this.__parent._group.refreshClusters(this);
		}

		return this;
	}
});


}(window, document));


'use strict';
(function (factory, window) {
    /*globals define, module, require*/

    // define an AMD module that relies on 'leaflet'
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);


    // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }

    // attach your plugin to the global 'L' variable
    if(typeof window !== 'undefined' && window.L){
        factory(window.L);
    }

}(function (L) {
    // 🍂miniclass CancelableEvent (Event objects)
    // 🍂method cancel()
    // Cancel any subsequent action.

    // 🍂miniclass VertexEvent (Event objects)
    // 🍂property vertex: VertexMarker
    // The vertex that fires the event.

    // 🍂miniclass ShapeEvent (Event objects)
    // 🍂property shape: Array
    // The shape (LatLngs array) subject of the action.

    // 🍂miniclass CancelableVertexEvent (Event objects)
    // 🍂inherits VertexEvent
    // 🍂inherits CancelableEvent

    // 🍂miniclass CancelableShapeEvent (Event objects)
    // 🍂inherits ShapeEvent
    // 🍂inherits CancelableEvent

    // 🍂miniclass LayerEvent (Event objects)
    // 🍂property layer: object
    // The Layer (Marker, Polyline…) subject of the action.

    // 🍂namespace Editable; 🍂class Editable; 🍂aka L.Editable
    // Main edition handler. By default, it is attached to the map
    // as `map.editTools` property.
    // Leaflet.Editable is made to be fully extendable. You have three ways to customize
    // the behaviour: using options, listening to events, or extending.
    L.Editable = L.Evented.extend({

        statics: {
            FORWARD: 1,
            BACKWARD: -1
        },

        options: {

            // You can pass them when creating a map using the `editOptions` key.
            // 🍂option zIndex: int = 1000
            // The default zIndex of the editing tools.
            zIndex: 1000,

            // 🍂option polygonClass: class = L.Polygon
            // Class to be used when creating a new Polygon.
            polygonClass: L.Polygon,

            // 🍂option polylineClass: class = L.Polyline
            // Class to be used when creating a new Polyline.
            polylineClass: L.Polyline,

            // 🍂option markerClass: class = L.Marker
            // Class to be used when creating a new Marker.
            markerClass: L.Marker,

            // 🍂option rectangleClass: class = L.Rectangle
            // Class to be used when creating a new Rectangle.
            rectangleClass: L.Rectangle,

            // 🍂option circleClass: class = L.Circle
            // Class to be used when creating a new Circle.
            circleClass: L.Circle,

            // 🍂option drawingCSSClass: string = 'leaflet-editable-drawing'
            // CSS class to be added to the map container while drawing.
            drawingCSSClass: 'leaflet-editable-drawing',

            // 🍂option drawingCursor: const = 'crosshair'
            // Cursor mode set to the map while drawing.
            drawingCursor: 'crosshair',

            // 🍂option editLayer: Layer = new L.LayerGroup()
            // Layer used to store edit tools (vertex, line guide…).
            editLayer: undefined,

            // 🍂option featuresLayer: Layer = new L.LayerGroup()
            // Default layer used to store drawn features (Marker, Polyline…).
            featuresLayer: undefined,

            // 🍂option polylineEditorClass: class = PolylineEditor
            // Class to be used as Polyline editor.
            polylineEditorClass: undefined,

            // 🍂option polygonEditorClass: class = PolygonEditor
            // Class to be used as Polygon editor.
            polygonEditorClass: undefined,

            // 🍂option markerEditorClass: class = MarkerEditor
            // Class to be used as Marker editor.
            markerEditorClass: undefined,

            // 🍂option rectangleEditorClass: class = RectangleEditor
            // Class to be used as Rectangle editor.
            rectangleEditorClass: undefined,

            // 🍂option circleEditorClass: class = CircleEditor
            // Class to be used as Circle editor.
            circleEditorClass: undefined,

            // 🍂option lineGuideOptions: hash = {}
            // Options to be passed to the line guides.
            lineGuideOptions: {},

            // 🍂option skipMiddleMarkers: boolean = false
            // Set this to true if you don't want middle markers.
            skipMiddleMarkers: false

        },

        initialize: function (map, options) {
            L.setOptions(this, options);
            this._lastZIndex = this.options.zIndex;
            this.map = map;
            this.editLayer = this.createEditLayer();
            this.featuresLayer = this.createFeaturesLayer();
            this.forwardLineGuide = this.createLineGuide();
            this.backwardLineGuide = this.createLineGuide();
        },

        fireAndForward: function (type, e) {
            e = e || {};
            e.editTools = this;
            this.fire(type, e);
            this.map.fire(type, e);
        },

        createLineGuide: function () {
            var options = L.extend({dashArray: '5,10', weight: 1, interactive: false}, this.options.lineGuideOptions);
            return L.polyline([], options);
        },

        createVertexIcon: function (options) {
            return L.Browser.touch ? new L.Editable.TouchVertexIcon(options) : new L.Editable.VertexIcon(options);
        },

        createEditLayer: function () {
            return this.options.editLayer || new L.LayerGroup().addTo(this.map);
        },

        createFeaturesLayer: function () {
            return this.options.featuresLayer || new L.LayerGroup().addTo(this.map);
        },

        moveForwardLineGuide: function (latlng) {
            if (this.forwardLineGuide._latlngs.length) {
                this.forwardLineGuide._latlngs[1] = latlng;
                this.forwardLineGuide._bounds.extend(latlng);
                this.forwardLineGuide.redraw();
            }
        },

        moveBackwardLineGuide: function (latlng) {
            if (this.backwardLineGuide._latlngs.length) {
                this.backwardLineGuide._latlngs[1] = latlng;
                this.backwardLineGuide._bounds.extend(latlng);
                this.backwardLineGuide.redraw();
            }
        },

        anchorForwardLineGuide: function (latlng) {
            this.forwardLineGuide._latlngs[0] = latlng;
            this.forwardLineGuide._bounds.extend(latlng);
            this.forwardLineGuide.redraw();
        },

        anchorBackwardLineGuide: function (latlng) {
            this.backwardLineGuide._latlngs[0] = latlng;
            this.backwardLineGuide._bounds.extend(latlng);
            this.backwardLineGuide.redraw();
        },

        attachForwardLineGuide: function () {
            this.editLayer.addLayer(this.forwardLineGuide);
        },

        attachBackwardLineGuide: function () {
            this.editLayer.addLayer(this.backwardLineGuide);
        },

        detachForwardLineGuide: function () {
            this.forwardLineGuide.setLatLngs([]);
            this.editLayer.removeLayer(this.forwardLineGuide);
        },

        detachBackwardLineGuide: function () {
            this.backwardLineGuide.setLatLngs([]);
            this.editLayer.removeLayer(this.backwardLineGuide);
        },

        blockEvents: function () {
            // Hack: force map not to listen to other layers events while drawing.
            if (!this._oldTargets) {
                this._oldTargets = this.map._targets;
                this.map._targets = {};
            }
        },

        unblockEvents: function () {
            if (this._oldTargets) {
                // Reset, but keep targets created while drawing.
                this.map._targets = L.extend(this.map._targets, this._oldTargets);
                delete this._oldTargets;
            }
        },

        registerForDrawing: function (editor) {
            if (this._drawingEditor) this.unregisterForDrawing(this._drawingEditor);
            this.blockEvents();
            editor.reset();  // Make sure editor tools still receive events.
            this._drawingEditor = editor;
            this.map.on('mousemove touchmove', editor.onDrawingMouseMove, editor);
            this.map.on('mousedown', this.onMousedown, this);
            this.map.on('mouseup', this.onMouseup, this);
            L.DomUtil.addClass(this.map._container, this.options.drawingCSSClass);
            this.defaultMapCursor = this.map._container.style.cursor;
            this.map._container.style.cursor = this.options.drawingCursor;
        },

        unregisterForDrawing: function (editor) {
            this.unblockEvents();
            L.DomUtil.removeClass(this.map._container, this.options.drawingCSSClass);
            this.map._container.style.cursor = this.defaultMapCursor;
            editor = editor || this._drawingEditor;
            if (!editor) return;
            this.map.off('mousemove touchmove', editor.onDrawingMouseMove, editor);
            this.map.off('mousedown', this.onMousedown, this);
            this.map.off('mouseup', this.onMouseup, this);
            if (editor !== this._drawingEditor) return;
            delete this._drawingEditor;
            if (editor._drawing) editor.cancelDrawing();
        },

        onMousedown: function (e) {
            this._mouseDown = e;
            this._drawingEditor.onDrawingMouseDown(e);
        },

        onMouseup: function (e) {
            if (this._mouseDown) {
                var editor = this._drawingEditor,
                    mouseDown = this._mouseDown;
                this._mouseDown = null;
                editor.onDrawingMouseUp(e);
                if (this._drawingEditor !== editor) return;  // onDrawingMouseUp may call unregisterFromDrawing.
                var origin = L.point(mouseDown.originalEvent.clientX, mouseDown.originalEvent.clientY);
                var distance = L.point(e.originalEvent.clientX, e.originalEvent.clientY).distanceTo(origin);
                if (Math.abs(distance) < 9 * (window.devicePixelRatio || 1)) this._drawingEditor.onDrawingClick(e);
            }
        },

        // 🍂section Public methods
        // You will generally access them by the `map.editTools`
        // instance:
        //
        // `map.editTools.startPolyline();`

        // 🍂method drawing(): boolean
        // Return true if any drawing action is ongoing.
        drawing: function () {
            return this._drawingEditor && this._drawingEditor.drawing();
        },

        // 🍂method stopDrawing()
        // When you need to stop any ongoing drawing, without needing to know which editor is active.
        stopDrawing: function () {
            this.unregisterForDrawing();
        },

        // 🍂method commitDrawing()
        // When you need to commit any ongoing drawing, without needing to know which editor is active.
        commitDrawing: function (e) {
            if (!this._drawingEditor) return;
            this._drawingEditor.commitDrawing(e);
        },

        connectCreatedToMap: function (layer) {
            return this.featuresLayer.addLayer(layer);
        },

        // 🍂method startPolyline(latlng: L.LatLng, options: hash): L.Polyline
        // Start drawing a Polyline. If `latlng` is given, a first point will be added. In any case, continuing on user click.
        // If `options` is given, it will be passed to the Polyline class constructor.
        startPolyline: function (latlng, options) {
            var line = this.createPolyline([], options);
            line.enableEdit(this.map).newShape(latlng);
            return line;
        },

        // 🍂method startPolygon(latlng: L.LatLng, options: hash): L.Polygon
        // Start drawing a Polygon. If `latlng` is given, a first point will be added. In any case, continuing on user click.
        // If `options` is given, it will be passed to the Polygon class constructor.
        startPolygon: function (latlng, options) {
            var polygon = this.createPolygon([], options);
            polygon.enableEdit(this.map).newShape(latlng);
            return polygon;
        },

        // 🍂method startMarker(latlng: L.LatLng, options: hash): L.Marker
        // Start adding a Marker. If `latlng` is given, the Marker will be shown first at this point.
        // In any case, it will follow the user mouse, and will have a final `latlng` on next click (or touch).
        // If `options` is given, it will be passed to the Marker class constructor.
        startMarker: function (latlng, options) {
            latlng = latlng || this.map.getCenter().clone();
            var marker = this.createMarker(latlng, options);
            marker.enableEdit(this.map).startDrawing();
            return marker;
        },

        // 🍂method startRectangle(latlng: L.LatLng, options: hash): L.Rectangle
        // Start drawing a Rectangle. If `latlng` is given, the Rectangle anchor will be added. In any case, continuing on user drag.
        // If `options` is given, it will be passed to the Rectangle class constructor.
        startRectangle: function(latlng, options) {
            var corner = latlng || L.latLng([0, 0]);
            var bounds = new L.LatLngBounds(corner, corner);
            var rectangle = this.createRectangle(bounds, options);
            rectangle.enableEdit(this.map).startDrawing();
            return rectangle;
        },

        // 🍂method startCircle(latlng: L.LatLng, options: hash): L.Circle
        // Start drawing a Circle. If `latlng` is given, the Circle anchor will be added. In any case, continuing on user drag.
        // If `options` is given, it will be passed to the Circle class constructor.
        startCircle: function (latlng, options) {
            latlng = latlng || this.map.getCenter().clone();
            var circle = this.createCircle(latlng, options);
            circle.enableEdit(this.map).startDrawing();
            return circle;
        },

        startHole: function (editor, latlng) {
            editor.newHole(latlng);
        },

        createLayer: function (klass, latlngs, options) {
            options = L.Util.extend({editOptions: {editTools: this}}, options);
            var layer = new klass(latlngs, options);
            // 🍂namespace Editable
            // 🍂event editable:created: LayerEvent
            // Fired when a new feature (Marker, Polyline…) is created.
            this.fireAndForward('editable:created', {layer: layer});
            return layer;
        },

        createPolyline: function (latlngs, options) {
            return this.createLayer(options && options.polylineClass || this.options.polylineClass, latlngs, options);
        },

        createPolygon: function (latlngs, options) {
            return this.createLayer(options && options.polygonClass || this.options.polygonClass, latlngs, options);
        },

        createMarker: function (latlng, options) {
            return this.createLayer(options && options.markerClass || this.options.markerClass, latlng, options);
        },

        createRectangle: function (bounds, options) {
            return this.createLayer(options && options.rectangleClass || this.options.rectangleClass, bounds, options);
        },

        createCircle: function (latlng, options) {
            return this.createLayer(options && options.circleClass || this.options.circleClass, latlng, options);
        }

    });

    L.extend(L.Editable, {

        makeCancellable: function (e) {
            e.cancel = function () {
                e._cancelled = true;
            };
        }

    });

    // 🍂namespace Map; 🍂class Map
    // Leaflet.Editable add options and events to the `L.Map` object.
    // See `Editable` events for the list of events fired on the Map.
    // 🍂example
    //
    // ```js
    // var map = L.map('map', {
    //  editable: true,
    //  editOptions: {
    //    …
    // }
    // });
    // ```
    // 🍂section Editable Map Options
    L.Map.mergeOptions({

        // 🍂namespace Map
        // 🍂section Map Options
        // 🍂option editToolsClass: class = L.Editable
        // Class to be used as vertex, for path editing.
        editToolsClass: L.Editable,

        // 🍂option editable: boolean = false
        // Whether to create a L.Editable instance at map init.
        editable: false,

        // 🍂option editOptions: hash = {}
        // Options to pass to L.Editable when instanciating.
        editOptions: {}

    });

    L.Map.addInitHook(function () {

        this.whenReady(function () {
            if (this.options.editable) {
                this.editTools = new this.options.editToolsClass(this, this.options.editOptions);
            }
        });

    });

    L.Editable.VertexIcon = L.DivIcon.extend({

        options: {
            iconSize: new L.Point(8, 8)
        }

    });

    L.Editable.TouchVertexIcon = L.Editable.VertexIcon.extend({

        options: {
            iconSize: new L.Point(20, 20)
        }

    });


    // 🍂namespace Editable; 🍂class VertexMarker; Handler for dragging path vertices.
    L.Editable.VertexMarker = L.Marker.extend({

        options: {
            draggable: true,
            className: 'leaflet-div-icon leaflet-vertex-icon'
        },


        // 🍂section Public methods
        // The marker used to handle path vertex. You will usually interact with a `VertexMarker`
        // instance when listening for events like `editable:vertex:ctrlclick`.

        initialize: function (latlng, latlngs, editor, options) {
            // We don't use this._latlng, because on drag Leaflet replace it while
            // we want to keep reference.
            this.latlng = latlng;
            this.latlngs = latlngs;
            this.editor = editor;
            L.Marker.prototype.initialize.call(this, latlng, options);
            this.options.icon = this.editor.tools.createVertexIcon({className: this.options.className});
            this.latlng.__vertex = this;
            this.editor.editLayer.addLayer(this);
            this.setZIndexOffset(editor.tools._lastZIndex + 1);
        },

        onAdd: function (map) {
            L.Marker.prototype.onAdd.call(this, map);
            this.on('drag', this.onDrag);
            this.on('dragstart', this.onDragStart);
            this.on('dragend', this.onDragEnd);
            this.on('mouseup', this.onMouseup);
            this.on('click', this.onClick);
            this.on('contextmenu', this.onContextMenu);
            this.on('mousedown touchstart', this.onMouseDown);
            this.addMiddleMarkers();
        },

        onRemove: function (map) {
            if (this.middleMarker) this.middleMarker.delete();
            delete this.latlng.__vertex;
            this.off('drag', this.onDrag);
            this.off('dragstart', this.onDragStart);
            this.off('dragend', this.onDragEnd);
            this.off('mouseup', this.onMouseup);
            this.off('click', this.onClick);
            this.off('contextmenu', this.onContextMenu);
            this.off('mousedown touchstart', this.onMouseDown);
            L.Marker.prototype.onRemove.call(this, map);
        },

        onDrag: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerDrag(e);
            var iconPos = L.DomUtil.getPosition(this._icon),
                latlng = this._map.layerPointToLatLng(iconPos);
            this.latlng.update(latlng);
            this._latlng = this.latlng;  // Push back to Leaflet our reference.
            this.editor.refresh();
            if (this.middleMarker) this.middleMarker.updateLatLng();
            var next = this.getNext();
            if (next && next.middleMarker) next.middleMarker.updateLatLng();
        },

        onDragStart: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerDragStart(e);
        },

        onDragEnd: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerDragEnd(e);
        },

        onClick: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerClick(e);
        },

        onMouseup: function (e) {
            L.DomEvent.stop(e);
            e.vertex = this;
            this.editor.map.fire('mouseup', e);
        },

        onContextMenu: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerContextMenu(e);
        },

        onMouseDown: function (e) {
            e.vertex = this;
            this.editor.onVertexMarkerMouseDown(e);
        },

        // 🍂method delete()
        // Delete a vertex and the related LatLng.
        delete: function () {
            var next = this.getNext();  // Compute before changing latlng
            this.latlngs.splice(this.getIndex(), 1);
            this.editor.editLayer.removeLayer(this);
            this.editor.onVertexDeleted({latlng: this.latlng, vertex: this});
            if (!this.latlngs.length) this.editor.deleteShape(this.latlngs);
            if (next) next.resetMiddleMarker();
            this.editor.refresh();
        },

        // 🍂method getIndex(): int
        // Get the index of the current vertex among others of the same LatLngs group.
        getIndex: function () {
            return this.latlngs.indexOf(this.latlng);
        },

        // 🍂method getLastIndex(): int
        // Get last vertex index of the LatLngs group of the current vertex.
        getLastIndex: function () {
            return this.latlngs.length - 1;
        },

        // 🍂method getPrevious(): VertexMarker
        // Get the previous VertexMarker in the same LatLngs group.
        getPrevious: function () {
            if (this.latlngs.length < 2) return;
            var index = this.getIndex(),
                previousIndex = index - 1;
            if (index === 0 && this.editor.CLOSED) previousIndex = this.getLastIndex();
            var previous = this.latlngs[previousIndex];
            if (previous) return previous.__vertex;
        },

        // 🍂method getNext(): VertexMarker
        // Get the next VertexMarker in the same LatLngs group.
        getNext: function () {
            if (this.latlngs.length < 2) return;
            var index = this.getIndex(),
                nextIndex = index + 1;
            if (index === this.getLastIndex() && this.editor.CLOSED) nextIndex = 0;
            var next = this.latlngs[nextIndex];
            if (next) return next.__vertex;
        },

        addMiddleMarker: function (previous) {
            if (!this.editor.hasMiddleMarkers()) return;
            previous = previous || this.getPrevious();
            if (previous && !this.middleMarker) this.middleMarker = this.editor.addMiddleMarker(previous, this, this.latlngs, this.editor);
        },

        addMiddleMarkers: function () {
            if (!this.editor.hasMiddleMarkers()) return;
            var previous = this.getPrevious();
            if (previous) this.addMiddleMarker(previous);
            var next = this.getNext();
            if (next) next.resetMiddleMarker();
        },

        resetMiddleMarker: function () {
            if (this.middleMarker) this.middleMarker.delete();
            this.addMiddleMarker();
        },

        // 🍂method split()
        // Split the vertex LatLngs group at its index, if possible.
        split: function () {
            if (!this.editor.splitShape) return;  // Only for PolylineEditor
            this.editor.splitShape(this.latlngs, this.getIndex());
        },

        // 🍂method continue()
        // Continue the vertex LatLngs from this vertex. Only active for first and last vertices of a Polyline.
        continue: function () {
            if (!this.editor.continueBackward) return;  // Only for PolylineEditor
            var index = this.getIndex();
            if (index === 0) this.editor.continueBackward(this.latlngs);
            else if (index === this.getLastIndex()) this.editor.continueForward(this.latlngs);
        }

    });

    L.Editable.mergeOptions({

        // 🍂namespace Editable
        // 🍂option vertexMarkerClass: class = VertexMarker
        // Class to be used as vertex, for path editing.
        vertexMarkerClass: L.Editable.VertexMarker

    });

    L.Editable.MiddleMarker = L.Marker.extend({

        options: {
            opacity: 0.5,
            className: 'leaflet-div-icon leaflet-middle-icon',
            draggable: true
        },

        initialize: function (left, right, latlngs, editor, options) {
            this.left = left;
            this.right = right;
            this.editor = editor;
            this.latlngs = latlngs;
            L.Marker.prototype.initialize.call(this, this.computeLatLng(), options);
            this._opacity = this.options.opacity;
            this.options.icon = this.editor.tools.createVertexIcon({className: this.options.className});
            this.editor.editLayer.addLayer(this);
            this.setVisibility();
        },

        setVisibility: function () {
            var leftPoint = this._map.latLngToContainerPoint(this.left.latlng),
                rightPoint = this._map.latLngToContainerPoint(this.right.latlng),
                size = L.point(this.options.icon.options.iconSize);
            if (leftPoint.distanceTo(rightPoint) < size.x * 3) this.hide();
            else this.show();
        },

        show: function () {
            this.setOpacity(this._opacity);
        },

        hide: function () {
            this.setOpacity(0);
        },

        updateLatLng: function () {
            this.setLatLng(this.computeLatLng());
            this.setVisibility();
        },

        computeLatLng: function () {
            var leftPoint = this.editor.map.latLngToContainerPoint(this.left.latlng),
                rightPoint = this.editor.map.latLngToContainerPoint(this.right.latlng),
                y = (leftPoint.y + rightPoint.y) / 2,
                x = (leftPoint.x + rightPoint.x) / 2;
            return this.editor.map.containerPointToLatLng([x, y]);
        },

        onAdd: function (map) {
            L.Marker.prototype.onAdd.call(this, map);
            L.DomEvent.on(this._icon, 'mousedown touchstart', this.onMouseDown, this);
            map.on('zoomend', this.setVisibility, this);
        },

        onRemove: function (map) {
            delete this.right.middleMarker;
            L.DomEvent.off(this._icon, 'mousedown touchstart', this.onMouseDown, this);
            map.off('zoomend', this.setVisibility, this);
            L.Marker.prototype.onRemove.call(this, map);
        },

        onMouseDown: function (e) {
            var iconPos = L.DomUtil.getPosition(this._icon),
                latlng = this.editor.map.layerPointToLatLng(iconPos);
            e = {
                originalEvent: e,
                latlng: latlng
            };
            if (this.options.opacity === 0) return;
            L.Editable.makeCancellable(e);
            this.editor.onMiddleMarkerMouseDown(e);
            if (e._cancelled) return;
            this.latlngs.splice(this.index(), 0, e.latlng);
            this.editor.refresh();
            var icon = this._icon;
            var marker = this.editor.addVertexMarker(e.latlng, this.latlngs);
            /* Hack to workaround browser not firing touchend when element is no more on DOM */
            var parent = marker._icon.parentNode;
            parent.removeChild(marker._icon);
            marker._icon = icon;
            parent.appendChild(marker._icon);
            marker._initIcon();
            marker._initInteraction();
            marker.setOpacity(1);
            /* End hack */
            // Transfer ongoing dragging to real marker
            L.Draggable._dragging = false;
            marker.dragging._draggable._onDown(e.originalEvent);
            this.delete();
        },

        delete: function () {
            this.editor.editLayer.removeLayer(this);
        },

        index: function () {
            return this.latlngs.indexOf(this.right.latlng);
        }

    });

    L.Editable.mergeOptions({

        // 🍂namespace Editable
        // 🍂option middleMarkerClass: class = VertexMarker
        // Class to be used as middle vertex, pulled by the user to create a new point in the middle of a path.
        middleMarkerClass: L.Editable.MiddleMarker

    });

    // 🍂namespace Editable; 🍂class BaseEditor; 🍂aka L.Editable.BaseEditor
    // When editing a feature (Marker, Polyline…), an editor is attached to it. This
    // editor basically knows how to handle the edition.
    L.Editable.BaseEditor = L.Handler.extend({

        initialize: function (map, feature, options) {
            L.setOptions(this, options);
            this.map = map;
            this.feature = feature;
            this.feature.editor = this;
            this.editLayer = new L.LayerGroup();
            this.tools = this.options.editTools || map.editTools;
        },

        // 🍂method enable(): this
        // Set up the drawing tools for the feature to be editable.
        addHooks: function () {
            if (this.isConnected()) this.onFeatureAdd();
            else this.feature.once('add', this.onFeatureAdd, this);
            this.onEnable();
            this.feature.on(this._getEvents(), this);
            return;
        },

        // 🍂method disable(): this
        // Remove the drawing tools for the feature.
        removeHooks: function () {
            this.feature.off(this._getEvents(), this);
            if (this.feature.dragging) this.feature.dragging.disable();
            this.editLayer.clearLayers();
            this.tools.editLayer.removeLayer(this.editLayer);
            this.onDisable();
            if (this._drawing) this.cancelDrawing();
            return;
        },

        // 🍂method drawing(): boolean
        // Return true if any drawing action is ongoing with this editor.
        drawing: function () {
            return !!this._drawing;
        },

        reset: function () {},

        onFeatureAdd: function () {
            this.tools.editLayer.addLayer(this.editLayer);
            if (this.feature.dragging) this.feature.dragging.enable();
        },

        hasMiddleMarkers: function () {
            return !this.options.skipMiddleMarkers && !this.tools.options.skipMiddleMarkers;
        },

        fireAndForward: function (type, e) {
            if(this.feature.linetype === "circleline" || this.feature.linetype === "circlepolygon"){

            }else{
                e = e || {};
                e.layer = this.feature;
                this.feature.fire(type, e);
                this.tools.fireAndForward(type, e);
            }
        },

        onEnable: function () {
            // 🍂namespace Editable
            // 🍂event editable:enable: Event
            // Fired when an existing feature is ready to be edited.
            this.fireAndForward('editable:enable');
        },

        onDisable: function () {
            // 🍂namespace Editable
            // 🍂event editable:disable: Event
            // Fired when an existing feature is not ready anymore to be edited.
            this.fireAndForward('editable:disable');
        },

        onEditing: function () {
            // 🍂namespace Editable
            // 🍂event editable:editing: Event
            // Fired as soon as any change is made to the feature geometry.
            this.fireAndForward('editable:editing');
        },

        onStartDrawing: function () {
            // 🍂namespace Editable
            // 🍂section Drawing events
            // 🍂event editable:drawing:start: Event
            // Fired when a feature is to be drawn.
            this.fireAndForward('editable:drawing:start');
        },

        onEndDrawing: function () {
            // 🍂namespace Editable
            // 🍂section Drawing events
            // 🍂event editable:drawing:end: Event
            // Fired when a feature is not drawn anymore.
            this.fireAndForward('editable:drawing:end');
        },

        onCancelDrawing: function () {
            // 🍂namespace Editable
            // 🍂section Drawing events
            // 🍂event editable:drawing:cancel: Event
            // Fired when user cancel drawing while a feature is being drawn.
            this.fireAndForward('editable:drawing:cancel');
        },

        onCommitDrawing: function (e) {
            // 🍂namespace Editable
            // 🍂section Drawing events
            // 🍂event editable:drawing:commit: Event
            // Fired when user finish drawing a feature.
            this.fireAndForward('editable:drawing:commit', e);
        },

        onDrawingMouseDown: function (e) {
            // 🍂namespace Editable
            // 🍂section Drawing events
            // 🍂event editable:drawing:mousedown: Event
            // Fired when user `mousedown` while drawing.
            this.fireAndForward('editable:drawing:mousedown', e);
        },

        onDrawingMouseUp: function (e) {
            // 🍂namespace Editable
            // 🍂section Drawing events
            // 🍂event editable:drawing:mouseup: Event
            // Fired when user `mouseup` while drawing.
            this.fireAndForward('editable:drawing:mouseup', e);
        },

        startDrawing: function () {
            if (!this._drawing) this._drawing = L.Editable.FORWARD;
            this.tools.registerForDrawing(this);
            this.onStartDrawing();
        },

        commitDrawing: function (e) {
            this.onCommitDrawing(e);
            this.endDrawing();
        },

        cancelDrawing: function () {
            // If called during a vertex drag, the vertex will be removed before
            // the mouseup fires on it. This is a workaround. Maybe better fix is
            // To have L.Draggable reset it's status on disable (Leaflet side).
            L.Draggable._dragging = false;
            this.onCancelDrawing();
            this.endDrawing();
        },

        endDrawing: function () {
            this._drawing = false;
            this.tools.unregisterForDrawing(this);
            this.onEndDrawing();
        },

        onDrawingClick: function (e) {
            if (!this.drawing()) return;
            L.Editable.makeCancellable(e);
            // 🍂namespace Editable
            // 🍂section Drawing events
            // 🍂event editable:drawing:click: CancelableEvent
            // Fired when user `click` while drawing, before any internal action is being processed.
            this.fireAndForward('editable:drawing:click', e);
            if (e._cancelled) return;
            if (!this.isConnected()) this.connect(e);
            this.processDrawingClick(e);
        },

        isConnected: function () {
            return this.map.hasLayer(this.feature);
        },

        connect: function (e) {
            this.tools.connectCreatedToMap(this.feature);
            this.tools.editLayer.addLayer(this.editLayer);
        },

        onMove: function (e) {
            // 🍂namespace Editable
            // 🍂section Drawing events
            // 🍂event editable:drawing:move: Event
            // Fired when `move` mouse while drawing, while dragging a marker, and while dragging a vertex.
            this.fireAndForward('editable:drawing:move', e);
        },

        onDrawingMouseMove: function (e) {
            this.onMove(e);
        },

        _getEvents: function () {
            return {
                dragstart: this.onDragStart,
                drag: this.onDrag,
                dragend: this.onDragEnd,
                remove: this.disable
            };
        },

        onDragStart: function (e) {
            this.onEditing();
            // 🍂namespace Editable
            // 🍂event editable:dragstart: Event
            // Fired before a path feature is dragged.
            this.fireAndForward('editable:dragstart', e);
        },

        onDrag: function (e) {
            this.onMove(e);
            // 🍂namespace Editable
            // 🍂event editable:drag: Event
            // Fired when a path feature is being dragged.
            this.fireAndForward('editable:drag', e);
        },

        onDragEnd: function (e) {
            // 🍂namespace Editable
            // 🍂event editable:dragend: Event
            // Fired after a path feature has been dragged.
            this.fireAndForward('editable:dragend', e);
        }

    });

    // 🍂namespace Editable; 🍂class MarkerEditor; 🍂aka L.Editable.MarkerEditor
    // 🍂inherits BaseEditor
    // Editor for Marker.
    L.Editable.MarkerEditor = L.Editable.BaseEditor.extend({

        onDrawingMouseMove: function (e) {
            L.Editable.BaseEditor.prototype.onDrawingMouseMove.call(this, e);
            if (this._drawing) this.feature.setLatLng(e.latlng);
        },

        processDrawingClick: function (e) {
            // 🍂namespace Editable
            // 🍂section Drawing events
            // 🍂event editable:drawing:clicked: Event
            // Fired when user `click` while drawing, after all internal actions.
            this.fireAndForward('editable:drawing:clicked', e);
            this.commitDrawing(e);
        },

        connect: function (e) {
            // On touch, the latlng has not been updated because there is
            // no mousemove.
            if (e) this.feature._latlng = e.latlng;
            L.Editable.BaseEditor.prototype.connect.call(this, e);
        }

    });

    // 🍂namespace Editable; 🍂class PathEditor; 🍂aka L.Editable.PathEditor
    // 🍂inherits BaseEditor
    // Base class for all path editors.
    L.Editable.PathEditor = L.Editable.BaseEditor.extend({

        CLOSED: false,
        MIN_VERTEX: 2,

        addHooks: function () {
            L.Editable.BaseEditor.prototype.addHooks.call(this);
            if (this.feature) this.initVertexMarkers();
            return this;
        },

        initVertexMarkers: function (latlngs) {
            if (!this.enabled()) return;
            latlngs = latlngs || this.getLatLngs();
            if (L.Polyline._flat(latlngs)) this.addVertexMarkers(latlngs);
            else for (var i = 0; i < latlngs.length; i++) this.initVertexMarkers(latlngs[i]);
        },

        getLatLngs: function () {
            return this.feature.getLatLngs();
        },

        // 🍂method reset()
        // Rebuild edit elements (Vertex, MiddleMarker, etc.).
        reset: function () {
            this.editLayer.clearLayers();
            this.initVertexMarkers();
        },

        addVertexMarker: function (latlng, latlngs) {
            return new this.tools.options.vertexMarkerClass(latlng, latlngs, this);
        },

        addVertexMarkers: function (latlngs) {
            for (var i = 0; i < latlngs.length; i++) {
                this.addVertexMarker(latlngs[i], latlngs);
            }
        },

        refreshVertexMarkers: function (latlngs) {
            latlngs = latlngs || this.getDefaultLatLngs();
            for (var i = 0; i < latlngs.length; i++) {
                latlngs[i].__vertex.update();
            }
        },

        addMiddleMarker: function (left, right, latlngs) {
            return new this.tools.options.middleMarkerClass(left, right, latlngs, this);
        },

        onVertexMarkerClick: function (e) {
            L.Editable.makeCancellable(e);
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:click: CancelableVertexEvent
            // Fired when a `click` is issued on a vertex, before any internal action is being processed.
            this.fireAndForward('editable:vertex:click', e);
            if (e._cancelled) return;
            if (this.tools.drawing() && this.tools._drawingEditor !== this) return;
            var index = e.vertex.getIndex(), commit;
            if (e.originalEvent.ctrlKey) {
                this.onVertexMarkerCtrlClick(e);
            } else if (e.originalEvent.altKey) {
                this.onVertexMarkerAltClick(e);
            } else if (e.originalEvent.shiftKey) {
                this.onVertexMarkerShiftClick(e);
            } else if (e.originalEvent.metaKey) {
                this.onVertexMarkerMetaKeyClick(e);
            } else if (index === e.vertex.getLastIndex() && this._drawing === L.Editable.FORWARD) {
                if (index >= this.MIN_VERTEX - 1) commit = true;
            } else if (index === 0 && this._drawing === L.Editable.BACKWARD && this._drawnLatLngs.length >= this.MIN_VERTEX) {
                commit = true;
            } else if (index === 0 && this._drawing === L.Editable.FORWARD && this._drawnLatLngs.length >= this.MIN_VERTEX && this.CLOSED) {
                commit = true;  // Allow to close on first point also for polygons
            } else {
                this.onVertexRawMarkerClick(e);
            }
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:clicked: VertexEvent
            // Fired when a `click` is issued on a vertex, after all internal actions.
            this.fireAndForward('editable:vertex:clicked', e);
            if (commit) this.commitDrawing(e);
        },

        onVertexRawMarkerClick: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:rawclick: CancelableVertexEvent
            // Fired when a `click` is issued on a vertex without any special key and without being in drawing mode.
            this.fireAndForward('editable:vertex:rawclick', e);
            if (e._cancelled) return;
            if (!this.vertexCanBeDeleted(e.vertex)) return;
            e.vertex.delete();
        },

        vertexCanBeDeleted: function (vertex) {
            return vertex.latlngs.length > this.MIN_VERTEX;
        },

        onVertexDeleted: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:deleted: VertexEvent
            // Fired after a vertex has been deleted by user.
            this.fireAndForward('editable:vertex:deleted', e);
        },

        onVertexMarkerCtrlClick: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:ctrlclick: VertexEvent
            // Fired when a `click` with `ctrlKey` is issued on a vertex.
            this.fireAndForward('editable:vertex:ctrlclick', e);
        },

        onVertexMarkerShiftClick: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:shiftclick: VertexEvent
            // Fired when a `click` with `shiftKey` is issued on a vertex.
            this.fireAndForward('editable:vertex:shiftclick', e);
        },

        onVertexMarkerMetaKeyClick: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:metakeyclick: VertexEvent
            // Fired when a `click` with `metaKey` is issued on a vertex.
            this.fireAndForward('editable:vertex:metakeyclick', e);
        },

        onVertexMarkerAltClick: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:altclick: VertexEvent
            // Fired when a `click` with `altKey` is issued on a vertex.
            this.fireAndForward('editable:vertex:altclick', e);
        },

        onVertexMarkerContextMenu: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:contextmenu: VertexEvent
            // Fired when a `contextmenu` is issued on a vertex.
            this.fireAndForward('editable:vertex:contextmenu', e);
        },

        onVertexMarkerMouseDown: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:mousedown: VertexEvent
            // Fired when user `mousedown` a vertex.
            this.fireAndForward('editable:vertex:mousedown', e);
        },

        onMiddleMarkerMouseDown: function (e) {
            // 🍂namespace Editable
            // 🍂section MiddleMarker events
            // 🍂event editable:middlemarker:mousedown: VertexEvent
            // Fired when user `mousedown` a middle marker.
            this.fireAndForward('editable:middlemarker:mousedown', e);
        },

        onVertexMarkerDrag: function (e) {
            this.onMove(e);
            if (this.feature._bounds) this.extendBounds(e);
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:drag: VertexEvent
            // Fired when a vertex is dragged by user.
            this.fireAndForward('editable:vertex:drag', e);
        },

        onVertexMarkerDragStart: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:dragstart: VertexEvent
            // Fired before a vertex is dragged by user.
            this.fireAndForward('editable:vertex:dragstart', e);
        },

        onVertexMarkerDragEnd: function (e) {
            // 🍂namespace Editable
            // 🍂section Vertex events
            // 🍂event editable:vertex:dragend: VertexEvent
            // Fired after a vertex is dragged by user.
            this.fireAndForward('editable:vertex:dragend', e);
        },

        setDrawnLatLngs: function (latlngs) {
            this._drawnLatLngs = latlngs || this.getDefaultLatLngs();
        },

        startDrawing: function () {
            if (!this._drawnLatLngs) this.setDrawnLatLngs();
            L.Editable.BaseEditor.prototype.startDrawing.call(this);
        },

        startDrawingForward: function () {
            this.startDrawing();
        },

        endDrawing: function () {
            this.tools.detachForwardLineGuide();
            this.tools.detachBackwardLineGuide();
            if (this._drawnLatLngs && this._drawnLatLngs.length < this.MIN_VERTEX) this.deleteShape(this._drawnLatLngs);
            L.Editable.BaseEditor.prototype.endDrawing.call(this);
            delete this._drawnLatLngs;
        },

        addLatLng: function (latlng) {
            if (this._drawing === L.Editable.FORWARD) this._drawnLatLngs.push(latlng);
            else this._drawnLatLngs.unshift(latlng);
            this.feature._bounds.extend(latlng);
            this.addVertexMarker(latlng, this._drawnLatLngs);
            this.refresh();
        },

        newPointForward: function (latlng) {
            this.addLatLng(latlng);
            this.tools.attachForwardLineGuide();
            this.tools.anchorForwardLineGuide(latlng);
        },

        newPointBackward: function (latlng) {
            this.addLatLng(latlng);
            this.tools.anchorBackwardLineGuide(latlng);
        },

        // 🍂namespace PathEditor
        // 🍂method push()
        // Programmatically add a point while drawing.
        push: function (latlng) {
            if (!latlng) return console.error('L.Editable.PathEditor.push expect a vaild latlng as parameter');
            if (this._drawing === L.Editable.FORWARD) this.newPointForward(latlng);
            else this.newPointBackward(latlng);
        },

        removeLatLng: function (latlng) {
            latlng.__vertex.delete();
            this.refresh();
        },

        // 🍂method pop(): L.LatLng or null
        // Programmatically remove last point (if any) while drawing.
        pop: function () {
            if (this._drawnLatLngs.length <= 1) return;
            var latlng;
            if (this._drawing === L.Editable.FORWARD) latlng = this._drawnLatLngs[this._drawnLatLngs.length - 1];
            else latlng = this._drawnLatLngs[0];
            this.removeLatLng(latlng);
            if (this._drawing === L.Editable.FORWARD) this.tools.anchorForwardLineGuide(this._drawnLatLngs[this._drawnLatLngs.length - 1]);
            else this.tools.anchorForwardLineGuide(this._drawnLatLngs[0]);
            return latlng;
        },

        processDrawingClick: function (e) {
            if (e.vertex && e.vertex.editor === this) return;
            if (this._drawing === L.Editable.FORWARD) this.newPointForward(e.latlng);
            else this.newPointBackward(e.latlng);
            this.fireAndForward('editable:drawing:clicked', e);
        },

        onDrawingMouseMove: function (e) {
            L.Editable.BaseEditor.prototype.onDrawingMouseMove.call(this, e);
            if (this._drawing) {
                this.tools.moveForwardLineGuide(e.latlng);
                this.tools.moveBackwardLineGuide(e.latlng);
            }
        },

        refresh: function () {
            this.feature.redraw();
            this.onEditing();
        },

        // 🍂namespace PathEditor
        // 🍂method newShape(latlng?: L.LatLng)
        // Add a new shape (Polyline, Polygon) in a multi, and setup up drawing tools to draw it;
        // if optional `latlng` is given, start a path at this point.
        newShape: function (latlng) {
            var shape = this.addNewEmptyShape();
            if (!shape) return;
            this.setDrawnLatLngs(shape[0] || shape);  // Polygon or polyline
            this.startDrawingForward();
            // 🍂namespace Editable
            // 🍂section Shape events
            // 🍂event editable:shape:new: ShapeEvent
            // Fired when a new shape is created in a multi (Polygon or Polyline).
            this.fireAndForward('editable:shape:new', {shape: shape});
            if (latlng) this.newPointForward(latlng);
        },

        deleteShape: function (shape, latlngs) {
            var e = {shape: shape};
            L.Editable.makeCancellable(e);
            // 🍂namespace Editable
            // 🍂section Shape events
            // 🍂event editable:shape:delete: CancelableShapeEvent
            // Fired before a new shape is deleted in a multi (Polygon or Polyline).
            this.fireAndForward('editable:shape:delete', e);
            if (e._cancelled) return;
            shape = this._deleteShape(shape, latlngs);
            if (this.ensureNotFlat) this.ensureNotFlat();  // Polygon.
            this.feature.setLatLngs(this.getLatLngs());  // Force bounds reset.
            this.refresh();
            this.reset();
            // 🍂namespace Editable
            // 🍂section Shape events
            // 🍂event editable:shape:deleted: ShapeEvent
            // Fired after a new shape is deleted in a multi (Polygon or Polyline).
            this.fireAndForward('editable:shape:deleted', {shape: shape});
            return shape;
        },

        _deleteShape: function (shape, latlngs) {
            latlngs = latlngs || this.getLatLngs();
            if (!latlngs.length) return;
            var self = this,
                inplaceDelete = function (latlngs, shape) {
                    // Called when deleting a flat latlngs
                    shape = latlngs.splice(0, Number.MAX_VALUE);
                    return shape;
                },
                spliceDelete = function (latlngs, shape) {
                    // Called when removing a latlngs inside an array
                    latlngs.splice(latlngs.indexOf(shape), 1);
                    if (!latlngs.length) self._deleteShape(latlngs);
                    return shape;
                };
            if (latlngs === shape) return inplaceDelete(latlngs, shape);
            for (var i = 0; i < latlngs.length; i++) {
                if (latlngs[i] === shape) return spliceDelete(latlngs, shape);
                else if (latlngs[i].indexOf(shape) !== -1) return spliceDelete(latlngs[i], shape);
            }
        },

        // 🍂namespace PathEditor
        // 🍂method deleteShapeAt(latlng: L.LatLng): Array
        // Remove a path shape at the given `latlng`.
        deleteShapeAt: function (latlng) {
            var shape = this.feature.shapeAt(latlng);
            if (shape) return this.deleteShape(shape);
        },

        // 🍂method appendShape(shape: Array)
        // Append a new shape to the Polygon or Polyline.
        appendShape: function (shape) {
            this.insertShape(shape);
        },

        // 🍂method prependShape(shape: Array)
        // Prepend a new shape to the Polygon or Polyline.
        prependShape: function (shape) {
            this.insertShape(shape, 0);
        },

        // 🍂method insertShape(shape: Array, index: int)
        // Insert a new shape to the Polygon or Polyline at given index (default is to append).
        insertShape: function (shape, index) {
            this.ensureMulti();
            shape = this.formatShape(shape);
            if (typeof index === 'undefined') index = this.feature._latlngs.length;
            this.feature._latlngs.splice(index, 0, shape);
            this.feature.redraw();
            if (this._enabled) this.reset();
        },

        extendBounds: function (e) {
            this.feature._bounds.extend(e.vertex.latlng);
        },

        onDragStart: function (e) {
            this.editLayer.clearLayers();
            L.Editable.BaseEditor.prototype.onDragStart.call(this, e);
        },

        onDragEnd: function (e) {
            this.initVertexMarkers();
            L.Editable.BaseEditor.prototype.onDragEnd.call(this, e);
        }

    });

    // 🍂namespace Editable; 🍂class PolylineEditor; 🍂aka L.Editable.PolylineEditor
    // 🍂inherits PathEditor
    L.Editable.PolylineEditor = L.Editable.PathEditor.extend({

        startDrawingBackward: function () {
            this._drawing = L.Editable.BACKWARD;
            this.startDrawing();
        },

        // 🍂method continueBackward(latlngs?: Array)
        // Set up drawing tools to continue the line backward.
        continueBackward: function (latlngs) {
            if (this.drawing()) return;
            latlngs = latlngs || this.getDefaultLatLngs();
            this.setDrawnLatLngs(latlngs);
            if (latlngs.length > 0) {
                this.tools.attachBackwardLineGuide();
                this.tools.anchorBackwardLineGuide(latlngs[0]);
            }
            this.startDrawingBackward();
        },

        // 🍂method continueForward(latlngs?: Array)
        // Set up drawing tools to continue the line forward.
        continueForward: function (latlngs) {
            if (this.drawing()) return;
            latlngs = latlngs || this.getDefaultLatLngs();
            this.setDrawnLatLngs(latlngs);
            if (latlngs.length > 0) {
                this.tools.attachForwardLineGuide();
                this.tools.anchorForwardLineGuide(latlngs[latlngs.length - 1]);
            }
            this.startDrawingForward();
        },

        getDefaultLatLngs: function (latlngs) {
            latlngs = latlngs || this.feature._latlngs;
            if (!latlngs.length || latlngs[0] instanceof L.LatLng) return latlngs;
            else return this.getDefaultLatLngs(latlngs[0]);
        },

        ensureMulti: function () {
            if (this.feature._latlngs.length && L.Polyline._flat(this.feature._latlngs)) {
                this.feature._latlngs = [this.feature._latlngs];
            }
        },

        addNewEmptyShape: function () {
            if (this.feature._latlngs.length) {
                var shape = [];
                this.appendShape(shape);
                return shape;
            } else {
                return this.feature._latlngs;
            }
        },

        formatShape: function (shape) {
            if (L.Polyline._flat(shape)) return shape;
            else if (shape[0]) return this.formatShape(shape[0]);
        },

        // 🍂method splitShape(latlngs?: Array, index: int)
        // Split the given `latlngs` shape at index `index` and integrate new shape in instance `latlngs`.
        splitShape: function (shape, index) {
            if (!index || index >= shape.length - 1) return;
            this.ensureMulti();
            var shapeIndex = this.feature._latlngs.indexOf(shape);
            if (shapeIndex === -1) return;
            var first = shape.slice(0, index + 1),
                second = shape.slice(index);
            // We deal with reference, we don't want twice the same latlng around.
            second[0] = L.latLng(second[0].lat, second[0].lng, second[0].alt);
            this.feature._latlngs.splice(shapeIndex, 1, first, second);
            this.refresh();
            this.reset();
        }

    });

    // 🍂namespace Editable; 🍂class PolygonEditor; 🍂aka L.Editable.PolygonEditor
    // 🍂inherits PathEditor
    L.Editable.PolygonEditor = L.Editable.PathEditor.extend({

        CLOSED: true,
        MIN_VERTEX: 3,

        newPointForward: function (latlng) {
            L.Editable.PathEditor.prototype.newPointForward.call(this, latlng);
            if (!this.tools.backwardLineGuide._latlngs.length) this.tools.anchorBackwardLineGuide(latlng);
            if (this._drawnLatLngs.length === 2) this.tools.attachBackwardLineGuide();
        },

        addNewEmptyHole: function (latlng) {
            this.ensureNotFlat();
            var latlngs = this.feature.shapeAt(latlng);
            if (!latlngs) return;
            var holes = [];
            latlngs.push(holes);
            return holes;
        },

        // 🍂method newHole(latlng?: L.LatLng, index: int)
        // Set up drawing tools for creating a new hole on the Polygon. If the `latlng` param is given, a first point is created.
        newHole: function (latlng) {
            var holes = this.addNewEmptyHole(latlng);
            if (!holes) return;
            this.setDrawnLatLngs(holes);
            this.startDrawingForward();
            if (latlng) this.newPointForward(latlng);
        },

        addNewEmptyShape: function () {
            if (this.feature._latlngs.length && this.feature._latlngs[0].length) {
                var shape = [];
                this.appendShape(shape);
                return shape;
            } else {
                return this.feature._latlngs;
            }
        },

        ensureMulti: function () {
            if (this.feature._latlngs.length && L.Polyline._flat(this.feature._latlngs[0])) {
                this.feature._latlngs = [this.feature._latlngs];
            }
        },

        ensureNotFlat: function () {
            if (!this.feature._latlngs.length || L.Polyline._flat(this.feature._latlngs)) this.feature._latlngs = [this.feature._latlngs];
        },

        vertexCanBeDeleted: function (vertex) {
            var parent = this.feature.parentShape(vertex.latlngs),
                idx = L.Util.indexOf(parent, vertex.latlngs);
            if (idx > 0) return true;  // Holes can be totally deleted without removing the layer itself.
            return L.Editable.PathEditor.prototype.vertexCanBeDeleted.call(this, vertex);
        },

        getDefaultLatLngs: function () {
            if (!this.feature._latlngs.length) this.feature._latlngs.push([]);
            return this.feature._latlngs[0];
        },

        formatShape: function (shape) {
            // [[1, 2], [3, 4]] => must be nested
            // [] => must be nested
            // [[]] => is already nested
            if (L.Polyline._flat(shape) && (!shape[0] || shape[0].length !== 0)) return [shape];
            else return shape;
        }

    });

    // 🍂namespace Editable; 🍂class RectangleEditor; 🍂aka L.Editable.RectangleEditor
    // 🍂inherits PathEditor
    L.Editable.RectangleEditor = L.Editable.PathEditor.extend({

        CLOSED: true,
        MIN_VERTEX: 4,

        options: {
            skipMiddleMarkers: true
        },

        extendBounds: function (e) {
            var index = e.vertex.getIndex(),
                next = e.vertex.getNext(),
                previous = e.vertex.getPrevious(),
                oppositeIndex = (index + 2) % 4,
                opposite = e.vertex.latlngs[oppositeIndex],
                bounds = new L.LatLngBounds(e.latlng, opposite);
            // Update latlngs by hand to preserve order.
            previous.latlng.update([e.latlng.lat, opposite.lng]);
            next.latlng.update([opposite.lat, e.latlng.lng]);
            this.updateBounds(bounds);
            this.refreshVertexMarkers();
        },

        onDrawingMouseDown: function (e) {
            L.Editable.PathEditor.prototype.onDrawingMouseDown.call(this, e);
            this.connect();
            var latlngs = this.getDefaultLatLngs();
            // L.Polygon._convertLatLngs removes last latlng if it equals first point,
            // which is the case here as all latlngs are [0, 0]
            if (latlngs.length === 3) latlngs.push(e.latlng);
            var bounds = new L.LatLngBounds(e.latlng, e.latlng);
            this.updateBounds(bounds);
            this.updateLatLngs(bounds);
            this.refresh();
            this.reset();
            // Stop dragging map.
            // L.Draggable has two workflows:
            // - mousedown => mousemove => mouseup
            // - touchstart => touchmove => touchend
            // Problem: L.Map.Tap does not allow us to listen to touchstart, so we only
            // can deal with mousedown, but then when in a touch device, we are dealing with
            // simulated events (actually simulated by L.Map.Tap), which are no more taken
            // into account by L.Draggable.
            // Ref.: https://github.com/Leaflet/Leaflet.Editable/issues/103
            e.originalEvent._simulated = false;
            this.map.dragging._draggable._onUp(e.originalEvent);
            // Now transfer ongoing drag action to the bottom right corner.
            // Should we refine which corne will handle the drag according to
            // drag direction?
            latlngs[3].__vertex.dragging._draggable._onDown(e.originalEvent);
        },

        onDrawingMouseUp: function (e) {
            this.commitDrawing(e);
            e.originalEvent._simulated = false;
            L.Editable.PathEditor.prototype.onDrawingMouseUp.call(this, e);
        },

        onDrawingMouseMove: function (e) {
            e.originalEvent._simulated = false;
            L.Editable.PathEditor.prototype.onDrawingMouseMove.call(this, e);
        },


        getDefaultLatLngs: function (latlngs) {
            return latlngs || this.feature._latlngs[0];
        },

        updateBounds: function (bounds) {
            this.feature._bounds = bounds;
        },

        updateLatLngs: function (bounds) {
            var latlngs = this.getDefaultLatLngs(),
                newLatlngs = this.feature._boundsToLatLngs(bounds);
            // Keep references.
            for (var i = 0; i < latlngs.length; i++) {
                latlngs[i].update(newLatlngs[i]);
            };
        }

    });

    // 🍂namespace Editable; 🍂class CircleEditor; 🍂aka L.Editable.CircleEditor
    // 🍂inherits PathEditor
    L.Editable.CircleEditor = L.Editable.PathEditor.extend({

        MIN_VERTEX: 2,

        options: {
            skipMiddleMarkers: true
        },

        initialize: function (map, feature, options) {
            L.Editable.PathEditor.prototype.initialize.call(this, map, feature, options);
            this._resizeLatLng = this.computeResizeLatLng();
        },

        computeResizeLatLng: function () {
            // While circle is not added to the map, _radius is not set.
            var delta = (this.feature._radius || this.feature._mRadius) * Math.cos(Math.PI / 4),
                point = this.map.project(this.feature._latlng);
            return this.map.unproject([point.x + delta, point.y - delta]);
        },

        updateResizeLatLng: function () {
            this._resizeLatLng.update(this.computeResizeLatLng());
            this._resizeLatLng.__vertex.update();
        },

        getLatLngs: function () {
            return [this.feature._latlng, this._resizeLatLng];
        },

        getDefaultLatLngs: function () {
            return this.getLatLngs();
        },

        onVertexMarkerDrag: function (e) {
            if (e.vertex.getIndex() === 1) this.resize(e);
            else this.updateResizeLatLng(e);
            L.Editable.PathEditor.prototype.onVertexMarkerDrag.call(this, e);
        },

        resize: function (e) {
            var radius = this.feature._latlng.distanceTo(e.latlng)
            this.feature.setRadius(radius);
        },

        onDrawingMouseDown: function (e) {
            L.Editable.PathEditor.prototype.onDrawingMouseDown.call(this, e);
            this._resizeLatLng.update(e.latlng);
            this.feature._latlng.update(e.latlng);
            this.connect();
            // Stop dragging map.
            e.originalEvent._simulated = false;
            this.map.dragging._draggable._onUp(e.originalEvent);
            // Now transfer ongoing drag action to the radius handler.
            this._resizeLatLng.__vertex.dragging._draggable._onDown(e.originalEvent);
        },

        onDrawingMouseUp: function (e) {
            this.commitDrawing(e);
            e.originalEvent._simulated = false;
            L.Editable.PathEditor.prototype.onDrawingMouseUp.call(this, e);
        },

        onDrawingMouseMove: function (e) {
            e.originalEvent._simulated = false;
            L.Editable.PathEditor.prototype.onDrawingMouseMove.call(this, e);
        },

        onDrag: function (e) {
            L.Editable.PathEditor.prototype.onDrag.call(this, e);
            this.feature.dragging.updateLatLng(this._resizeLatLng);
        }

    });

    // 🍂namespace Editable; 🍂class EditableMixin
    // `EditableMixin` is included to `L.Polyline`, `L.Polygon`, `L.Rectangle`, `L.Circle`
    // and `L.Marker`. It adds some methods to them.
    // *When editing is enabled, the editor is accessible on the instance with the
    // `editor` property.*
    var EditableMixin = {

        createEditor: function (map) {
            map = map || this._map;
            var tools = (this.options.editOptions || {}).editTools || map.editTools;
            if (!tools) throw Error('Unable to detect Editable instance.')
            var Klass = this.options.editorClass || this.getEditorClass(tools);
            return new Klass(map, this, this.options.editOptions);
        },

        // 🍂method enableEdit(map?: L.Map): this.editor
        // Enable editing, by creating an editor if not existing, and then calling `enable` on it.
        enableEdit: function (map) {
            if (!this.editor) this.createEditor(map);
            this.editor.enable();
            return this.editor;
        },

        // 🍂method editEnabled(): boolean
        // Return true if current instance has an editor attached, and this editor is enabled.
        editEnabled: function () {
            return this.editor && this.editor.enabled();
        },

        // 🍂method disableEdit()
        // Disable editing, also remove the editor property reference.
        disableEdit: function () {
            if (this.editor) {
                this.editor.disable();
                delete this.editor;
            }
        },

        // 🍂method toggleEdit()
        // Enable or disable editing, according to current status.
        toggleEdit: function () {
            if (this.editEnabled()) this.disableEdit();
            else this.enableEdit();
        },

        _onEditableAdd: function () {
            if (this.editor) this.enableEdit();
        }

    };

    var PolylineMixin = {

        getEditorClass: function (tools) {
            return (tools && tools.options.polylineEditorClass) ? tools.options.polylineEditorClass : L.Editable.PolylineEditor;
        },

        shapeAt: function (latlng, latlngs) {
            // We can have those cases:
            // - latlngs are just a flat array of latlngs, use this
            // - latlngs is an array of arrays of latlngs, loop over
            var shape = null;
            latlngs = latlngs || this._latlngs;
            if (!latlngs.length) return shape;
            else if (L.Polyline._flat(latlngs) && this.isInLatLngs(latlng, latlngs)) shape = latlngs;
            else for (var i = 0; i < latlngs.length; i++) if (this.isInLatLngs(latlng, latlngs[i])) return latlngs[i];
            return shape;
        },

        isInLatLngs: function (l, latlngs) {
            if (!latlngs) return false;
            var i, k, len, part = [], p,
                w = this._clickTolerance();
            this._projectLatlngs(latlngs, part, this._pxBounds);
            part = part[0];
            p = this._map.latLngToLayerPoint(l);

            if (!this._pxBounds.contains(p)) { return false; }
            for (i = 1, len = part.length, k = 0; i < len; k = i++) {

                if (L.LineUtil.pointToSegmentDistance(p, part[k], part[i]) <= w) {
                    return true;
                }
            }
            return false;
        }

    };

    var PolygonMixin = {

        getEditorClass: function (tools) {
            return (tools && tools.options.polygonEditorClass) ? tools.options.polygonEditorClass : L.Editable.PolygonEditor;
        },

        shapeAt: function (latlng, latlngs) {
            // We can have those cases:
            // - latlngs are just a flat array of latlngs, use this
            // - latlngs is an array of arrays of latlngs, this is a simple polygon (maybe with holes), use the first
            // - latlngs is an array of arrays of arrays, this is a multi, loop over
            var shape = null;
            latlngs = latlngs || this._latlngs;
            if (!latlngs.length) return shape;
            else if (L.Polyline._flat(latlngs) && this.isInLatLngs(latlng, latlngs)) shape = latlngs;
            else if (L.Polyline._flat(latlngs[0]) && this.isInLatLngs(latlng, latlngs[0])) shape = latlngs;
            else for (var i = 0; i < latlngs.length; i++) if (this.isInLatLngs(latlng, latlngs[i][0])) return latlngs[i];
            return shape;
        },

        isInLatLngs: function (l, latlngs) {
            var inside = false, l1, l2, j, k, len2;

            for (j = 0, len2 = latlngs.length, k = len2 - 1; j < len2; k = j++) {
                l1 = latlngs[j];
                l2 = latlngs[k];

                if (((l1.lat > l.lat) !== (l2.lat > l.lat)) &&
                        (l.lng < (l2.lng - l1.lng) * (l.lat - l1.lat) / (l2.lat - l1.lat) + l1.lng)) {
                    inside = !inside;
                }
            }

            return inside;
        },

        parentShape: function (shape, latlngs) {
            latlngs = latlngs || this._latlngs;
            if (!latlngs) return;
            var idx = L.Util.indexOf(latlngs, shape);
            if (idx !== -1) return latlngs;
            for (var i = 0; i < latlngs.length; i++) {
                idx = L.Util.indexOf(latlngs[i], shape);
                if (idx !== -1) return latlngs[i];
            }
        }

    };


    var MarkerMixin = {

        getEditorClass: function (tools) {
            return (tools && tools.options.markerEditorClass) ? tools.options.markerEditorClass : L.Editable.MarkerEditor;
        }

    };

    var RectangleMixin = {

        getEditorClass: function (tools) {
            return (tools && tools.options.rectangleEditorClass) ? tools.options.rectangleEditorClass : L.Editable.RectangleEditor;
        }

    };

    var CircleMixin = {

        getEditorClass: function (tools) {
            return (tools && tools.options.circleEditorClass) ? tools.options.circleEditorClass : L.Editable.CircleEditor;
        }

    };

    var keepEditable = function () {
        // Make sure you can remove/readd an editable layer.
        this.on('add', this._onEditableAdd);
    };



    if (L.Polyline) {
        L.Polyline.include(EditableMixin);
        L.Polyline.include(PolylineMixin);
        L.Polyline.addInitHook(keepEditable);
    }
    if (L.Polygon) {
        L.Polygon.include(EditableMixin);
        L.Polygon.include(PolygonMixin);
    }
    if (L.Marker) {
        L.Marker.include(EditableMixin);
        L.Marker.include(MarkerMixin);
        L.Marker.addInitHook(keepEditable);
    }
    if (L.Rectangle) {
        L.Rectangle.include(EditableMixin);
        L.Rectangle.include(RectangleMixin);
    }
    if (L.Circle) {
        L.Circle.include(EditableMixin);
        L.Circle.include(CircleMixin);
    }

    L.LatLng.prototype.update = function (latlng) {
        latlng = L.latLng(latlng);
        this.lat = latlng.lat;
        this.lng = latlng.lng;
    }

}, window));

/*
	Leaflet.contextmenu, a context menu for Leaflet.
	(c) 2015, Adam Ratcliffe, GeoSmart Maps Limited
       
        @preserve
*/

(function(factory) {
	// Packaging/modules magic dance
	var L;
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['leaflet'], factory);
	} else if (typeof module !== 'undefined') {
		// Node/CommonJS
		L = require('leaflet');
		module.exports = factory(L);
	} else {
		// Browser globals
		if (typeof window.L === 'undefined') {
			throw new Error('Leaflet must be loaded first');
		}
		factory(window.L);
	}
})(function(L) {
L.Map.mergeOptions({
	contextmenuItems: []
});

L.Map.ContextMenu = L.Handler.extend({

	_touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',

	statics: {
		BASE_CLS: 'leaflet-contextmenu'
	},
	runCallFunc:[],
	initialize: function (map) {
		L.Handler.prototype.initialize.call(this, map);

		this._items = [];
		this._visible = false;

		var container = this._container = L.DomUtil.create('div', L.Map.ContextMenu.BASE_CLS, map._container);
		container.style.zIndex = 10000;
		container.style.position = 'absolute';

		if (map.options.contextmenuWidth) {
			container.style.width = map.options.contextmenuWidth + 'px';
		}
		
		this._createItems();

		L.DomEvent
			.on(container, 'click', L.DomEvent.stop)
			.on(container, 'mousedown', L.DomEvent.stop)
			.on(container, 'dblclick', L.DomEvent.stop)
			.on(container, 'contextmenu', L.DomEvent.stop);
	},

	addHooks: function () {
        var container = this._map.getContainer();
        
		L.DomEvent
            .on(container, 'mouseleave', this._hide, this)
			.on(document, 'keydown', this._onKeyDown, this);

        if (L.Browser.touch) {
            L.DomEvent.on(document, this._touchstart, this._hide, this);
        }
        
		this._map.on({
			contextmenu: this._show,
			mousedown: this._hide,
			movestart: this._hide,
			zoomstart: this._hide
		}, this);
	},

	removeHooks: function () {
        var container = this._map.getContainer();
        
		L.DomEvent
            .off(container, 'mouseleave', this._hide, this)			
			.off(document, 'keydown', this._onKeyDown, this);

        if (L.Browser.touch) {
            L.DomEvent.off(document, this._touchstart, this._hide, this);
        }        

		this._map.off({
			contextmenu: this._show,
			mousedown: this._hide,
			movestart: this._hide,
			zoomstart: this._hide
		}, this);
	},

	showAt: function (point, data) {
		if (point instanceof L.LatLng) {
			point = this._map.latLngToContainerPoint(point);
		}
		this._showAtPoint(point, data);
	},

	hide: function () {
		this._hide();
	},

	addItem: function (options) {
		return this.insertItem(options);
	},

	insertItem: function (options, index) {
		index = index !== undefined ? index: this._items.length; 

		var item = this._createItem(this._container, options, index);
		
		this._items.push(item);

		this._sizeChanged = true;

		this._map.fire('contextmenu.additem', {
			contextmenu: this,
			el: item.el,
			index: index
		});

		return item.el;
	},

	removeItem: function (item) {
		var container = this._container;

		if (!isNaN(item)) {
			item = container.children[item];
		}

		if (item) {
			this._removeItem(L.Util.stamp(item));

			this._sizeChanged = true;

			this._map.fire('contextmenu.removeitem', {
				contextmenu: this,
				el: item
			});
		}		
	},

	removeAllItems: function () {
		var item;

		while (this._container.children.length) {
			item = this._container.children[0];
			this._removeItem(L.Util.stamp(item));
		}
	},

	hideAllItems: function () {
		var item, i, l;

		for (i = 0, l = this._items.length; i < l; i++) {
			item = this._items[i];
			item.el.style.display = 'none';
		}
	},

	showAllItems: function () {
		var item, i, l;

		for (i = 0, l = this._items.length; i < l; i++) {
			item = this._items[i];
			item.el.style.display = '';
		}		
	},

	setDisabled: function (item, disabled) {
		var container = this._container,
		itemCls = L.Map.ContextMenu.BASE_CLS + '-item';

		if (!isNaN(item)) {
			item = container.children[item];
		}

		if (item && L.DomUtil.hasClass(item, itemCls)) {
			if (disabled) {
				L.DomUtil.addClass(item, itemCls + '-disabled');
				this._map.fire('contextmenu.disableitem', {
					contextmenu: this,
					el: item
				});
			} else {
				L.DomUtil.removeClass(item, itemCls + '-disabled');
				this._map.fire('contextmenu.enableitem', {
					contextmenu: this,
					el: item
				});
			}			
		}
	},

	isVisible: function () {
		return this._visible;
	},

	_createItems: function () {
		var itemOptions = this._map.options.contextmenuItems,
		    item,
		    i, l;

		for (i = 0, l = itemOptions.length; i < l; i++) {
			this._items.push(this._createItem(this._container, itemOptions[i]));
		}
	},

	_createItem: function (container, options, index) {
		if (options.separator || options === '-') {
			return this._createSeparator(container, index);
		}

		var itemCls = L.Map.ContextMenu.BASE_CLS + '-item', 
		    cls = options.disabled ? (itemCls + ' ' + itemCls + '-disabled') : itemCls;
	        if(options.hasOwnProperty('className')){
		    cls = cls + ' ' + options.className;
		} 
		var el = this._insertElementAt('a', cls, container, index),
		callback = this._createEventHandler(el, options.callback, options.context, options.hideOnSelect),
		html = '';
		if(options.hasOwnProperty('runCall')){
	            this.runCallFunc.push(options.runCall);
	        }		
		if (options.icon) {
			html = '<img class="' + L.Map.ContextMenu.BASE_CLS + '-icon" src="' + options.icon + '"/>';
		} else if (options.iconCls) {
			html = '<span class="' + L.Map.ContextMenu.BASE_CLS + '-icon ' + options.iconCls + '"></span>';
		}

		if(typeof options.text === 'object'){
	            el.innerHTML = html;
	            el.appendChild(options.text);
	        }else {
	            el.innerHTML = html + options.text;
	        }		
		el.href = '#';

		L.DomEvent
			.on(el, 'mouseover', this._onItemMouseOver, this)
			.on(el, 'mouseout', this._onItemMouseOut, this)
			.on(el, 'mousedown', L.DomEvent.stopPropagation)
			.on(el, 'click', callback);

        if (L.Browser.touch) {
            L.DomEvent.on(el, this._touchstart, L.DomEvent.stopPropagation);
        }

		return {
			id: L.Util.stamp(el),
			el: el,
			callback: callback
		};
	},

	_removeItem: function (id) {
		var item,
		    el,
		    i, l, callback;

		for (i = 0, l = this._items.length; i < l; i++) {
			item = this._items[i];

			if (item.id === id) {
				el = item.el;
				callback = item.callback;

				if (callback) {
					L.DomEvent
						.off(el, 'mouseover', this._onItemMouseOver, this)
						.off(el, 'mouseover', this._onItemMouseOut, this)
						.off(el, 'mousedown', L.DomEvent.stopPropagation)
						.off(el, 'click', callback);

                    if (L.Browser.touch) {
                        L.DomEvent.off(el, this._touchstart, L.DomEvent.stopPropagation);
                    }
				}
				
				this._container.removeChild(el);
				this._items.splice(i, 1);

				return item;
			}
		}
		return null;
	},

	_createSeparator: function (container, index) {
		var el = this._insertElementAt('div', L.Map.ContextMenu.BASE_CLS + '-separator', container, index);
		
		return {
			id: L.Util.stamp(el),
			el: el
		};
	},

	_createEventHandler: function (el, func, context, hideOnSelect) {
		var me = this,
		    map = this._map,
		    disabledCls = L.Map.ContextMenu.BASE_CLS + '-item-disabled',
		    hideOnSelect = (hideOnSelect !== undefined) ? hideOnSelect : true;
		
		return function (e) {
			if (L.DomUtil.hasClass(el, disabledCls)) {
				return;
			}
			
			if (hideOnSelect) {
				me._hide();			
			}

			if (func) {
				func.call(context || map, me._showLocation);			
			}

			me._map.fire('contextmenu:select', {
				contextmenu: me,
				el: el
			});
		};
	},

	_insertElementAt: function (tagName, className, container, index) {
		var refEl,
		    el = document.createElement(tagName);

		el.className = className;

		if (index !== undefined) {
			refEl = container.children[index];
		}

		if (refEl) {
			container.insertBefore(el, refEl);
		} else {
			container.appendChild(el);
		}

		return el;
	},

	_show: function (e) {
	var _this = this;
        //this._showAtPoint(e.containerPoint, e);
        for(var i = 0, l=this.runCallFunc.length; i<l; i++){
            this.runCallFunc[i](e);
        }
        _this.tempE = e;
        setTimeout(function(){
            _this._showAtPoint(_this.tempE.containerPoint);
        },100);
        if(_this.circleMarker){
            _this._map.removeLayer(_this.circleMarker);
        }        
        _this.circleMarker = L.circleMarker(e.latlng, { fillColor: "#cb0000",fillOpacity:1,weight:1, color:"#fff", radius: 3,  opacity:1 }).addTo(this._map);
	},

	_showAtPoint: function (pt, data) {
		if (this._items.length) {
			var map = this._map,
			layerPoint = map.containerPointToLayerPoint(pt),
			latlng = map.layerPointToLatLng(layerPoint),
			event = L.extend(data || {}, {contextmenu: this});
			
			this._showLocation = {
				latlng: latlng,
				layerPoint: layerPoint,
				containerPoint: pt
			};

			if(data && data.relatedTarget){
				this._showLocation.relatedTarget = data.relatedTarget;
			}

			this._setPosition(pt);			

			if (!this._visible) {
				this._container.style.display = 'block';							
				this._visible = true;							
			} else {
				this._setPosition(pt);			
			}

			this._map.fire('contextmenu.show', event);
		}
	},

	_hide: function () {        
		if (this._visible) {
			this._visible = false;
			this._container.style.display = 'none';
			this._map.fire('contextmenu.hide', {contextmenu: this});
			this._map.removeLayer(this.circleMarker);
		}
	},

	_setPosition: function (pt) {
		var mapSize = this._map.getSize(),
		    container = this._container,
		    containerSize = this._getElementSize(container),
		    anchor;

		if (this._map.options.contextmenuAnchor) {
			anchor = L.point(this._map.options.contextmenuAnchor);
			pt = pt.add(anchor);
		}

		container._leaflet_pos = pt;

		if (pt.x + containerSize.x > mapSize.x) {
			container.style.left = 'auto';
			container.style.right = Math.max(mapSize.x - pt.x, 0) + 'px';
		} else {
			container.style.left = Math.max(pt.x, 0) + 'px';
			container.style.right = 'auto';
		}
		
		if (pt.y + containerSize.y > mapSize.y) {
			container.style.top = 'auto';
			container.style.bottom = Math.max(mapSize.y - pt.y, 0) + 'px';
		} else {
			container.style.top = Math.max(pt.y, 0) + 'px';
			container.style.bottom = 'auto';
		}
	},

	_getElementSize: function (el) {		
		var size = this._size,
		    initialDisplay = el.style.display;

		if (!size || this._sizeChanged) {
			size = {};

			el.style.left = '-999999px';
			el.style.right = 'auto';
			el.style.display = 'block';
			
			size.x = el.offsetWidth;
			size.y = el.offsetHeight;
			
			el.style.left = 'auto';
			el.style.display = initialDisplay;
			
			this._sizeChanged = false;
		}

		return size;
	},

	_onKeyDown: function (e) {
		var key = e.keyCode;

		// If ESC pressed and context menu is visible hide it 
		if (key === 27) {
			this._hide();
		}
	},

	_onItemMouseOver: function (e) {
		L.DomUtil.addClass(e.target || e.srcElement, 'over');
	},

	_onItemMouseOut: function (e) {
		L.DomUtil.removeClass(e.target || e.srcElement, 'over');
	}
});

L.Map.addInitHook('addHandler', 'contextmenu', L.Map.ContextMenu);
L.Mixin.ContextMenu = {

	bindContextMenu: function (options) {
		L.setOptions(this, options);
		this._initContextMenu();

		return this;
	},

	unbindContextMenu: function (){
		this.off('contextmenu', this._showContextMenu, this);

		return this;
	},

	addContextMenuItem: function (item) {
			this.options.contextmenuItems.push(item);
	},

	removeContextMenuItemWithIndex: function (index) {
		  var items = [];
			for (var i = 0; i < this.options.contextmenuItems.length; i++) {
					if(this.options.contextmenuItems[i].index == index){
							items.push(i);
					}
			}
			var elem = items.pop();
			while (elem !== undefined) {
				  this.options.contextmenuItems.splice(elem,1);
					elem = items.pop();
		  }
	},

	replaceConextMenuItem: function (item) {
		  this.removeContextMenuItemWithIndex(item.index);
		  this.addContextMenuItem(item);
	},

	_initContextMenu: function () {
		this._items = [];
	
		this.on('contextmenu', this._showContextMenu, this);
	},

	_showContextMenu: function (e) {
		var itemOptions,
		    data, pt, i, l;

		if (this._map.contextmenu) {
            data = L.extend({relatedTarget: this}, e)
            
			pt = this._map.mouseEventToContainerPoint(e.originalEvent);

			if (!this.options.contextmenuInheritItems) {
				this._map.contextmenu.hideAllItems();
			}

			for (i = 0, l = this.options.contextmenuItems.length; i < l; i++) {
				itemOptions = this.options.contextmenuItems[i];
				this._items.push(this._map.contextmenu.insertItem(itemOptions, itemOptions.index));
			}

			this._map.once('contextmenu.hide', this._hideContextMenu, this);
		
			this._map.contextmenu.showAt(pt, data);
		}
	},

	_hideContextMenu: function () {
		var i, l;

		for (i = 0, l = this._items.length; i < l; i++) {
			this._map.contextmenu.removeItem(this._items[i]);
		}
		this._items.length = 0;		

		if (!this.options.contextmenuInheritItems) {
			this._map.contextmenu.showAllItems();
		}
	}	
};

var classes = [L.Marker, L.Path],
    defaultOptions = {
		contextmenu: false,
		contextmenuItems: [],
	    contextmenuInheritItems: true
	},
    cls, i, l;

for (i = 0, l = classes.length; i < l; i++) {
	cls = classes[i];

	// L.Class should probably provide an empty options hash, as it does not test
	// for it here and add if needed
	if (!cls.prototype.options) {
		cls.prototype.options = defaultOptions;
	} else {
		cls.mergeOptions(defaultOptions);
	}

	cls.addInitHook(function () {
		if (this.options.contextmenu) {
			this._initContextMenu();
		}
	});

	cls.include(L.Mixin.ContextMenu);
}
	return L.Map.ContextMenu;
	});

/**
 * Semicircle extension for L.Circle.
 * Jan Pieter Waagmeester <jieter@jieter.nl>
 *
 * This version is tested with leaflet 1.0.2
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof window.L === 'undefined') {
            throw 'Leaflet must be loaded first';
        }
        factory(window.L);
    }
})(function (L) {
    var DEG_TO_RAD = Math.PI / 180;

    // make sure 0 degrees is up (North) and convert to radians.
    function fixAngle (angle) {
        return (angle - 90) * DEG_TO_RAD;
    }

    // rotate point [x + r, y+r] around [x, y] by `angle` radians.
    function rotated (p, angle, r) {
        return p.add(
            L.point(Math.cos(angle), Math.sin(angle)).multiplyBy(r)
        );
    }

    L.Point.prototype.rotated = function (angle, r) {
        return rotated(this, angle, r);
    };

    L.Circle = L.Circle.extend({
        options: {
            startAngle: 0,
            stopAngle: 359.9999999999999999999999
        },

        startAngle: function () {
            if (this.options.startAngle < this.options.stopAngle) {
                return fixAngle(this.options.startAngle);
            } else {
                return fixAngle(this.options.stopAngle);
            }
        },
        stopAngle: function () {
            if (this.options.startAngle < this.options.stopAngle) {
                return fixAngle(this.options.stopAngle);
            } else {
                return fixAngle(this.options.startAngle);
            }
        },

        setStartAngle: function (angle) {
            this.options.startAngle = angle;
            return this.redraw();
        },

        setStopAngle: function (angle) {
            this.options.stopAngle = angle;
            return this.redraw();
        },

        setDirection: function (direction, degrees) {
            if (degrees === undefined) {
                degrees = 10;
            }
            this.options.startAngle = direction - (degrees / 2);
            this.options.stopAngle = direction + (degrees / 2);

            return this.redraw();
        },
        getDirection: function () {
            return this.stopAngle() - (this.stopAngle() - this.startAngle()) / 2;
        },

        isSemicircle: function () {
            var startAngle = this.options.startAngle,
                stopAngle = this.options.stopAngle;

            return (
                !(startAngle === 0 && stopAngle > 359) &&
                !(startAngle == stopAngle)
            );
        },
        _containsPoint: function (p) {
            function normalize (angle) {
                while (angle <= -Math.PI) {
                    angle += 2.0 * Math.PI;
                }
                while (angle > Math.PI) {
                    angle -= 2.0 * Math.PI;
                }
                return angle;
            }
            var angle = Math.atan2(p.y - this._point.y, p.x - this._point.x);
            var nStart = normalize(this.startAngle());
            var nStop = normalize(this.stopAngle());
            if (nStop <= nStart) {
                nStop += 2.0 * Math.PI;
            }
            if (angle <= nStart) {
                angle += 2.0 * Math.PI;
            }
            return (
                nStart < angle && angle <= nStop &&
                p.distanceTo(this._point) <= this._radius + this._clickTolerance()
            );
        }
    });

    //var _updateCircleSVG = L.SVG.prototype._updateCircle;
    var _updateCircleCanvas = L.Canvas.prototype._updateCircle;

    /*L.SVG.include({
        _updateCircle: function (layer) {
            // If we want a circle, we use the original function
            if (!layer.isSemicircle()) {
                return _updateCircleSVG.call(this, layer);
            }
            if (layer._empty()) {
                return this._setPath(layer, 'M0 0');
            }

            var p = layer._point,
                r = layer._radius,
                r2 = Math.round(layer._radiusY || r),
                start = p.rotated(layer.startAngle(), r),
                end = p.rotated(layer.stopAngle(), r);

            var largeArc = (layer.options.stopAngle - layer.options.startAngle >= 180) ? '1' : '0';

            var d = 'M' + p.x + ',' + p.y +
                // line to first start point
                'L' + start.x + ',' + start.y +
                'A ' + r + ',' + r2 + ',0,' + largeArc + ',1,' + end.x + ',' + end.y +
                ' z';

            this._setPath(layer, d);
        }
    });*/

    L.Canvas.include({
        _updateCircle: function (layer) {
            // If we want a circle, we use the original function
            if (!layer.isSemicircle()) {
                return _updateCircleCanvas.call(this, layer);
            }

            var p = layer._point,
                ctx = this._ctx,
                r = layer._radius,
                s = (layer._radiusY || r) / r,
                start = p.rotated(layer.startAngle(), r);

            this._drawnLayers[layer._leaflet_id] = layer;

            if (s !== 1) {
                ctx.save();
                ctx.scale(1, s);
            }

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(start.x, start.y);
            ctx.arc(p.x, p.y, r, layer.startAngle(), layer.stopAngle());
            ctx.lineTo(p.x, p.y);

            if (s !== 1) {
                ctx.restore();
            }

            this._fillStroke(ctx, layer);
        }
    });

    // L.CircleMarker inherits from L.Circle before the Semicircle stuff is
    // added. The renderers test if the layer is a semicircle with a function
    // isSemicircle, so add that to L.CircleMarker to make sure we can still
    // make L.CircleMarkers.
    L.CircleMarker = L.CircleMarker.extend({
        isSemicircle: function () { return false; }
    });
});

;
(function(window, document, undefined) {

    /**
     * 
     * 2D坐标转3D视角中心点
     */
     function latlngsTo3DViewCenter(mapState){
        var RoraTilt = ((map23DData.view.tilt)/180)*Math.PI;
        var gausscenter = coordn_to_gauss([mapState.center.lng,mapState.center.lat],mapState.zoom);
        var h = map23DData.view.distance;
        var heading3D = -map23DData.view.heading;
        if(heading3D > 180){
          heading3D = heading3D%180 - 180;
        }else if(heading3D < -180){
          heading3D = 180 + heading3D%180;
        }
        if(-90 < heading3D && heading3D <= 0){
            var RoraHead = Math.abs(map23DData.view.heading/180*Math.PI);
            gausscenter[1] = gausscenter[1]- h*Math.sin(RoraTilt)*Math.cos(RoraHead);
            gausscenter[0] = gausscenter[0] + h*Math.sin(RoraTilt)*Math.sin(RoraHead);
            var mapsetlatlng = gaussToGeo(gausscenter[0],gausscenter[1],mapState.center.lng,mapState.zoom);
        }else if(-180 <= heading3D && heading3D <= -90){
            var RoraHead = Math.abs((map23DData.view.heading + 180)/180*Math.PI);
            gausscenter[1] = gausscenter[1]+ h*Math.sin(RoraTilt)*Math.cos(RoraHead);
            gausscenter[0] = gausscenter[0] - h*Math.sin(RoraTilt)*Math.sin(RoraHead);
            var mapsetlatlng = gaussToGeo(gausscenter[0],gausscenter[1],mapState.center.lng,mapState.zoom);
        }else if(0 < heading3D && heading3D <= 90){
            var RoraHead = Math.abs(map23DData.view.heading/180*Math.PI);
            gausscenter[1] = gausscenter[1] - h*Math.sin(RoraTilt)*Math.cos(RoraHead);
            gausscenter[0] = gausscenter[0] - h*Math.sin(RoraTilt)*Math.sin(RoraHead);
            var mapsetlatlng = gaussToGeo(gausscenter[0],gausscenter[1],mapState.center.lng,mapState.zoom);
        }else if(90 < heading3D && heading3D <= 180){
            var RoraHead = Math.abs((180 - map23DData.view.heading)/180*Math.PI);
            gausscenter[1] = gausscenter[1] + h*Math.sin(RoraTilt)*Math.cos(RoraHead);
            gausscenter[0] = gausscenter[0] + h*Math.sin(RoraTilt)*Math.sin(RoraHead);
            var mapsetlatlng = gaussToGeo(gausscenter[0],gausscenter[1],mapState.center.lng,mapState.zoom);
        }
        return {
            View3Dlat:mapsetlatlng.latitude,
            View3Dlng:mapsetlatlng.longitude
        }
     }
     /**
      * 经纬度转高斯坐标
      */
    function coordn_to_gauss(mapCenter_data,zoom){
         var mapxy = mapCenter_data;
         var longitude = mapCenter_data[0];
         var latitude = mapCenter_data[1];
         var f = 1.0 / 298.257222101;
         var a = 6378137;
         var ipi = Math.PI / 180;
         var X0 = 500000;
         var Y0 = 0;
         longitude = parseFloat(longitude);
         latitude = parseFloat(latitude);
         if(zoom >=16){
             ProjNo = parseInt((longitude) / 3);
             longitude0 = ProjNo * 3;
         }else{
             ProjNo = parseInt((longitude) / 6);
             longitude0 = ProjNo * 6 + 3;
         }
         longitude0 = longitude0 * ipi;
         latitude0 = 0;
         longitude1 = longitude * ipi;
         latitude1 = latitude * ipi;
         e2 = 2 * f - f * f;
         ee = e2 * (1.0 - e2);
         NN = a / Math.sqrt(1.0 - e2 * Math.sin(latitude1) * Math.sin(latitude1));
         T = Math.tan(latitude1) * Math.tan(latitude1);
         C = ee * Math.cos(latitude1) * Math.cos(latitude1);
         A = (longitude1 - longitude0) * Math.cos(latitude1);
         M = a * ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * latitude1 -
             (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * latitude1) +
             (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * latitude1) -
             (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * latitude1));
         xval = NN * (A + (1 - T + C) * A * A * A / 6 + (5 - 18 * T + T * T + 72 * C - 58 * ee) * A * A * A * A * A / 120);
         yval = M + NN * Math.tan(latitude1) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24 +
             (61 - 58 * T + T * T + 600 * C - 330 * ee) * A * A * A * A * A * A / 720);
         xval = xval + X0;
         yval = yval + Y0;
         X = xval;
         X = parseInt((X - 500000) * 0.9996 + 500000);
         Y = yval;
         Y = parseInt(Y * 0.9996);
         return [X, Y];
     }
     /**
      * 高斯坐标转经纬度
      */
    function gaussToGeo(X,Y,lng,zoom) {
              var f = 1.0 / 298.257222101;
              var X0 = 500000;
              var Y0 = 0;
              var iPI = Math.PI / 180;
              var a = 6378137;
              if(zoom >=16){
                 var ZoneWide = 3;
                 var ProjNo = parseInt((lng) / ZoneWide);
                 var longitude0 = ProjNo * ZoneWide;
              }else{
                 var ZoneWide = 6;
                 var ProjNo = parseInt((lng)/ZoneWide);
                 var longitude0 = ProjNo*ZoneWide + ZoneWide/2
              }
              
                  longitude0 = longitude0*iPI
              X = (X - 500000) / 0.9996 + 500000;
              Y = Y / 0.9996;
              var xval = X - X0;
              var yval = Y - Y0;
              var e2 = 2 * f - f * f;
              var e1 = (1.0 - Math.sqrt(1 - e2)) / (1.0 + Math.sqrt(1 - e2));
              var ee = e2 / (1 - e2);
              var M = yval;
              var u = M / (a * (1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256));
              var fai = u + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * u) + 
                  (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * u) + 
                  (151 * e1 * e1 * e1 / 96) * Math.sin(6 * u) + (1097 * e1 * e1 * e1 * e1 / 512) * 
                  Math.sin(8 * u);
              var C = ee * Math.cos(fai) * Math.cos(fai);
              var T = Math.tan(fai) * Math.tan(fai);
              var NN = a / Math.sqrt(1.0 - e2 * Math.sin(fai) * Math.sin(fai));
              var R = a * (1 - e2) / Math.sqrt((1 - e2 * Math.sin(fai) * Math.sin(fai)) * 
                  (1 - e2 * Math.sin(fai) * Math.sin(fai)) * 
                  (1 - e2 * Math.sin(fai) * Math.sin(fai)));
              var D = xval/NN;
              longitude1 = longitude0+(D-(1+2*T+C)*D*D*D/6+
              (5-2*C+28*T-3*C*C+8*ee+24*T*T)*D*D*D*D*D/120)/Math.cos(fai);
              latitude1 = fai -(NN*Math.tan(fai)/R)*(D*D/2-
              (5+3*T+10*C-4*C*C-9*ee)*D*D*D*D/24+
              (61+90*T+298*C+45*T*T-256*ee-3*C*C)*D*D*D*D*D*D/720);
              longitude = longitude1/iPI;
              latitude = latitude1/iPI;
              return {longitude:longitude,
                       latitude:latitude
                   }

     }

    /**
     * 坐标反转
     * @param  {[type]} latlngsAry [description]
     * @return {[type]}            [description]
     */
    function latLngsToReverse(latlngsAry) {
        var tempLatlngsAry = JSON.parse(JSON.stringify(latlngsAry));
        if (!_.isArray(tempLatlngsAry[0])) {
            return tempLatlngsAry.reverse();
        } else {
            for (var i = 0, l = tempLatlngsAry.length; i < l; i++) {
                tempLatlngsAry[i] = latLngsToReverse(tempLatlngsAry[i]);
            }
        }
        return tempLatlngsAry;
    }

    function getCentroid(arr) {
        var twoTimesSignedArea = 0;
        var cxTimes6SignedArea = 0;
        var cyTimes6SignedArea = 0;
        var length = arr.length;
        var x = function(i) {
            return arr[i % length][0] };
        var y = function(i) {
            return arr[i % length][1] };
        for (var i = 0; i < arr.length; i++) {
            var twoSA = x(i) * y(i + 1) - x(i + 1) * y(i);
            twoTimesSignedArea += twoSA;
            cxTimes6SignedArea += (x(i) + x(i + 1)) * twoSA;
            cyTimes6SignedArea += (y(i) + y(i + 1)) * twoSA;
        }
        var sixSignedArea = 3 * twoTimesSignedArea;
        return [cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];
    }

    window.map23DUtil = {
        latLngsToReverse: latLngsToReverse,
        getCentroid: getCentroid,
        latlngsTo3DViewCenter:latlngsTo3DViewCenter
    };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = map23DUtil;
    } else if (typeof define === 'function' && define.amd) {
        define(map23DUtil);
    }

}(window, document));

;(function (window, document, undefined) {
    window.map23DDefaultData = {
        layer:{
            from:'23D',
            type:'tileLayer',
            guid:null,//图层ID  tileLayer23D/tileLayer2D/tileLayer3D
            add2D:false,//2D是否已添加
            add3D:false,//3D是否已添加
            visible2D:false,
            visible3D:false,
            layer:{
                url2D:null,//2D瓦片服务地址
                url3D:null,//3D瓦片服务地址
                minZoom:map23DConfig.map2DMinZoom || 1, //23D最大缩放等级
                maxZoom:map23DConfig.map2DMaxZoom || 21,//23D最小缩放等级
                maxNativeZoom:map23DConfig.map2DMaxZoom || 21,//2D最大渲染等级
                attribution:null,//2D瓦片附属信息
                opacity:1,//2D瓦片透明度
                imageType:'jpeg'//3D瓦片图片类型
            }
        },
        group:{
            from:'23D',
            type:'group',
            guid:null,//图层组ID group23D/group2D/group3D
            add2D:false,//2D是否已添加
            add3D:false,//3D是否已添加
            visible2D:false,
            visible3D:false,
            clustering:false,//2D是否聚合
            clusterOptions:{
                maxClusterRadius:120,//多少像素距离的点会聚合 默认小于120像素内的点会聚合
                polygonOptions: {weight: 1, opacity: 0.5}, //聚合范围面样式
                showCoverageOnHover: true, //是否显示聚合范围
                disableClusteringAtZoom: null, //设置到达指定缩放等级后禁用聚合
            }//2D聚合参数
        },
        marker:{
            from:'23D',
            type:'marker',
            guid:null,//标记ID marker23D/marker2D/marker3D
            add2D:false,
            add3D:false,
            visible2D:false,
            visible3D:false,
            groupId:null,
            animate:false,
            geojson:{
                "type": "Feature",
                "properties": {
                    title:null,
                    titleColor:'#FFFFFF',
                    titleFontSize :12,
                    iconUrl:null,
                    icon3DUrl:null,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    popupContent:null,
                    altitude:0,
                    altitudeMode:0,
                    iconRorate:0,
                    iconScale:1,
                    fontIcon:null,
                    fontSize:null,
                    fontColor:null,
                    fontWeight:null
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [0,0]
                }
            }
        },
        polyline:{
            from:'23D',
            type:'polyline',
            guid:null,
            add2D:false,
            add3D:false,
            visible2D:false,
            visible3D:false,
            groupId:null,
            linetype:'line',
            geojson:{
                "type": "Feature",
                "properties": {
                    title:null,
                    color:'#0033ff',
                    weight:1,
                    opacity:1,
                    popupContent:null,
                    dashArray: null,
                    lineType:0, //3D用 Solid:0/Dash:1/Dot:2/DashDot:3/DashDotDot:4
                    extrude:0,//拉伸高度
                    altitude:0,//海拔高度
                    altitudeMode:1
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": [[0,0]]
                }
            }
        },
        polygon:{
            from:'23D',
            type:'polygon',
            guid:null,
            add2D:false,
            add3D:false,
            visible2D:false,
            visible3D:false,
            groupId:null,
            polygontype:'polygon',
            geojson:{
                "type": "Feature",
                "properties": {
                    title:null,
                    color:'#ff0000',
                    weight:1,
                    fillColor:'#ff6600',
                    opacity:1,
                    fillOpacity:1,
                    popupContent:null,
                    extrude:0,
                    altitude:0,
                    altitudeMode:1
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[0,0]]
                }
            }
        },
        circle:{
            from:'23D',
            type:'circle',
            guid:null,
            add2D:false,
            add3D:false,
            visible2D:false,
            visible3D:false,
            groupId:null,
            geojson:{
                "type": "Feature",
                "properties": {
                    title:null,
                    radius:0,//半径 米
                    color:'#ff0000',
                    weight:1,
                    fillColor:'#ff6600',
                    opacity:1,
                    fillOpacity:1,
                    popupContent:null,
                    extrude:0,
                    altitude:0,
                    altitudeMode:1
                },
                "geometry": {
                    "type": "Circle",
                    "coordinates": [0,0]
                }
            }
        },
        circleMarker:{
            from:'23D',
            type:'circleMarker',
            guid:null,
            add2D:false,
            add3D:false,
            visible2D:false,
            visible3D:false,
            groupId:null,
            geojson:{
                "type": "Feature",
                "properties": {
                    title:null,
                    radius:0,//半径 米
                    color:'#ff0000',
                    weight:1,
                    fillColor:'#ff6600',
                    opacity:1,
                    fillOpacity:1,
                    popupContent:null,
                    stroke: false,
                    extrude:0,
                    altitude:0,
                    altitudeMode:1
                },
                "geometry": {
                    "type": "CircleMarker",
                    "coordinates": [0,0]
                }
            }
        },
        model:{
            from:'23D',
            type:'model',
            guid:null,
            add2D:false,
            add3D:false,
            visible2D:false,
            visible3D:false,
            groupId:null,
            geojson:{
                "type": "Feature",
                "properties": {
                    title:null,
                    url:null,
                    popupContent:null,
                    altitude:0,
                    altitudeMode:0,
                    scale:0,
                    rotate:[0,0,0],
                    visible:true
                },
                "geometry": {
                    "type": "Model",
                    "coordinates": [0,0]
                }
            }
        }
    }

 
    window.map23DData = {
        mouseIn:'2D',//2D or 3D
        display:{
            map2D:false,
            map3D:false
        }, 
        view:{
            center:{ 
                lat:39,
                lng:116
            },
            zoom:12,
            heading:0,//摄像机平面角度 正北为0
            tilt:0,//摄像机倾斜角
            distance:0//摄像机距地面高度
        },
        layers:{},
        groups:{},
        markers:{},
        polylines:{},
        circles:{},
        circleMarkers:{},
        polygons:{},
        models:{},
        timeLineData:{}
    };


    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = map23DData;
    } else if (typeof define === 'function' && define.amd) {
        define(map23DData);
    }

}(window, document));
;
(function(window, document, undefined) {
    window.map23DControl = {};

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = map23DControl;
    } else if (typeof define === 'function' && define.amd) {
        define(map23DControl);
    }

    map23DControl.init = function(options) {
        var _this = this;

        _.merge(map23DData, options);

        this.mapWrap = document.getElementById(map23DData.mapWrapId);
        this.map2DWrap = document.createElement('div');
        this.map2DWrap.id = 'map2DWrap';
        
        this.mapWrap.appendChild(this.map2DWrap);
        this.map3DWrap = document.createElement('div');
        this.map3DWrap.id = 'map3DWrap';

        this.mapWrap.appendChild(this.map3DWrap);

        if (map23DData.display.map2D == true && map23DData.display.map3D == false) {
            this.mapWrap.className = 'show2DOnly';
            map2DViewer.init();
        } else if (map23DData.display.map3D == true && map23DData.display.map2D == false) {
            this.mapWrap.className = 'show3DOnly';
            map3DViewer.init();
        } else {
            map2DViewer.init();
            map3DViewer.init();
        }

        _this.map2DWrap.onmouseover = function(e) {
            map23DData.mouseIn = '2D';
            _this.map2DWrap.focus();
        }
        _this.map3DWrap.onmouseover = function(e) {
            map23DData.mouseIn = '3D';
            if (map3DViewer.inited) {
                _this.map3DWrap.focus();
            }
        }
    }

    map23DControl.show2D = function() {
        this.mapWrap = document.getElementById(map23DData.mapWrapId);
        this.mapWrap.className = 'show2DOnly';
        _.merge(map23DData, {
            display: {
                map2D: true,
                map3D: false
            }
        });
        PubSub.publish('map23D.show2D', {
            from: '23D'
        });
    }

    map23DControl.show3D = function() {
        this.mapWrap = document.getElementById(map23DData.mapWrapId);
        this.mapWrap.className = 'show3DOnly';
        _.merge(map23DData, {
            display: {
                map2D: false,
                map3D: true
            }
        });
        PubSub.publish('map23D.show3D', {
            from: '23D'
        });
    }

    map23DControl.show23D = function() {
        this.mapWrap = document.getElementById(map23DData.mapWrapId);
        this.mapWrap.className = '';
        _.merge(map23DData, {
            display: {
                map2D: true,
                map3D: true
            }
        });
        PubSub.publish('map23D.show23D', {
            from: '23D'
        })
    }



    /**
     * 生成随机GUID
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    map23DControl.buildGuid = function(options) {
        var text = "";
        var mar = options || 'default';
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 18; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return mar + '_' + (new Date()).getTime().toString() + text;
    }


    map23DControl.setView = function(options) {
        _.merge(map23DData.view, options);
        PubSub.publish('map23D.setView', {
            from: '23D'
        })
    }

}(window, document));

;
(function(window, document, undefined) {
    window.map2DViewer = {
        inited: false,
        markers: {},
        layers: {},
        polylines: {},
        polygons: {},
        circles: {},
        circleMarkers: {},
        models:{},
        groups: {},
        hide2D:false,
        syncTimeer:null
    };
  
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = map2DViewer;
    } else if (typeof define === 'function' && define.amd) {
        define(map2DViewer);
    }

    PubSub.subscribe('map23D.show2D', function(msg, options) {
        if (options.from == '23D' && map23DData.display.map2D) {
            if (map2DViewer.inited) {
                map2DViewer.map.invalidateSize();
                map2DViewer.map.setView([map23DData.view.center.lat, map23DData.view.center.lng], map23DData.view.zoom);
            } else {
                map2DViewer.init();
                //如果从隐藏到显示，添加所有因show3D隐藏的地图元素，添加同步
                
            }
            map2DViewer.hide2D = false;
        }
    });

    PubSub.subscribe('map23D.show23D', function(msg, options) {
        if (options.from == '23D' && map23DData.display.map2D) {
            if (map2DViewer.inited) {
                map2DViewer.map.invalidateSize();
            } else {
                map2DViewer.init();
            }
            map2DViewer.hide2D = false;
        }
    });

    PubSub.subscribe('map23D.show3D', function(msg, options) {
        if (options.from == '23D') {
            if (map2DViewer.inited) {
                //移除所有显示的地图元素，并断开同步
                map2DViewer.hide2D = true;
            }
        }
    });


    map2DViewer.init = function(options) {
        var _this = map2DViewer;
        if (this.inited) {
            return;
        } else {
            this.inited = true;
        }

        this.map = L.map('map2DWrap', {
            editable: true,
            attributionControl: false,
            inertia: false,
            // fadeAnimation: false,
            // zoomAnimation: true,
            contextmenu: true,
            minZoom:map23DConfig.map2DMinZoom||1,
            maxZoom:map23DConfig.map2DMaxZoom || 21//,
            //preferCanvas:true
        }).setView([map23DData.view.center.lat, map23DData.view.center.lng], map23DData.view.zoom);

        this.polygonCanvasRenderer = L.canvas();
        this.polylineCanvasRenderer = L.canvas();
        this.rectangleCanvasRenderer = L.canvas();
        this.circleleCanvasRenderer = L.canvas();
        this.circleMarkerCanvasRenderer = L.canvas();

        this.map.on('zoomend move', function(e) {
            
            if (map23DData.mouseIn != '2D') {
                return;
            }

            if(map2DViewer.syncTimeer){
                return false;
            }
            map2DViewer.syncTimeer = setTimeout(function(){
                var mapState = {
                    view: {
                        center: {
                            lat: e.target.getCenter().lat,
                            lng: e.target.getCenter().lng
                        },
                        zoom: _this.map.getZoom()
                    }
                }
                _.merge(map23DData, mapState);
                

                PubSub.publish('map2D.setView', {
                    from: '2D'
                })

                clearTimeout(map2DViewer.syncTimeer);
                map2DViewer.syncTimeer = null;

            },100)
            
        });
        PubSub.subscribe('map3D.setView', function(msg, options) {
            if (options.from == '3D' && map23DData.mouseIn == '3D' && !map2DViewer.hide2D) {
                _this.map.setView(
                    [map23DData.view.center.lat, map23DData.view.center.lng],
                    map23DData.view.zoom
                );
            }
        });

        PubSub.subscribe('map23D.setView', function(msg, options) {
            if (options.from == '23D' && !map2DViewer.hide2D) {
                _this.map.setView(
                    [map23DData.view.center.lat, map23DData.view.center.lng],
                    map23DData.view.zoom
                );
            }
        });


        
    }


    map2DViewer.setView = function(options){
        _.merge(map23DData.view, options);
        map2DViewer.map.setView(
            [map23DData.view.center.lat, map23DData.view.center.lng],
            map23DData.view.zoom
        );
        map23DData.mouseIn = '2D';
        PubSub.publish('map2D.setView', {
            from: '2D'
        })
    }

    map2DViewer.flyTo = function(options){
        _.merge(map23DData.view, options);
        map2DViewer.map.flyTo(
            [map23DData.view.center.lat, map23DData.view.center.lng],
            map23DData.view.zoom
        );
        map23DData.mouseIn = '2D';
        PubSub.publish('map2D.setView', {
            from: '2D'
        })
    }


    /**
     * 设置系统自带图层
     * @param {[type]} options [description]
     */
    map2DViewer.setDefaultTileLayer = function(options) {
        PubSub.publish('map2D.defaultTileLayer.change', {
            mapName: options
        })
    }

    //2D图层组
    map2DViewer.group = function(options) {
        switch (options.action) {
            case 'add':
                return addGroup2D(options);
                break;
            case 'show':
                return showGroup2D(options);
                break;
            case 'hide':
                return hideGroup2D(options);
                break;
            case 'remove':
                return removeGroup2D(options);
                break;
            case 'cleanAll':
                return cleanGroupAllFeatures2D(options);
                break;
        }
    }
    function addGroup2D(options) {
        var guid = options.guid || map23DControl.buildGuid('group2D');
        if(options.guid){
            guid = 'group2D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.group)
        defaultData.guid = guid;
        defaultData.from = '2D';
        _.merge(defaultData, options);
        map23DData.groups[guid] = defaultData;
        PubSub.publishSync('map2D.group.add', guid);
        return guid;
    }

    function showGroup2D(options){
        if (map2DViewer.groups[options.guid]) {
            PubSub.publishSync('map2D.group.show', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function hideGroup2D(options){
        if (map2DViewer.groups[options.guid]) {
            PubSub.publishSync('map2D.group.hide', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function removeGroup2D(options) {
        if (map23DData.groups[options.guid]) {
            cleanGroupAllFeatures2D(options);
            PubSub.publishSync('map2D.group.remove', options.guid);
            if(map23DData.groups[options.guid].add3D == false){
                delete map23DData.groups[options.guid];
            }
            return options.guid;
        } else {
            return false;
        }
    }
    function cleanGroupAllFeatures2D(options) {
        if (map23DData.groups[options.guid]) {
            //移除点
            _(map23DData.markers).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map2DViewer.marker({
                        action: 'remove',
                        guid: key
                    })
                }
            });
            //移除线
            _(map23DData.polylines).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map2DViewer.polyline({
                        action: 'remove',
                        guid: key
                    })
                }
            });
            //移除面
            _(map23DData.polygons).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map2DViewer.polygon({
                        action: 'remove',
                        guid: key
                    })
                }
            });

            //移除圆
            _(map23DData.circles).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map2DViewer.circle({
                        action: 'remove',
                        guid: key
                    })
                }
            });

            //移除圆标记
            _(map23DData.circleMarkers).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map2DViewer.circleMarker({
                        action: 'remove',
                        guid: key
                    })
                }
            });
            return options.guid;
        } else {
            return false
        }
    }

    //2D 点
    map2DViewer.marker = function(options) {
        switch (options.action) {
            case 'add':
                return addMarker2D(options);
                break;
            case 'remove':
                return removeMarker2D(options);
                break;
            case 'update':
                return updateMarker2D(options);
                break;
            case 'hide':
                return hideMarker2D(options);
                break;
            case 'show':
                return showMarker2D(options);
                break;
        }
    }

    function addMarker2D(options) {
        var guid = options.guid || map23DControl.buildGuid('marker2D');
        if(options.guid){
            guid = 'marker2D_'+guid;
        }
        if (!options.RBkey) {
            var markerTime = null;
        } else {
            var markerTime = map23DData.polylines[map2DViewer.routeBackGroup[options.RBkey].polyline].geojson.properties.times;
        }

        var defaultData = _.cloneDeep(map23DDefaultData.marker)
        defaultData.guid = guid;
        defaultData.from = '2D';
        defaultData.geojson.geometry.markerTime = markerTime;
        _.merge(defaultData, options);
        map23DData.markers[guid] = defaultData;
        PubSub.publishSync('map2D.marker.add', guid);
        return guid;
    } 

    function showMarker2D(options){
        if (map2DViewer.markers[options.guid]) {
            PubSub.publishSync('map2D.marker.show', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function hideMarker2D(options){
        if (map2DViewer.markers[options.guid]) {
            PubSub.publishSync('map2D.marker.hide', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function removeMarker2D(options) {
        if (map23DData.markers[options.guid]) {
            PubSub.publishSync('map2D.marker.remove', options.guid);
            if(map23DData.markers[options.guid].add3D == false){
                delete map23DData.markers[options.guid];
            }
            return options.guid;
        } else {
            return false;
        }
    }
    function updateMarker2D(options){
        if (map23DData.markers[options.guid]) {
            _.merge(map23DData.markers[options.guid], options);
            PubSub.publishSync('map2D.marker.update', options.guid);            
            return options.guid;
        } else {
            return false;
        }
    }

    //2D 线
    map2DViewer.polyline = function(options) {
        switch (options.action) {
            case 'add':
                return addPolyline2D(options);
                break;
            case 'show':
                return showPolyline2D(options);
                break;
            case 'hide':
                return hidePolyline2D(options);
                break;
            case 'remove':
                return removePolyline2D(options);
                break;
            case 'update':
                return updatePolyline2D(options);
                break;
        }
    }
    function addPolyline2D(options) {
        var guid = options.guid || map23DControl.buildGuid('polyline2D');
        if(options.guid){
            guid = 'polyline2D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.polyline)
        defaultData.guid = guid;
        defaultData.from = '2D';
        _.merge(defaultData, options);
        map23DData.polylines[guid] = defaultData;
        PubSub.publishSync('map2D.polyline.add', guid);
        return guid;
    }

    function showPolyline2D(options){
        if (map2DViewer.polylines[options.guid]) {
            PubSub.publishSync('map2D.polyline.show', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function hidePolyline2D(options){
        if (map2DViewer.polylines[options.guid]) {
            PubSub.publishSync('map2D.polyline.hide', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function removePolyline2D(options) {
        if (map23DData.polylines[options.guid]) {
            PubSub.publishSync('map2D.polyline.remove', options.guid);
            if(map23DData.polylines[options.guid].add3D == false){
                delete map23DData.polylines[options.guid];
            }
            return options.guid;
        } else {
            return false;
        }
    }  
    function updatePolyline2D(options){
        if (map23DData.polylines[options.guid]) {
            _.merge(map23DData.polylines[options.guid], options);
            PubSub.publishSync('map2D.polyline.update', options.guid);            
            return options.guid;
        } else {
            return false;
        }
    }

    //2D 面
    map2DViewer.polygon = function(options) {
        switch (options.action) {
            case 'add':
                return addPolygon2D(options);
                break;
            case 'show':
                return showPolygon2D(options);
                break;
            case 'hide':
                return hidePolygon2D(options);
                break;
            case 'remove':
                return removePolygon2D(options);
                break;
            case 'update':
                return updatePolygon2D(options);
                break;
        }
    }
    function addPolygon2D(options) {
        var guid = options.guid || map23DControl.buildGuid('polygon2D');
        if(options.guid){
            guid = 'polygon2D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.polyline)
        defaultData.guid = guid;
        defaultData.from = '2D';
        _.merge(defaultData, options);
        map23DData.polygons[guid] = defaultData;
        PubSub.publishSync('map2D.polygon.add', guid);
        return guid;
    }

    function showPolygon2D(options){
        if (map2DViewer.polygons[options.guid]) {
            PubSub.publishSync('map2D.polygon.show', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function hidePolygon2D(options){
        if (map2DViewer.polygons[options.guid]) {
            PubSub.publishSync('map2D.polygon.hide', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function removePolygon2D(options) {
        if (map23DData.polygons[options.guid]) {
            PubSub.publishSync('map2D.polygon.remove', options.guid);
            if(map23DData.polygons[options.guid].add3D == false){
               delete map23DData.polygons[options.guid]; 
           }
            return options.guid;
        } else {
            return false;
        }
    }
    function updatePolygon2D(options){
        if (map23DData.polygons[options.guid]) {
            _.merge(map23DData.polygons[options.guid], options);
            PubSub.publishSync('map2D.polygon.update', options.guid);            
            return options.guid;
        } else {
            return false;
        }
    }
    
    //2D 圆
    map2DViewer.circle = function(options) {
        switch (options.action) {
            case 'add':
                return addCircle2D(options);
                break;
            case 'show':
                return showCircle2D(options);
                break;
            case 'hide':
                return hideCircle2D(options);
                break;
            case 'remove':
                return removeCircle2D(options);
                break;
            case 'update':
                return updateCircle2D(options);
                break;
        }
    }
    function addCircle2D(options) {
        var guid = options.guid || map23DControl.buildGuid('circle2D');
        if(options.guid){
            guid = 'circle2D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.circle)
        defaultData.guid = guid;
        defaultData.from = '2D';
        _.merge(defaultData, options);
        map23DData.circles[guid] = defaultData;
        PubSub.publishSync('map2D.circle.add', guid);
        return guid;
    }

    function showCircle2D(options){
        if (map2DViewer.circles[options.guid]) {
            PubSub.publishSync('map2D.circle.show', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function hideCircle2D(options){
        if (map2DViewer.circles[options.guid]) {
            PubSub.publishSync('map2D.circle.hide', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function removeCircle2D(options) {
        if (map23DData.circles[options.guid]) {
            PubSub.publishSync('map2D.circle.remove', options.guid);
            if(map23DData.circles[options.guid].add3D == false){
               delete map23DData.circles[options.guid]; 
           }
            return options.guid;
        } else {
            return false;
        }
    }
    function updateCircle2D(options){
        if (map23DData.circles[options.guid]) {
            _.merge(map23DData.circles[options.guid], options);
            PubSub.publishSync('map2D.circle.update', options.guid);            
            return options.guid;
        } else {
            return false;
        }
    }


    //2D 圆标记
    map2DViewer.circleMarker = function(options) {
        switch (options.action) {
            case 'add':
                return addCircleMarker2D(options);
                break;
            case 'show':
                return showCircleMarker2D(options);
                break;
            case 'hide':
                return hideCircleMarker2D(options);
                break;
            case 'remove':
                return removeCircleMarker2D(options);
                break;
            case 'update':
                return updateCircleMarker2D(options);
                break;
        }
    }
    function addCircleMarker2D(options) {
        var guid = options.guid || map23DControl.buildGuid('circleMarker2D');
        if(options.guid){
            guid = 'circleMarker2D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.circleMarker)
        defaultData.guid = guid;
        defaultData.from = '2D';
        _.merge(defaultData, options);
        map23DData.circleMarkers[guid] = defaultData;
        PubSub.publishSync('map2D.circleMarker.add', guid);
        return guid;
    }

    function showCircleMarker2D(options){
        if (map2DViewer.circleMarkers[options.guid]) {
            PubSub.publishSync('map2D.circleMarker.show', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function hideCircleMarker2D(options){
        if (map2DViewer.circleMarkers[options.guid]) {
            PubSub.publishSync('map2D.circleMarker.hide', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function removeCircleMarker2D(options) {
        if (map23DData.circleMarkers[options.guid]) {
            PubSub.publishSync('map2D.circleMarker.remove', options.guid);
            if(map23DData.circleMarkers[options.guid].add3D == false){
               delete map23DData.circleMarkers[options.guid]; 
           }
            return options.guid;
        } else {
            return false;
        }
    }
    function updateCircleMarker2D(options){
        if (map23DData.circleMarkers[options.guid]) {
            _.merge(map23DData.circleMarkers[options.guid], options);
            PubSub.publishSync('map2D.circleMarker.update', options.guid);            
            return options.guid;
        } else {
            return false;
        }
    }

    /**
     * 2D图层控制
     */
    map2DViewer.tileLayer = function(options) {
         switch (options.action) {
            case 'add':
                 return addTileLayer2D(options);
                 break;
            case 'show':
                 return showTileLayer2D(options);
                 break;
            case 'hide':
                 return hideTileLayer2D(options);
                 break;
            case 'remove':
                 return removeTileLayer2D(options);
                 break;
            case 'update':
                 return updateTileLayer2D(options);
         }
    } 
    
    function addTileLayer2D(options) {
        var guid = options.guid || map23DControl.buildGuid('tileLayer2D');
        if(options.guid){
            guid = 'tileLayer2D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.layer)
        defaultData.guid = guid;
        defaultData.from = '2D';
        _.merge(defaultData, options);
        map23DData.layers[guid] = defaultData;
        PubSub.publishSync('map2D.tileLayer.add', guid);
        return guid;
    }

    function showTileLayer2D(options){
        if (map2DViewer.layers[options.guid]) {
            PubSub.publishSync('map2D.tileLayer.show', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function hideTileLayer2D(options){
        if (map2DViewer.layers[options.guid]) {
            PubSub.publishSync('map2D.tileLayer.hide', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    
    function updateTileLayer2D(options) {
        if (map23DData.layers[options.guid]) {
            _.merge(map23DData.layers[options.guid], options);
            PubSub.publishSync('map2D.tileLayer.update', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

    function removeTileLayer2D(options) {
        if (map23DData.layers[options.guid]) {
            PubSub.publishSync('map2D.tileLayer.remove', options.guid);
            if(map23DData.layers[options.guid].add3D == false){
                delete map23DData.layers[options.guid];
            }
            return options.guid;
        } else {
            return false;
        }
    }


    /**
     * 2DCartodb控制
     */
    map2DViewer.cartodbLayer = function(options) {
         switch (options.action) {
             case 'add':
                 return addCartodbLayer2D(options);
                 break;
             case 'remove':
                 return removeCartodbLayer2D(options);
                 break;
         }
    }
    function addCartodbLayer2D(options) {
        var guid = options.guid || map23DControl.buildGuid('cartodbLayer2D');
        if(options.guid){
            guid = 'cartodbLayer2D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.layer)
        defaultData.guid = guid;
        defaultData.from = '2D';
        _.merge(defaultData, options);
        map23DData.layers[guid] = defaultData;
        PubSub.publishSync('map2D.cartodbLayer.add', guid);
        return guid;
    }
    
    function removeCartodbLayer2D(options) {
        if (map23DData.layers[options.guid]) {
            PubSub.publishSync('map2D.cartodbLayer.remove', options.guid);
            delete map23DData.layers[options.guid];
            return options.guid;
        } else {
            return false;
        }
    }
    
}(window, document));

;
(function(window, document, undefined) {
    window.map3DViewer = {
        inited: false,
        markers: {},
        layers: {},
        polylines: {},
        polygons: {}, 
        circles: {},
        groups: {},
        models: {},
        hide3D:false,
        zoomAry: [90000, 50123, 31000, 16180, 8970, 5036, 2395, 1092, 580, 287, 146, 62.3, 33, 17.9, 9, 3.9, 2.1, 1.2, 0.53, 0.27, 0.01],
        syncTimeer:null
    };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = map3DViewer;
    } else if (typeof define === 'function' && define.amd) {
        define(map3DViewer);
    }

    PubSub.subscribe('map23D.show3D', function(msg, options) {
        if (options.from == '23D' && map23DData.display.map3D) {
            if (map3DViewer.inited) {
                var newlatlng = window.map23DUtil.latlngsTo3DViewCenter(map23DData.view);
                var map3DHeading = -map23DData.view.heading;
                //console.log(map23DData.view.tilt);
                locaSpace.JumpTo(
                    newlatlng.View3Dlng,
                    newlatlng.View3Dlat,
                    map3DViewer.getZoomFrom2DZoom(map23DData.view.zoom),
                    map3DHeading,
                    0
                );
                locaSpaceMap.Refresh();
                map23DData.mouseIn = '3D';
            } else {
                map3DViewer.init();
                //如果从隐藏到显示，添加所有因show2D隐藏的地图元素，添加同步
            }
            map3DViewer.hide3D = false;
        }
    });

    PubSub.subscribe('map23D.show23D', function(msg, options) {
        if (options.from == '23D' && map23DData.display.map3D) {
            if (map3DViewer.inited) {} else {
                map3DViewer.init();
            }
            map3DViewer.hide3D = false;
        }
    });

    PubSub.subscribe('map23D.show2D', function(msg, options) {
        if (options.from == '23D') {
            if (map3DViewer.inited) {
                //移除所有显示的地图元素，并断开同步
                map3DViewer.hide3D = true;
            }
        }
    });

    map3DViewer.init = function() {
        var _this = this;
        if (this.inited) {
            return;
        } else {
            this.inited = true;
        }
        var initResult = locaSpace.InitGlobal('map3DWrap');
        if(!initResult){
            this.inited = false;            
            return false;
        }
        locaSpace.ConnectServer(map23DConfig.threeDimensionalServerUrl, 1500);
        this.map = locaSpaceMap;
        this.map.Globe.ClearNetCache();
        this.map.Globe.Layers.RemoveAll();
        //设置经纬网隐藏
        this.map.Globe.LatLonGridVisible = false;
        //显示太阳
        this.map.Globe.SunVisible = true;
        this.map.Globe.OverviewControl.Visible = false;
        locaSpaceMap.FeatureMouseOverEnable = true;
        this.map.Refresh();

        //初始位置
        var map3DHeading = -map23DData.view.heading;
        locaSpace.JumpTo(
            map23DData.view.center.lng,
            map23DData.view.center.lat,
            map3DViewer.getZoomFrom2DZoom(map23DData.view.zoom),
            map3DHeading, 0);
        locaSpaceMap.attachEvent("FireBeforeSceneRender", function(e) {
            if (map23DData.mouseIn != '3D') {
                return;
            }
            if(map3DViewer.syncTimeer){
                return;
            }
            var _cameraState = locaSpace.GetCameraState();
            if(_cameraState.Distance > 50124363){
                _cameraState.Distance = 50124363;
                locaSpaceMap.Globe.JumpToCameraState(_cameraState);
                return;
            }

            map3DViewer.syncTimeer = setTimeout(function(){
                var cameraState = locaSpace.GetCameraState();
                var map23DDataHeading = -cameraState.Heading;
                var mapState = {
                    view: {
                        center: {
                            lat: cameraState.Latitude,
                            lng: cameraState.Longitude
                        },
                        zoom: map3DViewer.getZoomFrom3DZoom(cameraState.Distance),
                        heading: map23DDataHeading,
                        tilt: cameraState.Tilt,
                        distance: cameraState.Distance
                    }
                }
                //console.log(cameraState.Tilt);
                _.merge(map23DData, mapState);
                PubSub.publish('map3D.setView', {
                    from: '3D'
                })
                clearTimeout(map3DViewer.syncTimeer);
                map3DViewer.syncTimeer = null;

            },100)            
        });

        //鼠标点击元素
        locaSpaceMap.attachEvent("FireFeatureMouseClick", function(feature, e) {
            PubSub.publish('map3D.featureClick', {
                from: '3D',
                evt: e,
                feature:feature
            })
        });
        //鼠标滑过元素
        locaSpaceMap.attachEvent("FireFeatureMouseHover",function(feature, e){
            PubSub.publish('map3D.featureMouseHover', {
                from: '3D',
                evt: e,
                feature:feature
            })
        });
        //鼠标进入元素
        locaSpaceMap.attachEvent("FireFeatureMouseInto",function(feature, e){
            PubSub.publish('map3D.featureMouseInto', {
                from: '3D',
                evt: e,
                feature:feature
            })
        });
        //鼠标移出元素
        locaSpaceMap.attachEvent("FireFeatureMouseOut",function(feature, e){
            PubSub.publish('map3D.featureMouseOut', {
                from: '3D',
                evt: e,
                feature:feature
            })
        });
        //鼠标在元素上滑动
        locaSpaceMap.attachEvent("FireFeatureMouseOver",function(feature, e){
            PubSub.publish('map3D.featureMouseOver', {
                from: '3D',
                evt: e,
                feature:feature
            })
        });

        //摄像机移动停止
        locaSpaceMap.attachEvent("FireCameraBeginStop",function(e){
            PubSub.publish('map3D.cameraBeginStop', {
                from: '3D',
                evt: e
            })
        });
        //摄像机开始移动
        locaSpaceMap.attachEvent("FireCameraBeginMove",function(e){
            PubSub.publish('map3D.cameraBeginMove', {
                from: '3D',
                evt: e
            })
        });
        //停止飞行
        locaSpaceMap.attachEvent("FireStopFly",function(flyId,flyType){
            PubSub.publish('map3D.stopFly', {
                from: '3D',
                flyId:flyId,
                flyType:flyType
            })
        });
        //暂停飞行
        locaSpaceMap.attachEvent("FirePauseFly",function(flyId,flyType){
            PubSub.publish('map3D.pauseFly', {
                from: '3D',
                flyId:flyId,
                flyType:flyType
            })
        });
        //鼠标移动
        locaSpaceMap.attachEvent("MouseMove",function(button,shift,x,y){
            PubSub.publish('map3D.mouseMove', {
                from: '3D',
                button: button,
                shift:shift,
                x:x,
                y:y
            })
        });
        //鼠标按下
        locaSpaceMap.attachEvent("MouseDown",function(button,shift,x,y){
            PubSub.publish('map3D.mouseDown', {
                from: '3D',
                button: button,
                shift:shift,
                x:x,
                y:y
            })
        });
        //鼠标弹起
        locaSpaceMap.attachEvent("MouseUp",function(button,shift,x,y){
            PubSub.publish('map3D.mouseUp', {
                from: '3D',
                button: button,
                shift:shift,
                x:x,
                y:y
            })
        });
        //鼠标单击
        locaSpaceMap.attachEvent("Click",function(){
            PubSub.publish('map3D.click', {
                from: '3D'
            })
        });
        //鼠标双击
        locaSpaceMap.attachEvent("DblClick",function(){
            PubSub.publish('map3D.dblClick', {
                from: '3D'
            })
        });




        PubSub.subscribe('map2D.setView', function(msg, options) {
            if (options.from == '2D' && map23DData.mouseIn == '2D' && !map3DViewer.hide3D) {
                
                var newlatlng = window.map23DUtil.latlngsTo3DViewCenter(map23DData.view);
                var map3DHeading = -map23DData.view.heading;
                locaSpace.JumpTo(
                    newlatlng.View3Dlng,
                    newlatlng.View3Dlat,
                    map3DViewer.getZoomFrom2DZoom(map23DData.view.zoom),
                    map3DHeading,
                    map23DData.view.tilt
                ); 
                var cameraState = locaSpace.GetCameraState();
                var mapState = {
                    view: {
                        center: {
                            lat: cameraState.Latitude,
                            lng: cameraState.Longitude
                        },
                        zoom: map3DViewer.getZoomFrom3DZoom(cameraState.Distance),
                        heading: cameraState.Heading,
                        tilt: cameraState.Tilt,
                        distance: cameraState.Distance
                    }
                };
                map23DData.view.distance = mapState.view.distance;
                locaSpaceMap.Refresh();
                
            }
        });

        PubSub.subscribe('map23D.setView', function(msg, options) {
            if (options.from == '23D' && !map3DViewer.hide3D) {
                var newlatlng = window.map23DUtil.latlngsTo3DViewCenter(map23DData.view);
                var map3DHeading = -map23DData.view.heading;
                locaSpace.JumpTo(
                    newlatlng.View3Dlng,
                    newlatlng.View3Dlat,
                    map3DViewer.getZoomFrom2DZoom(map23DData.view.zoom),
                    map3DHeading,
                    map23DData.view.tilt
                );
                locaSpaceMap.Refresh();
            }
        });
    }

    //显示支持文本的冒泡窗
    map3DViewer.showTextTips = function(options){
        var featureTooltip = new ActiveXObject("LocaSpacePlugin.GSABalloon");
        featureTooltip.Create(locaSpaceMap.Handle);
        featureTooltip.SetShadow(0,0,0,false,0,0);
        featureTooltip.CloseButtonVisible = options.closeButtonVisible || false;
        featureTooltip.MaxWidth = options.maxWidth || 100;
        featureTooltip.ShowBalloon1(options.x,options.y,options.content);
        locaSpaceMap.Refresh();
    }

    //显示支持html的冒泡窗
    map3DViewer.showPopup = function(options){        
        var featureTooltip = new ActiveXObject("LocaSpacePlugin.GSABalloonEx");
        featureTooltip.Create(locaSpaceMap.Handle);
        featureTooltip.SetShadow(0,0,0,false,0,0);
        featureTooltip.CloseButtonVisible = options.closeButtonVisible || true;
        featureTooltip.SetSize(4,(options.width || 200));
        featureTooltip.SetSize(5,(options.height || 100));
        featureTooltip.SetSize(10,0);
        // alert('ROUNDED_CX:'+featureTooltip.GetSize(0))
        // alert('ROUNDED_CY:'+featureTooltip.GetSize(1))
        // alert('MARGIN_CX:'+featureTooltip.GetSize(2))
        // alert('MARGIN_CY:'+featureTooltip.GetSize(3))
        // alert('CONTENT_CX:'+featureTooltip.GetSize(4))
        // alert('CONTENT_CY:'+featureTooltip.GetSize(5))
        // alert('ANCHOR_WIDTH:'+featureTooltip.GetSize(6))
        // alert('ANCHOR_HEIGHT:'+featureTooltip.GetSize(7))
        // alert('ANCHOR_MARGIN:'+featureTooltip.GetSize(8))
        // alert('CLOSEBUTTON_OFFSET:'+featureTooltip.GetSize(9))
        // alert('WINDOWED_OFFSET:'+featureTooltip.GetSize(10))
        options.content = '<style type="text/css">html,body{margin:0px;padding:0px;word-wrap: break-word; word-break: normal;font-size:12px; font-family:"Microsoft Yahei"} *{padding:0px;margin:0px;}</style>'+options.content;
        featureTooltip.ShowBalloon1(options.x,options.y,options.content);
        locaSpaceMap.Refresh();
    }

    map3DViewer.getZoomFrom2DZoom = function(zoom) {
        var RoraTilt = ((map23DData.view.tilt)/180)*Math.PI;
        return this.zoomAry[map23DData.view.zoom] * 1000*Math.cos(RoraTilt);
    }

    map3DViewer.getZoomFrom3DZoom = function(distance) {
        distance = distance / 1000;
        for (var i = 0, len = this.zoomAry.length; i < len; i++) {
            var max = (this.zoomAry[i] + this.zoomAry[i - 1]) / 2;
            var min = (this.zoomAry[i] + this.zoomAry[i + 1]) / 2;
            if (distance < max && distance > min) {
                return i;
            }
        }
    }
    /**
     * 获取3D视角中心点
     */
    map3DViewer.get3DViewCenter = function(){
        var point = locaSpaceMap.CreatePoint2D();
        var S2dx = $('#map3DWrap').width()/2;//3D视图容器宽度的二分之一
        var S2dy = $('#map3DWrap').height()/2;//3D视图容器高度的二分之一
        point.x = parseInt(S2dx);
        point.y = parseInt(S2dy);
        var result = locaSpaceMap.Globe.ScreenToScene(point);
        return {lng:result.x,
                lat:result.y
                };
    }

    //是否显示经纬网
    map3DViewer.setLatLonGridVisible = function(flag){
        locaSpace.SetAtmosphereVisible(flag);
        locaSpaceMap.Refresh();
    }
    //是否显示天空
    map3DViewer.setSkyVisible = function(flag){
        locaSpace.SetAtmosphereVisible(flag);
        locaSpaceMap.Refresh();
    }
    //是否显示大气层
    map3DViewer.setAtmosphereVisible = function(flag){
        locaSpace.SetAtmosphereVisible(flag);
        locaSpaceMap.Refresh();
    }
    //是否显示光影效果
    map3DViewer.setShaderAtmosphereUsing = function(flag){
        locaSpace.SetShaderAtmosphereUsing(flag);
        locaSpaceMap.Refresh();
    }
    //是否显示控制栏
    map3DViewer.setControlPanelVisible = function(flag){
        locaSpace.SetControlPanelVisible(flag);
        locaSpaceMap.Refresh();
    }
    //是否显示状态栏
    map3DViewer.setStatusBarVisible = function(flag){
        locaSpace.SetStatusBarVisible(flag);
        locaSpaceMap.Refresh();
    }
    //是否显示海洋
    map3DViewer.setOceanVisible = function(flag){
        locaSpaceMap.Globe.OceanVisible = flag;
        locaSpaceMap.Refresh();
    }
    //是否显示太阳
    map3DViewer.setSunVisible = function(flag){
        locaSpaceMap.Globe.SunVisible = flag;
        locaSpaceMap.Refresh();
    }
    //是否开启下雪效果
    map3DViewer.setSnowVisible = function(flag){
        locaSpaceMap.Globe.SnowVisible = flag;
        locaSpaceMap.Refresh();
    }
    //是否开启下雨效果
    map3DViewer.setRainVisible = function(flag){
        locaSpaceMap.Globe.RainVisible = flag;
        locaSpaceMap.Refresh();
    }
    //是否显示云层
    map3DViewer.setCloudsVisible = function(flag){
        locaSpaceMap.Globe.CloudsVisible = flag;
        locaSpaceMap.Refresh();
    }
    //是否显示预览小地图
    map3DViewer.setOverviewControl = function(flag){
        locaSpaceMap.Globe.OverviewControl.Visible = flag;
        locaSpaceMap.Refresh();
    }



    //跳转到指定位置
    map3DViewer.setView = function(options) {
        _.merge(map23DData.view, options);
        var newlatlng = window.map23DUtil.latlngsTo3DViewCenter(map23DData.view);
        var map3DHeading = -map23DData.view.heading;
        locaSpace.JumpTo(
            newlatlng.View3Dlng,
            newlatlng.View3Dlat,
            map3DViewer.getZoomFrom2DZoom(map23DData.view.zoom),
            map3DHeading,
            map23DData.view.tilt
        );
        locaSpaceMap.Refresh();
        map23DData.mouseIn = '3D';        
        PubSub.publish('map3D.setView', {
            from: '3D'
        })
    }

    //飞行到指定位置
    map3DViewer.flyTo = function(options) {
        _.merge(map23DData.view, options);
        var newlatlng = window.map23DUtil.latlngsTo3DViewCenter(map23DData.view);
        var map3DHeading = -map23DData.view.heading;
        //longitude, latitude, altitude, dHeading, dTilt, dDistance, altMode
        locaSpace.FlyTo(
            newlatlng.View3Dlng,
            newlatlng.View3Dlat,
            map3DViewer.getZoomFrom2DZoom(map23DData.view.zoom),
            map3DHeading,
            map23DData.view.tilt,
            0,
            1
        );
        locaSpaceMap.Refresh();
        map23DData.mouseIn = '3D';        
        PubSub.publish('map3D.setView', {
            from: '3D'
        })
    }

    //围绕元素旋转
    map3DViewer.flyAroundFeature = function(feature){
        map3DViewer.map.Globe.FlyAroundFeature(feature);
    }

    //DEM
    map3DViewer.DEMTileLayer = function(options) {
        switch (options.action) {
            case 'add':
                var guid = 'tileLayer3DDEM';
                var defaultData = {
                    from: '3D',
                    type: 'tileLayer',
                    guid: guid,
                    layer: {
                        url3D: map23DConfig.tileServerUrl + '/dem?z=%d&x=%d&y=%d',
                    }
                }
                tileLayerData = _.merge(defaultData, options);
                map23DData.layers[guid] = tileLayerData;
                PubSub.publish('map3D.DEMTileLayer.add', guid);
                return guid;
                break;
            case 'remove':
                var guid = options.guid;
                PubSub.publish('map3D.DEMTileLayer.remove', guid);
                return guid;
                break;
        }
    }

    //三维模型
    map3DViewer.model = function(options) {
        switch (options.action) {
            case 'add':
                var guid = options.guid || map23DControl.buildGuid('model3D');
                if(options.guid){
                    guid = 'model3D_'+guid;
                }
                var defaultData = _.cloneDeep(map23DDefaultData.model)
                defaultData.guid = guid;
                defaultData.from = '3D';
                modelData = _.merge(defaultData, options);
                map23DData.models[guid] = modelData;
                PubSub.publish('map3D.model.add', guid);
                return guid;
                break;
            case 'update':
                var guid = options.guid;
                _.merge(map23DData.models[guid], options);
                PubSub.publish('map3D.model.update', guid);
                return guid;
                break;
            case 'remove':
                var guid = options.guid;
                PubSub.publish('map3D.model.remove', guid);
                return guid;
                break;
        }
    }
    

    //3D 组
    map3DViewer.group = function(options) {
        switch (options.action) {
            case 'add':
                return addGroup3D(options);
                break;
            case 'remove':
                return removeGroup3D(options);
                break;
            case 'cleanAll':
                return cleanGroupAllFeatures3D(options);
                break;
        }
    }
    function addGroup3D(options) {
        var guid = options.guid || map23DControl.buildGuid('group3D');
        if(options.guid){
            guid = 'group3D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.group)
        defaultData.guid = guid;
        defaultData.from = '3D';
        _.merge(defaultData, options);
        map23DData.groups[guid] = defaultData;
        PubSub.publishSync('map3D.group.add', guid);
        return guid;
    }
    function removeGroup3D(options){
        if (map23DData.groups[options.guid]) {
            cleanGroupAllFeatures3D(options);
            PubSub.publishSync('map3D.group.remove', options.guid);
            if(map23DData.groups[options.guid].add2D == false){
                delete map23DData.groups[options.guid];
            }
            return options.guid;
        } else {
            return false;
        }
    }
    function cleanGroupAllFeatures3D(options) {
        if (map23DData.groups[options.guid]) {
            //移除点
            _(map23DData.markers).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map3DViewer.marker({
                        action: 'remove',
                        guid: key
                    })
                }
            });
            //移除线
            _(map23DData.polylines).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map3DViewer.polyline({
                        action: 'remove',
                        guid: key
                    })
                }
            });
            //移除面
            _(map23DData.polygons).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map3DViewer.polygon({
                        action: 'remove',
                        guid: key
                    })
                }
            });

            //移除圆
            _(map23DData.circles).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map3DViewer.circle({
                        action: 'remove',
                        guid: key
                    })
                }
            });

            //移除模型
            _(map23DData.models).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map3DViewer.model({
                        action: 'remove',
                        guid: key
                    })
                }
            });
            return options.guid;
        } else {
            return false
        }
    }

    //3D 点
    map3DViewer.marker = function(options) {
        switch (options.action) {
            case 'add':
                return addMarker3D(options);
                break;
            case 'remove':
                return removeMarker3D(options);
                break;
            case 'update':
                return updateMarker3D(options);
                break;
        }
    }
    function addMarker3D(options) {
        var guid = options.guid || map23DControl.buildGuid('marker3D');
        if(options.guid){
            guid = 'marker3D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.marker)
        defaultData.guid = guid;
        defaultData.from = '3D';
        _.merge(defaultData, options);
        map23DData.markers[guid] = defaultData;
        PubSub.publishSync('map3D.marker.add', guid);
        return guid;
    }
    function removeMarker3D(options) {
        if (map23DData.markers[options.guid]) {
            PubSub.publishSync('map3D.marker.remove', options.guid);
            if(map23DData.markers[options.guid].add2D == false){
                delete map23DData.markers[options.guid];
            }
            return options.guid;
        } else {
            return false;
        }
    }
    function updateMarker3D(options){
        if (map23DData.markers[options.guid]) {
            _.merge(map23DData.markers[options.guid], options);
            PubSub.publishSync('map3D.marker.update', options.guid);            
            return options.guid;
        } else {
            return false;
        }
    }
    //3D瓦片图层
    //
    map3DViewer.tileLayer = function(options) {
        switch (options.action) {
            case 'add':
                return addTileLayer3D(options);
                break;
            case 'remove':
                return removeTileLayer3D(options);
                break;
        }
    }
    function addTileLayer3D(options) {
        var guid = options.guid || map23DControl.buildGuid('tileLayer3D');
        if(options.guid){
            guid = 'tileLayer3D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.layer)
        defaultData.guid = guid;
        defaultData.from = '3D';
         _.merge(defaultData, options);
        map23DData.layers[guid] = defaultData;
        PubSub.publishSync('map3D.tileLayer.add', guid);
        return guid;
    }

    /**
     * 移除图层组，移除前先清除图层组中的元素
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function removeTileLayer3D(options) {
        if (map23DData.layers[options.guid]) {
            PubSub.publishSync('map3D.tileLayer.remove', options.guid);
            if(map23DData.layers[options.guid].add2D == false){
                delete map23DData.layers[options.guid];
            }
            return options.guid;
        } else {
            return false;
        }
    }

    //3D绑定Label
    map3DViewer.label = function(options){
        switch (options.action) {
            case 'add':
                return PubSub.publishSync('map3D.label.add', options);
                break;
            case 'remove':
                return PubSub.publishSync('map3D.label.remove', options);
                break;
            case 'update':
                return PubSub.publishSync('map3D.label.update', options);
                break;
        }
    }

    //3D 线
    map3DViewer.polyline = function(options) {
        switch (options.action) {
            case 'add':
                return addPolyline3D(options);
                break;
            case 'remove':
                return removePolyline3D(options);
                break;
            case 'update':
                return updatePolyline3D(options);
                break;
        }
    }
    function addPolyline3D(options) {
        var guid = options.guid || map23DControl.buildGuid('polyline3D');
        if(options.guid){
            guid = 'polyline3D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.polyline)
        defaultData.guid = guid;
        defaultData.from = '3D';
        _.merge(defaultData, options);
        map23DData.polylines[guid] = defaultData;
        PubSub.publishSync('map3D.polyline.add', guid);
        return guid;
    }
    function removePolyline3D(options) {
        if (map23DData.polylines[options.guid]) {
            PubSub.publishSync('map3D.polyline.remove', options.guid);
            if(map23DData.polylines[options.guid].add2D == false){
                delete map23DData.polylines[options.guid]; 
            }
            return options.guid;
        } else {
            return false;
        }
    }
    function updatePolyline3D(options){
        if (map23DData.polylines[options.guid]) {
            _.merge(map23DData.polylines[options.guid], options);
            PubSub.publishSync('map3D.polyline.update', options.guid);            
            return options.guid;
        } else {
            return false;
        }
    }

    //3D 面
    map3DViewer.polygon = function(options) {
        switch (options.action) {
            case 'add':
                return addPolygon3D(options);
                break;
            case 'remove':
                return removePolygon3D(options);
                break;
            case 'update':
                return updatePolygon3D(options);
                break;
        }
    }
    function addPolygon3D(options) {
        var guid = options.guid || map23DControl.buildGuid('polygon3D');
        if(options.guid){
            guid = 'polygon3D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.polyline)
        defaultData.guid = guid;
        defaultData.from = '3D';
        _.merge(defaultData, options);
        map23DData.polygons[guid] = defaultData;
        PubSub.publishSync('map3D.polygon.add', guid);
        return guid;
    }
    function removePolygon3D(options) {
        if (map23DData.polygons[options.guid]) {
            PubSub.publishSync('map3D.polygon.remove', options.guid);
            if(map23DData.polygons[options.guid].add2D == false){
                delete map23DData.polygons[options.guid];
            }
            return options.guid;
        } else {
            return false;
        }
    }
    function updatePolygon3D(options){
        if (map23DData.polygons[options.guid]) {
            _.merge(map23DData.polygons[options.guid], options);
            PubSub.publishSync('map3D.polygon.update', options.guid);            
            return options.guid;
        } else {
            return false;
        }
    }


    //3D 圆
    map3DViewer.circle = function(options) {
        switch (options.action) {
            case 'add':
                return addCircle3D(options);
                break;
            case 'remove':
                return removeCircle3D(options);
                break;
            case 'update':
                return updateCircle3D(options);
                break;
        }
    }
    function addCircle3D(options) {
        var guid = options.guid || map23DControl.buildGuid('circle3D');
        if(options.guid){
            guid = 'circle3D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.circle)
        defaultData.guid = guid;
        defaultData.from = '3D';
        _.merge(defaultData, options);
        map23DData.circles[guid] = defaultData;
        PubSub.publishSync('map3D.circle.add', guid);
        return guid;
    }
    function removeCircle3D(options) {
        if (map23DData.circles[options.guid]) {
            PubSub.publishSync('map3D.circle.remove', options.guid);
            if(map23DData.circles[options.guid].add2D == false){
                delete map23DData.circles[options.guid];
            }
            return options.guid;
        } else {
            return false;
        }
    }
    function updateCircle3D(options){
        if (map23DData.circles[options.guid]) {
            _.merge(map23DData.circles[options.guid], options);
            PubSub.publishSync('map3D.circle.update', options.guid);            
            return options.guid;
        } else {
            return false;
        }
    }
    
}(window, document));

;
(function(window, document, undefined) {
    var group = map23DControl.group;
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = group;
    } else if (typeof define === 'function' && define.amd) {
        define(group);
    }

    map23DControl.group = function(options) {
        switch (options.action) {
            case 'add':
                return addgroup(options);
                break;
            case 'remove':
                return removegroup(options);
                break;
            case 'cleanAll':
                return cleanAllFeatures(options);
                break;
        }
    }

    function addgroup(options) {
        var guid = options.guid || map23DControl.buildGuid('group23D');
        if(options.guid){
            guid = 'group23D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.group)
        defaultData.guid = guid;
        _.merge(defaultData, options);
        map23DData.groups[guid] = defaultData;
        PubSub.publishSync('map23D.group.add', guid);
        return guid;
    }

    /**
     * 移除图层组，移除前先清除图层组中的元素
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function removegroup(options) {
        if (map23DData.groups[options.guid]) {
            cleanAllFeatures(options);
            PubSub.publishSync('map23D.group.remove', options.guid);
            delete map23DData.groups[options.guid];
            return options.guid;
        } else {
            return false;
        }
    }

    /**
     * 清除图层组元素
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function cleanAllFeatures(options) {
        if (map23DData.groups[options.guid]) {
            //移除点
            _(map23DData.markers).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map23DControl.marker({
                        action: 'remove',
                        guid: key
                    })
                }
            });
            //移除线
            _(map23DData.polylines).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map23DControl.polyline({
                        action: 'remove',
                        guid: key
                    })
                }
            });
            //移除面
            _(map23DData.polygons).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map23DControl.polygon({
                        action: 'remove',
                        guid: key
                    })
                }
            });

            //移除圆
            _(map23DData.circles).forEach(function(item, key) {
                if (item.groupId == options.guid) {
                    map23DControl.circle({
                        action: 'remove',
                        guid: key
                    })
                }
            });
            
            return options.guid;
        } else {
            return false
        }
    }

}(window, document));

;
(function(window, document, undefined) {
    var circle = map23DControl.circle;
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = circle;
    } else if (typeof define === 'function' && define.amd) {
        define(circle);
    }

    map23DControl.circle = function(options) {
        switch (options.action) {
            case 'add':
                return addCircle(options);
                break;
            case 'remove':
                return removeCircle(options);
                break;
            case 'update':
                return updateCircle(options);
                break;
        }
    }


    function addCircle(options) {
        var guid = options.guid || map23DControl.buildGuid('circle23D');
        if(options.guid){
            guid = 'circle23D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.circle)
        defaultData.guid = guid;
        _.merge(defaultData, options);
        map23DData.circles[guid] = defaultData;
        PubSub.publishSync('map23D.circle.add', guid);
        return guid;
    }

    function removeCircle(options) {
        if (map23DData.circles[options.guid]) {
            PubSub.publishSync('map23D.circle.remove', options.guid);
            delete map23DData.circles[options.guid];
            return options.guid;
        } else {
            return false;
        }
    }

    function updateCircle(options) {
        if (map23DData.circles[options.guid]) {
            _.merge(map23DData.circles[options.guid], options);
            PubSub.publishSync('map23D.circle.update', options.guid);
            return options.guid;
        } else {
            return false
        }
    }

}(window, document));

;
(function(window, document, undefined) {
    var marker = map23DControl.marker;
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = marker;
    } else if (typeof define === 'function' && define.amd) {
        define(marker);
    }

    map23DControl.marker = function(options) {
        switch (options.action) {
            case 'add':
                return addMarker(options);
                break;
            case 'remove':
                return removeMarker(options);
                break;
            case 'update':
                return updateMarker(options);
                break;
            case 'show':
                return showMarker(options);
                break;
            case 'hide':
                return hideMarker(options);
                break;
        }
    }
    function showMarker(options){
        var guid = options.guid;
        PubSub.publishSync('map2D.marker.show', guid);
    };
    function hideMarker(options){
        var guid = options.guid;
        PubSub.publishSync('map2D.marker.hide', guid);
    };
    function addMarker(options) {
        var guid = options.guid || map23DControl.buildGuid('marker23D');
        if(options.guid){
            guid = 'marker23D_'+guid;
        }
        if (!options.RBkey) {
            var markerTime = null;
        } else {
            var markerTime = map23DData.polylines[map2DViewer.routeBackGroup[options.RBkey].polyline].geojson.properties.times;
        }

        var defaultData = _.cloneDeep(map23DDefaultData.marker)
        defaultData.guid = guid;
        defaultData.geojson.properties.markerTime = markerTime;

        _.merge(defaultData, options);
        map23DData.markers[guid] = defaultData;
        PubSub.publishSync('map23D.marker.add', guid);

        return guid;
    }

    function removeMarker(options) {
        if (map23DData.markers[options.guid]) {
            PubSub.publishSync('map23D.marker.remove', options.guid);
            delete map23DData.markers[options.guid];
            return options.guid;
        } else {
            return false;
        }
    }

    function updateMarker(options) {
        if (map23DData.markers[options.guid]) {
            _.merge(map23DData.markers[options.guid], options);
            PubSub.publishSync('map23D.marker.update', options.guid);
            return options.guid;
        } else {
            return false
        }
    }

}(window, document));

;
(function(window, document, undefined) {
    var polyline = map23DControl.polyline;
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = polyline;
    } else if (typeof define === 'function' && define.amd) {
        define(polyline);
    }

    map23DControl.polyline = function(options) {
        switch (options.action) {
            case 'add':
                return addPolyline(options);
                break;
            case 'remove':
                return removePolyline(options);
                break;
            case 'update':
                return updatePolyline(options);
                break;
        }
    }


    function addPolyline(options) {
        var guid = options.guid || map23DControl.buildGuid('polyline23D');
        if(options.guid){
            guid = 'polyline23D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.polyline)
        defaultData.guid = guid;
        _.merge(defaultData, options);
        map23DData.polylines[guid] = defaultData;
        PubSub.publishSync('map23D.polyline.add', guid);
        return guid;
    }

    function removePolyline(options) {
        if (map23DData.polylines[options.guid]) {
            PubSub.publishSync('map23D.polyline.remove', options.guid);
            delete map23DData.polylines[options.guid];
            return options.guid;
        } else {
            return false;
        }
    }

    function updatePolyline(options) {
        if (map23DData.polylines[options.guid]) {
            _.merge(map23DData.polylines[options.guid], options);
            PubSub.publishSync('map23D.polyline.update', options.guid);
            return options.guid;
        } else {
            return false
        }
    }

}(window, document));

;
(function(window, document, undefined) {
    var polygon = map23DControl.polygon;
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = polygon;
    } else if (typeof define === 'function' && define.amd) {
        define(polygon);
    }

    map23DControl.polygon = function(options) {
        switch (options.action) {
            case 'add':
                return addPolygon(options);
                break;
            case 'remove':
                return removePolygon(options);
                break;
            case 'update':
                return updatePolygon(options);
                break;
        }
    }

    function addPolygon(options) {
        var guid = options.guid || map23DControl.buildGuid('polygon23D');
        if(options.guid){
            guid = 'polygon23D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.polygon)
        defaultData.guid = guid;
        _.merge(defaultData, options);
        map23DData.polygons[guid] = defaultData;
        PubSub.publishSync('map23D.polygon.add', guid);
        return guid;
    }

    function removePolygon(options) {
        if (map23DData.polygons[options.guid]) {
            PubSub.publishSync('map23D.polygon.remove', options.guid);
            delete map23DData.polygons[options.guid];
            return options.guid;
        } else {
            return false;
        }

    }

    function updatePolygon(options) {
        if (map23DData.polygons[options.guid]) {
            _.merge(map23DData.polygons[options.guid], options);
            PubSub.publishSync('map23D.polygon.update', options.guid);
            return options.guid;
        } else {
            return false
        }
    }

}(window, document));

; 
(function(window, document, undefined) {
    var tileLayer = map23DControl.tileLayer;
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = tileLayer;
    } else if (typeof define === 'function' && define.amd) {
        define(tileLayer);
    }

    map23DControl.tileLayer = function(options) {
        switch (options.action) {
            case 'add':
                return addTileLayer(options);
                break;
            case 'remove':
                return removeTileLayer(options);
                break;
            case 'update':
                return updateTileLayer(options);
        }
    }

    function addTileLayer(options) {
        var guid = options.guid || map23DControl.buildGuid('tileLayer23D');
        if(options.guid){
            guid = 'tileLayer23D_'+guid;
        }
        var defaultData = _.cloneDeep(map23DDefaultData.layer)
        defaultData.guid = guid;
        _.merge(defaultData, options);
        map23DData.layers[guid] = defaultData;
        PubSub.publishSync('map23D.tileLayer.add', guid);
        return guid;
    }

    /**
     * 移除图层组，移除前先清除图层组中的元素
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function removeTileLayer(options) {
        if (map23DData.layers[options.guid]) {
            PubSub.publishSync('map23D.tileLayer.remove', options.guid);
            delete map23DData.layers[options.guid];
            return options.guid;
        } else {
            return false;
        }
    }

    function updateTileLayer(options) {
        if (map23DData.layers[options.guid]) {
            _.merge(map23DData.layers[options.guid], options);
            PubSub.publishSync('map23D.tileLayer.update', options.guid);
            return options.guid;
        } else {
            return false;
        }
    }

}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map23D.group.add', add2Dgroup);
    PubSub.subscribe('map23D.group.remove', remove2Dgroup);
    PubSub.subscribe('map2D.group.add', add2Dgroup);
    PubSub.subscribe('map2D.group.show', show2Dgroup);
    PubSub.subscribe('map2D.group.hide', hide2Dgroup);
    PubSub.subscribe('map2D.group.remove', remove2Dgroup);

    function add2Dgroup(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var groupData = map23DData.groups[guid];
        if (groupData.from === '3D') {
            return false;
        }
        if (groupData.clustering) {
            var group = L.markerClusterGroup(groupData.clusterOptions);
        } else {
            var group = L.featureGroup();
        }

        group.guid = guid;
        group.addTo(map2DViewer.map);
        map2DViewer.groups[guid] = group;
        groupData.add2D = true;
        groupData.visible2D = true;
    }

    function show2Dgroup(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var groupData = map23DData.groups[guid];
        if (groupData.from === '3D') {
            return false;
        }
        if(groupData.visible2D){
            return false;
        }
        map2DViewer.groups[guid].addTo(map2DViewer.map);
        groupData.visible2D = true;
    }

    function hide2Dgroup(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var groupData = map23DData.groups[guid];
        if (groupData.from === '3D') {
            return false;
        }
        if(!groupData.visible2D){
            return false;
        }
        map2DViewer.map.removeLayer(map2DViewer.groups[guid]);
        groupData.visible2D = false;
    }

    function remove2Dgroup(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var groupData = map23DData.groups[guid];
        if (groupData.from === '3D') {
            return false;
        }        
        map2DViewer.map.removeLayer(map2DViewer.groups[guid]);
        delete map2DViewer.groups[guid];
        groupData.add2D = false;
    }

}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map23D.group.add', add3Dgroup);
    PubSub.subscribe('map23D.group.remove', remove3Dgroup);

    PubSub.subscribe('map3D.group.add', add3Dgroup);
    PubSub.subscribe('map3D.group.remove', remove3Dgroup);

    function add3Dgroup(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var groupData = map23DData.groups[guid];
        if (groupData.from === '2D') {
            return false;
        }
        var group = locaSpaceMap.Globe.Layers.Add1(guid + ".lgd");
        map3DViewer.groups[guid] = group;
        groupData.add3D = true;
        locaSpaceMap.Refresh();
    };

    function remove3Dgroup(msg, guid) {        
        if (!map3DViewer.inited) {
            return false;
        }
        var groupData = map23DData.groups[guid];
        if (groupData.from === '2D') {
            return false;
        }
        if (map3DViewer.groups[guid] != null) {
            locaSpaceMap.Globe.Layers.RemoveLayerByID(map3DViewer.groups[guid].ID);
        }
        delete map3DViewer.groups[guid];
        groupData.add3D = false;
        locaSpaceMap.Refresh();
    };


}(window, document));

;
(function(window, document, undefined) {
    PubSub.subscribe('map23D.marker.add', add2Dmarker);
    PubSub.subscribe('map23D.marker.remove', remove2Dmarker);
    PubSub.subscribe('map23D.marker.update', update2Dmarker);

    PubSub.subscribe('map2D.marker.add', add2Dmarker);
    PubSub.subscribe('map2D.marker.show', show2Dmarker);
    PubSub.subscribe('map2D.marker.hide', hide2Dmarker);
    PubSub.subscribe('map2D.marker.remove', remove2Dmarker);
    PubSub.subscribe('map2D.marker.update', update2Dmarker);

    function marker_icon(markerData) {
        if (markerData.geojson.properties.fontIcon) {
            var icon_html = '<div width="' + markerData.geojson.properties.iconSize[0] + '" \
                            height="' + markerData.geojson.properties.iconSize[1] + '" \
                            style="color:' + markerData.geojson.properties.fontColor + ';\
                            line-height:1;\
                            font-weight:' + markerData.geojson.properties.fontWeight + '; \
                            font-size:' + markerData.geojson.properties.fontSize + 'px; \
                            -webkit-transform: rotate(' + markerData.geojson.properties.iconRorate + 'deg); \
                            transform-origin:' + markerData.geojson.properties.iconAnchor[0] + 'px ' + markerData.geojson.properties.iconAnchor[1] + 'px;\
                            -ms-transform-origin:' + markerData.geojson.properties.iconAnchor[0] + 'px ' + markerData.geojson.properties.iconAnchor[1] + 'px;\
                            -moz-transform:rotate(' + markerData.geojson.properties.iconRorate + 'deg);\
                            -ms-transform:rotate(' + markerData.geojson.properties.iconRorate + 'deg);">' + markerData.geojson.properties.fontIcon +
                '</div>';

        } else {
            var icon_html = '<img width="' + markerData.geojson.properties.iconSize[0] + '" \
                                height="' + markerData.geojson.properties.iconSize[1] + '" \
                                src="' + markerData.geojson.properties.iconUrl + '" \
                                style=" -webkit-transform: rotate(' + markerData.geojson.properties.iconRorate + 'deg); \
                                transform-origin:' + markerData.geojson.properties.iconAnchor[0] + 'px ' + markerData.geojson.properties.iconAnchor[1] + 'px;\
                                -ms-transform-origin:' + markerData.geojson.properties.iconAnchor[0] + 'px ' + markerData.geojson.properties.iconAnchor[1] + 'px;\
                                -moz-transform:rotate(' + markerData.geojson.properties.iconRorate + 'deg);\
                                -ms-transform:rotate(' + markerData.geojson.properties.iconRorate + 'deg);" />';

        }
        return icon_html;
    }

    function add2Dmarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var markerData = map23DData.markers[guid];
        if (markerData.from === '3D') {
            return false;
        }
        if (markerData['animate']) {
            var icon_html = marker_icon(markerData);
            var setDivIcon = L.divIcon({
                className: 'rorate_div',
                html: icon_html,
                iconAnchor: markerData.geojson.properties.iconAnchor,
                iconSize: markerData.geojson.properties.iconSize,
                popupAnchor: markerData.geojson.properties.popupAnchor
            });
            var marker = L.animatedMarker(map2DViewer.polylines[map2DViewer.routeBackGroup[markerData.RBkey].polyline].getLatLngs(), {
                icon: setDivIcon,
                autoStart: markerData.geojson.properties.autoStart,
                interval: markerData.geojson.properties.interval,
                distance: markerData.geojson.properties.distance,
                onEnd: function() {
                    marker.stop();
                }
            });
        } else {
            var icon_html = marker_icon(markerData);
            var setDivIcon = L.divIcon({
                className: 'rorate_div',
                html: icon_html,
                iconAnchor: markerData.geojson.properties.iconAnchor,
                iconSize: markerData.geojson.properties.iconSize,
                popupAnchor: markerData.geojson.properties.popupAnchor
            });
            var marker = L.marker(
                map23DUtil.latLngsToReverse(markerData.geojson.geometry.coordinates), {
                    icon: setDivIcon,
                    title: markerData.geojson.properties.title
                }
            )
        }
 
        marker.guid = guid;
        if (markerData.geojson.properties.popupContent) {
            marker.bindPopup(markerData.geojson.properties.popupContent)
        }
        if (markerData.groupId) {
            marker.addTo(map2DViewer.groups[markerData.groupId]);            
        } else {
            marker.addTo(map2DViewer.map);
        }
        map2DViewer.markers[guid] = marker;
        markerData.add2D = true;
        markerData.visible2D = true;
    };

    function show2Dmarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var markerData = map23DData.markers[guid];
        if (markerData.from === '3D') {
            return false;
        }
        if(markerData.visible2D){
            return false;
        }
        if (markerData.groupId) {
            map2DViewer.markers[guid].addTo(map2DViewer.groups[markerData.groupId]);            
        } else {
            map2DViewer.markers[guid].addTo(map2DViewer.map);
        }
        markerData.visible2D = true;
    }

    function hide2Dmarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var markerData = map23DData.markers[guid];
        if (markerData.from === '3D') {
            return false;
        }
        if(!markerData.visible2D){
            return false;
        }
        if (markerData.groupId) {
            map2DViewer.groups[markerData.groupId].removeLayer(map2DViewer.markers[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.markers[guid]);
        }
        markerData.visible2D = false;
    }

    function remove2Dmarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var markerData = map23DData.markers[guid];
        if (markerData.from === '3D') {
            return false;
        }
        if (markerData.groupId) {
            map2DViewer.groups[markerData.groupId].removeLayer(map2DViewer.markers[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.markers[guid]);
        }
        delete map2DViewer.markers[guid]; 
        markerData.add2D = false;
    };

    function update2Dmarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        if (map23DData.markers[guid]) {

            var markerData = map23DData.markers[guid];
            
            if (markerData.from === '3D') {
                return false;
            }
            var marker = map2DViewer.markers[guid];
            marker.setLatLng(map23DUtil.latLngsToReverse(markerData.geojson.geometry.coordinates));

            var icon_html = marker_icon(markerData);

            var setDivIcon = L.divIcon({
                className: 'rorate_div',
                html: icon_html,
                iconAnchor: markerData.geojson.properties.iconAnchor,
                iconSize: markerData.geojson.properties.iconSize,
                popupAnchor: markerData.geojson.properties.popupAnchor
            });
            marker.setIcon(setDivIcon);
            if (markerData.geojson.properties.popupContent) {
                marker.bindPopup(markerData.geojson.properties.popupContent)
            }
        }
    };
}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map23D.marker.add', add3Dmarker);
    PubSub.subscribe('map23D.marker.remove', remove3Dmarker);
    PubSub.subscribe('map23D.marker.update', update3Dmarker);

    PubSub.subscribe('map3D.marker.add', add3Dmarker);
    PubSub.subscribe('map3D.marker.remove', remove3Dmarker);
    PubSub.subscribe('map3D.marker.update', update3Dmarker);


    function add3Dmarker(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var markerData = map23DData.markers[guid];
        if (markerData.from === '2D') {
            return false;
        }

        var marker = getMarkerStyle(markerData);

        var markerFeature = locaSpace.CreateFeature();        
        markerFeature.Geometry = marker;
        markerFeature.Name = guid;
        markerFeature.Visible = true;

        if (markerData.groupId) {
            var groupLayer = locaSpaceMap.Globe.Layers.GetLayerByCaption(markerData.groupId);
            groupLayer.AddFeature(markerFeature);
        } else {
            locaSpaceMap.Globe.MemoryLayer.AddFeature(markerFeature);
        }

        map3DViewer.markers[guid] = markerFeature;
        markerData.add3D = true;
        locaSpaceMap.Refresh();
    };

    function getMarkerStyle(markerData){
        var marker = locaSpace.CreateGeoMarker();

        //图标设置
        var markerStyle = new ActiveXObject("LocaSpacePlugin.GSAMarkerStyle3D");
        markerStyle.IconPath = markerData.geojson.properties.icon3DUrl || markerData.geojson.properties.iconUrl;
        markerStyle.IconScale = markerData.geojson.properties.iconScale;
        markerStyle.IconAvoidance = true;

        //文字设置
        var newTextStyle = locaSpaceMap.CreateTextStyle();
        newTextStyle.FontSize = markerData.geojson.properties.titleFontSize; //字体大小
        newTextStyle.FontWeight = 22;
        var newColor = locaSpaceMap.CreateColorRGBA();
        var newColorRGB = new Color(markerData.geojson.properties.titleColor, 1);
        var newColorRGBAry = newColorRGB.rgbData();
        newColor.SetValue(newColorRGBAry[0], newColorRGBAry[1], newColorRGBAry[2], 250);
        newTextStyle.ForeColor = newColor; //把设置的颜色赋值给字体颜色
        var outlineColor = locaSpaceMap.CreateColorRGBA();
        outlineColor.SetValue(0, 0, 0, 250);
        newTextStyle.OutlineColor = outlineColor;
        newTextStyle.FontName = 'Microsoft Yahei';
        markerStyle.TextStyle = newTextStyle;
        markerStyle.TextVisible = true;
        marker.Text = markerData.geojson.properties.title || '';
        //newTextStyle.Alignment = 1;

        //属性设置
        marker.Style = markerStyle;
        marker.X = markerData.geojson.geometry.coordinates[0];
        marker.Y = markerData.geojson.geometry.coordinates[1];
        marker.Z = markerData.geojson.properties.altitude;
        marker.AltitudeMode = markerData.geojson.properties.altitudeMode;

        return marker;
    }

    function remove3Dmarker(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var markerData = map23DData.markers[guid];
        if (markerData.from === '2D') {
            return false;
        }
        if (markerData.groupId) {
            locaSpace.RemoveFeatureByName(guid, markerData.groupId);
        } else {
            locaSpace.RemoveFeatureByName(guid);
        }
        delete map3DViewer.markers[guid];
        markerData.add3D = false;
        locaSpaceMap.Refresh();
    };

    function update3Dmarker(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        if (map23DData.markers[guid]) {
            var markerData = map23DData.markers[guid];
            if (markerData.from === '2D') {
                return false;
            }
            var markerStyle = getMarkerStyle(markerData); 
            var marker = map3DViewer.markers[guid];   

            marker.Geometry = markerStyle;
            //marker.Label.Visible = true;
            locaSpaceMap.Refresh();
        }
    };
}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map23D.polyline.add', add2Dpolyline);
    PubSub.subscribe('map23D.polyline.remove', remove2Dplyline);
    PubSub.subscribe('map23D.polyline.update', update2Dpolyline);

    PubSub.subscribe('map2D.polyline.add', add2Dpolyline);
    PubSub.subscribe('map2D.polyline.show', show2Dpolyline);
    PubSub.subscribe('map2D.polyline.hide', hide2Dpolyline);
    PubSub.subscribe('map2D.polyline.remove', remove2Dplyline);
    PubSub.subscribe('map2D.polyline.update', update2Dpolyline);


    function add2Dpolyline(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var polylineData = map23DData.polylines[guid];
        if (polylineData.from === '3D') {
            return false;
        }
        var polyline = L.polyline(
            map23DUtil.latLngsToReverse(polylineData.geojson.geometry.coordinates), {
                color: polylineData.geojson.properties.color,
                weight: polylineData.geojson.properties.weight,
                opacity: polylineData.geojson.properties.opacity,
                title: polylineData.geojson.properties.title,
                dashArray: polylineData.geojson.properties.dashArray,
                lineJoin: polylineData.geojson.properties.lineJoin,
                lineCap: polylineData.geojson.properties.lineCap
            }
        )
        if(polylineData.linetype === "circleline"){
            L.Util.circleDrawLatlng(polyline);
        }
        polyline.guid = guid;
        polyline.linetype = polylineData.linetype;
        
        if (polylineData.geojson.properties.popupContent) {
            polyline.bindPopup(polylineData.geojson.properties.popupContent)
        }

        if (polylineData.groupId) {
            polyline.addTo(map2DViewer.groups[polylineData.groupId]);
        } else {
            polyline.addTo(map2DViewer.map);
        }

        map2DViewer.polylines[guid] = polyline; 
        polylineData.add2D = true;
        polylineData.visible2D = true;
    };

    function show2Dpolyline(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var polylineData = map23DData.polylines[guid];
        if (polylineData.from === '3D') {
            return false;
        }
        if(polylineData.visible2D){
            return false;
        }
        if (polylineData.groupId) {
            map2DViewer.polylines[guid].addTo(map2DViewer.groups[polylineData.groupId]);            
        } else {
            map2DViewer.polylines[guid].addTo(map2DViewer.map);
        }
        polylineData.visible2D = true;
    }

    function hide2Dpolyline(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var polylineData = map23DData.polylines[guid];
        if (polylineData.from === '3D') {
            return false;
        }
        if(!polylineData.visible2D){
            return false;
        }
        if (polylineData.groupId) {
            map2DViewer.groups[polylineData.groupId].removeLayer(map2DViewer.polylines[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.polylines[guid]);
        }
        polylineData.visible2D = false;
    }

    function remove2Dplyline(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var polylineData = map23DData.polylines[guid];
        if (polylineData.from === '3D') {
            return false;
        }
        if (polylineData.groupId) {
            map2DViewer.groups[polylineData.groupId].removeLayer(map2DViewer.polylines[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.polylines[guid]);
        }
        delete map2DViewer.polylines[guid];
        polylineData.add2D = false;
    };

    function update2Dpolyline(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        } 
        var polylineData = map23DData.polylines[guid];
        if (polylineData.from === '3D') {
            return false;
        }
        map2DViewer.polylines[guid].setStyle(
            polylineData.geojson.properties
          );
        if(polylineData.geojson.hasOwnProperty('geometry')){
            if(polylineData.geojson.geometry.coordinates.length > 1){
                 map2DViewer.polylines[guid].setLatLngs(map23DUtil.latLngsToReverse(polylineData.geojson.geometry.coordinates));
            }
        }

        if (polylineData.geojson.properties.popupContent) {
            polyline.bindPopup(polylineData.geojson.properties.popupContent)
        }

    };
}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map23D.polyline.add', add3Dpolyline);
    PubSub.subscribe('map23D.polyline.remove', remove3Dpolyline);
    PubSub.subscribe('map23D.polyline.update', update3Dpolyline);

    PubSub.subscribe('map3D.polyline.add', add3Dpolyline);
    PubSub.subscribe('map3D.polyline.remove', remove3Dpolyline);
    PubSub.subscribe('map3D.polyline.update', update3Dpolyline);


    function add3Dpolyline(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var polylineData = map23DData.polylines[guid];
        if (polylineData.from === '2D') {
            return false;
        }

        var geoNewLine = getPolylineStyle(polylineData);

        var polyline = locaSpace.CreateFeature();
        polyline.Geometry = geoNewLine;
        polyline.Name = guid;

        if (polylineData.groupId) {
            var groupLayer = locaSpaceMap.Globe.Layers.GetLayerByCaption(polylineData.groupId);
            groupLayer.AddFeature(polyline);
        } else {
            locaSpaceMap.Globe.MemoryLayer.AddFeature(polyline);
        }

        map3DViewer.polylines[guid] = polyline;
        polylineData.add3D = true;
        locaSpaceMap.Refresh();
    };

    function getPolylineStyle(polylineData){
        var geoNewLine = locaSpaceMap.CreateGeoPolyline3D();
        var pnts = locaSpaceMap.CreatePoint3ds();

        for (var i = 0, l = polylineData.geojson.geometry.coordinates.length; i < l; i++) {
            pnts.Add(polylineData.geojson.geometry.coordinates[i][0], polylineData.geojson.geometry.coordinates[i][1], polylineData.geojson.properties.altitude[i]);
        }

        geoNewLine.AddPart(pnts);
        geoNewLine.AltitudeMode = polylineData.geojson.properties.altitudeMode; //0紧贴地表 1海拔高度 2相对地表
        //线样式设置
        var newLineStyle = locaSpaceMap.CreateSimpleLineStyle3D();
        var newColor = locaSpaceMap.CreateColorRGBA();
        var newColorRGB = new Color(polylineData.geojson.properties.color, polylineData.geojson.properties.opacity);
        var newColorRGBAry = newColorRGB.rgbData();
        newColor.SetValue(newColorRGBAry[0], newColorRGBAry[1], newColorRGBAry[2], polylineData.geojson.properties.opacity * 250);
        newLineStyle.LineColor = newColor;
        // 线宽设置
        newLineStyle.LineWidth = polylineData.geojson.properties.weight;
        //线样式设置
        newLineStyle.LineType = polylineData.geojson.properties.lineType;
        geoNewLine.Style = newLineStyle;
        //拉伸
        var extrudeStyle = locaSpaceMap.CreateExtrudeStyle();
        var extrudePolygonStyle = locaSpaceMap.CreateSimplePolygonStyle3D();
        var fillColor = locaSpaceMap.CreateColorRGBA();
        var newFillColorRGB = new Color(polylineData.geojson.properties.color, polylineData.geojson.properties.opacity);
        var newFillColorRGBAry = newFillColorRGB.rgbData();
        fillColor.SetValue(newFillColorRGBAry[0], newFillColorRGBAry[1], newFillColorRGBAry[2], polylineData.geojson.properties.opacity * 250);
        // 拉伸颜色填充设置
        extrudePolygonStyle.FillColor = fillColor;
        extrudePolygonStyle.Fill = true;

        extrudeStyle.ExtrudeValue = polylineData.geojson.properties.extrude;
        extrudeStyle.BodyStyle = extrudePolygonStyle;
        geoNewLine.ExtrudeStyle = extrudeStyle;

        return geoNewLine;
    }

    function remove3Dpolyline(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var polylineData = map23DData.polylines[guid];
        if (polylineData.from === '2D') {
            return false;
        }
        if (polylineData.groupId) {
            locaSpace.RemoveFeatureByName(guid, polylineData.groupId);
        } else {
            locaSpace.RemoveFeatureByName(guid);
        }
        delete map3DViewer.polylines[guid];
        polylineData.add3D = false;
        locaSpaceMap.Refresh();
    };

    function update3Dpolyline(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var polylineData = map23DData.polylines[guid];
        if (polylineData.from === '2D') {
            return false;
        }

        var geoNewLine = getPolylineStyle(polylineData);
        var polyline = map3DViewer.polylines[guid];
        polyline.Geometry = geoNewLine;
        locaSpaceMap.Refresh();
    };

}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map23D.polygon.add', add2Dpolygon);
    PubSub.subscribe('map23D.polygon.remove', remove2Dpolygon);
    PubSub.subscribe('map23D.polygon.update', update2Dpolygon);

    PubSub.subscribe('map2D.polygon.add', add2Dpolygon);
    PubSub.subscribe('map2D.polygon.show', show2Dpolygon);
    PubSub.subscribe('map2D.polygon.hide', hide2Dpolygon);
    PubSub.subscribe('map2D.polygon.remove', remove2Dpolygon);
    PubSub.subscribe('map2D.polygon.update', update2Dpolygon);

    function add2Dpolygon(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var polygonData = map23DData.polygons[guid];
        if (polygonData.from === '3D') {
            return false;
        }
        var polygon = L.polygon(
            map23DUtil.latLngsToReverse(polygonData.geojson.geometry.coordinates[0]), {
                color: polygonData.geojson.properties.color,
                weight: polygonData.geojson.properties.weight,
                fillColor: polygonData.geojson.properties.fillColor,
                opacity: polygonData.geojson.properties.opacity,
                fillOpacity: polygonData.geojson.properties.fillOpacity,
                title: polygonData.geojson.properties.title
            }
        )
        if(polygonData.polygontype === "circlepolygon"){
            L.Util.circleDrawLatlng(polygon);
        }
        polygon.guid = guid;
        polygon.polygontype = polygonData.polygontype;
        if (polygonData.geojson.properties.popupContent) {
            polygon.bindPopup(polygonData.geojson.properties.popupContent)
        }

        if (polygonData.groupId) {
            polygon.addTo(map2DViewer.groups[polygonData.groupId]);
        } else {
            polygon.addTo(map2DViewer.map);
        }

        map2DViewer.polygons[guid] = polygon;
        polygonData.add2D = true;
        polygonData.visible2D = true;
    };

    function show2Dpolygon(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var polygonData = map23DData.polygons[guid];
        if (polygonData.from === '3D') {
            return false;
        }
        if(polygonData.visible2D){
            return false;
        }
        if (polygonData.groupId) {
            map2DViewer.polygons[guid].addTo(map2DViewer.groups[polygonData.groupId]);            
        } else {
            map2DViewer.polygons[guid].addTo(map2DViewer.map);
        }
        polygonData.visible2D = true;
    }

    function hide2Dpolygon(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var polygonData = map23DData.polygons[guid];
        if (polygonData.from === '3D') {
            return false;
        }
        if(!polygonData.visible2D){
            return false;
        }
        if (polygonData.groupId) {
            map2DViewer.groups[polygonData.groupId].removeLayer(map2DViewer.polygons[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.polygons[guid]);
        }
        polygonData.visible2D = false;
    }

    function remove2Dpolygon(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var polygonData = map23DData.polygons[guid];
        if (polygonData.from === '3D') {
            return false;
        }
        if (polygonData.groupId) {
            map2DViewer.groups[polygonData.groupId].removeLayer(map2DViewer.polygons[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.polygons[guid]);
        }
        delete map2DViewer.polygons[guid];
        polygonData.add2D = false;
    };

    function update2Dpolygon(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var polygonData = map23DData.polygons[guid];
        if (polygonData.from === '3D') {
            return false;
        }
        map2DViewer.polygons[guid].setStyle(
            polygonData.geojson.properties
        );
        if(polygonData.geojson.hasOwnProperty('geometry')){
            if(polygonData.geojson.geometry.coordinates[0].length > 1){
                 map2DViewer.polygons[guid].setLatLngs(map23DUtil.latLngsToReverse(polygonData.geojson.geometry.coordinates[0]));
            }
        }
        if (polygonData.geojson.properties.popupContent) {
            polygon.bindPopup(polygonData.geojson.properties.popupContent)
        }
    };
}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map23D.polygon.add', add3Dpolygon);
    PubSub.subscribe('map23D.polygon.remove', remove3Dpolygon);
    PubSub.subscribe('map23D.polygon.update', update3Dpolygon);

    PubSub.subscribe('map3D.polygon.add', add3Dpolygon);
    PubSub.subscribe('map3D.polygon.remove', remove3Dpolygon);
    PubSub.subscribe('map3D.polygon.update', update3Dpolygon);

    function add3Dpolygon(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var polygonData = map23DData.polygons[guid];
        if (polygonData.from === '2D') {
            return false;
        }
        
        var geoNewPolygon = getPolygonStyle(polygonData);

        var polygon = locaSpace.CreateFeature();
        polygon.Geometry = geoNewPolygon;
        polygon.Name = guid;

        if (polygonData.groupId) {
            var groupLayer = locaSpaceMap.Globe.Layers.GetLayerByCaption(polygonData.groupId);
            groupLayer.AddFeature(polygon);
        } else {
            locaSpaceMap.Globe.MemoryLayer.AddFeature(polygon);
        }

        map3DViewer.polygons[guid] = polygon;
        polygonData.add3D = true;
        locaSpaceMap.Refresh();
    };

    function getPolygonStyle(polygonData){
        var geoNewPolygon = locaSpaceMap.CreateGeoPolygon3D();
        var pnts = locaSpaceMap.CreatePoint3ds();

        for (var i = 0, l = polygonData.geojson.geometry.coordinates[0].length; i < l; i++) {
            pnts.Add(polygonData.geojson.geometry.coordinates[0][i][0], polygonData.geojson.geometry.coordinates[0][i][1], polygonData.geojson.properties.altitude[i]);
        }

        geoNewPolygon.AddPart(pnts);
        geoNewPolygon.AltitudeMode = polygonData.geojson.properties.altitudeMode; //0紧贴地表 1海拔高度 2相对地表


        //填充色设置
        var newPolygonStyle = locaSpaceMap.CreateSimplePolygonStyle3D();
        var fillColor = locaSpaceMap.CreateColorRGBA();

        var newFillColorRGB = new Color(polygonData.geojson.properties.fillColor, polygonData.geojson.properties.fillOpacity);
        var newFillColorRGBAry = newFillColorRGB.rgbData();
        fillColor.SetValue(newFillColorRGBAry[0], newFillColorRGBAry[1], newFillColorRGBAry[2], polygonData.geojson.properties.fillOpacity * 250);
        // 颜色填充设置
        newPolygonStyle.FillColor = fillColor;
        newPolygonStyle.Fill = true;


        // 线宽,颜色设置
        var newLineStyle = locaSpaceMap.CreateSimpleLineStyle3D();
        var newColor = locaSpaceMap.CreateColorRGBA();
        var newColorRGB = new Color(polygonData.geojson.properties.color, polygonData.geojson.properties.opacity);
        var newColorRGBAry = newColorRGB.rgbData();
        newColor.SetValue(newColorRGBAry[0], newColorRGBAry[1], newColorRGBAry[2], polygonData.geojson.properties.opacity * 250);
        // 线颜色设置
        newLineStyle.LineColor = newColor;
        // 线宽设置
        newLineStyle.LineWidth = polygonData.geojson.properties.weight;

        newPolygonStyle.OutlineStyle = newLineStyle;

        geoNewPolygon.Style = newPolygonStyle;


        //拉伸
        var extrudeStyle = locaSpaceMap.CreateExtrudeStyle();

        var extrudePolygonStyle = locaSpaceMap.CreateSimplePolygonStyle3D();
        var fillColor = locaSpaceMap.CreateColorRGBA();

        var newFillColorRGB = new Color(polygonData.geojson.properties.color, polygonData.geojson.properties.fillOpacity);
        var newFillColorRGBAry = newFillColorRGB.rgbData();
        fillColor.SetValue(newFillColorRGBAry[0], newFillColorRGBAry[1], newFillColorRGBAry[2], polygonData.geojson.properties.fillOpacity * 250);
        // 拉伸颜色填充设置
        extrudePolygonStyle.FillColor = fillColor;
        extrudePolygonStyle.Fill = true;

        extrudeStyle.ExtrudeValue = polygonData.geojson.properties.extrude;
        extrudeStyle.BodyStyle = extrudePolygonStyle;
        extrudeStyle.TailStyle = newPolygonStyle;
        geoNewPolygon.ExtrudeStyle = extrudeStyle;

        return geoNewPolygon;
    }

    function remove3Dpolygon(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var polygonData = map23DData.polygons[guid];
        if (polygonData.from === '2D') {
            return false;
        }
        if (polygonData.groupId) {
            locaSpace.RemoveFeatureByName(guid, polygonData.groupId);
        } else {
            locaSpace.RemoveFeatureByName(guid);
        }
        delete map3DViewer.polygons[guid];
        polygonData.add3D = false;
        locaSpaceMap.Refresh();
    };

    function update3Dpolygon(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var polygonData = map23DData.polygons[guid];
        if (polygonData.from === '2D') {
            return false;
        }
        var geoNewPolygon = getPolygonStyle(polygonData);
        var polygon = map3DViewer.polygons[guid];
        polygon.Geometry = geoNewPolygon;
        locaSpaceMap.Refresh();

    };
}(window, document));

; 
(function(window, document, undefined) {

    PubSub.subscribe('map23D.tileLayer.add', add2Dlayer);
    PubSub.subscribe('map23D.tileLayer.remove', remove2Dlayer);
    PubSub.subscribe('map23D.tileLayer.update', update2Dlayer);

    PubSub.subscribe('map2D.tileLayer.add', add2Dlayer);
    PubSub.subscribe('map2D.tileLayer.show', show2Dlayer);
    PubSub.subscribe('map2D.tileLayer.hide', hide2Dlayer);
    PubSub.subscribe('map2D.tileLayer.remove', remove2Dlayer);
    PubSub.subscribe('map2D.tileLayer.update', update2Dlayer);

    PubSub.subscribe('map2D.defaultTileLayer.change', default2DtileLayer);

    function default2DtileLayer(msg, options) {
        var guid = 'tileLayer2DDefault';

        if (options.mapName.length == 0) {
            if (map2DViewer.layers[guid]) {
                map2DViewer.map.removeLayer(map2DViewer.layers[guid]);
                delete map23DData.layers[guid];
            }
            return guid;
        }

        if (map2DViewer.layers[guid]) {
            map2DViewer.map.removeLayer(map2DViewer.layers[guid]);
        }

        var tileLayerData = {
            from: '2D',
            type: 'tileLayer',
            guid: guid,
            layer: {
                url2D: map23DConfig.tileServerUrl + '/' + options.mapName + '?l={z}&x={x}&y={y}',
                minZoom: map23DConfig.map2DMinZoom || 1,
                maxZoom: map23DConfig.map2DMaxZoom || 21,
                maxNativeZoom: map23DConfig.map2DMaxZoom || 21,
                attribution: '',
                opacity: 1
            }
        }
        map23DData.layers[guid] = tileLayerData;

        var tileLayer = L.tileLayer(tileLayerData.layer.url2D, {
            minZoom: tileLayerData.layer.minZoom,
            maxZoom: tileLayerData.layer.maxZoom,
            opacity: tileLayerData.layer.opacity,
            maxNativeZoom: tileLayerData.layer.maxNativeZoom,
            attribution: tileLayerData.layer.attribution,
            noWrap: true
        });
 
        tileLayer.guid = guid;
        tileLayer.addTo(map2DViewer.map);
        tileLayer.bringToBack();
        map2DViewer.layers[guid] = tileLayer;

        return guid;
    }

    /**
     * 根据GUID添加图层
     * @param {[type]} msg  [description]
     * @param {[type]} guid [description]
     */
    function add2Dlayer(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var tileLayerData = map23DData.layers[guid];
        if (tileLayerData.from === '3D') {
            return false;
        }
        var tileLayer = L.tileLayer(tileLayerData.layer.url2D, {
            minZoom: tileLayerData.layer.minZoom,
            maxZoom: tileLayerData.layer.maxZoom,
            opacity: tileLayerData.layer.opacity,
            attribution: tileLayerData.layer.attribution,
            noWrap: true
        });

        tileLayer.guid = guid;
        tileLayer.addTo(map2DViewer.map);
        map2DViewer.layers[guid] = tileLayer;
        tileLayerData.add2D = true;
        tileLayerData.visible2D = true;
    }

    function show2Dlayer(msg, options) {
        if (!map2DViewer.inited) {
            return false;
        }
        var tileLayerData = map23DData.layers[guid];
        if (tileLayerData.from === '3D') {
            return false;
        }
        if(tileLayerData.visible2D){
            return false;
        }
        map2DViewer.layers[guid].addTo(map2DViewer.map);
        tileLayerData.visible2D = true;
    }

    function hide2Dlayer(msg, options) {
        if (!map2DViewer.inited) {
            return false;
        }
        var tileLayerData = map23DData.layers[guid];
        if (tileLayerData.from === '3D') {
            return false;
        }
        if(!tileLayerData.visible2D){
            return false;
        }
        map2DViewer.map.removeLayer(map2DViewer.layers[guid]);
        tileLayerData.visible2D = false;
    }

    /**
     * 移除指定GUID的图层
     * @param  {[type]} msg  [description]
     * @param  {[type]} guid [description]
     * @return {[type]}      [description]
     */
    function remove2Dlayer(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var tileLayerData = map23DData.layers[guid];
        if (tileLayerData.from === '3D') {
            return false;
        }
        map2DViewer.map.removeLayer(map2DViewer.layers[guid]);
        delete map2DViewer.layers[guid];
        tileLayerData.add2D = false;
    }

    /**
     * 更新指定GUID的图层
     * @param  {[type]} msg  [description]
     * @param  {[type]} guid [description]
     * @return {[type]}      [description]
     */
    function update2Dlayer(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var tileLayerData = map23DData.layers[guid];
        if (tileLayerData.from === '3D') {
            return false;
        }
        var tileLayer = map2DViewer.layers[guid];
        if (tileLayer.options.opacity != tileLayerData.layer.opacity) {
            tileLayer.setOpacity(tileLayerData.layer.opacity);
        }
        if (tileLayer._url != tileLayerData.layer.url2D) {
            tileLayer.setUrl(tileLayerData.layer.url2D);
        }
    }

}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map23D.tileLayer.add', add3DtileLayer);
    PubSub.subscribe('map23D.tileLayer.remove', remove3DtileLayer);

    PubSub.subscribe('map3D.tileLayer.add', add3DtileLayer);
    PubSub.subscribe('map3D.tileLayer.remove', remove3DtileLayer);

    function add3DtileLayer(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        } 
        var tileLayerData = map23DData.layers[guid];
        if (tileLayerData.from === '2D') {
            return false;
        }

        var tileLayer = locaSpaceMap.Globe.Layers.AddTileLayer(
            3, 256, 
            tileLayerData.layer.minZoom, 
            tileLayerData.layer.maxZoom, 
            -180, 180, -90, 90,
            tileLayerData.layer.imageType,
            tileLayerData.layer.url3D,
            guid, "urlformat");

        map3DViewer.layers[guid] = tileLayer;
        tileLayerData.add3D = true;
        locaSpaceMap.Refresh();
    };

    function remove3DtileLayer(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var tileLayerData = map23DData.layers[guid];
        if (tileLayerData.from === '2D') {
            return false;
        }
        if (map3DViewer.layers[guid] != null) {
            locaSpaceMap.Globe.Layers.RemoveLayerByID(map3DViewer.layers[guid].ID);
        }
        delete map3DViewer.layers[guid];
        tileLayerData.add3D = false;
        locaSpaceMap.Refresh();
    };
}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map23D.circle.add', add2Dcircle);
    PubSub.subscribe('map23D.circle.remove', remove2Dcircle);
    PubSub.subscribe('map23D.circle.update', update2Dcircle);

    PubSub.subscribe('map2D.circle.add', add2Dcircle);
    PubSub.subscribe('map2D.circle.remove', remove2Dcircle);
    PubSub.subscribe('map2D.circle.update', update2Dcircle);
    PubSub.subscribe('map2D.circle.show', show2Dcircle);
    PubSub.subscribe('map2D.circle.hide', hide2Dcircle);
    
    function add2Dcircle(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleData = map23DData.circles[guid];
        if (circleData.from === '3D') {
            return false;
        }
        var circle = L.circle(
            map23DUtil.latLngsToReverse(circleData.geojson.geometry.coordinates), 
            circleData.geojson.properties.radius,{
                color: circleData.geojson.properties.color,
                weight: circleData.geojson.properties.weight,
                fillColor: circleData.geojson.properties.fillColor,
                opacity: circleData.geojson.properties.opacity,
                fillOpacity: circleData.geojson.properties.fillOpacity,
                title: circleData.geojson.properties.title
            }
        )

        circle.guid = guid;
        
        if (circleData.geojson.properties.popupContent) {
            circle.bindPopup(circleData.geojson.properties.popupContent)
        }
        if (circleData.groupId) {
            circle.addTo(map2DViewer.groups[circleData.groupId]);
        } else {
            circle.addTo(map2DViewer.map);
        }

        map2DViewer.circles[guid] = circle;
        circleData.add2D = true;
        circleData.visible2D = true;
    };

    function show2Dcircle(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleData = map23DData.circles[guid];
        if (circleData.from === '3D') {
            return false;
        }
        if(circleData.visible2D){
            return false;
        }
        if (circleData.groupId) {
            map2DViewer.circles[guid].addTo(map2DViewer.groups[circleData.groupId]);
        } else {
            map2DViewer.circles[guid].addTo(map2DViewer.map);
        }
        circleData.visible2D = true;
    };

    function hide2Dcircle(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleData = map23DData.circles[guid];
        if (circleData.from === '3D') {
            return false;
        }
        if(!circleData.visible2D){
            return false;
        }
        if (circleData.groupId) {
            map2DViewer.groups[circleData.groupId].removeLayer(map2DViewer.circles[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.circles[guid]);
        }
        circleData.visible2D = false;
    };

    function remove2Dcircle(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleData = map23DData.circles[guid];
        if (circleData.from === '3D') {
            return false;
        }
        if (circleData.groupId) {
            map2DViewer.groups[circleData.groupId].removeLayer(map2DViewer.circles[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.circles[guid]);
        }
        delete map2DViewer.circles[guid];
        circleData.add2D = false;
    };

    function update2Dcircle(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleData = map23DData.circles[guid];
        if (circleData.from === '3D') {
            return false;
        }
        map2DViewer.circles[guid].setStyle(
            circleData.geojson.properties
        );
        if (circleData.geojson.properties.popupContent) {
            circle.bindPopup(circleData.geojson.properties.popupContent)
        }
        if(circleData.geojson.hasOwnProperty('geometry')){
            map2DViewer.circles[guid].setLatLng(map23DUtil.latLngsToReverse(circleData.geojson.geometry.coordinates));
            map2DViewer.circles[guid].setRadius(circleData.geojson.properties.radius);
        }
    };
}(window, document));

;
(function(window, document, undefined) {
    PubSub.subscribe('map2D.circleMarker.add', add2DcircleMarker);
    PubSub.subscribe('map2D.circleMarker.remove', remove2DcircleMarker);
    PubSub.subscribe('map2D.circleMarker.update', update2DcircleMarker);
    PubSub.subscribe('map2D.circleMarker.show', show2DcircleMarker);
    PubSub.subscribe('map2D.circleMarker.hide', hide2DcircleMarker);
    
    function add2DcircleMarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleMarkerData = map23DData.circleMarkers[guid];
        if (circleMarkerData.from === '3D') {
            return false;
        }
        var circleMarker = L.circleMarker(
            map23DUtil.latLngsToReverse(circleMarkerData.geojson.geometry.coordinates),{ 
                radius: circleMarkerData.geojson.properties.radius,
                color: circleMarkerData.geojson.properties.color,
                weight: circleMarkerData.geojson.properties.weight,
                fillColor: circleMarkerData.geojson.properties.fillColor,
                opacity: circleMarkerData.geojson.properties.opacity,
                fillOpacity: circleMarkerData.geojson.properties.fillOpacity,
                title: circleMarkerData.geojson.properties.title
            }
        )

        circleMarker.guid = guid;
        
        if (circleMarkerData.geojson.properties.popupContent) {
            circleMarker.bindPopup(circleMarkerData.geojson.properties.popupContent)
        }
        if (circleMarkerData.groupId) {
            circleMarker.addTo(map2DViewer.groups[circleMarkerData.groupId]);
        } else {
            circleMarker.addTo(map2DViewer.map);
        }

        map2DViewer.circleMarkers[guid] = circleMarker;
        circleMarkerData.add2D = true;
        circleMarkerData.visible2D = true;
    };

    function show2DcircleMarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleMarkerData = map23DData.circleMarkers[guid];
        if (circleMarkerData.from === '3D') {
            return false;
        }
        if(circleMarkerData.visible2D){
            return false;
        }
        if (circleMarkerData.groupId) {
            map2DViewer.circleMarkers[guid].addTo(map2DViewer.groups[circleMarkerData.groupId]);
        } else {
            map2DViewer.circleMarkers[guid].addTo(map2DViewer.map);
        }
        circleMarkerData.visible2D = true;
    };

    function hide2DcircleMarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleMarkerData = map23DData.circleMarkers[guid];
        if (circleMarkerData.from === '3D') {
            return false;
        }
        if(!circleMarkerData.visible2D){
            return false;
        }
        if (circleMarkerData.groupId) {
            map2DViewer.groups[circleMarkerData.groupId].removeLayer(map2DViewer.circleMarkers[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.circleMarkers[guid]);
        }
        circleMarkerData.visible2D = false;
    };

    function remove2DcircleMarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleMarkerData = map23DData.circleMarkers[guid];
        if (circleMarkerData.from === '3D') {
            return false;
        }
        if (circleMarkerData.groupId) {
            map2DViewer.groups[circleMarkerData.groupId].removeLayer(map2DViewer.circleMarkers[guid]);
        } else {
            map2DViewer.map.removeLayer(map2DViewer.circleMarkers[guid]);
        }
        delete map2DViewer.circleMarkers[guid];
        circleMarkerData.add2D = false;
    };

    function update2DcircleMarker(msg, guid) {
        if (!map2DViewer.inited) {
            return false;
        }
        var circleMarkerData = map23DData.circleMarkers[guid];
        if (circleMarkerData.from === '3D') {
            return false;
        }
        map2DViewer.circleMarkers[guid].setStyle(
            circleMarkerData.geojson.properties
        );
        if (circleMarkerData.geojson.properties.popupContent) {
            circleMarker.bindPopup(circleMarkerData.geojson.properties.popupContent)
        }
        if(circleMarkerData.geojson.hasOwnProperty('geometry')){
            map2DViewer.circleMarkers[guid].setLatLng(map23DUtil.latLngsToReverse(circleMarkerData.geojson.geometry.coordinates));
            map2DViewer.circleMarkers[guid].setRadius(circleMarkerData.geojson.properties.radius);
        }
    };
}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map3D.DEMTileLayer.add', add3DDEMTileLayer);
    PubSub.subscribe('map3D.DEMTileLayer.remove', remove3DDEMTileLayer);


    function add3DDEMTileLayer(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var tileLayerData = map23DData.layers[guid];
        var tileUrl = tileLayerData.layer.url3D;

        var tileLayer = locaSpaceMap.Globe.Terrains.AddTileTerrain(
            3, 129, 1, 0, 19, -180, 180, -90, 90, "dtpt",
            tileUrl,
            guid, "urlformat");

        map3DViewer.layers[guid] = tileLayer;
        locaSpaceMap.Refresh();
    };

    function remove3DDEMTileLayer(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        if (map3DViewer.layers[guid] != null) {
            locaSpaceMap.Globe.Layers.RemoveLayerByID(map3DViewer.layers[guid].ID);
        }
        delete map3DViewer.layers[guid];
        locaSpaceMap.Refresh();
    };
}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map3D.model.add', add3DModel);
    PubSub.subscribe('map3D.model.update', update3DModel);
    PubSub.subscribe('map3D.model.remove', remove3DModel);


    function add3DModel(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var modelData = map23DData.models[guid];
        if (modelData.from === '2D') {
            return false;
        }
        var feature = locaSpaceMap.CreateFeature();
        feature.Name = guid;
        var modelStyle = getModelStyle(modelData);
        feature.Geometry = modelStyle;
        feature.Visible = modelData.geojson.properties.visible;
        feature.Description = modelData.geojson.properties.title;
        if (modelData.groupId) {
            var groupLayer = locaSpaceMap.Globe.Layers.GetLayerByCaption(modelData.groupId);
            groupLayer.AddFeature(polyline);
        } else {
            locaSpaceMap.Globe.MemoryLayer.AddFeature(feature);
        }
        map3DViewer.models[guid] = feature;
        modelData.add3D = true;
        locaSpaceMap.Refresh();
    };

    function getModelStyle(modelData){
        var model = locaSpaceMap.CreateGeoModel();
        model.FilePath = modelData.geojson.properties.url;
        model.PositonX = modelData.geojson.geometry.coordinates[0];
        model.PositonY = modelData.geojson.geometry.coordinates[1];
        model.PositonZ = modelData.geojson.properties.altitude;
        model.RotateX = modelData.geojson.properties.rotate[0];
        model.RotateY = modelData.geojson.properties.rotate[1];
        model.RotateZ = modelData.geojson.properties.rotate[2];
        model.AltitudeMode = modelData.geojson.properties.altitudeMode;
        model.SetScale(modelData.geojson.properties.scale);
        return model;
    }

    function update3DModel(msg,guid){
        if (!map3DViewer.inited) {
            return false;
        }
        var modelData = map23DData.models[guid];
        if (modelData.from === '2D') {
            return false;
        }
        if (map3DViewer.models[guid] == null) {
            return false;
        }
        var feature = map3DViewer.models[guid];
        var modelStyle = getModelStyle(modelData);
        feature.Geometry = modelStyle;
        feature.Visible = modelData.geojson.properties.visible;
        feature.Description = modelData.geojson.properties.title;
        locaSpaceMap.Refresh();
    }

    function remove3DModel(msg, guid) {
        if (!map3DViewer.inited) {
            return false;
        }
        var modelData = map23DData.models[guid];
        if (modelData.from === '2D') {
            return false;
        }
        if (map3DViewer.models[guid] != null) {
            locaSpaceMap.Globe.MemoryLayer.RemoveFeatureByID(map3DViewer.models[guid].ID);
        }
        delete map3DViewer.models[guid];
        modelData.add3D = false;
        locaSpaceMap.Refresh();
    };
}(window, document));

;
(function(window, document, undefined) {

    PubSub.subscribe('map3D.label.add', add3Dlabel);
    PubSub.subscribe('map3D.label.remove', remove3Dlabel);
    PubSub.subscribe('map3D.label.update', update3Dlabel);


    function add3Dlabel(msg, options) {
        if (!map3DViewer.inited) {
            return false;
        }
        switch(options.featureType){
            case 'marker':
                var featuerData = map23DData.markers[options.guid];
                var feature = map3DViewer.markers[options.guid];
                break;
            case 'polyline':
                var featuerData = map23DData.polylines[options.guid];
                var feature = map3DViewer.polylines[options.guid];
                break;
            case 'polygon':
                var featuerData = map23DData.polygons[options.guid];
                var feature = map3DViewer.polygons[options.guid];
                break;
            case 'circle':
                var featuerData = map23DData.circles[options.guid];
                var feature = map3DViewer.circles[options.guid];
                break;
            case 'model':
                var featuerData = map23DData.models[options.guid];
                var feature = map3DViewer.models[options.guid];
                break;
        }

        if(!featuerData || !feature){
            return false;
        }
        
        if (featuerData.from === '2D') {
            return false;
        }
        
        //label设置
        feature.Label = getLabelStyle(options.label);        
        locaSpaceMap.Refresh();
    };

    function getLabelStyle(labelData){
        var labelStyle = locaSpace.CreateLabel();
        labelStyle.Text = labelData.text;
        labelStyle.Style = new ActiveXObject("LocaSpacePlugin.GSALabelStyle");
        labelStyle.Style.TracktionLineType = 0;
        labelStyle.Style.TracktionLineWidth = 1;

        //偏移量
        var tractionPos = new ActiveXObject("LocaSpacePlugin.GSAPoint2d");
        tractionPos.X = labelData.lineLeft ||40;
        tractionPos.Y = labelData.lineTop || 30;
        labelStyle.Style.TractionLineEndPos = tractionPos;

        //文字设置
        var newTextStyle = locaSpaceMap.CreateTextStyle();
        newTextStyle.FontSize = labelData.fontSize || 10; //字体大小
        newTextStyle.FontWeight = 22;
        var newColor = locaSpaceMap.CreateColorRGBA();
        var newColorRGB = new Color((labelData.textColor||'#000000'), 1);
        var newColorRGBAry = newColorRGB.rgbData();
        newColor.SetValue(newColorRGBAry[0], newColorRGBAry[1], newColorRGBAry[2], 250);
        newTextStyle.ForeColor = newColor; //把设置的颜色赋值给字体颜色
        newTextStyle.FontName = 'Microsoft Yahei';
        newTextStyle.Alignment = 6;

        labelStyle.Style.TextStyle = newTextStyle;

        //线条颜色
        var new2Color = locaSpaceMap.CreateColorRGBA();
        var new2ColorRGB = new Color((labelData.lineColor||'#000000'), 1);
        var new2ColorRGBAry = new2ColorRGB.rgbData();
        new2Color.SetValue(new2ColorRGBAry[0], new2ColorRGBAry[1], new2ColorRGBAry[2], 250);
        labelStyle.Style.TractionLineColor = new2Color;        
        labelStyle.Style.OutlineColor = new2Color;


        //背景颜色
        var new3Color = locaSpaceMap.CreateColorRGBA();
        var new3ColorRGB = new Color((labelData.background||'#ffffff'), 1);
        var new3ColorRGBAry = new3ColorRGB.rgbData();
        new3Color.SetValue(new3ColorRGBAry[0], new3ColorRGBAry[1], new3ColorRGBAry[2], 250);
        labelStyle.Style.BackBeginColor = new3Color;
        labelStyle.Style.BackMidColor = new3Color;
        labelStyle.Style.BackEndColor = new3Color;


        labelStyle.Style.TextMarginX = 2;
        labelStyle.Style.TextMarginY = 0;

        return labelStyle;
    }

    function remove3Dlabel(msg, options) {
        if (!map3DViewer.inited) {
            return false;
        }
        switch(options.featureType){
            case 'marker':
                var featuerData = map23DData.markers[options.guid];
                var feature = map3DViewer.markers[options.guid];
                break;
            case 'polyline':
                var featuerData = map23DData.polylines[options.guid];
                var feature = map3DViewer.polylines[options.guid];
                break;
            case 'polygon':
                var featuerData = map23DData.polygons[options.guid];
                var feature = map3DViewer.polygons[options.guid];
                break;
            case 'circle':
                var featuerData = map23DData.circles[options.guid];
                var feature = map3DViewer.circles[options.guid];
                break;
            case 'model':
                var featuerData = map23DData.models[options.guid];
                var feature = map3DViewer.models[options.guid];
                break;
        }

        if(!featuerData || !feature){
            return false;
        }
        if (featuerData.from === '2D') {
            return false;
        }

        //label设置
        feature.Label.Visible = false;   

        locaSpaceMap.Refresh();
    };

    function update3Dlabel(msg, options) {
        if (!map3DViewer.inited) {
            return false;
        }
        switch(options.featureType){
            case 'marker':
                var featuerData = map23DData.markers[options.guid];
                var feature = map3DViewer.markers[options.guid];
                break;
            case 'polyline':
                var featuerData = map23DData.polylines[options.guid];
                var feature = map3DViewer.polylines[options.guid];
                break;
            case 'polygon':
                var featuerData = map23DData.polygons[options.guid];
                var feature = map3DViewer.polygons[options.guid];
                break;
            case 'circle':
                var featuerData = map23DData.circles[options.guid];
                var feature = map3DViewer.circles[options.guid];
                break;
            case 'model':
                var featuerData = map23DData.models[options.guid];
                var feature = map3DViewer.models[options.guid];
                break;
        }

        if(!featuerData || !feature){
            return false;
        }

        //label设置
        feature.Label = getLabelStyle(options.label);        
        locaSpaceMap.Refresh();
        
    };
}(window, document));

;
(function(window, document, undefined) {
    // PubSub.subscribe('map2D.cartodbLayer.add', add2DcartodbLayer);
    // PubSub.subscribe('map2D.cartodbLayer.remove', remove2DcartodbLayer);
    

    // function add2DcartodbLayer(msg, guid){
    //     if (!map2DViewer.inited) {
    //         return false;
    //     }
    //     var cartodbData = map23DData.layers[guid];
    //     cartodbData.map = cartodbData.map || map2DViewer.map;
    //     cartodb.createLayer(cartodbData.map, cartodbData.layer.url2D)
    //         .addTo(cartodbData.map)
    //         .on('done', function(layer) {
    //             layer.guid = guid;
    //             map2DViewer.layers[guid] = layer;
    //             cartodbData.add2D = true;
    //         })
    //         .on('error', function(err) {
    //           alert("some error occurred: " + err);
    //         });
    // }

    // function remove2DcartodbLayer(msg, guid){
    //     if (!map2DViewer.inited) {
    //         return false;
    //     }
    //     var cartodbData = map23DData.layers[guid];

    //     map2DViewer.map.removeLayer(map2DViewer.layers[guid]);

    //     delete map2DViewer.layers[guid];
    //     cartodbData.add2D = false;

    // }
}(window, document));

;(function (window, document, undefined) {

    window.locaSpaceMap = null;
    window.locaSpace = {};

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = locaSpace;
    } else if (typeof define === 'function' && define.amd) {
        define(locaSpace);
    }


    //加载WEB三维控件
    function DetectActiveX() {
        try {
            var comActiveX = new ActiveXObject("LocaSpacePlugin.LocaSpacePluginCtrl.1");
        } catch (e) {
            return false;
        }
        return true;
    }
    locaSpace.DetectActiveX = DetectActiveX;

    //初始化地球
    function InitGlobal(globeDiv) {
        var result = false;
        if (locaSpace.DetectActiveX() == false) {
            var earthDiv = document.getElementById("map3DWrap");
            earthDiv.innerHTML =
                '<div id="LocaSpacePluginNote">3D地球支持32位的IE9/IE10浏览器访问，并且需要安装 <a href="/soft/LocaSpacePlugin.msi" target="_blank">LocaSpacePlugin</a> 插件。<br/>安装后请关闭所有浏览器并重新打开！</div>';
        } else {
            try {
                var earthDiv = document.getElementById(globeDiv);
                earthDiv.innerHTML = "<OBJECT ID=\"MyGlobe\" CLASSID=\"CLSID:0E7A33FF-6238-41A6-A38D-AC3F755F92B6\"  WIDTH=\"100%\" HEIGHT=\"100%\" style=\"position:Relative;left:0px;top:0px;\"></OBJECT>";
                locaSpaceMap = document.getElementById("MyGlobe");
                result = true;
            } catch (e) {
                alert(e.description);
            }
        }
        return result;
    }
    locaSpace.InitGlobal = InitGlobal;

    function SetAction(nValue) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.Action = nValue;
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.SetAction = SetAction;

    function ClearMeasure() {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.ClearMeasure();
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.ClearMeasure = ClearMeasure;

    function SetAntialiasing(bValue) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.Antialiasing = bValue;
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.SetAntialiasing = SetAntialiasing;

    function SetFeatureMouseOverEnable(bValue) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.FeatureMouseOverEnable = bValue;
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.SetFeatureMouseOverEnable = SetFeatureMouseOverEnable;

    function SetShaderAtmosphereUsing(bValue) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.Atmosphere.ShaderUsing = bValue;
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.SetShaderAtmosphereUsing = SetShaderAtmosphereUsing;

    function SetAtmosphereVisible(bVisible) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.Atmosphere.Visible = bVisible;
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.SetAtmosphereVisible = SetAtmosphereVisible;

    function SetControlPanelVisible(bVisible) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.ControlPanelVisible = bVisible;
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.SetControlPanelVisible = SetControlPanelVisible;

    function SetStatusBarVisible(bVisible) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.StatusBarVisible = bVisible;
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.SetStatusBarVisible = SetStatusBarVisible;

    function SetLatLonGridVisible(bVisible) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.LatLonGridVisible = bVisible;
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.SetLatLonGridVisible = SetLatLonGridVisible;

    function SetSkyVisible(bVisible) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.SkyVisible = bVisible;
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.SetSkyVisible = SetSkyVisible;


    function ConnectServer(strIP, nPort) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.ConnectServer(strIP, nPort, "", "");
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.ConnectServer = ConnectServer;


    //加载图层
    function AddLayer(strFilePath) {
        try {
            if (locaSpaceMap != null) {
                return locaSpaceMap.Globe.Layers.Add1(strFilePath);
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.AddLayer = AddLayer;

    //加载地形
    function AddTerrain(strFilePath) {

        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.Terrains.Add1(strFilePath);
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.AddTerrain = AddTerrain;

    //打开工作空间
    function OpenWorkSpace(strFilePath) {
        try {
            if (locaSpaceMap != null) {
                locaSpaceMap.Globe.OpenWorkSpace(strFilePath);
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.OpenWorkSpace = OpenWorkSpace;

    function FlyTo1(longitude, latitude, altitude, dDistance, altMode) {
        FlyTo(longitude, latitude, altitude, altMode, 0, 0, dDistance);
    }
    locaSpace.FlyTo1 = FlyTo1;

    function FlyTo(longitude, latitude, altitude, dHeading, dTilt, dDistance, altMode) {
        try {
            if (locaSpaceMap != null) {
                var pnt3d = CreatePoint3D();
                pnt3d.SetValue(longitude, latitude, altitude);
                locaSpaceMap.Globe.FlyToPosition1(pnt3d, altMode, dHeading, dTilt, dDistance);
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.FlyTo = FlyTo;

    function JumpTo1(longitude, latitude, altitude, dDistance, altMode) {
        JumpTo(longitude, latitude, altitude, altMode, 0, 0, dDistance);
    }
    locaSpace.JumpTo1 = JumpTo1;

    function JumpTo(longitude, latitude, altitude, heading, tilt) {
        try {
            if (locaSpaceMap != null) {
                var cameraState = CreateCameraState();
                cameraState.Latitude = latitude;
                cameraState.Longitude = longitude;
                cameraState.Altitude = altitude;
                cameraState.Heading = heading;
                cameraState.AltitudeMode = 1;
                cameraState.Tilt = tilt;
                locaSpaceMap.Globe.JumpToCameraState(cameraState);
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.JumpTo = JumpTo;

    //定点飞行
    function FlyToPlace(longitude, latitude, altitude, heading, tilt) {
        try {
            if (locaSpaceMap != null) {
                var cameraState = CreateCameraState();
                cameraState.Latitude = latitude;
                cameraState.Longitude = longitude;
                cameraState.Altitude = altitude;
                cameraState.Heading = heading;
                cameraState.AltitudeMode = 1;
                cameraState.Tilt = tilt;
                locaSpaceMap.Globe.FlyToCameraState(cameraState);
            }
        } catch (e) {
            alert(e.description);
        }
    }
    locaSpace.FlyToPlace = FlyToPlace;    

    function CreatePoint3D() {
        var pnt3D = new ActiveXObject("LocaSpacePlugin.GSAPoint3d");
        return pnt3D;
    }
    locaSpace.CreatePoint3D = CreatePoint3D;


    function CreateCameraState() {
        var cameraState = new ActiveXObject("LocaSpacePlugin.GSACameraState");
        return cameraState;
    }
    locaSpace.CreateCameraState = CreateCameraState;

    function GetCameraState() {
        var cameraState = locaSpaceMap.Globe.CameraState;
        return cameraState;
    }
    locaSpace.GetCameraState = GetCameraState;

    function CreateGeoPolygon3D() {
        var geoPolygon3D = new ActiveXObject("LocaSpacePlugin.GSAGeoPolygon3D");
        return geoPolygon3D;
    }
    locaSpace.CreateGeoPolygon3D = CreateGeoPolygon3D;

    function CreatePoint3Ds() {
        var points = new ActiveXObject("LocaSpacePlugin.GSAPoint3ds");
        return points;
    }
    locaSpace.CreatePoint3Ds = CreatePoint3Ds;

    function CreateFeature() {
        var feature = new ActiveXObject("LocaSpacePlugin.GSAFeature");
        return feature;
    }
    locaSpace.CreateFeature = CreateFeature;


    function FindFeaturesInPolygon(layerCaption, geoPolygon3D, bCompletelyContained) {
        var layer = locaSpaceMap.Globe.Layers.GetLayerByCaption(layerCaption);
        if (layer != null) {
            var features = layer.FindFeaturesInPolygon(geoPolygon3D, bCompletelyContained);
            return features;
        }
        return null;
    }
    locaSpace.FindFeaturesInPolygon = FindFeaturesInPolygon;

    function CreatePolygonStyle() {
        var style = new ActiveXObject("LocaSpacePlugin.GSASimplePolygonStyle3D");
        return style;
    }
    locaSpace.CreatePolygonStyle = CreatePolygonStyle;

    function CreateLineStyle() {
        var style = new ActiveXObject("LocaSpacePlugin.GSASimpleLineStyle3D");
        return style;
    }
    locaSpace.CreateLineStyle = CreateLineStyle;

    function CreateMarkerStyle() {
        var style = new ActiveXObject("LocaSpacePlugin.GSAMarkerStyle3D");
        return style;
    }
    locaSpace.CreateMarkerStyle = CreateMarkerStyle;

    function CreateColor(r, g, b, a) {
        var color = new ActiveXObject("LocaSpacePlugin.GSAColorRGBA");
        color.R = r;
        color.G = g;
        color.B = b;
        color.A = a;
        return color;
    }
    locaSpace.CreateColor = CreateColor;

    function CreateRoute() {
        var route = new ActiveXObject("LocaSpacePlugin.GSARoute");
        return route;
    }
    locaSpace.CreateRoute = CreateRoute;

    function CreateGeoModel() {
        var model = new ActiveXObject("LocaSpacePlugin.GSAGeoModel");
        return model;
    }
    locaSpace.CreateGeoModel = CreateGeoModel;

    function CreateGeoDynamicRoute() {
        var geoDynamicRoute = new ActiveXObject("LocaSpacePlugin.GSAGeoDynamicRoute");
        return geoDynamicRoute;
    }
    locaSpace.CreateGeoDynamicRoute = CreateGeoDynamicRoute;

    function CreateLabel() {
        var label = new ActiveXObject("LocaSpacePlugin.GSALabel");
        return label;
    }
    locaSpace.CreateLabel = CreateLabel;

    function CreateBalloonEx() {
        var balloonEx = new ActiveXObject("LocaSpacePlugin.GSABalloonEx");
        return balloonEx;
    }
    locaSpace.CreateBalloonEx = CreateBalloonEx;

    function CreateGeoMarker() {
        var geoMarker = new ActiveXObject("LocaSpacePlugin.GSAGeoMarker");
        return geoMarker;
    }
    locaSpace.CreateGeoMarker = CreateGeoMarker;

    function AddMarker(strName, strText, strDescription, strIconPath, strTextColor, strIconColor,
        dIconScale, dTextScale, dIconRot, posX, posY, posZ, altMode) {

        locaSpaceMap.Globe.MemoryLayer.AddMarker(strName, strText, strDescription, strIconPath, strTextColor,
            strIconColor, dIconScale, dTextScale, dIconRot, posX, posY, posZ, altMode);
    }
    locaSpace.AddMarker = AddMarker;

    function RemoveFeatureByName(strName,layerName) {
        if(layerName){
            var groupLayer = locaSpaceMap.Globe.Layers.GetLayerByCaption(layerName);
            var features = groupLayer.GetFeatureByName(strName, true);
        }else {
            var features = locaSpaceMap.Globe.MemoryLayer.GetFeatureByName(strName, true);
        }        
        if (features != null && features.Count > 0) {
            var feature = features(0);
            if (feature != null) {
                if(layerName){
                    groupLayer.RemoveFeatureByID(feature.ID);
                }else {
                    locaSpaceMap.Globe.MemoryLayer.RemoveFeatureByID(feature.ID);
                }
                
            }
        }
    }
    locaSpace.RemoveFeatureByName = RemoveFeatureByName;

}(window, document));