import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
// import Lifecycle from './Lifecycle'
import Cart from './Cart'

const $root = document.getElementById('root')
// ReactDOM.render(<App/>, $root)
// ReactDOM.render(<Lifecycle/>, $root)
ReactDOM.render(<Cart title='React购物车'/>, $root)

// 动态渲染
// React 只更新它需要更新的部分
// setInterval(() => {
//     ReactDOM.render(<h1>{new Date().toLocaleTimeString()}</h1>, $root)
// }, 1000)