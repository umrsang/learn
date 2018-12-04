var mian, view, imgFrom;
var addr = "广州公元前";
var pageName = "螺旋圆舞曲换装H5";

window.onload = function () {
    var bgm = document.getElementById("bgm");

    $("#img").click(function () {
        console.log("body-click")
        if (!bgm.onContral) {
            bgm.play();
            console.log("bgm-play")
        }
        bgm.onContral = true;
        
    })

    resources.assetLoad(function () {
        $(".loading_page").css({
            opacity: 0,
            transform: "scale(1.5)"
        });

        $(".to_result").click(function () {
            var val = $(".addr_input input").val();
            if (val == "") {
                $(".err span").html("盯!看楼上!你忘记输入地点");
                return;
            }
            if (val.length > 5) {
                $(".err span").html("哎呀太挤了,麻烦缩减到5个字以内");
                return;
            }
            addr = val;
            $(".addr_input").removeClass("show")
            view.showView(3);
        })

        setTimeout(function () {
            view = new View();
            view.showView(0);
            view.initUpload();
            $(".loading_page").hide();
            _hmt && _hmt.push(['_trackPageview', '/waltz/activity/showH5/home']);
        }, 500)


        $(".to_photo").click(function () {
            if (view.checkClothes()&&view.step==1) {
                var imgFrom = document.getElementById("zimg-file");
                imgFrom.click();
            } else {
                var line = new TimelineMax();
                line.to(view.SpritePool.clothes_tips, 0.3, {pixi: {alpha: 1}})
                    .to(view.SpritePool.clothes_tips, 0.3, {pixi: {alpha: 0}, delay: 1})
            }
        })

        var imgFrom = document.getElementById("zimg-file");
        imgFrom.addEventListener("change", function () {

            $(".to_photo").removeClass("show");

            var inshow = view.getSprite("inshow", "inshow", view.page_clothing, 275, 450 + detalY, 1, 1, 0.5, 0.5, 1);
            
            var imageDate = this.files[0];
            var myFrom = new FormData();
            var reader = new FileReader(); //调用FileReader对象

            this.value = '';

            myFrom.append("image", imageDate); //向表单中添加一个键值对
            // console.log(myFrom.getAll("image")); //获取表单中image字段对应的值，结果见下图

            reader.readAsDataURL(imageDate); //通过DataURL的方式返回图像
            reader.onload = function (e) {
                var bgsrc = e.target.result;

                var img = new Image();
                img.src = bgsrc

                img.onload = function () {

                    bgOrientation = view.getPhotoOrientation(img);
                    var cav = document.getElementById("cav");

                    if (img.width > 2000) {
                        var width = parseInt(img.width) / 2;
                        var height = parseInt(img.height) / 2;
                    } else {
                        var width = parseInt(img.width) * 0.8;
                        var height = parseInt(img.height) * 0.8;
                    }

                    cav.width = width
                    cav.height = height
                    var ctx = cav.getContext("2d");

                    console.log(bgOrientation)
                    if (bgOrientation == 6) {
                        ctx.save();
                        ctx.translate(width / 2, height / 2);
                        ctx.rotate(90 * Math.PI / 180);
                        ctx.drawImage(img, 0 - height / 2, 0 - width / 2, height, width);
                    } else {
                        ctx.drawImage(img, 0, 0, width, height);
                    }
                    var img64 = cav.toDataURL("image/png");

                    photoCount++
                    resources.loader.add("photo" + photoCount, img64);
                    resources.loader.onComplete.once((a, b) => {
                        view.showView(2)
                        // line.remove();
                    })
                }
            }
        });
    });

    initWeixinShare();
}


function weixinshareBinder() {
    wx.checkJsApi({
        jsApiList: dataForShare.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
            console.log('checkJsApicheckJsApicheckJsApi', res)
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            var api = res.checkResult;
            for (var prop in api) {
                if (api[prop]) {
                    wx[prop](dataForShare);
                    console.log(prop);
                } else {
                    console.log(prop + '分享接口初始化失败, api不可用')
                }
            }
        }
    });
}

function initWeixinShare() {
    var randomstr = (Math.random() + "").slice(2),
        timestamp = new Date() - 0,
        url = encodeURIComponent(location.href.split('#')[0]),
        appType = 3;

    $.getJSON("//service.100bt.com/wx/jsapiSignature.jsonp?callback=?&appType=" + appType + "&noncestr=" +
        randomstr + "×tamp=" + timestamp + "&url=" + url,
        function (data) {
            wx.config({
                debug: dataForShare.debug === true ? true : false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: dataForShare.jsApiList
            });

            wx.ready(function () {
                weixinshareBinder();
                dataForShare.weixinShareReady = true;
            });
        });
}

//分享的信息
var dataForShare = {
    title: "今天，我想去你家走秀",
    imgUrl: 'http://www.100bt.com/tianti/waltz/activity/trialH5/img/icon.jpg',
    desc: '用女子力打破次元壁，漂亮衣服换起来～',
    link: location.href,
    type: 'link',
    debug: false,
    success: function () {
        // showMsg('分享成功!');

        _hmt && _hmt.push(['_trackEvent', pageName, pageName + '_按钮', pageName + '_按钮' + '_分享']);
    },
    cancel: function () {
        // showMsg('分享取消!');
    },
    weixinShareReady: false,
    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
}