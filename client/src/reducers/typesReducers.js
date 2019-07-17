// export default (state = ["Black", "Green", "White", "Herbal"]) => {
//   return state;
// };

export default (state = { allTeaTypes: {}, teaTypeIDs: [] }, action) => {
  switch (action.type) {
    case "ADD_TEATYPE": {
      let addAllTeaTypes = {
        ...state.allTeaTypes,
        [action.payload.id]: action.payload
      };

      let addIDsArr = [...new Set([...state.teaTypeIDs, action.payload.id])];
      return { ...state, allTeaTypes: addAllTeaTypes, teaIDs: addIDsArr };
    }
    case "EDIT_TEATYPE": {
      let updateAllTeaTypes = {
        ...state.allTeaTypes,
        [action.payload.id]: action.payload
      };
      return { ...state, allTeaTypes: updateAllTeaTypes };
    }
    case "DELETE_TEATYPE": {
      let deleteIDsArr = state.teaTypeIDs.filter(
        teaTypeID => teaTypeID !== action.payload
      );
      return { ...state, teaTypeIDs: deleteIDsArr };
    }
    case "GET_TEATYPES": {
      let getAllTeaTypes = {};
      let getIDsArr = [];

      action.payload.forEach(teaType => {
        getAllTeaTypes[teaType.id] = teaType;
        getIDsArr.push(teaType.id);
      });
      return {
        ...state,
        allTeas: getAllTeaTypes,
        teaIDs: getIDsArr
      };
    }
    default:
      return state;
  }
};
