<template>
  <div class="form-item">
    <label class="form-label" v-if="label">{{label}}</label>
    <div class="form-ctt">
      <slot></slot>
      <!-- 校验错误信息 -->
      <p class="form-err" v-if="validateStatus === 'error'">{{errorMes}}</p>
    </div>
  </div>
</template>

<script>
import schema from "async-validator";

export default {
  name: "MyFormItem",
  inject: ["form"], // 注入form，获取model和rules
  props: ["label", "prop"], // lable用于传表单头,prop用于传校验字段
  data() {
    return {
      validateStatus: "",
      errorMes: ""
    };
  },

  created() {
    // 监听子组件的“this.$parent.$emit”，即自己监听自己派发的事件
    this.$on("inputValidate", this.itemValidate);
  },

  // form-item挂载到form上时，派发一个添加事件
  mounted() {
    // 把需要验证的表单项派发出去
    if (this.prop) {
      this.$parent.$emit("formItemAdd", this);
    }
  },

  methods: {
    // 校验当前项，依赖async-validate
    // itemValidate(valueFromInput) {
    //   // 校验规则
    //   const descriptor = { [this.prop]: this.form.rules[this.prop] };
    //   // 校验器
    //   const validator = new schema(descriptor);
    //   // 校验器的校验方法：async-validate提供的api 【这是个异步】
    //   validator.validate({ [this.prop]: valueFromInput }, errors => {
    //     if (errors) {
    //       // 校验不通过
    //       console.log(errors);
    //       this.validateStatus = "error";
    //       this.errorMes = errors[0].message;
    //     } else {
    //       // 校验通过
    //       this.validateStatus = "";
    //       this.errorMes = "";
    //     }
    //   });
    // }
    // 因为validator.validate是一个异步操作，所以讲上面的方法改造成返回一个promise对象
    itemValidate() {
      return new Promise(resolve => {
        const descriptor = { [this.prop]: this.form.myrules[this.prop] };
        const validator = new schema(descriptor);
        validator.validate({ [this.prop]: this.form.mymodel[this.prop]}, errors => {
          if (errors) {
            // console.log('errors', errors);
            this.validateStatus = "error";
            this.errorMes = errors[0].message;
            // 校验的结果不管是成功还是失败，对于promise来说，都是执行成功了，所以都是执行resolve
            // 区别只是根据校验结果的不同，在resolve里返回false和true
            resolve(false);
          } else {
            this.validateStatus = "";
            this.errorMes = "";
            resolve(true);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-item:after {
  content: "";
  display: block;
  clear: both;
}
.form-item {
  position: relative;
  margin-bottom: 26px;
  &.login-item {
    .form-ctt {
      width: 100%;
      text-align: center;
    }
  }
  .form-label {
    float: left;
    width: 20%;
    height: 40px;
    margin-right: 5%;
    line-height: 40px;
    text-align: justify;
    &:after {
      content: "";
      display: inline-block;
      width: 100%;
    }
  }
  .form-ctt {
    position: relative;
    float: left;
    width: 75%;
  }
  .form-err {
    position: absolute;
    top: 100%;
    left: 0;
    margin: 0;
    font-size: 12px;
    line-height: 26px;
    color: #e00000;
  }
}
</style>