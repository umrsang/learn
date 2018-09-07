var effObj, setEff = !1, isIE = !1;
nie.define("Index", function() {
    var nieFlash = nie.require("util.swfobject"), videoModule = nie.require("nie.util.videoV2"), copy = nie.require("nie.util.copytext"), PopDialog = nie.require("nie.util.PopDialog"), niedownload = nie.require("nie.util.niedownload"), comm = nie.require("comm"), pageIndex = 0, currRoleIndex = 1, isChanging = !1, isChangingRole = !1, navLen = $(".page-nav li").length, $window = $(window), wH = $window.height(), wW = $window.width(), mapCur, mapOld, mapArr = [], storySwiper, modeSwiper, recruitSwiper, outerRoleSwiper, outerSec1Swiper, storySliderTimer, outerSvgLine, popSvgLine_l, popSvgLine_r, frame1, sortArr = [], changeable = !1, rLen = $(".role_avatar").length, c_id = 0, p_id = rLen - 1, n_id = 1, isPop = !1, bgAni, bTemp, b2, b3, b4, b5, c, d, e, renderer, stage, imgCon, displacementMap, displacementMap2, shader, requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
            window.setTimeout(e, 1e3 / 60, (new Date).getTime())
        }
    }(), toNext = !0, t = {
        vertexShader: ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "varying vec2 vTextureCoord;", "uniform mat3 projectionMatrix;", "void main() {", "gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "vTextureCoord = aTextureCoord;", "}"].join("\n"),
        fragmentShader: ["precision highp float;", "varying vec2 vTextureCoord;", "uniform sampler2D uSampler;", "uniform sampler2D displacementMap;", "uniform sampler2D displacementMap2;", "uniform float time;", "uniform float elapsed;", "uniform float width;", "uniform vec2 resolution;", "uniform float scale;", "float snoise(vec2 co, float seed) {", "return fract(sin(dot(co * seed, vec2(12.9898, 78.233))) * 43758.5453);", "}", "void main() {", "vec2 repeat = vec2(scale, scale * resolution.y / resolution.x);", "vec2 uv = gl_FragCoord.xy / vec2(resolution.x, resolution.y);", "vec2 vCoord = fract(uv.xy * repeat.xy);", "vec4 displacement1 = texture2D( displacementMap, vCoord);", "vec4 displacement2 = texture2D( displacementMap2, vCoord);", "vec4 displacement = mix(displacement1, displacement2, vec4(time));", "vec2 mixTexture = mix(displacement.xy, vTextureCoord.xy, vec2(time));", "vec2 testPos1 = mixTexture + (1.0 - time) * displacement.xy * 0.5;", "vec2 testPos = mix(testPos1, vec2(1.0), vec2(1.0 - time));", "vec2 distUv = vec2(vTextureCoord.x, testPos.y);", "float noise = snoise(distUv, elapsed);", "vec4 color = texture2D(uSampler, distUv);", "gl_FragColor = vec4(mix(color, vec4(vec3(color * noise), 0.0), 0.18));", "}"].join("\n"),
        simpleFragmentShader: ["precision highp float;", "varying vec2 vTextureCoord;", "uniform sampler2D uSampler;", "uniform sampler2D displacementMap;", "uniform sampler2D displacementMap2;", "uniform float time;", "uniform float elapsed;", "uniform float width;", "uniform vec2 resolution;", "uniform float scale;", "float snoise(vec2 co, float seed) {", "return fract(sin(dot(co * seed, vec2(12.9898, 78.233))) * 43758.5453);", "}", "void main() {", "vec2 repeat = vec2(scale, scale * resolution.y / resolution.x);", "vec2 uv = gl_FragCoord.xy / vec2(resolution.x, resolution.y);", "float noise = snoise(vTextureCoord, elapsed);", "vec4 color = texture2D(uSampler, vTextureCoord);", "gl_FragColor = vec4(mix(color, vec4(vec3(color * noise), 0.0), 0.18));", "}"].join("\n"),
        val: 0
    }, t_up = {
        vertexShader: ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "varying vec2 vTextureCoord;", "uniform mat3 projectionMatrix;", "void main() {", "gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "vTextureCoord = aTextureCoord;", "}"].join("\n"),
        fragmentShader: ["precision highp float;", "varying vec2 vTextureCoord;", "uniform sampler2D uSampler;", "uniform sampler2D displacementMap;", "uniform sampler2D displacementMap2;", "uniform float time;", "uniform float elapsed;", "uniform float width;", "uniform vec2 resolution;", "uniform float scale;", "float snoise(vec2 co, float seed) {", "return fract(sin(dot(co * seed, vec2(12.9898, 78.233))) * 43758.5453);", "}", "void main() {", "vec2 repeat = vec2(scale, scale * resolution.y / resolution.x);", "vec2 uv = gl_FragCoord.xy / vec2(resolution.x, resolution.y);", "vec2 vCoord = fract(uv.xy * repeat.xy);", "vec4 displacement1 = texture2D( displacementMap, vCoord);", "vec4 displacement2 = texture2D( displacementMap2, vCoord);", "vec4 displacement = mix(displacement1, displacement2, vec4(time));", "vec2 mixTexture = mix(displacement.xy, vTextureCoord.xy, vec2(time));", "vec2 testPos1 = mixTexture + (1.0 - time) * displacement.xy * 0.5;", "vec2 testPos = mix(testPos1, vec2(1.0), vec2(1.0 - time));", "vec2 distUv = vec2(vTextureCoord.x, testPos.y);", "float noise = snoise(distUv, elapsed);", "vec4 color = texture2D(uSampler, distUv);", "gl_FragColor = vec4(mix(color, vec4(vec3(color * noise), 0.0), 0.18));", "}"].join("\n"),
        simpleFragmentShader: ["precision highp float;", "varying vec2 vTextureCoord;", "uniform sampler2D uSampler;", "uniform sampler2D displacementMap;", "uniform sampler2D displacementMap2;", "uniform float time;", "uniform float elapsed;", "uniform float width;", "uniform vec2 resolution;", "uniform float scale;", "float snoise(vec2 co, float seed) {", "return fract(sin(dot(co * seed, vec2(12.9898, 78.233))) * 43758.5453);", "}", "void main() {", "vec2 repeat = vec2(scale, scale * resolution.y / resolution.x);", "vec2 uv = gl_FragCoord.xy / vec2(resolution.x, resolution.y);", "float noise = snoise(vTextureCoord, elapsed);", "vec4 color = texture2D(uSampler, vTextureCoord);", "gl_FragColor = vec4(mix(color, vec4(vec3(color * noise), 0.0), 0.18));", "}"].join("\n"),
        val: 0
    }, t_down = {
        vertexShader: ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "varying vec2 vTextureCoord;", "uniform mat3 projectionMatrix;", "void main() {", "gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "vTextureCoord = aTextureCoord;", "}"].join("\n"),
        fragmentShader: ["precision highp float;", "varying vec2 vTextureCoord;", "uniform sampler2D uSampler;", "uniform sampler2D displacementMap;", "uniform sampler2D displacementMap2;", "uniform float time;", "uniform float elapsed;", "uniform float width;", "uniform vec2 resolution;", "uniform float scale;", "float snoise(vec2 co, float seed) {", "return fract(sin(dot(co * seed, vec2(12.9898, 78.233))) * 43758.5453);", "}", "void main() {", "vec2 repeat = vec2(scale, scale * resolution.y / resolution.x);", "vec2 uv = gl_FragCoord.xy / vec2(resolution.x, resolution.y);", "vec2 vCoord = fract(uv.xy * repeat.xy);", "vec4 displacement1 = texture2D( displacementMap, vCoord);", "vec4 displacement2 = texture2D( displacementMap2, vCoord);", "vec4 displacement = mix(displacement1, displacement2, vec4(time));", "vec2 mixTexture = mix(displacement.xy, vTextureCoord.xy, vec2(time));", "vec2 testPos1 = mixTexture + (-1.0 + time) * displacement.xy * 0.5;", "vec2 testPos = mix(testPos1, vec2(1.0), vec2(-1.0 + time));", "vec2 distUv = vec2(vTextureCoord.x, testPos.y);", "float noise = snoise(distUv, elapsed);", "vec4 color = texture2D(uSampler, distUv);", "gl_FragColor = vec4(mix(color, vec4(vec3(color * noise), 0.0), 0.18));", "}"].join("\n"),
        simpleFragmentShader: ["precision highp float;", "varying vec2 vTextureCoord;", "uniform sampler2D uSampler;", "uniform sampler2D displacementMap;", "uniform sampler2D displacementMap2;", "uniform float time;", "uniform float elapsed;", "uniform float width;", "uniform vec2 resolution;", "uniform float scale;", "float snoise(vec2 co, float seed) {", "return fract(sin(dot(co * seed, vec2(12.9898, 78.233))) * 43758.5453);", "}", "void main() {", "vec2 repeat = vec2(scale, scale * resolution.y / resolution.x);", "vec2 uv = gl_FragCoord.xy / vec2(resolution.x, resolution.y);", "float noise = snoise(vTextureCoord, elapsed);", "vec4 color = texture2D(uSampler, vTextureCoord);", "gl_FragColor = vec4(mix(color, vec4(vec3(color * noise), 0.0), 0.18));", "}"].join("\n"),
        val: 0
    }, w = 1920, h = 1080, isAni = !1, isShow = !0, addEvent = function() {
        $window.on("blur", function() {
            $(".vPart").hasClass("cur-part") && $(".vPart.cur-part video")[0].pause()
        }).on("focus", function() {
            $(".vPart").hasClass("cur-part") && $(".vPart.cur-part video")[0].play()
        }).on("resize", function() {
            wH = $window.height(),
            wW = $window.width(),
            $(".pop-detail-wrap").height(wH),
            $(".pve-detail .video-box").css({
                width: 722 * wH / 925,
                height: wH
            }),
            openVideoAutoSize()
        }).trigger("resize"),
        $(".shareBtn").on("click", function() {
            $(".pop-share").show(),
            setTimeout(function() {
                $(".pop-share").addClass("show")
            }, 200)
        }),
        $(".pop-share li").on("click", function(e) {
            e.stopPropagation()
        });
        var e = $(".icon__audio");
        $(".audioControlBtn").on("click", function() {
            e.hasClass("audio__play") ? (e.removeClass("audio__play").addClass("audio__stop"),
            effObj.windowOnBlur(),
            effObj.mute = !0) : (e.removeClass("audio__stop").addClass("audio__play"),
            effObj.mute = !1,
            effObj.windowOnFocus())
        });
        var t = $(".qrCodeImg");
        $(".codeBtn").on("click", function(e) {
            e.stopPropagation(),
            t.hasClass("show") ? (t.removeClass("show"),
            setTimeout(function() {
                t.css("height", 0)
            }, 300)) : (t.css("height", 270),
            t.addClass("show"))
        }),
        $(document).on("click", function() {
            t.removeClass("show"),
            setTimeout(function() {
                t.css("height", 0)
            }, 300)
        }),
        $(".videoBtn").on("click", function() {
            var e = {
                mp4: "https://nie.v.netease.com/nie/2017/0223/e94c2a4a8fd09bb59bee8b5382dc6ab5qt.mp4"
            };
            popVideo({
                mp4: e.mp4
            }),
            $window.trigger("blur")
        }),
        $("#xcVideo .btn-close").on("click", function() {
            popClose(),
            (0 == pageIndex || 5 == pageIndex) && $(".cont-media .sec" + (pageIndex + 1)).find("video")[0].play(),
            isIE || (effObj.windowOnFocus(),
            $window.trigger("focus"))
        }),
        $(".copy-wbUrl").on("click", function(e) {
            e.stopPropagation(),
            $(this).addClass("copied")
        }),
        copy({
            btn: ".copy-btn",
            text: location.href,
            callback: function() {
                PopDialog.Alert("\u590d\u5236\u94fe\u63a5\u6210\u529f\uff01"),
                $(this).addClass("copied")
            }
        }),
        $(".pop-share").on("click", function() {
            $(this).removeClass("show"),
            setTimeout(function() {
                $(".pop-share").hide(),
                $(".copy-wbUrl").removeClass("copied")
            }, 350)
        });
        var a = $(".code-box")
          , t = $(".qrCodeImg");
        $(".qrCode,.btn-closeCode,.qrCodeImg").on("click", function(e) {
            e.stopPropagation(),
            a.hasClass("show") ? (a.removeClass("show"),
            setTimeout(function() {
                t.css("height", 0)
            }, 300)) : (t.css("height", 270),
            a.addClass("show"))
        }),
        $(document).on("click", function() {
            a.removeClass("show"),
            setTimeout(function() {
                t.css("height", 0)
            }, 300)
        }),
        $(".p3-recruit-btn").on("click", function() {
            $(".pop-recruit-list").show();
            setTimeout(function() {
                $(".pop-recruit-list").addClass("show")
            }, 100)
        }),
        $(".next-arrow").on("click", function() {
            if (!isChanging) {
                var e = pageIndex;
                if (pageIndex++,
                pageIndex >= navLen - 1 && (pageIndex = navLen - 1),
                pageIndex == e)
                    return;
                isChanging = !0;
                var t = pageIndex;
                $(".page-nav li").eq(t).addClass("cur").siblings().removeClass("cur"),
                changePart(t, e)
            }
        });
        var s = $(".footer")
          , o = s.outerHeight()
          , n = $(".copyRightBtn");
        s.css({
            bottom: "-" + o + "px"
        }),
        n.on("click", function() {
            s.css({
                bottom: 0
            })
        }),
        s.on("mouseleave", function() {
            s.css({
                bottom: "-" + o + "px"
            })
        }),
        $(document).bind("mousewheel.secSlide", function(e) {
            if (!isPop)
                if (e.deltaY < 0) {
                    if (!isChanging) {
                        var t = pageIndex;
                        if (pageIndex++,
                        pageIndex >= navLen - 1 && (pageIndex = navLen - 1),
                        pageIndex == t)
                            return;
                        isChanging = !0;
                        var a = pageIndex;
                        $(".page-nav li").eq(a).addClass("cur").siblings().removeClass("cur"),
                        changePart(a, t)
                    }
                } else if (!isChanging) {
                    var t = pageIndex;
                    if (pageIndex--,
                    0 > pageIndex && (pageIndex = 0),
                    pageIndex == t)
                        return;
                    isChanging = !0;
                    var a = pageIndex;
                    $(".page-nav li").eq(a).addClass("cur").siblings().removeClass("cur"),
                    changePart(a, t)
                }
        })
    }, setDownload = function() {
        NieDownload.create({
            wrapper: $("#nie-download"),
            enableAndroid: !0,
            enableIos: !0,
            useSSL: !0,
            disableClick: function() {
                PopDialog.Alert("\u5b89\u5353\u656c\u8bf7\u671f\u5f85")
            }
        })
    }, setGift = function() {
        var e = "//dora.webcgi.163.com/api/173_565_2017_05_23/"
          , t = $(".code_img")
          , a = $(".downloadBar .gift-btn");
        t.attr("src", "//dora.webcgi.163.com/api/173_565_2017_05_23/get_cdkey_auth_img?t=" + (new Date).getTime()),
        t.on("click", function() {
            $(this).attr("src", "//dora.webcgi.163.com/api/173_565_2017_05_23/get_cdkey_auth_img?t=" + (new Date).getTime())
        }),
        a.on("click", function() {
            var a = $(".downloadBar .gift-phoneNum").val()
              , s = $(".downloadBar .gift-codeNum").val();
            "" == a || "\u8f93\u5165\u624b\u673a\u53f7\u7801" == a ? PopDialog.Alert("\u8bf7\u8f93\u5165\u624b\u673a\u53f7") : comm.checkPhoneNum(a) ? "" == s || "\u8f93\u5165\u9a8c\u8bc1\u7801" == s ? PopDialog.Alert("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801") : $.ajax({
                type: "get",
                url: e + "get_cdkey?mobile=" + a + "&img_authcode=" + s,
                dataType: "jsonp",
                success: function(e) {
                    1 == e.status ? (PopDialog.Alert("\u793c\u5305\u7801\u9886\u53d6\u6210\u529f\uff01\u8bf7\u7559\u610f\u77ed\u4fe1\u901a\u77e5\uff01"),
                    $(".downloadBar .gift-phoneNum,.downloadBar .gift-codeNum").val(""),
                    t.attr("src", "//dora.webcgi.163.com/api/173_565_2017_05_23/get_cdkey_auth_img?t=" + (new Date).getTime())) : (103 == e.status ? $(".downloadBar .gift-phoneNum,.downloadBar .gift-codeNum").val("") : 301 == e.status ? $(".downloadBar .gift-phoneNum,.downloadBar .gift-codeNum").val("") : 305 == e.status ? $(".downloadBar .gift-phoneNum").val("") : 501 == e.status ? ($(".downloadBar .gift-codeNum").val(""),
                    t.attr("src", "//dora.webcgi.163.com/api/173_565_2017_05_23/get_cdkey_auth_img?t=" + (new Date).getTime())) : 502 == e.status && ($(".downloadBar .gift-codeNum").val(""),
                    t.attr("src", "//dora.webcgi.163.com/api/173_565_2017_05_23/get_cdkey_auth_img?t=" + (new Date).getTime())),
                    PopDialog.Alert(e.msg))
                }
            }) : PopDialog.Alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801")
        })
    }, popWindow = function(e) {
        var t = $("#" + e)
          , a = (t.width(),
        t.height(),
        t.height() / 2)
          , s = t.width() / 2;
        t.css({
            "margin-top": -a,
            "margin-left": -s
        }).fadeIn(),
        $("#fade").length < 1 && $("body").append('<div id="fade"></div>'),
        $("#fade").css({
            filter: "alpha(opacity=80)"
        }).fadeIn()
    }, popClose = function(e) {
        $("#fade ,.dialog ,#" + e).fadeOut(),
        $("#videoBox").html("")
    }, setVideo = function(e) {
        videoModule({
            fat: "#videoBox",
            width: "800",
            height: "450",
            wmode: "direct",
            movieUrl: e.mp4,
            HDmovieUrl: e.mp4,
            SHDmovieUrl: e.mp4,
            vtype: "",
            autoPlay: !0
        })
    }, popVideo = function(e) {
        setVideo({
            mp4: e.mp4,
            img: ""
        }),
        popWindow("xcVideo")
    }, aggOrderFun = function() {
        var e = "//dora.webcgi.163.com/api/173_619_2017_08_30/"
          , t = $(".agg_pop")
          , a = $(".act_orderBtn")
          , s = $(".aggPopOrderBtn")
          , o = $(".order-close-btn")
          , n = $(".agg_pop .radio-box")
          , i = n.find("label")
          , r = $("#agg_phone")
          , c = $("#agg_auth")
          , l = $(".authImg img");
        l.on("click", function() {
            $(this).attr("src", "//dora.webcgi.163.com/api/173_619_2017_08_30/get_apnt_auth_img?t=" + (new Date).getTime())
        }),
        a.on("click", function() {
            TweenMax.to(t, 1, {
                display: "block",
                height: "100%",
                ease: Quint.easeInOut,
                onComplete: function() {
                    t.addClass("show"),
                    o.addClass("show")
                }
            })
        }),
        o.on("click", function() {
            TweenMax.to(t, 1, {
                display: "none",
                height: "0%",
                ease: Quint.easeInOut,
                onComplete: function() {
                    t.removeClass("show"),
                    o.removeClass("show"),
                    r.val(""),
                    c.val(""),
                    $(".agg_pop .radio-box label").removeClass("selected"),
                    $(".sys-ios").addClass("selected")
                }
            })
        }),
        i.on("click", function() {
            $(this).addClass("selected").siblings().removeClass("selected")
        }),
        s.on("click", function() {
            var t = r.val()
              , a = c.val()
              , s = $(".agg_pop .radio-box label.selected").data("type");
            "" == t ? PopDialog.Alert("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801") : comm.checkPhoneNum(t) ? "" == a ? PopDialog.Alert("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801") : $.ajax({
                type: "get",
                url: e + "/appoint?mobile=" + t + "&os=" + s + "&img_authcode=" + a,
                dataType: "jsonp",
                success: function(e) {
                    1 == e.status ? (r.val(""),
                    c.val(""),
                    PopDialog.Alert("\u9884\u7ea6\u6210\u529f\uff01"),
                    l.attr("src", "//dora.webcgi.163.com/api/173_619_2017_08_30/get_apnt_auth_img?t=" + (new Date).getTime()),
                    getAggNum()) : (PopDialog.Alert(103 == e.status ? "\u9a8c\u8bc1\u7801\u9519\u8bef" : 201 == e.status ? "\u5df2\u7ecf\u9884\u7ea6\uff0c\u8bf7\u52ff\u91cd\u590d\u9884\u7ea6" : 501 == e.status ? "\u9a8c\u8bc1\u7801\u8fc7\u671f" : 502 == e.status ? "\u9a8c\u8bc1\u7801\u9519\u8bef" : "\u65e0\u6b64\u63a5\u53e3"),
                    l.attr("src", "//dora.webcgi.163.com/api/173_619_2017_08_30/get_apnt_auth_img?t=" + (new Date).getTime()))
                }
            }) : PopDialog.Alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801")
        }),
        initAgg()
    }, initAgg = function() {
        getAggNum(),
        setInterval(function() {
            getAggNum()
        }, 6e4);
        var e = $(".showAggBtn")
          , t = $(".aggClose")
          , a = $(".aggregation-wrap");
        e.on("click", function() {
            $(this).removeClass("show"),
            a.addClass("show")
        }),
        t.on("click", function() {
            e.addClass("show"),
            a.removeClass("show")
        })
    }, getAggNum = function() {
        var e = "//dora.webcgi.163.com/api/173_619_2017_08_30/"
          , t = [0, 1e5, 3e5, 6e5, 8e5]
          , a = 148
          , s = $(".agg_prize_box .agg_prize_item")
          , o = $(".agg_order_num");
        $.ajax({
            type: "get",
            url: e + "/query_apntnum",
            dataType: "jsonp",
            success: function(e) {
                if (1 == e.status) {
                    var n = e.usernumber
                      , i = t[t.length - 1]
                      , r = $(".agg_progress_cont")
                      , c = r.find("p")
                      , l = 0;
                    n >= t[4] ? (n = i,
                    l = 5) : l = n >= t[3] ? 4 : n >= t[2] ? 3 : n >= t[1] ? 2 : 1;
                    var p = n - t[l - 1]
                      , m = l >= 5 ? 1 : t[l] - t[l - 1];
                    s.each(function(e) {
                        l > e && $(this).addClass("finished")
                    }),
                    o.html(e.usernumber),
                    c.css("width", a * (l - 1) + p / m * a + "px")
                } else
                    PopDialog.Alert(103 == e.status ? "\u9a8c\u8bc1\u7801\u9519\u8bef" : 201 == e.status ? "\u5df2\u7ecf\u9884\u7ea6\uff0c\u8bf7\u52ff\u91cd\u590d\u9884\u7ea6" : 501 == e.status ? "\u9a8c\u8bc1\u7801\u8fc7\u671f" : 502 == e.status ? "\u9a8c\u8bc1\u7801\u9519\u8bef" : "\u65e0\u6b64\u63a5\u53e3")
            }
        })
    }, orderFun = function() {
        var e = $(".pop-order")
          , t = $(".pop-order-btn")
          , a = $(".order-close-btn")
          , s = $(".pop-order .radio-box")
          , o = s.find("label");
        $(".order-btn, .rt-orderBtn").on("click", function() {
            TweenMax.to(e, 1, {
                display: "block",
                height: "100%",
                ease: Quint.easeInOut,
                onComplete: function() {
                    e.addClass("show"),
                    a.addClass("show")
                }
            })
        }),
        a.on("click", function() {
            TweenMax.to(e, 1, {
                display: "none",
                height: "0%",
                ease: Quint.easeInOut,
                onComplete: function() {
                    e.removeClass("show fadeOut"),
                    a.removeClass("show"),
                    $(".order-res").removeClass("show"),
                    $(".res-cont").removeClass("succ"),
                    $("#phoneNum,#cdKey").val(""),
                    $(".pop-order .radio-box label").removeClass("selected"),
                    $(".sys-ios").addClass("selected")
                }
            })
        }),
        o.on("click", function() {
            $(this).addClass("selected").siblings().removeClass("selected")
        }),
        t.on("click", function() {
            var e = $("#phoneNum").val()
              , t = $("#cdKey").val()
              , a = $(".pop-order .radio-box label.selected").data("type");
            "" == e ? PopDialog.Alert("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801") : comm.checkPhoneNum(e) ? "" == t ? PopDialog.Alert("\u8bf7\u8f93\u5165\u5bc6\u94a5") : "\u4e16\u754c\u9700\u8981\u62ef\u6551" != t ? PopDialog.Alert("\u5bc6\u94a5\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01") : $.ajax({
                type: "get",
                url: "//dora.webcgi.163.com/api/173_455_2016_12_20/appoint?mobile=" + e + "&os=" + a,
                dataType: "jsonp",
                success: function(e) {
                    1 == e.status ? ($(".pop-order").addClass("fadeOut"),
                    $(".order-res").addClass("show"),
                    $(".res-cont").addClass("succ"),
                    setTimeout(function() {
                        $("#phoneNum,#cdKey").val("")
                    }, 500)) : PopDialog.Alert(e.msg)
                }
            }) : PopDialog.Alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801")
        })
    }, recruitFun = function() {
        function e() {
            TweenMax.to(i, 1, {
                display: "block",
                height: "100%",
                ease: Quint.easeInOut,
                onComplete: function() {
                    i.addClass("show"),
                    r.addClass("show")
                }
            })
        }
        function t() {
            TweenMax.to(i, 1, {
                display: "none",
                height: "0%",
                ease: Quint.easeInOut,
                onComplete: function() {
                    g = "",
                    i.removeClass("show"),
                    r.removeClass("show"),
                    $(".recruit-res").removeClass("show"),
                    $("#recruit_phoneNum,#recruit_identifyingCode").val("")
                }
            })
        }
        var a = "//dora.webcgi.163.com/api/173_527_2017_04_19/"
          , s = $(".btn-join-department")
          , o = $(".btn-identifyingCode")
          , n = $(".pop-recruit-btn")
          , i = $(".pop-recruit")
          , r = $(".pop-recruit .com-pop-close-btn")
          , c = !0
          , l = null
          , p = 60
          , m = $(".pop-recruit .radio-box")
          , d = m.find("label")
          , g = "";
        s.on("click", function() {
            g = $(this).data("dep"),
            e()
        }),
        r.on("click", function() {
            t()
        }),
        d.on("click", function() {
            $(this).addClass("selected").siblings().removeClass("selected")
        }),
        o.on("click", function() {
            var e = $("#recruit_phoneNum").val();
            c && ("" == e ? PopDialog.Alert("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801") : comm.checkPhoneNum(e) ? $.ajax({
                type: "get",
                url: a + "get_authcode_apnt?mobile=" + e,
                dataType: "jsonp",
                success: function(e) {
                    1 == e.status ? (c = !1,
                    PopDialog.Alert("\u9a8c\u8bc1\u7801\u53d1\u9001\u6210\u529f\uff01"),
                    o.text(p + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6"),
                    l = setInterval(function() {
                        p--,
                        0 > p ? (c = !0,
                        p = 60,
                        o.text("\u83b7\u53d6\u9a8c\u8bc1\u7801"),
                        clearInterval(l)) : o.text(p + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
                    }, 1e3)) : PopDialog.Alert(e.msg)
                }
            }) : PopDialog.Alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801"))
        }),
        n.on("click", function() {
            var e = $("#recruit_phoneNum").val()
              , t = $("#recruit_identifyingCode").val()
              , s = $(".pop-recruit .radio-box label.selected").data("type");
            "" == e ? PopDialog.Alert("\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801") : comm.checkPhoneNum(e) ? "" == t ? PopDialog.Alert("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801") : $.ajax({
                type: "get",
                url: a + "verify_authcode",
                data: {
                    mobile: e,
                    authcode: t,
                    os: s,
                    extra: g
                },
                dataType: "jsonp",
                success: function(e) {
                    1 == e.status ? ($(".recruit-res").addClass("show"),
                    $("#recruit_phoneNum,#recruit_identifyingCode").val("")) : PopDialog.Alert(103 == e.status ? "\u9a8c\u8bc1\u7801\u683c\u5f0f\u9519\u8bef" : 105 == e.status ? "\u9a8c\u8bc1\u7801\u9519\u8bef" : 112 == e.status ? "\u83b7\u53d6\u9a8c\u8bc1\u7801\u95f4\u9694\u8fc7\u77ed\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5" : 113 == e.status ? "\u9a8c\u8bc1\u7801\u5c1d\u8bd5\u6b21\u6570\u8fc7\u591a" : 201 == e.status ? "\u60a8\u5df2\u6210\u529f\u5165\u9a7b\uff0c\u8bf7\u52ff\u91cd\u590d\u9884\u7ea6" : e.msg)
                }
            }) : PopDialog.Alert("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801")
        })
    }, bindNavEvent = function() {
        var e = $(".pop-detail-wrap");
        $(".page-nav li").on("click", function() {
            if (!isChanging)
                if ($(this).hasClass("cur")) {
                    if ($(".page-nav").hasClass("pop")) {
                        var t = $(this).index()
                          , a = e.find("section").eq(t - 1);
                        closePop(a, function() {
                            resetPopStatus(t - 1)
                        })
                    }
                } else {
                    isChanging = !0;
                    var t = $(this).index()
                      , s = $(".page-nav li.cur").index();
                    pageIndex = t,
                    $(".page-nav li").eq(t).addClass("cur").siblings().removeClass("cur"),
                    changePart(t, s)
                }
        })
    }, detailEvent = function() {
        var e = $(".pop-detail-wrap")
          , t = $(".story-detail")
          , a = $(".roles-detail")
          , s = $(".mode-detail")
          , o = $(".pve-detail")
          , n = $(".recruit-detail");
        $("#sec2-story-btn").on("click", function() {
            openPop(t, 1, function() {
                storySliderTimer = setTimeout(function() {
                    0 == storySwiper.activeIndex && storySwiper.slideTo(1)
                }, 2e3)
            }),
            e.addClass("bg3"),
            resetSvgLineAni(),
            updateDistortionAni(2, "part0")
        }),
        $(".story-close-btn").on("click", function() {
            closePop(t, function() {
                e.removeClass("bg2"),
                storySwiper.slideTo(0)
            })
        });
        var i = $(".roles-close-btn");
        $("#sec3-hero-btn").on("click", function() {
            e.addClass("bg2"),
            $(".role1").show().addClass("show"),
            openPop(a, 1),
            resetSvgLineAni(),
            updateDistortionAni(3)
        }),
        i.on("click", function() {
            var e = $(".roles-item.show");
            e.hasClass("showSkill") ? (e.removeClass("showSkill"),
            $(".roles_nav").removeClass("hideList"),
            i.removeClass("show"),
            $(".page-nav").addClass("show")) : closePop(a, function() {
                $(".roles-item").hide().removeClass("show showSkill showMsg"),
                c_id = 1,
                initRolesNavDom(c_id),
                resetRolesNavDom()
            })
        });
        var r = $(".roleMsg-btn")
          , c = $(".roles_nav")
          , l = $(".weapon-btn")
          , p = $(".closeMsg-btn")
          , m = $(".roles_nav .closeBtn");
        r.on("click", function() {
            $(".roles-item.show").addClass("showMsg"),
            c.addClass("hideList"),
            setTimeout(function() {
                $(".roles-item.show .closeMsg-btn").addClass("show")
            }, 1e3)
        }),
        p.on("click", function() {
            $(".roles-item.show").removeClass("showMsg"),
            c.removeClass("hideList"),
            $(".roles-item.show .closeMsg-btn").removeClass("show")
        }),
        l.on("click", function() {
            $(".roles-item.show").addClass("showSkill"),
            c.addClass("hideList"),
            $(".page-nav").removeClass("show"),
            i.addClass("show")
        }),
        m.on("click", function() {
            c.addClass("hideList")
        }),
        $("#sec4-mode-btn").on("click", function() {
            openPop(s, 1),
            e.addClass("bg3"),
            resetSvgLineAni(),
            updateDistortionAni(4, "mode1")
        }),
        $(".mode-close-btn").on("click", function() {
            closePop(s, function() {
                modeSwiper.slideTo(0)
            })
        }),
        $("#sec5-pve-btn").on("click", function() {
            openPop(o, 1),
            e.addClass("bg3"),
            $(".pop-svg-box").addClass("open"),
            resetSvgLineAni(),
            updateDistortionAni(5),
            setTimeout(function() {
                o.addClass("show")
            }, 2e3)
        }),
        $(".pve-close-btn").on("click", function() {
            closePop(o, function() {
                o.removeClass("show")
            })
        });
        var d = $(".pop-recruit-list")
          , g = $(".recruit-list-item")
          , u = whichTransitionEvent();
        g.on("click", function() {
            var e = $(this)
              , t = e.index();
            e.addClass("show"),
            e.one(u, function() {
                d.addClass("fadeOut"),
                recruitSwiper.slideTo(t),
                setTimeout(function() {
                    d.removeClass("show fadeOut").hide()
                }, 1500),
                openPop(n, .1),
                resetSvgLineAni(),
                updateDistortionAni(6, $(recruitSwiper.slides[t]).data("name"))
            })
        }),
        $(".recruit-detail .part3-x").on("click", function() {
            closePop(n, function() {
                g.removeClass("show")
            })
        }),
        $(".recruit-close-btn").on("click", function() {
            closePop(n, function() {
                resetPopStatus(4)
            })
        })
    }, openPop = function(e, t, a) {
        var s = $(".pop-detail");
        isPop = !0,
        e.addClass("cur"),
        TweenMax.to(s, t, {
            height: "100%",
            ease: Quint.easeInOut,
            onComplete: function() {
                s.addClass("show"),
                $(".page-nav").addClass("pop");
                for (var t = 0; 2 > t; t++)
                    popSvgLine_l.play(t),
                    popSvgLine_r.play(t);
                TweenMax.to(e, 1.2, {
                    alpha: 1,
                    zIndex: 2,
                    ease: Quint.easeInOut,
                    onComplete: function() {
                        a && "function" == typeof a && a()
                    }
                })
            }
        })
    }, closePop = function(e, t) {
        var a = $(".pop-detail")
          , s = $(".pop-detail-wrap")
          , o = $(".pop-svg-box");
        isPop = !1,
        $(".page-nav").removeClass("pop"),
        e.removeClass("cur"),
        resetSvgLineAni(),
        updateDistortionAni(),
        TweenMax.to(a, .8, {
            height: "0",
            ease: Quint.easeInOut,
            onComplete: function() {
                a.removeClass("show"),
                s.removeClass("bg2 bg3"),
                o.removeClass("open"),
                TweenMax.to(e, 0, {
                    alpha: 0,
                    zIndex: -1,
                    ease: Quint.easeInOut
                }),
                t && "function" == typeof t && t()
            }
        })
    }, resetSvgLineAni = function() {}, updateDistortionAni = function(e, t) {
        isIE ? e ? ieVideo(e, t) : $(".video-box").html("") : effObj.updateEff(isPop, e, t)
    }, ieVideo = function(e, t) {
        var a, s = $("<video></video>");
        s.attr({
            loop: "loop",
            autoplay: "autoplay",
            preload: "metadata"
        });
        for (var o in DATA.videos)
            if (o == t) {
                s.attr("src", DATA.videos[o].src);
                break
            }
        2 == e ? (a = $(storySwiper.slides[storySwiper.activeIndex]).find(".video-box"),
        a.html(""),
        s.appendTo(a)) : 4 == e ? (a = $(modeSwiper.slides[modeSwiper.activeIndex]).find(".video-box"),
        a.html(""),
        s.appendTo(a)) : 5 == e && (s.attr("src", DATA.videos["pve-1"].src),
        $(".pve-detail .video-box").append(s))
    }, innerRoleNavEvent = function() {
        function e() {
            if (changeable) {
                $(".effect_cas").addClass("reversal");
                {
                    parseInt($(".role_avatar.curr").data("index")) - 1
                }
                a(),
                m = 0
            }
        }
        function t() {
            if (changeable) {
                $(".effect_cas").removeClass("reversal");
                {
                    parseInt($(".role_avatar.curr").data("index")) - 1
                }
                a(),
                m = 0
            }
        }
        function a() {
            changeable = !1;
            $(".role_avatar");
            $("#frame_wrap").removeClass("hide"),
            frame1.start(),
            $(".flash_cont img").removeClass("show");
            var e = $(".roles-item.show")
              , t = currRoleIndex
              , a = $(".role" + t);
            e.removeClass("show showMsg showSkill"),
            setTimeout(function() {
                e.hide(),
                a.show(),
                setTimeout(function() {
                    a.addClass("show"),
                    isChangingRole = !1
                }, 100)
            }, 500)
        }
        function s() {
            for (var e = 26, t = 30, a = 162, s = 140, r = 0; 6 > r; r++)
                for (var c = 0; 26 > c; c++)
                    o[r].push("https://tqlm.res.netease.com/pc/gw/20170905171717/data/frame/avatarFrame/r" + (r + 1) + "/" + c + ".png");
            n[0] = Frame.create({
                imgs: o[0],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".role_avatar .r1_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            n[1] = Frame.create({
                imgs: o[1],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".role_avatar .r2_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            n[2] = Frame.create({
                imgs: o[2],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".role_avatar .r3_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            n[3] = Frame.create({
                imgs: o[3],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".role_avatar .r4_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            n[4] = Frame.create({
                imgs: o[4],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".role_avatar .r5_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            n[5] = Frame.create({
                imgs: o[5],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".role_avatar .r6_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            i[0] = Frame.create({
                imgs: o[0],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".out-role-list .r1_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            i[1] = Frame.create({
                imgs: o[1],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".out-role-list .r2_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            i[2] = Frame.create({
                imgs: o[2],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".out-role-list .r3_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            i[3] = Frame.create({
                imgs: o[3],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".out-role-list .r4_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            i[4] = Frame.create({
                imgs: o[4],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".out-role-list .r5_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            i[5] = Frame.create({
                imgs: o[5],
                imgNum: e,
                speed: t,
                frameWidth: a,
                frameHeight: s,
                frameWrap: $(".out-role-list .r6_frame"),
                loop: !1,
                callback: function() {},
                onReady: function() {}
            }),
            n[0].start(),
            n[1].start(),
            n[2].start(),
            n[3].start(),
            n[4].start(),
            n[5].start(),
            i[0].start(),
            i[1].start(),
            i[2].start(),
            i[3].start(),
            i[4].start(),
            i[5].start()
        }
        var o = [[], [], [], [], [], []]
          , n = []
          , i = [];
        initRolesNavDom(1),
        resetRolesNavDom(),
        s();
        var r = $(".role_avatar")
          , c = r.length
          , l = $(".out-role-list .roleBtn")
          , p = 1500
          , m = p
          , d = $(".pop-detail")
          , g = $(".pop-detail-wrap")
          , u = $(".roles-detail");
        r.on("click", function() {
            {
                var a = $(this);
                $(".role_avatar.curr").index()
            }
            currRoleIndex = a.data("index"),
            initRolesNavDom(currRoleIndex),
            a.hasClass("loc2") ? e() : a.hasClass("loc4") && t()
        }),
        r.on("mouseenter", function() {
            var e = $(this)
              , t = e.index();
            (e.hasClass("loc2") || e.hasClass("loc4")) && n[t].start()
        }),
        l.on("click", function() {
            var e = $(this)
              , t = parseInt(e.data("index"));
            currRoleIndex = t,
            initRolesNavDom(currRoleIndex),
            resetRolesNavDom(),
            g.addClass("bg2"),
            u.find(".roles-item").eq(t - 1).show().addClass("show"),
            isPop = !0,
            $(".page-nav").addClass("pop"),
            resetSvgLineAni(),
            updateDistortionAni(),
            TweenMax.to(d, .8, {
                height: "100%",
                ease: Quint.easeInOut,
                onComplete: function() {
                    d.addClass("show"),
                    u.addClass("cur"),
                    TweenMax.to(u, 1.2, {
                        alpha: 1,
                        zIndex: 2,
                        ease: Quint.easeInOut,
                        onComplete: function() {}
                    })
                }
            })
        }),
        l.on("mouseenter", function() {
            var e = $(this)
              , t = e.data("index");
            i[t - 1].start()
        }),
        $(document).bind("mousewheel.changRole", function(a) {
            isPop && $(".roles-detail").hasClass("cur") && changeable && ($(".roles_nav").removeClass("hideList"),
            $(".roles-close-btn").removeClass("show"),
            $(".page-nav").addClass("show"),
            a.deltaY < 0 ? (currRoleIndex++,
            currRoleIndex > c && (currRoleIndex = 1),
            initRolesNavDom(currRoleIndex),
            t()) : (currRoleIndex--,
            1 > currRoleIndex && (currRoleIndex = c),
            initRolesNavDom(currRoleIndex),
            e()))
        })
    }, outerRoleNavEvent = function() {}, initRolesNavDom = function(e) {
        var t, a, s, o, n, i, r = $(".role_list"), c = r.find(".role_avatar"), l = c.length, p = e;
        t = 0 >= p - 2 ? p - 2 + l : p - 2,
        a = 0 >= p - 1 ? p - 1 + l : p - 1,
        s = p,
        o = p + 1 > l ? p + 1 - l : p + 1,
        n = p + 2 > l ? p + 2 - l : p + 2,
        i = p + 3 > l ? p + 3 - l : p + 3,
        sortArr = [t, a, s, o, n, i],
        c.each(function() {
            $(this).data("index") == s && $(this).addClass("curr")
        })
    }, resetRolesNavDom = function() {
        var e = $(".role_list .role_avatar");
        e.removeClass().addClass("role_avatar");
        for (var t = 0; t < sortArr.length; t++)
            e.each(function() {
                var e = $(this);
                e.data("index") == sortArr[t] && e.addClass("loc" + (t + 1))
            });
        $(".role_avatar.loc3").addClass("highLight")
    }, changeEffect = function() {
        for (var e = [], t = $(".role_list .role_avatar"), a = 0; 32 >= a; a++)
            e.push("https://tqlm.res.netease.com/pc/gw/20170905171717/data/frame/frame/" + a + ".png");
        frame1 = Frame.create({
            imgs: e,
            imgNum: 33,
            speed: 30,
            frameWidth: 289,
            frameHeight: 354,
            frameWrap: $("#frame_wrap"),
            loop: !1,
            doFrameStart: 2,
            doFramesEnd: 17,
            callback: function() {
                $("#frame_wrap").addClass("hide");
                setTimeout(function() {
                    changeable = !0
                }, 500)
            },
            onReady: function() {
                changeable = !0
            },
            doFrameStartFun: function() {
                t.addClass("fadeOut")
            },
            doFrameStartEnd: function() {
                t.removeClass("fadeOut"),
                t.removeClass().addClass("role_avatar");
                for (var e = 0; e < sortArr.length; e++)
                    t.each(function() {
                        var t = $(this);
                        t.data("index") == sortArr[e] && t.addClass("loc" + (e + 1))
                    });
                $(".role_avatar.loc3").addClass("highLight")
            }
        }),
        frame1.start()
    }, changePart = function(e, t) {
        function a() {
            g.css({
                top: 0,
                "z-index": 2
            }).find("video")[0].play(),
            TweenMax.to(d, 1.2, {
                height: 0,
                ease: Quint.easeInOut,
                onComplete: function() {
                    isChanging = !1,
                    d.removeClass("cur-part").css({
                        height: "100%",
                        top: "-100%",
                        "z-index": 2
                    }).find("video")[0].pause(),
                    g.addClass("cur-part").css("z-index", 3)
                }
            }),
            c(t, e, 1.2, 0),
            resetPopStatus(t - 1)
        }
        function s() {
            g.css({
                top: 0
            }),
            r(e),
            TweenMax.to(d, 1.2, {
                height: 0,
                ease: Quint.easeInOut,
                onComplete: function() {
                    isChanging = !1,
                    d.removeClass("cur-part").css({
                        height: "100%",
                        top: "-100%"
                    }).find("video")[0].pause(),
                    g.addClass("cur-part")
                }
            }),
            c(t, e, 1.2, 0),
            resetPopStatus(t - 1)
        }
        function o() {
            toNext ? bgAni.toNext(e, !1) : bgAni.toPrev(e, !1),
            TweenMax.to(d, .5, {
                alpha: 0,
                ease: Quint.easeOut,
                onComplete: function() {
                    d.css({
                        top: "-100%",
                        opacity: 1,
                        zIndex: 2
                    })
                }
            }),
            i(),
            c(t, e, 1.2, h),
            resetPopStatus(t - 1)
        }
        function n() {
            toNext ? bgAni.toNext(e, !0) : bgAni.toPrev(e, !0),
            TweenMax.to(d, .5, {
                alpha: 0,
                ease: Quint.easeOut,
                onComplete: function() {
                    d.css({
                        top: "-100%",
                        opacity: 1,
                        zIndex: 2
                    })
                }
            }),
            i(),
            c(t, e, 1.2, h),
            resetPopStatus(t - 1)
        }
        function i() {
            TweenMax.to(g, 0, {
                top: toNext ? wH : -wH,
                alpha: 0,
                zIndex: 4,
                onComplete: function() {
                    TweenMax.to(g, 1.2, {
                        top: 0,
                        alpha: 1,
                        delay: v,
                        ease: f,
                        onComplete: function() {
                            d.removeClass("cur-part"),
                            g.addClass("cur-part").css({
                                "z-index": 3
                            })
                        }
                    })
                }
            })
        }
        function r(e) {
            mapCur = mapArr[e],
            imgCon.removeChild(mapOld),
            imgCon.addChild(mapCur),
            mapOld = mapCur
        }
        function c(e, t, a, s) {
            var o = w.eq(t)
              , n = w.eq(e)
              , i = $(".slogan_index .line-box b")
              , r = $(".slogan_more .line-box b");
            TweenMax.to(n, a, {
                y: toNext ? -u : u,
                alpha: 0,
                delay: s,
                ease: Quint.easeInOut,
                onComplete: function() {
                    n.removeClass("show-cont").css({
                        visibility: "hidden"
                    }),
                    n.find(".s-line").removeClass("swing")
                }
            }),
            TweenMax.to(o, 0, {
                y: toNext ? u : -u,
                alpha: 0,
                delay: s,
                ease: Quint.easeInOut,
                onComplete: function() {
                    TweenMax.to(o, a, {
                        y: 0,
                        visibility: "visible",
                        alpha: 1,
                        ease: Quint.easeInOut,
                        onComplete: function() {
                            o.addClass("show-cont"),
                            setTimeout(function() {
                                o.find(".s-line").addClass("swing")
                            }, 1e3)
                        }
                    })
                }
            }),
            TweenMax.to(i, a, {
                x: "100%",
                ease: Quint.easeOut,
                onComplete: function() {
                    TweenMax.to(i, 0, {
                        x: "-100%",
                        onComplete: function() {
                            $(".slogan_index i").eq(t).addClass("cur").siblings().removeClass("cur"),
                            TweenMax.to(i, a, {
                                x: "0%",
                                ease: Quint.easeOut,
                                onComplete: function() {}
                            })
                        }
                    })
                }
            }),
            TweenMax.to(r, a, {
                x: "-100%",
                ease: Quint.easeOut,
                onComplete: function() {
                    TweenMax.to(r, 0, {
                        x: "100%",
                        onComplete: function() {
                            TweenMax.to(r, a, {
                                x: "0%",
                                ease: Quint.easeOut,
                                onComplete: function() {}
                            })
                        }
                    })
                }
            })
        }
        {
            var l = t
              , p = e
              , m = ($(".pop-detail-wrap"),
            $(".story-detail"),
            $(".roles-detail"),
            $(".mode-detail"),
            $(".pve-detail"),
            $(".recruit-detail"),
            $(".part"))
              , d = ($(".view"),
            m.eq(l))
              , g = m.eq(p)
              , u = 250
              , h = .6
              , v = 1.1
              , f = Quint.easeOut
              , w = $(".cont-slogan section");
            $(".videoBtn")
        }
        if (isIE && (h = 0,
        v = 0,
        f = Quint.easeInOut),
        g.hasClass("vPart") && g.find("video")[0].play(0),
        toNext = e > t,
        d.hasClass("vPart") && g.hasClass("vPart"))
            if (isPop) {
                var _ = $(".pop-detail section").eq(t - 1);
                closePop(_, function() {
                    a()
                })
            } else
                a();
        else if (d.hasClass("vPart") && g.hasClass("cPart"))
            if (isPop) {
                var _ = $(".pop-detail section").eq(t - 1);
                closePop(_, function() {
                    s()
                })
            } else
                s();
        else if (d.hasClass("cPart") && g.hasClass("vPart"))
            if (isPop) {
                var _ = $(".pop-detail section").eq(t - 1);
                closePop(_, function() {
                    o()
                })
            } else
                o();
        else if (d.hasClass("cPart") && g.hasClass("cPart"))
            if (isPop) {
                var _ = $(".pop-detail section").eq(t - 1);
                closePop(_, function() {
                    n()
                })
            } else
                n();
        var x = $(".sec1-r-cont")
          , b = $(".sec3-role-nav")
          , C = $(".next-arrow")
          , y = $(".showAggBtn")
          , q = $(".rt-box")
          , I = $(".slogan_index")
          , T = $(".slogan_more");
        switch (0 == e ? setTimeout(function() {
            q.removeClass("down")
        }, 600) : setTimeout(function() {
            q.addClass("down")
        }, 600),
        e) {
        case 0:
            setTimeout(function() {
                x.addClass("show")
            }, 1e3),
            b.removeClass("show"),
            C.addClass("show"),
            I.removeClass("fadeOut"),
            T.removeClass("fadeOut"),
            y.removeClass("show"),
            $(".aggregation-wrap").addClass("show");
            break;
        case 1:
            b.removeClass("show"),
            x.removeClass("show"),
            C.addClass("show"),
            I.removeClass("fadeOut"),
            T.removeClass("fadeOut"),
            $(".aggregation-wrap,.showAggBtn").removeClass("show");
            break;
        case 2:
            setTimeout(function() {
                b.addClass("show")
            }, 1e3),
            x.removeClass("show"),
            C.addClass("show"),
            I.removeClass("fadeOut"),
            T.removeClass("fadeOut"),
            $(".aggregation-wrap,.showAggBtn").removeClass("show");
            break;
        case 3:
            b.removeClass("show"),
            x.removeClass("show"),
            C.addClass("show"),
            I.removeClass("fadeOut"),
            T.removeClass("fadeOut"),
            $(".aggregation-wrap,.showAggBtn").removeClass("show");
            break;
        case 4:
            b.removeClass("show"),
            x.removeClass("show"),
            C.addClass("show"),
            I.removeClass("fadeOut"),
            T.removeClass("fadeOut"),
            $(".aggregation-wrap,.showAggBtn").removeClass("show");
            break;
        case 5:
            b.removeClass("show"),
            x.removeClass("show"),
            C.removeClass("show"),
            I.addClass("fadeOut"),
            T.addClass("fadeOut"),
            $(".aggregation-wrap,.showAggBtn").removeClass("show")
        }
    }, resetPopStatus = function(e) {
        var t = $(".recruit-list-item")
          , a = $(".pop-detail-wrap")
          , s = $(".pve-detail");
        switch (e) {
        case 0:
            a.removeClass("bg2"),
            clearTimeout(storySliderTimer),
            storySwiper.slideTo(0);
            break;
        case 1:
            $(".roles-item").hide().removeClass("show showSkill showMsg"),
            currRoleIndex = 1,
            initRolesNavDom(currRoleIndex),
            resetRolesNavDom();
            break;
        case 2:
            modeSwiper.slideTo(0);
            break;
        case 3:
            s.removeClass("show");
            break;
        case 4:
            t.removeClass("show")
        }
    }, pixiAni = function() {
        function a() {
            PIXI.loader.add("map1", "https://tqlm.res.netease.com/pc/gw/20170905171717/data/displacement-map3.png").add("map2", "https://tqlm.res.netease.com/pc/gw/20170905171717/data/displacement-map2.png").load(function() {
                s(),
                o()
            })
        }
        function s() {
            try {
                renderer = PIXI.autoDetectRenderer(w, h, {
                    transparent: !0
                })
            } catch (e) {
                renderer = new PIXI.CanvasRenderer(w,h,{
                    transparent: !0
                })
            }
            $(".view")[0].appendChild(renderer.view),
            stage = new PIXI.Container,
            imgCon = new PIXI.Container,
            stage.addChild(imgCon),
            bTemp = new PIXI.Sprite.fromImage("https://tqlm.res.netease.com/pc/gw/20170905171717/data/bg1.jpg"),
            b2 = new PIXI.Sprite.fromImage("https://tqlm.res.netease.com/pc/gw/20170905171717/data/bg2.jpg"),
            b3 = new PIXI.Sprite.fromImage("https://tqlm.res.netease.com/pc/gw/20170905171717/data/bg3.jpg"),
            b4 = new PIXI.Sprite.fromImage("https://tqlm.res.netease.com/pc/gw/20170905171717/data/bg4.jpg"),
            b5 = new PIXI.Sprite.fromImage("https://tqlm.res.netease.com/pc/gw/20170905171717/data/bg5.jpg"),
            mapArr[0] = bTemp,
            mapArr[1] = b2,
            mapArr[2] = b3,
            mapArr[3] = b4,
            mapArr[4] = b5,
            mapCur = mapOld = bTemp,
            imgCon.addChild(mapOld),
            displacementMap = new PIXI.Texture.fromImage("https://tqlm.res.netease.com/pc/gw/20170905171717/data/displacement-map3.png"),
            displacementMap2 = new PIXI.Texture.fromImage("https://tqlm.res.netease.com/pc/gw/20170905171717/data/displacement-map2.png"),
            c = {
                time: {
                    type: "f",
                    value: 1
                },
                elapsed: {
                    type: "f",
                    value: 1
                },
                scale: {
                    type: "f",
                    value: 1
                },
                displacementMap: {
                    type: "sampler2D",
                    value: displacementMap
                },
                displacementMap2: {
                    type: "sampler2D",
                    value: displacementMap2
                },
                resolution: {
                    type: "v2",
                    value: [w, h]
                }
            },
            n()
        }
        function o() {
            shader.uniforms.elapsed += .01,
            isAni && (shader.uniforms.time = 1 - t.val),
            renderer.render(stage),
            requestAnimFrame(o)
        }
        function n() {
            d = t.vertexShader,
            e = t.fragmentShader,
            shader = new PIXI.Filter(d,e,c),
            imgCon.filters = [shader]
        }
        function i(e, a) {
            t = t_down,
            n(),
            l(e, a)
        }
        function r(e, a) {
            t = t_up,
            n(),
            l(e, a)
        }
        function l(e, a) {
            isAni = !0,
            TweenMax.to(t, 1056 >= h ? 2 : 1.4, {
                val: 1056 >= h ? 1 : .5,
                ease: Quint.easeIn,
                onComplete: function() {
                    t.val = 1,
                    isAni = !0,
                    a && p(e),
                    TweenMax.to(t, .1, {
                        val: 0,
                        delay: .5,
                        ease: Quint.easeOut,
                        onComplete: function() {
                            t.val = 0,
                            isAni = !1,
                            isChanging = !1
                        }
                    })
                }
            })
        }
        function p(e) {
            mapCur = mapArr[e],
            imgCon.removeChild(mapOld),
            imgCon.addChild(mapCur),
            mapOld = mapCur
        }
        var m = function() {
            a(this)
        };
        return m.prototype = {
            toPrev: function(e, t) {
                i(e, t)
            },
            toNext: function(e, t) {
                r(e, t)
            }
        },
        {
            create: function() {
                var e = new m;
                return e
            }
        }
    }(), pixiAni_temp = function() {
        function a() {
            try {
                renderer = PIXI.autoDetectRenderer(w, h, {
                    transparent: !0
                })
            } catch (a) {
                renderer = new PIXI.CanvasRenderer(w,h,{
                    transparent: !0
                })
            }
            $(".view")[0].appendChild(renderer.view),
            stage = new PIXI.Container,
            imgCon = new PIXI.DisplayObjectContainer,
            stage.addChild(imgCon),
            bTemp = new PIXI.Sprite.fromImage("bg1.jpg"),
            b2 = new PIXI.Sprite.fromImage("bg2.jpg"),
            b3 = new PIXI.Sprite.fromImage("bg3.jpg"),
            b4 = new PIXI.Sprite.fromImage("bg4.jpg"),
            b5 = new PIXI.Sprite.fromImage("bg5.jpg"),
            mapArr[0] = bTemp,
            mapArr[1] = b2,
            mapArr[2] = b3,
            mapArr[3] = b4,
            mapArr[4] = b5,
            mapCur = mapOld = bTemp,
            imgCon.addChild(mapOld),
            displacementMap = new PIXI.Texture.fromImage("displacement-map3.png"),
            displacementMap2 = new PIXI.Texture.fromImage("displacement-map2.png"),
            c = {
                time: {
                    type: "f",
                    value: 1
                },
                elapsed: {
                    type: "f",
                    value: 1
                },
                scale: {
                    type: "f",
                    value: 1
                },
                displacementMap: {
                    type: "sampler2D",
                    value: displacementMap
                },
                displacementMap2: {
                    type: "sampler2D",
                    value: displacementMap2
                },
                resolution: {
                    type: "v2",
                    value: [w, h]
                }
            },
            d = t.vertexShader,
            e = t.fragmentShader,
            shader = new PIXI.AbstractFilter(d,e,c),
            imgCon.filters = [shader]
        }
        function s() {
            shader.uniforms.elapsed += .01,
            isAni && (shader.uniforms.time = 1 - t.val),
            renderer.render(stage),
            requestAnimFrame(s)
        }
        PIXI.loader.add("map1", "displacement-map3.png").add("map2", "displacement-map2.png").load(function() {
            a(),
            s()
        })
    }, initPopSwiper = function() {
        var e = $(".pop-detail-wrap")
          , t = $(".story-close-btn.loc2")
          , a = $(".story-detail .swiper-next-btn-short")
          , s = $(".pop-svg-box")
          , o = $(".story-pagination");
        e.height(wH),
        storySwiper = new Swiper("#story-swiper-container",{
            loop: !1,
            speed: 800,
            effect: "fade",
            fade: {
                crossFade: !0
            },
            direction: "vertical",
            simulateTouch: !1,
            mousewheelControl: !0,
            onSlideChangeStart: function(e) {
                0 != e.activeIndex ? (setTimeout(function() {
                    t.fadeIn()
                }, 500),
                a.fadeOut(),
                s.addClass("open"),
                $(".story-pagination li").eq(e.activeIndex - 1).addClass("cur").siblings().removeClass("cur"),
                TweenMax.to(o, 1, {
                    visibility: "visible",
                    alpha: 1,
                    ease: Quint.easeInOut,
                    onComplete: function() {
                        $(".swiper-next-btn").addClass("show")
                    }
                }),
                updateDistortionAni(2, "part" + e.activeIndex)) : (t.fadeOut(),
                a.fadeIn(),
                s.removeClass("open"),
                TweenMax.to(o, 1, {
                    alpha: 0,
                    visibility: "hidden",
                    ease: Quint.easeInOut,
                    onComplete: function() {}
                }),
                $(".swiper-next-btn").removeClass("show"),
                updateDistortionAni(2, "part0")),
                $(e.slides[e.previousIndex]).removeClass("in").addClass("out"),
                $(e.slides[e.activeIndex]).addClass("in")
            },
            onSlideChangeEnd: function(e) {
                $(e.slides[e.previousIndex]).removeClass("out")
            }
        }),
        $(".story-detail .swiper-next-btn,.story-detail .swiper-next-btn-short").on("click", function() {
            storySwiper.slideNext()
        }),
        $(".story-pagination li").on("click", function() {
            var e = $(this).index() + 1;
            $(this).addClass("cur").siblings().removeClass("cur"),
            storySwiper.slideTo(e)
        });
        var n = $(".mode-location-box");
        modeSwiper = new Swiper("#mode-swiper-container",{
            loop: !1,
            speed: 800,
            direction: "vertical",
            effect: "fade",
            fade: {
                crossFade: !0
            },
            simulateTouch: !1,
            mousewheelControl: !0,
            onSlideChangeStart: function(e) {
                n.find(".currPage").text(e.activeIndex + 1),
                $(e.slides[e.previousIndex]).removeClass("in").addClass("out"),
                $(e.slides[e.activeIndex]).addClass("in"),
                updateDistortionAni(4, "mode" + (e.activeIndex + 1))
            },
            onSlideChangeEnd: function(e) {
                $(e.slides[e.previousIndex]).removeClass("out")
            }
        }),
        $(".mode-pagination .mode-prev-btn").on("mouseover", function() {
            0 != modeSwiper.activeIndex && $(this).addClass("hover")
        }),
        $(".mode-pagination .mode-next-btn").on("mouseover", function() {
            modeSwiper.activeIndex != modeSwiper.slides.length - 1 && $(this).addClass("hover")
        }),
        $(".mode-pagination a").on("mouseout", function() {
            $(this).removeClass("hover")
        }),
        $(".mode-prev-btn").on("click", function() {
            modeSwiper.slidePrev()
        }),
        $(".mode-next-btn").on("click", function() {
            modeSwiper.slideNext()
        });
        var i = $(".recruit-detail .swiper-next-btn-short");
        recruitSwiper = new Swiper("#recruit-swiper-container",{
            loop: !1,
            speed: 800,
            direction: "vertical",
            simulateTouch: !1,
            mousewheelControl: !0,
            onSlideChangeStart: function(e) {
                var t = $(e.slides[e.activeIndex]).data("name")
                  , a = e.slides.length;
                e.activeIndex >= a - 1 ? i.fadeOut() : i.fadeIn(),
                updateDistortionAni(6, t)
            }
        }),
        i.on("click", function() {
            recruitSwiper.slideNext()
        })
    }, initOuterSwiper = function() {
        var e = $(".sec1-r-cont .swiper-container .swiper-slide").length
          , t = 1 == e ? !1 : !0;
        outerSec1Swiper = new Swiper(".sec1-r-cont .swiper-container",{
            loop: t,
            speed: 800,
            autoplay: 4e3,
            autoplayDisableOnInteraction: !1,
            direction: "horizontal",
            simulateTouch: !1,
            onSlideChangeStart: function() {}
        }),
        $(".sec1-r-cont .slideBtn").on("click", function() {
            outerSec1Swiper.slideNext()
        }),
        outerRoleSwiper = new Swiper(".sec3-role-nav .swiper-container",{
            loop: !0,
            speed: 800,
            autoplay: 4e3,
            autoplayDisableOnInteraction: !1,
            direction: "horizontal",
            simulateTouch: !1,
            onSlideChangeStart: function(e) {
                $(".role-index b").eq(e.realIndex).addClass("cur").siblings().removeClass("cur")
            }
        })
    }, initRoleFlash = function() {
        function e(e, t) {
            $.flash.available && e.flash({
                swf: t,
                width: "100%",
                height: "100%",
                allowScriptAccess: "always",
                wmode: "transparent"
            })
        }
        for (var t = ["https://tqlm.res.netease.com/pc/gw/20170905171717/data/swf/role1.swf", "https://tqlm.res.netease.com/pc/gw/20170905171717/data/swf/role2.swf", "https://tqlm.res.netease.com/pc/gw/20170905171717/data/swf/role3.swf", "https://tqlm.res.netease.com/pc/gw/20170905171717/data/swf/role4.swf", "https://tqlm.res.netease.com/pc/gw/20170905171717/data/swf/role5.swf", "https://tqlm.res.netease.com/pc/gw/20170905171717/data/swf/role6.swf"], a = 1; 6 >= a; a++)
            e($(".roles_wrap .role" + a + " .role_pic"), t[a - 1])
    }, whichTransitionEvent = function() {
        var e, t = document.createElement("fakeelement"), a = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (e in a)
            if (void 0 !== t.style[e])
                return a[e]
    }, log = function(e) {
        window.console && console.log(e)
    }, initSvgTemp = function() {
        var under1 = [function(_template_object) {
            var _template_fun_array = []
              , fn = function(__data__) {
                var _template_varName = "";
                for (var name in __data__)
                    _template_varName += "var " + name + '=__data__["' + name + '"];';
                eval(_template_varName),
                _template_fun_array.push('<svg id="dynamic-line" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1920 1100" style="enable-background:new 0 0 1920 1100;" xml:space="preserve">    <g class="layer1">        <path class="st0 line0" d="M247.1,27.4h138.3l264.8,264.8"></path>        <path class="st0 line1" d="M240.3,99.3H375l60.9,60.9"></path>        <path class="st0 line2" d="M1064.4,250.7h105l32.6,32.6"></path>        <path class="st0 line3" d="M1785.7,161l-112,112H1619"></path>        <path class="st0 line4" d="M1478.4,919.1l190.4-190.4h92.7"></path>        <path class="st0 line5" d="M389.1,772.3l-75.2-75.2v-124l-58.5-58.5"></path>        <path class="st0 line6" d="M46.1,968.8L0,922.6"></path>        <circle class="st1 circle0" cx="247.1" cy="27.4" r="1.8"></circle>        <circle class="st1 circle2" cx="1064.4" cy="250.7" r="1.8"></circle>        <circle class="st1 circle1" cx="240.3" cy="99.3" r="1.8"></circle>        <circle class="st1 circle3" cx="255.4" cy="514.6" r="1.8"></circle>    </g>    <g class="layer2">        <path class="st2 line0" d="M214.6,272.6h-54.2L48.1,160.2"></path>        <path class="st2 line1" d="M1183.5,754l33.1-33.1h103.9"></path>        <path class="st2 line2" d="M337.8,938H370l30.5,30.5"></path>        <path class="st2 line3" d="M0,658.4l82.9,82.9"></path>        <path class="st2 line4" d="M1833.7,90.8l85.1-85.1"></path>        <path class="st2 line5" d="M1608.1,362.4h-104.8l-32.6,32.6h-160.3"></path>        <path class="st2 line6" d="M706.3,378.7l113.2,113.2"></path>        <path class="st2 line7" d="M1717.8,699.8h28.4"></path>        <circle class="st3 circle4" cx="1320.5" cy="720.8" r="1.8"></circle>        <circle class="st3 circle5" cx="1608.1" cy="362.4" r="1.8"></circle>    </g>    <g class="layer3">        <path class="st4 line0" d="M856.6,315.8l-74.3-74.3V122.9L722,62.5"></path>        <path class="st4 line1" d="M865.9,524h-53.4l-23.3-23.3"></path>        <path class="st4 line2" d="M1521,970.2l32-32h55.5"></path>        <path class="st4 line3" d="M1795.3,785.3l123.8-123.8"></path>        <path class="st4 line4" d="M1546.5,536.5L1737,346"></path>        <path class="st4 line5" d="M1267.8,305.3l270.3-270.3h128.7"></path>        <path class="st4 line6" d="M329.8,358.6H187.2l-33.8-33.8H48.1"></path>        <path class="st4 line7" d="M600.3,720.8h106l33.4,33.4"></path>        <circle class="st5 circle6" cx="722" cy="62.5" r="1.8"></circle>        <circle class="st5 circle7" cx="789.3" cy="500.8" r="1.8"></circle>        <circle class="st5 circle8" cx="1737" cy="346" r="1.8"></circle>        <circle class="st5 circle9" cx="48.1" cy="324.8" r="1.8"></circle>        <circle class="st5 circle10" cx="600.3" cy="720.8" r="1.8"></circle>        <circle class="st5 circle11" cx="1666.9" cy="34.9" r="1.8"></circle>    </g>    <g class="layer4">        <path class="st6 line0" d="M1875.6,970.2l44-44"></path>        <path class="st6 line1" d="M874.8,60.7l97.7,97.7"></path>        <path class="st6 line2" d="M918.7,0l32.5,32.5"></path>        <path class="st6 line3" d="M86.7,90.6L0,3.8"></path>        <path class="st6 line4" d="M161.2,808.8h103.2l32.2,32.2"></path>        <path class="st6 line5" d="M278.6,397.6l217.5,217.5v62.1"></path>        <path class="st6 line6" d="M1337.6,343.7h-104.8l-66.3-66.3h-31.1"></path>        <path class="st6 line7" d="M1129.8,483.8l-23.4,23.4h-55.2"></path>        <path class="st6 line8" d="M1594.4,546.2l-59.6,59.6v123.7l-75.1,75.1"></path>        <path class="st6 line9" d="M1838.6,337.7l36.6-36.6h44.8"></path>        <path class="st6 line10" d="M890.3,905.7H784.9l-63.7-63.7"></path>        <path class="st6 line11" d="M1183.5,912.5l65.1-65.1h24.1"></path>        <path class="st6 line12" d="M1641.7,901.3l97.5-97.5"></path>        <circle class="st7 circle12" cx="874.8" cy="60.7" r="1.8"></circle>        <circle class="st7 circle13" cx="161.2" cy="808.8" r="1.8"></circle>        <circle class="st7 circle14" cx="278.6" cy="397.6" r="1.8"></circle>        <circle class="st7 circle15" cx="1129.8" cy="483.8" r="1.8"></circle>        <circle class="st7 circle16" cx="1594.4" cy="546.2" r="1.8"></circle>        <circle class="st7 circle17" cx="1739.2" cy="803.9" r="1.8"></circle>    </g></svg>'),
                _template_varName = null
            }(_template_object);
            return fn = null,
            _template_fun_array.join("")
        }
        ][0]
          , svg1 = under1()
          , under2 = [function(_template_object) {
            var _template_fun_array = []
              , fn = function(__data__) {
                var _template_varName = "";
                for (var name in __data__)
                    _template_varName += "var " + name + '=__data__["' + name + '"];';
                eval(_template_varName),
                _template_fun_array.push('<div class="pop-svgLine-l fl">    <svg id="svgLine-l-dynamic" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 960 1100" style="enable-background:new 0 0 960 1100;" xml:space="preserve">        <g class="layer1">            <path class="st0 line0" d="M0.5,10.5h101l188,188"></path>            <path class="st0 line1" d="M135,427l-76.5-76.5v-122l-58-58"></path>            <path class="st0 line2" d="M396.5,747.5l52-52v-108l76-76h136"></path>            <path class="st0 line3" d="M355.5,955.5l189-189h105"></path>            <path class="st0 line4" d="M0,1072h10l17.5-17.5V956l219.8-219.8"></path>            <path class="st0 line5" d="M324.5,322.5h104L461,355"></path>            <path class="st0 line6" d="M613.5,450H510l-65.5-65.5"></path>            <circle id="circle0" class="st1" cx="660.5" cy="511.5" r="1.8"></circle>            <circle id="circle1" class="st1" cx="649.5" cy="766.5" r="1.8"></circle>            <circle id="circle2" class="st1" cx="247.5" cy="736.5" r="1.8"></circle>            <circle id="circle3" class="st1" cx="324.5" cy="322.5" r="1.8"></circle>            <circle id="circle4" class="st1" cx="613.5" cy="450" r="1.8"></circle>        </g>        <g class="layer2">            <path class="st0 line0" d="M474.5,722.9v18.8L324.7,891.5"></path>            <path class="st0 line1" d="M268.3,857.9l-58.5,58.5V1039l-61,61"></path>            <path class="st0 line2" d="M491.2,924.6l-96.3,96.3"></path>            <path class="st0 line3" d="M726.1,462L694,494.1H575.9"></path>            <path class="st0 line4" d="M465.2,296.2L314,144.9v-18.1"></path>            <path class="st0 line5" d="M22.7,51.5l213.2,213.2"></path>            <circle id="circle5" class="st1" cx="474.5" cy="722.9" r="1.8"></circle>            <circle id="circle6" class="st1" cx="268.3" cy="857.9" r="1.8"></circle>            <circle id="circle7" class="st1" cx="491.2" cy="924.6" r="1.8"></circle>            <circle id="circle8" class="st1" cx="726.1" cy="462" r="1.8"></circle>            <circle id="circle9" class="st1" cx="314" cy="126.8" r="1.8"></circle>            <circle id="circle10" class="st1" cx="22.7" cy="51.5" r="1.8"></circle>        </g>    </svg></div><div class="pop-svgLine-r fr">    <svg id="svgLine-r-dynamic" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 960 1100" style="enable-background:new 0 0 960 1100;" xml:space="preserve">        <g class="layer1">            <path class="st0 line0" d="M571.2,319.3l-33.6,33.6H434.2"></path>            <path class="st0 line1" d="M650.3,515.2H490.4l-32.8-32.8H349.7"></path>            <path class="st0 line2" d="M960,953.2h-89.4l-66.4-66.4H616.7l-18.1-18.1v-95.6L380.8,555.3"></path>            <path class="st0 line3" d="M837.4,849.7L686.9,699.2v-19"></path>            <path class="st0 line4" d="M632.7,258.8v-36.4L850.4,4.7"></path>            <circle id="circle11" class="st1" cx="434.2" cy="352.9" r="1.8"></circle>            <circle id="circle12" class="st1" cx="349.7" cy="482.4" r="1.8"></circle>            <circle id="circle13" class="st1" cx="380.8" cy="555.3" r="1.8"></circle>            <circle id="circle14" class="st1" cx="850.4" cy="4.7" r="1.8"></circle>        </g>        <g class="layer2">            <path class="st0 line0" d="M462.8,374.6h-67.6L329,440.8H227.3"></path>            <path class="st0 line1" d="M841.6,159.9l-58.8,58.8v123.6l-72.4,72.4"></path>            <path class="st0 line2" d="M741.9,65.8l-95.8,95.8"></path>            <path class="st0 line3" d="M351.5,515.2H457l189.6,189.6"></path>            <path class="st0 line4" d="M572,931.5l-73.1-73.1V739l-60.7-60.7"></path>            <path class="st0 line5" d="M695.3,933.2h103l31.1,31.1"></path>            <circle id="circle15" class="st1" cx="841.6" cy="159.9" r="1.8"></circle>            <circle id="circle16" class="st1" cx="741.9" cy="65.8" r="1.8"></circle>            <circle id="circle17" class="st1" cx="351.5" cy="515.2" r="1.8"></circle>            <circle id="circle18" class="st1" cx="438.2" cy="678.8" r="1.8"></circle>            <circle id="circle19" class="st1" cx="695.3" cy="933.2" r="1.8"></circle>        </g>    </svg></div>'),
                _template_varName = null
            }(_template_object);
            return fn = null,
            _template_fun_array.join("")
        }
        ][0]
          , svg2 = under2();
        $("#svg1").html(svg1),
        $("#svg2").html(svg2)
    }, initAvgLineAni = function() {
        function e(e) {
            for (var a = e.options, s = 0; s < e.layersLen; s++)
                !function(s) {
                    setTimeout(function() {
                        e.pathArr[s] = new Array;
                        for (var o = 0; o < e.len[s]; o++) {
                            var n = document.querySelector(a.Id + " .layer" + (s + 1) + " .line" + o)
                              , i = Math.ceil(n.getTotalLength())
                              , r = 1
                              , c = 0
                              , l = Math.random().toFixed(1)
                              , p = "cubic-bezier(0.500, 0.180, 0.415, 0.915)";
                            $(n).data("s", i),
                            $(n).data("timing1", r),
                            $(n).data("timing2", c),
                            $(n).data("scale", l),
                            $(n).data("cbr", p),
                            e.pathArr[s].push(n)
                        }
                        a.autoPlay && t(e, s)
                    }, e.delay[s])
                }(s)
        }
        function t(e, t) {
            var a = e.options
              , s = whichTransitionEvent()
              , o = "layer" + (t + 1) + " show";
            document.querySelector(a.Id + " .layer" + (t + 1)).setAttribute("class", o);
            for (var n = 0; n < e.len[t]; n++) {
                var i = $(e.pathArr[t][n]).data("s")
                  , r = $(e.pathArr[t][n]).data("timing1")
                  , c = 0
                  , l = ($(e.pathArr[t][n]).data("scale"),
                $(e.pathArr[t][n]).data("cbr"));
                e.pathArr[t][n].style.WebkitTransition = e.pathArr[t][n].style.transition = "none",
                e.pathArr[t][n].style.strokeDasharray = i + "px " + i + "px",
                e.pathArr[t][n].style.strokeDashoffset = i,
                e.pathArr[t][n].getBoundingClientRect(),
                e.pathArr[t][n].style.WebkitTransition = e.pathArr[t][n].style.transition = "stroke-dashoffset " + r + "s " + c + "s " + l,
                e.pathArr[t][n].style.strokeDashoffset = 0,
                $(e.pathArr[t][n]).on(s, function() {
                    e.isFirst[t] && (e.isFirst[t] = !1)
                })
            }
        }
        function a(e) {
            for (var t = e.options, a = whichTransitionEvent(), s = 0; s < e.layersLen; s++) {
                for (var o = 0; o < e.len[s]; o++)
                    $(e.pathArr[s][o]).off(a),
                    $(e.pathArr[s][o])[0].style.WebkitTransition = $(e.pathArr[s][o])[0].transition = "none";
                var n = "layer" + (s + 1);
                document.querySelector(t.Id + " .layer" + (s + 1)).setAttribute("class", n)
            }
        }
        var s = function(t) {
            this.options = $.extend({
                Id: "",
                autoPlay: !1
            }, t),
            this.layers = $(this.options.Id).find("g"),
            this.layersLen = this.layers.length,
            this.len = [],
            this.isFirst = [],
            this.pathArr = [],
            this.delay = [];
            for (var a = 500, s = 0; s < this.layersLen; s++) {
                var o = this.layers.eq(s).find("path").length;
                this.len[s] = o,
                this.isFirst[s] = !0,
                this.delay[s] = a,
                a += 500
            }
            e(this)
        };
        return s.prototype = {
            play: function(e) {
                {
                    var a = this;
                    a.options
                }
                t(a, e)
            },
            stop: function() {
                {
                    var e = this;
                    e.options
                }
                a(e)
            }
        },
        {
            create: function(e) {
                var t = new s(e);
                return t
            }
        }
    }(), replayVideo = function() {
        var e = $(".open-videoBox");
        e.css("zIndex", 102),
        TweenMax.to(e, 1, {
            height: "100%",
            ease: Quint.easeOut,
            onComplete: function() {
                document.getElementById("v-open").play()
            }
        })
    }, openVideoAutoSize = function() {
        var e = 1920 / 948
          , t = $(window).width()
          , a = $(window).height()
          , s = t / a
          , o = $(".open-videoBox video");
        o.css(s > e ? {
            width: t,
            height: t / e,
            margin: -.5 * (t / e) + "px 0 0 " + -.5 * t + "px"
        } : {
            height: a,
            width: a * e,
            margin: -.5 * a + "px 0 0 " + -.5 * a * e + "px"
        })
    }, setShare = function() {
        {
            var e = nie.require("nie.util.shareV5")
              , t = ($("#share_url").html(),
            $("#share_pic").attr("data-src"))
              , a = $("#share_desc").html()
              , s = $("#share_title").html();
            e({
                fat: "#NIE-share",
                type: 6,
                defShow: [23, 22, 2, 1, 4],
                title: s,
                img: t,
                content: a
            })
        }
        $(".share-weibo").on("click", function() {
            $(".NIE-share-btn2").trigger("click")
        }),
        $(".share-qZone").on("click", function() {
            $(".NIE-share-btn1").trigger("click")
        }),
        $(".share-wechat").on("click", function() {
            $(".NIE-share-btn23").trigger("click")
        }),
        $(".share-yixin").on("click", function() {
            $(".NIE-share-btn22").trigger("click")
        })
    }, adFun = function() {
        var e = "tianqilianmeng(g52)-lunhuan-406773";
        ADBase.config({
            pos: e,
            callback: function(t, a) {
                if (0 == t)
                    return !1;
                for (var s = a[e], o = "", n = 0; n < s.length; n++) {
                    var i = s[n];
                    o += '<div class="swiper-slide"><a href="' + i.url + '" target="_blank" title="' + i.title + '"><div class="txt-box">' + i.title + '</div><img src="' + i.src + '" alt="\u5e7f\u544a\u56fe\u7247"></a></div>'
                }
                $(".sec1-news-nav .swiper-wrapper").html(o),
                initOuterSwiper()
            }
        })
    }, imgPreLoad = function() {
        function e() {
            var e = 100;
            r.html(e + "%"),
            setTimeout(function() {
                TweenMax.to(i, 1, {
                    height: 0,
                    display: "none",
                    ease: Quint.easeInOut,
                    onComplete: function() {
                        d ? (setEff = !0,
                        t()) : n.play()
                    }
                })
            }, 500)
        }
        function t() {
            var e = $(".open-videoBox")
              , t = d ? 0 : 300;
            TweenMax.to(e, d ? 0 : 1, {
                height: 0,
                ease: Quint.easeInOut,
                onComplete: function() {
                    n.currentTime = 0,
                    c.removeClass("fadeOut"),
                    e.css("zIndex", -1),
                    setTimeout(function() {
                        $(".sec1-r-cont,.page-nav,.cont-slogan,.next-arrow").addClass("show"),
                        $(".slogan_index .i-index1").addClass("cur")
                    }, 300)
                }
            }),
            setTimeout(function() {
                $(".cont-media .sec1 video")[0].play()
            }, t),
            setTimeout(function() {
                $(".aggregation-wrap").addClass("show")
            }, 1e3),
            m ? (m = !1,
            outerSvgLine = initAvgLineAni.create({
                Id: "#dynamic-line",
                autoPlay: !0
            }),
            addEvent()) : isIE || (effObj.windowOnFocus(),
            $window.trigger("focus"))
        }
        var a = ["https://tqlm.res.netease.com/pc/gw/20170905171717/img/QRCodeBtn_1d79767.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/act_title_bf2a117.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/act_title_line_282d2d4.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/bg_blue_9b86f51.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/close_36ff03d.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/giftBox_bottom_8857044.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/icon_progress_cur_766de01.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/icon_progress_nor_09b52cd.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/icon_reach_01cb16d.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_1_8d05f6b.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_1_dis_53c56bc.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_2_1e2df51.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_2_dis_084f484.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_3_284cfd4.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_3_dis_c2bd31e.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_4_5d7e88d.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_4_dis_5f35b63.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_5_09d33bd.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/prize_5_dis_f0e3f7b.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/progress_bg_5486078.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/progress_head_f87269c.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/qrCode_7c763a6.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/qrCode_line_905590f.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/activity/show_93a7f08.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/bg-black-25_a7ddff4.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/bg-black-50_33c866b.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/bg-black-70_f360b79.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/bg-black-80_6d86a22.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/btn-closeCode_5e4fc2e.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/comingsoon1_9c82061.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/comingsoon2_f4f9c38.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/downloadBtn-android_c145194.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/downloadBtn-ios-black_341d879.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/downloadBtn-ios_eb16ef9.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-arrow-right_654ba24.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-mode-arrow-next-hover_1622ad8.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-mode-arrow-next_dcc45bb.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-mode-arrow-prev-hover_d0afc6c.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-mode-arrow-prev_01e5051.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-mode-location_2fd7937.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-news-x_86b3798.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-news-x2_f11843f.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-recruit_7a552de.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-role-x_3b5f014.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-rt-bg_a315988.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-sec1-arrow_23ede75.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-share-qZone-hover_03e5c80.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-share-qZone_5078b7d.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-share-wechat-hover_cb5ddb0.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-share-wechat_6620715.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-share-weibo-hover_5f1448c.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-share-weibo_a574bf8.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-share-yixin-hover_746dd8d.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-share-yixin_c05174e.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-story-x_c164f9f.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-x-2_b564603.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon-x_8a37d8f.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_2abff52.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_TQLM_d7b60a4.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_closetTips_955683a.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_closetTips_hover_c63f10f.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_index_61782d4.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_newsList_c52bffc.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_rtBtn_bg_6e4664b.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_rtBtn_code_251f970.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_rtBtn_code_hover_de3b4eb.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_rtBtn_news_3271907.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_rtBtn_news_hover_0157da7.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_rtBtn_share_e1fa6e9.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_rtBtn_share_hover_a58e328.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_rtBtn_video_e514121.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_rtBtn_video_hover_d28fb7e.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_sec2_arrow1_3c30257.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_sec2_arrow1_hover_b5f0080.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_sec2_arrow2_26acfbb.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_sec2_arrow2_hover_c0cb125.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_sec3_x_980627e.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/icon_skip_arrow_3cbdf14.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/inside-pages/article_d90fb7d.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/inside-pages/inside-bar_Bg_3d60ad5.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/inside-pages/list-dot_5338e80.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/inside-pages/logo-inside_16a5597.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/inside-pages/sidebar-inside_bg_e192811.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/leftSide_qq_665d6ef.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/leftSide_qq_hover_7f2f4a7.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/leftSide_tb_c8078ce.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/leftSide_tb_hover_98b0c3b.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/leftSide_wb_dba49be.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/leftSide_wb_hover_9a59907.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/logo_desc_1edcd1d.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/news-title-arrow-l_b5a7bcc.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/news-title-arrow-r_42ee108.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsBar_closeBtn_4f3abe8.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_1_5eebe76.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_1_w_730e03f.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_1_w_94c9fbc.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_2_0e2b2af.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_2_w_f9e6901.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_2_w_f9e6901.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_3_893b573.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_3_w_45ba921.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_3_w_45ba921.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/newsList_banner_4_a671aaa.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/news_top_banner_f9af6cd.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/next-arrow-bg_249c95d.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/next-arrow1_080ecdd.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/next-arrow2_4f8136e.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/order-btn-inside_5a049f2.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/order-btn_c97c629.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/pop-close_fa07bac.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/pop-qrCode_1a3975a.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/pve-pop-bg_e2d7dec.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/qqCode_97bfe38.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/qrcode_7de23e1.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/avatar/a1_c_fb8ae46.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/avatar/a2_c_0b76009.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/avatar/a3_c_8d01b7e.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/avatar/a4_c_5cee19e.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/avatar/a5_c_51e1dae.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/avatar/a6_c_f19127b.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/icon-role-arrow_cc5dffa.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/icon-role-x_3b5f014.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role-index_64a6d8b.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role1_5a0b390.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role1_b29e64d.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role2_2da43d9.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role2_84ee32e.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role3_0a58a78.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role3_52b9822.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role4_7eaff50.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role4_1235363.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role5_b1abd4e.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role5_e5fcd92.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role6_e3dec88.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/roles/role6_43bd868.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/rt-orderBtn-hover_74352fc.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/rt-orderBtn-normal_c682a8a.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/sec1-news-img_4b8a0e2.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/sec1_slogan_9ef7c55.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/sec2_slogan_4af1452.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/sec3_baseBg_e151108.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/sec3_rolesDetail_btn_2c346cc.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/sec3_slogan_34ecd9b.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/sec4_slogan_e77be01.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/sec5_slogan_7342582.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/sec6_slogan_0d28169.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/share_e867edb.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/skill_detail_6705ad7.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/skill_detail_hover_9817eaf.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/skill_detail_w_0725caf.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/tbCode_4887d2c.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/ticked_44ba85a.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/tips_bg_f64c00d.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/war/line_45deg_1c701d9.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/war/war_duoqi_8cd2324.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/war/war_husong_349a7a9.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/war/war_shengcun_64fa897.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/war/war_ziyuan_e6a8116.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/wbCode_f575cce.jpg", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/weaponBtn-bg-hover_bd2b0e2.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/weaponBtn-bg_ea987ca.png", "https://tqlm.res.netease.com/pc/gw/20170905171717/img/wxCode_01ff14c.jpg"]
          , s = 0
          , o = a.length
          , n = document.getElementById("v-open")
          , i = $(".loading")
          , r = i.find("p")
          , c = $(".skipBtn")
          , l = null
          , p = 0
          , m = !0
          , d = !!comm.getUrlParam("f") && "fab" == comm.getUrlParam("f");
        d && $(".open-videoBox").hide(),
        $.imgpreload(a, {
            each: function() {
                ++s;
                var e = parseInt(s / o * 98);
                e >= 10 && 20 > e ? (document.querySelectorAll(".state1")[0].setAttribute("class", "state1 show"),
                document.querySelectorAll(".state1")[1].setAttribute("class", "state1 show")) : e >= 20 && 40 > e ? (document.querySelectorAll(".state2")[0].setAttribute("class", "state2 show"),
                document.querySelectorAll(".state2")[1].setAttribute("class", "state2 show")) : e >= 40 && 60 > e ? (document.querySelectorAll(".state3")[0].setAttribute("class", "state3 show"),
                document.querySelectorAll(".state3")[1].setAttribute("class", "state3 show")) : e >= 60 && 80 > e ? (document.querySelectorAll(".state4")[0].setAttribute("class", "state4 show"),
                document.querySelectorAll(".state4")[1].setAttribute("class", "state4 show")) : e >= 80 && document.querySelectorAll(".state5")[0].setAttribute("class", "state5 show"),
                r.html(e + "%")
            },
            all: function() {
                $(".main").show(),
                l = setInterval(function() {
                    p++,
                    p >= 5 && (clearInterval(l),
                    e())
                }, 500),
                bgAni = pixiAni.create(),
                initPopSwiper(),
                bindNavEvent(),
                detailEvent(),
                changeEffect(),
                innerRoleNavEvent(),
                outerRoleNavEvent(),
                initRoleFlash(),
                adFun(),
                initSvgTemp(),
                orderFun(),
                aggOrderFun(),
                recruitFun(),
                setDownload(),
                setShare(),
                popSvgLine_l = initAvgLineAni.create({
                    Id: "#svgLine-l-dynamic",
                    autoPlay: !0
                }),
                popSvgLine_r = initAvgLineAni.create({
                    Id: "#svgLine-r-dynamic",
                    autoPlay: !0
                }),
                setTimeout(function() {
                    popSvgLine_l.stop(),
                    popSvgLine_r.stop()
                }, 3e3)
            }
        }),
        n.addEventListener("ended", function() {
            setEff = !0,
            n.pause(),
            c.addClass("fadeOut"),
            t()
        }),
        c.on("click", function() {
            setEff = !0,
            n.pause(),
            c.addClass("fadeOut"),
            t()
        })
    }, checkIE = function() {
        isIE = window.ActiveXObject || "ActiveXObject"in window ? !0 : !1
    }, checkBrowser = function() {
        var e, t = {}, a = navigator.userAgent.toLowerCase();
        return (e = a.match(/rv:([\d.]+)\) like gecko/)) ? t.ie = e[1] : (e = a.match(/msie ([\d.]+)/)) ? t.ie = e[1] : (e = a.match(/firefox\/([\d.]+)/)) ? t.firefox = e[1] : (e = a.match(/chrome\/([\d.]+)/)) ? t.chrome = e[1] : (e = a.match(/opera.([\d.]+)/)) ? t.opera = e[1] : (e = a.match(/version\/([\d.]+).*safari/)) ? t.safari = e[1] : 0,
        parseInt(t.firefox) < 40 || parseInt(t.chrome) < 40 || parseInt(t.ie) < 10 ? ($(".browser-tips").show(),
        !1) : void 0
    }, init = function() {
        var loadingTmp = [function(_template_object) {
            var _template_fun_array = []
              , fn = function(__data__) {
                var _template_varName = "";
                for (var name in __data__)
                    _template_varName += "var " + name + '=__data__["' + name + '"];';
                eval(_template_varName),
                _template_fun_array.push('                <div class="loading-svg-box">                    <p>0%</p>                    <div class="top">                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 246 900" style="enable-background:new 0 0 246 900;" xml:space="preserve">                            <path class="state2" id="l-362" d="M115.4,334v-98.5L48.9,169V0"/>                            <path class="state4" id="l-148" d="M70.9,205l-32-32V71"/>                            <path class="state3" id="l-153" d="M138.8,395.7V290.9l33.8-33.8"/>                            <path class="state1" id="l-408" d="M207.8,0l-17.4,17.4v185l-66,66v104.1"/>                        </svg>                        <svg class="floor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 246 900" style="enable-background:new 0 0 246 900;" xml:space="preserve">                            <path class="show" d="M115.4,334v-98.5L48.9,169V0"/>                            <path class="show" d="M70.9,205l-32-32V71"/>                            <path class="show" d="M138.8,395.7V290.9l33.8-33.8"/>                            <path class="show" d="M207.8,0l-17.4,17.4v185l-66,66v104.1"/>                        </svg>                    </div>                    <div class="bottom">                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 246 900" style="enable-background:new 0 0 246 900;" xml:space="preserve">                            <path class="state4" id="l-314" d="M134.8,613.4v102.4l65.8,65.8V900"/>                            <path class="state2" id="l-404" d="M27.2,899.2l16.8-16.8V696l65.4-65.4V529.7"/>                            <path class="state5" id="l-154" d="M59.9,877V771.5l32.9-32.9"/>                            <path class="state1" id="l-419" d="M174.4,898.3l-52.2-52.2V501.9"/>                            <path class="state3" id="l-152" d="M177,742.8l33.3,33.3v104.4"/>                        </svg>                        <svg class="floor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 246 900" style="enable-background:new 0 0 246 900;" xml:space="preserve">                            <path class="show" d="M134.8,613.4v102.4l65.8,65.8V900"/>                            <path class="show" d="M27.2,899.2l16.8-16.8V696l65.4-65.4V529.7"/>                            <path class="show" d="M59.9,877V771.5l32.9-32.9"/>                            <path class="show" d="M174.4,898.3l-52.2-52.2V501.9"/>                            <path class="show" d="M177,742.8l33.3,33.3v104.4"/>                        </svg>                    </div>                </div>'),
                _template_varName = null
            }(_template_object);
            return fn = null,
            _template_fun_array.join("")
        }
        ][0]
          , loadingHtml = loadingTmp();
        $(".loading").html(loadingHtml),
        $(".loading,.loading-svg-box").height(wH),
        checkBrowser() || (checkIE(),
        openVideoAutoSize(),
        imgPreLoad())
    };
    return init(),
    {
        popVideo: popVideo,
        popClose: popClose
    }
});
;!function t(e, n, i) {
    function a(o, s) {
        if (!n[o]) {
            if (!e[o]) {
                var h = "function" == typeof require && require;
                if (!s && h)
                    return h(o, !0);
                if (r)
                    return r(o, !0);
                var c = new Error("Cannot find module '" + o + "'");
                throw c.code = "MODULE_NOT_FOUND",
                c
            }
            var u = n[o] = {
                exports: {}
            };
            e[o][0].call(u.exports, function(t) {
                var n = e[o][1][t];
                return a(n ? n : t)
            }, u, u.exports, t, e, n, i)
        }
        return n[o].exports
    }
    for (var r = "function" == typeof require && require, o = 0; o < i.length; o++)
        a(i[o]);
    return a
}({
    1: [function(t) {
        "use strict";
        function e(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function n(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var a = function v(t, e, n) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, e);
            if (void 0 === i) {
                var a = Object.getPrototypeOf(t);
                return null === a ? void 0 : v(a, e, n)
            }
            if ("value"in i)
                return i.value;
            var r = i.get;
            return void 0 === r ? void 0 : r.call(n)
        }
          , r = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , o = t("../lib/distortion/svg-distortion.js")
          , s = t("../lib/distortion/image-distortion.js")
          , h = t("../lib/distortion/video-distortion.js")
          , c = t("../lib/audio-visualization/audio-visualization.js")
          , u = t("../lib/render-engine/render-engine.js")
          , d = (function(t) {
            function o(t) {
                i(this, o);
                var n = e(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, t));
                return n.padding = 100,
                n
            }
            return n(o, t),
            r(o, [{
                key: "update",
                value: function() {
                    a(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "update", this).call(this),
                    this.frame > 0 && !(this.frame % 2) ? (this.frame > 24 ? (this.generateRandomChunks(.2),
                    this.transformChunksRandom(.75, [0, 0], [1.25, 1]),
                    this.addRandomTranslate(8),
                    this.addRandomFragment([.1, .01], 3),
                    this.addRandomRGBSplit(0, 5)) : (this.generateLines(1),
                    this.generateWaves(.8),
                    this.addRandomTranslate(2),
                    this.addWaves(2),
                    this.addRandomFragment([.05, .005])),
                    this.changed = !0) : 0 === this.frame && this.reset()
                }
            }, {
                key: "audioOnPeak",
                value: function(t, e) {
                    var n = this
                      , i = {
                        shakes: function() {
                            n.frame = 35
                        }
                    };
                    i[t] && i[t](e)
                }
            }]),
            o
        }(o),
        function(t) {
            function o(t) {
                i(this, o);
                var n = e(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, t));
                return n.padding = 50,
                n
            }
            return n(o, t),
            r(o, [{
                key: "update",
                value: function() {
                    a(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "update", this).call(this),
                    this.frame > 0 && !(this.frame % 2) ? (this.frame > 24 ? (this.generateRandomChunks(.05),
                    this.transformChunksRandom(.25, [25, 10], [1.5, 1]),
                    this.addRandomFragment([.1, .025]),
                    Math.random() > .5 ? this.addRandomBlur(0, 7.5) : this.addRandomRGBSplit(0, 7.5),
                    this.addRandomTranslate(10)) : (this.generateLines(1),
                    24 == this.frame && Math.random() > .75 && this.generateInterference(35),
                    this.generateWaves(.8),
                    this.addWaves(this.frame / 2),
                    this.addInterference(6 * this.frame),
                    this.frame && this.moveInterference(1),
                    this.addRandomFragment([.05, .005], 2),
                    Math.random() > .5 ? this.addRandomBlur(0, 7.5) : this.addRandomRGBSplit(0, 7.5),
                    this.addRandomTranslate(2.5)),
                    this.changed = !0) : 0 === this.frame && this.reset()
                }
            }, {
                key: "audioOnPeak",
                value: function(t, e) {
                    var n = this
                      , i = {
                        bass: function() {
                            n.frame = 22
                        }
                    };
                    i[t] && i[t](e)
                }
            }]),
            o
        }(s))
          , l = function(t) {
            function o(t) {
                i(this, o);
                var n = e(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, t));
                return n.padding = 20,
                n
            }
            return n(o, t),
            r(o, [{
                key: "update",
                value: function() {
                    a(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "update", this).call(this),
                    this.frame > 0 && !(this.frame % 2) ? (this.frame > 24 ? (this.generateRandomChunks(.05),
                    this.transformChunksRandom(.25, [25, 10], [1.5, 1]),
                    this.addRandomFragment([.1, .025]),
                    Math.random() > .5 ? this.addRandomBlur(0, 7.5) : this.addRandomRGBSplit(0, 7.5),
                    this.addRandomTranslate(10)) : (this.generateLines(1),
                    24 == this.frame && Math.random() > .75 && this.generateInterference(35),
                    this.generateWaves(.8),
                    this.addWaves(this.frame / 2),
                    this.addInterference(6 * this.frame),
                    this.frame && this.moveInterference(1),
                    this.addRandomFragment([.05, .005], 2),
                    Math.random() > .5 ? this.addRandomBlur(0, 7.5) : this.addRandomRGBSplit(0, 7.5),
                    this.addRandomTranslate(2.5)),
                    this.changed = !0) : 0 === this.frame && this.reset()
                }
            }, {
                key: "audioOnPeak",
                value: function(t, e) {
                    var n = this
                      , i = {
                        bass: function() {
                            n.frame = 12
                        }
                    };
                    i[t] && i[t](e)
                }
            }]),
            o
        }(s)
          , f = function(t) {
            function o() {
                i(this, o);
                var t = e(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this));
                return t.padding = 150,
                t.settings.fragmentColor = "#fff",
                t
            }
            return n(o, t),
            r(o, [{
                key: "update",
                value: function() {
                    a(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "update", this).call(this),
                    this.frame > 0 && !(this.frame % 2) ? (this.frame > 30 ? (this.generateLines(2),
                    this.generateWaves(.9),
                    this.addWaves(this.frame / 3),
                    this.transformChunksRandom(.9, [5, 0], [1, 1]),
                    this.addRandomTranslate(5),
                    this.addRandomBlur(5, 15)) : (this.generateLines(2),
                    30 == this.frame && Math.random() > .25 && this.generateInterference(35),
                    this.generateWaves(.9),
                    this.addWaves(this.frame / 2),
                    this.addInterference(10 * this.frame),
                    this.moveInterference(2),
                    this.addRandomBlur(5, 10)),
                    this.changed = !0) : 0 === this.frame && this.reset()
                }
            }, {
                key: "audioOnPeak",
                value: function(t, e) {
                    var n = this
                      , i = {
                        bass: function() {
                            n.frame = 25
                        }
                    };
                    i[t] && i[t](e)
                }
            }]),
            o
        }(h)
          , m = function() {
            function t() {
                i(this, t),
                this.$window = $(window),
                this.$document = $(document),
                this.$html = $("html"),
                this.$body = $("body"),
                this.$main = $("main"),
                this.eff = $(".eff"),
                this.engine = new u,
                this.audio = new c,
                this.background = {},
                this.background.src = DATA.videos.reel.src,
                this.audio.src = DATA.audio.src,
                this.audio.peaks = DATA.audio.peaks,
                this.audio.volume = 0,
                this.mute = !1,
                this.autoplay = !1,
                this.animation = {
                    globals: [],
                    section: {}
                },
                this.reelOpen = !1,
                this.addEventListener(),
                this.engine.start(),
                this.audio.play(),
                this.audio.seek(6.5),
                this.audio.unmute(1e3),
                this.initialSequence()
            }
            return r(t, [{
                key: "initialSequence",
                value: function() {
                    var t = this;
                    setTimeout(function() {
                        t.engine.animations.push(new d(t.$document.find(".sec1-cont .slogan img"))),
                        t.engine.animations.push(new d(t.$document.find(".sec2-cont .slogan img"))),
                        t.engine.animations.push(new d(t.$document.find(".sec3-cont .slogan img"))),
                        t.engine.animations.push(new d(t.$document.find(".sec4-cont .slogan img"))),
                        t.engine.animations.push(new d(t.$document.find(".sec5-cont .slogan img"))),
                        t.engine.animations.push(new d(t.$document.find(".sec6-cont .slogan img")))
                    }, 300)
                }
            }, {
                key: "removeAudioEff",
                value: function() {
                    var t = this;
                    setTimeout(function() {
                        t.engine.animations = []
                    }, 300)
                }
            }, {
                key: "updateEff",
                value: function(t, e, n) {
                    var i = this
                      , a = {
                        part0: function() {
                            var t = i.$document.find("#story-swiper-container .part0 .slogan-text");
                            return t.find("canvas").remove(),
                            [new l(i.$document.find("#story-swiper-container .part0 .slogan-text img"))]
                        },
                        part1: function() {
                            var t = i.$document.find("#story-swiper-container .part1 .video-box")
                              , e = i.$document.find("#story-swiper-container .part1 .story-title")
                              , n = new f;
                            return n.src = "https://crazynote.v.netease.com/2017/0322/eb0fc22ecacd405e0ade20e9e83fd393.mp4",
                            n.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/sec2_part1_vFb.jpg",
                            t.html(""),
                            e.find("canvas").remove(),
                            n.addCanvas(t),
                            [new l(i.$document.find("#story-swiper-container .part1 .story-title img")), n, 0]
                        },
                        part2: function() {
                            var t = i.$document.find("#story-swiper-container .part2 .video-box")
                              , e = i.$document.find("#story-swiper-container .part2 .story-title")
                              , n = new f;
                            return n.src = "https://crazynote.v.netease.com/2017/0322/5ee464de86ad6f328d9746fbe175abd8.mp4",
                            n.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/sec2_part2_vFb.jpg",
                            t.html(""),
                            e.find("canvas").remove(),
                            n.addCanvas(t),
                            [new l(i.$document.find("#story-swiper-container .part2 .story-title img")), n, 0]
                        },
                        part3: function() {
                            var t = i.$document.find("#story-swiper-container .part3 .video-box")
                              , e = i.$document.find("#story-swiper-container .part3 .story-title")
                              , n = new f;
                            return n.src = "https://crazynote.v.netease.com/2017/0322/242ec96bebffcd02fa11d1ad7845e9fc.mp4",
                            n.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/sec2_part3_vFb.jpg",
                            t.html(""),
                            e.find("canvas").remove(),
                            n.addCanvas(t),
                            [new l(i.$document.find("#story-swiper-container .part3 .story-title img")), n, 0]
                        },
                        part4: function() {
                            var t = i.$document.find("#story-swiper-container .part4 .video-box")
                              , e = i.$document.find("#story-swiper-container .part4 .story-title")
                              , n = new f;
                            return n.src = "https://crazynote.v.netease.com/2017/0322/ecff478555a45bc4f2796cdb2805713f.mp4",
                            n.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/sec2_part4_vFb.jpg",
                            t.html(""),
                            e.find("canvas").remove(),
                            n.addCanvas(t),
                            [new l(i.$document.find("#story-swiper-container .part4 .story-title img")), n, 0]
                        },
                        part5: function() {
                            var t = i.$document.find("#story-swiper-container .part5 .video-box")
                              , e = i.$document.find("#story-swiper-container .part5 .story-title")
                              , n = new f;
                            return n.src = "https://crazynote.v.netease.com/2017/0322/99efdcb43b574d604c54f91525686357.mp4",
                            n.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/sec2_part5_vFb.jpg",
                            t.html(""),
                            e.find("canvas").remove(),
                            n.addCanvas(t),
                            [new l(i.$document.find("#story-swiper-container .part5 .story-title img")), n, 0]
                        }
                    }
                      , r = {
                        mode1: function() {
                            var t = i.$document.find("#mode-swiper-container .mode1 .video-box")
                              , e = i.$document.find("#mode-swiper-container .mode1 .mode-box")
                              , n = new f;
                            return n.src = "https://crazynote.v.netease.com/2017/0322/493079dd64e6db3d38460e0ea9ab7180.mp4",
                            n.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/sec3_part1_vFb.jpg",
                            t.html(""),
                            e.find("canvas").remove(),
                            n.addCanvas(t),
                            [new l(i.$document.find("#mode-swiper-container .mode1 .mode-box img")), n, 0]
                        },
                        mode2: function() {
                            var t = i.$document.find("#mode-swiper-container .mode2 .video-box")
                              , e = i.$document.find("#mode-swiper-container .mode2 .mode-box")
                              , n = new f;
                            return n.src = "https://crazynote.v.netease.com/2017/0322/e0ca9e31bf9b8e7e57dc6ad73f7661f4.mp4",
                            n.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/sec3_part2_vFb.jpg",
                            t.html(""),
                            e.find("canvas").remove(),
                            n.addCanvas(t),
                            [new l(i.$document.find("#mode-swiper-container .mode2 .mode-box img")), n, 0]
                        },
                        mode3: function() {
                            var t = i.$document.find("#mode-swiper-container .mode3 .video-box")
                              , e = i.$document.find("#mode-swiper-container .mode3 .mode-box")
                              , n = new f;
                            return n.src = "https://crazynote.v.netease.com/2017/0322/9ede1334390356bc5e5789ab57121166.mp4",
                            n.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/sec3_part3_vFb.jpg",
                            t.html(""),
                            e.find("canvas").remove(),
                            n.addCanvas(t),
                            [new l(i.$document.find("#mode-swiper-container .mode3 .mode-box img")), n, 0]
                        },
                        mode4: function() {
                            var t = i.$document.find("#mode-swiper-container .mode4 .video-box")
                              , e = i.$document.find("#mode-swiper-container .mode4 .mode-box")
                              , n = new f;
                            return n.src = "https://crazynote.v.netease.com/2017/0322/95d31cc0ae3de9f9b77ef5151681e498.mp4",
                            n.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/sec3_part3_vFb.jpg",
                            t.html(""),
                            e.find("canvas").remove(),
                            n.addCanvas(t),
                            [new l(i.$document.find("#mode-swiper-container .mode4 .mode-box img")), n, 0]
                        }
                    }
                      , o = {
                        jyb: function() {
                            var t = i.$document.find("#recruit-swiper-container .jyb .name");
                            return t.find("canvas").remove(),
                            [new l(i.$document.find("#recruit-swiper-container .jyb .name img"))]
                        },
                        kyb: function() {
                            var t = i.$document.find("#recruit-swiper-container .kyb .name");
                            return t.find("canvas").remove(),
                            [new l(i.$document.find("#recruit-swiper-container .kyb .name img"))]
                        },
                        nwb: function() {
                            var t = i.$document.find("#recruit-swiper-container .nwb .name");
                            return t.find("canvas").remove(),
                            [new l(i.$document.find("#recruit-swiper-container .nwb .name img"))]
                        },
                        sxh: function() {
                            var t = i.$document.find("#recruit-swiper-container .sxh .name");
                            return t.find("canvas").remove(),
                            [new l(i.$document.find("#recruit-swiper-container .sxh .name img"))]
                        },
                        wzb: function() {
                            var t = i.$document.find("#recruit-swiper-container .wzb .name");
                            return t.find("canvas").remove(),
                            [new l(i.$document.find("#recruit-swiper-container .wzb .name img"))]
                        },
                        dbb: function() {
                            var t = i.$document.find("#recruit-swiper-container .dbb .name");
                            return t.find("canvas").remove(),
                            [new l(i.$document.find("#recruit-swiper-container .dbb .name img"))]
                        }
                    };
                    t ? setTimeout(function() {
                        var t = !0
                          , s = !1
                          , h = void 0;
                        try {
                            for (var c, u = i.engine.animations[Symbol.iterator](); !(t = (c = u.next()).done); t = !0) {
                                var d = c.value;
                                d.stop && d.stop()
                            }
                        } catch (m) {
                            s = !0,
                            h = m
                        } finally {
                            try {
                                !t && u.return && u.return()
                            } finally {
                                if (s)
                                    throw h
                            }
                        }
                        if (i.engine.animations = [],
                        2 == e) {
                            for (var v in a)
                                if (v == n) {
                                    var d = a[v]()
                                      , p = d.length;
                                    if (0 == d[p - 1]) {
                                        var g = d[p - 2];
                                        d.pop();
                                        for (var y = 0; y < d.length; y++)
                                            i.engine.animations.push(d[y]);
                                        g.play()
                                    } else
                                        for (var y = 0; y < d.length; y++)
                                            i.engine.animations.push(d[y])
                                }
                        } else if (3 == e)
                            ;
                        else if (4 == e) {
                            for (var v in r)
                                if (v == n) {
                                    var d = r[v]()
                                      , p = d.length;
                                    if (0 == d[p - 1]) {
                                        var g = d[p - 2];
                                        d.pop();
                                        for (var y = 0; y < d.length; y++)
                                            i.engine.animations.push(d[y]);
                                        g.play()
                                    } else
                                        for (var y = 0; y < d.length; y++)
                                            i.engine.animations.push(d[y])
                                }
                        } else if (5 == e) {
                            var w = i.$document.find(".pve-detail .video-box")
                              , b = i.$document.find(".pve-detail .title")
                              , k = new f;
                            k.src = "https://crazynote.v.netease.com/2017/0322/7945295def51004fd1bdd1da895fcc9d.mp4",
                            k.fallback = "https://tqlm.res.netease.com/pc/gw/20170905171717/data/pve_fb.jpg",
                            w.find("canvas").remove(),
                            b.find("canvas").remove(),
                            k.addCanvas(w),
                            i.engine.animations.push(new l(i.$document.find(".pve-detail .title img"))),
                            i.engine.animations.push(k),
                            k.play()
                        } else if (6 == e)
                            for (var v in o)
                                if (v == n) {
                                    var d = o[v]()
                                      , p = d.length;
                                    if (0 == d[p - 1]) {
                                        var g = d[p - 2];
                                        d.pop();
                                        for (var y = 0; y < d.length; y++)
                                            i.engine.animations.push(d[y]);
                                        g.play()
                                    } else
                                        for (var y = 0; y < d.length; y++)
                                            i.engine.animations.push(d[y])
                                }
                    }, 800) : setTimeout(function() {
                        var t = !0
                          , e = !1
                          , n = void 0;
                        try {
                            for (var a, r = i.engine.animations[Symbol.iterator](); !(t = (a = r.next()).done); t = !0) {
                                var o = a.value;
                                o.stop && o.stop()
                            }
                        } catch (s) {
                            e = !0,
                            n = s
                        } finally {
                            try {
                                !t && r.return && r.return()
                            } finally {
                                if (e)
                                    throw n
                            }
                        }
                        i.engine.animations = [],
                        i.$document.find(".sec1-cont .slogan canvas").remove(),
                        i.$document.find(".sec2-cont .slogan canvas").remove(),
                        i.$document.find(".sec3-cont .slogan canvas").remove(),
                        i.$document.find(".sec4-cont .slogan canvas").remove(),
                        i.$document.find(".sec5-cont .slogan canvas").remove(),
                        i.$document.find(".sec6-cont .slogan canvas").remove();
                        var h = [new d(i.$document.find(".sec1-cont .slogan img")), new d(i.$document.find(".sec2-cont .slogan img")), new d(i.$document.find(".sec3-cont .slogan img")), new d(i.$document.find(".sec4-cont .slogan img")), new d(i.$document.find(".sec5-cont .slogan img")), new d(i.$document.find(".sec6-cont .slogan img"))];
                        i.engine.animations = h
                    }, 300)
                }
            }, {
                key: "overflowHidden",
                value: function() {
                    this.scroll.disable(),
                    this.$html.addClass("overflow-hidden")
                }
            }, {
                key: "overflowVisible",
                value: function() {
                    this.scroll.enable(),
                    this.$html.removeClass("overflow-hidden")
                }
            }, {
                key: "updateEnging",
                value: function(t) {
                    var e = !0
                      , n = !1
                      , i = void 0;
                    try {
                        for (var a, r = this.engine.animations[Symbol.iterator](); !(e = (a = r.next()).done); e = !0) {
                            var o = a.value;
                            o.stop && o.stop()
                        }
                    } catch (s) {
                        n = !0,
                        i = s
                    } finally {
                        try {
                            !e && r.return && r.return()
                        } finally {
                            if (n)
                                throw i
                        }
                    }
                    if (this.engine.animations = [],
                    this.animation.section[t]) {
                        var h = !0
                          , c = !1
                          , u = void 0;
                        try {
                            for (var d, l = this.animation.section[t][Symbol.iterator](); !(h = (d = l.next()).done); h = !0) {
                                var f = d.value;
                                this.engine.animations.push(f)
                            }
                        } catch (s) {
                            c = !0,
                            u = s
                        } finally {
                            try {
                                !h && l.return && l.return()
                            } finally {
                                if (c)
                                    throw u
                            }
                        }
                    }
                    DATA.videos[t] ? (this.engine.animations.push(this.background),
                    this.background.src = DATA.videos[t].src,
                    this.background.$canvas.addClass("is-active")) : this.background.$canvas.removeClass("is-active");
                    var m = !0
                      , v = !1
                      , p = void 0;
                    try {
                        for (var g, y = this.engine.animations[Symbol.iterator](); !(m = (g = y.next()).done); m = !0) {
                            var w = g.value;
                            w.play && w.play()
                        }
                    } catch (s) {
                        v = !0,
                        p = s
                    } finally {
                        try {
                            !m && y.return && y.return()
                        } finally {
                            if (v)
                                throw p
                        }
                    }
                }
            }, {
                key: "openReel",
                value: function() {
                    this.audio.mute(750),
                    this.engine.animations = [],
                    this.reelOpen = !0
                }
            }, {
                key: "closeReel",
                value: function() {
                    this.audio.unmute(1e3),
                    this.updateEnging(this.scroll.activeSection),
                    this.reelOpen = !1
                }
            }, {
                key: "windowOnResize",
                value: function() {}
            }, {
                key: "windowOnFocus",
                value: function() {
                    this.mute || this.audio.unmute(1e3)
                }
            }, {
                key: "windowOnBlur",
                value: function() {
                    this.mute || this.audio.mute()
                }
            }, {
                key: "documentOnTouchstart",
                value: function() {
                    this.$document.trigger("resize")
                }
            }, {
                key: "audioOnAnaylse",
                value: function() {}
            }, {
                key: "audioOnPeak",
                value: function(t) {
                    var e = !0
                      , n = !1
                      , i = void 0;
                    try {
                        for (var a, r = this.engine.animations[Symbol.iterator](); !(e = (a = r.next()).done); e = !0) {
                            var o = a.value;
                            o.audioOnPeak && o.audioOnPeak(t.name, t.value)
                        }
                    } catch (s) {
                        n = !0,
                        i = s
                    } finally {
                        try {
                            !e && r.return && r.return()
                        } finally {
                            if (n)
                                throw i
                        }
                    }
                }
            }, {
                key: "addEventListener",
                value: function() {
                    var t = this;
                    this.$window.on("resize", this.windowOnResize.bind(this)),
                    this.$window.on("focus", this.windowOnFocus.bind(this)),
                    this.$window.on("blur", this.windowOnBlur.bind(this)),
                    this.$document.one("touchstart", this.documentOnTouchstart.bind(this)),
                    this.audio.on("analyse", this.audioOnAnaylse.bind(this)),
                    this.audio.on("peak", this.audioOnPeak.bind(this)),
                    this.audio.audio.addEventListener("playing", function() {
                        t.autoplay = !0
                    })
                }
            }]),
            t
        }();
        $(document).ready(function() {
            var t = null;
            t = setInterval(function() {
                setEff && (clearInterval(t),
                isIE ? $(".disImg").removeClass("disImg") : effObj = new m)
            }, 100)
        })
    }
    , {
        "../lib/audio-visualization/audio-visualization.js": 2,
        "../lib/distortion/image-distortion.js": 4,
        "../lib/distortion/svg-distortion.js": 5,
        "../lib/distortion/video-distortion.js": 6,
        "../lib/render-engine/render-engine.js": 7
    }],
    2: [function(t, e) {
        "use strict";
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , a = function() {
            function t() {
                n(this, t),
                this._src,
                this._volume = 1,
                this._peaks,
                this.audio,
                this.context,
                this.source,
                this.analyser,
                this.data,
                this.gain,
                this.inertval,
                this.volumeInterval,
                this.listener = {},
                this.addCustomEasing()
            }
            return i(t, [{
                key: "addComponents",
                value: function() {
                    this.peak1 = this.context.createBiquadFilter(),
                    this.peak2 = this.context.createBiquadFilter(),
                    this.peak1.frequency.value = 1e3,
                    this.peak1.type = "peaking",
                    this.peak1.gain.value = 24,
                    this.peak1.Q.value = 3,
                    this.peak2.frequency.value = 4200,
                    this.peak2.type = "peaking",
                    this.peak2.gain.value = 24,
                    this.peak2.Q.value = 4.8,
                    this.analyser = this.context.createAnalyser(),
                    this.analyser.fftSize = 1024,
                    this.analyser.minDecibels = -90,
                    this.analyser.mmaxDecibels = -10,
                    this.analyser.smoothingTimeConstant = .85,
                    this.gain = this.context.createGain(),
                    this.gain.gain.value = this.volume && 0 !== this.volume ? this.volume : 1
                }
            }, {
                key: "patchComponents",
                value: function() {
                    this.source = this.context.createMediaElementSource(this.audio),
                    this.source.connect(this.peak1),
                    this.source.connect(this.peak2),
                    this.peak1.connect(this.analyser),
                    this.peak2.connect(this.analyser),
                    this.source.connect(this.gain),
                    this.gain.connect(this.context.destination)
                }
            }, {
                key: "play",
                value: function() {
                    this.audio && this.audio.play(),
                    this.capture()
                }
            }, {
                key: "pause",
                value: function() {
                    this.audio && this.audio.pause(),
                    this.stop()
                }
            }, {
                key: "seek",
                value: function(t) {
                    this.audio.currentTime = t
                }
            }, {
                key: "fadeVolume",
                value: function(t, e) {
                    var n = this
                      , i = 10
                      , a = 0
                      , r = this.volume;
                    this.volumeInterval = setInterval(function() {
                        n.volume = r > t ? r - n.easing.easeInQuad(a, t, r, e) : n.easing.easeInQuad(a, r, t, e),
                        (a += i) > e && clearInterval(n.volumeInterval)
                    }, i)
                }
            }, {
                key: "mute",
                value: function(t) {
                    this.volumeInterval && clearInterval(this.volumeInterval),
                    t ? this.fadeVolume(0, t) : this.volume = 0
                }
            }, {
                key: "unmute",
                value: function(t) {
                    this.volumeInterval && clearInterval(this.volumeInterval),
                    t ? this.fadeVolume(1, t) : this.volume = 1
                }
            }, {
                key: "capture",
                value: function() {
                    var t = this;
                    this.interval = setInterval(function() {
                        t.analyser && (t.analyser.getFloatFrequencyData(t.data),
                        t.analyse(),
                        t.trigger("analyse", {
                            data: t.data
                        }))
                    }, 1e3 / 60)
                }
            }, {
                key: "stop",
                value: function() {
                    clearInterval(this.interval)
                }
            }, {
                key: "analyse",
                value: function() {
                    if (this.data.length) {
                        var t = !0
                          , e = !1
                          , n = void 0;
                        try {
                            for (var i, a = this.peaks[Symbol.iterator](); !(t = (i = a.next()).done); t = !0) {
                                for (var r = i.value, o = 0, s = r.range[0]; s < r.range[1]; ++s)
                                    o += this.data[s] + 140;
                                var h = o / (r.range[1] - r.range[0]);
                                h > r.threshold && this.trigger("peak", {
                                    name: r.name,
                                    value: h - r.threshold
                                })
                            }
                        } catch (c) {
                            e = !0,
                            n = c
                        } finally {
                            try {
                                !t && a.return && a.return()
                            } finally {
                                if (e)
                                    throw n
                            }
                        }
                    }
                }
            }, {
                key: "on",
                value: function(t, e) {
                    this.listener[t] || (this.listener[t] = []),
                    this.listener[t].push(e)
                }
            }, {
                key: "off",
                value: function(t) {
                    delete this.listener[t]
                }
            }, {
                key: "trigger",
                value: function(t, e) {
                    if (this.listener[t]) {
                        var n = !0
                          , i = !1
                          , a = void 0;
                        try {
                            for (var r, o = this.listener[t][Symbol.iterator](); !(n = (r = o.next()).done); n = !0) {
                                var s = r.value;
                                s(e)
                            }
                        } catch (h) {
                            i = !0,
                            a = h
                        } finally {
                            try {
                                !n && o.return && o.return()
                            } finally {
                                if (i)
                                    throw a
                            }
                        }
                    }
                }
            }, {
                key: "addCustomEasing",
                value: function() {
                    this.easing = {
                        easeInQuad: function(t, e, n, i) {
                            return n * (t /= i) * t + e
                        }
                    }
                }
            }, {
                key: "src",
                set: function(t) {
                    var e = this;
                    t != this._src && (this._src = t,
                    this.audio = document.createElement("audio"),
                    this.audio.addEventListener("canplay", function() {
                        try {
                            e.context || (e.context = new AudioContext,
                            e.addComponents(),
                            e.patchComponents(),
                            e.data = new Float32Array(e.analyser.frequencyBinCount))
                        } catch (t) {}
                    }),
                    this.audio.src = t,
                    this.audio.loop = !0)
                },
                get: function() {
                    return this._src
                }
            }, {
                key: "volume",
                set: function(t) {
                    this._volume = t,
                    this.gain && (this.gain.gain.value = t)
                },
                get: function() {
                    return this._volume
                }
            }, {
                key: "peaks",
                set: function(t) {
                    this._peaks = t
                },
                get: function() {
                    return this._peaks
                }
            }]),
            t
        }();
        e.exports = a
    }
    , {}],
    3: [function(t, e) {
        "use strict";
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , a = function c(t, e, i, a) {
            n(this, c),
            this.original = {
                x: t,
                y: e,
                width: i,
                height: a
            },
            this.distorted = {
                x: t,
                y: e,
                width: i,
                height: a
            },
            this.alpha = 1
        }
          , r = function u(t, e) {
            n(this, u),
            this.from = t,
            this.to = e,
            this.direction = Math.random() > .5 ? 1 : -1
        }
          , o = function d(t, e, i) {
            n(this, d),
            this.from = t,
            this.to = e,
            this.intensity = i,
            this.direction = Math.random() > .5 ? 1 : -1
        }
          , s = function l(t, e, i, a) {
            n(this, l),
            this.x = t,
            this.y = e,
            this.width = i,
            this.height = a
        }
          , h = function() {
            function t() {
                n(this, t),
                this._$el,
                this._padding = 0,
                this._overlay = !1,
                this.settings = {
                    fragmentColor: "#000"
                },
                this.easing = {},
                this.$window = $(window);
                var e = this.createCanvas();
                this.canvas = e.canvas,
                this.context = e.context,
                this.split = this.createCanvas(),
                this.$canvas = $(this.canvas),
                this.$canvas.css({
                    position: "absolute"
                }),
                this.image,
                this.dimension = {
                    width: 0,
                    height: 0,
                    outerWidth: 0,
                    outerheight: 0
                },
                this.chunks = [],
                this.layout = [0, 0],
                this.waves = [],
                this.interference = [],
                this.translate = [0, 0],
                this.blur,
                this.RGBSplit,
                this.fragments = [],
                this.loaded = !1,
                this.changed = !1,
                this.frame = 0,
                this.addCustomEasing(),
                this.addEventListener()
            }
            return i(t, [{
                key: "createCanvas",
                value: function() {
                    var t = document.createElement("canvas");
                    return {
                        canvas: t,
                        context: t.getContext("2d")
                    }
                }
            }, {
                key: "collectData",
                value: function() {
                    for (var t in this.settings)
                        for (var e in this.settings[t]) {
                            var n = this.$el.data("distortion-" + t + "-" + e);
                            n && (this.settings[t][e] = n)
                        }
                }
            }, {
                key: "measure",
                value: function() {
                    var t = this.$el.width()
                      , e = this.$el.height()
                      , n = t + 2 * this.padding
                      , i = e + 2 * this.padding;
                    this.dimension = {
                        width: t,
                        height: e,
                        outerWidth: n,
                        outerHeight: i
                    }
                }
            }, {
                key: "wrapCanvas",
                value: function() {
                    var t = this.$el.attr("class")
                      , e = $("<div />");
                    t && e.addClass(t),
                    this.$el.removeAttr("class").wrap(e),
                    this.$el.before(this.canvas)
                }
            }, {
                key: "appendCanvas",
                value: function() {
                    this.$el.append(this.canvas)
                }
            }, {
                key: "afterCanvas",
                value: function() {
                    this.$el.after(this.canvas)
                }
            }, {
                key: "renderStyles",
                value: function() {
                    $(this.canvas).css({
                        width: "calc(100% + " + 2 * this.padding + "px)",
                        height: "calc(100% + " + 2 * this.padding + "px)",
                        left: -this.padding,
                        top: -this.padding
                    })
                }
            }, {
                key: "resize",
                value: function() {
                    this.canvas.width = this.split.canvas.width = this.dimension.outerWidth,
                    this.canvas.height = this.split.canvas.height = this.dimension.outerHeight,
                    this.renderStyles(),
                    this.image && (this.resizeImage(),
                    this.image.raw && this.prerenderImage()),
                    this.changed = !0
                }
            }, {
                key: "resizeImage",
                value: function() {
                    this.image.canvas.width = this.dimension.width ? this.dimension.width : this.image.raw ? this.image.raw.naturalWidth : 0,
                    this.image.canvas.height = this.dimension.height ? this.dimension.height : this.image.raw ? this.image.raw.naturalHeight : 0
                }
            }, {
                key: "prerenderImage",
                value: function() {
                    this.image.context.drawImage(this.image.raw, 0, 0, this.image.canvas.width, this.image.canvas.height),
                    this.overlay && this.colorOverlay()
                }
            }, {
                key: "colorOverlay",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.overlay;
                    this.image.context.fillStyle = t,
                    this.image.context.globalCompositeOperation = "source-in",
                    this.image.context.fillRect(0, 0, this.dimension.width, this.dimension.height),
                    this.image.context.globalCompositeOperation = "source-over"
                }
            }, {
                key: "loadSVG",
                value: function() {
                    var t = this
                      , e = new Image
                      , n = new Blob([this.$el[0].outerHTML],{
                        type: "image/svg+xml"
                    })
                      , i = URL.createObjectURL(n);
                    return new Promise(function(n) {
                        e.onload = function() {
                            URL.revokeObjectURL(i);
                            var a = document.createElement("canvas")
                              , r = a.getContext("2d");
                            t.image = {
                                raw: e,
                                canvas: a,
                                context: r
                            },
                            t.resizeImage(),
                            t.prerenderImage(),
                            t.render(),
                            t.loaded = !0,
                            t.changed = !0,
                            n(e)
                        }
                        ,
                        e.src = i
                    }
                    )
                }
            }, {
                key: "loadIMG",
                value: function(t) {
                    var e = this
                      , n = new Image;
                    return new Promise(function(i) {
                        n.onload = function() {
                            var t = document.createElement("canvas")
                              , a = t.getContext("2d");
                            e.image = {
                                raw: n,
                                canvas: t,
                                context: a
                            },
                            e.resizeImage(),
                            e.prerenderImage(),
                            e.render(),
                            e.loaded = !0,
                            e.changed = !0,
                            i(n)
                        }
                        ,
                        n.src = t ? t : e.$el[0].src
                    }
                    )
                }
            }, {
                key: "generateEvenChunks",
                value: function(t) {
                    this.chunks = [],
                    this.layout = t;
                    for (var e = this.dimension.width / t[0], n = this.dimension.height / t[1], i = 0; i < t[1]; ++i)
                        for (var r = 0; r < t[0]; ++r)
                            this.chunks.push(new a(e * r,n * i,e,n))
                }
            }, {
                key: "generateRandomChunks",
                value: function(t) {
                    var e = this;
                    this.chunks = [],
                    this.layout = [1, 1];
                    var n = function i(n, r, o, s) {
                        if (o * s / (e.dimension.width * e.dimension.height) > t)
                            if (o >= s) {
                                var h = Math.random() * o;
                                i(n, r, h, s),
                                i(n + h, r, o - h, s),
                                ++e.layout[0]
                            } else {
                                var c = Math.random() * s;
                                i(n, r, o, c),
                                i(n, r + c, o, s - c),
                                ++e.layout[1]
                            }
                        else
                            e.chunks.push(new a(n,r,o,s))
                    };
                    n(0, 0, this.dimension.width, this.dimension.height)
                }
            }, {
                key: "generateLines",
                value: function(t) {
                    this.generateEvenChunks([1, Math.floor(this.dimension.height / t)])
                }
            }, {
                key: "generateWaves",
                value: function(t) {
                    var e = this;
                    this.waves = [];
                    var n = function i(n, a) {
                        var o = Math.floor(a - n);
                        if (o > e.layout[1] * t) {
                            var s = Math.floor(Math.random() * o);
                            i(n, s),
                            i(s, a)
                        } else
                            e.waves.push(new r(n,a))
                    };
                    n(0, this.layout[1])
                }
            }, {
                key: "addWaves",
                value: function(t) {
                    if (this.waves.length) {
                        var e = !0
                          , n = !1
                          , i = void 0;
                        try {
                            for (var a, r = this.waves[Symbol.iterator](); !(e = (a = r.next()).done); e = !0)
                                for (var o = a.value, s = 0, h = o.from; h < o.to; ++h)
                                    s += 2 * Math.PI / (o.to - o.from),
                                    this.chunks[h].distorted.x += Math.sin(s) * t * o.direction
                        } catch (c) {
                            n = !0,
                            i = c
                        } finally {
                            try {
                                !e && r.return && r.return()
                            } finally {
                                if (n)
                                    throw i
                            }
                        }
                    }
                }
            }, {
                key: "generateInterference",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    this.interference = [];
                    for (var n = 0; e > n; ++n) {
                        var i = t < this.layout[1] ? Math.floor(Math.random() * (this.layout[1] - t)) : 0
                          , a = i + t < this.layout[1] ? i + t : this.layout[1];
                        this.interference.push(new o(i,a))
                    }
                }
            }, {
                key: "addInterference",
                value: function(t) {
                    if (this.interference.length) {
                        var e = !0
                          , n = !1
                          , i = void 0;
                        try {
                            for (var a, r = this.interference[Symbol.iterator](); !(e = (a = r.next()).done); e = !0)
                                for (var o = a.value, s = 0, h = o.to - o.from; h > s; ++s) {
                                    var c = 5 * Math.random();
                                    this.chunks[o.from + s].distorted.x += (t - this.easing.easeOutQuart(s, 0, t, h)) * o.direction + (c - this.easing.easeOutQuart(s, 0, c, h))
                                }
                        } catch (u) {
                            n = !0,
                            i = u
                        } finally {
                            try {
                                !e && r.return && r.return()
                            } finally {
                                if (n)
                                    throw i
                            }
                        }
                    }
                }
            }, {
                key: "moveInterference",
                value: function() {
                    for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, e = 0, n = this.interference.length; n > e; ++e)
                        this.interference[e].from < this.interference[e].to && (this.interference[e].from += t)
                }
            }, {
                key: "addRandomBlur",
                value: function(t, e) {
                    var n = Math.random() * (e - t) + t;
                    this.blur = [n, n / 2]
                }
            }, {
                key: "addRandomRGBSplit",
                value: function(t, e) {
                    var n = Math.random() * (e - t) + t;
                    this.RGBSplit = [n, n / 2]
                }
            }, {
                key: "addRandomTranslate",
                value: function(t) {
                    this.translate = [Math.random() * t - t / 2, Math.random() * t - t / 2]
                }
            }, {
                key: "transformChunksRandom",
                value: function(t, e, n) {
                    for (var i = 0, a = this.chunks.length; a > i; ++i)
                        if (Math.random() < t) {
                            var r = this.chunks[i].distorted.width * n[0]
                              , o = this.chunks[i].distorted.height * n[1]
                              , s = this.chunks[i].distorted.x + (2 * Math.random() * e[0] - e[0])
                              , h = this.chunks[i].distorted.y + (2 * Math.random() * e[1] - e[1]);
                            this.chunks[i].distorted.x = s - (r - this.chunks[i].distorted.width) / 2,
                            this.chunks[i].distorted.y = h - (o - this.chunks[i].distorted.height) / 2,
                            this.chunks[i].distorted.width = r,
                            this.chunks[i].distorted.height = o
                        }
                }
            }, {
                key: "addRandomFragment",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    this.fragments = [];
                    for (var n = 0; e > n; ++n) {
                        var i = Math.random() * this.dimension.width * t[0] + 1
                          , a = Math.random() * this.dimension.height * t[1] + 1;
                        this.fragments.push(new s(Math.random() * (this.dimension.width - i) + this.padding,Math.random() * (this.dimension.height - a) + this.padding,i,a))
                    }
                }
            }, {
                key: "reset",
                value: function() {
                    this.chunks = [],
                    this.layout = [0, 0],
                    this.waves = [],
                    this.interference = [],
                    this.translate = [0, 0],
                    this.blur = !1,
                    this.RGBSplit = !1,
                    this.fragments = [],
                    this.changed = !0,
                    this.frame = !1
                }
            }, {
                key: "update",
                value: function() {
                    this.frame > 0 && --this.frame,
                    this.translate = [0, 0],
                    this.blur = !1,
                    this.RGBSplit = !1,
                    this.fragments = []
                }
            }, {
                key: "clear",
                value: function() {
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
                    this.split.context.clearRect(0, 0, this.split.canvas.width, this.split.canvas.height)
                }
            }, {
                key: "render",
                value: function() {
                    if (this.chunks.length) {
                        var t = !0
                          , e = !1
                          , n = void 0;
                        try {
                            for (var i, a = this.chunks[Symbol.iterator](); !(t = (i = a.next()).done); t = !0) {
                                var r = i.value
                                  , o = r.original
                                  , s = r.distorted;
                                this.context.globalAlpha = r.alpha,
                                this.context.drawImage(this.image.canvas, o.x, o.y, o.width, o.height, s.x + this.padding + this.translate[0], s.y + this.padding + this.translate[1], s.width, s.height)
                            }
                        } catch (h) {
                            e = !0,
                            n = h
                        } finally {
                            try {
                                !t && a.return && a.return()
                            } finally {
                                if (e)
                                    throw n
                            }
                        }
                    } else
                        this.context.drawImage(this.image.canvas, this.padding, this.padding);
                    if (this.fragments.length) {
                        this.context.fillStyle = this.settings.fragmentColor,
                        this.context.globalCompositeOperation = "difference";
                        var c = !0
                          , u = !1
                          , d = void 0;
                        try {
                            for (var l, f = this.fragments[Symbol.iterator](); !(c = (l = f.next()).done); c = !0) {
                                var m = l.value;
                                this.context.fillRect(m.x, m.y, m.width, m.height)
                            }
                        } catch (h) {
                            u = !0,
                            d = h
                        } finally {
                            try {
                                !c && f.return && f.return()
                            } finally {
                                if (u)
                                    throw d
                            }
                        }
                        this.context.globalCompositeOperation = "source-over"
                    }
                    this.blur && (this.split.context.drawImage(this.canvas, 0, 0),
                    this.context.globalAlpha = .15,
                    this.context.drawImage(this.split.canvas, -this.blur[0], 0),
                    this.context.drawImage(this.split.canvas, this.blur[0], 0),
                    this.context.drawImage(this.split.canvas, -this.blur[1], 0),
                    this.context.drawImage(this.split.canvas, this.blur[1], 0),
                    this.context.globalAlpha = 1),
                    this.RGBSplit && (this.split.context.drawImage(this.canvas, 0, 0),
                    this.split.context.globalCompositeOperation = "source-in",
                    this.split.context.fillStyle = "rgba(0,0,0,1)",
                    this.split.context.fillRect(0, 0, this.dimension.outerWidth, this.dimension.outerHeight),
                    this.context.drawImage(this.split.canvas, -this.RGBSplit[0], 0),
                    this.split.context.fillStyle = "rgba(196,196,196,1)",
                    this.split.context.fillRect(0, 0, this.dimension.outerWidth, this.dimension.outerHeight),
                    this.context.drawImage(this.split.canvas, this.RGBSplit[0], 0),
                    this.split.context.fillStyle = this.overlay,
                    this.split.context.fillRect(0, 0, this.dimension.outerWidth, this.dimension.outerHeight),
                    this.split.context.globalCompositeOperation = "source-over",
                    this.context.drawImage(this.split.canvas, 0, 0))
                }
            }, {
                key: "windowOnResize",
                value: function() {
                    this.measure(),
                    this.resize(),
                    this.reset()
                }
            }, {
                key: "addEventListener",
                value: function() {
                    this.$window.on("resize", this.windowOnResize.bind(this))
                }
            }, {
                key: "addCustomEasing",
                value: function() {
                    this.easing = {
                        easeOutQuart: function(t, e, n, i) {
                            return -n * ((t = t / i - 1) * t * t * t - 1) + e
                        }
                    }
                }
            }, {
                key: "$el",
                set: function(t) {
                    this._$el = t,
                    this.collectData(),
                    this.measure(),
                    this.resize()
                },
                get: function() {
                    return this._$el
                }
            }, {
                key: "padding",
                set: function(t) {
                    this._padding != t && (this._padding = t,
                    this.dimension.outerWidth = this.dimension.width + 2 * t,
                    this.dimension.outerHeight = this.dimension.height + 2 * t,
                    this.renderStyles(),
                    this.resize(),
                    this.changed = !0)
                },
                get: function() {
                    return this._padding
                }
            }, {
                key: "overlay",
                set: function(t) {
                    this._overlay != t && (this._overlay = t,
                    this.image && (this.colorOverlay(),
                    this.changed = !0))
                },
                get: function() {
                    return this._overlay
                }
            }]),
            t
        }();
        e.exports = h
    }
    , {}],
    4: [function(t, e) {
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var a = t("./distortion.js")
          , r = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , o = function(t, e, n) {
            for (var i = !0; i; ) {
                var a = t
                  , r = e
                  , o = n;
                i = !1,
                null === a && (a = Function.prototype);
                var s = Object.getOwnPropertyDescriptor(a, r);
                if (void 0 !== s) {
                    if ("value"in s)
                        return s.value;
                    var h = s.get;
                    return void 0 === h ? void 0 : h.call(o)
                }
                var c = Object.getPrototypeOf(a);
                if (null === c)
                    return void 0;
                t = c,
                e = r,
                n = o,
                i = !0,
                s = c = void 0
            }
        }
          , s = function(t) {
            function e(t) {
                n(this, e),
                o(Object.getPrototypeOf(e.prototype), "constructor", this).call(this),
                this.padding = 150,
                this.$el = t,
                this.wrapCanvas(),
                this.loadIMG()
            }
            return i(e, t),
            r(e, [{
                key: "windowOnResize",
                value: function() {
                    o(Object.getPrototypeOf(e.prototype), "windowOnResize", this).call(this)
                }
            }]),
            e
        }(a);
        e.exports = s
    }
    , {
        "./distortion.js": 3
    }],
    5: [function(t, e) {
        "use strict";
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function a(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var r = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , o = function c(t, e, n) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, e);
            if (void 0 === i) {
                var a = Object.getPrototypeOf(t);
                return null === a ? void 0 : c(a, e, n)
            }
            if ("value"in i)
                return i.value;
            var r = i.get;
            return void 0 === r ? void 0 : r.call(n)
        }
          , s = t("./distortion")
          , h = function(t) {
            function e(t) {
                n(this, e);
                var a = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return a.$el = t,
                a.wrapCanvas(),
                a.loadSVG(),
                a.updateColor(),
                a
            }
            return a(e, t),
            r(e, [{
                key: "updateColor",
                value: function() {
                    var t = "#fff";
                    this.overlay != t && (this.overlay = t,
                    this.settings.fragmentColor = t,
                    this.changed = !0)
                }
            }, {
                key: "update",
                value: function() {
                    o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "update", this).call(this),
                    this.updateColor()
                }
            }, {
                key: "resize",
                value: function() {
                    o(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "resize", this).call(this)
                }
            }]),
            e
        }(s);
        e.exports = h
    }
    , {
        "./distortion": 3
    }],
    6: [function(t, e) {
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        function i(t, e) {
            if (!t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }
        function a(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        var r = t("./distortion")
          , o = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , s = function c(t, e, n) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, e);
            if (void 0 === i) {
                var a = Object.getPrototypeOf(t);
                return null === a ? void 0 : c(a, e, n)
            }
            if ("value"in i)
                return i.value;
            var r = i.get;
            return void 0 === r ? void 0 : r.call(n)
        }
          , r = t("./distortion")
          , h = function(t) {
            function e() {
                n(this, e);
                var t = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return t._src,
                t._fallback,
                t.image = t.createCanvas(),
                t.cache = {},
                t.data = {},
                t.framerate = 24,
                t.playing = !1,
                t.interval,
                t
            }
            return a(e, t),
            o(e, [{
                key: "createVideo",
                value: function(t) {
                    var e = this
                      , n = document.createElement("video");
                    return n.addEventListener("playing", function() {
                        e.playing = !0,
                        e.loaded = !0,
                        e.data = {
                            naturalWidth: n.videoWidth,
                            naturalHeight: n.videoHeight
                        },
                        e.coverImage()
                    }),
                    n.autoplay = !0,
                    n.loop = !0,
                    n.src = t,
                    n
                }
            }, {
                key: "addCanvas",
                value: function(t) {
                    this.$el = t,
                    this.appendCanvas(),
                    this.resizeImage()
                }
            }, {
                key: "coverImage",
                value: function() {
                    var t = this.dimension.width / this.data.naturalWidth
                      , e = this.dimension.width
                      , n = this.data.naturalHeight * t;
                    n < this.dimension.height && (t = this.dimension.height / this.data.naturalHeight,
                    e = this.data.naturalWidth * t,
                    n = this.dimension.height);
                    var i = (this.dimension.width - e) / 2
                      , a = (this.dimension.height - n) / 2;
                    this.data.width = e,
                    this.data.height = n,
                    this.data.x = i,
                    this.data.y = a
                }
            }, {
                key: "prerenderImage",
                value: function() {
                    this.image.context.drawImage(this.playing ? this.video : this.image.raw, this.data.x, this.data.y, this.data.width, this.data.height)
                }
            }, {
                key: "play",
                value: function() {
                    this.capture()
                }
            }, {
                key: "capture",
                value: function() {
                    var t = this;
                    this.interval = setInterval(function() {
                        (t.video || t.image.raw) && t.data && t.image.raw && (t.image.context.drawImage(t.playing ? t.video : t.image.raw, t.data.x, t.data.y, t.data.width, t.data.height),
                        t.changed = !0)
                    }, 1e3 / this.framerate)
                }
            }, {
                key: "stop",
                value: function() {
                    clearInterval(this.interval)
                }
            }, {
                key: "windowOnResize",
                value: function() {
                    s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "windowOnResize", this).call(this),
                    this.coverImage()
                }
            }, {
                key: "src",
                set: function(t) {
                    t != this._src && (this._src = t,
                    this.cache[t] ? this.video = this.cache[t] : (this.video = this.createVideo(t),
                    this.cache[t] = this.video))
                },
                get: function() {
                    return this._src
                }
            }, {
                key: "fallback",
                set: function(t) {
                    var e = this;
                    this._fallback = t,
                    this.loadIMG(t).then(function() {
                        e.data = {
                            naturalWidth: e.image.raw.naturalWidth,
                            naturalHeight: e.image.raw.naturalHeight
                        },
                        e.coverImage()
                    })
                },
                get: function() {
                    return this._fallback
                }
            }]),
            e
        }(r);
        e.exports = h
    }
    , {
        "./distortion": 3
    }],
    7: [function(t, e) {
        "use strict";
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        var i = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n),
                i && t(e, i),
                e
            }
        }()
          , a = function() {
            function t() {
                n(this, t),
                this.$html = $("html"),
                this.animations = [],
                this.animationFrame,
                this.interval,
                this.badfps = 0,
                this.last = 0,
                this.badfpsreset,
                this.performance = !0
            }
            return i(t, [{
                key: "update",
                value: function() {
                    var t = !0
                      , e = !1
                      , n = void 0;
                    try {
                        for (var i, a = this.animations[Symbol.iterator](); !(t = (i = a.next()).done); t = !0) {
                            var r = i.value;
                            r.update && r.update()
                        }
                    } catch (o) {
                        e = !0,
                        n = o
                    } finally {
                        try {
                            !t && a.return && a.return()
                        } finally {
                            if (e)
                                throw n
                        }
                    }
                }
            }, {
                key: "heartbeat",
                value: function() {
                    var t = this;
                    this.interval = setInterval(function() {
                        t.update()
                    }, 1e3 / 60)
                }
            }, {
                key: "loop",
                value: function() {
                    var t = this;
                    this.animationFrame = requestAnimationFrame(function(e) {
                        e - t.last > 1e3 / 24 && (++t.badfps > 50 && (t.performance = !1,
                        t.$html.addClass("save-performance")),
                        t.badfpsreset && clearTimeout(t.badfpsreset),
                        t.badfpsreset = setTimeout(function() {
                            t.badfps = 0
                        }, 1e3)),
                        t.last = e,
                        t.loop()
                    }),
                    this.frame()
                }
            }, {
                key: "frame",
                value: function() {
                    var t = !0
                      , e = !1
                      , n = void 0;
                    try {
                        for (var i, a = this.animations[Symbol.iterator](); !(t = (i = a.next()).done); t = !0) {
                            var r = i.value;
                            r.loaded && r.changed && (this.performance || !this.performance && !r.ignore) && (r.clear && r.clear(),
                            r.render && r.render(),
                            r.changed = !1)
                        }
                    } catch (o) {
                        e = !0,
                        n = o
                    } finally {
                        try {
                            !t && a.return && a.return()
                        } finally {
                            if (e)
                                throw n
                        }
                    }
                }
            }, {
                key: "start",
                value: function() {
                    this.heartbeat(),
                    this.loop()
                }
            }, {
                key: "pause",
                value: function() {
                    cancelAnimationFrame(this.animationFrame),
                    clearInterval(this.interval)
                }
            }]),
            t
        }();
        e.exports = a
    }
    , {}]
}, {}, [1]);
