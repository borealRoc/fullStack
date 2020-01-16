import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import { Button } from 'antd'
import store from '../store/index'
import {add, minus, asyncAdd} from '../store/counter.redux'

// const mapStateToProps = state => ({ num: state })
// const mapDispatchToProps = dispatch => ({
//     add: () => dispatch({ type: 'add' }),
//     minus: () => dispatch({ type: 'minus' }),
//     asyncAdd: () => dispatch => {
//         // 异步结束后，手动执行dispatch
//         setTimeout(() => {
//             dispatch({ type: 'add' })
//         }, 1500)
//     },
// })
// 上面这种写法asyncAdd失效，这是为啥？
// const mapDispatchToProps = {
//     add: () => ({ type: 'add' }),
//     minus: () => ({ type: 'minus' }),
//     asyncAdd: () => dispatch => {
//         // 异步结束后，手动执行dispatch
//         setTimeout(() => {
//             dispatch({ type: 'add' })
//         }, 1500)
//     },
// }
// 重构，文件拆分
// const mapStateToProps = state => ({ num: state })
const mapStateToProps = state => ({ num: state.Counter })
const mapDispatchToProps = {add, minus, asyncAdd}

// 基本写法
// function ReactReduxUse({ num, add, minus }) {
//     return (
//         <div className="redux-react-use">
//             <h1>react-redux基本用法</h1>
//             <h2>
//                 <Button onClick={() => minus()}>-</Button>
//                 {num}
//                 <Button onClick={() => add()}>+</Button>
//             </h2>
//         </div>
//     )
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxUse)

// 装饰器写法
@connect(mapStateToProps, mapDispatchToProps)
class ReactReduxUse extends Component {
    render() {
        const { num, add, minus, asyncAdd } = this.props
        return (
            <div className="redux-react-use">
                <h1>react-redux装饰器写法</h1>
                <h2>
                    <Button onClick={minus}>-</Button>
                    {num}
                    <Button onClick={add}>+</Button>
                    <Button onClick={asyncAdd}>asyncAdd</Button>
                </h2>
            </div>
        )
    }
}
export default class extends Component {
    render() {
        return (
            < Provider store={store} >
                <ReactReduxUse />
            </Provider >
        )
    }
}


