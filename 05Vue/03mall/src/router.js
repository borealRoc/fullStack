import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
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