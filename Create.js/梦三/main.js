//main.js
var canvas, stage, model, modelData, container, loadingView, tweenLength, viewList, currentView, moveView, homeView, contentView1, contentView2, contentView3, contentView4, contentView5, contentView6, stageWidth, stageHeight, codepic, stageScale;
var isloadInit = false;
model = new createjs.EventDispatcher();
modelData = {};
stageWidth = document.documentElement.clientWidth;
stageHeight = document.documentElement.clientHeight;
stageScale = stageWidth / (750 / 2);
canvas = document.getElementById("mainView");
codepic = document.getElementById("codepic");
if (stageWidth / stageHeight > 0.665) {
    stageScale = stageHeight / (1206 / 2);
    canvas.style.left = (stageWidth - 750 / 2 * stageScale) / 2 + 'px';
    codepic.style.left = (stageWidth - 750 / 2 * stageScale) / 2 + 'px';
} else {
    stageScale = stageWidth / (750 / 2);
    canvas.style.left = '0px';
    codepic.style.left = '0px';
}
canvas.style.width = 750 / 2 * stageScale + 'px';
canvas.style.height = 1206 / 2 * stageScale + 'px';

codepic.style.top = 838 / 2 * stageScale + 'px';
codepic.style.width = 750 / 2 * stageScale + 'px';
codepic.style.height = 277 / 2 * stageScale + 'px';

function init() {
    stage = new createjs.Stage(canvas);
    controlInit()
    //    loadingComplete();
    container = new createjs.Container();
    stage.addChild(container);
    createjs.Touch.enable(stage);

    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", loadLoadingComplete);
    loader.loadFile({
        src: "images/loading_atlas_P_.json",
        type: "spritesheet",
        id: "loading_atlas_P_"
    }, true);
    loader.loadManifest(loadlib.properties.manifest);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stageBreakHandler);

}

function handleFileLoad(evt) {
    if (evt.item.type == "image") {
        images[evt.item.id] = evt.result;
    }
}

function loadLoadingComplete(event) {
    event.currentTarget.removeEventListener("fileload", handleFileLoad);
    event.currentTarget.removeEventListener("complete", loadLoadingComplete);
    var queue = event.target;
    ss["loading_atlas_P_"] = queue.getResult("loading_atlas_P_");
    loadingView = new View.LoadingView();
    stage.addChild(loadingView);
    var loader = new createjs.LoadQueue(true);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("progress", loadProgressHandler);
    loader.addEventListener("complete", loadCompleteHandler);
    loader.loadFile({
        src: "images/assets_atlas_P_.json",
        type: "spritesheet",
        id: "assets_atlas_P_"
    }, true);
    loader.loadFile({
        src: "images/assets_atlas_NP_.json",
        type: "spritesheet",
        id: "assets_atlas_NP_"
    }, true);
    loader.loadManifest(lib.properties.manifest);
    isloadInit = true;

}

function loadProgressHandler(event) {

}

function loadCompleteHandler(event) {
    event.currentTarget.removeEventListener("fileload", handleFileLoad);
    event.currentTarget.removeEventListener("progress", loadProgressHandler);
    event.currentTarget.removeEventListener("complete", loadCompleteHandler);
    var queue = event.target;
    ss["assets_atlas_P_"] = queue.getResult("assets_atlas_P_");
    ss["assets_atlas_NP_"] = queue.getResult("assets_atlas_NP_");
    if (loadingView.parent) loadingView.parent.removeChild(loadingView);

    homeView = new View.HomeView();
    container.addChild(homeView);
    homeView.back.gotoAndPlay(1);
    currentView = homeView;

    //    倒计时请解开这里到console.log(viewList)的所有注释
    var myDate = new Date();
    console.log(myDate.getTime());

    var targetDate = new Date();
    targetDate.setYear(2016);
    targetDate.setMonth(4);
    targetDate.setDate(1);
    targetDate.setHours(1);
    targetDate.setMinutes(0);
    targetDate.setSeconds(0);
    console.log(targetDate.getTime());
    console.log(targetDate.toLocaleDateString(), targetDate.toLocaleTimeString());

    var date3 = targetDate.getTime() - myDate.getTime() //时间差的毫秒数

    var hours = Math.floor(date3 / (3600 * 1000));

    console.log(hours);
    tweenLength = 1;
    viewList = [];

    if (hours <= 1) {
        contentView6 = new View.ContentView6();
        contentView5 = new View.ContentView5();
        tweenLength++;
        viewList.unshift(contentView6);
        viewList.unshift(contentView5);
    }
    if (hours <= 24) {
        contentView4 = new View.ContentView4();
        tweenLength++;
        viewList.unshift(contentView4);
    }
    if (hours <= 48) {
        contentView3 = new View.ContentView3();
        tweenLength++;
        viewList.unshift(contentView3);
    }
    if (hours <= 72) {
        contentView2 = new View.ContentView2();
        tweenLength++;
        viewList.unshift(contentView2);
    }
    if (hours <= 96) {
        contentView1 = new View.ContentView1();
        tweenLength++;
        viewList.unshift(contentView1);
    }
    tweenLength++;
    viewList.unshift(homeView);
    console.log(viewList);


    //需要倒计时 请注释下面到 tweenLength = 9这句所有代码
    //    contentView1 = new View.ContentView1();
    //    contentView2 = new View.ContentView2();
    //    contentView3 = new View.ContentView3();
    //    contentView4 = new View.ContentView4();
    //    contentView5 = new View.ContentView5();
    //    contentView6 = new View.ContentView6();
    //
    //    viewList = [homeView,contentView1,contentView2,contentView3,contentView4,contentView5,contentView6];
    //    tweenLength = 8;

}

function stageBreakHandler(event) {
    if (stageWidth != document.documentElement.clientWidth || stageHeight != document.documentElement.clientHeight) {
        stageWidth = document.documentElement.clientWidth;
        stageHeight = document.documentElement.clientHeight;
        if (stageWidth / stageHeight > 0.665) {
            stageScale = stageHeight / (1206 / 2);
            canvas.style.left = (stageWidth - 750 / 2 * stageScale) / 2 + 'px';
            codepic.style.left = (stageWidth - 750 / 2 * stageScale) / 2 + 'px';
        } else {
            stageScale = stageWidth / (750 / 2);
            canvas.style.left = '0px';
            codepic.style.left = '0px';
        }

        canvas.style.width = 750 / 2 * stageScale + 'px';
        canvas.style.height = 1206 / 2 * stageScale + 'px';

        codepic.style.top = 838 / 2 * stageScale + 'px';
        codepic.style.width = 750 / 2 * stageScale + 'px';
        codepic.style.height = 277 / 2 * stageScale + 'px';
    }
    stage.update();
}
//View
var View = {};
View.index = 0;
View.isTween = false;
View.changeView = function changeView(arrow, index, force) {
    if (View.isTween) return;
    if (View.index == index) return;
    moveView = viewList[index];
    container.addChild(moveView);
    if (arrow = "down") {
        moveView.y = 1206;
        //        changeHandler(arrow);
        //        createjs.Tween.get(view).to({y:0},500);
        //        createjs.Tween.get(currentView).to({y:-stageHeight},500).call(delayComplete);
    } else {
        moveView.y = -1206;
        //        createjs.Tween.get(view).to({y:0},500);
        //        createjs.Tween.get(currentView).to({y:stageHeight},500).call(delayComplete);
    }
    View.changeHandler(arrow, index, force);
};
View.changeHandler = function changeHandler(arrow, index, force) {
    if ((index < 0 || index > tweenLength) && force != true) return;
    View.isTween = true;
    View.index = index;
    var bi;
    if (arrow == "down") {
        bi = Math.abs((1206 - Math.abs(currentView.y)) / 1206);
        //bi = Math.abs(currentView.y/stageHeight);
        createjs.Tween.get(moveView).to({
            y: 0
        }, 500 * bi);
        createjs.Tween.get(currentView).to({
            y: -1206
        }, 500 * bi).call(View.delayComplete);
    } else {

        bi = Math.abs((1206 - Math.abs(currentView.y)) / 1206);
        createjs.Tween.get(moveView).to({
            y: 0
        }, 500 * bi);
        createjs.Tween.get(currentView).to({
            y: 1206
        }, 500 * bi).call(View.delayComplete);
    }
    // console.log("currentView.y:" + currentView.y);
    View.bi = bi;
}
View.delayComplete = function delayComplete() {
    View.isTween = false;
    if (currentView.back.gotoAndStop) {
        currentView.back.gotoAndStop(0);
    }
    if (currentView.parent) {
        currentView.parent.removeChild(currentView)
    }
    currentView = viewList[View.index];
    if (currentView.back.gotoAndPlay) {
        currentView.back.gotoAndPlay(1);
    }
    View.codeHandler();
}
View.resumeHandler = function resumeHandler(arrow) {
    if (arrow == "down") {
        View.bi = Math.abs(currentView.y / 1206);
        createjs.Tween.get(currentView).to({
            y: 0
        }, 500 * View.bi);
        createjs.Tween.get(moveView).to({
            y: -1206
        }, 500 * View.bi).call(View.resumeComplete);
    } else {
        View.bi = Math.abs(currentView.y / 1206);
        createjs.Tween.get(currentView).to({
            y: 0
        }, 500 * View.bi);
        createjs.Tween.get(moveView).to({
            y: 1206
        }, 500 * View.bi).call(View.resumeComplete);
    }
};
View.resumeComplete = function resumeComplete() {
    if (moveView) {
        if (moveView.parent) moveView.parent.removeChild(moveView);
    }
};
View.codeHandler = function codeHandler() {
    if (codepic) {
        if (View.index == 6) {
            codepic.style.display = "block";
        } else {
            codepic.style.display = "none";
        }
    }
};
//LoadingView
(function () {
    "use strict";

    function LoadingView() {
        this.Container_constructor();

        this.back = new loadlib.loadingViewAssets();
        this.back.x = 375;
        this.back.y = 603;
        this.addChild(this.back);
    }
    var p = createjs.extend(LoadingView, createjs.Container);
    View.LoadingView = createjs.promote(LoadingView, "Container");
}());
//HomeView
(function () {
    "use strict";

    function HomeView() {
        this.Container_constructor();

        this.back = new lib.home();
        this.addChild(this.back);
    }
    var p = createjs.extend(HomeView, createjs.Container);
    View.HomeView = createjs.promote(HomeView, "Container");
}());
//ContentView1
(function () {
    "use strict";

    function ContentView1() {
        this.Container_constructor();

        this.back = new lib.p1();
        this.addChild(this.back);
    }
    var p = createjs.extend(ContentView1, createjs.Container);
    View.ContentView1 = createjs.promote(ContentView1, "Container");
}());
//ContentView2
(function () {
    "use strict";

    function ContentView2() {
        this.Container_constructor();

        this.back = new lib.p2();
        this.addChild(this.back);
        //        var _this = this;
        //        this.back.btn.addEventListener("mousedown",function (event){
        //            _this.back.play();
        //        })
    }
    var p = createjs.extend(ContentView2, createjs.Container);
    View.ContentView2 = createjs.promote(ContentView2, "Container");
}());
//ContentView3
(function () {
    "use strict";

    function ContentView3() {
        this.Container_constructor();

        this.back = new lib.p3();
        this.addChild(this.back);
        //        var _this = this;
        //        this.back.btn.addEventListener("mousedown",function (event){
        //            _this.back.play();
        //        })
    }
    var p = createjs.extend(ContentView3, createjs.Container);
    View.ContentView3 = createjs.promote(ContentView3, "Container");
}());
//ContentView4
(function () {
    "use strict";

    function ContentView4() {
        this.Container_constructor();

        this.back = new lib.p4();
        this.addChild(this.back);
        //        var _this = this;
        //        this.back.btn.addEventListener("mousedown",function (event){
        //            _this.back.play();
        //        })
    }
    var p = createjs.extend(ContentView4, createjs.Container);
    View.ContentView4 = createjs.promote(ContentView4, "Container");
}());
//ContentView5
(function () {
    "use strict";

    function ContentView5() {
        this.Container_constructor();

        this.back = new lib.p5();
        this.addChild(this.back);
        var _this = this;
        this.back.btn.addEventListener("mousedown", function (event) {
            window.open("http://v.youku.com/v_show/id_XMTU0NjY5MTA1Ng==.html?f=26967199&ev=1&from=y1.3-idx-uhome-1519-20887.205805-205902.1-1");
        })
    }
    var p = createjs.extend(ContentView5, createjs.Container);
    View.ContentView5 = createjs.promote(ContentView5, "Container");
}());
//ContentView6
(function () {
    "use strict";

    function ContentView6() {
        this.Container_constructor();

        this.back = new lib.p6();
        this.addChild(this.back);
        //        var _this = this;
        //        this.back.btn.addEventListener("mousedown",function (event){
        //            _this.back.play();
        //        })
    }
    var p = createjs.extend(ContentView6, createjs.Container);
    View.ContentView6 = createjs.promote(ContentView6, "Container");
}());
//control
function controlInit() {
    if (IsPC() == true) {
        mouseInit()
    } else {
        touchInit();
    }
}

function mouseInit() {
    var isMouseDown = false;
    var mx = 0;
    var my = 0;
    var cx = 0;
    var cy = 0;
    stage.addEventListener('stagemousedown', function (mouseEvent) {
        if (View.isTween) return;
        isMouseDown = true;
        mx = mouseEvent.rawX;
        my = mouseEvent.rawY;
        cx = container.x;
        cy = container.y;
        if (View.index == 6) {
            codepic.style.display = "none";
        }
    });

    var addX = 0;
    var addY = 0;

    stage.addEventListener('stagemousemove', function (mouseEvent) {
        if (View.isTween) return;
        if (isMouseDown == false) return;
        addX = mouseEvent.rawX - mx;
        addY = mouseEvent.rawY - my;
        mouseMoveHandler(addY);
    });

    stage.addEventListener('stagemouseup', function (mouseEvent) {
        if (View.isTween) return;
        var index = View.index;
        if (currentView.y > 0) {
            if (currentView.y > 100) {
                View.changeHandler("up", index - 1);
            } else {
                View.resumeHandler("down");
            }
        } else if (currentView.y < 0) {
            if (currentView.y < -100) {
                View.changeHandler("down", index + 1);
            } else {
                View.resumeHandler("up");
            }
        }
        isMouseDown = false;
    });



    function mouseMoveHandler(moveNum) {
        if (View.isTween) return;
        if (moveNum < 0) alertHandler();
        var index = View.index;
        if (index > tweenLength) return;
        var nn = 0;

        if (moveNum > 0 && index > 0) {
            moveView = viewList[index - 1];
            nn = -1206;
            if (!moveView.parent) {
                moveView.y = -1206;
                container.addChild(moveView);
            }
            if (moveView) {
                moveView.y = cy + moveNum + nn;
                currentView.y = cy + moveNum;
            }
        } else if (moveNum < 0 && index < tweenLength) {
            moveView = viewList[index + 1];
            nn = 1206
            if (moveView) {
                if (!moveView.parent) {
                    moveView.y = 1206;
                    container.addChild(moveView);
                }

                moveView.y = cy + moveNum + nn;
                currentView.y = cy + moveNum;
            }

        }

    }
}

function touchInit() {
    var mx = 0;
    var my = 0;
    var cx = 0;
    var cy = 0;
    canvas.addEventListener('touchstart', function (event) {
        if (View.isTween) return;

        event.preventDefault();
        var touch = event.targetTouches[0];
        mx = touch.pageX;
        my = touch.pageY;
        cx = container.x;
        cy = container.y;
        if (View.index == 6) {
            codepic.style.display = "none";
        }
    }, false);


    var addX = 0;
    var addY = 0;

    canvas.addEventListener('touchmove', function (event) {
        // 如果这个元素的位置内只有一个手指的话
        if (View.isTween) return;
        if (event.targetTouches.length == 1) {
            event.preventDefault(); // 阻止浏览器默认事件，重要
            var touch = event.targetTouches[0];
            // 把元素放在手指所在的位置

            addX = touch.pageX - mx;
            addY = touch.pageY - my;
            touchMoveHandler(addY);
        }
    }, false);

    canvas.addEventListener('touchend', function (event) {
        if (View.isTween) return;
        var index = View.index;
        if (currentView.y > 0) {
            if (currentView.y > 100) {
                View.changeHandler("up", index - 1);
            } else {
                View.resumeHandler("down");
            }
        } else if (currentView.y < 0) {
            if (currentView.y < -100) {
                View.changeHandler("down", index + 1);
            } else {
                View.resumeHandler("up");
            }
        }
    }, false);



    function touchMoveHandler(moveNum) {
        if (View.isTween) return;
        if (moveNum < 0) alertHandler();
        var index = View.index;
        if (index > tweenLength) return;
        var nn = 0;

        if (moveNum > 0 && index > 0) {
            moveView = viewList[index - 1];
            nn = -1206;
            if (!moveView.parent) {
                moveView.y = -1206;
                container.addChild(moveView);
            }
            if (moveView) {
                moveView.y = cy + moveNum + nn;
                currentView.y = cy + moveNum;
            }
        } else if (moveNum < 0 && index < tweenLength) {
            moveView = viewList[index + 1];
            nn = 1206
            if (moveView) {
                if (!moveView.parent) {
                    moveView.y = 1206;
                    container.addChild(moveView);
                }

                moveView.y = cy + moveNum + nn;
                currentView.y = cy + moveNum;
            }

        }

    }

}
var isalert = false;

function alertHandler() {
    if (isalert == true) return;
    setTimeout(function () {
        isalert = false
    }, 2000)
    isalert = true;
    if (View.index == 0 && tweenLength <= 2) {
        alert("漂浮中，明天再来看看吧~");
    } else if (View.index == 1 && tweenLength <= 3) {
        alert("接近光芒中，明天再来看看吧~");
    } else if (View.index == 2 && tweenLength <= 4) {
        alert(".听从召唤中，明天再来看看吧~");
    } else if (View.index == 3 && tweenLength <= 5) {
        alert("尝试开启中，明天再来看看吧~");
    } else if (View.index == 4 && tweenLength <= 6) {
        alert("系统重构中，明天再来看看吧~");
    }
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}