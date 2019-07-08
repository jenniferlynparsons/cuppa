import teaReducer from "../teaReducers";
import storeFixture from "../../test/__fixtures__/storeFixture";
import teaFixture from "../../test/__fixtures__/teaFixture";

describe("tea reducer", () => {
	test("returns default state when there is no action type", () => {
		const reducer = teaReducer(undefined, {});

		expect(reducer).toEqual(teaFixture.emptyState);
	});

	test("returns default state when the action type is 'GET_TEAS'", () => {
		const reducer = teaReducer(undefined, {
			type: "GET_TEAS",
			payload: teaFixture.getTeasPayload
		});

		expect(reducer).toEqual(storeFixture.basicStore.teas);
	});

	test("returns a state with a new tea when the action type is 'ADD_TEA'", () => {
		const reducer = teaReducer(storeFixture.basicStore.teas, {
			type: "ADD_TEA",
			payload: teaFixture.addTeaPayload
		});

		expect(reducer).toEqual(storeFixture.addedStore.teas);
	});

	test("returns a state with an updated tea when the action type is 'EDIT_TEA'", () => {
		const reducer = teaReducer(storeFixture.basicStore.teas, {
			type: "EDIT_TEA",
			payload: teaFixture.editTeaPayload
		});

		expect(reducer).toEqual(storeFixture.updatedStore.teas);
	});

	test("returns a state with an updated teaIDs array when the action type is 'DELETE_TEA'", () => {
		const reducer = teaReducer(storeFixture.basicStore.teas, {
			type: "DELETE_TEA",
			payload: teaFixture.deleteTeaPayload
		});

		expect(reducer).toEqual(storeFixture.deletedStore.teas);
	});
});
