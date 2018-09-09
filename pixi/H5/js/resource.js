var resources = {};

resources.loader =  new PIXI.loaders.Loader();

resources.assetLoad = function (cb) {
    var arr = this.list.concat(this["role_" + main.role])
                        .concat(this.btn_clothesType)
                        .concat(this.hair)
                        .concat(this.shoes)
                        .concat(this.acc)
                        .concat(this.dress)
                        .concat(this.btn_hair)
                        .concat(this.btn_shoes)
                        .concat(this.btn_acc)
                        .concat(this.btn_dress)
                        .concat(this.page_rating);

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
    ['tips', './img/clothing/tips.png'],
    ['cebian', './img/clothing/cebian.png'],
    ['return', './img/clothing/return.png'],
    ['btn_go', './img/clothing/btn_go.png'],
    ['hair_0', './img/clothing/hair_0.png'],
    ['dress_0', './img/clothing/dress_0.png']
]
resources.btn_clothesType = [
    ['btn_dress', './img/clothing/btn_dress.png'],
    ['btn_shoes', './img/clothing/btn_shoes.png'],
    ['btn_acc', './img/clothing/btn_acc.png'],
    ['btn_hair', './img/clothing/btn_hair.png'],
]
resources.btn_hair = [
    ['btn_hair_1', './img/clothing/btn_hair_1.png'],
    ['btn_hair_2', './img/clothing/btn_hair_2.png', 'hair_2_b'],
    ['btn_hair_3', './img/clothing/btn_hair_3.png'],
    ['btn_hair_4', './img/clothing/btn_hair_4.png', 'hair_4_b'],
    ['btn_hair_5', './img/clothing/btn_hair_5.png'],
    ['btn_hair_6', './img/clothing/btn_hair_6.png']
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
    ['btn_shoes_1', './img/clothing/btn_shoes_1.png'],
    ['btn_shoes_2', './img/clothing/btn_shoes_2.png'],
    ['btn_shoes_3', './img/clothing/btn_shoes_3.png'],
    ['btn_shoes_4', './img/clothing/btn_shoes_4.png'],
    ['btn_shoes_5', './img/clothing/btn_shoes_5.png'],
    ['btn_shoes_6', './img/clothing/btn_shoes_6.png']
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
    ['btn_acc_1', './img/clothing/btn_acc_1.png', "acc_1_b"],
    ['btn_acc_2', './img/clothing/btn_acc_2.png'],
    ['btn_acc_3', './img/clothing/btn_acc_3.png'],
    ['btn_acc_4', './img/clothing/btn_acc_4.png'],
    ['btn_acc_5', './img/clothing/btn_acc_5.png'],
    ['btn_acc_6', './img/clothing/btn_acc_6.png']
]
resources.acc = [
    ['acc_1', './img/clothing/acc_1.png'],
    ['acc_1_b', './img/clothing/acc_1_b.png'],
    ['acc_2', './img/clothing/acc_2.png'],
    ['acc_3', './img/clothing/acc_3.png'],
    ['acc_4', './img/clothing/acc_4.png'],
    ['acc_5', './img/clothing/acc_5.png'],
    ['acc_6', './img/clothing/acc_6.png']
]
resources.btn_dress = [
    ['btn_dress_1', './img/clothing/btn_dress_1.png'],
    ['btn_dress_2', './img/clothing/btn_dress_2.png'],
    ['btn_dress_3', './img/clothing/btn_dress_3.png'],
    ['btn_dress_4', './img/clothing/btn_dress_4.png'],
    ['btn_dress_5', './img/clothing/btn_dress_5.png', "dress_5_b"],
    ['btn_dress_6', './img/clothing/btn_dress_6.png']
]
resources.dress = [
    ['dress_1', './img/clothing/dress_1.png'],
    ['dress_2', './img/clothing/dress_2.png'],
    ['dress_3', './img/clothing/dress_3.png'],
    ['dress_4', './img/clothing/dress_4.png'],
    ['dress_5', './img/clothing/dress_5.png'],
    ['dress_5_b', './img/clothing/dress_5_b.png'],
    ['dress_6', './img/clothing/dress_6.png']
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
    ['bg_result', './img/rating/bg_result.jpg'],
    ['border_face', './img/rating/border_face.png'],
    ['border_back', './img/rating/border_back.png']
]