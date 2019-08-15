import React from "react";
import { makeMockStore } from "../../../test/testUtils";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../test/routerTestUtils";
import storeFixture from "../../../test/__fixtures__/storeFixture";
import DashboardContainer from "../DashboardContainer";
import { DashboardContainerComponent } from "../DashboardContainer";

const mockLogoutUser = jest.fn();

let store;
beforeEach(() => {
  store = makeMockStore(storeFixture.loggedInStore);
});

describe("Dashboard rendering", () => {
  test("dashboard renders without error when logged in", () => {
    const { queryByTestId } = renderWithRouter(
      <DashboardContainer store={store} />
    );

    expect(queryByTestId("dashboard")).toBeTruthy();
  });
});

describe("Dashboard interaction", () => {
  test("dashboard logout click logs out user", () => {
    const { getByTestId } = renderWithRouter(
      <DashboardContainerComponent
        auth={storeFixture.loggedInStore.auth}
        logoutUser={mockLogoutUser}
      />
    );

    fireEvent.click(getByTestId("logout"));
    expect(mockLogoutUser).toHaveBeenCalled();
  });
});
