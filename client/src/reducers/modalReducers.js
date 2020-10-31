export default (state = {}, action) => {
  switch (action.type) {
    case "SET_MODAL_ID": {
      return { ...state, modalID: action.payload };
    }
    default:
      return state;
  }
};
