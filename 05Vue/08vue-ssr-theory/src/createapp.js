// 客户端和服务端渲染都要执行的文件
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

export function createApp(context) {
    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        router,
        store,
        context,
        render: h => h(App)
    })
    return { app, router }
}
