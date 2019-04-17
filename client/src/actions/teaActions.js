import { RSAA } from "redux-api-middleware";
import API from "../lib/api";

let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:5000";
} else {
  backendHost = "";
}
const API_SERVER = `${backendHost}`;

// Add Tea
export function addTea(tea) {
  tea.id = tea.teaId;
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/teas/new-tea`,
      method: "POST",
      types: [
        "REQUEST",
        {
          type: "ADD_TEA",
          payload: async (_action, _state, res) => {
            res = await res.json();
            return res;
          }
        },
        {
          type: "GET_ERRORS",
          payload: async (_action, _state, res) => res.response.data
        }
      ],
      body: JSON.stringify(tea),
      headers: { "Content-Type": "application/json" }
    }
  };
}

export function editTea(tea) {
  tea.id = tea.teaId;
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/teas/update-tea`,
      method: "PUT",
      types: [
        "REQUEST",
        {
          type: "EDIT_TEA",
          payload: async (_action, _state, res) => {
            res = await res.json();

            return res;
          }
        },
        {
          type: "GET_ERRORS",
          payload: async (_action, _state, res) => res.response.data
        }
      ],
      body: JSON.stringify(tea),
      headers: { "Content-Type": "application/json" }
    }
  };
}

export function deleteTea(tea) {
  return {
    [RSAA]: {
      endpoint: `${API_SERVER}/api/teas/delete-tea`,
      method: "DELETE",
      types: [
        "REQUEST",
        {
          type: "DELETE_TEA",
          payload: async (_action, _state, res) => {
            res = await res.json();
            return res;
          }
        },
        {
          type: "GET_ERRORS",
          payload: async (_action, _state, res) => res.response.data
        }
      ],
      body: JSON.stringify(tea),
      headers: { "Content-Type": "application/json" }
    }
  };
}

// Get Teas
export function getTeas(listOwner) {
  console.log(listOwner);
  return dispatch => {
    API.get(`/teas/teasList/${listOwner}`).then(response => {
      // TODO: normalize response

      let responseObj = {};

      response.map(tea => {
        responseObj[tea.id] = {
          id: tea.id,
          name: tea.name,
          brand: tea.brand,
          teaType: tea.teaType,
          servings: tea.servings
        };
      });

      dispatch({
        type: "GET_TEAS",
        payload: responseObj
      });
    });
  };
}
