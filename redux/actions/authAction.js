import {
  SET_USER,
  GET_ERRORS,
  SET_IS_FETCHING,
  REMOVE_ACCESS,
  LOGOUT,
  UPDATE_USER,
} from "../../constants/types";
import instance from "../../utils/instance";

export const setIsFetching = (payload) => {
  return {
    type: SET_IS_FETCHING,
    payload,
  };
};

export const getAuthUserInfo = (toast) => async (dispatch) => {
  dispatch(setIsFetching(true));
  await instance()
    .get(`api/me`)
    .then((response) => {
      const res = response.data;
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
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
        payload: error?.response?.data?.data,
      });
    });
};

export const registerUser = (data, toast, router) => async (dispatch) => {
  dispatch(setIsFetching(true));
  await instance()
    .post(`api/register`, data)
    .then((response) => {
      const res = response.data;
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      if (res.data.user.email_verified_at === null) {
        router.push("verify");
      }
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
        payload: error?.response?.data?.data,
      });
    });
};

export const loginUser = (data, toast, router) => async (dispatch) => {
  dispatch(setIsFetching(true));
  await instance()
    .get("sanctum/csrf-cookie")
    .then(async (res) => {
      await instance()
        .post("api/login", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          const res = response.data;
          dispatch({
            type: SET_USER,
            payload: res.data,
          });
          if (res.data.user.email_verified_at === null) {
            router.push("verify");
          }
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
            description:
              error?.response.status === 500
                ? `${error.response.statusText} [${error.response.status}]`
                : "Email or password incorrect",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          dispatch({
            type: GET_ERRORS,
            payload: error?.response?.data,
          });
        });
    });
};

export const logoutUser = (toast) => async (dispatch) => {
  await instance()({
    url: "api/logout",
    method: "post",
  })
    .then((response) => {
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
    })
    .catch((error) => {
      dispatch(setIsFetching(false));
      toast({
        title: "Error",
        description: "Unexpected Error",
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
