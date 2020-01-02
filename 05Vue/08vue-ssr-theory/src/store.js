import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        state: {
            count: 17
        },
        mutations: {

        },
        actions: {

        }
    })
}
