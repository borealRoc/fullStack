import React, { Component } from 'react'

const Course = props => {
    return (
        <div>{props.stage} -- {props.name}</div>
    )
}

// 高阶组件是一个函数
const CourseWIthName = Comp => {
    // 重写组件生命周期
    class InterComp extends Component {
        componentDidMount() {
            console.log('组件挂载')
        } 
        render() {
            return (<Comp {...this.props} name='React高阶组件'/ >)
        }
    }
    return InterComp
}

export default CourseWIthName(Course)