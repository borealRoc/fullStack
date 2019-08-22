import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/Cart.vue'
import Login from './views/Login.vue'
import store from './store'

Vue.use(Router)

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

export default router