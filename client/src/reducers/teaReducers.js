export default (state = {}, action) => {
  switch (action.type) {
    case "ADD_TEA":
    case "EDIT_TEA":
      return { ...state, ...{ [action.payload.id]: action.payload } };

    case "DELETE_TEA":
      const { [action.payload.id]: val, ...newState } = state;
      return newState;

    case "GET_TEAS":
      return { ...state, ...action.payload };
  }
  return state;
};
