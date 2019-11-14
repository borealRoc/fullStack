<template>
  <div>
    <input :type="type" :value="value" @input="inputHandler" @blur="blurHandler" />
  </div>
</template>

<script>
export default {
  name: "EleInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String
    }
  },
  methods: {
    findParent(comName) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      while (parent && (!name || name !== comName)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
      }
      return parent;
    },
    inputHandler(e) {
      let inputVal = e.target.value;
      this.$emit("input", inputVal);
      // this.$parent.$emit("validate", inputVal);
      // 优化一：确保this.$parent是EleFormItem
      this.findParent("EleFormItem").$emit("validate", inputVal);
    },
    // 优化二：blur事件也可以触发校验
    blurHandler(e) {
      let inputVal = e.target.value;
      this.findParent("EleFormItem").$emit("validate", inputVal);
    }
  }
};
</script>

<style scoped>
</style>