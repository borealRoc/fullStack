// 令牌验证
export default function ({$axios}) {
    // onRequest: 请求拦截器
    $axios.onRequest(config => {
        console.log('请求拦截器')
        if (!process.server) {
            config.headers.token = 'JILEI'
        }
    })
}