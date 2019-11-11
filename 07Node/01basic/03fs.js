const fs = require('fs');


// 同步读取
const data = fs.readFileSync('./config.js');
console.log('同步读取', data);
// 异步读取
fs.readFile('./config.js', (err, data) => {
    if (err) console.log(err)
    else console.log('异步读取文件回调函数写法', data)
})
// 测试代码
console.log('测试代码')


// 异步读取promise写法
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
readFile('./config.js').then(data => console.log('异步读取文件promise写法', data))
// v10.0
// fs Promises API
const { promises } = require('fs')
promises.readFile('./config.js').then(data => console.log('fs Promises API写法', data))


const readFilePromise = promises.readFile('./config.js')
// generator
const co = require('co')
co(function* () {
    var result = yield Promise.resolve(readFilePromise)
    return result
}).then(function (value) {
    console.log('异步读取文件generator写法', value)
}, function (err) {
    console.error('异步读取文件generator写法', err.stack)
})


// async + await
const asyncReadFile = async () => {
    const data = await readFilePromise
    console.log('异步读取文件async + await写法', data)
}
asyncReadFile()