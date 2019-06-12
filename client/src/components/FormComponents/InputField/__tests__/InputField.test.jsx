import React from "react";
import { render, cleanup } from "@testing-library/react";
import InputField from "../InputField";

afterEach(cleanup);

const defaultProps = {
  className: "input",
  id: "brand",
  name: "brand",
  type: "text",
  list: "brands",
  placeholder: "Tea Brand",
  value: "Lipton"
};

describe("InputField rendering", () => {
  test("index field renders without errors", () => {
    const { getByTestId } = render(<InputField {...defaultProps} />);
    expect(getByTestId("inputfield")).toBeTruthy();
  });
});
