import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import Login from "../Login";
import { LoginComponent } from "../Login";

const defaultProps = {
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false
  }
};

describe("Login rendering", () => {
  test("login renders without error", () => {
    const store = makeMockStore(defaultProps);
    const { queryByTestId } = renderWithRouter(<Login store={store} />);
    expect(queryByTestId("login")).toBeTruthy();
  });
});

describe("Login form updates", () => {
  test("onSubmit submits the form with valid data", () => {
    let mockHandleSubmit = jest.fn();
    const { getByTestId } = renderWithRouter(
      <LoginComponent
        auth={defaultProps}
        errors={""}
        handleSubmit={mockHandleSubmit}
      />
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(getByTestId("password"), {
      target: { value: "testing" }
    });
    fireEvent.click(getByTestId("submit"));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
