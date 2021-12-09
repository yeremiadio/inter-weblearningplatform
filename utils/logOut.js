import Cookies from "js-cookie";
import { LOGOUT } from "../constants/types";
import { store } from "../store";

export const logOut = () => {
  if (typeof window !== "undefined") {
    Cookies.remove("access_token");
    store.dispatch({
      type: LOGOUT,
    });
    router.push("/login");
  }
};
