import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(cleanup);

describe("App loading", () => {
  test("renders without crashing", () => {
    const { getByLabelText } = render(<App />);
    expect(getByLabelText("main navigation")).toBeTruthy();
  });
});
