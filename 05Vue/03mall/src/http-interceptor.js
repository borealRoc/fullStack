import axios from "axios";
import store from "./store";
import router from "./router";

// 请求拦截器：拦截axios所有http请求，预先放入token请求头
axios.interceptors.request.use(config => {
    if (store.state.token) {
      // 若存在令牌，则放入请求头
      config.headers.token = store.state.token;
    }
    return config;
});

// 响应拦截器：提前预处理响应
axios.interceptors.response.use(response => {
    if (response.status === 200) {
      const data = response.data;
      // 如果用户已注销
      if (data.code === -1) {
        clearTokenHandler()
      }
    }
    return response;
}, err => {
  if (err.response.status === 401) {
      // 如果无授权
    clearTokenHandler()
  }
})

function clearTokenHandler () {
  // 清空缓存
  store.commit('setToken', '')
  localStorage.removeItem('token')
  // 跳转至登录页面
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.path
    }
  })
}
