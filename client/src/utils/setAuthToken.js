import axios from "axios";

const setAuthToken = token => {
  const authHeader = "Authorization";
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common[authHeader] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common[authHeader];
  }
};

export default setAuthToken;
