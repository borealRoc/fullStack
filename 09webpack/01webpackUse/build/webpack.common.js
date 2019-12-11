const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const merge = require("webpack-merge")
const devConfig = require("./webpack.dev")
const prodConfig = require("./webpack.prod")

const commonConfig = {
    entry: {
        // 手动进行代码分割
        // lodash: "./modules/lodash.js",
        index: "./index.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name]_[hash].[ext]",
                        outputPath: "images/",
                        limit: 8 * 1024
                    }
                },
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader"],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            title: "自定义标题",
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
    ],
}

module.exports = env => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig);
    } else {
        return merge(commonConfig, devConfig);
    }
}