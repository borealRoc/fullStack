<template>
    <div>
    <span>{{ message }}</span>
    <button @click="changeMsg">点击</button>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        message: 'vue-text'
      }
    },
    created () {
      this.message = '一开始的message'
    },
    methods:{
        changeMsg(){
            this.message = '改变后的message'
        }
    }
  }
</script>