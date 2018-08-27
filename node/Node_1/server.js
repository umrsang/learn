const http = require("http");
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const URL = require('url');

var newServer = http.createServer(function (req, res) {
    var err = false;
    var parm = URL.parse(req.url, true).query;
    console.log(parm);
    fs.readFile('..\\resource\\'+ path.basename(req.url), (err, data) => {
        if (err) {
            res.write(err.toString());
     
        } else {
            res.write(data);
        }
        res.end();
    });

});

newServer.listen(8009);