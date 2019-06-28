import React from "react";
import { render } from "@testing-library/react";
import Footer from "../";

describe("footer rendering", () => {
  test("footer renders without error", () => {
    const { queryByTestId } = render(<Footer />);
    expect(queryByTestId("footer")).toBeTruthy();
  });
});
