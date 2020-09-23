/*! For license information please see app.js.LICENSE.txt */
!function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/",o(o.s=0)}([function(t,e,o){o(1),o(2),t.exports=o(3)},function(t,e){!function(){"use strict";function t(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,n),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),o[this.key]=this,e+=1}var e=0,o={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete o[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var n in o)e.push(o[n]);for(var i=0,r=e.length;r>i;i++)e[i][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=i.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+o,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,o+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var o=0,n={},i=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete n[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",(function(){e.didResize||(e.didResize=!0,i.requestAnimationFrame(t))}))},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",(function(){(!e.didScroll||i.isTouch)&&(e.didScroll=!0,i.requestAnimationFrame(t))}))},e.prototype.handleResize=function(){i.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var o in e){var n=e[o],i=n.newScroll>n.oldScroll?n.forward:n.backward;for(var r in this.waypoints[o]){var a=this.waypoints[o][r],s=n.oldScroll<a.triggerPoint,l=n.newScroll>=a.triggerPoint;(s&&l||!s&&!l)&&(a.queueTrigger(i),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?i.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?i.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var o in this.waypoints[e])t.push(this.waypoints[e][o]);for(var n=0,i=t.length;i>n;n++)t[n].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,o=e?void 0:this.adapter.offset(),n={};for(var r in this.handleScroll(),t={horizontal:{contextOffset:e?0:o.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:o.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}}){var a=t[r];for(var s in this.waypoints[r]){var l,c,u,p,d=this.waypoints[r][s],h=d.options.offset,f=d.triggerPoint,y=0,w=null==f;d.element!==d.element.window&&(y=d.adapter.offset()[a.offsetProp]),"function"==typeof h?h=h.apply(d):"string"==typeof h&&(h=parseFloat(h),d.options.offset.indexOf("%")>-1&&(h=Math.ceil(a.contextDimension*h/100))),l=a.contextScroll-a.contextOffset,d.triggerPoint=y+l-h,c=f<a.oldScroll,u=d.triggerPoint>=a.oldScroll,p=!c&&!u,!w&&(c&&u)?(d.queueTrigger(a.backward),n[d.group.id]=d.group):(!w&&p||w&&a.oldScroll>=d.triggerPoint)&&(d.queueTrigger(a.forward),n[d.group.id]=d.group)}}return i.requestAnimationFrame((function(){for(var t in n)n[t].flushTriggers()})),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in n)n[t].refresh()},e.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},i.requestAnimationFrame=function(e){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t).call(window,e)},i.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function o(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},i=window.Waypoint;o.prototype.add=function(t){this.waypoints.push(t)},o.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},o.prototype.flushTriggers=function(){for(var o in this.triggerQueues){var n=this.triggerQueues[o],i="up"===o||"left"===o;n.sort(i?e:t);for(var r=0,a=n.length;a>r;r+=1){var s=n[r];(s.options.continuous||r===n.length-1)&&s.trigger([o])}}this.clearTriggerQueues()},o.prototype.next=function(e){this.waypoints.sort(t);var o=i.Adapter.inArray(e,this.waypoints);return o===this.waypoints.length-1?null:this.waypoints[o+1]},o.prototype.previous=function(e){this.waypoints.sort(t);var o=i.Adapter.inArray(e,this.waypoints);return o?this.waypoints[o-1]:null},o.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},o.prototype.remove=function(t){var e=i.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},o.prototype.first=function(){return this.waypoints[0]},o.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},o.findOrCreate=function(t){return n[t.axis][t.name]||new o(t)},i.Group=o}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,o=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],(function(e,o){t.prototype[o]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[o].apply(this.$element,t)}})),e.each(["extend","inArray","isEmptyObject"],(function(o,n){t[n]=e[n]})),o.adapters.push({name:"jquery",Adapter:t}),o.Adapter=t}(),function(){"use strict";function t(t){return function(){var o=[],n=arguments[0];return t.isFunction(arguments[0])&&((n=t.extend({},arguments[1])).handler=arguments[0]),this.each((function(){var i=t.extend({},n,{element:this});"string"==typeof i.context&&(i.context=t(this).closest(i.context)[0]),o.push(new e(i))})),o}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}()},function(t,e){!function(t){"use strict";t.fn.counterUp=function(e){var o,n=t.extend({time:400,delay:10,offset:100,beginAt:0,formatter:!1,context:"window",callback:function(){}},e);return this.each((function(){var e=t(this),i={time:t(this).data("counterup-time")||n.time,delay:t(this).data("counterup-delay")||n.delay,offset:t(this).data("counterup-offset")||n.offset,beginAt:t(this).data("counterup-beginat")||n.beginAt,context:t(this).data("counterup-context")||n.context};e.waypoint((function(t){!function(){var t=[],r=i.time/i.delay,a=e.attr("data-num")?e.attr("data-num"):e.text(),s=/[0-9]+,[0-9]+/.test(a),l=((a=a.replace(/,/g,"")).split(".")[1]||[]).length;i.beginAt>a&&(i.beginAt=a);var c=/[0-9]+:[0-9]+:[0-9]+/.test(a);if(c){var u=a.split(":"),p=1;for(o=0;u.length>0;)o+=p*parseInt(u.pop(),10),p*=60}for(var d=r;d>=i.beginAt/a*r;d--){var h=parseFloat(a/r*d).toFixed(l);if(c){h=parseInt(o/r*d);var f=parseInt(h/3600)%24,y=parseInt(h/60)%60,w=parseInt(h%60,10);h=(f<10?"0"+f:f)+":"+(y<10?"0"+y:y)+":"+(w<10?"0"+w:w)}if(s)for(;/(\d+)(\d{3})/.test(h.toString());)h=h.toString().replace(/(\d+)(\d{3})/,"$1,$2");n.formatter&&(h=n.formatter.call(this,h)),t.unshift(h)}e.data("counterup-nums",t),e.text(i.beginAt);e.data("counterup-func",(function(){e.data("counterup-nums")?(e.html(e.data("counterup-nums").shift()),e.data("counterup-nums").length?setTimeout(e.data("counterup-func"),i.delay):(e.data("counterup-nums",null),e.data("counterup-func",null),n.callback.call(this))):n.callback.call(this)})),setTimeout(e.data("counterup-func"),i.delay)}(),this.destroy()}),{offset:i.offset+"%",context:i.context})}))}}(jQuery)},function(t,e){!function(t){"use strict";var e=t("nav").outerHeight();if(t(".navbar-toggler").on("click",(function(){t("#mainNav").hasClass("navbar-reduce")||t("#mainNav").addClass("navbar-reduce")})),t(window).on("load",(function(){t("#preloader").length&&t("#preloader").delay(100).fadeOut("slow",(function(){t(this).remove()}))})),t(window).scroll((function(){t(this).scrollTop()>100?t(".back-to-top").fadeIn("slow"):t(".back-to-top").fadeOut("slow")})),t(".back-to-top").click((function(){return t("html, body").animate({scrollTop:0},1500,"easeInOutExpo"),!1})),t(".scrolltop-mf").on("click",(function(){t("html, body").animate({scrollTop:0},1e3)})),t(".counter").counterUp({delay:15,time:2e3}),t('a.js-scroll[href*="#"]:not([href="#"])').on("click",(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var o=t(this.hash);if((o=o.length?o:t("[name="+this.hash.slice(1)+"]")).length)return t("html, body").animate({scrollTop:o.offset().top-e+5},1e3,"easeInOutExpo"),!1}})),t(".js-scroll").on("click",(function(){t(".navbar-collapse").collapse("hide")})),t("body").scrollspy({target:"#mainNav",offset:e}),t(window).trigger("scroll"),t(window).on("scroll",(function(){t(window).scrollTop()>50?(t(".navbar-expand-md").addClass("navbar-reduce"),t(".navbar-expand-md").removeClass("navbar-trans")):(t(".navbar-expand-md").addClass("navbar-trans"),t(".navbar-expand-md").removeClass("navbar-reduce")),t(window).scrollTop()>1200?t(".scrolltop-mf").fadeIn(1e3,"easeInOutExpo"):t(".scrolltop-mf").fadeOut(1e3,"easeInOutExpo")})),1==t(".text-slider").length){var o=t(".text-slider-items").text();new Typed(".text-slider",{strings:o.split(","),typeSpeed:80,loop:!0,backDelay:1100,backSpeed:30})}t("#testimonial-mf").owlCarousel({margin:20,autoplay:!0,autoplayTimeout:4e3,autoplayHoverPause:!0,responsive:{0:{items:1}}})}(jQuery)}]);