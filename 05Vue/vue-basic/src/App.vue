<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="course-demo">
      <h1 class="course-title">
        {{courseTitle}}
        <strong class="course-author" v-if="courseAuthorShow">{{curseAuthor}}</strong>
      </h1>
      <div class="course-add">
        <input class="course-add-input" type="text" v-model="courseName" placeholder="请输入想要添加的课程" />
        <button class="course-add-btn" @click="addCourse">添加</button>
      </div>
      <ul class="course-lists">
        <li class="course-list" v-for="course in courses" :key="course.id">{{course.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      courseTitle: "web全栈",
      curseAuthor: "King",
      courseAuthorShow: false,
      courses: [
        { id: 1, name: "HTML5", price: 1000 },
        { id: 2, name: "CSS3", price: 2000 },
        { id: 3, name: "JavaScript", price: 3000 }
      ],
      courseName: ""
    };
  },
  created() {
    setTimeout(() => {
      this.courseAuthorShow = true;
    }, 2000);
  },
  methods: {
    addCourse() {
      this.courses.push({
        name: this.courseName
      })
      this.courseName = '';
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.course-demo {
  padding: 20px;
  text-align: left;
}
.course-author {
  position: absolute;
  margin-top: 26px;
  margin-left: 10px;
  font-size: 16px;
  font-style: italic;
  font-weight: normal;
  color: #333;
}
.course-add {
  overflow: hidden;
}
.course-add-input {
  float: left;
  box-sizing: border-box;
  width: 200px;
  height: 40px;
  margin-right: 20px;
  padding: 10px;
  border: solid 1px #41b882;
  font-size: 14px;
  outline: none;
}
.course-add-btn {
  width: 80px;
  height: 40px;
  border: 0;
  font-size: 18px;
  color: #fff;
  background: #41b882;
  outline: none;
}
</style>
