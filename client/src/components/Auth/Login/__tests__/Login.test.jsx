import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import LoginContainer, { LoginContainerComponent } from "../LoginContainer";

const mockFunc = jest.fn();

describe("Login rendering", () => {
  test("login renders without error", () => {
    const store = makeMockStore(storeFixture.loggedOutStore);
    const { queryByTestId } = renderWithRouter(
      <LoginContainer store={store} />
    );

    expect(queryByTestId("login")).toBeTruthy();
  });
});

describe("Login form updates", () => {
  test("onSubmit submits the form with valid data", () => {
    let mockHandleSubmit = jest.fn();
    const { getByTestId } = renderWithRouter(
      <LoginContainerComponent
        auth={storeFixture.loggedOutStore}
        errors={""}
        handleSubmit={mockHandleSubmit}
        loginAction={mockFunc}
      />
    );

    fireEvent.change(getByTestId("email"), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(getByTestId("password"), {
      target: { value: "testing" }
    });
    fireEvent.click(getByTestId("submit"));
    expect(mockFunc).toHaveBeenCalled();
  });
});
