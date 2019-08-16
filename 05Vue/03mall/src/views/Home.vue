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
.course-list-com {
  .cube-scroll-nav-bar-item {
    span {
      font-size: 16px;
    }
  }
  .cube-scroll-nav-bar_horizontal {
    border-bottom: 1px solid #f4f4f4;
  }
  .cube-sticky-ele {
    min-height: 56px;
  }
  .cube-scroll-nav-panel {
    margin-bottom: 20px;
    background-repeat: no-repeat;
    background-position: 10px 10px;
    background-size: 100px;
    .cube-scroll-nav-panel-title {
      padding: 10px 0;
      font-size: 18px;
      font-weight: bold;
      line-height: normal;
      text-align: center;
    }
    &:nth-child(1) {
      background-image: url("/img/c_bar_1.png");
    }
    &:nth-child(2) {
      background-image: url("/img/c_bar_2.png");
    }
    &:nth-child(3) {
      background-image: url("/img/c_bar_3.png");
    }
    &:nth-child(4) {
      background-image: url("/img/c_bar_4.png");
    }
    &:nth-child(5) {
      background-image: url("/img/c_bar_5.png");
    }
  }
}
</style>
