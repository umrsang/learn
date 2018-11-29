var mian, view, imgFrom;
var addr = "广州公元前";
var pageName = "螺旋圆舞曲换装H5";

window.onload = function () {
  
    resources.assetLoad(function () {
        $(".loading_page").css({
            opacity: 0,
            transform: "scale(1.5)"
        });

        $(".to_result").click(function(){
            var val = $(".addr_input input").val();
            if(val==""){
                $(".err span").html("盯!看楼上!你忘记输入地点"); return;
            }
            if(val.length>5){
                $(".err span").html("哎呀太挤了,麻烦缩减到5个字以内"); return;
            }
            addr=val;
            $(".addr_input").removeClass("show")
            view.showView(3);
        })

        setTimeout(function(){
            view = new View();
            view.showView(0);
            view.initUpload();
            $(".loading_page").hide();
        }, 500)
    });
    
   

}

