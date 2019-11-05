const xexpress = require('./xexpress')
const app = xexpress()
app.listen(3000)

app.get('/index', (req, res, next) => {
    if (req.url === '/index' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({name: 'xu', age: 17}))
        res.end()
    }
})
