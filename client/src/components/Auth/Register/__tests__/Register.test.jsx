import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { fireEvent, wait } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import Register from "../Register";
import { RegisterComponent } from "../Register";

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

describe("Register rendering", () => {
  test("Register renders without error", () => {
    const store = makeMockStore(defaultProps);
    const { queryByTestId } = renderWithRouter(<Register store={store} />);

    expect(queryByTestId("register")).toBeTruthy();
  });
});

describe("Register form updates", () => {
  test("onSubmit submits the form with valid data", () => {
    let mockRegisterUser = jest.fn();
    const { getByTestId } = renderWithRouter(
      <RegisterComponent
        auth={defaultProps}
        errors={""}
        registerUser={mockRegisterUser}
      />
    );

    fireEvent.change(getByTestId("name"), {
      target: { value: "Jennifer" }
    });
    fireEvent.change(getByTestId("email"), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(getByTestId("password"), {
      target: { value: "testing" }
    });
    fireEvent.change(getByTestId("password2"), {
      target: { value: "testing" }
    });
    fireEvent.click(getByTestId("submit"));
    expect(mockRegisterUser).toHaveBeenCalled();
  });
});
