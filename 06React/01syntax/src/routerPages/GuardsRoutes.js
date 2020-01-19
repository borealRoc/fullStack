import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { login } from '../store/user.redux'

// 路由守卫
// 希望用法：<GuardsRoute component={About} path="/about" ...>
export const GuardsRoute = connect(state => ({ isLogin: state.User.isLogin }))(({ component: Comp, isLogin, ...rest }) => {
    return (
        <Route {...rest}
            // render:根据条件动态渲染组件
            render={
                props => isLogin ?
                    // 做认证,如果已登录，跳转到目标页面，如果还未登录，先去登录页面，然后再重定向回目标页面
                    <Comp /> :
                    <Redirect to={{ pathname: '/login', state: { redirect: props.location.pathname } }} />
            }
        />
    )
})
export const Login = connect(state => ({ isLogin: state.User.isLogin, isLoading: state.User.isLoading }), { login })(({ location, isLogin, isLoading, login }) => {
    const redirect = location.state.redirect || '/'
    if (isLogin) {
        return <Redirect to={redirect} />
    }
    return (
        <div className="login-comp">
            <h2>这是登录页面</h2>
            <button onClick={login} disabled={isLoading}>{isLoading ? '登录中...' : '登录'}</button>
        </div>
    )
})


