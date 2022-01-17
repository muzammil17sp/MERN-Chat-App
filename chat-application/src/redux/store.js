import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import AllReducer from "./reducers/mainReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
  AuthReducer: {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  }
}
const store = createStore(
  AllReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store