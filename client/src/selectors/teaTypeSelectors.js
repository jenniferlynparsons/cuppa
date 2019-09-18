import { createSelector } from "reselect";

export const teaTypeIDsSelector = createSelector(
  state => state.teaTypes.teaTypeIDs,
  teaTypeIDs => teaTypeIDs
);

export const allTeaTypesSelector = createSelector(
  state => state.teaTypes.allTeaTypes,
  allTeaTypes => allTeaTypes
);

export const selectTeaTypes = createSelector(
  teaTypeIDsSelector,
  allTeaTypesSelector,
  (teaTypeIDs, allTeaTypes) => teaTypeIDs.map(typeID => allTeaTypes[typeID])
);
