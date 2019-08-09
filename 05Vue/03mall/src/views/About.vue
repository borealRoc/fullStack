<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
  export default {
    async created() {
      const res = await this.$http.get("/api/goods");
      const {code, list} = res.data;
      if (code === 0) {
        console.log(list);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>