<template>
  <div class="list-box">
    <h4>Music by Mood</h4>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="chill">
        <p>Chill</p>
        <div class="img-box" @click="showPlaylist(1, 'Chill')">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
      <swiper-slide class="fgood">
        <p>Feeling Good</p>
        <div class="img-box" @click="showPlaylist(2, 'Feeling Good')">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
      <swiper-slide class="groove">
        <p>Groove</p>
        <div class="img-box" @click="showPlaylist(3, 'Groove')">
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
      <div slot="header">
        <button class="fas fa-times close-btn" @click="clearList"></button>
      </div>
      <div slot="body">
        <h2 class="title">{{ title }}</h2>
        <ul>
          <li v-for="list in this.playlist" v-bind:key="list.title">
            <div class="thumb">
              <img :src="list.img" alt="" />
            </div>
            <a :href="list.url" target="_blank">{{ list.title }}</a>
            <p>{{ list.artist }}</p>
          </li>
        </ul>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Modal from "./common/ListModal.vue";
import { getPlaylist } from "../api/music";
export default {
  components: { Swiper, SwiperSlide, Modal },
  data() {
    return {
      playlist: "",
      title: "",
      showModal: false,
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
        },
        breakpoints: {
          360: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 1.5,
          },
          1024: {
            slidesPerView: 2.2,
          },
          1400: {
            slidesPerView: 3,
          },
          2000: {
            slidesPerView: 3.5,
          },
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      },
    };
  },
  methods: {
    async showPlaylist(value, title) {
      var { data } = await getPlaylist();
      this.playlist = data[value];
      this.title = title;
      this.showModal = !this.showModal;
    },
    clearList() {
      this.playlist = "";
      this.title = "";
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style></style>
