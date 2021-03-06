/**
 * load content
 * @author yiminghe@gmail.com
 */
KISSY.add("waterfall/loader", function(S, Node, Intervein) {

    var $ = Node.all,
        SCROLL_TIMER = 50;

    function Loader() {
        Loader.superclass.constructor.apply(this, arguments);
    }


    function doScroll() {
        var self = this;
        S.log("waterfall:doScroll");
        if (self.__loading) {
            return;
        }
        // 如果正在调整中，等会再看
        // 调整中的高度不确定，现在不适合判断是否到了加载新数据的条件
        if (self.isAdjusting()) {
            // 恰好 __onScroll 是 buffered . :)
            self.__onScroll();
            return;
        }
        var container = self.get("container"),
            colHeight = container.offset().top,
            diff = self.get("diff"),
            curColHeights = self.get("curColHeights");
        // 找到最小列高度
        if (curColHeights.length) {
            colHeight += Math.min.apply(Math, curColHeights);
        }
        // 动态载
        // 最小高度(或被用户看到了)低于预加载线
        if (diff + $(window).scrollTop() + $(window).height() > colHeight) {
            S.log("waterfall:loading");
            loadData.call(self);
        }
    }

    function loadData() {
        var self = this,
            container = this.get("container");

        self.__loading = true;

        var load = self.get("load");

        load && load(success, end);

        function success(items) {
            self.__loading = false;
            self.addItems(items);
        }

        function end() {
            self.__loading = false;
            $(window).detach("scroll", self.__onScroll);
        }

    }

    Loader.ATTRS = {
        diff:{
            getter:function(v) {
                return v || 0;
                // 默认一屏内加载
                //return $(window).height() / 4;
            }
        }
    };


    S.extend(Loader, Intervein, {
        _init:function() {
            var self = this;
            Loader.superclass._init.apply(self, arguments);
            self.__onScroll = S.buffer(doScroll, SCROLL_TIMER, self);
            $(window).on("scroll", self.__onScroll);
            doScroll.call(self);
        },

        destroy:function() {
            var self = this;
            Loader.superclass.destroy.apply(self, arguments);
            $(window).detach("scroll", self.__onScroll);
        }
    });

    return Loader;

}, {
    requires:['node','./base']
});