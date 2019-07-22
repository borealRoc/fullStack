<template>
  <!-- <input :type="type" :value="inputVal" @input="inputHandler"/> -->
  <input :type="type" :value="inputVal" @blur="blurHandler"/>
  <!-- 这里之所以不用v-model的写法，是因为用了之后也得用@input事件，否则没有办法将value的变化通知到父组件， -->
  <!-- <input :type="type" v-model="inputVal" @input = "inputHandler"/> -->
</template>

<script>
export default {
  name: "MyInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      // 单向数据流原则：组件内不能修改props属性
      inputVal: this.value
    };
  },
  methods: {
    findParent(componentName) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      return parent;
    },
    
    inputHandler(e) {
      this.inputVal = e.target.value;
      // 通知父组件值更新，实现双向数据绑定
      // this.$emit("input", this.inputVal);
      // 通知FormItem做校验
      // 这里之所以要this.$parent.$emit，而不是this.$emit，是因为form-item组件的input位置一开始只是个插槽，没有<my-input>标签，所以没有地方监听事件
      // 当然，也可以这里this.$emit,然后再在form-item组件找到自己的form-input子组件去监听[this.$ref.myInput.on]
      // this.$parent.$emit("inputValidate", this.inputVal);
      // 优化一：当别人使用表单组件的时候，因为无法保证form-input的父组件就是form-item（可能用户在form-item和form-input之间嵌套了一个多余的组件），
      // 所以可以通过向上遍历的方式，直到找到[this.$parent.$options.name]为form-item为止
      // this.findParent('MyFormItem').$emit("inputValidate", this.inputVal);
    },
    // dispatch(componentName, eventName, params) {
    //   var parent = this.$parent || this.$root;
    //   var name = parent.$options.componentName;
    //   while (parent && (!name || name !== componentName)) {
    //     parent = parent.$parent;
    //     if (parent) {
    //       name = parent.$options.componentName;
    //     }
    //   }
    //   if (parent) {
    //     parent.$emit.apply(parent, [eventName].concat(params));
    //   }
    // },
    // broadcast(componentName, eventName, params) {
    //   broadcast.call(this, componentName, eventName, params);
    // }
    blurHandler(e) {
      this.inputVal = e.target.value;
      // this.$emit("blur", this.inputVal);
      this.findParent('MyFormItem').$emit("inputValidate", this.inputVal);
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