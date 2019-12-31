<template>
  <div>
    <h3>用户列表</h3>
    <ul>
      <li v-for="user in users" :key="user.id">{{user.name}}</li>
    </ul>
  </div>
</template>

<script>
function getUsers() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ name: "张三", id: 1 }, { name: "李四", id: 2 }]);
    }, 500);
  });
}
export default {
  head: {
    title: "Nuxt异步数据获取"
  },
  async asyncData() {
    console.log(process.server ? "服务端执行" : "客户端执行");
    const users = await getUsers();
    // return的数据最终回合data中的合并
    return { users };
  }
};
</script>

<style scoped>
li {
  margin-bottom: 10px;
  text-align: left;
}
</style>