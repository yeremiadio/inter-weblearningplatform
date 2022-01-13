import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import storage from "redux-persist/lib/storage";
import emailVerificationReducer from "./emailVerificationReducer";

const authPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth"],
};
const emailPersistConfig = {
  key: "email",
  storage: storage,
  blacklist: ["email"],
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  email: persistReducer(emailPersistConfig, emailVerificationReducer),
  errors: errorReducer,
});

export default appReducer;
