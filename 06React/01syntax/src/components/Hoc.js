import React, { Component } from 'react'

// const Course = props => {
//     return (
//         <div>{props.stage} -- {props.name}</div>
//     )
// }

// 高阶组件是一个函数
const WithName = Comp => {
    // 重写组件生命周期
    console.log('WithName')
    class InterComp extends Component {
        componentDidMount() {
            console.log('组件挂载')
        }
        render() {
            return (<Comp {...this.props} name='React高阶组件' />)
        }
    }
    return InterComp
}

// 高阶组件链式调用
const WithLog = Comp => {
    console.log('WithLog')
    // 思考：采用装饰器写法，Comp.name为Course，与链式写法输出InterComp不一样，为什么？
    console.log(Comp.name + '渲染了')
    return props => <Comp {...props}></Comp>
}

// 高阶组件 
// export default WithName(Course) 
// 高阶组件的链式调用
// export default WithLog(WithName(Course))
// 高阶组件装饰器写法
@WithLog
@WithName
class Course extends Component {
    render() {
        return (
            <div>
                {this.props.stage} - {this.props.name}
            </div>
        );
    }
}
export default Course

