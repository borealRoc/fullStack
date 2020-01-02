<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="TypeScript基本语法" @add-list="onAddFeature" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld, {Feature} from '../components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld
  },
})
export default class App extends Vue {
  onAddFeature(feature:Feature){
    console.log(feature.name);
  }
}
</script>