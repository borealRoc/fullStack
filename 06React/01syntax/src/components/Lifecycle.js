import React, { Component } from 'react'

class Lifecycle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            msg: '来自属性传递:' + props.prop,
            constructor: 'constructor: 构造函数',
            componentWillMount: 'componentWillMount: 组件将要挂载：此时可以访问属性和状态了，可以进行api调用，但没办法做dom相关操作',
            componentDidMount: 'componentDidMount: 组件已经挂载：可进行状态更新操作',
            componentWillReceiveProps: 'componentWillReceiveProps: 组件属性更新：父组件传递的属性有变化，做相应响应',
            shouldComponentUpdate: 'shouldComponentUpdate: 组件是否应该更新？返回布尔值，优化点',
            componentWillUpdate: 'componentWillUpdate: 组件将要更新',
            componentDidUpdate: 'componentDidUpdate: 组件已经更新',
        }
        console.log('1、构造函数', this.state.msg)
    }

    // 新版本已被废弃
    componentWillMount() {
        console.log('2、组件将要挂载：此时可以访问属性和状态了，可以进行api调用，但没办法做dom相关操作')
    }

    componentDidMount() {
        console.log('3、组件已经挂载：可进行状态更新操作')
    }

    // 新版本已被废弃
    componentWillReceiveProps() {
        console.log('4、组件属性更新：父组件传递的属性有变化，做相应响应')
    }

    // 新版本已被废弃
    shouldComponentUpdate() {
        console.log('5、组件是否应该更新？返回布尔值，优化点')
        return true
    }

    // 新版本已被废弃
    componentWillUpdate() {
        console.log('6、组件将要更新')
    }

    componentDidUpdate() {
        console.log('7、组件已经更新')
    }

    render() {
        console.log('----   组件渲染   ----')
        return (
            <div>
                <h2>React组件声明周期</h2>
                <ol>
                    <li>{this.state.constructor}</li>
                    <li>{this.state.componentWillMount}</li>
                    <li>{this.state.componentDidMount}</li>
                    <li>{this.state.componentWillReceiveProps}</li>
                    <li>{this.state.shouldComponentUpdate}</li>
                    <li>{this.state.componentWillUpdate}</li>
                    <li>{this.state.componentDidUpdate}</li>
                </ol>
            </div>
        )
    }
}


export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            someProp: '父属性一开始的属性'
        }
        this.timeId = setTimeout(() => {
            this.setState({
                someProp: '父属性发生改变'
            })
        }, 2000)
        console.log(this.state.someProp);
    }
    componentWillUnmount() {
        clearTimeout(this.timeId)
    }

    render() {
        return (
            <Lifecycle prop={this.state.someProp} />
        )
    }
}
