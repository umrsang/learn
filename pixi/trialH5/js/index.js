var mian, view;
var pageName = "螺旋圆舞曲换装H5";
var resourceUrlHead = "http://www.100bt.com/tianti/waltz/activity/trialH5";
// var resourceUrlHead = ".";

window.onload = function () {
    _hmt&&_hmt.push(['_setAutoPageview', false]);

    main = new Main();

    resources.assetLoad(function () {
        $(".loading_page").css({
            opacity: 0,
            transform: "scale(1.5)"
        });

        setTimeout(function(){
            view = new View();
            view.showView(0);
            $(".loading_page").hide();
        }, 500)
    });

    initWeixinShare();
}


function Main() {
    this.currStep = 0
    this.roleList = ['sakan', 'aolinv', 'qiaoka', 'hesang'];
    this.roleInfo = [
    { star: 5, color: 'brown', style: "mori" },
    { star: 5, color: 'blue', style: "sexy" },
    { star: 4, color: 'green', style: "classic" },
    { star: 4, color: 'black', style: "lovely" }
  ]

    this.roleIndex = Math.floor(Math.random() * 4);
    this.role = this.roleList[this.roleIndex];
    this.star = this.roleInfo[this.roleIndex].star;
    this.color = this.roleInfo[this.roleIndex].color;
    this.style = this.roleInfo[this.roleIndex].style;
    // this.color = this.roleInfo[1].color;
    // this.style = this.roleInfo[1].style;

}

Main.prototype.countScore = function (score, callBack) {
    var path = 'http://service.100bt.com/activity/lxywq_h5game/submit_score.jsonp?score=' + score;
    $.ajax({
        url: path,
        type: "get",
        dataType: 'jsonp',
        success: function (result) {
            callBack && callBack();
            console.log(result.resultCode.detail)
        },
        error: function (result) {
            callBack && callBack();
        }
    });

}

Main.prototype.countAction = function (type, callBack) {
    var sheet = { replay: 1, download: 2, share: 3 }
    //type -- 类型 整型 1.点击重玩按钮  2.点击下载按钮   3.为点击分享按钮

    var path = 'http://service.100bt.com/activity/lxywq_h5game/submit_status.jsonp?type=' + sheet[type];
    $.ajax({
        url: path,
        type: "get",
        dataType: 'jsonp',
        success: function (result) {
            callBack && callBack();
            console.log(result.resultCode.detail)
        },
        error: function (result) {
            callBack && callBack();
        }
    });
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
    title: "这支螺旋圆舞曲，你会跳吗？",
    imgUrl: 'http://www.100bt.com/tianti/waltz/activity/trialH5/img/icon.jpg',
    desc: '天呐噜！我用尽心思地打扮，在《螺旋圆舞曲》舞会中收获60分，你能超过我吗？！',
    link: location.href,
    type: 'link',
    debug: false,
    success: function () {
        // showMsg('分享成功!');
        main.countAction('share');
    },
    cancel: function () {
        // showMsg('分享取消!');
    },
    weixinShareReady: false,
    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
}