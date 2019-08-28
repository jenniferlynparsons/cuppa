import { timerActionTypes } from "../lib/actionTypes";

export const setTimerID = id => {
  return dispatch => {
    return dispatch({
      type: timerActionTypes.SET_TIMER_ID,
      payload: id
    });
  };
};
