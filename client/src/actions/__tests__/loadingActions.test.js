import { makeMockStore } from "../../test/testUtils";
import { getLoadingStatus } from "../loadingActions";

const store = makeMockStore({});

beforeEach(() => {
  store.clearActions();
});

describe("getLoadingStatus", () => {
  test("returns an object", () => {
    expect(getLoadingStatus()).toBeInstanceOf(Object);
  });
  test("it returns the LOADING action type", () => {
    store.dispatch(getLoadingStatus());
    expect(store.getActions()[0].type).toEqual("LOADING");
  });
});
