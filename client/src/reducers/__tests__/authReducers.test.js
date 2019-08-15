import authReducer from "../authReducers";
import storeFixture from "../../test/__fixtures__/storeFixture";

const userLoadingPayload = {
  loading: true
};

const userLoadingState = {
  isAuthenticated: false,
  user: {},
  loading: true
};

describe("auth reducer", () => {
  test("returns default state when there is no action type", () => {
    const reducer = authReducer(storeFixture.loggedOutStore.auth, {});
    expect(reducer).toEqual(storeFixture.loggedOutStore.auth);
  });

  test("returns loading state true when the action type is 'USER_LOADING'", () => {
    const reducer = authReducer(storeFixture.loggedOutStore.auth, {
      type: "USER_LOADING",
      payload: userLoadingPayload.loading
    });
    expect(reducer).toEqual(userLoadingState);
  });

  test("returns logged in user state when the action type is 'SET_CURRENT_USER'", () => {
    const reducer = authReducer(storeFixture.loggedOutStore.auth, {
      type: "SET_CURRENT_USER",
      payload: storeFixture.loggedInStore.auth.user
    });
    expect(reducer).toEqual(storeFixture.loggedInStore.auth);
  });
});
