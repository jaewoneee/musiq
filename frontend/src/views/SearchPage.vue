<template>
  <div class="content search">
    <search-form></search-form>
    <search-list></search-list>
  </div>
</template>

<script>
import SearchForm from "../components/SearchForm.vue";
import SearchList from "../components/SearchList.vue";
export default {
  components: {
    SearchForm,
    SearchList,
  },
};
</script>

<style></style>
