const path = require("path");

module.exports = {
    //指定打包的入口文件
    entry: "./index.js",
    //指定打包后的资源位置
    output: {
        //公共路径设置
        //publicPath: "https://cdn.baidu.com",
        path: path.resolve(__dirname, "./build"),
        filename: "main.js"
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
                        limit: 200000
                    }
                },

            },
            {
                test: /\.css$/,
                // loader是有执行顺序，从后往前
                // style-loader: 将 JS 字符串生成为 style 节点
                // css-loader: 将 CSS 转化成 CommonJS 模块
                // postcss-loader: [autoprefixer] 给 CSS3 的属性添加前缀
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                // sass-loader: 将 Sass 编译成 CSS
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
};
