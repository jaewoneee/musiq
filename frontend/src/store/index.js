import Vue from "vue";
import Vuex from "vuex";
import { registerUser, loginUser } from "../api/auth";
import { getMusicList } from "../api/music";
import {
  saveAuthToCookie,
  saveUserToCookie,
  saveUuidToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  getUuidFromCookie,
} from "../utils/cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: getUserFromCookie() || "",
    token: getAuthFromCookie() || "",
    uuid: getUuidFromCookie() || "",
    array: "",
  },
  mutations: {
    setUsername(state, nickname) {
      state.user = nickname;
    },
    setUUID(state, uuid) {
      state.uuid = uuid;
    },
    setList(state, data) {
      state.array = data;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearUserInfo(state) {
      state.user = "";
      state.token = "";
      state.uuid = "";
    },
  },
  actions: {
    async LOGIN({ commit }, value) {
      const { data } = await loginUser(value);
      commit("setUsername", data.user.nickname);
      commit("setUUID", data.user.uuid);
      commit("setToken", data.token);
      saveAuthToCookie(data.token);
      saveUserToCookie(data.user.nickname);
      saveUuidToCookie(data.user.uuid);
      console.log(data);
    },
    async SIGNUP({ commit }, value) {
      const { data } = await registerUser(value);
      commit("setUsername", data);
      console.log(data);
    },
    async SEARCH({ commit }, value) {
      let response = await getMusicList(value);
      console.log(response);
      commit("setList", response.data.tracks.items);
    },
  },
  modules: {},
  getters: {
    isLogin(state) {
      return state.token !== "";
    },
    isSearched(state) {
      return state.array !== "";
    },
  },
});
