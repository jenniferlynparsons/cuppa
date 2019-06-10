import authReducer from "../authReducers";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const userLoadingPayload = {
  loading: true
};

const userLoadingState = {
  isAuthenticated: false,
  user: {},
  loading: true
};

const userLoggedInPayload = {
  exp: 1590017571,
  iat: 1558460645,
  id: "5c6313a4c318bb62298b23d4",
  name: "JP"
};

const expectedLoggedInState = {
  isAuthenticated: true,
  loading: false,
  user: {
    exp: 1590017571,
    iat: 1558460645,
    id: "5c6313a4c318bb62298b23d4",
    name: "JP"
  }
};

describe("auth reducer", () => {
  test("returns default state when there is no action type", () => {
    const reducer = authReducer(initialState, {});
    expect(reducer).toEqual(initialState);
  });

  test("returns loading state true when the action type is 'USER_LOADING'", () => {
    const reducer = authReducer(initialState, {
      type: "USER_LOADING",
      payload: userLoadingPayload
    });
    expect(reducer).toEqual(userLoadingState);
  });

  test("returns logged in user state when the action type is 'SET_CURRENT_USER'", () => {
    const reducer = authReducer(initialState, {
      type: "SET_CURRENT_USER",
      payload: userLoggedInPayload
    });
    expect(reducer).toEqual(expectedLoggedInState);
  });
});
