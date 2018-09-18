window.onload = function() {
    var cav = document.getElementById("cav");
    var ctx=cav.getContext("2d");
    var img=document.createElement("img");
    img.src = "../../img/slogan.png"
    var posy = 0;
    var count = 0  
    setInterval(function(){
        ctx.clearRect(0,0,800,600);
        if(count < 10){
            for(var i=0; i<300; i++){ 
                ctx.drawImage(img,0,i,505,10,Math.sin((i * 0.05)+count) * 10,i,505,10);
            }
            count += 0.4;
        }else{
            ctx.drawImage(img,0,0);
        }
    }, 10)

    setInterval(function(){
        count = 0
    }, 2000)
}