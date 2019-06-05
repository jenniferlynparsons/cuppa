import React from "react";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";
import { findByTestAttr } from "../../../../test/testUtils";
import { GenericComponent } from "../../../../test/__mocks__/GenericComponent";
import PrivateRoute from "../PrivateRoute";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

const mockStore = configureStore([thunk]);

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

describe("PrivateRoute rendering", () => {
  test("it should render a component if user is logged in", () => {
    const store = mockStore(loggedInState);
    let wrapper = mount(
      <MemoryRouter initialEntries={["/dashboard"]} initialIndex={0}>
        <PrivateRoute
          path="/dashboard"
          component={GenericComponent}
          store={store}
        />
      </MemoryRouter>
    );
    const generic = findByTestAttr(wrapper, "generic");

    expect(generic.exists()).toBe(true);
  });

  test("PrivateRoute should redicted to the login page if user is logged out", () => {
    const store = mockStore(loggedOutState);
    let wrapper = mount(
      <MemoryRouter initialEntries={["/dashboard"]} initialIndex={0}>
        <PrivateRoute
          path="/dashboard"
          component={GenericComponent}
          store={store}
        />
      </MemoryRouter>
    );
    // https://stackoverflow.com/a/51678503
    expect(wrapper.find("Router").prop("history").location.pathname).toEqual(
      "/login"
    );
  });
});
