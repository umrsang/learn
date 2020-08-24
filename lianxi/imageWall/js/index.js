window.onload = function(){
  var view = {
    imgWidth: 250,
    colNum: 0,
    marginBottom: 20,
    wallPadding: 40,
    colPostion: [],
    colHeight: [0,0,0,0],
    pageSize: 20,
    wall: this.document.getElementsByClassName("wall")[0],
    init: function(){
      this.initCol();
      for(var i=1; i<50; i++){
        this.getImg();
      }
    },
    initCol: function(){
      var w = window.innerWidth;
      var viewW = w - (this.wallPadding / 2);
      //列数
      this.colNum = (viewW / this.imgWidth).toFixed(0);
      //列之间的间隔
      var margin = (viewW - this.colNum * this.imgWidth) / (this.colNum + 1);
      //计算每列的X坐标
      this.colPostion = [];
      this.colHeight = [];

      for(var i=0; i<this.colNum; i++){
        var X;
        if(i == 0){
          X = this.wallPadding + margin;
        }else{
          X = this.colPostion[i-1] + this.imgWidth + margin;
        }
        this.colPostion.push(X);
        this.colHeight.push(0);
      }
      console.log(this.colPostion)
    },
    getImg: function(){
      var me = this;
      var img = new Image();
      img.style.width = this.imgWidth + 'px';
      
      var index = Math.floor((Math.random()*25 + 1));
      index = index<10?('0'+index):index;
      img.src = './img/' + index + '.jpg';
      img.onload = function(){
        me.insertImg(img)
      }

      return img;
    },
    insertImg: function(img, height){
      var min = this.colHeight[0], minIndex = 0;
      for(var i=1; i<this.colHeight.length; i++){
        if(min > this.colHeight[i]){
          min = this.colHeight[i];
        }
      }
      minIndex = this.colHeight.indexOf(min);
      var x = this.colPostion[minIndex];
      var y = this.colHeight[minIndex];
      img.style.left = x + 'px';
      img.style.top = y + 'px';
      this.wall.appendChild(img);
      this.colHeight[minIndex] += img.clientHeight + this.marginBottom;
      console.log(this.colHeight)
    }
  }

  view.init();
  window.view = view;
}