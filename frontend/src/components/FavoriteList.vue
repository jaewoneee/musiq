<template>
  <div class="fav-list-box">
    <ul>
      <li v-for="(favItem, index) in favList" v-bind:key="favItem.id">
        <img :src="favItem.img" alt="" />
        <p>{{ favItem.title }}</p>
        <p>{{ favItem.artist }}</p>
        <button @click="deleteItem(favItem.id, index)">
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.28 16.6 12.36 11.45 17.04L10 18.35Z"
              fill="#CEE745"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchFavorites, deleteFavorite } from "../api/music";
export default {
  data() {
    return {
      favList: [],
    };
  },
  async created() {
    const uuid = this.$store.state.uuid;
    const { data } = await fetchFavorites(uuid);
    this.favList = data;
  },
  methods: {
    // 좋아요 리스트에서 제거
    async deleteItem(id, idx) {
      await deleteFavorite(id);
      this.$delete(this.favList, idx);
    },
  },
};
</script>

<style></style>
