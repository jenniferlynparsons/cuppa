import React from "react";
import { makeMockStore } from "../../../../test/testUtils";
import { shallow } from "enzyme";
import NavBar from "../";

const defaultProps = {};

const setup = (props = {}) => {
  const store = makeMockStore(defaultProps);
  return shallow(<NavBar store={store} />);
};

describe("navbar rendering", () => {
  test("navbar renders without error", () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });
});

describe("navbar when user is logged in", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("the url of the logo link should direct to the /tea-collection if the user is logged in", () => {
    // expect().toBeTruthy();
  });

  test("the My Account menus should only show a Dashboard link and Log Out button when logged in", () => {
    // expect().toBeTruthy();
  });

  test("the Add Tea button should be enabled if logged in", () => {
    // expect().toBeTruthy();
  });
});

describe("navbar when user is logged out", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("the url of the logo link should direct to the welcome/home page if the user is logged out", () => {
    // expect().toBeTruthy();
  });

  test("the My Account menu should only show a Log In/Register button when logged out", () => {
    // expect().toBeTruthy();
  });

  test("the Add Tea button should be disabled if logged out", () => {
    // expect().toBeTruthy();
  });
});

describe("navbar interactions", () => {
  test("user is logged out when Log Out button is clicked", () => {
    // expect().toBeTruthy();
  });
});
