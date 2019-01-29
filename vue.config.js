module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    filenameHashing: true,
    pages: undefined,
    lintOnSave: true,
    runtimeCompiler: false,
    transpileDependencies: [],
    productionSourceMap: true,
    crossorigin: undefined,
    integrity: false,
    // configureWebpack: 
    // chainWebpack: 
    css: {
        modules: false,
        sourceMap: false,
        loaderOptions: {}
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.17.74/admin', // http://192.168.17.74
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}