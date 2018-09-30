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
    scaleY: 0.7,
    scaleWH: 0.3,
    throat: false,
    timerout: 100,
    paddingX: 50,
    rad: 2 * Math.PI / 360,
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

        container.addEventListener('touchstart', function (e) {
            me.inTouch = true;
            me.lastTouchX = e.targetTouches[0].clientX;
            me.startTouchX = e.targetTouches[0].clientX;
        })
        container.addEventListener('touchmove', function (e) {
            me.currAngle = me.currAngle + (e.targetTouches[0].clientX - me.lastTouchX) * me.moveSpeed;
            me.lastTouchX = e.targetTouches[0].clientX;
            if (!me.throat) {
                me.setPosition();
                me.throat = true;
                setTimeout(function () {
                    me.throat = false;
                }, me.timerOut);
            }
        });
        container.addEventListener('touchend', function (e) {
            var trueAngle = (me.currAngle - me.lastAngle) % me.eachAngle;
            var direction, offset;
            if (Math.abs(trueAngle) > me.eachAngle / 5) {
                direction = me.currAngle > me.lastAngle ? 1 : -1;
                offset = me.eachAngle - Math.abs(trueAngle);
            } else {
                direction = me.currAngle > me.lastAngle ? -1 : 1;
                offset = Math.abs(trueAngle);
            }
            me.inTouch = false;
            for (var i = 0; i < offset; i++) {
                setTimeout(function () {
                    if (!me.inTouch) {
                        me.currAngle = me.currAngle + 1 * direction;
                        me.setPosition();
                    }
                }, i * 2);
            }

            me.lastAngle = me.currAngle + offset * direction;
        });
        return this;
    },
    changeAngleto: function (newAngle) {
        var direction, offset;
        var me = this;
        offset = newAngle - me.currAngle;
        direction = offset > 0 ? 1 : -1;
        offset = Math.abs(offset);

        for (var i = 0; i < offset; i++) {
            setTimeout(function () {
                if (!me.inTouch) {
                    me.currAngle = me.currAngle + 1 * direction;
                    me.setPosition();
                }
            }, i * 2);
        }
        me.lastAngle = me.currAngle + offset * direction;
    },
    setPosition: function () {
        var me = this;
        var radius = this.radius;
        var myAngle = this.currAngle;
        var scaleY = this.scaleY;
        var scaleWH = this.scaleWH;
        var _scaleWH = 1 - scaleWH;
        var active, maxTop;
        Array.prototype.map.call(me.slider, function (item) {
            var myrad = myAngle * me.rad;
            var top = radius * cos(myrad).toFixed(2);
            var left = radius * sin(myrad).toFixed(2);
            var y = (top + me.centerY - item.offsetHeight / 2)*scaleY + 'px';
            var x = (left + me.centerX - item.offsetWidth / 2) + 'px';
            var scale = ((((top + radius) / (2 * radius)) * _scaleWH) + scaleWH);
            item.style.zIndex = parseInt(top + radius);
            item.style.transform = "translate3D(" + x + "," + y + "," + 0 + ") " + 'scale(' + scale.toFixed(2) + ')';
            myAngle = myAngle + me.eachAngle;

            if (maxTop == undefined) {
                active = item;
                maxTop = top;
            } else {
                if (maxTop < top) {
                    active = item;
                    maxTop = top;
                }
            }
        });
        for (var i = 0; i < me.len; i++) {
            me.slider[i].classList.add("cover");
        }
        active.classList.remove("cover");
        me.activeSlider = active;
    },
    toggleNext: function () {
        var angle = this.currAngle + this.eachAngle;
        this.changeAngleto(angle);
    },
    togglePev: function () {
        var angle = this.currAngle - this.eachAngle;
        this.changeAngleto(angle);
    }
}