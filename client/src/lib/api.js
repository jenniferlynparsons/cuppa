import axios from "axios";
import { errorActionTypes } from "./actionTypes";

let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:5000";
} else {
  backendHost = "";
}
const API_SERVER = `${backendHost}/api`;

var api = axios.create({ baseURL: API_SERVER });

const dispatchError = (errorData, dispatch) => {
  dispatch({
    type: errorActionTypes.SERVER_ERRORS,
    payload: errorData.response.data
  });
  throw new Error(errorData);
};

function doAPI(method) {
  return (path, payload, dispatch, config = {}) =>
    api[method](path, payload, config)
      .then(response => response.data)
      .catch(error => dispatchError(error, dispatch));
}

const get = doAPI("get");
const post = doAPI("post");
const patch = doAPI("patch");
const deleteRequest = doAPI("deleteRequest");

export default {
  get,
  post,
  patch,
  delete: deleteRequest
};
