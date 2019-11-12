export default (state = {}, action) => {
  switch (action.type) {
    case "SET_TIMER_ID": {
      return { ...state, timerID: action.payload };
    }
    case "SET_TEATYPE_ID": {
      return { ...state, teaTypeID: action.payload };
    }
    default:
      return state;
  }
};
