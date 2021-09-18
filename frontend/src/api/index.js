import axios from "axios";

//   회원가입
function registerUser() {
  const url = "http://localhost:3000/api/users/signup";
  return axios.post(url);
}

// 음악정보 가져오기
function getMusicList(value) {
  let url = `http://localhost:3000/api/main/${value}`;
  return axios.get(url);
}

export { registerUser, getMusicList };
