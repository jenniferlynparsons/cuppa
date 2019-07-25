import API from "../lib/api";
import { teaActionTypes } from "../lib/actionTypes";

// Add Tea
export const addTea = tea => {
  tea.id = tea.teaID;
  return dispatch => {
    return API.post("/teas", tea).then(response => {
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
    return API.put("/teas", tea).then(response => {
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
    return API.delete(`/teas/${teaID}`).then(() => {
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
    return API.get(`/teas/${listOwner}`).then(response => {
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
