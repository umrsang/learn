'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async getNewsList() {
    //通过接口返回数据
    var url = this.config.api.news;
    var api = url + "appapi.php?a=getPortalList&catid=20&page=1";
    var response = await this.ctx.curl(api);
    var data = JSON.parse(response.data);
    return data.result
  }
  async getNewsDetail({aid}) {
    //通过接口返回数据
    var url = this.config.api.news;
    var api = url + `appapi.php?a=getPortalArticle&aid=${aid}`;
    var response = await this.ctx.curl(api);
    var data = JSON.parse(response.data);
    return data.result
  }
}

module.exports = NewsService;
