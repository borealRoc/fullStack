<template>
  <div>
    <h2>Nuxt基础语法</h2>
    <ol>
      <li>
        <nuxt-link to="/basic/nuxt-link">路由跳转</nuxt-link>
      </li>
      <li>
        <el-button
          @click="$router.push({name: 'basic- dynamic', params: {dynamic: 'params'}})"
        >动态路由路径参数</el-button>
        <el-button
          @click="$router.push({name: 'basic- dynamic', query: {dynamic: 'query'}})"
        >动态路由查询参数</el-button>
      </li>
      <li>
        <el-button
          @click="$router.push({name: 'basic-nest'})"
        >路由嵌套</el-button>
      </li>
    </ol>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  head: {
    title: "基本语法"
  },
  layout: 'basic',
};
</script>

<style scoped>
h2 {
    margin: 10px 0;
}
li {
  margin-bottom: 10px;
  text-align: left;
}
</style>