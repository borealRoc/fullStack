const express = require('express')

const app = express()

app.get('/api/info', (req, res) => {
    res.json({
        name: 'xu',
        age: 17
    })
})

app.listen(3000)