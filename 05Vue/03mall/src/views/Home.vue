<template>
  <div class="home">
    <h1>This is home page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      key: null
    }
  },
  async created() {
    const res = await this.$http.get("/api/goods");
    const { code, list } = res.data;
    if (code === 0) {
      console.log(list);
    }
  }
};
</script>
