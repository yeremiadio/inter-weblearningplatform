import {
  GET_ERRORS,
  RESET_CODE,
  SET_CODE,
  SET_IS_FETCHING,
} from "../../constants/types";
import instance from "../../utils/instance";

export const setIsFetching = (payload) => {
  return {
    type: SET_IS_FETCHING,
    payload,
  };
};

export const getCode = (slug, router) => async (dispatch) => {
  await instance()
    .get(`api/code/${slug}`)
    .then((res) => {
      dispatch({
        type: SET_CODE,
        payload: res.data.data,
      });
      router.push(`playground/frontend/${slug}`);
    })
    .catch((err) => {
      dispatch({
        type: SET_CODE,
        payload: err.response.data.message,
      });
    });
};

export const storeCode = (data, router, toast) => async (dispatch) => {
  dispatch(setIsFetching(true));
  await instance()
    .post(`api/code/create`, data)
    .then((response) => {
      const res = response.data.data;
      dispatch({
        type: SET_CODE,
        payload: res,
      });
      dispatch(setIsFetching(false));
      router.push(`${res.type}/${res.slug}`);
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

export const updateCode = (data, router, toast) => async (dispatch) => {
  dispatch(setIsFetching(true));
  await instance()
    .put(`api/code/${router?.query?.slug}/update`, data)
    .then((response) => {
      const res = response.data.data;
      dispatch({
        type: SET_CODE,
        payload: res,
      });
      dispatch(setIsFetching(false));
      router.push(`${res.slug}`);
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
      console.log(error);
    });
};

export const deleteCode = async (id, data, mutate, toast) => {
  await instance()
    .delete(`api/code/${id}/delete`)
    .then((res) => {
      toast({
        title: "Success",
        description: res.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      mutate([...data.filter((item) => item.id !== id)], false);
    })
    .catch((err) => {
      toast({
        title: "Error",
        description: "Unexpected Error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
};
