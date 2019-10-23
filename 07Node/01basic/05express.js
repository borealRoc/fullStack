const express = require('express')
const body = require('body-parser');


const app = express()
app.listen(3000)

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
// post请求，使用body-parser中间件
app.use(body.urlencoded({
    extended: false
}))
// 手动实现body-parser的urlencoded方法
const myBody = require('./libs/urlencoded')
app.use(myBody.urlencoded())
app.post('/reg', (req, res) => {
    res.send(req.body)
})
// post请求，处理文件
const multer  = require('multer')
const upload = multer({ dest: './uploads' })
app.use(upload.any())
app.post('/profile', (req, res) => {
    console.log(req.files)
    res.send(req.files)
})

// cookie操作
const cookieParser = require('cookie-parser')
app.use(cookieParser('thisisasecreetkey')); //自己保管的一份密钥
app.get('/cookie', (req, res) => {
    console.log('cookie', req.cookies)
    console.log('signedCookieds', req.signedCookies)

    res.cookie('money', 100.00, {
        // domain: '',
        // path: '',
        maxAge: 24 * 3600 * 1000, //1天
        httpOnly: true,
        // secture: true,
        signed: true
    })
    res.send('OK')
})
// cookie-session
const cookieSession = require('cookie-session')
app.use(cookieSession({
    keys: ['lskdjflksjflks', 'skdhfksahdfkjsa', 'suibianluanshude'],
    maxAge: 20 * 60 * 1000
}))
app.get('/session', (req, res) => {
    if (req.session['amount']) {
        req.session['amount'] += 1
    } else {
        req.session['amount'] = 1
    }
    req.session['money'] = 100.00
    res.send(`欢迎您，这是您第${req.session['amount']}访问本网站，您的余额还有&yen;${req.session['money']}`)
})

// 托管静态文件，使用 Express 中的 express.static 内置中间件函数, 一般放在最后
app.use(express.static('www'))