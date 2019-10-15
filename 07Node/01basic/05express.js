const express = require('express')
const fs = require('fs')

const app = express()

app.get('./user', (req, res) => {
    res.statusCode = 200; // 请求成功
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify([{ name: "xu", age: 20 }]));
    res.end();
})
app.listen(3000)