// 导入 Vue.js 和组件，进行测试
import Vue from 'vue'
import VueComp from '@/components/Demo.vue'

describe('VueComp', () => {
    // 检查原始组件选项
    it('由created生命周期', () => {
        expect(typeof VueComp.created).toBe('function')
    })

    // 评估原始组件选项中的函数的结果å
    it('初始data是vue-text', () => {
        // 检查data函数存在性
        expect(typeof VueComp.data).toBe('function')
        // 检查data返回的默认值
        const defaultData = VueComp.data()
        expect(defaultData.message).toBe('vue-text')
    })

    // 检查mounted之后
    it('mount之后测data是一开始的message', () => {
        const vm = new Vue(VueComp).$mount()
        expect(vm.message).toBe('一开始的message')
    })

    // 检查用户点击
    // it('按钮点击后', () => {
    //     const wrapper = mount(VueComp)
    //     wrapper.find('button').trigger('click') 
    //     expect(wrapper.vm.message).toBe('改变后的message')
    //     // 测试html渲染结果
    //     expect(wrapper.find('span').html()).toBe('<span>改变后的message</span>')
    // })
})