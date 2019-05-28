import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { shallow } from "enzyme";
import Register from "../Register";

const defaultProps = {};

const setup = (props = {}) => {
  const store = makeMockStore(defaultProps);
  return shallow(<Register store={store} />);
};

describe("Register rendering", () => {
  test("register renders without error", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });
});

describe("Register form changes", () => {
  test("onChange updates the component state", () => {
    // expect().toBeTruthy();
  });

  test("onSubmit successfully submits the form with valid data", () => {
    // expect().toBeTruthy();
  });

  test("onSubmit fails to submit the form with invalid data", () => {
    // expect().toBeTruthy();
  });

  test("if user is logged in they are redirected to the dashboard on success", () => {
    // expect().toBeTruthy();
  });
});
