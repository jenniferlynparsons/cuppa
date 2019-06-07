import React from "react";
import { shallow } from "enzyme";
import Landing from "../";

const defaultProps = {};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Landing {...setupProps} />);
};

describe("Landing rendering", () => {
  test("Landing renders without error", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
