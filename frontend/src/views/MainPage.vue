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
        <ul class="flip">
          <li>
            <p>“Music gives color to the air of the moment.”</p>
            <p>– Karl Lagerfeld</p>
          </li>
          <li>
            <p>“Music is the universal language of mankind.”</p>
            <p>- Henry Wadsworth Longfellow</p>
          </li>
          <li>
            <p>“Without music, life would be a blank to me.”</p>
            <p>- Edith Sitwell</p>
          </li>
          <li>
            <p>“Music is like a dream. One that I cannot hear. ”</p>
            <p>- Ludwig van Beethoven</p>
          </li>
        </ul>
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
