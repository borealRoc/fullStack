<template>
  <div id="app">
    <!-- 路由导航 -->
    <router-link to="/home">Home</router-link>
    <router-link to="/about:vue">About</router-link>
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  margin-right: 10px;
}
</style>
