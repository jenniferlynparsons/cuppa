import API from "../lib/api";
import { teaActionTypes } from "../lib/actionTypes";

// Add Tea
export const globalAddTea = tea => {
  return dispatch => {
    return API.post("/teas", tea, dispatch)
      .then(response => {
        dispatch({
          type: teaActionTypes.ADD_TEA,
          payload: response
        });
      })
      .catch(console.log);
  };
};

// Edit Tea
export const globalEditTea = tea => {
  return dispatch => {
    return API.patch(`/teas/${tea.id}`, tea, dispatch)
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
export const globalDeleteTea = teaID => {
  return dispatch => {
    return API.delete(`/teas/${teaID}`, dispatch)
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
export const globalGetTeas = userID => {
  return dispatch => {
    return API.get(`/teas?userID=${userID}`, dispatch)
      .then(response => {
        dispatch({
          type: teaActionTypes.GET_TEAS,
          payload: response
        });
      })
      .catch(console.log);
  };
};

export const globalSetErrorResponse = errorObj => {
  return {
    type: teaActionTypes.SERVER_ERRORS,
    payload: errorObj
  };
};

const teaActions = {
  globalAddTea,
  globalEditTea,
  globalDeleteTea,
  globalGetTeas
};

export default teaActions;
