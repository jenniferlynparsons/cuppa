import { createSelector } from "reselect";

export const selectBrands = createSelector(
  state => state.teas.teaIDs,
  state => state.teas.allTeas,
  (teaIDs, allTeas) => teaIDs.map(id => allTeas[id].brand)
);
