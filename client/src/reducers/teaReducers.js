export default (state = { allTeas: {}, teaIDs: [] }, action) => {
  switch (action.type) {
    case "ADD_TEA":
    case "EDIT_TEA":
      let updateAllTeas = {
        ...state.allTeas,
        ...{ [action.payload.id]: action.payload }
      };
      let updateIDsArr = [...state.teaIDs, action.payload.id];

      return { allTeas: updateAllTeas, teaIDs: updateIDsArr };

    case "DELETE_TEA":
      let { [action.payload.id]: val, ...newAllTeas } = state.allTeas;
      let newIDsArr = state.teaIDs.filter(teaID => teaID !== action.payload.id);

      return { allTeas: newAllTeas, teaIDs: newIDsArr };

    case "GET_TEAS":
      return { ...state, ...action.payload };
  }
  return state;
};
