import API from "../lib/api";
import { teaTypeActionTypes } from "../lib/actionTypes";

// Add TeaType
export const addTeaType = teaType => {
  teaType.id = teaType.teaTypeID;
  return dispatch => {
    return API.post("/teaTypes/new-tea-type", teaType)
      .then(response => {
        dispatch({
          type: teaTypeActionTypes.ADD_TEATYPE,
          payload: response
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Edit TeaType
export const editTeaType = teaType => {
  teaType.id = teaType.teaTypeID;
  return dispatch => {
    API.put("/teaTypes/update-tea-type", teaType)
      .then(response => {
        dispatch({
          type: teaTypeActionTypes.EDIT_TEATYPE,
          payload: response
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Delete TeaType
export const deleteTeaType = teaTypeID => {
  return dispatch => {
    return API.delete(`/teaTypes/delete-tea-type/${teaTypeID}`)
      .then(() => {
        dispatch({
          type: teaTypeActionTypes.DELETE_TEATYPE,
          payload: teaTypeID
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Get TeaTypes
export const getTeaTypes = listOwner => {
  return dispatch => {
    return API.get(`/teaTypes/teaTypesList/${listOwner}`)
      .then(response => {
        dispatch({
          type: teaTypeActionTypes.GET_TEATYPES,
          payload: response
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

const teaActions = {
  addTeaType,
  editTeaType,
  deleteTeaType,
  getTeaTypes
};

export default teaActions;
