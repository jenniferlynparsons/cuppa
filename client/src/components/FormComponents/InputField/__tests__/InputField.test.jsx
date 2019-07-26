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
const defaultErrorProps = {
  className: "input",
  id: "brand",
  name: "brand",
  type: "text",
  list: "brands",
  placeholder: "Tea Brand",
  value: "Lipton",
  inputValidation: false,
  errorMessage: "There is an error",
  errorClass: "is-danger",
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

const numberErrorProps = {
  className: "input",
  id: "brewTime",
  name: "brewTime",
  type: "number",
  min: "0",
  max: "0",
  placeholder: "Sec",
  value: "",
  inputValidation: false,
  errorMessage: "There is an error",
  errorClass: "is-danger",
  onChange: jest.fn()
};

describe("Valid InputField rendering", () => {
  test("index field renders without errors", () => {
    const { queryByTestId } = render(<InputField {...defaultProps} />);
    expect(queryByTestId("inputfield")).toBeTruthy();
  });
  test("index field with number renders without errors", () => {
    const { queryByTestId } = render(<InputField {...numberProps} />);
    expect(queryByTestId("inputfield")).toBeTruthy();
  });
});

describe("Invalid InputField rendering", () => {
  test("index field renders with errors", () => {
    const { queryByTestId } = render(<InputField {...defaultErrorProps} />);
    expect(queryByTestId("inputfield")).toBeTruthy();
  });
  test("index field with number renders with errors", () => {
    const { queryByTestId } = render(<InputField {...numberErrorProps} />);
    expect(queryByTestId("inputfield")).toBeTruthy();
  });
});
