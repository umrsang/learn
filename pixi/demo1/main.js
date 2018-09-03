var viewW = 1080,
    viewH = 1920,
    app, cat, rocket;

function init() {
    app = new PIXI.Application({
        width: viewW,
        height: viewH,
        antialias: true,
        transparent: true
    });
    document.body.appendChild(app.view);

    PIXI.loader
        .add("catImage", "./img/cat.png")
        .add("rocketImage", "./img/09.png")
        .load(setup);
}

function setup() {
    addCat();
}

function addCat() {
    cat = new PIXI.Sprite(
        PIXI.loader.resources["catImage"].texture
    );
    cat.x = 300;
    cat.y = 300;
    cat.anchor.x = 0.5;
    cat.anchor.y = 0.5;
    cat.width = 120;
    cat.height = 120;
    cat.rotation = 0.5;
    app.stage.addChild(cat);

    app.ticker.add(delta => gameLoop(delta));

    function gameLoop(delta) {
        //Update the cat's velocity
        cat.vx = 1;
        cat.vy = 1;

        //Apply the velocity values to the cat's
        //position to make it move
        cat.x += cat.vx;
        cat.y += cat.vy;

    }

    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        cat.vx = -5;
        cat.vy = 0;
    };

    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && cat.vy === 0) {
            cat.vx = 0;
        }
    };

    //Up
    up.press = () => {
        cat.vy = -5;
        cat.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && cat.vx === 0) {
            cat.vy = 0;
        }
    };

    //Right
    right.press = () => {
        cat.vx = 5;
        cat.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && cat.vy === 0) {
            cat.vx = 0;
        }
    };

    //Down
    down.press = () => {
        cat.vy = 5;
        cat.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && cat.vx === 0) {
            cat.vy = 0;
        }
    };
}

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}