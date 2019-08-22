import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('user') || '',
        cart: JSON.parse(localStorage.getItem('cart')) || []
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUser(state, user) {
            state.user = user
        },
        addCart(state, item) {
            const good = state.cart.find(v => v.id === item.id);
            if (good) {
                good.cartCount += 1
            } else {
                state.cart.push({
                    ...item,
                    cartCount: 1,
                })
            }
        }
    },
    actions: {

    },
    getters: {
        isLogin: state => !!state.token,
        cartTotal: state => {
            let num = 0;
            state.cart.forEach(item => {
                num += item.cartCount
            })
            return num;
        }
    }
})

// 订阅store变化
store.subscribe((mutation, state) => {
    // 当token，用户名，购物车商品发生变化时，将这些数据存储在localStorage
    switch (mutation.type) {
        case 'setToken':
            localStorage.setItem('token', state.token);
            break;
        case 'setUser':
            localStorage.setItem('user', state.user);
            break;
        case 'addCart':
            localStorage.setItem('cart', JSON.stringify(state.cart));
            break;
    }
});
export default store;