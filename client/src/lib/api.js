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
    .catch(console.log);
}

function post(path, payload, config = {}) {
  return api
    .post(path, payload, config)
    .then(response => response.data)
    .catch(console.log);
}

const get = doAPI("get");
const post = doAPI("post");
const patch = doAPI("patch");
const deleteRequest = doAPI("delete");

function deleteRequest(path, payload, config = {}) {
  return api
    .delete(path, payload, config)
    .then(response => response.data)
    .catch(console.log);
}

export default {
  get,
  post,
  put,
  delete: deleteRequest
};
