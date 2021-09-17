<template>
  <div>
    <div>
      <input type="text" v-model="keyword" placeholder="singer, song title" />
      <button type="button" @click="submitKey">find</button>
    </div>
    <div>{{ result }}</div>
  </div>
</template>

<script>
import { getMusicList } from "../api/index";
export default {
  data() {
    return {
      keyword: "",
      result: "",
      array: [],
    };
  },
  methods: {
    async submitKey() {
      try {
        await getMusicList(this.keyword);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
