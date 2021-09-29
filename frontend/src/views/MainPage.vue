<template>
  <div id="content">
    <div>
      <search-form></search-form>
      <template v-if="musicSearched">
        <search-list></search-list>
      </template>
      <template v-else>
        <main-playlist></main-playlist>
      </template>
    </div>
  </div>
</template>

<script>
import MainPlaylist from "../components/MainPlaylist.vue";
import SearchForm from "../components/SearchForm.vue";
import SearchList from "../components/SearchList.vue";

export default {
  components: {
    MainPlaylist,
    SearchForm,
    SearchList,
  },
  computed: {
    musicSearched() {
      return this.$store.getters.isSearched;
    },
  },
};
</script>

<style></style>
