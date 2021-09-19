<template>
  <div>
    <input
      type="text"
      v-model="keyword"
      placeholder="singer, song title"
      @keyup.enter="sendKeyword"
    />
    <button type="button" @click="sendKeyword">find</button>
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
      this.$store.dispatch("SEARCH", this.keyword);
    },
  },
};
</script>

<style></style>
