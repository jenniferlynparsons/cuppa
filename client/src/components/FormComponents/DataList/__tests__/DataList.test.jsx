import React from "react";
import { shallow } from "enzyme";
import DataList from "../DataList";

const defaultProps = {};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<DataList {...setupProps} />);
};

/*
TODO:
- test if/else login to populate options array?
*/

describe("DataList rendering", () => {
  test("dataList renders without error", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });

  test("datalist options render correctly if there are options available", () => {
    // expect().toBeTruthy();
  });

  test("datalist options do not render if there are no options available", () => {
    // expect().toBeTruthy();
  });
});
