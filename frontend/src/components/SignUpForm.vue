<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="username"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="password"
        />
      </div>
      <div>
        <input
          type="text"
          name="nickname"
          v-model="nickname"
          placeholder="nickname"
        />
      </div>
      <p class="err-text">{{ dataMessage }}</p>
      <button type="submit" :disabled="!username || !password || !nickname">
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
import { registerUser } from "../api/auth";
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
      try {
        const userData = {
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        };
        await registerUser(userData);
        alert("WELCOME");
        this.$router.push("/login");
      } catch (error) {
        this.dataMessage = error.response.data.message;
      }
    },
  },
};
</script>

<style></style>
