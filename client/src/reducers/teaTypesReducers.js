export default (state = { allTeaTypes: {}, teaTypeIDs: [] }, action) => {
  switch (action.type) {
    case "ADD_TEATYPE": {
      let addAllTeaTypes = {
        ...state.allTeaTypes,
        [action.payload.id]: action.payload
      };

      let addIDsArr = [...new Set([...state.teaTypeIDs, action.payload.id])];
      return { ...state, allTeaTypes: addAllTeaTypes, teaTypeIDs: addIDsArr };
    }
    case "EDIT_TEATYPE": {
      console.log(`edit action.payload: ${action.payload}`);
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
        allTeaTypes: getAllTeaTypes,
        teaTypeIDs: getIDsArr
      };
    }
    default:
      return state;
  }
};
