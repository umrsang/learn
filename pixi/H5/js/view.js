function View() {
    this.list = ['mission', 'clothing', 'mission', 'invate', 'clothing', "grading", "result"];
    this.step = 0;
    this.element = document.getElementById("cav");
    this.width = this.element.width;
    this.height = this.element.height;
    this.app = new PIXI.Application({
        view: this.element,
        width: this.width,
        height: this.height,
        backgroundColor: 0x000000
    });
    this.SpritePool = {};
    this.containerPool = {};
    this.imgList = resources.loader.resources;
    this.pageMain = this.addPage("pageMain");
    this.line = new TimelineMax();
    this.clothes = {
        acc_back: ["acc_1_b", 1],
        hair_back: [null, 2],
        role: ["main_role", 2],
        hair: ["hair_2", 5],
        acc: ["acc_1", 6],
        shoes: [null, 5],
        dress: ["dress_0", 5],
        dress_back:[null, 3]
    }

}

View.prototype.addPage = function(name){
    if(!(this[name])){
        var container = new PIXI.Container();
        container.x = this.width / 2;
        container.y = this.height / 2;
        container.pivot.set(this.width / 2, this.height / 2);
        this.app.stage.addChild(container);
        this[name] = container;
    }
}

View.prototype.addContainer = function(name, parent, x, y){
    if(!(this.containerPool[name])){
        var container = new PIXI.Container();
        container.x = x||0;
        container.y = y||0;
        parent.addChild(container);
        this.containerPool[name] = container;
        return container
    }
    return this.containerPool[name]
}

View.prototype.showView = function (step) {
    var me = this;
    var page = "page_"+this.list[this.step];
    if(step!=undefined && step>-1){
        me.step = step;
    }
    if(me[page]){
        this.leave_Page( page, function(){
            me['enter_'+ me.list[me.step]]();
        });
    }else{
        me['enter_'+ me.list[me.step]]();
    }
}

View.prototype.before_enter_Page = function(pageName){
    this[pageName].x = this.width / 2;
    TweenMax.set(this[pageName], {pixi:{brightness:0, scaleX:1.2, scaleY:1.2}})
}

View.prototype.enter_Page = function(pageName){
    this.line.to(this[pageName], 0.5, {pixi:{brightness:1, scaleX:1, scaleY:1}});
}

View.prototype.leave_Page = function(pageName, cb){
    var me = this;
    this.line.to(this[pageName], 0.5, {pixi:{ brightness:0, scaleX:1.2, scaleY:1.2}}).set(this[pageName], {pixi:{x: this.width*2}});
    setTimeout(() => {
        cb&&cb();
    }, 600);
}

View.prototype.getSprite = function(label, resourcesName, addTO ,x, y, scaleX, scaleY, anchorX, anchorY, alpha){
    var texture = this.imgList[resourcesName].texture;
    var sprite = new PIXI.Sprite(texture);
    sprite.x = x||0;
    sprite.y = y||0;
    sprite.anchor.set(anchorX||0 , anchorY||0);
    sprite.scale.set(scaleX||1 , scaleY||1);
    sprite.alpha = alpha ==undefined?1:alpha;
    this.SpritePool[label || resourcesName] = sprite;
    addTO.addChild(sprite);
    return sprite;
}

View.prototype.enter_mission = function () {

    if(!this.page_mission){
        var me = this;
        this.addPage("page_mission");
        this.before_enter_Page("page_mission");
        var container = this.page_mission;
        var pool = this.SpritePool;
        this.getSprite("invate_bg", "invate_bg", container, 0, 0);
        
        this.getSprite("role", "invate_role_" + main.role, container, this.width,
        28);
        this.getSprite("card", "invate_card_" + main.role, container, 230, 320, 3, 3, 0.5, 0.5, 0);
        this.getSprite("theme", "invate_theme_" + main.role, container, 90, 644, 3, 3, 0.5, 0.5, 0);
        this.getSprite("color", "invate_color_" + main.role, container, 220, 800, 3, 3, 0.5, 0.5, 0);
        this.getSprite("desc", "invate_desc", container, 33, 610);
        this.getSprite("btn_next", "btn_next", container, 230, this.height);

        pool.btn_next.interactive = true;
        pool.btn_next.buttonMode = true;
        pool.btn_next.on('pointerdown', function(){
            me.showView(me.step+1)
        });
    
        this.enter_Page("page_mission");
        this.line.to(pool.card, 0.3, {pixi:{scaleX:1, scaleY:1, alpha:1},delay:0.3 })
            .to(pool.color, 0.2, {pixi:{scaleX:1, scaleY:1, alpha:1}})
            .to(pool.theme, 0.2, {pixi:{scaleX:1, scaleY:1, alpha:1}})
        this.line.to(pool.role, 0.3, {pixi:{x: this.width - pool.role.width}})
        
        var starPos = [
            [128, 959, 0.5],[210, 959, 1.5],[280, 959, 0.5],[165, 1000, 0.12],[262, 1000, 1],
        ]
        var star;
        for(var i=0; i<5; i++){
            if(i<main.star){
                star = this.getSprite('star_'+i, "invate_start_full", container, starPos[i][0],
                starPos[i][1], 3, 3, 0.5, 0.5, 0)
            }else{
                star = this.getSprite('star_'+i, "invate_star_empty", container, starPos[i][0],
                starPos[i][1], 3, 3, 0.5, 0.5, 0)
            }
            this.line.to(star, 0.1, {pixi:{scaleX:1, scaleY:1, alpha:1}})
        }
        this.line.to(pool.btn_next, 0.3, {pixi:{ y: 1000}});
        this.line.to(pool.btn_next, 1, {pixi:{ y: 1020}, ease: Power1.easeInOut, repeat:-1, yoyo: true});

    }else{
        this.before_enter_Page("page_mission");
        this.enter_Page("page_mission");
    }
}

View.prototype.enter_clothing = function (){
    if(!this.page_clothing){
        var me = this;
        this.addPage("page_clothing");
        this.before_enter_Page("page_clothing");

        var container = this.page_clothing;
        var pool = this.SpritePool;

        this.getSprite("clothing_bg", "clothing_bg", container);
        this.enter_Page("page_clothing");

        var clothing_room = this.addContainer("clothing_room", container, -508, 0);
        this.dressTheRole();
        this.line.to(clothing_room, 0.8, {pixi:{x: 0}, ease: Back.easeOut.config(2)});

        this.getSprite("btn_go", "btn_go", container, 15, this.height, 1, 1, 0, 0, 1);
        pool.btn_go.interactive = true;
        pool.btn_go.buttonMode = true;
        pool.btn_go.on('pointerdown', function(){
            me.showView(me.step+1)
        });
        this.line.to(pool.btn_go, 0.3, {pixi:{ y: 1000}});
        this.line.to(pool.btn_go, 1, {pixi:{ y: 1020}, ease: Power1.easeInOut, repeat:-1, yoyo: true});
        this.initClothingBtn();
    }else{
        this.before_enter_Page("page_clothing");
        this.enter_Page("page_clothing");
    }

}

View.prototype.initClothingBtn = function(){
    var me = this;
    var container = this.page_clothing;
    var btnList = [["clothing_btn", 540, 20, 150, 'needReturn'], ["btn_hair"], ["btn_shoes"], ["btn_acc"], ["btn_dress"]];
    btnList.map(function(item, index){
        var panel = me.addContainer(item[0], container, item[1]||me.width, 0); //添加一个按钮面板
        me.getSprite(item[0] + "cebian", "cebian", panel, 0, 0, 1, 1, 0, 0, 1);
        if(!item[4]){
            var btn_return = me.getSprite(item[0] + "return", "return", panel, 28, 0, 1, 1, 0, 0, 1);        
            btn_return.interactive = true;
            btn_return.buttonMode = true;
            btn_return.on('pointerdown', function(e){
                console.log(e)
            });
        }
        resources[item[0]].map(function(kid, num){
            var btn = me.getSprite(kid[0], kid[0], panel, item[2]||36, 86+num*(item[3]||180), 1, 1, 0, 0, 1);
            btn.interactive = true;
            btn.buttonMode = true;
            btn.on('pointerdown', function(e){
                console.log(e.currentTarget)
                me.line.to(e.currentTarget.parent, 0.5, {pixi:{ x: me.width}});
            });
        })
    })
}

View.prototype.dressTheRole = function(){
    var container = this.containerPool.clothing_room;
    var pool = this.SpritePool;
    for(var prop in this.clothes){
        var val = this.clothes[prop];
        if(val[0]){
            if(pool[prop]){
                pool[prop].texture = this.resources[val[0]].texture;
            } else{
                this.getSprite(prop, val[0], container, 0, 0, 1, 1, 0, 0, 1);
            }
        }else{
            if(pool[prop]){
                pool[prop].alpha = 0 ;
            }
        }
    }
}

