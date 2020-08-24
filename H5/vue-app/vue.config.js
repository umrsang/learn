// vue.config.js


const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  devServer: {
    port: 8030,
    open: true,
  },
  productionSourceMap: false,
  css: {
    sourceMap: false,
    extract: false
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].meta = {
          viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        };
        args[0].title = 'haiwaiWaltz';
        return args
      });


    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        options.limit = 2000000;
        return options
      })
  }
}