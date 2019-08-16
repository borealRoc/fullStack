<template>
  <div class="course-list-com">
    <cube-scroll-nav>
      <cube-scroll-nav-panel
        v-for="courseList in courseLists"
        :key="courseList.name"
        :label="courseList.name"
        :title="courseList.cName"
      >
        <ul>
          <li v-for="courseItem in courseList.course" :key="courseItem.id">
            <div class="course-ctn">
              <img :src="courseItem.img" />
              <div class="course-ctt">
                <p class="course-title">{{courseItem.title}}</p>
                <p class="course-count">学习人数：{{courseItem.count}}人</p>
              </div>
              <span class="course-price">&yen;{{courseItem.price}}</span>
            </div>
          </li>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  props: ["courseLists"],
  filters: {
    uppercase: function (val) {
      return val.toUpperCase()
    }
  }
};
</script>

<style lang="scss" scoped>
.course-list-com {
  position: absolute;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .cube-scroll-nav-bar_horizontal {
    border-bottom: 1px solid #f4f4f4;
  }
  .cube-scroll-nav-panel {
    ul {
      margin: 0 20px;
      overflow: hidden;
      font-size: 14px;
      line-height: 1.4;
      color: #666;
      li {
        margin: 15px 0;
        .course-ctn {
            position: relative;
            overflow: hidden;
        }
        div {
          img {
            float: left;
            width: 90px;
            height: 60px;
            border-radius: 6px;
          }
          .course-ctt {
            float: left;
            box-sizing: border-box;
            width: 160px;
            padding-left: 10px;
            text-align: left;
            .course-title {
              color: #2B333B;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-break: break-all;
              word-wrap: break-word;
            }
            .course-count {
              padding-top: 6px;
              font-size: 12px;
              color: #71777D;
            }
          }
          .course-price {
            position: absolute;
            top: 50%;
            right: 0;
            width: 72px;
            height: 32px;
            margin-top: -16px;
            line-height: 32px;
            text-align: center;
            color: #71777d;
            border-radius: 16px;
            background: rgba(43, 51, 59, 0.06);
          }
        }
      }
    }
  }
}
</style>