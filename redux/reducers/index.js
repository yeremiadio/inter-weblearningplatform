import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import storage from "redux-persist/lib/storage";
import emailVerificationReducer from "./emailVerificationReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
import session from "redux-persist/lib/storage/session";

const encryptor = encryptTransform({
  secretKey: "myKey",
  onError: function (error) {
    console.log(error);
  },
});
const authPersistConfig = {
  key: "root",
  storage: storage,
  transforms: [encryptor],
  blacklist: ["auth"],
};
const emailPersistConfig = {
  key: "email",
  storage: session,
  transforms: [encryptor],
  blacklist: ["email"],
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  email: persistReducer(emailPersistConfig, emailVerificationReducer),
  errors: errorReducer,
});

export default appReducer;
