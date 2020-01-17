import React from 'react'
import { List } from 'antd';
import { Link, Route, Switch, Redirect } from "react-router-dom"
import Hook from '../components/Hook'
import Context from '../components/Context'

export default function NestedRoutes() {
    return (
        <div className="NestedRoutes">
            <List className="link-part">
                <List.Item className="sec-ant-list"><Link to="/NestedRoutes/hook">5.1 React钩子Hook</Link></List.Item>
                <List.Item className="sec-ant-list"><Link to="/NestedRoutes/Context">5.2 Context上下文</Link></List.Item>
                <List.Item><Link to="/NestedRoutes/test">6.重定向</Link></List.Item>
            </List>
            <Switch>
                <Route path="/NestedRoutes/hook" component={Hook}></Route>
                <Route path="/NestedRoutes/Context" component={Context}></Route>
                {/* 重定向 */}
                <Redirect to="/NestedRoutes/hook"></Redirect>
            </Switch>
        </div>
    )
}
