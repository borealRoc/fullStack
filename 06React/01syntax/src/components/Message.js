// eslint-disable-next-line 
import React, { Component, PureComponent } from 'react'


// function List({ data }) {
//     // console.log('render')
//     return (
//         <div>
//             <p>{data.body}</p>
//             <p>----{data.author}</p>
//         </div>
//     )
// }

// 如果数据没更新，<list/>组件不需要不断render,但下面这种方式比较笨
// class List extends Component {
//     shouldComponentUpdate(nextProps) {
//         if (nextProps.data.body === this.props.data.body && nextProps.data.author === this.props.data.author) {
//             return false
//         }
//         return true
//     }
//     render() {
//         console.log('render')
//         return (
//             <div>
//                 <p>{this.props.data.body}</p>
//                 <p>----{this.props.data.author}</p>
//             </div>
//         )
//     }
// }


// class List extends PureComponent {
//     render() {
//         console.log('render')
//         return (
//             <div>
//                 <p>{this.props.body}</p>
//                 <p>----{this.props.author}</p>
//             </div>
//         )
//     }
// }

const List = React.memo(({ body, author}) => {
    console.log('render')
    return (
        <div>
            <p>{body}</p>
            <p>----{author}</p>
        </div>
    )
})

export default class Message extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mes: []
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                mes: [
                    { body: 'React is very good', author: 'Facebook', },
                    { body: 'Vue is very good', author: 'You', },
                ]
            })
        }, 2000)
    }

    render() {
        return (
            <div>
                {/* {this.state.mes.map((item, index) => <List key={index} body={item.body} author = {item.author}/>)} */}
                {this.state.mes.map((item, index) => <List key={index} {...item} />)}
            </div>
        )
    }
}
