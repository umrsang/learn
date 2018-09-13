var mian, view, videoEnd;
var setW = 750;
var setH = 1218;

window.onload = function () {
  InitCanvas();
  main = new Main();
  videoEnd = false;
  resources.assetLoad(function () {
    view = new View();
    view.showView(1);
    if(!videoEnd){
      view.showView(0);
    }
    var video = document.getElementById("video");
    video.onended = function() {
      if(!videoEnd){
        videoEnd = true;
        view.showView(1);
      }
      var line = new TimelineMax();
      line.to(video, 0.5, {opacity: 0})
          .set(video, {zIndex: 0,});
    };
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