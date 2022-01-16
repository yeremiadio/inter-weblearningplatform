import { LOGOUT } from "../constants/types";
import store from "../redux/store";

export const logOut = () => {
  if (typeof window !== "undefined") {
    store.dispatch({
      type: LOGOUT,
    });
    router.push("/login");
  }
};
