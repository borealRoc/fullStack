import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Lifecycle from './Lifecycle'
import Cart from './Cart'
import pureComponent from './components/pureComponent'
import Hoc from './components/Hoc'
import Composition from './components/Composition'
import ContextSample from './components/ContextSample'



const $root = document.getElementById('root')
// 核心API
// ReactDOM.render(<App/>, $root)
// 生命周期
// ReactDOM.render(<Lifecycle/>, $root)
// 纯组件
// ReactDOM.render(<pureComponent/>, $root)
// 高阶组件
// ReactDOM.render(<Hoc stage='React' />, $root)
// 组件复合
ReactDOM.render(<Composition/>, $root)
// 组件跨层级通信 - 上下文
// ReactDOM.render(<ContextSample/>, $root)

// 动态渲染
// React 只更新它需要更新的部分
// setInterval(() => {
//     ReactDOM.render(<h1>{new Date().toLocaleTimeString()}</h1>, $root)
// }, 1000)