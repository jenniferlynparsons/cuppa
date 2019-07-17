import { makeMockStore } from "../../test/testUtils";
import storeFixture from "../../test/__fixtures__/storeFixture";
import teaTypeFixture from "../../test/__fixtures__/teaTypeFixture";
import API from "../../lib/api";
import { getTeaTypes } from "../teaTypeActions";

const store = makeMockStore(storeFixture.basicStore);

// Required for the API mock scope (must have `mock` prefix)

const mockteaGet = teaTypeFixture.teaGetResponse;
jest.mock("../../lib/api", () => {
  return {
    get: jest.fn(() => Promise.resolve(mockteaGet))
  };
});

beforeEach(() => {
  store.clearActions();
});

describe("getTeas", () => {
  test("returns a function", () => {
    expect(getTeaTypes(storeFixture.basicStore.teaTypes)).toBeInstanceOf(
      Function
    );
  });
  test("it calls 'post' on the API with the correct path and the tea type data", () => {
    store.dispatch(getTeaTypes(storeFixture.basicStore.teaTypes));
    expect(API.get).toHaveBeenCalledWith(`/teaTypes/teaTypeList`);
  });
  test("it returns the GET_TEAS action type and payload", async () => {
    await store.dispatch(getTeaTypes());
    expect(store.getActions()[0].payload).toEqual(teaTypeFixture.basicTeaTypes);
    expect(store.getActions()[0].type).toEqual("GET_TEATYPES");
  });
});
