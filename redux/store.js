import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { persistStore } from "redux-persist";

// With Devtools
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

const persistor = persistStore(store);

export { store, persistor };

// Without Devtools
// const store = createStore(reducers, applyMiddleware(reduxThunk));
