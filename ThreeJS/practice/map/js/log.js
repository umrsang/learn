!function(a) {
    var myLog = {
        pname:"",
        nname:"",
        params:function(u, paras) {
            var url = u;
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var paraObj = {};
            for (i = 0; j = paraString[i]; i++) {
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
            var ret = paraObj[paras.toLowerCase()];
            if (typeof ret == "undefined") {
                return "";
            } else {
                return ret;
            }
        },
        run:function(url) {
            var head = document.getElementsByTagName("body")[0];
            var sobj = document.createElement("script");
            sobj.type = "text/javascript";
            sobj.src = url;
            if (sobj.readyState) {
                sobj.onreadystatechange = function() {
                    if (sobj.readyState == "loaded" || sobj.readyState == "complete") {
                        head.removeChild(sobj);
                    }
                };
            } else {
                sobj.onload = function() {
                    head.removeChild(sobj);
                };
            }
            sobj.onerror = function() {
                head.removeChild(sobj);
            };
            head.appendChild(sobj);
        },
        enter:function() {
            var channel = this.params(location.search, this.cname ? this.cname :"c");
            var shareTimes = parseInt(this.params(location.search, this.nname ? this.nname :"n"));
            if (!shareTimes) {
                shareTimes = 0;
            }
            if (!this.link) {
                this.link = location.hostname + location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1);
            } else {
                this.link = this.link.replace("http://", "").replace("https://", "");
            }
            var u = this.link;
            var a = "e";
            var c = channel;
            var n = shareTimes;
            var t = this.pname ? this.pname :document.title;
            var tjurl = location.protocol + "//stat.skyfish.me/weblog/?u=" + encodeURIComponent(u) + "&a=" + a + "&c=" + c + "&n=" + n + "&t=" + encodeURIComponent(t);
            this.run(tjurl);
        },
        share:function(pos) {
            var c = this.params(location.search, this.cname ? this.cname :"c");
            if (!this.link) {
                this.link = location.hostname + location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1);
            } else {
                this.link = this.link.replace("http://", "").replace("https://", "");
            }
            var u = this.link;
            var a = "s";
            var t = this.pname ? this.pname :document.title;
            var tjurl = location.protocol + "//stat.skyfish.me/weblog/?u=" + encodeURIComponent(u) + "&a=" + a + "&c=" + c + "&s=" + pos + "&t=" + encodeURIComponent(t);
            this.run(tjurl);
        },
        download:function() {
            var c = this.params(location.search, this.cname ? this.cname :"c");
            if (!this.link) {
                this.link = location.hostname + location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1);
            } else {
                this.link = this.link.replace("http://", "").replace("https://", "");
            }
            var u = this.link;
            var a = "d";
            var t = this.pname ? this.pname :document.title;
            var tjurl = location.protocol + "//stat.skyfish.me/weblog/?u=" + encodeURIComponent(u) + "&a=" + a + "&c=" + c + "&t=" + encodeURIComponent(t);
            this.run(tjurl);
        },
        click:function(u, t) {
            var channel = this.params(location.search, this.cname ? this.cname :"c");
            var shareTimes = parseInt(this.params(location.search, this.nname ? this.nname :"n"));
            if (!shareTimes) {
                shareTimes = 0;
            }
            var u = "webapi.163.com/clickcount/" + u + "/";
            var a = "e";
            var c = channel;
            var n = shareTimes;
            var t = t || "none";
            var tjurl = location.protocol + "//stat.skyfish.me/weblog/?u=" + encodeURIComponent(u) + "&a=" + a + "&c=" + c + "&n=" + n + "&t=" + encodeURIComponent(t);
            this.run(tjurl);
        },
        init:function(conf) {
            this.pname = conf.product || "";
            this.cname = conf.channel || "";
            this.nname = conf.sharetime || "";
            this.link = conf.link;
            if (!this.link) {
                this.link = location.hostname + location.pathname.substr(0, location.pathname.lastIndexOf("/") + 1);
            } else {
                this.link = this.link.replace("http://", "").replace("https://", "");
            }
        }
    };
    a["myLog"] = myLog;
}(this);
