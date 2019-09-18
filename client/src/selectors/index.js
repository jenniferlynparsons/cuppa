import { createSelector } from "reselect";
import { teaTypeIDsSelector, allTeaTypesSelector } from "./teaTypeSelectors";
import { allTeasSelector } from "./teaSelectors";

export const selectSingleTeaType = createSelector(
  teaTypeIDsSelector,
  allTeaTypesSelector,
  allTeasSelector,
  (state, props) => (props.match ? props.match.params.id : props.timerID),
  (teaTypeIDs, allTeaTypes, allTeas, propsID) => {
    if (teaTypeIDs.length > 0) {
      let currentTeaType = teaTypeIDs.find(typeID => {
        return allTeaTypes[typeID].id === allTeas[propsID].teaType;
      });
      return currentTeaType ? allTeaTypes[currentTeaType] : {};
    }
  }
);
