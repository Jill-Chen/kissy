/*
Copyright 2010, KISSY UI Library v1.1.5
MIT Licensed
build time: Nov 19 13:47
*/
KISSY.add("switchable",function(c,k){function i(a,b){b=b||{};if(!("markupType"in b))if(b.panelCls)b.markupType=1;else if(b.panels)b.markupType=2;b=c.merge(i.Config,b);this.container=c.get(a);this.config=b;this.activeIndex=b.activeIndex;this._init()}var l=c.DOM,g=c.Event;i.Config={markupType:0,navCls:"ks-switchable-nav",contentCls:"ks-switchable-content",triggerCls:"ks-switchable-trigger",panelCls:"ks-switchable-panel",triggers:[],panels:[],hasTriggers:true,triggerType:"mouse",delay:0.1,activeIndex:0,
activeTriggerCls:"ks-active",steps:1,viewSize:[]};i.Plugins=[];c.augment(i,c.EventTarget,{_init:function(){var a=this,b=a.config;a._parseMarkup();b.switchTo&&a.switchTo(b.switchTo);b.hasTriggers&&a._bindTriggers();c.each(i.Plugins,function(d){d.init&&d.init(a)});a.fire("init")},_parseMarkup:function(){var a=this.container,b=this.config,d,f=[],h=[];switch(b.markupType){case 0:if(d=c.get("."+b.navCls,a))f=l.children(d);d=c.get("."+b.contentCls,a);h=l.children(d);break;case 1:f=c.query("."+b.triggerCls,
a);h=c.query("."+b.panelCls,a);break;case 2:f=b.triggers;h=b.panels}a=h.length;this.length=a/b.steps;if(b.hasTriggers&&a>0&&f.length===0)f=this._generateTriggersMarkup(this.length);this.triggers=c.makeArray(f);this.panels=c.makeArray(h);this.content=d||h[0].parentNode},_generateTriggersMarkup:function(a){var b=this.config,d=l.create("<ul>"),f,h;d.className=b.navCls;for(h=0;h<a;h++){f=l.create("<li>");if(h===this.activeIndex)f.className=b.activeTriggerCls;f.innerHTML=h+1;d.appendChild(f)}this.container.appendChild(d);
return l.children(d)},_bindTriggers:function(){var a=this,b=a.config,d=a.triggers,f,h,e=d.length;for(h=0;h<e;h++)(function(j){f=d[j];g.on(f,"click",function(){a._onFocusTrigger(j)});if(b.triggerType==="mouse"){g.on(f,"mouseenter",function(){a._onMouseEnterTrigger(j)});g.on(f,"mouseleave",function(){a._onMouseLeaveTrigger(j)})}})(h)},_onFocusTrigger:function(a){if(this._triggerIsValid(a)){this._cancelSwitchTimer();this.switchTo(a)}},_onMouseEnterTrigger:function(a){var b=this;if(b._triggerIsValid(a))b.switchTimer=
c.later(function(){b.switchTo(a)},b.config.delay*1E3)},_onMouseLeaveTrigger:function(){this._cancelSwitchTimer()},_triggerIsValid:function(a){return this.activeIndex!==a},_cancelSwitchTimer:function(){if(this.switchTimer){this.switchTimer.cancel();this.switchTimer=k}},switchTo:function(a,b){var d=this.config,f=this.triggers,h=this.panels,e=this.activeIndex,j=d.steps,p=e*j,m=a*j;if(!this._triggerIsValid(a))return this;if(this.fire("beforeSwitch",{toIndex:a})===false)return this;if(d.hasTriggers)this._switchTrigger(e>
-1?f[e]:null,f[a]);if(b===k)b=a>e?"forward":"backward";this._switchView(h.slice(p,p+j),h.slice(m,m+j),a,b);this.activeIndex=a;return this},_switchTrigger:function(a,b){var d=this.config.activeTriggerCls;a&&l.removeClass(a,d);l.addClass(b,d)},_switchView:function(a,b,d){l.css(a,"display","none");l.css(b,"display","block");this._fireOnSwitch(d)},_fireOnSwitch:function(a){this.fire("switch",{currentIndex:a})},prev:function(){var a=this.activeIndex;this.switchTo(a>0?a-1:this.length-1,"backward")},next:function(){var a=
this.activeIndex;this.switchTo(a<this.length-1?a+1:0,"forward")}});c.Switchable=i},{requires:["core"]});
KISSY.add("autoplay",function(c,k){var i=c.Event,l=c.Switchable;c.mix(l.Config,{autoplay:false,interval:5,pauseOnHover:true});l.Plugins.push({name:"autoplay",init:function(g){function a(){f=c.later(function(){g.paused||g.switchTo(g.activeIndex<g.length-1?g.activeIndex+1:0,"forward")},d,true)}var b=g.config,d=b.interval*1E3,f;if(b.autoplay){if(b.pauseOnHover){i.on(g.container,"mouseenter",function(){if(f){f.cancel();f=k}g.paused=true});i.on(g.container,"mouseleave",function(){g.paused=false;a()})}a()}}})},
{host:"switchable"});
KISSY.add("effect",function(c,k){var i=c.DOM,l=c.Anim,g=c.Switchable,a;c.mix(g.Config,{effect:"none",duration:0.5,easing:"easeNone",nativeAnim:true});g.Effects={none:function(b,d,f){i.css(b,"display","none");i.css(d,"display","block");f()},fade:function(b,d,f){b.length!==1&&c.error("fade effect only supports steps == 1.");var h=this,e=h.config,j=b[0],p=d[0];h.anim&&h.anim.stop(true);i.css(p,"opacity",1);h.anim=(new l(j,{opacity:0},e.duration,e.easing,function(){h.anim=k;i.css(p,"z-index",9);i.css(j,
"z-index",1);f()},e.nativeAnim)).run()},scroll:function(b,d,f,h){var e=this;b=e.config;d=b.effect==="scrollx";var j={};j[d?"left":"top"]=-(e.viewSize[d?0:1]*h)+"px";e.anim&&e.anim.stop();e.anim=(new l(e.content,j,b.duration,b.easing,function(){e.anim=k;f()},b.nativeAnim)).run()}};a=g.Effects;a.scrollx=a.scrolly=a.scroll;g.Plugins.push({name:"effect",init:function(b){var d=b.config,f=d.effect,h=b.panels,e=b.content,j=d.steps,p=b.activeIndex,m=h.length;b.viewSize=[d.viewSize[0]||h[0].offsetWidth*j,
d.viewSize[1]||h[0].offsetHeight*j];if(f!=="none"){c.each(h,function(q){i.css(q,"display","block")});switch(f){case "scrollx":case "scrolly":i.css(e,"position","absolute");i.css(e.parentNode,"position","relative");if(f==="scrollx"){i.css(h,"float","left");i.width(e,b.viewSize[0]*(m/j))}break;case "fade":var r=p*j,s=r+j-1,o;c.each(h,function(q,t){o=t>=r&&t<=s;i.css(q,{opacity:o?1:0,position:"absolute",zIndex:o?9:1})})}}}});c.augment(g,{_switchView:function(b,d,f,h){var e=this,j=e.config.effect;(c.isFunction(j)?
j:a[j]).call(e,b,d,function(){e._fireOnSwitch(f)},f,h)}})},{host:"switchable"});
KISSY.add("circular",function(c,k){function i(o,q,t,u,w){var n=this;o=n.config;q=n.length;var x=n.activeIndex,v=o.scrollType===r,y=v?f:h,z=n.viewSize[v?0:1];v=-z*u;var B={},C,A=w===m;if(C=A&&x===0&&u===q-1||w===p&&x===q-1&&u===0)v=l.call(n,n.panels,u,A,y,z);B[y]=v+j;n.anim&&n.anim.stop();n.anim=(new c.Anim(n.content,B,o.duration,o.easing,function(){C&&g.call(n,n.panels,u,A,y,z);n.anim=k;t()},o.nativeAnim)).run()}function l(o,q,t,u,w){var n=this.config.steps;q=this.length;var x=t?q-1:0,v=(x+1)*n;for(n=
x*n;n<v;n++){a.css(o[n],b,d);a.css(o[n],u,(t?-1:1)*w*q)}return t?w:-w*q}function g(o,q,t,u,w){var n=this.config.steps;q=this.length;var x=t?q-1:0,v=(x+1)*n;for(n=x*n;n<v;n++){a.css(o[n],b,e);a.css(o[n],u,e)}a.css(this.content,u,t?-w*(q-1):e)}var a=c.DOM,b="position",d="relative",f="left",h="top",e="",j="px",p="forward",m="backward",r="scrollx",s=c.Switchable;c.mix(s.Config,{circular:false});s.Plugins.push({name:"circular",init:function(o){o=o.config;if(o.circular&&(o.effect===r||o.effect==="scrolly")){o.scrollType=
o.effect;o.effect=i}}})},{host:"switchable"});
KISSY.add("lazyload",function(c){var k=c.DOM,i="beforeSwitch",l="img-src",g="area-data",a={},b=c.Switchable;a[l]="data-ks-lazyload-custom";a[g]="ks-datalazyload-custom";c.mix(b.Config,{lazyDataType:g});b.Plugins.push({name:"lazyload",init:function(d){function f(m){var r=e.steps;m=m.toIndex*r;h.loadCustomLazyData(d.panels.slice(m,m+r),j);a:{var s,o;if(m=(r=j===l)?"img":j===g?"textarea":""){m=c.query(m,d.container);s=0;for(o=m.length;s<o;s++)if(r?k.attr(m[s],p):k.hasClass(m[s],p)){r=false;break a}}r=
true}r&&d.detach(i,f)}var h=c.DataLazyload,e=d.config,j=e.lazyDataType,p=a[j];!h||!j||!p||d.on(i,f)}})},{host:"switchable"});KISSY.add("autorender",function(c){c.Switchable.autoRender=function(k,i){k="."+(k||"KS_Widget");c.query(k,i).each(function(l){var g=l.getAttribute("data-widget-type"),a;if(g&&"Switchable Tabs Slide Carousel Accordion".indexOf(g)>-1)try{if(a=l.getAttribute("data-widget-config"))a=a.replace(/'/g,'"');new c[g](l,c.JSON.parse(a))}catch(b){}})}},{host:"switchable"});
KISSY.add("tabs",function(c){function k(i,l){if(!(this instanceof k))return new k(i,l);k.superclass.constructor.call(this,i,l)}c.extend(k,c.Switchable);c.Tabs=k},{host:"switchable"});KISSY.add("slide",function(c){function k(l,g){if(!(this instanceof k))return new k(l,g);k.superclass.constructor.call(this,l,c.merge(i,g))}var i={autoplay:true,circular:true};c.extend(k,c.Switchable);c.Slide=k},{host:"switchable"});
KISSY.add("carousel",function(c,k){function i(e,j){var p=this;if(!(p instanceof i))return new i(e,j);p.on("init",function(){l(p)});i.superclass.constructor.call(p,e,c.merge(h,j))}function l(e){var j=e.config,p=j.disableBtnCls;c.each(["prev","next"],function(m){var r=e[m+"Btn"]=c.get(b+j[m+"BtnCls"],e.container);a.on(r,"click",function(s){s.preventDefault();g.hasClass(r,p)||e[m]()})});j.circular||e.on("switch",function(m){m=m.currentIndex;m=m===0?e[d]:m===e.length-1?e[f]:k;g.removeClass([e[d],e[f]],
p);m&&g.addClass(m,p)});a.on(e.panels,"click focus",function(){e.fire("itemSelected",{item:this})})}var g=c.DOM,a=c.Event,b=".",d="prevBtn",f="nextBtn",h={circular:true,prevBtnCls:"ks-switchable-prev-btn",nextBtnCls:"ks-switchable-next-btn",disableBtnCls:"ks-switchable-disable-btn"};c.extend(i,c.Switchable);c.Carousel=i},{host:"switchable"});
KISSY.add("accordion",function(c){function k(g,a){if(!(this instanceof k))return new k(g,a);k.superclass.constructor.call(this,g,c.merge(l,a));if(this.config.multiple)this._switchTrigger=function(){}}var i=c.DOM,l={markupType:1,triggerType:"click",multiple:false};c.extend(k,c.Switchable);c.Accordion=k;c.augment(k,{_triggerIsValid:function(g){return this.activeIndex!==g||this.config.multiple},_switchView:function(g,a,b){var d=this.config,f=a[0];if(d.multiple){i.toggleClass(this.triggers[b],d.activeTriggerCls);
i.css(f,"display",f.style.display=="none"?"block":"none");this._fireOnSwitch(b)}else k.superclass._switchView.call(this,g,a,b)}})},{host:"switchable"});
