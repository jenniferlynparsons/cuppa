import { makeMockStore } from "../../test/testUtils";
import { editFlash } from "../flashActions";

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
