<template>
  <div class="form-item">
    <label for>{{label}}：</label>
    <slot></slot>
    <p v-if="errorStatus">{{errorMes}}</p>
  </div>
</template>

<script>
import schema from "async-validator"
export default {
  inject: ["form"],
  props: {
    label: {
      type: String
    }
  },
  mounted() {
    this.$on("validate", this.validate);
  },
  data() {
    return {
      errorStatus: false,
      errorMes: ""
    };
  },
  methods: {
    validate() {
        console.log(schema)
    }
  }
};
</script>

<style scoped>
.form-item {
  display: flex;
}
label {
  display: inline-block;
  min-width: 90px;
}
</style>