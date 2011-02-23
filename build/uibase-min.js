/*
Copyright 2011, KISSY UI Library v1.1.7dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("uibase/align",function(g,e){function a(){}function d(c,b){var j=g.require("node/node"),l=b.charAt(0),o=b.charAt(1),f,h,i;if(c){c=j.one(c);f=c.offset();j=c[0].offsetWidth;h=c[0].offsetHeight}else{f={left:e.scrollLeft(),top:e.scrollTop()};j=e.viewportWidth();h=e.viewportHeight()}i=f.left;f=f.top;if(l==="c")f+=h/2;else if(l==="b")f+=h;if(o==="c")i+=j/2;else if(o==="r")i+=j;return{left:i,top:f}}g.mix(a,{TL:"tl",TC:"tc",TR:"tr",CL:"cl",CC:"cc",CR:"cr",BL:"bl",BC:"bc",BR:"br"});a.ATTRS={align:{}};
a.prototype={_uiSetAlign:function(c){g.isPlainObject(c)&&this.align(c.node,c.points,c.offset)},align:function(c,b,j){var l,o=this.get("el");j=j||[0,0];l=o.offset();c=d(c,b[0]);b=d(o,b[1]);b=[b.left-c.left,b.top-c.top];l=[l.left-b[0]+ +j[0],l.top-b[1]+ +j[1]];this.set("xy",l)},center:function(c){this.set("align",{node:c,points:[a.CC,a.CC],offset:[0,0]})}};return a},{requires:["dom"]});
KISSY.add("uibase/base",function(g,e){function a(f){e.apply(this,arguments);for(var h=this.constructor;h;){if(f&&f[b]&&h.HTML_PARSER)if(f[b]=j.one(f[b])){var i=f[b],k=h.HTML_PARSER,m=void 0,n=void 0;for(m in k)if(k.hasOwnProperty(m)){n=k[m];if(g.isFunction(n))this.__set(m,n.call(this,i));else if(g.isString(n))this.__set(m,i.one(n));else g.isArray(n)&&n[0]&&this.__set(m,i.all(n[0]))}}h=h.superclass&&h.superclass.constructor}d(this,"initializer","constructor");f&&f.autoRender&&this.render()}function d(f,
h,i){for(var k=f.constructor,m=[],n,p,s,r;k;){r=[];if(s=k.__ks_exts)for(var q=0;q<s.length;q++)if(n=s[q]){if(i!="constructor")n=n.prototype.hasOwnProperty(i)?n.prototype[i]:null;n&&r.push(n)}if(k.prototype.hasOwnProperty(h)&&(p=k.prototype[h]))r.push(p);r.length&&m.push.apply(m,r.reverse());k=k.superclass&&k.superclass.constructor}for(q=m.length-1;q>=0;q--)m[q]&&m[q].call(f)}function c(f,h){if(!h)return f;for(var i in h)if(g.isObject(h[i])&&g.isObject(f[i]))c(f[i],h[i]);else i in f||(f[i]=h[i])}var b=
"srcNode",j=g.require("node/node"),l=g.require("base/attribute").__capitalFirst,o=function(){};a.HTML_PARSER={};a.ATTRS={render:{valueFn:function(){return document.body},setter:function(f){if(g.isString(f))return j.one(f)}},rendered:{value:false}};g.extend(a,e,{render:function(){if(!this.get("rendered")){this._renderUI();this.fire("renderUI");d(this,"renderUI","__renderUI");this._bindUI();this.fire("bindUI");d(this,"bindUI","__bindUI");this._syncUI();this.fire("syncUI");d(this,"syncUI","__syncUI");
this.set("rendered",true)}},_renderUI:o,renderUI:o,_bindUI:function(){var f=this,h=f.__getDefAttrs(),i,k;for(i in h)if(h.hasOwnProperty(i)){k="_uiSet"+l(i);f[k]&&function(m,n){f.on("after"+l(m)+"Change",function(p){f[n](p.newVal,p)})}(i,k)}},bindUI:o,_syncUI:function(){var f=this.__getDefAttrs(),h;for(h in f)if(f.hasOwnProperty(h)){var i="_uiSet"+l(h);this[i]&&this[i](this.get(h))}},syncUI:o,destroy:function(){for(var f=this.constructor,h,i,k;f;){(i=f.prototype.destructor)&&i.apply(this);if(h=f.__ks_exts)for(k=
h.length-1;k>=0;k--)(i=h[k]&&h[k].prototype.__destructor)&&i.apply(this);f=f.superclass&&f.superclass.constructor}this.fire("destroy");this.detach()}});a.create=function(f,h,i,k){function m(){a.apply(this,arguments)}if(g.isArray(f)){k=i;i=h;h=f;f=a}f=f||a;g.extend(m,f,i,k);if(h){m.__ks_exts=h;g.each(h,function(n){if(n){g.each(["ATTRS","HTML_PARSER"],function(p){if(n[p]){m[p]=m[p]||{};c(m[p],n[p])}});g.augment(m,n,false)}})}return m};return a},{requires:["base","dom","node"]});
KISSY.add("uibase/box",function(g){function e(){}g.mix(e,{APPEND:1,INSERT:0});e.ATTRS={el:{setter:function(a){var d=g.require("node/node");if(g.isString(a))return d.one(a)}},elCls:{},elStyle:{},width:{},height:{},elTagName:{value:"div"},elAttrs:{},elOrder:{value:1},html:{value:false}};e.HTML_PARSER={el:function(a){return a}};e.prototype={__syncUI:function(){},__bindUI:function(){},__renderUI:function(){var a=g.require("node/node"),d=this.get("render"),c=this.get("el");d=new a(d);if(!c){c=new a("<"+
this.get("elTagName")+">");this.get("elOrder")?d.append(c):d.prepend(c);this.set("el",c)}},_uiSetElAttrs:function(a){a&&this.get("el").attr(a)},_uiSetElCls:function(a){a&&this.get("el").addClass(a)},_uiSetElStyle:function(a){a&&this.get("el").css(a)},_uiSetWidth:function(a){a&&this.get("el").width(a)},_uiSetHeight:function(a){a&&this.get("el").height(a)},_uiSetHtml:function(a){a!==false&&this.get("el").html(a)},__destructor:function(){var a=this.get("el");if(a){a.detach();a.remove()}}};return e});
KISSY.add("uibase/close",function(g){function e(){}e.ATTRS={closable:{value:true},closeBtn:{}};e.HTML_PARSER={closeBtn:".ks-ext-close"};e.prototype={__syncUI:function(){},_uiSetClosable:function(a){var d=this.get("closeBtn");if(d)a?d.css("display",""):d.css("display","none")},__renderUI:function(){var a=g.require("node/node"),d=this.get("closeBtn"),c=this.get("contentEl");if(!d&&c){d=(new a("<a href='#' class='ks-ext-close'><span class='ks-ext-close-x'>X</span></a>")).appendTo(c);this.set("closeBtn",
d)}},__bindUI:function(){var a=this,d=a.get("closeBtn");d&&d.on("click",function(c){a.hide();c.halt()})},__destructor:function(){var a=this.get("closeBtn");a&&a.detach()}};return e});
KISSY.add("uibase/constrain",function(g,e){function a(){}function d(b){var j;if(!b)return j;var l=this.get("el");if(b!==true){b=c.one(b);j=b.offset();g.mix(j,{maxLeft:j.left+b[0].offsetWidth-l[0].offsetWidth,maxTop:j.top+b[0].offsetHeight-l[0].offsetHeight})}else{b=document.documentElement.clientWidth;j={left:e.scrollLeft(),top:e.scrollTop()};g.mix(j,{maxLeft:j.left+b-l[0].offsetWidth,maxTop:j.top+e.viewportHeight()-l[0].offsetHeight})}return j}var c=g.require("node/node");a.ATTRS={constrain:{value:false}};
a.prototype={__bindUI:function(){},__renderUI:function(){var b=this,j=b.__getDefAttrs(),l=j.x;j=j.y;var o=l.setter,f=j.setter;l.setter=function(h){var i=o&&o(h);if(i===undefined)i=h;if(!b.get("constrain"))return i;h=d.call(b,b.get("constrain"));return Math.min(Math.max(i,h.left),h.maxLeft)};j.setter=function(h){var i=f&&f(h);if(i===undefined)i=h;if(!b.get("constrain"))return i;h=d.call(b,b.get("constrain"));return Math.min(Math.max(i,h.top),h.maxTop)};b.addAttr("x",l);b.addAttr("y",j)},__syncUI:function(){},
__destructor:function(){}};return a},{requires:["dom","node"]});
KISSY.add("uibase/contentbox",function(g){function e(){}var a=g.require("node/node");e.ATTRS={contentEl:{},contentElAttrs:{},contentElStyle:{},contentTagName:{value:"div"},content:{}};e.HTML_PARSER={contentEl:".ks-contentbox"};e.prototype={__syncUI:function(){},__bindUI:function(){},__renderUI:function(){var d=this.get("contentEl"),c=this.get("el");if(!d){var b=g.makeArray(c[0].childNodes);d=(new a("<"+this.get("contentTagName")+" class='ks-contentbox'>")).appendTo(c);for(c=0;c<b.length;c++)d.append(b[c]);
this.set("contentEl",d)}},_uiSetContentElAttrs:function(d){d&&this.get("contentEl").attr(d)},_uiSetContentElStyle:function(d){d&&this.get("contentEl").css(d)},_uiSetContent:function(d){if(d!==undefined)if(g.isString(d))this.get("contentEl").html(d);else{this.get("contentEl").html("");this.get("contentEl").append(d)}},__destructor:function(){}};return e},{requires:["dom","node"]});
KISSY.add("uibase/drag",function(g){function e(){}e.ATTRS={handlers:{value:[]},draggable:{value:true}};e.prototype={_uiSetHandlers:function(a){a&&a.length>0&&this.__drag&&this.__drag.set("handlers",a)},__syncUI:function(){},__renderUI:function(){},__bindUI:function(){var a=g.require("dd/draggable"),d=this.get("el");if(this.get("draggable")&&a)this.__drag=new a({node:d,handlers:this.get("handlers")})},_uiSetDraggable:function(a){var d=this.__drag;if(d)if(a){d.detach("drag");d.on("drag",this._dragExtAction,
this)}else d.detach("drag")},_dragExtAction:function(a){this.set("xy",[a.left,a.top])},__destructor:function(){var a=this.__drag;a&&a.destroy()}};return e});
KISSY.add("uibase/loading",function(g){function e(){}e.prototype={loading:function(){if(!this._loadingExtEl)this._loadingExtEl=(new (g.require("node/node"))("<div class='ks-ext-loading' style='position: absolute;border: none;width: 100%;top: 0;left: 0;z-index: 99999;height:100%;*height: expression(this.parentNode.offsetHeight);'>")).appendTo(this.get("el"));this._loadingExtEl.show()},unloading:function(){var a=this._loadingExtEl;a&&a.hide()}};return e});
KISSY.add("uibase/mask",function(g){function e(){}var a,d=0;e.ATTRS={mask:{value:false}};e.prototype={__bindUI:function(){},__renderUI:function(){},__syncUI:function(){},_uiSetMask:function(c){if(c){this.on("show",this._maskExtShow);this.on("hide",this._maskExtHide)}else{this.detach("show",this._maskExtShow);this.detach("hide",this._maskExtHide)}},_maskExtShow:function(){if(!a){var c=g.require("ua"),b=g.require("node/node"),j=g.require("dom");a=(new b("<div class='ks-ext-mask'>")).prependTo(document.body);
a.css({position:"absolute",left:0,top:0,width:c.ie==6?j.docWidth():"100%",height:j.docHeight()});c.ie==6&&a.append("<iframe style='width:100%;height:expression(this.parentNode.offsetHeight);filter:alpha(opacity=0);z-index:-1;'>")}a.css({"z-index":this.get("zIndex")-1});d++;a.css("display","")},_maskExtHide:function(){d--;if(d<=0)d=0;d||a&&a.css("display","none")},__destructor:function(){}};return e},{requires:["ua"]});
KISSY.add("uibase/position",function(g,e,a){function d(){}var c=document;d.ATTRS={x:{},y:{},xy:{setter:function(b){var j=g.makeArray(b);if(j.length){j[0]&&this.set("x",j[0]);j[1]&&this.set("y",j[1])}return b}},zIndex:{value:9999},visible:{value:undefined}};d.prototype={__syncUI:function(){},__renderUI:function(){var b=this.get("el");b.addClass("ks-ext-position");b.css("display","")},__bindUI:function(){},_uiSetZIndex:function(b){b!==undefined&&this.get("el").css("z-index",b)},_uiSetX:function(b){b!==
undefined&&this.get("el").offset({left:b})},_uiSetY:function(b){b!==undefined&&this.get("el").offset({top:b})},_uiSetVisible:function(b){if(b!==undefined){this.get("el").css("visibility",b?"visible":"hidden");this[b?"_bindKey":"_unbindKey"]();this.fire(b?"show":"hide")}},_bindKey:function(){a.on(c,"keydown",this._esc,this)},_unbindKey:function(){a.remove(c,"keydown",this._esc,this)},_esc:function(b){b.keyCode===27&&this.hide()},move:function(b,j){if(g.isArray(b)){j=b[1];b=b[0]}this.set("xy",[b,j])},
show:function(){this._firstShow()},_firstShow:function(){this.render();this._realShow();this._firstShow=this._realShow},_realShow:function(){this.set("visible",true)},hide:function(){this.set("visible",false)},__destructor:function(){}};return d},{requires:["dom","event"]});
KISSY.add("uibase/resize",function(g){function e(){}e.ATTRS={resize:{value:{}}};e.prototype={__destructor:function(){self.resizer&&self.resizer.destroy()},_uiSetResize:function(a){var d=g.require("resizable");if(d){this.resizer&&this.resizer.destroy();a.node=this.get("el");a.autoRender=true;if(a.handlers)this.resizer=new d(a)}}};return e});
KISSY.add("uibase/shim",function(g){function e(){}e.ATTRS={shim:{value:true}};e.prototype={__syncUI:function(){},__bindUI:function(){},_uiSetShim:function(a){var d=g.require("node/node"),c=this.get("el");if(a&&!this.__shimEl){this.__shimEl=new d("<iframe style='position: absolute;border: none;width: expression(this.parentNode.offsetWidth);top: 0;opacity: 0;filter: alpha(opacity=0);left: 0;z-index: -1;height: expression(this.parentNode.offsetHeight);'>");c.prepend(this.__shimEl)}else if(!a&&this.__shimEl){this.__shimEl.remove();
delete this.__shimEl}},__renderUI:function(){},__destructor:function(){}};return e},{host:"uibase"});
KISSY.add("uibase/stdmod",function(g){function e(){}function a(c,b){var j=g.require("node/node"),l=c.get("contentEl"),o=c.get(b);if(!o){o=(new j("<div class='"+d+b+"'>")).appendTo(l);c.set(b,o)}}var d="ks-stdmod-";e.ATTRS={header:{},body:{},footer:{},bodyStyle:{},footerStyle:{},headerStyle:{},headerContent:{value:false},bodyContent:{value:false},footerContent:{value:false}};e.HTML_PARSER={header:"."+d+"header",body:"."+d+"body",footer:"."+d+"footer"};e.prototype={__bindUI:function(){},__syncUI:function(){},
_setStdModContent:function(c,b){if(b!==false)if(g.isString(b))this.get(c).html(b);else{this.get(c).html("");this.get(c).append(b)}},_uiSetBodyStyle:function(c){c!==undefined&&this.get("body").css(c)},_uiSetHeaderStyle:function(c){c!==undefined&&this.get("header").css(c)},_uiSetFooterStyle:function(c){c!==undefined&&this.get("footer").css(c)},_uiSetBodyContent:function(c){this._setStdModContent("body",c)},_uiSetHeaderContent:function(c){this._setStdModContent("header",c)},_uiSetFooterContent:function(c){this._setStdModContent("footer",
c)},__renderUI:function(){a(this,"header");a(this,"body");a(this,"footer")},__destructor:function(){}};return e});KISSY.add("uibase",function(g,e,a,d,c,b,j,l,o,f,h,i,k,m){g.mix(e,{Align:a,Box:d,Close:c,Contrain:b,Contentbox:j,Drag:l,Loading:o,Mask:f,Position:h,Shim:i,Resize:k,StdMod:m});return e},{requires:["uibase/base","uibase/align","uibase/box","uibase/close","uibase/constrain","uibase/contentbox","uibase/drag","uibase/loading","uibase/mask","uibase/position","uibase/shim","uibase/resize","uibase/stdmod"]});
