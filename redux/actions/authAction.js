import {
  SET_USER,
  GET_ERRORS,
  SET_IS_FETCHING,
  REMOVE_ACCESS,
  LOGOUT,
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

export const registerUser = (data, toast) => async (dispatch) => {
  dispatch(setIsFetching(true));
  await instance()
    .post(`api/register`, data)
    .then((response) => {
      const res = response.data;
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

export const loginUser = (data, toast) => async (dispatch) => {
  dispatch(setIsFetching(true));
  await instance()
    .get("sanctum/csrf-cookie")
    .then(() => {
      instance()
        .post("api/login", data)
        .then((response) => {
          const res = response.data;
          Cookies.set("access_token", res.data.token);
          dispatch({
            type: SET_USER,
            payload: res.data.user,
          });
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
