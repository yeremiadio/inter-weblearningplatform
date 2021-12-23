import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth"],
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  errors: errorReducer,
});

export default appReducer;
