import React from "react";
import { render, cleanup } from "@testing-library/react";
import Footer from "../";

afterEach(cleanup);

describe("footer rendering", () => {
  test("footer renders without error", () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId("footer")).toBeTruthy();
  });
});
