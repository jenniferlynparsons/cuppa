import React from "react";
import { fireEvent } from "@testing-library/react";
import { makeMockStore } from "../../../../test/testUtils";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import storeFixture from "../../../../test/__fixtures__/storeFixture";
import NavBarContainer from "../NavBarContainer";
import { NavBarContainerComponent } from "../NavBarContainer";

let mockFunc;
let loggedOutStore;
let loggedInStore;

beforeEach(() => {
  mockFunc = jest.fn();
  loggedOutStore = makeMockStore(storeFixture.loggedOutStore);
  loggedInStore = makeMockStore(storeFixture.loggedInStore);
});

describe("NavBar rendering", () => {
  test("renders without error when logged out", () => {
    const { queryByTestId } = renderWithRouter(
      <NavBarContainer store={loggedOutStore} />
    );

    expect(queryByTestId("navbar")).toBeTruthy();
  });

  test("renders without error when logged in", () => {
    const { queryByTestId } = renderWithRouter(
      <NavBarContainer store={loggedInStore} />
    );

    expect(queryByTestId("navbar")).toBeTruthy();
  });
});

describe("NavBar interactions", () => {
  test("user click logout button triggers logout function", () => {
    const { getByTestId } = renderWithRouter(
      <NavBarContainerComponent auth={loggedInStore} logoutUser={mockFunc} />
    );

    fireEvent.click(getByTestId("logout"));
    expect(mockFunc).toHaveBeenCalled();
  });
});
