import {
  SET_USER,
  GET_ERRORS,
  SET_IS_FETCHING,
  REMOVE_ACCESS,
  LOGOUT,
  ADD_EMAIL_VERIFICATION_TOKEN,
  REMOVE_EMAIL_VERIFICATION_TOKEN,
} from "../../constants/types";
// import { token } from "../../config/token";
import instance from "../../utils/instance";
import Cookies from "js-cookie";

export const setIsFetching = (payload) => {
  return {
    type: SET_IS_FETCHING,
    payload,
  };
};

export const registerUser = (data, toast, router) => async (dispatch) => {
  dispatch(setIsFetching(true));
  await instance()
    .post(`api/register`, data)
    .then((response) => {
      const res = response.data;
      dispatch({
        type: ADD_EMAIL_VERIFICATION_TOKEN,
        payload: res.data.token,
      });
      router.push("verify");
      dispatch(setIsFetching(false));
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((error) => {
      dispatch(setIsFetching(false));
      toast({
        title: "Error",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.data,
      });
    });
};

export const loginUser = (data, toast, router) => async (dispatch) => {
  dispatch(setIsFetching(true));
  await instance()
    .get("sanctum/csrf-cookie")
    .then(() => {
      instance()
        .post("api/login", data)
        .then((response) => {
          const res = response.data;
          Cookies.set("access_token", res.data.token);
          if (res.data.user.email_verified_at !== null) {
            dispatch({
              type: REMOVE_EMAIL_VERIFICATION_TOKEN,
            });
          }
          dispatch({
            type: SET_USER,
            payload: res.data.user,
          });
          router.push("dashboard");
          dispatch(setIsFetching(false));
          toast({
            title: "Success",
            description: response.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          dispatch(setIsFetching(false));
          toast({
            title: "Error",
            description: error?.response?.data?.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          dispatch({
            type: GET_ERRORS,
            payload: error?.response?.data,
          });
          // console.log(error.response.data.errors);
        });
    })
    .catch((err) => {
      dispatch(setIsFetching(false));
      toast({
        title: "Error",
        description: "Unexpected Error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      localStorage.clear();
    });
};

export const logoutUser = (toast) => async (dispatch) => {
  await instance()({
    url: "api/logout",
    method: "post",
    headers: {
      Authorization: "Bearer " + Cookies.get("access_token"),
    },
  })
    .then((response) => {
      Cookies.remove("access_token");
      localStorage.clear();
      dispatch({
        type: LOGOUT,
        payload: {},
      });
      dispatch({
        type: REMOVE_ACCESS,
        payload: {},
      });
      dispatch(setIsFetching(false));
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log(response);
    })
    .catch((error) => {
      dispatch(setIsFetching(false));
      toast({
        title: "Error",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      dispatch({
        type: GET_ERRORS,
        payload: error.response,
      });
    });
};
