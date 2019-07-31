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
      // 标记是否需要登录
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// 全局守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) { // 需要认证
    // 需要认证，则检查令牌
    if (store.state.token) { // 已登录
      next()
    } else { // 未登录
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
  } else { // 不需要认证
    next()
  }
})

export default router
