import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
import Home from './views/Home.vue'
// @ is an alias to /src
import About from '@/views/About.vue'

// 插件挂载
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: App
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about:msg',
      name: 'about',
      component: About
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
