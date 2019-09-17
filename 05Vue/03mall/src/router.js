import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/Cart.vue'
import Login from './views/Login.vue'
import store from './store'
import History from './utils/history'

Vue.use(Router)
// 把History插件挂载到Vue上,执行History对象的install方法，这样就可以像使用router一样使用$routerHistory
Vue.use(History)

// 实例化Router之前，扩展Router,重构Router的back方法
Router.prototype.goBack = function () {
    this.isBack = true;
    this.back();
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        auth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
  // 需要认证，检查令牌
    if (store.state.token) {
      // 令牌存在
      next()
    } else {
      // 令牌不存在，跳转去登录页面
      next({
        path: '/login',
        query: {redirect: to.path}
      })
    }
  } else {
  // 不需要认证
    next()
  }
})

// 记录历史记录
router.afterEach((to, from) => {
    if (router.isBack) {
        //后退
        History.pop()
        router.isBack = false
        router.transitionName = 'router-back'
    } else {
        // 前进
        History.push(to.path)
        router.transitionName = 'router-forward'
    }
})

export default router