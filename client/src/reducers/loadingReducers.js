export default (state = { loading: "complete" }, action) => {
  switch (action.type) {
    case "LOADING": {
      return { ...state, loading: action.payload };
    }
    default:
      return state;
  }
};
