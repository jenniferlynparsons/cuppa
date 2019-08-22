import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import teaReducers from "./teaReducers";
import teaTypesReducer from "./teaTypesReducers";
import flashReducer from "./flashReducers";

const appReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  teas: teaReducers,
  teaTypes: teaTypesReducer,
  flash: flashReducer
});

export const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};
