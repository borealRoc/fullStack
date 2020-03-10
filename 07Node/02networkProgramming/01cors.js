const http = require('http')
const fs = require('fs')

// 实际开发解决跨域问题，不需要为每个接口去写，可以用 cors node模块解决
http.createServer((req, res) => {
    const {url, method} = req
    if (method === 'GET' && url === '/index') {
        fs.readFile('./index.html', (err, data) => {
            res.setHeader("Content-Type", "text/html")
            res.write(data)
            res.end()
        })
    } else if (method === 'GET' || method === 'POST' && url === '/user') {
        res.setHeader("Content-Type", "application/json")
        // 简单请求cors
        // 什么是简单请求？
        // 1. 动词为get/post/head
        // 2. 没有自定义请求头
        // 3. Content-Type是application/x- www-form-urlencoded，multipart/form-data或text/plain之一
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        // 如果要携带cookie信息，则请求变为credential请求
        res.setHeader("Access-Control-Allow-Credentials", "true")
        res.write(JSON.stringify([{name: 'xu', age: 17}]))
        res.end()
    } else if (method === 'OPTIONS' && url === '/user') {
        // preflight请求，需要响应浏览器发出的options请求(预检请求)，并根据情况设置响应头
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000", //如果允许所有：'*'
            "Access-Control-Allow-Headers": "X-Token,Content-Type",
            "Access-Control-Allow-Methods": "GET,POST,PUT",
            // 如果要携带cookie信息，则请求变为credential请求
            "Access-Control-Allow-Credentials": "true"
          })
          res.end()
    }
}).listen(3000)