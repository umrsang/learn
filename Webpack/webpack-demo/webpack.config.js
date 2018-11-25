const path = require('path');
const webpack =  require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    index: './src/entry/index.js',
    // pageTwo: './src/entry_2.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    port: 3001,
    hot: true
  },
  module: {
    rules: [{
      test: /\.vue$/, 
      exclude: /node_modules/,
      loader: 'vue-loader'
    },{
      test: /\.js$/,  
      exclude: /node_modules/,  
      loader: 'babel-loader'
    }, {
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
      use: [
        MiniCssExtractPlugin.loader,
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './postcss.config.js'
            }
          }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //输出的html路径
      template: "./src/entry/index.html",
      inject: true,
      title: 'this is pageOne.html',
      chunks: ['index'], //打包时只打包main和a的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'entry_pageTwo.html', //输出的html路径
    //   inject: true,
    //   title: 'this is pageTwo.html',
    //   chunks: ['pageTwo'], //打包时只打包main和a的js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
    // }),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new VueLoaderPlugin()
  ]
};