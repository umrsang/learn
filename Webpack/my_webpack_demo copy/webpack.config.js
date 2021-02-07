const path = require('path');

module.exports = {
  // entry 表示 入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
  // 类型可以是 string | object | array   
  entry: './main.js', // 只有1个入口，入口只有1个文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // 完整的名称
  }
}