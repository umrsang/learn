'use strict';

const Controller = require('egg').Controller;

class NewController extends Controller {
  async index() {
    this.ctx.body = "新闻页面"
  }
  async article() {
    console.log(this.ctx.params)
    var list = [
      '打扫卫生', "晒被子", '倒垃圾'
    ]

    await this.ctx.render("article", {
      user: {
        name: '曾令表',
        text: '天气不错啊'
      }, 
      list
    })
  }
}

module.exports = NewController;
