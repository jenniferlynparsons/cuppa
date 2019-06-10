import { makeMockStore } from "../../test/testUtils";
import authActions from "../authActions";
import jwt_decode from "jwt-decode";
import API from "../../lib/api";
import setAuthToken from "../../lib/setAuthToken";

const store = makeMockStore({
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false
  }
});

const mockLoginData = {
  email: "test@example.com",
  password: "testpassword"
};

const mockRegisterData = {
  name: "JP",
  email: "test@example.com",
  password: "testpassword",
  password2: "testpassword"
};

const mockHistory = {
  length: 10,
  action: "PUSH",
  location: { pathname: "/dashboard", search: "", hash: "", key: "zh4boo" },
  push: jest.fn()
};

const mockResponse = {
  success: true,
  token: "Bearer 5cCI6IkpXVCJ9.oxNTkwNTI4NjA3fQ.1Nd3GGE8"
};

const mockDecodedToken = {
  id: "5c6313a4b62298b23d4",
  name: "JP",
  iat: 1559234664,
  exp: 1590791590
};

let loginAction = authActions.loginAction;
let registerUser = authActions.registerUser;
let logoutUser = authActions.logoutUser;
let setCurrentUser = authActions.setCurrentUser;

// Set up our stubbed auth function
jest.mock("../../lib/setAuthToken", () => jest.fn());

jest.mock("jwt-decode");

// Set up our stubbed API.
jest.mock("../../lib/api", () => ({
  post: jest.fn(() => Promise.resolve(mockResponse))
}));

describe("loginAction", () => {
  test("returns a function", () => {
    expect(loginAction(mockLoginData)).toBeInstanceOf(Function);
  });

  describe("dispatching the returned function", () => {
    test("it calls 'post' on the API with the correct path and the user data", () => {
      store.dispatch(loginAction(mockLoginData));
      expect(API.post).toHaveBeenCalledWith("/users/login", mockLoginData);
    });

    describe("when the POST call is successful", () => {
      test("it sets the JWT token to the response from the POST", async () => {
        await store.dispatch(loginAction(mockLoginData));
        expect(setAuthToken).toHaveBeenCalledWith(mockResponse.token);
      });
      test("it decodes the token with jwt_decode", async () => {
        await store.dispatch(loginAction(mockLoginData));
        expect(jwt_decode).toHaveBeenCalledWith(mockResponse.token);
      });
      test("it sets the current user action", async () => {
        let currentUserSpy = jest.spyOn(authActions, "setCurrentUser");
        await store.dispatch(authActions.loginAction(mockLoginData));
        expect(currentUserSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe("registerUser", () => {
  test("returns a function", () => {
    expect(registerUser(mockRegisterData)).toBeInstanceOf(Function);
  });

  describe("dispatching the returned function", () => {
    test("it calls 'post' on the API with the correct path and the user data", () => {
      store.dispatch(registerUser(mockRegisterData, mockHistory));
      expect(API.post).toHaveBeenCalledWith(
        "/users/register",
        mockRegisterData
      );
    });

    describe("when the POST call is successful", () => {
      test("it sets the JWT token to the response from the POST", async () => {
        await store.dispatch(registerUser(mockRegisterData, mockHistory));
        expect(setAuthToken).toHaveBeenCalledWith(mockResponse.token);
      });
      test("it decodes the token with jwt_decode", async () => {
        await store.dispatch(registerUser(mockRegisterData, mockHistory));
        expect(jwt_decode).toHaveBeenCalledWith(mockResponse.token);
      });
      test("it sets the current user action", async () => {
        let currentUserSpy = jest.spyOn(authActions, "setCurrentUser");
        await store.dispatch(
          authActions.registerUser(mockRegisterData, mockHistory)
        );
        expect(currentUserSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe("logoutUser", () => {
  test("returns a function", () => {
    expect(logoutUser()).toBeInstanceOf(Function);
  });
  test("it resets the authToken", async () => {
    await store.dispatch(logoutUser());
    expect(setAuthToken).toHaveBeenCalled();
  });
});

describe("setCurrentUser", () => {
  test("returns an object", () => {
    expect(setCurrentUser(mockDecodedToken)).toBeInstanceOf(Object);
  });
  test("it returns the SET_CURRENT_USER action type and decoded payload", () => {
    expect(setCurrentUser(mockDecodedToken)).toEqual({
      type: "SET_CURRENT_USER",
      payload: mockDecodedToken
    });
  });
});
