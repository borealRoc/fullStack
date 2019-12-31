<template>
  <div>
    <h2>Nuxt异步数据获取</h2>
    <ol>
      <li>
        <el-button @click="$router.push({name: 'data-asyncData'})">asyncData的使用</el-button>
      </li>
      <li>
        <h3>整合axios</h3>
        <el-button @click="$router.push({name: 'data-id', params: {id: 3}})">张三</el-button>
        <el-button @click="$router.push({name: 'data-id', params: {id: 4}})">李四</el-button>
        <el-button @click="$router.push({name: 'data-id', params: {id: 5}})">王五</el-button>
        <el-button @click="$router.push({name: 'data-id', params: {id: 6}})">马六</el-button>
      </li>
      <li>
          <el-button @click="$router.push({name: 'data-vuex'})">整合Vuex</el-button>
      </li>
    </ol>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  head: {
    title: "Nuxt异步数据获取"
  },
  layout: "basic"
};
</script>

<style scoped>
h2,h3 {
  margin: 10px 0;
}
li {
  margin-bottom: 10px;
  text-align: left;
}
</style>