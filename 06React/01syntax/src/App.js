import React, { Component } from 'react'
import logo from './logo.png'
import jsxImg from './jsx.png'
import domImg from './dom.png'
import './App.css'
//手动引入antd组件
import Button from 'antd/es/button';
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// 按需引入antd组件
// js 和 css 代码都会按需加载
import { Input } from 'antd';



// 函数组件
let Welcome = props => {
    return <strong>这是一个{props.txt}</strong>
}

export default class extends Component {

    formatName(name) {
        return name.firstName + name.lastName
    }

    // 当组件是有状态的，需要构造函数
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            time: new Date(),
            componentWillMount: 'componentWillMount: 组件将要挂载：此时可以访问属性和状态了，可以进行api调用，但没办法做dom相关操作',
            componentDidMount: 'componentDidMount: 组件已经挂载：可进行状态更新操作',
            componentWillReceiveProps: 'componentWillReceiveProps: 组件属性更新：父组件传递的属性有变化，做相应响应',
            shouldComponentUpdate: 'shouldComponentUpdate: 组件是否应该更新？返回布尔值，优化点',
            componentWillUpdate: 'componentWillUpdate: 组件将要更新',
            componentDidUpdate: 'componentDidUpdate: 组件已经更新',
        }
    }

    componentDidMount() {
        this.timeId = setInterval(() => {
            // 更新状态
            this.setState({
                time: new Date()
            })
            // 注意1：不能直接改状态
            // this.state.date = new Date();//错误
        }, 1000)
        // 注意2：setState()是异步的
        this.setState((preState, preProps) => ({
            count: preState.count + 1
        }), () => {
            console.log('在setState的回调函数里，正确取到了值', this.state.count)
        })
        console.log('因为setState()是异步的,所以我这里取到的值是错误的', this.state.count)
    }

    componentWillUnmount() {
        clearInterval(this.timeId)
    }

    render() {
        const name = '史诗王爵'
        const jsx = <strong>JSX也是一个表达式</strong>
        return (
            <div>
                <h1>React核心语法</h1>
                <ul>
                    <li>
                        <h2>1. react组件</h2>
                        <p>1.1、class组件：React的世界里一切皆是组件，使用class语法构建一个最基本的组件</p>
                        {/* 组件属性传值: 传入属性是只读的 */}
                        <p>1.2、函数组件：<Welcome txt='函数组件'></Welcome></p>
                    </li>
                    <li>
                        <h2>2. 属性传递: 动态属性是一个表达式</h2>
                        <p>2.1、动态插值：{name}</p>
                        <p>2.2、动态属性：<img src={logo} className='logo' alt='react logo'></img></p>
                        <p>2.3、函数方法是一个表达式：My name is {this.formatName({ firstName: '史诗', lastName: '王爵' })}</p>
                        <p>2.4、{jsx}</p>
                    </li>
                    <li>
                        <h2>3. JSX语法</h2>
                        <p>JSX本质上就是转换为React.createElement在React内部构建虚拟Dom，最终渲染出页面</p>
                        <img src={jsxImg} alt='jsx语法'></img>
                        <img src={domImg} alt='virtualDOM'></img>
                    </li>
                    <li>
                        <h2>4. 状态state</h2>
                        <p>4.1、更新状态：{this.state.time.toLocaleTimeString()}</p>
                    </li>
                    <li>
                        <h2>5. 生命周期</h2>
                        <p>5.1、{this.state.componentWillMount}</p>
                        <p>5.2、{this.state.componentDidMount}</p>
                        <p>5.3、{this.state.componentWillReceiveProps}</p>
                        <p>5.4、{this.state.shouldComponentUpdate}</p>
                        <p>5.5、{this.state.componentWillUpdate}</p>
                        <p>5.6、{this.state.componentDidUpdate}</p>
                    </li>
                    <li>
                        <h2>6. antd组件</h2>
                        <p>6.1、手动引入<Button type="danger">Danger</Button></p>
                        <p>6.2、按需引入<Input size="small" placeholder="small size" /></p>
                    </li>
                </ul>
            </div>
        )
    }
}
