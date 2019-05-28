import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { shallow } from "enzyme";
import Login from "../Login";

const defaultProps = {};

const setup = (props = {}) => {
  const store = makeMockStore(defaultProps);
  return shallow(<Login store={store} />);
};

describe("Login rendering", () => {
  test("login renders without error", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });
});

describe("Login form updates", () => {
  test("onChange updates the component state", () => {
    // expect().toBeTruthy();
  });

  test("onSubmit successfully submits the form with valid data", () => {
    // expect().toBeTruthy();
  });

  test("onSubmit fails to submit the form with invalid data", () => {
    // expect().toBeTruthy();
  });
});
