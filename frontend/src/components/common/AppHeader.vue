<template>
  <div class="header-wrap">
    <header>
      <h1 id="logo">
        <a href="/main">logo</a>
      </h1>

      <ul class="nav">
        <li>
          <router-link to="/main">List</router-link>
        </li>
        <li>
          <router-link to="/search">Search</router-link>
        </li>
        <template v-if="isUserLogin">
          <li>
            <a href="javascript:;" @click="logoutUser" id="logout-btn"
              >Logout
            </a>
          </li>
        </template>
        <template v-else>
          <li><router-link to="/login">Login</router-link></li>
        </template>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit("clearUsername");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
