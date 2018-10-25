
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