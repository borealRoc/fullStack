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
    - devServer: 启动静态服务器
        - proxy: 设置代理[解决跨域]
        - HMR: 热模块替换
            - hot:true, 对CSS的修改可以做到不刷新更新，对JS不可以
            - hotOnly:true, 如果HMR不生效，浏览器也不自动刷新，就开启hotOnly
            - module.hot.accept：原生webpack处理js模块HMR
5. 拓展
    - babel: JavaScript编译器
        - babel-loader[编译es6、react]
            - `npm i babel-loader @babel/core @babel/preset-env -D`
                - babel-loader: webpack 与 babel的通信桥梁
                - @babel/core: 把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理
                - @babel/preset-env: es6转成es5
            -  把一些高级特性[比如promise]也进行编译
                - polyfill：以全局变量的方式注入进来的[比如windows.Promise]，它会造成全局对象的污染
                - plugin-transform-runtime：babel-runtime为你的代码提供了一个沙盒环境，所以不会像babel-polyfill一样污染全局变量，因此适用于开发组件库。但是babel-runtime不能模拟实例方法，即内置对象原型上的方法[比如Array.prototype.concat]
            - 配置React打包环境[编译.jsx文件]
                - `npm install --save-dev @babel/preset-react`
        - vue-loader[编译.vue文件]
        - tree Shaking: 支持ES module的引入方式,并且能只编译引入的方法
    - 


  