import { createSelector } from "reselect";

export const selectTeaTypes = createSelector(
  state => state.teaTypes.teaTypeIDs,
  state => state.teaTypes.allTeaTypes,
  (teaTypeIDs, allTeaTypes) => teaTypeIDs.map(typeID => allTeaTypes[typeID])
);
