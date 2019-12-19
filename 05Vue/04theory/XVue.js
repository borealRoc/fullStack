// 1. 创建XVue类
class XVue {
    constructor(opts) {
        this.$opts = opts
        this.$data = opts.data
        this.$el = opts.el
        // 2. 挟持监听data对象
        this.observer(this.$data)

        new Compile(this.$el, this)

        // 执行created
        if (opts.created) {
            // 绑定this到vue实例
            opts.created.call(this)
        }
    }
    proxyData(key) {
        Object.defineProperty(this, key, {
            get(){
              return this.$data[key]
            },
            set(newVal){
              this.$data[key] = newVal;
            }
        })
    }
    observer(data) {
        if (!data || typeof data !== 'object') return
        // 2.1 挟持监听data对象的所有属性 
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
            this.proxyData(key)
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
                if (newVal === dataVal) {
                    return
                }
                dataVal = newVal
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
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        // 将当前watcher实例指定到Dep静态属性target
        Dep.target = this
        // 触发getter，添加依赖
        this.vm[this.key]
        Dep.target = null
    }
    update() {
        this.cb.call(this.vm, this.vm[this.key])
    }
}
