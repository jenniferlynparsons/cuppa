import API from "../lib/api";
import teaNormalizer from "./normalizers/teaNormalizer";

// Add Tea
export function addTea(tea) {
  tea.id = tea.teaID;
  console.log(tea);
  return dispatch => {
    API.post(`/teas/new-tea`, tea).then(response => {
      dispatch({
        type: "EDIT_TEA",
        payload: teaNormalizer(response)
      });
    });
  };
}

// Edit Tea
export function editTea(tea) {
  tea.id = tea.teaID;
  return dispatch => {
    API.put(`/teas/update-tea`, tea).then(response => {
      dispatch({
        type: "EDIT_TEA",
        payload: teaNormalizer(response)
      });
    });
  };
}

// Delete Tea
export function deleteTea(teaID) {
  return dispatch => {
    API.delete(`/teas/delete-tea/${teaID}`).then(() => {
      dispatch({
        type: "DELETE_TEA",
        payload: teaID
      });
    });
  };
}

// Get Teas
export function getTeas(listOwner) {
  console.log(listOwner);
  return dispatch => {
    API.get(`/teas/teasList/${listOwner}`).then(response => {
      let responseObj = { allTeas: {}, teaIDs: [] };

      response.map(tea => {
        responseObj["allTeas"][tea.id] = teaNormalizer(tea);
        responseObj["teaIDs"].push(tea.id);
      });

      dispatch({
        type: "GET_TEAS",
        payload: responseObj
      });
    });
  };
}
