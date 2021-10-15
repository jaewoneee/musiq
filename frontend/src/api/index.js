import axios from "axios";
import { setInterceptors } from "./common/interceptors";

function createInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:3000/api",
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
