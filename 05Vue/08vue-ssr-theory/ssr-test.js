// 服务端渲染，并将页面返回给浏览器的基本Demo
const express = require('express')
const Vue = require('vue')

const app = express()
const render = require('vue-server-renderer').createRenderer()
const page = new Vue({
    data: {
        name: 'xu',
        age: 17 
    },
    template: `
        <div id='vueSSRTest'>
            <h1>I'm {{name}}, I'm {{age}} years old.</h1>
        </div>
    `
})

app.get('/', async (req, res) => {
    const html = await render.renderToString(page)
    res.send(html)
})
app.listen(3000)