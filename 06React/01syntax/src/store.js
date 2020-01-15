import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from "redux-thunk"

const CounterRedux = (state = 0, action) => {
    switch (action.type) {
        case 'add':
            return state + 1
        case 'minus':
            return state - 1
        default:
            return state
    }
}
// 中间件按引入顺序执行，即先执行logger,再执行thunk
const store = createStore(CounterRedux, applyMiddleware(logger, thunk))
export default store