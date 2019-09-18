import { createSelector } from "reselect";

export const teaIDsSelector = createSelector(
  state => state.teas.teaIDs,
  teaIDs => teaIDs
);
export const allTeasSelector = createSelector(
  state => state.teas.allTeas,
  allTeas => allTeas
);

export const selectBrands = createSelector(
  teaIDsSelector,
  allTeasSelector,
  (teaIDs, allTeas) => teaIDs.map(id => allTeas[id].brand)
);

export const selectTimerTea = createSelector(
  allTeasSelector,
  (state, props) => props.timerID,
  (allTeas, id) => allTeas[id]
);
