<template>
  <div class="header-wrap">
    <header>
      <h1 id="logo"><router-link to="/">Main</router-link></h1>
      <ul>
        <template v-if="isUserLogged">
          <li>
            <router-link to="/">List</router-link>
            <router-link to="/favorite">Fav</router-link>
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
    return {
      isUserLogged: true,
    };
  },
};
</script>

<style></style>
