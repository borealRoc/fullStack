const http = require('http')
const io = require('socket.io')
const httpServer = http.createServer()
httpServer.listen(3000)
const wsServer = io.listen(httpServer)

const socketArr = []
const mesArr = []

wsServer.on('connection', socket => {
    socketArr.push(socket)

    socket.on('disconnect', () => {
        const n = socketArr.indexOf(socket)
        if (n !== -1) {
            socketArr.splice(n, 1)
        }
    })

    socket.on('sendMes', res => {
        mesArr.push(res)
        console.log('res', res)
        console.log('socketArr', socketArr.length)
        socketArr.forEach( socketItem => {
            if (socketItem !== socket) {
                console.log('mesArr', mesArr)
                socketItem.emit('receiveMes', mesArr)
            }
        })
    })
})
