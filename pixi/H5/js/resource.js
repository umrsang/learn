var resources = {};

resources.loader =  new PIXI.loaders.Loader();

resources.assetLoad = function (cb) {
    var arr = this.list.concat(this["role_" + "sakan"])
                        .concat(this["role_" + "aolinv"])
                        .concat(this["role_" + "qiaoka"])
                        .concat(this["role_" + "hesang"])
                        .concat(this.btn_clothesType)
                        .concat(this.hair)
                        .concat(this.shoes)
                        .concat(this.acc)
                        .concat(this.dress)
                        .concat(this.btn_hair)
                        .concat(this.btn_shoes)
                        .concat(this.btn_acc)
                        .concat(this.btn_dress)
                        .concat(this.page_rating)
                        .concat(this.page_story)
                        .concat(this.story_text_1)
                        .concat(this.story_text_2)
                        .concat(this.story_text_3)
                        .concat(this.story_text_4)
                        .concat(this.story_text_5)

    var loader = this.loader;
    var len = arr.length;
    // console.log(arr)
    for (var i = 0; i < len; i++) {
        loader.add(arr[i][0], arr[i][1]);
    }

    loader.onProgress.add((loader, res) => {
        // console.log(Math.round(loader.progress));
    })

    loader.onComplete.add((a, b) => {
        console.log('onComplete');
        cb&&cb();
    })

    loader.load();
}

resources.list = [
    ['invate_bg', './img/invate/invate_bg.jpg'],
    ['invate_level', './img/invate/level.jpg'],
    ['invate_star_empty', './img/invate/start_empty.png'],
    ['invate_start_full', './img/invate/start_full.png'],
    ['invate_desc', './img/invate/desc.png'],
    ['btn_next', './img/btn_next.png'],
    ['clothing_bg', './img/clothing/bg.jpg'],
    ['main_role', './img/clothing/main_role.png'],
    ['clothes_tips', './img/clothing/clothes_tips.png'],
    ['return', './img/clothing/return.png'],
    ['cebian', './img/clothing/cebian.png'],
    ['btn_go', './img/clothing/btn_go.png'],
    ['hair_0', './img/clothing/hair_0.png'],
    ['dress_0', './img/clothing/dress_0.png'],
    ['spark', './img/spark.png'],
]
resources.btn_clothesType = [
    ['btn_hair', './img/clothing/btn_hair.png'],
    ['btn_acc', './img/clothing/btn_acc.png'],
    ['btn_dress', './img/clothing/btn_dress.png'],
    ['btn_shoes', './img/clothing/btn_shoes.png'],
]
resources.btn_hair = [
    ['btn_hair_1', './img/clothing/btn_hair_1.png', {color: 'blue', style: 'sexy'}],
    ['btn_hair_2', './img/clothing/btn_hair_2.png', {color: null, style: null, back: 'hair_2_b'}],
    ['btn_hair_3', './img/clothing/btn_hair_3.png', {color: null, style: null}],
    ['btn_hair_4', './img/clothing/btn_hair_4.png', {color: 'black', style: 'lovely', back: 'hair_4_b'}],
    ['btn_hair_5', './img/clothing/btn_hair_5.png', {color: 'green', style: 'classic'}],
    ['btn_hair_6', './img/clothing/btn_hair_6.png', {color: 'brown', style: 'mori'}]
]
resources.hair = [
    ['hair_1', './img/clothing/hair_1.png'],
    ['hair_2', './img/clothing/hair_2.png'],
    ['hair_3', './img/clothing/hair_3.png'],
    ['hair_4', './img/clothing/hair_4.png'],
    ['hair_5', './img/clothing/hair_5.png'],
    ['hair_6', './img/clothing/hair_6.png'],
    ['hair_2_b', './img/clothing/hair_2_b.png'],
    ['hair_4_b', './img/clothing/hair_4_b.png'],
]
resources.btn_shoes = [
    ['btn_shoes_1', './img/clothing/btn_shoes_1.png', {color: 'brown', style: 'mori'}],
    ['btn_shoes_2', './img/clothing/btn_shoes_2.png', {color: 'green', style: 'classic'}],
    ['btn_shoes_3', './img/clothing/btn_shoes_3.png', {color: 'blue', style: 'sexy'}],
    ['btn_shoes_4', './img/clothing/btn_shoes_4.png', {color: null, style: null}],
    ['btn_shoes_5', './img/clothing/btn_shoes_5.png', {color: null, style: null}],
    ['btn_shoes_6', './img/clothing/btn_shoes_6.png', {color: 'black', style: 'lovely'}]
]
resources.shoes = [
    ['shoes_1', './img/clothing/shoes_1.png'],
    ['shoes_2', './img/clothing/shoes_2.png'],
    ['shoes_3', './img/clothing/shoes_3.png'],
    ['shoes_4', './img/clothing/shoes_4.png'],
    ['shoes_5', './img/clothing/shoes_5.png'],
    ['shoes_6', './img/clothing/shoes_6.png']
]
resources.btn_acc = [
    ['btn_acc_1', './img/clothing/btn_acc_1.png', {color: 'brown', style: 'mori', back: "acc_1_b"} ],
    ['btn_acc_2', './img/clothing/btn_acc_2.png', {color: 'black', style: 'lovely'}],
    ['btn_acc_3', './img/clothing/btn_acc_3.png', {color: 'blue', style: 'sexy'}],
    ['btn_acc_4', './img/clothing/btn_acc_4.png', {color: null, style: null}],
    ['btn_acc_5', './img/clothing/btn_acc_5.png', {color: 'green', style: 'classic'}],
    ['btn_acc_6', './img/clothing/btn_acc_6.png', {color: null, style: null}]
]
resources.acc = [
    ['acc_1', './img/clothing/acc_1.png'],
    ['acc_2', './img/clothing/acc_2.png'],
    ['acc_3', './img/clothing/acc_3.png'],
    ['acc_4', './img/clothing/acc_4.png'],
    ['acc_5', './img/clothing/acc_5.png'],
    ['acc_6', './img/clothing/acc_6.png'],
    ['acc_1_b', './img/clothing/acc_1_b.png'],
]
resources.btn_dress = [
    ['btn_dress_1', './img/clothing/btn_dress_1.png', {color: null, style: null}],
    ['btn_dress_2', './img/clothing/btn_dress_2.png', {color: 'brown', style: 'mori'}],
    ['btn_dress_3', './img/clothing/btn_dress_3.png', {color: 'blue', style: 'sexy'}],
    ['btn_dress_4', './img/clothing/btn_dress_4.png', {color: null, style: null}],
    ['btn_dress_5', './img/clothing/btn_dress_5.png', {color: 'green', style: 'classic', back: 'dress_5_b'}],
    ['btn_dress_6', './img/clothing/btn_dress_6.png', {color: 'black', style: 'lovely'}]
]
resources.dress = [
    ['dress_1', './img/clothing/dress_1.png'],
    ['dress_2', './img/clothing/dress_2.png'],
    ['dress_3', './img/clothing/dress_3.png'],
    ['dress_4', './img/clothing/dress_4.png'],
    ['dress_5', './img/clothing/dress_5.png'],
    ['dress_6', './img/clothing/dress_6.png'],
    ['dress_5_b', './img/clothing/dress_5_b.png'],
]

resources.role_sakan = [
    ['invate_card_sakan', './img/invate/card_sakan.png'],
    ['invate_color_sakan', './img/invate/color_sakan.png'],
    ['invate_role_sakan', './img/invate/role_sakan.png'],
    ['invate_theme_sakan', './img/invate/theme_sakan.png']
]

resources.role_aolinv = [
    ['invate_card_aolinv', './img/invate/card_aolinv.png'],
    ['invate_color_aolinv', './img/invate/color_aolinv.png'],
    ['invate_role_aolinv', './img/invate/role_aolinv.png'],
    ['invate_theme_aolinv', './img/invate/theme_aolinv.png']
]

resources.role_qiaoka = [
    ['invate_card_qiaoka', './img/invate/card_qiaoka.png'],
    ['invate_color_qiaoka', './img/invate/color_qiaoka.png'],
    ['invate_role_qiaoka', './img/invate/role_qiaoka.png'],
    ['invate_theme_qiaoka', './img/invate/theme_qiaoka.png']
]

resources.role_hesang = [
    ['invate_card_hesang', './img/invate/card_hesang.png'],
    ['invate_color_hesang', './img/invate/color_hesang.png'],
    ['invate_role_hesang', './img/invate/role_hesang.png'],
    ['invate_theme_hesang', './img/invate/theme_hesang.png']
]

resources.page_rating = [
    ['bg_rating', './img/rating/bg_rating.jpg'],
    ['bg_flower', './img/rating/bg_flower.png'],
    ['bg_white', './img/rating/bg_white.png'],
    ['flower', './img/rating/flower.png'],
    ['flower_2', './img/rating/flower_2.png'],
    ['bg_result', './img/rating/bg_result.jpg'],
    ['border_face', './img/rating/border_face.png'],
    ['border_back', './img/rating/border_back.png'],
    ['btn_restart', './img/rating/restart.png'],
    ['btn_save', './img/rating/btn_save.png'],
    ['btn_download', './img/rating/download.png'],
    ['share_top', './img/rating/share_top.png'],
    ['tips_save', './img/rating/tips_save.png'],
    ['code', './img/rating/code.png'],
]

resources.page_story = [
    ['story_bg_1', './img/bg_story/story_bg_1.jpg', {x: 100, y: 200}],
    ['story_bg_2', './img/bg_story/story_bg_2.jpg', {x: 100, y: -200}],
    ['story_bg_3', './img/bg_story/story_bg_3.jpg', {x: -80, y: 100}],
    ['story_bg_4', './img/bg_story/story_bg_4.jpg', {x: 100, y: -200}],
    ['story_bg_5', './img/bg_story/story_bg_5.jpg', {x: -100, y: 200}],
    ['story_face', './img/bg_story/story_face.png'],
    ['join', './img/bg_story/join.png'],
    ['jump', './img/bg_story/jump.png'],
    ['music', './img/bg_story/music.png']
]


resources.story_text_1 = [
    ['text_1_1', './img/bg_story/text_1_1.png', {x: 48, y: 717}],
    ['text_1_2', './img/bg_story/text_1_2.png', {x: 161, y: 828}],
    ['text_1_3', './img/bg_story/text_1_3.png', {x: 81, y: 941}],
]

resources.story_text_2 = [
    ['text_2_1', './img/bg_story/text_2_1.png', {x: 48, y: 717}],
    ['text_2_2', './img/bg_story/text_2_2.png', {x: 161, y: 828}],
    ['text_2_3', './img/bg_story/text_2_3.png', {x: 81, y: 941}]
]

resources.story_text_3 = [
    ['text_3_1', './img/bg_story/text_3_1.png', {x: 26, y: 791}],
    ['text_3_2', './img/bg_story/text_3_2.png', {x: 60, y: 903}]
]

resources.story_text_4 = [
    ['text_4_1', './img/bg_story/text_4_1.png', {x: 32, y: 777}],
    ['text_4_2', './img/bg_story/text_4_2.png', {x: 100, y: 891}]
]

resources.story_text_5 = [
    ['text_5_1', './img/bg_story/text_5_1.png', {x: 40, y: 740}],
    ['text_5_2', './img/bg_story/text_5_2.png', {x: 60, y: 840}],
    ['text_5_3', './img/bg_story/text_5_3.png', {x: 20, y: 940}]
]
