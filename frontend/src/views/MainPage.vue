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
            <p>
              “Some people have lives;
              <br />
              some people have music.”
            </p>
            <p>– Leo Tolstoy</p>
          </li>
          <li>
            <p>
              “Music – what a powerful instrument,
              <br />
              what a mighty weapon!”
            </p>
            <p>- Maria von Trapp</p>
          </li>
          <li>
            <p>
              “Without music,<br />
              life would be a blank to me.”
            </p>
            <p>- Edith Sitwell</p>
          </li>
          <li>
            <p>
              “Music should be an essential part
              <br />
              of every analysis.”
            </p>
            <p>- Carl Jung</p>
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
