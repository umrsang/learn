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
        {name: "entry_bg", src: '/img/entry/bg.png'},
        {name: "entry_role", src: '/img/entry/role.png'},
        {name: "entry_logo", src: '/img/entry/logo.png'},
        {name: "entry_start", src: '/img/entry/start.png'},
    ]
}