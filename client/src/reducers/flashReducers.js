export default (state = "off", action) => {
  switch (action.type) {
    case "EDIT_TEA_FLASH":
      console.log(action.payload);
      return (state = action.payload);
  }
  return state;
};
