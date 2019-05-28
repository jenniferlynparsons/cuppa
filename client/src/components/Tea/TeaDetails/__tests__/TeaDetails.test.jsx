import React from "react";
import { shallow } from "enzyme";
import { TeaDetails } from "../TeaDetails";

const defaultProps = {};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TeaDetails {...setupProps} />);
};

describe("teaDetails rendering", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("teaDetails renders without error", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("tea detail renders all tea details and edit button", () => {
    // expect().toBeTruthy();
  });
});

describe("teaDetails flash", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("tea detail renders with flash message after update", () => {
    // expect().toBeTruthy();
  });

  test("user clicks on delete flash clears it", () => {
    // expect().toBeTruthy();
  });
});

describe("teaDetails interactions", () => {
  test("user clicks edit to update tea", () => {
    // expect().toBeTruthy();
  });
});
