
var photoCount = 0;
var ba64 = "", bgOrientation = 1; //照片方向;
var pageName = "花之女神的三次元秀场 "

function View() {
    var me = this;
    this.pageList = ["home", "clothing", "photo", "result"];
    this.step = 0;
    var container = document.getElementById("container");
    var cav = container.querySelector("canvas")
    if(cav){
        cav.remove();
    }
    this.width = 750;
    this.height = resourceType == 0?setH_X:setH_X;
    this.app = new PIXI.Application({
        width: this.width,
        height: this.height,
        transparent: true,
    });
    container.appendChild(this.app.view);
    var cav_w = parseInt(container.style.width);
    this.app.view.style.width = cav_w+"px"
    this.app.view.style.height = cav_w/setRatio_2 + "px";
    this.app.view.style.marginTop = -(cav_w/setRatio_2/2) + "px"

    this.SpritePool = {};
    this.containerPool = {};
    this.textPool = {};
    this.imgList = resources.loader.resources; 
    this.clothes = {
        acc_back: {skin: "acc_1", alpha: 0, check: false, dressed: false},
        // dress_back: {skin: "dress_0", alpha: 0, check: false, dressed: false},
        hair_back: {skin: "hair_0_b", alpha: 1, check: false, dressed: false},
        main_role: {skin: "main_role", alpha: 1, check: false, dressed: false},
        dress: {skin: "dress_0", alpha: 1, check: true, dressed: false},
        hair: {skin: "hair_0", alpha: 1, check: true, dressed: false},
        acc: {skin: "acc_1", alpha: 0, check: true, dressed: false},
        shoes: {skin: "shoes_1", alpha: 0, check: true, dressed: false},
    };  
    this.destroyList = [];
    this.sparks = [];
    this.sparks.length = 30;
    for(var i=0; i<30; i++){
        this.sparks[i] = this.getSprite("spark_"+i, "spark", me.app.stage, me.width/2, me.height/2, 0, 0, 0.5, 0.5, 0);
        
    };

    var music = this.music= this.getSprite("music", "music", this.app.stage, this.width-40, 60 + detalY, 1, 1, 0.5, 0.5);
    music.interactive = true;
    music.buttonMode = true;
    music.on('pointerdown', function(){
        var bgm = document.getElementById("bgm");
        bgm.paused?bgm.play():bgm.pause();
        bgm.onContral = true;
    });
    music.rotation = -1;
    TweenMax.to(music, 1, {pixi: {rotation: 1}, repeat: -1, yoyo: true, ease: Power1.easeInOut});

}

View.prototype.initUpload = function() {
    var me = this;
    var imgFrom = document.getElementById("zimg-file");
    imgFrom.addEventListener("change", function() {
    $(".to_photo").removeClass("show");

    me.getSprite("inshow", "inshow", me.page_clothing, 275, 450 + detalY, 1, 1, 0.5, 0.5, 0);

    var imageDate = this.files[0];
    var myFrom = new FormData();
    var reader = new FileReader(); //调用FileReader对象

    this.value='';

    myFrom.append("image", imageDate); //向表单中添加一个键值对
    // console.log(myFrom.getAll("image")); //获取表单中image字段对应的值，结果见下图

    reader.readAsDataURL(imageDate); //通过DataURL的方式返回图像
    reader.onload = function(e) {
        me.bgsrc  = e.target.result;
        
        var img= new Image();
        img.src = me.bgsrc
    
        img.onload = function () { 
            bgOrientation = me.getPhotoOrientation(img);
            var cav=document.getElementById("cav");

            if(img.width>2000){
                var width = parseInt(img.width)/2;
                var height = parseInt(img.height)/2;
            }else{
                var width = parseInt(img.width)*0.8;
                var height = parseInt(img.height)*0.8;
            }
    
            cav.width = width
            cav.height = height
            var ctx=cav.getContext("2d");
    
            console.log(bgOrientation)
            if(bgOrientation == 6){
                ctx.save();
                ctx.translate(width / 2, height / 2);
                ctx.rotate(90 * Math.PI / 180);
                ctx.drawImage(img, 0 - height / 2, 0 - width / 2, height, width);
            }else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            var img64 = cav.toDataURL("image/png");

            photoCount++
            resources.loader.add("photo"+ photoCount, img64);
            resources.loader.onComplete.once((a, b) => {
                view.showView(2)
                line.remove();
            })
        }
    }
  });

  $(".to_photo").click(function(){
      if(view.checkClothes()){
        var imgFrom = document.getElementById("zimg-file");
        imgFrom.click();
      }else{
        var line = new TimelineMax();
        line.to(view.SpritePool.clothes_tips, 0.3, {pixi:{ alpha: 1 }})
            .to(view.SpritePool.clothes_tips, 0.3, {pixi:{ alpha: 0 }, delay: 1})
          
      }
  })
}

View.prototype.getPhotoOrientation = function(img){
    var orient;
    EXIF.getData(img, function () {
          orient = EXIF.getTag(this, 'Orientation');
    });
    return orient;
}
//添加一个普通容器
//name, 名字；parent， 父容器；x, x坐标, y, y坐标
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
//添加一个场景页容器
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
//显示场景页
//step， 章节序号
View.prototype.showView = function (step) {
    var me = this;
    var page = "page_"+this.pageList[this.step];
    var enter = 'enter_'+ this.pageList[step];
    me.step = step;

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
    line.to(this[pageName], 0.5, {
        pixi:{ brightness:0, scaleX:1.1, scaleY:1.1}, 
        onComplete: function(){
            me.destoryPage();
            cb&&cb();
        }
    })
}

View.prototype.destoryPage = function(cb){
    var len = this.destroyList.length;
    for(var i=0;i<len; i++){
        try {
            this.destroyList[i].destroy();
        }
        catch(err) {
            this.destroyList[i].alpha = 0;
            console.log(err.message);
        }
    }
    this.destroyList = [];
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

View.prototype.getTexture = function(resourcesName){
    return this.imgList[resourcesName].texture;
}

View.prototype.getText = function(str, conttainer, x, y, style ){
    var Text = new PIXI.Text(str, style);
    Text.anchor.x = 0.5;
    Text.x = x;
    Text.y = y;

    this.textPool[str] = Text;
    conttainer.addChild(Text);
}

View.prototype.enter_home = function () {
    var me = this;
    this.addPage("page_home");
    this.before_enter_Page("page_home");
    this.enter_Page("page_home");
    var container = this.page_home;
    var pool = this.SpritePool;


    this.getSprite('entry_bg', 'entry_bg', container, me.width/2, me.height/2, 1, 1, 0.5, 0.5, 1);
    this.getSprite('entry_role', 'entry_role', container, me.width/2, me.height/2, 1, 1, 0.5, 0.5, 1);
    this.getSprite('entry_logo', 'entry_logo', container, me.width/2, me.height/2, 1, 1, 0.5, 0.5, 1);
    this.getSprite('entry_start', 'entry_start', container, me.width/2, 1130 + detalY, 1, 1, 0.5, 0.5, 1);

    TweenMax.to(pool.entry_role, 1.5, {pixi:{y: me.height/2 - 40}, ease:Sine.easeInOut, repeat:-1, yoyo: true});
    TweenMax.to(pool.entry_start, 0.6, {pixi:{scale: 0.92, brightness: 1.2}, ease:Sine.easeInOut, repeat:-1, yoyo: true});
    TweenMax.to(pool.entry_logo, 0.7, {pixi:{brightness: 1.2}, ease:Sine.easeInOut, repeat:-1, yoyo: true});
    
    this.destroyList.push(pool.entry_role, pool.entry_bg, pool.entry_logo,pool.entry_start,container);
    
    pool.entry_start.interactive = true;
    pool.entry_start.buttonMode = true;
    pool.entry_start.on('pointerdown', function(){
        var bgm = document.getElementById("bgm");
        if(!bgm.onContral){
            bgm.play();
            console.log("bgm-play")
        }
        bgm.onContral = true;
        $("#img").css({"zIndex": 0, "z-index": 0})
        me.showView(1)
    });

    this.music.setParent(container);
}

View.prototype.enter_clothing = function () {
    var me = this;
    this.addPage("page_clothing");
    this.before_enter_Page("page_clothing");

    var container = this.page_clothing;
    var pool = this.SpritePool;

    this.getSprite("clothing_bg", "clothing_bg", container,0,0+detalY);
    this.enter_Page("page_clothing");

    var clothing_room = this.addContainer("clothing_room", container, -600, 50 + detalY);
    this.dressTheRole(clothing_room);

    TweenMax.set(clothing_room, {pixi:{scale: 0.95}});
    TweenMax.to(clothing_room, 0.5, {pixi:{x: -50}, delay: 0.5, onComplete: function(){
        // view.showView(2)
    }});
    this.initClothingBtn();
    
    me.getSprite("clothes_tips", "clothes_tips", container, 275, 450 + detalY, 1, 1, 0.5, 0.5, 0)

    $(".to_photo").addClass("show");
    
    this.music.setParent(container);
    this.music.y = 44 + detalY;

    
    _hmt&&_hmt.push(['_trackPageview', '/waltz/activity/showH5/clothing']);
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

View.prototype.initClothingBtn = function(){
    var me = this;
    var container = this.page_clothing;
    var pool = this.containerPool;
    var panel_x = 540 ;

    // ["btn_clothesType", 540, 20, 150, 'needReturn']

    var panel = me.addContainer("btn_clothesType", container, panel_x-100 , 0); //添加一个按钮面板
    me.getSprite("btn_clothesType" + "cebian", "cebian", panel, 100, 0, 1, 1, 0, 0, 1);

    view.lastPanel = resources.list["btn_clothesType"][0].name

    var thing = new PIXI.Graphics();

    thing.lineStyle(0);
    thing.beginFill(0x8bc5ff, 0.4);
    thing.moveTo(0, 0);
    thing.lineTo(110, 0);
    thing.lineTo(110, 600 + detalY);
    thing.lineTo(0,600 + detalY);

    panel.addChild(thing)

    resources.list["btn_clothesType"].map(function(kid, num){
        var btn = me.getSprite(kid.name, kid.name, panel, num==0?0:20, 86+num*120 + detalY, 1, 1, 0, 0, 1);
        btn.interactive = true;
        btn.buttonMode = true;
        btn.panel = kid.name;
        btn.mask = thing;
        btn.on('pointerdown', function(e){
            var panel = e.currentTarget.panel;
            var line = new TimelineMax();
            var btnPool = me.SpritePool
            // line.to(e.currentTarget, 0.06, {pixi:{scaleX:1.1, scaleY:1.1}})
            //     .to(e.currentTarget, 0.06, {pixi:{scaleX:1, scaleY:1}})
            if(panel != me.lastPanel){
                    // .to(e.currentTarget.parent, 0.3, {pixi:{ x: me.width}})
                    TweenMax.to(btnPool[me.lastPanel], 0.3, {pixi:{ x: btnPool[me.lastPanel].x  + 30}})
                    TweenMax.to(e.currentTarget, 0.3, {pixi:{ x: e.currentTarget.x - 30 }});

                    line.to(pool[me.lastPanel], 0.3, {pixi:{ x: me.width }})
                    .to(pool[panel], 0.3, {pixi:{ x: panel_x }});
                    me.lastPanel = panel;
            }
        });
    })

    var btnList = [["btn_hair"], ["btn_shoes"], ["btn_acc"], ["btn_dress"]];
        
    btnList.map(function(item, index){
        var panel = me.addContainer(item[0], container, index==0?panel_x:me.width, 0); //添加一个按钮面板

        resources.list[item[0]].map(function(kid, num){
            var btn = me.getSprite(kid.name, kid.name, panel, 114, 170+num*(180) + detalY, 1, 1, 0.5, 0.5, 1);
            btn.interactive = true;
            btn.buttonMode = true;
            btn.img = kid.name.replace("btn_", "");
            btn.clothes = btn.img.split("_")[0];
            btn.clothes_back = kid.back;
            btn.color = kid.color;
            btn.style = kid.style;

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
                me.sparkFly(300, 500 + detalY, container);
            });
        }) 
    })
}

View.prototype.sparkReset = function(startX, startY, container){
    var me = this;
    this.sparks.map(function(item, index){
        item.setParent(container);
        item.x = Math.random()*40 -20 + startX;
        item.y = Math.random()*600-300 + startY;
        item.speedX = (Math.random()*70) * (item.x>startX?1:-1);
        item.speedY = (Math.random()*70) * (item.y>startY?1:-1);;
        item.gX = (Math.random()*0.1+0.9);
        item.gY = (Math.random()*0.1+0.9);

        item.max = Math.random()*0.6 + 0.4;
        item.rotation = Math.random()*360;

        TweenMax.set(item, {pixi: {scaleX: item.max, scaleY: item.max}});
    })
    this.sparkFlyPaused = false;
}

View.prototype.sparkFly = function(startX, startY, container){
    var me = this;
    var total = 30; //50帧发散完毕
    var count = total;

    clearInterval(this.timer);
    this.sparkReset(startX, startY, container);

    this.timer = setInterval(function () { //复位
        count--;
        var len = me.sparks.length;
        for(var i=0; i<len; i++){
            var item = me.sparks[i];

            item.x += item.speedX; //每帧位置
            item.y += item.speedY;

            item.speedX = item.speedX * item.gX; //每帧速度
            item.speedY = item.speedY * item.gY;

            item.alpha = count/total;
        }
        if (!count) { //帧结束 清除定时
            clearInterval(me.timer);
        }
    }, 30)
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
    if(this.clothes.dress.skin == "dress_1"){  //裙子1显示有问题 把鞋子放到它下层 切换衣服层次又会复位 每次切换检查一次
        this.containerPool.clothing_room.setChildIndex(this.SpritePool.shoes, 3)
    }
}

View.prototype.checkClothes = function() {
    var me = this; 
    // this.flower = [3, 3, 3, 3] //性感sexy,森系mori,可爱lovely,典雅classic
    for(var prop in me.clothes){
        var item = me.clothes[prop];
        if(item.check){
            if(!item.dressed){
                return false
            }
        }
    }
    return true
}

View.prototype.enter_photo = function () {
    var me = this;

    this.addPage("page_photo");
    this.before_enter_Page("page_photo");

    var container = this.page_photo;
    var pool = this.SpritePool;
    var currentTarget = "photo"
    var photo_bg = this.getSprite("photo_bg", "photo_bg", container, 0,0,1,1,0,0,1);
    var indialog = false;
    
    _hmt&&_hmt.push(['_trackPageview', '/waltz/activity/showH5/photo']);

    var mask_w = 714, mask_h=1040, mask_x=20, mask_y=130;
    var editarea = this.addContainer("editarea", container, mask_x, mask_y); 
    var editor = this.addContainer("editor", editarea, 0, 0); 
    var thing = new PIXI.Graphics();
    editarea.addChild(thing);
    editor.mask = thing;
    thing.x = 0;
    thing.y = 0;
    thing.lineStyle(0);
    thing.clear();
    thing.beginFill(0x8bc5ff, 0.4);
    thing.moveTo(0, 0);
    thing.lineTo(mask_w, 0);
    thing.lineTo(mask_w, mask_h);
    thing.lineTo(0, mask_h);

    // var photo = this.getSprite("photo", "photo", editor, 0,0,1,1,0,0,1);

    var photo = this.getSprite("photo" + photoCount, "photo" + photoCount, editor, 0,0,1,1,0,0,1);

    // var radio = photo.width/photo.height;    
    if(bgOrientation == 6){
        var radio = photo.height/photo.width;
    }else{
        var radio = photo.width/photo.height;
    }

    console.log(bgOrientation)
    console.log(radio,  photo.width, photo.height)

    var photo_move = 0; //0纵向， 1横向
    if(mask_w / radio > mask_h){ //偏长 纵向
        photo.width = mask_w;
        photo.height = mask_w/radio;
        photo_move = 0
    }else{ //偏宽 横向
        photo.height = mask_h;
        photo.width = mask_h*radio;
        photo_move = 1
    }
    photo.x = mask_w/2 -  photo.width/2;
    photo.y = mask_h/2 -  photo.height/2;
    
    var lastPos = {};
    photo.interactive = true;
    photo.buttonMode = true;
    photo.on('pointerdown', function(e){
        console.log("photo")
        lastPos = {};
        currentTarget = "photo"
    });
    photo.on('pointermove', function(e){
        if(currentTarget != "photo") return;
            var pos = e.data.getLocalPosition(container);
            var x = photo.x + (pos.x-(lastPos.x==undefined?pos.x:lastPos.x))
            var y = photo.y + (pos.y-(lastPos.y==undefined?pos.y:lastPos.y))
            if((x<0&&(x+photo.width)>mask_w+mask_x)&&photo_move==1){
                photo.x = x;
            }
            if((y<0 && (y+photo.height)>mask_h+mask_y)&&photo_move==0){
                photo.y = y;
            }
            lastPos = pos;
    });
    photo.on('pointerup', function(e){
        lastPos = {};
        currentTarget = ""
    });

    

    var rolebox = this.addContainer("rolebox", editor, 0, 0);
    // var tempRole = this.getSprite("tempRole", "tempRole", rolebox, 0,0,1,1,1,1,1);
    var tempRole = this.containerPool.clothing_room;
    tempRole.setParent(rolebox)
    tempRole.pivot.set(tempRole.width/2,tempRole.height/2)

    var setRoleheight = tempRole.height/tempRole.scale.y;

    tempRole.width = 358; tempRole.height = 524;
    tempRole.x = tempRole.width/2
    tempRole.y = tempRole.height/2

    var scale2 = this.getSprite("scale2", "scale", rolebox, tempRole.width-20, tempRole.height-20, 1,1,0,0,1);
    var rotate = this.getSprite("rotate", "rotate", rolebox, -44, -44, 1,1,0,0,1);
    var mirror = this.getSprite("mirror", "mirror", rolebox, -40, tempRole.height-20, 1,1,0,0,1);
    
    rolebox.pivot.set(tempRole.width/2, tempRole.height/2);
    rolebox.x=mask_w/2;
    rolebox.y=mask_h/2;

    var graphics = new PIXI.Graphics();

    graphics.lineStyle(4, 0xa579e8, 1);
    graphics.alpha = 0.5
    rolebox.addChild(graphics);
    graphics.drawRect(0, 0, tempRole.width, tempRole.height);

    var lastPos2 = {};
    tempRole.interactive = true;
    tempRole.buttonMode = true;
    tempRole.on('pointerdown', function(e){
        console.log("tempRole")
        lastPos2 = e.data.getLocalPosition(editor);
        currentTarget = "tempRole"
    });
    tempRole.on('pointermove', function(e){
        if(currentTarget != "tempRole" || indialog) return;
            var pos = e.data.getLocalPosition(editor);
            var x = rolebox.x + (pos.x-(lastPos2.x))
            var y = rolebox.y + (pos.y-(lastPos2.y))
            if(x>0 && x<mask_w){
                rolebox.x = x;
            }
            if(y>0 && y<mask_h){
                rolebox.y = y;
            }
            lastPos2 = pos;
    });
    tempRole.on('pointerup', function(e){
        currentTarget = ""
    });

    rotate.interactive = true;
    rotate.buttonMode = true;
    rotate.on('pointerdown', function(e){
        console.log("rotate")
        currentTarget = "rotate"
        rolebox.pivot.set( Math.abs(tempRole.width/2), tempRole.height/2)
    });
    rotate.on('pointermove', function(e){
        if(currentTarget != "rotate") return;
        var pos = e.data.getLocalPosition(editor);
        var x = (pos.x-(rolebox.x))
        var y = (pos.y-(rolebox.y))

        var angel = Math.atan(x/y);
        // console.log(angel.toFixed(2))
        console.log(angel.toFixed(2))
        if(x>0&&y<0){
            angel= -angel;
            // console.log("1")
        }
        if(x>0&&y>0){
            angel=Math.PI - angel;
            // console.log("2")
        }
        if(x<0&&y>0){
            angel=Math.PI - angel;
            // console.log("3")
        }
        if(x<0&&y<0){
            angel=Math.PI*2 - angel;
            // console.log("4")
        }
        
        // console.log(angel.toFixed(2))
        rolebox.rotation = (angel+0.56)
     
    });
    rotate.on('pointerup', function(e){
        currentTarget = ""
    });


    var roleRadio = tempRole.width/tempRole.height
    var  lastPos3 = 0;
    scale2.interactive = true;
    scale2.buttonMode = true;
    scale2.on('pointerdown', function(e){
        lastPos3 = {};
        lastPos3.x = (rolebox.x-rolebox.width/2)
        lastPos3.y = (rolebox.y-rolebox.height/2)
        lastPos3.scaleX = tempRole.scale.x

        currentTarget = "scale2"
    });
    scale2.on('pointermove', function(e){
        if(currentTarget != "scale2") return;
            var pos = e.data.getLocalPosition(editor);
            var x = (pos.x- lastPos3.x)
            var y = (pos.y- lastPos3.y)

            // console.log(pos, lastPos3)

            if(x/roleRadio > tempRole.height){
                var new_scale = y/setRoleheight;
            }else{
                var new_scale = x/roleRadio/setRoleheight ;
            }

            // console.log(new_scale)
            new_scale = new_scale>1?1:new_scale;
            new_scale = new_scale<0.2?0.2:new_scale;


            // new_scale.toFixed(2)
            // console.log(new_scale)

            tempRole.scale.x = (inmirror?-1:1)*new_scale;
            tempRole.scale.y = new_scale;

            var rolewidth = Math.abs(tempRole.width)
            tempRole.x = rolewidth/2
            tempRole.y = tempRole.height/2

            scale2.x = rolewidth;
            scale2.y = tempRole.height;
            mirror.y = tempRole.height;

            graphics.destroy();
            graphics = new PIXI.Graphics();
            graphics.lineStyle(4, 0xff99ff, 1);
            graphics.alpha = 0.5
            rolebox.addChild(graphics);
            graphics.drawRect(0, 0, rolewidth, tempRole.height);
            rolebox.pivot.set( rolewidth/2, tempRole.height/2)
    })
    scale2.on('pointerup', function(e){
        var pos = e.data.getLocalPosition(container);
        lastPos3 = 0;
        currentTarget = ""
    });

    inmirror = false
    mirror.interactive = true;
    mirror.buttonMode = true;
    mirror.on('pointerdown', function(e){
        console.log("mirror")
        currentTarget = "mirror"
        inmirror = !inmirror;
        tempRole.scale.x = -(tempRole.scale.x)
    })


    var finish = this.getSprite("finish", "finish", container, me.width/2,1280,1,1,0.5,0.5,1);
    var tips = this.getSprite("tips", "tips", container, me.width/2, -700,1,1,0.5,0.5,0);
    var line = new TimelineMax()
    line.set([photo_bg, editor, finish],  {pixi:{brightness:0.6}});
    line.to(tips, 0.5, {pixi:{alpha:1, y:700}});

    indialog = true;
    tips.interactive = true;
    tips.buttonMode = true;
    tips.on('pointerdown', function(){
        TweenMax.to(tips, 0.8, {pixi:{alpha:0, y:-500}, onComplete: function(){
            tips.destroy()
        }});
        line.to([photo_bg, editor, finish], 0.5, {pixi:{brightness:1}, onComplete: function(){
            line.remove()
        }});
        
        indialog = false;
    });
    this.enter_Page("page_photo");

    finish.interactive = true;
    finish.buttonMode = true;
    finish.on('pointerdown', function(e){
        indialog = true;
        $(".addr_input").addClass("show");
        TweenMax.set([scale2, rotate, mirror, graphics], {pixi:{alpha:0}});
        TweenMax.to([photo_bg, editarea, finish], 0.5, {pixi:{brightness:0.6}});
    })
    this.destroyList.push(photo_bg, finish, scale2, rotate, mirror)
    // view.showView(3);
    this.music.setParent(container);
}


View.prototype.enter_result = function(){
    var me = this;
    this.addPage("page_result");
    this.before_enter_Page("page_result");
    this.enter_Page("page_result");

    _hmt&&_hmt.push(['_trackPageview', '/waltz/activity/showH5/result']);

    var container = this.page_result;
    var pool = this.SpritePool;
    var cpool = this.containerPool;
    var editarea = cpool.editarea;
    TweenMax.to([editarea], 0.5, {pixi:{brightness:1}});

    this.music.setParent(container);

    var bg_1 = this.getSprite("result_bg_1", "result_bg_1", container, 0,0,1,1,0,0,1);
    var bg_2 = this.getSprite("result_bg_2", "result_bg_2", container, 0,0,1,1,0,0,0);
    var save = this.addContainer("save", container, 0, 0);
    var save_bg = this.getSprite("save_bg", "pic_bg", save, 0,0,1,1,0,0,1);
    
    // TweenMax.to([save_bg], 0.5, {pixi:{brightness:0.8}});
    save.y = -me.height;

    editarea.setParent(save);
    editarea.width = 512;
    editarea.height = 752;
    editarea.x = 18;
    editarea.y = 24;

    var qr = this.getSprite("qr", "qr", save, 416,790,1,1,0,0,1);
    var logo = this.getSprite("logo", "logo", save, 346,30,1,1,0,0,1);
    qr.width = 110;
    qr.height = 110;

    var  index = Math.floor(Math.random()*4);  
    var word = [
        {texture: "a_1", x: 140, y: 812, size: 34},
        {texture: "a_2", x: 290, y: 830, size: 34},
        {texture: "a_3", x: 136, y: 890, size: 34},
        {texture: "a_4", x: 210, y: 876, size: 34},
    ]

    var comment = this.getSprite("comment", word[index].texture, save, 0,770,1,1,0,0,1);
    
    var text = me.getText(addr, save, word[index].x, word[index].y, {    
        fontWeight: 'bold',
        fontSize: word[index].size,
        fontFamily: '微软雅黑',
        fill: '#504249',
        align: 'center'
    })

    text.anchor.set(0.5, 0.5); 

    save.width = me.width;
    save.scale.y = save.scale.x; 
    
    var line = new TimelineMax();
    line.to(save, 0.8, {pixi:{y: (me.height-save.height)/2}, delay: 1, onComplete: function(){
    }}).to(bg_2, 0.5, {pixi:{alpha: 1}})
    .to(save, 0.5, {pixi:{scale: 1, x:100, y:240}, onComplete: function(){


        var img = document.getElementById("img");
        var b64 = view.app.renderer.plugins.extract.base64(save)
        img.src = b64;
        img.style.zIndex = 100;

        var btn_restart = me.getSprite("btn_restart", "btn_restart", container, 480, me.height, 1, 1, 0, 0, 0);
        var btn_save = me.getSprite("btn_save", "btn_save", container, 80,  me.height, 1, 1, 0, 0, 0);
        var btn_download = me.getSprite("btn_download", "btn_download", container, 280,  me.height, 1, 1, 0, 0, 0);
        var share_top = me.getSprite("share_top", "share_top", container, 375, -100, 1, 1, 0.5, 0.5, 0);
        var tips_save = me.getSprite("tips_save", "tips_save", container, 375, 450 + detalY, 1, 1, 0.5, 0.5, 0);
    
        line.to([btn_save, btn_download, btn_restart], 0.3, {pixi:{ y: 1190, alpha: 1 }})
        .to(share_top, 0.5, {pixi:{ y: 168 , alpha: 1}})
        .to(share_top, 0.6, {pixi:{ scale:0.94}, ease:Sine.easeInOut, repeat:-1, yoyo: true})
    
        btn_save.interactive = true;
        btn_save.buttonMode = true;
        btn_save.on('pointerdown', function(){
            TweenMax.to(tips_save, 0.3, {pixi:{ alpha: 1 }})
            TweenMax.to(tips_save, 0.3, {pixi:{ alpha: 0 }, delay: 2})

            _hmt&&_hmt.push(['_trackEvent', pageName, pageName + '_按钮', pageName + '_按钮' + '_保存图片']);
        });
    
        btn_download.interactive = true;
        btn_download.buttonMode = true;
        btn_download.on('pointerdown', function(){
    
            //精灵展示事件统计
            _hmt&&_hmt.push(['_trackEvent', pageName, pageName + '_按钮', pageName + '_按钮' + '_下载']);
    
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                console.log("iphone");
                window.location = "https://itunes.apple.com/cn/app/id1341573422?mt=8";
            } else {
                console.log("android");
                window.location = "http://www.100bt.com/waltz/main.html";
            }
        });   
    
        btn_restart.interactive = true;
        btn_restart.buttonMode = true;
        btn_restart.on('pointerdown', function(){
            // window.location.reload();
            
            //精灵展示事件统计
            _hmt&&_hmt.push(['_trackEvent', pageName, pageName + '_按钮', pageName + '_按钮' + '_重玩']);
    
            // $('#zimg-file').remove();
            // $('#container').append($('<input type="file" name="zimg-file" id="zimg-file" value="" />'));
            // view.initUpload();

            view.app.destroy(true);
            view = new View();
            view.showView(1);

            var img = document.getElementById("img");
            img.style.zIndex = 0;
            $(".to_photo").addClass("show");
            $(".to_photo").css("z");
            // document.getElementById("bgm").src = bgm_story;
        });
    }})
}

View.prototype.getText = function(str, container, x, y, style ){
    var Text = new PIXI.Text(str, style);
    Text.anchor.x = 0.5;
    Text.x = x;
    Text.y = y;

    this.textPool[str] = Text;
    Text.setParent(container)
    return Text;
}