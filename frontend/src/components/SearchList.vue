<template>
  <div>
    <ul>
      <li v-for="item in this.$store.state.array" :key="item.id">
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
</template>

<script>
export default {
  // data() {
  //   return {
  //     array: this.$store.state.array,
  //   };
  // },
};
</script>

<style></style>
