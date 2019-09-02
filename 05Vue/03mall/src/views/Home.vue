<template>
  <div class="home">
    <div class="header">
      <!-- <div class="home-header">
        <h1 class="home-logo">XUSHAO</h1>
        <div class="show-course-btn">
          <cube-button @click="showCourseDrawer" icon="cubeic-back"></cube-button>
        </div>
      </div>-->
      <x-header title="首页" class="home-header">
        <cube-button @click="showCourseDrawer" icon="cubeic-more"></cube-button>
      </x-header>
    </div>
    <!-- 过程过滤显示组件 -->
    <cube-drawer ref="courseDrawer" title="请选择" :data="[courseData]" @select="selectHandler"></cube-drawer>
    <div class="content">
      <!-- 录播图 -->
      <cube-slide :data="slider">
        <cube-slide-item v-for="(item, index) in slider" :key="item.id">
          <router-link :to="`/detail/${item.id}`">
            <img :src="item.img" @click.stop.prevent="imagePreview(index)" />
          </router-link>
        </cube-slide-item>
      </cube-slide>
      <!-- 课程列表组件 -->
      <course-list :courseLists="filterCourseLists"></course-list>
      <div class="notice-test" @click="noticeTest">NoticeTest</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import courseList from "@/components/CourseList";
const label = {
  fe: "前端开发",
  python: "PYTHON",
  java: "JAVA",
  bigdata: "大数据",
  ai: "人工智能"
};

export default {
  name: "home",
  data() {
    return {
      slider: [], // 轮播图
      sliderImgs: [], // 录播图图片合集
      courseLists: [], //课程列表
      keys: [], //课程标签
      filterKeys: [] //过滤课程标签
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
      this.sliderImgs = slider.map(item => item.img);
      this.courseLists = courseLists;
      this.keys = keys;
      this.filterKeys = [...this.keys]; //默认显示全部课程
    }
  },
  computed: {
    filterCourseLists() {
      let ret = [];
      this.filterKeys.forEach(key => {
        ret.push(this.courseLists[key]);
      });
      return ret;
    },
    courseData() {
      return this.keys
        .map(key => {
          return {
            value: key,
            text: label[key]
          };
        })
        .concat([
          { value: ["fe", "python", "java", "bigdata", "ai"], text: "全部" }
        ]);
    }
  },
  methods: {
    showCourseDrawer() {
      this.$refs.courseDrawer.show();
    },
    selectHandler(val) {
      if (typeof val[0] === "string") {
        this.filterKeys = [...val];
      } else {
        // this.filterKeys = [...val[0]];
        console.log("展示全部商品列表，这个功能总是有bug");
      }
    },
    imagePreview(index) {
      this.initialIndex = index;
      const params = {
        $props: {
          imgs: this.sliderImgs,
          initialIndex: "initialIndex", // 响应式数据的key名
          loop: true
        },
        $events: {
          change: i => {
            // 必须更新 initialIndex
            this.initialIndex = i;
          }
        }
      };
      this.$createImagePreview({ ...params }).show();
    },
    noticeTest() {
      // 创建Notice实例
      // cube-ui方式
      // const notice = this.$createNotice();
      // notice.add({ content: "啊...我被打开了", duration: 2 });
      // 原生方式
      this.$notice.remind({
        content: "我被打开了",
        duration: 2
      });
    }
  }
};
</script>

<style lang="scss">
.home-header {
  //   position: fixed;
  //   top: 0;
  //   width: 100%;
  //   height: 50px;
  //   background-color: #ff4e1f;
  //   z-index: 2;
  //   .home-logo {
  //     float: left;
  //     text-indent: 40px;
  //     font-size: 24px;
  //     font-family: monospace;
  //     line-height: 50px;
  //     color: #fff;
  //     background: url("/img/logo.png") no-repeat 10px center;
  //     background-size: 20px;
  //   }
  //   .show-course-btn {
  //     position: absolute;
  //     right: 0;
  //     width: 50px;
  //     .cube-btn {
  //       background: none;
  //     }
  //   }
  .cube-btn {
    padding: 14px 0;
    text-align: right;
    color: #a3a3a6;
    background: #fff;
    > i {
      margin-right: 0;
      font-size: 20px;
    }
  }
}

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
.cube-image-preview {
  .cube-popup-mask {
    opacity: 1;
  }
  .cube-slide {
    height: 100%;
    .cube-slide-group {
      height: 100%;
      .cube-slide-item {
        height: 100%;
      }
    }
  }
}
.content {
  .notice-test {
    position: fixed;
    top: 0;
    left: 50px;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #eaeaea;
    z-index: 1000;
  }
}
</style>
