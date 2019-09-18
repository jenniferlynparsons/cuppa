import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import RegisterContainer from "../RegisterContainer";
import { RegisterContainerComponent } from "../RegisterContainer";

let mockFunc;
let mockDefaultProps;

beforeEach(() => {
  mockFunc = jest.fn();
  mockDefaultProps = {
    auth: storeFixture.loggedOutStore,
    registerUser: mockFunc
  };
});

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
      <RegisterContainerComponent {...mockDefaultProps} />
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
    expect(mockFunc).toHaveBeenCalled();
  });
});

describe("Register form failure", () => {
  describe("onSubmit returns an error message if data is invalid", () => {
    test("missing information", () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <RegisterContainerComponent {...mockDefaultProps} />
      );

      expect(queryByTestId("notfoundnotice")).toBeFalsy();

      fireEvent.click(getByTestId("submit"));
      expect(queryByTestId("incompletenotice")).toBeTruthy();
      expect(queryAllByTestId("inputerror").length).toEqual(4);
    });

    test("invalid email address", () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <RegisterContainerComponent {...mockDefaultProps} />
      );

      expect(queryByTestId("notfoundnotice")).toBeFalsy();

      fireEvent.change(getByTestId("name"), {
        target: { value: "Jennifer" }
      });
      fireEvent.change(getByTestId("email"), {
        target: { value: "test" }
      });
      fireEvent.change(getByTestId("password"), {
        target: { value: "testing" }
      });
      fireEvent.change(getByTestId("password2"), {
        target: { value: "testing" }
      });
      fireEvent.click(getByTestId("submit"));
      expect(queryAllByTestId("inputerror").length).toEqual(1);
    });

    test("mismatched passwords", () => {
      const { getByTestId, queryByTestId, queryAllByTestId } = renderWithRouter(
        <RegisterContainerComponent {...mockDefaultProps} />
      );

      expect(queryByTestId("notfoundnotice")).toBeFalsy();

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
        target: { value: "nottest" }
      });
      fireEvent.click(getByTestId("submit"));
      expect(queryAllByTestId("inputerror").length).toEqual(1);
    });
  });
});
