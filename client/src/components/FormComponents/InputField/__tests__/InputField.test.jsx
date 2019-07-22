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
  value: "Lipton",
  onChange: jest.fn()
};

const numberProps = {
  className: "input",
  id: "brewTime",
  name: "brewTime",
  type: "number",
  min: "0",
  max: "0",
  placeholder: "Sec",
  value: "",
  onChange: jest.fn()
};

describe("InputField rendering", () => {
  test("index field renders without errors", () => {
    const { queryByTestId } = render(<InputField {...defaultProps} />);
    expect(queryByTestId("inputfield")).toBeTruthy();
  });
  test("index field with number renders without errors", () => {
    const { queryByTestId } = render(<InputField {...numberProps} />);
    expect(queryByTestId("inputfield")).toBeTruthy();
  });
});
