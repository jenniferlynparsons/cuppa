import { makeMockStore } from "../../test/testUtils";
import storeFixture from "../../test/__fixtures__/storeFixture";
import teaFixture from "../../test/__fixtures__/teaFixture";
import API from "../../lib/api";
import { addTea, editTea, deleteTea, getTeas } from "../teaActions";

const store = makeMockStore(storeFixture.basicStore);

// Required for the API mock scope (must have `mock` prefix)
const mockteaPost = teaFixture.teaPostResponse;
const mockteaPut = teaFixture.teaPutResponse;
const mockteaGet = teaFixture.teaGetResponse;
jest.mock("../../lib/api", () => {
  return {
    post: jest.fn(() => Promise.resolve(mockteaPost)),
    put: jest.fn(() => Promise.resolve(mockteaPut)),
    delete: jest.fn(() => Promise.resolve()),
    get: jest.fn(() => Promise.resolve(mockteaGet))
  };
});

beforeEach(() => {
  store.clearActions();
});

describe("addTea", () => {
  test("returns a function", () => {
    expect(addTea(teaFixture.reducerAddTea)).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(addTea(teaFixture.reducerAddTea));
    expect(API.post).toHaveBeenCalledWith(
      "/teas/new-tea",
      teaFixture.reducerAddTea
    );
  });
  test("it returns the ADD_TEA action type and payload", async () => {
    await store.dispatch(addTea(teaFixture.reducerAddTea));
    expect(store.getActions()[0].payload).toEqual(teaFixture.teaPostResponse);
    expect(store.getActions()[0].type).toEqual("ADD_TEA");
  });
});

describe("editTea", () => {
  test("returns a function", () => {
    expect(editTea(teaFixture.reducerEditTea)).toBeInstanceOf(Function);
  });
  test("it calls 'put' on the API with the correct path and the tea data", () => {
    store.dispatch(editTea(teaFixture.reducerEditTea));
    expect(API.put).toHaveBeenCalledWith(
      "/teas/update-tea",
      teaFixture.reducerEditTea
    );
  });
  test("it returns the EDIT_TEA action type and payload", async () => {
    await store.dispatch(editTea(teaFixture.reducerEditTea));
    expect(store.getActions()[0].payload).toEqual(teaFixture.teaPutResponse);
    expect(store.getActions()[0].type).toEqual("EDIT_TEA");
  });
});

describe("deleteTea", () => {
  test("returns a function", () => {
    expect(deleteTea(storeFixture.basicStore.teas.teaIDs[1])).toBeInstanceOf(
      Function
    );
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(deleteTea(storeFixture.basicStore.teas.teaIDs[1]));
    expect(API.delete).toHaveBeenCalledWith(
      `/teas/delete-tea/${storeFixture.basicStore.teas.teaIDs[1]}`
    );
  });
  test("it returns the DELETE_TEA action type and payload", async () => {
    await store.dispatch(deleteTea(storeFixture.basicStore.teas.teaIDs[1]));
    expect(store.getActions()[0].payload).toEqual(
      storeFixture.basicStore.teas.teaIDs[1]
    );
    expect(store.getActions()[0].type).toEqual("DELETE_TEA");
  });
});

describe("getTeas", () => {
  test("returns a function", () => {
    expect(getTeas(storeFixture.basicStore.userID)).toBeInstanceOf(Function);
  });
  test("it calls 'post' on the API with the correct path and the tea data", () => {
    store.dispatch(getTeas(storeFixture.basicStore.userID));
    expect(API.get).toHaveBeenCalledWith(
      `/teas/teasList/${storeFixture.basicStore.userID}`
    );
  });
  test("it returns the GET_TEAS action type and payload", async () => {
    await store.dispatch(getTeas(storeFixture.basicStore.userID));
    expect(store.getActions()[0].payload).toEqual(teaFixture.teaGetResponse);
    expect(store.getActions()[0].type).toEqual("GET_TEAS");
  });
});
