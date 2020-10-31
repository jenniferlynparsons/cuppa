import API from "../lib/api";
import { teaActionTypes, errorActionTypes } from "../lib/actionTypes";

// Add Tea
export const addTea = (userID, tea) => {
  return dispatch => {
    return API.post(`/users/${userID}/teas`, tea, dispatch)
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
export const editTea = (userID, tea) => {
  return dispatch => {
    return API.patch(`/users/${userID}/teas/${tea.id}`, tea, dispatch)
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
export const deleteTea = (userID, teaID) => {
  return dispatch => {
    return API.delete(`/users/${userID}/teas/${teaID}`, dispatch)
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
export const getTeas = userID => {
  return dispatch => {
    return API.get(`/users/${userID}/teas`, dispatch)
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
