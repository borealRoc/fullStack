//官方推荐处理loader,query的工具
const loaderUtils = require('loader-utils')

module.exports = function (source) {
    // source：源文件返回值
    console.log('source', source)
    // this.query：loarder.options
    console.log('this.query', this.query)

    const opts = this.query
    const options = loaderUtils.getOptions(this)

    // this.callback(): 返回多个信息
    const result = source.replace('hello', options.name)
    this.callback(null, result)
}
