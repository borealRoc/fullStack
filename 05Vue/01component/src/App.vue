<template>
  <div id="app">
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
      <!-- 组件的相关语法 -->
      <div class="course-ctn my-component">
        <h2>组件的语法</h2>
        <div class="event-ctn">
          <h3>1. 子组件通过事件给父组件传值</h3>
          <p>我儿子要给我汇钱：&yen;{{moneyFromChildComponent}}</p>
          <my-button @tradeMoney="receiveMoney"></my-button>
        </div>
        <div class="v-model-ctn">
          <h3>2. 手动实现v-model的双向数据绑定</h3>
          <p class="two-lines">在下面的输入框输入文字，我右边也会有相应的文字，因为它实现了双向数据绑定: {{someVal}}</p>
          <my-input v-model="someVal"></my-input>
        </div>
        <div class="slot-ctn">
          <h3>3. slot插槽: 父组件把内容传给子组件</h3>
          <button class="my-btn" @click="showPopupHandle">点我出现弹窗</button>
          <my-popup
            :ifPopupShow="ifPopupShowControlByFather"
            @pupupHideEmitByChild="pupupHideReceiveByFather"
          >
            <template slot="header">
              <h5>温馨提示</h5>
            </template>
            <template slot="content">
              <p>别看了，把我关了吧！</p>
            </template>
          </my-popup>
        </div>
        <div class="provide-ctn">
          <h3>4. 属性注入[provide && inject]: 祖先元素把数据传给后代元素</h3>
          <hello-world></hello-world>
        </div>
      </div>
      <!-- 设计类ElementUi表单组件 -->
      <div class="course-ctn">
        <h2>设计组件：模仿ElementUi表单组件</h2>
        <ele-form></ele-form>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Cart from "./components/Cart.vue";
import MyButton from "./components/MyButton.vue";
import MyInput from "./components/MyInput.vue";
import MyPopup from "./components/MyPopup.vue";
// import MyFormItem from "./components/MyFormItem.vue";
import EleForm from "./components/EleForm.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    HelloWorld,
    Cart,
    EleForm,
    MyButton,
    MyInput,
    MyPopup
    // MyFormItem
  },
  provide() {
    return {
      ancestorVal: 'Hello,这个属性来自祖先元素',
    }
  },
  data() {
    return {
      moneyFromChildComponent: 0,
      goods: [],
      cartTitle: "课程购物车",
      someVal: "这最初的value是父组件传给子组件的",
      ifPopupShowControlByFather: false
      // ruleForm: {
      //   name: '',
      //   pwd: '',
      // }
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
    },
    receiveMoney(obj) {
      this.moneyFromChildComponent = obj.num;
    },
    showPopupHandle() {
      this.ifPopupShowControlByFather = true;
    },
    pupupHideReceiveByFather(hide) {
      this.ifPopupShowControlByFather = hide;
    }
  }
};
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
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
}
.course-ctn {
  -webkit-flex: 1;
  flex: 1;
  padding: 20px;
  /* max-width: 33%; */
}
h2 {
  text-align: center;
}
ul {
  list-style: none;
}
.two-lines {
  min-height: 50px;
  text-align: justify;
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
.my-component {
  text-align: left;
}
.my-btn {
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
