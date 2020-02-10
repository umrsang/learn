var fs = require('fs');

var txt = __dirname + '/resource/test.txt';
var rs = fs.createReadStream(txt, {highWaterMark: 10});

/*读取文件 防止被隐式转换*/
// var data = [];
// rs.on('data', function(chunk){
//   data.push(chunk);
// })
// rs.on('end', function(chunk){
//   var buf = Buffer.concat(data);
//   console.log(buf.toString());
// })

fs.stat(txt, function(err, res){
  console.log(res);
})