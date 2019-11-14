// step1: 实现数据响应
class XVue {
    constructor(options) {
        //缓存配置
        this.$options = options
        // Observer: 挟持监听data对象
        this.$data = options.data
        this.observe(this.$data)

        // 模拟一下watcher创建
        new Watcher();
        // // 通过访问test属性触发get函数，添加依赖
        this.$data.name;
        new Watcher();
        this.$data.person.age;
    }
    // 遍历$data对象所有的属性，监听每一个属性
    observe(data) {
        if (!data || typeof data !== 'object') return
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    // 对监听到的$data对象的属性做响应式处理
    defineReactive(obj, key, val) {
        // 使用递归方式解决data数据嵌套问题
        this.observe(val)

        const dep = new Dep()

        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target);
                return val
            },
            set(newVal) {
                if (newVal === val) return
                val = newVal
                // console.log(`${key}属性更新了:${val}`)
                dep.notify()
            }
        })
    }
}
// step2: 依赖收集与追踪
// Dep: 用来管理Watcher
class Dep {
    constructor() {
        this.deps = []
    }
    addDep(dep) {
        this.deps.push(dep)
    }
    notify() {
        this.deps.forEach(dep => dep.update())
    }
}
// Watcher: 添加订阅者
class Watcher {
    constructor() {
        Dep.target = this
    }
    update() {
        console.log('属性更新了')
    }
}