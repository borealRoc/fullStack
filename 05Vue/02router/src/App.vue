<template>
  <div id="app">
    <h1>vue-router的语法及其应用</h1>
    <div class="flex">
      <div class="flex1">
        <h2>1.基础语法</h2>
        <h3>1.1路由导航</h3>
        <router-link to="/home">声明式: Go to Home</router-link>
        <a @click="goToAbout" class="link">编程式: Go to About</a>
        <h3>1.2动态路由</h3>
        <router-link to="/about/vue?foo=bar">Go to About</router-link>
        <h3>1.3重定向和别名</h3>
        <router-link to="/">Go to '/' but redirect to Error</router-link>
        <router-link to="/nohome">Go to '/nohome' but turn to Home because of alias</router-link>
        <h3>1.4嵌套路由</h3>
        <router-link :to="{name: 'login'}">Go to Home-Login</router-link>
        <router-link to="/home/register">Go to Home-Register</router-link>
        <router-link to="/home/news">Go to Home-News</router-link>
        <!-- 路由出口 -->
        <div class="router-view">
          <h1>Router-view: Look at below</h1>
          <transition name="slide">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",
  methods: {
    goToAbout() {
      this.$router.push({ name: "about", params: { msg: "vue" } });
      return false;
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
.flex {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-start;
}
.flex1 {
  flex: 1;
  -webkit-flex: 1;
  text-align: left;
}
.link {
  text-decoration: underline;
}
a {
  display: block;
  color: rgb(85, 26, 139);
  cursor: pointer;
}
h1 {
  font-size: 22px;
}
h2 {
  font-size: 20px;
}
h3 {
  font-size: 18px;
}
h4 {
  color: #e00000;
}
.router-view {
  margin-top: 30px;
}
</style>
