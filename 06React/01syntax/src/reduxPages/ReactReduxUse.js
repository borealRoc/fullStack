import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

const mapStateToProps = state => ({ num: state })
const mapDispatchToProps = dispatch => ({
    add: () => dispatch({ type: 'add' }),
    minus: () => dispatch({ type: 'minus' }),
    asyncAdd: () => dispatch => {
        // 异步结束后，手动执行dispatch
        setTimeout(()=> {
            dispatch({type: 'add'})
        },1500)
    },
})

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
export default ReactReduxUse


