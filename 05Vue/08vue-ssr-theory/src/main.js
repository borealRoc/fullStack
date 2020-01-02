// 客户端渲染入口文件
import { createApp } from './createapp'

const { app, router } = createApp()
router.onReady(() => {
    app.$mount('#app')
})
