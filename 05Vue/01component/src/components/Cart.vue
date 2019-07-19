<template>
  <div>
    <table border="1">
      <caption>{{title}}</caption>
      <thead>
        <tr>
          <th>
            <span @click="selAll" class="sel-btn">全选</span>/
            <span @click="selReverse" class="sel-btn">反选</span>
          </th>
          <th>课程名</th>
          <th>单价</th>
          <th>数量</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="item.id" :class="{'active': item.active}">
          <td>
            <input type="checkbox" v-model="item.active" />
          </td>
          <td>{{item.name}}</td>
          <td>&yen;{{item.price}}</td>
          <td>
            <button @click="minusCount(i)">-</button>
            <span class="item-count">{{item.count}}</span>
            <button @click="addCount(i)">+</button>
          </td>
          <td>&yen;{{item.price * item.count}}</td>
        </tr>
        <tr>
          <td>总计</td>
          <td colspan="2">选中商品数量：{{activeCount}}/{{totalCount}}</td>
          <td colspan="2">选中商品价格：&yen;{{activeAccount}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Cart",
  //   props: ["title", "items"],
  // 因为下面接收了addGood事件，所以不需要引用父组件的items属性了，直接把items属性设为自己的属性
  props: ["title"],
  data() {
    return {
      // 从本地存储提取购物车列表数据
      items: JSON.parse(localStorage.getItem('items')) || [],
    };
  },
  watch: {
    items: {
      handler(n, o) {
        // 使用本地存储实现数据持久化
        localStorage.setItem('items', JSON.stringify(n));
      },
      deep: true 
    }
  },
  created() {
    //   接收父组件派发出来的事件
    this.$bus.$on("addGood", good => {
      // 得到已经添加到购物车的商品
      const cartItem = this.items.find(item => item.id === good.id);
      if (cartItem) {
        // 购物车已有该商品
        cartItem.count += 1;
      } else {
        // 该商品首次被添加进购物车
        this.items.push({
          ...good,
          count: 1,
          active: false
        });
      }
    });
  },
  methods: {
    addCount(i) {
      this.items[i].count += 1;
    },
    minusCount(i) {
      const count = this.items[i].count;
      if (count > 0) {
        this.items[i].count -= 1;
      } else {
        this.remove(i);
      }
    },
    remove(i) {
      if (window.confirm("确定从购物车删除此商品吗?")) {
        this.items.splice(i, 1);
      }
    },
    selAll() {
      this.items.forEach(item => (item.active = true));
    },
    selReverse() {
      this.items.forEach(item => (item.active = !item.active));
    }
  },
  computed: {
    activeCount() {
      return this.items.filter(item => item.active).length;
    },
    totalCount() {
      return this.items.length;
    },
    activeAccount() {
      let num = 0;
      this.items.forEach(item => {
        if (item.active) {
          num += item.price * item.count;
        }
      });
      return num;
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
}
caption {
  font-size: 16x;
  font-weight: bold;
  line-height: 40px;
  color: #e00000;
}
tr.active {
  color: #41b882;
}
.item-count {
  display: inline-block;
  width: 20px;
  text-align: center;
}
.sel-btn {
  cursor: pointer;
}
</style>