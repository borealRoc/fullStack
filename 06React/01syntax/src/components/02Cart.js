import React, { Component } from 'react'
// 商品输入表单组件
const GoodForm = props => {
    return (
        <div className="cart-form">
            <input type='text' value={props.good} onChange={e => props.inputGood(e)} />
            <button onClick={() => props.addGoodToLists()}>添加到商品列表</button>
        </div>
    )
}
// 商品列表组件
const GoodLists = props => {
    return (
        <ul className="cart-good-lists">
            {
                props.goods.map(goodItem => <li className='my-good-list' key={goodItem.id}>
                    <span>&yen;{goodItem.text}</span>
                    <button onClick={() => props.addGoodToAccount(goodItem)}>加购</button>
                </li>)
            }
        </ul>
    )
}
// 商品结算清单组件
const AccountLists = props => {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>数量</th>
                    <th>价格</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.carts.map(item =>
                        <tr key={item.id} className="cart-account-list">
                            <td>{item.text}</td>
                            <td>
                                <button onClick={() => props.addGoodInAccount(item)}>+</button>
                                {item.count}
                                <button onClick={() => props.minusGoodInAccount(item)}>-</button>
                            </td>
                            <td>{item.price * item.count}</td>
                        </tr>)
                }
            </tbody>
        </table>
    )
}
export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            good: '',
            goods: [
                { id: 1, text: 'Web全栈', price: 2000 },
                { id: 2, text: 'Java高级工程师', price: 1500 },
            ],
            carts: [],
        }
        // 回调绑定this的方法一
        this.addGoodToLists = this.addGoodToLists.bind(this)
    }
    // 商品输入框双向数据绑定
    inputGood = e => {
        this.setState({
            good: e.target.value
        })
    }
    // 增加商品到商品列表
    addGoodToLists() {
        this.setState(preState => ({
            goods: [...preState.goods, { id: preState.goods[preState.goods.length - 1].id + 1, text: preState.good, price: 4000 }],
            good: ''
        }))
    }
    // 回调绑定this的方法二： 在组件里把方法写成函数形式
    // 添加商品到购物车（由商品列表子组件传递数据）
    addGoodToAccount = good => {
        // 为了保证视图更新，数组要保证引用地址变化，因此每次深复制一个新数组
        const cartArray = [...this.state.carts]
        // 查询商品对应购物项是否存在
        const index = cartArray.findIndex(item => item.id === good.id)
        const goodItem = cartArray[index]
        if (goodItem) {
            // 更新对象也想要全新对象，这里不是必须的
            cartArray.splice(index, 1, { ...goodItem, count: goodItem.count + 1 })
        } else {
            // 新增
            cartArray.push({ ...good, count: 1 })
        }
        this.setState({
            carts: cartArray
        })
    }
    // 在结算列表增加商品（由商品结算清单子组件传递数据）
    addGoodInAccount = good => {
        const cartArray = [...this.state.carts]
        const index = cartArray.findIndex(item => item.id === good.id)
        const goodItem = cartArray[index]
        cartArray.splice(index, 1, { ...goodItem, count: goodItem.count + 1 })
        this.setState({
            carts: cartArray
        })
    }
    // 在结算列表减少商品（由商品结算清单子组件传递数据）
    minusGoodInAccount = good => {
        const cartArray = [...this.state.carts]
        const index = cartArray.findIndex(item => item.id === good.id)
        const goodItem = cartArray[index]
        if (goodItem.count > 1) {
            cartArray.splice(index, 1, { ...goodItem, count: goodItem.count - 1 })
        } else {
            cartArray.splice(index, 1)
        }
        this.setState({
            carts: cartArray
        })
    }

    render() {
        const { title } = this.props
        return (
            <div className="my-cart">
                {title && <h4 className="cart-tit">{title}</h4>}
                {/* 商品输入表单组件 */}
                <GoodForm good={this.state.good} inputGood={this.inputGood} addGoodToLists={this.addGoodToLists} />
                {/* 商品列表组件 */}
                {this.state.goods.length > 0 &&
                    <GoodLists goods={this.state.goods} addGoodToAccount={this.addGoodToAccount} />}
                {/* 商品结算清单组件 */}
                {this.state.carts.length > 0 &&
                    <AccountLists carts={this.state.carts} addGoodInAccount={this.addGoodInAccount} minusGoodInAccount={this.minusGoodInAccount} />}
            </div>
        )
    }
}
