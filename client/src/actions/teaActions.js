import API from "../lib/api";

// Add Tea
export function addTea(tea) {
  tea.id = tea.teaID;
  return dispatch => {
    API.post(`/teas/new-tea`, tea).then(response => {
      dispatch({
        type: "ADD_TEA",
        payload: response
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
        payload: response
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
  return dispatch => {
    API.get(`/teas/teasList/${listOwner}`).then(response => {
      dispatch({
        type: "GET_TEAS",
        payload: response
      });
    });
  };
}
