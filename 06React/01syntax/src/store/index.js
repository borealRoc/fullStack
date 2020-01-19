import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from "redux-thunk"
import { CounterRedux } from './counter.redux'
import { UserRedux } from "./user.redux"

// 中间件按引入顺序执行，即先执行logger,再执行thunk
const store = createStore(
    combineReducers({ Counter: CounterRedux, User: UserRedux }),
    applyMiddleware(logger, thunk)
)
export default store
