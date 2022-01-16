import {
  LOGOUT,
  SET_IS_FETCHING,
  SET_USER,
  RESET_USER,
} from "../../constants/types";

const initialState = {
  data: {},
  isFetching: false,
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        data: {},
        isAuthenticated: false,
      };
    case RESET_USER:
      return {
        ...state,
        data: {},
        isAuthenticated: false,
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
