import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state相当于date
  state: {
    count: 1,
    num: 2,
    todos: [
      { id: 1, text: 'todo-1', done: true },
      { id: 2, text: 'todo-2', done: false }
    ]
  },
  // store的计算属性
  getters: {
    // 通过属性访问
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    }
  },
  mutations: {
    addCount(state, n) {
      state.count += n;
    },
    addNum(state,n) {
      state.num += n;
    }
  },
  actions: {
    // context 对象与 store 实例具有相同方法和属性,但不是 store 实例本身
    addCountAction (context,n) {
      context.commit('addCount',n);
    },
    addNumAsync({commit},n) {
      setTimeout(()=>{
        commit('addNum',n);
      },1000)
    }
  }
})
