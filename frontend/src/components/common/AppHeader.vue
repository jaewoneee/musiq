<template>
  <div class="header-wrap">
    <header>
      <h1 id="logo">
        <a href="/main">logo</a>
      </h1>

      <ul class="nav">
        <li>
          <router-link to="/main">Home</router-link>
        </li>
        <li>
          <router-link to="/search">Search</router-link>
        </li>

        <template v-if="isUserLogin">
          <li>
            <router-link to="/fav">fav</router-link>
          </li>
          <li>
            <a href="javascript:;" @click="logoutUser" id="logout-btn"
              >Logout
            </a>
          </li>
        </template>
        <template v-else>
          <li>
            <a href="/login">fav</a>
          </li>
          <li><router-link to="/login">Login</router-link></li>
        </template>
      </ul>
    </header>
  </div>
</template>

<script>
import { deleteCookie } from "../../utils/cookies";
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
      deleteCookie("m_user");
      deleteCookie("m_auth");
      deleteCookie("m_uuid");
      this.$store.commit("clearUserInfo");
      this.$store.commit("clearArray");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
