import React from "react";
import { shallow } from "enzyme";
import IndexField from "../IndexField";

/*
TODO:
- mock onChange
- mock onBlur
*/

const defaultProps = {
  className: "input",
  id: "brand",
  name: "brand",
  type: "text",
  list: "brands",
  placeholder: "Tea Brand",
  value: "Lipton"
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<IndexField {...setupProps} />);
};

describe("IndexField rendering", () => {
  test("index field renders without errors", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
