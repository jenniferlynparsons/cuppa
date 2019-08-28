export const setTimerID = id => {
  return dispatch => {
    return dispatch({
      type: "SET_TIMER_ID",
      payload: id
    });
  };
};
