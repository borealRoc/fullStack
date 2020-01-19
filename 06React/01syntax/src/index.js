import React from 'react'
import ReactDOM from 'react-dom'
// import WrappedNormalLoginForm from './components/AntdForm'
// import LoginForm from './components/CopyAntdForm'
import ReduxBasicUse from './reduxPages/ReduxBasicUse'
import ReactReduxUse from './reduxPages/ReactReduxUse'
import ReactRouterComp from './routerPages/BasicRoutes'
import store from './store/index'

const $root = document.getElementById('root')
// 核心API
// ReactDOM.render(<App/>, $root)
// 生命周期
// ReactDOM.render(<Lifecycle/>, $root)
// 纯组件
// ReactDOM.render(<pureComponent/>, $root)
// 高阶组件
// ReactDOM.render(<Hoc stage='React'/>, $root)
// 组件复合
// ReactDOM.render(<Composition/>, $root)
// Hook
// ReactDOM.render(<Hook/>, $root)
// 组件跨层级通信 - 上下文
// ReactDOM.render(<Context/>, $root)
// antd表单使用
// ReactDOM.render(<WrappedNormalLoginForm/>, $root)
// 模仿antd的Form表单设计一个LoginForm组件
// ReactDOM.render(<LoginForm/>, $root)
// redux的基本使用：需要手动订阅，跟踪状态，这样state有变化时才能更新渲染视图
// ReactDOM.render(<ReduxBasicUse/>, $root)
// store.subscribe(() =>
//   ReactDOM.render(<ReduxBasicUse/>, $root)
// )
// react整合redux，简化使用难度，需要react-redux的支持
ReactDOM.render(<ReactReduxUse/>, $root)
// react-router基本用法
// ReactDOM.render(<ReactRouterComp/>, $root)


// 动态渲染
// React 只更新它需要更新的部分
// setInterval(() => {
//     ReactDOM.render(<h1>{new Date().toLocaleTimeString()}</h1>, $root)
// }, 1000)