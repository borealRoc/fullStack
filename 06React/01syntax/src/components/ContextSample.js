import React, { Component } from 'react'

// 1.创建上下文
const FormContext = React.createContext()
const FormProvider = FormContext.Provider
const FormConsumer = FormContext.Consumer

// 2.创建需要传递的数据
const store = {
    name: 'xu',
    sayName() {
        console.log(this.name);
    }
}

// 基本用法
// export default class ContextSample extends Component {
//     render() {
//         return (
//            //3.提供数据，必须使用value属性
//             <FormProvider value={store}>
//                 <div>
//                     <FormConsumer>
//                         {/* 4.获取数据，必须内嵌一个函数 */}
//                         {value=><h1 onClick={()=>value.sayName()}>{value.name}</h1>}
//                     </FormConsumer>
//                 </div>
//             </FormProvider>
//         )
//     }
// }

// 高阶函数+装饰器写法
const WithProvider = Comp => props => (
    <FormProvider value={store}>
        <Comp {...props} />
    </FormProvider>
)
const WithConsumer = Comp => props => (
    <FormConsumer>
        { value => <Comp {...props} value={value}/> }
    </FormConsumer>
)
@WithConsumer
class Inner extends Component {
    render() {
        return (
            <h1 onClick={()=>this.props.value.sayName()}>{this.props.value.name}</h1>
        )
    }
}
@WithProvider
class NewContextSample extends Component {
    render() {
        return (
            <div>
                <Inner/>
            </div>
        )
    }
}
export default NewContextSample