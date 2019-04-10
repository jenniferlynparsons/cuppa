import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { RSAA } from "redux-api-middleware";

// Set the host to work with local dev or Heroku and avoid proxy CORS issues
let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:5000";
} else {
  backendHost = "";
}
const API_SERVER = `${backendHost}`;

// Login - get user token
export function loginAction(userData) {
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/users/login`,
      method: "POST",
      types: [
        "REQUEST",
        {
          type: "SET_CURRENT_USER",
          payload: async (_action, _state, res) => {
            res = await res.json();
            // Set token to localStorage
            const { token } = res;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            console.log(decoded);
            // Set current user
            return decoded;
          }
        },
        "FAILURE"
      ],
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" }
    }
  };
}

// Register User
export function registerUser(userData, history) {
  console.log(userData);
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/users/register`,
      method: "POST",
      types: [
        "REQUEST",
        {
          type: "SET_CURRENT_USER",
          payload: async (_action, _state, res) => {
            const arg = "/login";
            history.push(arg);
            console.log(res);
            res = await res.json();
            // Set token to localStorage
            const { token } = res;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
            return decoded;
          }
        },
        {
          type: "GET_ERRORS",
          payload: async (_action, _state, res) => {
            return res.response.data;
          }
        }
      ],
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" }
    }
  };
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: "USER_LOADING"
  };
};

export const resetStateOnLogout = () => {
  return {
    type: "USER_LOGOUT"
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(resetStateOnLogout());
};
