import { createSelector } from "reselect";

const teaIDs = state => state.teaIDs;
const allTeas = state => state.allTeas;

export const selectBrands = createSelector(
  teaIDs,
  allTeas,
  (teaIDs, allTeas) => teaIDs.map(id => allTeas[id].brand)
);
