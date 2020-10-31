import { createSelector } from "reselect";

export const selectSingleTeaType = createSelector(
  state => state.teaTypes.teaTypeIDs,
  state => state.teaTypes.allTeaTypes,
  state => state.teas.allTeas,
  (state, props) => (props.match ? props.match.params.id : props.modalID),
  (teaTypeIDs, allTeaTypes, allTeas, propsID) => {
    if (teaTypeIDs.length > 0) {
      let currentTeaType = teaTypeIDs.find(typeID => {
        return allTeaTypes[typeID].id === allTeas[propsID].teaType;
      });
      return currentTeaType ? allTeaTypes[currentTeaType] : {};
    }
  }
);
