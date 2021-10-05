<template>
  <div class="list-box">
    <h4>Music by Mood</h4>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="chill">
        <p>Chill</p>
        <div class="img-box">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
      <swiper-slide class="fgood">
        <p>Feeling Good</p>
        <div class="img-box">
          <!-- <img src="../assets/images/chill.jpg" alt="" /> -->
        </div>
      </swiper-slide>
      <swiper-slide class="groove">
        <p>Groove</p>
        <div class="img-box">
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
  async created() {
    const { data } = await getPlaylist();
    this.playlist = data;
    console.log(data);
  },
};
</script>

<style></style>
