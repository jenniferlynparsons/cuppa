import API from "../lib/api";
import { teaActionTypes } from "../lib/actionTypes";

// Add Tea
export const addTea = tea => {
  tea.id = tea.teaID;
  return dispatch => {
    API.post("/teas/new-tea", tea).then(response => {
      dispatch({
        type: teaActionTypes.ADD_TEA,
        payload: response
      });
    });
  };
};

// Edit Tea
export const editTea = tea => {
  tea.id = tea.teaID;
  return dispatch => {
    API.put("/teas/update-tea", tea).then(response => {
      dispatch({
        type: teaActionTypes.EDIT_TEA,
        payload: response
      });
    });
  };
};

// Delete Tea
export const deleteTea = teaID => {
  return dispatch => {
    API.delete(`/teas/delete-tea/${teaID}`).then(() => {
      dispatch({
        type: teaActionTypes.DELETE_TEA,
        payload: teaID
      });
    });
  };
};

// Get Teas
export const getTeas = listOwner => {
  return dispatch => {
    API.get(`/teas/teasList/${listOwner}`).then(response => {
      dispatch({
        type: teaActionTypes.GET_TEAS,
        payload: response
      });
    });
  };
};

const teaActions = {
  addTea,
  editTea,
  deleteTea,
  getTeas
};

export default teaActions;
