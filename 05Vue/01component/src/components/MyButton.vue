<template>
  <div>
    <button @click="sendMoney">我是一个子组件，点我可以给父亲发1000块钱</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendMoney() {
      this.$emit("tradeMoney", { num: 1000 });
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 0 5px;
  height: 30px;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  background-color: #41b882;
  border: 0;
  outline: 0;
}
</style>