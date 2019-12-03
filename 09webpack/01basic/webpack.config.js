const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    //指定打包的入口文件
    entry: "./index.js",
    //指定打包后的资源位置
    output: {
        //公共路径设置
        //publicPath: "https://cdn.baidu.com",
        path: path.resolve(__dirname, "./build"),
        filename: "main.js"
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        // 服务启动后，./build下面的文件没有了，因为devServer会把打包后的文件放到文件中，从而提升速度
        contentBase: "./build",
        open: true,
        port: "9000",
        // 跨域
        proxy: {
            "/api": {
              target: "http://localhost:3000/"
            }
          }
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
                    // url-loader和file-loader类型，file-loader能做的事情url-loader都能做，但它可以限定模块的体积，根据体积判断是否需要转换成base64,减少http请求
                    // loader: 'file-loader',
                    loader: "url-loader",
                    options: {
                        //name是打包前模块的名称，ext是打包前的模块格式git
                        name: "[name]_[hash].[ext]",
                        outputPath: "images/",
                        limit: 200 * 1024
                    }
                },

            },
            {
                test: /\.css$/,
                // loader是有执行顺序，从后往前
                // css-loader: 将 CSS 转化成 CommonJS 模块[解释@import 和 url() ，会 import/require() 后再解析它们]
                // style-loader: 将 JS 字符串生成为 style 节点
                // postcss-loader: [autoprefixer插件] 给 CSS3 的属性添加前缀
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                // sass-loader: compiles Sass to CSS
                // less-loader: compiles Less to CSS
                // use: [“style-loader”, "css-loader", "postcss-loader", "sass-loader"]
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            }
        ],
    },
    plugins: [
        // 在打包结束后，自动生成一个html文件，将打包好的文件[比如js,css]引入其中
        new HtmlWebpackPlugin({
            // 以"./index.html"为模板生成html文件
            template: "./index.html",
            // 模板html的标题要进行如下定义：<title><%= htmlWebpackPlugin.options.title %></title>
            title: "自定义标题",
            // 生成的html文件名
            // filename: "index.html"
        }),
        //在打包之前，先帮我们把生成目录删除一下
        new CleanWebpackPlugin(),
        // 将CSS提取为独立的文件
        new MiniCssExtractPlugin({
            // 这里要生效，需要把上面的“style-loader”改成“MiniCssExtractPlugin.loader”
            filename: "[name].css"
        })

    ],
};
