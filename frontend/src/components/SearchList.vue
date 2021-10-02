<template>
  <div class="search-list-box">
    <ul>
      <li
        v-for="(item, index) in this.$store.state.array"
        :key="item.id"
        @click="showItem($event)"
      >
        <div><img :src="item.album.images[1].url" alt="album_art" /></div>
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
    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">
        {{ currentItem.title }}
        <span class="fas fa-times closeModalBtn" @click="clearItem">X</span>
      </h3>
      <div slot="body">
        <img :src="currentItem.src" alt="" style="width: 100%" />
      </div>
      <div slot="player">
        <video controls="" name="media">
          <source :src="currentItem.href" type="audio/mpeg" />
        </video>
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
      const i = e.path[1].childNodes[3].value;
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
};
</script>

<style></style>
