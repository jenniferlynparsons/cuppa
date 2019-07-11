import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import RegisterContainer from "../RegisterContainer";
import { RegisterContainerComponent } from "../RegisterContainer";

let mockRegisterUser = jest.fn();
let mockHandleSubmit = jest.fn();

describe("Register rendering", () => {
  test("Register renders without error", () => {
    const store = makeMockStore(storeFixture.loggedOutStore);
    const { queryByTestId } = renderWithRouter(
      <RegisterContainer store={store} />
    );

    expect(queryByTestId("register")).toBeTruthy();
  });
});

describe("Register form success", () => {
  test("onSubmit submits the form with valid data", () => {
    const { getByTestId } = renderWithRouter(
      <RegisterContainerComponent
        auth={storeFixture.loggedOutStore}
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

describe("Login form failure", () => {
  describe("onSubmit returns an error message if data is invalid", () => {
    test("missing email address and password", () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <RegisterContainerComponent
          auth={storeFixture.loggedOutStore}
          handleSubmit={mockHandleSubmit}
          registerUser={mockRegisterUser}
        />
      );

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror")).toBeTruthy();
    });

    test("invalid email address", () => {
      const { getByTestId, queryByTestId } = renderWithRouter(
        <RegisterContainerComponent
          auth={storeFixture.loggedOutStore}
          handleSubmit={mockHandleSubmit}
          registerUser={mockRegisterUser}
        />
      );

      fireEvent.change(getByTestId("email"), {
        target: { value: "test" }
      });
      fireEvent.change(getByTestId("password"), {
        target: { value: "testing" }
      });
      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("inputerror")).toBeTruthy();
    });

    test("mismatched email", () => {
      let mockHandleSubmit = jest.fn();
      const { queryByTestId } = renderWithRouter(
        <RegisterContainerComponent
          auth={storeFixture.loggedOutStore}
          serverErrors={{ emailNotFound: "Email not found" }}
          handleSubmit={mockHandleSubmit}
          registerUser={mockRegisterUser}
        />
      );
      expect(queryByTestId("notfoundnotice")).toBeTruthy();
    });
  });
});
