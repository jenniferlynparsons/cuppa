import isEmpty from "is-empty";

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "USER_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "LOGIN_ERRORS":
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
