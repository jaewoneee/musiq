<template>
  <div class="content main">
    <div class="text-wrap">
      <p class="text-name-box">
        Hello,
        <template v-if="$store.state.user">
          <span>{{ $store.state.user }}</span></template
        >
        <template v-else><span>Stranger</span></template
        >.
      </p>
      <div class="text-quote-box">
        <p>“Music is the shorthand of emotion.”</p>
        <p>– Leo Tolstoy</p>
      </div>
    </div>
    <div>
      <main-playlist></main-playlist>
    </div>
  </div>
</template>

<script>
import MainPlaylist from "../components/MainPlaylist.vue";

export default {
  components: {
    MainPlaylist,
  },
};
</script>

<style></style>
