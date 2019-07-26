import axios from "axios";

let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:5000";
} else {
  backendHost = "";
}
const API_SERVER = `${backendHost}/api`;

var api = axios.create({ baseURL: API_SERVER });

function get(path, payload) {
  return api
    .get(path, payload)
    .then(response => response.data)
    .catch(error => console.log(error));
}

function post(path, payload, config = {}) {
  return api
    .post(path, payload, config)
    .then(response => response.data)
    .catch(error => console.log(error));
}

function put(path, payload, config = {}) {
  return api
    .put(path, payload, config)
    .then(response => response.data)
    .catch(error => console.log(error));
}

function deleteRequest(path, payload, config = {}) {
  return api
    .delete(path, payload, config)
    .then(response => response.data)
    .catch(error => console.log(error));
}

export default {
  get,
  post,
  put,
  delete: deleteRequest
};
