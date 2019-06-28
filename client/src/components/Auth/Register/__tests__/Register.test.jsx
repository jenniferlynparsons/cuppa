import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import RegisterContainer from "../RegisterContainer";
import { RegisterContainerComponent } from "../RegisterContainer";

describe("Register rendering", () => {
  test("Register renders without error", () => {
    const store = makeMockStore(storeFixture.loggedOutStore);
    const { queryByTestId } = renderWithRouter(
      <RegisterContainer store={store} />
    );

    expect(queryByTestId("register")).toBeTruthy();
  });
});

describe("Register form updates", () => {
  test("onSubmit submits the form with valid data", () => {
    let mockRegisterUser = jest.fn();
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
