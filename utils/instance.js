import axios from "axios";
import { logOut } from "./auth";

export default function instance() {
  const instance = axios.create({
    baseURL: process.env.baseUrl,
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        logOut();
        return Promise.reject();
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
