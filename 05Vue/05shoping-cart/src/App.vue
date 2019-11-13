<template>
  <div id="app">
    <h1>购物车案例</h1>
    <hr />
    <div>
      <h2>新增课程</h2>
      <div>
        <label for>课程名称：</label>
        <input type="text" v-model="courseItem.name" />
      </div>
      <div>
        <label for>课程价格：</label>
        <input type="text" v-model="courseItem.price" />
      </div>
      <button @click="addToCourses">添加到课程列表</button>
    </div>
    <hr />
    <div>
      <h2>课程列表</h2>
      <table>
        <thead>
          <tr>
            <th>课程名称</th>
            <th>课程价格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in courses" :key="course.id">
            <td>{{course.name}}</td>
            <td>{{course.price}}</td>
            <td>
              <button @click="addToCart(index)">添加到购物车</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
    <div>
      <course-cart :carts="courseToCarts" @removeCourseByChild="removeCourseByParent"/>
    </div>
  </div>
</template>

<script>
import CourseCart from "./components/CourseCart.vue";

export default {
  name: "app",
  components: {
    CourseCart
  },
  data() {
    return {
      courseItem: {
        name: "",
        price: null
      },
      courses: [
        {
          id: 0,
          name: "web全栈开发架构师",
          price: 9998
        },
        {
          id: 1,
          name: "Python人工智能",
          price: 8888
        }
      ],
      courseToCarts: []
    };
  },
  methods: {
    addToCourses() {
      this.courses.push({
          ...this.courseItem,
          id: this.courses[this.courses.length -1].id + 1
      })
      this.courseItem.name = ''
      this.courseItem.price = ''
    },
    addToCart(index) {
      const addedCart = this.courseToCarts.find(
        item => item.id === this.courses[index].id
      );
      if (addedCart) {
          addedCart.count += 1
      } else {
        this.courseToCarts.push({
          ...this.courses[index],
          count: 1,
          isActive: false
        });
      }
    },
    removeCourseByParent(index) {
        this.courseToCarts.splice(index, 1)
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
</style>
