(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtFilters = {}; 

// library properties:
lib.properties = {
	width: 750,
	height: 1206,
	fps: 24,
	color: "#666666",
	webfonts: {},
	manifest: []
};



lib.webfontAvailable = function(family) { 
	lib.properties.webfonts[family] = true;
	var txtFilters = lib.webFontTxtFilters && lib.webFontTxtFilters[family] || [];
	for(var f = 0; f < txtFilters.length; ++f) {
		txtFilters[f].updateCache();
	}
};
// symbols:



(lib._002 = function() {
	this.spriteSheet = ss["assets_atlas_NP_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._005 = function() {
	this.spriteSheet = ss["assets_atlas_NP_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.anniu = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.arrow = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.back0 = function() {
	this.spriteSheet = ss["assets_atlas_NP_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.back3 = function() {
	this.spriteSheet = ss["assets_atlas_NP_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.back4 = function() {
	this.spriteSheet = ss["assets_atlas_NP_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.BG = function() {
	this.spriteSheet = ss["assets_atlas_NP_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.cao2 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.diqiu = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.DJS1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.DJS2 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.DJS3 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.DJS4 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.DJS5 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.DJSG = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.guang = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.hengxian = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.jiantou = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.P6 = function() {
	this.spriteSheet = ss["assets_atlas_NP_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.quan = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.shanguang = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.suipian = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.suipian_1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.suipian_2 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.suizhi = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.SYSTEMREGENERATING拷贝 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.xian1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.xian1_1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.xian2 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.xian2_1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.xian3 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.xian4 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.xianka = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.xianka_1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.xianka_2 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.xiongmao = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.xiongmao_1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.xiongmao_2 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.xiongmao_3 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.xiongmao_4 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.xiongmao_5 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.yuanquan = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.zi1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.zi1_1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.zi1_2 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.zi1_3 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.zi1_4 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.zi1_5 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.zi2 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.zi2_1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.zi2_2 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.zi2_3 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.zi2_4 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.zi2_5 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.zi3 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.zi3_1 = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.zziig = function() {
	this.spriteSheet = ss["assets_atlas_P_"];
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.p6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.P6();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.zi3_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.zi3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,461,46);


(lib.zi2_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.zi2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,343,56);


(lib.zi1_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.zi1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,280,56);


(lib.xiongmao_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.xiongmao();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,393,638);


(lib.suipian_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.suipian();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,472,330);


(lib.jiantou_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.jiantou();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,110,110);


(lib.guang_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.guang();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,249,121);


(lib.BG_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._005();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.anniu_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.anniu();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,73,73);


(lib.zi2_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_1 = new lib.zi2_1();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,29,294);


(lib.zi1_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_1 = new lib.zi1_1();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,28,446);


(lib.zi2_8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_2 = new lib.zi2_5();

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,30,446);


(lib.zi1_8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_2 = new lib.zi1_5();

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,29,446);


(lib.xiongmao_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_1 = new lib.xiongmao_5();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,374,628);


(lib.xianka_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.xianka_2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,507,508);


(lib.shanguang_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.shanguang();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,178,167);


(lib.cao2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.cao2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,511,412);


(lib.zi2_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_3 = new lib.zi2_2();

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,29,447);


(lib.zi1_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_3 = new lib.zi1_2();

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,30,395);


(lib.yuanquan_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.yuanquan();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,628,636);


(lib.xiongmao_8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_2 = new lib.xiongmao_2();

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,571,958);


(lib.xianka_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_1 = new lib.xianka();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,440,371);


(lib.SYSTEMREGENERATING11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.SYSTEMREGENERATING拷贝();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,725,112);


(lib.hengxian_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.hengxian();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,632,8);


(lib.xiongmao_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_3 = new lib.xiongmao_1();

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,506,635);


(lib.xing = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.Bitmap1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,91,89);


(lib.xian2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.xian2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,291,528);


(lib.xian1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.xian1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,678,783);


(lib.suipian_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_1 = new lib.suipian_1();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,724,524);


(lib.sgshh = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.zziig();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,615,193);


(lib.zi3_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_1 = new lib.zi3_1();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,48,226);


(lib.zi2_10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_4 = new lib.zi2_3();

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,30,539);


(lib.zi1_10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_4 = new lib.zi1_3();

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,29,498);


(lib.xiongmao_10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_4 = new lib.xiongmao_3();

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,658,884);


(lib.xianka_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_2 = new lib.xianka_1();

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,399,373);


(lib.suizhi_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.suizhi();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,428,570);


(lib.quan_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.quan();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,505,266);


(lib.mc1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.arrow();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,80,80);


(lib.zi2_11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_5 = new lib.zi2_4();

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,28,243);


(lib.zi1_11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_5 = new lib.zi1_4();

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,30,344);


(lib.xiongmao_11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_5 = new lib.xiongmao_4();

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,456,590);


(lib.xian4_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.xian4();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1118);


(lib.xian3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.xian3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,688,846);


(lib.xian2_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_1 = new lib.xian2_1();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,703,991);


(lib.xian1_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_1 = new lib.xian1_1();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,287,494);


(lib.suipian_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_2 = new lib.suipian_2();

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,294,448);


(lib.DJSg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.DJSG();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75,75);


(lib.diqiu_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.diqiu();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib.BG_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance_1 = new lib.BG();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.back4_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.back4();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.back3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.back3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.back1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._002();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.back0_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.back0();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib._5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.DJS5();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75,75);


(lib._4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.DJS4();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75,75);


(lib._3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.DJS3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75,75);


(lib._2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.DJS2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75,75);


(lib._1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.DJS1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75,75);


(lib.xiankamc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// shanguang
	this.instance = new lib.shanguang_1();
	this.instance.setTransform(289,279.5,0.843,0.843,0,0,0,89,83.4);
	this.instance.alpha = 0.602;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:83.5,scaleX:1.29,scaleY:1.29,alpha:1},24).to({regY:83.4,scaleX:0.84,scaleY:0.84,alpha:0.602},25).wait(1));

	// xianka
	this.instance_1 = new lib.xianka_3();
	this.instance_1.setTransform(253.5,254,1,1,0,0,0,253.5,254);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,507,508);


(lib.xx = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.xing();
	this.instance.setTransform(43.5,42.5,0.1,0.1,0,0,0,43.5,42.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.5,scaleY:1.5},29).to({scaleX:0.1,scaleY:0.1},30).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(39.2,38.3,9.1,8.9);


(lib.sdhgh = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.jiantou_1();
	this.instance.setTransform(55,55,1,1,0,0,0,55,55);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:99},19,cjs.Ease.get(1)).to({y:55},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,110,110);


(lib.quanquan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.quan_1();
	this.instance.setTransform(252.5,133,1,1,0,0,0,252.5,133);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.33,scaleY:1.33,alpha:0},24).to({_off:true},1).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,505,266);


(lib.jinggao = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.zi3_3();
	this.instance.setTransform(24,113,1,1,0,0,0,24,113);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},14).wait(16));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,48,226);


(lib.xiong = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.xiongmao_11();
	this.instance.setTransform(228,295,1,1,0,0,0,228,295);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:339},39,cjs.Ease.get(0.2)).to({y:295},40,cjs.Ease.get(0.2)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,456,590);


(lib.fgsuyh = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(40));

	// 图层 1
	this.instance = new lib.guang_1();
	this.instance.setTransform(7.5,9.6,1,1,0,0,0,7.5,9.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:10.5},19,cjs.Ease.get(1)).to({rotation:0},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,249,121);


(lib.arrow_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.mc1();
	this.instance.setTransform(40,40,1,1,0,0,0,40,40);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:89},19,cjs.Ease.get(1)).to({y:40},20).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,80,80);


(lib.home = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_99 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(99).call(this.frame_99).wait(1));

	// arr
	this.arrow = new lib.arrow_1();
	this.arrow.setTransform(381,1110,1,1,0,0,0,40,40);

	this.timeline.addTween(cjs.Tween.get(this.arrow).wait(100));

	// zi1
	this.instance = new lib.zi1_11();
	this.instance.setTransform(112,789,1,1,0,0,0,15,172);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(44).to({_off:false},0).to({y:707,alpha:1},50,cjs.Ease.get(1)).wait(6));

	// zi2
	this.instance_1 = new lib.zi2_11();
	this.instance_1.setTransform(614,279.5,1,1,0,0,0,14,121.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).to({_off:false},0).to({y:411.5,alpha:1},45,cjs.Ease.get(1)).wait(51));

	// xian4
	this.instance_2 = new lib.xian4_1();
	this.instance_2.setTransform(375,559,1,1,0,0,0,375,559);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(24).to({_off:false},0).to({alpha:1},50,cjs.Ease.get(1)).wait(26));

	// xian3
	this.instance_3 = new lib.xian3_1();
	this.instance_3.setTransform(406,497,1,1,0,0,0,344,423);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(39).to({_off:false},0).to({y:423,alpha:1},30,cjs.Ease.get(1)).wait(31));

	// suipian
	this.instance_4 = new lib.suipian_5();
	this.instance_4.setTransform(377,463,1,1,0,0,0,147,224);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(34).to({_off:false},0).to({y:421,alpha:1},15,cjs.Ease.get(1)).wait(51));

	// xiongmao
	this.instance_5 = new lib.xiongmao_11();
	this.instance_5.setTransform(378,809,1,1,0,0,0,228,295);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.instance_6 = new lib.xiong();
	this.instance_6.setTransform(378,689,1,1,0,0,0,228,295);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5}]},39).to({state:[{t:this.instance_5}]},59).to({state:[{t:this.instance_6}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(39).to({_off:false},0).to({y:689,alpha:1},59,cjs.Ease.get(1)).to({_off:true},1).wait(1));

	// xian2
	this.instance_7 = new lib.xian2_3();
	this.instance_7.setTransform(392.5,495.5,1,1,0,0,0,351.5,495.5);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(24).to({_off:false},0).to({alpha:1},20).wait(56));

	// xian1
	this.instance_8 = new lib.xian1_3();
	this.instance_8.setTransform(173.6,473,1,1,0,0,0,143.5,247);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(14).to({_off:false},0).to({x:143.5,y:423,alpha:1},25,cjs.Ease.get(1)).wait(61));

	// BG
	this.instance_9 = new lib.back0_1();
	this.instance_9.setTransform(375,620,1,1,0,0,0,375,620);
	this.instance_9.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({alpha:1},12).wait(88));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.DJS = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// DJS-1.png
	this.instance = new lib._1();
	this.instance.setTransform(38.5,37.5,0.1,0.1,0,0,0,37.5,37.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(99).to({_off:false},0).to({scaleX:1.2,scaleY:1.2},2).to({scaleX:1,scaleY:1},3).wait(16));

	// DJS-2.png
	this.instance_1 = new lib._2();
	this.instance_1.setTransform(38.5,37.5,0.1,0.1,0,0,0,37.5,37.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(74).to({_off:false},0).to({scaleX:1.2,scaleY:1.2},2).to({scaleX:1,scaleY:1},3).to({_off:true},20).wait(21));

	// DJS-3.png
	this.instance_2 = new lib._3();
	this.instance_2.setTransform(38.5,37.5,0.1,0.1,0,0,0,37.5,37.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(49).to({_off:false},0).to({scaleX:1.2,scaleY:1.2},2).to({scaleX:1,scaleY:1},3).to({_off:true},20).wait(46));

	// DJS-4.png
	this.instance_3 = new lib._4();
	this.instance_3.setTransform(38.5,37.5,0.1,0.1,0,0,0,37.5,37.5);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(24).to({_off:false},0).to({scaleX:1.2,scaleY:1.2,x:38.6},2).to({scaleX:1,scaleY:1,x:38.5},3).to({_off:true},20).wait(71));

	// DJS-5.png
	this.instance_4 = new lib._5();
	this.instance_4.setTransform(37.5,37.5,0.1,0.1,0,0,0,37.5,37.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({scaleX:1.2,scaleY:1.2},2).to({scaleX:1,scaleY:1},3).to({_off:true},19).wait(96));

	// DJS-g
	this.instance_5 = new lib.DJSg();
	this.instance_5.setTransform(37.5,37.5,1,1,0,0,0,37.5,37.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({rotation:1800},119).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,75,75);


(lib.p5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_49 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(49).call(this.frame_49).wait(1));

	// jiantou
	this.instance = new lib.sdhgh();
	this.instance.setTransform(377,1106,1,1,0,0,0,55,55);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50));

	// zi3
	this.instance_1 = new lib.zi3_2();
	this.instance_1.setTransform(280.5,131,1,1,0,0,0,230.5,23);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(29).to({_off:false},0).to({y:199,alpha:1},10,cjs.Ease.get(1)).wait(11));

	// zi2
	this.instance_2 = new lib.zi2_6();
	this.instance_2.setTransform(532.5,42,1,1,0,0,0,171.5,28);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(24).to({_off:false},0).to({y:110,alpha:1},10,cjs.Ease.get(1)).wait(16));

	// zi1
	this.instance_3 = new lib.zi1_6();
	this.instance_3.setTransform(188,40,1,1,0,0,0,140,28);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},0).to({y:110,alpha:1},10,cjs.Ease.get(1)).wait(21));

	// guang
	this.instance_4 = new lib.fgsuyh();
	this.instance_4.setTransform(375.5,515.5,1,1,0,0,0,124.5,60.5);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({_off:false},0).to({alpha:1},10).wait(31));

	// xiongmao
	this.instance_5 = new lib.xiongmao_6();
	this.instance_5.setTransform(381.5,638,1,1,0,0,0,196.5,319);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({_off:false},0).to({y:558,alpha:1},18,cjs.Ease.get(1)).wait(31));

	// anniu
	this.btn = new lib.anniu_1();
	this.btn.setTransform(180.5,689.5,0.1,0.1,0,0,0,36.5,36.5);

	this.timeline.addTween(cjs.Tween.get(this.btn).wait(38).to({scaleX:1.5,scaleY:1.5},3).to({scaleX:0.8,scaleY:0.8},4).to({scaleX:1,scaleY:1},4).wait(1));

	// suipian
	this.instance_6 = new lib.suipian_3();
	this.instance_6.setTransform(373,514,1,1,0,0,0,236,165);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(9).to({_off:false},0).to({y:454,alpha:1},15,cjs.Ease.get(1)).wait(26));

	// tuxing
	this.instance_7 = new lib.sgshh();
	this.instance_7.setTransform(385,987.5,1,1,0,0,0,307.5,96.5);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(34).to({_off:false},0).to({y:913.5,alpha:1},10,cjs.Ease.get(1)).wait(6));

	// BG
	this.instance_8 = new lib.BG_1();
	this.instance_8.setTransform(375,603,1,1,0,0,0,375,603);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(50));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.p4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_49 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(49).call(this.frame_49).wait(1));

	// a
	this.arrow = new lib.arrow_1();
	this.arrow.setTransform(381,1110,1,1,0,0,0,40,40);

	this.timeline.addTween(cjs.Tween.get(this.arrow).wait(50));

	// zi1
	this.instance = new lib.zi1_9();
	this.instance.setTransform(68,644.5,1,1,0,0,0,15,197.5);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({_off:false},0).to({y:596.5,alpha:1},25,cjs.Ease.get(1)).wait(16));

	// zi2
	this.instance_1 = new lib.zi2_9();
	this.instance_1.setTransform(684.5,383.5,1,1,0,0,0,14.5,223.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).to({_off:false},0).to({y:445.5,alpha:1},25,cjs.Ease.get(1)).wait(21));

	// SYSTEM REGENERATING 拷贝
	this.instance_2 = new lib.SYSTEMREGENERATING11();
	this.instance_2.setTransform(380.5,914,1,1,0,0,0,362.5,56);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19).to({_off:false},0).to({y:888,alpha:1},30,cjs.Ease.get(1)).wait(1));

	// hengxian
	this.instance_3 = new lib.hengxian_1();
	this.instance_3.setTransform(387,918,0.005,1,0,0,0,316.5,4);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(14).to({_off:false},0).to({regX:316,scaleX:1},20,cjs.Ease.get(1)).wait(16));

	// xianka
	this.instance_4 = new lib.xianka_4();
	this.instance_4.setTransform(377,785.5,1,1,0,0,0,220,185.5);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({_off:false},0).to({y:733.5,alpha:1},30,cjs.Ease.get(1)).wait(11));

	// xiongmao
	this.instance_5 = new lib.xiongmao_8();
	this.instance_5.setTransform(369.5,681,1,1,0,0,0,285.5,479);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(14).to({_off:false},0).to({y:659,alpha:1},30).wait(6));

	// yuanquan
	this.instance_6 = new lib.yuanquan_1();
	this.instance_6.setTransform(378,895,1,1,0,0,0,314,318);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1).to({_off:false},0).to({y:799,alpha:1},13,cjs.Ease.get(1)).wait(36));

	// BG
	this.instance_7 = new lib.back4_1();
	this.instance_7.setTransform(375,603,1,1,0,0,0,375,603);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(50));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.p3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_49 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(49).call(this.frame_49).wait(1));

	// arr
	this.arrow = new lib.arrow_1();
	this.arrow.setTransform(381,1110,1,1,0,0,0,40,40);

	this.timeline.addTween(cjs.Tween.get(this.arrow).wait(50));

	// zi3
	this.instance = new lib.jinggao();
	this.instance.setTransform(174,342,1,1,0,0,0,24,113);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(44).to({_off:false},0).wait(6));

	// zi2
	this.instance_1 = new lib.zi2_10();
	this.instance_1.setTransform(97,705.5,1,1,0,0,0,15,269.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(24).to({_off:false},0).to({y:653.5,alpha:1},25,cjs.Ease.get(1)).wait(1));

	// zi1
	this.instance_2 = new lib.zi1_10();
	this.instance_2.setTransform(666.5,481,1,1,0,0,0,14.5,249);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({y:407,alpha:1},30,cjs.Ease.get(1)).wait(6));

	// suizhi
	this.instance_3 = new lib.suizhi_1();
	this.instance_3.setTransform(404,541,1,1,0,0,0,214,285);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},0).to({x:409,y:518,alpha:1},30,cjs.Ease.get(1)).wait(1));

	// xiongmao
	this.instance_4 = new lib.xiongmao_10();
	this.instance_4.setTransform(482,538,1,1,0,0,0,329,442);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(14).to({_off:false},0).to({x:445,y:586,alpha:1},30,cjs.Ease.get(1)).wait(6));

	// xianka
	this.instance_5 = new lib.xianka_5();
	this.instance_5.setTransform(368.5,960.5,1,1,0,0,0,199.5,186.5);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(7).to({_off:false},0).to({y:884.5,alpha:1},32,cjs.Ease.get(1)).wait(11));

	// quanquan
	this.instance_6 = new lib.quanquan();
	this.instance_6.setTransform(363.5,953,1,1,0,0,0,252.5,133);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(17).to({_off:false},0).wait(33));

	// quan
	this.instance_7 = new lib.quan_1();
	this.instance_7.setTransform(363.5,1029,1,1,0,0,0,252.5,133);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({y:953,alpha:1},19,cjs.Ease.get(1)).wait(31));

	// BG
	this.instance_8 = new lib.back3_1();
	this.instance_8.setTransform(376.5,622,1,1,0,0,0,376.5,622);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(50));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.p2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_49 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(49).call(this.frame_49).wait(1));

	// arr
	this.arrow = new lib.arrow_1();
	this.arrow.setTransform(381,1110,1,1,0,0,0,40,40);

	this.timeline.addTween(cjs.Tween.get(this.arrow).wait(50));

	// zi2
	this.instance = new lib.zi2_8();
	this.instance.setTransform(640,647,1,1,0,0,0,15,223);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({_off:false},0).to({y:511,alpha:1},30,cjs.Ease.get(1)).wait(1));

	// zi1
	this.instance_1 = new lib.zi1_8();
	this.instance_1.setTransform(717.5,495,1,1,0,0,0,14.5,223);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).to({y:359,alpha:1},33,cjs.Ease.get(1)).wait(16));

	// cao2
	this.instance_2 = new lib.cao2_1();
	this.instance_2.setTransform(494.5,1074,1,1,0,0,0,255.5,206);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).to({y:1000,alpha:1},18,cjs.Ease.get(1)).wait(31));

	// xiongmao
	this.instance_3 = new lib.xiongmao_7();
	this.instance_3.setTransform(109,236,1,1,0,0,0,187,314);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},0).to({x:187,y:314,alpha:1},30,cjs.Ease.get(1)).wait(1));

	// xianka
	this.instance_4 = new lib.xiankamc();
	this.instance_4.setTransform(489.5,941,1,1,0,0,0,253.5,254);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({_off:false},0).to({x:457.5,y:815,alpha:1},35).wait(6));

	// BG
	this.instance_5 = new lib.back1();
	this.instance_5.setTransform(375,603,1,1,0,0,0,375,603);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(50));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


(lib.p1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.stop();
	}
	this.frame_49 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(49).call(this.frame_49).wait(1));

	// arrow
	this.arrow = new lib.arrow_1();
	this.arrow.setTransform(381,1110,1,1,0,0,0,40,40);

	this.timeline.addTween(cjs.Tween.get(this.arrow).wait(50));

	// xing
	this.instance = new lib.xx();
	this.instance.setTransform(264.5,741.5,1,1,0,0,0,45.5,44.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({_off:false},0).wait(36));

	// zi2
	this.instance_1 = new lib.zi2_7();
	this.instance_1.setTransform(428.5,1004,1,1,0,0,0,14.5,147);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(19).to({_off:false},0).to({y:896,alpha:1},30,cjs.Ease.get(1)).wait(1));

	// zi1
	this.instance_2 = new lib.zi1_7();
	this.instance_2.setTransform(499,857,1,1,0,0,0,14,223);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).to({y:767,alpha:1},38,cjs.Ease.get(1)).wait(11));

	// xian2
	this.instance_3 = new lib.xian2_2();
	this.instance_3.setTransform(198.5,720,1,1,0,0,0,145.5,264);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({_off:false},0).to({y:668,alpha:1},15,cjs.Ease.get(1)).wait(31));

	// diqiu
	this.instance_4 = new lib.diqiu_1();
	this.instance_4.setTransform(206,817,1,1,0,0,0,120,120);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({_off:false},0).to({y:761,alpha:1},13,cjs.Ease.get(1)).wait(36));

	// xiongmao
	this.instance_5 = new lib.xiongmao_9();
	this.instance_5.setTransform(435,467.5,1,1,0,0,0,253,317.5);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(9).to({_off:false},0).to({x:485,y:397.5,alpha:1},30,cjs.Ease.get(1)).wait(11));

	// suipian
	this.instance_6 = new lib.suipian_4();
	this.instance_6.setTransform(326,666,1,1,0,0,0,362,262);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(15).to({_off:false},0).to({x:388,y:601,alpha:1},29,cjs.Ease.get(1)).wait(6));

	// xian1
	this.instance_7 = new lib.xian1_2();
	this.instance_7.setTransform(341,552.5,1,1,0,0,0,339,391.5);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(9).to({_off:false},0).to({x:369,y:518.5,alpha:1},15,cjs.Ease.get(1)).wait(26));

	// BG
	this.instance_8 = new lib.BG_2();
	this.instance_8.setTransform(375,603,1,1,0,0,0,375,603);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(50));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,750,1206);


// stage content:
(lib.assets = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.DJS();
	this.instance.setTransform(375.1,576.2,1,1,0,0,0,37.5,37.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(712.6,1141.7,75,75);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;