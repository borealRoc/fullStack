<template>
  <form class="ele-form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "EleForm",
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  }
};
</script>

<style scoped>
.ele-form {
    padding: 10px;
    outline: solid 2px #111;
}
</style>