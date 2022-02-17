import { LOGOUT } from "../constants/types";
import { store } from "../redux/store";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/toast";

const logOut = () => {
  if (typeof window !== "undefined") {
    store.dispatch({
      type: LOGOUT,
    });
    localStorage.clear();
    Cookies.remove("personal_access_token");
  }
};

const notVerified = () => {
  if (typeof window !== "undefined") {
    const toast = useToast();
    toast({
      title: "Email not Verified",
      description: "Please verified your email",
      status: "error",
      isClosable: true,
      duration: 3000,
    });
  }
};

export { logOut, notVerified };
