<template>
  <div>
    <div class="header">
      <x-header title="购物车"></x-header>
    </div>
    <div class="content">
      <div class="cart-view">
        <!-- 有商品 -->
        <div class="has-goods" v-if="cart.length > 0">
          <div class="cube-scroll-ctn">
            <cube-scroll
              ref="scroll"
              :data="cart"
              :options="options"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp"
            >
              <ul class="goods-lists">
                <li class="goods-list" v-for="(item, index) in cart" :key="item.id">
                  <img class="goods-pic" :src="item.img" alt />
                  <div class="goods-ctt">
                    <p class="goods-name">{{item.title}}</p>
                    <strong class="goods-price">&yen;{{item.price * item.cartCount}}</strong>
                    <div class="goods-ctrl">
                      <span class="goods-reduce-btn" @click="cartCountReduce(index)"></span>
                      <span class="goods-num">{{item.cartCount}}</span>
                      <span class="goods-add-btn" @click="cartCountAdd(index)"></span>
                    </div>
                  </div>
                </li>
              </ul>
            </cube-scroll>
          </div>

          <div class="goods-total">
            <p class="total-sel"></p>
            <p class="toal-sum">
              总计：
              <strong class="total-sum-account">&yen;{{sumTotal}}</strong>
            </p>
            <p class="total-clear" @click="goToClear">去结算({{cartTotal}}件)</p>
          </div>
        </div>
        <!-- 无商品 -->
        <div class="no-goods" v-else>
          <img class="no-goods-pic" src="/img/cart_big.png" />
          <p class="no-goods-tip">您的购物车还未添加商品</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      // 滚动组件相关参数
      pullDownRefresh: true, //是否开启了下拉刷新功能
      pullDownRefreshThreshold: 50,  //顶部下拉的距离触发刷新
      pullDownRefreshStop: 50,  //回弹停留的距离
      pullDownRefreshTxt: "Refresh success", //下拉刷新成功提示文字

      pullUpLoad: true, //是否开启了上拉加载更多功能
      pullUpLoadThreshold: 50,  //底部上拉的距离触发加载
      pullUpLoadMoreTxt: "Load more", //上拉加载刚开始时的提示文字
      pullUpLoadNoMoreTxt: "No more data", //上拉加载没有更多数据时的提示文字

      goods: this.$store.state.cart
    };
  },
  computed: {
    // ...mapState(["cart"]),
    ...mapGetters(["cartTotal", "sumTotal"]),

    cart: {
    //   return this.goods.slice(0, 5);
        get() {
            return this.goods.slice(0, 5);
        },
        set(newValue) {
            return newValue
        }
    },

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
    ...mapMutations(["addCartCount", "reduceCartCount"]),
    cartCountReduce(index) {
      this.reduceCartCount(index);
    },
    cartCountAdd(index) {
      this.addCartCount(index);
    },
    goToClear() {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-smile",
        title: "商品结算",
        content: `商品总计为${this.sumTotal}元，你有钱还吗？`,
        confirmBtn: {
          text: "有",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "没有",
          active: false,
          disabled: false,
          href: "javascript:;"
        }
      }).show();
    },
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.cart = this.cart.reverse();
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    },
    onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (this.goods.length > 5) {
          let newPage = this.goods.slice(5, -1);
          this.cart = this.cart.concat(newPage);
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-view {
  height: 100%;
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
    position: relative;
    height: 100%;
    .cube-scroll-ctn {
      height: calc(100% - 50px);
      //   overflow: auto;
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
    .goods-total {
      position: absolute;
      bottom: 0;
      box-sizing: border-box;
      width: 100%;
      height: 51px;
      border-top: solid 1px #f2f2f2;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      .total-sel {
        float: left;
        width: 60px;
      }
      .toal-sum {
        flex: 1;
        -webkit-flex: 1;
        text-align: right;
        font-size: 14px;
        font-weight: bold;
        .total-sum-account {
          color: #ff4e1f;
          font-weight: bold;
        }
      }
      .total-clear {
        float: right;
        width: 110px;
        height: 50px;
        line-height: 50px;
        margin-left: 10px;
        font-size: 16px;
        text-align: center;
        font-weight: 700;
        background: #ff4e1f;
        color: #fff;
      }
    }
  }
}
</style>