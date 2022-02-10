import { LOGOUT } from "../constants/types";
import { store } from "../redux/store";
import Cookies from "js-cookie";

export const logOut = () => {
  if (typeof window !== "undefined") {
    store.dispatch({
      type: LOGOUT,
    });
    localStorage.clear();
    Cookies.remove("personal_access_token");
  }
};
