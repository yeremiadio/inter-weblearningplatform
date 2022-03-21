import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import authReducer from "./authReducer";
import codeReducer from "./codeReducer";
import errorReducer from "./errorReducer";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

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
const codePersistConfig = {
  key: "rootCode",
  storage: storage,
  transforms: [encryptor],
  blacklist: ["code"],
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  code: persistReducer(codePersistConfig, codeReducer),
  errors: errorReducer,
});

export default appReducer;
