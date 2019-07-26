import flashReducer from "../flashReducers";

describe("flash reducer", () => {
  test("returns default state when there is no action type", () => {
    const reducer = flashReducer(undefined, {});
    expect(reducer).toEqual("off");
  });
  test("returns 'on' state when action.payload is 'on'", () => {
    const reducer = flashReducer(undefined, {
      type: "EDIT_FLASH",
      payload: "success"
    });
    expect(reducer).toEqual("success");
  });
});
