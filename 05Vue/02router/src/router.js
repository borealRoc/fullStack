import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// @ is an alias to /src
import About from '@/views/About.vue'
import Error from '@/views/404.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import News from '@/views/News.vue'

// 插件挂载
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/error',
    },
    {
      path: '/error',
      component: Error,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      alias: '/nohome',
      children: [
        {path: 'login', name: 'login', component: Login},
        {path: 'register', name: 'register', component: Register},
        {path: 'news', name: 'news', component: News},
      ]
    },
    {
      path: '/about/:msg',
      name: 'about',
      component: About,
      // 布尔模式，传route.params里的值
      // props: true, 

      // 对象模式，传静态值
      // props: {
      //   staticProp: 'staticPropVal',
      // },

      // 函数模式：同时传静态值与基于路由的值
      props: (route) => ({ 
        msg: route.params.msg,
        foo: route.query.foo,
        staticProp: 'staticPropVal',
       })
    }
  ]
})
