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
  test("it returns the SET_MODAL_ID action type and payload", () => {
    store.dispatch(setModalID(mockID));
    expect(store.getActions()[0].payload).toEqual(mockID);
    expect(store.getActions()[0].type).toEqual("SET_MODAL_ID");
  });
});
