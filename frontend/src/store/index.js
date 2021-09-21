import Vue from "vue";
import Vuex from "vuex";
import { getMusicList } from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    array: {},
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LIST(state, data) {
      state.array = data;
    },
  },
  actions: {
    async SEARCH({ commit }, value) {
      let response = await getMusicList(value);
      commit("SET_LIST", response.data.tracks.items);
    },
  },
  modules: {},
});
