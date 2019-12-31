export default ctx => {
    const {app} = ctx
    app.router.beforeEach((to, from ,next) => {
        console.log(`我从${from.path}来，我要去${to.path}`)
        next()
    })
}