<template>
  <div id="app">
    <div class="router-part">
      <transition name="slide">
        <router-view />
      </transition>
    </div>
    <!-- <cube-tab-bar v-model="selectedLabel" :data="tabs" @change="changeHandler"></cube-tab-bar> -->
    <!-- 为了给Cart-tab加一个数量提示的badge，所以需要对这个组件进行重构 -->
    <cube-tab-bar v-model="selectedLabel" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" :key="index" :label="item.value" :icon="item.icon">
        <span class="cart-badge" v-if="showBadge(item.label)">{{cartTotal}}</span>
        <p>{{item.label}}</p>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedLabel: "/", // 默认页签
      tabs: [
        { label: "Home", value: "/", icon: "cubeic-home" },
        { label: "Cart", value: "/cart", icon: "cubeic-mall" },
        { label: "Me", value: "/login", icon: "cubeic-person" }
      ]
    };
  },
  watch: {
    // 路由发生变化时，同步tabs选中
    $route(route) {
      this.selectedLabel = route.path;
    }
  },
  created() {
    // 初始化页签设置
    this.selectedLabel = this.$route.path;
  },
  computed: {
    ...mapGetters(["cartTotal"])
  },
  methods: {
    changeHandler(val) {
      this.$router.push(val);
    },
    showBadge(label) {
      return label === "Cart" && this.cartTotal > 0;
    }
  }
};
</script>
<style>
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #e7e7e7;
}
.cube-tab {
  color: #5d656d;
}
.cube-tab_active {
  color: #ff4e22;
}
.cart-badge {
  position: absolute;
  font-size: 9px;
  width: 14px;
  height: 14px;
  margin-top: -4px;
  border: solid 1px;
  text-align: center;
  line-height: 14px;
  color: #e00000;
  background-color: #fff;
  border-radius: 50%;
}
.router-part {
  position: absolute;
  top: 0;
  bottom: 48px;
  left: 0;
  right: 0;
}
.router-part > div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.slide-enter {
  transform: translate3d(-100%, 0, 0);
}
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
</style>
