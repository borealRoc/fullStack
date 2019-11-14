<template>
  <div class="form-item">
    <label for>{{label}}：</label>
    <slot></slot>
    <p v-if="errorStatus" class="error-tip">{{errorMes}}</p>
  </div>
</template>

<script>
import schema from "async-validator";
export default {
  name: "EleFormItem",
  inject: ["form"],
  props: {
    label: {
      type: String
    },
    prop: {
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
      const rule = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const descriptor = { [this.prop]: rule };
      const validator = new schema(descriptor);
      validator.validate({ [this.prop]: value }, (errors, fields) => {
        if (errors) {
          this.errorStatus = true;
          this.errorMes = errors[0].message;
        } else {
          this.errorStatus = false;
          this.errorMes = "";
        }
      });
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
.error-tip {
  margin: 0 10px;
  color: #e00000;
  font-size: 12px;
  align-self: center;
}
</style>