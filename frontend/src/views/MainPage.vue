<template>
  <div>
    <div>
      <input
        type="text"
        v-model="keyword"
        placeholder="singer, song title"
        @keyup.enter="submitKey"
      />
      <ul>
        <li v-for="item in array" :key="item._id">
          <a :href="item.url" target="_blank">{{ item.album.name }}</a>
        </li>
      </ul>
      <p>{{ thing }}</p>
      <button type="button" @click="submitKey">find</button>
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
