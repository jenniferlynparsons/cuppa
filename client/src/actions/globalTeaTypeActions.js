import API from "../lib/api";
import { teaTypeActionTypes } from "../lib/actionTypes";

// Add TeaType
export const addTeaType = teaType => {
  return dispatch =>
    API.post("/teaTypes", teaType, dispatch)
      .then(response => {
        dispatch({
          type: teaTypeActionTypes.ADD_TEATYPE,
          payload: response
        });
      })
      .catch(console.log);
};

// Edit TeaType
export const editTeaType = teaType => {
  return dispatch =>
    API.patch(`/teaTypes/${teaType.id}`, teaType, dispatch)
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
    return API.delete(`/teaTypes/${teaTypeID}`, dispatch)
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
export const getTeaTypes = userID => {
  return dispatch =>
    API.get(`/teaTypes?userID=${userID}`, dispatch)
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
