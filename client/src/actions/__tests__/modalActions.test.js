import { makeMockStore } from "../../test/testUtils";
import { setModalID } from "../modalActions";

const store = makeMockStore({});

const mockID = "5c63123a4c318b298b23d4";

beforeEach(() => {
  store.clearActions();
});

describe("setModalID", () => {
  test("returns an object", () => {
    expect(setModalID(mockID)).toBeInstanceOf(Object);
  });
  test("it returns the SET_TIMER_ID action type and payload", () => {
    store.dispatch(setModalID("SET_TIMER_ID", mockID));
    expect(store.getActions()[0].payload).toEqual(mockID);
    expect(store.getActions()[0].type).toEqual("SET_TIMER_ID");
  });
});
