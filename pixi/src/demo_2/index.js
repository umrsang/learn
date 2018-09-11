window.onload = function() {
    var cav = document.getElementById("cav");
    var ctx=cav.getContext("2d");
    var img=document.createElement("img");
    img.src = "../../img/slogan.png"
    var posy = 0;
    setInterval(function(){
        ctx.clearRect(0,0,800,600);
        var count = 0  
        for(var i=0; i<300; i++){ 
            count += 0.01;
            ctx.drawImage(img,0,i,505,10,Math.sin((i * 0.05)+count) * 10,i,505,10);
        }
    }, 10)

}