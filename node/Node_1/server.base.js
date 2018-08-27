const http = require("http");
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const URL = require('url');

var newServer = http.createServer(function (req, res) {
    var err = false;
    var urlObj = URL.parse(req.url, true);
    var url = urlObj.pathname;
    var parm = urlObj.query;

    console.log(urlObj);
    res.write('ok');

    res.end();



});

newServer.listen(8009);