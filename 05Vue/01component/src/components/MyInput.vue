<template>
    <!-- <input :type="typeFromFather" :value="inputVal" :placeholder="placeholder" @input="inputHandler" /> -->
    <input :value="inputVal" @input="inputHandler" />
</template>

<script>
export default {
  props: {
    // fatherVal: {
    //   type: String,
    //   default: ""
    // }
    // typeFromFather: {
    //     type: String,
    //     default: 'text',
    // },
    // placeholder: {
    //     type: String,
    //     default: '',
    // }
  },
  data() {
    return {
      // 单向数据流原则：组件内不能修改props属性
    //   inputVal: this.fatherVal
      inputVal: '',
    };
  },
  methods: {
    inputHandler(e) {
      this.inputVal = e.target.value;
      // 通知父组件值更新，实现双向数据绑定
      this.$emit("input", this.inputVal);
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  width: 90%;
  height: 20px;
  padding: 9px 10px;
  font-size: 16px;
  line-height: 20px;
  outline: 0;
  border: solid 1px #ccc;
}
</style>