import React from "react";
import { makeMockStore } from "../../../test/testUtils";
import { fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../test/routerTestUtils";
import DashboardContainer from "../DashboardContainer";
import { DashboardContainerComponent } from "../DashboardContainer";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    Redirect: jest.fn().mockImplementation(() => null)
  };
});

const initialState = {
  auth: {
    isAuthenticated: true,
    loading: false,
    user: {
      exp: 1589933753,
      iat: 1558376827,
      id: "5c63123a4c318b298b23d4",
      name: "Jennifer"
    }
  }
};

const mockLogoutUser = jest.fn();
let store;
beforeEach(() => {
  store = makeMockStore(initialState);
});

describe("Dashboard rendering", () => {
  test("dashboard renders without error when logged in", () => {
    const { getByTestId } = renderWithRouter(
      <DashboardContainer store={store} />
    );
    expect(getByTestId("dashboard")).toBeTruthy();
  });
});

describe("Dashboard interaction", () => {
  test("dashboard logout click logs out user", () => {
    const { getByTestId } = renderWithRouter(
      <DashboardContainerComponent
        auth={initialState.auth}
        logoutUser={mockLogoutUser}
      />
    );
    fireEvent.click(getByTestId("logout"));
    expect(mockLogoutUser).toHaveBeenCalled();
  });
});
