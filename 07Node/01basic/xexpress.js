const http = require('http')
const url = require('url')

const router = []

class Application {
    get(path, handler) {
        router.push({
            path,
            method: 'get',
            handler
        })
    }
    listen() {
        http.createServer((req, res) => {
            const {pathname} = url.parse(req.url, true)
            console.log(pathname)
            for (const route of router) {
                if (route.path === pathname) {
                    route.handler(req, res)
                    return
                }
            }
        }).listen(...arguments)
    }
}

module.exports = config => new Application()