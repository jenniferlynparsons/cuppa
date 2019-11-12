import API from "../lib/api";
import { teaTypeActionTypes } from "../lib/actionTypes";

// Add TeaType
export const addTeaType = (userID, teaType) => {
  return dispatch =>
    API.post(`/users/${userID}/teaTypes`, teaType, dispatch)
      .then(response => {
        console.log(response);
        dispatch({
          type: teaTypeActionTypes.ADD_TEATYPE,
          payload: response
        });
      })
      .catch(console.log);
};

// Edit TeaType
export const editTeaType = (userID, teaType) => {
  return dispatch =>
    API.patch(`/users/${userID}/teaTypes/${teaType.id}`, teaType, dispatch)
      .then(response => {
        dispatch({
          type: teaTypeActionTypes.EDIT_TEATYPE,
          payload: response
        });
      })
      .catch(console.log);
};

// Delete TeaType
export const deleteTeaType = (userID, teaTypeID) => {
  return dispatch => {
    return API.delete(`/users/${userID}/teaTypes/${teaTypeID}`, dispatch)
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
    API.get(`/users/${userID}/teaTypes`, dispatch)
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
