import loadingReducer from "../loadingReducers";

test("returns loading state when the action type is LOADING", () => {
  const reducer = loadingReducer(undefined, {
    type: "LOADING",
    payload: "complete"
  });
  expect(reducer).toEqual({
    loading: "complete"
  });
});
