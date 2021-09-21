<template>
  <div id="app">
    <app-header></app-header>
    <div class="content-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import AppHeader from "./components/common/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<style>
@import url("./css/reset.css");
@import url("./css/style.css");
</style>
