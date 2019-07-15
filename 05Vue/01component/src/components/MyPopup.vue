<template>
  <div>
    <div class="my-popup" v-if="ifPopupShow">
      <div class="bg-gray" @click="closePopup"></div>
      <div class="popup-ctn">
        <header>
          <slot name="header"></slot>
        </header>
        <section class="content">
          <slot name="content"></slot>
        </section>
        <footer>
          <button @click="closePopup">取消</button>
          <button @click="closePopup">确定</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ifPopupShow: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    closePopup() {
      this.$emit('pupupHideEmitByChild', false);
    }
  },
};
</script>

<style lang="scss" scoped>
.my-popup {
  .bg-gray {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 2;
  }
  .popup-ctn {
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    width: 500px;
    height: 300px;
    margin-left: -250px;
    margin-top: -150px;
    font-size: 16x;
    text-align: center;
    border-radius: 8px;
    background-color: #fff;
    z-index: 3;
    header {
      font-size: 24px;
      line-height: 80px;
      border-bottom: solid 1px #f2f2f2;
      h5 {
        margin: 0;
      }
    }
    .content {
      height: 170px;
      padding: 20px;
      font-size: 40px;
      line-height: 170px;
      border-bottom: solid 1px #f2f2f2;
      p {
        margin: 0;
      }
    }
    footer:after {
      content: "";
      display: block;
      clear: both;
    }
    footer button {
      float: left;
      width: 50%;
      padding: 0;
      line-height: 50px;
      font-size: 14px;
      outline: none;
      border: 0;
      &:first-child {
        border-right: solid 1px #f2f2f2;
        border-bottom-left-radius: 8px;
      }
      &:last-child {
        border-bottom-right-radius: 8px;
      }
    }
  }
}
</style>