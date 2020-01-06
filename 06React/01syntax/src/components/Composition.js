import React, { Component } from 'react'
import '../myBtn.css'

function Radio({ children, ...rest }) {
    return (
        <label>
            <input type="radio" {...rest} />{children}
        </label>
    )
}
function RadioGroup({ children, name }) {
    return (
        <div>
            {/* 还可以对children进行操作，使其改变子组件的状态*/}
            {
                React.Children.map(children, child => {
                    {/* vdom不可直接更改，需克隆一个新的副本进行修改 */}
                    return React.cloneElement(child, { name: name })
                })
            }
        </div>
    )
}

// 一个简单的复合组件Demo
//Dialog: 负责渲染数据
function Dialog(props) {
    return (
        <div className="my-popup" style={{ border: `solid 1px ${props.color || "blue"}` }}>
            {/* children参数是固定的，header和footer参数是下面传上来的 */}
            {/* 等效vue中具名插槽 */}
            <div className="my-popup-hd">
                {props.header}
            </div>
            {/* props.children代表组件下面的所有内容 */}
            {/* 等效vue中匿名插槽 */}
            {/* {props.children} */}
            {/* 可以对children进行操作，比如过滤 */}
            <div className="my-popup-ctn">
                {
                    React.Children.map(props.children, child => {
                        if (child.type === props.type) return
                        return child
                    })
                }
            </div>
            {/* 等效vue中具名插槽 */}
            <div className="my-popup-fd">
                {props.footer}
            </div>
        </div>
    )
}

// WelcomeDialog: 负责逻辑业务
function WelcomeDailog(props) {
    const header = (<h1 className="my-h1">欢迎你</h1>)
    const footer = (<button onClick={() => { alert('React is very good') }} className="my-btn">确认</button>)
    return (
        <Dialog header={header} footer={footer} color='#ccc' type='p'>
            <h2>感谢使用React</h2>
            <p>感谢使用Vue</p>
            <div className="my-mvvm">
                <h3>你最喜欢的框架是？</h3>
                <RadioGroup name="mvvm">
                    <Radio value="react">react</Radio>
                    <Radio value="vue">vue</Radio>
                    <Radio value="angular">angular</Radio>
                </RadioGroup>
            </div>

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
