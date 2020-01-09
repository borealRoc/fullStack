import React, { useState, useEffect } from 'react'
import { Button } from 'antd';

const useAge = () => {
    const [age, setAge] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setAge(20)
        },1000)
    })
    return age
}

export default function Hook() {
    // 状态钩子
    // useState(initialState)，接收初始状态，返回一个状态变量和其更新函数
    const [count, addCount] = useState(0)
    const [fruit, setFruit] = useState('apple')
    const [fruits, setFruits] = useState(['apple', 'peach'])
    const [fruitVal, addFruit] = useState('')
    // 使用自定义钩子
    const age = useAge()

    // 副作用钩子
    useEffect(() => {
        console.log(`您点击了${count}次`)
        document.title = `您点击了${count}次`    
    }, [count]) //第二个参数[count]表示只有在count属性发生变化时，才执行
    useEffect(() => {
        console.log(`api调用`)  
    }, []) //第二个参数[]空数组表示没有依赖属性，所以只会执行一次【适合用来发送请求】

    return (
        <div className="hook-demo">
            <span>计数器：</span>
            <Button onClick={() => addCount(count + 1)}>{count}</Button>
            <p>您选择的水果为：{fruit}</p>
            <input type="text" value={fruitVal} onChange={e=> {addFruit(e.target.value)}}/>
            <Button onClick={() => setFruits([...fruits, fruitVal])}>增加水果</Button>
            <ul>
                {fruits.map(f => (
                    <li key={f} onClick={() => setFruit(f)}>
                        {f}
                    </li>
                ))}
            </ul>
            <p>自定义钩子:{age? age: '...loading'}</p>
        </div>
    )
}
