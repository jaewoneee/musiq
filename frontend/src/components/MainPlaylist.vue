<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <div class="img-box">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
      <swiper-slide>
        <p class="mont bold">Book</p>
        <div class="img-box">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <!-- <ul>
      <li v-for="song in playlist[1]" :key="song.id">
        <p>{{ song.title }}</p>
        <p>{{ song.singer }}</p>
        <img :src="song.img" alt="" />
      </li>
    </ul> -->
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { getPlaylist } from "../api/index";
export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      playlist: "",
      swiperOption: {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          // when window width is >= 320px
          360: {
            slidesPerView: 1,
            spaceBetween: 20,
          },

          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },

  async created() {
    const { data } = await getPlaylist();
    this.playlist = data;
    console.log(data);
  },
};
</script>

<style></style>
