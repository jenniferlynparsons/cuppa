export default (state = "off", action) => {
	switch (action.type) {
		case "EDIT_TEA_FLASH":
			return (state = action.payload);
	}
	return state;
};
