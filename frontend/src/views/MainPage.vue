<template>
  <div>
    <div>
      <input
        type="text"
        v-model="keyword"
        placeholder="singer, song title"
        @keyup.enter="submitKey"
      />
      <button type="button" @click="submitKey">find</button>
      <ul>
        <li v-for="item in array" :key="item.id">
          <img :src="item.album.images[1].url" alt="" />
          <p>{{ item.name }}</p>
          <p>{{ item.artists[0].name }}</p>
          <template v-if="item.preview_url">
            <video controls="" name="media">
              <source :src="item.preview_url" type="audio/mpeg" />
            </video>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "../api/index";
export default {
  data() {
    return {
      keyword: "",
      array: {},
    };
  },
  methods: {
    async submitKey() {
      try {
        const { data } = await getMusicList(this.keyword);
        this.array = data.tracks.items;
        console.log(data.tracks.items);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
