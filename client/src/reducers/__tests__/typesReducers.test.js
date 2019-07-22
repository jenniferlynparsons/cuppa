import teaTypeReducer from "../teaTypesReducers";
import storeFixture from "../../test/__fixtures__/storeFixture";
import teaTypeFixture from "../../test/__fixtures__/teaTypeFixture";

describe("types reducer", () => {
  test("returns default state when there is no action type", () => {
    const reducer = teaTypeReducer(undefined, {});
    expect(reducer).toEqual({ allTeaTypes: {}, teaTypeIDs: [] });
  });

  test("returns default state when the action type is 'GET_TEATYPES'", () => {
    const reducer = teaTypeReducer(undefined, {
      type: "GET_TEATYPES",
      payload: teaTypeFixture.getTeaTypesPayload
    });

    expect(reducer).toEqual(storeFixture.basicStore.teaTypes);
  });

  test("returns a state with a new tea when the action type is 'ADD_TEATYPE'", () => {
    const reducer = teaTypeReducer(storeFixture.basicStore.teaTypes, {
      type: "ADD_TEATYPE",
      payload: teaTypeFixture.addTeaTypePayload
    });

    expect(reducer).toEqual(storeFixture.addedStore.teaTypes);
  });

  test("returns a state with an updated tea when the action type is 'EDIT_TEATYPE'", () => {
    const reducer = teaTypeReducer(storeFixture.basicStore.teaTypes, {
      type: "EDIT_TEATYPE",
      payload: teaTypeFixture.editTeaTypePayload
    });

    expect(reducer).toEqual(storeFixture.updatedStore.teaTypes);
  });

  test("returns a state with an updated teaIDs array when the action type is 'DELETE_TEATYPE'", () => {
    const reducer = teaTypeReducer(storeFixture.basicStore.teaTypes, {
      type: "DELETE_TEATYPE",
      payload: teaTypeFixture.deleteTeaTypePayload
    });

    expect(reducer).toEqual(storeFixture.deletedStore.teaTypes);
  });
});
