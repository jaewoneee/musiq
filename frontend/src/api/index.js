import axios from "axios";

function registerUser() {
  const url = "http://localhost:3000/api/users/signup";
  return axios.post(url);
}

export { registerUser };
