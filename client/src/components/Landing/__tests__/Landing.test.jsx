import React from "react";
import { renderWithRouter } from "../../../test/routerTestUtils";
import Landing from "../";

describe("Landing rendering", () => {
  test("Landing renders without error", () => {
    const { queryByTestId } = renderWithRouter(<Landing />);
    expect(queryByTestId("landing")).toBeTruthy();
  });
});
