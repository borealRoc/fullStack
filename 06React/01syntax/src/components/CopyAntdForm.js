import React, { Component } from 'react'
import { Input, Button } from 'antd'

// 创建一个高阶组件：扩展现有表单，事件处理、数据收集、校验
function FormCreate(Comp) {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.opts = {}
        }
        handleChaange() {
            console.log('++', this)
        }
        // 创建input包装器
        getFieldDecorator = (field, opt) => {
            this.opts[field] = opt
            return InputComp => (
                <div className="login-item">
                    {
                        React.cloneElement(InputComp, {
                            name: field,
                            value: this.state[field] || '',
                            onChange: this.handleChaange
                        })
                    }
                </div>
            )
        }
        render() {
            return <Comp getFieldDecorator={this.getFieldDecorator}></Comp>
        }
    }
}

@FormCreate
class LoginForm extends Component {
    render() {
        const { getFieldDecorator } = this.props
        return (
            <div className="login-form">
                {getFieldDecorator("username", {
                    rules: [{ required: true, message: "Please input your username!" }]
                })(<Input />)}
                <Button>登录</Button>
            </div>
        )

    }
}
export default LoginForm