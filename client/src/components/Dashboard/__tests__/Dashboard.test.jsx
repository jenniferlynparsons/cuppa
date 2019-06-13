import React from "react";
import { makeMockStore } from "../../../test/testUtils";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";
import { renderWithRouter } from "../../../test/routerTestUtils";
import { Redirect } from "react-router-dom";
import Dashboard from "../Dashboard";

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

afterEach(cleanup);

let store;
beforeEach(() => {
  store = makeMockStore(initialState);
});

describe("Dashboard rendering", () => {
  test("dashboard renders without error when logged in", () => {
    const { getByTestId } = renderWithRouter(<Dashboard store={store} />);
    expect(getByTestId("dashboard")).toBeTruthy();
  });

  test("dashboard displays user name", () => {
    const { getByText } = renderWithRouter(<Dashboard store={store} />);
    expect(getByText(/Jennifer/)).toBeTruthy();
  });
});

// describe("Dashboard interaction", () => {
//   test("dashboard logout click logs out user", async () => {
//     const { getByTestId } = renderWithRouter(<Dashboard store={store} />);
//     fireEvent.click(getByTestId("logout"));
//     await wait(() => expect(Redirect).toHaveBeenCalledTimes(1));

//     // expect(Redirect).toHaveBeenCalledWith({ to: "/login" }, {});
//   });
// });
