
const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

//实例化用数据模版
const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module .exports = User = mongoose.model('users', UserSchema)