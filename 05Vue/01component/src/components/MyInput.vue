<template>
    <input :type="type" :value="inputVal" @input = "inputHandler"/>
    <!-- 这里之所以不用v-model的写法，是因为用了之后也得用@input事件，否则没有办法将value的变化通知到父组件， -->
    <!-- <input :type="type" v-model="inputVal" @input = "inputHandler"/> -->
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  data() {
    return {
      // 单向数据流原则：组件内不能修改props属性
      inputVal: this.value
    };
  },
  methods: {
    inputHandler(e) {
      this.inputVal = e.target.value;
      // 通知父组件值更新，实现双向数据绑定
      this.$emit("input", this.inputVal);
      // 通知FormItem做校验
      this.$parent.$emit("validate", this.inputVal);
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