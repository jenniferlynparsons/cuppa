import { makeMockStore } from "../../test/testUtils";
import { loginAction, registerUser, logoutUser } from "../authActions";
import * as actions from "../authActions";
import jwt_decode from "jwt-decode";
import { authActionTypes } from "../../lib/actionTypes";
import API from "../../lib/api";
import setAuthToken from "../../utils/setAuthToken";

const store = makeMockStore({
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false
  }
});

const mockLoginData = {
  email: "jenniferlynparsons@gmail.com",
  password: "boogadoo1"
};

const mockRegisterData = {
  name: "Jennifer",
  email: "littleoracle@gmail.com",
  password: "boogadoo1",
  password2: "boogadoo1"
};

const mockPayload = {
  id: "5c6313a4c318bb62298b23d4",
  name: "Jennifer",
  iat: 1558376827,
  exp: 1589933753
};

const mockResponse = {
  success: true,
  token:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNjMxM2E0YzMxOGJiNjIyOThiMjNkNCIsIm5hbWUiOiJKZW5uaWZlciIsImlhdCI6MTU1ODk3MTY4MSwiZXhwIjoxNTkwNTI4NjA3fQ.1Tn8FLJE2gUj0D0ka91e79cLEQz6ttSkQ0sZNd3GGE8"
};

const mockDecodedToken = {
  id: "5c6313a4c318bb62298b23d4",
  name: "Jennifer",
  iat: 1559234664,
  exp: 1590791590
};

// Set up our stubbed auth function
jest.mock("../../utils/setAuthToken", () => jest.fn());

jest.mock("jwt-decode");

// Set up our stubbed API.
jest.mock("../../lib/api", () => ({
  post: jest.fn(() => Promise.resolve(mockResponse))
}));

describe("loginAction", () => {
  test("returns a function", () => {
    loginAction(mockLoginData);
    expect(loginAction()).toBeInstanceOf(Function);
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
        const mockSetCurrentUser = jest.spyOn(actions, "setCurrentUser");
        await store.dispatch(loginAction(mockLoginData));
        expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);
      });
    });
  });
});

describe("registerUser", () => {
  test("returns a function", () => {
    registerUser(mockRegisterData);
    expect(registerUser()).toBeInstanceOf(Function);
  });
});
