class XVue {
    constructor(opts) {
        this.$data = opts.data // 保存data选项
        this.observe(this.$data) // 执行响应式
    }
    observe(data) {
        if (!data || typeof data !== 'Object') {
            return 
        }
        // 遍历data选项
        Object.keys(data).forEach(key => {
            // 为每一个data的每一项定义响应式
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(data, key, val) {
        // 递归查找嵌套属性
        this.observe(key)
        // 为data对象定义属性
        Object.defineProperty(data, key, {
            enumerable: true,  //可枚举
            configurable: true, // 可修改或删除
            get() {
                return val
            },
            set(newVal) {
                if (newVal === val) {
                    return 
                }
                val = newVal
                console.log('数据发生了变化')
            }
        })
    }
}