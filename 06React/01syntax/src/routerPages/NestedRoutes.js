import React from 'react'
import { List } from 'antd';
import { Link, Route, Switch, Redirect } from "react-router-dom"
import Hook from '../components/06Hook'
import Context from '../components/07Context'

export default function NestedRoutes() {
    return (
        <div className="NestedRoutes">
            <List>
                <List.Item className="sec-ant-list"><Link to="/NestedRoutes/hook">4.1 React钩子Hook</Link></List.Item>
                <List.Item className="sec-ant-list"><Link to="/NestedRoutes/Context">4.2 Context上下文</Link></List.Item>
            </List>
            <Switch>
                <Route path="/NestedRoutes/hook" component={Hook}></Route>
                <Route path="/NestedRoutes/Context" component={Context}></Route>
                {/* 重定向 */}
                {/* <Redirect to="/NestedRoutes/hook"></Redirect> */}
            </Switch>
        </div>
    )
}
