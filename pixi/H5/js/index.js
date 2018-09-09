var mian, view;
window.onload = function () {
  InitCanvas();
  main = new Main();
  resources.assetLoad(function () {
    view = new View();
    view.showView(0);
  });
}

function InitCanvas() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var cav = document.getElementById("cav");
  var ratio = width / height
  var setW = 750;
  var setH = 1218;
  var setRatio = 750 / 1218;

  if (setW / ratio < setH) {
    cav.style.height = height + 'px';
    cav.style.width = height * setRatio + 'px';
    cav.style.marginTop = -(height / 2) + 'px';
    cav.style.marginLeft = -(height * setRatio / 2) + 'px';
  } else {
    cav.style.width = width + 'px';
    cav.style.height = width / setRatio + 'px';
    cav.style.marginTop = -(width / setRatio / 2) + 'px';
    cav.style.marginLeft = -(width / 2) + 'px';
  }

  cav.width = setW;
  cav.height = setH;
}

window.onresize = InitCanvas;

function Main() {
  this.currStep = 0
  this.roleList = ['sakan', 'aolinv', 'qiaoka', 'hesang'];
  this.starList = [3, 2, 3, 3];
  this.roleIndex = Math.floor(Math.random() * 4);
  this.star = this.starList[this.roleIndex];
  this.role = this.roleList[this.roleIndex];
  this.view = new View();
}

Main.prototype.init = function () {
  this.currStep = 0
  this.view[this.currStep]();
}