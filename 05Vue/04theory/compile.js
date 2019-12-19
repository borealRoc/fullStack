class Compile {
    constructor(el, vm) {
        // 1. 获取宿主元素及XVue实例
        this.$el = document.querySelector(el)
        this.$vm = vm
        // 2. 执行编译
        if (this.$el) {
            // 2.1 将宿主元素转变为node节点[避免重排重绘，提高性能]
            this.$fragment = this.node2Fragment(this.$el)
            // 2.2 对node节点进行编译
            this.compile(this.$fragment)
            // 2.3 将编译好的node节点再放回宿主元素
            this.$el.appendChild(this.$fragment)
        }
    }
    // 3. 将宿主元素中代码片段拿出来遍历
    node2Fragment(el) {
        const frag = document.createDocumentFragment()
        let child
        while ((child = el.firstChild)) {
            frag.appendChild(child)
        }
        return frag
    }
    // 4. 编译方法
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 4.1 判断节点类型
            if (this.isElement(node)) {
                // 4.1.1 元素节点,查找x-,@,
                const nodeAttrs = node.attributes;
                Array.from(nodeAttrs).forEach(attr => {
                    const attrName = attr.name; //属性名
                    const attrVal = attr.value; // 属性值
                    if (this.isDirective(attrName)) {
                        // 指令 x-text, x-model
                        // text, model
                        const dir = attrName.substring(2)
                        this[dir] && this[dir](node, this.$vm, attrVal)
                    }
                    if (this.isEvent(attrName)) {
                        // 事件 
                        const dir = attrName.substring(1)
                        this.eventHandler(node, this.$vm, attrVal, dir)
                    }
                })
            } else if (this.isInterpolation(node)) {
                // 4.1.2 插值节点
                this.compileInterpolation(node)
            }
            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    // 5. 判断节点的类型
    // 5.1 元素节点
    isElement(node) {
        return node.nodeType === 1
    }
    // 5.2 插值文本节点
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    // 5.3 指令
    isDirective(attr) {
        return attr.indexOf('x-') === 0
    }
    // 5.4 事件
    isEvent(attr) {
        return attr.indexOf('@') === 0
    }
    // 6. 不同类型节点的各自编译方法
    // 6.1 编译插值文本
    compileInterpolation(node) {
        this.update(node, this.$vm, RegExp.$1, 'text')
    }
    text(node, vm, dataVal) {
        this.update(node, vm, dataVal, 'text')
    }
    html(node, vm, dataVal) {
        this.update(node, vm, dataVal, "html")
    }
    model(node, vm, dataVal) {
        // 指定input的value属性
        this.update(node, vm, dataVal, "model")
        // 视图对模型响应:双向绑定
        node.addEventListener('input', e => {
            vm[dataVal] = e.target.value
        })
    }
    eventHandler(node, vm, dataVal, dir) {
        // @click="onClick"
        let fn = vm.$opts.methods && vm.$opts.methods[dataVal]
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm));
        }
    }
    // 7. 不同类型节点的更新渲染方法
    update(node, vm, val, dir) {
        const updaterFn = this[dir + 'Updater']
        // 初始化
        updaterFn && updaterFn(node, vm[val])
        // 依赖收集，即当data变化，更新视图
        new Watcher(vm, val, function (newVal) {
            updaterFn && updaterFn(node, newVal)
        })
    }
    textUpdater(node, val) {
        node.textContent = val
    }
    htmlUpdater(node, val) {
        node.innerHTML = val
    }
    modelUpdater(node, val) {
        node.value = val
    }
}