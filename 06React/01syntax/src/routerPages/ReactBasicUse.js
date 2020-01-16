import React from 'react'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import { List } from 'antd';
import App from '../App'
import Lifecycle from '../components/Lifecycle'
import ComponentRouter from '../routerPages/ComponentRouter'
import Error from '../components/Error'
import NestedRoutes from '../routerPages/NestedRoutes'

export default function ReactBasicUse() {
    return (
        <div className='react-router'>
            <BrowserRouter>
                <List className="link-part">
                    {/* 导航链接 */}
                    <List.Item><Link to="/app">1.路由基础用法--React核心语法</Link></List.Item>
                    <List.Item><Link to="/lifecycle">2.生命周期</Link></List.Item>
                    <List.Item><Link to="/component">3.动态路由--组件相关</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/component/cart">3.1组件通讯</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/component/pure">3.2纯组件</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/component/hoc">3.3高阶组件</Link></List.Item>
                    <List.Item className="sec-ant-list"><Link to="/component/composition">3.4复合组件</Link></List.Item>
                    <List.Item><Link to="/404">4.404页面</Link></List.Item>
                    <List.Item><Link to="/NestedRoutes">5.嵌套路由--React高阶语法</Link></List.Item>
                    <List.Item><Link to="/NestedRoutes/test">6.重定向</Link></List.Item>
                </List>
                {/* 路由配置：路由即组件 */}
                <div className="route-part">
                    {/* 路由匹配默认是包容性质,所以加Switch才能保证匹配一个*/}
                    <Switch>
                        {/* 路由基础用法 */}
                        <Route path="/app" component={App} />
                        <Route path="/lifecycle" component={Lifecycle} />
                        {/* 动态路由 */}
                        <Route path="/component/:detail" component={ComponentRouter} />
                        {/* 嵌套路由 */}
                        <Route path="/NestedRoutes" component={NestedRoutes} />
                        {/* 404：没有path，必然匹配 */}
                        <Route component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div >
    )
}
