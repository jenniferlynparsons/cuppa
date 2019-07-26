import API from "../lib/api";
import { teaTypeActionTypes, errorActionTypes } from "../lib/actionTypes";

// Add TeaType
export const addTeaType = teaType => {
  return dispatch => {
    return API.post("/tea-types", teaType)
      .then(response => {
        if (response && response.noDuplicate) {
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
      .catch(error => console.log(error));
  };
};

// Edit TeaType
export const editTeaType = teaType => {
  return dispatch => {
    return API.put("/tea-types", teaType)
      .then(response => {
        dispatch({
          type: teaTypeActionTypes.EDIT_TEATYPE,
          payload: response
        });
      })
      .catch(error => console.log(error));
  };
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
      .catch(error => console.log(error));
  };
};

// Get TeaTypes
export const getTeaTypes = listOwner => {
  return dispatch => {
    return API.get(`/tea-types/${listOwner}`)
      .then(response => {
        dispatch({
          type: teaTypeActionTypes.GET_TEATYPES,
          payload: response
        });
      })
      .catch(error => console.log(error));
  };
};

const teaActions = {
  addTeaType,
  editTeaType,
  deleteTeaType,
  getTeaTypes
};

export default teaActions;
