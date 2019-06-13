import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { cleanup, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../../../../test/routerTestUtils";
import NavBar from "../NavBar";

const defaultProps = {
  auth: {
    isAuthenticated: false,
    user: {},
    loading: false
  }
};

afterEach(cleanup);

let store;
beforeEach(() => {
  store = makeMockStore(defaultProps);
});

describe("NavBar rendering", () => {
  test("renders without error", () => {
    const { getByTestId } = renderWithRouter(<NavBar store={store} />);
    expect(getByTestId("navbar")).toBeTruthy();
  });
});
