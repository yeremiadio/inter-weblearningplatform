import {
  LIST_PAGE_REQUEST_SEND,
  LIST_PAGE_REQUEST_ERROR,
  LIST_PAGE_REQUEST_SUCCESS,
  CREATE_PAGE_ERROR,
  CREATE_PAGE_REQUEST,
  CREATE_PAGE_SUCCESS,
} from "../../constants/types";

import instance from "../../utils/instance";

export const pageLoad = () => async (dispatch) => {
  dispatch({ type: LIST_PAGE_REQUEST_SEND });
  try {
    const response = await instance().get("api/pages");
    dispatch({ type: LIST_PAGE_REQUEST_SUCCESS, data: response.data });
  } catch (error) {
    dispatch({ type: LIST_PAGE_REQUEST_ERROR, error: error });
  }
};
