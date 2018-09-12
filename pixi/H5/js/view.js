function View() {
    this.list = ['skip_video',  'request' ,'mission', 'clothing', 'rating', 'invate', 'clothing', "grading", "result"];
    this.step = 0;
    var container = document.getElementById("container");
    var cav = container.querySelector("canvas")
    if(cav){
        cav.remove();
    }
    this.width = 750;
    this.height = 1218;
    this.app = new PIXI.Application({
        width: this.width,
        height: this.height,
        transparent: true,
    });
    container.appendChild(this.app.view);
    this.SpritePool = {};
    this.containerPool = {};
    this.imgList = resources.loader.resources;
    this.pageMain = this.addPage("pageMain");
    this.line = new TimelineMax();
    this.clothes = {
        acc_back: ["acc_1_b", 0],
        hair_back: ["hair_2_b", 0],
        main_role: ["main_role", 1],
        hair: ["hair_0", 1],
        acc: ["acc_1", 0],
        shoes: ["shoes_1", 0],
        dress: ["dress_0", 1],
        dress_back:["dress_5_b", 0]
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
    var enter = 'enter_'+ me.list[me.step];
    if(me[page]){
        this.leave_Page( page, function(){
            me[enter]();
        });
    }else{
        me[enter]();
    }
}

View.prototype.before_enter_Page = function(pageName){
    this[pageName].x = this.width / 2;
    TweenMax.set(this[pageName], {pixi:{brightness:0, scaleX:1.1, scaleY:1.1}})
}

View.prototype.enter_Page = function(pageName){
    TweenMax.to(this[pageName], 0.5, {pixi:{brightness:1, scaleX:1, scaleY:1}});
}

View.prototype.leave_Page = function(pageName, cb){
    var me = this;
    var line = new TimelineMax();
    line.to(this[pageName], 0.5, {pixi:{ brightness:0, scaleX:1.1, scaleY:1.1}})
        .set(this[pageName], {pixi:{x: this.width*2}});
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
View.prototype.enter_skip_video = function () {
    var me = this;
    this.addPage("page_skip_video");
    this.before_enter_Page("page_skip_video");
    this.enter_Page("page_skip_video");
    var container = this.page_skip_video;
    var pool = this.SpritePool;

    var btn_skip = this.getSprite("btn_skip", "btn_start", container, 412, me.height);
    btn_skip.interactive = true;
    btn_skip.buttonMode = true;
    btn_skip.on('pointerdown', function(){
        me.showView(me.step+1);
        videoEnd = true;
    });
    var line = new TimelineMax();
    line.to(btn_skip, 0.8, {pixi:{ y: 1000}, ease: Power1.easeInOut})
        .to(btn_skip, 1, {pixi:{ y: 1020}, ease: Power1.easeInOut, repeat:-1, yoyo: true});
}

View.prototype.enter_request = function () {
    var me = this;
    this.addPage("page_request");
    this.before_enter_Page("page_request");
    this.enter_Page("page_request");
    var container = this.page_request;
    var pool = this.SpritePool;

    this.getSprite("bg_story", "bg_story", container, 0, 0);

    var btn_start = this.getSprite("btn_start", "btn_start", container, 412, 1000);
    btn_start.interactive = true;
    btn_start.buttonMode = true;
    btn_start.on('pointerdown', function(){
        me.showView(me.step+1)
    });
    TweenMax.to(btn_start, 1, {pixi:{ y: 1020}, ease: Power1.easeInOut, repeat:-1, yoyo: true});
}

View.prototype.enter_mission = function () {

        var me = this;
        this.addPage("page_mission");
        this.before_enter_Page("page_mission");
        this.enter_Page("page_mission");
        var container = this.page_mission;
        var pool = this.SpritePool;
        this.getSprite("invate_bg", "invate_bg", container, 0, 0);
        

        this.getSprite("card", "invate_card_" + main.role, container, 230, 320, 3, 3, 0.5, 0.5, 0);        
        this.getSprite("role", "invate_role_" + main.role, container, this.width, 28);
        this.getSprite("theme", "invate_theme_" + main.role, container, 90, 644, 3, 3, 0.5, 0.5, 0);
        this.getSprite("color", "invate_color_" + main.role, container, 220, 800, 3, 3, 0.5, 0.5, 0);
        this.getSprite("desc", "invate_desc", container, 33, 610);
        this.getSprite("btn_next", "btn_next", container, 230, this.height);

        pool.btn_next.interactive = true;
        pool.btn_next.buttonMode = true;
        pool.btn_next.on('pointerdown', function(){
            me.showView(me.step+1)
        });
        var line = new TimelineMax();
        line.to(pool.card, 0.2, {pixi:{scaleX:1, scaleY:1, alpha:1}, delay: 0.5})
            .to(pool.color, 0.1, {pixi:{scaleX:1, scaleY:1, alpha:1}})
            .to(pool.theme, 0.1, {pixi:{scaleX:1, scaleY:1, alpha:1}})
            .to(pool.role, 0.2, {pixi:{x: this.width - pool.role.width}})
        
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
            line.to(star, 0.1, {pixi:{scaleX:1, scaleY:1, alpha:1}})
        }
        line.to(pool.btn_next, 0.1, {pixi:{ y: 1000}});
        line.to(pool.btn_next, 1, {pixi:{ y: 1020}, ease: Power1.easeInOut, repeat:-1, yoyo: true});

}

View.prototype.enter_clothing = function (){

        var me = this;
        this.addPage("page_clothing");
        this.before_enter_Page("page_clothing");

        var container = this.page_clothing;
        var pool = this.SpritePool;

        this.getSprite("clothing_bg", "clothing_bg", container);
        this.enter_Page("page_clothing");

        var clothing_room = this.addContainer("clothing_room", container, -508, 0);
        this.dressTheRole(clothing_room);
        this.line.to(clothing_room, 0.5, {pixi:{x: 0}, delay: 0.5, ease: Back.easeOut.config(2)});

        this.getSprite("btn_go", "btn_go", container, 15, this.height, 1, 1, 0, 0, 1);
        pool.btn_go.interactive = true;
        pool.btn_go.buttonMode = true;
        pool.btn_go.on('pointerdown', function(){
            me.showView(me.step+1)
        });
        this.line.to(pool.btn_go, 0.1, {pixi:{ y: 1000}});
        this.line.to(pool.btn_go, 1, {pixi:{ y: 1020}, ease: Power1.easeInOut, repeat:-1, yoyo: true});
        this.initClothingBtn();

   }

View.prototype.initClothingBtn = function(){
    var me = this;
    var container = this.page_clothing;
    var pool = this.containerPool;
    var panel_x = 540 ;

    ["btn_clothesType", 540, 20, 150, 'needReturn']

    var panel = me.addContainer("btn_clothesType", container, panel_x, 0); //添加一个按钮面板
    me.getSprite("btn_clothesType" + "cebian", "cebian", panel, 0, 0, 1, 1, 0, 0, 1);

    resources["btn_clothesType"].map(function(kid, num){
        var btn = me.getSprite(kid[0], kid[0], panel, 20, 86+num*150, 1, 1, 0, 0, 1);
        btn.interactive = true;
        btn.buttonMode = true;
        btn.panel = kid[0];
        btn.on('pointerdown', function(e){
            var panel = e.currentTarget.panel;
            var line = new TimelineMax();
            line.to(e.currentTarget.parent, 0.3, {pixi:{ x: me.width}})
                .to(pool[panel], 0.3, {pixi:{ x: panel_x }});
        });
    })

    var btnList = [["btn_hair"], ["btn_shoes"], ["btn_acc"], ["btn_dress"]];
        
    btnList.map(function(item, index){
        var panel = me.addContainer(item[0], container, me.width, 0); //添加一个按钮面板
        me.getSprite(item[0] + "cebian", "cebian", panel, 0, 0, 1, 1, 0, 0, 1);
       
        var btn_return = me.getSprite(item[0] + "return", "return", panel, 28, 0, 1, 1, 0, 0, 1);        
        btn_return.interactive = true;
        btn_return.buttonMode = true;
        btn_return.on('pointerdown', function(e){
            var line = new TimelineMax();
            line.to(e.currentTarget.parent, 0.3, {pixi:{ x: me.width}})
                .to(pool["btn_clothesType"], 0.3, {pixi:{ x: panel_x}});
        });

        resources[item[0]].map(function(kid, num){
            var btn = me.getSprite(kid[0], kid[0], panel, 114, 170+num*(180), 1, 1, 0.5, 0.5, 1);
            btn.interactive = true;
            btn.buttonMode = true;
            btn.img = kid[0].replace("btn_", "");
            btn.clothes = btn.img.split("_")[0];
            btn.clothes_back = kid[2];

            btn.on('pointerdown', function(e){
                var img = e.currentTarget.img;
                var clothes = e.currentTarget.clothes;
                var clothes_back = e.currentTarget.clothes_back;
                
                var line = new TimelineMax();
                line.to(e.currentTarget, 0.06, {pixi:{scaleX:0.95, scaleY:0.95}})
                    .to(e.currentTarget, 0.06, {pixi:{scaleX:1, scaleY:1}})

                me.clothes[clothes][0] = img;
                me.clothes[clothes][1] = 1;
                if(me.clothes[clothes+"_back"]){
                    me.clothes[clothes+"_back"][0] = clothes_back;
                    me.clothes[clothes+"_back"][1] = clothes_back?1:0;
                }                
                me.dressTheRole(pool.clothing_room);
            });
        }) 
    })
}

View.prototype.dressTheRole = function(container, enter){
    var pool = this.SpritePool;
    for(var prop in this.clothes){
        var val = this.clothes[prop];
        if(pool[prop]){
            if(val[0]){
                pool[prop].texture = this.imgList[val[0]].texture;
            }
            pool[prop].alpha = val[1]?1:0 ;
            container.addChild(pool[prop]);
        } else{
            this.getSprite(prop, val[0], container, 0, 0, 1, 1, 0, 0, val[1]);
        }
    }
}

View.prototype.enter_rating = function(){
        var me = this;
        this.addPage("page_rating");
        this.before_enter_Page("page_rating");

        var container = this.page_rating;
        var pool = this.SpritePool;
        var clothing_room = this.containerPool.clothing_room;

        this.getSprite("bg_rating", "bg_rating", container);
        this.enter_Page("page_rating");
        
        var bg_white = this.getSprite("bg_white", "bg_white", container, -this.width, 443);
        var bg_flower = this.getSprite("bg_flower", "bg_flower", container, this.width, -436);

        clothing_room.setParent(container)

        var bg_result = this.getSprite("bg_result", "bg_result", container, 0, -me.height, 1, 1, 0, 0, 1);
        var result = me.addContainer("result", container, 0, me.height);
        var border_back = this.getSprite("border_back", "border_back", result, 0, 0, 1, 1, 0, 0, 1);
        
        var line = new TimelineMax();
        line.set(clothing_room, {pixi:{x: -40, y: -300, scaleX: 1.5, scaleY: 1.5, alpha: 0}})
        .to(bg_white, 0.3, {pixi:{x: 0, y: 0}, delay: 0.5})
        .to(bg_flower, 0.3, {pixi:{x: 0, y: 0}})
        .to(clothing_room, 0.3, {pixi:{x: 100, y: 30, alpha: 1, scaleX: 1, scaleY: 1}, onComplete: function(){

        }, ease: Back.easeOut.config(2)});

        line.to(bg_result, 0.5, {pixi:{ y: 0, alpha: 1}, delay: 1, ease: Power1.easeOut})
            .set(result, {pixi:{ x: this.width / 2, y: me.height, scaleX: 1.15, scaleY:1.15, alpha: 0}, onComplete: function(){
                result.pivot.set(307, 0);
                clothing_room.setParent(result);
                clothing_room.scale.set(0.8, 0.8);
                clothing_room.x = 100;
                me.getSprite("border_face", "border_face", result, 0, 0, 1, 1, 0, 0, 1);
            }})
            .to(result, 0.5, {pixi:{ y: 30, alpha: 1}, onComplete: function(){
                var img = document.getElementById("img");
                img.style.zIndex = 100;
                view.base64 = view.app.renderer.plugins.extract.base64(view.page_rating);
                img.src = view.base64;
            }})
            .to(result, 0.5, {pixi:{ y: 60, scaleX:1, scaleY:1, alpha: 1}, delay: 0.5})

        var btn_restart = this.getSprite("btn_restart", "btn_restart", container, 524, me.height, 1, 1, 0, 0, 0);
        var btn_save = this.getSprite("btn_save", "btn_save", container, 120,  me.height, 1, 1, 0, 0, 0);
        var btn_download = this.getSprite("btn_download", "btn_download", container, 323,  me.height, 1, 1, 0, 0, 0);
        var share_top = this.getSprite("share_top", "share_top", container, 550, -100, 1, 1, 0.5, 0.5, 0);
        var tips_save = this.getSprite("tips_save", "tips_save", container, 375, 450, 1, 1, 0.5, 0.5, 0);
    
        line.to(btn_save, 0.3, {pixi:{ y: 1080, alpha: 1 }})
            .to(btn_download, 0.3, {pixi:{ y: 1080 , alpha: 1}})
            .to(btn_restart, 0.3, {pixi:{ y: 1080 , alpha: 1}})
            .to(share_top, 0.3, {pixi:{ y: 35 , alpha: 1}})
        TweenMax.to(tips_save, 0.3, {pixi:{ scaleX: 0.9 , scaleY: 0.9}, repeat: -1, yoyo: true})
        TweenMax.to(share_top, 0.4, {pixi:{ scaleX: 0.96 , scaleY: 0.96}, repeat: -1, yoyo: true})

        btn_save.interactive = true;
        btn_save.buttonMode = true;
        btn_save.on('pointerdown', function(){
            line.to(tips_save, 0.3, {pixi:{ alpha: 1 }})
                .to(tips_save, 0.3, {pixi:{ alpha: 0 }, delay: 1})
        });

        btn_download.interactive = true;
        btn_download.buttonMode = true;
        btn_download.on('pointerdown', function(){
            window.location = "http://www.100bt.com/waltz/main.html?baidu";
        });   

        btn_restart.interactive = true;
        btn_restart.buttonMode = true;
        btn_restart.on('pointerdown', function(){
            // window.location.reload();
            view.app.destroy(true);
            main = new Main();
            view = new View();
            view.showView(1);
            var img = document.getElementById("img");
            img.style.zIndex = 0;
        });  
}