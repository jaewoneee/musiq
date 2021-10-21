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
        </li>
      </ul>
      <div class="btn-box">
        <template v-if="offsetValue">
          <button class="prev-p-btn" @click="prevItems">prev</button>
        </template>
        <button class="next-p-btn" @click="nextItems">next</button>
      </div>
    </template>
    <template v-else>
      <div>nothing to show..</div>
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
        <template v-if="toFavorite">
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
        </template>
        <template v-else>
          <button @click="deleteItem(currentItem.id)">
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.28 16.6 12.36 11.45 17.04L10 18.35Z"
                fill="#CEE745"
              />
            </svg>
          </button>
        </template>
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
import { isFavorite, addFavorite, deleteFavorite } from "../api/music";

export default {
  data() {
    return {
      currentItem: {},
      showModal: false,
      toFavorite: true,
    };
  },
  components: {
    Modal,
  },
  methods: {
    // 음악 상세 모달 띄우기
    async showItem(e) {
      const i = e.path[2].childNodes[3].value;
      const uuid = this.$store.state.uuid;
      const info = {
        id: this.$store.state.array[i].id,
        artist: this.$store.state.array[i].artists[0].name,
        title: this.$store.state.array[i].name,
        src: this.$store.state.array[i].album.images[0].url,
        href: this.$store.state.array[i].preview_url,
        url: this.$store.state.array[i].external_urls.spotify,
      };
      const { data } = await isFavorite(info.id, uuid);

      this.currentItem = info;
      this.toFavorite = data;
      this.showModal = !this.showModal;
    },

    // 다음 아이템 페이지
    nextItems() {
      this.$store.dispatch("SEARCH", "increment");
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);
    },

    // 이전 아이템 페이지
    prevItems() {
      this.$store.dispatch("SEARCH", "decrement");
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);
    },

    // 좋아요 리스트에 추가
    async addItem(item) {
      const uuid = this.$store.state.uuid;
      if (uuid !== "") {
        // 로그인 여부 확인
        await addFavorite(item, uuid);
        this.toFavorite = !this.toFavorite;
      } else {
        this.$router.push("/login");
      }
    },

    // 좋아요 리스트에서 제거
    async deleteItem(id) {
      await deleteFavorite(id);
      this.toFavorite = !this.toFavorite;
    },

    // 초기화
    clearItem() {
      this.currentItem = {};
      this.showModal = !this.showModal;
    },
  },
  computed: {
    isMusicSearch() {
      return this.$store.getters.isSearched;
    },
    offsetValue() {
      return this.$store.getters.offsetCheck;
    },
  },
};
</script>

<style scoped>
.btn-box {
  overflow: hidden;
  margin-top: 3vw;
}
button[class*="p-btn"] {
  color: #fff;

  border: 1px solid #fff;
  padding: 10px;
}
button.next-p-btn {
  float: right;
}
</style>
