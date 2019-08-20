import { createSelector } from "reselect";

export const selectTeaTypes = createSelector(
  state => state.teaTypeIDs,
  state => state.allTeaTypes,
  (teaTypeIDs, allTeaTypes) => teaTypeIDs.map(typeID => allTeaTypes[typeID])
);

export const selectSingleTeaType = createSelector(
  state => state.teaTypes.teaTypeIDs,
  state => state.teaTypes.allTeaTypes,
  state => state.teas.allTeas,
  (state, props) => props.match.params.id,
  (teaTypeIDs, allTeaTypes, allTeas, propsID) => {
    if (teaTypeIDs.length > 0) {
      let currentTeaType = teaTypeIDs.find(typeID => {
        return allTeaTypes[typeID].id === allTeas[propsID].teaType;
      });
      return currentTeaType ? allTeaTypes[currentTeaType] : {};
    }
  }
);
