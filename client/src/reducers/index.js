import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import teaReducers from "./teaReducers";
import teaTypesReducer from "./teaTypesReducers";
import flashReducer from "./flashReducers";
import modalReducer from "./modalReducers";

const appReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  teas: teaReducers,
  teaTypes: teaTypesReducer,
  flash: flashReducer,
  modal: modalReducer
});

export const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};
