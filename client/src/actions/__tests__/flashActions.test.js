import { makeMockStore } from "../../test/testUtils";
import { editFlash, clearFlash } from "../flashActions";

const store = makeMockStore({});
const mockStatus = "success";

beforeEach(() => {
  store.clearActions();
});

describe("editFlash", () => {
  test("returns an object", () => {
    expect(editFlash(mockStatus)).toBeInstanceOf(Object);
  });
  test("it returns the EDIT_FLASH action type and payload", () => {
    store.dispatch(editFlash(mockStatus));
    expect(store.getActions()[0].payload).toEqual(mockStatus);
    expect(store.getActions()[0].type).toEqual("EDIT_FLASH");
  });
});

describe("clearFlash", () => {
  test("returns an object", () => {
    expect(clearFlash()).toBeInstanceOf(Object);
  });
  test("it returns the CLEAR_FLASH action type", () => {
    store.dispatch(clearFlash());
    expect(store.getActions()[0].type).toEqual("CLEAR_FLASH");
  });
});
