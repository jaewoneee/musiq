<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <input type="text" name="username" v-model="username" placeholder="username" />
      </div>
      <div>
        <input type="password" name="password" v-model="password" placeholder="password" />
      </div>
      <button type="submit" :disabled="!username || !password">Login</button>
    </form>
    <p>{{ dataMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      dataMessage: "",
    };
  },
  methods: {
    async submitForm() {
      const userData = {
        username: this.username,
        password: this.password,
      };
      this.$http
        .post("/api/users/login", userData)
        .then(response => {
          this.dataMessage = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
