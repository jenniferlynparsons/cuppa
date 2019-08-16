import React from "react";
import { makeMockStore } from "../../../test/testUtils";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../test/routerTestUtils";
import storeFixture from "../../../test/__fixtures__/storeFixture";
import DashboardContainer from "../DashboardContainer";
import { DashboardContainerComponent } from "../DashboardContainer";

let mockFunc;
let mockDefaultProps;

beforeEach(() => {
  mockFunc = jest.fn();
  mockDefaultProps = {
    auth: storeFixture.loggedInStore.auth,
    logoutUser: mockFunc
  };
});

describe("Dashboard rendering", () => {
  test("dashboard renders without error when logged in", () => {
    const store = makeMockStore(storeFixture.loggedInStore);
    const { queryByTestId } = renderWithRouter(
      <DashboardContainer store={store} />
    );

    expect(queryByTestId("dashboard")).toBeTruthy();
  });
});

describe("Dashboard interaction", () => {
  test("dashboard logout click logs out user", () => {
    const { getByTestId } = renderWithRouter(
      <DashboardContainerComponent {...mockDefaultProps} />
    );

    fireEvent.click(getByTestId("logout"));
    expect(mockFunc).toHaveBeenCalled();
  });
});
