<template>
  <div>
    <p v-if="$route.params.dynamic">本路由的路径参数为：{{$route.params.dynamic}}</p>
    <p v-if="$route.query.dynamic">本路由的查询参数为：{{$route.query.dynamic}}</p>
  </div>
</template>

<script>
export default {
  head: {
    title: "基本语法"
  }
};
</script>

<style scoped>
</style>