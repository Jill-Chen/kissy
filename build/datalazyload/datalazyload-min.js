/*
Copyright 2010, KISSY UI Library v1.0.5
MIT Licensed
build: 553 Apr 12 09:29
*/
KISSY.add("datalazyload",function(f,s){function m(a,b){if(!(this instanceof m))return new m(a,b);if(b===s){b=a;a=[t]}f.isArray(a)||(a=[f.get(a)||t]);this.containers=a;this.config=f.merge(x,b||{});this.callbacks={els:[],fns:[]};this._init()}var p=f.DOM,n=f.Event,k=YAHOO.util.Dom,o=window,t=document,u={AUTO:"auto",MANUAL:"manual"},x={mod:u.MANUAL,diff:"default",placeholder:"http://a.tbcdn.cn/kissy/1.0.4/build/datalazyload/dot.gif"},v=m.prototype;f.mix(v,{_init:function(){this.threshold=this._getThreshold();
this._filterItems();this._getItemsLength()&&this._initLoadEvent()},_initLoadEvent:function(){function a(){d||(d=setTimeout(function(){b();d=null},100))}function b(){c._loadItems();if(c._getItemsLength()===0){n.remove(o,"scroll",a);n.remove(o,"resize",a)}}var d,c=this;n.on(o,"scroll",a);n.on(o,"resize",function(){c.threshold=c._getThreshold();a()});c._getItemsLength()&&f.ready(function(){b()})},_filterItems:function(){var a=this.containers,b=this.threshold,d=this.config.placeholder,c=this.config.mod===
u.MANUAL,e,h,g,i,l,j,q,r=[],w=[];e=0;for(h=a.length;e<h;++e){g=f.query("img",a[e]);i=0;for(l=g.length;i<l;++i){j=g[i];q=j.getAttribute("data-lazyload-src");if(c){if(q){j.src=d;r.push(j)}}else if(k.getY(j)>b&&!q){j.setAttribute("data-lazyload-src",j.src);j.src=d;r.push(j)}}g=f.query("textarea",a[e]);i=0;for(l=g.length;i<l;++i){j=g[i];p.hasClass(j,"ks-datalazyload")&&w.push(j)}}this.images=r;this.areaes=w},_loadItems:function(){this._loadImgs();this._loadAreaes();this._fireCallbacks()},_loadImgs:function(){var a=
this.images,b=this.threshold+k.getDocumentScrollTop(),d,c,e=[];for(d=0;c=a[d++];)k.getY(c)<=b?this._loadImgSrc(c):e.push(c);this.images=e},_loadImgSrc:function(a,b){b=b||"data-lazyload-src";var d=a.getAttribute(b);if(d&&a.src!=d){a.src=d;a.removeAttribute(b)}},_loadAreaes:function(){var a=this.areaes,b=this.threshold+k.getDocumentScrollTop(),d,c,e,h=[];for(d=0;c=a[d++];){e=c;if(k.getY(e)===s)e=c.parentNode;k.getY(e)<=b?this._loadDataFromArea(c.parentNode,c):h.push(c)}this.areaes=h},_loadDataFromArea:function(a,
b){var d=p.create(b.value);b.style.display="none";b.className="";a.insertBefore(d,b);f.UA.gecko||f.query("script",a).each(function(c){f.globalEval(c.text)})},_fireCallbacks:function(){var a=this.callbacks,b=a.els,d=a.fns,c=this.threshold+k.getDocumentScrollTop(),e,h,g,i=[],l=[];for(e=0;(h=b[e])&&(g=d[e++]);)if(k.getY(h)<=c)g.call(h);else{i.push(h);l.push(g)}a.els=i;a.fns=l},addCallback:function(a,b){if((a=f.get(a))&&typeof b==="function"){this.callbacks.els.push(a);this.callbacks.fns.push(b)}},_getThreshold:function(){var a=
this.config.diff,b=k.getViewportHeight();return a==="default"?2*b:b+a},_getItemsLength:function(){return this.images.length+this.areaes.length+this.callbacks.els.length},loadCustomLazyData:function(a,b,d){var c=this,e,h;f.isArray(a)||(a=[f.get(a)]);f.each(a,function(g){switch(b){case "textarea-data":if((e=f.get("textarea",g))&&p.hasClass(e,d||"ks-datalazyload-custom"))c._loadDataFromArea(g,e);break;default:h=g.nodeName==="IMG"?[g]:f.query("img",g);g=0;for(var i=h.length;g<i;g++)c._loadImgSrc(h[g],
d||"data-lazyload-src-custom")}})}});f.mix(m,v,true,["loadCustomLazyData","_loadImgSrc","_loadDataFromArea"]);f.DataLazyload=m});
