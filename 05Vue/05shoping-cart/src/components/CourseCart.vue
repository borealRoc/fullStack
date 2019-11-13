<template>
  <div>
    <h2>购物车</h2>
    <table v-if="carts.length > 0">
      <thead>
        <tr>
          <th>勾选</th>
          <th>课程名称</th>
          <th>课程价格</th>
          <th>数量</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, index) in carts" :key="cart.id" :class="{active: cart.isActive}">
          <td>
            <input type="checkbox" v-model="cart.isActive" />
          </td>
          <td>{{cart.name}}</td>
          <td>{{cart.price}}</td>
          <td>
              <button @click="minus(index)">-</button>
              {{cart.count}}
              <button @click="add(index)">+</button>
            </td>
          <td>{{cart.price * cart.count}}</td>
        </tr>
        <tr>
            <td>总计</td>
            <td colspan="2">{{totalCount}}/{{cartsLength}}</td>
            <td colspan="2">{{totalPrice}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CourseCart",
  props: ["carts"],
  methods: {
      minus(index) {
          const count = this.carts[index].count
          if (count < 1) {
              if (window.confirm('确定要从购物车移除该项吗')) {
                  this.$emit('removeCourseByChild', index)
              }
          } else {
              this.carts[index].count -= 1
          }
      },
      add(index) {
          this.carts[index].count += 1
      }
  },
  computed: {
      cartsLength() {
          return this.carts.length
      },
      totalCount() {
          return this.carts.filter(item => item.isActive === true).length 
      },
      totalPrice() {
          let total = 0
          this.carts.forEach(item => {
              if (item.isActive) {
                  total += item.price * item.count
              }
          })
          return total
      }
  },
};
</script>

<style scoped>
.active {
  color: #e00000;
}
</style>
