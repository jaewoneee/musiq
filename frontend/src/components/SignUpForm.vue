<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <input type="text" name="username" v-model="username" placeholder="username" />
      </div>
      <div>
        <input type="password" name="password" v-model="password" placeholder="password" />
      </div>
      <div>
        <input type="text" name="nickname" v-model="nickname" placeholder="nickname" />
      </div>
      <button type="submit" :disabled="!username || !password || !nickname">Sign Up</button>
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
      nickname: "",
      dataMessage: "",
    };
  },
  methods: {
    async submitForm() {
      const userData = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      };
      this.$http
        .post("/api/users/signup", userData)
        .then(response => {
          this.dataMessage = response;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
