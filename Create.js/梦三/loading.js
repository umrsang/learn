(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes
lib.webFontTxtFilters = {}; 

// library properties:
lib.properties = {
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
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



(lib.ic_reload_1 = function() {
	this.spriteSheet = ss["loading_atlas_P_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.ic_reload_2 = function() {
	this.spriteSheet = ss["loading_atlas_P_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.ld = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.ic_reload_1();

	this.instance_1 = new lib.ic_reload_2();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},5).wait(5));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,68,62);


(lib.d = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAAAYQgJAAgHgHQgHgHAAgKQgBgJAHgIIABAAQAHgHAJABQAKAAAHAGQAHAIAAAJQABAKgIAHIAAAAQgHAHgKAAIAAAAgAAAgNQgFAAgEADIgBABQgDAEAAAFQgBAGAEAEQAFAFAFgBQAGAAAEgEIAAAAQAEgEAAgGQABgFgFgFQgEgDgGAAIAAAAg");
	this.shape.setTransform(2.5,2.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAKQgEgEABgGQAAgFADgEIABgBQAEgDAFAAQAGgBAEAEQAFAFgBAFQAAAGgEAEIAAAAQgEAEgGAAIAAABQgFAAgFgFg");
	this.shape_1.setTransform(2.5,2.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,5,5);


(lib.ddd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 6
	this.instance = new lib.d();
	this.instance.setTransform(43.5,2.5,1,1,0,0,0,2.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({y:-1.5},0).wait(4).to({y:2.5},0).wait(7));

	// 5
	this.instance_1 = new lib.d();
	this.instance_1.setTransform(35.3,2.5,1,1,0,0,0,2.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(20).to({y:-1.5},0).wait(4).to({y:2.5},0).wait(11));

	// 4
	this.instance_2 = new lib.d();
	this.instance_2.setTransform(27.1,2.5,1,1,0,0,0,2.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(16).to({y:-1.5},0).wait(4).to({y:2.5},0).wait(15));

	// 3
	this.instance_3 = new lib.d();
	this.instance_3.setTransform(18.9,2.5,1,1,0,0,0,2.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(12).to({y:-1.5},0).wait(4).to({y:2.5},0).wait(19));

	// 2
	this.instance_4 = new lib.d();
	this.instance_4.setTransform(10.7,2.5,1,1,0,0,0,2.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(8).to({y:-1.5},0).wait(4).to({y:2.5},0).wait(23));

	// 1
	this.instance_5 = new lib.d();
	this.instance_5.setTransform(2.5,2.5,1,1,0,0,0,2.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(4).to({y:-1.5},0).wait(4).to({y:2.5},0).wait(27));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,46,5);


(lib.loadingViewAssets = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.ld();
	this.instance.setTransform(0,-1,1,1,0,0,0,34,31);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层 2
	this.instance_1 = new lib.ddd();
	this.instance_1.setTransform(-19.4,46,1,1,0,0,0,2.5,2.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-34,-32,68,80.5);


// stage content:
(lib.loading = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.loadingViewAssets();
	this.instance.setTransform(372,255.3,1,1,0,0,0,130.5,95);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(482.5,328.3,68,80.4);

})(loadlib = loadlib||{}, loadimages = loadimages||{}, createjs = createjs||{}, ss = ss||{});
var loadlib, loadimages, createjs, ss;