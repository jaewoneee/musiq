import Vue from "vue";
import Vuex from "vuex";
import { getMusicList, loginUser, registerUser } from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    array: "",
  },
  mutations: {
    setUsername(state, user) {
      state.user = user;
    },
    setList(state, data) {
      state.array = data;
    },
    clearUsername(state) {
      state.user = "";
    },
  },
  actions: {
    async LOGIN({ commit }, value) {
      const { data } = await loginUser(value);
      commit("setUsername", data);
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
      return state.user !== "";
    },
    isSearched(state) {
      return state.array !== "";
    },
  },
});
