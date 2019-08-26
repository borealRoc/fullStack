<template>
  <div class="header-com">
    <h1>{{title}}</h1>
    <i class="cubeic-back" @click="back" v-if="$routerHistory.canBack()"></i>
    <div class="extend">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    methods: {
        back() {
            this.$router.goBack();
        }
    },
};
</script>

<style lang="scss" scoped>
.header-com {
  position: relative;
  height: 100%;
  line-height: 50px;
  text-align: center;
  border-bottom: solid 1px #e5e5e5;
  .cubeic-back {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 15px;
    color: #a3a3a3;
    > i {
        font-size: 20px;
    }
  }
  .extend {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    color: #fc915b;
  }
}
</style>