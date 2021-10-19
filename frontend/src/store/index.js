import Vue from "vue";
import Vuex from "vuex";
import { loginUser } from "../api/auth";
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
    keyword: "",
    offset: 0,
    array: "",
  },
  mutations: {
    setUsername(state, nickname) {
      state.user = nickname;
    },
    setUUID(state, uuid) {
      state.uuid = uuid;
    },
    setKeyword(state, value) {
      state.keyword = value;
      state.offset = 0;
    },
    incrementOffset(state) {
      state.offset += 30;
    },
    decrementOffset(state) {
      state.offset -= 30;
    },
    setList(state, data) {
      state.array = data.items;
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
    KEYWORD({ commit }, value) {
      commit("setKeyword", value);
    },
    async SEARCH({ commit }, separator) {
      let keyword = this.state.keyword;
      if (separator == "increment") {
        commit("incrementOffset");
      } else if (separator == "decrement") {
        commit("decrementOffset");
      } else {
        this.state.offset = 0;
      }
      let offset = this.state.offset;
      let response = await getMusicList(keyword, offset);
      commit("setList", response.data.tracks);
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
    offsetCheck(state) {
      return state.offset >= 30;
    },
  },
});
