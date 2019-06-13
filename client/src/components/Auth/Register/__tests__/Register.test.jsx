import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { cleanup, fireEvent, wait } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import { Redirect as MockRedirect } from "react-router-dom";
import API from "../../../../lib/api";
import Register from "../Register";

const mockResponse = {
  success: true,
  token: "Bearer 5cCI6IkpXVCJ9.oxNTkwNTI4NjA3fQ.1Nd3GGE8"
};

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

describe("Register rendering", () => {
  test("Register renders without error", () => {
    const { getByTestId } = renderWithRouter(<Register store={store} />);

    expect(getByTestId("register")).toBeTruthy();
  });
});

describe("Register form updates", () => {
  describe("Name input", () => {
    it("should respond to change event", () => {
      const { getByTestId } = renderWithRouter(<Register store={store} />);
      fireEvent.change(getByTestId("name"), {
        target: { value: "JP" }
      });
      expect(getByTestId("name").value).toEqual("JP");
    });
  });
  describe("Email input", () => {
    it("should respond to change event", () => {
      const { getByTestId } = renderWithRouter(<Register store={store} />);
      fireEvent.change(getByTestId("email"), {
        target: { value: "test@example.com" }
      });
      expect(getByTestId("email").value).toEqual("test@example.com");
    });
  });

  describe("Password input", () => {
    it("should respond to change event", () => {
      const { getByTestId } = renderWithRouter(<Register store={store} />);
      fireEvent.change(getByTestId("password"), {
        target: { value: "testing" }
      });
      expect(getByTestId("password").value).toEqual("testing");
    });
  });

  describe("Password2 input", () => {
    it("should respond to change event", () => {
      const { getByTestId } = renderWithRouter(<Register store={store} />);
      fireEvent.change(getByTestId("password2"), {
        target: { value: "testing" }
      });
      expect(getByTestId("password2").value).toEqual("testing");
    });
  });

  // TODO: find a way to fake a successful signin and redirect to dashboard
  // Currently, this is not a good test
  // test("onSubmit submits the form with valid data", async () => {
  //   const { getByTestId, container } = renderWithRouter(
  //     <Register store={store} />
  //   );
  //   fireEvent.change(getByTestId("email"), {
  //     target: { value: "test@example.com" }
  //   });
  //   fireEvent.change(getByTestId("password"), {
  //     target: { value: "testing" }
  //   });
  //   fireEvent.click(getByTestId("submit"));
  //   // expect(container.innerHTML).toMatch(/Already have an account/);
  //   // await wait(() => expect(Redirect).toHaveBeenCalledTimes(1));
  //   // await wait(() => console.log(history));

  //   await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1));

  //   expect(MockRedirect).toHaveBeenCalledWith({ to: "/" }, {});
  // });
});
