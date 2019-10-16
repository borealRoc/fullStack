const express = require('express')

const app = express()
app.listen(8080)

// express一直都是从上往下走的

// res可以发送任何格式的数据
app.get('/index', (req, res, next) => {
    console.log('test')
    next()
})
// 可以分段处理同一个接口
app.get('/index', (req, res, next) => {
    res.send({ message: 'get' })
})
// 处理post请求[不带next参数]
app.post('/index', (req, res) => {
    res.send({ message: 'post' })
})

// 处理数据
// get请求，直接req.query获取
app.get('/get', (req, res, next) => {
    res.send(req.query);
})

// 托管静态文件，使用 Express 中的 express.static 内置中间件函数
app.use(express.static('www'))