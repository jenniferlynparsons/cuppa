import { merge } from 'lodash';

export default (state = [], action) => {
  switch (action.type) {
    case "ADD_TEA":
      return [...state, action.payload];
    case "DELETE_TEA":
      return state.filter(t => t.id !== action.payload.id);
    case "EDIT_TEA":
      return state.map(t => (t.id === action.payload.id ? action.payload : t));
    case "GET_TEAS":
    // TODO: Data must be normalized.
      return merge([], state, action.payload);
  }
  return state;
};
