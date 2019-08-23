import Vue from 'vue'
import './plugins/axios'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import interceptor from './http-interceptor'
import XHeader from './components/Header.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.component('x-header', XHeader)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
