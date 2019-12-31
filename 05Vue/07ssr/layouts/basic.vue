<template>
  <div class="basic">
    <div class="logo" @click="$router.push('/')">
      <logo />
    </div>
    <nuxt />
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>
<style>
.basic {
  padding: 20px;
  cursor: pointer;
}
.basic h2,
.basic .logo {
  text-align: center;
}
h3 a {
    margin: 10px 0;
    color: #111;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
}
</style>
