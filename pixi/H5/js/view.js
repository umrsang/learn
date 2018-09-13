function View() {
    this.list = ['skip_video',  'request' ,'mission', 'clothing', 'rating'];
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
        acc_back: {skin: "acc_1_b", alpha: 0, check: false, dressed: false},
        hair_back: {skin: "hair_2_b", alpha: 0, check: false, dressed: false},
        main_role: {skin: "main_role", alpha: 1, check: false, dressed: false},
        hair: {skin: "hair_0", alpha: 1, check: true, dressed: false},
        acc: {skin: "acc_1", alpha: 0, check: true, dressed: false},
        shoes: {skin: "shoes_1", alpha: 0, check: true, dressed: false},
        dress: {skin: "dress_0", alpha: 1, check: true, dressed: false},
        dress_back: {skin: "dress_5_b", alpha: 0, check: false, dressed: false},
    };  
    this.score = 0;
    this.flower = [3, 3, 3, 3] //性感,森系,可爱,典雅
    this.clothesTitle = "时尚绝缘体";
    this.clothesComment = "哪来的乡巴佬，拉低了整个凡瑟尔\n的审美";
    this.commentList = [
        {minPoint: 0, title: "时尚绝缘体", comment: "哪来的乡巴佬，拉低了整个凡瑟尔\n的审美"},
        {minPoint: 25, title: "蜜汁审美", comment: "恕我直言…您的搭配…有点辣眼睛\n"},
        {minPoint: 35, title: "穿搭小白", comment: "你直接套上窗帘来舞会吧，也许\n还好看一点呢"},
        {minPoint: 50, title: "新手上路", comment: "看看大家的眼神，明白差距了么？"},
        {minPoint: 65, title: "颜值担当", comment: "搭配差一些也没关系，可你是贵\n族小姐啊！"},
        {minPoint: 75, title: "时尚icon", comment: "还算孺子可教，答应我下次要做\n得更好！"},
        {minPoint: 85, title: "倾城佳人", comment: "快停止散发魅力吧！你这迷人的\n小仙女！"},
        {minPoint: 100, title: "盛世美颜", comment: "惊为天人！凡瑟尔年度最佳搭配\n非你莫属！"},
    ]


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

View.prototype.getText = function(str, conttainer, x, y, style ){

    var Text = new PIXI.Text(str, style);
    // {
    //     fontWeight: 'bold',
    //     fontStyle: 'italic',
    //     fontSize: 60,
    //     fontFamily: 'Arvo',
    //     fill: '#3e1707',
    //     align: 'center',
    //     stroke: '#a4410e',
    //     strokeThickness: 7
    // }
    Text.anchor.x = 0.5;
    Text.x = x;
    Text.y = y;

    conttainer.addChild(Text);
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
            [128, 959, 30],[210, 959, 5],[280, 959, -30],[165, 1000, -20],[262, 1000, 35],
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
            line.to(star, 0.1, {pixi:{scaleX:1, scaleY:1, alpha:1, rotation: starPos[i][2]}})
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

        var clothing_room = this.addContainer("clothing_room", container, -508, 100);
        this.dressTheRole(clothing_room);
        this.line.to(clothing_room, 0.5, {pixi:{x: 0}, delay: 0.5, ease: Back.easeOut.config(2)});


        this.initClothingBtn();

        var clothes_tips = me.getSprite("clothes_tips", "clothes_tips", container, 275, 450, 1, 1, 0.5, 0.5, 0);
        TweenMax.to(clothes_tips, 0.3, {pixi:{ scaleX: 0.9 , scaleY: 0.9}, repeat: -1, yoyo: true})

        var btn_go = this.getSprite("btn_go", "btn_go", container, 15, this.height, 1, 1, 0, 0, 1);

        this.line.to(pool.btn_go, 0.1, {pixi:{ y: 1000}});
        this.line.to(pool.btn_go, 1, {pixi:{ y: 1020}, ease: Power1.easeInOut, repeat:-1, yoyo: true});

        btn_go.interactive = true;
        btn_go.buttonMode = true;
        btn_go.on('pointerdown', function(){
            if(me.getScore()){
                me.showView(me.step+1)
            }else{
                var line = new TimelineMax();
                line.to(clothes_tips, 0.3, {pixi:{ alpha: 1 }})
                    .to(clothes_tips, 0.3, {pixi:{ alpha: 0 }, delay: 1})
            }
        });
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
            btn.clothes_back = kid[2].back;
            btn.color = kid[2].color;
            btn.style = kid[2].style;

            btn.on('pointerdown', function(e){
                var img = e.currentTarget.img;
                var clothes = e.currentTarget.clothes;
                var clothes_back = e.currentTarget.clothes_back;
                
                var line = new TimelineMax();
                line.to(e.currentTarget, 0.06, {pixi:{scaleX:0.95, scaleY:0.95}})
                    .to(e.currentTarget, 0.06, {pixi:{scaleX:1, scaleY:1}})

                me.clothes[clothes].skin = img;
                me.clothes[clothes].alpha = 1;
                me.clothes[clothes].color = e.currentTarget.color;
                me.clothes[clothes].style = e.currentTarget.style;
                me.clothes[clothes].dressed = true;
                if(me.clothes[clothes+"_back"]){
                    me.clothes[clothes+"_back"].skin = clothes_back;
                    me.clothes[clothes+"_back"].alpha = clothes_back?1:0;
                }                
                console.log(me.clothes[clothes])
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
            if(val.skin){
                pool[prop].texture = this.imgList[val.skin].texture;
            }
            pool[prop].alpha = val.alpha ;
            container.addChild(pool[prop]);
        } else{
            this.getSprite(prop, val.skin, container, 0, 0, 1, 1, 0, 0, val.alpha);
        }
    }
}

View.prototype.getScore = function() {
    var me = this; 
    var unready = false;
    var score = 0;
    var scorelist = {dress: 35, acc: 25, hair: 25, shoes: 15};
    var flowerIndex = {sexy: 0, mori: 1, lovely: 2, classic: 3};
    // this.flower = [3, 3, 3, 3] //性感sexy,森系mori,可爱lovely,典雅classic
    for(var prop in me.clothes){
        var item = me.clothes[prop];
        if(item.check){
            if(!item.dressed){
                return false
            }
            if(item.style == main.style){
                score = score + scorelist[prop]
            }
            // if(item.color == main.color && "dress_hair".indexOf(prop) > -1 ){
            //     var index = flowerIndex[item.style];
            //     var flower = this.flower[index];
            //     this.flower[index] = flower>5?5:flower+1
            // }
            if("dress_hair".indexOf(prop) > -1 ){
                var index = flowerIndex[item.style];
                var flower = this.flower[index];
                this.flower[index] = flower>5?5:flower+1
            }
        }
    }

    this.commentList.map(function(item, index){
        if(score > item.minPoint || score == item.minPoint){
            me.clothesTitle = item.title;
            me.clothesComment = item.comment;
        }
    })

    console.table([
        {name: '称号', value: me.clothesTitle},
        {name: '评语', value: me.clothesComment},
        {name: '得分', value: me.score},
        {name: '鲜花', value: me.flower.toString()}
    ])

    this.score = score;
    return true
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
        
        var line = new TimelineMax();
        line.set(clothing_room, {pixi:{x: -40, y: -300, scaleX: 1.5, scaleY: 1.5, alpha: 0}})
        .to(bg_white, 0.3, {pixi:{x: 0, y: 0}, delay: 0.5})
        .to(bg_flower, 0.3, {pixi:{x: 0, y: 0}})
        .to(clothing_room, 0.3, {pixi:{x: 100, y: 130, alpha: 1, scaleX: 1, scaleY: 1}, ease: Back.easeOut.config(2)});

        this.showflower(1, function(){

            var bg_result = me.getSprite("bg_result", "bg_result", container, 0, -me.height, 1, 1, 0, 0, 1);
            var result = me.addContainer("result", container, 0, me.height);
            var border_back = me.getSprite("border_back", "border_back", result, 0, 0, 1, 1, 0, 0, 1);
            
            line.to(bg_result, 0.5, {pixi:{ y: 0, alpha: 1}, delay: 1, ease: Power1.easeOut})
            .set(result, {pixi:{ x: me.width / 2, y: me.height, scaleX: 1.15, scaleY:1.15, alpha: 0}, onComplete: function(){
                result.pivot.set(307, 0);
                clothing_room.setParent(result);
                clothing_room.scale.set(0.8, 0.8);
                clothing_room.x = 100;
                clothing_room.y = 50;

                me.getSprite("border_face", "border_face", result, 0, 0, 1, 1, 0, 0, 1);
                me.getSprite("code", "code", result, 420, 750, 1, 1, 0, 0, 1);

                me.getText(me.clothesTitle, result, 310, 8, {    
                    fontWeight: 'bold',
                    fontSize: 42,
                    fontFamily: '微软雅黑',
                    fill: '#a56248',
                    align: 'center',
                })
                
                me.getText(me.score + '分', result, 250, 740, {    
                    fontWeight: 'bold',
                    fontSize: 52,
                    fontFamily: '微软雅黑',
                    fill: '#a56248',
                    align: 'center',
                })

                me.getText(me.clothesComment, result, 240, 810, {    
                    fontWeight: 'bold',
                    fontSize: 22,
                    lineHeight: 30,
                    fontFamily: '微软雅黑',
                    fill: '#a56248',
                })

                me.getText("长按立即换装", result, 467, 848, {    
                    fontWeight: 'bold',
                    fontSize: 18,
                    lineHeight: 24,
                    fontFamily: '微软雅黑',
                    fill: '#333333',
                })

                me.showflower(2)
            }})
            .to(result, 0.5, {pixi:{ y: 30, alpha: 1}, onComplete: function(){
                var img = document.getElementById("img");
                img.style.zIndex = 100;
                view.base64 = view.app.renderer.plugins.extract.base64(view.page_rating);
                img.src = view.base64;
            }})
            .to(result, 0.5, {pixi:{ y: 60, scaleX:1, scaleY:1, alpha: 1}, delay: 0.5, onComplete: function(){
                var btn_restart = me.getSprite("btn_restart", "btn_restart", container, 524, me.height, 1, 1, 0, 0, 0);
                var btn_save = me.getSprite("btn_save", "btn_save", container, 120,  me.height, 1, 1, 0, 0, 0);
                var btn_download = me.getSprite("btn_download", "btn_download", container, 323,  me.height, 1, 1, 0, 0, 0);
                var share_top = me.getSprite("share_top", "share_top", container, 550, -100, 1, 1, 0.5, 0.5, 0);
                var tips_save = me.getSprite("tips_save", "tips_save", container, 375, 450, 1, 1, 0.5, 0.5, 0);
            
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
            }})
        })
}

View.prototype.showflower = function(type, callBack){
    var me = this;
    var x = type==1?110:168;
    var y = type==1?38:898;
    var deltax = type==1?40:222;
    var deltay = type==1?49:29;

    var pos1 = [[x, deltay*0+y], [x, deltay*1+y], [x, deltay*2+y], [x, deltay*3+y]];
    var pos2 = [[x, y], [x+deltax, y], [x, y+deltay], [x+deltax, y+deltay]];
    
    var pos = type==1? pos1: pos2; console.log(pos) 
    var scale = type==1? 1: 0.8;
    var deltaPos = type==1? 45: 28;
    var container = type==1? this.page_rating: this.containerPool.result;

    console.log(container == this.containerPool.result)
    var line = new TimelineMax();
    var count = 0;
    pos.map(function(item, index){
        var delta = 0
        line.set(container, {delay: 0.3})
        for(var i=0; i<me.flower[index]; i++){
            if(type == 1){
                var star = me.getSprite("flower_"+type+"_"+count, "flower", container, item[0]+delta-50, item[1]+100 , 3, 3, 0.5, 0.5, 0);
                line.to(star, 0.05, {pixi:{scaleX: 3, scaleY: 3, alpha: 0}})
                .to(star, 0.05, {pixi:{x: item[0]+delta, y: item[1], scaleX: scale, scaleY: scale, alpha: 1}})
            }else{
                me.getSprite("flower_"+type+"_"+count, "flower", container, item[0]+delta, item[1], 0.8, 0.8, 0.5, 0.5, 1);
            }
            delta += deltaPos;
            count += 1;
        }
    })
    if(type == 1){
        line.set(container, {onComplete: function(){
            callBack&&callBack();
        }})
    }
}