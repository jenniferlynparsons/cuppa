import setAuthToken from "../lib/setAuthToken";
import jwt_decode from "jwt-decode";
import API from "../lib/api";
import { authActionTypes } from "../lib/actionTypes";

// Login - get user token
export const loginAction = userData => {
  return dispatch => {
    API.post("/users/login", userData)
      .then(response => {
        console.log("hello");
        const { token } = response;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        //check that setCurrentUser is called with decoded
        dispatch(authActions.setCurrentUser(decoded));
      })
      .catch(error => {
        // handle error
        const errorObj = error.response.data;
        console.log(errorObj);
        dispatch(authActions.setErrorResponse(errorObj));
      });
  };
};

// Register User
export const registerUser = (userData, history) => {
  return dispatch => {
    API.post("/users/register", userData)
      .then(response => {
        const arg = "/login";
        history.push(arg);
        const { token } = response;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(authActions.setCurrentUser(decoded));
      })
      .catch(error => {
        // handle error
        const errorObj = error.response.data;
        dispatch(authActions.setErrorResponse(errorObj));
      });
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({ type: authActionTypes.USER_LOGOUT });
};

export const setCurrentUser = decoded => {
  return {
    type: authActionTypes.SET_CURRENT_USER,
    payload: decoded
  };
};

export const setErrorResponse = errorObj => {
  return {
    type: authActionTypes.LOGIN_ERRORS,
    payload: errorObj
  };
};

const authActions = {
  loginAction,
  registerUser,
  logoutUser,
  setCurrentUser,
  setErrorResponse
};

export default authActions;
