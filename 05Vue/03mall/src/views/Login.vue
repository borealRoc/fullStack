<template>
  <div class="login-view">
    <cube-form :model="model" :schema="schema" @submit="submitHandler"></cube-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {

  data() {
    return {
      // 数据模型
      model: {
        user: "",
        pass: ""
      },
      // 表单结构模型
      schema: {
        fields: [
          // 用户名输入框
          {
            type: "input",
            modelKey: "user",
            label: "用户名:",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              required: true
            },
            trigger: "blur",
            messages: {
              required: "您还未输入用户名"
            }
          },
          // 密码输入框
          {
            type: "input",
            modelKey: "pass",
            label: "密码:",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: { open: false }
            },
            rules: {
              required: true
            },
            trigger: "blur",
            messages: {
              required: "您还未输入密码"
            }
          },
          // v-if = "!isLogin"
          // 登录按钮
          {
            type: "submit",
            label: "登录"
          },
          // v-if = "isLogin"
          // 退出登录按钮
          {
            type: "submit",
            label: "退出登录"
          }
        ]
      }
    };
  },
  computed: {
      ...mapGetters(['isLogin'])
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault();
      const res = await this.$http.get("/api/login", {
        params: {
          user: this.model.user,
          pass: this.model.pass
        }
      });
      const { code, token, message } = res.data;
      if (code === 0) {
        // 登录成功
        // 1.先把接口返回的token存入localStorage和state
        localStorage.setItem("token", token);
        this.$store.commit("setToken", token);
        // 然后跳转至一开始的目的页面
        const {redirect = "/"} = this.$route.query;
        this.$router.push(redirect);
      } else {
        // 登录失败
        const toast = this.$createToast({
          time: 1000,
          txt: message,
          type: 'txt'
        });
        toast.show();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-view {
  .cube-form {
    .cube-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>