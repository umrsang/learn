var fs = require('fs');

var rs = fs.createReadStream('.\resource\test.txt', {highWaterMark: 10});

var data = '';
rs.on('data', function(chunk){
  data += chunk;
})
rs.on('end', function(chunk){
  console.log(data);
})