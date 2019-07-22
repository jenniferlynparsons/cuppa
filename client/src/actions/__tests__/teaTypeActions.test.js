import { makeMockStore } from "../../test/testUtils";
import storeFixture from "../../test/__fixtures__/storeFixture";
import teaTypeFixture from "../../test/__fixtures__/teaTypeFixture";
import API from "../../lib/api";
import {
  addTeaType,
  editTeaType,
  deleteTeaType,
  getTeaTypes
} from "../teaTypeActions";

const store = makeMockStore(storeFixture.basicStore);

// Required for the API mock scope (must have `mock` prefix)
const mockteaTypePost = teaTypeFixture.teaPostResponse;
const mockteaTypePut = teaTypeFixture.teaPutResponse;
const mockteaTypeGet = teaTypeFixture.teaGetResponse;
jest.mock("../../lib/api", () => {
  return {
    post: jest.fn(() => Promise.resolve(mockteaTypePost)),
    put: jest.fn(() => Promise.resolve(mockteaTypePut)),
    delete: jest.fn(() => Promise.resolve()),
    get: jest.fn(() => Promise.resolve(mockteaTypeGet))
  };
});

beforeEach(() => {
  store.clearActions();
});

describe("addTeaType", () => {
  test("returns a function", () => {
    expect(addTeaType(teaTypeFixture.reducerAddTeaType)).toBeInstanceOf(
      Function
    );
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(addTeaType(teaTypeFixture.reducerAddTeaType));
    expect(API.post).toHaveBeenCalledWith(
      "/teaTypes/new-tea-type",
      teaTypeFixture.reducerAddTeaType
    );
  });
  test("it returns the ADD_TEA action type and payload", async () => {
    await store.dispatch(addTeaType(teaTypeFixture.reducerAddTeaType));
    expect(store.getActions()[0].payload).toEqual(
      teaTypeFixture.teaPostResponse
    );
    expect(store.getActions()[0].type).toEqual("ADD_TEATYPE");
  });
});

describe("editTeaType", () => {
  test("returns a function", () => {
    expect(editTeaType(teaTypeFixture.reducerEditTeaType)).toBeInstanceOf(
      Function
    );
  });
  test("it calls 'put' on the API with the correct path and the tea data", () => {
    store.dispatch(editTeaType(teaTypeFixture.reducerEditTeaType));
    expect(API.put).toHaveBeenCalledWith(
      "/teaTypes/update-tea-type",
      teaTypeFixture.reducerEditTeaType
    );
  });
  test("it returns the EDIT_TEA action type and payload", async () => {
    await store.dispatch(editTeaType(teaTypeFixture.reducerEditTeaType));
    expect(store.getActions()[0].payload).toEqual(
      teaTypeFixture.teaPutResponse
    );
    expect(store.getActions()[0].type).toEqual("EDIT_TEATYPE");
  });
});

describe("deleteTeaType", () => {
  test("returns a function", () => {
    expect(
      deleteTeaType(storeFixture.basicStore.teas.teaIDs[1])
    ).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(deleteTeaType(storeFixture.basicStore.teas.teaIDs[1]));
    expect(API.delete).toHaveBeenCalledWith(
      `/teaTypes/delete-tea-type/${storeFixture.basicStore.teas.teaIDs[1]}`
    );
  });
  test("it returns the DELETE_TEA action type and payload", async () => {
    await store.dispatch(deleteTeaType(storeFixture.basicStore.teas.teaIDs[1]));
    expect(store.getActions()[0].payload).toEqual(
      storeFixture.basicStore.teas.teaIDs[1]
    );
    expect(store.getActions()[0].type).toEqual("DELETE_TEATYPE");
  });
});

describe("getTeaTypes", () => {
  test("returns a function", () => {
    expect(getTeaTypes(storeFixture.basicStore.teaTypes)).toBeInstanceOf(
      Function
    );
  });
  test("it calls 'post' on the API with the correct path and the tea type data", () => {
    store.dispatch(getTeaTypes(storeFixture.basicStore.userID));
    expect(API.get).toHaveBeenCalledWith(
      `/teaTypes/teaTypesList/${storeFixture.basicStore.userID}`
    );
  });
  test("it returns the GET_TEAS action type and payload", async () => {
    await store.dispatch(getTeaTypes());
    expect(store.getActions()[0].payload).toEqual(teaTypeFixture.basicTeaTypes);
    expect(store.getActions()[0].type).toEqual("GET_TEATYPES");
  });
});
