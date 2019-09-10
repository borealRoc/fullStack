import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const $root = document.getElementById('root');
ReactDOM.render(<App/>, $root);

// 动态渲染
// React 只更新它需要更新的部分
// setInterval(() => {
//     ReactDOM.render(<h1>{new Date().toLocaleTimeString()}</h1>, $root)
// }, 1000)