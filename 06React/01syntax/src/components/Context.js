import React, { Component, useContext } from 'react'
import { Layout, Typography } from 'antd'
const { Content } = Layout
const { Paragraph, Title } = Typography

// 1.创建上下文
const FormContext = React.createContext()
const Provider = FormContext.Provider
const Consumer = FormContext.Consumer
// const { Provider, Consumer } = React.createContext()

// 2.创建需要传递的数据
const store = {
    name: 'xu',
    sayName() {
        console.log(this.name);
    }
}

function Child1(props) {
    return (
        <div className="child1-com">
            <Title level={2}>获取上下文方式一：Consumer</Title>
            <Paragraph onClick={() => props.sayName()}>我能获取来自祖先的属性：{props.name}</Paragraph>
        </div>
    )
}

function Child2() {
    const ctx = useContext(FormContext)
    return (
        <div className="child2-com">
            <Title level={2}>获取上下文方式二：useContext</Title>
            <Paragraph onClick={() => ctx.sayName()}>我能获取来自祖先的属性：{ctx.name}</Paragraph>
        </div>
    )
}

class Child3 extends Component {
    // 设置静态属性通知编译器获取上下文中数据并赋值给this.context
    // contextType是写死的
    static contextType = FormContext
    render() {
        return (
            <div className="child3-com" >
                <Title level={2}>获取上下文方式三：contextType</Title>
                <Paragraph onClick={() => this.context.sayName()}>我能获取来自祖先的属性：{this.context.name}</Paragraph>
            </div>
        )
    }

}

// 基本用法
class NormalContext extends Component {
    render() {
        return (
            <div className="normal-context">
                {/* 3.提供数据，必须使用value属性 */}
                <Provider value={store}>
                    {/* chlld组件被层层嵌套，设置干扰 */}
                    <Layout>
                        <Content>
                            {/* 消费方法1：Consumer */}
                            <Consumer>
                                {/* 4.内嵌一个函数获取属性 */}
                                {value => <Child1 {...value} />}
                            </Consumer>
                        </Content>
                    </Layout>
                    <Layout>
                        <Content>
                            {/* 消费方法2：hook */}
                            <Child2 />
                        </Content>
                    </Layout>
                    <Layout>
                        <Content>
                            {/* 消费方法3：contextType */}
                            <Child3 />
                        </Content>
                    </Layout>
                </Provider>
            </div>
        )
    }
}

// 高阶函数+装饰器写法
const WithProvider = Comp => props => (
    <Provider value={store}>
        <Comp {...props} />
    </Provider>
)
const WithConsumer = Comp => props => (
    <Consumer>
        {value => <Comp {...props} value={value} />}
    </Consumer>
)
@WithConsumer
class Inner extends Component {
    render() {
        return (
            <Paragraph onClick={() => this.props.value.sayName()}>我能获取来自祖先的属性：{this.props.value.name}</Paragraph>
        )
    }
}
@WithProvider
class DecoratorContext extends Component {
    render() {
        return (
            <div className="decorator-context">
                <Layout>
                    <Content>
                        <Title level={2}>获取上下文方式四：高阶函数+装饰器写法</Title>
                        <Inner />
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default class Context extends Component {
    render() {
        return (
            <div className="context-wrap">
                <NormalContext />
                <DecoratorContext />
            </div>
        )
    }
}