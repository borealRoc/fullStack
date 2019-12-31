const Koa = require("koa");
const app = new Koa();
const Router = require('koa-router')
const router = new Router({ prefix: '/api/users' })

const users = [
    { name: "张三", id: 3 },
    { name: "李四", id: 4 },
    { name: "王五", id: 5 },
    { name: "马六", id: 6 },
];

router.get('/:id', ctx => {
    const user = users.find(u => u.id == ctx.params.id)
    if (user) {
        ctx.body = { ok: 1, user };
    }
    else {
        ctx.body = { ok: 0 }
    }
})

app.use(router.routes());
app.listen(3001);