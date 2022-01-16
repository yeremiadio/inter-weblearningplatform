import axios from "axios";
import { store } from "../redux/store";
import { logOut } from "./logOut";

export default function instance() {
  const token = store.getState().auth.data.token;

  const instance = axios.create({
    baseURL: process.env.baseUrl,
    withCredentials: true,
  });

  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    // console.log(config);
    return config;
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
