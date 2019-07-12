<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="wrap">
      <!-- 购物车实例 -->
      <div class="course-ctn">
        <h2>购物车实例</h2>
        <ul class="course-lists">
          <li class="course-list" v-for="(good, index) in goods" :key="good.id">
            <span>{{good.name}}</span>
            <span>{{good.price}}</span>
            <button @click="addGood(index)">添加到购物车</button>
          </li>
        </ul>
        <!-- 因为子组件会接收addGood事件，所以不需要父组件把items属性传给子组件-->
        <!-- <Cart :title="cartTitle" :items="cartItems"></Cart> -->
        <Cart :title="cartTitle"></Cart>
      </div>
      <!-- ElementUi组件引入 -->
      <div class="course-ctn">
        <h2>ElementUi组件引入</h2>
        <ele-form></ele-form>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Cart from "./components/Cart.vue";
import EleForm from "./components/EleForm.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    HelloWorld,
    Cart,
    EleForm
  },
  data() {
    return {
      goods: [],
      cartTitle: "课程购物车"
    };
  },
  // async created() {
  //   try {
  //     // 请求模拟的商品列表数据
  //     const res = await axios.get("/api/goods");
  //     if (res.data.code === 0) {
  //       this.goods = res.data.list;
  //     }
  //   } catch (err) {
  //     alert("商品列表加载失败");
  //   }
  // },
  created() {
    axios.get("/api/goods").then(res => {
      if (res.data.code === 0) {
        this.goods = res.data.list;
      }
    });
  },
  methods: {
    // 改进：数据传递的方式一：总线模式
    // 这里添加商品到购物车，本质上是属于购物车组件的事情
    // 父组件要做的仅仅是“通知”购物车组件有商品被添加到你那里去了
    // 所以应该把这个事件放到购物车组件
    addGood(i) {
      // 得到要添加到购物车的商品
      const good = this.goods[i];
      // 把添加商品的通知派发出去
      this.$bus.$emit("addGood", good);

      // 派发出去后，下面的代码就可以注释掉了
      // const cartItem = this.cartItems.find(item => item.id === good.id);
      // if (cartItem) {  // 购物车已有该商品
      //   cartItem.count += 1;
      // } else {  // 该商品首次被添加进购物车
      //   this.cartItems.push({
      //     ...good,
      //     count: 1,
      //     active: false,
      //   })
      // }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.wrap {
  display: -webkit-flex;
  display: flex;
  padding: 20px;
}
.course-ctn {
  -webkit-flex: 1;
  flex: 1;
  max-width: 33%;
}
ul {
  list-style: none;
}
.course-list {
  margin-bottom: 10px;
  line-height: 40px;
  overflow: hidden;
}
.course-list span {
  float: left;
  width: 150px;
  text-align: left;
}
.course-list span:nth-child(2) {
  width: 100px;
}
.course-list button {
  float: left;
  padding: 0 5px;
  height: 30px;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  background-color: #41b882;
  border: 0;
  outline: 0;
}
</style>
