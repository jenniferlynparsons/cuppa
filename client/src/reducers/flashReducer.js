export default (state = false, action) => {
  switch (action.type) {
    case "EDIT_TEA_FLASH":
      return (state = action.payload);
  }
  return state;
};
