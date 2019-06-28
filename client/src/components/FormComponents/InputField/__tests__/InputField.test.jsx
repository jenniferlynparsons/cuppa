import React from "react";
import { render } from "@testing-library/react";
import InputField from "../InputField";

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
    const { queryByTestId } = render(<InputField {...defaultProps} />);
    expect(queryByTestId("inputfield")).toBeTruthy();
  });
});
