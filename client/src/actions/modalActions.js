import { modalActionTypes } from "../lib/actionTypes";

export const setTimerID = id => {
  return dispatch => {
    return dispatch({
      type: modalActionTypes.SET_TIMER_ID,
      payload: id
    });
  };
};
