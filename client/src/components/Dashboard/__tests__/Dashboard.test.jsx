import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import Dashboard from "../Dashboard";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
const initialState = {
  auth: {
    isAuthenticated: true,
    loading: false,
    user: {
      exp: 1589933753,
      iat: 1558376827,
      id: "5c6313a4c318bb62298b23d4",
      name: "Jennifer"
    }
  }
};

const setup = (setupState = {}) => {
  const store = mockStore(setupState);
  return mount(<Dashboard store={store} />);
};

describe("Dashboard rendering", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialState);
  });

  test("dashboard displays user name", () => {
    const userNameElement = findByTestAttr(wrapper, "user-name");
    expect(userNameElement.text()).toMatch(/Jennifer/);
  });

  // TODO - this data is not in the store
  test("dashboard displays user email", () => {
    const userEmailElement = findByTestAttr(wrapper, "user-email");
    expect(userEmailElement.text()).toMatch(/jenniferlynparsons/);
  });

  // TODO - this feature is not implemented yet
  test("dashboard displays tea count", () => {
    const userTeaCountElement = findByTestAttr(wrapper, "tea-count");
    expect(userTeaCountElement.text()).toMatch(/22/);
  });
});

describe("Dashboard interaction", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialState);
  });

  test("dashboard logout click fires logoutUser", () => {
    expect(userNameElement.text()).toMatch(/Jennifer/);
  });
});

describe("Dashboard authentication", () => {
  test("dashboard renders without error when logged in", () => {
    let wrapper = setup(initialState);
    expect(wrapper.exists()).toBe(true);
  });
});
