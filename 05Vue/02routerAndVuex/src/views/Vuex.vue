<template>
  <div>
    <div>
      <h3>2.1 state</h3>
      <p>在Vue组件中获得Vuex状态</p>
      <ol>
        <li>直接获取：{{$store.state.count}}</li>
        <li>在计算属性中返回: {{computedCount}}</li>
        <li>mapState辅助函数获取: {{num}}</li>
      </ol>
    </div>
    <div>
      <h3>2.2 getter</h3>
      <p>store的计算属性</p>
      <ol>
        <li>通过属性访问: {{$store.getters.doneTodos}}</li>
        <li>mapGetters辅助函数获取:{{doneTodos}}</li>
      </ol>
    </div>
    <div>
      <h3>2.3 mutation</h3>
      <p>在组件中更改Vuex的store的状态</p>
      <p>count的值:{{count}}</p>
      <p>num的值：{{num}}</p>
      <ol>
        <li>
          调用 store.commit 方法增加count的值：
          <button @click="increaseCount(1)">increaseCount</button>
        </li>
        <li>
          mapMutations辅助函数增加num的值：
          <button @click="increaseNum(1)">increaseNum</button>
        </li>
      </ol>
      <h3>2.4 actions</h3>
      <p>更改store的状态的第二种方式</p>
      <p>count的值:{{count}}</p>
      <p>num的值：{{num}}</p>
      <ol>
        <li>
          调用 store.dispatch 方法增加count的值：
          <button @click="increaseCountDispatch(1)">increaseCountDispatch</button>
        </li>
        <li>
          mapActions辅助函数1秒后增加num的值：
          <button @click="increaseNumAsync(1)">increaseNumAsync</button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Vuexsyntax",
  computed: {
    computedCount() {
      return this.$store.state.count;
    },
    ...mapState(["count", "num"]),
    ...mapGetters(["doneTodos"])
  },
  methods: {
    ...mapMutations(["addNum"]),
    ...mapActions(["addNumAsync"]),
    increaseCount(n) {
      this.$store.commit("addCount", n);
    },
    increaseNum(n) {
      this.addNum(n);
    },
    increaseCountDispatch(n) {
        this.$store.dispatch('addCountAction',n);
    },
    increaseNumAsync(n) {
        this.addNumAsync(n);
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  line-height: 1.5;
}
</style>