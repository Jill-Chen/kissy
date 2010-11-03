/*
Copyright 2010, KISSY UI Library v1.1.5
MIT Licensed
build time: Nov 2 13:10
*/
KISSY.add("mask",function(c,g){function i(a){if(!(this instanceof i))return new i(a);a=c.merge(b,a);var f=a.shim,h=f?o:m+a.style,l=f?0:a.opacity,n=k("<iframe>",h,l,!f);if(!f&&e)this.layer=k("<div>",h,l,true);this.config=a;this.iframe=n}function k(a,f,h,l){a=d.create(a);d.attr(a,"style",f);d.css(a,"opacity",h);if(l){d.height(a,d.docHeight());j&&d.width(a,d.docWidth())}document.body.appendChild(a);return a}var d=c.DOM,e=c.UA.ie,j=e===6,m="position:absolute;left:0;top:0;width:100%;border:0;background:black;z-index:9998;display:none;",
o="position:absolute;z-index:9997;border:0;display:none;",b={shim:false,opacity:0.6,style:""};c.augment(i,{show:function(){d.show([this.iframe,this.layer])},hide:function(){d.hide([this.iframe,this.layer])},toggle:function(){this[d.css(this.iframe,"display")!=="none"?"hide":"show"]()},setSize:function(a,f){var h=this.iframe;if(h){d.width(h,a);d.height(h,f)}if(h=this.layer){d.width(h,a);d.height(h,f)}},setOffset:function(a,f){var h=a;if(f!==g)h={left:a,top:f};d.offset([this.iframe,this.layer],h)}});
c.Mask=i},{host:"overlay"});
KISSY.add("overlay",function(c,g){function i(b,a){a=a||{};if(c.isPlainObject(b))a=b;else a.container=b;this.container=c.get(a.container);this.trigger=c.get(a.trigger);a.align=c.merge(c.clone(m.align),a.align);this.config=c.merge(m,a);this._init()}var k=document,d=c.DOM,e=c.Event,j={TL:"tl",TC:"tc",TR:"tr",LC:"cl",CC:"cc",RC:"cr",BL:"bl",BC:"bc",BR:"br"},m={container:null,containerCls:"ks-overlay",bdCls:"ks-overlay-bd",trigger:null,triggerType:"click",width:0,height:0,zIndex:9999,xy:null,align:{node:null,
points:[j.CC,j.CC],offset:[0,0]},mask:false,shim:c.UA.ie===6},o;c.augment(i,c.EventTarget,{_init:function(){this.trigger&&this._bindTrigger()},_bindTrigger:function(){this.config.triggerType==="mouse"?this._bindTriggerMouse():this._bindTriggerClick()},_bindTriggerMouse:function(){var b=this,a=b.trigger,f;e.on(a,"mouseenter",function(){b._clearHiddenTimer();f=c.later(function(){b.show();f=g},100)});e.on(a,"mouseleave",function(){if(f){f.cancel();f=g}b._setHiddenTimer()})},_bindContainerMouse:function(){var b=
this;e.on(b.container,"mouseleave",function(){b._setHiddenTimer()});e.on(b.container,"mouseenter",function(){b._clearHiddenTimer()})},_setHiddenTimer:function(){var b=this;b._hiddenTimer=c.later(function(){b.hide()},120)},_clearHiddenTimer:function(){if(this._hiddenTimer){this._hiddenTimer.cancel();this._hiddenTimer=g}},_bindTriggerClick:function(){var b=this;e.on(b.trigger,"click",function(a){a.halt();b.show()})},show:function(){this._firstShow()},_firstShow:function(){this._prepareMarkup();this._realShow();
this._firstShow=this._realShow},_realShow:function(){this._setPosition();this._toggle(false)},_toggle:function(b){d.css(this.container,"visibility",b?"hidden":"");this.shim&&this.shim.toggle();if(this.config.mask)o[b?"hide":"show"]();this[b?"_unbindUI":"_bindUI"]();this.fire(b?"hide":"show")},hide:function(){this._toggle(true)},_prepareMarkup:function(){var b=this.config,a=this.container;if(b.mask&&!o)o=new c.Mask;if(b.shim)this.shim=new c.Mask({shim:true});if(a){this.body=c.get("."+b.bdCls,a)||a;
a.style.cssText+="visibility:hidden;position:absolute;"}else{a=this.container=d.create(c.substitute('<div class="{containerCls}" style="visibility:hidden;position:absolute;"><div class="{bdCls}">{content}</div></div>',b));this.body=d.children(a)[0];k.body.appendChild(a)}d.css(a,"zIndex",b.zIndex);this.setBody(b.content);this._setSize();b.triggerType==="mouse"&&this._bindContainerMouse()},_setSize:function(b,a){var f=this.config;b=b||f.width;a=a||f.height;b&&d.width(this.container,b);a&&d.height(this.container,
a);this.shim&&this.shim.setSize(b,a)},_setDisplay:function(){d.css(this.container,"display")==="none"&&d.css(this.container,"display","block")},_setPosition:function(){var b=this.config.xy;if(b)this.move(b);else{this._setDisplay();this.align()}},move:function(b,a){var f;if(c.isArray(b)){a=b[1];b=b[0]}f={left:b,top:a};d.offset(this.container,f);this.shim&&this.shim.setOffset(f)},align:function(b,a,f){var h=this.config.align;b=b||h.node;b=b==="trigger"?this.trigger:c.get(b);a=a||h.points;f=f===g?h.offset:
f;h=d.offset(this.container);b=this._getAlignOffset(b,a[0]);a=this._getAlignOffset(this.container,a[1]);a=[a.left-b.left,a.top-b.top];this.move(h.left-a[0]+ +f[0],h.top-a[1]+ +f[1])},_getAlignOffset:function(b,a){var f=a.charAt(0),h=a.charAt(1),l,n,p,q;if(b){l=d.offset(b);n=b.offsetWidth;p=b.offsetHeight}else{l={left:d.scrollLeft(),top:d.scrollTop()};n=d.viewportWidth();p=d.viewportHeight()}q=l.left;l=l.top;if(f==="c")l+=p/2;else if(f==="b")l+=p;if(h==="c")q+=n/2;else if(h==="r")q+=n;return{left:q,
top:l}},center:function(){this.move((d.viewportWidth()-d.width(this.container))/2+d.scrollLeft(),(d.viewportHeight()-d.height(this.container))/2+d.scrollTop())},_bindUI:function(){e.on(k,"keydown",this._esc,this)},_unbindUI:function(){e.remove(k,"keydown",this._esc,this)},_esc:function(b){b.keyCode===27&&this.hide()},setBody:function(b){this._setContent("body",b)},_setContent:function(b,a){c.isString(a)&&d.html(this[b],a)}});c.Overlay=i});
KISSY.add("popup",function(c){function g(k,d){if(!(this instanceof g))return new g(k,d);d=d||{};if(c.isPlainObject(k))d=k;else d.container=k;d.align=c.merge(c.clone(i.align),d.align);g.superclass.constructor.call(this,c.merge(i,d))}var i={triggerType:"mouse",align:{node:"trigger",points:["cr","ct"],offset:[10,0]}};c.extend(g,c.Overlay);c.Popup=g},{host:"overlay"});
KISSY.add("dialog",function(c){function g(e,j){if(!(this instanceof g))return new g(e,j);j=j||{};if(c.isPlainObject(e))j=e;else j.container=e;j.align=c.merge(c.clone(d.align),j.align);g.superclass.constructor.call(this,c.merge(d,j));this.manager=c.DialogManager;this.manager.register(this)}var i=c.DOM,k=c.Event,d={header:"",footer:"",containerCls:"ks-overlay ks-dialog",hdCls:"ks-dialog-hd",bdCls:"ks-dialog-bd",ftCls:"ks-dialog-ft",closeBtnCls:"ks-dialog-close",width:400,height:300,closable:true};c.extend(g,
c.Overlay);c.Dialog=g;c.augment(g,c.EventTarget,{_prepareMarkup:function(){var e=this.config;g.superclass._prepareMarkup.call(this);this.header=c.get("."+e.hdCls,this.container);if(!this.header){this.header=i.create("<div>",{"class":e.hdCls});i.insertBefore(this.header,this.body)}this.setHeader(e.header);if(e.footer){this.footer=c.get("."+e.ftCls,this.container);if(!this.footer){this.footer=i.create("<div>",{"class":e.ftCls});this.container.appendChild(this.footer)}this.setFooter(e.footer)}e.closable&&
this._initClose()},_initClose:function(){var e=this,j=i.create("<div>",{"class":e.config.closeBtnCls});i.html(j,"close");k.on(j,"click",function(m){m.halt();e.hide()});e.header.appendChild(j)},setHeader:function(e){this._setContent("header",e)},setFooter:function(e){this._setContent("footer",e)}});c.DialogManager={register:function(e){e instanceof g&&this._dialog.push(e)},_dialog:[],hideAll:function(){c.each(this._dialog,function(e){e&&e.hide()})}}},{host:"overlay"});
KISSY.add("autorender",function(c){c.Overlay.autoRender=function(g,i){g="."+(g||"KS_Widget");c.query(g,i).each(function(k){var d=k.getAttribute("data-widget-type"),e;if(d&&"Dialog Popup".indexOf(d)>-1)try{if(e=k.getAttribute("data-widget-config"))e=e.replace(/'/g,'"');new c[d](k,c.JSON.parse(e))}catch(j){}})}},{host:"overlay"});
