<template>
  <div class="header-wrap">
    <header>
      <h1 id="logo"><router-link to="/">main</router-link></h1>
      <span v-if="isUserLogin"> Hello, {{ $store.state.user.username }} </span>
      <ul class="nav">
        <li>
          <router-link to="/">List</router-link>
        </li>
        <li>
          <router-link to="/favorite">Fav</router-link>
        </li>
        <template v-if="isUserLogin">
          <li>
            <a href="javascript:;" @click="logoutUser" id="logout-btn">
              Logout
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
    },
  },
};
</script>

<style></style>
