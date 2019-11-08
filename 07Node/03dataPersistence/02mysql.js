// 引入mysql模块
const mysql = require('mysql')
const uuid = require('uuid/v4')
// 设置数据库连接对象属性
const db = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'QSXdr1991',
    database: '20191107',
}

// 解决sql操作里面的地狱回调
// 方法一：引入co-mql模块
// 方法二：自己封装一个promiseQuery函数
const promiseQuery = (connection, sql = null, params = null) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
// 创建连接对象
const cnt = mysql.createConnection(db)

// 一些sql语句
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`
const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`
const DELETE_SQL = `DELETE FROM test WHERE ID = 3`
const SELECT_SQL = `SELECT * FROM test`
const UPDATE_SQL = `UPDATE test SET  message = 'hello world'`
const CREATE_SQL2 = `CREATE TABLE IF NOT EXISTS Persons
    (
    Id_P int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
    )`
const INSERT_SQL2 = `INSERT INTO Persons VALUES ('Gates', 'Bill', 'Xuanwumen 10', 'Beijing')`

// 1. 连接数据库
cnt.connect(err => {
    if (err) throw err
    console.log('1.连接数据库成功')
    // 2. 创建表
    cnt.query(CREATE_SQL, err => {
        if (err) throw err
        console.log('2.创建表成功')
        // 增
        cnt.query(INSERT_SQL, 'hello world', (err, data) => {
            if (err) throw err
            console.log('插入数据成功', data)
        })
        // 删
        cnt.query(DELETE_SQL, (err, result) => {
            if (err) throw err
            console.log('删除数据成功', result)
        })
        // 查
        cnt.query(SELECT_SQL, (err, result) => {
            if (err) throw err
            console.log('查询数据成功', result)
        })
        // 改
        cnt.query(UPDATE_SQL, (err, result) => {
            if (err) throw err
            console.log('修改数据成功', result)
        })
    })
    // promise方法创建表
    promiseQuery(cnt, CREATE_SQL2)
        // promise方法插入数据
        .then(promiseQuery(cnt, INSERT_SQL2))
        .then(res => console.log('promise方法插入数据成功', res))
        .catch(err => console.log('promise方法插入数据失败', err))
})




