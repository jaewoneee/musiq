<template>
  <div>
    <ul class="playlist-box">
      <li>
        <p class="title">Chill</p>
        <div class="img-box">
          <img src="../assets/images/chill.jpg" alt="" />
        </div>
      </li>
    </ul>
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
import { getPlaylist } from "../api/index";
export default {
  data() {
    return {
      playlist: "",
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
