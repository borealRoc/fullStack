// 用法 new Compile(el, vm)
class Compile {
    constructor(el, vm) {
        // 要遍历的宿主节点
        this.$el = document.querySelector(el)
        this.$vm = vm
        if (this.$el) {
            // 转换内部内容为片段Fragment
            this.$fragment = this.node2Fragment(this.$el)
            // 执行编译
            this.compile(this.$fragment)
            // 将编译完的html结果追加至$el
            this.$el.appendChild(this.$fragment)
        }
    }
    // 1.将宿主元素中代码片段拿出来遍历，避免频繁的DOM操作
    node2Fragment(el) {
        const frag = document.createDocumentFragment()
        let child
        while ((child = el.firstChild)) {
            frag.appendChild(child)
        }
        return frag
    }
    // 2.编译过程
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 类型判断
            if (this.isElement(node)) {
                // 元素
                console.log('元素', node.nodeName)
            } else if (this.isInterpolation(node)) {
                // 插值文本
                this.compileText(node)                      
            }
            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    
    // 3.类型判断
    // 3.1元素
    isElement(node) {
        return node.nodeType === 1
    }
    // 3.2插值文本
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    //3.3指令
    isDirective(attr) {
        return attr.indexof('x-') === 0
    }
    //事件
    isEvent(attr) {
        return attr.indexof('@') === 0
    }

    // 4.编译
    // 4.1编译插值文本
    compileText(node) {
        console.log('RegExp.$1', RegExp.$1)
        node.textContent = this.$vm.$data[RegExp.$1]
    }
}