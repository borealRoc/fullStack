const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")

module.exports = {
    mode: "development",
    //指定打包的入口文件
    entry: "./index.js",
    //指定打包后的资源位置
    output: {
        //公共路径设置
        //publicPath: "https://cdn.baidu.com",
        path: path.resolve(__dirname, "./build"),
        filename: "index.js"
    },
    // 源代码与打包后的代码的映射关系
    devtool: "cheap-module-eval-source-map",
    // 启用webpack的静态服务器
    devServer: {
        // 服务启动后，./build下面的文件没有了，因为devServer会把打包后的文件放到文件中，从而提升速度
        contentBase: "./build",
        // 服务启好后，自动弹出浏览器
        open: true,
        port: 8081,
        // 代理
        proxy: {
            '/api': {
                target: 'http://localhost:3000/'
            }
        },
        // 刷新分为两种：
        // 一种是页面刷新，不保留页面状态，就是简单粗暴，直接window.location.reload()；
        // 另一种是基于 WDS（Webpack-dev-server）的模块热替换[HMR]，只需要局部刷新页面上发生变化的模块，同时可以保留当前的页面状态，比如复选框的选中状态、输入框的输入等。
        // 原本的devServer在修改文件[css/js]后，会自动刷新浏览器进行更新，属于前者
        // 只加hot: ture，修改css可以做到HMR，修改JS还是会自动刷新浏览器
        // 再加hotOnly: ture，CSS模块可以HMR，JS模块不可以HMR，也不会自动刷新浏览器
        // 这两个属性CSS模块HMR的前提是不要用HotModuleReplacementPlugin？[暂时存疑]
        hot: true,
        hotOnly: true,
    },
    module: {
        //webpack默认只认识js模块，那么遇到非js模块该怎么办？
        //遇到不认识的模块就在这里找loader解决
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    // file-loader就是把模块，放在另外一个目录里，并且把位置返回给我们
                    // 可用于图片，字体，视频，音频......
                    // url-loader和file-loader类似，file-loader能做的事情url-loader都能做，但它可以限定模块的体积，根据体积判断是否需要转换成base64,减少http请求
                    // loader: 'file-loader',
                    loader: "url-loader",
                    options: {
                        //name是打包前模块的名称，ext是打包前的模块格式
                        name: "[name]_[hash].[ext]",
                        outputPath: "images/",
                        // 8kb以下的图片转化成base64
                        limit: 8 * 1024
                    }
                },
            },
            {
                test: /\.s?css$/,
                // loader是有执行顺序，从右往左
                // css-loader: 将 CSS 转化成 CommonJS 模块解释@import 和 url() ，即分析模块之间的关系，最后合成一个css
                // style-loader: 将 JS 字符串生成为 style 节点，以style节点挂载到页面head中
                // sass-loader: compiles Sass to CSS
                // less-loader: compiles Less to CSS
                // postcss-loader: [autoprefixer插件] 给 CSS3 的属性添加前缀
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
                // use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader"],
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
        // 在打包结束后，自动生成一个html文件，将打包好的文件[比如js,css]引入其中
        new HtmlWebpackPlugin({
            // 以"./index.html"为模板生成html文件
            template: "./index.html",
            // 模板html的标题要进行如下定义：<title><%= htmlWebpackPlugin.options.title %></title>
            title: "自定义标题",
            // 生成的html文件名
            filename: "index.html"
        }),
        //在打包之前，先帮我们把生成目录删除一下
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // 这里要生效，需要把上面的“style-loader”改成“MiniCssExtractPlugin.loader”
            filename: "[name].css"
        }),
        // 执行HMR
        new webpack.HotModuleReplacementPlugin()
    ],
}