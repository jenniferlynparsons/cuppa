import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import API from "../lib/api";

// Login - get user token
export function loginAction(userData) {
  return dispatch => {
    API.post(`/users/login`, userData).then(response => {
      const { token } = response;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    });
  };
}

// Register User
export function registerUser(userData, history) {
  return dispatch => {
    API.post(`/users/register`, userData).then(response => {
      const arg = "/login";
      history.push(arg);
      const { token } = response;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    });
  };
}

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({ type: "USER_LOGOUT" });
};

export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};
