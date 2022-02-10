import { SET_IS_FETCHING, RESET_CODE, SET_CODE } from "../../constants/types";

const initialState = {
  data: {},
  isFetching: false,
};

export default function codeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CODE:
      return {
        ...state,
        data: action.payload,
      };
    case RESET_CODE:
      return {
        ...state,
        data: {},
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    default:
      return state;
  }
}
