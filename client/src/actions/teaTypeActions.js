import API from "../lib/api";
import { teaTypeActionTypes, errorActionTypes } from "../lib/actionTypes";

// Add TeaType
export const addTeaType = teaType => {
  return dispatch =>
    API.post("/tea-types", teaType)
      .then(response => {
        if (response && response.duplicateTea) {
          dispatch({
            type: errorActionTypes.SERVER_ERRORS,
            payload: response
          });
        } else {
          dispatch({
            type: teaTypeActionTypes.ADD_TEATYPE,
            payload: response
          });
        }
      })
      .catch(console.log);
};

// Edit TeaType
export const editTeaType = teaType => {
  return dispatch =>
    API.put("/tea-types", teaType)
      .then(response => {
        dispatch({
          type: teaTypeActionTypes.EDIT_TEATYPE,
          payload: response
        });
      })
      .catch(console.log);
};

// Delete TeaType
export const deleteTeaType = teaTypeID => {
  return dispatch => {
    return API.delete(`/tea-types/${teaTypeID}`)
      .then(() => {
        dispatch({
          type: teaTypeActionTypes.DELETE_TEATYPE,
          payload: teaTypeID
        });
      })
      .catch(console.log);
  };
};

// Get TeaTypes
export const getTeaTypes = listOwner => {
  return dispatch =>
    API.get(`/tea-types/${listOwner}`)
      .then(response => {
        dispatch({
          type: teaTypeActionTypes.GET_TEATYPES,
          payload: response
        });
      })
      .catch(console.log);
};

const teaActions = {
  addTeaType,
  editTeaType,
  deleteTeaType,
  getTeaTypes
};

export default teaActions;
