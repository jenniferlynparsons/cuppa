export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_TEA":
      return { ...state, ...action.payload };
    case "DELETE_TEA":
      return state.filter(t => t.id !== action.payload.id);
    case "EDIT_TEA":
      console.log({ ...state, ...{ [action.payload.id]: action.payload } });
      return { ...state, ...{ [action.payload.id]: action.payload } };
    case "GET_TEAS":
      return { ...state, ...action.payload };
  }
  return state;
};
