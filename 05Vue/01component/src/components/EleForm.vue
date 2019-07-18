<template>
  <div>
    <div class="ele-form-com">
      <h3>1. ElementUI表单组件</h3>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="sel-form-com">
      <h3>2. 自己设计的表单组件</h3>
      <p>Form负责定义数据模型和校验规则</p>
      <p>FormItem负责显示错误信息</p>
      <p>FormInput负责双向数据绑定</p>
      <my-form :mymodel="myRuleForm" :myrules="myRules" ref="myForm">
        <my-form-item label="用户名" prop="name">
          <my-input v-model="myRuleForm.name"></my-input>
        </my-form-item>
        <my-form-item label="密码" prop="pwd">
          <my-input type="password" v-model="myRuleForm.pwd"></my-input>
        </my-form-item>
        <my-form-item class="login-item">
          <el-button type="primary" @click="myLogin">登录</el-button>
        </my-form-item>
      </my-form>
    </div>
  </div>
</template>

<script>
import MyForm from "./MyForm.vue";
import MyFormItem from "./MyFormItem.vue";
import MyInput from "./MyInput.vue";

export default {
  name: "EleForm",
  components: {
    MyForm,
    MyFormItem,
    MyInput
  },
  data() {
    return {
      // element表单的数据模型
      ruleForm: {
        name: "default",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码" }]
      },
      // 我自己的表单的数据模型
      myRuleForm: {
        name: "default",
        pwd: "",
      },
      myRules: {
        name: [
          { required: true, message: "请输入姓名", },
          { min: 6, max: 10, message: "长度要在6~10个字符之间",}
        ],
        pwd: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    myLogin() {
      this.$refs.myForm.formValidate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.ele-form-com {
  h3 {
    text-align: left;
  }
}
.sel-form-com {
  text-align: left;
  p {
    text-indent: 2em;
  }
}
</style>