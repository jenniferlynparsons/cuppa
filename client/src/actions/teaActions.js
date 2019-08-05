import API from "../lib/api";
import { teaActionTypes, errorActionTypes } from "../lib/actionTypes";

// Add Tea
export const addTea = tea => {
  return dispatch => {
    return API.post("/teas", tea)
      .then(response => {
        if (response && response.duplicate) {
          dispatch({
            type: errorActionTypes.SERVER_ERRORS,
            payload: response
          });
        } else {
          dispatch({
            type: teaActionTypes.ADD_TEA,
            payload: response
          });
        }
      })
      .catch(console.log);
  };
};

// Edit Tea
export const editTea = tea => {
  return dispatch => {
    return API.put("/teas", tea)
      .then(response => {
        dispatch({
          type: teaActionTypes.EDIT_TEA,
          payload: response
        });
      })
      .catch(console.log);
  };
};

// Delete Tea
export const deleteTea = teaID => {
  return dispatch => {
    return API.delete(`/teas/${teaID}`)
      .then(() => {
        dispatch({
          type: teaActionTypes.DELETE_TEA,
          payload: teaID
        });
      })
      .catch(console.log);
  };
};

// Get Teas
export const getTeas = listOwner => {
  return dispatch => {
    return API.get(`/teas?id=${listOwner}`)
      .then(response => {
        dispatch({
          type: teaActionTypes.GET_TEAS,
          payload: response
        });
      })
      .catch(console.log);
  };
};

export const setErrorResponse = errorObj => {
  return {
    type: teaActionTypes.SERVER_ERRORS,
    payload: errorObj
  };
};

const teaActions = {
  addTea,
  editTea,
  deleteTea,
  getTeas
};

export default teaActions;
