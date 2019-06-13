import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import { Redirect as MockRedirect } from "react-router-dom";
import API from "../../../../lib/api";
import Login from "../Login";

const defaultProps = {
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false
  }
};

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    Redirect: jest.fn().mockImplementation(() => null)
  };
});

jest.mock("../../../../lib/api", () => ({
  post: jest.fn(() => Promise.resolve())
}));

afterEach(cleanup);

let store;
beforeEach(() => {
  store = makeMockStore(defaultProps);
});

describe("Login rendering", () => {
  test("login renders without error", () => {
    const { getByTestId } = renderWithRouter(<Login store={store} />);
    expect(getByTestId("login")).toBeTruthy();
  });
});

describe("Login form updates", () => {
  describe("Email input", () => {
    it("should respond to change event", () => {
      const { getByTestId } = renderWithRouter(<Login store={store} />);
      fireEvent.change(getByTestId("email"), {
        target: { value: "test@example.com" }
      });
      expect(getByTestId("email").value).toEqual("test@example.com");
    });
  });

  describe("Password input", () => {
    it("should respond to change event", () => {
      const { getByTestId } = renderWithRouter(<Login store={store} />);
      fireEvent.change(getByTestId("password"), {
        target: { value: "testing" }
      });
      expect(getByTestId("password").value).toEqual("testing");
    });
  });

  // TODO: find a way to fake a successful signin and redirect to dashboard
  // Currently, this is not a good test, should have error messages
  // test("onSubmit submits the form with valid data", () => {
  //   const { getByTestId, container } = renderWithRouter(
  //     <Login store={store} />
  //   );

  //   fireEvent.change(getByTestId("email"), {
  //     target: { value: "test@example.com" }
  //   });
  //   fireEvent.change(getByTestId("password"), {
  //     target: { value: "testing" }
  //   });
  //   fireEvent.click(getByTestId("submit"));
  //   expect(container.innerHTML).toMatch(/Don't have an account/);
  // });
});
