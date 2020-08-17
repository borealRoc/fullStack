# 一、基础知识
1. 模块
    - 内建模块：node自带[直接用]
    - 第三方模块：[先装后用]
    - 自定义模块
        - 导出: module.exports
        - 导入: require
2. 核心API
    - buffer: JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区
        - 分配内存: `buffer.alloc()`
        - 从数据创建: `buffer.from(str/any...)`
        - 写入：`buf.write()`
        - 读取：`buf.toString()`
        - 合并： `Buffer.concat(buf1, buf2...)`
    - fs: `fs.readFile((err, data) => {})`
    - http: `http.createServer((req, res)=>{}).listen(3000)`
    - stream
        - 文件流: `fs.createReadStream().pipe().fs.createWriteStream()`
        - http请求： `fs.createReadStream(`www${req.url}`).pipe(res)`
        - 压缩：
            ```javascript
                const zlib = require('zlib')
                http.createServer((req, res) => {
                    let rs = fs.createReadStream(`www${req.url}`);
                    res.setHeader('content-encoding', 'gzip');
                    let gz = zlib.createGzip();
                    rs.pipe(gz).pipe(res);//浏览器最后会自己解压
                })
            ```
3. 其它
    -  `npm i nodemon -g`: 在每次修改js文件需要重新执行才能生效，安装nodemon可以监视文件改动，自动重启
    - 调试
    - node的特点
        - 非阻塞I/O
        - 事件驱动
    - 并发处理[高性能]
        - 多进程: C
        - 多线程: Java
        - [单进程单线程]异步I/O: JS
# 二、框架
1. express
    - 路由
        - `app.method('/api', (req, res, next) => {})`
        - method: use, get, post
        - use会拦截所有请求，最先执行。所以use内部必须next()
        - 托管静态文件: `app.use(express.static('www'))`
    - 中间件
        - body-parser: 处理post请求普通数据
        - multer: 处理post请求file数据
        - cookie && session
            - cookie: 存储在浏览器，请求服务器时，会附在请求头发到服务器
                - 问题：不安全。用户可以篡改
                - 解决：设置httpOnly; 对cookie进行签名[浏览器的cookie容量只有4kb，签名会让cookie变长变大]
            - session: 存储在服务器，不是独立存在，基于cookie[token:存储在cookie里面的sessionID]
                - 问题：session挟持[sessionID被盗取]
                - 解决：缩短sessionID有效期[一般设置20分钟]，定时更新
        - cookie-parse
            - 读取：
                - req.cookies: 普通cookie
                - req.signedCookies: 签名过的cookie
            - 写入: 
            ```javascript
            res.cookie('key', value, {
                domain: //cookie所在的域[cookie本身不能跨域]
                path:   //cookie所在的目录
                maxAge: //cookie过期时间
                httpOnly: true //通过js无法读取cookie信息
                secture: true //表示浏览器仅通过 HTTPS 连接传回 cookie
                signed: true //对value进行签名[s:value.签名]
            })
            ```
        - cookie-session
            - token其实只是一个32位的签名，它并没有加密
            - 拓展：签名是不可逆的，加密是可逆的
2. koa
# 三、网络编程
1. 跨域CORS
    - 简单请求: `res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")`
    - preflight请求: 
    ```javascript
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Headers": "X-Token,Content-Type",
            "Access-Control-Allow-Methods": "GET,POST,PUT",
            // 如果要携带cookie信息，则请求变为credential请求
            "Access-Control-Allow-Credentials": "true"
        })
    ```
    - 携带cookie: `res.setHeader("Access-Control-Allow-Credentials", "true")`
2. socket[两部分]
    - node
        ```javascript
        const http = require('http')
        const io = require('socket.io')
        const httpServer = http.createServer()
        httpServer.listen(8080)
        const wsServer = io.listen(httpServer)

        wsServer.on('connection', socket => {
            socket.on('disconnect', () => {})
            socket.on('clientEve', (...args) => {})
            socket.emit('serverEve', args)
        })
        ```
    - 前端
        ```html
        <script src="http://localhost:8080/socket.io/socket.io.js"></script>
        <script type="text/javascript">
        const socket = io.connect('ws://localhost:8080/')

        socket.on('connect', () => {})
        socket.on('disconnect', () => {})
        socket.emit('clientEve', ...args)
        socket.on('serverEve', res => {})
        </script>
        ```
# 四、持久化
1. 文件系统读写数据库 —— node fs模块
2. 关系型数据库 - mysql
    - 原生mysql驱动模块[增，删，改，查]
    - ORM模块Sequelize[表关联]
3. 文档型数据库 - mongodb
    - 原生模块node-mongodb-native[分页实例]
    - ODM模块mongoose
4. 键值对数据库 - redis