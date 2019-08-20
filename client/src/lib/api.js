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
  throw Error;
};

function get(path, payload, dispatch) {
  return api
    .get(path, payload)
    .then(response => response.data)
    .catch(error => dispatchError(error, dispatch));
}

function post(path, payload, dispatch, config = {}) {
  return api
    .post(path, payload, config)
    .then(response => response.data)
    .catch(error => dispatchError(error, dispatch));
}

function patch(path, payload, dispatch, config = {}) {
  return api
    .patch(path, payload, config)
    .then(response => response.data)
    .catch(error => dispatchError(error, dispatch));
}

function deleteRequest(path, payload, dispatch, config = {}) {
  return api
    .delete(path, payload, config)
    .then(response => response.data)
    .catch(error => dispatchError(error, dispatch));
}

export default {
  get,
  post,
  patch,
  delete: deleteRequest
};
