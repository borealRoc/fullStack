<template>
  <div>
    <h3>用户详情</h3>
    <h4>{{user.id}} -- {{user.name}}</h4>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    // 注意返回的就是响应数据
    const data = await $axios.$get(`/api/users/${params.id}`);
    if (data.ok) {
      return { user: data.user };
    }
    error({ statusCode: 400, message: "id有误，查询失败" });
  }
};
</script>
<style scoped>
</style>
