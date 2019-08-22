export default (state = "off", action) => {
  switch (action.type) {
    case "EDIT_FLASH":
      return (state = action.payload);
    case "CLEAR_FLASH":
      return (state = "off");
  }
  return state;
};
