import React from 'react'
import Cart from '../components/Cart'
import PureComponent from '../components/pureComponent'
import Hoc from '../components/Hoc'
import Composition from '../components/Composition'

export default function ComponentRouter(props) {
    // 1.history: 导航指令
    // 2.match: 获取参数信息
    // 3.location: 当前url信息
    switch (props.match.params.detail) {
        case 'cart':
            return (
                <div>
                    <Cart title='React购物车' />
                </div>
            )
        case 'pure':
            return (
                <div>
                    <PureComponent />
                </div>
            )
        case 'hoc':
            return (
                <div>
                    <Hoc stage='React' />
                    <button onClick={props.history.goBack}>返回</button>
                </div>
            )
        case 'composition':
            return (
                <div>
                    <Composition />
                </div>
            )
    }
}
