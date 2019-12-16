# 一、 webpack基础及使用
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
            - hot:true, css可以做到HMR，修改JS还是会自动刷新浏览器
            - hotOnly:true, CSS模块可以HMR，JS模块不可以HMR，也不会自动刷新浏览器
            - module.hot.accept：原生webpack手动处理js模块HMR
            - webpack官方没有办法自动处理js模块HMR，但一些框架可以通过一些loarder实现[比如：react-hot-loader]
5. 拓展
    - babel: JavaScript编译器
        - babel-loader[编译es6、react]
            - `npm i babel-loader @babel/core @babel/preset-env -D`
                - babel-loader: webpack 与 babel的通信桥梁
                - @babel/core: babel核心工具代码库
                - @babel/preset-env: es6转成es5
            -  把一些高级特性[比如promise]也进行编译
                - polyfill：以全局变量的方式注入进来的[比如windows.Promise]，它会造成全局对象的污染
                - plugin-transform-runtime：babel-runtime为你的代码提供了一个沙盒环境，所以不会像babel-polyfill一样污染全局变量，因此适用于开发组件库。但是babel-runtime不能模拟实例方法，即内置对象原型上的方法[比如Array.prototype.concat]
            - 配置React打包环境[编译.jsx文件]
                - `npm install --save-dev @babel/preset-react`
    - 性能优化
        - tree Shaking
            - 检测import的文件，按引用，使用编译
            - 同时在package.json设置`"sideEffects": ["*.css"]`, 表示不检测css文件的import
        - development和Production模式区分打包
        - 代码分割
            - 使用场景：如我们引入一个第三方的工具库，体积为1mb，而我们的业务逻辑代码也有1mb，那么打包出来的体积大小会在2mb。
            - 导致问题：体积大，加载时间长业务逻辑会变化
            - 解决思路：第三方库和业务代码分开打包，浏览器加载JS文件是非阻塞的，所以同时加载两个1mb的文件性能优于加载一个1mb的文件
                - 手动实现：多入口，第三方库和业务代码分开打包
                - webpack自动实现：一个入口，使用`optimization: {splitChunks: {chunks: "all"}}`
            - 代码利用率：把异步代码抽离出来
                - 需要的时候再加载异步代码：`npm install --save-dev @babel/plugin-syntax-dynamic-import`
                - 网络有空闲时自动加载异步代码[模板注释]: `/* webpackPrefetch: true */`
# 二、 webpack原理
1. 如何编写loader[一个函数]
    - source: 源文件返回值
    - this.query: loader参数，或使用loader-utils插件
    - this.async(): 处理loader异步事件
    - this.callback(): 在loader里返回多个值
2. 如何编写plugins[一个类]
    - plugin是一个类，里面包含一个apply函数，接受一个参数[compiler],表示webpack实例
    - constructor(opts): 在插件里获取参数
    - hooks.emit: 定义在某个时刻触发
