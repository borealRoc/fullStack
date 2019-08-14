<template>
  <div class="home">
    <cube-slide :data="items">
      <cube-slide-item v-for="item in items" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" />
        </router-link>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      items: []
    };
  },
  async created() {
    const res = await this.$http.get("/api/goods");
    const { code } = res.data;
    if (code === 0) {
      const { slider, data, keys } = res.data;
      this.items = slider;
    }
  }
};
</script>

<style lang="scss">
.cube-slide {
  height: auto;
  .cube-slide-group {
    height: auto;
    .cube-slide-item {
      height: 200px;
      a > img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
