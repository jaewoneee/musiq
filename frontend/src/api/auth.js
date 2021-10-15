import { instance } from "./index";

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

export { registerUser, loginUser };
