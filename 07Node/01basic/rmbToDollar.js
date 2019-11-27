let rate

const rmbTurn = rem => rem/rate

module.exports = r => {
    rate = r;
    // 返回一个对象，对象中有rmbTurn方法
    return {rmbTurn}
}