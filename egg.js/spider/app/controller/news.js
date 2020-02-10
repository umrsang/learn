'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    var list = await this.service.news.getNewsList();
    await this.ctx.render('newsList.html', {
      list: list
    });
  }

  async detail() {
    var aid = this.ctx.params.aid;
    var data = await this.service.news.getNewsDetail({aid: aid});
    console.log('data', data[0])
    await this.ctx.render('article.html', data[0]);
  }
  

}

module.exports = NewsController;
