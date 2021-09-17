import axios from "axios";

function registerUser() {
  const url = "http://localhost:3000/api/users/signup";
  return axios.post(url);
}

function getMusicList(key) {
  let url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${key}&api_key=62c9e0e1a65f85c1f9e48493c14f7cf2&format=json`;
  return axios.get(url);
}

export { registerUser, getMusicList };
