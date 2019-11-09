import modalReducer from "../modalReducers";

describe("flash reducer", () => {
  test("returns default state when there is no action type", () => {
    const reducer = modalReducer(undefined, {});
    expect(reducer).toEqual({});
  });
  test("returns timerID state when action.payload exists", () => {
    const reducer = modalReducer(undefined, {
      type: "SET_TIMER_ID",
      payload: "25070e52-e635-4883-ae9b-583113573b9f"
    });
    expect(reducer).toEqual({
      timerID: "25070e52-e635-4883-ae9b-583113573b9f"
    });
  });
});
