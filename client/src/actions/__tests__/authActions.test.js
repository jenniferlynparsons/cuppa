import { makeMockStore } from "../../test/testUtils";
import authActions from "../authActions";
import jwt_decode from "jwt-decode";
import API from "../../lib/api";
import setAuthToken from "../../lib/setAuthToken";
import dataFixture from "../../test/__fixtures__/dataFixture";

const store = makeMockStore({
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false
  }
});

// Set up our stubbed auth function
jest.mock("../../lib/setAuthToken", () => jest.fn());

jest.mock("jwt-decode");

// this fixes the scope issue for the API mock
let mockResponse = dataFixture.response;
// Set up our stubbed API.
jest.mock("../../lib/api", () => ({
  post: jest.fn(() => Promise.resolve(mockResponse))
}));

describe("loginAction", () => {
  test("returns a function", () => {
    expect(authActions.loginAction(dataFixture.loginData)).toBeInstanceOf(
      Function
    );
  });

  describe("dispatching the returned function", () => {
    test("it calls 'post' on the API with the correct path and the user data", () => {
      store.dispatch(authActions.loginAction(dataFixture.loginData));
      expect(API.post).toHaveBeenCalledWith(
        "/users/login",
        dataFixture.loginData
      );
    });

    describe("when the POST call is successful", () => {
      test("it sets the JWT token to the response from the POST", async () => {
        await store.dispatch(authActions.loginAction(dataFixture.loginData));
        expect(setAuthToken).toHaveBeenCalledWith(dataFixture.response.token);
      });
      test("it decodes the token with jwt_decode", async () => {
        await store.dispatch(authActions.loginAction(dataFixture.loginData));
        expect(jwt_decode).toHaveBeenCalledWith(dataFixture.response.token);
      });
      test("it sets the current user action", async () => {
        let currentUserSpy = jest.spyOn(authActions, "setCurrentUser");
        await store.dispatch(authActions.loginAction(dataFixture.loginData));
        expect(currentUserSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe("registerUser", () => {
  test("returns a function", () => {
    expect(authActions.registerUser(dataFixture.registerData)).toBeInstanceOf(
      Function
    );
  });

  describe("dispatching the returned function", () => {
    test("it calls 'post' on the API with the correct path and the user data", () => {
      store.dispatch(
        authActions.registerUser(dataFixture.registerData, dataFixture.history)
      );
      expect(API.post).toHaveBeenCalledWith(
        "/users/register",
        dataFixture.registerData
      );
    });

    describe("when the POST call is successful", () => {
      test("it sets the JWT token to the response from the POST", async () => {
        await store.dispatch(
          authActions.registerUser(
            dataFixture.registerData,
            dataFixture.history
          )
        );
        expect(setAuthToken).toHaveBeenCalledWith(dataFixture.response.token);
      });
      test("it decodes the token with jwt_decode", async () => {
        await store.dispatch(
          authActions.registerUser(
            dataFixture.registerData,
            dataFixture.history
          )
        );
        expect(jwt_decode).toHaveBeenCalledWith(dataFixture.response.token);
      });
      test("it sets the current user action", async () => {
        let currentUserSpy = jest.spyOn(authActions, "setCurrentUser");
        await store.dispatch(
          authActions.registerUser(
            dataFixture.registerData,
            dataFixture.history
          )
        );
        expect(currentUserSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe("logoutUser", () => {
  test("returns a function", () => {
    expect(authActions.logoutUser()).toBeInstanceOf(Function);
  });
  test("it resets the authToken", async () => {
    await store.dispatch(authActions.logoutUser());
    expect(setAuthToken).toHaveBeenCalled();
  });
});

describe("setCurrentUser", () => {
  test("returns an object", () => {
    expect(authActions.setCurrentUser(dataFixture.decodedToken)).toBeInstanceOf(
      Object
    );
  });
  test("it returns the SET_CURRENT_USER action type and decoded payload", () => {
    expect(authActions.setCurrentUser(dataFixture.decodedToken)).toEqual({
      type: "SET_CURRENT_USER",
      payload: dataFixture.decodedToken
    });
  });
});
