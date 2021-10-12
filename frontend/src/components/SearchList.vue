<template>
  <div class="search-list-box">
    <template v-if="isMusicSearch">
      <ul>
        <li
          v-for="(item, index) in this.$store.state.array"
          :key="item.id"
          @click="showItem($event)"
        >
          <div class="album-box">
            <img :src="item.album.images[1].url" alt="album_art" />
          </div>
          <p class="title">{{ item.name }}</p>
          <p class="artist">{{ item.artists[0].name }}</p>
          <input type="hidden" :value="index" id="index" />
          <!-- <template v-if="item.preview_url">
          <video controls="" name="media">
            <source :src="item.preview_url" type="audio/mpeg" />
          </video>
        </template> -->
        </li>
      </ul>
    </template>
    <template v-else>
      <ul>
        <li>nothing to show</li>
      </ul>
    </template>
    <Modal v-if="showModal" @close="showModal = false">
      <div slot="header">
        <button
          type="button"
          class="fas fa-times close-btn"
          @click="clearItem"
        ></button>
      </div>
      <div slot="body">
        <img :src="currentItem.src" alt="" style="width: 100%" />
        <div class="info-box">
          <p>{{ currentItem.title }}</p>
          <p>{{ currentItem.artist }}</p>
        </div>
      </div>
      <div slot="player">
        <template v-if="currentItem.href">
          <video controls="" name="media">
            <source :src="currentItem.href" type="audio/mpeg" />
          </video>
        </template>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./common/ItemModal.vue";
export default {
  data() {
    return {
      currentItem: {},
      showModal: false,
    };
  },
  components: {
    Modal,
  },
  methods: {
    showItem(e) {
      const i = e.path[2].childNodes[3].value;
      console.log(e, i);
      const info = {
        artist: this.$store.state.array[i].artists[0].name,
        title: this.$store.state.array[i].name,
        src: this.$store.state.array[i].album.images[0].url,
        href: this.$store.state.array[i].preview_url,
      };
      this.currentItem = info;
      this.showModal = !this.showModal;
    },
    clearItem() {
      this.currentItem = {};
      this.showModal = !this.showModal;
    },
  },
  computed: {
    isMusicSearch() {
      return this.$store.getters.isSearched;
    },
  },
};
</script>

<style></style>
