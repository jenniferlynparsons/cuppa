import { makeMockStore } from "../../test/testUtils";
import storeFixture from "../../test/__fixtures__/storeFixture";
import teaFixture from "../../test/__fixtures__/teaFixture";
import API from "../../lib/api";
import { globalAddTea, globalEditTea, globalDeleteTea, globalGetTeas } from "../globalTeaActions";

const store = makeMockStore(storeFixture.basicStore);

// Required for the API mock scope (must have `mock` prefix)
const mockteaPost = teaFixture.teaPostResponse;
const mockteaPatch = teaFixture.teaPatchResponse;
const mockteaGet = teaFixture.teaGetResponse;
jest.mock("../../lib/api", () => {
  return {
    post: jest.fn(() => Promise.resolve(mockteaPost)),
    patch: jest.fn(() => Promise.resolve(mockteaPatch)),
    delete: jest.fn(() => Promise.resolve()),
    get: jest.fn(() => Promise.resolve(mockteaGet))
  };
});

beforeEach(() => {
  store.clearActions();
});

describe("globalAddTea", () => {
  test("returns a function", () => {
    expect(globalAddTea(teaFixture.reducerAddTea)).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(globalAddTea(teaFixture.reducerAddTea));
    let spy = jest.spyOn(API, "post");
    expect(spy).toHaveBeenCalled();
  });
  test("it returns the ADD_TEA action type and payload", async () => {
    await store.dispatch(globalAddTea(teaFixture.reducerAddTea));
    expect(store.getActions()[0].payload).toEqual(teaFixture.teaPostResponse);
    expect(store.getActions()[0].type).toEqual("ADD_TEA");
  });
});

describe("globalEditTea", () => {
  test("returns a function", () => {
    expect(globalEditTea(teaFixture.reducerEditTea)).toBeInstanceOf(Function);
  });
  test("it calls 'patch' on the API with the correct path and the tea data", () => {
    store.dispatch(globalEditTea(teaFixture.reducerEditTea));
    let spy = jest.spyOn(API, "patch");
    expect(spy).toHaveBeenCalled();
  });
  test("it returns the EDIT_TEA action type and payload", async () => {
    await store.dispatch(globalEditTea(teaFixture.reducerEditTea));
    expect(store.getActions()[0].payload).toEqual(teaFixture.teaPatchResponse);
    expect(store.getActions()[0].type).toEqual("EDIT_TEA");
  });
});

describe("globalDeleteTea", () => {
  test("returns a function", () => {
    expect(globalDeleteTea(storeFixture.basicStore.teas.teaIDs[1])).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(globalDeleteTea(storeFixture.basicStore.teas.teaIDs[1]));
    let spy = jest.spyOn(API, "delete");
    expect(spy).toHaveBeenCalled();
  });
  test("it returns the DELETE_TEA action type and payload", async () => {
    await store.dispatch(globalDeleteTea(storeFixture.basicStore.teas.teaIDs[1]));
    expect(store.getActions()[0].payload).toEqual(storeFixture.basicStore.teas.teaIDs[1]);
    expect(store.getActions()[0].type).toEqual("DELETE_TEA");
  });
});

describe("globalGetTeas", () => {
  test("returns a function", () => {
    expect(globalGetTeas(storeFixture.basicStore.userID)).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(globalGetTeas(storeFixture.basicStore.auth.user.id));
    let spy = jest.spyOn(API, "get");
    expect(spy).toHaveBeenCalled();
  });
  test("it returns the GET_TEAS action type and payload", async () => {
    await store.dispatch(globalGetTeas(storeFixture.basicStore.userID));
    expect(store.getActions()[0].payload).toEqual(teaFixture.teaGetResponse);
    expect(store.getActions()[0].type).toEqual("GET_TEAS");
  });
});
