// var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;


module.exports = {
    container: {},
    width: 0,
    height: 0,
    slider: [],
    centerX: 0,
    centerY: 0,
    radius: 0,
    len: 0,
    currAngle: 0,
    eachAngle: 0,
    lastAngle: 0,
    PI: Math.PI,
    moveSpeed: 0.5,
    scaleY: 0.5,
    scaleWH: 0.6,
    throat: false,
    timerout: 100,
    paddingX: 50,
    rad: 2*Math.PI/360,
    init: function (prop) {
        var me = this;
        var container = this.container = prop.container;
        var width = this.width = prop.container.offsetWidth;
        var height = this.height = prop.container.offsetHeight;
        this.slider = prop.container.children;
        this.len = this.slider.length;
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.radius = width / 2 - this.paddingX;
        this.currAngle = 0;
        this.eachAngle = 360 / this.len;
        this.setPosition();

        container.addEventListener('touchstart',function(e){
            me.lastAngle = me.currAngle;
            me.inTouch = true;
            me.lastTouchX = e.targetTouches[0].clientX;
        })
        container.addEventListener('touchmove',function(e){
            // console.log(e.targetTouches[0].clientX);
            me.currAngle = me.currAngle + (e.targetTouches[0].clientX - me.lastTouchX)* me.moveSpeed;
            me.lastTouchX = e.targetTouches[0].clientX;
            if(!me.throat){
                me.setPosition();
                me.throat = true;
                setTimeout(function(){
                    me.throat = false;
                }, me.timerOut);
            }
        });
        container.addEventListener('touchend',function(){
            var trueAngle = (me.currAngle - me.lastAngle) % me.eachAngle;
            var offset;
            var direction;
            if(  Math.abs(trueAngle) > me.eachAngle/5){
                direction = me.currAngle > me.lastAngle? 1 : -1;
                offset = me.eachAngle - Math.abs(trueAngle);
            }else{
                direction = me.currAngle > me.lastAngle? -1 : 1;
                offset = Math.abs(trueAngle);
            }
            me.inTouch = false;
            // console.log(offset, direction);
            for(var i=0; i < offset; i++){
                setTimeout(function(){
                    if(!me.inTouch){
                        me.currAngle  = me.currAngle + 1*direction;
                        // console.log(me.currAngle)
                        me.setPosition();
                    }
                }, i*5);
            }
        });
    },
    setPosition: function () {
        var me = this;
        var radius = this.radius;
        var myAngle = this.currAngle;
        var scaleY = this.scaleY;
        var scaleWH = this.scaleWH;
        var _scaleWH = 1-scaleWH;
        var active, maxTop;
        Array.prototype.map.call(me.slider, function (item) {
            var myrad = myAngle * me.rad;
            var top = radius * cos(myrad);
            var left = radius * sin(myrad);
            var scale;
            item.style.top = (top + me.centerY - item.offsetHeight/2)* scaleY + 'px';
            item.style.left = (left + me.centerX - item.offsetWidth/2) + 'px';
            item.style.zIndex = parseInt(top + radius);
            scale = ((((top + radius)/(2*radius))*_scaleWH)+scaleWH);
            item.style.transform =  'scale('+scale+')' ;
            myAngle = myAngle + me.eachAngle;

            if(maxTop == undefined){
                active = item;
                maxTop = top;
            }else{
                if(maxTop < top){
                    active = item;
                    maxTop = top;
                }
            }
        });
        for(var i=0; i< me.len; i++ ){
            me.slider[i].classList.add("cover");
        }
        active.classList.remove("cover");
        me.activeSlider = active;
    }
}