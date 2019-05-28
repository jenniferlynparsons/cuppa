import React from "react";
import { shallow } from "enzyme";
import App from "../App";

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

describe("App loading", () => {
  test("renders without crashing", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });
});
