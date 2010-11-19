/*
Copyright 2010, KISSY UI Library v1.1.5
MIT Licensed
build time: Nov 19 13:47
*/
KISSY.add("imagezoom",function(h,m){function k(a,b){if(!(this instanceof k))return new k(a,b);if(this.image=a=h.get(a)){k.superclass.constructor.call(this,b);this._init()}}function p(a,b){(a&&a.complete&&a.clientWidth?true:false)&&b();n.on(a,"load",b)}function q(a){return{width:a.clientWidth,height:a.clientHeight}}function l(a){return e.create('<div class="'+a+y)}function r(a,b,c){h.each(h.makeArray(a),function(d){e.width(d,b);e.height(d,c)})}function z(a,b){var c=e.create('<img src="'+a+y);b&&b.appendChild(c);
return c}function w(a){a=h.makeArray(a);if(a.length===1)a[1]=a[0];return a}var o=document,e=h.DOM,n=h.Event,A=/^.+\.(?:jpg|png|gif)$/i,s=Math.round,B=Math.min,t=["top","right","bottom","left","inner"],y='" style="position:absolute;top:0;left:0">';h.extend(k,h.Base);k.ATTRS={type:{value:"standard"},bigImageSrc:{value:"",setter:function(a){var b=this.get("bigImageSrc");if(a&&A.test(a)&&a!==b){this._cacheBigImageSrc=b;return a}return this.get("bigImageSrc")},getter:function(a){var b;if(!a)if((b=e.attr(this.image,
"data-ks-imagezoom"))&&A.test(b))a=b;return a}},bigImageSize:{value:[800,800],setter:function(a){return h.mix(this.get("bigImageSize"),w(a))}},position:{value:"right"},alignTo:{value:m},offset:{value:[10,0],setter:function(a){return h.mix(this.get("offset"),w(a))}},preload:{value:true},zoomSize:{value:["auto","auto"],setter:function(a){return h.mix(this.get("zoomSize"),w(a))},getter:function(a){if(this._imgRegion){if(a[0]==="auto")a[0]=this._imgRegion.width;if(a[1]==="auto")a[1]=this._imgRegion.height}return a}},
lensIcon:{value:true},zoomCls:{value:""},hasZoom:{value:true,setter:function(a){return!!a}}};h.augment(k,{_init:function(){var a=this,b,c=a.image;if((b=a.get("bigImageSrc"))&&a.get("preload"))(new Image).src=b;a._isInner=a.get("position")===t[4];a._getAlignTo();b=a.get("bigImageSize");a._bigImageSize={width:b[0],height:b[1]};a.get("hasZoom")&&!c.complete&&a._startLoading();a._firstInit=true;p(c,function(){if(a.get("hasZoom")){a._finishLoading();a._ready()}})},_getAlignTo:function(){var a;if(!this._isInner&&
(a=this.get("alignTo")))if(a=a==="parent"?this.image.offsetParent:h.get(a))this._alignToRegion=h.merge(e.offset(a),q(a))},_ready:function(){var a=this.image;this._imgRegion=h.merge(e.offset(a),q(a));this.get("lensIcon")&&this._renderIcon();if(this._firstInit){this._bindUI();this._onAttrChanges()}this._firstInit=false},_renderIcon:function(){var a=this._alignToRegion||this._imgRegion,b=this.lensIcon;if(!b){b=l("ks-imagezoom-icon");o.body.appendChild(b);this.lensIcon=b}e.offset(b,{left:a.left+a.width-
e.width(b),top:a.top+a.height-e.height(b)})},_bindUI:function(){var a=this,b;n.on(a.image,"mouseenter",function(c){if(a.get("hasZoom")){a._setEv(c);n.on(o.body,"mousemove",a._setEv,a);b=h.later(function(){a.viewer||a._createViewer();a.show()},300)}});n.on(a.image,"mouseleave",function(){if(a.get("hasZoom")){n.remove(o.body,"mousemove",a._setEv);if(b){b.cancel();b=m}}})},_onAttrChanges:function(){var a=this;a.on("afterHasZoomChange",function(b){e[b.newVal?"show":"hide"](a.lensIcon)})},_setEv:function(a){this._ev=
a},_createViewer:function(){var a=this,b,c,d,f=a._bigImageSize,g=a.get("bigImageSrc");b=l("ks-imagezoom-viewer "+a.get("zoomCls"));if(a._isInner){d=z(e.attr(a.image,"src"),b);r(d,f.width,f.height);a._bigImageCopy=d}else a._renderLens();if(g){c=z(g,b);!c.complete&&a._startBigLoading();a.bigImage=c}o.body.appendChild(b);a.viewer=b;a._setViewerRegion();p(c,function(){a._finishBigLoading();if(!a._isInner)a._bigImageSize=q(c);a._setViewerRegion();a._isInner||a._onMouseMove()})},_renderLens:function(){var a=
l("ks-imagezoom-lens");e.hide(a);o.body.appendChild(a);this.lens=a},_setViewerRegion:function(){var a=this.viewer,b=this._imgRegion,c=this._alignToRegion||b,d=this.get("zoomSize"),f=this.get("offset"),g=c.left+f[0];f=c.top+f[1];var i;this._setLensSize(i=d[0],d=d[1]);switch(this.get("position")){case t[0]:f-=d;break;case t[1]:g+=c.width;break;case t[2]:f+=c.height;break;case t[3]:g-=i;break;case t[4]:i=b.width;d=b.height}e.offset(a,{left:g,top:f});r(a,i,d)},_setLensSize:function(a,b){var c=this._imgRegion,
d=this._bigImageSize,f;f=B(s(a*c.width/d.width),c.width);c=B(s(b*c.height/d.height),c.height);this._lensSize=[f,c];this._isInner||r(this.lens,f,c)},_onMouseMove:function(){var a=this.lens,b=this._ev,c=this._imgRegion,d=c.left,f=c.top,g=c.width;c=c.height;var i=this._bigImageSize;if(b.pageX>d&&b.pageX<d+g&&b.pageY>f&&b.pageY<f+c){if(!(this._isInner&&this._animTimer)){b=this._getLensOffset();!this._isInner&&a&&e.offset(a,b);e.css([this._bigImageCopy,this.bigImage],{left:-s((b.left-d)*i.width/g),top:-s((b.top-
f)*i.height/c)})}}else this.hide()},_getLensOffset:function(){var a=this._imgRegion,b=this._ev,c=a.left,d=a.top,f=a.width;a=a.height;var g=this._lensSize,i=g[0];g=g[1];var j=b.pageX-i/2;b=b.pageY-g/2;if(j<=c)j=c;else if(j>=f+c-i)j=f+c-i;if(b<=d)b=d;else if(b>=a+d-g)b=a+d-g;return{left:j,top:b}},_anim:function(a,b){var c=this,d,f=1,g=c._imgRegion;d=g.left;var i=g.top,j=g.width,u=g.height,x=[c.bigImage,c._bigImageCopy],v=c._bigImageSize;g=c._getLensOffset();var C=-s((g.left-d)*v.width/j),D=-s((g.top-
i)*v.height/u);c._animTimer&&c._animTimer.cancel();r(x,j,u);c._animTimer=h.later(d=function(){r(x,j+(v.width-j)/b*f,u+(v.height-u)/b*f);e.css(x,{left:C/b*f,top:D/b*f});if(++f>b){c._animTimer.cancel();c._animTimer=m}},a*1E3/b,true);d()},show:function(){var a=this.lens,b=this.viewer;e.hide(this.lensIcon);if(this._isInner){e.show(b);this._anim(0.4,42)}else{e.show([a,b]);this._onMouseMove()}this._checkRefresh();this._checkBigImageSrc();n.on(o.body,"mousemove",this._onMouseMove,this);this.fire("show")},
_checkRefresh:function(){if(this._refresh){this._setViewerRegion();this._refresh=false}},_checkBigImageSrc:function(){var a=this.get("bigImageSrc");if(this._cacheBigImageSrc&&this._cacheBigImageSrc!==a){e.attr(this.bigImage,"src",a);this._cacheBigImageSrc=a;this._isInner&&e.attr(this._bigImageCopy,"src",e.attr(this.image,"src"));!this.bigImage.complete&&this._startBigLoading()}},hide:function(){e.hide([this.lens,this.viewer]);e.show(this.lensIcon);n.remove(o.body,"mousemove",this._onMouseMove,this);
this.fire("hide")},_startLoading:function(){},_finishLoading:function(){},_startBigLoading:function(){e.addClass(this.viewer,"ks-imagezoom-loading")},_finishBigLoading:function(){e.removeClass(this.viewer,"ks-imagezoom-loading")},changeImageSrc:function(a){e.attr(this.image,"src",a);this._startLoading()},refreshRegion:function(){this._getAlignTo();this._renderUI();this._refresh=true}});h.ImageZoom=k},{requires:["core"]});
KISSY.add("autorender",function(h){h.ImageZoom.autoRender=function(m,k){m="."+(m||"KS_Widget");h.query(m,k).each(function(p){var q=p.getAttribute("data-widget-type"),l;if(q==="ImageZoom")try{if(l=p.getAttribute("data-widget-config"))l=l.replace(/'/g,'"');new h[q](p,h.JSON.parse(l))}catch(r){}})}},{host:"imagezoom"});
