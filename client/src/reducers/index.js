import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import teaReducers from "./teaReducers";
import typesReducer from "./typesReducers";
import flashReducer from "./flashReducers";

const appReducer = combineReducers({
	auth: authReducer,
	errors: errorReducer,
	teas: teaReducers,
	teaTypes: typesReducer,
	flash: flashReducer
});

export const rootReducer = (state, action) => {
	if (action.type === "USER_LOGOUT") {
		state = undefined;
	}

	return appReducer(state, action);
};
