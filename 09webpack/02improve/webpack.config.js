const path = require("path");

module.exports = {
    mode: "development",
    //指定打包的入口文件
    entry: "./index.js",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
};