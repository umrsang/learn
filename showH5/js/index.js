var mian, view, imgFrom;
var pageName = "螺旋圆舞曲换装H5";

window.onload = function () {
  
    resources.assetLoad(function () {
        $(".loading_page").css({
            opacity: 0,
            transform: "scale(1.5)"
        });

        setTimeout(function(){
            view = new View();
            view.showView(0);
            view.initUpload();
            $(".loading_page").hide();
        }, 500)
    });
    
    

}

