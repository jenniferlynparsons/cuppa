import { modalActionTypes } from "../lib/actionTypes";

export const setModalID = (id) => {
  return dispatch => {
    return dispatch({
      type: modalActionTypes.SET_MODAL_ID,
      payload: id
    });
  };
};
