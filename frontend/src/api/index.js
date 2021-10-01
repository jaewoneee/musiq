import axios from "axios";

// 회원가입
function registerUser(user) {
  const url = "http://localhost:3000/api/users/signup";
  return axios.post(url, user);
}
//로그인
function loginUser(user) {
  const url = "http://localhost:3000/api/users/login";
  return axios.post(url, user);
}
// 추천 플레이리스트 가져오기
function getPlaylist() {
  let url = "http://localhost:3000/api/main";
  return axios.get(url);
}
// 음악정보 가져오기
function getMusicList(value) {
  let url = `http://localhost:3000/api/main/${value}`;
  return axios.get(url);
}

export { registerUser, loginUser, getPlaylist, getMusicList };
