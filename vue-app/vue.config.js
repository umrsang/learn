// vue.config.js


const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
    devServer: {
        port: 8030
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].meta = {viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'};
                args[0].title = 'haiwaiWaltz';
                return args
            });
    }
    // configureWebpack: config => {
    //     if (process.env.NODE_ENV === 'production') {
    //         // 为生产环境修改配置...
    //         config.plugins.push( // 在vue-cli生成的文件的基础上，只有下面这个才是我们要配置的
    //             new PrerenderSPAPlugin({
    //                 // Index.html is in the root directory.
    //                 staticDir: path.join(__dirname, 'dist'),
    //                 routes: ['/'],
    //                 minify: {
    //                     collapseBooleanAttributes: true,
    //                     collapseWhitespace: true,
    //                     decodeEntities: true,
    //                     keepClosingSlash: true,
    //                     sortAttributes: true
    //                 },
    //                 renderer: new Renderer({
    //                     inject: {
    //                         foo: 'bar'
    //                     },
    //                     headless: false,
    //                     renderAfterDocumentEvent: 'render-event'
    //                 })
    //             })
    //         );
    //         // return config;
    //     }
        // } else {
        // return config;
        // }
    // }
}