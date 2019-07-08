import errorReducer from "../errorReducers";

describe("error reducer", () => {
	test("returns default state when there is no action type", () => {
		const reducer = errorReducer(undefined, {});
		expect(reducer).toEqual({});
	});
	test("returns error state when action.payload is not empty", () => {
		const reducer = errorReducer(undefined, {
			type: "GET_ERRORS",
			payload: { error: "There was an error" }
		});
		expect(reducer).toEqual({ error: "There was an error" });
	});
});
