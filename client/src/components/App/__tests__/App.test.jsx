import React from "react";
import { shallow } from "enzyme";
import App from "../App";

const setup = (state = null) => {
  const component = shallow(<App />);
  if (state) {
    component.setState(state);
  }
  return component;
};

describe("App loading", () => {
  test("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
