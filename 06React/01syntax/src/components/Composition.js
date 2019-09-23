import React, { Component } from 'react'

// 一个简单的复合组件Demo
//Dialog: 负责渲染数据
function Dialog(props) {
    return (
        <div style={{ border: `solid 10px ${props.color || "blue"}` }}>
            {/* props.children代表组件下面的所有内容 */}
            {/* 等效vue中匿名插槽 */}
            {props.children}
            {/* 等效vue中具名插槽 */}
            <div>{props.footer}</div>
        </div>
    )
}

// WelcomeDialog: 负责逻辑业务
function WelcomeDailog(props) {
    const confirmBtn = (<button onClick={() => { alert('React is very good') }}>确认</button>)
    return (
        <Dialog footer={confirmBtn} color='green'>
            <h1>欢迎你</h1>
            <p>感谢使用React</p>
        </Dialog>
    )
}

// Composition: 负责展示视图
export default class Composition extends Component {
    render() {
        return (
            <WelcomeDailog />
        )
    }
}
