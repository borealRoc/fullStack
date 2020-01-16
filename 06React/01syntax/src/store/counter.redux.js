export const CounterRedux = (state = 0, action) => {
    switch (action.type) {
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default:
            return state
    }
}
export const add = () => ({ type: 'add' })
export const minus =  () => ({ type: 'minus' })
export const asyncAdd =  () => dispatch => {
    // 异步结束后，手动执行dispatch
    setTimeout(() => {
        dispatch({ type: 'add' })
    }, 1500)
}