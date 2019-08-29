import { createSelector } from "reselect";
import teaTypeSelectors from "./teaTypeSelectors";
import brandSelectors from "./brandSelectors";

const teaTypeIDs = state => state.teaTypes.teaTypeIDs;
const allTeaTypes = state => state.teaTypes.allTeaTypes;
const allTeas = state => state.teas.allTeas;
// const teaIDs = state => state.teas.teaIDs;

export const selectSingleTeaType = createSelector(
  teaTypeIDs,
  allTeaTypes,
  allTeas,
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

const allSelectors = {
  teaTypeSelectors,
  brandSelectors,
  selectSingleTeaType
};

export default allSelectors;
