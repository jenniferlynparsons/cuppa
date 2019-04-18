export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_TEA":
    case "EDIT_TEA":
      return { ...state, ...{ [action.payload.id]: action.payload } };
    case "DELETE_TEA":
      return Object.keys(state).reduce((result, key) => {
        if (key !== action.payload.id) {
          result[key] = state[key];
        }
        return result;
      }, {});
    case "GET_TEAS":
      return { ...state, ...action.payload };
  }
  return state;
};
