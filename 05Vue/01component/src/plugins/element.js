import Vue from 'vue'
// 这个文件添加的组件都是全局注册的
// 按需加载，需要用什么UI，要在这里手动添加
import {Input,Button,Form,FormItem,} from 'element-ui'
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
