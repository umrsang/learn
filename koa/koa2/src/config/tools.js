const bcrypt = require("bcryptjs");
console.log(bcrypt);


const tools = {
    encrypt: function(password){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    console.log('hash success'); 
    return hash;
  }
}

module.exports = tools;