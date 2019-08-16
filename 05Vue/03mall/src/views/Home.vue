<template>
  <div class="home">
    <cube-slide :data="slider">
      <cube-slide-item v-for="item in slider" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" />
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <course-list :courseLists="courseLists"></course-list>
  </div>
</template>

<script>
// @ is an alias to /src
import courseList from "@/components/CourseList";

export default {
  name: "home",
  data() {
    return {
      slider: [],
      keys: [],
      courseLists: []
    };
  },
  components: {
    courseList
  },
  async created() {
    const res = await this.$http.get("/api/goods");
    const { code } = res.data;
    if (code === 0) {
      const { slider, data: courseLists, keys } = res.data;
      this.slider = slider;
      this.courseLists = courseLists;
      this.keys = keys;
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
  .cube-slide-dots {
    bottom: 8px;
  }
}
</style>
