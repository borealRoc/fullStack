const fs = require('fs');

// 同步读取
const data = fs.readFileSync('./config.js');
console.log('同步读取', data);

// 异步读取
fs.readFile('./config.js', (err, data) => {
    if (err) console.log(err)
    else console.log('异步读取', data)
})

// 测试代码
console.log('测试代码')

// 异步读取promise写法
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
readFile('./config.js').then(data => {console.log('异步读取promise写法', data)})

// v10.0
// fs Promises API
const {promises} = require('fs')
promises.readFile('./config.js').then(data => {console.log('fs Promises API', data)})

// generator


// async + await
// (async () => {
//     const data = await fs.readFile('./config.js')
//     console.log('异步读取async + await写法', data)
// })()