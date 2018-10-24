const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    pageOne: './src/index.js',
    pageTwo: './src/entry_2.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
        use: ['css-loader', 'sass-loader']
      })

      // use: [{
      //     loader: "style-loader" // 将 JS 字符串生成为 style 节点
      // }, {
      //     loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
      // }, {
      //     loader: "sass-loader" // 将 Sass 编译成 CSS
      // }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'entry_pageOne.html', //输出的html路径
      inject: true,
      title: 'this is pageOne.html',
      chunks: ['pageOne'], //打包时只打包main和a的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
    }),
    new HtmlWebpackPlugin({
      filename: 'entry_pageTwo.html', //输出的html路径
      inject: true,
      title: 'this is pageTwo.html',
      chunks: ['pageTwo'], //打包时只打包main和a的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
    }),
    new ExtractTextPlugin('style.css')
  ]
};