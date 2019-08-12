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

function get(path, payload, dispatch) {
  return api
    .get(path, payload)
    .then(response => response.data)
    .catch(error => {
      dispatch({
        type: errorActionTypes.SERVER_ERRORS,
        payload: error.response.data
      });

      throw Error;
    });
}

function post(path, payload, dispatch, config = {}) {
  return api
    .post(path, payload, config)
    .then(response => response.data)
    .catch(error => {
      dispatch({
        type: errorActionTypes.SERVER_ERRORS,
        payload: error.response.data
      });

      throw Error;
    });
}

function put(path, payload, dispatch, config = {}) {
  return api
    .put(path, payload, config)
    .then(response => response.data)
    .catch(error => {
      dispatch({
        type: errorActionTypes.SERVER_ERRORS,
        payload: error.response.data
      });

      throw Error;
    });
}

function deleteRequest(path, payload, dispatch, config = {}) {
  return api
    .delete(path, payload, config)
    .then(response => response.data)
    .catch(error => {
      dispatch({
        type: errorActionTypes.SERVER_ERRORS,
        payload: error.response.data
      });

      throw Error;
    });
}

export default {
  get,
  post,
  put,
  delete: deleteRequest
};
