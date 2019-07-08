export default (state = { allTeas: {}, teaIDs: [] }, action) => {
	switch (action.type) {
		case "ADD_TEA": {
			let addAllTeas = {
				...state.allTeas,
				[action.payload.id]: action.payload
			};

			let addIDsArr = [...new Set([...state.teaIDs, action.payload.id])];
			return { ...state, allTeas: addAllTeas, teaIDs: addIDsArr };
		}
		case "EDIT_TEA": {
			let updateAllTeas = {
				...state.allTeas,
				[action.payload.id]: action.payload
			};
			return { ...state, allTeas: updateAllTeas };
		}
		case "DELETE_TEA": {
			let deleteIDsArr = state.teaIDs.filter(teaID => teaID !== action.payload);
			return { ...state, teaIDs: deleteIDsArr };
		}
		case "GET_TEAS": {
			let getAllTeas = {};
			let getIDsArr = [];

			action.payload.forEach(tea => {
				getAllTeas[tea.id] = tea;
				getIDsArr.push(tea.id);
			});
			return {
				...state,
				allTeas: getAllTeas,
				teaIDs: getIDsArr
			};
		}
		default:
			return state;
	}
};
