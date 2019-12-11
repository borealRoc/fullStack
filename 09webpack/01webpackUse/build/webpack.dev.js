const webpack = require("webpack")

const devConfig = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: "../dist",
        open: true,
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:3000/'
            }
        },
        hot: true,
        hotOnly: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        // webpack自动实现代码分割
        splitChunks: {
            chunks: "all"
        }
    },
}
module.exports = devConfig