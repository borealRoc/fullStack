import React, { Component } from 'react'
import './App.css'

// 父组件把数据和事件传给子组件
let ShowCart = props => {
        const totalPrice = 0;
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
                        {props.data.map(item => 
                            <tr key={item.id}>
                                <td>{item.text}</td>
                                <td>
                                    <button onClick={()=>props.addCount(item)}>+</button>
                                    {item.count}
                                    <button onClick={()=>props.delCount(item)}>-</button>
                                </td>
                                <td>&yen;{item.price * item.count}</td>
                            </tr>
                        )}
                    </tbody>
            </table>
        )
}

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [
                { id: 1, text: 'Web全栈', price: 2000 },
                { id: 2, text: 'Java高级工程师', price: 1500 }
            ],
            good: '',
            cart: [],
        };

        // 回调绑定this的方法一
        // this.addGood = this.addGood.bind(this)
    }

    // 回调绑定this的方法二
    addGood = () => {
        this.setState(preState => ({
            goods: [...preState.goods, {id: preState.goods[preState.goods.length - 1].id + 1, text: preState.good, price: 4000}],
            good: ''
        }))
    }
    goodChange(e) {
        this.setState({
            good: e.target.value
        })
    }
    // 加购
    addToCart(good) {
        // 为了保证视图更新，数组要保证引用地址变化，因此每次深复制一个新数组
        const cartArray = [...this.state.cart]
        // 查询商品对应购物项是否存在
        const index = cartArray.findIndex(item => item.id === good.id)
        const goodItem = cartArray[index]
        if (goodItem) {
            // 更新对象也想要全新对象，这里不是必须的
            cartArray.splice(index, 1, {...goodItem, count: goodItem.count + 1})
        } else {
            // 新增
            cartArray.push({...good, count: 1})
        }
        this.setState({
            cart: cartArray
        })
    }
    // 购物车增加商品数量
    addCount = good => {
        const cartArray = [...this.state.cart]
        const index = cartArray.findIndex(item => item.id === good.id)
        const goodItem = cartArray[index]
        cartArray.splice(index, 1, {...goodItem, count: goodItem.count + 1})
        this.setState({
            cart: cartArray
        })
    }

    // 购物车减少商品数量
    delCount = good => {
        const cartArray = [...this.state.cart]
        const index = cartArray.findIndex(item => item.id === good.id)
        const goodItem = cartArray[index]
        if (goodItem.count > 1) {
            cartArray.splice(index, 1, {...goodItem, count: goodItem.count - 1})
        } else {
            cartArray.splice(index, 1)
        }
        this.setState({
            cart: cartArray
        })
    }

    render() {
        const title = this.props.title ? <h1>{this.props.title}</h1> : null
        const goods = this.state.goods.map(item => <li key={item.id}><span>{item.text}</span><button onClick={()=>this.addToCart(item)}>加购</button></li>)

        return (
            <div className="cart-ctn">
                {/* 条件语句 */}
                    {/* {title} */}
                    {/* 或者这么写 */}
                    {this.props.title && <h1 className="cart-tit">{this.props.title}</h1>}
                {/* 双向绑定 */}
                <div>
                    {/* 回调绑定this的方法三 */}
                    <input type="text" value={this.state.good} onChange={e=>this.goodChange(e)}/>
                    <button onClick={this.addGood}>添加商品</button>
                </div>
                {/* 列表循环 */}
                <ul className="cart-lists">{goods}</ul>
                {/* 父子组件通讯 */}
                {/* 传递函数用于子组件把状态通知父组件 */}
                <ShowCart data={this.state.cart} addCount={this.addCount} delCount={this.delCount}/>
            </div>
        )
    }
}


