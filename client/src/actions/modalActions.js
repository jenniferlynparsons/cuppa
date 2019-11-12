import { modalActionTypes } from "../lib/actionTypes";

export const setModalID = (reducerName, id) => {
  return dispatch => {
    return dispatch({
      type: modalActionTypes[reducerName],
      payload: id
    });
  };
};
