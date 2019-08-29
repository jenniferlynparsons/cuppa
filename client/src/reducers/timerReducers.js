export default (state = {}, action) => {
  switch (action.type) {
    case "SET_TIMER_ID": {
      return { ...state, timerID: action.payload };
    }
    default:
      return state;
  }
};
