import React from 'react'
import store from '../store'
import { Button } from 'antd'

export default function ReduxBasicUse() {
    return (
        <div className="redux-basic-use">
            <h1>redux基本用法</h1>
            <h2>
                <Button onClick={() => store.dispatch({ type: 'minus' })}>-</Button>
                {store.getState()}
                <Button onClick={() => store.dispatch({ type: 'add' })}>+</Button>
            </h2>
        </div>
    )
}
