
var getUrlProp = function(url){
    var p = url.split("?");
    if(!p[1]){
        return {}
    }
    var ps = p[1].split("&");

    var prop = {};
    for(var i=0; i<ps.length; i++){
        var a = ps[i].split("=");
        prop[a[0]] = a[1];
    }
    return prop;
}


var getUrlArg = function(){
    var data = {};
    var argStr = window.location.search;
    var re = new RegExp("([^&?]*)=([^&?]*)","g");
    var temp = null;
    while(temp=re.exec(argStr)){
        data[temp[1]] = temp[2];
    }
    return data;
},