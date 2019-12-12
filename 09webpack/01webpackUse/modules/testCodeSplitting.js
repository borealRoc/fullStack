import _ from "lodash"
console.log(_.join(['a','b','c','****']))

// 这里留个坑，试试多模块引入怎么打包成对应的多个文件
// import $ from 'jquery'
// console.log($("#root"))