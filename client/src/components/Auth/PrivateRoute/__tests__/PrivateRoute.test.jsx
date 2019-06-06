import React from "react";
import { Redirect } from "react-router-dom";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";
import { makeMockStore } from "../../../../test/testUtils";
import { GenericComponent } from "../../../../test/__mocks__/GenericComponent";
import PrivateRoute from "../PrivateRoute";

const loggedInState = {
  auth: {
    isAuthenticated: true
  }
};

const loggedOutState = {
  auth: {
    isAuthenticated: false
  }
};

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    Redirect: jest.fn().mockImplementation(() => null)
  };
});

describe("PrivateRoute rendering", () => {
  test("it should render a component if user is logged in", () => {
    const store = makeMockStore(loggedInState);
    let wrapper = mount(
      <MemoryRouter initialEntries={["/dashboard"]} initialIndex={0}>
        <PrivateRoute
          path="/dashboard"
          component={GenericComponent}
          store={store}
        />
      </MemoryRouter>
    );

    expect(wrapper.find(GenericComponent).exists()).toBe(true);
  });

  test("PrivateRoute should redicted to the login page if user is logged out", () => {
    const store = makeMockStore(loggedOutState);
    let wrapper = mount(
      <MemoryRouter initialEntries={["/dashboard"]} initialIndex={0}>
        <PrivateRoute
          path="/dashboard"
          component={GenericComponent}
          store={store}
        />
      </MemoryRouter>
    );
    expect(wrapper.find(Redirect).exists()).toBe(true);
  });
});
