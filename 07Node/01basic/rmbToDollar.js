let rate

const rmbTurn = rem => rem/rate

module.exports = r => {
    rate = r;
    return {rmbTurn}
}