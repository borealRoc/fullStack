<template>
  <div>
    <div class="header">
      <x-header title="登录"></x-header>
    </div>
    <div class="content">
      <div class="login-view">
        <div class="not-login" v-if="isLogin">
          <div class="user-modal">
            <img class="user-pic" src="../assets/logo.png" />
            <h3 class="user-name">{{this.$store.state.user}}</h3>
          </div>
          <cube-button type="submit" @click="logoutHandler">退出登录</cube-button>
        </div>
        <div class="is-login" v-else>
          <cube-form :model="model" :schema="schema"></cube-form>
          <cube-button type="submit" @click="loginHandler">登录</cube-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    async loginHandler(e) {
      e.preventDefault();
      const res = await this.$http.get("/api/login", {
        params: {
          user: this.model.user,
          pass: this.model.pass
        }
      });
      const { code, token, message } = res.data;
      const user = this.model.user.toUpperCase();
      if (code === 0) {
        // 登录成功
        // 先把接口返回的token存入localStorage和state
        // localStorage.setItem("token", token);
        this.$store.commit("setToken", token);
        // 再把用户名存入localStorage和state
        // localStorage.setItem("user", user);
        this.$store.commit("setUser", user);
        // 然后跳转至一开始的目的页面
        const { redirect = "/" } = this.$route.query;
        this.$router.push(redirect);
      } else {
        // 登录失败
        const toast = this.$createToast({
          time: 1000,
          txt: message,
          type: "txt"
        });
        toast.show();
      }
    },
    async logoutHandler(e) {
      e.preventDefault();
      const res = await this.$http.get("/api/logout");
      const { code, token } = res.data;
      if (code === -1) {
        localStorage.setItem("token", token);
        this.$store.commit("setToken", token);
        localStorage.removeItem("user");
        this.$store.commit("setUser", "");
      } else {
        const toast = this.$createToast({
          time: 1000,
          txt: "退出登录失败，请稍后再试",
          type: "txt"
        });
        toast.show();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-view {
  padding: 20px;
  .user-modal {
    margin-bottom: 50px;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    .user-pic {
      float: left;
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }
    .user-name {
      float: left;
      font-size: 24px;
      line-height: 60px;
    }
  }
  .cube-form {
    .cube-form-item {
      margin-bottom: 20px;
    }
  }
  .cube-btn {
    margin: 20px 0;
  }
}
</style>