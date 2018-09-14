var mian, view;
var setW = 750;
var setH = 1218;

window.onload = function () {
  InitCanvas();
  main = new Main();
  resources.assetLoad(function () {
    view = new View();
    view.showView(1);
  });
}

function InitCanvas() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var container = document.getElementById("container");
  var cav = document.getElementById("cav");

  var ratio = width / height
  var setRatio = 750 / 1218;

  if (setW / ratio < setH) {
    container.style.height = height + 'px';
    container.style.width = height * setRatio + 'px';
    container.style.marginTop = -(height / 2) + 'px';
    container.style.marginLeft = -(height * setRatio / 2) + 'px';
  } else {
    container.style.width = width + 'px';
    container.style.height = width / setRatio + 'px';
    container.style.marginTop = -(width / setRatio / 2) + 'px';
    container.style.marginLeft = -(width / 2) + 'px';
  }
}

window.onresize = InitCanvas;

function Main() {
  this.currStep = 0
  this.roleList = ['sakan', 'aolinv', 'qiaoka', 'hesang'];
  this.roleInfo = [
    {star: 5, color: 'brown', style: "mori"},
    {star: 5, color: 'blue', style: "sexy"},
    {star: 4, color: 'green', style: "classic"},
    {star: 4, color: 'black', style: "lovely"}
  ]
 
  this.roleIndex = Math.floor(Math.random() * 4);
  this.role = this.roleList[this.roleIndex];
  this.star = this.roleInfo[this.roleIndex].star;
  this.color = this.roleInfo[this.roleIndex].color;
  this.style = this.roleInfo[this.roleIndex].style;
  // this.color = this.roleInfo[1].color;
  // this.style = this.roleInfo[1].style;

}

Main.prototype.init = function () {
  this.currStep = 0
  this.view[this.currStep]();
}

Main.prototype.init = function () {
  this.currStep = 0
  this.view[this.currStep]();
}

Main.prototype.countScore = function (score, callBack) {
  var path = 'http://service.100bt.com:8080/activity/lxywq_h5game/submit_score.jsonp?score=' + score;
  $.ajax({
      url: path,
      type: "get",
      dataType: 'jsonp',
      success: function (result) {
        callBack&&callBack();
        console.log(result.resultCode.detail)
      },
      error: function (result) {
        callBack&&callBack();
      }
  });

}

Main.prototype.countAction = function (type, callBack) {
    var sheet = {replay: 1, download: 2, share: 3}

    var path = 'http://service.100bt.com:8080/activity/lxywq_h5game/change_status.jsonp?type=' + sheet[type];
    $.ajax({
        url: path,
        type: "get",
        dataType: 'jsonp',
        success: function (result) {
          callBack&&callBack();
          console.log(result.resultCode.detail)
        },
        error: function (result) {
          callBack&&callBack();
        }
    });
  }
  //type -- 类型 整型 1.点击重玩按钮  2.点击下载按钮   3.为点击分享按钮