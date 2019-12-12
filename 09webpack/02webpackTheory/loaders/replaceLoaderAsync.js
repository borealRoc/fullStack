module.exports = function (source) {
    const opts = this.query
    // this.async(): 处理loarder里面的异步事件
    // this.async()会返回一个this.callback()
    const asyncHandler = this.async()
    setTimeout(() => {
        const result =  source.replace('world', opts.name)
        asyncHandler(null, result)
    },3000)
}
// this.callback(
//     err: Error | null,
//     content: string | Buffer,
//     sourceMap ?: SourceMap,
//     meta ?: any
// )