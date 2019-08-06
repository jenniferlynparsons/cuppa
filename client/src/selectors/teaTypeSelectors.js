export const selectTeaTypes = state => {
  return state.teaTypeIDs.map(typeID => {
    return state.allTeaTypes[typeID];
  });
};

export const selectSingleTeaType = (state, ownProps) => {
  if (state.teaTypes.teaTypeIDs.length > 0) {
    let currentTeaType = state.teaTypes.teaTypeIDs.find(typeID => {
      return (
        state.teaTypes.allTeaTypes[typeID].id ===
        state.teas.allTeas[ownProps.match.params.id].teaType
      );
    });
    return currentTeaType ? state.teaTypes.allTeaTypes[currentTeaType] : {};
  }
};
