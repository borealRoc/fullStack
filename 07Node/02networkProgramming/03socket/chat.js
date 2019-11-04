const http = require('http')
const io = require('socket.io')
const httpServer = http.createServer()
httpServer.listen(3000)
const wsServer = io.listen(httpServer)

wsServer.on('connection', socket => {

})