// 1. 创建XVue类
class XVue {
    constructor(opts) {
        this.$data = opts.data
        // 2. 挟持监听data对象
        this.observer(this.$data)

        // 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象
        new Watcher()
        // console.log('模拟触发age的getter', this.$data.age)
    }
    observer(data) {
        if (!data || typeof data !== 'object') return
        // 2.1 挟持监听data对象的所有属性 
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(dataObj, dataKey, dataVal) {
        // 如果datakey也是一个对象，使用递归的方式进行二次查找
        this.observer(dataVal)

        // 3.1.1 一个Dep对应一个属性
        const dep = new Dep()

        // 2.2 Vue通过Object.defineProperty的getter和setter方法实现了对data对象属性的监听
        Object.defineProperty(dataObj, dataKey, {
            get() {
                // 3.2.1 一个watcher对应了某个属性在视图层中被引用了一次,一个Dep有若干个watcher
                Dep.target && dep.addDep(Dep.target)
                return dataVal
            },
            set(newVal) {
                if (newVal === dataVal) return
                dep.notify()
            }
        })
    }
}
// 3. 依赖的收集和追踪
// 3.1 一个Dep对应一个属性，它有若干个watcher
class Dep {
    constructor() {
        this.deps = []
    }
    addDep(dep) {
        this.deps.push(dep)
    }
    notify() {
        this.deps.forEach(dep => {dep.update()})
    }
}
// 3.2 一个watcher对应了某个属性在视图层中被引用了一次
class Watcher {
    constructor() {
        Dep.target = this
    }
    update() {
        console.log('视图更新了');
    }
}
