import { createSelector } from "reselect";

export const selectTeaTypes = createSelector(
  state => state.teaTypeIDs,
  state => state.allTeaTypes,
  (teaTypeIDs, allTeaTypes) => teaTypeIDs.map(typeID => allTeaTypes[typeID])
);

export const selectSingleTeaType = (state, ownProps) => {
  if (state.teaTypes.teaTypeIDs.length > 0) {
    let currentTeaType = createSelector(
      state => state.teaTypes.teaTypeIDs,
      state => state.teaTypes.allTeaTypes,
      state => state.teas.allTeas,
      (teaTypeIDs, allTeaTypes, allTeas) =>
        teaTypeIDs.find(
          typeID =>
            allTeaTypes[typeID].id === allTeas[ownProps.match.params.id].teaType
        )
    );
    return currentTeaType ? state.teaTypes.allTeaTypes[currentTeaType] : {};
  }
};
