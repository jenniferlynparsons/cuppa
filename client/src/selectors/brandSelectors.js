import React from "react";

export const selectBrands = React.memo(state => {
  return state.teaIDs.map(id => {
    return state.allTeas[id].brand;
  });
});
