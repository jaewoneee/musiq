import Vue from "vue";
import Vuex from "vuex";
import { getMusicList, loginUser, registerUser } from "../api/index";
import {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
} from "../utils/cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: getUserFromCookie() || "",
    token: getAuthFromCookie() || "",
    uuid: "",
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
    clearUsername(state) {
      state.user = "";
      state.token = "";
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
