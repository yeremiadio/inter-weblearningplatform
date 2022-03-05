import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { persistStore } from "redux-persist";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// With Devtools

const store = PHASE_DEVELOPMENT_SERVER
  ? createStore(
      reducers,
      composeWithDevTools(
        applyMiddleware(thunk)
        // other store enhancers if any
      )
    )
  : createStore(reducers, applyMiddleware(thunk));

const initializeStore = (initialState = {}) => {
  return store;
};

const persistor = persistStore(store);

export { store, initializeStore, persistor };
