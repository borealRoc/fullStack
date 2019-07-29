<template>
  <div class="home">
    <h4>This is home page</h4>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>
