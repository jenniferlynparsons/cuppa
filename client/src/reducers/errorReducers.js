const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SERVER_ERRORS": {
      return {
        ...state,
        serverErrors: action.payload
      };
    }
    default:
      return state;
  }
}
