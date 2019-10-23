import { makeMockStore } from "../../test/testUtils";
import { setTimerID } from "../timerActions";

const store = makeMockStore({});

const mockID = "5c6313a4c318bb62298b23d4";

beforeEach(() => {
  store.clearActions();
});

describe("setTimerID", () => {
  test("returns an object", () => {
    expect(setTimerID(mockID)).toBeInstanceOf(Object);
  });
  test("it returns the SET_TIMER_ID action type and payload", () => {
    store.dispatch(setTimerID(mockID));
    expect(store.getActions()[0].payload).toEqual(mockID);
    expect(store.getActions()[0].type).toEqual("SET_TIMER_ID");
  });
});
