<template>
  <div class="login-view">
    <cube-form
      :model="model"
      :schema="schema"
      @validate="validateHandler"
      @submit="submitHandler"
      @reset="resetHandler"
    ></cube-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      model: {
        // 数据模型
        username: '',
        password: ''
      },
      schema: {
        // 表单结构模型
        fields: [
          {
            type: 'input',
            modelKey: 'username',
            label: '用户名',
            props: {
              placeholder: '请输入用户名'
            },
            rules: {
              // 校验规则
              required: true
            },
            trigger: 'blur',
            messages: {
              required: '您还未输入用户名'
            }
          },
          {
            type: 'input',
            modelKey: 'password',
            label: '密码',
            props: {
              placeholder: '请输入密码',
              type: 'password',
              eye: { open: false }
            },
            rules: {
              // 校验规则
              required: true
            },
            trigger: 'blur',
            messages: {
              required: '您还未输入密码'
            }
          },
          {
            // 登录按钮
            type: 'submit',
            label: '登录'
          }
        ]
      }
    }
  },
  methods: {
    submitHandler (e) {
      e.preventDefault()
      console.log('submit', e)
    },
    validateHandler (result) {
      this.validity = result.validity
      this.valid = result.valid
      console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
    },
    resetHandler (e) {
      console.log('reset', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-view {
    padding: 20px;
}
</style>
