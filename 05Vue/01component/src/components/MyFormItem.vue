<template>
  <div class="form-item">
    <label class="form-label" v-if="label">{{label}}</label>
    <div class="form-ctt">
      <slot></slot>
      <!-- 校验错误信息 -->
      <p class="form-err" v-if="errorStatus === 'error'">{{errorMes}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label"],
  data() {
    return {
      errorStatus: "",
      errorMes: ""
    };
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
  .form-label {
    float: left;
    width: 20%;
    height: 40px;;
    margin-right: 5%;
    line-height: 40px;
    text-align: justify;
    &:after {
        content: '';
        display: inline-block;
        width: 100%;
    }
  }
  .form-ctt {
    float: left;
    width: 75%;
  }
  .form-err {
      position: absolute;
      left: 20%;
      bottom: 0;
      font-size: 12px;
      line-height: 26px;
      color: #e00000;
  }
}
</style>