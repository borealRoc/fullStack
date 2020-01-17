import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { connect, Provider } from "react-redux"
import store from '../store/index'
import { login } from "../store/user.redux"


const mapStateToProps = state => ({ isLogin: state.User.isLogin, isLoading: state.User.isLogin })
const mapDispatchToProps = { login }

// 路由守卫
// 希望用法：<PrivateRoute component={About} path="/about" ...>
const guardsRoutes = ({ component: Comp, isLogin, ...rest }) => {
    return (
        <Route {...rest}
            // render:根据条件动态渲染组件
            render={props =>
                // 做认证,如果已登录，跳转到目标页面，如果还未登录，先去登录页面，然后再重定向回目标页面
                isLogin ? (<Comp />) :
                    <Redirect to={{ pathname: '/login', state: { redirect: props.location.pathname } }} />
            }
        />
    )
}
const loginComp = ({ location, isLogin, isLoading, login }) => {
    const redirect = location.state.redirect || '/'
    if (isLogin) {
        return <Redirect to={redirect} />
    }
    return (
        <div className="login-page">
            <h1>请登录</h1>
            <button onClick={login} disabled={isLoading}>{isLoading ? '登录中...' : '登录'}</button>
        </div>
    )
}

// @connect(mapStateToProps)
// class GuardsRoutesComp extends Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         const { isLogin } = this.props
//         return (
//             <Route {...rest}
//                 // render:根据条件动态渲染组件
//                 render={props =>
//                     // 做认证,如果已登录，跳转到目标页面，如果还未登录，先去登录页面，然后再重定向回目标页面
//                     isLogin ? (<Comp />) :
//                         <Redirect to={{ pathname: '/login', state: { redirect: props.location.pathname } }} />
//                 }
//             />
//         )
//     }
// }
// @connect(mapStateToProps, mapDispatchToProps)
// class LoginComp extends Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         const { isLogin, isLoading, login } = this.props
//         if (isLogin) {
//             return <Redirect to={redirect} />
//         }
//         return (
//             <div className="login-page">
//                 <h1>请登录</h1>
//                 <button onClick={login} disabled={isLoading}>{isLoading ? '登录中...' : '登录'}</button>
//             </div>
//         )
//     }
// }
// export class GuardsRoutes extends Component {
//     render() {
//         return (
//             <Provider store={store}>
//                 <GuardsRoutesComp />
//             </Provider>
//         )
//     }
// }
// export class Login extends Component {
//     render() {
//         return (
//             <Provider store={store}>
//                 <LoginComp />
//             </Provider>
//         )
//     }
// }



