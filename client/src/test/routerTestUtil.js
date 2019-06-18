import React from "react";
import { Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, wait } from "@testing-library/react";
import { createMemoryHistory } from "history";

function renderWithRouter(ui, { route = "/", ...renderOptions } = {}) {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions);
  const finishLoading = () =>
    wait(() => expect(utils.queryByText("Loading")).toBeNull());
  return {
    ...utils,
    finishLoading,
    history
  };
}

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

function renderWithRouterAndRedux(
  ui,
  {
    route = "/",
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(
    <Provider store={store}>
      <Router history={history}>{ui}</Router>
    </Provider>,
    renderOptions
  );
  const finishLoading = () =>
    wait(() => expect(utils.queryByText("Loading")).toBeNull());
  return {
    ...utils,
    finishLoading,
    history,
    store
  };
}

export { renderWithRouter, renderWithRedux, renderWithRouterAndRedux };
