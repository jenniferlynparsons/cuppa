export const selectBrands = state => {
  return state.teaIDs.map(id => {
    return state.allTeas[id].brand;
  });
};
