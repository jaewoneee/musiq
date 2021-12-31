import { instance } from "./index";
const baseURL = `${process.env.VUE_APP_API_URL}/users`;

// 회원가입
function registerUser(user) {
  const url = `${baseURL}/signup`;
  return instance.post(url, user);
}
//로그인
function loginUser(user) {
  const url = `${baseURL}/login`;
  return instance.post(url, user);
}

export { registerUser, loginUser };
