<template>
  <div class="cart-view">
    <!-- 有商品 -->
    <div class="has-goods" v-if="cart.length > 0">
      <cube-scroll
        ref="scroll"
        :data="cartScrollData"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <ul class="goods-lists">
          <li class="goods-list" v-for="item in cart" :key="item.id">
            <img class="goods-pic" :src="item.img" alt />
            <div class="goods-ctt">
              <p class="goods-name">{{item.title}}</p>
              <strong class="goods-price">&yen;{{item.price * item.cartCount}}</strong>
              <div class="goods-ctrl">
                <span class="goods-reduce-btn"></span>
                <span class="goods-num">{{item.cartCount}}</span>
                <span class="goods-add-btn"></span>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <!-- 无商品 -->
    <div class="no-goods" v-else>
      <img class="no-goods-pic" src="/img/cart_big.png" />
      <p class="no-goods-tip">您的购物车还未添加商品</p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      cartScrollData: this.$store.state.cart.slice(0, 4) || [],
      // 滚动组件参数
      pullDownRefresh: false,
      pullDownRefreshThreshold: 60,
      pullDownRefreshStop: 40,
      pullDownRefreshTxt: "Refresh success",
      pullUpLoad: false,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: "Load more",
      pullUpLoadNoMoreTxt: "No more data",
      customPullDown: false
    };
  },
  computed: {
    ...mapState(["cart"]),
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      };
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh
        ? {
            threshold: parseInt(this.pullDownRefreshThreshold),
            // Do not need to set stop value, but you can if you want
            // stop: parseInt(this.pullDownRefreshStop),
            txt: this.pullDownRefreshTxt
          }
        : false;
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad
        ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          }
        : false;
    }
  },
  methods: {
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          //   this.cartScrollData.unshift(_foods[1]);
          console.log(1);
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    },
    onPullingUp() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          //   let newPage = _foods.slice(0, 5);
          //   this.cartScrollData = this.cartScrollData.concat(newPage);
          console.log(1);
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    },
  }
};
</script>

<style lang="scss" scoped>
.cart-view {
  .no-goods {
    .no-goods-pic {
      display: block;
      width: 100px;
      height: 100px;
      padding-top: 50px;
      margin: 0 auto;
    }
    .no-goods-tip {
      font-size: 16px;
      line-height: 50px;
      text-align: center;
      color: rgba(51, 51, 51, 0.66);
    }
  }
  .has-goods {
    .goods-list {
      display: flex;
      box-sizing: border-box;
      padding: 15px;
      display: flex;
      border-bottom: solid 5px #f2f2f2;
      .goods-pic {
        width: 80px;
        height: 80px;
        margin-right: 10px;
      }
      .goods-ctt {
        position: relative;
        flex: 1;
        -webkit-flex: 1;
        .goods-name {
          color: #2b333b;
          line-height: 1.4;
          text-align: justify;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
          word-wrap: break-word;
        }
        .goods-price {
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 20px;
          font-weight: bold;
          color: #ff4e1f;
        }
        .goods-ctrl {
          position: absolute;
          bottom: 0;
          right: 0;
          align-items: center;
          span {
            display: inline-block;
            min-width: 20px;
            height: 20px;
            vertical-align: middle;
            &.goods-reduce-btn {
              background: url("/img/reduce_icon.png") no-repeat center center;
              background-size: 14px;
            }
            &.goods-num {
              margin: 0 5px;
              text-align: center;
              font-size: 16px;
              line-height: 20px;
              color: #2b333b;
            }
            &.goods-add-btn {
              background: url("/img/add_icon.png") no-repeat center center;
              background-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>