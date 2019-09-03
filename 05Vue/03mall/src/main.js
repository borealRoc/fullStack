import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import interceptor from './http-interceptor'
import XHeader from './components/Header.vue'
import { createAPI } from  'cube-ui'
import Notice from './components/Notice.vue'
import notice from './service/notice'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$notice = notice;
// 创建 this.$createNotice API
createAPI(Vue, Notice, true) //true表示单例


// 全局注册header组件
Vue.component('x-header', XHeader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
