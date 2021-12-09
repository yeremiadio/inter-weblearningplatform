import { GET_ERRORS, RESET_ERRORS } from "../../constants/types";

const initialState = {
  entries: {},
  isError: false,
};
export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        entries: action.payload,
        isError: true,
      };
    case RESET_ERRORS:
      return {
        ...state,
        entries: {},
        isError: false,
      };
    default:
      return state;
  }
}
