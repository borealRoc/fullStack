<template>
  <div class="about">
    <h4>This is about page</h4>
    <p class="tip">通过$route对象获取参数</p>
    <p v-if="$route.params.msg">我的路径参数为：{{$route.params.msg}}</p>
    <p v-if="$route.query.foo">我的查询参数为：{{$route.query.foo}}</p>
    <p class="tip">通过props获取参数</p>
    <p v-if="msg">我的路径参数为：{{msg}}</p>
    <p v-if="foo">我的查询参数为：{{foo}}</p>
    <p v-if="staticProp">路由传过来的静态值为：{{staticProp}}</p>
    <p></p>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'About',
  props: ['msg','foo','staticProp'],
  created () {
      console.log('router',this.$router);
      console.log('route',this.$route);
  },
}
</script>
<style lang="scss" scoped>
    h1 {
        font-size: 60px;
    }
    .tip {
      color: #4CAF4B;
    }
</style>