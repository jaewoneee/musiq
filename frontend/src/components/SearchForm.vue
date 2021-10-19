<template>
  <div class="search-box">
    <input
      type="text"
      v-model="keyword"
      placeholder="artist, song"
      @keyup.enter="sendKeyword"
    />
    <button type="button" id="search-btn" @click="sendKeyword"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    sendKeyword() {
      this.$store.dispatch("KEYWORD", this.keyword);
      this.$store.dispatch("SEARCH");
    },
  },
};
</script>

<style></style>
