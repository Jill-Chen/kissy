/*
Copyright 2010, KISSY UI Library v1.1.5
MIT Licensed
build time: Nov 2 13:10
*/
KISSY.add("node",function(a){function f(b,c,h){if(!(this instanceof f))return new f(b,c,h);if(b){if(a.isString(b)){b=n.create(b,c,h);if(b.nodeType===11)return new a.NodeList(b.childNodes)}else if(b instanceof f)return b;else b=b;this[0]=b}else this.length=0}var n=a.DOM;f.TYPE="-ks-Node";a.augment(f,{length:1,getDOMNode:function(){return this[0]},nodeType:f.TYPE});a.one=function(b,c){var h=a.get(b,c);return h?new f(h):null};a.Node=f});
KISSY.add("nodelist",function(a){function f(c){if(!(this instanceof f))return new f(c);b.push.apply(this,a.makeArray(c)||[])}var n=a.DOM,b=Array.prototype;a.mix(f.prototype,{length:0,item:function(c){var h=null;if(n._isElementNode(this[c]))h=new a.Node(this[c]);return h},getDOMNodes:function(){return b.slice.call(this)},each:function(c,h){var q=this.length,o=0,k;for(k=new a.Node(this[0]);o<q&&c.call(h||k,k,o,this)!==false;k=new a.Node(this[++o]));return this}});a.all=function(c,h){return new f(a.query(c,
h,true))};a.NodeList=f});
KISSY.add("node-attach",function(a,f){function n(e,i,d,j){e=[this[e?t:r]()].concat(a.makeArray(i));if(i[d]===f)return j.apply(c,e);else{j.apply(c,e);return this}}function b(e,i){a.each(e,function(d){a.each([k,u],function(j,g){j[d]=function(m){switch(i){case s:return function(){return n.call(this,g,arguments,1,m)};case p:return function(){return n.call(this,g,arguments,0,m)};case v:return function(){var l=this[g?t:r]();return(l=m.apply(c,[l].concat(a.makeArray(arguments))))?new (a[a.isArray(l)?"NodeList":
"Node"])(l):null};default:return function(){var l=this[g?t:r]();l=m.apply(c,[l].concat(a.makeArray(arguments)));return l===f?this:l}}}(c[d])})})}var c=a.DOM,h=a.Event,q=c._nodeTypeIs,o=c._isKSNode,k=a.Node.prototype,u=a.NodeList.prototype,r="getDOMNode",t=r+"s",s=1,p=2,v=4;a.mix(k,{one:function(e){return a.one(e,this[0])},all:function(e){return a.all(e,this[0])}});b(["data","removeData"],s);b(["hasClass","addClass","removeClass","replaceClass","toggleClass"]);b(["attr","removeAttr"],s);b(["val","text"],
p);b(["css"],s);b(["width","height"],p);b(["offset"],p);b(["scrollIntoView"]);b(["parent","next","prev","siblings","children"],v);b(["contains"]);b(["html"],p);b(["remove"]);a.each(["insertBefore","insertAfter"],function(e){k[e]=function(i){c[e].call(c,this[0],i);return this}});a.each([k,u],function(e,i){a.mix(e,{append:function(d){d&&a.each(this,function(j){var g;if(i||a.isString(d))g=c.create(d);else{if(q(d,1)||q(d,3))g=d;if(o(d))g=d[0]}j.appendChild(g)});return this},appendTo:function(d){if((d=
a.get(d))&&d.appendChild)a.each(this,function(j){d.appendChild(j)});return this}})});a.each([k,u],function(e){a.mix(e,a.EventTarget);e._supportSpecialEvent=true;e._addEvent=function(i,d,j){for(var g=0,m=this.length;g<m;g++)h._simpleAdd(this[g],i,d,j)};e._removeEvent=function(i,d,j){for(var g=0,m=this.length;g<m;g++)h._simpleRemove(this[g],i,d,j)};delete e.fire})});
