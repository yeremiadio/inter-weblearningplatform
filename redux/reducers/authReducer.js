import {
  LOGOUT,
  SET_IS_FETCHING,
  SET_USER,
  RESET_USER,
  UPDATE_USER,
} from "../../constants/types";

const initialState = {
  user: {},
  isFetching: false,
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case RESET_USER:
      return {
        ...state,
        user: {},
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
