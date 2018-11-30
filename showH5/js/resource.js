var resources = {};

resources.loader = new PIXI.loaders.Loader();

resources.assetLoad = function(cb) {
  var arr = []
  for(var key in this.list) {
    arr = arr.concat(this.list[key])
  }
  var loader = this.loader;
  var len = arr.length;
  for(var i = 0; i < len; i++) {
    loader.add(arr[i].name, resourceUrlHead + arr[i].src);
  }
  loader.onProgress.add((loader, res) => {
    var progress = Math.floor(loader.progress)
    $(".loading span").html("舞会准备中..." + progress + "%")

  })
  loader.onComplete.once((a, b) => {
    console.log('onComplete');
    cb && cb();
  })
  loader.load();
}

resources.list = {
    page_begin: [
        {name: "entry_bg", src: '/img/entry/bg.jpg'},
        {name: "entry_role", src: '/img/entry/role.png'},
        {name: "entry_logo", src: '/img/entry/logo.png'},
        {name: "entry_start", src: '/img/entry/start.png'},
        {name: "music", src: '/img/music.png'}
    ],
    page_clothing: [
        {name: "clothing_bg", src:  resourceType?'/img/clothing/bg_X.jpg':'/img/clothing/bg.jpg'},
        {name: "main_role", src:  '/img/clothing/main_role.png'},
        {name: "clothes_tips", src:  '/img/clothing/clothes_tips.png'},
        {name: "inshow", src:  '/img/clothing/inshow.png'},
        {name: "cebian", src:  '/img/clothing/cebian.png'},
        {name: "btn_go", src:  '/img/clothing/btn_go.png'},
        {name: "hair_0", src:  '/img/clothing/hair_0.png'},
        {name: "dress_0", src:  '/img/clothing/dress_0.png'},
        {name: "spark", src:  '/img/clothing/spark2.png'}
    ],
    btn_clothesType: [
        {name: "btn_hair", src:  '/img/clothing/btn_hair.png'},
        {name: "btn_acc", src:  '/img/clothing/btn_acc.png'},
        {name: "btn_dress", src:  '/img/clothing/btn_dress.png'},
        {name: "btn_shoes", src:  '/img/clothing/btn_shoes.png'}
    ],
    btn_hair: [
      {name: 'btn_hair_1', src: '/img/clothing/btn_hair_1.png', color: 'blue', style: 'sexy', },
      {name: 'btn_hair_2', src: '/img/clothing/btn_hair_2.png', color: null, style: null},
      {name: 'btn_hair_3', src: '/img/clothing/btn_hair_3.png', color: null, style: null},
      {name: 'btn_hair_4', src: '/img/clothing/btn_hair_4.png', color: 'black', style: 'lovely'},
      {name: 'btn_hair_5', src: '/img/clothing/btn_hair_5.png', color: 'green', style: 'classic'},
      {name: 'btn_hair_6', src: '/img/clothing/btn_hair_6.png', color: 'brown', style: 'mori'}
    ],
    hair: [
      {name: 'hair_1', src: '/img/clothing/hair_1.png'},
      {name: 'hair_2', src: '/img/clothing/hair_2.png'},
      {name: 'hair_3', src: '/img/clothing/hair_3.png'},
      {name: 'hair_4', src: '/img/clothing/hair_4.png'},
      {name: 'hair_5', src: '/img/clothing/hair_5.png'},
      {name: 'hair_6', src: '/img/clothing/hair_6.png'},
      {name: 'hair_0_b', src: '/img/clothing/hair_0_b.png'}
    ],
    btn_shoes: [
      {name: 'btn_shoes_1', src: '/img/clothing/btn_shoes_1.png', color: 'brown', style: 'mori'},
      {name: 'btn_shoes_2', src: '/img/clothing/btn_shoes_2.png', color: 'green', style: 'classic'},
      {name: 'btn_shoes_3', src: '/img/clothing/btn_shoes_3.png', color: 'blue', style: 'sexy'},
      {name: 'btn_shoes_4', src: '/img/clothing/btn_shoes_4.png', color: null, style: null},
      {name: 'btn_shoes_5', src: '/img/clothing/btn_shoes_5.png', color: null, style: null},
      {name: 'btn_shoes_6', src: '/img/clothing/btn_shoes_6.png', color: 'black', style: 'lovely'}
    ],
    shoes: [
      {name: 'shoes_1', src: '/img/clothing/shoes_1.png'},
      {name: 'shoes_2', src: '/img/clothing/shoes_2.png'},
      {name: 'shoes_3', src: '/img/clothing/shoes_3.png'},
      {name: 'shoes_4', src: '/img/clothing/shoes_4.png'},
      {name: 'shoes_5', src: '/img/clothing/shoes_5.png'},
      {name: 'shoes_6', src: '/img/clothing/shoes_6.png'}
    ],
    btn_acc : [
      {name: 'btn_acc_1', src: '/img/clothing/btn_acc_1.png', color: 'brown', style: 'mori'},
      {name: 'btn_acc_2', src: '/img/clothing/btn_acc_2.png', color: 'black', style: 'lovely'},
      {name: 'btn_acc_3', src: '/img/clothing/btn_acc_3.png', color: 'blue', style: 'sexy'},
      {name: 'btn_acc_4', src: '/img/clothing/btn_acc_4.png', color: null, style: null},
      {name: 'btn_acc_5', src: '/img/clothing/btn_acc_5.png', color: 'green', style: 'classic', back: "acc_5_b"},
      {name: 'btn_acc_6', src: '/img/clothing/btn_acc_6.png', color: null, style: null}
    ],
    acc : [
      {name: 'acc_1', src: '/img/clothing/acc_1.png'},
      {name: 'acc_2', src: '/img/clothing/acc_2.png'},
      {name: 'acc_3', src: '/img/clothing/acc_3.png'},
      {name: 'acc_4', src: '/img/clothing/acc_4.png'},
      {name: 'acc_5', src: '/img/clothing/acc_5.png'},
      {name: 'acc_6', src: '/img/clothing/acc_6.png'},
      {name: 'acc_5_b', src: '/img/clothing/acc_5_b.png'}
    ],
    btn_dress : [
        {name: 'btn_dress_1', src: '/img/clothing/btn_dress_1.png', color: null, style: null},
        {name: 'btn_dress_2', src: '/img/clothing/btn_dress_2.png', color: 'brown', style: 'mori'},
        {name: 'btn_dress_3', src: '/img/clothing/btn_dress_3.png', color: 'blue', style: 'sexy'},
        {name: 'btn_dress_4', src: '/img/clothing/btn_dress_4.png', color: null, style: null},
        {name: 'btn_dress_5', src: '/img/clothing/btn_dress_5.png', color: 'green', style: 'classic'},
        {name: 'btn_dress_6', src: '/img/clothing/btn_dress_6.png', color: 'black', style: 'lovely'}
    ],
    dress: [
        {name: 'dress_1', src: '/img/clothing/dress_1.png'},
        {name: 'dress_2', src: '/img/clothing/dress_2.png'},
        {name: 'dress_3', src: '/img/clothing/dress_3.png'},
        {name: 'dress_4', src: '/img/clothing/dress_4.png'},
        {name: 'dress_5', src: '/img/clothing/dress_5.png'},
        {name: 'dress_6', src: '/img/clothing/dress_6.png'}
    ],
    photo: [
        {name: 'photo_bg', src: '/img/photo/bg.jpg'},
        {name: 'address', src: '/img/photo/address.png'},
        {name: 'finish', src: '/img/photo/finish.png'},
        {name: 'tips', src: '/img/photo/tips.png'},
        {name: '_photo', src: '/img/photo/photo.jpg'},
        {name: 'tempRole', src: '/img/photo/tempRole.png'},
        {name: 'scale', src: '/img/photo/scale.png'},
        {name: 'rotate', src: '/img/photo/rotate.png'},
        {name: 'mirror', src: '/img/photo/mirror.png'}
    ],
    result: [
        {name: 'result_bg_1', src: '/img/result/bg_1.jpg'},
        {name: 'result_bg_2', src: '/img/result/bg_2.jpg'},
        {name: 'pic_bg', src: '/img/result/photo_bg.jpg'},
        {name: 'logo', src: '/img/result/logo.png'},
        {name: 'qr', src: '/img/result/qr.png'},
        {name: 'a_1', src: '/img/result/a_1.png'},
        {name: 'a_2', src: '/img/result/a_2.png'},
        {name: 'a_3', src: '/img/result/a_3.png'},
        {name: 'a_4', src: '/img/result/a_4.png'},
        {name: 'btn_restart', src: '/img/result/btn_restart.png'},
        {name: 'btn_save', src: '/img/result/btn_save.png'},
        {name: 'btn_download', src: '/img/result/btn_download.png'},
        {name: 'tips_save', src: '/img/result/tips_save.png'},
        {name: 'share_top', src: '/img/result/share_top.png'}
    ]
}

