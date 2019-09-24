# 一、Create React App
1. 安装：npm install -g create-react-app
2. 创建工程：create-react-app react-demo
# 二、React核心语法
1. JSX语法：表达式[值、属性、函数表达式，JSX语句]，用{}表示、样式[className]
2. 状态：state, setState({})/setState(prve=>{})[异步]
3. 组件形式：class[有状态], function[无状态]
4. 生命周期：constructor -> componentWillMount -> componentDidMount -> componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> compopnentDidUpdate
5. props传递参数
    - 父传递：`<Child data={this.state.cart}/>`
    - 子接收：props.data
6. 组件通讯
    - 父监听：`<Child addCount={this.addCount}/>  addCount = ()=> {}`
    - 子触发：`onClick={()=>props.addCount(item)}`
# 三、组件化
1. 容器组件 VS 展示组件
    - 容器组件负责数据获取，展示组件负责根据props显示信息
2. 纯组件
    - Component不会比较当前和下个状态的props和state。因此，每当shouldComponentUpdate被调用时，组件默认的会重新渲染。优化 ——
    - Component + shouldComponentUpdate判断是否更新：`shouldComponentUpdate(nextProps, nextState) { return !(nextProps === this.props && nextState === this.state)}`
        - 缺点：麻烦
    - PureComponent
        - 当props或者state改变时，PureComponent将对props和state进行浅比较，如果一样，则shouldComponentUpdate返回false
        - 缺点：有使用限制
            - 确保数据类型是值类型
            - 如果是引用类型，确保地址不变，同时不应当有深层次的数据变化
            - 必须是class组件。优化 ——>
    - React.meno()
        - React.memo()是一个高阶函数，它与 React.PureComponent类似，但是一个函数组件而非一个类
    - vue框架内部已经对此做了优化, 开发者不需要考虑该类问题, 只需要关注自己的应用本身就可以了
3. 复合组件
    - 比如：小组件负责渲染数据，中组件负责处理逻辑，大组件负责展示视图
4. 高阶组件（HOC）
    - 高阶组件是一个函数
# 四、React全家桶
# 五、其它
1. 命令行
    - 删除一个文件夹下面所有的文件
        - MAC: rm -f *
        - WIN: del *
2. ES6
    - Module
3. React相关库
    - UI库：antd
    