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

describe("Login form success", () => {
  test("onSubmit submits the form with valid data", () => {
    const { getByTestId } = renderWithRouter(
      <LoginContainerComponent
        auth={storeFixture.loggedOutStore}
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

describe("Login form failure", () => {
  describe("onSubmit returns an error message if data is invalid", () => {
    test("missing email address and password", () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <LoginContainerComponent
          auth={storeFixture.loggedOutStore}
          loginAction={mockFunc}
        />
      );

      expect(queryByTestId("notfoundnotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror")).toBeTruthy();
    });

    test("invalid email address", () => {
      const { getByTestId, queryByTestId } = renderWithRouter(
        <LoginContainerComponent
          auth={storeFixture.loggedOutStore}
          loginAction={mockFunc}
        />
      );

      expect(queryByTestId("notfoundnotice")).toBeFalsy();

      fireEvent.change(getByTestId("email"), {
        target: { value: "test" }
      });
      fireEvent.change(getByTestId("password"), {
        target: { value: "testing" }
      });
      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("inputerror")).toBeTruthy();
    });

    // TODO: sort out issues with rerender that prevent server errors from appearing
    // test("mismatched email", () => {
    //   const { queryByTestId } = renderWithRouter(
    //     <LoginContainerComponent
    //       auth={storeFixture.loggedErrorStore}
    //       serverErrors={{ emailNotFound: "Email not found" }}
    //       loginAction={mockFunc}
    //     />
    //   );

    //   expect(queryByTestId("notfoundnotice")).toBeTruthy();
    // });
  });
});
