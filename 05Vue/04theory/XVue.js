// step1: 实现数据响应
class XVue {
    constructor(options) {
        //缓存配置
        this.$options = options
        // Observer: 挟持监听data对象
        this.$data = options.data
        this.observe(this.$data)
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
        Object.defineProperty(obj, key,  {
            get() {
                return val
            },
            set(newVal) {
                if (newVal === val) return
                val = newVal
                console.log(`${key}属性更新了:${val}`)
            }
        })
    }
}