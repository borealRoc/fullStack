<template>
  <div id="app">
    <h1>模仿ElementUi设计一个表单组件</h1>
    <p>Form负责定义数据模型和校验规则</p>
    <p>FormItem负责显示错误信息</p>
    <p>FormInput负责双向数据绑定</p>
    <ele-form :model="model" :rules="rules" ref="loginForm">
      <ele-form-item label="用户名" prop="username">
        <interfer>
          <ele-input v-model="model.username"></ele-input>
        </interfer>
      </ele-form-item>
      <ele-form-item label="确认密码" prop="password">
        <ele-input type="password" v-model="model.password"></ele-input>
      </ele-form-item>
    </ele-form>
  </div>
</template>

<script>
import EleInput from "./components/EleInput.vue";
import EleFormItem from "./components/EleFormItem.vue";
import EleForm from "./components/EleForm.vue";
import Interfer from "./components/Interfer.vue";

export default {
  name: "app",
  components: {
    EleInput,
    EleFormItem,
    EleForm,
    Interfer
  },
  data() {
    return {
      model: { username: "tom", password: "" },
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          { min: 6, max: 10, message: "请输入6~10的用户名" }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 6, max: 10, message: "请输入6~10的密码" }
        ]
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
