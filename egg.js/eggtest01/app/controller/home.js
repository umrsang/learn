'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  
  async egg() {
    const { ctx } = this;
    ctx.body = 'this is HomeController-egg';
  }
}

module.exports = HomeController;
