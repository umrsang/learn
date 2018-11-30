var mian, view, imgFrom;
var addr = "广州公元前";
var pageName = "螺旋圆舞曲换装H5";

window.onload = function () {
    var bgm = document.getElementById("bgm");

    $("#img").click(function(){
        console.log("body-click")
        if(!bgm.onContral){
            bgm.play();
            console.log("bgm-play")
        }
        bgm.onContral = true;
        this.style.zIndex = 0;
    })

    resources.assetLoad(function () {
        $(".loading_page").css({
            opacity: 0,
            transform: "scale(1.5)"
        });

        $(".to_result").click(function(){
            var val = $(".addr_input input").val();
            if(val==""){
                $(".err span").html("盯!看楼上!你忘记输入地点"); return;
            }
            if(val.length>5){
                $(".err span").html("哎呀太挤了,麻烦缩减到5个字以内"); return;
            }
            addr=val;
            $(".addr_input").removeClass("show")
            view.showView(3);
        })

        setTimeout(function(){
            view = new View();
            view.showView(0);
            view.initUpload();
            $(".loading_page").hide();
            _hmt&&_hmt.push(['_trackPageview', '/waltz/activity/showH5/home']);
        }, 500)
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
    title: "妹纸，你会是直男审美吗？",
    imgUrl: 'http://www.100bt.com/tianti/waltz/activity/trialH5/img/icon.jpg',
    desc: '天呐噜！我在《螺旋圆舞曲》舞会中收获60分，你能超过我吗？',
    link: location.href,
    type: 'link',
    debug: false,
    success: function () { 
        // showMsg('分享成功!');
        main.countAction('share');
        _hmt&&_hmt.push(['_trackEvent', pageName, pageName + '_按钮', pageName + '_按钮' + '_分享']);
    },
    cancel: function () {
        // showMsg('分享取消!');
    },
    weixinShareReady: false,
    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
}