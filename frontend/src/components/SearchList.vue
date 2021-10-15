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
      <div slot="fav">
        <button @click="addItem(currentItem)">
          <svg
            role="img"
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0ZM10.1 15.55L10 15.65L9.9 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 2.99 9.07 4.36H10.94C11.46 2.99 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55Z"
              fill="#CEE745"
            />
          </svg>
        </button>
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
import { isFavorite, addFavorite } from "../api/music";

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
    async showItem(e) {
      const i = e.path[2].childNodes[3].value;
      const info = {
        id: this.$store.state.array[i].id,
        artist: this.$store.state.array[i].artists[0].name,
        title: this.$store.state.array[i].name,
        src: this.$store.state.array[i].album.images[0].url,
        href: this.$store.state.array[i].preview_url,
      };
      var { data } = await isFavorite(info.id);
      console.log(data);
      this.currentItem = info;
      this.showModal = !this.showModal;
    },
    async addItem(item) {
      var { data } = await addFavorite(item);
      console.log("결과", data);
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
