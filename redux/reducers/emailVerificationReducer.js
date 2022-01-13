import {
  ADD_EMAIL_VERIFICATION_TOKEN,
  REMOVE_EMAIL_VERIFICATION_TOKEN,
} from "../../constants/types";

const initialState = {
  access_token: {},
};

export default function emailVerificationReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_EMAIL_VERIFICATION_TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    case REMOVE_EMAIL_VERIFICATION_TOKEN:
      return { ...state, access_token: "" };
    default:
      return state;
  }
}
