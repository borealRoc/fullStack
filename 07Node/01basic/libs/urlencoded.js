const querystring = require('querystring');

module.exports = {
    urlencoded() {
        return (req, res, next) => {
            let data = []
            req.on('data', buffer => {
                data.push(buffer)
            })
            req.on('end', () => {
                let post = querystring.parse(Buffer.concat(data).toString())
                req.body = post
                next();
            })
        }
    }
}