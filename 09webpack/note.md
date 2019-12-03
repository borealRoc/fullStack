# 一、 webpack基础
1. 安装[推荐局部安装]
    - `npm i webpack webpack-cli -D`
    - 安装指定版本: `npm install webpack@x.xx webpack-cli -D`
    - 查看版本信息:  `npm info webpack`
2. 定义：模块[js,css,图片...]打包工具。并且，在没有任何配置[loader]的情况下，默认只能打包js文件
3. webpack 配置文件
    - 默认的配置文件：webpack.config.js
    - 不使用默认的配置文件：`npx webpack --config webpackconfig.js //指定 webpackconfig.js 为配置文件` 
    - 把`npx webpack`命令变成`npm run bundle`：在package.json进入如下配置`"scripts": {"bundle": "webpack"}` webpack 这个地不用添加npx ,因为npm run执行的命令，会优先使用项目工程里的包，效果和npx非常类似
4. 核心概念
    - loader: 处理webpack不认识的模块
    - plugins: 当webpack运行到某个阶段时，具体做什么事情
    - devtool 
        - eval：速度最快
        - cheap：速度较快，只管行的报错，不管列的报错         
        - module：第三方模块报错
        - source-map：对于出错的代码能定位到源代码
        - 开发环境推荐配置：`cheap-module-eval-source-map` 
        - 线上环境推荐配置：`cheap-module-source-map` 
    - devServer
        - proxy: 设置代理[解决跨域]
                          

  