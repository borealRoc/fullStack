# 一、基础知识
1. 模块
    - 内建模块：node自带[直接用]
    - 第三方模块：[先装后用]
    - 自定义模块
        - 导出: module.exports
        - 导入: require
2. 核心API
    - buffer: 八位字节组成的[类]数组，可以有效的在js中存储二进制数据的缓存区。用十六进制表示
    - fs, http, stream
3. 其它
    -  `npm i nodemon -g`: 在每次修改js文件需要重新执行才能生效，安装nodemon可以监视文件改动，自动重启
    - 调试
# 二、框架
1. express
    - 路由
        - `app.method('./', (req, res, next) => {})`
        - method: use, get, post
        - use会拦截所有请求，最先执行。所以use内部必须next()
    - 中间件
        - body-parser: 处理post请求普通数据
        - multer: 处理post请求file数据
        - cookie && session
            - cookie: 存储在浏览器，请求服务器时，会顺便发给服务器
                - 问题：不安全。用户可以篡改
                - 解决：设置httpOnly; 对cookie进行签名[浏览器的cookie容量只有4kb，签名会让cookie变长变大]
            - session: 存储在服务器，不是独立存在，基于cookie[token:存储在cookie里面的sessionID]
                - 问题：session挟持[sessionID被盗取]
                - 解决：缩短sessionID有效期，定时更新
        - cookie-parse
            - 读取：req.cookies: 普通cookie, signedCookies: 签名过的cookie
            - 写入: 
            ```javascript
            res.cookie('key', value, {
                domain: //cookie所在的域[cookie本身不能跨域]
                path:   //cookie所在的目录
                maxAge: //cookie过期时间
                httpOnly: true //通过js无法读取cookie信息
                secture: true //示浏览器仅通过 HTTPS 连接传回 cookie
                signed: true //对value进行签名[s:value.签名]
            })
            ```
        - cookie-session
2. koa