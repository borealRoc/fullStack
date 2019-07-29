<template>
  <div>
    <p>This is login page</p>
    <button @click="login">login</button>
    <button @click="logout">logout</button>
    <p>登录状态:{{loginStatus}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginStatus: this.$store.state.isLogin ? "已登录" : "未登录"
    };
  },
  methods: {
    // login() {
    //     window.isLogin = true;
    //     this.loginStatus = '已登录';
    //     const {redirect} = this.$route.query;
    //     if (redirect) {
    //         this.$router.push(redirect);
    //     } else {
    //         this.$router.push('/');
    //     }
    // },
    // logout() {
    //     window.isLogin = false;
    //     this.loginStatus = '未登录';
    // }
    async login() {
      const ret = await this.$store.dispatch("submitLogin");
    //   if (ret) {
    if (this.$store.state.isLogin) {
        this.loginStatus = "已登录";
        const { redirect } = this.$route.query;
        if (redirect) {
          this.$router.push(redirect);
        } else {
          this.$router.push("/");
        }
      }
    },
    async logout() {
      const ret = await this.$store.dispatch("submitLogout");
      if (ret) {
        this.loginStatus = "未登录";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  width: 80px;
  height: 30px;
  margin-right: 20px;
  font-size: 16px;
  color: #fff;
  border: 0;
  border-radius: 4px;
  background: #4caf50;
  outline: none;
}
</style>