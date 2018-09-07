window.onload = function () {
    main = new Main();
}

function Main() {
    var cvs = document.getElementById("cvs");
    this.renderer = new PIXI.autoDetectRenderer({
        view: cvs,
        width: 512,
        height: 384,
        backgroundColor: 0x1099bb
    });
    this.stage = new PIXI.Container();

    this.loadSpriteSheet();
}
Main.SCROLL_SPEED = 5;

Main.prototype.update = function () {
    this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

function Far() {
    var texture = PIXI.Texture.fromImage("../../img/bg-far.png");
    PIXI.extras.TilingSprite.call(this, texture, 512, 256);

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
Far.DELTA_X = 0.128;
Far.prototype.setViewportX = function (newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
};

function Mid() {
    var texture = PIXI.Texture.fromImage("../../img/bg-mid.png");
    PIXI.extras.TilingSprite.call(this, texture, 512, 256);

    this.position.x = 0;
    this.position.y = 128;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
Mid.DELTA_X = 0.64;
Mid.prototype.setViewportX = function (newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
};

function Scroller(stage) {
    this.far = new Far();
    stage.addChild(this.far);

    this.mid = new Mid();
    stage.addChild(this.mid);

    this.front = new Walls();
    stage.addChild(this.front);
  
    this.viewportX = 0;
}

Scroller.prototype.setViewportX = function (viewportX) {
    this.viewportX = viewportX;
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
    this.front.setViewportX(viewportX);
};
Scroller.prototype.getViewportX = function () {
    return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function (units) {
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);

};

Main.prototype.loadSpriteSheet = function () {
    var loader = PIXI.loader;
    loader.add("wall", "../../img/wall.json");
    loader.add("bg-mid", "../../img/bg-mid.png");
    loader.add("bg-far", "../../img/bg-far.png");
    loader.once("complete", this.spriteSheetLoaded.bind(this));
    loader.load();
}

Main.prototype.spriteSheetLoaded = function () {
    this.scroller = new Scroller(this.stage);
    requestAnimationFrame(this.update.bind(this));

    this.pool = new WallSpritesPool();
    this.wallSlices = [];
}

Main.prototype.borrowWallSprites = function (num) {
    for (var i = 0; i < num; i++) {

        if (i % 2 == 0) {
            var sprite = this.pool.borrowWindow();
        } else {
            var sprite = this.pool.borrowDecoration();
        }

        sprite.position.x = -32 + (i * 64);
        sprite.position.y = 128;

        this.wallSlices.push(sprite);

        this.stage.addChild(sprite);
    }
};

Main.prototype.returnWallSprites = function () {
    for (var i = 0; i < this.wallSlices.length; i++) {
        var sprite = this.wallSlices[i];
        this.stage.removeChild(sprite);

        if (i % 2 == 0) {
            this.pool.returnWindow(sprite);
        } else {
            this.pool.returnDecoration(sprite);
        }
    }

    this.wallSlices = [];
};

Main.prototype.generateTestWallSpan = function () {
    var lookupTable = [
        this.pool.borrowFrontEdge, // 1st slice
        this.pool.borrowWindow, // 2nd slice
        this.pool.borrowDecoration, // 3rd slice
        this.pool.borrowWindow, // 4th slice
        this.pool.borrowDecoration, // 5th slice
        this.pool.borrowWindow, // 6th slice
        this.pool.borrowBackEdge // 7th slice
    ];

    for (var i = 0; i < lookupTable.length; i++) {
        var func = lookupTable[i];

        var sprite = func.call(this.pool);
        sprite.position.x = 32 + (i * 64);
        sprite.position.y = 128;

        this.wallSlices.push(sprite);

        this.stage.addChild(sprite);
    }
}

Main.prototype.clearTestWallSpan = function () {
    var lookupTable = [
        this.pool.returnFrontEdge, // 1st slice
        this.pool.returnWindow, // 2nd slice
        this.pool.returnDecoration, // 3rd slice
        this.pool.returnStep, // 4th slice
        this.pool.returnWindow, // 5th slice
        this.pool.returnBackEdge // 6th slice
    ];

    for (var i = 0; i < lookupTable.length; i++) {
        var func = lookupTable[i];
        var sprite = this.wallSlices[i];

        this.stage.removeChild(sprite);
        func.call(this.pool, sprite);
    }

    this.wallSlices = [];
};

Main.prototype.generateTestWallSpan = function () {
    var lookupTable = [
        this.pool.borrowFrontEdge, // 1st slice
        this.pool.borrowWindow, // 2nd slice
        this.pool.borrowDecoration, // 3rd slice
        this.pool.borrowStep, // 4th slice
        this.pool.borrowWindow, // 5th slice
        this.pool.borrowBackEdge // 6th slice
    ];

    var yPos = [
        128, // 1st slice
        128, // 2nd slice
        128, // 3rd slice
        192, // 4th slice
        192, // 5th slice
        192 // 6th slice
    ];

    for (var i = 0; i < lookupTable.length; i++) {
        var func = lookupTable[i];

        var sprite = func.call(this.pool);
        sprite.position.x = 64 + (i * 64);
        sprite.position.y = yPos[i];

        this.wallSlices.push(sprite);

        this.stage.addChild(sprite);
    }
};