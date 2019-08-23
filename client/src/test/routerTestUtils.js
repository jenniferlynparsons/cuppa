import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { makeMockStore } from "./testUtils";
import { render, wait } from "@testing-library/react";
import { createMemoryHistory } from "history";

export const renderWithRouter = (
  ui,
  { route = "/", ...renderOptions } = {}
) => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions);
  const finishLoading = () =>
    wait(() => expect(utils.queryByText("Loading")).toBeNull());
  return {
    ...utils,
    finishLoading,
    history
  };
};

export const renderWithRedux = (ui, mockedStore, route = "/") => {
  const history = createMemoryHistory({ initialEntries: [route] });
  const store = makeMockStore(mockedStore);
  console.log(mockedStore);
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    )
  };
};
