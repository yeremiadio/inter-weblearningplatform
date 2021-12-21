import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { RESET_ERRORS, RESET_USER } from "../../constants/types";

function code() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const ac = new AbortController();
    if (
      auth.isAuthenticated === false ||
      Cookies.get("access_token") === undefined
    ) {
      dispatch({
        type: RESET_USER,
      });
      dispatch({
        type: RESET_ERRORS,
      });
      router.replace("/login");
    } else {
      return ac.abort();
    }
  }, []);
  return <div>This is code editor</div>;
}

export default code;
