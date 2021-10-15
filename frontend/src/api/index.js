import axios from "axios";
import { setInterceptors } from "./common/interceptors";

function createInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api",
  });
  return setInterceptors(instance);
}

const instance = createInstance();

// 회원가입
function registerUser(user) {
  const url = "http://localhost:3000/api/users/signup";
  return instance.post(url, user);
}
//로그인
function loginUser(user) {
  const url = "http://localhost:3000/api/users/login";
  return instance.post(url, user);
}
// 추천 플레이리스트 가져오기
function getPlaylist() {
  let url = "http://localhost:3000/api/main";
  return instance.get(url);
}
// 음악정보 가져오기
function getMusicList(value) {
  let url = `http://localhost:3000/api/search/${value}`;
  return instance.get(url);
}
// 좋아요 리스트 추가
function addFavorite(item) {
  let url = "http://localhost:3000/api/search/add";
  return instance.post(url, null, {
    params: {
      id: item.id,
      artist: item.artist,
      title: item.title,
      src: item.src,
    },
  });
}
// 좋아요 여부 확인
function isFavorite(id) {
  let url = `http://localhost:3000/api/search/fav/${id}`;
  return instance.get(url);
}
export {
  registerUser,
  loginUser,
  getPlaylist,
  getMusicList,
  addFavorite,
  isFavorite,
};
