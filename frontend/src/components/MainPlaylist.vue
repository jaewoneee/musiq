<template>
  <div class="list-box">
    <h4>Music by Mood</h4>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="chill">
        <p>Chill</p>
        <div class="img-box" @click="showPlaylist(1)">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
      <swiper-slide class="fgood">
        <p>Feeling Good</p>
        <div class="img-box" @click="showPlaylist(2)">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
      <swiper-slide class="groove">
        <p>Groove</p>
        <div class="img-box" @click="showPlaylist(3)">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-func-wrap">
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
    <!-- <ul>
      <li v-for="song in playlist[1]" :key="song.id">
        <p>{{ song.title }}</p>
        <p>{{ song.singer }}</p>
        <img :src="song.img" alt="" />
      </li>
    </ul> -->
    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">
        <span class="fas fa-times closeModalBtn" @click="clearList">X</span>
      </h3>
      <ul slot="body">
        <li v-for="list in this.playlist" v-bind:key="list.title">
          <img :src="list.img" alt="" />
          <p>{{ list.title }}</p>
          <p>{{ list.singer }}</p>
        </li>
      </ul>
    </Modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Modal from "./common/ListModal.vue";
import { getPlaylist } from "../api/index";
export default {
  components: { Swiper, SwiperSlide, Modal },
  data() {
    return {
      playlist: "",
      showModal: false,
      swiperOption: {
        slidesPerView: 1.2,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      },
    };
  },
  methods: {
    async showPlaylist(value) {
      var { data } = await getPlaylist();
      this.playlist = data[value];
      console.log("넹ㅇ");
      this.showModal = !this.showModal;
    },
    clearList() {
      this.playlist = "";
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style></style>
