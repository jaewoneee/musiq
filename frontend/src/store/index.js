import Vue from "vue";
import Vuex from "vuex";
import { getMusicList } from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    array: {},
  },
  mutations: {
    SET_LIST(state, data) {
      state.array = data;
    },
  },
  actions: {
    async SEARCH({ commit }, value) {
      console.log(value);
      let response = await getMusicList(value);
      commit("SET_LIST", response.data.tracks.items);
      console.log(response.data.tracks);
    },
  },
  modules: {},
});
