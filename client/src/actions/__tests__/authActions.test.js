import { makeMockStore } from "../../test/testUtils";
import jwt_decode from "jwt-decode";
import API from "../../lib/api";
import setAuthToken from "../../lib/setAuthToken";
import dataFixture from "../../test/__fixtures__/dataFixture";
import storeFixture from "../../test/__fixtures__/storeFixture";
import authActions, {
  loginAction,
  registerUser,
  logoutUser,
  setCurrentUser
} from "../authActions";

const store = makeMockStore(storeFixture.loggedOutStore);

jest.mock("../../lib/setAuthToken", () => jest.fn());

jest.mock("jwt-decode");

// Required for the API mock scope (must have `mock` prefix)
const mockResponse = dataFixture.response;
const mockFailResponse = {
  response: { data: { emailNotFound: "email not found" } }
};

jest.mock("../../lib/api", () => ({
  post: jest.fn(
    (apipath, userData) =>
      new Promise(function(resolve, reject) {
        if (userData.email !== "") {
          resolve(mockResponse);
        } else {
          reject(mockFailResponse);
        }
      })
  )
}));

beforeEach(() => {
  store.clearActions();
});

describe("loginAction", () => {
  test("returns a function", () => {
    expect(loginAction(dataFixture.loginData)).toBeInstanceOf(Function);
  });

  describe("dispatching the returned function", () => {
    test("it calls 'post' on the API with the correct path and the user data", () => {
      store.dispatch(loginAction(dataFixture.loginData));
      expect(API.post).toHaveBeenCalledWith(
        "/users/login",
        dataFixture.loginData
      );
    });

    describe("when the POST call is successful", () => {
      test("it sets the JWT token to the response from the POST", async () => {
        await store.dispatch(loginAction(dataFixture.loginData));
        expect(setAuthToken).toHaveBeenCalledWith(dataFixture.response.token);
      });
      test("it decodes the token with jwt_decode", async () => {
        await store.dispatch(loginAction(dataFixture.loginData));
        expect(jwt_decode).toHaveBeenCalledWith(dataFixture.response.token);
      });
      test("it sets the current user action", async () => {
        let currentUserSpy = jest.spyOn(authActions, "setCurrentUser");
        await store.dispatch(loginAction(dataFixture.loginData));
        expect(currentUserSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe("registerUser", () => {
  test("returns a function", () => {
    expect(registerUser(dataFixture.registerData)).toBeInstanceOf(Function);
  });

  describe("dispatching the returned function", () => {
    test("it calls 'post' on the API with the correct path and the user data", () => {
      store.dispatch(
        registerUser(dataFixture.registerData, dataFixture.history)
      );
      expect(API.post).toHaveBeenCalledWith(
        "/users/register",
        dataFixture.registerData
      );
    });

    describe("when the POST call is successful", () => {
      test("it sets the JWT token to the response from the POST", async () => {
        await store.dispatch(
          registerUser(dataFixture.registerData, dataFixture.history)
        );
        expect(setAuthToken).toHaveBeenCalledWith(dataFixture.response.token);
      });
      test("it decodes the token with jwt_decode", async () => {
        await store.dispatch(
          registerUser(dataFixture.registerData, dataFixture.history)
        );
        expect(jwt_decode).toHaveBeenCalledWith(dataFixture.response.token);
      });
      test("it sets the current user action", async () => {
        let currentUserSpy = jest.spyOn(authActions, "setCurrentUser");
        await store.dispatch(
          registerUser(dataFixture.registerData, dataFixture.history)
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
    expect(setCurrentUser(dataFixture.decodedToken)).toBeInstanceOf(Object);
  });
  test("it returns the SET_CURRENT_USER action type and decoded payload", () => {
    expect(setCurrentUser(dataFixture.decodedToken)).toEqual({
      type: "SET_CURRENT_USER",
      payload: dataFixture.decodedToken
    });
  });
});
