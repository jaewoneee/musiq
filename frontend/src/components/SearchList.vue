<template>
  <div class="search-list-box">
    <table>
      <tr v-for="item in this.$store.state.array" :key="item.id">
        <td><img :src="item.album.images[1].url" alt="" /></td>
        <td>
          <p>{{ item.name }}</p>
        </td>
        <td>
          <p>{{ item.artists[0].name }}</p>
        </td>
        <td></td>
        <td></td>
        <!-- <template v-if="item.preview_url">
          <video controls="" name="media">
            <source :src="item.preview_url" type="audio/mpeg" />
          </video>
        </template> -->
      </tr>
    </table>
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
