/* eslint-disable no-empty */
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// @ is an alias to /src
import About from '@/views/About.vue'
import Error from '@/views/404.vue'
// import Login from '@/views/Login.vue'
// import Register from '@/views/Register.vue'
// import News from '@/views/News.vue'

// 路由懒加载
const Login = () => import('@/views/Login.vue');
const Register = () => import('@/views/Register.vue');
const News = () => import('@/views/News.vue');

// 插件挂载
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/error',
    },
    {
      path: '/error',
      name: 'error',
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
// 全局路由守卫
router.beforeEach((to, from , next) => {
  // eslint-disable-next-line no-empty
  // 用户需要先登录，才能去其它页面
  if (to.name !== 'login' && to.path !== '/error' && to.name !== 'home') {
    if (window.isLogin) {
      // 已经登录
      next();
    } else {
      // 如果还未登录，那先跳转去登录页面，登录完成后再跳转去目的页面
      next(`/home/login?redirect=` + to.path);
    }
  } else {
    next();
  }
})
export default router;
