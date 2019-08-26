// 模拟历史记录
const History = {
    // 路由历史记录堆栈
    _history: [],
    install(Vue) {
        // 提供Vue插件所需安装方法
        Object.defineProperty(Vue.prototype, '$routerHistory', {
            get() {
                return History
            }
        })
    },
    push(path) {
        this._history.push(path)
    },
    pop() {
        this._history.pop()
    },
    canBack() {
        return this._history.length > 1
    }
}
export default History