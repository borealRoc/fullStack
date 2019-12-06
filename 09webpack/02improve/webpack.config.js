const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: "development",
    //指定打包的入口文件
    entry: "./index.vue",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // 忽略node_modules里面的js
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: "./index.html",
        //     title: "babel编译react",
        // }),
        // 请确保引入这个插件！
        new VueLoaderPlugin()
    ],
};