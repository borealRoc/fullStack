const http = require('http')
const path = require('path')
const fs = require('fs')

http.createServer((req, res) => {
    const { url, method } = req
    // 静态页面访问
    if (url && method === 'GET') {
        // 解析文件的绝对路径
        // const absolutePath = path.resolve('./www/index.html')
        // /Users/xusp/Desktop/studySpace/FullStack/07Node/01basic/www/index.html
        // 解析文件的绝对路径
        const relativePath = `www${req.url}`
        // www/${req.url}.html
        fs.readFile(relativePath, (err, data) => {
            if (err) {
                res.statusCode = 500    //状态码
                res.write('500 - Internal Server Error!')
                res.end()
                return
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')  // html
            // res.setHeader('Content-Type', 'text/plain') //纯文本
            res.write(data)
            res.end()
        })
    // 接口编写
    } else if (url === '/user' && method === 'POST') {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json') //JSON格式
        res.write(JSON.stringify({name: 'xu', age: 17}))
        res.end()
    // 请求图片
    } else if (req.headers.accept.indexOf('image/*') !== -1 && method === 'GET') {
        console.log(url)
        fs.createReadStream(url).pipe(res)
    }
}).listen(3000)