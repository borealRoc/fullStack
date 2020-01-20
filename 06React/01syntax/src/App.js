import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { Provider } from 'react-redux'
import { List } from 'antd'
import store from './store/index'
import './style/app.css'
import CoreGramma from './components/01CoreGramma'
import Cart from './components/02Cart'
import DynamicRoutes from './routerPages/DynamicRoutes'
import NestedRoutes from './routerPages/NestedRoutes'
import ReduxBasicUse from './reduxPages/ReduxBasicUse'
import ReactReduxUse from './reduxPages/ReactReduxUse'
import Lifecycle from './components/Lifecycle'
import Error from './components/Error'
import { GuardsRoute, Login } from './routerPages/GuardsRoutes'


function ReactRouter() {
    return (
        <div className='react-router'>
            <BrowserRouter>
                <List className="link-part">
                    {/* 导航链接 */}
                    <List.Item><Link to="/coreGramma">1. React核心语法</Link></List.Item>
                    <List.Item><Link to="/cart">2. 父子组件通讯：props和事件</Link></List.Item>
                    <List.Item><Link to="/component">3. 组件</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/component/pure">3.1 纯组件</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/component/hoc">3.2 高阶组件</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/component/composition">3.3 复合组件</Link></List.Item>
                    <List.Item><Link to="/NestedRoutes">4. React高阶语法</Link></List.Item>
                    <List.Item><Link to="/">5. Redux</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/ReduxBasicUse">5.1 Redux基本用法</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/ReactReduxUse">5.2 react整合redux</Link></List.Item>
                    <List.Item><Link to="/">6. React-Router</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/NestedRoutes/test">6.1 重定向</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/404">6.2 404页面</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/lifecycle">6.3 路由守卫</Link></List.Item>
                </List>
                {/* 路由配置：路由即组件 */}
                <div className="route-part">
                    {/* 路由匹配默认是包容性质,所以加Switch才能保证匹配一个*/}
                    <Switch>
                        {/* 路由基础用法 */}
                        <Route path="/coreGramma" component={CoreGramma} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/ReduxBasicUse" component={ReduxBasicUse} />
                        <Route path="/ReactReduxUse" component={ReactReduxUse} />
                        {/* 动态路由 */}
                        <Route path="/component/:detail" component={DynamicRoutes} />
                        {/* 嵌套路由 */}
                        <Route path="/NestedRoutes" component={NestedRoutes} />
                        {/* 路由守卫 */}
                        <GuardsRoute path="/lifecycle" component={Lifecycle} />
                        <Route path="/login" component={Login} />
                        {/* 404：没有path，必然匹配 */}
                        <Route component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default class App extends Component {
    render() {
        return (
            <div className="my-react">
                <div className="my-react-header">
                    <h1 className="my-react-tit">React一生黑</h1>
                </div>
                <div className="my-react-content">
                    < Provider store={store} >
                        <ReactRouter />
                    </Provider >
                </div>
            </div>
        )
    }
}



